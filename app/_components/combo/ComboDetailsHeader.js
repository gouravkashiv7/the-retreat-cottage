import PackageDateSelector from "../PackageDateSelector";

export default function ComboDetailsHeader({
  optionNumber,
  guestCount,
  totalCapacity,
  fullCapacityCabins,
  extraGuestPrice,
  guestId,
  retreats,
  bookedDates,
  settings,
}) {
  return (
    <div className="text-center space-y-8">
      {/* Header Section with Gradient Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-primary-800/20 rounded-3xl blur-xl -z-10"></div>
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
            Retreat Combination
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-lg sm:text-xl text-primary-300">
            <span className="bg-primary-800/50 px-4 py-2 rounded-full border border-accent-400/30">
              Option {optionNumber}
            </span>
            <span className="text-primary-200">for</span>
            <span className="bg-accent-500/20 px-4 py-2 rounded-full border border-accent-400/30 font-semibold">
              {guestCount} guests
            </span>
          </div>
        </div>
      </div>

      {/* Capacity Info */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="bg-primary-800/40 border border-accent-400/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
          <p className="text-accent-300 font-semibold text-lg">
            Total Capacity:{" "}
            <span className="text-white">{totalCapacity} guests</span>
          </p>
        </div>

        {fullCapacityCabins > 0 && (
          <div className="bg-accent-500/20 border border-accent-400/40 rounded-2xl px-5 py-3">
            <p className="text-primary-200 text-sm font-medium">
              {fullCapacityCabins === 1
                ? `1 cabin at full capacity (+₹${extraGuestPrice})`
                : `${fullCapacityCabins} cabins at full capacity (+₹${extraGuestPrice} each)`}
            </p>
          </div>
        )}
      </div>

      {/* Date Selector Section with Different Header */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/5 via-primary-800/10 to-accent-400/5 rounded-3xl blur-sm -z-10"></div>
        <div className="bg-primary-800/40 rounded-2xl p-6 sm:p-8 border border-accent-400/30 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto">
          {/* Different Header Style */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-primary-900/60 border border-accent-400/40 rounded-full px-6 py-3 mb-3">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-accent-300">
                Choose Your Stay Dates
              </h3>
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-primary-300 text-sm">
              Select check-in and check-out dates to check availability
            </p>
          </div>

          <PackageDateSelector
            settings={settings}
            retreats={retreats}
            bookedDates={bookedDates}
            packageRetreats={retreats}
            type="package"
            guestId={guestId}
          />
        </div>
      </div>
    </div>
  );
}
