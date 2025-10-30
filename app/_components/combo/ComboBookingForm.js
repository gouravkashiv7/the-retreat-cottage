"use client";

import { createCombo } from "@/app/_lib/createCombo";
import SubmitButton from "./SubmitButton";

export default function BookingForm({
  comboId,
  formattedCheckIn,
  formattedCheckOut,
  numNights,
  guestCount,
  retreatCount,
  totalPriceForStay,
  specialRequirements,
  comboData,
  extraGuestPrice,
  canConfirmBooking,
  resetRange,
}) {
  const handleFormAction = async (formData) => {
    resetRange?.();
    await createCombo(formData);
  };

  return (
    <form action={handleFormAction}>
      {/* Hidden Inputs for Form Data */}
      <input type="hidden" name="startDate" value={formattedCheckIn} />
      <input type="hidden" name="endDate" value={formattedCheckOut} />
      <input type="hidden" name="numNights" value={numNights} />
      <input type="hidden" name="numGuests" value={guestCount} />
      <input type="hidden" name="comboId" value={comboId} />
      <input type="hidden" name="totalPrice" value={totalPriceForStay} />
      <input type="hidden" name="observations" value={specialRequirements} />
      <input
        type="hidden"
        name="bookedRetreats"
        value={JSON.stringify(comboData)}
      />
      <input type="hidden" name="extraGuestPrice" value={extraGuestPrice} />

      <SubmitButton
        canConfirmBooking={canConfirmBooking}
        guestCount={guestCount}
        retreatCount={retreatCount}
      />
    </form>
  );
}
