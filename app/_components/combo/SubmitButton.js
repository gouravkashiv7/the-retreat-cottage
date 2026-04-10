"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";

export default function SubmitButton({
  canConfirmBooking,
  guestCount,
  retreatCount,
  onClick,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full py-5 px-8 rounded-2xl font-black transition-all text-lg overflow-hidden group shadow-2xl ${
        canConfirmBooking
          ? "cursor-pointer active:scale-[0.98] shadow-accent-500/10"
          : "cursor-not-allowed opacity-40 shadow-none border border-primary-800"
      }`}
      disabled={!canConfirmBooking}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          canConfirmBooking
            ? "bg-linear-to-r from-accent-600 via-accent-400 to-accent-600 bg-size-[200%_auto] group-hover:bg-size-[100%_auto]"
            : "bg-primary-800"
        }`}
      ></div>

      {/* Content */}
      <div
        className={`relative flex items-center justify-center gap-3 ${
          canConfirmBooking ? "text-primary-950" : "text-primary-500"
        }`}
      >
        <span>
          {pending
            ? `Submitting Request...`
            : `Request Stay for ${guestCount} Guests`}
        </span>
        <ArrowRight className={`w-5 h-5 ${canConfirmBooking ? 'group-hover:translate-x-1.5' : ''} transition-transform`} />
      </div>
    </button>
  );
}
