import { ArrowRight, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
      />
      <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Ready to get this built?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Tell us what you need — a chatbot, a new MVP, a shop system, or a
          rescue job — and get a fixed quote back.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Start a project
            <ArrowRight size={16} />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
          >
            <Mail size={16} />
            Or email us directly
          </a>
        </div>
      </div>
    </section>
  );
}
