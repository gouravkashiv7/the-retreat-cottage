export default function ComboDetailsHeader({
  optionNumber,
  guestCount,
  totalCapacity,
  fullCapacityCabins,
}) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-400 mb-4">
        Retreat Combination
      </h1>
      <p className="text-xl text-primary-300">
        Option {optionNumber} for {guestCount} guests
      </p>
      <div className="mt-4 bg-accent-500/20 border border-accent-400 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-accent-300 font-semibold">
          Total Capacity: {totalCapacity} guests
        </p>
        {fullCapacityCabins > 0 && (
          <p className="text-primary-200 text-sm mt-1">
            {fullCapacityCabins} cabin{fullCapacityCabins > 1 ? "s" : ""} at
            full capacity (+₹800 each)
          </p>
        )}
      </div>
    </div>
  );
}
