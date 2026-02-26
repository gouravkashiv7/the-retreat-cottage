"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/navigation/Navigation";

export default function HeaderClient({ session }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <m.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        isHome ? "fixed" : "sticky"
      } top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-primary-950/80 backdrop-blur-xl border-b border-primary-800/50 py-3 sm:py-4"
          : "bg-transparent py-5 sm:py-8"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <Navigation session={session} />
      </div>
    </m.header>
  );
}
