import { Suspense } from "react";

import RetreatList from "../_components/RetreatList";
import ApiSpinner from "../_components/ApiSpinner";

export const metadata = {
  title: "Luxury Retreats",
};

// Using "Our Retreats"
export default function RetreatsPage() {
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
      <Suspense fallback={<ApiSpinner />}>
        <RetreatList />
      </Suspense>
    </>
  );
}
