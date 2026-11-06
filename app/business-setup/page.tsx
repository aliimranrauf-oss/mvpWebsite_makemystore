import type { Metadata } from "next";
import { ArrowRight, MapPin, Globe, MessageSquare, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { TierGroup } from "@/components/Pricing";
import { setupTiers, setupFaqs } from "@/lib/data";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/constants";

const TITLE = "Google Business Profile, Website & AI Chatbot Setup";
const DESC =
  "We set up your Google Business Profile, build your website or online store, and add an AI chatbot for your website and WhatsApp. Clear fixed packages for small local businesses.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/business-setup` },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESC,
    url: `${SITE_URL}/business-setup`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ ...DEFAULT_OG_IMAGE, alt: "Google Business Profile, website and AI chatbot setup" }],
  },
};

const steps = [
  { icon: MapPin, title: "1. Get found", desc: "We create and optimise your Google Business Profile in your own account, so people find you on Search and Maps." },
  { icon: Globe, title: "2. Get online", desc: "A fast website for your services, or an online store for your products, with a WhatsApp button." },
  { icon: MessageSquare, title: "3. Answer automatically", desc: "An AI chatbot answers questions and collects leads or orders on your website and WhatsApp." },
  { icon: HeartHandshake, title: "4. Stay current", desc: "An optional monthly care plan keeps everything updated and working." },
];

export default function BusinessSetupPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: setupFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Complete Online Setup"
          title="Get found on Google, sell online, and answer customers automatically"
          description="One setup for small local businesses: Google Business Profile, a website or online store, and an AI chatbot for your website and WhatsApp."
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
              Get a free setup check <ArrowRight size={16} />
            </a>
            <a href="/ai-chatbot#demo" className="inline-flex items-center justify-center gap-2 rounded-full border border-mint/60 bg-surface px-6 py-3.5 text-sm font-semibold text-mint hover:bg-mint/10">
              Try the live chatbot demo
            </a>
          </div>
        </PageHeader>

        <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-surface p-6">
                <s.icon className="text-mint" size={22} />
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 border-t border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
            <TierGroup title="Setup packages" tiers={setupTiers} cta={{ href: "/contact", label: "Get a quote" }} />
            <p className="mt-6 text-sm text-muted">
              Monthly care plan from £25 / month. We never guarantee Google rankings, and your listing always stays in your own account.
            </p>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink">Questions</h2>
          <div className="mt-6 space-y-5">
            {setupFaqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-ink">{f.q}</h3>
                <p className="mt-1 text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
