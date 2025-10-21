import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import Image from "next/image";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Retreat Cottage
        </h1>

        <div className="space-y-8">
          <p>
            Where luxury meets serenity in the tranquil hills near Kasauli. The
            Retreat Cottage offers an exclusive homestay experience that blends
            modern comfort with rustic charm, creating your perfect mountain
            sanctuary away from the hustle of city life.
          </p>
          <p>
            Our property features 3 elegantly appointed villa rooms and 2
            charming wooden cabins, each designed to provide ultimate privacy
            and comfort. But what truly sets us apart is the experience of
            waking up to breathtaking mountain views, spending your days
            exploring pine-scented trails, and unwinding in your private space
            surrounded by nature's tranquility.
          </p>
          <p>
            This is where you create lasting memories, surrounded by the beauty
            of the Himalayas. It's a place to slow down, rejuvenate, and
            rediscover the simple joys of life in a beautiful and peaceful
            setting.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          quality={80}
          placeholder="blur"
          alt="Luxury villa room with mountain view at The Retreat Cottage"
        />
      </div>

      <div className="col-span-2">
        <Image
          src={image2}
          quality={80}
          placeholder="blur"
          alt="Wooden cabin nestled in pine forests at The Retreat Cottage"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Curated with Passion for Luxury Stays
        </h1>

        <div className="space-y-8">
          <p>
            The Retreat Cottage was born from a vision to create a luxury
            homestay experience that feels both exclusive and deeply personal.
            Every aspect of our property has been thoughtfully designed to
            provide guests with the perfect blend of comfort, privacy, and
            natural beauty.
          </p>
          <p>
            From our carefully selected locations for the cabins to the premium
            amenities in each room, we've paid attention to every detail to
            ensure your stay is nothing short of extraordinary. Here, you're not
            just booking accommodation; you're becoming part of our story—a
            story of creating unforgettable mountain experiences for those who
            appreciate the finer things in life.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore Our Luxury Accommodations
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
