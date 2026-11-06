"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BellRing, Search, Send, MessageCircle } from "lucide-react";
import { Switch } from "@/components/DemoDashboard";
import { CONV_STATUSES, NICHE_EXTRAS, fmtTime, type ConvStatus, type DemoExtras, type LiveMsg } from "@/lib/demo-extras";
import type { DemoNiche } from "@/lib/demo-bots";
import { Chip, FilterPills, PanelShell, inputCls, selectCls, useFlash, ghostBtn, type ChipTone } from "@/components/demo/ui";

type Props = {
  niche: DemoNiche;
  extras: DemoExtras;
  messages: LiveMsg[];
  humanMode: boolean;
  handoff: boolean;
  onClose: () => void;
  onTakeover: (on: boolean) => void;
  onOwnerReply: (text: string) => void;
  onSeeChat: () => void;
  onLiveStatus: (s: ConvStatus) => void;
  onLiveAssignee: (name: string) => void;
  onSampleStatus: (id: string, s: ConvStatus) => void;
  onSampleAssignee: (id: string, name: string) => void;
};

const STATUS_TONE: Record<ConvStatus, ChipTone> = { open: "green", waiting: "amber", resolved: "slate" };
const LIVE = "live";

type Row = {
  id: string;
  name: string;
  time: string;
  preview: string;
  status: ConvStatus;
  assignee: string;
  live: boolean;
  haystack: string;
};

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export default function InboxPanel(p: Props) {
  const team = NICHE_EXTRAS[p.niche.id].team;
  const [filter, setFilter] = useState<"all" | ConvStatus>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [flash, doFlash] = useFlash();
  const msgBox = useRef<HTMLDivElement>(null);

  const liveMsgs = useMemo(() => p.messages.filter((m) => m.role !== "system"), [p.messages]);
  const lastLive = liveMsgs[liveMsgs.length - 1];

  const rows: Row[] = useMemo(() => {
    const live: Row = {
      id: LIVE,
      name: "Live demo chat",
      time: lastLive ? fmtTime(lastLive.at) : "Now",
      preview: lastLive ? lastLive.content : "No messages yet. Type in the customer chat.",
      status: p.extras.liveStatus,
      assignee: p.extras.liveAssignee,
      live: true,
      haystack: ["live demo chat", ...liveMsgs.map((m) => m.content)].join(" ").toLowerCase(),
    };
    const samples: Row[] = p.extras.conversations.map((c) => ({
      id: c.id,
      name: c.name,
      time: c.time,
      preview: c.messages[c.messages.length - 1]?.text ?? "",
      status: c.status,
      assignee: c.assignee,
      live: false,
      haystack: [c.name, ...c.messages.map((m) => m.text)].join(" ").toLowerCase(),
    }));
    return [live, ...samples];
  }, [p.extras, liveMsgs, lastLive]);

  const q = query.trim().toLowerCase();
  const visible = rows.filter((r) => (filter === "all" || r.status === filter) && (!q || r.haystack.includes(q)));
  const counts = (s: ConvStatus) => rows.filter((r) => r.status === s).length;

  // Keep the newest message in view inside the message box (never scrolls the page itself).
  useEffect(() => {
    const el = msgBox.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [openId, liveMsgs.length]);

  function sendReply() {
    const t = draft.trim();
    if (!t || !p.humanMode) return;
    p.onOwnerReply(t);
    setDraft("");
  }

  // ---------- conversation view ----------
  const openRow = openId ? rows.find((r) => r.id === openId) : undefined;
  if (openId && openRow) {
    const isLive = openId === LIVE;
    const sample = p.extras.conversations.find((c) => c.id === openId);
    const row = openRow;
    return (
      <PanelShell title={row.name} subtitle={isLive ? "This is the chat on the right" : "Sample conversation"} onClose={p.onClose} flash={flash}>
        <div>
          <div className="space-y-3 border-b border-[#1E293B] px-3 py-3 sm:px-4">
            <button
              type="button"
              onClick={() => setOpenId(null)}
              className="inline-flex h-9 items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white"
            >
              <ArrowLeft size={14} aria-hidden /> All chats
            </button>
            <div className="grid grid-cols-2 gap-2">
              <label className="min-w-0">
                <span className="mb-1 block text-xs text-slate-400">Status</span>
                <select
                  value={row.status}
                  onChange={(e) => {
                    const s = e.target.value as ConvStatus;
                    if (isLive) p.onLiveStatus(s);
                    else p.onSampleStatus(openId, s);
                    doFlash("Status updated");
                  }}
                  className={`${selectCls} w-full`}
                >
                  {CONV_STATUSES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="min-w-0">
                <span className="mb-1 block text-xs text-slate-400">Assigned to</span>
                <select
                  value={row.assignee}
                  onChange={(e) => {
                    if (isLive) p.onLiveAssignee(e.target.value);
                    else p.onSampleAssignee(openId, e.target.value);
                    doFlash(e.target.value ? `Assigned to ${e.target.value}` : "Unassigned");
                  }}
                  className={`${selectCls} w-full`}
                >
                  <option value="">Unassigned</option>
                  {team.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {isLive && (
              <div className="rounded-lg border border-[#6D5BD0]/50 bg-[#8B5CF6]/10">
                <div className="flex items-center gap-2 px-3 py-1.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">Take over from the AI</p>
                    <p className="text-xs text-slate-400">
                      {p.humanMode ? "AI is paused. You are replying." : "Turn on to reply yourself. Turn off to hand back."}
                    </p>
                  </div>
                  <Switch on={p.humanMode} onChange={p.onTakeover} label="Take over from the AI" />
                </div>
              </div>
            )}
          </div>

          <div ref={msgBox} className="max-h-80 space-y-3 overflow-y-auto px-3 py-3 sm:px-4" aria-live="polite">
            {isLive && liveMsgs.length === 0 && (
              <p className="rounded-lg bg-[#1E293B] p-3 text-center text-xs leading-relaxed text-slate-400">
                Nothing here yet. Send a message in the customer chat and it shows up here with the time.
              </p>
            )}
            {isLive
              ? liveMsgs.map((m, i) => {
                  const who = m.role === "user" ? "customer" : m.by === "owner" ? "owner" : "ai";
                  return <Bubble key={i} who={who} text={m.content} time={fmtTime(m.at)} />;
                })
              : (sample?.messages ?? []).map((m, i) => <Bubble key={i} who={m.from} text={m.text} time={m.time} />)}
          </div>

          {isLive ? (
            <div className="space-y-2 border-t border-[#1E293B] px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendReply()}
                  disabled={!p.humanMode}
                  maxLength={500}
                  dir="auto"
                  placeholder={p.humanMode ? "Type your reply to the customer" : "Turn on Take over to reply"}
                  aria-label="Reply to the customer"
                  className={`${inputCls} disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={sendReply}
                  disabled={!p.humanMode || !draft.trim()}
                  aria-label="Send reply"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6] text-white disabled:opacity-40"
                >
                  <Send size={16} aria-hidden />
                </button>
              </div>
              <button type="button" onClick={p.onSeeChat} className={`${ghostBtn} w-full lg:hidden`}>
                <MessageCircle size={15} aria-hidden /> See the customer chat
              </button>
            </div>
          ) : (
            <p className="border-t border-[#1E293B] px-4 py-3 text-center text-xs text-slate-400">
              Sample conversation. Status and assignment work here too.
            </p>
          )}
        </div>
      </PanelShell>
    );
  }

  // ---------- list view ----------
  return (
    <PanelShell title="Inbox" subtitle="Every customer chat in one place" onClose={p.onClose} flash={flash}>
      <div className="space-y-3 px-3 py-3 sm:px-4">
        {p.handoff && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-400/40 bg-amber-500/10 p-3">
            <BellRing size={16} className="mt-0.5 shrink-0 text-amber-300" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-amber-200">A customer asked for a person</p>
              <p className="mt-0.5 text-xs text-slate-300">The live chat needs a team member.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!p.humanMode) p.onTakeover(true);
                setOpenId(LIVE);
              }}
              className="h-10 shrink-0 rounded-lg bg-amber-400 px-3 text-xs font-semibold text-slate-900"
            >
              Take over
            </button>
          </div>
        )}

        <label className="flex h-11 items-center gap-2 rounded-lg border border-[#334155] bg-[#0F172A] px-3 focus-within:border-[#8B5CF6]">
          <Search size={15} className="shrink-0 text-slate-500" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or message"
            aria-label="Search chats"
            className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500 sm:text-sm"
          />
        </label>

        <FilterPills
          label="Filter chats by status"
          value={filter}
          onChange={setFilter}
          options={[
            { id: "all", label: "All", count: rows.length },
            { id: "open", label: "Open", count: counts("open") },
            { id: "waiting", label: "Waiting", count: counts("waiting") },
            { id: "resolved", label: "Resolved", count: counts("resolved") },
          ]}
        />

        {visible.length === 0 ? (
          <p className="rounded-lg bg-[#1E293B] p-4 text-center text-sm text-slate-400">No chats match. Clear the search or pick All.</p>
        ) : (
          <ul className="divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
            {visible.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(r.id)}
                  className="flex w-full items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-[#273449]"
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      r.live ? "bg-[#8B5CF6] text-white" : "bg-[#334155] text-slate-200"
                    }`}
                    aria-hidden
                  >
                    {r.live ? <MessageCircle size={15} /> : initials(r.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium text-white">{r.name}</span>
                      <span className="shrink-0 text-[11px] text-slate-400">{r.time}</span>
                    </span>
                    <span dir="auto" className="mt-0.5 block truncate text-xs text-slate-400">
                      {r.preview}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {r.live && <Chip tone="violet">{p.humanMode ? "Team replying" : "AI replying"}</Chip>}
                      <Chip tone={STATUS_TONE[r.status]}>{CONV_STATUSES.find((s) => s.id === r.status)?.label}</Chip>
                      <span className="text-[11px] text-slate-500">{r.assignee || "Unassigned"}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="pb-2 text-center text-[11px] leading-relaxed text-slate-500">
          The first chat is live. The others are sample conversations.
        </p>
      </div>
    </PanelShell>
  );
}

function Bubble({ who, text, time }: { who: "customer" | "ai" | "owner"; text: string; time: string }) {
  const label = who === "customer" ? "Customer" : who === "ai" ? "AI" : "Team";
  const style =
    who === "customer"
      ? "rounded-bl-md bg-[#1E293B] text-slate-100"
      : who === "ai"
        ? "rounded-br-md bg-[#3B2F7A] text-white"
        : "rounded-br-md bg-[#2563EB] text-white";
  return (
    <div className={`flex flex-col ${who === "customer" ? "items-start" : "items-end"}`}>
      <p className="mb-0.5 px-1 text-[11px] text-slate-500">
        {label} · {time}
      </p>
      <p dir="auto" className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${style}`}>
        {text}
      </p>
    </div>
  );
}
