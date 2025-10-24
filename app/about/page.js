import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins, getRooms } from "../_lib/data-service";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Mountain, Trees, Sparkles } from "lucide-react";

export const revalidate = 1727800;
export const metadata = {
  title: "About",
};

// Mock reviews data - you can replace this with actual Google Places API data
const googleReviews = [
  {
    id: 1,
    author: "Rahul Sharma",
    rating: 5,
    text: "Absolutely stunning location! The villa is even better than the pictures. Perfect getaway from Delhi with amazing mountain views.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    author: "Priya Patel",
    rating: 5,
    text: "The hospitality was exceptional. The homemade vegetarian food was delicious and the rooms were spotless. Will definitely return!",
    date: "1 month ago",
  },
  {
    id: 3,
    author: "Ankit Verma",
    rating: 5,
    text: "Great property with amazing architecture. Loved the bonfire sessions in the evening. Perfect for family gatherings.",
    date: "3 weeks ago",
  },
];

export default async function Page() {
  const [rooms, cabins] = await Promise.all([getRooms(), getCabins()]);

  return (
    <div className="grid grid-cols-1 gap-x-8 lg:gap-x-24 gap-y-16 md:gap-y-32 text-lg">
      {/* Main Heading */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-accent-400 font-medium">
          About The Retreat Cottage
        </h1>
        <p className="text-xl text-primary-200 max-w-3xl mx-auto">
          Discover Your Perfect Mountain Sanctuary Where Luxury Meets Serenity
        </p>
      </div>

      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        <div className="col-span-1 md:col-span-3 order-2 md:order-1">
          <h2 className="text-3xl sm:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
            Your Exclusive Mountain Escape Awaits
          </h2>

          <div className="space-y-6 md:space-y-8">
            <p className="text-base sm:text-lg">
              Nestled in the heart of a breathtaking pine valley,{" "}
              <strong>The Retreat Cottage</strong> offers a charming 5-bedroom
              independent villa surrounded by majestic Himalayan peaks.
              Experience stunning panoramic views and serene ambiance—your
              perfect sanctuary away from city life's hustle and bustle.
            </p>
            <p className="text-base sm:text-lg">
              Strategically positioned between the charming hill stations of
              Kasauli and Solan, our villa provides the ideal base for exploring
              both towns' unique character. Adventure enthusiasts will love our
              proximity to the heritage toy train track, offering unforgettable
              trekking experiences through nature's splendor.
            </p>
            <p className="text-base sm:text-lg">
              Immerse yourself in fresh pine-scented air, peaceful surroundings,
              and the perfect harmony of luxury and comfort. Whether you seek
              relaxation, rejuvenation, or adventure, our villa promises
              unforgettable memories with personalized attention to every
              detail.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 order-1 md:order-2">
          <Image
            src={image1}
            quality={80}
            placeholder="blur"
            alt="Luxury villa room with mountain view at The Retreat Cottage"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-primary-950 rounded-lg p-8">
        <div className="flex items-start mb-6">
          <MapPin className="h-6 w-6 text-accent-400 mr-3 mt-1 flex-shrink-0" />
          <h2 className="text-2xl sm:text-3xl text-accent-400 font-medium">
            Prime Location in Nature's Lap
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <Sparkles className="h-5 w-5 text-accent-300 mr-3 mt-1 flex-shrink-0" />
              <p className="text-base sm:text-lg">
                <strong>Strategic Location:</strong> Perfectly situated between
                Kasauli and Solan, offering the best of both iconic hill
                stations
              </p>
            </div>
            <div className="flex items-start">
              <Mountain className="h-5 w-5 text-accent-300 mr-3 mt-1 flex-shrink-0" />
              <p className="text-base sm:text-lg">
                <strong>Breathtaking Accessibility:</strong> Easy reach from
                both towns, making sightseeing and local exploration
                effortlessly convenient
              </p>
            </div>
            <div className="flex items-start">
              <Trees className="h-5 w-5 text-accent-300 mr-3 mt-1 flex-shrink-0" />
              <p className="text-base sm:text-lg">
                <strong>Unique Heritage Experience:</strong> Located near the
                charming heritage toy train track, offering picturesque trekking
                routes filled with nostalgic charm
              </p>
            </div>
            <p className="text-base sm:text-lg">
              <strong>Peaceful Sanctuary:</strong> Tucked away in a tranquil
              pine valley with spectacular mountain vistas, providing complete
              privacy away from crowded tourist spots
            </p>

            <div className="mt-6">
              <a
                href="https://maps.app.goo.gl/oao5gERjuaFR76XX9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-accent-500 px-6 py-3 text-primary-800 font-semibold hover:bg-accent-600 transition-all rounded-lg transform hover:scale-105 duration-300"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Discover Our Location on Google Maps
              </a>
            </div>
          </div>

          <div className="bg-primary-900 rounded-lg p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.3724941405317!2d77.0166679!3d30.904210700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f87109b9272f1%3A0x1cc88c9993d31c6d!2sThe%20Retreat%20Cottage!5e0!3m2!1sen!2sin!4v1761327870057!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Retreat Cottage Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Value Propositions Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        <div className="col-span-1 md:col-span-2 order-1">
          <Image
            src={image2}
            quality={80}
            placeholder="blur"
            alt="Wooden cabin nestled in pine forests at The Retreat Cottage"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>

        <div className="col-span-1 md:col-span-3 order-2">
          <h2 className="text-2xl sm:text-3xl mb-6 md:mb-10 text-accent-400 font-medium">
            Unmatched Luxury & Personalized Experiences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  🏡 Luxury Accommodations
                </h3>
                <p className="text-sm">
                  Exquisite architecture blending modern elegance with warm,
                  homely comfort
                </p>
              </div>
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  🛏️ Premium Bedding
                </h3>
                <p className="text-sm">
                  Luxurious fine bed linens ensuring restful sleep and ultimate
                  comfort
                </p>
              </div>
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  💎 Elegant Interiors
                </h3>
                <p className="text-sm">
                  Sophisticated marble flooring complemented by beautiful timber
                  doors and windows
                </p>
              </div>
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  ❄️ Climate Control
                </h3>
                <p className="text-sm">
                  Air-conditioned rooms providing perfect comfort in every
                  season
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  🍽️ Dining Experience
                </h3>
                <p className="text-sm">
                  Delicious vegetarian menu featuring homemade meals prepared
                  with love
                </p>
              </div>
              {/* <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  🥩 Flexible Dining
                </h3>
                <p className="text-sm">
                  Non-vegetarian food welcome from outside to suit all
                  preferences
                </p>
              </div> */}
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  🔥 Evening Entertainment
                </h3>
                <p className="text-sm">
                  Magical bonfire and barbecue sessions creating unforgettable
                  memories
                </p>
              </div>
              <div className="bg-primary-900 p-4 rounded-lg hover:bg-primary-800 transition-all duration-300">
                <h3 className="font-semibold text-accent-300 mb-2">
                  ✨ Personalized Service
                </h3>
                <p className="text-sm">
                  Tailored experiences and dedicated attention for every guest
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Reviews Section */}
      <div className="bg-primary-950 rounded-lg p-8">
        <h2 className="text-2xl sm:text-3xl mb-8 text-accent-400 font-medium text-center">
          Hear From Our Delighted Guests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {googleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-primary-900 p-6 rounded-lg hover:bg-primary-800 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-primary-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-primary-300">
                  {review.date}
                </span>
              </div>
              <p className="text-primary-200 mb-4 text-sm">"{review.text}"</p>
              <p className="text-accent-300 font-semibold text-sm">
                - {review.author}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://maps.app.goo.gl/oao5gERjuaFR76XX9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary-800 px-6 py-3 text-accent-400 font-semibold hover:bg-primary-700 transition-all rounded-lg border border-accent-400 transform hover:scale-105 duration-300"
          >
            Read More Heartwarming Reviews on Google
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary-950 rounded-lg p-12">
        <h2 className="text-3xl sm:text-4xl mb-6 text-accent-400 font-medium">
          Ready for Your Dream Mountain Getaway?
        </h2>
        <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of luxury, comfort, and natural beauty at
          The Retreat Cottage. Your unforgettable mountain escape is just a
          click away.
        </p>
        <Link
          href="/retreats"
          className="inline-block bg-accent-500 px-10 py-5 text-primary-800 text-xl font-semibold hover:bg-accent-600 transition-all rounded-lg transform hover:scale-105 duration-300 shadow-2xl"
        >
          Explore Our Luxury Accommodations →
        </Link>
      </div>
    </div>
  );
}
