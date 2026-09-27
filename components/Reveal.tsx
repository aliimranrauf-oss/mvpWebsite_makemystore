"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Same easing/duration as the fade-up used across Hero and PageHeader —
// kept as a standalone component so grids of unknown length (like a blog
// listing) can stagger each card in view without a shared parent variant.
export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
