import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircleQuestion, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DemoChat from "@/components/DemoChat";
import { chatbotTiers, chatbotCarePlan, firstYearFrom } from "@/lib/data";
import { chatbotVerticals, getVertical } from "@/lib/chatbot-verticals";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

type Props = { params: { vertical: string } };

// Only the slugs in chatbotVerticals exist; anything else is a real 404.
export const dynamicParams = false;
export const generateStaticParams = () => chatbotVerticals.map((v) => ({ vertical: v.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const v = getVertical(params.vertical);
  if (!v) return {};
  return buildMetadata({
    title: v.metaTitle,
    description: v.metaDescription,
    path: `/ai-chatbot/for/${v.slug}`,
    keywords: v.keywords,
    imageAlt: `AI chatbot for ${v.name.toLowerCase()}`,
  });
}

export default function VerticalPage({ params }: Props) {
  const v = getVertical(params.vertical);
  if (!v) notFound();

  const jsonLd = [
    faqJsonLd(v.faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "AI Chatbot", path: "/ai-chatbot" },
      { name: v.name, path: `/ai-chatbot/for/${v.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <PageHeader eyebrow={v.eyebrow} title={v.h1} description={v.intro}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
              Try the live demo <ArrowRight size={16} />
            </a>
            <a href={`/contact?service=ai-chatbot&ref=${v.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint">
              Get a free quote
            </a>
          </div>
        </PageHeader>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">What your customers keep asking</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {v.questions.map((q) => (
                <li key={q} className="flex items-start gap-3 rounded-xl2 card-glow-border p-5 text-sm text-ink">
                  <MessageCircleQuestion size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden />
                  “{q}”
                </li>
              ))}
            </ul>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {v.does.map((d) => (
                <div key={d.title}>
                  <h3 className="font-display text-lg font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Try it yourself</h2>
              <p className="mt-4 text-muted">
                A sample {v.short} bot with its owner dashboard. Change something in the dashboard, then ask the bot about it, in any language.
              </p>
            </div>
            <div className="mt-10">
              <DemoChat initialNiche={v.niche} />
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Fixed prices</h2>
            <p className="mt-3 max-w-xl text-muted">{chatbotCarePlan.desc}</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {chatbotTiers.map((t) => (
                <a
                  key={t.name}
                  href={`/contact?service=ai-chatbot&package=${t.slug}`}
                  className="flex flex-col rounded-xl2 card-glow-border p-6 transition-colors hover:!border-mint/60"
                >
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-ink">{t.price}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {t.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <Check size={14} className="mt-0.5 shrink-0 text-mint" aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>
                  {firstYearFrom(t) && (
                    <p className="mt-4 text-xs text-muted">
                      + Care plan from £{t.monthlyFrom}/month · first year from £{firstYearFrom(t)?.toLocaleString("en-GB")}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Questions from {v.name.toLowerCase()}</h2>
            <div className="mt-8 divide-y divide-border border-t border-border">
              {v.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                    <span className="font-medium">{f.q}</span>
                    <Plus size={18} className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              Other business types and country pages: <a className="text-mint hover:underline" href="/ai-chatbot">see all AI chatbot options</a>.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-content px-5 py-16 text-center sm:px-8 sm:py-24">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Ready to stop missing customer messages?</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">Tell us what your customers ask and get a fixed quote back.</p>
            <a href={`/contact?service=ai-chatbot&ref=${v.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
              Get a free quote <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
