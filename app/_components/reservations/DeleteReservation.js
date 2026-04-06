import { deleteReservation } from "@/app/_lib/actions";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useTransition, useState } from "react";
import { differenceInDays } from "date-fns";

function DeleteReservation({ bookingId, startDate }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const daysUntilBooking = differenceInDays(new Date(startDate), new Date());
  const canCancel = daysUntilBooking > 7;

  function handleCancel() {
    if (!canCancel) return;
    setShowConfirm(true);
  }

  function confirmCancel() {
    startTransition(() =>
      deleteReservation(bookingId)
        .then(() => setShowConfirm(false))
        .catch((error) => console.error("Cancel failed:", error))
    );
  }

  function closeConfirm() {
    setShowConfirm(false);
  }

  return (
    <>
      <button
        onClick={handleCancel}
        disabled={isPending || !canCancel}
        title={
          !canCancel
            ? "Reservations can only be canceled more than 7 days before check-in."
            : ""
        }
        className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 grow px-3 py-3 md:py-0 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <XCircleIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">{isPending ? "Canceling..." : "Cancel"}</span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-primary-800 rounded-xl shadow-lg max-w-sm w-full p-6 border border-primary-700">
            <h3 className="text-lg font-semibold text-accent-400 mb-2">
              Confirm Cancellation
            </h3>
            <p className="text-primary-300 mb-6">
              Are you sure you want to cancel this reservation? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeConfirm}
                disabled={isPending}
                className="flex-1 px-4 py-2 text-primary-300 bg-primary-700 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 border border-primary-600"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancel}
                disabled={isPending}
                className="flex-1 px-4 py-2 text-primary-800 bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-accent-600"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <XCircleIcon className="h-4 w-4" />
                )}
                {isPending ? "Canceling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
