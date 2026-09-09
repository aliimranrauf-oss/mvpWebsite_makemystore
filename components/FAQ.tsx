import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                <span className="font-medium">{f.q}</span>
                <Plus
                  size={18}
                  className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
