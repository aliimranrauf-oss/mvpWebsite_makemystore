"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

// Same look as the existing dashboard: slate surfaces, violet accent, 44px tap targets.
export const inputCls =
  "h-11 w-full rounded-lg border border-[#334155] bg-[#0F172A] px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-[#8B5CF6] sm:text-sm";

export const selectCls =
  "h-11 min-w-0 rounded-lg border border-[#334155] bg-[#0F172A] px-2 text-base text-white outline-none focus:border-[#8B5CF6] sm:text-sm [color-scheme:dark]";

export const primaryBtn =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40";

export const ghostBtn =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#334155] px-3 text-sm font-medium text-slate-200 transition-colors hover:bg-[#1E293B] disabled:opacity-40";

const CHIP_TONES = {
  green: "bg-emerald-500/15 text-emerald-300",
  amber: "bg-amber-500/15 text-amber-300",
  slate: "bg-slate-500/20 text-slate-300",
  violet: "bg-[#8B5CF6]/20 text-violet-300",
  rose: "bg-rose-500/15 text-rose-300",
  blue: "bg-sky-500/15 text-sky-300",
} as const;

export type ChipTone = keyof typeof CHIP_TONES;

export function Chip({ tone = "slate", children }: { tone?: ChipTone; children: ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${CHIP_TONES[tone]}`}>
      {children}
    </span>
  );
}

// A row of filter pills (All, Open, Waiting ...). Scrolls sideways on narrow screens.
export function FilterPills<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string; count?: number }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-0.5" role="group" aria-label={label}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
              active ? "bg-[#8B5CF6] text-white" : "bg-[#1E293B] text-slate-300 hover:bg-[#334155]"
            }`}
          >
            {o.label}
            {o.count !== undefined && <span className={active ? "text-white/80" : "text-slate-500"}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

// Small confirmation that fades out by itself ("Saved", "Confirmation sent").
export function useFlash(ms = 2200): [string, (msg: string) => void] {
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flash = useCallback(
    (m: string) => {
      setMsg(m);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(""), ms);
    },
    [ms]
  );
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return [msg, flash];
}

export function FlashPill({ message }: { message: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center px-3" aria-live="polite">
      {message && (
        <span className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">{message}</span>
      )}
    </div>
  );
}

// The slide-over that opens on top of the dashboard card. It fills the card (which already
// clips its content), so the dashboard underneath keeps its size and layout.
export function PanelShell({
  title,
  subtitle,
  onClose,
  children,
  flash,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  flash?: string;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Keep the latest onClose in a ref so the effects below run once and never steal focus on re-render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label={title}
      initial={reduce ? false : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute inset-0 z-20 flex flex-col bg-[#0F172A]"
    >
      <div className="flex items-center gap-3 border-b border-[#1E293B] px-3 py-2.5 sm:px-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          {subtitle && <p className="truncate text-xs text-slate-400">{subtitle}</p>}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E293B] text-slate-300 transition-colors hover:bg-[#334155] hover:text-white"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      <div className="relative min-h-0 flex-1 overflow-y-auto">{children}</div>
      <FlashPill message={flash ?? ""} />
    </motion.div>
  );
}
