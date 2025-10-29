function BookingMeta({
  totalPrice,
  numGuests,
  formattedDates,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-auto items-baseline pt-3">
        <p className="text-xl font-semibold text-accent-400">₹{totalPrice}</p>
        <p className="text-primary-300 hidden sm:block">&bull;</p>
        <p className="text-lg text-primary-300">
          {numGuests} guest{numGuests > 1 && "s"}
        </p>
        <div className="text-sm text-primary-400 sm:ml-auto mt-2 sm:mt-0 h-4 bg-gray-600 animate-pulse rounded w-48"></div>
      </div>
    );
  }

  return (
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
  );
}

export default BookingMeta;
