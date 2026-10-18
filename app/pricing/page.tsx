import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FaqGroup from "@/components/FaqGroup";
import { TierGroup } from "@/components/Pricing";
import {
  chatbotTiers,
  chatbotAddons,
  chatbotCarePlan,
  mvpTiers,
  posTiers,
  rescueTiers,
} from "@/lib/data";
import { content as cvContent, gbp, packageLevels } from "@/lib/cv-data";
import { pricingFaqs } from "@/lib/faq-groups";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing: AI Chatbots, SaaS MVPs, POS, CV Writing — MakeMyStore",
  description:
    "Clear GBP pricing for AI chatbots, SaaS MVPs, POS systems, Project Rescue, CV and LinkedIn writing and portfolio websites. Fixed prices or a fixed quote before work starts.",
  path: "/pricing",
  keywords: [
    "AI chatbot price",
    "SaaS MVP cost",
    "POS system cost",
    "CV writing prices",
    "LinkedIn profile writing price",
    "MakeMyStore pricing",
  ],
  ogLocale: "en_GB",
  imageAlt: "MakeMyStore pricing for every service",
});

const jumpLinks = [
  { href: "#chatbot", label: "AI Chatbot" },
  { href: "#saas-mvp", label: "SaaS MVP" },
  { href: "#pos", label: "POS System" },
  { href: "#rescue", label: "Project Rescue" },
  { href: "#cv", label: "CV & LinkedIn" },
  { href: "#portfolio", label: "Portfolio Website" },
  { href: "#faq", label: "FAQ" },
];

function SectionHead({ title, note }: { title: string; note: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted">{note}</p>
    </div>
  );
}

export default function PricingPage() {
  const levels = cvContent.en.packages.levels;
  const tiered = cvContent.en.packages.items.filter((p) => !p.flat);
  const portfolio = cvContent.en.packages.items.find((p) => p.id === "portfolio")!;

  const jsonLd = [
    faqJsonLd(pricingFaqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Pricing"
          title="Clear prices for every service"
          description="All prices are in pounds sterling. CV and portfolio prices are fixed. AI chatbots, SaaS MVPs, POS systems and Project Rescue get a fixed quote before any work starts."
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Get a fixed quote
              <ArrowRight size={16} />
            </a>
            <a
              href="#cv"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              See CV prices
            </a>
          </div>
        </PageHeader>

        <nav aria-label="Pricing sections" className="border-b border-border bg-surface2/60">
          <div className="mx-auto flex max-w-content flex-wrap gap-2 px-5 py-4 sm:px-8">
            {jumpLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        <section id="chatbot" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead
              title="AI Chatbot"
              note="Starting prices and ranges by tier. You get a fixed quote once we know your business."
            />
            <div className="mt-12">
              <TierGroup
                title="Choose a tier"
                tiers={chatbotTiers}
                cta={{ href: "/ai-chatbot", label: "AI Chatbot details and live demo" }}
              />
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">Optional add-ons</h3>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {chatbotAddons.map((a) => (
                    <li key={a.name} className="flex justify-between gap-4 py-3 text-sm">
                      <span className="text-muted">{a.name}</span>
                      <span className="shrink-0 font-medium text-ink">{a.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{chatbotCarePlan.name}</h3>
                <p className="mt-4 text-sm font-medium text-ink">{chatbotCarePlan.price}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{chatbotCarePlan.desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="saas-mvp" className="scroll-mt-24 border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead
              title="AI-Powered SaaS MVP"
              note="A working product on Next.js and Supabase. Pick the tier closest to your idea and we confirm a fixed quote."
            />
            <div className="mt-12">
              <TierGroup title="Choose a tier" tiers={mvpTiers} cta={{ href: "/saas-mvp", label: "SaaS MVP details" }} />
            </div>
          </div>
        </section>

        <section id="pos" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead
              title="POS & Shop Management"
              note="Inventory, billing, customers, suppliers and reports, built around your business."
            />
            <div className="mt-12">
              <TierGroup title="Choose a tier" tiers={posTiers} cta={{ href: "/pos-system", label: "POS system details and live demos" }} />
            </div>
          </div>
        </section>

        <section id="rescue" className="scroll-mt-24 border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead
              title="Project Rescue"
              note="Stuck on a project from Lovable, Bolt or another AI builder? We review it first, then give you a fixed quote."
            />
            <div className="mt-12">
              <TierGroup title="Choose a tier" tiers={rescueTiers} cta={{ href: "/project-rescue", label: "Project Rescue details" }} />
            </div>
          </div>
        </section>

        <section id="cv" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead
              title="CV, LinkedIn & Career Writing"
              note="Fixed prices by career level. The price you see is the price you pay, with 11 months of free revisions on every package."
            />

            <div className="mt-10 overflow-x-auto rounded-xl2 border border-border">
              <table className="w-full min-w-[680px] text-left text-sm">
                <caption className="sr-only">CV and LinkedIn package prices in GBP by career level</caption>
                <thead className="bg-surface2/60">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium text-ink">
                      Package
                    </th>
                    {levels.map((l) => (
                      <th key={l.id} scope="col" className="px-4 py-3">
                        <span className="block font-semibold text-ink">{l.label}</span>
                        <span className="text-xs font-normal text-muted">{l.years}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tiered.map((p) => {
                    const offered = packageLevels(p);
                    return (
                      <tr key={p.id} className={p.highlight ? "bg-mint/5" : ""}>
                        <th scope="row" className="px-4 py-4 align-top font-normal">
                          <a href={`/cv-writing#pkg-${p.id}`} className="font-medium text-ink hover:text-mint">
                            {p.name}
                          </a>
                          {p.badge && (
                            <span className="ml-2 rounded-full bg-mint/10 px-2 py-0.5 text-[11px] font-semibold text-mint">
                              {p.badge}
                            </span>
                          )}
                          <span className="mt-0.5 block text-xs text-muted">{p.priceNote}</span>
                        </th>
                        {levels.map((l) => (
                          <td key={l.id} className="px-4 py-4 align-top font-display text-lg font-semibold text-ink">
                            {offered.includes(l.id) ? (
                              gbp(p.prices[l.id])
                            ) : (
                              <>
                                <span aria-hidden="true" className="text-muted">
                                  –
                                </span>
                                <span className="sr-only">Not offered at this level</span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Biographies are written for Senior and Executive profiles. A tailored cover letter and an interview
              follow-up email are included free with CV packages.
            </p>

            <div className="mt-8">
              <a
                href="/cv-writing#packages"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Choose a package and order
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-24 border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <SectionHead
              title="Portfolio Website"
              note="A personal portfolio site that shows your work. One fixed price at every career level."
            />
            <div
              className="card-glow-border mt-10 flex max-w-md flex-col rounded-xl2 p-6"
              style={{ ["--card-bg" as string]: "#FFFFFF" }}
            >
              <p className="text-sm font-medium text-ink">{portfolio.name}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{gbp(portfolio.prices.entry)}</p>
              <p className="mt-1 text-xs font-medium text-mint">Fixed price</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{portfolio.tagline}</p>
              <a
                href="/cv-writing#portfolio"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-mint hover:underline"
              >
                Portfolio website details
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Pricing questions</h2>
              <p className="mt-4 text-muted">
                More answers for each service are in the{" "}
                <a href="/#faq" className="font-medium text-mint hover:underline">
                  full FAQ
                </a>
                .
              </p>
            </div>
            <div className="mt-10">
              <FaqGroup title="Pricing & payment" items={pricingFaqs} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
