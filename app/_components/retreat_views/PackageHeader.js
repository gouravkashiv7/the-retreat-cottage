import Link from "next/link";
import { ArrowRight } from "lucide-react";

function PackageHeader({ pack, isLoading, setIsLoading }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-white/10">
      <div>
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent-300 to-accent-500 mb-2">
          {pack.name}
        </h3>
        <p className="text-primary-300/80 text-sm sm:text-base font-light">
          {pack.description} • Total capacity:{" "}
          <span className="text-white font-bold">{pack.totalCapacity} guests</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        {/* Pricing */}
        <div className="flex gap-3 items-baseline bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-xl justify-center">
          <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">
            Starts at
          </span>
          {pack.hasDiscount ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-accent-400">
                ₹{pack.price}
              </span>
              <span className="text-xs sm:text-sm text-primary-500 line-through">
                ₹{pack.originalPrice}
              </span>
            </div>
          ) : (
            <span className="text-xl sm:text-2xl font-black text-accent-400">
              ₹{pack.price}
            </span>
          )}
          <span className="text-primary-400 text-xs font-medium">/ night</span>
        </div>

        {/* Booking Button */}
        <Link
          href={pack.bookingUrl}
          className={`relative overflow-hidden bg-linear-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-primary-950 py-3 px-6 rounded-xl font-black transition-all duration-300 text-sm sm:text-base text-center shadow-[0_4px_15px_rgba(198,153,99,0.2)] hover:shadow-[0_8px_25px_rgba(198,153,99,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 group/btn ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setIsLoading(true)}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[15deg] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-out z-0" />

          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-950 border-t-transparent rounded-full animate-spin relative z-10" />
              <span className="relative z-10">Loading...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Book Package</span>
              <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}

export default PackageHeader;
