import { eachDayOfInterval } from "date-fns";
import supabase from "./supabase";
import { notFound } from "next/navigation";

// Utility function to add delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/////////////
// GET

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Rooms could not be loaded");
  }

  return data;
}

export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
    console.error("Error fetching cabin:", error);
  }

  return data;
}

export async function getRoom(id) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
    console.error("Error fetching room:", error);
  }

  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id) {
  if (!id) throw new Error("Invalid Id!");
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Booking could not get loaded");

  return data;
}

// export async function getBookings(guestId) {
//   const { data, error, count } = await supabase
//     .from("bookings")
//     // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
//     )
//     .eq("guestId", guestId)
//     .order("startDate");

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

export async function getBookings(guestId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id, 
      created_at, 
      startDate, 
      endDate, 
      numNights, 
      numGuests, 
      totalPrice,
      guestId,     
      status, 
      booking_cabins (
        bookingCabinPrice,
        cabins (
          id,
          name,
          image
        )
      ),
      booking_rooms (
        bookingRoomPrice,
        rooms (
          id,
          name,
          image
        )
      )
    `
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) throw new Error(`Bookings could not get loaded: ${error.message}`);

  // Transform the data to match your desired structure
  const transformedData = data?.map((booking) => {
    const cabins =
      booking.booking_cabins?.map((bc) => ({
        ...bc.cabins,
        type: "cabin",
        bookingPrice: bc.bookingCabinPrice,
      })) || [];

    const rooms =
      booking.booking_rooms?.map((br) => ({
        ...br.rooms,
        type: "room",
        bookingPrice: br.bookingRoomPrice,
      })) || [];

    const accommodations = [...cabins, ...rooms];

    // Remove the junction table data from the final object
    const { booking_cabins, booking_rooms, ...bookingData } = booking;

    return {
      ...bookingData,
      accommodations: accommodations.length > 0 ? accommodations : null,
    };
  });

  return transformedData || [];
}

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

  // Return the booking dates directly (no need to extract)
  const bookedDates = data.map((booking) => ({
    startDate: booking.startDate,
    endDate: booking.endDate,
    status: booking.status,
  }));

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
/*
/////////////
// UPDATE


export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
*/
