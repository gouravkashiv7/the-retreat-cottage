"use client";
import { differenceInDays, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { useReservation } from "./contexts/ReservationContext";

function isAlreadyBooked(range, bookedDates) {
  if (!range?.from || !range?.to) return false;

  return bookedDates.some((booking) => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);

    // Subtract one day from the end date to make it bookable
    const adjustedEndDate = new Date(bookingEnd);
    adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

    // Check if the ranges overlap
    const overlap = range.from <= adjustedEndDate && range.to >= bookingStart;

    return overlap;
  });
}

function DateSelector({ settings, retreat, bookedDates, type }) {
  const { numGuests } = useReservation();
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  useEffect(() => {
    // This runs only on client side after hydration
    setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);

    const handleResize = () => {
      setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (range) => {
    // Allow clearing selection
    if (!range) {
      setRange(range);
      return;
    }

    // If only one date is selected, allow it (waiting for second date)
    if (range.from && !range.to) {
      setRange(range);
      return;
    }

    // When both dates are selected, validate the range
    if (range.from && range.to) {
      // Check if the range includes any disabled dates
      const includesDisabledDates = bookedDates.some((booking) => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);

        // Subtract one day from the end date to make it bookable
        const adjustedEndDate = new Date(bookingEnd);
        adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

        // Check if the booking period overlaps with selected range
        const overlap =
          range.from <= adjustedEndDate && range.to >= bookingStart;

        return overlap;
      });

      if (includesDisabledDates) {
        // Completely reject this selection and reset
        resetRange();
        return;
      }

      // If valid, set the range
      setRange(range);
    }
  };

  console.log(bookedDates);
  const { regularPrice, discount: discountPercentage } = retreat;
  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  const discount = Math.round((regularPrice * discountPercentage) / 100);

  // SETTINGS
  const { minBookingLength, maxBookingLength, extraGuestPrice } = settings;

  // Calculate base cabin price (for 1-2 guests)
  let baseCabinPrice = numNights * (regularPrice - discount);

  // Calculate extra guest charges for cabin type
  const isCabin = type === "cabin";
  const maxGuestsIncluded = 2; // Base price includes only 1-2 guests
  const extraGuests = Math.max(0, numGuests - maxGuestsIncluded); // 3rd guest and beyond
  const extraGuestTotal = isCabin
    ? extraGuests * extraGuestPrice * numNights
    : 0;
  const hasExtraGuests = isCabin && numGuests > maxGuestsIncluded;

  // Total price including extra guest charges
  const totalPrice = baseCabinPrice + extraGuestTotal;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 md:pt-12 place-self-center"
        mode="range"
        min={minBookingLength}
        max={maxBookingLength}
        onSelect={handleSelect}
        selected={displayRange}
        startMonth={new Date()}
        endMonth={new Date(2026, 11)}
        disabled={[
          { before: new Date() },
          // When start date is selected, disable dates before it
          ...(range?.from ? [{ before: range.from }] : []),
          ...bookedDates.map((booking) => {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);

            // Subtract one day from the end date to make it bookable
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

            return {
              from: startDate,
              to: adjustedEndDate,
            };
          }),
        ]}
        captionLayout="dropdown"
        numberOfMonths={numberOfMonths}
        style={{
          "--rdp-day-height": "47px",
          "--rdp-day-width": "42px",
          "--rdp-accent-color": "rgb(236 201 140)", // Your accent-500 color
        }}
        modifiersClassNames={{
          selected: "bg-accent-500 text-primary-800 font-semibold",
          today: "font-bold border border-accent-400",
          range_start: "rounded-l-full bg-accent-600",
          range_end: "rounded-r-full bg-accent-600",
          range_middle: "bg-accent-400/30",
        }}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 py-4 md:px-3 md:py-1 md:h-full sm:py-0 sm:h-[72px] gap-4 sm:gap-0">
        <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 justify-center sm:justify-start">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ₹{regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700 text-sm sm:text-base">
                  ₹{regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">₹{regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night (1-2 guests)</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl rounded-lg">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              {/* Show extra guest charges if applicable */}
              {hasExtraGuests && extraGuestTotal > 0 && (
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">
                    + ₹{extraGuestPrice}/night × {extraGuests} extra guest(s)
                  </p>
                  <p className="text-sm">Extra guests: ₹{extraGuestTotal}</p>
                </div>
              )}

              <p className="text-center sm:text-left">
                <span className="text-base sm:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">
                  ₹{totalPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {/* Show guest pricing info for cabin type */}
        {isCabin && numGuests > 0 && (
          <div className="w-full sm:w-auto text-center">
            <p className="text-sm font-semibold text-primary-700">
              {numGuests <= 2 ? (
                <span className="bg-green-100 px-3 py-1 rounded">
                  Base price includes {numGuests} guest(s)
                </span>
              ) : (
                <span className="bg-accent-600 px-3 py-1 rounded">
                  {numGuests - 2} extra guest(s) × ₹{extraGuestPrice}/night
                </span>
              )}
            </p>
          </div>
        )}

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold rounded-lg hover:bg-accent-600 transition-colors w-full sm:w-auto"
            onClick={() => resetRange()}
          >
            Clear Dates
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
