"use client";
import { useState } from "react";
import ItemCard from "../ItemCard";
import Link from "next/link";
import { useReservation } from "../contexts/ReservationContext";
import { ArrowRight } from "lucide-react";

function RetreatCombinationsView({
  combinations,
  guestCount,
  bookedDates,
  guestId,
  extraGuestPrice,
  startDate,
  endDate,
}) {
  const { range: contextRange } = useReservation();
  const optionalRange = startDate && endDate ? { from: new Date(startDate), to: new Date(endDate) } : null;
  const range = contextRange?.from && contextRange?.to ? contextRange : optionalRange;

  const [loadingCombos, setLoadingCombos] = useState({});

  // Calculate pricing and comboId for ALL combinations first (before filtering)
  const allCombinationsWithPricing =
    combinations?.map((combination, index) => {
      const totalPrice = combination.retreats.reduce((sum, retreat) => {
        const discount = Math.round(
          (retreat.regularPrice * (retreat.discount || 0)) / 100,
        );
        return sum + (retreat.regularPrice - discount);
      }, 0);

      const totalOriginalPrice = combination.retreats.reduce(
        (sum, retreat) => sum + retreat.regularPrice,
        0,
      );

      const hasDiscount = totalPrice < totalOriginalPrice;
      const comboId = `combo-${index + 1}-${guestCount}guests`;

      return {
        ...combination,
        totalPrice,
        totalOriginalPrice,
        hasDiscount,
        comboId,
      };
    }) || [];

  // Filter retreats based on range and bookedDates
  const filteredCombinations = allCombinationsWithPricing.filter(
    (combination) => {
      try {
        // If no range is selected, show all items
        if (!range?.from || !range?.to) {
          return true;
        }

        // Check each retreat in this combination for availability
        const allRetreatsAvailable = combination.retreats?.every((retreat) => {
          // Filter bookedDates for this specific retreat
          const retreatBookedDates = (bookedDates || []).filter((booking) => {
            // Check both retreatId AND type to avoid conflicts between rooms and cabins with same IDs
            const matchesId = Number(booking.retreatId) === Number(retreat.id);
            const matchesType = booking.type === retreat.type;
            return matchesId && matchesType;
          });

          // Create filtered bookedDates based on status and guest
          const filteredBookedDates = retreatBookedDates.filter((booking) => {
            // Always include confirmed and checked-in bookings
            if (
              booking.status === "confirmed" ||
              booking.status === "checked-in"
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

          // Check if range overlaps with any booked dates for this retreat
          const isOverlapping = isAlreadyBooked(range, formattedBookedDates);

          // LOGGING FOR DEBUGGING
          if (formattedBookedDates.length > 0) {
            console.log(
              `[CombinationsView] ${retreat.type} #${retreat.id} "${retreat.name}":`,
              {
                range: {
                  from: range.from.toISOString(),
                  to: range.to.toISOString(),
                },
                isOverlapping,
                bookedDates: formattedBookedDates,
              },
            );
          }

          // This retreat is available if there's NO overlap
          return !isOverlapping;
        });

        // Only show the combination if ALL retreats are available
        return allRetreatsAvailable;
      } catch (error) {
        console.error(`🚨 Error processing combination:`, error);
        // Show combination if there's an error in filtering
        return true;
      }
    },
  );

  function isAlreadyBooked(range, bookedDates) {
    if (!range?.from || !range?.to) return false;

    return bookedDates.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      const rangeFrom = new Date(range.from);
      const rangeTo = new Date(range.to);

      // Normalize dates
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      rangeFrom.setHours(0, 0, 0, 0);
      rangeTo.setHours(0, 0, 0, 0);

      // Simple overlap check
      return rangeFrom < bookingEnd && rangeTo > bookingStart;
    });
  }

  const handleComboClick = (comboId) => {
    setLoadingCombos((prev) => ({ ...prev, [comboId]: true }));
  };

  return (
    <div className="px-2 sm:px-0">
      <div className="flex items-center gap-6 mb-10 sm:mb-14">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent-500/40 to-transparent relative">
          <div className="absolute inset-0 bg-accent-500/20 blur-sm" />
        </div>
        <h2 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-linear-to-r from-accent-300 via-accent-400 to-accent-600 font-black tracking-wider text-center shrink-0 drop-shadow-sm">
          Flexible Retreat Combinations
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent-500/40 to-transparent relative">
          <div className="absolute inset-0 bg-accent-500/20 blur-sm" />
        </div>
      </div>
      <p className="text-primary-300/80 text-center mb-10 font-light italic">
        Curated selections tailored for exactly {guestCount} guests
      </p>
      {filteredCombinations.length > 0 ? (
        <div className="space-y-6 sm:space-y-8">
          {filteredCombinations.map((combination, index) => (
            <div
              key={combination.comboId}
              className="group relative bg-primary-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 hover:shadow-[0_8px_40px_rgba(198,153,99,0.1)] hover:border-accent-500/20 hover:-translate-y-1"
            >
              {/* Combination Header with Pricing and Button */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent-300 to-accent-500 mb-2">
                    Combination Option {index + 1}
                  </h3>
                  <p className="text-primary-300/80 text-sm sm:text-base font-light">
                    {combination.retreats.length} retreat{combination.retreats.length > 1 ? "s" : ""} • Total capacity:{" "}
                    <span className="text-white font-bold">{combination.totalCapacity} guests</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  {/* Pricing */}
                  <div className="flex gap-3 items-baseline bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-xl justify-center">
                    <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">
                      Package
                    </span>
                    {combination.hasDiscount ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-black text-accent-400">
                          ₹{combination.totalPrice}
                        </span>
                        <span className="text-xs sm:text-sm text-primary-500 line-through">
                          ₹{combination.totalOriginalPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl sm:text-2xl font-black text-accent-400">
                        ₹{combination.totalPrice}
                      </span>
                    )}
                    <span className="text-primary-400 text-xs font-medium">/ night</span>
                  </div>

                  {/* Booking Button */}
                  <Link
                    href={`/combo/${combination.comboId}`}
                    className={`relative overflow-hidden bg-linear-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-primary-950 py-3 px-6 rounded-xl font-black transition-all duration-300 text-sm sm:text-base text-center shadow-[0_4px_15px_rgba(198,153,99,0.2)] hover:shadow-[0_8px_25px_rgba(198,153,99,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 group/btn ${
                      loadingCombos[combination.comboId]
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleComboClick(combination.comboId)}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[15deg] group-hover/btn:translate-x-[150%] transition-transform duration-1000 ease-out z-0" />

                    {loadingCombos[combination.comboId] ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-950 border-t-transparent rounded-full animate-spin relative z-10" />
                        <span className="relative z-10">Loading...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Choose This Combo</span>
                        <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                      </>
                    )}
                  </Link>
                </div>
              </div>

              {/* Retreats Grid */}
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 lg:gap-8 xl:gap-10">
                {combination.retreats.map((retreat) => (
                  <ItemCard
                    extraGuestPrice={extraGuestPrice}
                    key={`${retreat.type}-${retreat.id}`}
                    item={retreat}
                    isCombo={true}
                    isFull={retreat.isFull}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            No combinations available for {guestCount} guests.
          </p>
        </div>
      )}
    </div>
  );
}

export default RetreatCombinationsView;
