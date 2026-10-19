"use client";

import { Inbox, Settings2, Users } from "lucide-react";

export type DemoPanelId = "inbox" | "leads" | "manage";

type Props = {
  active: DemoPanelId | null;
  onOpen: (id: DemoPanelId) => void;
  // Small red/violet markers: "!" when a customer asked for a person, a number for unread messages.
  badges: Partial<Record<DemoPanelId, string>>;
};

const BUTTONS: { id: DemoPanelId; label: string; icon: typeof Inbox }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "leads", label: "Leads", icon: Users },
  { id: "manage", label: "Manage", icon: Settings2 },
];

// Three icon buttons that sit in the dashboard header. Icon only on phones, icon + label from sm up.
export default function DemoToolbar({ active, onOpen, badges }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-1" role="toolbar" aria-label="Dashboard tools">
      {BUTTONS.map(({ id, label, icon: Icon }) => {
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
            className={`relative flex h-10 w-9 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg transition-colors sm:w-12 ${
              on ? "bg-[#8B5CF6] text-white" : "bg-[#1E293B] text-slate-300 hover:bg-[#334155] hover:text-white"
            }`}
          >
            <Icon size={16} aria-hidden />
            <span className="hidden text-[10px] leading-none sm:block">{label}</span>
            {badge && (
              <span
                aria-hidden
                className={`absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none text-white ring-2 ring-[#0F172A] ${
                  badge === "!" ? "bg-amber-500" : "bg-rose-500"
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
