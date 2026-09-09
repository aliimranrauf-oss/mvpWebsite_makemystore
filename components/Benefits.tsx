import { Code2, Github, Unlock, Timer, MessagesSquare, LayoutGrid } from "lucide-react";
import { benefits } from "@/lib/data";

const icons = [Code2, Github, Unlock, Timer, MessagesSquare, LayoutGrid];
const items = benefits.map((b, i) => ({ ...b, icon: icons[i] }));

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
