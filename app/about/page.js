import imageToyTrain from "@/public/toy-train.png";
import imageBalcony from "@/public/balcony-view.png";
import imageTrack from "@/public/track.png";
import imageVilla from "@/public/about-1.jpg";
import imageForest from "@/public/about-2.jpg";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Mountain,
  Trees,
  Sparkles,
  Phone,
  Mail,
  ExternalLink,
  Compass,
  Wind,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  FadeUp,
  StaggerGrid,
  ScaleIn,
  FeatureCard,
  ReviewCard,
} from "@/app/_components/about/AboutAnimations";

export const revalidate = 1727800;
export const metadata = {
  title: "About Our 5-Bedroom Luxury Villa Kasauli",
  description:
    "Discover The Retreat Cottage — a luxury 5-bedroom mountain villa near Kasauli, Himachal Pradesh. Nestled in a breathtaking pine valley with panoramic Himalayan views.",
  alternates: {
    canonical: "/about",
  },
};

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

const features = [
  {
    emoji: "🏡",
    title: "Luxury Accommodations",
    description:
      "Exquisite architecture blending modern elegance with warm, homely comfort",
  },
  {
    emoji: "🛏️",
    title: "Premium Bedding",
    description:
      "Luxurious fine bed linens ensuring restful sleep and ultimate comfort",
  },
  {
    emoji: "💎",
    title: "Elegant Interiors",
    description:
      "Sophisticated marble flooring complemented by beautiful timber doors and windows",
  },
  {
    emoji: "❄️",
    title: "Climate Control",
    description:
      "Air-conditioned rooms providing perfect comfort in every season",
  },
  {
    emoji: "🍽️",
    title: "Dining Experience",
    description:
      "Delicious vegetarian menu featuring homemade meals prepared with love",
  },
  {
    emoji: "🔥",
    title: "Evening Entertainment",
    description:
      "Magical bonfire and barbecue sessions creating unforgettable memories",
  },
  {
    emoji: "✨",
    title: "Personalized Service",
    description: "Tailored experiences and dedicated attention to every guest",
  },
  {
    emoji: "🌲",
    title: "Nature Immersion",
    description:
      "Fresh pine-scented air and panoramic Himalayan views from every corner",
  },
];

export default function Page() {
  return (
    <div className="space-y-32 md:space-y-48 pb-20">
      {/* ─── Hero Heading ─── */}
      <section className="relative pt-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-primary-400/10 blur-[100px] rounded-full" />
        </div>

        <div className="text-center px-4">
          <FadeUp>
            <div className="inline-flex items-center gap-2 mb-8 bg-accent-400/5 border border-accent-400/20 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
              </span>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-300">
                Dharampur, Himachal Pradesh
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl mb-8 font-medium tracking-tighter leading-[0.9] text-white">
              The Art of <br />
              <span className="italic font-light bg-linear-to-r from-accent-200 via-accent-400 to-accent-300 bg-clip-text text-transparent">
                Mountain Living
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-primary-300 max-w-3xl mx-auto font-light leading-relaxed">
              Step into a sanctuary where luxury is defined by the whisper of
              pines and the grandeur of the Himalayas.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 px-4 max-w-7xl mx-auto">
          <ScaleIn>
            <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-16/10 md:aspect-21/9">
              <Image
                src={imageBalcony}
                priority
                alt="Panoramic valley and mountain view from The Retreat Cottage Balcony Dharampur"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 md:p-6 rounded-2xl">
                  <p className="text-white/90 text-sm md:text-base italic leading-relaxed">
                    "Waking up to the view of the valley shrouded in morning
                    mist is an experience words can barely describe."
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ─── Story Section ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-0.5 w-12 bg-accent-500" />
                <span className="text-accent-400 text-xs font-bold tracking-[0.3em] uppercase">
                  Our Narrative
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl text-white font-medium leading-[1.1]">
                A Harmonious Blend of <br />
                <span className="text-accent-400 italic">Nature & Luxury</span>
              </h2>
            </FadeUp>

            <div className="space-y-6 text-primary-200 text-lg leading-relaxed font-light">
              <p>
                Founded on the dream of creating an intimate escape,{" "}
                <strong className="text-accent-300 font-medium">
                  The Retreat Cottage
                </strong>{" "}
                is more than just a villa. It is a curated experience designed
                for those who seek the extraordinary.
              </p>
              <p>
                Nestled within a lush pine valley, our 5-bedroom independent
                haven serves as your private observatory to the Himalayan
                theater. Every window is a frame, every breath of mountain air a
                rejuvenation.
              </p>
              <p>
                Perfectly poised between the nostalgia of Kasauli and the rustic
                charm of Solan, we offer you the luxury of silence, punctuated
                only by the rhythmic passage of the heritage toy train nearby.
              </p>
            </div>

            <FadeUp delay={0.2}>
              <div className="pt-6 flex flex-wrap gap-5">
                <Link
                  href="/retreats"
                  className="group inline-flex items-center gap-3 bg-accent-500 px-8 py-4 text-primary-950 font-bold rounded-2xl hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-500/20"
                >
                  <Compass className="h-5 w-5 transition-transform group-hover:rotate-45" />
                  Begin Your Journey
                </Link>
                <a
                  href="tel:+919906039157"
                  className="inline-flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-4 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 text-accent-400" />
                  Direct Inquiry
                </a>
              </div>
            </FadeUp>
          </div>

          <div className="relative order-1 lg:order-2">
            <ScaleIn>
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[700px]">
                <Image
                  src={imageVilla}
                  alt="Luxury wooden cabin interior at The Retreat Cottage Dharampur Kasauli"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent-500/10 blur-[80px] rounded-full -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full -z-10" />
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ─── Heritage & Tracks Section ─── */}
      <section className="relative py-24 overflow-hidden bg-primary-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(196,153,99,0.15),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <FadeUp>
              <Badge
                variant="outline"
                className="mb-4 border-accent-400/30 text-accent-400 bg-accent-400/5 px-4 py-1"
              >
                The Local Vibe
              </Badge>
              <h2 className="text-4xl md:text-6xl text-white font-medium mb-6">
                Whispers of the <span className="italic font-light">Heritage</span>
              </h2>
              <p className="text-primary-300 max-w-2xl mx-auto text-lg font-light">
                Distance yourself from the mundane with walks along the timeless
                heritage tracks that define our valley.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <FadeUp className="group">
              <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl ring-1 ring-white/10 mb-8">
                <Image
                  src={imageToyTrain}
                  alt="Historic Kalka-Shimla Toy Train bridge near Dharampur Kasauli"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-950 via-transparent to-transparent opacity-40" />
              </div>
              <h3 className="text-2xl text-white font-medium mb-4 flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-accent-400/10 flex items-center justify-center">
                  <Wind className="h-4 w-4 text-accent-400" />
                </span>
                The Nostalgic Express
              </h3>
              <p className="text-primary-300 font-light leading-relaxed">
                Watch the iconic Kalka-Shimla Toy Train wind through the hills. A
                UNESCO World Heritage site that passes just moments away,
                  bringing a soulful rhythm to your stay.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="group">
              <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl ring-1 ring-white/10 mb-8">
                <Image
                  src={imageTrack}
                  alt="Scenic walking tracks through pine forests in Dharampur Himachal"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-950 via-transparent to-transparent opacity-40" />
              </div>
              <h3 className="text-2xl text-white font-medium mb-4 flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-accent-400/10 flex items-center justify-center">
                  <Compass className="h-4 w-4 text-accent-400" />
                </span>
                Trekking the Pines
              </h3>
              <p className="text-primary-300 font-light leading-relaxed">
                Follow the sun dappled tracks through ancient pine forests. These
                undiscovered trails offer the perfect meditative walk for soul
                searchers and adventure lovers alike.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── Amenities Section ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 sticky lg:top-32">
            <FadeUp>
              <span className="text-accent-500 font-bold tracking-[0.3em] uppercase text-xs block mb-4">
                Curated Comfort
              </span>
              <h2 className="text-4xl md:text-5xl text-white font-medium leading-[1.1] mb-8">
                Every Detail, <br />
                <span className="text-accent-400">Thoughtfully Refined</span>
              </h2>
              <p className="text-primary-300 text-lg font-light leading-relaxed mb-10">
                We believe true luxury lies in the quality of your rest and the
                seamlessness of your experience.
              </p>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-square">
                <Image
                  src={imageForest}
                  alt="Lush green pine forest surrounding The Retreat Cottage Dharampur"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </StaggerGrid>
          </div>
        </div>
      </section>

      {/* ─── Location & Map Section ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary-950/40 border border-white/5 p-8 md:p-16 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400 font-semibold mb-6">
                  <MapPin className="h-4 w-4" />
                  Privileged Location
                </div>
                <h2 className="text-4xl md:text-5xl text-white font-medium">
                  Gateway to the <br />
                  <span className="text-accent-400">Higher Hills</span>
                </h2>
              </FadeUp>

              <div className="space-y-8">
                {[
                  {
                    icon: <Sparkles className="h-5 w-5 text-accent-400" />,
                    title: "Strategic Solitude",
                    desc: "Perfectly balanced between the vibrant markets of Kasauli and the administrative convenience of Solan.",
                  },
                  {
                    icon: <Mountain className="h-5 w-5 text-accent-400" />,
                    title: "Panoramic Vistas",
                    desc: "Unobstructed views of the valley that change with every hour, from golden dawns to star-studded nights.",
                  },
                ].map((item, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div className="flex items-start gap-6 group">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent-500 group-hover:text-primary-950 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">
                          {item.title}
                        </h3>
                        <p className="text-primary-300 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp>
                <a
                  href="https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-primary-950 px-8 py-4 font-bold rounded-2xl hover:bg-accent-400 transition-all duration-300"
                >
                  <MapPin className="h-5 w-5" />
                  Locate on Maps
                  <ExternalLink className="h-4 w-4" />
                </a>
              </FadeUp>
            </div>

            <ScaleIn className="h-[500px] lg:h-[600px]">
              <div className="rounded-[2.5rem] overflow-hidden ring-1 ring-white/10 shadow-2xl h-full relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.3724941405317!2d77.0166679!3d30.904210700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f87109b9272f1%3A0x1cc88c9993d31c6d!2sThe%20Retreat%20Cottage!5e0!3m2!1sen!2sin!4v1761327870057!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.3) contrast(1.1) invert(0)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Retreat Cottage Location Dharampur Himachal"
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/20 rounded-[2.5rem]" />
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ─── Reviews Section ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-16">
          <span className="text-accent-500 font-bold tracking-[0.3em] uppercase text-xs block mb-4">
            Guest Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl text-white font-medium mb-6">
            Cherished <span className="italic">Memories</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent-400 fill-accent-400" />
              ))}
            </div>
            <span className="text-primary-300 font-light">
              Truly Exceptional Experience (5.0 on Google)
            </span>
          </div>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {googleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </StaggerGrid>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[3.5rem] bg-accent-500 px-8 py-20 md:py-32 text-center shadow-2xl">
            {/* Elegant Background Patterns */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
            </div>
            <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] bg-white/20 blur-[120px] rounded-full rotate-45" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-primary-950 mb-10 leading-[1]">
                Your Private Piece of <br />
                <span className="italic underline underline-offset-8 decoration-primary-950/20">
                  Himalayan Paradise
                </span>
              </h2>
              <p className="text-primary-900/80 text-xl font-medium mb-12 max-w-2xl mx-auto">
                Limited dates available for the upcoming season. Reserve your
                haven of peace today and experience nature like never before.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/retreats"
                  className="group inline-flex items-center gap-3 bg-primary-950 text-white px-10 py-5 text-lg font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <Sparkles className="h-5 w-5 text-accent-400 transition-transform group-hover:animate-pulse" />
                  Explore Our Retreats
                </Link>
                <a
                  href="tel:+919906039157"
                  className="inline-flex items-center gap-3 border-2 border-primary-950/30 text-primary-950 px-10 py-5 text-lg font-bold rounded-2xl hover:bg-primary-950/5 transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  Call to Reserve
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ─── Contact Info ─── */}
      <section className="max-w-5xl mx-auto px-4">
        <FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Phone className="h-5 w-5" />,
                label: "Call Us",
                value: "+91 99060 39157",
                href: "tel:+919906039157",
              },
              {
                icon: <Mail className="h-5 w-5" />,
                label: "Write to Us",
                value: "info@retreatcottage.in",
                href: "mailto:info@retreatcottage.in",
              },
              {
                icon: <MapPin className="h-5 w-5" />,
                label: "Visit Us",
                value: "Dharampur, HP",
                href: "https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-400/30 transition-all duration-500"
              >
                <div className="h-14 w-14 rounded-2xl bg-accent-400/10 flex items-center justify-center text-accent-400 mb-6 group-hover:scale-110 group-hover:bg-accent-400 group-hover:text-primary-950 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-primary-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {item.label}
                </span>
                <span className="text-white font-medium">{item.value}</span>
              </a>
            ))}
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
