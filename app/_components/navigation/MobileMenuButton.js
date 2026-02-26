import { m } from "framer-motion";

export default function MobileMenuButton({ isOpen, onClick }) {
  const variant = isOpen ? "opened" : "closed";

  const top = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 6 },
  };
  const center = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -6 },
  };

  const lineProps = {
    stroke: "currentColor",
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  };

  return (
    <m.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="md:hidden relative z-70 w-12 h-12 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-sm transition-colors duration-300"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <m.line x1="4" y1="6" x2="20" y2="6" variants={top} {...lineProps} />
        <m.line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          variants={center}
          {...lineProps}
        />
        <m.line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          variants={bottom}
          {...lineProps}
        />
      </svg>
    </m.button>
  );
}
