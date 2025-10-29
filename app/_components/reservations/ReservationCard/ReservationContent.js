"use client";

import { useFormattedDates } from "./hooks/useFormattedDates";
import StatusBadge from "./components/StatusBadge";
import AccommodationInfo from "./components/AccommodationInfo";
import DateDisplay from "./components/DateDisplay";
import BookingMeta from "./components/BookingMeta";

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

  const { isMounted, formattedDates } = useFormattedDates({
    startDate,
    endDate,
    created_at,
  });

  const currentAccommodation = accommodations?.[currentImageIndex];

  if (!isMounted) {
    return (
      <ReservationContentSkeleton
        booking={booking}
        currentImageIndex={currentImageIndex}
        hasMultipleAccommodations={hasMultipleAccommodations}
        currentAccommodation={currentAccommodation}
      />
    );
  }

  return (
    <div className="flex-grow px-4 md:px-6 py-3 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <AccommodationInfo
          numNights={numNights}
          hasMultipleAccommodations={hasMultipleAccommodations}
          accommodations={accommodations}
          currentAccommodation={currentAccommodation}
        />
        <StatusBadge status={status} startDate={startDate} endDate={endDate} />
      </div>

      <DateDisplay formattedDates={formattedDates} />

      {hasMultipleAccommodations && (
        <CurrentlyViewingAccommodation
          currentAccommodation={currentAccommodation}
        />
      )}

      <BookingMeta
        totalPrice={totalPrice}
        numGuests={numGuests}
        formattedDates={formattedDates}
      />
    </div>
  );
}

// Skeleton component for loading state
function ReservationContentSkeleton({
  booking,
  hasMultipleAccommodations,
  currentAccommodation,
}) {
  const { numNights, totalPrice, numGuests, accommodations } = booking;

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const accommodationNames = accommodations?.map((acc) => acc.name).join(", ");

  return (
    <div className="flex-grow px-4 md:px-6 py-3 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <AccommodationInfo
          numNights={numNights}
          hasMultipleAccommodations={hasMultipleAccommodations}
          accommodations={accommodations}
          currentAccommodation={currentAccommodation}
          isLoading={true}
        />
        <StatusBadge
          status={booking.status}
          startDate={booking.startDate}
          endDate={booking.endDate}
        />
      </div>

      {/* Loading placeholder for dates */}
      <div className="text-base md:text-lg text-primary-300 mt-2 h-6 bg-gray-700 animate-pulse rounded"></div>

      {hasMultipleAccommodations && (
        <CurrentlyViewingAccommodation
          currentAccommodation={currentAccommodation}
        />
      )}

      <BookingMeta
        totalPrice={totalPrice}
        numGuests={numGuests}
        isLoading={true}
      />
    </div>
  );
}

// Helper component for currently viewing accommodation
function CurrentlyViewingAccommodation({ currentAccommodation }) {
  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  return (
    <div className="mt-2">
      <p className="text-sm text-primary-400">
        Currently viewing:{" "}
        <span className="text-primary-200">{currentAccommodation?.name}</span> (
        {capitalizeFirst(currentAccommodation?.type)})
      </p>
    </div>
  );
}

export default ReservationContent;
