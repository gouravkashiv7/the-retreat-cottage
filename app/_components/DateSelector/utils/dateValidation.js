import { isSameDay } from "date-fns";

export function isAlreadyBooked(range, bookedDates) {
  if (!range?.from || !range?.to) return false;

  return bookedDates.some((booking) => {
    // Normalize all dates to beginning of day to avoid time issues
    const bookingStart = new Date(booking.startDate);
    bookingStart.setHours(0, 0, 0, 0);

    const bookingEnd = new Date(booking.endDate);
    bookingEnd.setHours(0, 0, 0, 0);

    const rangeFrom = new Date(range.from);
    rangeFrom.setHours(0, 0, 0, 0);

    const rangeTo = new Date(range.to);
    rangeTo.setHours(0, 0, 0, 0);
    console.log("IS ALREADYBOOKED");
    console.log("range", rangeFrom, rangeTo);
    console.log("Comparing With", bookingStart, bookingEnd);

    // Subtract one day from the end date to make it bookable
    const adjustedEndDate = new Date(bookingEnd);
    adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

    // Check if the ranges overlap
    const overlap = rangeFrom <= adjustedEndDate && rangeTo >= bookingStart;

    // SPECIAL CASE: Allow closest start date after range.from
    if (overlap) {
      const startDates = bookedDates.map((b) => {
        const startDate = new Date(b.startDate);
        startDate.setHours(0, 0, 0, 0);
        return startDate;
      });

      let closestStartDate = null;
      startDates.forEach((startDate) => {
        if (startDate > rangeFrom) {
          if (!closestStartDate || startDate < closestStartDate) {
            closestStartDate = startDate;
          }
        }
      });

      if (closestStartDate && isSameDay(rangeTo, closestStartDate)) {
        return false; // Don't count this as booked
      }

      return true; // Overlap confirmed
    }

    return false; // No overlap
  });
}

export function isDateDisabled(date, range, bookedDates) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Disable dates before today
  if (date < today) return true;

  // Disable dates before selected start date
  if (range?.from && date < range.from) return true;

  // Check if date is in any booked range
  const isInBookedRange = bookedDates.some((booking) => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);

    // Create a proper date object for comparison
    const bookingStartDate = new Date(bookingStart);
    bookingStartDate.setHours(0, 0, 0, 0);

    const bookingEndDate = new Date(booking.endDate);
    bookingEndDate.setHours(0, 0, 0, 0);

    // Subtract one day from the end date to make it bookable
    const adjustedEndDate = new Date(bookingEndDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

    // Create a clean date for comparison
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate >= bookingStartDate && compareDate <= adjustedEndDate;
  });

  // SPECIAL CASE: Find and enable the closest start date after the selected date
  if (range?.from && isInBookedRange) {
    const dateClean = new Date(date);
    dateClean.setHours(0, 0, 0, 0);

    // Extract all start dates from bookedDates
    const startDates = bookedDates.map((booking) => {
      const startDate = new Date(booking.startDate);
      startDate.setHours(0, 0, 0, 0);
      return startDate;
    });

    // Find the closest start date that comes after the selected range.from
    let closestStartDate = null;

    startDates.forEach((startDate) => {
      if (startDate > range.from) {
        if (!closestStartDate || startDate < closestStartDate) {
          closestStartDate = startDate;
        }
      }
    });

    // If this date is the closest start date we found, enable it
    if (closestStartDate && isSameDay(dateClean, closestStartDate)) {
      return false; // Enable this specific date
    }
  }

  return isInBookedRange;
}
