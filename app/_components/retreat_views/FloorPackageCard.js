import PackageHeader from "./PackageHeader";
import ItemCard from "../ItemCard";

function FloorPackageCard({ pack, isLoading, setIsLoading }) {
  return (
    <div className="bg-primary-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:shadow-[0_8px_40px_rgba(198,153,99,0.1)] hover:border-accent-500/20 hover:-translate-y-1">
      {/* Package Header with Pricing and Button */}
      <PackageHeader
        pack={pack}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {/* Retreats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
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
