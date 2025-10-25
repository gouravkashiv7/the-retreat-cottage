import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";

function Retreat({ retreat, type }) {
  const { name, maxCapacity, image, description } = retreat;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-6 lg:gap-20 border border-primary-800 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-10 mb-12 lg:mb-24">
      <div className="relative h-56 sm:h-72 lg:h-96 order-1">
        <Image
          src={image}
          alt={`${type.charAt(0).toUpperCase() + type.slice(1)} ${name}`}
          fill
          className="w-full h-full object-cover rounded-lg lg:rounded-none"
          priority={true}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="order-2">
        <h3 className="text-accent-100 font-black text-3xl sm:text-4xl lg:text-6xl mb-4 sm:mb-6 text-center lg:text-left bg-primary-950 lg:bg-transparent p-3 sm:p-4 lg:p-0 -mx-3 sm:-mx-4 lg:mx-0">
          {type.charAt(0).toUpperCase() + type.slice(1)} {name}
        </h3>

        <p className="text-sm sm:text-base lg:text-lg text-primary-300 mb-6 lg:mb-10 text-center lg:text-left">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 sm:gap-4 mb-6 lg:mb-7">
          <li className="flex gap-2 sm:gap-3 items-center">
            <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0" />
            <span className="text-sm sm:text-base lg:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3 items-center">
            <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0" />
            <span className="text-sm sm:text-base lg:text-lg">
              Located in the heart of{" "}
              <span className="font-bold">Kasauli Hills</span>
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3 items-center">
            <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0" />
            <span className="text-sm sm:text-base lg:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Retreat;
