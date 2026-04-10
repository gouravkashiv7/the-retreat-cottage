import { Suspense } from "react";

import RetreatList from "../_components/RetreatList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import DateRangeSelector from "../_components/DateRangeSelector";
import { Sparkles, Users, PawPrint, Utensils, Music } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Luxury Rooms & Cabins near Kasauli",
  description: "Explore our curated collection of luxury retreats near Kasauli. From wooden cabins to boutique rooms, find your perfect mountain escape at The Retreat Cottage.",
  alternates: {
    canonical: "/retreats",
  },
};

export default async function RetreatsPage({ searchParams }) {
  const param = await searchParams;
  const filter = param?.capacity ?? "all";
  const { startDate, endDate, guests } = param;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-black uppercase tracking-[0.3em] mb-2 shadow-[0_0_15px_rgba(198,153,99,0.15)]">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>Exclusive Mountain Stays</span>
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
          <span className="text-white">Our Luxury</span>{" "}
          <span className="bg-linear-to-r from-accent-300 via-accent-400 to-accent-600 bg-clip-text text-transparent drop-shadow-sm">
            Retreats
          </span>
        </h1>
        <p className="text-primary-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Discover five exquisite retreats at The Retreat Cottage. 
          Perfect for solo escapes, romantic getaways, or family gatherings up to 15 guests.
        </p>
 
        {/* Dynamic Badges */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {[
            { icon: Utensils, label: "Pure Veg" },
            { icon: Users, label: "Groups Up to 15" },
            { icon: Music, label: "Bonfire Allowed" },
            { icon: PawPrint, label: "Pet Friendly" },
          ].map(({ icon: Icon, label }, idx) => (
            <div 
              key={idx}
              className="group flex items-center gap-2 px-5 py-2.5 bg-primary-900/40 border border-white/10 rounded-xl text-xs font-bold text-accent-300 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/30 hover:bg-primary-900/60 hover:shadow-[0_4px_20px_rgba(198,153,99,0.15)] hover:text-accent-100"
            >
              <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              {label}
            </div>
          ))}
        </div>
      </div>
 
      {/* Date Range Selector */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        <DateRangeSelector />
      </div>
 
      {/* Filter */}
      <div className="flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <Filter />
      </div>
 
      {/* Retreat Cards */}
      <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
        <Suspense fallback={<Spinner />} key={JSON.stringify(param)}>
          <RetreatList filter={filter} startDate={startDate} endDate={endDate} guests={guests} />
        </Suspense>
      </div>
    </div>
  );
}
