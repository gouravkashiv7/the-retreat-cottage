import { useEffect, useState } from "react";

export function useFormattedDates({ startDate, endDate, created_at }) {
  const [isMounted, setIsMounted] = useState(false);
  const [formattedDates, setFormattedDates] = useState({
    startDate: "",
    endDate: "",
    createdAt: "",
    timeDistance: "",
    isToday: false,
  });

  useEffect(() => {
    setIsMounted(true);

    const loadDateFormats = async () => {
      const { format, isToday, formatDistance, parseISO } = await import(
        "date-fns"
      );

      const formatDistanceFromNow = (dateStr) =>
        formatDistance(parseISO(dateStr), new Date(), {
          addSuffix: true,
        }).replace("about ", "");

      setFormattedDates({
        startDate: format(new Date(startDate), "EEE, MMM dd yyyy"),
        endDate: format(new Date(endDate), "EEE, MMM dd yyyy"),
        createdAt: format(new Date(created_at), "EEE, MMM dd yyyy, p"),
        timeDistance: formatDistanceFromNow(startDate),
        isToday: isToday(new Date(startDate)),
      });
    };

    loadDateFormats();
  }, [startDate, endDate, created_at]);

  return { isMounted, formattedDates };
}
