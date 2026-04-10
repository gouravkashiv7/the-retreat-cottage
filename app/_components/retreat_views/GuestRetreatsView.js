"use client";
import { useReservation } from "../contexts/ReservationContext";
import ItemCard from "../ItemCard";

function GuestRetreatsView({ allRetreats, guestCount, bookedDates, guestId, startDate, endDate }) {
  const { range: contextRange } = useReservation();
  const optionalRange = startDate && endDate ? { from: new Date(startDate), to: new Date(endDate) } : null;
  const range = contextRange?.from && contextRange?.to ? contextRange : optionalRange;


  // Filter retreats based on range and bookedDates
  const filteredRetreats =
    allRetreats?.filter((retreat) => {
      try {
        // If no range is selected, show all items
        if (!range?.from || !range?.to) {
          return true;
        }

        // Filter bookedDates for this specific retreat
        const retreatBookedDates = (bookedDates || []).filter((booking) => {
          // Check both retreatId AND type to avoid conflicts between rooms and cabins with same IDs
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

        // LOGGING FOR DEBUGGING
        if (formattedBookedDates.length > 0) {
          console.log(
            `[GuestRetreatsView] ${retreat.type} #${retreat.id} "${retreat.name}":`,
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

  const smallRetreats = filteredRetreats.filter(
    (retreat) => retreat.maxCapacity >= guestCount,
  );

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 sm:mb-10">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent-500/20 to-transparent" />
        <h2 className="text-2xl sm:text-3xl text-accent-400 font-black tracking-tight text-center shrink-0">
          Retreats for {guestCount} guest{guestCount > 1 ? "s" : ""}
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent-500/20 to-transparent" />
      </div>
      {smallRetreats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {smallRetreats.map((retreat) => (
            <ItemCard
              key={`${retreat.type}-${retreat.id}`}
              item={retreat}
              isFull={retreat.type === "cabin" && guestCount === 3}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-primary-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
          <p className="text-primary-300 text-base sm:text-lg font-medium">
            No retreats available for the given dates.
          </p>
        </div>
      )}
    </div>
  );
}

export default GuestRetreatsView;
