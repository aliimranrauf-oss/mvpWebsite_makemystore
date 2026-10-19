import ServiceReviews from "@/components/ServiceReviews";
import { SERVICE_GROUPS } from "@/lib/reviews";
import { ArrowRight, Check, Languages, Clock, UserPlus, Stethoscope, UtensilsCrossed, Scissors, Home, ShoppingBag, Dumbbell, SlidersHorizontal, Plug } from "lucide-react";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DemoChat from "@/components/DemoChat";
import { chatbotTiers, chatbotFaqs, chatbotCarePlan, chatbotAddons } from "@/lib/data";
import { tierThemes } from "@/lib/card-theme";
import { SITE_URL, WHATSAPP_NUMBER, AI_CHATBOT_VIDEO } from "@/lib/constants";
import YouTubeFacade from "@/components/YouTubeFacade";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd, lowestPrice } from "@/lib/seo";
import { chatbotCountries, chatbotHreflang } from "@/lib/chatbot-countries";

export const metadata = buildMetadata({
  title: "AI Chatbot for Business: WhatsApp & Website, 24/7 — MakeMyStore",
  description:
    "AI chatbot for your business that answers customers 24/7 in their own language, on your website and WhatsApp. Try the live demo. From £120, fixed price.",
  path: "/ai-chatbot",
  keywords: [
    "AI chatbot for business",
    "WhatsApp chatbot for business",
    "chatbot for clinics",
    "chatbot for restaurants",
    "Arabic AI chatbot",
    "website chatbot",
    "custom chatbot developer",
  ],
  imageAlt: "AI chatbot for business: website and WhatsApp",
  // Reciprocal hreflang with the four country pages; this page is the x-default.
  languages: chatbotHreflang(SITE_URL),
});

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
  {
    icon: SlidersHorizontal,
    title: "You stay in control",
    desc: "With the dashboard, you mark items out of stock and change prices yourself. The bot updates instantly.",
  },
];

const builders = ["WordPress", "Shopify", "Wix", "Squarespace", "Webflow", "Custom websites"];

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

// Refetch approved reviews at most every 60s so new ones show without a redeploy.
export const revalidate = 60;

export default function AiChatbotPage() {

  const jsonLd = [
    serviceJsonLd({
      name: "AI Chatbot Development",
      serviceType: "AI chatbot development",
      description:
        "Custom AI chatbots trained on your business information, for your website and WhatsApp, replying in the customer's own language.",
      path: "/ai-chatbot",
      lowPriceGbp: lowestPrice(chatbotTiers.map((t) => t.price)),
      offerCount: chatbotTiers.length,
      availableLanguage: ["English", "Arabic", "Urdu", "Spanish"],
    }),
    faqJsonLd(chatbotFaqs),
    ...(AI_CHATBOT_VIDEO.uploadDate
      ? [
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: AI_CHATBOT_VIDEO.title,
            description: AI_CHATBOT_VIDEO.description,
            thumbnailUrl: [`https://i.ytimg.com/vi/${AI_CHATBOT_VIDEO.id}/hqdefault.jpg`],
            uploadDate: AI_CHATBOT_VIDEO.uploadDate,
            embedUrl: `https://www.youtube.com/embed/${AI_CHATBOT_VIDEO.id}`,
            contentUrl: `https://youtu.be/${AI_CHATBOT_VIDEO.id}`,
          },
        ]
      : []),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "AI Chatbot", path: "/ai-chatbot" },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="AI Chatbot Development"
          title="Answer customers 24/7, without hiring anyone"
          description="A chatbot trained on your own menu, prices and policies. It replies in your customer's language, captures leads, and runs on your website and WhatsApp. Fixed price from £120."
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
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like a quote for an AI chatbot for my business.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </PageHeader>

        <section aria-labelledby="how-it-works-video" className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-10 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <h2
                  id="how-it-works-video"
                  className="font-display text-2xl font-semibold text-ink sm:text-3xl"
                >
                  See how the chatbot and demo work
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
                  A short walkthrough: how the bot answers customers, captures leads, and how you update it yourself.
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <YouTubeFacade videoId={AI_CHATBOT_VIDEO.id} title={AI_CHATBOT_VIDEO.title} />
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Try it yourself
              </h2>
              <p className="mt-4 text-muted">
                See both sides: the dashboard the owner uses, and the chat the customer sees. Pick a sample
                business and ask anything, in any language.
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
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
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
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                What you get
              </h2>
              <p className="mt-4 text-muted">
                Built around how your business actually works, not dropped in from a
                generic template.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Works with your website
              </h2>
              <p className="mt-4 text-muted">
                Whatever you built your site with, the chatbot is added with one small piece of code. We add
                it for you, or send you simple steps to paste it yourself.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {builders.map((b) => (
                <li
                  key={b}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-ink"
                >
                  <Plug size={14} className="text-mint" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
              Your dashboard is a private page on our site, with your own login. It works on your phone, and
              there is nothing to install. A few website builders only allow custom code on a paid plan. If
              yours doesn't, we can connect the bot to your WhatsApp instead.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
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
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-4 text-muted">
                Fixed quote before anything starts, with no surprises later.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                <li><span className="font-medium text-ink">Basic:</span> a few simple, repeated questions.</li>
                <li><span className="font-medium text-ink">AI Bot:</span> any question, in any language.</li>
                <li><span className="font-medium text-ink">AI Bot + Dashboard:</span> you manage stock, prices and hours yourself.</li>
              </ul>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {chatbotTiers.map((t, i) => {
                const th = tierThemes(chatbotTiers)[i];
                return (
                <a
                  key={t.name}
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
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl2 border border-border bg-surface p-6">
                <p className="text-sm font-semibold text-ink">Add-ons</p>
                <ul className="mt-3 divide-y divide-border">
                  {chatbotAddons.map((a) => (
                    <li key={a.name} className="flex items-start justify-between gap-4 py-3 text-sm">
                      <span className="text-muted">{a.name}</span>
                      <span className="shrink-0 font-medium text-ink">{a.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl2 border border-border bg-surface p-6">
                <p className="text-sm font-semibold text-ink">{chatbotCarePlan.name} (optional)</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{chatbotCarePlan.desc}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  <li className="flex justify-between gap-4"><span className="text-muted">AI Bot</span><span className="font-medium text-ink">£25–£40 / month</span></li>
                  <li className="flex justify-between gap-4"><span className="text-muted">AI Bot + Dashboard</span><span className="font-medium text-ink">£40–£65 / month</span></li>
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  The AI itself is billed by usage and is typically only a few pounds a month for a small business.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-mint px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Not sure which one? Get a free quote
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-24">
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

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              AI chatbots for businesses in your country
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Local channels, local privacy rules and a price guide in your currency.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {chatbotCountries.map((c) => (
                <a
                  key={c.slug}
                  href={`/ai-chatbot/${c.slug}`}
                  className="group flex items-center justify-between rounded-xl2 card-glow-border p-5 transition-colors hover:!border-mint/60"
                >
                  <span className="font-display text-base font-semibold text-ink">{c.label}</span>
                  <ArrowRight size={16} className="text-mint transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <ServiceReviews services={SERVICE_GROUPS.chatbot} title="What clients say about our AI chatbots" />

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
