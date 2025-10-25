import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

const navLinks = [
  { href: "/retreats", label: "Retreats" },
  { href: "/about", label: "About" },
];

export default function DesktopNavigation({ session }) {
  return (
    <ul className="hidden md:flex gap-12 lg:gap-16 items-center">
      {navLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
      <UserProfile session={session} />
    </ul>
  );
}
