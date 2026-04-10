"use client";
import { useReservation } from "@/app/_components/contexts/ReservationContext";
import DatePicker from "./DatePicker";
import PriceDisplay from "./PriceDisplay";
import GuestInfo from "./GuestInfo";
import { useDateValidation } from "./hooks/useDateValidation";

function DateSelector({ settings, retreat, bookedDates, type, guestId }) {
  const { range, setRange, resetRange, numGuests } = useReservation();

  // The 'bookedDates' prop already contains unified data from getUnifiedBookedDatesById
  // (both internal Supabase and external OTA bookings fetched via Edge function proxy)
  const combinedBookedDates = bookedDates
    .filter((booking) => {
      // Always include confirmed, checked-in, or blocked bookings
      // (OTA bookings are tagged as 'confirmed')
      if (
        booking.status === "confirmed" ||
        booking.status === "checked-in" ||
        booking.status === "blocked"
      ) {
        return true;
      }

      // For unconfirmed bookings, only include if it's the same guest
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

  return (
    <div className="flex flex-col justify-between">
      <DatePicker
        range={displayRange}
        onSelect={handleDateSelect}
        isDateDisabled={isDateDisabled}
        minBookingLength={settings.minBookingLength}
        maxBookingLength={settings.maxBookingLength}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 py-4 md:px-3 md:py-1 md:h-full sm:py-0 sm:h-18 gap-4 sm:gap-0">
        <PriceDisplay
          range={displayRange}
          retreat={retreat}
          settings={settings}
          type={type}
          numGuests={numGuests}
        />

        <GuestInfo
          type={type}
          numGuests={numGuests}
          extraGuestPrice={settings.extraGuestPrice}
        />

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded-lg hover:bg-accent-600 transition-colors w-full sm:w-auto"
            onClick={resetRange}
          >
            Clear Dates
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
