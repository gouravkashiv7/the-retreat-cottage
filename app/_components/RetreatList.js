// import { unstable_noStore } from "next/cache";
import { getCabins, getRooms } from "../_lib/data-service";
import AllRetreatsView from "@/app/_components/retreat_views/AllRetreatsView";
import VillaPackageView from "@/app/_components/retreat_views/VillaPackageView";
import FloorPackagesView from "@/app/_components/retreat_views/FloorPackagesView";
import GuestRetreatsView from "@/app/_components/retreat_views/GuestRetreatsView";
import RetreatCombinationsView from "@/app/_components/retreat_views/RetreatCombinationsView";
import { findExactCombinations } from "@/app/_components/utils/combo-logic";
import { getAllBookedDates } from "../_lib/dates";
import { auth } from "../_lib/auth";

async function RetreatList({ filter }) {
  // unstable_noStore();
  const [rooms, cabins] = await Promise.all([getRooms(), getCabins()]);
  const bookedDates = await getAllBookedDates();
  const session = await auth();

  if (!rooms || !cabins) return null;

  // Combine all retreats
  const allRetreats = [
    ...rooms.map((room) => ({ ...room, type: "room" })),
    ...cabins.map((cabin) => ({ ...cabin, type: "cabin" })),
  ];

  // Handle "villa" filter
  if (filter === "villa") {
    return (
      <VillaPackageView
        rooms={rooms}
        cabins={cabins}
        bookedDates={bookedDates}
        guestId={session?.user?.guestId}
      />
    );
  }

  // Handle "all" filter
  if (filter === "all") {
    return (
      <AllRetreatsView
        rooms={rooms}
        bookedDates={bookedDates}
        guestId={session?.user?.guestId}
        cabins={cabins}
      />
    );
  }

  // Handle "floor" filter
  if (filter === "floor") {
    return (
      <FloorPackagesView
        rooms={rooms}
        bookedDates={bookedDates}
        guestId={session?.user?.guestId}
        cabins={cabins}
      />
    );
  }

  // Handle numeric filters (custom guest counts)
  if (typeof filter === "string" && !isNaN(filter)) {
    const guestCount = parseInt(filter);

    // For 1-3 guests, show individual retreats
    if (guestCount <= 3) {
      return (
        <GuestRetreatsView
          bookedDates={bookedDates}
          guestId={session?.user?.guestId}
          allRetreats={allRetreats}
          guestCount={guestCount}
        />
      );
    }

    // For 4+ guests, create combinations with exact capacity matching
    const combinations = findExactCombinations(allRetreats, guestCount);
    return (
      <RetreatCombinationsView
        combinations={combinations}
        guestCount={guestCount}
        bookedDates={bookedDates}
        guestId={session?.user?.guestId}
      />
    );
  }

  return null;
}

export default RetreatList;
