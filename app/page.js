import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";
import bgmobile from "@/public/bg_mobile.png";

export default function Home() {
  return (
    <main className="mt-16 sm:mt-20 md:pt-24 relative min-h-screen">
      {/* Background Images */}
      {/* Mobile Background (hidden on md and larger) */}
      <div className="md:hidden fixed inset-0 -z-10">
        <Image
          src={bgmobile}
          fill
          placeholder="blur"
          className="object-cover object-top"
          quality={60}
          alt="The Retreat Cottage Ghibli"
          priority
          sizes="100vw"
        />
      </div>

      {/* Desktop Background (hidden on mobile) */}
      <div className="hidden md:block fixed inset-0 -z-10">
        <Image
          src={bg}
          fill
          placeholder="blur"
          className="object-cover object-top"
          quality={60}
          alt="The Retreat Cottage Ghibli"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 text-center px-4 my-56 md:my-16 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary-50 mb-6 sm:mb-8 md:mb-10 tracking-tight font-normal">
          Welcome to The Retreat Cottage
        </h1>
        <Link
          href="/retreats"
          className="bg-accent-500 px-6 py-4 sm:px-7 sm:py-5 md:px-8 md:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all inline-block rounded-lg mt-12 md:mt-4"
        >
          Explore Luxury Rooms & Cabins
        </Link>
      </div>
    </main>
  );
}
