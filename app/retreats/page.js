import { Suspense } from "react";

import RetreatList from "../_components/RetreatList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
// import ReservationReminder from "../_components/ReservationReminder";
import DateRangeSelector from "../_components/DateRangeSelector";

export const revalidate = 3600;

export const metadata = {
  title: "Luxury Retreats",
};

// Using "Our Retreats"
export default async function RetreatsPage({ searchParams }) {
  const param = await searchParams;
  const filter = param?.capacity ?? "all";
  return (
    <>
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-accent-400 font-medium text-center sm:text-left">
          Our Luxury Retreats
        </h1>
        <p className="text-primary-200 text-base sm:text-lg mb-8 sm:mb-10 text-center sm:text-left">
          Discover five exclusive retreats at The Retreat Cottage, each offering
          a unique blend of rustic elegance and modern comfort amidst Kasauli's
          serene hills.
        </p>
      </div>
      {/* Date Range Selector */}
      <div className="px-4 sm:px-0 mb-6">
        <DateRangeSelector />
      </div>
      <div
        className="flex justify-end mb-8 
                max-sm:justify-center 
                max-sm:mb-6 
                max-sm:px-4 
                max-sm:w-full"
      >
        <div className="max-sm:w-full">
          <Filter />
        </div>
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <RetreatList filter={filter} />
        {/* <ReservationReminder /> */}
      </Suspense>
    </>
  );
}
