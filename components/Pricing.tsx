import { ArrowRight, Check } from "lucide-react";
import { Tier, services } from "@/lib/data";
import { content as cvContent, gbp, priceRange } from "@/lib/cv-data";

/** Full tier cards. Used on /pricing. */
export function TierGroup({
  title,
  tiers,
  cta,
}: {
  title: string;
  tiers: Tier[];
  cta?: { href: string; label: string };
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        {cta && (
          <a href={cta.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-mint hover:underline">
            {cta.label}
            <ArrowRight size={14} />
          </a>
        )}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
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
  );
}

type Row = { id: string; title: string; price: string; basis: string; desc: string; page: string };

function buildRows(): Row[] {
  const dev = (slug: string, id: string, basis: string): Row => {
    const s = services.find((x) => x.slug === slug)!;
    return { id, title: s.title, price: s.price, basis, desc: s.desc, page: `/${slug}` };
  };
  const tiered = cvContent.en.packages.items.filter((p) => !p.flat);
  const cvLow = Math.min(...tiered.map((p) => priceRange(p).low));
  const cvHigh = Math.max(...tiered.map((p) => priceRange(p).high));
  const portfolio = cvContent.en.packages.items.find((p) => p.id === "portfolio")!;
  return [
    dev("ai-chatbot", "chatbot", "Fixed quote after a short scope review"),
    dev("saas-mvp", "saas-mvp", "Fixed quote after a short scope review"),
    dev("pos-system", "pos", "Fixed quote after a short scope review"),
    dev("project-rescue", "rescue", "Free review, then a fixed quote"),
    {
      id: "cv",
      title: "CV, LinkedIn & Career Writing",
      price: `From ${gbp(cvLow)}`,
      basis: `Fixed prices by career level, up to ${gbp(cvHigh)}`,
      desc: "CV and cover letter, LinkedIn, complete career packages and professional biographies.",
      page: "/cv-writing#packages",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      price: gbp(portfolio.prices.entry),
      basis: "Fixed price at every level",
      desc: "A personal portfolio website that shows your work, built to go with your CV.",
      page: "/cv-writing#portfolio",
    },
  ];
}

/** Compact "starting from" summary for the homepage. Full detail lives on /pricing. */
export default function Pricing() {
  const rows = buildRows();
  return (
    <section id="pricing" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Pricing</h2>
          <p className="mt-4 text-muted">
            All prices are in pounds sterling. CV and portfolio prices are fixed. Development
            projects get a fixed quote before any work starts.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <a
              key={r.id}
              href={`/pricing#${r.id}`}
              className="card-glow-border group flex flex-col rounded-xl2 p-6 transition-transform hover:-translate-y-0.5"
              style={{ ["--card-bg" as string]: "#FFFFFF" }}
            >
              <p className="text-sm font-medium text-ink">{r.title}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-ink">{r.price}</p>
              <p className="mt-1 text-xs font-medium text-mint">{r.basis}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{r.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-mint">
                See prices
                <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            See full pricing
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
