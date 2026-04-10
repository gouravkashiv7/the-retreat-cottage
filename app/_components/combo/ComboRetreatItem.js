import Image from "next/image";
import { Users, Home, Sparkles } from "lucide-react";

export default function ComboRetreatItem({ retreat, extraGuestPrice }) {
  const retreatDiscount = Math.round(
    (retreat.regularPrice * (retreat.discount || 0)) / 100
  );
  const retreatBasePrice = retreat.regularPrice - retreatDiscount;
  const retreatFinalPrice =
    retreat.type === "cabin" && retreat.isFull
      ? retreatBasePrice + extraGuestPrice
      : retreatBasePrice;

  return (
    <div className="group flex flex-col sm:flex-row gap-4 p-4 bg-primary-950/40 border border-white/5 rounded-2xl transition-all hover:bg-primary-900/60 hover:border-accent-500/20 shadow-lg">
      {retreat.image && (
        <div className="w-full sm:w-32 h-40 sm:h-32 relative flex-shrink-0 overflow-hidden rounded-xl">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={retreat.image}
            alt={retreat.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-950/60 to-transparent" />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              {retreat.name}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-800 text-primary-400 font-bold uppercase tracking-widest border border-white/5">
                {retreat.type}
              </span>
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5 text-primary-400">
                 <Users className="w-3.5 h-3.5" />
                 <span className="text-xs font-medium">{retreat.usedCapacity || retreat.maxCapacity} Guests</span>
              </div>
              <div className="w-1 h-1 bg-primary-700 rounded-full" />
              <div className="flex items-center gap-1.5 text-primary-400">
                 <Home className="w-3.5 h-3.5" />
                 <span className="text-xs font-medium uppercase tracking-tighter">{retreat.type} Retreat</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-xl font-black text-accent-400">₹{retreatFinalPrice.toLocaleString()}</p>
            <p className="text-[10px] text-primary-500 uppercase font-bold tracking-tighter">per night</p>
          </div>
        </div>

        <p className="text-primary-300/70 text-sm leading-relaxed line-clamp-2 italic font-light">
          {retreat.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
           {retreat.type === "cabin" && retreat.isFull && (
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Full Capacity Added (+₹{extraGuestPrice})
             </div>
           )}
           {retreat.discount > 0 && (
              <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Special Package Offer Applied
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
