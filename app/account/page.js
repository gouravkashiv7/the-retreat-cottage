import { auth } from "../_lib/auth";
import Link from "next/link";
import {
  CalendarDays,
  User,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  Receipt,
} from "lucide-react";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").at(0) || "Guest";

  const cards = [
    {
      href: "/account/bookings",
      icon: CalendarDays,
      title: "My Bookings",
      desc: "View your upcoming stays, manage dates, or check past booking history.",
    },
    {
      href: "/account/profile",
      icon: User,
      title: "Guest Profile",
      desc: "Update your contact info and preferences for a seamless check-in experience.",
    },
    {
      href: "/account/menu",
      icon: UtensilsCrossed,
      title: "Food Menu",
      desc: "Browse our curated menu and order meals during your stay.",
    },
    {
      href: "/account/receipts",
      icon: Receipt,
      title: "Receipts",
      desc: "Download detailed receipts for your past stays and food orders.",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Welcome Banner */}
      <div className="bg-primary-900/60 backdrop-blur-sm border border-white/5 p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

        <div className="inline-flex items-center gap-2 text-accent-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="h-3 w-3" />
          <span>Guest Dashboard</span>
        </div>

        <h2 className="font-black text-3xl sm:text-4xl text-white mb-3 tracking-tight relative z-10">
          Welcome back, <span className="text-accent-400">{firstName}</span>
        </h2>

        <p className="text-primary-300 text-sm sm:text-base max-w-xl relative z-10 leading-relaxed">
          Manage your bookings, update your guest profile, and prepare for your
          upcoming stay at The Retreat Cottage.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative bg-primary-900/40 backdrop-blur-md border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-primary-800/60 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/5 hover:-translate-y-1 hover:border-accent-500/30 overflow-hidden flex flex-col h-full"
          >
            {/* Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent-500/0 to-transparent group-hover:via-accent-500/50 transition-all duration-700" />

            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-500/20 transition-all duration-500 border border-accent-500/10">
                <card.icon className="w-6 h-6 text-accent-400" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-primary-950 transition-colors duration-300">
                <ArrowRight className="w-4 h-4 text-primary-400 group-hover:text-primary-950 transition-colors duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-accent-300 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-primary-300 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
