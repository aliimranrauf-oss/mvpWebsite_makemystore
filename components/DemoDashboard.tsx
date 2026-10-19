"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Clock, Megaphone, Plus, Sparkles } from "lucide-react";
import { MAX_CUSTOM, type DemoNiche, type DemoState } from "@/lib/demo-bots";

export type DashboardActions = {
  setItem: (id: string, patch: Partial<{ price: number; available: boolean }>) => void;
  setToggle: (id: string, on: boolean) => void;
  setHours: (hours: string) => void;
  setNotice: (notice: string) => void;
  addCustomItem: (name: string, price: number) => void;
  setCustomItem: (id: string, patch: Partial<{ price: number; available: boolean }>) => void;
  removeCustomItem: (id: string) => void;
  addCustomToggle: (label: string) => void;
  setCustomToggle: (id: string, on: boolean) => void;
  removeCustomToggle: (id: string) => void;
  askBot: () => void; // switches to the chat tab on mobile
};

type Props = { niche: DemoNiche; state: DemoState; actions: DashboardActions };

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="flex h-11 w-12 shrink-0 items-center justify-center"
    >
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          on ? "bg-[#8B5CF6]" : "bg-[#475569]"
        }`}
      >
        <span
          className={`absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
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
    if (!Number.isFinite(n) || n < 0 || n > 99999999 || draft.trim() === "") {
      setDraft(String(value));
      return;
    }
    if (n !== value) onCommit(n);
    setDraft(String(n));
  }

  return (
    <label className="flex h-11 shrink-0 items-center gap-1 rounded-lg border border-[#334155] bg-[#0F172A] px-2 focus-within:border-[#8B5CF6]">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
        inputMode="decimal"
        aria-label={label}
        className="w-[4.5rem] bg-transparent text-right text-base font-medium text-white outline-none sm:w-[4.75rem] sm:text-sm"
      />
      <span className="text-[11px] text-slate-400">{currency}</span>
    </label>
  );
}

function ItemRow(props: {
  name: string;
  price: number;
  available: boolean;
  currency: string;
  availableLabel: string;
  unavailableLabel: string;
  custom?: boolean;
  onPrice: (v: number) => void;
  onAvailable: (v: boolean) => void;
  onRemove?: () => void;
}) {
  const { name, price, available, currency, availableLabel, unavailableLabel, custom } = props;
  return (
    <li className="flex items-center gap-1.5 px-2.5 py-2 sm:gap-2 sm:px-3">
      <div className="min-w-0 flex-1">
        <p className={`break-words text-sm font-medium leading-snug ${available ? "text-white" : "text-slate-500 line-through"}`}>
          {name}
        </p>
        <p className="flex flex-wrap items-center gap-x-2 text-xs">
          <span className={available ? "text-emerald-400" : "text-rose-400"}>
            {available ? availableLabel : unavailableLabel}
          </span>
          {custom && (
            <>
              <span className="rounded bg-[#8B5CF6]/20 px-1.5 py-0.5 text-[10px] font-semibold text-violet-300">
                Your own
              </span>
              <button
                type="button"
                onClick={props.onRemove}
                className="py-1.5 text-slate-400 underline underline-offset-2 hover:text-white"
              >
                Remove
              </button>
            </>
          )}
        </p>
      </div>
      <PriceInput value={price} currency={currency} label={`Price of ${name}`} onCommit={props.onPrice} />
      <Switch on={available} label={`${name}: ${availableLabel}`} onChange={props.onAvailable} />
    </li>
  );
}

// "Make your own" composer: one per section, so owners see they can add any field they like.
function AddOwn({
  kind,
  currency,
  onAddItem,
  onAddToggle,
}: {
  kind: "item" | "toggle";
  currency: string;
  onAddItem?: (name: string, price: number) => void;
  onAddToggle?: (label: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const priceNum = Number(price);
  const priceOk = price.trim() !== "" && Number.isFinite(priceNum) && priceNum >= 0 && priceNum <= 99999999;
  const canAdd = name.trim().length > 0 && (kind === "toggle" || priceOk);

  function submit() {
    if (!canAdd) return;
    if (kind === "item") onAddItem?.(name.trim(), priceNum);
    else onAddToggle?.(name.trim());
    setName("");
    setPrice("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#6D5BD0] text-sm font-medium text-violet-300 transition-colors hover:bg-[#8B5CF6]/10"
      >
        <Plus size={16} aria-hidden />
        {kind === "item" ? "Make your own item" : "Make your own toggle"}
      </button>
    );
  }

  return (
    <div className="mt-2 space-y-2 rounded-lg border border-[#6D5BD0] bg-[#1E293B] p-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        maxLength={40}
        autoFocus
        placeholder={kind === "item" ? "Name, e.g. Chef's special" : "Name, e.g. Free dessert today"}
        aria-label={kind === "item" ? "Name of your own item" : "Name of your own toggle"}
        className="h-11 w-full rounded-lg border border-[#334155] bg-[#0F172A] px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-[#8B5CF6] sm:text-sm"
      />
      <div className="flex items-center gap-2">
        {kind === "item" && (
          <label className="flex h-11 w-28 items-center gap-1.5 rounded-lg border border-[#334155] bg-[#0F172A] px-3 focus-within:border-[#8B5CF6]">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              inputMode="decimal"
              placeholder="Price"
              aria-label="Price"
              className="w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-slate-500 sm:text-sm"
            />
            <span className="text-xs text-slate-400">{currency}</span>
          </label>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={!canAdd}
          className="h-11 flex-1 rounded-lg bg-[#8B5CF6] text-sm font-semibold text-white transition-opacity disabled:opacity-40"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="h-11 px-3 text-sm text-slate-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function TextRow({
  icon,
  label,
  value,
  placeholder,
  max,
  allowEmpty,
  onCommit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder?: string;
  max: number;
  allowEmpty?: boolean;
  onCommit: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <li className="flex items-center gap-3 px-3 py-2">
      <span className="shrink-0 text-slate-400" aria-hidden>
        {icon}
      </span>
      <label className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs text-slate-400">{label}</span>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => {
            const v = draft.trim().slice(0, max);
            if ((v || allowEmpty) && v !== value) onCommit(v);
            else setDraft(value);
          }}
          onKeyDown={(e) => e.key === "Enter" && (e.currentTarget as HTMLInputElement).blur()}
          maxLength={max}
          placeholder={placeholder}
          className="w-full bg-transparent py-1 text-base font-medium text-white outline-none placeholder:text-slate-500 sm:text-sm"
        />
      </label>
    </li>
  );
}

export default function DemoDashboard({ niche, state, actions }: Props) {
  const unavailable =
    niche.items.filter((i) => state.items[i.id]?.available === false).length +
    state.customItems.filter((c) => !c.available).length;

  return (
    <div className="overflow-hidden rounded-xl2 border border-[#1E293B] bg-[#0F172A] text-slate-100 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#1E293B] px-3 py-3.5 sm:px-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6] font-display text-sm font-semibold text-white">
          {niche.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{niche.businessName}</p>
          <p className="text-xs text-slate-400">Owner dashboard</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1E293B] px-2.5 py-1 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Bot live
        </span>
      </div>

      <div className="space-y-5 px-3 py-4 sm:px-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Chats today", value: "128" },
            { label: "Leads captured", value: "9" },
            { label: niche.unavailableLabel, value: String(unavailable) },
          ].map((s) => (
            <div key={s.label} className="min-w-0 rounded-lg bg-[#1E293B] px-2.5 py-2.5">
              <p className="font-display text-xl font-semibold text-white">{s.value}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <section>
          <h3 className="px-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{niche.itemsTitle}</h3>
          <ul className="mt-2 divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
            {niche.items.map((item) => {
              const st = state.items[item.id] ?? { price: item.price, available: item.available };
              return (
                <ItemRow
                  key={item.id}
                  name={item.name}
                  price={st.price}
                  available={st.available}
                  currency={niche.currency}
                  availableLabel={niche.availableLabel}
                  unavailableLabel={niche.unavailableLabel}
                  onPrice={(v) => actions.setItem(item.id, { price: v })}
                  onAvailable={(v) => actions.setItem(item.id, { available: v })}
                />
              );
            })}
            {state.customItems.map((c) => (
              <ItemRow
                key={c.id}
                custom
                name={c.name}
                price={c.price}
                available={c.available}
                currency={niche.currency}
                availableLabel={niche.availableLabel}
                unavailableLabel={niche.unavailableLabel}
                onPrice={(v) => actions.setCustomItem(c.id, { price: v })}
                onAvailable={(v) => actions.setCustomItem(c.id, { available: v })}
                onRemove={() => actions.removeCustomItem(c.id)}
              />
            ))}
          </ul>
          {state.customItems.length < MAX_CUSTOM && (
            <AddOwn kind="item" currency={niche.currency} onAddItem={actions.addCustomItem} />
          )}
        </section>

        {/* Settings */}
        <section>
          <h3 className="px-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">Settings</h3>
          <ul className="mt-2 divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
            {niche.toggles.map((t) => (
              <li key={t.id} className="flex items-center gap-1.5 px-2.5 py-2 sm:gap-2 sm:px-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{t.label}</p>
                  <p className="text-xs text-slate-400">{t.hint}</p>
                </div>
                <Switch
                  on={state.toggles[t.id] ?? t.on}
                  label={t.label}
                  onChange={(v) => actions.setToggle(t.id, v)}
                />
              </li>
            ))}
            {state.customToggles.map((c) => (
              <li key={c.id} className="flex items-center gap-1.5 px-2.5 py-2 sm:gap-2 sm:px-3">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-medium leading-snug text-white">{c.label}</p>
                  <p className="flex items-center gap-2 text-xs">
                    <span className="rounded bg-[#8B5CF6]/20 px-1.5 py-0.5 text-[10px] font-semibold text-violet-300">
                      Your own
                    </span>
                    <button
                      type="button"
                      onClick={() => actions.removeCustomToggle(c.id)}
                      className="py-1.5 text-slate-400 underline underline-offset-2 hover:text-white"
                    >
                      Remove
                    </button>
                  </p>
                </div>
                <Switch on={c.on} label={c.label} onChange={(v) => actions.setCustomToggle(c.id, v)} />
              </li>
            ))}
            <TextRow
              icon={<Clock size={16} />}
              label="Opening hours"
              value={state.hours}
              max={60}
              onCommit={actions.setHours}
            />
            <TextRow
              icon={<Megaphone size={16} />}
              label="Notice for customers (optional)"
              value={state.notice}
              placeholder="e.g. Closing early on Friday"
              max={100}
              allowEmpty
              onCommit={actions.setNotice}
            />
          </ul>
          {state.customToggles.length < MAX_CUSTOM && (
            <AddOwn kind="toggle" currency={niche.currency} onAddToggle={actions.addCustomToggle} />
          )}
        </section>

        <div className="flex items-start gap-3 rounded-lg border border-[#6D5BD0]/50 bg-[#8B5CF6]/10 p-3">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-violet-300" aria-hidden />
          <p className="text-xs leading-relaxed text-slate-300">
            <span className="font-semibold text-white">Any field you need.</span> Allergens, doctor on duty,
            daily offers, delivery zones: tell us what customers ask about and we build it into your dashboard.
            The bot learns it instantly.
          </p>
        </div>

        <button
          type="button"
          onClick={actions.askBot}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] text-sm font-semibold text-white lg:hidden"
        >
          <MessageCircle size={16} />
          Ask the bot about your changes
        </button>

        <p className="text-center text-[11px] leading-relaxed text-slate-400">
          Sample dashboard with sample numbers. Yours is private, with your own login.
        </p>
      </div>
    </div>
  );
}
