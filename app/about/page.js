import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 lg:gap-x-24 gap-y-16 md:gap-y-32 text-lg items-center">
      {/* First Section */}
      <div className="col-span-1 md:col-span-3 order-1">
        <h1 className="text-3xl sm:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
          Welcome to The Retreat Cottage
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base sm:text-lg">
            Where luxury meets serenity in the tranquil hills near Kasauli. The
            Retreat Cottage offers an exclusive homestay experience that blends
            modern comfort with rustic charm, creating your perfect mountain
            sanctuary away from the hustle of city life.
          </p>
          <p className="text-base sm:text-lg">
            Our property features 3 elegantly appointed villa rooms and 2
            charming wooden cabins, each designed to provide ultimate privacy
            and comfort. But what truly sets us apart is the experience of
            waking up to breathtaking mountain views, spending your days
            exploring pine-scented trails, and unwinding in your private space
            surrounded by nature's tranquility.
          </p>
          <p className="text-base sm:text-lg">
            This is where you create lasting memories, surrounded by the beauty
            of the Himalayas. It's a place to slow down, rejuvenate, and
            rediscover the simple joys of life in a beautiful and peaceful
            setting.
          </p>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 order-2">
        <Image
          src={image1}
          quality={80}
          placeholder="blur"
          alt="Luxury villa room with mountain view at The Retreat Cottage"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Second Section - Reverse order on mobile */}
      <div className="col-span-1 md:col-span-2 order-4 md:order-3">
        <Image
          src={image2}
          quality={80}
          placeholder="blur"
          alt="Wooden cabin nestled in pine forests at The Retreat Cottage"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="col-span-1 md:col-span-3 order-3 md:order-4">
        <h1 className="text-3xl sm:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
          Curated with Passion for Luxury Stays
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p className="text-base sm:text-lg">
            The Retreat Cottage was born from a vision to create a luxury
            homestay experience that feels both exclusive and deeply personal.
            Every aspect of our property has been thoughtfully designed to
            provide guests with the perfect blend of comfort, privacy, and
            natural beauty.
          </p>
          <p className="text-base sm:text-lg">
            From our carefully selected locations for the cabins to the premium
            amenities in each room, we've paid attention to every detail to
            ensure your stay is nothing short of extraordinary. Here, you're not
            just booking accommodation; you're becoming part of our story—a
            story of creating unforgettable mountain experiences for those who
            appreciate the finer things in life.
          </p>

          <div className="text-center md:text-left">
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-6 py-4 md:px-8 md:py-5 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-all rounded-lg w-full md:w-auto text-center"
            >
              Explore Our Luxury Accommodations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
