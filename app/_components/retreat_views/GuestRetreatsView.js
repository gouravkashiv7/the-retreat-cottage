import ItemCard from "../ItemCard";

function GuestRetreatsView({ allRetreats, guestCount }) {
  const smallRetreats = allRetreats.filter(
    (retreat) => retreat.maxCapacity >= guestCount
  );

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
        Retreats for {guestCount} guest{guestCount > 1 ? "s" : ""}
      </h2>
      {smallRetreats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
          {smallRetreats.map((retreat) => (
            <ItemCard
              key={`${retreat.type}-${retreat.id}`}
              item={retreat}
              // Pass isFull=true for cabins when guestCount is 3 (full capacity)
              isFull={retreat.type === "cabin" && guestCount === 3}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            No retreats available for {guestCount} guest
            {guestCount > 1 ? "s" : ""}.
          </p>
        </div>
      )}
    </div>
  );
}

export default GuestRetreatsView;
