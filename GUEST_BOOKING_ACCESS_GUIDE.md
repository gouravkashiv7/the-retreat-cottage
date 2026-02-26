# Guest Booking Access Integration Guide

This guide explains how guests can retrieve and view their booking details using their Booking ID.

## 1. Retrieving a Booking

To allow guests to access their details, they should provide their **Booking ID**. You can then query the `bookings` table.

### Example Query (Javascript)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

async function getBookingDetails(bookingId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      startDate,
      endDate,
      numNights,
      numGuests,
      totalPrice,
      status,
      guests:guestId (
        fullName,
        email
      ),
      booking_rooms (
        rooms (name)
      ),
      booking_cabins (
        cabins (name)
      )
    `,
    )
    .eq("id", bookingId)
    .single();

  if (error) throw new Error("Booking not found");
  return data;
}
```

## 2. Displaying Information

When displaying booking information, it is important to handle the accommodation names correctly as they can come from either the `rooms` or `cabins` table.

### Helper Function for Accommodation Name

```javascript
function getAccommodationName(booking) {
  const roomName = booking.booking_rooms?.[0]?.rooms?.name;
  const cabinName = booking.booking_cabins?.[0]?.cabins?.name;
  return roomName || cabinName || "N/A";
}
```

## 3. Booking Statuses

- `unconfirmed`: Pending verification or payment.
- `confirmed`: Booking is finalized.
- `checked-in`: Guest has arrived.
- `checked-out`: Guest has departed.
- `cancelled`: Booking is no longer valid.
