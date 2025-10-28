"use client";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function DatePicker({
  range,
  onSelect,
  isDateDisabled,
  minBookingLength,
  maxBookingLength,
}) {
  const dayPickerProps = {
    mode: "range",
    min: minBookingLength,
    max: maxBookingLength,
    onSelect,
    selected: range,
    startMonth: new Date(),
    endMonth: new Date(2026, 11),
    disabled: isDateDisabled,
    captionLayout: "dropdown",
    style: {
      "--rdp-day-height": "47px",
      "--rdp-day-width": "42px",
      "--rdp-accent-color": "rgb(236 201 140)",
    },
    modifiersClassNames: {
      selected: "bg-accent-500 text-primary-800 font-semibold",
      today: "font-bold border border-accent-400",
      range_start: "rounded-l-full bg-accent-600",
      range_end: "rounded-r-full bg-accent-600",
      range_middle: "bg-accent-400/30",
    },
  };

  return (
    <>
      {/* Desktop: 2 months */}
      <DayPicker
        {...dayPickerProps}
        className="pt-6 md:pt-12 place-self-center hidden md:block"
        numberOfMonths={2}
      />

      {/* Mobile: 1 month */}
      <DayPicker
        {...dayPickerProps}
        className="pt-6 md:pt-12 place-self-center md:hidden"
        numberOfMonths={1}
      />
    </>
  );
}

export default DatePicker;
