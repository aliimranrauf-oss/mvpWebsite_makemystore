import type { Metadata } from "next";
import { ArrowRight, Check, MessageSquare, Database, Smartphone, Bot } from "lucide-react";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { chatbotTiers, chatbotFaqs } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom AI Chatbot Development — MakeMyStore",
  description:
    "Custom AI chatbots trained on your business data — from a simple scripted FAQ bot to a full GPT/Claude-powered assistant with memory. Deployed on your website, WhatsApp, or Telegram.",
  keywords: [
    "AI chatbot development",
    "custom chatbot for business",
    "GPT chatbot developer",
    "WhatsApp AI chatbot",
    "RAG chatbot",
    "website chatbot widget",
  ],
  alternates: {
    canonical: `${SITE_URL}/ai-chatbot`,
  },
  openGraph: {
    title: "Custom AI Chatbot Development — MakeMyStore",
    description:
      "A chatbot trained on your business — from a simple FAQ bot to a full AI assistant with memory, on your website, WhatsApp, or Telegram.",
    url: `${SITE_URL}/ai-chatbot`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Custom AI Chatbot Development — MakeMyStore",
    description:
      "A chatbot trained on your business — from a simple FAQ bot to a full AI assistant with memory.",
  },
};

const included = [
  {
    icon: Bot,
    title: "Scripted or AI-powered",
    desc: "Start with a straightforward rule-based bot, or go straight to a GPT, Claude, or Grok-powered assistant — your call.",
  },
  {
    icon: Database,
    title: "Trained on your data",
    desc: "Real memory and retrieval (RAG) grounded in your own docs, FAQs, and product info — not generic answers.",
  },
  {
    icon: Smartphone,
    title: "Deployed where your customers are",
    desc: "Website widget included by default. WhatsApp and Telegram integrations available as add-ons.",
  },
];

export default function AiChatbotPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: chatbotFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="AI Chatbot Development"
          title="A chatbot that actually knows your business"
          description="From a simple scripted FAQ bot to a full AI assistant with memory — trained on your own data, deployed on your website, WhatsApp, or Telegram."
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight size={16} />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              See pricing
            </a>
          </div>
        </PageHeader>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                What's included
              </h2>
              <p className="mt-4 text-muted">
                Every chatbot is built to fit how your business actually works — not
                dropped in from a generic template.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {included.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Basic bot vs. AI-powered bot
              </h2>
              <p className="mt-4 text-muted">
                Two different problems, two different builds — pick whichever matches
                what your customers actually ask.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl2 card-glow-border p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                  <MessageSquare size={20} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  Basic FAQ Bot
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Scripted, rule-based replies. Good for straightforward, repeatable
                  questions — hours, pricing, policies.
                </p>
              </div>
              <div className="rounded-xl2 card-glow-border card-glow-border--accent p-7" style={{ ["--card-bg" as string]: "#F7FBF8" }}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                  <Bot size={20} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  AI-Powered Bot
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  GPT, Claude, or Grok, trained on your own business data with real
                  memory — handles open-ended questions naturally.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-4 text-muted">
                Fixed quote before anything starts — no surprises later.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {chatbotTiers.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-xl2 p-6 ${
                    t.highlight ? "card-glow-border card-glow-border--accent" : "card-glow-border"
                  }`}
                  style={{ ["--card-bg" as string]: t.highlight ? "#F7FBF8" : "#FFFFFF" }}
                >
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-ink">{t.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="mt-10 divide-y divide-border border-t border-border">
              {chatbotFaqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                    <span className="font-medium">{f.q}</span>
                    <Plus
                      size={18}
                      className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Ready for a chatbot that knows your business?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Send over what you need answered and get a fixed quote back.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Start a project
                <ArrowRight size={16} />
              </a>
              <a
                href="/#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                See all services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
