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
      className={`relative w-full py-4 px-6 rounded-xl font-bold transition-all text-lg overflow-hidden group ${
        canConfirmBooking && !pending
          ? "cursor-pointer active:scale-[0.98]"
          : "cursor-not-allowed opacity-50"
      }`}
      disabled={!canConfirmBooking || pending}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          canConfirmBooking && !pending
            ? "bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600 bg-[length:200%_auto] group-hover:bg-[100%_auto]"
            : "bg-primary-800"
        }`}
      ></div>

      {/* Shine effect */}
      {canConfirmBooking && !pending && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white/20 skew-x-12 translate-x-full group-hover:translate-x-[-100%] duration-1000 ease-in-out pointer-events-none"></div>
      )}

      {/* Text layer */}
      <div
        className={`relative flex items-center justify-center gap-3 ${
          canConfirmBooking && !pending
            ? "text-primary-950"
            : "text-primary-500"
        }`}
      >
        {pending ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-950/30 border-t-primary-950 rounded-full animate-spin" />
            <span>Reserving...</span>
          </>
        ) : (
          <span>Confirm {packageName} Booking</span>
        )}
      </div>
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

  // Scroll to calendar function
  const scrollToCalendar = () => {
    const calendar = document.getElementById("booking-calendar");
    if (calendar) {
      calendar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Display-Only Form Section */}
      <div className="space-y-6">
        {/* Read-only Date Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
              Check-in
            </label>
            {formattedCheckIn ? (
              <div className="w-full p-3 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium cursor-default">
                {formattedCheckIn}
              </div>
            ) : (
              <button
                onClick={scrollToCalendar}
                type="button"
                className="w-full p-3 border border-accent-500/40 rounded-xl bg-accent-500/10 text-accent-400 font-bold text-sm flex items-center justify-center gap-2 animate-pulse shadow-[0_0_15px_rgba(236,201,140,0.1)] hover:bg-accent-500/20 transition-all active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Select
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
              Check-out
            </label>
            {formattedCheckOut ? (
              <div className="w-full p-3 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium cursor-default">
                {formattedCheckOut}
              </div>
            ) : (
              <button
                onClick={scrollToCalendar}
                type="button"
                className="w-full p-3 border border-accent-500/40 rounded-xl bg-accent-500/10 text-accent-400 font-bold text-sm flex items-center justify-center gap-2 animate-pulse shadow-[0_0_15px_rgba(236,201,140,0.1)] hover:bg-accent-500/20 transition-all active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Select
              </button>
            )}
          </div>
        </div>

        {/* Editable Guest Count */}
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
            Number of Guests
          </label>
          <div className="relative group/select">
            <select
              value={numGuests}
              onChange={(e) => updateGuests(parseInt(e.target.value))}
              className="w-full p-3 pr-10 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium appearance-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all cursor-pointer group-hover/select:border-accent-400/40"
            >
              {guestOptionsArray.map((option) => (
                <option key={option} value={option} className="bg-primary-900">
                  {option} {option === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-accent-500/60 group-hover/select:text-accent-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {(packageName.includes("First Floor") ||
            packageName.includes("Villa")) && (
            <p className="text-[10px] text-accent-400/80 mt-2 px-1 italic">
              * Extra guests beyond base capacity add ₹
              {settings.extraGuestPrice} / night
            </p>
          )}
        </div>

        {/* Contact Number (if missing) */}
        {!guest?.phone && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <label className="block text-xs uppercase tracking-widest font-bold text-accent-400 mb-2 px-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                required
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                className="w-full p-3 border border-accent-500/30 rounded-xl bg-accent-500/5 text-primary-100 font-medium placeholder:text-primary-600 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all shadow-[0_0_10px_rgba(236,201,140,0.05)]"
              />
              <p className="text-[10px] text-primary-400 mt-1.5 px-1 italic">
                We need this to coordinate your stay and send payment details.
              </p>
            </div>
          </div>
        )}

        {/* Special Requirements */}
        {showSpecialRequirements && (
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-primary-400 mb-2 px-1">
              Special Requirements
            </label>
            <textarea
              name="observations"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="Any dietary preferences, early check-in requests, or special occasions?"
              className="w-full p-3 border border-accent-400/20 rounded-xl bg-primary-800/40 text-primary-100 font-medium placeholder:text-primary-600 focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 transition-all min-h-[100px] resize-none"
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
        className="mt-8 pt-6 border-t border-accent-400/10"
      >
        {/* Hidden Inputs for Form Data */}
        <input
          type="hidden"
          name="startDate"
          value={range?.from?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={range?.to?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="numNights"
          value={bookingValidation.nights}
        />
        <input type="hidden" name="numGuests" value={numGuests} />
        <input type="hidden" name="packageName" value={packageName} />
        <input
          type="hidden"
          name="totalPrice"
          value={dynamicPricing.totalPrice}
        />
        <input
          type="hidden"
          name="accommodationPrice"
          value={
            bookingValidation.nights > 0
              ? dynamicPricing.totalPrice / bookingValidation.nights
              : 0
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

      <div className="mt-6 text-center">
        <Link
          href={backUrl}
          className="text-primary-400 hover:text-accent-400 text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to all packages
        </Link>
      </div>
    </>
  );
}
