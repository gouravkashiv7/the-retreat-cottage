"use client";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Navigation({ session, isOpen, onToggle, onClose }) {
  return (
    <nav>
      {/* Desktop View */}
      <DesktopNavigation session={session} />

      {/* Mobile View - Cinematic Drawer & Controlled Button */}
      <MobileNavigation
        session={session}
        isOpen={isOpen}
        onToggle={onToggle}
        onClose={onClose}
      />
    </nav>
  );
}
