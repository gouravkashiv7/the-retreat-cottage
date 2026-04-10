"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useReservation } from "../contexts/ReservationContext";
import BookingFormLogic from "./BookingFormLogic";
import BookingFormElements from "./BookingFormElements";

export default function BookingForm({
  packageName,
  settings,
  pricing,
  stats,
  showSpecialRequirements = false,
  backUrl = "/retreats",
  guestOptions = null,
  retreats = [],
  bookedDates = [],
  guest = null,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { range, numGuests, updateGuests, setRange, resetRange } =
    useReservation();

  // Local state for special requirements only
  const [specialRequirements, setSpecialRequirements] = useState("");

  // Sync state to URL and from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Initial sync from URL only if context is empty
    if (!range.from && !range.to) {
      const startDate = params.get("startDate");
      const endDate = params.get("endDate");
      const guests = params.get("guests");

      if (startDate || endDate) {
        setRange({
          from: startDate ? new Date(startDate) : undefined,
          to: endDate ? new Date(endDate) : undefined,
        });
      }
      if (guests) updateGuests(parseInt(guests));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (range.from)
      params.set("startDate", range.from.toISOString().split("T")[0]);
    else params.delete("startDate");

    if (range.to) params.set("endDate", range.to.toISOString().split("T")[0]);
    else params.delete("endDate");

    params.set("guests", numGuests.toString());

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [range, numGuests, pathname, router]);

  // Use the logic component
  const {
    formattedCheckIn,
    formattedCheckOut,
    guestOptionsArray,
    bookingValidation,
    dynamicPricing,
    displayStats,
    canConfirmBooking,
  } = BookingFormLogic({
    range,
    numGuests,
    settings,
    pricing,
    stats,
    guestOptions,
    retreats,
    bookedDates,
    packageName,
  });

  const hasDates = !!(range.from && range.to);

  return (
    <div className="bg-primary-900/60 backdrop-blur-md border border-accent-400/20 rounded-2xl shadow-2xl p-6 sticky top-8 transition-all hover:shadow-accent-500/10">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-accent-400 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-accent-500 rounded-full"></span>
          Booking Summary
        </h3>
        {!hasDates && (
          <div className="flex flex-col items-end animate-bounce">
            <span className="text-[10px] uppercase tracking-tighter text-accent-500 font-bold mb-1">
              Select Dates
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-accent-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Pricing & Details Section */}
      <div className="space-y-4 mb-8 relative">
        {!hasDates && (
          <div className="absolute inset-0 bg-primary-900/40 backdrop-blur-[2px] z-10 rounded-xl flex items-center justify-center border border-accent-500/10">
            <div className="text-center p-4">
              <p className="text-accent-400 font-bold text-sm uppercase tracking-widest mb-1">
                Dates Required
              </p>
              <p className="text-primary-300 text-xs">
                Select travel dates above to view final total
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center group">
          <span className="text-primary-200 font-medium group-hover:text-accent-300 transition-colors">
            Package
          </span>
          <span className="font-semibold text-white">{packageName}</span>
        </div>

        {displayStats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center group">
            <span className="text-primary-200 font-medium group-hover:text-accent-300 transition-colors">
              {stat.label}
            </span>
            <span className="font-semibold text-white">{stat.value}</span>
          </div>
        ))}

        {/* Extra Guest Premium */}
        {dynamicPricing.extraGuestPremium > 0 && (
          <div className="flex justify-between items-center text-sm bg-accent-500/10 border border-accent-500/20 p-3 rounded-xl">
            <span className="text-primary-100 font-medium flex items-center gap-1">
              <span className="w-1 h-1 bg-accent-500 rounded-full"></span>
              Extra guest premium
            </span>
            <span className="font-semibold text-accent-400 px-2 py-0.5 rounded-lg bg-accent-500/20">
              +₹{dynamicPricing.extraGuestPremium}
            </span>
          </div>
        )}

        {/* Booking Validation Error */}
        {!bookingValidation.isValid && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-pulse">
            <p className="text-red-400 text-sm font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {bookingValidation.message}
            </p>
          </div>
        )}

        {/* Total Price */}
        <div className="border-t border-accent-400/10 pt-6 mt-6">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-primary-300 text-sm font-medium mb-1">
                Total Stay Value
              </span>
              <span className="text-primary-100 font-semibold text-lg">
                Amount to pay
              </span>
            </div>
            <div className="text-right">
              {dynamicPricing.hasDiscount ? (
                <>
                  <p className="text-3xl font-black text-accent-500 drop-shadow-sm">
                    ₹{dynamicPricing.totalPrice}
                  </p>
                  <p className="text-sm text-primary-400 line-through decoration-red-500/50">
                    ₹{dynamicPricing.totalOriginalPrice}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-black text-accent-500 drop-shadow-sm">
                  ₹{dynamicPricing.totalPrice}
                </p>
              )}
              <p className="text-xs text-primary-500 uppercase tracking-widest mt-1">
                per night
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Elements Component */}
      <BookingFormElements
        formattedCheckIn={formattedCheckIn}
        formattedCheckOut={formattedCheckOut}
        numGuests={numGuests}
        updateGuests={updateGuests}
        guestOptionsArray={guestOptionsArray}
        packageName={packageName}
        settings={settings}
        showSpecialRequirements={showSpecialRequirements}
        specialRequirements={specialRequirements}
        setSpecialRequirements={setSpecialRequirements}
        canConfirmBooking={canConfirmBooking}
        backUrl={backUrl}
        retreats={retreats}
        dynamicPricing={dynamicPricing}
        bookingValidation={bookingValidation}
        resetRange={resetRange}
        guest={guest}
      />
    </div>
  );
}
