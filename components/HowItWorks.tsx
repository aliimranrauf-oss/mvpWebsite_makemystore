const steps = [
  {
    n: "1",
    title: "Tell us what you need",
    desc: "A chatbot, a new MVP, or a project that's stuck. Send a few details through the contact form.",
  },
  {
    n: "2",
    title: "Get a fixed quote",
    desc: "You'll hear back with a clear price and timeline before anything starts — no surprises later.",
  },
  {
    n: "3",
    title: "We build or fix it",
    desc: "Work happens on Next.js, Supabase, and Vercel, with updates along the way.",
  },
  {
    n: "4",
    title: "You get everything",
    desc: "Full source pushed to your GitHub, deployed to your Vercel. You own all of it.",
  },
];

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
