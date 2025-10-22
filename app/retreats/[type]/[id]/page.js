import TextExpander from "@/app/_components/TextExpander";
import {
  getCabin,
  getCabins,
  getRoom,
  getRooms,
} from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { type, id } = await params;

  let retreat;
  if (type === "room") {
    retreat = await getRoom(id);
  } else {
    retreat = await getCabin(id);
  }

  return {
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${retreat.name}`,
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

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 py-6 px-6 lg:py-8 lg:px-10 mb-16 lg:mb-24">
        {/* Image Section - Now first on mobile */}
        <div className="relative h-64 sm:h-80 lg:h-96 order-1">
          <Image
            src={image}
            alt={`${type.charAt(0).toUpperCase() + type.slice(1)} ${name}`}
            fill
            className="w-full h-full object-cover rounded-lg lg:rounded-none"
            priority={true}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content Section - Now second on mobile */}
        <div className="order-2">
          <h3 className="text-accent-100 font-black text-4xl sm:text-5xl lg:text-6xl mb-6 text-center lg:text-left bg-primary-950 lg:bg-transparent p-4 lg:p-0 -mx-4 lg:mx-0">
            {type.charAt(0).toUpperCase() + type.slice(1)} {name}
          </h3>

          <p className="text-base sm:text-lg text-primary-300 mb-8 lg:mb-10 text-center lg:text-left">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-8 lg:mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                Located in the heart of{" "}
                <span className="font-bold">Kasauli Hills</span>
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Reservation Section */}
      <div className="mb-16 lg:mb-24">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-center text-primary-100">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
