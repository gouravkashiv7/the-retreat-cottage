import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-blue.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        style={{
          filter: "saturate(7)",
        }}
        src={logo}
        height="60"
        quality={100}
        alt="The Retreat Cottage logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Retreat Cottage
      </span>
    </Link>
  );
}

export default Logo;
