"use client";
import { useReservation } from "./contexts/ReservationContext";
import ItemCard from "./ItemCard";
import { isAlreadyBooked } from "./DateSelector/utils/dateValidation";

function RetreatSection({
  title,
  retreats,
  guestId,
  type,
  emptyMessage,
  className = "",
  isCombo,
  bookedDates,
}) {
  const { range } = useReservation();

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
          // Check if booking has retreatId property and matches current retreat
          const matchesRetreat = booking.retreatId === retreat.id;
          return matchesRetreat;
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

        // Check if range overlaps with any booked dates
        const isOverlapping = isAlreadyBooked(range, formattedBookedDates);

        // Only show the item if there's NO overlap
        return !isOverlapping;
      } catch (error) {
        // Show retreat if there's an error in filtering
        return true;
      }
    }) || [];

  return (
    <div className={className}>
      <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
        {title}
      </h2>
      {filteredRetreats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
          {filteredRetreats.map((retreat) => (
            <ItemCard
              key={retreat.id}
              item={{ ...retreat, type }}
              isCombo={isCombo || null}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default RetreatSection;
