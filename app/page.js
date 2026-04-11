"use client";

import Image from "next/image";
import Link from "next/link";
import retreat from "@/public/retreat.webp";
import { m, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  UtensilsCrossed, 
  Music, 
  Flame, 
  PawPrint, 
  Users, 
  Wifi, 
  TrainFront,
  ChevronDown,
  Star,
  Compass,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

const Feature = ({ icon: Icon, title, description }) => (
  <m.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent-500/30 transition-all duration-500 group"
  >
    <div className="h-16 w-16 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-500 mb-6 group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-primary-950 transition-all duration-300">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-primary-300 text-sm leading-relaxed text-center font-light">
      {description}
    </p>
  </m.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-accent-400 transition-colors">
          {question}
        </span>
        <ChevronDown className={`h-5 w-5 text-accent-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <m.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-primary-300 font-light leading-relaxed whitespace-pre-wrap">
          {answer}
        </p>
      </m.div>
    </div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1.05, 1.15]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "The Retreat Cottage",
    image: "https://retreatcottage.in/retreat.webp",
    description: "A luxury Pure Veg homestay near Kasauli. Offering a private 5-bedroom villa experience for up to 12 adults, with a maximum capacity of 15 guests.",
    url: "https://retreatcottage.in",
    telephone: "+919906039157",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "The Retreat Cottage, Dharampur",
      addressLocality: "Dharampur",
      addressRegion: "Himachal Pradesh",
      postalCode: "173204",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.9042107,
      longitude: 77.0166679
    },
    hasMap: "https://www.google.com/maps/place/The+Retreat+Cottage/@30.9042107,77.0166679,966m/",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: "35"
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pure Veg Kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Music & Karaoke", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bonfire & BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: "High-speed Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Heritage Train View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet Friendly (Full Villa)", value: true }
    ]
  };

  const faqData = [
    {
      question: "What is the total guest capacity?",
      answer: "We can accommodate up to 15 guests total (12 adults + children).\n\nMax adult capacity is 12 (in 5 king beds + 2 extra mattresses). Children 9 and below stay for free (limit 1 per room)."
    },
    {
      question: "Can we play music at the villa?",
      answer: "Yes, absolutely! Unlike hotels, we allow our guests to play music and enjoy Karaoke on our private sound system. To respect the valley's tranquility, we ask that music be turned down by 10 PM."
    },
    {
      question: "Are pets allowed?",
      answer: "Yes! Pets are allowed when you book an entire floor or the full villa. This ensures privacy for you and your pets."
    },
    {
      question: "What are the dining options?",
      answer: "We operate a Pure Veg kitchen. We offer delicious, home-cooked vegetarian meals tailored to your preferences."
    },
    {
      question: "What about parking and accessibility?",
      answer: "We have dedicated parking space right beside the villa that can accommodate 4-5 cars. The property is conveniently located just 500 metres from the National Highway (NH), offering easy access while maintaining mountain peace."
    },
    {
      question: "What are the check-in and check-out timings?",
      answer: "Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Please contact us for any early check-in or late check-out requests (subject to availability)."
    },
    {
      question: "How do you handle the cold mountain winters?",
      answer: "Your comfort is our priority throughout the year. All our rooms are equipped with Hot/Cold ACs and we provide additional room heaters and extra blankets to ensure a cozy and warm stay even in peak winter."
    },
    {
      question: "What is your policy on alcohol and smoking?",
      answer: "Alcohol and smoking are permitted within the privacy of your rooms. However, to maintain a fresh and welcoming environment for all our guests, smoking is not allowed in public common areas."
    },
    {
      question: "Is there accommodation for our drivers?",
      answer: "Yes, we can arrange driver accommodation within a 1 km radius of the villa for a nominal charge of ₹500. Please inform us in advance so we can ensure availability."
    },
    {
      question: "Can you arrange local transport or cabs?",
      answer: "We are happy to help you coordinate with reliable local cab facilities for your sightseeing and transport needs. To ensure you get the best local rates, we do not take any commission for facilitating these services."
    },
    {
      question: "Are there any nature walks or treks nearby?",
      answer: "The heritage toy train track is just a short 200m walk from the villa. It offers a stunning trekking path through historic old tunnels—perfect for photography. We only request our guests to help us preserve the natural beauty of the valley by not littering."
    },
    {
      question: "Is the property accessible for seniors?",
      answer: "The ground floor has 3 steps, and our super deluxe rooms are accessed by approximately 15 steps. While not fully wheelchair accessible, it is manageable for most guests."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\n/g, " ")
      }
    }))
  };

  const siteNameJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Retreat Cottage",
    url: "https://retreatcottage.in",
  };

  const shuffledFaqs = useState(() => [...faqData].sort(() => Math.random() - 0.5))[0];
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? shuffledFaqs : shuffledFaqs.slice(0, 5);

  return (
    <main className="relative min-h-svh bg-primary-950 selection:bg-accent-500 selection:text-primary-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          alt="Luxury Private Villa Dharampur near Kasauli - The Retreat Cottage Exterior"
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
              Pure Veg Luxury Homestay Near Kasauli
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
            A 5-bedroom private villa for up to 12 adults (Max 15 guests). 
            Enjoy Music, Karaoke, and majestic Himalayan views.
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
                Plan Your Retreat{" "}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/about"
              className="group text-white text-lg font-medium underline-offset-8 hover:underline decoration-accent-500/50 hover:decoration-accent-500 transition-all flex items-center gap-3 px-6 py-4"
            >
              Our Story{" "}
              <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all -rotate-45" />
            </Link>
          </m.div>
        </m.div>
      </section>

      {/* Features Section - Why Homestay? */}
      <section className="relative z-30 bg-primary-950 py-32 px-4 shadow-[0_-100px_100px_rgba(12,17,29,1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl text-white font-medium mb-8">
              Why Choose <span className="text-accent-400 italic font-light">The Homestay Experience?</span>
            </h2>
            <p className="text-primary-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Ditch the generic hotel floors. Experience a private sanctuary tailored to your group's pace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature 
              icon={UtensilsCrossed} 
              title="Pure Veg Kitchen" 
              description="Highest standards of hygiene and taste with personalized vegetarian home-cooked meals." 
            />
            <Feature 
              icon={Users} 
              title="Group Sanctuary" 
              description="Ideal for up to 12 adults. Total absolute capacity of 15 guests including children." 
            />
            <Feature 
              icon={Music} 
              title="Music & Karaoke" 
              description="Enjoy music and Karaoke on our private sound system until 10 PM." 
            />
            <Feature 
              icon={Flame} 
              title="Bonfire & BBQ" 
              description="Unwind around a warm bonfire with customized barbecue grills under the stars." 
            />
            <Feature 
              icon={PawPrint} 
              title="Pet Friendly" 
              description="Pets are welcome for Floor and Full Villa bookings. Your furry friends deserve a holiday too!" 
            />
            <Feature 
              icon={TrainFront} 
              title="Heritage Vibe" 
              description="Located right near the heritage toy train trail—perfect for long nature walks." 
            />
            <Feature 
              icon={Wifi} 
              title="High-Speed Wi-Fi" 
              description="Reliable high-quality fiber connectivity for workations and seamless streaming." 
            />
            <Feature 
              icon={ArrowRight} 
              title="Children Policy" 
              description="Children 9 and below stay for free (limit 1 per room). Maximum of 15 guests total." 
            />
          </div>
        </div>
      </section>

      {/* Local Guides Link Section */}
      <section className="relative z-30 bg-primary-950 py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative group p-8 sm:p-16 rounded-[3rem] bg-linear-to-r from-accent-500/10 via-primary-900/40 to-accent-500/10 border border-white/10 overflow-hidden text-center">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,153,99,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <Compass className="h-4 w-4" />
                Local Neighborhood
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.9]">
                More Than <br />
                <span className="text-accent-400 italic font-light">Just A Stay.</span>
              </h2>
              
              <p className="text-primary-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                From heritage toy train treks to secret mountain tunnels, 
                explore our curated local guides.
              </p>

              <div className="pt-4">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-4 bg-white hover:bg-accent-500 text-primary-950 px-10 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 group/guide-btn"
                >
                  Explore Our Guides
                  <ArrowRight className="h-5 w-5 group-hover/guide-btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-30 bg-primary-950 py-32 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-medium mb-4">Frequently Asked Questions</h2>
            <p className="text-primary-400 font-light italic">Everything you need to know about your stay.</p>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {visibleFaqs.map((faq, index) => (
                <m.div
                  key={faq.question}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <FAQItem question={faq.question} answer={faq.answer} />
                </m.div>
              ))}
            </AnimatePresence>
          </div>

          {faqData.length > 5 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white/5 hover:bg-white text-primary-200 hover:text-primary-950 border border-white/10 rounded-full font-bold transition-all duration-300 active:scale-95 shadow-xl hover:shadow-white/10"
              >
                {showAll ? "Show Less" : "View All Questions"}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
              </button>
            </div>
          )}

          {/* WhatsApp Support Section */}
          <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="h-px w-24 bg-linear-to-r from-transparent via-accent-500/30 to-transparent mx-auto mb-8" />
            <p className="text-primary-300 text-lg font-light mb-6">Still have more questions?</p>
            <Link
              href="https://wa.me/919906039157?text=i%20have%20a%20query%20regarding"
              target="_blank"
              className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 text-emerald-400 hover:text-primary-950 rounded-2xl font-black transition-all duration-500 group shadow-2xl hover:shadow-emerald-500/20"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Feel Free To Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative height-filler */}
      <div className="relative z-30 h-32 bg-linear-to-t from-primary-950 to-transparent -mt-32 pointer-events-none" />
    </main>
  );
}
