import { MessageSquare, Rocket, Wrench, Store, ArrowRight } from "lucide-react";
import { services as serviceData } from "@/lib/data";

const icons = {
  "ai-chatbot": MessageSquare,
  "saas-mvp": Rocket,
  "pos-system": Store,
  "project-rescue": Wrench,
};

const services = serviceData.map((s) => ({
  ...s,
  icon: icons[s.slug as keyof typeof icons],
}));

export default function ServiceCards() {
  return (
    <section id="services" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Four ways to build with AI
          </h2>
          <p className="mt-4 text-muted">
            Pick the one that matches where you are — building fresh, running a
            shop, or picking up where another tool left off.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            const ring = s.accent === "mint" ? "text-mint" : "text-cyan";
            const bg = s.accent === "mint" ? "bg-mint/10" : "bg-cyan/10";
            return (
              <div
                key={s.title}
                className="flex flex-col rounded-xl2 card-glow-border p-7"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${bg} ${ring}`}
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted">
                      <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${ring} bg-current`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-display text-lg font-semibold text-ink">{s.price}</span>
                  <a
                    href={`/${s.slug}`}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${ring}`}
                  >
                    Details
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
