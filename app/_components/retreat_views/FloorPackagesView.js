"use client";
import { useState } from "react";
import ItemCard from "../ItemCard";
import Link from "next/link";

function FloorPackagesView({ rooms, cabins }) {
  const [isLoading, setIsLoading] = useState(false);
  // Ground floor: all 3 rooms
  const groundFloorRooms = rooms.slice(0, 3);
  const groundFloorCapacity = groundFloorRooms.reduce(
    (sum, room) => sum + room.maxCapacity,
    0
  );
  const groundFloorPrice = groundFloorRooms.reduce((sum, room) => {
    const discount = Math.round(
      (room.regularPrice * (room.discount || 0)) / 100
    );
    return sum + (room.regularPrice - discount);
  }, 0);
  const groundFloorOriginalPrice = groundFloorRooms.reduce(
    (sum, room) => sum + room.regularPrice,
    0
  );

  // First floor: 2 cabins
  const firstFloorCabins = cabins.slice(0, 2);
  const firstFloorCapacity = firstFloorCabins.reduce(
    (sum, cabin) => sum + cabin.maxCapacity,
    0
  );
  const firstFloorPrice = firstFloorCabins.reduce((sum, cabin) => {
    const discount = Math.round(
      (cabin.regularPrice * (cabin.discount || 0)) / 100
    );
    return sum + (cabin.regularPrice - discount);
  }, 0);
  const firstFloorOriginalPrice = firstFloorCabins.reduce(
    (sum, cabin) => sum + cabin.regularPrice,
    0
  );

  const floorPackages = [];

  if (groundFloorRooms.length === 3) {
    floorPackages.push({
      name: "Ground Floor Package",
      retreats: groundFloorRooms.map((room) => ({ ...room, type: "room" })),
      totalCapacity: groundFloorCapacity,
      description: "All 3 villa rooms",
      price: groundFloorPrice,
      originalPrice: groundFloorOriginalPrice,
      hasDiscount: groundFloorPrice < groundFloorOriginalPrice,
      bookingUrl: "/booking/ground",
    });
  }

  if (firstFloorCabins.length === 2) {
    floorPackages.push({
      name: "First Floor Package",
      retreats: firstFloorCabins.map((cabin) => ({ ...cabin, type: "cabin" })),
      totalCapacity: firstFloorCapacity,
      description: "2 wooden cabins",
      price: firstFloorPrice,
      originalPrice: firstFloorOriginalPrice,
      hasDiscount: firstFloorPrice < firstFloorOriginalPrice,
      bookingUrl: "/booking/first",
    });
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
        Floor Packages (6 guests)
      </h2>
      {floorPackages.length > 0 ? (
        <div className="space-y-8">
          {floorPackages.map((pack, index) => (
            <div
              key={index}
              className="border-2 border-accent-300 rounded-xl p-6"
            >
              {/* Package Header with Pricing and Button */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b border-accent-200">
                <div>
                  <h3 className="text-xl font-semibold text-accent-400 mb-1">
                    {pack.name}
                  </h3>
                  <p className="text-primary-300">
                    {pack.description} • Total capacity: {pack.totalCapacity}{" "}
                    guests
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-4">
                  {/* Pricing */}
                  <div className="flex gap-3 items-baseline bg-white rounded-lg p-3 shadow-md">
                    <span className="text-primary-600 font-medium">
                      Starts at
                    </span>
                    {pack.hasDiscount ? (
                      <>
                        <span className="text-lg sm:text-xl font-bold text-accent-600">
                          ₹{pack.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{pack.originalPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg sm:text-xl font-bold text-accent-600">
                        ₹{pack.price}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">/ night</span>
                  </div>

                  {/* Booking Button */}
                  <Link
                    href={pack.bookingUrl}
                    className={`bg-accent-500 hover:bg-accent-600 text-primary-800 py-2 px-5 rounded-lg font-semibold transition-all text-sm sm:text-base text-center whitespace-nowrap flex items-center justify-center gap-2 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setIsLoading(true)}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Book Package →"
                    )}
                  </Link>
                </div>
              </div>

              {/* Retreats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
                {pack.retreats.map((retreat) => (
                  <ItemCard
                    key={`${retreat.type}-${retreat.id}`}
                    item={retreat}
                    isCombo={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-primary-300 text-base sm:text-lg">
            No floor packages available.
          </p>
        </div>
      )}
    </div>
  );
}

export default FloorPackagesView;
