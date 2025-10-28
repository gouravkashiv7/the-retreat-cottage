"use client";

import Link from "next/link";
import { useReservation } from "../contexts/ReservationContext";
import { createPackageBooking } from "@/app/_lib/createPackage";
import { useFormStatus } from "react-dom";

// Separate component for the submit button
function SubmitButton({ canConfirmBooking, packageName }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all text-lg ${
        canConfirmBooking && !pending
          ? "bg-accent-500 hover:bg-accent-600 text-primary-800 cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!canConfirmBooking || pending}
    >
      {pending ? `Booking ${packageName}...` : `Confirm ${packageName} Booking`}
    </button>
  );
}

export default function BookingFormElements({
  formattedCheckIn,
  formattedCheckOut,
  numGuests,
  updateGuests,
  guestOptionsArray,
  packageName,
  settings,
  showSpecialRequirements,
  specialRequirements,
  setSpecialRequirements,
  canConfirmBooking,
  backUrl,
  retreats = [],
  dynamicPricing,
  resetRange,
}) {
  const { range } = useReservation();
  // Calculate number of nights
  const calculateNights = () => {
    if (!range?.from || !range?.to) return 0;
    const startDate = new Date(range.from);
    const endDate = new Date(range.to);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const numNights = calculateNights();

  // Prepare retreat data for form submission
  const getRetreatData = () => {
    return retreats.map((retreat) => ({
      id: retreat.id,
      type: retreat.type,
      isFull:
        retreat.type === "cabin"
          ? numGuests >= (retreat.maxCapacity || 2)
          : undefined,
    }));
  };

  const retreatData = getRetreatData();

  return (
    <>
      {/* Display-Only Form Section */}
      <div className="space-y-4">
        {/* Read-only Date Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            value={formattedCheckIn}
            disabled={true}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            value={formattedCheckOut}
            disabled={true}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Editable Guest Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <select
            value={numGuests}
            onChange={(e) => updateGuests(parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-gray-700"
          >
            {guestOptionsArray.map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          {(packageName.includes("First Floor") ||
            packageName.includes("Villa")) && (
            <p className="text-xs text-gray-600 mt-1">
              * Extra guests (beyond base capacity) add ₹
              {settings.extraGuestPrice} each
            </p>
          )}
        </div>

        {/* Special Requirements */}
        {showSpecialRequirements && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements
            </label>
            <textarea
              rows="3"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="Any special arrangements or requirements..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 resize-none text-gray-700"
            />
          </div>
        )}
      </div>

      {/* Booking Form with Form Action */}
      <form
        action={async (formData) => {
          resetRange();
          await createPackageBooking(formData);
        }}
        className="mt-6"
      >
        {/* Hidden Inputs for Form Data */}
        <input type="hidden" name="startDate" value={formattedCheckIn} />
        <input type="hidden" name="endDate" value={formattedCheckOut} />
        <input type="hidden" name="numNights" value={numNights} />
        <input type="hidden" name="numGuests" value={numGuests} />
        <input type="hidden" name="packageName" value={packageName} />
        <input
          type="hidden"
          name="totalPrice"
          value={dynamicPricing?.totalPrice || 0}
        />
        <input
          type="hidden"
          name="accommodationPrice"
          value={
            numNights > 0 ? (dynamicPricing?.totalPrice || 0) / numNights : 0
          }
        />
        <input type="hidden" name="observations" value={specialRequirements} />

        {/* Retreat Data as JSON */}
        <input
          type="hidden"
          name="retreatIds"
          value={JSON.stringify(retreatData.map((retreat) => retreat.id))}
        />

        {/* Use the separate SubmitButton component */}
        <SubmitButton
          canConfirmBooking={canConfirmBooking}
          packageName={packageName}
        />
      </form>

      <div className="mt-4 text-center">
        <Link
          href={backUrl}
          className="text-accent-500 hover:text-accent-600 text-sm font-medium"
        >
          ← Back to all packages
        </Link>
      </div>
    </>
  );
}
