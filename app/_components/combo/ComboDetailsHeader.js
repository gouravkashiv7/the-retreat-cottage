import PackageDateSelector from "../PackageDateSelector";

export default function ComboDetailsHeader({
  optionNumber,
  guestCount,
  totalCapacity,
  fullCapacityCabins,
  extraGuestPrice,
  guestId,
  retreats,
  bookedDates,
  settings,
}) {
  return (
    <div className="text-center space-y-8 relative overflow-hidden py-12">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-accent-500/10 blur-[120px] rounded-full -z-10" />
      
      {/* Header Section */}
      <div className="space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-bold uppercase tracking-widest mb-2">
          <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
          Curated Combination Choice
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent-400 via-white to-accent-400 tracking-tight leading-tight">
          Retreat Combination
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="group flex items-center gap-3 bg-primary-900/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/5 shadow-2xl transition-all hover:border-accent-500/20">
            <span className="text-primary-400 text-xs font-bold uppercase tracking-widest">Option</span>
            <span className="text-2xl font-black text-white group-hover:text-accent-400 transition-colors">{optionNumber}</span>
          </div>
          
          <div className="w-1 h-1 bg-primary-700 rounded-full hidden sm:block" />
          
          <div className="group flex items-center gap-3 bg-accent-500/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-accent-500/20 shadow-2xl transition-all hover:bg-accent-500/20">
            <span className="text-accent-400 text-xs font-bold uppercase tracking-widest">Selected For</span>
            <span className="text-2xl font-black text-accent-300 group-hover:scale-105 transition-transform">{guestCount} Guests</span>
          </div>
        </div>
      </div>

      {/* Capacity & Pricing Info Card */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 px-4">
        <div className="bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:bg-primary-800/40 transition-colors">
          <p className="text-primary-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Combination Capacity</p>
          <p className="text-white font-black text-xl group-hover:text-accent-400 transition-colors">{totalCapacity} Guests Max</p>
        </div>

        {fullCapacityCabins > 0 ? (
          <div className="bg-accent-500/5 backdrop-blur-md border border-accent-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <p className="text-accent-500 text-[10px] font-bold uppercase tracking-wider mb-1">Premium Capacity Added</p>
            <p className="text-accent-300 font-bold text-lg">
              {fullCapacityCabins} Cabin{fullCapacityCabins > 1 ? 's' : ''} at Full
            </p>
          </div>
        ) : (
          <div className="bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
             <p className="text-primary-400 text-[10px] font-bold uppercase tracking-wider mb-1">Efficiency Rating</p>
             <p className="text-emerald-400 font-bold text-lg">Optimized for Group</p>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-2">
        <div className="bg-primary-900/60 backdrop-blur-2xl rounded-3xl p-1 sm:p-1.5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-accent-500/10">
          <div className="bg-primary-950/40 rounded-2xl p-4 sm:p-6">
            <div className="text-center mb-6">
               <h3 className="text-xl font-bold text-white mb-2 tracking-tight bg-linear-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
                  Finalize Your Stay Dates
               </h3>
               <p className="text-primary-400 text-xs font-medium uppercase tracking-[0.2em]">Select check-in & check-out</p>
            </div>

            <PackageDateSelector
              settings={settings}
              retreats={retreats}
              bookedDates={bookedDates}
              packageRetreats={retreats}
              type="package"
              guestId={guestId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
