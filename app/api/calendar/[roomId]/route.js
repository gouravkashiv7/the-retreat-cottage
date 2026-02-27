import { format } from "date-fns";

export async function GET(request, { params }) {
  const { roomId } = await params;

  if (!roomId) {
    return new Response("Missing roomId", { status: 400 });
  }

  try {
    // 1. Fetch live availability including internal DB and external OTAs
    const res = await fetch(
      `https://kckngulhvwryekywvutn.supabase.co/functions/v1/get-live-availability?roomId=${roomId}`,
    );
    const data = await res.json();

    if (!data.blocked_dates) {
      return new Response("No booking data available", { status: 404 });
    }

    // 2. Filter ONLY for "internal_db" source. We do not want to export OTA bookings back to OTAs
    const internalBookings = data.blocked_dates.filter(
      (block) => block.source === "internal_db",
    );

    // 3. Generate the iCal file content
    const now = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");

    let icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The Retreat Cottage//Booking System//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    internalBookings.forEach((booking, index) => {
      // iCal dates for all-day events are YYYYMMDD
      const start = format(new Date(booking.startDate), "yyyyMMdd");
      // iCal end dates for all day events are exclusive, so we add 1 day
      // But the booking.endDate is typically the checkout date anyway
      const end = format(new Date(booking.endDate), "yyyyMMdd");

      icalContent.push(
        "BEGIN:VEVENT",
        `UID:booking-${roomId}-${start}-${index}@theretreatcottage.com`,
        `DTSTAMP:${now}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        "SUMMARY:Reserved (The Retreat Cottage)",
        "STATUS:CONFIRMED",
        "END:VEVENT",
      );
    });

    icalContent.push("END:VCALENDAR");

    // 4. Return as a .ics file
    return new Response(icalContent.join("\r\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="room-${roomId}-availability.ics"`,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating iCal:", error);
    return new Response("Error generating calendar feed", { status: 500 });
  }
}
