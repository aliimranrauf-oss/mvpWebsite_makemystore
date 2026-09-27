import type { Metadata } from "next";
import { ArrowRight, Check, Wrench, Search, ShieldCheck } from "lucide-react";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { rescueTiers, rescueFaqs } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Project Rescue — Fix a Stuck AI-Built Project — MakeMyStore",
  description:
    "Stuck on a project from Lovable, Bolt, or another AI builder? We review it, fix what's broken, and deploy it cleanly to your own GitHub and Vercel.",
  keywords: [
    "fix Lovable project",
    "fix Bolt.new project",
    "AI app not working",
    "project rescue developer",
    "fix broken Next.js app",
    "finish stuck MVP",
  ],
  alternates: {
    canonical: `${SITE_URL}/project-rescue`,
  },
  openGraph: {
    title: "Project Rescue — Fix a Stuck AI-Built Project — MakeMyStore",
    description:
      "We review, fix, and deploy projects that stalled out on Lovable, Bolt, or another AI builder.",
    url: `${SITE_URL}/project-rescue`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Project Rescue — Fix a Stuck AI-Built Project — MakeMyStore",
    description:
      "We review, fix, and deploy projects that stalled out on Lovable, Bolt, or another AI builder.",
  },
};

const included = [
  {
    icon: Search,
    title: "Honest review first",
    desc: "Send the current state of the project and get a clear read on what's actually broken before anything is priced.",
  },
  {
    icon: Wrench,
    title: "Rebuilt cleanly on Next.js",
    desc: "Broken features repaired or rebuilt on a standard, maintainable stack — no more fighting a black-box tool.",
  },
  {
    icon: ShieldCheck,
    title: "Deployed properly",
    desc: "Pushed to your own GitHub and deployed to your own Vercel, so it's actually live and yours to keep.",
  },
];

const commonProblems = [
  "Features that half-work or fail silently",
  "No real database, or one set up incorrectly",
  "Never actually deployed, or deployed somewhere you don't control",
  "Login/auth that's broken or missing entirely",
  "Code so tangled that even small changes break something else",
  "The original builder tool got abandoned or is unsupported",
];

export default function ProjectRescuePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rescueFaqs.map((f) => ({
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
          eyebrow="Project Rescue"
          title="Stuck on an AI-generated project? We'll finish it properly."
          description="Broken features, no real backend, or a build that never quite worked — reviewed, fixed, and deployed cleanly on Next.js, Supabase, and Vercel."
          image={{ src: "/images/hero/project-rescue.png", alt: "Rebuilding a broken AI-generated app cleanly on Next.js" }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Get a free review
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
                Common problems we fix
              </h2>
              <p className="mt-4 text-muted">
                If any of this sounds familiar, a rescue is probably faster and
                cheaper than starting over.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {commonProblems.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-xl2 card-glow-border p-5 text-sm text-muted">
                  <Wrench size={16} className="mt-0.5 shrink-0 text-mint" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pricing" className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-4 text-muted">
                Full Rebuild is priced after a quick, free review. Everything else is a
                fixed quote before work starts.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {rescueTiers.map((t) => (
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
              {rescueFaqs.map((f) => (
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
              Send us the project — get an honest read on it
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              No commitment required to ask. You'll get a fixed quote before anything
              starts.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Get a free review
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
