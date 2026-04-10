import BookingLayout from "../_components/booking/BookingLayout";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Compass, Sparkles, Navigation } from "lucide-react";

export const metadata = {
  title: "Local Travel Guides | Explore Kasauli & Solan | The Retreat Cottage",
  description:
    "Discover the best of Himachal Pradesh with our curated travel guides. Explore Kasauli's colonial charm and Solan's spiritual wonders.",
  keywords: [
    "kasauli travel guide",
    "solan sightseeing",
    "himachal tourism",
    "places to visit near the retreat cottage",
    "local guide kasauli",
    "local guide solan",
  ],
};

const guides = [
  {
    title: "Magical Kasauli",
    description: "Explore colonial architecture, misty nature trails, and panoramic Himalayan views in this charming cantonment town.",
    image: "/kasauli/manki1.webp",
    href: "/guides/kasauli",
    tags: ["Nature", "Colonial", "Relaxing"],
    duration: "15 min drive",
  },
  {
    title: "Discover Solan",
    description: "Visit Asia's highest Shiva temple, explore ancient monasteries, and discover the 'City of Red Gold'.",
    image: "/solan/park1.webp",
    href: "/guides/solan",
    tags: ["Spiritual", "Heritage", "Adventure"],
    duration: "30 min drive",
  },
];

export default function GuidesPage() {
  return (
    <BookingLayout>
      <div className="max-w-7xl mx-auto py-20 px-6 sm:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-500 text-xs font-black uppercase tracking-widest">
            <Compass className="h-4 w-4" />
            Curated Experiences
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">
            Local <span className="text-accent-500">Guides</span>
          </h1>
          <p className="text-primary-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Enhance your stay at The Retreat Cottage with our handpicked selection 
            of local destinations and hidden gems.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group relative flex flex-col bg-primary-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-accent-500/30 transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-12"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  {guide.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white/80 text-xs font-bold">
                  <Navigation className="h-3 w-3 text-accent-500" />
                  {guide.duration}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-black text-white group-hover:text-accent-500 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-primary-300 text-sm leading-relaxed line-clamp-2">
                  {guide.description}
                </p>
                
                <div className="pt-4 flex items-center text-accent-500 text-sm font-black uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
                  Read Guide
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute -inset-2 bg-accent-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </Link>
          ))}

          {/* Coming Soon Card */}
          <div 
            className="relative flex flex-col items-center justify-center p-8 bg-primary-900/40 backdrop-blur-xl border border-dashed border-white/10 rounded-[2.5rem] text-center space-y-6 group min-h-[400px] animate-in fade-in slide-in-from-bottom-12"
            style={{ animationDelay: "450ms" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-500/20 blur-2xl animate-pulse rounded-full" />
              <div className="relative w-16 h-16 bg-primary-800 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="h-8 w-8 text-accent-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">More Coming Soon</h3>
              <p className="text-primary-400 text-sm max-w-[200px] mx-auto italic">
                We're currently exploring more gems to share with you.
              </p>
            </div>

            <div className="px-5 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary-500">
              New Destinations
            </div>
          </div>
        </div>

        {/* Bottom CTA - Feedback */}
        <div className="mt-32 text-center p-12 bg-linear-to-r from-accent-500/10 via-transparent to-accent-500/10 rounded-[3rem] border border-white/5">
          <Sparkles className="h-10 w-10 text-accent-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Share Your Experience</h2>
          <p className="text-primary-300 mb-8 max-w-xl mx-auto">
            We value your feedback! Tell us what you loved about your stay or suggest how we can make your experience even better.
          </p>
          <Link
            href="/feedback"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-950 font-black rounded-2xl hover:bg-accent-500 transition-all hover:scale-105"
          >
            Leave Feedback
          </Link>
        </div>
      </div>
    </BookingLayout>
  );
}
