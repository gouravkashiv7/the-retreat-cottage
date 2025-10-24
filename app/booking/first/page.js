import { notFound } from "next/navigation";
import { getCabins } from "@/app/_lib/data-service";
import BookingLayout from "@/app/_components/booking/BookingLayout";
import BookingHeader from "@/app/_components/booking/BookingHeader";
import RetreatsList from "@/app/_components/booking/RetreatsList";
import PackageFeatures from "@/app/_components/booking/PackageFeatures";
import BookingSummary from "@/app/_components/booking/BookingSummary";

export default async function FirstFloorBookingPage() {
  const cabins = await getCabins();
  if (!cabins) notFound();

  const firstFloorCabins = cabins.slice(0, 2);
  if (firstFloorCabins.length !== 2) notFound();

  const totalCapacity = firstFloorCabins.reduce(
    (sum, cabin) => sum + cabin.maxCapacity,
    0
  );
  const totalPrice = firstFloorCabins.reduce((sum, cabin) => {
    const discount = Math.round(
      (cabin.regularPrice * (cabin.discount || 0)) / 100
    );
    return sum + (cabin.regularPrice - discount);
  }, 0);

  const totalOriginalPrice = firstFloorCabins.reduce(
    (sum, cabin) => sum + cabin.regularPrice,
    0
  );

  const pricing = {
    totalPrice,
    totalOriginalPrice,
    hasDiscount: totalPrice < totalOriginalPrice,
  };

  const stats = [
    { label: "Total Guests", value: `${totalCapacity} guests` },
    { label: "Number of Cabins", value: "2 cabins" },
  ];

  const features = [
    [
      "Exclusive first floor access",
      "Private balcony/deck areas",
      "Nature immersion experience",
      "Perfect for couples or small groups",
    ],
  ];

  // Custom guest options for first floor: 4-6 guests
  const guestOptions = Array.from({ length: 3 }, (_, i) => i + 4); // [4, 5, 6]

  return (
    <BookingLayout>
      <BookingHeader
        title="First Floor Package"
        subtitle="2 wooden cabins - Nature experience with comfort"
        description={`Includes 2 wooden cabins with total capacity for ${totalCapacity} guests`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RetreatsList
            title="Included Cabins"
            retreats={firstFloorCabins}
            type="cabin"
          />
          <PackageFeatures title="Package Features" features={features} />
        </div>

        <div className="lg:col-span-1">
          <BookingSummary
            packageName="First Floor"
            pricing={pricing}
            stats={stats}
            guestOptions={guestOptions}
          />
        </div>
      </div>
    </BookingLayout>
  );
}

export async function generateMetadata() {
  return {
    title: "First Floor Package Booking | Villa Retreat",
    description:
      "Book the first floor package including 2 wooden cabins. Nature experience with comfort for up to 6 guests.",
  };
}
