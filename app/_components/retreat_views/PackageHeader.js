import Link from "next/link";

function PackageHeader({ pack, isLoading, setIsLoading }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b border-accent-200">
      <div>
        <h3 className="text-xl font-semibold text-accent-400 mb-1">
          {pack.name}
        </h3>
        <p className="text-primary-300">
          {pack.description} • Total capacity: {pack.totalCapacity} guests
        </p>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-4">
        {/* Pricing */}
        <div className="flex gap-3 items-baseline bg-white rounded-lg p-3 shadow-md">
          <span className="text-primary-600 font-medium">Starts at</span>
          {pack.hasDiscount ? (
            <>
              <span className="text-lg sm:text-xl font-bold text-accent-600">
                ₹{pack.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{pack.originalPrice}
              </span>
            </>
          ) : (
            <span className="text-lg sm:text-xl font-bold text-accent-600">
              ₹{pack.price}
            </span>
          )}
          <span className="text-gray-500 text-sm">/ night</span>
        </div>

        {/* Booking Button */}
        <Link
          href={pack.bookingUrl}
          className={`bg-accent-500 hover:bg-accent-600 text-primary-800 py-2 px-5 rounded-lg font-semibold transition-all text-sm sm:text-base text-center whitespace-nowrap flex items-center justify-center gap-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? (
            <>
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            "Book Package →"
          )}
        </Link>
      </div>
    </div>
  );
}

export default PackageHeader;
