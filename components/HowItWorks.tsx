import { howItWorksSteps as steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          How it works
        </h2>
        <p className="mt-4 text-muted">Four steps, start to finish.</p>
      </div>

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.n} className="relative pl-0">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-semibold text-mint">{s.n}</span>
              {i < steps.length - 1 && (
                <span className="hidden h-px flex-1 bg-border lg:block" />
              )}
            </div>
            <h3 className="mt-4 font-medium text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
