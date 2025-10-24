"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function BookingForm({
  packageName,
  pricing,
  stats,
  showSpecialRequirements = false,
  backUrl = "/retreats",
  guestOptions = null,
  retreats = [], // New prop to get the retreats for dynamic pricing
}) {
  const {
    totalPrice: baseTotalPrice,
    totalOriginalPrice: baseTotalOriginalPrice,
    hasDiscount: baseHasDiscount,
  } = pricing;

  // Get initial guest count from stats
  const initialGuestStat = stats.find((s) => s.label.includes("Guest"));
  const initialGuestCount = initialGuestStat
    ? parseInt(initialGuestStat.value.split(" ")[0])
    : 1;

  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  // Extra guest price constant
  const EXTRA_GUEST_PRICE = 800;

  // Get guest options
  const getGuestOptions = () => {
    if (guestOptions) {
      return guestOptions;
    }

    // Fallback to extracting from stats
    const guestStat = stats.find((s) => s.label.includes("Guest"));
    const guestCount = guestStat ? parseInt(guestStat.value.split(" ")[0]) : 1;
    return Array.from({ length: guestCount }, (_, i) => i + 1);
  };

  const guestOptionsArray = getGuestOptions();

  // Calculate dynamic pricing based on guest count
  const dynamicPricing = useMemo(() => {
    if (retreats.length === 0) {
      return {
        totalPrice: baseTotalPrice,
        totalOriginalPrice: baseTotalOriginalPrice,
        hasDiscount: baseHasDiscount,
        extraGuestPremium: 0,
      };
    }

    // For First Floor (cabins only) and Villa (mixed) packages
    let extraGuestPremium = 0;

    if (packageName.includes("First Floor") || packageName.includes("Villa")) {
      // Calculate how many extra guests beyond the base capacity
      const baseCapacity = retreats.reduce((sum, retreat) => {
        // For cabins, base capacity is 2, for rooms it's their max capacity
        if (retreat.type === "cabin" || retreat.maxCapacity === 3) {
          return sum + 2; // Base capacity for cabins is 2 guests
        }
        return sum + retreat.maxCapacity; // Rooms use their full capacity
      }, 0);

      const extraGuests = Math.max(0, guestCount - baseCapacity);

      // Each extra guest adds ₹800 premium
      extraGuestPremium = extraGuests * EXTRA_GUEST_PRICE;
    }

    const totalPrice = baseTotalPrice + extraGuestPremium;
    const totalOriginalPrice = baseTotalOriginalPrice + extraGuestPremium;
    const hasDiscount = totalPrice < totalOriginalPrice;

    return {
      totalPrice,
      totalOriginalPrice,
      hasDiscount,
      extraGuestPremium,
    };
  }, [
    guestCount,
    baseTotalPrice,
    baseTotalOriginalPrice,
    baseHasDiscount,
    retreats,
    packageName,
  ]);

  // Update stats with dynamic guest count
  const dynamicStats = stats.map((stat) => {
    if (stat.label.includes("Guest")) {
      return { ...stat, value: `${guestCount} guests` };
    }
    return stat;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Booking Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Package</span>
          <span className="font-semibold text-gray-800">{packageName}</span>
        </div>

        {dynamicStats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{stat.label}</span>
            <span className="font-semibold text-gray-800">{stat.value}</span>
          </div>
        ))}

        {/* Show extra guest premium if applicable */}
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

      {/* Booking Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
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
              * Extra guests (beyond base capacity) add ₹800 each
            </p>
          )}
        </div>

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

      <button className="w-full bg-accent-500 hover:bg-accent-600 text-primary-800 py-3 px-6 rounded-lg font-semibold transition-all text-lg mt-6">
        Confirm {packageName} Booking
      </button>

      <div className="mt-4 text-center">
        <Link
          href={backUrl}
          className="text-accent-500 hover:text-accent-600 text-sm font-medium"
        >
          ← Back to all packages
        </Link>
      </div>
    </div>
  );
}
