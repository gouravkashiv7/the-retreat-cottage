import BookingLayout from "../../_components/booking/BookingLayout";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  Info,
  Star,
  Navigation,
  Calendar,
} from "lucide-react";
import BlogComments from "@/app/_components/blog/BlogComments";
import { getComments } from "@/app/_lib/blog-actions";
import { getAdminUser } from "@/app/_lib/data-service";

export const metadata = {
  title: "Best Places to Visit in Solan | Sightseeing & Hidden Gems Guide",
  description:
    "Explore Solan's top attractions: Jatoli Temple (Asia's highest), Mohan Heritage Park, Menri Monastery, and Karol Tibba. Your local guide to the City of Red Gold.",
  keywords: [
    "best places to visit in solan",
    "solan sightseeing",
    "jatoli temple solan",
    "mohan heritage park",
    "karol tibba trekking",
    "menri monastery solan",
    "dagshai jail museum",
    "tourist attractions in solan",
    "places to visit near solan",
  ],
  authors: [{ name: "The Retreat Cottage" }],
  category: "Travel Guide",
  openGraph: {
    title: "Discover Solan's Hidden Gems | The Retreat Cottage Guide",
    description:
      "Your local destination guide to Solan's spiritual and historic landmarks. Get local insights from The Retreat Cottage.",
    url: "https://retreatcottage.in/guides/solan",
    siteName: "The Retreat Cottage",
    images: [
      {
        url: "/solan/park1.webp",
        width: 1200,
        height: 630,
        alt: "Mohan Shakti Heritage Park Solan",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Places to Visit in Solan",
    description: "Detailed guide to sightseeing in Solan, Himachal Pradesh.",
    images: ["/solan/park1.webp"],
  },
};

const locations = [
  {
    name: "Mohan Shakti Heritage Park",
    description:
      "One of the most elaborate heritage parks in India, this temple and park complex is known for its intricate marble carvings, statues, and tranquil manicured gardens. A masterpiece of modern craftsmanship.",
    mapUrl: "https://maps.app.goo.gl/2HE6KNG11jkYPbTY9",
    tips: "Arrive early as it can get crowded during weekends. Photography is allowed but be respectful of the religious sanctity. Visit Riva waterfall nearby as they can be planned together.",
    images: [
      "/solan/park1.webp",
      "/solan/park2.webp",
      "/solan/park3.webp",
      "/solan/park4.webp",
    ],
  },
  {
    name: "Riva Waterfall",
    description:
      "A serene waterfall close to Mohan Shakti Heritage Park. It is generally crowded and doesn't have much water throughout the year, but it's a great spot to relax briefly after visiting the park.",
    mapUrl: "https://maps.app.goo.gl/zjC9nEMuP4pxb9wo8",
    tips: "Since it's close to the Heritage Park, stack these two together for your morning itinerary.",
    images: ["/solan/riva1.webp", "/solan/riva2.webp"],
  },
  {
    name: "Jatoli Temple",
    description:
      "Famous for being Asia's highest Shiva temple, Jatoli Temple is a marvel of Indo-Aryan architecture. The temple's majestic structure and the peaceful environment make it a top spiritual destination.",
    mapUrl: "https://maps.app.goo.gl/3GF9CyjNPvR28CLK6",
    tips: "The temple has a unique 'clinking' sound when you hit the stones. Don't forget to explore the cave below.",
    images: ["/solan/jatoli1.webp", "/solan/jatoli2.webp"],
  },
  {
    name: "Karol Tibba",
    description:
      "The highest peak in Solan, associated with the Pandavas during their exile. A hiking trail leads through dense forests and ends with a panoramic view and an ancient cave.",
    mapUrl: "https://maps.app.goo.gl/QgHtRPk7xTWWbBUj8",
    tips: "It's for those who like trekking. Note that it could be closed sometimes, so check local status before starting.",
    images: ["/solan/karol1.webp", "/solan/karol2.webp"],
  },
  {
    name: "Dagshai Cantonment & Jail Museum",
    description:
      "One of the oldest British cantonments in India. It offers a nostalgic journey through colonial history and the historic Dagshai Jail Museum, which provides a glimpse into the past.",
    mapUrl: "https://maps.app.goo.gl/A7mxbwUyJes7LGtq8",
    tips: "The jail museum has a small entry fee and closes early in the evening. Keep your ID handy as it's a cantonment area.",
    images: ["/solan/jail1.webp", "/solan/jail2.webp"],
  },
  {
    name: "The Menri Monastery",
    description:
      "One of the oldest monasteries in India and the world headquarters of the Bon religion. It's a peaceful sanctuary with vibrant murals and a unique cultural experience in the hills.",
    mapUrl: "https://maps.app.goo.gl/zgyMimfMK2yuU1y39",
    tips: "Wait for the prayer ceremonies for a truly immersive experience.",
    images: [
      "/solan/monestry1.webp",
      "/solan/monestry2.webp",
      "/solan/monestry3.webp",
    ],
  },
  {
    name: "Shoolini Mata Temple",
    description:
      "Dedicated to Goddess Shoolini, after whom the town Solan is named. The temple is a beautiful piece of local and cultural heritage, perfect for those seeking peace and blessings.",
    mapUrl: "https://maps.app.goo.gl/b6fBPQaohzPb6wCh8",
    tips: "Visible from the road and highly accessible. Most vibrant during the annual Shoolini Mela in June.",
    images: ["/solan/shoolini2.webp", "/solan/shoolini2 (2).webp"],
  },
];

export default async function SolanGuide() {
  const [comments, admin] = await Promise.all([
    getComments("solan"),
    getAdminUser("admin@retreatcottage.in"),
  ]);

  const authorName = admin?.fullName || "Gourav Kashiv";
  const authorRole = admin?.role || "Owner & Admin";
  const authorImage =
    admin?.image ||
    "https://lh3.googleusercontent.com/a/ACg8ocL81T-F4X9W0h1t8qXmO-fXGf7_N-f_0=s96-c";

  return (
    <BookingLayout>
      <div className="max-w-5xl mx-auto py-12 px-6 sm:px-8 text-primary-50">
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Link
            href="/retreats"
            className="text-accent-500 hover:text-accent-400 text-sm font-bold uppercase tracking-widest mb-4 inline-block transition-colors"
          >
            ← Back to Retreats
          </Link>
          <h1 className="text-5xl sm:text-6xl font-black mb-6 tracking-tight text-white px-2">
            Discover <span className="text-accent-500">Solan</span>
          </h1>
          <p className="text-primary-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8 px-4">
            From Asia's highest Shiva temple to serene colonial hilltops,
            explore the 'City of Red Gold' nestled right in our backyard.
          </p>

          <div className="flex items-center justify-center gap-10 border-y border-white/5 py-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full border-2 border-accent-500/30 overflow-hidden ring-4 ring-primary-950 shadow-2xl">
                <Image
                  src={authorImage}
                  fill
                  sizes="48px"
                  className="object-cover"
                  alt={authorName}
                />
              </div>
              <div className="text-left">
                <p className="text-white font-bold leading-tight">
                  {authorName}
                </p>
                <p className="text-accent-500 text-[10px] uppercase font-black tracking-widest">
                  {authorRole}
                </p>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-3 text-primary-400">
              <Calendar className="h-5 w-5 text-accent-500/50" />
              <span className="text-xs uppercase font-black tracking-tighter">
                Feb 28, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-24">
          {locations.map((loc, index) => (
            <div
              key={loc.name}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-linear-to-r from-accent-500/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

                {loc.images.length === 1 ? (
                  <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                    <Image
                      src={loc.images[0]}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary-950/60 via-transparent to-transparent"></div>
                  </div>
                ) : loc.images.length === 2 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-3/4 overflow-hidden rounded-3xl border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-1">
                      <Image
                        src={loc.images[0]}
                        alt={`${loc.name} view 1`}
                        fill
                        sizes="(max-width: 768px) 50vw, 400px"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                    <div className="relative aspect-3/4 overflow-hidden rounded-3xl border border-white/10 shadow-2xl mt-8 transform transition-transform duration-700 group-hover:translate-y-2 group-hover:rotate-1">
                      <Image
                        src={loc.images[1]}
                        alt={`${loc.name} view 2`}
                        fill
                        sizes="(max-width: 768px) 50vw, 400px"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {loc.images.map((img, i) => (
                      <div
                        key={i}
                        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl transition-all duration-700 group-hover:shadow-accent-500/10 ${
                          i === 0
                            ? "aspect-4/5"
                            : i === 1
                              ? "aspect-square mt-4 sm:mt-6"
                              : i === 2
                                ? "aspect-square -mt-4 sm:-mt-6"
                                : "aspect-4/5"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${loc.name} view ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 45vw, 300px"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 text-accent-400 text-xs font-black uppercase tracking-[0.2em]">
                  <Star className="h-4 w-4 fill-accent-400 shadow-[0_0_10px_rgba(236,201,140,0.4)]" />
                  Must Visit in Solan
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {loc.name}
                </h2>

                <p className="text-primary-200 text-lg leading-relaxed font-medium">
                  {loc.description}
                </p>

                <div className="p-6 bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500/20 p-1.5 rounded-lg shrink-0 mt-0.5">
                      <Info className="h-4 w-4 text-accent-400" />
                    </div>
                    <p className="text-sm text-primary-300 leading-relaxed font-semibold italic">
                      {loc.tips}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-primary-950 font-black rounded-2xl transition-all hover:scale-105 group/link shadow-lg shadow-accent-500/10"
                  >
                    View on Map
                    <ExternalLink className="h-5 w-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comments Section */}
        <div className="mt-40 border-t border-white/5 pt-20">
          <BlogComments blogId="solan" initialComments={comments} />
        </div>
      </div>
    </BookingLayout>
  );
}
