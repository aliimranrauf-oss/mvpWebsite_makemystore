import { Plus } from "lucide-react";
import { chatbotFaqs, mvpFaqs, rescueFaqs } from "@/lib/data";

type FaqItem = { q: string; a: string };

function FaqGroup({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-4 divide-y divide-border border-t border-border">
        {items.map((f) => (
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
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted">
            Grouped by service, so you can find the answer that actually
            applies to what you need.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          <FaqGroup title="AI Chatbot" items={chatbotFaqs} />
          <FaqGroup title="AI-Powered SaaS MVP" items={mvpFaqs} />
          <FaqGroup title="Project Rescue" items={rescueFaqs} />
        </div>
      </div>
    </section>
  );
}
