"use client";

import { useEffect, useState } from "react";
import { Noto_Sans_Arabic } from "next/font/google";
import { ArrowRight, Briefcase, Check, Plus, FileText, Globe2, MapPin, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CvOrderForm from "@/components/CvOrderForm";
import Image from "next/image";
import { content, gbp, packageLevels, type Lang } from "@/lib/cv-data";

// Arabic font is only loaded on this route (the rest of the site is unaffected).
const arabicFont = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const STORAGE_KEY = "mms-cv-lang";

export default function CvPage() {
  const [lang, setLang] = useState<Lang>("en"); // English is always the default
  const t = content[lang];
  const isAr = lang === "ar";

  // Restore a previous choice, or honour ?lang=ar (handy for sharing an Arabic link).
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("lang");
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const next = fromUrl === "ar" || fromUrl === "en" ? fromUrl : saved;
      if (next === "ar" || next === "en") setLang(next);
    } catch {
      /* storage blocked — stay on English */
    }
  }, []);

  function choose(next: Lang) {
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const arrow = `rtl:-scale-x-100`;
  const portfolioPrice = t.packages.items.find((p) => p.id === "portfolio")?.prices.entry ?? 0;

  return (
    <div className={arabicFont.variable}>
      {/* Scoped RTL tweaks — only active while Arabic is selected */}
      <style>{`
        .cv-rtl, .cv-rtl .font-display, .cv-rtl .font-body {
          font-family: var(--font-arabic), "Segoe UI", Tahoma, Arial, sans-serif;
        }
        .cv-rtl h1 { line-height: 1.4; }
        .cv-rtl h2, .cv-rtl h3 { line-height: 1.5; }
        .cv-rtl .tracking-wide { letter-spacing: 0; }
        @media (min-width: 1024px) {
          .cv-rtl .lg\\:text-left { text-align: right; }
        }
      `}</style>

      {/* Language switch (always LTR so it never jumps sides) */}
      <div dir="ltr" className="border-b border-border bg-surface2/60">
        <div className="mx-auto flex max-w-content items-center justify-end gap-3 px-5 py-2 sm:px-8">
          <Globe2 size={14} className="text-muted" aria-hidden="true" />
          <div role="group" aria-label="Language" className="inline-flex rounded-full border border-border bg-surface p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => choose("en")}
              aria-pressed={!isAr}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                !isAr ? "bg-mint text-white" : "text-muted hover:text-ink"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => choose("ar")}
              aria-pressed={isAr}
              lang="ar"
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                isAr ? "bg-mint text-white" : "text-muted hover:text-ink"
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>

      <div dir={isAr ? "rtl" : "ltr"} lang={lang} className={isAr ? "cv-rtl" : ""}>
        {/* HERO — same PageHeader + image slot as the POS page.
            Replace /public/images/hero/cv-writing.png with your own image
            (1586 x 992 px, same size as the other hero images). No code change needed. */}
        <PageHeader
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          description={t.hero.desc}
          image={{
            src: "/images/hero/cv-writing.png",
            alt: isAr
              ? "كتابة احترافية للسيرة الذاتية وملف LinkedIn لباحثي العمل في الخليج"
              : "Professional CV and LinkedIn writing for Gulf job seekers",
          }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              {t.hero.primary}
              <ArrowRight size={16} className={arrow} />
            </a>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              {t.hero.secondary}
            </a>
          </div>
        </PageHeader>

        {/* Stats strip */}
        <section className="border-b border-border bg-surface2/60">
          <div className="mx-auto grid max-w-content grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4">
            {t.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  <bdi>{s.value}</bdi>
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages — one block per service, four fixed-price level cards each */}
        <section id="packages" className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.packages.title}</h2>
              <p className="mt-4 text-muted">{t.packages.intro}</p>
            </div>

            {/* Level guide */}
            <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.packages.levels.map((l) => (
                <div key={l.id} className="rounded-xl2 border border-border bg-surface2/60 px-4 py-3">
                  <dt className="flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
                    {l.label}
                    <span className="text-xs font-medium text-mint">{l.years}</span>
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted">{l.blurb}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 space-y-16">
              {t.packages.items
                .filter((p) => !p.flat)
                .map((p) => {
                  const offered = packageLevels(p);
                  const cards = t.packages.levels.filter((l) => offered.includes(l.id));
                  return (
                    <div key={p.id} id={`pkg-${p.id}`} className="scroll-mt-24">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-2xl font-semibold text-ink">{p.name}</h3>
                        {p.badge && (
                          <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[11px] font-semibold text-mint">
                            {p.badge}
                          </span>
                        )}
                        <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted">
                          {p.priceNote}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{p.tagline}</p>
                      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink/70">
                        <span className="font-semibold text-ink">{t.packages.bestFor}</span> {p.bestFor}
                      </p>

                      <p className="mt-5 text-xs font-semibold text-ink">{t.packages.groupIncludes}</p>
                      <ul className="mt-2 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted">
                            <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div
                        className={`mt-6 grid gap-4 ${
                          cards.length === 2 ? "sm:grid-cols-2 lg:max-w-xl" : "grid-cols-2 lg:grid-cols-4"
                        }`}
                      >
                        {cards.map((l, i) => (
                          <Reveal key={l.id} delay={i * 60}>
                            <div
                              className={`flex h-full flex-col rounded-xl2 p-5 ${
                                p.highlight ? "card-glow-border card-glow-border--accent" : "card-glow-border"
                              }`}
                              style={{ ["--card-bg" as string]: p.highlight ? "#F7FBF8" : "#FFFFFF" }}
                            >
                              <p className="text-sm font-semibold text-ink">{l.label}</p>
                              <p className="text-xs text-muted">{l.years}</p>
                              <p className="mt-4 font-display text-3xl font-semibold text-ink">
                                <bdi>{gbp(p.prices[l.id])}</bdi>
                              </p>
                              <p className="mt-1 text-[11px] font-medium text-mint">{t.packages.fixedBadge}</p>
                              <a
                                href="#order"
                                data-package={p.id}
                                data-level={l.id}
                                className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                                  p.highlight
                                    ? "bg-mint text-white"
                                    : "border border-border bg-surface text-ink hover:border-mint/60 hover:text-mint"
                                }`}
                              >
                                {t.packages.orderNow}
                                <ArrowRight size={15} className={arrow} />
                              </a>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                      {cards.length === 2 && <p className="mt-3 text-xs text-muted">{t.packages.onlyFrom}</p>}
                    </div>
                  );
                })}
            </div>

            <div className="mt-12 flex flex-col gap-3 rounded-xl2 border border-border bg-surface2/60 p-5 text-sm text-muted sm:flex-row sm:items-center">
              <FileText size={18} className="shrink-0 text-mint" />
              <p>
                <span className="font-semibold text-ink">{t.packages.academicBold}</span> {t.packages.academicText}
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio website showcase.
            Replace /public/images/cv/portfolio-sample.png with your own image
            (1600 x 1000 px). No code change needed. */}
        <section id="portfolio" className="scroll-mt-20 border-b border-border">
          <div className="mx-auto grid max-w-content items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
                <Briefcase size={14} /> {t.portfolio.badge}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">{t.portfolio.title}</h2>
              <p className="mt-4 text-muted">{t.portfolio.intro}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-ink">
                  <bdi>{gbp(portfolioPrice)}</bdi>
                </span>
                <span className="text-xs font-medium text-mint">{t.packages.fixedBadge}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {t.portfolio.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                    {pt}
                  </li>
                ))}
              </ul>
              <a
                href="#order"
                data-package="portfolio"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                {t.portfolio.cta}
                <ArrowRight size={16} className={arrow} />
              </a>
            </div>
            <Reveal>
              <div dir="ltr" className="overflow-hidden rounded-xl2 border border-border bg-surface2/60 shadow-sm">
                <Image
                  src="/images/cv/portfolio-sample.png"
                  alt={t.portfolio.imageAlt}
                  width={1600}
                  height={1000}
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Gulf focus */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
                <Globe2 size={14} /> {t.gulf.badge}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">{t.gulf.title}</h2>
              <p className="mt-4 text-muted">{t.gulf.intro}</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {t.gulf.points.map((g) => (
                <div key={g.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {t.gulf.markets.map((m) => (
                <span key={m} className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-ink">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.included.title}</h2>
              <p className="mt-4 text-muted">{t.included.intro}</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.included.items.map((item) => (
                <div key={item.title}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                    <ShieldCheck size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.how.title}</h2>
              <p className="mt-4 text-muted">{t.how.intro}</p>
            </div>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.how.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint text-sm font-semibold text-white">
                    {isAr ? (i + 1).toLocaleString("ar-EG") : i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Order form */}
        <section id="order" className="scroll-mt-20 border-b border-border">
          <div className="mx-auto grid max-w-content gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.order.title}</h2>
              <p className="mt-4 text-muted">{t.order.intro}</p>
              <ul className="mt-8 space-y-3">
                {t.order.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-xl2 border border-border bg-surface p-6 sm:p-8">
                <CvOrderForm lang={lang} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.faq.title}</h2>
            </div>
            <div className="mt-10 divide-y divide-border border-t border-border">
              {t.faq.items.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                    <span className="font-medium">{f.q}</span>
                    <Plus size={18} className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{t.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">{t.cta.desc}</p>
            <div className="mt-8">
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                {t.cta.button}
                <ArrowRight size={16} className={arrow} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
