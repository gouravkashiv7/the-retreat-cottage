import Image from "next/image";
import { UsersIcon, HomeModernIcon } from "@heroicons/react/24/solid";

export default function RetreatsList({ title, retreats, type }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
              className="flex gap-4 p-4 border border-gray-200 rounded-lg"
            >
              {retreat.image && (
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={retreat.image}
                    alt={retreat.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {type === "room" ? "Room" : "Cabin"} {retreat.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {retreat.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-4 w-4" />
                    <span>{retreat.maxCapacity} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HomeModernIcon className="h-4 w-4" />
                    <span>
                      {type === "room" ? "Villa Room" : "Wooden Cabin"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {discount > 0 ? (
                  <>
                    <p className="text-lg font-bold text-accent-600">
                      ₹{finalPrice}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{retreat.regularPrice}
                    </p>
                  </>
                ) : (
                  <p className="text-lg font-bold text-accent-600">
                    ₹{retreat.regularPrice}
                  </p>
                )}
                <p className="text-xs text-gray-500">per night</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
