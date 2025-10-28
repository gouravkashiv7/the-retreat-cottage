"use client";
import { useReservation } from "../contexts/ReservationContext";
import DatePicker from "./DatePicker";
import { useDateValidation } from "./hooks/useDateValidation";

function PackageDateSelector({ settings, retreats, bookedDates, guestId }) {
  // Get all retreat IDs from retreat[] object
  const retreatIds = retreats?.map((retreatItem) => retreatItem.id) || [];

  // Create packBookedDates where bookedDates[].retreatId includes retreat IDs
  const packBookedDates = bookedDates.filter((booking) => {
    const includesRetreatId = retreatIds.includes(booking.retreatId);
    return includesRetreatId;
  });

  const { range, setRange, resetRange } = useReservation();

  // Filter bookedDates based on status and guest
  const filteredBookedDates = packBookedDates.filter((booking) => {
    // Always include confirmed and checked-in bookings
    if (booking.status === "confirmed" || booking.status === "checked-in") {
      return true;
    }

    // For unconfirmed bookings, only include if it's the same guest
    if (booking.status === "unconfirmed" && guestId) {
      return booking.guestId === guestId;
    }

    // Exclude all other cases
    return false;
  });

  // Create new bookedDates object with only startDate and endDate
  const formattedBookedDates = filteredBookedDates.map((booking) => ({
    startDate: booking.startDate,
    endDate: booking.endDate,
  }));

  const { isAlreadyBooked, isDateDisabled, handleDateSelect } =
    useDateValidation(formattedBookedDates, range, setRange, resetRange);

  const displayRange = isAlreadyBooked(range, formattedBookedDates)
    ? {}
    : range;

  // Function to check if a package is available for the selected dates
  const isPackageAvailable = (retreats) => {
    if (!range?.from || !range?.to) return true;
    if (!retreats || retreats.length === 0) return true;

    const selectedStart = new Date(range.from);
    const selectedEnd = new Date(range.to);

    return retreats.every((retreat) => {
      const retreatBookedDates = bookedDates.filter(
        (booking) =>
          booking.retreatId === retreat.id && booking.type === retreat.type
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
    // First check the original date validation
    if (isDateDisabled(date)) {
      return true;
    }

    // If we have package retreats and a range is being selected, check package availability
    if (retreats && retreats.length > 0 && range?.from) {
      // This is a simplified check - you might want to enhance this
      // to show package availability during date selection
      return false; // Let the full range selection determine availability
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

      {/* Package Availability Status */}
      {retreats && range?.from && range?.to && (
        <div
          className={`mt-3 p-3 rounded-lg text-sm font-medium ${
            packageAvailable
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {packageAvailable
            ? "✓ Package is available for selected dates"
            : "✗ Package is not available for selected dates"}
        </div>
      )}

      {/* Optional: Show clear dates button */}
      {range?.from || range?.to ? (
        <button
          className="mt-4 border border-primary-800 py-2 px-4 text-sm font-semibold rounded-lg hover:bg-accent-600 transition-colors w-full"
          onClick={resetRange}
        >
          Clear Dates
        </button>
      ) : null}
    </div>
  );
}

export default PackageDateSelector;
