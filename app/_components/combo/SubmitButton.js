"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  canConfirmBooking,
  guestCount,
  retreatCount,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all text-lg ${
        canConfirmBooking && !pending
          ? "bg-accent-500 hover:bg-accent-600 text-primary-800 cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!canConfirmBooking}
    >
      {pending
        ? `Booking ${retreatCount} Retreats...`
        : `Confirm Booking for ${guestCount} Guests`}
    </button>
  );
}
