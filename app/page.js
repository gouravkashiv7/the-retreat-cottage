"use client";

import Image from "next/image";
import Link from "next/link";
import retreat from "@/public/retreat.webp";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();

  // Parallax and fade effects
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1.05, 1.15]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "The Retreat Cottage",
    image: "https://retreatcottage.in/retreat.webp",
    description:
      "A luxury homestay nestled in the Himalayan pine valleys near Kasauli. Experience bespoke stays in our charming wooden cabins & elegant rooms.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "The Retreat Cottage, Dharampur",
      addressLocality: "Dharampur",
      addressRegion: "Himachal Pradesh",
      postalCode: "173204",
      addressCountry: "IN",
    },
    telephone: "+919906039157",
    url: "https://retreatcottage.in",
    priceRange: "$$",
  };

  return (
    <main className="relative min-h-svh bg-primary-950 selection:bg-accent-500 selection:text-primary-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Cinematic Background Layer */}
      <m.div
        style={{ y, opacity, scale }}
        className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      >
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/80 via-primary-950/40 to-primary-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,17,29,0.4)_100%)] z-11" />
        <Image
          src={retreat}
          fill
          placeholder="blur"
          className="object-cover object-center"
          quality={100}
          alt="The Retreat Cottage Cinematic View"
          priority
        />
      </m.div>

      {/* Hero Content Section */}
      <section className="relative z-20 min-h-svh flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-24 sm:pt-32">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl w-full"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-6 md:mb-10"
          >
            <span className="inline-block text-accent-400 font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 bg-accent-500/10 px-6 py-2 rounded-full border border-accent-500/20 backdrop-blur-xl">
              Luxury Homestay Near Kasauli
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl text-white font-normal mb-10 tracking-tighter leading-[0.85] drop-shadow-2xl"
          >
            Escape into <br />
            <span className="italic font-light text-accent-200">The Wild.</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-primary-100/90 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-14 font-light leading-relaxed drop-shadow-lg"
          >
            Bespoke stays in our charming wooden cabins & elegant rooms.
            Experience the harmony of nature and mountain luxury.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link
              href="/retreats"
              className="w-full sm:w-auto group relative bg-accent-500 text-primary-950 px-12 py-5 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(198,153,99,0.3)] hover:shadow-accent-500/40"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                Book Your Retreat{" "}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/about"
              className="group text-white text-lg font-medium underline-offset-8 hover:underline decoration-accent-500/50 hover:decoration-accent-500 transition-all flex items-center gap-3 px-6 py-4"
            >
              Our Story{" "}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all -rotate-45" />
            </Link>
          </m.div>
        </m.div>

        {/* Improved Scroll CTA */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
        >
          <m.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-16 rounded-full bg-linear-to-b from-accent-500/0 via-accent-500/60 to-accent-500/0"
          />
        </m.div>
      </section>

      {/* Decorative height-filler */}
      <div className="relative z-30 h-32 bg-linear-to-t from-primary-950 to-transparent -mt-32 pointer-events-none" />
    </main>
  );
}
