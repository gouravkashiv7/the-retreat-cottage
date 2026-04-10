"use client";

import Link from "next/link";
import { useComboBooking } from "./hooks/useComboBooking";
import ComboBookingInfo from "./ComboBookingInfo";
import ComboBookingForm from "./ComboBookingForm";

export default function ComboBookingSummary({
  guestCount,
  retreatCount,
  totalCapacity,
  pricing,
  comboId,
  retreats,
  showSpecialRequirements = true,
  extraGuestPrice,
  guest,
}) {
  const {
    specialRequirements,
    setSpecialRequirements,
    resetRange,
    numNights,
    comboData,
    formattedCheckIn,
    formattedCheckOut,
    canConfirmBooking,
    pricing: enhancedPricing,
  } = useComboBooking(retreats, pricing, comboId, extraGuestPrice);

   return (
    <div className="bg-primary-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-6 sm:p-8 sticky top-8 transition-all hover:shadow-accent-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-accent-500 rounded-full" />
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">
          Booking Summary
        </h3>
      </div>

      <ComboBookingInfo
        formattedCheckIn={formattedCheckIn}
        formattedCheckOut={formattedCheckOut}
        guestCount={guestCount}
        retreatCount={retreatCount}
        totalCapacity={totalCapacity}
        pricing={{ ...enhancedPricing, numNights }}
        fullCapacityCabins={pricing.fullCapacityCabins}
        extraGuestPrice={extraGuestPrice}
        showSpecialRequirements={showSpecialRequirements}
        specialRequirements={specialRequirements}
        setSpecialRequirements={setSpecialRequirements}
      />

      <ComboBookingForm
        comboId={comboId}
        formattedCheckIn={formattedCheckIn}
        formattedCheckOut={formattedCheckOut}
        numNights={numNights}
        guestCount={guestCount}
        retreatCount={retreatCount}
        totalPriceForStay={enhancedPricing.totalPriceForStay}
        specialRequirements={specialRequirements}
        comboData={comboData}
        extraGuestPrice={extraGuestPrice}
        canConfirmBooking={canConfirmBooking}
        resetRange={resetRange}
        guest={guest}
        retreats={retreats}
      />

      <div className="mt-4 text-center">
        <Link
          href="/retreats"
          className="text-accent-500 hover:text-accent-600 text-sm font-medium"
        >
          ← Back to all retreats
        </Link>
      </div>
    </div>
  );
}
