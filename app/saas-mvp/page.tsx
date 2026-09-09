import type { Metadata } from "next";
import { ArrowRight, Check, Rocket, Database, Bot, Github } from "lucide-react";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { mvpTiers, mvpFaqs } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI-Powered SaaS MVP Development — MakeMyStore",
  description:
    "A working SaaS product built on Next.js and Supabase, delivered in 48–72 hours. Production code, user accounts, a real database, and an optional AI chatbot built in — you own everything.",
  keywords: [
    "SaaS MVP development",
    "build a SaaS MVP fast",
    "Next.js Supabase developer",
    "startup MVP developer",
    "AI SaaS MVP",
    "fast MVP development",
  ],
  alternates: {
    canonical: `${SITE_URL}/saas-mvp`,
  },
  openGraph: {
    title: "AI-Powered SaaS MVP Development — MakeMyStore",
    description:
      "A working SaaS product built on Next.js and Supabase, delivered in days, not months.",
    url: `${SITE_URL}/saas-mvp`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI-Powered SaaS MVP Development — MakeMyStore",
    description:
      "A working SaaS product built on Next.js and Supabase, delivered in days, not months.",
  },
};

const included = [
  {
    icon: Rocket,
    title: "Production code, not a template",
    desc: "Real, readable Next.js and Supabase — the same stack a funded startup would ship on.",
  },
  {
    icon: Database,
    title: "User accounts + real database",
    desc: "Auth, data models, and the core flows your product actually needs, not a static demo.",
  },
  {
    icon: Bot,
    title: "Optional AI chatbot built in",
    desc: "Add a trained AI assistant straight into your MVP, on the Pro tier or as an add-on.",
  },
];

export default function SaasMvpPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mvpFaqs.map((f) => ({
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
          eyebrow="SaaS MVP Development"
          title="A working SaaS product in days, not months"
          description="Production-grade Next.js and Supabase, built and deployed in 48–72 hours — with real accounts, a real database, and an optional AI chatbot built in."
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight size={16} />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-cyan/60 hover:text-cyan"
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
                Built to actually launch on — not a prototype you'll have to rebuild
                later.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {included.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
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
                Who this is for
              </h2>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Founders validating an idea
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Get a real, working product in front of users fast, without months of
                  development before you know if it's worth building further.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Non-technical founders
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Describe what the product needs to do — the code, hosting, and
                  deployment are handled, and you still own everything.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Teams outgrowing a no-code tool
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Move from a drag-and-drop builder to a real codebase that can scale
                  and add features without starting over.
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
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {mvpTiers.map((t) => (
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
                        <Check size={15} className="mt-0.5 shrink-0 text-cyan" />
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
              {mvpFaqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                    <span className="font-medium">{f.q}</span>
                    <Plus
                      size={18}
                      className="shrink-0 text-cyan transition-transform duration-200 group-open:rotate-45"
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
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Ready to ship your MVP?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Send over what you're building and get a fixed quote and timeline back.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Start a project
                <ArrowRight size={16} />
              </a>
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink">
                <Github size={16} />
                Everything ships to your GitHub
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
