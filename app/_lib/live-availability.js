import { getAllBookedDates, getBookedDatesById } from "./dates";
import { supabaseAdmin } from "./supabase";

/**
 * Parses iCal text data into confirmed booking event objects.
 */
function parseIcalData(icalText, property) {
  const events = [];
  const veventRegex = /BEGIN:VEVENT[\s\S]*?END:VEVENT/g;
  const todayStr = new Date().toISOString().split("T")[0];
  let match;

  while ((match = veventRegex.exec(icalText)) !== null) {
    const eventContent = match[0];

    // Support both DTSTART;VALUE=DATE:20260303 and DTSTART:20260303T120000Z formats
    const startMatch = eventContent.match(
      /DTSTART(?:;VALUE=DATE)?:?\s*(\d{4})(\d{2})(\d{2})/,
    );
    const endMatch = eventContent.match(
      /DTEND(?:;VALUE=DATE)?:?\s*(\d{4})(\d{2})(\d{2})/,
    );
    const summaryMatch = eventContent.match(/SUMMARY:(.*)/i);

    if (startMatch) {
      const formattedStart = `${startMatch[1]}-${startMatch[2]}-${startMatch[3]}`;
      const formattedEnd = endMatch
        ? `${endMatch[1]}-${endMatch[2]}-${endMatch[3]}`
        : formattedStart;

      // Identify source based on summary (Goibibo/MMT vs general external)
      const summary = summaryMatch ? summaryMatch[1].toLowerCase() : "";
      let source = "external_ota";
      if (
        summary.includes("ingoibibo") ||
        summary.includes("mmt") ||
        summary.includes("makemytrip")
      ) {
        source = "goibibo";
      }

      // Skip past events — guests can't book dates that have already passed
      if (formattedEnd >= todayStr) {
        events.push({
          bookingId: `external-${property.type}-${property.id}-${formattedStart}-${Math.random().toString(36).substr(2, 5)}`,
          retreatId: property.id,
          type: property.type,
          startDate: formattedStart,
          endDate: formattedEnd,
          status: "confirmed",
          guestId: null,
          source: source,
          isExternal: true, // Tag as external
        });
      }
    }
  }

  return events;
}

/**
 * Fetches a single external iCal URL via the Supabase proxy Edge Function.
 */
async function fetchProxiedIcal(property) {
  try {
    const proxyUrl =
      "https://kckngulhvwryekywvutn.supabase.co/functions/v1/fetch-retreat-calendar";

    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_KEY || "",
        Authorization: `Bearer ${process.env.SUPABASE_KEY || ""}`,
      },
      body: JSON.stringify({ url: property.icalUrl }),
      // Don't fully cache, OTAs update often
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.warn(
        `[fetchProxiedIcal] Proxy failed for ${property.type} #${property.id}: ${response.status}`,
      );
      return [];
    }

    const data = await response.text();
    let icalText = data;

    // The proxy might return JSON if there's an error object, or raw text if successful.
    // And sometimes base64 encoded strings
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.error) {
        throw new Error(parsedData.error);
      }
      if (parsedData.text) {
        icalText = parsedData.text;
      }
    } catch (e) {
      // If it's not JSON, it might just be the raw text calendar data
    }

    // Handle base64 encoded data URI
    if (icalText.startsWith("data:text/calendar;base64,")) {
      const base64Data = icalText.split(",")[1];
      if (typeof atob === "function") {
        icalText = atob(base64Data);
      } else {
        icalText = Buffer.from(base64Data, "base64").toString("utf8");
      }
    }

    return parseIcalData(icalText, property);
  } catch (err) {
    console.error(
      `[fetchProxiedIcal] Error fetching ${property.type} #${property.id}:`,
      err,
    );
    return [];
  }
}

/**
 * Fetches all external OTA bookings dynamically via proxy to avoid CORS/IP blocks.
 * Runs on the Next.js server.
 */
export async function getLiveExternalBookings() {
  try {
    // Get all rooms and cabins that have iCal URLs configured
    const [roomsRes, cabinsRes] = await Promise.all([
      supabaseAdmin
        .from("rooms")
        .select("id, name, icalUrl")
        .not("icalUrl", "is", null),
      supabaseAdmin
        .from("cabins")
        .select("id, name, icalUrl")
        .not("icalUrl", "is", null),
    ]);

    const propertiesToFetch = [];

    if (roomsRes.data) {
      roomsRes.data.forEach((r) => {
        if (r.icalUrl) {
          propertiesToFetch.push({
            id: r.id,
            name: r.name,
            type: "room",
            icalUrl: r.icalUrl,
          });
        }
      });
    }
    if (cabinsRes.data) {
      cabinsRes.data.forEach((c) => {
        if (c.icalUrl) {
          propertiesToFetch.push({
            id: c.id,
            name: c.name,
            type: "cabin",
            icalUrl: c.icalUrl,
          });
        }
      });
    }

    // Fetch all iCal feeds concurrently using the proxy
    const results = await Promise.all(
      propertiesToFetch.map((property) => fetchProxiedIcal(property)),
    );

    // Flatten all array results into one massive bookings array
    const allExternalBookings = results.flat();

    return allExternalBookings;
  } catch (err) {
    console.error("Error in getLiveExternalBookings:", err);
    return [];
  }
}

/**
 * Gets all booked dates by merging internal Supabase bookings
 * with live external OTA blocks fetched via the proxy.
 */
export async function getUnifiedBookedDates() {
  const [internalBookings, externalBookings] = await Promise.all([
    getAllBookedDates(),
    getLiveExternalBookings(),
  ]);

  return [...internalBookings, ...externalBookings];
}

/**
 * Gets booked dates for a single property by merging internal and external feeds.
 */
export async function getUnifiedBookedDatesById(id, type) {
  try {
    // 1. Fetch internal bookings
    const internalPromise = getBookedDatesById(id, type);

    // 2. Lookup this property to get its iCal URL
    const table = type === "room" ? "rooms" : "cabins";
    const propertyRes = await supabaseAdmin
      .from(table)
      .select("id, name, icalUrl")
      .eq("id", id)
      .single();

    let externalPromise = Promise.resolve([]);
    if (propertyRes.data?.icalUrl) {
      externalPromise = fetchProxiedIcal({
        id: propertyRes.data.id,
        name: propertyRes.data.name,
        type: type,
        icalUrl: propertyRes.data.icalUrl,
      });
    }

    const [internal, external] = await Promise.all([
      internalPromise,
      externalPromise,
    ]);

    // Format external bookings to match internal structure if needed
    // (Though parseIcalData already formats them)
    return [...internal, ...external];
  } catch (err) {
    console.error(
      `Error in getUnifiedBookedDatesById for ${type} #${id}:`,
      err,
    );
    // Fallback to just internal if anything fails
    return getBookedDatesById(id, type);
  }
}
