import Header from "./_components/Header";
import Footer from "./_components/Footer";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/contexts/ReservationContext";
import { FramerProvider } from "./_components/contexts/FramerProvider";
import { Toaster } from "sonner";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://retreatcottage.in"),
  title: {
    template: "%s | The Retreat Cottage",
    default: "Welcome | The Retreat Cottage",
  },
  description:
    "Explore The Retreat Cottage, a luxury homestay near Dharampur. Experience bespoke stays in our 5 exclusive accommodations: 3 elegant rooms & 2 charming wooden cabins. Your perfect mountain retreat awaits.",
  keywords: [
    "Dharampur Homestay",
    "Luxury Villa Dharampur",
    "Mountain Retreat",
    "Boutique Homestay Himachal",
    "Wooden Cabins Dharampur",
  ],
  openGraph: {
    title: "The Retreat Cottage | Luxury Mountain Homestay",
    description:
      "Escape into the wild. Experience bespoke stays in our charming wooden cabins & elegant rooms near Dharampur.",
    url: "https://retreatcottage.in",
    siteName: "The Retreat Cottage",
    images: [
      {
        url: "/opengraph-image.jpg", // Needs to be generated/placed in public
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
    title: "The Retreat Cottage",
    description: "Luxury mountain homestay near Dharampur.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased relative`}
      >
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
      </body>
    </html>
  );
}
