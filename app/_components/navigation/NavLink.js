import Link from "next/link";

export default function NavLink({ href, label, isMobile = false, onClick }) {
  const baseClasses = "hover:text-accent-400 transition-colors";
  const mobileClasses =
    "block py-3 px-4 hover:text-accent-400 hover:bg-primary-900 rounded-lg transition-all";
  const desktopClasses = "hover:text-accent-400 transition-colors";

  const className = isMobile ? mobileClasses : desktopClasses;

  if (isMobile) {
    return (
      <li>
        <Link href={href} className={className} onClick={onClick}>
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {label}
      </Link>
    </li>
  );
}
