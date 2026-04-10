import ComboRetreatItem from "./ComboRetreatItem";

export default function ComboRetreatsList({ retreats, extraGuestPrice }) {
  return (
    <div className="bg-primary-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-accent-500 rounded-full" />
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          Included Retreats <span className="text-accent-400 ml-1">({retreats.length})</span>
        </h2>
      </div>
      <div className="space-y-4">
        {retreats.map((retreat) => (
          <ComboRetreatItem
            key={`${retreat.type}-${retreat.id}`}
            retreat={retreat}
            extraGuestPrice={extraGuestPrice}
          />
        ))}
      </div>
    </div>
  );
}
