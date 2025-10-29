function AccommodationInfo({
  numNights,
  hasMultipleAccommodations,
  accommodations,
  currentAccommodation,
  isLoading = false,
}) {
  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const accommodationNames = accommodations?.map((acc) => acc.name).join(", ");

  if (isLoading) {
    return (
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
    );
  }

  return (
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
  );
}

export default AccommodationInfo;
