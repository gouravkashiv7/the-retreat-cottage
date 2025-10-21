// import Link from "next/link";

// export default function Navigation() {
//   return (
//     <nav className="z-10 text-xl">
//       <ul className="flex gap-16 items-center">
//         <li>
//           <Link
//             href="/rooms"
//             className="hover:text-accent-400 transition-colors"
//           >
//             Rooms
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/cabins"
//             className="hover:text-accent-400 transition-colors"
//           >
//             Cabins
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/about"
//             className="hover:text-accent-400 transition-colors"
//           >
//             About
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/account"
//             className="hover:text-accent-400 transition-colors"
//           >
//             Guest area
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="z-10 text-xl">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-12 lg:gap-16 items-center">
        <li>
          <Link
            href="/rooms"
            className="hover:text-accent-400 transition-colors"
          >
            Rooms
          </Link>
        </li>
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        </li>
      </ul>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-primary-100 hover:text-accent-400 transition-colors"
        >
          {isMobileMenuOpen ? (
            // Close icon
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-primary-950 border-t border-primary-800 shadow-lg">
            <ul className="flex flex-col p-4 space-y-3">
              <li>
                <Link
                  href="/rooms"
                  className="block py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/cabins"
                  className="block py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cabins
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="block py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Guest area
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
