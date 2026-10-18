import FaqGroup from "@/components/FaqGroup";
import { faqGroups } from "@/lib/faq-groups";

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
          {faqGroups.map((g) => (
            <FaqGroup key={g.id} id={`faq-${g.id}`} title={g.title} items={g.items} />
          ))}
        </div>
      </div>
    </section>
  );
}
