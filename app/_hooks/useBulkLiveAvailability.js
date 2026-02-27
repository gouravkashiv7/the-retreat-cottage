import { eachDayOfInterval, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export function useBulkLiveAvailability() {
  const [liveBookedDates, setLiveBookedDates] = useState([]);
  const [isLoadingLiveAvail, setIsLoadingLiveAvail] = useState(false);

  useEffect(() => {
    async function fetchAvailability() {
      setIsLoadingLiveAvail(true);
      try {
        const res = await fetch(
          `https://kckngulhvwryekywvutn.supabase.co/functions/v1/get-live-availability`,
          // Add a short revalidation cache. Next.js App Router intercepts fetch.
          { next: { revalidate: 300 } },
        );
        const data = await res.json();

        if (data.blocked_dates) {
          // Flatten the start/end ranges into an array of individual Date objects
          const allDates = data.blocked_dates.flatMap((block) => {
            // Reformat similarly to how useDateValidation expects Bookings
            // Add retreatId matching internal logic depending on room or cabin
            return {
              retreatId: block.type === "room" ? block.roomId : block.cabinId,
              type: block.type, // 'room' or 'cabin'
              startDate: block.startDate,
              endDate: block.endDate,
              source: block.source,
            };
          });

          setLiveBookedDates(allDates);
        }
      } catch (err) {
        console.error("Failed to fetch bulk live availability", err);
      } finally {
        setIsLoadingLiveAvail(false);
      }
    }

    fetchAvailability();
  }, []);

  return { liveBookedDates, isLoadingLiveAvail };
}
