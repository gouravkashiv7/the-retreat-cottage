import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-blue.png";
import { m } from "framer-motion";

function Logo() {
  return (
    <Link href="/" className="group relative z-10 flex items-center gap-4">
      <m.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-accent-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
        <Image
          style={{
            filter: "saturate(7)",
          }}
          src={logo}
          height="60"
          quality={100}
          alt="The Retreat Cottage logo"
          className="w-10 h-8 md:w-12 md:h-10 shrink-0 relative z-10"
        />
      </m.div>
      <div className="flex flex-col">
        <span className="text-base md:text-xl font-bold text-white tracking-tight leading-none group-hover:text-accent-200 transition-colors duration-300">
          The Retreat
        </span>
        <span className="text-[10px] md:text-sm font-medium text-accent-400 tracking-[0.3em] uppercase leading-relaxed">
          Cottage
        </span>
      </div>
    </Link>
  );
}

export default Logo;
