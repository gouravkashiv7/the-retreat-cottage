"use client";

import { useState } from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Navigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* Desktop View */}
      <DesktopNavigation session={session} />

      {/* Mobile View - Cinematic Drawer & Controlled Button */}
      <MobileNavigation
        session={session}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  );
}
