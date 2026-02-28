"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { m } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, ExternalLink } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/retreats", label: "Retreats" },
  { href: "/about", label: "About Us" },
];

const blogLinks = [
  { href: "/guides/kasauli", label: "Visit Kasauli" },
  { href: "/guides/solan", label: "Discover Solan" },
];

const legalLinks = [
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
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
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <m.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link href="/" className="inline-block group mb-4">
              <h3 className="text-2xl font-semibold text-white group-hover:text-accent-400 transition-colors duration-300">
                The Retreat
              </h3>
              <span className="text-accent-500 text-sm tracking-[0.3em] uppercase font-light">
                Cottage
              </span>
            </Link>
            <p className="text-primary-300 text-sm leading-relaxed mb-6 max-w-xs">
              A luxury homestay nestled in the Himalayan pine valleys near
              Kasauli. Experience the harmony of nature and mountain luxury.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <m.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/theretreatcottage_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-800/60 hover:bg-accent-500/20 border border-primary-700/50 hover:border-accent-500/50 flex items-center justify-center text-primary-300 hover:text-accent-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </m.a>
              <m.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-800/60 hover:bg-accent-500/20 border border-primary-700/50 hover:border-accent-500/50 flex items-center justify-center text-primary-300 hover:text-accent-400 transition-all duration-300"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </m.a>
            </div>
          </m.div>

          {/* Quick Links */}
          <m.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-accent-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Travel Guide */}
          <m.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Travel Guide
            </h4>
            <ul className="space-y-3">
              {blogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-accent-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Legal */}
          <m.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-accent-500 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Contact */}
          <m.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919906039157"
                  className="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-sm flex items-start gap-3 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-accent-500/70 group-hover:text-accent-400 transition-colors" />
                  +91 99060 39157
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@retreatcottage.in"
                  className="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-sm flex items-start gap-3 group"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent-500/70 group-hover:text-accent-400 transition-colors" />
                  info@retreatcottage.in
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/JYkod7Q2DVKKcBYw7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 hover:text-accent-400 transition-colors duration-300 text-sm flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-500/70 group-hover:text-accent-400 transition-colors" />
                  Dharampur, Himachal Pradesh, India
                </a>
              </li>
            </ul>
          </m.div>
        </div>

        {/* Divider */}
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-linear-to-r from-transparent via-primary-700/50 to-transparent my-8 origin-left"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-400">
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © {currentYear} The Retreat Cottage. All rights reserved.
          </m.p>
          <m.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            href="https://gouravkashiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary-400 hover:text-accent-400 transition-colors duration-300"
          >
            Developed by{" "}
            <span className="font-semibold text-accent-500/80 hover:text-accent-400 transition-colors">
              Codefinite
            </span>
            <ExternalLink className="w-3 h-3" />
          </m.a>
        </div>
      </div>
    </footer>
  );
}
