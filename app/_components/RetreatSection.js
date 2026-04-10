"use client";
import { useReservation } from "@/app/_components/contexts/ReservationContext";
import ItemCard from "./ItemCard";

function RetreatSection({
  title,
  retreats,
  guestId,
  type,
  emptyMessage,
  className = "",
  isCombo,
  bookedDates,
  optionalRange,
}) {
  const { range: contextRange } = useReservation();
  const range = contextRange?.from && contextRange?.to ? contextRange : optionalRange;

  // Filter retreats based on range and bookedDates
  const filteredRetreats =
    retreats?.filter((retreat) => {
      try {
        // If no range is selected, show all items
        if (!range?.from || !range?.to) {
          return true;
        }

        // Filter bookedDates for this specific retreat
        const retreatBookedDates = (bookedDates || []).filter((booking) => {
          const matchesId = Number(booking.retreatId) === Number(retreat.id);
          const matchesType = booking.type === type;
          return matchesId && matchesType;
        });

        // Create filtered bookedDates based on status and guest
        const filteredBookedDates = retreatBookedDates.filter((booking) => {
          // Always include confirmed, checked-in, and BLOCKED (admin blocks)
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

        const formattedBookedDates = filteredBookedDates.map((booking) => ({
          startDate: booking.startDate,
          endDate: booking.endDate,
          status: booking.status,
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

      // Flexible: allows check-out and check-in on same day
      // Only conflicts if the stay periods actually overlap
      const hasOverlap = rangeFrom < bookingEnd && rangeTo > bookingStart;

      return hasOverlap;
    });
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-6 mb-10 sm:mb-14">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent-500/40 to-transparent relative">
          <div className="absolute inset-0 bg-accent-500/20 blur-sm" />
        </div>
        <h2 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-linear-to-r from-accent-300 via-accent-400 to-accent-600 font-black tracking-wider text-center shrink-0 drop-shadow-sm">
          {title}
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-accent-500/40 to-transparent relative">
          <div className="absolute inset-0 bg-accent-500/20 blur-sm" />
        </div>
      </div>
      {filteredRetreats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredRetreats.map((retreat) => (
            <ItemCard
              key={retreat.id}
              item={{ ...retreat, type }}
              isCombo={isCombo || null}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-primary-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
          <p className="text-primary-300 text-base sm:text-lg font-medium">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default RetreatSection;
