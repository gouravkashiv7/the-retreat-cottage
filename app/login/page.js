import Image from "next/image";
import Link from "next/link";
import retreat from "@/public/retreat.webp";
import logo from "@/public/logo-blue.png";
import SignInButton from "../_components/SignInButton";
import { Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "Sign In",
  description:
    "Sign in to The Retreat Cottage to manage your bookings, view reservations, and access your guest dashboard.",
};

export default function Page() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={retreat}
          fill
          placeholder="blur"
          className="object-cover object-center"
          quality={80}
          alt="Pine valley view from The Retreat Cottage"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/90 via-primary-950/70 to-primary-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,17,29,0.5)_100%)]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-0">
        <div className="bg-primary-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/8 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-400/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

          {/* Logo & Branding */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-accent-400 blur-xl opacity-15 rounded-full scale-150" />
              <Image
                src={logo}
                width={56}
                height={48}
                quality={100}
                alt="The Retreat Cottage logo"
                className="relative z-10"
                style={{ filter: "saturate(7)" }}
              />
            </div>

            <span className="inline-block text-accent-400 font-bold tracking-[0.35em] uppercase text-[10px] mb-5 bg-accent-500/10 px-5 py-1.5 rounded-full border border-accent-500/20 backdrop-blur-xl">
              Guest Portal
            </span>

            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight text-center leading-snug">
              Welcome to <br />
              <span className="italic font-light text-accent-300">
                Your Retreat.
              </span>
            </h1>

            <p className="text-primary-300 text-sm sm:text-base mt-4 text-center leading-relaxed max-w-xs">
              Sign in to manage your reservations, update your profile, and
              access exclusive guest features.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-primary-500 text-[10px] font-bold uppercase tracking-widest">
              Continue with
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Sign In Button */}
          <SignInButton />

          {/* Trust Signals */}
          <div className="mt-8 flex items-center justify-center gap-2 text-primary-500">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium">
              Secured with Google Authentication
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 text-center">
          <p className="text-primary-400 text-sm">
            Don&apos;t have a booking yet?{" "}
            <Link
              href="/retreats"
              className="text-accent-400 hover:text-accent-300 font-semibold transition-colors underline underline-offset-4 decoration-accent-500/30 hover:decoration-accent-400"
            >
              Explore Retreats
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
