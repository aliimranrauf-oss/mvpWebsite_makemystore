import type { Metadata } from "next";
import { ArrowRight, Check, Plus, FileText, Globe2, MapPin, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CvOrderForm from "@/components/CvOrderForm";
import {
  cvPackages,
  cvIncluded,
  gulfPoints,
  gulfMarkets,
  cvSteps,
  cvFaqs,
} from "@/lib/cv-data";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const TITLE = "Professional CV, LinkedIn & Cover Letter Writing for KSA, UAE & the Gulf — MakeMyStore";
const DESC =
  "ATS-friendly CV writing, free cover letter, LinkedIn optimisation and professional biographies for job seekers in Saudi Arabia, the UAE and the GCC. From £40, 11 months free revisions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "CV writing service Saudi Arabia",
    "CV writing service UAE",
    "CV writing Dubai",
    "CV writing Riyadh",
    "professional resume writer Gulf",
    "LinkedIn profile writing",
    "ATS friendly CV",
    "cover letter writing",
    "academic CV writing",
    "professional biography writing",
  ],
  alternates: { canonical: `${SITE_URL}/cv-writing` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/cv-writing`, type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

const heroStats = [
  { label: "Cover letter", value: "Free" },
  { label: "Free revisions", value: "11 months" },
  { label: "Packages from", value: "£40" },
  { label: "Live chat", value: "24/7" },
];

export default function CvWritingPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cvFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${SITE_NAME} CV & LinkedIn Writing`,
      url: `${SITE_URL}/cv-writing`,
      description: DESC,
      areaServed: [
        "Saudi Arabia",
        "United Arab Emirates",
        "Qatar",
        "Kuwait",
        "Bahrain",
        "Oman",
      ].map((n) => ({ "@type": "Country", name: n })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CV & Career Document Packages",
        itemListElement: cvPackages.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.name, description: p.tagline },
        })),
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        {/* HERO — same PageHeader as the other service pages.
            To add the image later, drop the file in /public/images/hero/cv-writing.png
            and uncomment the `image` prop below. */}
        <PageHeader
          eyebrow="CV, LinkedIn & Career Documents"
          title="A CV that opens doors across Saudi Arabia, the UAE and the Gulf"
          description="Professional CV, cover letter, LinkedIn and biography writing for ambitious candidates targeting the GCC. ATS-ready, industry-matched and backed by 11 months of free revisions."
          // image={{ src: "/images/hero/cv-writing.png", alt: "Professional CV and LinkedIn writing for Gulf job seekers" }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Get my exact price
              <ArrowRight size={16} />
            </a>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              View packages
            </a>
          </div>
        </PageHeader>

        {/* Stats strip */}
        <section className="border-b border-border bg-surface2/60">
          <div className="mx-auto grid max-w-content grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-20 border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Packages built around your career goals
              </h2>
              <p className="mt-4 text-muted">
                Services start from £40. Every package includes free revisions, and you get a fixed
                price before any work begins.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {cvPackages.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <div
                    className={`flex h-full flex-col rounded-xl2 p-6 ${
                      p.highlight ? "card-glow-border card-glow-border--accent" : "card-glow-border"
                    }`}
                    style={{ ["--card-bg" as string]: p.highlight ? "#F7FBF8" : "#FFFFFF" }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-ink">{p.name}</p>
                      {p.badge && (
                        <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[11px] font-semibold text-mint">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 font-display text-2xl font-semibold text-ink">{p.price}</p>
                    <p className="mt-1 text-xs text-muted">{p.priceNote}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{p.tagline}</p>
                    <p className="mt-3 text-xs leading-relaxed text-ink/70">
                      <span className="font-semibold text-ink">Best for:</span> {p.bestFor}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted">
                          <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#order"
                      data-package={p.id}
                      className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                        p.highlight
                          ? "bg-mint text-white"
                          : "border border-border bg-surface text-ink hover:border-mint/60 hover:text-mint"
                      }`}
                    >
                      Choose this package
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-xl2 border border-border bg-surface2/60 p-5 text-sm text-muted sm:flex-row sm:items-center">
              <FileText size={18} className="shrink-0 text-mint" />
              <p>
                <span className="font-semibold text-ink">Also available:</span> Academic CV writing for
                researchers and lecturers, covering publications, grants, teaching and conferences.
                Mention it in the order form.
              </p>
            </div>
          </div>
        </section>

        {/* Gulf focus */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
                <Globe2 size={14} /> Made for the GCC job market
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Written for how Gulf employers hire
              </h2>
              <p className="mt-4 text-muted">
                Recruiters in the Gulf review hundreds of applications for every opening. We shape your
                documents so the right details land in the first few seconds.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {gulfPoints.map((g) => (
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
              {gulfMarkets.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-ink"
                >
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
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Included with every order
              </h2>
              <p className="mt-4 text-muted">
                Premium quality without the premium price tag that high-end UK CV writers charge.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cvIncluded.map((item) => (
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
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">How it works</h2>
              <p className="mt-4 text-muted">A fast, simple process — from first message to finished documents.</p>
            </div>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cvSteps.map((s, i) => (
                <li key={s.title}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint text-sm font-semibold text-white">
                    {i + 1}
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
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Get your exact price
              </h2>
              <p className="mt-4 text-muted">
                Tell us about the role you are after. We will reply within 24 hours with a fixed quote
                and delivery date. No payment is taken at this stage.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Fixed quote before any work starts",
                  "Free cover letter with CV packages",
                  "11 months of free revisions",
                  "Free interview follow-up email",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-xl2 border border-border bg-surface p-6 sm:p-8">
                <CvOrderForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="mt-10 divide-y divide-border border-t border-border">
              {cvFaqs.map((f) => (
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

        {/* Final CTA */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Ready for your next role in the Gulf?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Send your details and get a fixed price back within 24 hours.
            </p>
            <div className="mt-8">
              <a
                href="#order"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Get my exact price
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
