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
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Booking Summary
      </h3>

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
