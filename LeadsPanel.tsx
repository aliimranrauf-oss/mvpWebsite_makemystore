"use client";

import { useMemo, useState } from "react";
import { Download, MessageCircle, Phone, Search, ChevronDown, ChevronUp } from "lucide-react";
import {
  LEAD_STATUSES,
  PRIORITIES,
  digitsOnly,
  downloadText,
  leadsToCsv,
  todayISO,
  type Lead,
  type LeadStatus,
  type Priority,
} from "@/lib/demo-extras";
import { Chip, FilterPills, PanelShell, ghostBtn, inputCls, selectCls, useFlash, type ChipTone } from "@/components/demo/ui";

type Props = {
  businessName: string;
  leads: Lead[];
  onClose: () => void;
  onPatch: (id: string, patch: Partial<Lead>) => void;
};

const STATUS_TONE: Record<LeadStatus, ChipTone> = {
  new: "blue",
  contacted: "amber",
  qualified: "violet",
  converted: "green",
  lost: "rose",
};

const PRIORITY_TONE: Record<Priority, ChipTone> = { high: "rose", medium: "amber", low: "slate" };

export default function LeadsPanel({ businessName, leads, onClose, onPatch }: Props) {
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [flash, doFlash] = useFlash();
  const today = todayISO();

  // Leads from the live chat first, then the sample ones.
  const sorted = useMemo(() => [...leads].sort((a, b) => Number(b.fromChat) - Number(a.fromChat)), [leads]);
  const q = query.trim().toLowerCase();
  const visible = sorted.filter(
    (l) =>
      (filter === "all" || l.status === filter) &&
      (!q || `${l.name} ${l.phone} ${l.need}`.toLowerCase().includes(q))
  );
  const hasChatLead = leads.some((l) => l.fromChat);
  const due = (l: Lead) => !!l.followUp && l.followUp <= today && l.status !== "converted" && l.status !== "lost";
  const dueCount = leads.filter(due).length;

  function exportCsv() {
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    downloadText(`${slug || "demo"}-leads.csv`, leadsToCsv(sorted));
    doFlash("CSV downloaded");
  }

  return (
    <PanelShell title="Leads" subtitle="People who gave you their details" onClose={onClose} flash={flash}>
      <div className="space-y-3 px-3 py-3 sm:px-4">
        {!hasChatLead && (
          <div className="rounded-lg border border-[#6D5BD0]/50 bg-[#8B5CF6]/10 p-3">
            <p className="text-sm font-medium text-white">Capture a lead live</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
              In the customer chat, ask for a booking and give a name and phone number. The lead appears here by itself.
            </p>
          </div>
        )}

        {dueCount > 0 && (
          <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            {dueCount} {dueCount === 1 ? "lead needs" : "leads need"} a follow-up today or earlier.
          </p>
        )}

        <label className="flex h-11 items-center gap-2 rounded-lg border border-[#334155] bg-[#0F172A] px-3 focus-within:border-[#8B5CF6]">
          <Search size={15} className="shrink-0 text-slate-500" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone or requirement"
            aria-label="Search leads"
            className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500 sm:text-sm"
          />
        </label>

        <FilterPills
          label="Filter leads by status"
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All", count: leads.length },
            ...LEAD_STATUSES.map((s) => ({ id: s.id, label: s.label, count: leads.filter((l) => l.status === s.id).length })),
          ]}
        />

        {visible.length === 0 ? (
          <p className="rounded-lg bg-[#1E293B] p-4 text-center text-sm text-slate-400">No leads match. Clear the search or pick All.</p>
        ) : (
          <ul className="divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
            {visible.map((l) => {
              const open = openId === l.id;
              const digits = digitsOnly(l.phone);
              return (
                <li key={l.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : l.id)}
                    className="flex w-full items-start gap-2 px-3 py-3 text-left transition-colors hover:bg-[#273449]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-white">{l.name}</span>
                        {l.fromChat && <Chip tone="violet">From live chat</Chip>}
                      </span>
                      <span dir="auto" className="mt-0.5 block truncate text-xs text-slate-400">
                        {l.need || "No requirement given"}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <Chip tone={STATUS_TONE[l.status]}>{LEAD_STATUSES.find((s) => s.id === l.status)?.label}</Chip>
                        <Chip tone={PRIORITY_TONE[l.priority]}>{PRIORITIES.find((p) => p.id === l.priority)?.label} priority</Chip>
                        {due(l) && <Chip tone="amber">Follow up due</Chip>}
                      </span>
                    </span>
                    <span className="mt-1 shrink-0 text-slate-400" aria-hidden>
                      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {open && (
                    <div className="space-y-3 border-t border-[#334155] bg-[#182235] px-3 py-3">
                      <p className="text-sm text-slate-200" dir="ltr">
                        {l.phone}
                      </p>
                      <div className="flex gap-2">
                        <a
                          href={digits ? `tel:+${digits}` : undefined}
                          className={`${ghostBtn} flex-1`}
                          aria-label={`Call ${l.name}`}
                        >
                          <Phone size={15} aria-hidden /> Call
                        </a>
                        <a
                          href={digits ? `https://wa.me/${digits}` : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${ghostBtn} flex-1`}
                          aria-label={`Open WhatsApp chat with ${l.name}`}
                        >
                          <MessageCircle size={15} aria-hidden /> WhatsApp
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="min-w-0">
                          <span className="mb-1 block text-xs text-slate-400">Status</span>
                          <select
                            value={l.status}
                            onChange={(e) => {
                              onPatch(l.id, { status: e.target.value as LeadStatus });
                              doFlash("Status updated");
                            }}
                            className={`${selectCls} w-full`}
                          >
                            {LEAD_STATUSES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="min-w-0">
                          <span className="mb-1 block text-xs text-slate-400">Priority</span>
                          <select
                            value={l.priority}
                            onChange={(e) => {
                              onPatch(l.id, { priority: e.target.value as Priority });
                              doFlash("Priority updated");
                            }}
                            className={`${selectCls} w-full`}
                          >
                            {PRIORITIES.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <label className="block">
                        <span className="mb-1 block text-xs text-slate-400">Follow-up date</span>
                        <input
                          type="date"
                          value={l.followUp}
                          onChange={(e) => {
                            onPatch(l.id, { followUp: e.target.value });
                            doFlash(e.target.value ? "Reminder set" : "Reminder cleared");
                          }}
                          className={`${inputCls} [color-scheme:dark]`}
                        />
                      </label>
                      <NotesField value={l.notes} onCommit={(v) => { onPatch(l.id, { notes: v }); doFlash("Note saved"); }} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <button type="button" onClick={exportCsv} disabled={leads.length === 0} className={`${ghostBtn} w-full`}>
          <Download size={15} aria-hidden /> Export all leads to CSV
        </button>
        <p className="pb-2 text-center text-[11px] leading-relaxed text-slate-500">
          Sample numbers are fake. Leads from the live chat disappear when you refresh the page.
        </p>
      </div>
    </PanelShell>
  );
}

function NotesField({ value, onCommit }: { value: string; onCommit: (v: string) => void }) {
  const [draft, setDraft] = useState(value);
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-slate-400">Notes</span>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          const v = draft.trim().slice(0, 300);
          if (v !== value) onCommit(v);
        }}
        rows={2}
        maxLength={300}
        placeholder="e.g. Prefers calls after 6pm"
        className="w-full resize-none rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-base text-white outline-none placeholder:text-slate-500 focus:border-[#8B5CF6] sm:text-sm"
      />
    </label>
  );
}
