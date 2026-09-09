"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]"
      />
      <div className="relative z-10 mx-auto max-w-content px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-2xl text-center"
        >
          {eyebrow && (
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={fadeUp}
            className="text-balance font-display text-4xl font-bold leading-[1.15] text-ink sm:text-5xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-muted"
            >
              {description}
            </motion.p>
          )}
          {children && <motion.div variants={fadeUp}>{children}</motion.div>}
        </motion.div>
      </div>
    </section>
  );
}
