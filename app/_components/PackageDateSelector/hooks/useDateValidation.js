import { useState, useCallback } from "react";
import { isSameDay } from "date-fns";
import {
  isAlreadyBooked,
  isDateDisabled as checkDateDisabled,
} from "../utils/dateValidation";

export function useDateValidation(bookedDates, range, setRange, resetRange) {
  const [validationState] = useState({});

  const handleDateSelect = useCallback(
    (selectedRange) => {
      // Allow clearing selection
      if (!selectedRange) {
        setRange(selectedRange);
        return;
      }

      // If only one date is selected, allow it (waiting for second date)
      if (selectedRange.from && !selectedRange.to) {
        setRange(selectedRange);
        return;
      }

      // When both dates are selected, validate the range
      if (selectedRange.from && selectedRange.to) {
        // Check if the range includes any disabled dates
        const includesDisabledDates = bookedDates.some((booking) => {
          const bookingStart = new Date(booking.startDate);
          const bookingEnd = new Date(booking.endDate);

          // Subtract one day from the end date to make it bookable
          const adjustedEndDate = new Date(bookingEnd);
          adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

          // Check if the booking period overlaps with selected range
          const overlap =
            selectedRange.from <= adjustedEndDate &&
            selectedRange.to >= bookingStart;

          return overlap;
        });

        if (includesDisabledDates) {
          // Check if user is selecting the closest start date
          const startDates = bookedDates.map((booking) => {
            const startDate = new Date(booking.startDate);
            startDate.setHours(0, 0, 0, 0);
            return startDate;
          });

          let closestStartDate = null;
          startDates.forEach((startDate) => {
            if (startDate > selectedRange.from) {
              if (!closestStartDate || startDate < closestStartDate) {
                closestStartDate = startDate;
              }
            }
          });

          if (
            closestStartDate &&
            isSameDay(selectedRange.to, closestStartDate)
          ) {
            // Allow this specific case - set the range automatically
            setRange({ from: selectedRange.from, to: closestStartDate });
            return;
          }

          // For any other overlap, reject the selection
          resetRange();
          return;
        }

        // If valid, set the range
        setRange(selectedRange);
      }
    },
    [bookedDates, setRange, resetRange]
  );

  const isDateDisabled = useCallback(
    (date) => {
      return checkDateDisabled(date, range, bookedDates);
    },
    [range, bookedDates]
  );

  return {
    isAlreadyBooked: (rangeToCheck) =>
      isAlreadyBooked(rangeToCheck, bookedDates),
    isDateDisabled,
    handleDateSelect,
    validationState,
  };
}
