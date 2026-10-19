"use client";

import { Inbox, Settings2, Users } from "lucide-react";

export type DemoPanelId = "inbox" | "leads" | "manage";

type Props = {
  active: DemoPanelId | null;
  onOpen: (id: DemoPanelId) => void;
  // Small markers: "!" when a customer asked for a person, a number for unread messages.
  badges: Partial<Record<DemoPanelId, string>>;
};

// 3D buttons: a light-to-dark gradient, a glossy top edge, a thick dark "base" under the button,
// and a press-down effect. Full class names are written out so Tailwind can see them.
const BUTTONS: {
  id: DemoPanelId;
  label: string;
  icon: typeof Inbox;
  grad: string; // colour gradient
  rest: string; // resting shadow (thick base under the button)
  down: string; // pressed (selected) shadow
  press: string; // pressed shadow while the mouse is held down
}[] = [
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    grad: "bg-gradient-to-b from-[#60A5FA] to-[#2563EB]",
    rest: "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_4px_0_#1E3A8A,0_7px_9px_rgba(0,0,0,0.45)]",
    down: "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_0_#1E3A8A,0_2px_4px_rgba(0,0,0,0.45)]",
    press: "active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_0_#1E3A8A,0_2px_4px_rgba(0,0,0,0.45)]",
  },
  {
    id: "leads",
    label: "Leads",
    icon: Users,
    grad: "bg-gradient-to-b from-[#34D399] to-[#059669]",
    rest: "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_4px_0_#065F46,0_7px_9px_rgba(0,0,0,0.45)]",
    down: "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_0_#065F46,0_2px_4px_rgba(0,0,0,0.45)]",
    press: "active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_0_#065F46,0_2px_4px_rgba(0,0,0,0.45)]",
  },
  {
    id: "manage",
    label: "Manage",
    icon: Settings2,
    grad: "bg-gradient-to-b from-[#FB923C] to-[#EA580C]",
    rest: "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_4px_0_#9A3412,0_7px_9px_rgba(0,0,0,0.45)]",
    down: "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_0_#9A3412,0_2px_4px_rgba(0,0,0,0.45)]",
    press: "active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_0_#9A3412,0_2px_4px_rgba(0,0,0,0.45)]",
  },
];

// Three buttons in the dashboard header. Icon only on phones, icon + label from sm up.
export default function DemoToolbar({ active, onOpen, badges }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-2 pb-1" role="toolbar" aria-label="Dashboard tools">
      {BUTTONS.map(({ id, label, icon: Icon, grad, rest, down, press }) => {
        const on = active === id;
        const badge = badges[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onOpen(id)}
            aria-pressed={on}
            aria-label={badge ? `${label} (${badge === "!" ? "needs attention" : `${badge} new`})` : label}
            title={label}
            className={`relative flex h-10 w-9 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg text-white transition-all duration-100 sm:w-12 ${grad} ${
              on
                ? `translate-y-[3px] ring-2 ring-white/90 ring-offset-1 ring-offset-[#0F172A] ${down}`
                : `hover:-translate-y-px hover:brightness-110 active:translate-y-[3px] ${rest} ${press}`
            }`}
          >
            <Icon size={16} strokeWidth={2.25} className="drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]" aria-hidden />
            <span className="hidden text-[10px] font-semibold leading-none drop-shadow-[0_1px_0_rgba(0,0,0,0.35)] sm:block">{label}</span>
            {badge && (
              <span
                aria-hidden
                className={`absolute -right-1.5 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none ring-2 ring-[#0F172A] ${
                  badge === "!" ? "bg-amber-400 text-slate-900" : "bg-rose-500 text-white"
                }`}
              >
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
