"use client";

import { updateBooking } from "@/app/_lib/actions";
import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function EditReservationForm({ bookingId, initialData }) {
  const {
    numGuests,
    observations: initialObservations,
    hasBreakfast: initialHasBreakfast,
    totalPrice: initialTotalPrice,
    accommodationPrice: initialAccommodationPrice,
    extrasPrice: initialExtrasPrice,
    status,
    breakfastPrice = 225,
  } = initialData;

  const [observations, setObservations] = useState(initialObservations || "");
  const [hasBreakfast, setHasBreakfast] = useState(
    initialHasBreakfast || false
  );

  // State for calculated prices
  const [extrasPrice, setExtrasPrice] = useState(initialExtrasPrice || 0);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice || 0);
  const [accommodationPrice] = useState(initialAccommodationPrice || 0);

  // Calculate prices when breakfast selection changes
  useEffect(() => {
    const breakfastPriceValue = breakfastPrice || 225;
    const newExtrasPrice = hasBreakfast ? numGuests * breakfastPriceValue : 0;
    const newTotalPrice = accommodationPrice + newExtrasPrice;

    setExtrasPrice(newExtrasPrice);
    setTotalPrice(newTotalPrice);
  }, [hasBreakfast, numGuests, accommodationPrice, breakfastPrice]);

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "text-green-400 bg-green-400/20 border-green-400";
      case "checked-in":
        return "text-blue-400 bg-blue-400/20 border-blue-400";
      case "unconfirmed":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400";
      default:
        return "text-primary-300 bg-primary-700 border-primary-600";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "Confirmed";
      case "checked-in":
        return "Checked In";
      case "unconfirmed":
        return "Unconfirmed";
      default:
        return status || "Unknown";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-7">
        <h2 className="font-semibold text-2xl text-accent-400">
          Edit Reservation #{bookingId}
        </h2>

        {/* Status Badge */}
        <div
          className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${getStatusColor(
            status
          )}`}
        >
          {getStatusText(status)}
        </div>
      </div>

      <form
        className="bg-primary-900 py-8 px-6 sm:px-12 text-lg flex gap-6 flex-col"
        action={updateBooking}
      >
        {/* ONLY ONE SET OF HIDDEN FIELDS - NO DUPLICATES */}
        <input type="hidden" name="bookingId" value={bookingId} />
        <input
          type="hidden"
          name="accommodationPrice"
          value={accommodationPrice}
        />
        <input type="hidden" name="status" value={status} />
        <input type="hidden" name="totalPrice" value={totalPrice} />
        <input type="hidden" name="extrasPrice" value={extrasPrice} />
        <input
          type="hidden"
          name="hasBreakfast"
          value={hasBreakfast.toString()}
        />
        {/* Breakfast Option */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasBreakfast}
              onChange={(e) => setHasBreakfast(e.target.checked)}
              className="w-5 h-5 text-accent-500 bg-primary-200 border-primary-300 rounded focus:ring-accent-500 focus:ring-2"
            />
            <span className="text-primary-300">
              Add breakfast for {numGuests} guest{numGuests > 1 ? "s" : ""}?
              <span className="text-accent-400 font-semibold ml-2">
                (+₹{breakfastPrice || 225} per person)
              </span>
            </span>
          </label>
          <p className="text-sm text-primary-400">
            Includes continental breakfast with fresh fruits, pastries, and
            beverages
          </p>
        </div>
        {/* Observations - This is the only visible input field */}
        <div className="space-y-2">
          <label htmlFor="observations" className="text-primary-300">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm min-h-[100px] resize-vertical"
            placeholder="Any dietary restrictions, special requirements, or additional notes?"
          />
        </div>
        {/* Price Breakdown - Display only, not form fields */}
        <div className="bg-primary-800 rounded-lg p-6 border border-primary-700">
          <h3 className="text-accent-400 font-semibold text-xl mb-4">
            Price Breakdown
          </h3>
          <div className="space-y-3">
            {/* Original Prices (if changed) */}
            {hasBreakfast !== initialHasBreakfast && (
              <div className="bg-primary-700/50 rounded-lg p-4 mb-4">
                <h4 className="text-accent-300 font-semibold mb-2">
                  Original Prices:
                </h4>
                <div className="flex justify-between items-center text-sm text-primary-400">
                  <span>Breakfast:</span>
                  <span className="line-through">₹{initialExtrasPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-primary-400">
                  <span>Total:</span>
                  <span className="line-through">₹{initialTotalPrice}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-primary-300">Accommodation:</span>
              <span className="text-primary-100 font-semibold">
                ₹{accommodationPrice}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-primary-300">
                Breakfast ({numGuests} guest{numGuests > 1 ? "s" : ""}):
              </span>
              <span className="text-primary-100 font-semibold">
                {hasBreakfast ? `₹${extrasPrice}` : "Not selected"}
                {hasBreakfast && initialHasBreakfast !== hasBreakfast && (
                  <span className="text-accent-400 text-sm ml-2">
                    (updated)
                  </span>
                )}
              </span>
            </div>

            <div className="border-t border-primary-600 pt-3 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-accent-400 font-semibold text-lg">
                  Total Price:
                </span>
                <span className="text-accent-400 font-bold text-xl">
                  ₹{totalPrice}
                  {initialTotalPrice !== totalPrice && (
                    <span className="text-sm ml-2 text-green-400">
                      (updated)
                    </span>
                  )}
                </span>
              </div>
              {hasBreakfast && (
                <p className="text-sm text-primary-400 mt-2 text-right">
                  Includes ₹{extrasPrice} for breakfast
                </p>
              )}
            </div>
          </div>
        </div>
        <Button />
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded-lg"
    >
      {pending ? "Updating ..." : "Update reservation"}
    </button>
  );
}
