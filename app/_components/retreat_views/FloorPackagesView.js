"use client";
import { useState } from "react";
import FloorPackageCard from "./FloorPackageCard";
import { useReservation } from "../contexts/ReservationContext";

function FloorPackagesView({ rooms, bookedDates, cabins, guestId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { range } = useReservation();

  // Helper function to calculate package details
  const createPackageDetails = (retreats) => {
    const totalCapacity = retreats.reduce(
      (sum, retreat) => sum + retreat.maxCapacity,
      0
    );

    const totalPrice = retreats.reduce((sum, retreat) => {
      const discount = Math.round(
        (retreat.regularPrice * (retreat.discount || 0)) / 100
      );
      return sum + (retreat.regularPrice - discount);
    }, 0);

    const totalOriginalPrice = retreats.reduce(
      (sum, retreat) => sum + retreat.regularPrice,
      0
    );

    return {
      totalCapacity,
      totalPrice,
      totalOriginalPrice,
      hasDiscount: totalPrice < totalOriginalPrice,
    };
  };

  // Function to check if a package is available for the selected dates
  const isPackageAvailable = (packageRetreats) => {
    if (!range?.from || !range?.to) return true;

    const selectedStart = new Date(range.from);
    const selectedEnd = new Date(range.to);

    return packageRetreats.every((retreat) => {
      const retreatBookedDates = bookedDates.filter(
        (booking) =>
          booking.retreatId === retreat.id && booking.type === retreat.type
      );

      const relevantBookings = retreatBookedDates.filter((booking) => {
        if (booking.status === "confirmed" || booking.status === "checked-in") {
          return true;
        }
        if (booking.status === "unconfirmed" && guestId) {
          return booking.guestId === guestId;
        }
        return false;
      });

      return !relevantBookings.some((booking) => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
        return selectedStart < bookingEnd && selectedEnd > bookingStart;
      });
    });
  };

  // Create floor packages
  const floorPackages = [];

  // Ground Floor Package (3 rooms)
  if (rooms.length >= 3) {
    const groundFloorRooms = rooms.slice(0, 3);
    const groundFloorDetails = createPackageDetails(groundFloorRooms, "room");

    floorPackages.push({
      name: "Ground Floor Package",
      retreats: groundFloorRooms.map((room) => ({ ...room, type: "room" })),
      totalCapacity: groundFloorDetails.totalCapacity,
      description: "All 3 villa rooms",
      price: groundFloorDetails.totalPrice,
      originalPrice: groundFloorDetails.totalOriginalPrice,
      hasDiscount: groundFloorDetails.hasDiscount,
      bookingUrl: "/booking/ground",
      isAvailable: isPackageAvailable(
        groundFloorRooms.map((room) => ({ ...room, type: "room" }))
      ),
    });
  }

  // First Floor Package (2 cabins)
  if (cabins.length >= 2) {
    const firstFloorCabins = cabins.slice(0, 2);
    const firstFloorDetails = createPackageDetails(firstFloorCabins, "cabin");

    floorPackages.push({
      name: "First Floor Package",
      retreats: firstFloorCabins.map((cabin) => ({ ...cabin, type: "cabin" })),
      totalCapacity: firstFloorDetails.totalCapacity,
      description: "2 wooden cabins",
      price: firstFloorDetails.totalPrice,
      originalPrice: firstFloorDetails.totalOriginalPrice,
      hasDiscount: firstFloorDetails.hasDiscount,
      bookingUrl: "/booking/first",
      isAvailable: isPackageAvailable(
        firstFloorCabins.map((cabin) => ({ ...cabin, type: "cabin" }))
      ),
    });
  }

  // Filter packages based on availability when dates are selected
  const availablePackages =
    range?.from && range?.to
      ? floorPackages.filter((pack) => pack.isAvailable)
      : floorPackages;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
        Floor Packages (6 guests)
      </h2>

      {availablePackages.length > 0 ? (
        <div className="space-y-8">
          {availablePackages.map((pack, index) => (
            <FloorPackageCard
              key={pack.name}
              pack={pack}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            {range?.from && range?.to
              ? "No floor packages available for the selected dates."
              : "No floor packages available."}
          </p>
        </div>
      )}
    </div>
  );
}

export default FloorPackagesView;
