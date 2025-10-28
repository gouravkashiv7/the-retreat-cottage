"use client";

import { useReservation } from "../contexts/ReservationContext";
import PackageDateSelector from "../PackageDateSelector";

export default function BookingHeader({
  title,
  subtitle,
  description,
  stats,
  settings,
  retreats,
  bookedDates,
  guestId,
}) {
  const { range } = useReservation();
  const type = "package";

  return (
    <div className="text-center mb-4 sm:mb-8">
      {/* Header Section */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent-400 mb-3 sm:mb-4 px-2">
        {title}
      </h1>
      <p className="text-lg sm:text-xl text-primary-300 mb-4 sm:mb-6 px-4">
        {subtitle}
      </p>

      {/* Luxury Card Style - Mobile Responsive */}
      <div className="relative mb-6 sm:mb-8 group mx-2 sm:mx-0">
        {/* Golden glow effect - Reduced on mobile */}
        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-gold-500 to-yellow-200 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 sm:group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative p-4 sm:p-6 lg:p-8 bg-primary-900/90 border border-gold-400/50 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl backdrop-blur-sm">
          {/* Decorative elements - Smaller on mobile */}
          <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-gold-500 rounded-tl-lg"></div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-gold-500 rounded-tr-lg"></div>
          <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-gold-500 rounded-bl-lg"></div>
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-gold-500 rounded-br-lg"></div>

          {/* Title Section */}
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gold-300 mb-2 sm:mb-3 bg-gradient-to-r from-gold-400 to-yellow-200 bg-clip-text text-transparent">
              Plan Your Retreat
            </h3>
            <p className="text-primary-200 text-sm sm:text-base lg:text-lg px-2">
              Select your preferred dates for an unforgettable experience
            </p>
          </div>

          {/* DateSelector Container */}
          <div className="bg-primary-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-gold-300/20 shadow-inner">
            <PackageDateSelector
              settings={settings}
              retreats={retreats}
              bookedDates={bookedDates}
              packageRetreats={retreats}
              type={type}
              guestId={guestId}
            />
          </div>

          {/* Selected dates display - Mobile optimized */}
          {range?.from && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gold-500/10 border border-gold-400/30 rounded-lg">
              <p className="text-gold-300 font-semibold text-sm sm:text-base">
                <span className="block sm:inline">Selected: </span>
                <span className="block sm:inline mt-1 sm:mt-0">
                  {range.from.toLocaleDateString()}
                  {range.to && ` - ${range.to.toLocaleDateString()}`}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description & Stats Section */}
      <div className="bg-accent-500/20 border border-accent-400 rounded-lg p-4 sm:p-6 max-w-4xl  mx-2 sm:mx-auto">
        <p className="text-base sm:text-lg text-accent-300 font-semibold">
          {description}
        </p>

        {/* Stats - Stack on mobile, horizontal on larger screens */}
        {stats && Array.isArray(stats) && (
          <div className="text-primary-200 mt-3 sm:mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-2 sm:p-3 bg-primary-800/30 rounded-lg border border-accent-400/20"
                >
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold text-accent-300">
                      {stat.label}:
                    </span>
                  </div>
                  <div className="text-accent-400 font-bold text-base sm:text-lg mt-1">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
