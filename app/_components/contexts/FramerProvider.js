"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export function FramerProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
