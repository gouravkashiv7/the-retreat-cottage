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
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="inline-flex items-center gap-2 text-accent-400 text-xs font-black uppercase tracking-[0.3em] mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Exclusive Mountain Stays</span>
          <Sparkles className="h-4 w-4" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
          Our Luxury <span className="text-accent-400">Retreats</span>
        </h1>
        <p className="text-primary-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Discover five exquisite retreats at The Retreat Cottage. 
          Perfect for solo escapes, romantic getaways, or family gatherings up to 15 guests.
        </p>

        {/* Dynamic Badges */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-accent-300 backdrop-blur-sm">
            <Utensils className="h-3.5 w-3.5" />
            Pure Veg
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-accent-300 backdrop-blur-sm">
            <Users className="h-3.5 w-3.5" />
            Groups Up to 15
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-accent-300 backdrop-blur-sm">
            <Music className="h-3.5 w-3.5" />
            Music Allowed
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-accent-300 backdrop-blur-sm">
            <PawPrint className="h-3.5 w-3.5" />
            Pet Friendly
          </div>
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
          <RetreatList filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
