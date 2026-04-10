export default function ComboBookingInfo({
  formattedCheckIn,
  formattedCheckOut,
  guestCount,
  retreatCount,
  totalCapacity,
  pricing,
  fullCapacityCabins,
  extraGuestPrice,
  showSpecialRequirements,
  specialRequirements,
  setSpecialRequirements,
}) {
  const {
    totalPrice,
    hasDiscount,
    totalPriceForStay,
    totalOriginalPriceForStay,
  } = pricing;

  return (
    <div className="space-y-6 mb-8">
      {/* Dates Row */}
      {formattedCheckIn && formattedCheckOut && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-1.5 px-1">
              Check-in
            </label>
            <div className="w-full p-3 bg-primary-950/60 border border-white/5 rounded-xl text-primary-200 font-bold text-sm text-center">
               {formattedCheckIn}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-1.5 px-1">
              Check-out
            </label>
            <div className="w-full p-3 bg-primary-950/60 border border-white/5 rounded-xl text-primary-200 font-bold text-sm text-center">
               {formattedCheckOut}
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-primary-950/40 p-3 rounded-xl border border-white/5 flex flex-col items-center">
           <span className="text-[9px] font-bold text-primary-500 uppercase tracking-tight">Guests</span>
           <span className="text-white font-black">{guestCount}</span>
        </div>
        <div className="bg-primary-950/40 p-3 rounded-xl border border-white/5 flex flex-col items-center">
           <span className="text-[9px] font-bold text-primary-500 uppercase tracking-tight">Units</span>
           <span className="text-white font-black">{retreatCount}</span>
        </div>
        <div className="bg-primary-950/40 p-3 rounded-xl border border-white/5 flex flex-col items-center">
           <span className="text-[9px] font-bold text-primary-500 uppercase tracking-tight">Max</span>
           <span className="text-white font-black">{totalCapacity}</span>
        </div>
      </div>

      {fullCapacityCabins > 0 && (
        <div className="p-3 rounded-xl bg-accent-500/5 border border-accent-500/10 flex items-center justify-between">
          <span className="text-[10px] font-bold text-accent-400 uppercase tracking-wider">
            Premium Capacity ({fullCapacityCabins})
          </span>
          <span className="font-black text-accent-300">
            +₹{extraGuestPrice}
          </span>
        </div>
      )}

      {/* Special Requirements */}
      {showSpecialRequirements && (
        <div>
          <label className="block text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-2 px-1">
            Special Requirements
          </label>
          <textarea
            rows="3"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            placeholder="Any special arrangements for your group..."
            className="w-full p-4 bg-primary-950/40 border border-white/5 rounded-2xl text-primary-100 text-sm placeholder:text-primary-700 focus:ring-2 focus:ring-accent-500/50 outline-none transition-all resize-none italic font-light"
          />
        </div>
      )}

      <PriceSummary
        totalPriceForStay={totalPriceForStay}
        totalOriginalPriceForStay={totalOriginalPriceForStay}
        hasDiscount={hasDiscount}
        totalPrice={totalPrice}
        numNights={pricing.numNights}
      />
    </div>
  );
}

function PriceSummary({
  totalPriceForStay,
  totalOriginalPriceForStay,
  hasDiscount,
  totalPrice,
  numNights,
}) {
  return (
    <div className="pt-6 border-t border-white/10">
      <div className="flex justify-between items-end">
        <div>
           <p className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.2em] mb-1">Total Stay Value</p>
           {hasDiscount && (
             <p className="text-xs text-primary-600 line-through mb-1">
               ₹{totalOriginalPriceForStay.toLocaleString()}
             </p>
           )}
           <div className="flex items-baseline gap-2">
             <span className="text-3xl font-black text-accent-400">₹{totalPriceForStay.toLocaleString()}</span>
             <span className="text-[10px] text-primary-500 uppercase font-bold">INR</span>
           </div>
        </div>
        <div className="text-right">
           <p className="text-accent-400/80 text-[10px] font-bold uppercase tracking-tighter">
             {numNights} Night{numNights !== 1 ? 's' : ''} Stay
           </p>
           <p className="text-primary-500 text-[10px] font-medium italic mt-0.5">₹{totalPrice.toLocaleString()} / night</p>
        </div>
      </div>
    </div>
  );
}
