"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/navigation/Navigation";

export default function HeaderClient({ session }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Initialize as true for non-home pages to avoid flicker
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Sync state if pathname changes
    setIsScrolled(!isHome || window.scrollY > 50);
    setIsMenuOpen(false); // Close menu on route change

    if (!isHome) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, pathname]);

  return (
    <m.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        isHome ? "fixed" : "sticky"
      } top-0 left-0 right-0 w-full px-4 sm:px-6 transition-all duration-500 ease-in-out ${
        isScrolled || isMenuOpen
          ? "bg-primary-950/90 backdrop-blur-xl border-b border-primary-800/50 py-3 sm:py-4 z-70"
          : "bg-transparent py-5 sm:py-8 z-50"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <Navigation
          session={session}
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </m.header>
  );
}
