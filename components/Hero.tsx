"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Github, ImagePlus } from "lucide-react";
import CountUp from "./CountUp";

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

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-40 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid max-w-content items-center gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint"
          >
            <Sparkles size={12} />
            AI-Powered Development
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-balance font-display text-4xl font-bold leading-[1.12] text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            AI chatbots and SaaS{" "}
            <span className="relative inline-block text-mint">
              MVPs
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                height="8"
                viewBox="0 0 120 8"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 5.5C20 1 40 1 60 4C80 7 100 2 118 3"
                  stroke="#2E9E48"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            , built with real, production code
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted"
          >
            Get a custom AI chatbot, a full SaaS MVP, or a proper fix for the
            AI-generated project you&apos;re stuck on. Built on Next.js,
            Supabase, and Vercel — and pushed straight to your own GitHub.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              See how it works
              <Sparkles size={15} />
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-10 grid grid-cols-3 gap-4 sm:max-w-md"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/10 text-mint">
                <Zap size={16} />
              </span>
              <div>
                <dt className="font-display text-lg font-semibold text-ink">
                  <CountUp prefix="48–" to={72} suffix="h" />
                </dt>
                <dd className="text-xs text-muted">MVP delivery</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/10 text-mint">
                <ShieldCheck size={16} />
              </span>
              <div>
                <dt className="font-display text-lg font-semibold text-ink">
                  <CountUp to={100} suffix="%" />
                </dt>
                <dd className="text-xs text-muted">Code ownership</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface2 text-ink">
                <Github size={16} />
              </span>
              <div>
                <dt className="font-display text-lg font-semibold text-ink">
                  <CountUp from={24} to={0} />
                </dt>
                <dd className="text-xs text-muted">Vendor lock-in</dd>
              </div>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
        >
          {!imgFailed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/hero-visual.png"
              alt="MakeMyStore dashboard preview with AI assistant"
              onError={() => setImgFailed(true)}
              className="w-full"
            />
          )}

          {imgFailed && (
            <div className="flex aspect-[6/5] w-full flex-col items-center justify-center gap-3 rounded-xl2 border-2 border-dashed border-border bg-surface2 p-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint/10 text-mint">
                <ImagePlus size={22} />
              </span>
              <p className="font-display text-sm font-semibold text-ink">
                Hero image goes here
              </p>
              <p className="max-w-[30ch] text-xs leading-relaxed text-muted">
                Add your dashboard/robot graphic as{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 text-ink">
                  hero-visual.png
                </code>{" "}
                to the <code className="rounded bg-surface px-1.5 py-0.5 text-ink">/public</code> folder.
                Recommended size: 1200×1000px, transparent background.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
