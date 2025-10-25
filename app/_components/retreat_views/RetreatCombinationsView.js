import ItemCard from "../ItemCard";
import Link from "next/link";

function RetreatCombinationsView({ combinations, guestCount }) {
  // Calculate pricing for each combination
  const combinationsWithPricing = combinations.map((combination, index) => {
    const totalPrice = combination.retreats.reduce((sum, retreat) => {
      const discount = Math.round(
        (retreat.regularPrice * (retreat.discount || 0)) / 100
      );
      return sum + (retreat.regularPrice - discount);
    }, 0);

    const totalOriginalPrice = combination.retreats.reduce(
      (sum, retreat) => sum + retreat.regularPrice,
      0
    );

    const hasDiscount = totalPrice < totalOriginalPrice;
    const comboId = `combo-${index + 1}-${guestCount}guests`;

    return {
      ...combination,
      totalPrice,
      totalOriginalPrice,
      hasDiscount,
      comboId,
    };
  });

  return (
    <div className="px-2 sm:px-0">
      <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left px-2">
        Retreat Combinations for {guestCount} guests
      </h2>
      {combinationsWithPricing.length > 0 ? (
        <div className="space-y-6 sm:space-y-8">
          {combinationsWithPricing.map((combination, index) => (
            <div
              key={index}
              className="border-2 border-accent-300 rounded-xl p-4 sm:p-6 mx-2 sm:mx-0"
            >
              {/* Combination Header with Pricing and Button */}
              <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 border-b border-accent-200">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-accent-400 mb-1">
                    Option {index + 1}
                  </h3>
                  <p className="text-primary-300 text-sm sm:text-base">
                    {combination.retreats.length} retreat
                    {combination.retreats.length > 1 ? "s" : ""} • Total
                    capacity: {combination.totalCapacity} guests
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row items-center">
                  {/* Pricing */}
                  <div className="flex gap-2 sm:gap-3 items-baseline bg-white rounded-lg p-2 sm:p-3 shadow-md w-full sm:w-auto justify-center">
                    <span className="text-primary-600 font-medium text-sm sm:text-base">
                      Package price
                    </span>
                    {combination.hasDiscount ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-bold text-accent-600">
                          ₹{combination.totalPrice}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          ₹{combination.totalOriginalPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base sm:text-lg font-bold text-accent-600">
                        ₹{combination.totalPrice}
                      </span>
                    )}
                    <span className="text-gray-500 text-xs sm:text-sm">
                      / night
                    </span>
                  </div>

                  {/* Booking Button */}
                  <Link
                    href={`/combo/${combination.comboId}`}
                    className="bg-accent-500 hover:bg-accent-600 text-primary-800 py-2 px-4 sm:py-2 sm:px-5 rounded-lg font-semibold transition-all text-sm w-full sm:w-auto text-center whitespace-nowrap"
                  >
                    Book This Combo &rarr;
                  </Link>
                </div>
              </div>

              {/* Retreats Grid */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 lg:gap-8 xl:gap-10">
                {combination.retreats.map((retreat) => (
                  <ItemCard
                    key={`${retreat.type}-${retreat.id}`}
                    item={retreat}
                    isCombo={true}
                    isFull={retreat.isFull}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            No combinations available for {guestCount} guests.
          </p>
        </div>
      )}
    </div>
  );
}

export default RetreatCombinationsView;
