import ItemCard from "./ItemCard";

function RetreatSection({
  title,
  retreats,
  type,
  emptyMessage,
  className = "",
  isCombo,
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
        {title}
      </h2>
      {retreats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
          {retreats.map((retreat) => (
            <ItemCard
              key={retreat.id}
              item={{ ...retreat, type }}
              isCombo={isCombo || null}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default RetreatSection;
