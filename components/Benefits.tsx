import { Code2, Github, Unlock, Timer, MessagesSquare, LayoutGrid } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Real production code",
    desc: "No drag-and-drop templates. Every project is written, readable code you can hand to any developer.",
  },
  {
    icon: Github,
    title: "Full source on your GitHub",
    desc: "The complete codebase is pushed to a repository you own from day one.",
  },
  {
    icon: Unlock,
    title: "No lock-in, ever",
    desc: "Your GitHub, your Vercel, your Supabase. Nothing is tied to my accounts.",
  },
  {
    icon: Timer,
    title: "Fast turnaround",
    desc: "Most MVPs ship in 48–72 hours. Chatbots and fixes are usually quicker.",
  },
  {
    icon: MessagesSquare,
    title: "Direct communication",
    desc: "You talk to the person building it — no account managers, no handoffs.",
  },
  {
    icon: LayoutGrid,
    title: "Built to grow",
    desc: "Clean, scalable structure so new features don't mean starting over.",
  },
];

export default function Benefits() {
  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          What you get, every time
        </h2>
        <p className="mt-4 text-muted">
          Regardless of which service you pick, these hold true.
        </p>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-mint">
                <Icon size={17} />
              </span>
              <div>
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
