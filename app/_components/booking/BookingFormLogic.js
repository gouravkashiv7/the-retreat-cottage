import { useMemo } from "react";

export default function useBookingFormLogic({
  range,
  numGuests,
  settings,
  pricing,
  stats,
  guestOptions,
  retreats,
  packageName,
}) {
  const { extraGuestPrice, minBookingLength, maxBookingLength } = settings;
  const {
    totalPrice: baseTotalPrice,
    totalOriginalPrice: baseTotalOriginalPrice,
    hasDiscount: baseHasDiscount,
  } = pricing;

  // Format dates for input fields
  const formatDateForInput = (date) => {
    if (!date) return "";

    // If it's already a string in the correct format, return it
    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    }

    // If it's a Date object, format it
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return "";
  };

  // Get formatted dates from context
  const checkInDate = range?.from;
  const checkOutDate = range?.to;

  const formattedCheckIn = formatDateForInput(checkInDate);
  const formattedCheckOut = formatDateForInput(checkOutDate);

  // Get guest options array
  const guestOptionsArray = useMemo(() => {
    if (guestOptions) return guestOptions;

    // Fallback: extract from stats
    const guestStat = stats.find((s) => s.label.includes("Guest"));
    const guestCount = guestStat ? parseInt(guestStat.value.split(" ")[0]) : 1;
    return Array.from({ length: guestCount }, (_, i) => i + 1);
  }, [guestOptions, stats]);

  // Validate booking length
  const bookingValidation = useMemo(() => {
    if (!checkInDate || !checkOutDate) {
      return { isValid: true, nights: 0 };
    }

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    const isValid = nights >= minBookingLength && nights <= maxBookingLength;
    const message = !isValid
      ? `Booking must be between ${minBookingLength} and ${maxBookingLength} nights`
      : "";

    return { isValid, message, nights };
  }, [checkInDate, checkOutDate, minBookingLength, maxBookingLength]);

  // Calculate dynamic pricing
  const dynamicPricing = useMemo(() => {
    if (retreats.length === 0) {
      return {
        totalPrice: baseTotalPrice,
        totalOriginalPrice: baseTotalOriginalPrice,
        hasDiscount: baseHasDiscount,
        extraGuestPremium: 0,
      };
    }

    let extraGuestPremium = 0;

    // Calculate extra guest premium for specific packages
    if (packageName.includes("First Floor") || packageName.includes("Villa")) {
      const baseCapacity = retreats.reduce((sum, retreat) => {
        return retreat.type === "cabin" || retreat.maxCapacity === 3
          ? sum + 2
          : sum + retreat.maxCapacity;
      }, 0);

      const extraGuests = Math.max(0, numGuests - baseCapacity);
      extraGuestPremium = extraGuests * extraGuestPrice;
    }

    const totalPrice = baseTotalPrice + extraGuestPremium;
    const totalOriginalPrice = baseTotalOriginalPrice + extraGuestPremium;
    const hasDiscount = totalPrice < totalOriginalPrice;

    return {
      totalPrice,
      totalOriginalPrice,
      hasDiscount,
      extraGuestPremium,
    };
  }, [
    numGuests,
    baseTotalPrice,
    baseTotalOriginalPrice,
    baseHasDiscount,
    retreats,
    packageName,
    extraGuestPrice,
  ]);

  // Prepare display stats
  const displayStats = useMemo(() => {
    const updatedStats = stats.map((stat) =>
      stat.label.includes("Guest")
        ? { ...stat, value: `${numGuests} guests` }
        : stat
    );

    // Add nights info if we have valid dates
    if (bookingValidation.isValid && bookingValidation.nights > 0) {
      updatedStats.push({
        label: "Nights",
        value: `${bookingValidation.nights} nights`,
      });
    }

    return updatedStats;
  }, [stats, numGuests, bookingValidation]);

  // Check if booking can be confirmed
  const canConfirmBooking =
    bookingValidation.isValid && checkInDate && checkOutDate;

  return {
    formattedCheckIn,
    formattedCheckOut,
    guestOptionsArray,
    bookingValidation,
    dynamicPricing,
    displayStats,
    canConfirmBooking,
  };
}
