import ServiceReviews from "@/components/ServiceReviews";
import { SERVICE_GROUPS } from "@/lib/reviews";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plus, Globe2, ShieldCheck, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { chatbotTiers } from "@/lib/data";
import { tierThemes } from "@/lib/card-theme";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { chatbotCountries, getCountry, chatbotHreflang } from "@/lib/chatbot-countries";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type Props = { params: { country: string } };

// Only the four country slugs exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return chatbotCountries.map((c) => ({ country: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCountry(params.country);
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/ai-chatbot/${c.slug}`,
    keywords: c.keywords,
    ogLocale: c.ogLocale,
    imageAlt: `AI chatbot development for ${c.label} businesses`,
    languages: chatbotHreflang(SITE_URL),
  });
}

// Refetch approved reviews at most every 60s so new ones show without a redeploy.
export const revalidate = 60;

export default function ChatbotCountryPage({ params }: Props) {
  const c = getCountry(params.country);
  if (!c) notFound();

  const path = `/ai-chatbot/${c.slug}`;
  const others = chatbotCountries.filter((o) => o.slug !== c.slug);
  const waHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi, I'd like a quote for an AI chatbot for my business (${c.label}).`
      )}`
    : "";

  const jsonLd = [
    serviceJsonLd({
      name: `AI Chatbot Development for ${c.label} Businesses`,
      serviceType: "AI chatbot development",
      description: c.metaDescription,
      path,
      lowPriceGbp: 120,
      offerCount: chatbotTiers.length,
      areaServed: [c.schemaCountry],
      availableLanguage: c.availableLanguage,
    }),
    faqJsonLd(c.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "AI Chatbot", path: "/ai-chatbot" },
      { name: `${c.label}`, path },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <PageHeader
          eyebrow={c.eyebrow}
          title={c.h1}
          description={c.intro}
          image={{ src: "/images/hero/ai-chatbot.png", alt: `AI chatbot conversation for a ${c.label} business` }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={`/contact?service=ai-chatbot&package=ai-bot`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Get a free quote
              <ArrowRight size={16} />
            </a>
            <a
              href="/ai-chatbot#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              Try the live demo
            </a>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </PageHeader>

        {/* Channels */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{c.channelsHeading}</h2>
              <p className="mt-4 text-muted">{c.channelsIntro}</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {c.channels.map((ch, i) => {
                const Icon = i === 0 ? Globe2 : i === 1 ? MessageCircle : Check;
                return (
                  <div key={ch.title}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{ch.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{ch.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{c.industriesHeading}</h2>
              <p className="mt-4 text-muted">Any business that gets the same customer questions again and again.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.industries.map((n) => (
                <div key={n.title} className="rounded-xl2 card-glow-border p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted" dir="auto">
                    Typical questions: {n.ask}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Pricing for {c.label} businesses
              </h2>
              <p className="mt-4 text-muted">{c.priceNote}</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {chatbotTiers.map((t, i) => {
                const th = tierThemes(chatbotTiers)[i];
                const local = c.tierPrices[t.slug as keyof typeof c.tierPrices];
                return (
                  <a
                    key={t.slug}
                    href={`/contact?service=ai-chatbot&package=${t.slug}`}
                    aria-label={`Choose ${t.name}, ${t.price}`}
                    className={`group flex h-full flex-col rounded-xl2 border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${th.card} ${th.text}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{t.name}</p>
                      {t.highlight && (
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${th.chip}`}>
                          Most popular
                        </span>
                      )}
                    </div>
                    <p className="mt-3 font-display text-3xl font-semibold">{t.price}</p>
                    {c.currencyName !== "GBP" && <p className={`mt-1 text-xs ${th.sub}`}>{local}</p>}
                    <p className={`mt-3 text-sm leading-relaxed ${th.sub}`}>{t.desc}</p>
                    <ul className="mt-5 flex-1 space-y-2.5 border-t border-current/10 pt-5">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm font-medium leading-snug">
                          <span
                            className={`mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${th.tick}`}
                          >
                            <Check size={10} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-transform group-hover:scale-[1.02] ${th.btn}`}
                    >
                      Choose this plan
                      <ArrowRight size={16} />
                    </span>
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-muted">{c.addonNote}</p>
          </div>
        </section>

        {/* Privacy */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                <ShieldCheck size={20} />
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">{c.privacy.heading}</h2>
              <p className="mt-2 text-sm font-medium text-ink">{c.privacy.law}</p>
              <p className="mt-4 text-muted">{c.privacy.intro}</p>
              <ul className="mt-6 space-y-3">
                {c.privacy.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                    <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Questions from {c.label} businesses
              </h2>
            </div>
            <div className="mt-10 divide-y divide-border border-t border-border">
              {c.faqs.map((f) => (
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

        {/* Other countries + CTA */}
        <ServiceReviews services={SERVICE_GROUPS.chatbot} title="What clients say about our AI chatbots" />

        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{c.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">{c.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact?service=ai-chatbot"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Get a free quote
                <ArrowRight size={16} />
              </a>
              <a
                href="/ai-chatbot"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                All chatbot packages
              </a>
            </div>
            <p className="mt-10 text-sm text-muted">
              Also serving:{" "}
              {others.map((o, i) => (
                <span key={o.slug}>
                  <a href={`/ai-chatbot/${o.slug}`} className="font-medium text-mint underline underline-offset-2">
                    {o.label}
                  </a>
                  {i < others.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
