"use server";

import { auth } from "./auth";
import { getCabinPrice, getRoomPrice, getSettings } from "./data-service";
import { hasDateConflict, sanitizeObservations } from "./booking-helpers";
import { getBookedDatesById } from "./dates";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPackageBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("User must be logged in");
  const guestId = session.user.guestId;
  try {
    // Extract form data
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const numNights = parseInt(formData.get("numNights"));
    const numGuests = parseInt(formData.get("numGuests"));
    const totalPrice = parseFloat(formData.get("totalPrice"));
    const accommodationPrice = parseFloat(formData.get("accommodationPrice"));
    const observations = sanitizeObservations(
      formData.get("observations" || "")
    );
    const retreatIdsString = formData.getAll("retreatIds");
    const packageName = formData.get("packageName");
    const retreatIds = JSON.parse(retreatIdsString);
    const { extraGuestPrice } = await getSettings();

    await validateDateAvailability(retreatIds, startDate, endDate);
    console.log("numGuests", numGuests);
    const newBooking = {
      numNights,
      startDate,
      endDate,
      guestId,
      numGuests,
      observations,
      extrasPrice: 0,
      accommodationPrice: accommodationPrice / numNights,
      totalPrice,
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
    };
    const { data, error } = await supabase
      .from("bookings")
      .insert([newBooking])
      .select()
      .single();

    if (error) {
      throw new Error(`Booking could not be created: ${error.message}`);
    }
    await processRetreats(data.id, retreatIds, numGuests, extraGuestPrice);

    // if (packageName === "First Floor") {
    //   revalidatePath(`/booking/first`);
    // }
    // if (packageName === "Ground Floor") {
    //   revalidatePath(`/booking/ground`);
    // }
    // if (packageName === "Complete Villa") {
    //   revalidatePath(`/booking/villa`);
    // }
  } catch (error) {
    console.error("❌ Error creating package booking:", error);
    //   } finally {
    //     redirect("/retreats/thankyou");
  }
}

async function processRetreats(
  bookingId,
  retreatIds,
  numGuests,
  extraGuestPrice
) {
  try {
    // Seperating cabins and rooms
    const cabins = retreatIds.filter((id) => getRetreatType(id) === "cabin");
    const rooms = retreatIds.filter((id) => getRetreatType(id) === "room");

    // Process cabins with extra guest logic
    await processCabins(cabins, bookingId, numGuests, extraGuestPrice);

    // Process rooms (no extra guest logic)
    await processRooms(rooms, bookingId);
  } catch (error) {
    console.error("❌ Error processing retreats:", error);
    // Clean up booking if any retreat fails
    await supabase.from("bookings").delete().eq("id", bookingId);
    throw error;
  }
}

async function processCabins(cabinIds, bookingId, numGuests, extraGuestPrice) {
  if (cabinIds.length === 0) return;

  const cabinsData = [];

  if (cabinIds.length === 2) {
    const [cabin1, cabin2] = cabinIds;

    // Get base prices for both cabins
    const { regularPrice: regularPrice1, discount: discountPercentage1 } =
      await getCabinPrice(cabin1);
    const { regularPrice: regularPrice2, discount: discountPercentage2 } =
      await getCabinPrice(cabin2);

    // Calculate discounted prices (corrected calculation)
    let cabin1Price =
      regularPrice1 - Math.round(regularPrice1 * (discountPercentage1 / 100));
    let cabin2Price =
      regularPrice2 - Math.round(regularPrice2 * (discountPercentage2 / 100));

    let cabin1Full = false;
    let cabin2Full = false;

    if (numGuests === 5 || numGuests === 11) {
      // Add extra guest price to first cabin only
      cabin1Price += extraGuestPrice;
      cabin1Full = true;
    } else if (numGuests === 6 || numGuests === 12) {
      cabin1Price += extraGuestPrice;
      cabin2Price += extraGuestPrice;
      cabin1Full = true;
      cabin2Full = true;
    }
    cabinsData.push(
      {
        bookingId: bookingId,
        cabinId: cabin1,
        bookingCabinPrice: cabin1Price,
        isFull: cabin1Full,
      },
      {
        bookingId: bookingId,
        cabinId: cabin2,
        bookingCabinPrice: cabin2Price,
        isFull: cabin2Full,
      }
    );
  }

  // Insert cabin data
  if (cabinsData.length > 0) {
    const { error } = await supabase.from("booking_cabins").insert(cabinsData);
    if (error) throw new Error(`Failed to book cabins: ${error.message}`);
  }
}
async function processRooms(roomIds, bookingId) {
  if (roomIds.length === 0) return;

  const roomsData = await Promise.all(
    roomIds.map(async (roomId) => {
      const { regularPrice, discount: discountPercentage } = await getRoomPrice(
        roomId
      );
      const roomPrice =
        regularPrice - Math.round(regularPrice * (discountPercentage / 100));

      return {
        bookingId: bookingId,
        roomId: roomId,
        bookingRoomPrice: roomPrice,
      };
    })
  );

  const { error } = await supabase.from("booking_rooms").insert(roomsData);
  if (error) throw new Error(`Failed to book rooms: ${error.message}`);
}

// Helper function to determine retreat type
function getRetreatType(retreatId) {
  //  cabins have IDs 1-2 and rooms have IDs 3+
  return retreatId <= 2 ? "cabin" : "room";
}

async function validateDateAvailability(retreatIds, startDate, endDate) {
  for (const retreatId of retreatIds) {
    const retreatNum = parseInt(retreatId);
    const type = getRetreatType(retreatNum);

    const existingBookings = await getBookedDatesById(retreatNum, type);

    if (hasDateConflict(existingBookings, startDate, endDate)) {
      throw new Error(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } ${retreatNum} is already booked for the selected dates. Please choose different dates.`
      );
    }
  }
}
