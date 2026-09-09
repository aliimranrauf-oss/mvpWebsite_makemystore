import { Check } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlight?: boolean;
};

const chatbotTiers: Tier[] = [
  {
    name: "Basic FAQ Bot",
    price: "$150–$250",
    desc: "Scripted replies, no AI. Good for straightforward, repeatable questions.",
    features: ["Rule-based Q&A flow", "Website popup widget", "1 revision round"],
  },
  {
    name: "AI-Powered Bot",
    price: "$500–$900",
    desc: "GPT, Claude, or Grok — trained on your own business data.",
    features: [
      "Real memory + RAG on your data",
      "Website widget included",
      "WhatsApp / Telegram: +$120 / +$100",
    ],
    highlight: true,
  },
];

const mvpTiers: Tier[] = [
  {
    name: "Starter",
    price: "$250",
    desc: "A focused, single-purpose MVP to validate an idea fast.",
    features: ["Core feature set", "Next.js + Supabase", "48–72 hour delivery"],
  },
  {
    name: "Growth",
    price: "$650",
    desc: "A more complete product with auth, database, and a few key flows.",
    features: ["Everything in Starter", "User accounts + database", "Basic admin view"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "$1,600",
    desc: "A fuller build for products ready to bring on real users.",
    features: ["Everything in Growth", "Optional AI chatbot built in", "Priority delivery"],
  },
];

const rescueTiers: Tier[] = [
  {
    name: "Quick Fix",
    price: "$150–$300",
    desc: "Small bugs or a missing feature on an otherwise working project.",
    features: ["Bug fixes", "Minor feature additions", "Delivered on your GitHub"],
  },
  {
    name: "Standard Rescue",
    price: "$400–$800",
    desc: "Broken features, hosting issues, or a project that needs real cleanup.",
    features: ["Feature repair", "Proper GitHub + Vercel setup", "Code cleanup"],
    highlight: true,
  },
  {
    name: "Full Rebuild",
    price: "From $1,000",
    desc: "The project needs to be largely rebuilt. Priced after a quick review.",
    features: ["Free scope review first", "Rebuilt on Next.js", "Fixed quote before we start"],
  },
];

function TierGroup({ title, tiers }: { title: string; tiers: Tier[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-xl2 border p-6 ${
              t.highlight ? "border-mint/60 bg-mint/[0.04]" : "border-border bg-surface"
            }`}
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

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-4 text-muted">
            Ranges depend on scope. Every project gets a fixed quote before
            any work starts.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          <TierGroup title="AI Chatbot" tiers={chatbotTiers} />
          <TierGroup title="AI-Powered SaaS MVP" tiers={mvpTiers} />
          <TierGroup title="Project Rescue" tiers={rescueTiers} />
        </div>
      </div>
    </section>
  );
}
