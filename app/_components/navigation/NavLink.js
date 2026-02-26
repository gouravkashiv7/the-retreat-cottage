import Link from "next/link";
import { m } from "framer-motion";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  label,
  isMobile = false,
  onClick,
  onMouseEnter,
  isHovered,
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isMobile) {
    return (
      <li className="w-full">
        <Link
          href={href}
          onClick={onClick}
          className={`relative block w-full py-4 px-6 text-xl font-medium transition-all duration-300 ${
            isActive
              ? "text-accent-400 bg-accent-500/10"
              : "text-white hover:text-accent-200"
          }`}
        >
          {isActive && (
            <m.div
              layoutId="mobileActive"
              className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500"
            />
          )}
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative px-4 py-2 group">
      <Link
        href={href}
        onMouseEnter={onMouseEnter}
        className={`relative z-10 text-sm lg:text-base font-semibold transition-colors duration-300 ${
          isActive || isHovered ? "text-white" : "text-primary-100"
        } hover:text-white`}
      >
        {label}
      </Link>

      {(isActive || isHovered) && (
        <m.div
          layoutId="navIndicator"
          className="absolute inset-0 bg-white/10 rounded-full z-0 backdrop-blur-sm border border-white/10"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </li>
  );
}
