"use client";

import { m } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerGrid({ children, className = "" }) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function ScaleIn({ children, delay = 0, className = "" }) {
  return (
    <m.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function FeatureCard({ emoji, title, description }) {
  return (
    <m.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-primary-900/60 backdrop-blur-sm border border-white/5 p-5 rounded-2xl hover:border-accent-400/30 hover:bg-primary-800/60 transition-colors duration-300 group"
    >
      <span className="text-2xl block mb-3">{emoji}</span>
      <h3 className="font-semibold text-accent-300 mb-1.5 text-sm tracking-wide uppercase">
        {title}
      </h3>
      <p className="text-primary-300 text-sm leading-relaxed">{description}</p>
    </m.div>
  );
}

export function ReviewCard({ review }) {
  return (
    <m.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-primary-900/60 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-accent-400/20 transition-colors duration-300 flex flex-col gap-4"
    >
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">
            ★
          </span>
        ))}
      </div>
      <p className="text-primary-200 text-sm leading-relaxed flex-1">
        "{review.text}"
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-accent-300 font-semibold text-sm">
          {review.author}
        </span>
        <span className="text-primary-400 text-xs">{review.date}</span>
      </div>
    </m.div>
  );
}
