import { deleteReservation } from "@/app/_lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition, useState } from "react";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    setShowConfirm(true);
  }

  function confirmDelete() {
    startTransition(() =>
      deleteReservation(bookingId)
        .then(() => setShowConfirm(false))
        .catch((error) => console.error("Delete failed:", error))
    );
  }

  function cancelDelete() {
    setShowConfirm(false);
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">{isPending ? "Deleting..." : "Delete"}</span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-primary-800 rounded-xl shadow-lg max-w-sm w-full p-6 border border-primary-700">
            <h3 className="text-lg font-semibold text-accent-400 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-primary-300 mb-6">
              Are you sure you want to delete this reservation? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                disabled={isPending}
                className="flex-1 px-4 py-2 text-primary-300 bg-primary-700 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 border border-primary-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isPending}
                className="flex-1 px-4 py-2 text-primary-800 bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-accent-600"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <TrashIcon className="h-4 w-4" />
                )}
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteReservation;
