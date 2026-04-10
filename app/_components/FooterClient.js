"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { m } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, ExternalLink } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/retreats", label: "Retreats" },
  { href: "/guides", label: "Guides" },
  { href: "/feedback", label: "Feedback" },
  { href: "/about", label: "About" },
];

const guideLinks = [
  { href: "/guides/kasauli", label: "Discover Kasauli" },
  { href: "/guides/solan", label: "Discover Solan" },
];

const legalLinks = [
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

const contactItems = [
  {
    icon: Phone,
    label: "+91 99060 39157",
    href: "tel:+919906039157",
    external: false,
  },
  {
    icon: Mail,
    label: "info@retreatcottage.in",
    href: "mailto:info@retreatcottage.in",
    external: false,
  },
  {
    icon: MapPin,
    label: "Dharampur, Himachal Pradesh",
    href: "https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7",
    external: true,
  },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FooterClient() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative w-full ${
        isHome
          ? "bg-transparent z-20"
          : "bg-primary-900 border-t border-primary-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-6">
        {/* Top Row: Brand + Nav + Contact */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="flex flex-col lg:flex-row gap-10 lg:gap-16"
        >
          {/* Brand */}
          <m.div variants={fadeIn} className="lg:max-w-xs shrink-0">
            <Link href="/" className="inline-block group mb-3">
              <h3 className="text-xl font-semibold text-white group-hover:text-accent-400 transition-colors duration-300 leading-none">
                The Retreat
              </h3>
              <span className="text-accent-500 text-[10px] tracking-[0.35em] uppercase font-light">
                Cottage
              </span>
            </Link>
            <p className="text-primary-400 text-xs leading-relaxed mb-4">
              A luxury homestay nestled in the Himalayan pine valleys near
              Kasauli.
            </p>
            <div className="flex items-center gap-2">
              <m.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/theretreatcottage_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent-500/15 border border-white/10 hover:border-accent-500/40 flex items-center justify-center text-primary-400 hover:text-accent-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </m.a>
              <m.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-accent-500/15 border border-white/10 hover:border-accent-500/40 flex items-center justify-center text-primary-400 hover:text-accent-400 transition-all duration-300"
                aria-label="Google Maps"
              >
                <MapPin className="w-3.5 h-3.5" />
              </m.a>
            </div>
          </m.div>

          {/* Nav + Legal */}
          <m.div
            variants={fadeIn}
            className="flex gap-12 sm:gap-16 flex-wrap flex-1"
          >
            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em] mb-3">
                Explore
              </h4>
              <ul className="space-y-1.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-400 hover:text-accent-400 transition-colors duration-200 text-sm flex items-center gap-1.5 group py-0.5"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-accent-500 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guides */}
            <div>
              <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em] mb-3">
                Guides
              </h4>
              <ul className="space-y-1.5">
                {guideLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-400 hover:text-accent-400 transition-colors duration-200 text-sm flex items-center gap-1.5 group py-0.5"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-accent-500 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em] mb-3">
                Legal
              </h4>
              <ul className="space-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-400 hover:text-accent-400 transition-colors duration-200 text-sm flex items-center gap-1.5 group py-0.5"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-accent-500 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>

          {/* Contact */}
          <m.div variants={fadeIn} className="lg:max-w-sm shrink-0">
            <h4 className="text-white font-semibold text-[11px] uppercase tracking-[0.2em] mb-3">
              Get in Touch
            </h4>
            <ul className="space-y-2.5">
              {contactItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-primary-400 hover:text-accent-400 transition-all duration-200 text-sm flex items-center gap-3 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-accent-500/10 border border-white/5 group-hover:border-accent-500/30 flex items-center justify-center transition-all duration-300 shrink-0">
                      <item.icon className="w-3 h-3 text-accent-500/60 group-hover:text-accent-400 transition-colors" />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </m.div>

        {/* Divider */}
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-linear-to-r from-transparent via-primary-700/40 to-transparent my-6 origin-left"
        />

        {/* Bottom Bar */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-primary-500"
        >
          <m.p variants={fadeIn}>
            © {currentYear} The Retreat Cottage. All rights reserved.
          </m.p>
          <m.a
            variants={fadeIn}
            whileHover={{ scale: 1.03 }}
            href="https://gouravkashiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary-500 hover:text-accent-400 transition-colors duration-300"
          >
            Developed by{" "}
            <span className="font-semibold text-accent-500/70 hover:text-accent-400 transition-colors">
              Codefinite
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </m.a>
        </m.div>
      </div>
    </footer>
  );
}
