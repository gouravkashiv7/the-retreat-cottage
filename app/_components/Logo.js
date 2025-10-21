import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-blue.png";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 md:gap-4 z-10 max-w-[200px] md:max-w-none"
    >
      <Image
        style={{
          filter: "saturate(7)",
        }}
        src={logo}
        height="60"
        quality={100}
        alt="The Retreat Cottage logo"
        className="w-8 h-7 md:w-10 md:h-8 flex-shrink-0"
      />
      <span className="text-sm md:text-lg font-semibold text-primary-100 truncate">
        The Retreat Cottage
      </span>
    </Link>
  );
}

export default Logo;
