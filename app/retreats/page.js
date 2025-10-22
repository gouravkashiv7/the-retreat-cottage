import { getCabins, getRooms } from "../_lib/data-service";
import ItemCard from "@/app/_components/ItemCard";

export const metadata = {
  title: "Luxury Retreats",
};

// Using "Our Retreats"
export default async function RetreatsPage() {
  const [rooms, cabins] = await Promise.all([getRooms(), getCabins()]);

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-accent-400 font-medium text-center sm:text-left">
        Our Luxury Retreats
      </h1>
      <p className="text-primary-200 text-base sm:text-lg mb-8 sm:mb-10 text-center sm:text-left">
        Discover five exclusive retreats at The Retreat Cottage, each offering a
        unique blend of rustic elegance and modern comfort amidst Kasauli's
        serene hills.
      </p>

      {/* Villa Rooms Section */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
          Villa Rooms
        </h2>
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
            {rooms.map((room) => (
              <ItemCard key={room.id} item={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4">
            <p className="text-primary-300 text-base sm:text-lg">
              Villa rooms coming soon.
            </p>
          </div>
        )}
      </div>

      {/* Wooden Cabins Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-accent-400 font-medium text-center sm:text-left">
          Wooden Cabins
        </h2>
        {cabins.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14">
            {cabins.map((cabin) => (
              <ItemCard key={cabin.id} item={cabin} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4">
            <p className="text-primary-300 text-base sm:text-lg">
              Wooden cabins coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
