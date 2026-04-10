"use client";
import { useState } from "react";
import RetreatSection from "../RetreatSection";
import Link from "next/link";
import { useReservation } from "@/app/_components/contexts/ReservationContext";
import { Sparkles, ArrowRight } from "lucide-react";

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
    <div className="border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden bg-primary-900/40 backdrop-blur-2xl shadow-2xl relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px] -mr-60 -mt-60 pointer-events-none z-0" />
      
      {/* Package Header */}
      <div className="relative border-b border-white/10 p-6 sm:p-10 lg:p-14 z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 shadow-[0_0_15px_rgba(198,153,99,0.15)]">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Premium Exclusive Package</span>
            <Sparkles className="h-3 w-3 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="text-white">Complete Villa</span>{" "}
            <span className="bg-linear-to-r from-accent-300 via-accent-400 to-accent-600 bg-clip-text text-transparent drop-shadow-sm">
              Package
            </span>
          </h1>
          <p className="text-primary-300/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Experience absolute privacy and luxury. This exclusive package reserves our entire property for your private mountain retreat.
          </p>
        </div>

        {/* Info + Pricing Container */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-8 bg-black/20 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <p className="text-accent-300 font-bold text-lg">
                  Unified Luxury Experience
                </p>
                <p className="text-primary-400 text-sm">
                  Includes all {rooms.length} villa rooms and {cabins.length} wooden cabins
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
               <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold">
                 Total capacity: {totalCapacity} guests
               </span>
               <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold">
                 Full Mountain Access
               </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-6">
            {/* Pricing */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center shadow-xl flex-1">
              <span className="text-primary-400 text-xs font-bold uppercase tracking-widest block mb-2">
                Package Starts at
              </span>
              <div className="flex items-baseline gap-3 justify-center">
                {totalDiscount > 0 && (
                  <span className="text-base sm:text-lg text-primary-500 line-through">
                    ₹{totalRegularPrice}
                  </span>
                )}
                <span className="text-3xl sm:text-5xl font-black text-accent-400">
                  ₹{totalDiscount > 0 ? finalPrice : totalRegularPrice}
                </span>
                <span className="text-primary-400 text-xs font-medium uppercase tracking-widest">
                  / night
                </span>
              </div>
            </div>

            {/* Booking Button */}
            {range?.from &&
            range?.to &&
            filteredRetreats.length < comboRetreats.length ? (
              <div className="flex items-center justify-center p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold text-sm text-center">
                Sold Out for Selected Dates
              </div>
            ) : (
              <Link
                href="/booking/villa"
                className={`group/btn relative overflow-hidden flex items-center justify-center gap-3 bg-linear-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-primary-950 py-5 px-10 rounded-2xl font-black transition-all duration-300 text-base sm:text-lg hover:scale-[1.02] shadow-[0_10px_30px_rgba(198,153,99,0.3)] hover:shadow-[0_15px_45px_rgba(198,153,99,0.5)] whitespace-nowrap ${
                  isVillaLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setIsVillaLoading(true)}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[15deg] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-out z-0" />
                
                {isVillaLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-950 border-t-transparent rounded-full animate-spin relative z-10" />
                    <span className="relative z-10">Loading...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Book Complete Villa</span>
                    <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  </>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Retreats Grid */}
      <div className="p-6 sm:p-10 lg:p-14 relative z-10">
        <RetreatSection
          title="Inside the Villa Package"
          retreats={filteredRetreats}
          type="combo"
          emptyMessage="Unfortunately, the full villa is not available for these dates."
          isCombo={true}
        />
      </div>
    </div>
  );
}

export default VillaPackageView;
