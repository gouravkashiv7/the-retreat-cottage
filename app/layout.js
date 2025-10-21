import Header from "./_components/Header";

import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  sunsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Retreat Cottage",
    default: "Welcome / The Retreat Cottage",
  },
  description:
    "Explore The Retreat Cottage, a luxury homestay near Kasauli. Experience bespoke stays in our 5 exclusive accommodations: 3 elegant rooms & 2 charming wooden cabins. Your perfect mountain retreat awaits.!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} bg-primary-950 text-primary-100  min-h-screen flex flex-col antialiased relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
