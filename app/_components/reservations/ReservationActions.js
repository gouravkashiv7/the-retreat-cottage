import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { isPast } from "date-fns";
import DeleteReservation from "@/app/_components/reservations/DeleteReservation";

function ReservationActions({ bookingId, startDate }) {
  if (isPast(startDate)) {
    return null;
  }

  return (
    <div className="flex flex-row md:flex-col border-t md:border-t-0 md:border-l border-primary-800 w-full md:w-[100px]">
      <Link
        href={`/account/reservations/edit/${bookingId}`}
        className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 flex-grow px-3 py-3 md:py-0 hover:bg-accent-600 transition-colors hover:text-primary-900"
      >
        <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
        <span className="mt-1">Edit</span>
      </Link>
      <DeleteReservation bookingId={bookingId} />
    </div>
  );
}

export default ReservationActions;
