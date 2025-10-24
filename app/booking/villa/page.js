import { notFound } from "next/navigation";
import { getRooms, getCabins } from "@/app/_lib/data-service";
import BookingLayout from "@/app/_components/booking/BookingLayout";
import BookingHeader from "@/app/_components/booking/BookingHeader";
import RetreatsList from "@/app/_components/booking/RetreatsList";
import PackageFeatures from "@/app/_components/booking/PackageFeatures";
import BookingSummary from "@/app/_components/booking/BookingSummary";

export default async function VillaPackageBookingPage() {
  const [rooms, cabins] = await Promise.all([getRooms(), getCabins()]);

  if (!rooms || !cabins) notFound();

  const allRetreats = [
    ...rooms.map((room) => ({ ...room, type: "room" })),
    ...cabins.map((cabin) => ({ ...cabin, type: "cabin" })),
  ];

  const totalCapacity = allRetreats.reduce(
    (sum, retreat) => sum + retreat.maxCapacity,
    0
  );
  const totalPrice = allRetreats.reduce((sum, retreat) => {
    const discount = Math.round(
      (retreat.regularPrice * (retreat.discount || 0)) / 100
    );
    return sum + (retreat.regularPrice - discount);
  }, 0);

  const totalOriginalPrice = allRetreats.reduce(
    (sum, retreat) => sum + retreat.regularPrice,
    0
  );

  const pricing = {
    totalPrice,
    totalOriginalPrice,
    hasDiscount: totalPrice < totalOriginalPrice,
  };

  const stats = [
    { label: "Total Guests", value: `${totalCapacity} guests` },
    { label: "Villa Rooms", value: `${rooms.length} rooms` },
    { label: "Wooden Cabins", value: `${cabins.length} cabins` },
    { label: "Total Retreats", value: allRetreats.length },
  ];

  const features = [
    [
      "Entire property exclusive access",
      `All ${rooms.length} villa rooms`,
      `All ${cabins.length} wooden cabins`,
      "Private events and gatherings",
    ],
    [
      "Complete privacy and security",
      "Dedicated staff support",
      "Perfect for large groups and events",
      "Customizable dining options",
    ],
  ];

  // Custom guest options for villa: 10-12 guests
  const guestOptions = Array.from({ length: 3 }, (_, i) => i + 10); // [10, 11, 12]

  return (
    <BookingLayout>
      <BookingHeader
        title="Complete Villa Package"
        subtitle="Experience the ultimate retreat with our entire property"
        description={`Includes all ${rooms.length} villa rooms and ${cabins.length} wooden cabins`}
        stats={`Total capacity: ${totalCapacity} guests`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RetreatsList title="Villa Rooms" retreats={rooms} type="room" />
          <RetreatsList title="Wooden Cabins" retreats={cabins} type="cabin" />
          <PackageFeatures
            title="Complete Villa Features"
            features={features}
          />
        </div>

        <div className="lg:col-span-1">
          <BookingSummary
            packageName="Complete Villa"
            pricing={pricing}
            stats={stats}
            showSpecialRequirements={true}
            guestOptions={guestOptions}
            retreats={allRetreats} // Pass retreats for dynamic pricing
          />
        </div>
      </div>
    </BookingLayout>
  );
}
