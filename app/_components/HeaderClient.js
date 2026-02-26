"use client";

import { usePathname } from "next/navigation";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/navigation/Navigation";

export default function HeaderClient({ session }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`${
        isHome
          ? "fixed bg-transparent md:py-8"
          : "sticky bg-black/90 backdrop-blur-md border-b border-primary-800/50 md:py-6"
      } top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-4 md:px-8 transition-all duration-300`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <Logo />
        <Navigation session={session} />
      </div>
    </header>
  );
}
