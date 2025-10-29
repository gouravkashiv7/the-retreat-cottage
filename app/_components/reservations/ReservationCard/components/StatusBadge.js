function StatusBadge({ status, startDate, endDate }) {
  // Utility function to compare dates without time
  const compareDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
  };

  const getStatusVariant = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const todayVsStart = compareDates(today, start);
    const todayVsEnd = compareDates(today, end);

    if (status === "checked-in" || (todayVsStart >= 0 && todayVsEnd <= 0)) {
      return {
        className: "bg-blue-800 text-blue-200",
        label: "ongoing",
      };
    }

    if (todayVsEnd > 0) {
      return {
        className: "bg-yellow-800 text-yellow-200",
        label: "past",
      };
    }

    return {
      className: "bg-green-800 text-green-200",
      label: "upcoming",
    };
  };

  const variant = getStatusVariant();

  return (
    <span
      className={`${variant.className} h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto`}
    >
      {variant.label}
    </span>
  );
}

export default StatusBadge;
