import type { Metadata } from "next";
import { ArrowRight, Check, MessageSquare, Languages, Clock, UserPlus, Stethoscope, UtensilsCrossed, Scissors, Home, ShoppingBag, Dumbbell } from "lucide-react";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DemoChat from "@/components/DemoChat";
import { chatbotTiers, chatbotFaqs, chatbotCarePlan } from "@/lib/data";
import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Chatbot for Business: WhatsApp & Website, 24/7 — MakeMyStore",
  description:
    "AI chatbot for your business that answers customers 24/7 in their own language, on your website and WhatsApp. Try the live demo. From $150, fixed price.",
  keywords: [
    "AI chatbot for business",
    "WhatsApp chatbot for business",
    "chatbot for clinics",
    "chatbot for restaurants",
    "Arabic AI chatbot",
    "website chatbot",
    "custom chatbot developer",
  ],
  alternates: {
    canonical: `${SITE_URL}/ai-chatbot`,
  },
  openGraph: {
    title: "AI Chatbot for Business: WhatsApp & Website, 24/7 — MakeMyStore",
    description:
      "A chatbot trained on your business — from a simple FAQ bot to a full AI assistant with memory, on your website, WhatsApp, or Telegram.",
    url: `${SITE_URL}/ai-chatbot`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Chatbot for Business: WhatsApp & Website, 24/7 — MakeMyStore",
    description:
      "A chatbot trained on your business — from a simple FAQ bot to a full AI assistant with memory.",
  },
};

const included = [
  {
    icon: Clock,
    title: "Answers 24/7",
    desc: "Customers get an instant reply at 2am, so you stop losing enquiries while you sleep.",
  },
  {
    icon: Languages,
    title: "Speaks your customer's language",
    desc: "The AI-Powered bot replies in Arabic, English, Urdu and more, whichever the customer writes in.",
  },
  {
    icon: UserPlus,
    title: "Captures leads and bookings",
    desc: "It collects names, phone numbers and booking details and passes them to you.",
  },
];

const niches = [
  { icon: Stethoscope, title: "Clinics and dentists", ask: "“Do you take my insurance? How much is a check-up?”" },
  { icon: UtensilsCrossed, title: "Restaurants and cafes", ask: "“Do you have vegan dishes? Can I book for 6?”" },
  { icon: Scissors, title: "Salons and spas", ask: "“How much is bridal makeup? Are you free Saturday?”" },
  { icon: Home, title: "Real estate agents", ask: "“Is the 2-bed still available? Can I book a viewing?”" },
  { icon: ShoppingBag, title: "Online shops", ask: "“Where is my order? What is your return policy?”" },
  { icon: Dumbbell, title: "Gyms and training centres", ask: "“What are the membership prices? Do you have classes?”" },
];

const steps = [
  { n: "1", title: "Tell us about your business", desc: "Send your menu, services, prices and common questions. No technical knowledge needed." },
  { n: "2", title: "We build and test it", desc: "We set up your bot, check it against real customer questions and show you a preview." },
  { n: "3", title: "It goes live", desc: "We add it to your website (and WhatsApp if you want). Most bots are live within a few days." },
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
          title="Answer customers 24/7, without hiring anyone"
          description="A chatbot trained on your own menu, prices and policies. It replies in your customer's language, captures leads, and runs on your website and WhatsApp. Fixed price from $150."
          image={{ src: "/images/hero/ai-chatbot.png", alt: "Custom AI chatbot conversation interface" }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Try the live demo
              <ArrowRight size={16} />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              Get a free quote
            </a>
            {WHATSAPP_NUMBER && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </PageHeader>

        <section id="demo" className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Try it yourself
              </h2>
              <p className="mt-4 text-muted">
                Pick a sample business and ask anything, in any language. This is exactly how a bot built for
                your business would reply.
              </p>
            </div>
            <div className="mt-10">
              <DemoChat />
            </div>
            <div className="mt-8 text-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                I want this for my business
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Who it's for
              </h2>
              <p className="mt-4 text-muted">
                Any business that gets the same customer questions again and again.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {niches.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.title} className="rounded-xl2 card-glow-border p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">{n.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">Typical questions: {n.ask}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                What you get
              </h2>
              <p className="mt-4 text-muted">
                Built around how your business actually works, not dropped in from a
                generic template.
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
                Pick whichever matches what your customers actually ask. Not sure? We'll
                recommend one after a quick chat.
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
                  Replies from a list of questions and answers you approve. Best for
                  simple, repeated questions like hours, prices and location.
                </p>
              </div>
              <div className="rounded-xl2 card-glow-border card-glow-border--accent p-7" style={{ ["--card-bg" as string]: "#F7FBF8" }}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                  <MessageSquare size={20} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  AI-Powered Bot
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Understands any question, replies in your customer's language, and
                  answers from your real business information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">How it works</h2>
              <p className="mt-4 text-muted">Three simple steps, and you stay in control throughout.</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint font-display text-base font-semibold text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              ))}
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
            <div className="mt-6 flex flex-col gap-3 rounded-xl2 border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-ink">
                  Optional: {chatbotCarePlan.name} <span className="text-muted">({chatbotCarePlan.price})</span>
                </p>
                <p className="mt-1 text-sm text-muted">{chatbotCarePlan.desc}</p>
              </div>
              <a href="/contact" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-mint">
                Not sure which one? Ask us <ArrowRight size={14} />
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              AI usage is billed by volume and is typically only a few dollars a month for a small business.
              The care plan covers up to 3,000 customer replies a month.
            </p>
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
              Ready to stop missing customer messages?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Tell us what customers ask you and get a fixed quote back.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Get a free quote
                <ArrowRight size={16} />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                Try the demo again
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
