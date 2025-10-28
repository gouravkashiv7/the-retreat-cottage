import supabase from "./supabase";

export async function getBookedDatesById(id, type) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  let query;

  if (type === "room") {
    // Query bookings that have this room in booking_rooms
    query = supabase
      .from("bookings")
      .select(
        `
        id,
        startDate,
        endDate,
        status,
        guestId,
        booking_rooms!inner (
          roomId
        )
      `
      )
      .eq("booking_rooms.roomId", id)
      .or(`startDate.gte.${today},status.eq.checked-in`);
  } else if (type === "cabin") {
    // Query bookings that have this cabin in booking_cabins
    query = supabase
      .from("bookings")
      .select(
        `
        id,
        startDate,
        endDate,
        status,
        guestId,
        booking_cabins!inner (
          cabinId
        )
      `
      )
      .eq("booking_cabins.cabinId", id)
      .or(`startDate.gte.${today},status.eq.checked-in`);
  } else {
    throw new Error("Invalid type. Must be 'room' or 'cabin'");
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Bookings could not get loaded");
  }

  // If no bookings found, return empty array
  if (!data || data.length === 0) {
    return [];
  }

  // Return the booking dates with guestId
  const bookedDates = data.map((booking) => ({
    bookingId: booking.id,
    startDate: booking.startDate,
    endDate: booking.endDate,
    status: booking.status,
    guestId: booking.guestId,
  }));

  return bookedDates;
}

export async function getAllBookedDates() {
  // Get today's date in local time and set to start of day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  try {
    // Get all bookings with their associated rooms and cabins in one query
    // Exclude only "checked-out" status
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(
        `
        id,
        startDate,
        endDate,
        status,
        guestId,
        booking_rooms (
          roomId
        ),
        booking_cabins (
          cabinId
        )
      `
      )
      .gte("startDate", todayISO)
      .neq("status", "checked-out"); // Exclude only checked-out bookings

    if (error) {
      console.error("Bookings error:", error);
      throw new Error("Bookings could not get loaded");
    }

    // Transform the data
    const bookedDates = [];

    if (bookings) {
      bookings.forEach((booking) => {
        // Process room bookings
        if (booking.booking_rooms && booking.booking_rooms.length > 0) {
          booking.booking_rooms.forEach((room) => {
            bookedDates.push({
              bookingId: booking.id,
              retreatId: room.roomId,
              type: "room",
              startDate: booking.startDate,
              endDate: booking.endDate,
              status: booking.status,
              guestId: booking.guestId,
            });
          });
        }

        // Process cabin bookings
        if (booking.booking_cabins && booking.booking_cabins.length > 0) {
          booking.booking_cabins.forEach((cabin) => {
            bookedDates.push({
              bookingId: booking.id,
              retreatId: cabin.cabinId,
              type: "cabin",
              startDate: booking.startDate,
              endDate: booking.endDate,
              status: booking.status,
              guestId: booking.guestId,
            });
          });
        }
      });
    }

    return bookedDates;
  } catch (error) {
    console.error("Error loading all booked dates:", error);
    throw error;
  }
}
