"use server";
import { auth } from "./auth";
import { hasDateConflict, sanitizeObservations } from "./booking-helpers";
import { getBookedDatesById } from "./dates";
import { supabase, supabaseAdmin } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendBookingEmail } from "./email";

export async function createCombo(formData) {
  try {
    const session = await auth();
    if (!session) throw new Error("User must be logged in");

    const guestId = session.user.guestId;
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const bookedRetreats = JSON.parse(formData.get("bookedRetreats"));
    const comboId = formData.get("comboId");
    const extraGuestPrice = Number(formData.get("extraGuestPrice"));
    const numGuests = parseInt(formData.get("numGuests"));
    const totalPrice = Number(formData.get("totalPrice"));
    const numNights = parseInt(formData.get("numNights"));
    await validateDateAvailability(bookedRetreats, startDate, endDate, guestId);
    const newBooking = {
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      numNights,
      numGuests,
      totalPrice,
      observations: formData.get("observations"),
      extrasPrice: 0,
      accommodationPrice: totalPrice / numNights,
      guestId,
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
    };

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert([newBooking])
      .select()
      .single();

    if (error) {
      throw new Error(`Booking could not be created: ${error.message}`);
    }
    await processRetreats(data.id, bookedRetreats, extraGuestPrice);
    revalidatePath(`/combo/${comboId}`);

    // Send the booking email
    await sendBookingEmail({
      guestName: session.user.name,
      guestEmail: session.user.email,
      packageName: `Combo: ${comboId}`,
      startDate,
      endDate,
      totalPrice,
      numNights,
      numGuests,
      guestId,
      bookedItems: bookedRetreats,
    });
  } catch (error) {
    console.error("Error creating combo booking:", error);
    throw error;
  }
  return { success: true, redirect: "/retreats/thankyou" };
}

async function processRetreats(bookingId, bookedRetreats, extraGuestPrice) {
  try {
    // Separating cabins and rooms from bookedRetreats
    const cabins = bookedRetreats.filter((retreat) => retreat.type === "cabin");
    const rooms = bookedRetreats.filter((retreat) => retreat.type === "room");

    await processCabins(cabins, bookingId, extraGuestPrice);
    await processRooms(rooms, bookingId);
  } catch (error) {
    console.error("❌ Error processing retreats:", error);
    // Clean up booking if any retreat fails
    await supabaseAdmin.from("bookings").delete().eq("id", bookingId);
    throw error;
  }
}

async function processCabins(cabins, bookingId, extraGuestPrice) {
  if (cabins.length === 0) return;

  const cabinsData = cabins.map((cabin) => {
    let finalPrice = cabin.bookingPrice;

    // If cabin is full, add extra guest price
    if (cabin.isFull) {
      finalPrice += extraGuestPrice;
    }

    return {
      bookingId: bookingId,
      cabinId: cabin.id,
      bookingCabinPrice: finalPrice,
      isFull: cabin.isFull || false,
    };
  });

  const { error } = await supabaseAdmin.from("booking_cabins").insert(cabinsData);
  if (error) throw new Error(`Failed to book cabins: ${error.message}`);
}

async function processRooms(rooms, bookingId) {
  if (rooms.length === 0) return;

  const roomsData = rooms.map((room) => ({
    bookingId: bookingId,
    roomId: room.id,
    bookingRoomPrice: room.bookingPrice,
  }));

  const { error } = await supabaseAdmin.from("booking_rooms").insert(roomsData);
  if (error) throw new Error(`Failed to book rooms: ${error.message}`);
}

async function validateDateAvailability(
  bookedRetreats,
  startDate,
  endDate,
  currentGuestId,
) {
  for (const retreat of bookedRetreats) {
    const retreatId = retreat.id;
    const type = retreat.type;

    const allBookings = await getBookedDatesById(retreatId, type);

    // Filter bookings to match DateSelector logic:
    // 1. Confirmed, checked-in, or blocked bookings always count
    // 2. Unconfirmed bookings only count if they belong to the SAME guest
    const blockingBookings = allBookings.filter((booking) => {
      if (
        booking.status === "confirmed" ||
        booking.status === "checked-in" ||
        booking.status === "blocked"
      ) {
        return true;
      }

      if (booking.status === "unconfirmed" && currentGuestId) {
        return String(booking.guestId) === String(currentGuestId);
      }

      return false;
    });

    if (hasDateConflict(blockingBookings, startDate, endDate)) {
      throw new Error(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } ${retreatId} is already booked for the selected dates. Please choose different dates.`,
      );
    }
  }
}
