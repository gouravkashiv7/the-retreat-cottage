"use client";

import { useState } from "react";
import { useReservation } from "../../contexts/ReservationContext";

export function useComboBooking(retreats, pricing, comboId, extraGuestPrice) {
  const [specialRequirements, setSpecialRequirements] = useState("");
  const { range, resetRange } = useReservation();

  // Calculate number of nights
  const calculateNights = () => {
    if (!range?.from || !range?.to) return 0;
    const startDate = new Date(range.from);
    const endDate = new Date(range.to);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const numNights = calculateNights();

  // Prepare combo data for form submission
  const comboData = retreats.map((retreat) => {
    const bookingPrice =
      retreat.regularPrice -
      Math.round((retreat.regularPrice * retreat.discount) / 100);

    return {
      id: retreat.id,
      type: retreat.type,
      ...(retreat.type === "cabin" && { isFull: retreat.isFull }),
      bookingPrice: bookingPrice,
    };
  });

  // Format dates for input fields
  const formatDateForInput = (date) => {
    if (!date) return "";

    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    }

    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return "";
  };

  const formattedCheckIn = formatDateForInput(range?.from);
  const formattedCheckOut = formatDateForInput(range?.to);

  const canConfirmBooking = range?.from && range?.to;

  return {
    specialRequirements,
    setSpecialRequirements,
    range,
    resetRange,
    numNights,
    comboData,
    formattedCheckIn,
    formattedCheckOut,
    canConfirmBooking,
    pricing: {
      ...pricing,
      totalPriceForStay: pricing.totalPrice * numNights,
      totalOriginalPriceForStay: pricing.totalOriginalPrice * numNights,
    },
  };
}
