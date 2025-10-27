// IST Date Helpers
export function createISTDate(year, month, day, hours = 0, minutes = 0) {
  const date = new Date(year, month - 1, day, hours, minutes);
  // Since we're storing dates in IST, no conversion needed
  return date;
}

export function getCurrentIST() {
  return new Date(); // Server should be in IST timezone
}

export function formatISTDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isSameISTDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// Date and Time helpers
export function convertToISTDate(utcDate) {
  const date = new Date(utcDate);
  return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
}

export function convertToUTC(date) {
  return new Date(date.getTime() - 5.5 * 60 * 60 * 1000);
}

export function getDateWithoutTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatDateForDisplay(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Retreat ID parsing
export function parseRetreatIds(retreatId) {
  if (typeof retreatId === "string") {
    if (retreatId.startsWith("[")) {
      return JSON.parse(retreatId);
    } else if (retreatId.startsWith("{")) {
      const obj = JSON.parse(retreatId);
      return [obj.id];
    } else {
      return [parseInt(retreatId)];
    }
  } else if (Array.isArray(retreatId)) {
    return retreatId;
  } else {
    return [retreatId];
  }
}

export function getRetreatType(retreatId) {
  const id = parseInt(retreatId);
  if ([1, 2].includes(id)) return "cabin";
  if ([3, 4, 5].includes(id)) return "room";
  throw new Error(`Invalid retreat ID: ${retreatId}`);
}

export function hasDateConflict(existingBookings, newStartDate, newEndDate) {
  // Use local date strings to preserve the intended dates
  const getDateString = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD format
  };

  const newStart = getDateString(newStartDate);
  const newEnd = getDateString(newEndDate);

  return existingBookings.some((booking) => {
    const existingStart = getDateString(booking.startDate);
    const existingEnd = getDateString(booking.endDate);

    // Check for overlap using date strings
    const hasConflict = newStart < existingEnd && newEnd > existingStart;

    return hasConflict;
  });
}

export function calculateNumNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

export function isDateInPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
}

export function isValidDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
}

// Price calculation helpers
export function calculateTotalPrice(
  accommodationPrice,
  hasBreakfast = false,
  numGuests = 1,
  breakfastPrice = 0,
  extraGuestPrice = 0
) {
  let total = accommodationPrice;

  if (hasBreakfast) {
    total += breakfastPrice * numGuests;
  }

  return total;
}

export function calculatePricePerNight(totalPrice, numNights) {
  if (numNights <= 0) return 0;
  return totalPrice / numNights;
}

// Guest validation helpers
export function isValidNumGuests(numGuests, maxCapacity) {
  return numGuests > 0 && numGuests <= maxCapacity;
}

export function isCabinFull(numGuests, cabinMaxCapacity = 3) {
  return numGuests >= cabinMaxCapacity;
}

// Form data helpers
export function sanitizeObservations(observations, maxLength = 1000) {
  if (!observations) return "";
  return observations.slice(0, maxLength);
}

export function parseFormData(formData, fields) {
  const result = {};
  fields.forEach((field) => {
    result[field] = formData.get(field);
  });
  return result;
}
