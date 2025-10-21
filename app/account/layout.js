"use client";
import { useState, useEffect } from "react";
import SideNavigation from "../_components/SideNavigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative h-full">
      {/* Floating Mobile Toggle Button - Only on mobile */}
      {isMounted && (
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-6 right-6 z-50 bg-accent-500 hover:bg-accent-600 text-primary-800 p-4 rounded-full shadow-2xl transition-all duration-300 md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Mobile Overlay - Only on mobile */}
      {isMounted && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Layout - Desktop styles remain unchanged */}
      <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr] md:h-full gap-6 md:gap-12">
        {/* Side Navigation - Mobile: Bottom sheet, Desktop: Normal sidebar */}
        <div
          className={`
          w-full md:w-auto
          ${
            isMounted
              ? "fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out z-40"
              : "hidden"
          }
          md:relative md:transform-none md:translate-y-0 md:h-full md:block
          ${
            isMounted && isMobileMenuOpen
              ? "translate-y-0"
              : isMounted
              ? "translate-y-full"
              : "translate-y-full"
          } md:translate-y-0
        `}
        >
          <SideNavigation onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Main Content - Desktop styles remain unchanged */}
        <div className="py-1 px-4 md:px-0 flex-1 pb-20 md:pb-0">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
