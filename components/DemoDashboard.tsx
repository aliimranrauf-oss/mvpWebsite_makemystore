"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Clock } from "lucide-react";
import type { DemoNiche, DemoState } from "@/lib/demo-bots";

type Props = {
  niche: DemoNiche;
  state: DemoState;
  onItem: (id: string, patch: Partial<{ price: number; available: boolean }>) => void;
  onToggle: (id: string, on: boolean) => void;
  onHours: (hours: string) => void;
  onAskBot: () => void; // switches to the chat tab on mobile
};

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="flex h-11 w-14 shrink-0 items-center justify-center"
    >
      <span
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
          on ? "bg-mint" : "bg-border"
        }`}
      >
        <span
          className={`absolute left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function PriceInput({
  value,
  currency,
  label,
  onCommit,
}: {
  value: number;
  currency: string;
  label: string;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  function commit() {
    const n = Number(draft);
    if (!Number.isFinite(n) || n < 0 || n > 99999 || draft.trim() === "") {
      setDraft(String(value));
      return;
    }
    if (n !== value) onCommit(n);
    setDraft(String(n));
  }

  return (
    <label className="flex h-11 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 focus-within:border-mint">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
        inputMode="decimal"
        aria-label={label}
        className="w-12 bg-transparent text-right text-base font-medium text-ink outline-none sm:text-sm"
      />
      <span className="text-xs text-muted">{currency}</span>
    </label>
  );
}

export default function DemoDashboard({ niche, state, onItem, onToggle, onHours, onAskBot }: Props) {
  const [hoursDraft, setHoursDraft] = useState(state.hours);
  useEffect(() => setHoursDraft(state.hours), [state.hours]);

  const unavailable = niche.items.filter((i) => state.items[i.id]?.available === false).length;

  return (
    <div className="overflow-hidden rounded-xl2 border border-border bg-surface shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint font-display text-sm font-semibold text-white">
          {niche.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{niche.businessName}</p>
          <p className="text-xs text-muted">Owner dashboard</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-xs font-medium text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Bot live
        </span>
      </div>

      <div className="space-y-5 bg-surface2 px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: "Chats today", value: "128", sample: true },
            { label: "Leads captured", value: "9", sample: true },
            { label: niche.unavailableLabel, value: String(unavailable), sample: false },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface px-3 py-2.5">
              <p className="font-display text-xl font-semibold text-ink">{s.value}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <section>
          <h3 className="px-0.5 text-xs font-semibold uppercase tracking-wide text-muted">{niche.itemsTitle}</h3>
          <ul className="mt-2 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {niche.items.map((item) => {
              const st = state.items[item.id] ?? { price: item.price, available: item.available };
              return (
                <li key={item.id} className="flex items-center gap-2 px-3 py-1.5">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium ${
                        st.available ? "text-ink" : "text-muted line-through"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className={`text-xs ${st.available ? "text-mint" : "text-muted"}`}>
                      {st.available ? niche.availableLabel : niche.unavailableLabel}
                    </p>
                  </div>
                  <PriceInput
                    value={st.price}
                    currency={niche.currency}
                    label={`Price of ${item.name}`}
                    onCommit={(v) => onItem(item.id, { price: v })}
                  />
                  <Switch
                    on={st.available}
                    label={`${item.name}: ${niche.availableLabel}`}
                    onChange={(v) => onItem(item.id, { available: v })}
                  />
                </li>
              );
            })}
          </ul>
        </section>

        {/* Settings */}
        <section>
          <h3 className="px-0.5 text-xs font-semibold uppercase tracking-wide text-muted">Settings</h3>
          <ul className="mt-2 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {niche.toggles.map((t) => (
              <li key={t.id} className="flex items-center gap-2 px-3 py-1.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{t.label}</p>
                  <p className="text-xs text-muted">{t.hint}</p>
                </div>
                <Switch on={state.toggles[t.id] ?? t.on} label={t.label} onChange={(v) => onToggle(t.id, v)} />
              </li>
            ))}
            <li className="flex items-center gap-3 px-3 py-2">
              <Clock size={16} className="shrink-0 text-muted" aria-hidden />
              <label className="flex min-w-0 flex-1 flex-col">
                <span className="text-xs text-muted">Opening hours</span>
                <input
                  value={hoursDraft}
                  onChange={(e) => setHoursDraft(e.target.value)}
                  onBlur={() => {
                    const v = hoursDraft.trim().slice(0, 60);
                    if (v && v !== state.hours) onHours(v);
                    else setHoursDraft(state.hours);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
                  maxLength={60}
                  className="w-full bg-transparent py-1 text-base font-medium text-ink outline-none sm:text-sm"
                />
              </label>
            </li>
          </ul>
        </section>

        <button
          type="button"
          onClick={onAskBot}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-mint text-sm font-semibold text-white lg:hidden"
        >
          <MessageCircle size={16} />
          Ask the bot about your changes
        </button>

        <p className="text-center text-[11px] leading-relaxed text-muted">
          Sample dashboard with sample numbers. Yours is private, with your own login.
        </p>
      </div>
    </div>
  );
}
