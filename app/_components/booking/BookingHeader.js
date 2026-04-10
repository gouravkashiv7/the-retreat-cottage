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
    <div className="text-center mb-1 sm:mb-2">
      {/* Header Section */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent-400 mb-1 sm:mb-2 px-2">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-primary-400 mb-3 sm:mb-4 px-4 font-medium italic">
        {subtitle}
      </p>

 
      {/* Luxury Card Style - Compact */}
      <div
        id="booking-calendar"
        className="relative mb-4 sm:mb-6 group mx-2 sm:mx-0 scroll-mt-24"
      >
        {/* Golden glow effect */}
        <div className="absolute -inset-0.5 sm:-inset-1 bg-linear-to-r from-gold-500 to-yellow-200 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 transition duration-1000"></div>
 
        <div className="relative p-2 sm:p-4 bg-primary-900/40 border border-gold-400/20 rounded-2xl shadow-3xl backdrop-blur-md">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-500/20 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-500/20 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-500/20 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-500/20 rounded-br-2xl"></div>

 
          {/* Compact Sub-info */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-4 bg-gold-500/20"></span>
            <p className="text-primary-300 text-[9px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 bg-gold-500 rounded-full"></span>
              Check-in 2:00 PM
              <span className="w-1 h-1 bg-gold-400/40 rounded-full"></span>
              Check-out 11:00 AM
              <span className="w-1 h-1 bg-gold-500 rounded-full"></span>
            </p>
            <span className="h-px w-4 bg-gold-500/20"></span>
          </div>
 
          {/* DateSelector Container - Compact */}
          <div className="bg-primary-950/40 rounded-xl p-0.5 sm:p-1 border border-gold-300/10 shadow-inner inline-block mx-auto">
            <PackageDateSelector
              settings={settings}
              retreats={retreats}
              bookedDates={bookedDates}
              packageRetreats={retreats}
              type={type}
              guestId={guestId}
            />
          </div>
 
          {/* Selected dates display - Compact */}
          {range?.from && (
            <div className="mt-2 sm:mt-3 p-2 bg-gold-500/5 border border-gold-400/20 rounded-xl inline-flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              <p className="text-gold-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                {range.from.toLocaleDateString()}
                {range.to && ` — ${range.to.toLocaleDateString()}`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description & Stats Section - Compact */}
      <div className="bg-accent-500/10 border border-accent-400/30 rounded-xl p-3 sm:p-4 max-w-4xl mx-2 sm:mx-auto">
        <p className="text-sm sm:text-base text-accent-300 font-bold mb-3">
          {description}
        </p>
 
        {/* Stats - Compact Row */}
        {stats && Array.isArray(stats) && (
          <div className="text-primary-200">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary-800/40 rounded-lg border border-accent-400/10"
                >
                  <span className="text-[10px] sm:text-xs font-bold text-accent-400 uppercase tracking-tighter">
                    {stat.label}:
                  </span>
                  <span className="text-xs sm:text-sm text-white font-black">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
