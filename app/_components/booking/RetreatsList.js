import Image from "next/image";
import { UsersIcon, HomeModernIcon } from "@heroicons/react/24/solid";

export default function RetreatsList({ title, retreats, type }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
        {title} ({retreats.length})
      </h2>
      <div className="space-y-4">
        {retreats.map((retreat) => {
          const discount = Math.round(
            (retreat.regularPrice * (retreat.discount || 0)) / 100
          );
          const finalPrice = retreat.regularPrice - discount;

          return (
            <div
              key={retreat.id}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg"
            >
              {retreat.image && (
                <div className="w-full sm:w-24 h-32 sm:h-24 relative flex-shrink-0">
                  <Image
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
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    {type === "room" ? "Room" : "Cabin"} {retreat.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {retreat.description}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{retreat.maxCapacity} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HomeModernIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>
                        {type === "room" ? "Villa Room" : "Wooden Cabin"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing Section - Better mobile layout */}
                <div className="flex justify-between sm:flex-col sm:justify-start sm:items-end gap-2">
                  <div className="text-right sm:text-left">
                    {discount > 0 ? (
                      <div className="flex flex-col items-end sm:items-start">
                        <div className="flex items-baseline gap-1 sm:gap-2">
                          <p className="text-base sm:text-lg font-bold text-accent-600">
                            ₹{finalPrice}
                          </p>
                          <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                            / night
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 line-through">
                          ₹{retreat.regularPrice}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <p className="text-base sm:text-lg font-bold text-accent-600">
                          ₹{retreat.regularPrice}
                        </p>
                        <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                          / night
                        </span>
                      </div>
                    )}
                    {/* Show "per night" below on mobile */}
                    <p className="text-xs text-gray-500 block sm:hidden mt-1">
                      per night
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
