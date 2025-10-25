import MobileMenuButton from "./MobileMenuButton";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

const navLinks = [
  { href: "/retreats", label: "Retreats" },
  { href: "/about", label: "About" },
];

export default function MobileNavigation({
  session,
  isOpen,
  onToggleMenu,
  onCloseMenu,
}) {
  return (
    <div className="md:hidden">
      <MobileMenuButton isOpen={isOpen} onClick={onToggleMenu} />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary-950 border-t border-primary-800 shadow-lg">
          <ul className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isMobile
                onClick={onCloseMenu}
              />
            ))}
            <UserProfile session={session} isMobile onClick={onCloseMenu} />
          </ul>
        </div>
      )}
    </div>
  );
}
