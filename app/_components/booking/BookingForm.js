"use client";

import { useEffect, useState } from "react";
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
}) {
  // Get reservation data from context (read-only)
  const { range, numGuests, updateGuests, resetRange } = useReservation();

  // Local state for special requirements only
  const [specialRequirements, setSpecialRequirements] = useState("");

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
    packageName,
  });

  useEffect(() => {
    if (guestOptionsArray.length > 0) {
      updateGuests(guestOptionsArray[0]);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Booking Summary
      </h3>

      {/* Pricing & Details Section */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Package</span>
          <span className="font-semibold text-gray-800">{packageName}</span>
        </div>

        {displayStats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{stat.label}</span>
            <span className="font-semibold text-gray-800">{stat.value}</span>
          </div>
        ))}

        {/* Extra Guest Premium */}
        {dynamicPricing.extraGuestPremium > 0 && (
          <div className="flex justify-between items-center text-sm bg-accent-50 p-2 rounded">
            <span className="text-gray-700 font-medium">
              Extra guest premium
            </span>
            <span className="font-semibold text-accent-600">
              +₹{dynamicPricing.extraGuestPremium}
            </span>
          </div>
        )}

        {/* Booking Validation Error */}
        {!bookingValidation.isValid && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm font-medium">
              {bookingValidation.message}
            </p>
          </div>
        )}

        {/* Total Price */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-800 font-semibold">Total Price</span>
            <div className="text-right">
              {dynamicPricing.hasDiscount ? (
                <>
                  <p className="text-xl font-bold text-accent-600">
                    ₹{dynamicPricing.totalPrice}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ₹{dynamicPricing.totalOriginalPrice}
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-accent-600">
                  ₹{dynamicPricing.totalPrice}
                </p>
              )}
              <p className="text-xs text-gray-500">per night</p>
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
      />
    </div>
  );
}
