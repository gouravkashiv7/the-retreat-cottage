import { eachDayOfInterval, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export function useLiveAvailability(roomId, cabinId) {
  const [liveBookedDates, setLiveBookedDates] = useState([]);
  const [isLoadingLiveAvail, setIsLoadingLiveAvail] = useState(false);

  useEffect(() => {
    async function fetchAvailability() {
      if (!roomId && !cabinId) return;

      setIsLoadingLiveAvail(true);
      try {
        const queryParam = roomId ? `roomId=${roomId}` : `cabinId=${cabinId}`;
        const res = await fetch(
          `https://kckngulhvwryekywvutn.supabase.co/functions/v1/get-live-availability?${queryParam}`,
          {
            headers: {
              "Content-Type": "application/json",
              // Note: Using the anon key for client-side edge function calls
              apikey:
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja25ndWxodndyeWVreXd2dXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTI0MjQsImV4cCI6MjA3NTc2ODQyNH0.OFHoYsWTix05-0nNil2FfQi5KhB0f1mqBXz0hobyP8o",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja25ndWxodndyeWVreXd2dXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTI0MjQsImV4cCI6MjA3NTc2ODQyNH0.OFHoYsWTix05-0nNil2FfQi5KhB0f1mqBXz0hobyP8o"}`,
            },
          },
        );
        const data = await res.json();

        if (data.blocked_dates) {
          // Flatten the start/end ranges into an array of individual Date objects
          const allDates = data.blocked_dates.flatMap((block) => {
            // Include source so we can style/differentiate if needed, though for standard
            // date picker logic we just need the date object itself for comparison.
            const intervalDays = eachDayOfInterval({
              start: parseISO(block.startDate),
              end: parseISO(block.endDate),
            });

            // Reformat similarly to how useDateValidation expects Bookings
            return {
              startDate: block.startDate,
              endDate: block.endDate,
              source: block.source,
            };
          });

          setLiveBookedDates(allDates);
        }
      } catch (err) {
        console.error("Failed to fetch live availability", err);
      } finally {
        setIsLoadingLiveAvail(false);
      }
    }

    fetchAvailability();
  }, [roomId, cabinId]);

  return { liveBookedDates, isLoadingLiveAvail };
}
