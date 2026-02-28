import Image from "next/image";
import { UsersIcon, HomeModernIcon } from "@heroicons/react/24/solid";

export default function RetreatsList({ title, retreats, type }) {
  return (
    <div className="bg-primary-900/40 backdrop-blur-sm border border-accent-400/10 rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-accent-400 mb-6 flex items-center gap-3">
        <span className="p-2 bg-accent-500/10 rounded-lg">
          <HomeModernIcon className="h-6 w-6 text-accent-400" />
        </span>
        {title}
        <span className="text-sm font-normal text-primary-400 ml-auto">
          {retreats.length} Units Included
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {retreats.map((retreat) => {
          const discount = Math.round(
            (retreat.regularPrice * (retreat.discount || 0)) / 100,
          );
          const finalPrice = retreat.regularPrice - discount;

          return (
            <div
              key={retreat.id}
              className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border border-accent-400/5 bg-primary-800/20 hover:bg-primary-800/40 rounded-2xl transition-all duration-300 hover:border-accent-400/20 shadow-lg hover:shadow-accent-500/5"
            >
              {retreat.image && (
                <div className="w-full sm:w-32 h-40 sm:h-32 relative shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={retreat.image}
                    alt={retreat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary-950/60 to-transparent opacity-60"></div>
                </div>
              )}

              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                {/* Content Section */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-primary-50 mb-2 group-hover:text-accent-400 transition-colors">
                    {type === "room" ? "Room" : "Cabin"} {retreat.name}
                  </h3>
                  <p className="text-primary-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {retreat.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-primary-400">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-800/60 rounded-full border border-primary-700/50">
                      <UsersIcon className="h-3.5 w-3.5 text-accent-400" />
                      <span>Up to {retreat.maxCapacity} Guests</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-800/60 rounded-full border border-primary-700/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                      <span>
                        {type === "room" ? "Villa Main Floor" : "Luxury Cabin"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="flex justify-between sm:flex-col sm:justify-center sm:items-end gap-2 sm:min-w-35 pl-0 sm:pl-6 border-l-0 sm:border-l border-accent-400/10">
                  <div className="text-right flex flex-col items-end">
                    {discount > 0 ? (
                      <>
                        <p className="text-sm text-primary-500 line-through decoration-red-500/40">
                          ₹{retreat.regularPrice}
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-accent-400 leading-none mb-1">
                          ₹{finalPrice}
                        </p>
                      </>
                    ) : (
                      <p className="text-xl sm:text-2xl font-black text-accent-400 leading-none mb-1">
                        ₹{retreat.regularPrice}
                      </p>
                    )}
                    <p className="text-[10px] uppercase tracking-widest text-primary-500 font-bold">
                      Unit Nightly Rate
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
