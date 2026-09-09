import { Check } from "lucide-react";
import { Tier, chatbotTiers, mvpTiers, rescueTiers } from "@/lib/data";

function TierGroup({ title, tiers }: { title: string; tiers: Tier[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
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
