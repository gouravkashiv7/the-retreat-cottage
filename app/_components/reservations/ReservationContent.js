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

  const [isMounted, setIsMounted] = useState(false);
  const [timeDistance, setTimeDistance] = useState("");
  const [formattedDates, setFormattedDates] = useState({
    startDate: "",
    endDate: "",
    createdAt: "",
  });
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const formatDate = (date, includeTime = false) => {
      if (!date) return "";
      const d = new Date(date);
      if (isNaN(d.getTime())) return "Invalid date";

      const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        d.getDay()
      ];
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][d.getMonth()];
      const day = d.getDate();
      const year = d.getFullYear();

      if (includeTime) {
        let hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${weekday}, ${month} ${day} ${year}, ${hours}:${minutes} ${ampm}`;
      }

      return `${weekday}, ${month} ${day} ${year}`;
    };

    const calculateTimeDistance = () => {
      if (!startDate) return "";
      const start = new Date(startDate);
      const now = new Date();
      const diffTime = start - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "today";
      if (diffDays === 1) return "tomorrow";
      if (diffDays === -1) return "yesterday";
      if (diffDays > 0) return `in ${diffDays} days`;
      if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
      return "";
    };

    const checkIsToday = () => {
      if (!startDate) return false;
      const start = new Date(startDate);
      const today = new Date();
      return start.toDateString() === today.toDateString();
    };

    setFormattedDates({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      createdAt: formatDate(created_at, true),
    });
    setTimeDistance(calculateTimeDistance());
    setIsToday(checkIsToday());
  }, [startDate, endDate, created_at]);

  const currentAccommodation = accommodations?.[currentImageIndex];

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const accommodationNames = accommodations?.map((acc) => acc.name).join(", ");

  // Simple status check without dates for initial render
  const renderStatusBadge = () => {
    if (!isMounted) {
      return (
        <span className="bg-gray-800 text-gray-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
          loading
        </span>
      );
    }

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const todayVsStart = today >= new Date(start.setHours(0, 0, 0, 0));
    const todayVsEnd = today <= new Date(end.setHours(23, 59, 59, 999));

    if (status === "checked-in" || (todayVsStart && todayVsEnd)) {
      return (
        <span className="bg-blue-800 text-blue-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
          ongoing
        </span>
      );
    }

    if (today > end) {
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

  // Show loading state for dates during SSR
  if (!isMounted) {
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
          Loading dates...
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
            Loading booking date...
          </p>
        </div>
      </div>
    );
  }

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
        {formattedDates.startDate} ({isToday ? "Today" : timeDistance || "..."}{" "}
        ) &mdash; {formattedDates.endDate}
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
          Booked {formattedDates.createdAt}
        </p>
      </div>
    </div>
  );
}

export default ReservationContent;
