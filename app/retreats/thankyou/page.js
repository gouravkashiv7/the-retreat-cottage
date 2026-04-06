"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { CheckCircle2, ArrowRight, Calendar, Home } from "lucide-react";
import retreat from "@/public/retreat.webp";

export default function Page() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl bg-primary-900/40 backdrop-blur-sm border border-primary-800/50">
      {/* Background Layer with subtle animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src={retreat}
          fill
          placeholder="blur"
          className="object-cover object-center translate-y-[-10%]"
          alt="The Retreat Cottage"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950 via-transparent to-primary-950" />
      </div>

      <div className="relative z-10 max-w-2xl px-6 py-12 text-center w-full">
        {/* Animated Checkmark */}
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent-500/10 border border-accent-500/20 shadow-[0_0_50px_rgba(198,153,99,0.1)]"
        >
          <CheckCircle2 className="h-12 w-12 text-accent-500" strokeWidth={1.5} />
        </m.div>

        {/* Text Content */}
        <m.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-white sm:text-5xl">
            Reserved with <br />
            <span className="italic font-light text-accent-300">Perfect Harmony.</span>
          </h1>
          <p className="mb-10 text-lg sm:text-xl text-primary-200/90 font-light leading-relaxed">
            Thank you for choosing The Retreat Cottage. Your mountain escape is now confirmed. We look forward to welcoming you to the Himalayan pine valleys.
          </p>
        </m.div>

        {/* Action Buttons */}
        <m.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/account/reservations"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-500 text-primary-950 px-8 py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_15px_35px_rgba(198,153,99,0.2)]"
          >
            <Calendar className="h-5 w-5" />
            Manage Reservations
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-100/5 hover:bg-primary-100/10 text-primary-100 px-8 py-4 rounded-xl font-medium border border-primary-100/10 backdrop-blur-md transition-all active:scale-95"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </m.div>

        {/* Note/Sub-text */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 text-sm text-primary-400 font-light italic"
        >
          Check your email for booking details and your unique reservation code.
        </m.p>
      </div>
    </div>
  );
}
