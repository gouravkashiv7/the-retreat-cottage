import BookingLayout from "../../_components/booking/BookingLayout";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  Clock,
  Camera,
  Navigation,
  User,
  Calendar,
} from "lucide-react";
import BlogComments from "@/app/_components/blog/BlogComments";
import { getComments } from "@/app/_lib/blog-actions";
import { getAdminUser } from "@/app/_lib/data-service";

export const metadata = {
  title: "10 Best Places to Visit in Kasauli | Complete Sightseeing Guide",
  description:
    "Planning a trip to Kasauli? Discover top sightseeing spots like Manki Point, Gilbert Trail, and Sunset Point. Expert travel tips from The Retreat Cottage.",
  keywords: [
    "best places to visit in kasauli",
    "kasauli sightseeing",
    "kasauli tourist spots",
    "manki point kasauli",
    "gilbert trail kasauli",
    "the mall road kasauli",
    "kasauli travel guide",
    "places to visit near kasauli",
  ],
  authors: [{ name: "The Retreat Cottage" }],
  category: "Travel Guide",
  openGraph: {
    title: "The Ultimate Kasauli Sightseeing Guide | The Retreat Cottage",
    description:
      "Explore the best of Kasauli: from ancient temples to scenic nature trails. Get local pro-tips for your visit.",
    url: "https://retreatcottage.in/guides/kasauli",
    siteName: "The Retreat Cottage",
    images: [
      {
        url: "/kasauli/manki1.webp",
        width: 1200,
        height: 630,
        alt: "Manki Point Hanuman Temple Kasauli",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Places to Visit in Kasauli",
    description:
      "Your local guide to sightseeing in Kasauli, Himachal Pradesh.",
    images: ["/kasauli/manki1.webp"],
  },
};

const locations = [
  {
    name: "Manki Point (Hanuman Temple)",
    description:
      "Also known as Sanjeevni Hanuman Temple, this is a small, highly revered hilltop temple dedicated to Lord Hanuman. It is located within an Indian Air Force station and offers sweeping views of the surroundings. A popular legend states that Lord Hanuman's foot touched this hill while he was carrying the Sanjeevni Booti.",
    mapUrl: "https://maps.app.goo.gl/D7bnJPtZqAWVG6q4A",
    tips: "Electronic items like mobile phones and cameras are not allowed inside the secure area and must be deposited in lockers before the trek to the temple begins. ID is required.",
    images: ["/kasauli/manki1.webp", "/kasauli/manki2.webp"],
  },
  {
    name: "Gilbert Trail",
    description:
      "A 1.5 km long stone-paved track that is a paradise for nature lovers and bird watchers. It offers stunning views of the lush green valleys and the plains below.",
    mapUrl: "https://maps.app.goo.gl/KueeNJ8wyKqXDzNPA",
    tips: "Best visited during early morning for bird watching and tranquility.",
    images: ["/kasauli/gilbert1.webp", "/kasauli/gilbert2.webp"],
  },
  {
    name: "Christ Church",
    description:
      "This is a historic church dating back to British rule, built in 1844. It is known for its beautiful architecture, including stained-glass windows and a clock tower, and is a very peaceful and serene place to visit. It's located right at the beginning of the Mall Road.",
    mapUrl: "https://maps.app.goo.gl/dUt3jhKe9sbbSGb38",
    tips: "Located right near the Mall Road. Entry is free and peaceful.",
    images: ["/kasauli/christ1.webp", "/kasauli/christ2.webp"],
  },
  {
    name: "Sunset Point",
    description:
      "A popular spot to witness a beautiful sunset over the Himalayan hills. It's a great place to relax and enjoy the views, especially in the evening.",
    mapUrl: "https://maps.app.goo.gl/Zyg1GLXgtCGEsXpk7",
    tips: "Arrive on route to Gilbert Trail to secure a good viewing spot and enjoy the transition from forest to sunset vistas.",
    images: ["/kasauli/sunset1.webp", "/kasauli/sunset2.webp"],
  },
  {
    name: "The Mall Road",
    description:
      "This is the main thoroughfare in Kasauli, divided into Upper and Lower Mall. It's a bustling area filled with small shops, cafes, and eateries, making it a perfect place for a leisurely stroll and to enjoy local food. The famous Christ Church is located on the Mall Road itself.",
    mapUrl: "https://maps.app.goo.gl/6qymxELSTNFSPRnu9",
    tips: "Try the famous 'Bun Samosa' and explore the local Tibetan markets.",
    images: ["/kasauli/mall1.webp", "/kasauli/mall2.webp"],
  },
];

export default async function KasauliGuide() {
  const [comments, admin] = await Promise.all([
    getComments("kasauli"),
    getAdminUser("admin@retreatcottage.in"),
  ]);

  const authorName = admin?.fullName || "Gourav Kashiv";
  const authorRole = admin?.role || "Owner & Admin";
  const authorImage =
    admin?.image ||
    "https://lh3.googleusercontent.com/a/ACg8ocL81T-F4X9W0h1t8qXmO-fXGf7_N-f_0=s96-c";

  return (
    <BookingLayout>
      <div className="max-w-5xl mx-auto py-12 px-6 sm:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Link
            href="/retreats"
            className="text-accent-500 hover:text-accent-400 text-sm font-bold uppercase tracking-widest mb-4 inline-block transition-colors"
          >
            ← Back to Retreats
          </Link>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight">
            Magical <span className="text-accent-400">Kasauli</span>
          </h1>
          <p className="text-primary-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            A guide to the most enchanting spots in this colonial charm-filled
            town. Just a short drive from The Retreat Cottage.
          </p>

          <div className="flex items-center justify-center gap-10 border-y border-white/5 py-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full border-2 border-accent-500/30 overflow-hidden ring-4 ring-primary-950">
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

        {/* Content Grid */}
        <div className="space-y-24">
          {locations.map((loc, index) => (
            <section
              key={loc.name}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Side - Grid Style */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-1">
                    <Image
                      src={loc.images[0]}
                      alt={`${loc.name} view 1`}
                      fill
                      sizes="(max-width: 768px) 50vw, 400px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl mt-8 transform transition-transform duration-700 group-hover:translate-y-2 group-hover:rotate-1">
                    <Image
                      src={loc.images[1]}
                      alt={`${loc.name} view 2`}
                      fill
                      sizes="(max-width: 768px) 50vw, 400px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-6 lg:p-4">
                <div className="flex items-center gap-3 text-accent-400">
                  <span className="p-2 bg-accent-400/10 rounded-lg">
                    <Navigation className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-black uppercase tracking-widest">
                    Best of Kasauli
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {loc.name}
                </h2>

                <p className="text-primary-200 text-lg leading-relaxed font-medium">
                  {loc.description}
                </p>

                <div className="p-6 bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500/20 p-1.5 rounded-lg shrink-0 mt-0.5">
                      <Clock className="h-4 w-4 text-accent-400" />
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
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-primary-950 font-black rounded-2xl transition-all hover:scale-105 active:scale-95 group/link shadow-lg shadow-accent-500/10"
                  >
                    Get Directions
                    <ExternalLink className="h-5 w-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Comment System Integration */}
        <div className="mt-40 border-t border-white/5 pt-20">
          <BlogComments blogId="kasauli" initialComments={comments} />
        </div>
      </div>
    </BookingLayout>
  );
}
