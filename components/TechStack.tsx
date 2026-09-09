const stack = [
  "Next.js",
  "Supabase",
  "Vercel",
  "OpenAI",
  "Claude",
  "Tailwind CSS",
  "GitHub",
];

export default function TechStack() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
        <p className="text-center text-sm text-muted sm:text-left">
          Built with tools you already trust
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {stack.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border px-4 py-2 text-sm text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
