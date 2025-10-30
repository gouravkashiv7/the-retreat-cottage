export default function ComboBookingInfo({
  formattedCheckIn,
  formattedCheckOut,
  guestCount,
  retreatCount,
  totalCapacity,
  pricing,
  fullCapacityCabins,
  extraGuestPrice,
  showSpecialRequirements,
  specialRequirements,
  setSpecialRequirements,
}) {
  const {
    totalPrice,
    hasDiscount,
    totalPriceForStay,
    totalOriginalPriceForStay,
  } = pricing;

  return (
    <div className="space-y-4 mb-6">
      {/* Read-only Date Inputs */}
      {formattedCheckIn && formattedCheckOut && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              value={formattedCheckIn}
              disabled={true}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
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
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
            />
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <span className="text-gray-600">Total Guests</span>
        <span className="font-semibold text-gray-500">{guestCount} guests</span>
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
            +₹{extraGuestPrice}
          </span>
        </div>
      )}

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
            placeholder="Any special arrangements or requirements for your group..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 resize-none text-gray-700 text-sm"
          />
        </div>
      )}

      <PriceSummary
        totalPriceForStay={totalPriceForStay}
        totalOriginalPriceForStay={totalOriginalPriceForStay}
        hasDiscount={hasDiscount}
        totalPrice={totalPrice}
        numNights={pricing.numNights}
      />
    </div>
  );
}

function PriceSummary({
  totalPriceForStay,
  totalOriginalPriceForStay,
  hasDiscount,
  totalPrice,
  numNights,
}) {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center text-lg">
        <span className="text-gray-800 font-semibold">Total Price</span>
        <div className="text-right">
          {hasDiscount ? (
            <>
              <p className="text-xl font-bold text-accent-600">
                ₹{totalPriceForStay}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ₹{totalOriginalPriceForStay}
              </p>
            </>
          ) : (
            <p className="text-xl font-bold text-accent-600">
              ₹{totalPriceForStay}
            </p>
          )}
          <p className="text-xs text-gray-500">
            {numNights} night{numNights !== 1 ? "s" : ""} total
          </p>
          <p className="text-xs text-gray-500">(₹{totalPrice} per night)</p>
        </div>
      </div>
    </div>
  );
}
