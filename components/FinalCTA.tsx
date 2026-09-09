import { ArrowRight, Mail } from "lucide-react";

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
          Tell us what you need — a chatbot, a new MVP, or a rescue job — and
          get a fixed quote back.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:info@makemystore.online"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-mint px-6 py-3.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
          >
            <Mail size={16} />
            info@makemystore.online
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            Compare services
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
