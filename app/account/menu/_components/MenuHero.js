import { Download, Clock, AlertTriangle } from "lucide-react";
import { checkKitchenStatus } from "../_lib/menuUtils";

export default function MenuHero({
  checkedInBooking,
  handleDownloadMenu,
  isDownloading,
}) {
  const { isOpen } = checkKitchenStatus();

  return (
    <div className="px-4 sm:px-8 pt-8 sm:pt-12 flex flex-col gap-8 text-center sm:text-left">
      {/* ── Status Banner ── */}
      <div className={`w-full max-w-7xl mx-auto px-6 py-4 rounded-sm border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 animate-in fade-in slide-in-from-top-4 ${
        isOpen 
          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
          : "bg-red-500/5 border-red-500/20 text-red-400"
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] font-sans">
            Kitchen Status: <span className="underline decoration-2 underline-offset-4">{isOpen ? "Now Accepting Orders" : "Currently Resting"}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-80">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>07:30 AM — 09:30 PM IST</span>
          </div>
          {!isOpen && (
             <div className="flex items-center gap-2 text-red-400">
               <AlertTriangle className="w-3.5 h-3.5" />
               <span className="animate-pulse">Ordering Locked</span>
             </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-4">
          <h1 className="font-serif text-5xl sm:text-6xl text-white tracking-tight">
            The Retreat <span className="text-accent-500 italic">Menu</span>
          </h1>
          <p className="text-primary-400 text-sm sm:text-base max-w-xl leading-relaxed">
            {checkedInBooking
              ? "Experience our curated culinary selections, prepared by our chefs and delivered to your sanctuary."
              : "A preview of our dining experience. Available exclusively during your stay."}
          </p>
          {checkedInBooking && (
            <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-500 bg-accent-500/10 px-4 py-2 rounded-sm border border-accent-500/20 uppercase tracking-widest mt-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-400" />
              </span>
              Ready for your requests
            </div>
          )}
        </div>
        <button
          onClick={handleDownloadMenu}
          disabled={isDownloading}
          className="shrink-0 flex items-center justify-center gap-3 bg-primary-900 hover:bg-primary-800 text-primary-100 px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
        >
          {isDownloading ? (
            <div className="w-4 h-4 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4 text-accent-500" />
          )}
          Save PDF
        </button>
      </div>
    </div>
  );
}
