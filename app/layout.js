import Header from "./_components/Header";
import Footer from "./_components/Footer";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "@/app/_components/contexts/ReservationContext";
import { FramerProvider } from "./_components/contexts/FramerProvider";
import NextAuthSessionProvider from "./_components/contexts/SessionProvider";
import { Toaster } from "sonner";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://retreatcottage.in"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "%s | The Retreat Cottage",
    default: "Pure Veg Luxury Homestay Kasauli | The Retreat Cottage",
  },
  description:
    "Pure Veg luxury homestay near Kasauli. Private 5-bedroom villa for up to 12 adults, with a maximum capacity of 15 guests. Perfect for parties with Bonfire, Karaoke, and Himalayan views.",
  keywords: [
    "Pure Veg Homestay Kasauli",
    "Bonfire allowed Homestay Himachal",
    "Luxury Villa for 12 adults Kasauli",
    "Pet friendly villa Himachal Pradesh",
    "Homestay with Karaoke and Bonfire Kasauli",
    "Dharampur Homestay for 15 guests",
    "Wooden Cabins Dharampur",
    "Boutique Homestay Himachal",
  ],
  openGraph: {
    title: "The Retreat Cottage | Bonfire & Pure Veg Luxury Homestay",
    description:
      "Private 5-bedroom villa for up to 15 guests total. Enjoy Bonfire, Karaoke, and Pet-Friendly stays near Kasauli.",
    url: "https://retreatcottage.in",
    siteName: "The Retreat Cottage",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Retreat Cottage Cinematic View",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Retreat Cottage | Party Villa with Bonfire",
    description: "Private villa for up to 15 guests near Kasauli. Bonfire, Karaoke & Pure Veg.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased relative`}
      >
        <NextAuthSessionProvider>
          <FramerProvider>
            <Header />
            <div className="flex-1 px-4 py-8 sm:px-6 md:px-8 lg:py-12 grid">
              <main className="max-w-7xl mx-auto w-full">
                <ReservationProvider>{children}</ReservationProvider>
              </main>
            </div>
            <Footer />
            <Toaster position="top-center" richColors />
          </FramerProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
