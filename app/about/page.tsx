import type { Metadata } from "next";
import { ArrowRight, Github, ShieldCheck, Zap, Code2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { techStack, benefits } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — MakeMyStore",
  description:
    "Why MakeMyStore exists, how projects get built, and the tech stack behind every AI chatbot, SaaS MVP, and project rescue delivered.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About — MakeMyStore",
    description:
      "Why MakeMyStore exists, how projects get built, and the tech stack behind every delivery.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const values = [
  {
    icon: Code2,
    title: "Real code, not a demo",
    desc: "Every build is production-grade Next.js and Supabase — the same stack a funded startup would ship on, not a drag-and-drop prototype.",
  },
  {
    icon: ShieldCheck,
    title: "You own it, fully",
    desc: "Your GitHub, your Vercel, your Supabase project. Nothing routes through accounts you don't control, and nothing gets revoked later.",
  },
  {
    icon: Zap,
    title: "Fast, honest timelines",
    desc: "Most MVPs ship in 48–72 hours. If something will take longer, you hear that upfront — not after a deposit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About MakeMyStore"
          title="Built for founders who need something that actually works"
          description="MakeMyStore exists for one reason: too many AI-generated projects stall out half-finished. This is a focused shop for shipping real, working products — chatbots, MVPs, and rescues alike."
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight size={16} />
            </a>
            <a
              href="/#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              See the services
            </a>
          </div>
        </PageHeader>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  The story
                </h2>
                <div className="mt-6 space-y-5 text-muted">
                  <p>
                    A huge number of side projects and small-business ideas now
                    start life inside an AI app builder — and a huge number of
                    them get stuck there. Half-working features, no real
                    database, no path to actually launching.
                  </p>
                  <p>
                    MakeMyStore was started to close that gap: take what
                    exists (or start from nothing), and turn it into a real
                    Next.js and Supabase codebase that&apos;s deployed properly,
                    owned entirely by the client, and ready to keep growing.
                  </p>
                  <p>
                    The work spans three lanes — custom AI chatbots, full SaaS
                    MVPs, and rescuing projects that stalled out on another
                    platform — but the standard is the same across all three:
                    clean code, a fixed quote before anything starts, and full
                    ownership handed over on delivery.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  What matters here
                </h2>
                <div className="mt-6 space-y-6">
                  {values.map((v) => {
                    const Icon = v.icon;
                    return (
                      <div key={v.title} className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                          <Icon size={20} />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-ink">
                            {v.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">
                            {v.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                The stack behind every project
              </h2>
              <p className="mt-4 text-muted">
                No proprietary platform, no black box. Everything is built on
                widely-used, well-documented tools so any developer can pick
                it up later.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {techStack.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Why it's structured this way
                </h2>
                <p className="mt-4 text-muted">
                  Every decision — from tooling to delivery process — comes
                  back to the same handful of principles.
                </p>
              </div>
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.title}>
                    <h3 className="font-medium text-ink">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Send over the details and get a fixed quote back — no
              commitment required to ask.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Get in touch
                <ArrowRight size={16} />
              </a>
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink">
                <Github size={16} />
                Everything ships to your GitHub
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
