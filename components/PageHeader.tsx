"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type HeroImage = {
  src: string;
  alt: string;
  /** Defaults to 1200. Match the real file's aspect ratio to avoid distortion. */
  width?: number;
  /** Defaults to 750 (a 16:10 ratio). */
  height?: number;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image?: HeroImage;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]"
      />
      <div className="relative z-10 mx-auto max-w-content px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-16">
        <div
          className={`mx-auto grid items-center gap-8 lg:gap-14 ${
            image ? "lg:grid-cols-2" : "max-w-2xl"
          }`}
        >
          {/*
            Image comes FIRST in the markup with `order-first` so on mobile
            (single-column stack) it renders at the very top of the hero —
            visible the instant the page loads, no scrolling required.
            `lg:order-last` flips it back to the right-hand column once the
            two-column desktop layout kicks in, sitting beside the text.
          */}
          {image && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="order-first mx-auto w-full max-w-xs sm:max-w-sm lg:order-last lg:max-w-none"
            >
              <div className="overflow-hidden rounded-xl2 border border-border shadow-[0_20px_60px_-15px_rgba(16,36,30,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 1200}
                  height={image.height ?? 750}
                  className="h-auto w-full"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`text-center ${image ? "lg:text-left" : ""}`}
          >
            {eyebrow && (
              <motion.span
                variants={fadeUp}
                className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.h1
              variants={fadeUp}
              className="text-balance font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                variants={fadeUp}
                className={`mt-4 text-base leading-relaxed text-muted sm:text-lg ${
                  image ? "lg:max-w-[48ch]" : "mx-auto max-w-[52ch]"
                }`}
              >
                {description}
              </motion.p>
            )}
            {children && (
              <motion.div variants={fadeUp} className={image ? "lg:flex lg:justify-start" : ""}>
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
