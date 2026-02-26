import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

const navLinks = [
  { href: "/retreats", label: "Retreats" },
  { href: "/about", label: "About" },
];

export default function DesktopNavigation({ session }) {
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <ul
      className="hidden md:flex gap-4 lg:gap-8 items-center"
      onMouseLeave={() => setHoveredPath(null)}
    >
      {navLinks.map((link, idx) => (
        <m.div
          key={link.href}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx, duration: 0.5 }}
        >
          <NavLink
            {...link}
            isHovered={hoveredPath === link.href}
            onMouseEnter={() => setHoveredPath(link.href)}
          />
        </m.div>
      ))}
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * navLinks.length, duration: 0.5 }}
      >
        <UserProfile session={session} />
      </m.div>
    </ul>
  );
}
