import ItemCard from "@/app/_components/ItemCard";

export const metadata = {
  title: "Luxury Cabins - The Retreat Cottage",
};

export function Page() {
  // CHANGE
  const cabins = [];

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-accent-400 font-medium">
        Our Luxury Wooden Cabins
      </h1>
      <p className="text-primary-200 text-base sm:text-lg mb-8 sm:mb-10">
        Escape to ultimate privacy in our charming wooden cabins at The Retreat
        Cottage. Nestled amidst the pine forests near Kasauli, each cabin offers
        a unique blend of rustic charm and modern luxury. Experience the romance
        of cabin living with premium amenities, private decks with stunning
        mountain views, and the serene sounds of nature. Perfect for couples
        seeking a romantic getaway or travelers desiring a closer connection
        with nature, our cabins provide an intimate and unforgettable mountain
        experience.
      </p>

      {cabins.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <ItemCard item={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
