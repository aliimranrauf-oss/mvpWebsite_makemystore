const points = [
  {
    title: "You own every account",
    desc: "GitHub, Vercel, Supabase, OpenAI — all set up under your own accounts, not mine.",
  },
  {
    title: "Full code ownership",
    desc: "The entire codebase belongs to you the moment it's delivered. No licensing, no revoked access.",
  },
  {
    title: "No lock-in",
    desc: "Hand the project to any other developer at any time — it's plain Next.js, nothing proprietary.",
  },
];

export default function Trust() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              It's your project, from day one
            </h2>
            <p className="mt-4 text-muted">
              Plenty of agencies keep a hand on the wheel after delivery. This
              one doesn't.
            </p>
          </div>
          <div className="divide-y divide-border">
            {points.map((p) => (
              <div key={p.title} className="py-6 first:pt-0 last:pb-0">
                <h3 className="font-medium text-ink">{p.title}</h3>
                <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
