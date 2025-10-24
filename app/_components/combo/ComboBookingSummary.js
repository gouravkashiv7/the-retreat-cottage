import Link from "next/link";

export default function ComboBookingSummary({
  guestCount,
  retreatCount,
  totalCapacity,
  pricing,
  comboId,
}) {
  const {
    totalPrice,
    totalOriginalPrice,
    hasDiscount,
    fullCapacityCabins,
    extraGuestPremium,
  } = pricing;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Booking Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Guests</span>
          <span className="font-semibold text-gray-500">
            {guestCount} guests
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Number of Retreats</span>
          <span className="font-semibold text-gray-500">{retreatCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Capacity</span>
          <span className="font-semibold text-gray-500">
            {totalCapacity} guests
          </span>
        </div>
        {fullCapacityCabins > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Extra guest premium ({fullCapacityCabins} cabin
              {fullCapacityCabins > 1 ? "s" : ""})
            </span>
            <span className="font-semibold text-accent-600">
              +₹{extraGuestPremium}
            </span>
          </div>
        )}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-800 font-semibold">Total Price</span>
            <div className="text-right">
              {hasDiscount ? (
                <>
                  <p className="text-xl font-bold text-accent-600">
                    ₹{totalPrice}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ₹{totalOriginalPrice}
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-accent-600">
                  ₹{totalPrice}
                </p>
              )}
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-accent-500 hover:bg-accent-600 text-primary-800 py-3 px-6 rounded-lg font-semibold transition-all text-lg">
        Proceed to Booking
      </button>

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
