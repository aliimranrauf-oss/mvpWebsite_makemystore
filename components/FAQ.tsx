import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Do I need any coding knowledge?",
    a: "No. You describe what you need, and everything technical — code, hosting, deployment — is handled for you. You'll still end up owning real, readable code.",
  },
  {
    q: "What if my project is already broken or half-built?",
    a: "That's exactly what Project Rescue is for. Send the current state of it and you'll get an honest read on what it'll take to fix or finish, with a fixed quote before anything starts.",
  },
  {
    q: "Who owns the code and accounts afterward?",
    a: "You do, completely. The GitHub repository, Vercel deployment, and Supabase project are all set up under your accounts from the start.",
  },
  {
    q: "Can I add more features later?",
    a: "Yes. Every project is built with clean, standard Next.js so new features can be added later without rebuilding what already exists.",
  },
  {
    q: "How is a chatbot without AI different from one with AI?",
    a: "A Basic bot answers from a fixed script you provide — good for simple, repeated questions. An AI-powered bot understands open-ended questions and answers from your actual business data.",
  },
  {
    q: "How fast is delivery?",
    a: "Most SaaS MVPs ship in 48–72 hours. Chatbots and quick fixes are often faster. Full rebuilds depend on the size of the existing project.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                <span className="font-medium">{f.q}</span>
                <Plus
                  size={18}
                  className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
