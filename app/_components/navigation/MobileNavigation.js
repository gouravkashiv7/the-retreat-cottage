import { m, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";
import MobileMenuButton from "./MobileMenuButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/retreats", label: "Retreats" },
  { href: "/about", label: "About" },
];

export default function MobileNavigation({
  session,
  isOpen,
  onToggle,
  onClose,
}) {
  return (
    <div className="md:hidden">
      <MobileMenuButton isOpen={isOpen} onClick={onToggle} />

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Cinematic Backdrop Overlay */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-primary-950/40 backdrop-blur-md"
            />

            {/* Premium Full-Screen Drawer */}
            <m.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-60 w-full max-w-sm bg-primary-950/95 border-l border-primary-800/30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            >
              <div className="flex flex-col h-full pt-32 pb-12 px-8">
                <nav className="flex-1">
                  <ul className="flex flex-col gap-4">
                    {navLinks.map((link, idx) => (
                      <m.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                      >
                        <NavLink {...link} isMobile onClick={onClose} />
                      </m.div>
                    ))}
                  </ul>
                </nav>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="pt-10 border-t border-primary-800/50"
                >
                  <UserProfile session={session} isMobile onClick={onClose} />
                </m.div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
