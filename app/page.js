import Image from "next/image";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-top"
        quality={60}
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to The Retreat Cottage
        </h1>
        <a
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore Luxury Rooms & Cabins
        </a>
      </div>
    </main>
  );
}
