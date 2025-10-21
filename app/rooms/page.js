import ItemCard from "@/app/_components/ItemCard";

export const metadata = {
  title: "Rooms",
};

function page() {
  const rooms = {};
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Elegant Villa Rooms
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Step into luxury with our three meticulously designed rooms within the
        main villa at The Retreat Cottage. Each room offers a perfect blend of
        contemporary comfort and classic charm, featuring premium amenities,
        stunning mountain views, and personalized touches. Wake up to the gentle
        Kasauli sunshine filtering through your windows, enjoy your morning tea
        on a private balcony overlooking the valley, and retreat to your serene
        space after a day of exploration. Designed for ultimate relaxation and
        sophistication, our villa rooms provide the perfect sanctuary for your
        mountain escape.
      </p>

      {rooms.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
          {rooms.map((room) => (
            <ItemCard item={room} key={room.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
