import Reservations from "@/app/_components/Reservations";
import Retreat from "@/app/_components/Retreat";
import Spinner from "@/app/_components/Spinner";

import {
  getCabin,
  getCabins,
  getRoom,
  getRooms,
} from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { type, id } = await params;

  let retreat;
  if (type === "room") {
    retreat = await getRoom(id);
  } else {
    retreat = await getCabin(id);
  }

  const title = `${type.charAt(0).toUpperCase() + type.slice(1)} ${retreat.name}`;
  const description = retreat.description?.substring(0, 150) + "...";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | The Retreat Cottage`,
      description,
      images: [retreat.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | The Retreat Cottage`,
      description,
      images: [retreat.image],
    },
  };
}

export async function generateStaticParams() {
  try {
    const cabins = await getCabins();
    const rooms = await getRooms();

    // Transform cabins and rooms into the correct format
    const cabinParams = cabins.map((cabin) => ({
      type: "cabin", // or whatever type you use for cabins
      id: String(cabin.id),
    }));

    const roomParams = rooms.map((room) => ({
      type: "room", // or whatever type you use for rooms
      id: String(room.id),
    }));

    // Combine both arrays
    return [...cabinParams, ...roomParams];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const { type, id } = await params;

  let retreat;
  if (type === "room") {
    retreat = await getRoom(id);
  } else {
    retreat = await getCabin(id);
  }

  // Destructure after fetching
  const {
    id: retreatId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = retreat;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${name} at The Retreat Cottage`,
    description: description,
    image: image,
    numberOfRooms: 1,
    occupancy: {
      "@type": "QuantitativeValue",
      value: maxCapacity,
    },
    offers: {
      "@type": "Offer",
      price: regularPrice - discount,
      priceCurrency: "INR",
    },
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-8 px-3 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Retreat retreat={retreat} type={type} />
      <Suspense fallback={<Spinner />}>
        <Reservations retreat={retreat} type={type} />
      </Suspense>
    </div>
  );
}
