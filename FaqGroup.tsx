import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/faq-groups";

export default function FaqGroup({ title, items, id }: { title: string; items: FaqItem[]; id?: string }) {
  return (
    <div id={id} className="scroll-mt-24">
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
            <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
