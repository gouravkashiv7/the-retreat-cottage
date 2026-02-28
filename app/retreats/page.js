import { Suspense } from "react";

import RetreatList from "../_components/RetreatList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import DateRangeSelector from "../_components/DateRangeSelector";
import { Sparkles } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Luxury Retreats",
};

export default async function RetreatsPage({ searchParams }) {
  const param = await searchParams;
  const filter = param?.capacity ?? "all";
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="inline-flex items-center gap-2 text-accent-400 text-xs font-black uppercase tracking-[0.3em] mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Exclusive Mountain Stays</span>
          <Sparkles className="h-4 w-4" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
          Our Luxury <span className="text-accent-400">Retreats</span>
        </h1>
        <p className="text-primary-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover five exclusive retreats at The Retreat Cottage, each offering
          a unique blend of rustic elegance and modern comfort amidst
          Kasauli&apos;s serene hills.
        </p>
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
