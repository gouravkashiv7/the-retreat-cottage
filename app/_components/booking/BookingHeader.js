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
      <div
        id="booking-calendar"
        className="relative mb-6 sm:mb-8 group mx-2 sm:mx-0 scroll-mt-24"
      >
        {/* Golden glow effect - Reduced on mobile */}
        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-gold-500 to-yellow-200 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 sm:group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative p-6 sm:p-8 bg-primary-900/40 border border-gold-400/20 rounded-2xl shadow-3xl backdrop-blur-md">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-500/30 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-500/30 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-500/30 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-500/30 rounded-br-2xl"></div>

          {/* Title Section */}
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-black text-gold-300 mb-2 bg-gradient-to-r from-gold-400 via-yellow-200 to-gold-400 bg-clip-text text-transparent tracking-tight">
              Select Your Dates
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-500/20"></span>
              <p className="text-primary-300 text-sm sm:text-base font-medium">
                Check-in after 2:00 PM • Check-out before 11:00 AM
              </p>
              <span className="h-px w-8 bg-gold-500/20"></span>
            </div>
          </div>

          {/* DateSelector Container - Reduced padding for smaller look */}
          <div className="bg-primary-950/40 rounded-2xl p-2 sm:p-4 border border-gold-300/10 shadow-inner inline-block mx-auto">
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
