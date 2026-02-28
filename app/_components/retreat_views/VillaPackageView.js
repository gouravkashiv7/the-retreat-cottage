"use client";
import { useState } from "react";
import RetreatSection from "../RetreatSection";
import Link from "next/link";
import { useReservation } from "../contexts/ReservationContext";

function VillaPackageView({ rooms, cabins, bookedDates, guestId }) {
  const { range } = useReservation();
  const [isVillaLoading, setIsVillaLoading] = useState(false);
  const totalCapacity = [...rooms, ...cabins].reduce(
    (sum, retreat) => sum + retreat.maxCapacity,
    0,
  );

  // Calculate total price for the complete villa package
  const totalRegularPrice = [...rooms, ...cabins].reduce(
    (sum, retreat) => sum + retreat.regularPrice,
    0,
  );

  // Calculate total discount for the complete villa package
  const totalDiscount = [...rooms, ...cabins].reduce(
    (sum, retreat) =>
      sum + Math.round((retreat.regularPrice * (retreat.discount || 0)) / 100),
    0,
  );

  const finalPrice = totalRegularPrice - totalDiscount;

  // Combine all retreats into a single combo array
  const comboRetreats = [
    ...rooms.map((room) => ({ ...room, type: "room" })),
    ...cabins.map((cabin) => ({ ...cabin, type: "cabin" })),
  ];

  // Filter retreats based on range and bookedDates
  const filteredRetreats =
    comboRetreats?.filter((retreat) => {
      try {
        // If no range is selected, show all items
        if (!range?.from || !range?.to) {
          return true;
        }

        // Filter bookedDates for this specific retreat
        const retreatBookedDates = (bookedDates || []).filter((booking) => {
          const matchesId = Number(booking.retreatId) === Number(retreat.id);
          const matchesType = booking.type === retreat.type;
          return matchesId && matchesType;
        });

        // Create filtered bookedDates based on status and guest
        const filteredBookedDates = retreatBookedDates.filter((booking) => {
          // Always include confirmed, checked-in, and blocked bookings
          if (
            booking.status === "confirmed" ||
            booking.status === "checked-in" ||
            booking.status === "blocked"
          ) {
            return true;
          }

          // For unconfirmed bookings, only include if it's the same guest
          if (booking.status === "unconfirmed" && guestId) {
            return booking.guestId === guestId;
          }

          // Exclude all other cases
          return false;
        });

        // Format for date validation
        const formattedBookedDates = filteredBookedDates.map((booking) => ({
          startDate: booking.startDate,
          endDate: booking.endDate,
        }));

        // Check if range overlaps with any booked dates
        const isOverlapping = isAlreadyBooked(range, formattedBookedDates);

        // Only show the item if there's NO overlap
        return !isOverlapping;
      } catch (error) {
        // Show retreat if there's an error in filtering
        return true;
      }
    }) || [];

  function isAlreadyBooked(range, bookedDates) {
    if (!range?.from || !range?.to) return false;

    return bookedDates.some((booking, index) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      const rangeFrom = new Date(range.from);
      const rangeTo = new Date(range.to);

      // Normalize dates
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      rangeFrom.setHours(0, 0, 0, 0);
      rangeTo.setHours(0, 0, 0, 0);

      // Flexible: allows check-out and check-in on same day
      // Only conflicts if the stay periods actually overlap
      const hasOverlap = rangeFrom < bookingEnd && rangeTo > bookingStart;

      return hasOverlap;
    });
  }

  return (
    <div className="border border-accent-500/30 rounded-2xl sm:rounded-3xl overflow-hidden bg-primary-900/40 backdrop-blur-sm shadow-2xl">
      {/* Package Header */}
      <div className="relative bg-linear-to-br from-accent-500/10 via-accent-500/5 to-transparent border-b border-accent-500/20 p-6 sm:p-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-accent-500/5 rounded-full blur-3xl -mr-30 -mt-30 pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-accent-400 mb-3 bg-accent-500/10 px-4 py-1.5 rounded-full border border-accent-500/20">
            ✦ Premium Package
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Complete Villa <span className="text-accent-400">Package</span>
          </h1>
          <p className="text-primary-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Experience the ultimate retreat with our entire property
          </p>
        </div>

        {/* Info + Pricing */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10">
          <div className="bg-primary-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex-1 max-w-2xl">
            <p className="text-sm sm:text-base text-accent-300 font-bold">
              Includes all {rooms.length} villa rooms and {cabins.length} wooden
              cabins
            </p>
            <p className="text-primary-400 text-sm mt-2">
              Total capacity:{" "}
              <span className="font-black text-white">
                {totalCapacity} guests
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4">
            {/* Pricing */}
            <div className="bg-primary-950/70 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center">
              <span className="text-primary-400 text-xs font-bold block mb-1">
                Starts at
              </span>
              <div className="flex items-baseline gap-2 justify-center">
                {totalDiscount > 0 && (
                  <span className="text-sm text-primary-500 line-through">
                    ₹{totalRegularPrice}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-black text-accent-400">
                  ₹{totalDiscount > 0 ? finalPrice : totalRegularPrice}
                </span>
                <span className="text-primary-400 text-xs font-medium">
                  /night
                </span>
              </div>
            </div>

            {/* Booking Button */}
            {range?.from &&
            range?.to &&
            filteredRetreats.length < comboRetreats.length ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl py-3 px-6 text-red-400 font-bold text-sm text-center">
                Sold Out for Selected Dates
              </div>
            ) : (
              <Link
                href="/booking/villa"
                className={`flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-primary-950 py-3.5 px-8 rounded-xl font-black transition-all duration-300 text-sm sm:text-base hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/20 whitespace-nowrap ${
                  isVillaLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setIsVillaLoading(true)}
              >
                {isVillaLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Book Complete Villa →"
                )}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Retreats Grid */}
      <div className="p-6 sm:p-8">
        <RetreatSection
          title="Complete Villa Package - All Retreats"
          retreats={filteredRetreats}
          type="combo"
          emptyMessage="Villa not available for following dates"
          isCombo={true}
        />
      </div>
    </div>
  );
}

export default VillaPackageView;
