import RetreatSection from "../RetreatSection";
import Link from "next/link";

function VillaPackageView({ rooms, cabins }) {
  const totalCapacity = [...rooms, ...cabins].reduce(
    (sum, retreat) => sum + retreat.maxCapacity,
    0
  );

  // Calculate total price for the complete villa package
  const totalRegularPrice = [...rooms, ...cabins].reduce(
    (sum, retreat) => sum + retreat.regularPrice,
    0
  );

  // Calculate total discount for the complete villa package
  const totalDiscount = [...rooms, ...cabins].reduce(
    (sum, retreat) =>
      sum + Math.round((retreat.regularPrice * (retreat.discount || 0)) / 100),
    0
  );

  const finalPrice = totalRegularPrice - totalDiscount;

  // Combine all retreats into a single combo array
  const comboRetreats = [
    ...rooms.map((room) => ({ ...room, type: "room" })),
    ...cabins.map((cabin) => ({ ...cabin, type: "cabin" })),
  ];

  return (
    <div className="border-2 border-accent-400 rounded-xl overflow-hidden">
      {/* Package Header with Pricing */}
      <div className="bg-accent-500/10 border-b border-accent-400 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-400 mb-4">
            Complete Villa Package
          </h1>
          <p className="text-xl sm:text-2xl text-primary-300 mb-6">
            Experience the ultimate retreat with our entire property
          </p>
        </div>

        {/* Package Info and Pricing with Button */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="bg-accent-500/20 border border-accent-400 rounded-lg p-6 flex-1 max-w-2xl">
            <p className="text-lg text-accent-300 font-semibold">
              Includes all {rooms.length} villa rooms and {cabins.length} wooden
              cabins
            </p>
            <p className="text-primary-200 mt-2">
              Total capacity:{" "}
              <span className="font-bold text-accent-400">
                {totalCapacity} guests
              </span>
            </p>
          </div>

          {/* Package Pricing and Booking Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4">
            {/* Pricing */}
            <div className="flex gap-3 items-baseline bg-white rounded-lg p-4 shadow-md">
              <span className="text-primary-600 font-medium">Starts at</span>
              {totalDiscount > 0 ? (
                <>
                  <span className="text-xl sm:text-2xl font-bold text-accent-600">
                    ₹{finalPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{totalRegularPrice}
                  </span>
                </>
              ) : (
                <span className="text-xl sm:text-2xl font-bold text-accent-600">
                  ₹{totalRegularPrice}
                </span>
              )}
              <span className="text-gray-500 text-sm sm:text-base">
                / night
              </span>
            </div>

            {/* Booking Button */}
            <Link
              href="/booking/villa"
              className="bg-accent-500 hover:bg-accent-600 text-primary-800 py-3 px-6 rounded-lg font-semibold transition-all text-base sm:text-lg text-center whitespace-nowrap"
            >
              Book Complete Villa &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Retreats Grid */}
      <div className="p-6 sm:p-8">
        <RetreatSection
          title="Complete Villa Package - All Retreats"
          retreats={comboRetreats}
          type="combo"
          emptyMessage="No retreats available."
          isCombo={true}
        />
      </div>
    </div>
  );
}

export default VillaPackageView;
