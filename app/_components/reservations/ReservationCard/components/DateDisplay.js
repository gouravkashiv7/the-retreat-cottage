function DateDisplay({ formattedDates }) {
  if (!formattedDates.startDate) {
    return (
      <div className="text-base md:text-lg text-primary-300 mt-2 h-6 bg-gray-700 animate-pulse rounded"></div>
    );
  }

  return (
    <p className="text-base md:text-lg text-primary-300 mt-2">
      {formattedDates.startDate} (
      {formattedDates.isToday ? "Today" : formattedDates.timeDistance}) &mdash;{" "}
      {formattedDates.endDate}
    </p>
  );
}

export default DateDisplay;
