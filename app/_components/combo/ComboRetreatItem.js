import Image from "next/image";
import { UsersIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { EXTRA_GUEST_PRICE } from "../utils/combo-logic";

export default function ComboRetreatItem({ retreat }) {
  const retreatDiscount = Math.round(
    (retreat.regularPrice * (retreat.discount || 0)) / 100
  );
  const retreatBasePrice = retreat.regularPrice - retreatDiscount;
  const retreatFinalPrice =
    retreat.type === "cabin" && retreat.isFull
      ? retreatBasePrice + EXTRA_GUEST_PRICE
      : retreatBasePrice;

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
      {retreat.image && (
        <div className="w-full sm:w-24 h-32 sm:h-24 relative flex-shrink-0">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={retreat.image}
            alt={retreat.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Content Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              {retreat.type.charAt(0).toUpperCase() + retreat.type.slice(1)}{" "}
              {retreat.name}
            </h3>
            {retreat.type === "cabin" && retreat.isFull && (
              <span className="text-xs bg-accent-500 text-primary-800 px-2 py-1 rounded-full font-medium self-start">
                Full Capacity
              </span>
            )}
            {retreat.type === "cabin" && !retreat.isFull && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium self-start">
                Reduced Capacity
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {retreat.description}
          </p>

          <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" />
              <span className="text-xs sm:text-sm">
                {retreat.usedCapacity || retreat.maxCapacity} guest
                {(retreat.usedCapacity || retreat.maxCapacity) > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <HomeModernIcon className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{retreat.type}</span>
            </div>
          </div>

          {retreat.type === "cabin" && retreat.isFull && (
            <p className="text-xs text-accent-600 font-medium">
              +₹{EXTRA_GUEST_PRICE} for extra guest
            </p>
          )}
        </div>

        <div className="flex justify-between sm:flex-col sm:justify-start sm:items-end gap-2 sm:gap-1">
          <div className="text-right sm:text-center">
            {retreat.discount > 0 ||
            (retreat.type === "cabin" && retreat.isFull) ? (
              <div className="flex flex-col items-end sm:items-start">
                <p className="text-base sm:text-lg font-bold text-accent-600">
                  ₹{retreatFinalPrice}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹
                  {retreat.type === "cabin" && retreat.isFull
                    ? retreat.regularPrice + EXTRA_GUEST_PRICE
                    : retreat.regularPrice}
                </p>
              </div>
            ) : (
              <p className="text-base sm:text-lg font-bold text-accent-600">
                ₹{retreatFinalPrice}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">per night</p>
          </div>
        </div>
      </div>
    </div>
  );
}
