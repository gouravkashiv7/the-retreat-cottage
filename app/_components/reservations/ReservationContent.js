"use client";
import { format, isPast, isToday, formatDistance, parseISO } from "date-fns";
import { useEffect, useState } from "react";

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
    status,
  } = booking;

  const [timeDistance, setTimeDistance] = useState("");
  const [isStartDateToday, setIsStartDateToday] = useState(false);
  const [statusBadge, setStatusBadge] = useState("");

  useEffect(() => {
    // Calculate all dynamic values on client only
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate time distance
    const distance = formatDistance(parseISO(startDate), today, {
      addSuffix: true,
    }).replace("about ", "");
    setTimeDistance(distance);

    // Check if start date is today
    setIsStartDateToday(isToday(start));

    // Determine status badge
    if (
      status === "checked-in" ||
      (today >= start && today <= end && !isPast(end))
    ) {
      setStatusBadge("ongoing");
    } else if (isPast(end)) {
      setStatusBadge("past");
    } else {
      setStatusBadge("upcoming");
    }
  }, [startDate, endDate, status]);

  const currentAccommodation = accommodations?.[currentImageIndex];

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const accommodationNames = accommodations?.map((acc) => acc.name).join(", ");

  const renderStatusBadge = () => {
    const badgeStyles = {
      ongoing: "bg-blue-800 text-blue-200",
      past: "bg-yellow-800 text-yellow-200",
      upcoming: "bg-green-800 text-green-200",
    };

    return (
      <span
        className={`${badgeStyles[statusBadge]} h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto`}
      >
        {statusBadge || "..."}
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
        {isStartDateToday ? "Today" : timeDistance || "..."}) &mdash;{" "}
        {format(new Date(endDate), "EEE, MMM dd yyyy")}
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
