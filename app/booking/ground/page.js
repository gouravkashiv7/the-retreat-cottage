import { notFound } from "next/navigation";
import { getRooms, getSettings } from "@/app/_lib/data-service";
import BookingLayout from "@/app/_components/booking/BookingLayout";
import BookingHeader from "@/app/_components/booking/BookingHeader";
import RetreatsList from "@/app/_components/booking/RetreatsList";
import PackageFeatures from "@/app/_components/booking/PackageFeatures";
import BookingSummary from "@/app/_components/booking/BookingSummary";
import { getAllBookedDates } from "@/app/_lib/dates";
import { auth } from "@/app/_lib/auth";

export default async function GroundFloorBookingPage() {
  const session = await auth();
  const rooms = await getRooms();
  if (!rooms) notFound();

  const groundFloorRooms = rooms.slice(0, 3);
  if (groundFloorRooms.length !== 3) notFound();

  const totalCapacity = groundFloorRooms.reduce(
    (sum, room) => sum + room.maxCapacity,
    0
  );
  const totalPrice = groundFloorRooms.reduce((sum, room) => {
    const discount = Math.round(
      (room.regularPrice * (room.discount || 0)) / 100
    );
    return sum + (room.regularPrice - discount);
  }, 0);

  const totalOriginalPrice = groundFloorRooms.reduce(
    (sum, room) => sum + room.regularPrice,
    0
  );

  const pricing = {
    totalPrice,
    totalOriginalPrice,
    hasDiscount: totalPrice < totalOriginalPrice,
  };

  const stats = [
    { label: "Total Guests", value: `${totalCapacity} guests` },
    { label: "Number of Rooms", value: "3 rooms" },
  ];

  const features = [
    [
      "Entire ground floor access",
      "Shared common areas",
      "Perfect for family gatherings",
      "Privacy and comfort",
    ],
  ];

  const settings = await getSettings();
  const bookedDates = await getAllBookedDates();

  // Fixed guest option for ground floor: only 6 guests
  const guestOptions = [6];

  return (
    <BookingLayout>
      <BookingHeader
        title="Ground Floor Package"
        subtitle="All 3 villa rooms - Perfect for groups and families"
        description={`Includes all 3 villa rooms with total capacity for ${totalCapacity} guests`}
        stats={stats}
        retreats={groundFloorRooms}
        settings={settings}
        bookedDates={bookedDates}
        guestId={session?.user?.guestId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RetreatsList
            title="Included Rooms"
            retreats={groundFloorRooms}
            type="room"
          />
          <PackageFeatures title="Package Features" features={features} />
        </div>

        <div className="lg:col-span-1">
          <BookingSummary
            packageName="Ground Floor"
            pricing={pricing}
            stats={stats}
            retreats={groundFloorRooms}
            guestOptions={guestOptions}
          />
        </div>
      </div>
    </BookingLayout>
  );
}

export async function generateMetadata() {
  return {
    title: "Ground Floor Package Booking | Villa Retreat",
    description:
      "Book the complete ground floor package including 3 villa rooms. Perfect for groups and families up to 6 guests.",
  };
}
