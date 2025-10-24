import ComboRetreatItem from "./ComboRetreatItem";

export default function ComboRetreatsList({ retreats }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Included Retreats ({retreats.length})
      </h2>
      <div className="space-y-4">
        {retreats.map((retreat) => (
          <ComboRetreatItem
            key={`${retreat.type}-${retreat.id}`}
            retreat={retreat}
          />
        ))}
      </div>
    </div>
  );
}
