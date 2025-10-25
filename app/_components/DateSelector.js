"use client";
import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { useReservation } from "./contexts/ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, retreat, bookedDates }) {
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const { range, setRange, resetRange } = useReservation();
  useEffect(() => {
    // This runs only on client side after hydration
    setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);

    const handleResize = () => {
      setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  // const { minBookingLength, maxBookingLength } = settings;
  const minBookingLength = 1,
    maxBookingLength = 90;
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 md:pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={(range) => setRange(range)}
        selected={range}
        startMonth={new Date()}
        endMonth={new Date(2026, 11)}
        disabled={{ before: new Date() }}
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

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 py-4 sm:py-0 sm:h-[72px] gap-4 sm:gap-0">
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
            <span className="text-sm sm:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-xl sm:text-2xl rounded-lg">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="text-center sm:text-left">
                <span className="text-base sm:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">
                  ₹{cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

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
