import supabase from "./supabase";
import { getAllBookedDates } from "./dates";

/**
 * Fetches bulk live availability from the external Edge Function.
 * This function runs on the server.
 */
export async function getLiveExternalBookings() {
  try {
    const res = await fetch(
      `https://kckngulhvwryekywvutn.supabase.co/functions/v1/get-live-availability`,
      // Cache the result for a short time to prevent spamming the edge function/OTAs on every single page load
      { next: { revalidate: 300 } },
    );

    if (!res.ok) {
      console.warn(
        "Failed to fetch live availability edge function. Status:",
        res.status,
      );
      return [];
    }

    const data = await res.json();

    if (!data.blocked_dates) return [];

    // Transform external blocked dates to match the internal structure exactly
    // The internal structure expects:
    // { bookingId, retreatId, type, startDate, endDate, status, guestId }
    // External doesn't have an internal guestId or bookingId, so we mock them to avoid undefined errors.
    const externalBookings = data.blocked_dates
      .filter((block) => block.source !== "internal_db") // Skip internal ones as getAllBookedDates already gets them
      .map((block, index) => {
        return {
          bookingId: `external-${index}-${Date.now()}`,
          retreatId: block.type === "room" ? block.roomId : block.cabinId,
          type: block.type, // 'room' or 'cabin'
          startDate: block.startDate,
          endDate: block.endDate,
          status: "confirmed", // Treat external blocks as confirmed
          guestId: null, // No internal guest for external OTA blocks
        };
      });

    return externalBookings;
  } catch (err) {
    console.error("Error fetching live external bookings:", err);
    return []; // Fail gracefully, just return no external blocks
  }
}

/**
 * Gets all booked dates by merging internal Supabase bookings
 * with live external OTA blocks from the Edge Function.
 */
export async function getUnifiedBookedDates() {
  const [internalBookings, externalBookings] = await Promise.all([
    getAllBookedDates(),
    getLiveExternalBookings(),
  ]);

  return [...internalBookings, ...externalBookings];
}
