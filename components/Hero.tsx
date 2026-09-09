import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-mint/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-40 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-content gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-24 lg:pt-24">
        <div>
          <p className="mb-5 text-sm font-medium text-cyan">
            For businesses and builders who need AI shipped, not explained
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
            AI chatbots and SaaS MVPs, built with real, production code
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
            Get a custom AI chatbot, a full SaaS MVP, or a proper fix for the
            AI-generated project you&apos;re stuck on. Built on Next.js,
            Supabase, and Vercel — and pushed straight to your own GitHub.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-mint px-6 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-cyan/60 hover:text-cyan"
            >
              <Play size={15} />
              See how it works
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-6 sm:max-w-md">
            <div>
              <dt className="font-display text-2xl font-semibold text-ink">48–72h</dt>
              <dd className="mt-1 text-xs text-muted">MVP delivery</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-semibold text-ink">100%</dt>
              <dd className="mt-1 text-xs text-muted">Code ownership</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-semibold text-ink">0</dt>
              <dd className="mt-1 text-xs text-muted">Vendor lock-in</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="relative rounded-xl2 border border-border bg-surface p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                <span className="text-sm font-medium text-ink">Revenue overview</span>
              </div>
              <span className="text-xs text-mint">+18.3%</span>
            </div>
            <div className="mt-5 flex h-28 items-end gap-2">
              {[38, 52, 44, 64, 58, 78, 70, 92].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-mint/20 to-mint"
                />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <p className="text-xs text-muted">Active users</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">2,482</p>
              </div>
              <div>
                <p className="text-xs text-muted">Conversations</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink">1,204</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-6 w-64 rounded-xl2 border border-border bg-surface2 p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] sm:-left-10">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/15 text-xs text-cyan">
                AI
              </span>
              <span className="text-xs font-medium text-ink">Assistant · online</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Can you walk me through your pricing for a WhatsApp bot?
            </p>
            <p className="mt-2 rounded-lg bg-cyan/10 px-3 py-2 text-xs leading-relaxed text-ink">
              Sure — it starts at $150, trained on your own FAQs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
