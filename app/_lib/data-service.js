import { supabase, supabaseAdmin } from "./supabase";
import { notFound } from "next/navigation";

// Utility function to add delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//GET

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
export async function getRoomPrice(id) {
  const { data, error } = await supabase
    .from("rooms")
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
  // Use admin client to ensure we can find the guest during auth process
  const { data, error } = await supabaseAdmin
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getAdminUser(email = "admin@retreatcottage.in") {
  // Use the Auth Admin API to fetch users from the auth schema
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching auth users:", error.message || error);
    return null;
  }

  const admin = users?.find((u) => u.email === email);

  if (!admin) {
    console.warn(`No user found in auth schema with email: ${email}`);
    return null;
  }

  // Profile details are split into two metadata fields in this project:
  // Name & Image: Stored in user_metadata
  // Role: Stored in app_metadata
  return {
    fullName: admin.user_metadata?.fullName || "Gourav Kashiv",
    email: admin.email,
    image: admin.user_metadata?.avatar || null,
    role: admin.app_metadata?.role || "Owner & Admin",
  };
}

export async function getBooking(id) {
  if (!id) throw new Error("Invalid Id!");
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Booking could not get loaded");

  return data;
}

export async function getBookings(guestId) {
  const { data, error } = await supabaseAdmin
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
    `,
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

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountry(name) {
  try {
    const res = await fetch(
      `https://restcountries.com/v2/name/${name}?fields=name,flag`,
    );
    const country = await res.json();
    return country[0];
  } catch {
    throw new Error("Could not fetch country data");
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

// MENU & ORDERS

export async function getMenu() {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true });

  if (error) {
    console.error("Error fetching menu:", error);
    throw new Error("Menu could not be loaded");
  }

  return data;
}

export async function getCheckedInBooking(guestId) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("id, startDate, endDate, numNights, numGuests, totalPrice, status")
    .eq("guestId", guestId)
    .eq("status", "checked-in")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching checked-in booking:", error);
    return null;
  }

  return data;
}

export async function getCheckedOutBookings(guestId) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select(
      `id, startDate, endDate, numNights, numGuests, totalPrice, status,
       booking_cabins ( bookingCabinPrice, cabins ( name ) ),
       booking_rooms  ( bookingRoomPrice,  rooms  ( name ) )`,
    )
    .eq("guestId", guestId)
    .eq("status", "checked-out")
    .order("endDate", { ascending: false });

  if (error) {
    console.error("Error fetching checked-out bookings:", error);
    throw new Error("Receipts could not be loaded");
  }

  return data || [];
}

export async function getOrdersForBooking(bookingId) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `id, totalPrice, orderTime, status,
       order_items ( quantity, unitPrice, menu_items ( name ) )`,
    )
    .eq("bookingId", bookingId)
    .neq("status", "cancelled");

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data || [];
}

export async function getGuestOrders(guestId) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `id, totalPrice, orderTime, status, bookingId,
       order_items ( quantity, unitPrice, menu_items ( name ) )`,
    )
    .eq("guestId", guestId)
    .order("orderTime", { ascending: false });

  if (error) {
    console.error("Error fetching guest orders:", error);
    return [];
  }

  return data || [];
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  // Use admin client to bypass RLS for new guest registration
  const { data, error } = await supabaseAdmin.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
