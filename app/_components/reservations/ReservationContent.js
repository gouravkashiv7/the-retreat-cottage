import { format, isPast, isToday } from "date-fns";
import { formatDistanceFromNow } from "./ReservationCard";

function ReservationContent({
  booking,
  currentImageIndex,
  hasMultipleAccommodations,
}) {
  const {
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    accommodations,
    status, // Assuming status is now available in booking data
  } = booking;

  const currentAccommodation = accommodations?.[currentImageIndex];

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const accommodationNames = accommodations?.map((acc) => acc.name).join(", ");

  // Utility function to compare dates without time
  const compareDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Set both to start of day for accurate comparison
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
  };

  const renderStatusBadge = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const todayVsStart = compareDates(today, start);
    const todayVsEnd = compareDates(today, end);

    if (status === "checked-in" || (todayVsStart >= 0 && todayVsEnd <= 0)) {
      return (
        <span className="bg-blue-800 text-blue-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
          ongoing
        </span>
      );
    }

    if (todayVsEnd > 0) {
      return (
        <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
          past
        </span>
      );
    }

    return (
      <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
        upcoming
      </span>
    );
  };

  return (
    <div className="flex-grow px-4 md:px-6 py-3 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-semibold">
            {numNights} nights in{" "}
            {hasMultipleAccommodations ? (
              <>{accommodations?.length} Retreats</>
            ) : (
              <>
                {capitalizeFirst(currentAccommodation?.type)}{" "}
                <span className="text-primary-300">
                  "{currentAccommodation?.name}"
                </span>
              </>
            )}
          </h3>
          <p className="text-primary-300 mt-1 text-sm md:text-base">
            {accommodationNames}
          </p>
        </div>
        {renderStatusBadge()}
      </div>

      <p className="text-base md:text-lg text-primary-300 mt-2">
        {format(new Date(startDate), "EEE, MMM dd yyyy")} (
        {isToday(new Date(startDate))
          ? "Today"
          : formatDistanceFromNow(startDate)}
        ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
      </p>

      {hasMultipleAccommodations && (
        <div className="mt-2">
          <p className="text-sm text-primary-400">
            Currently viewing:{" "}
            <span className="text-primary-200">
              {currentAccommodation?.name}
            </span>{" "}
            ({capitalizeFirst(currentAccommodation?.type)})
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-auto items-baseline pt-3">
        <p className="text-xl font-semibold text-accent-400">₹{totalPrice}</p>
        <p className="text-primary-300 hidden sm:block">&bull;</p>
        <p className="text-lg text-primary-300">
          {numGuests} guest{numGuests > 1 && "s"}
        </p>
        <p className="text-sm text-primary-400 sm:ml-auto mt-2 sm:mt-0">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </div>
    </div>
  );
}

export default ReservationContent;
