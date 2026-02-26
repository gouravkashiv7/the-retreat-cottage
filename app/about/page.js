import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";

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
  title: "About",
  description:
    "Discover The Retreat Cottage — a luxury 5-bedroom mountain villa near Kasauli, Himachal Pradesh. Nestled in a breathtaking pine valley with panoramic Himalayan views.",
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
    <div className="space-y-28 md:space-y-36 pb-20">
      {/* ─── Hero Heading ─── */}
      <div className="text-center relative">
        <FadeUp>
          <Badge
            variant="outline"
            className="mb-6 border-accent-400/40 text-accent-400 bg-accent-400/5 text-xs tracking-widest uppercase px-4 py-1.5"
          >
            ✦ Near Kasauli, Himachal Pradesh
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 text-accent-400 font-medium tracking-tight leading-tight">
            About The <br className="hidden sm:block" />
            <span className="italic text-accent-300">Retreat Cottage</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-300 max-w-2xl mx-auto leading-relaxed">
            Discover Your Perfect Mountain Sanctuary Where Luxury Meets Serenity
          </p>
        </FadeUp>
      </div>

      {/* ─── Story Section ─── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
        <FadeUp className="col-span-1 md:col-span-7 order-2 md:order-1 space-y-6">
          <Badge
            variant="outline"
            className="border-accent-400/30 text-accent-400 text-xs tracking-widest uppercase bg-transparent"
          >
            Our Story
          </Badge>
          <h2 className="text-3xl sm:text-4xl text-white font-medium leading-tight">
            Your Exclusive Mountain{" "}
            <span className="text-accent-400">Escape Awaits</span>
          </h2>
          <div className="space-y-4 text-primary-300 leading-relaxed">
            <p>
              Nestled in the heart of a breathtaking pine valley,{" "}
              <strong className="text-primary-100">The Retreat Cottage</strong>{" "}
              offers a charming 5-bedroom independent villa surrounded by
              majestic Himalayan peaks. Experience stunning panoramic views and
              serene ambiance—your perfect sanctuary away from city life's
              hustle and bustle.
            </p>
            <p>
              Strategically positioned between the charming hill stations of
              Kasauli and Solan, our villa provides the ideal base for exploring
              both towns' unique character. Adventure enthusiasts will love our
              proximity to the heritage toy train track, offering unforgettable
              trekking experiences through nature's splendor.
            </p>
            <p>
              Immerse yourself in fresh pine-scented air, peaceful surroundings,
              and the perfect harmony of luxury and comfort. Whether you seek
              relaxation, rejuvenation, or adventure, our villa promises
              unforgettable memories with personalized attention to every
              detail.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/retreats"
              className="inline-flex items-center gap-2 bg-accent-500 px-6 py-3 text-primary-900 font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Explore Retreats
            </Link>
            <a
              href="tel:+919906039157"
              className="inline-flex items-center gap-2 border border-accent-400/40 px-6 py-3 text-accent-400 font-semibold rounded-xl hover:bg-accent-400/10 transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </div>
        </FadeUp>

        <ScaleIn className="col-span-1 md:col-span-5 order-1 md:order-2">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-400/10 rounded-3xl blur-3xl -z-10 scale-105" />
            <Image
              src={image1}
              quality={85}
              placeholder="blur"
              alt="Luxury villa room with mountain view at The Retreat Cottage"
              className="w-full h-auto rounded-3xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </ScaleIn>
      </div>

      {/* ─── Location Section ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-primary-950/80 border border-white/5 p-8 md:p-12 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent-400/5 rounded-full blur-3xl -z-10" />

        <FadeUp className="mb-10">
          <Badge
            variant="outline"
            className="border-accent-400/30 text-accent-400 text-xs tracking-widest uppercase bg-transparent mb-4"
          >
            Location
          </Badge>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-400/10 flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-accent-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl text-white font-medium">
              Prime Location in Nature's Lap
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeUp className="space-y-5">
            {[
              {
                icon: <Sparkles className="h-4 w-4 text-accent-400" />,
                title: "Strategic Location",
                desc: "Perfectly situated between Kasauli and Solan, offering the best of both iconic hill stations",
              },
              {
                icon: <Mountain className="h-4 w-4 text-accent-400" />,
                title: "Breathtaking Accessibility",
                desc: "Easy reach from both towns, making sightseeing and local exploration effortlessly convenient",
              },
              {
                icon: <Trees className="h-4 w-4 text-accent-400" />,
                title: "Unique Heritage Experience",
                desc: "Near the charming heritage toy train track, offering picturesque trekking routes filled with nostalgic charm",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 group">
                  <div className="h-8 w-8 rounded-lg bg-accent-400/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent-400/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-500 px-6 py-3 text-primary-900 font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 hover:scale-105"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeUp>

          <ScaleIn>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl h-full min-h-70">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.3724941405317!2d77.0166679!3d30.904210700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f87109b9272f1%3A0x1cc88c9993d31c6d!2sThe%20Retreat%20Cottage!5e0!3m2!1sen!2sin!4v1761327870057!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Retreat Cottage Location"
              />
            </div>
          </ScaleIn>
        </div>
      </div>

      {/* ─── Amenities Section ─── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
        <ScaleIn className="col-span-1 md:col-span-5 order-1">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-400/10 rounded-3xl blur-3xl -z-10 scale-105" />
            <Image
              src={image2}
              quality={85}
              placeholder="blur"
              alt="Wooden cabin nestled in pine forests at The Retreat Cottage"
              className="w-full h-auto rounded-3xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </ScaleIn>

        <div className="col-span-1 md:col-span-7 order-2">
          <FadeUp className="mb-8">
            <Badge
              variant="outline"
              className="border-accent-400/30 text-accent-400 text-xs tracking-widest uppercase bg-transparent mb-4"
            >
              Amenities
            </Badge>
            <h2 className="text-3xl sm:text-4xl text-white font-medium leading-tight">
              Unmatched Luxury &{" "}
              <span className="text-accent-400">Personalized Experiences</span>
            </h2>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </StaggerGrid>
        </div>
      </div>

      {/* ─── Reviews Section ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-primary-950/80 border border-white/5 p-8 md:p-12 backdrop-blur-sm">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-400/5 rounded-full blur-3xl -z-10" />

        <FadeUp className="text-center mb-12">
          <Badge
            variant="outline"
            className="border-accent-400/30 text-accent-400 text-xs tracking-widest uppercase bg-transparent mb-4"
          >
            Guest Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl text-white font-medium">
            Hear From Our{" "}
            <span className="text-accent-400">Delighted Guests</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
            </div>
            <span className="text-primary-300 text-sm">5.0 on Google</span>
          </div>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {googleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </StaggerGrid>

        <FadeUp className="text-center mt-10">
          <a
            href="https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-accent-400/40 px-6 py-3 text-accent-400 font-semibold rounded-xl hover:bg-accent-400/10 transition-all duration-300"
          >
            <Star className="h-4 w-4 fill-current" />
            Read More Reviews on Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </FadeUp>
      </div>

      {/* ─── Contact Strip ─── */}
      <FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Phone className="h-5 w-5 text-accent-400" />,
              label: "Phone",
              value: "+91 99060 39157",
              href: "tel:+919906039157",
            },
            {
              icon: <Mail className="h-5 w-5 text-accent-400" />,
              label: "Email",
              value: "info@retreatcottage.in",
              href: "mailto:info@retreatcottage.in",
            },
            {
              icon: <MapPin className="h-5 w-5 text-accent-400" />,
              label: "Location",
              value: "Dharampur, HP",
              href: "https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="flex items-center gap-4 bg-primary-950/60 border border-white/5 rounded-2xl p-5 hover:border-accent-400/30 hover:bg-primary-800/40 transition-all duration-300 group"
            >
              <div className="h-10 w-10 rounded-xl bg-accent-400/10 flex items-center justify-center shrink-0 group-hover:bg-accent-400/20 transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-primary-400 text-xs uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-white font-medium text-sm">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </FadeUp>

      {/* ─── CTA Section ─── */}
      <FadeUp>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-accent-600/20 via-accent-500/10 to-transparent border border-accent-400/20 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,153,99,0.08),transparent_70%)] pointer-events-none" />
          <Badge
            variant="outline"
            className="border-accent-400/30 text-accent-400 text-xs tracking-widest uppercase bg-transparent mb-6"
          >
            Book Your Stay
          </Badge>
          <h2 className="text-3xl sm:text-5xl mb-6 text-white font-medium tracking-tight">
            Ready for Your Dream{" "}
            <span className="text-accent-400">Mountain Getaway?</span>
          </h2>
          <p className="text-lg text-primary-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Experience the perfect blend of luxury, comfort, and natural beauty.
            Your unforgettable mountain escape is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/retreats"
              className="inline-flex items-center gap-2 bg-accent-500 px-8 py-4 text-primary-900 text-lg font-semibold hover:bg-accent-600 transition-all rounded-xl hover:scale-105 duration-300 shadow-2xl shadow-accent-500/20"
            >
              <Sparkles className="h-5 w-5" />
              Explore Our Retreats
            </Link>
            <a
              href="tel:+919906039157"
              className="inline-flex items-center gap-2 border border-accent-400/40 px-8 py-4 text-accent-400 text-lg font-semibold rounded-xl hover:bg-accent-400/10 transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              Call to Book
            </a>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
