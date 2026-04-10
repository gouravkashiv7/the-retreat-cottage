"use client";
import { useReservation } from "../contexts/ReservationContext";
import DatePicker from "./DatePicker";
import { useDateValidation } from "./hooks/useDateValidation";

function PackageDateSelector({ settings, retreats, bookedDates, guestId }) {
  const { range, setRange, resetRange } = useReservation();
  // Get all retreat IDs from retreat[] object
  const retreatIds = retreats?.map((retreatItem) => retreatItem.id) || [];

  // Filter bookedDates based on status and guest
  const combinedBookedDates = bookedDates
    .filter((booking) => {
      // 1. Ensure this booking actually belongs to one of our package units
      const isPackageUnit = retreatIds.includes(booking.retreatId);
      if (!isPackageUnit) return false;

      // 2. Include confirmed, checked-in, or admin blocked bookings
      // (Live external OTA bookings are also tagged with 'confirmed')
      if (
        booking.status === "confirmed" ||
        booking.status === "checked-in" ||
        booking.status === "blocked"
      ) {
        return true;
      }

      // 3. For unconfirmed bookings, only include if it's the same guest
      if (booking.status === "unconfirmed" && guestId) {
        return booking.guestId === guestId;
      }

      return false;
    })
    .map((booking) => ({
      startDate: booking.startDate,
      endDate: booking.endDate,
    }));

  const { isAlreadyBooked, isDateDisabled, handleDateSelect } =
    useDateValidation(combinedBookedDates, range, setRange, resetRange);

  const displayRange = isAlreadyBooked(range, combinedBookedDates) ? {} : range;

  // Function to check if a package is available for the selected dates
  const isPackageAvailable = (retreats) => {
    if (!range?.from || !range?.to) return true;
    if (!retreats || retreats.length === 0) return true;

    const selectedStart = new Date(range.from);
    const selectedEnd = new Date(range.to);

    return retreats.every((retreat) => {
      const retreatBookedDates = bookedDates.filter(
        (booking) =>
          booking.retreatId === retreat.id && booking.type === retreat.type,
      );

      const relevantBookings = retreatBookedDates.filter((booking) => {
        if (booking.status === "confirmed" || booking.status === "checked-in") {
          return true;
        }
        if (booking.status === "unconfirmed" && guestId) {
          return booking.guestId === guestId;
        }
        return false;
      });

      return !relevantBookings.some((booking) => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
        return selectedStart < bookingEnd && selectedEnd > bookingStart;
      });
    });
  };

  // Enhanced date disabled function that includes package availability
  const enhancedIsDateDisabled = (date) => {
    // 1. First check the basic date validation (booked nights, past dates, etc)
    if (isDateDisabled(date)) {
      return true;
    }

    // 2. If we have a start date selected, we must ensure the user doesn't select 
    // an end date that jumps OVER a blocked range
    if (range?.from && !range?.to && retreats?.length > 0) {
      const compareDate = new Date(date);
      compareDate.setHours(0, 0, 0, 0);

      // Find the Earliest Conflict for ALL units after range.from
      let firstConflictDate = null;

      combinedBookedDates.forEach((booking) => {
        const bookingStart = new Date(booking.startDate);
        bookingStart.setHours(0, 0, 0, 0);

        if (bookingStart > range.from) {
          if (!firstConflictDate || bookingStart < firstConflictDate) {
            firstConflictDate = bookingStart;
          }
        }
      });

      // If a conflict exists, any date STRICTLY AFTER the conflict start is disabled.
      // (The conflict start date itself is the LAST allowed checkout day)
      if (firstConflictDate && compareDate > firstConflictDate) {
        return true;
      }
    }

    return false;
  };

  // Check package availability for the current range
  const packageAvailable = retreats ? isPackageAvailable(retreats) : true;

  return (
    <div className="flex flex-col justify-between">
      <DatePicker
        range={displayRange}
        onSelect={handleDateSelect}
        isDateDisabled={enhancedIsDateDisabled}
        minBookingLength={settings.minBookingLength}
        maxBookingLength={settings.maxBookingLength}
      />

      {/* Optional: Show clear dates button */}
      {range?.from || range?.to ? (
        <button
          className="mt-4 border border-gold-500/30 py-2.5 px-4 text-sm font-semibold rounded-xl text-gold-400 hover:bg-gold-500/10 transition-colors w-full flex items-center justify-center gap-2"
          onClick={resetRange}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear Dates
        </button>
      ) : null}
    </div>
  );
}

export default PackageDateSelector;
