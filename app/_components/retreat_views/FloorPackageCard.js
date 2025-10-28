import PackageHeader from "./PackageHeader";
import ItemCard from "../ItemCard";

function FloorPackageCard({ pack, isLoading, setIsLoading }) {
  return (
    <div className="border-2 border-accent-300 rounded-xl p-6">
      {/* Package Header with Pricing and Button */}
      <PackageHeader
        pack={pack}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {/* Retreats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
        {pack.retreats.map((retreat) => (
          <ItemCard
            key={`${retreat.type}-${retreat.id}`}
            item={retreat}
            isCombo={true}
          />
        ))}
      </div>
    </div>
  );
}

export default FloorPackageCard;
