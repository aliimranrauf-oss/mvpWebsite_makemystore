"use client";

import { useEffect, useRef, useState } from "react";
import { Send, RotateCcw, ArrowRight, MessageCircle, LayoutDashboard, UtensilsCrossed, Stethoscope, Scissors } from "lucide-react";
import { DEMO_NICHES, MAX_CUSTOM, initialState, type DemoNicheId, type DemoState } from "@/lib/demo-bots";
import DemoDashboard, { type DashboardActions } from "@/components/DemoDashboard";

type Msg = { role: "user" | "assistant" | "system"; content: string };

// Per demo conversation. Generous so prospects can really explore the dashboard + chat.
const MAX_USER_MESSAGES = 40;

const NICHE_ICONS = {
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  salon: Scissors,
} as const;

const newId = () => Math.random().toString(36).slice(2, 8);

function freshStates(): Record<DemoNicheId, DemoState> {
  return Object.fromEntries(DEMO_NICHES.map((n) => [n.id, initialState(n)])) as Record<DemoNicheId, DemoState>;
}

export default function DemoChat() {
  const [nicheId, setNicheId] = useState<DemoNicheId>("restaurant");
  const niche = DEMO_NICHES.find((n) => n.id === nicheId)!;

  const [states, setStates] = useState<Record<DemoNicheId, DemoState>>(freshStates);
  const state = states[nicheId];

  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: niche.greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"chat" | "dashboard">("chat");
  const [changed, setChanged] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, tab]);

  function note(text: string) {
    setMessages((m) => [...m, { role: "system", content: text }]);
    setChanged(true);
  }

  function patchState(fn: (s: DemoState) => DemoState) {
    setStates((all) => ({ ...all, [nicheId]: fn(all[nicheId]) }));
  }

  const actions: DashboardActions = {
    setItem(id, patch) {
      const item = niche.items.find((i) => i.id === id)!;
      patchState((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], ...patch } } }));
      if (patch.available !== undefined) {
        note(`${item.name} marked ${patch.available ? niche.availableLabel.toLowerCase() : niche.unavailableLabel.toLowerCase()}`);
      } else if (patch.price !== undefined) {
        note(`${item.name} price changed to ${patch.price} ${niche.currency}`);
      }
    },
    setToggle(id, on) {
      const t = niche.toggles.find((x) => x.id === id)!;
      patchState((s) => ({ ...s, toggles: { ...s.toggles, [id]: on } }));
      note(`${t.label} turned ${on ? "on" : "off"}`);
    },
    setHours(hours) {
      patchState((s) => ({ ...s, hours }));
      note(`Opening hours updated to ${hours}`);
    },
    setNotice(notice) {
      patchState((s) => ({ ...s, notice }));
      note(notice ? `Notice added: ${notice}` : "Notice removed");
    },
    addCustomItem(name, price) {
      patchState((s) => ({
        ...s,
        customItems: [...s.customItems, { id: newId(), name, price, available: true }].slice(0, MAX_CUSTOM),
      }));
      note(`Your own item added: ${name} (${price} ${niche.currency})`);
    },
    setCustomItem(id, patch) {
      const it = state.customItems.find((x) => x.id === id);
      patchState((s) => ({ ...s, customItems: s.customItems.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
      if (!it) return;
      if (patch.available !== undefined) {
        note(`${it.name} marked ${patch.available ? niche.availableLabel.toLowerCase() : niche.unavailableLabel.toLowerCase()}`);
      } else if (patch.price !== undefined) {
        note(`${it.name} price changed to ${patch.price} ${niche.currency}`);
      }
    },
    removeCustomItem(id) {
      const it = state.customItems.find((x) => x.id === id);
      patchState((s) => ({ ...s, customItems: s.customItems.filter((x) => x.id !== id) }));
      if (it) note(`${it.name} removed`);
    },
    addCustomToggle(label) {
      patchState((s) => ({
        ...s,
        customToggles: [...s.customToggles, { id: newId(), label, on: true }].slice(0, MAX_CUSTOM),
      }));
      note(`Your own toggle added: ${label} (on)`);
    },
    setCustomToggle(id, on) {
      const t = state.customToggles.find((x) => x.id === id);
      patchState((s) => ({ ...s, customToggles: s.customToggles.map((x) => (x.id === id ? { ...x, on } : x)) }));
      if (t) note(`${t.label} turned ${on ? "on" : "off"}`);
    },
    removeCustomToggle(id) {
      const t = state.customToggles.find((x) => x.id === id);
      patchState((s) => ({ ...s, customToggles: s.customToggles.filter((x) => x.id !== id) }));
      if (t) note(`${t.label} removed`);
    },
    askBot: () => setTab("chat"),
  };

  function reset(id: DemoNicheId) {
    const next = DEMO_NICHES.find((n) => n.id === id)!;
    setStates((all) => ({ ...all, [id]: initialState(next) }));
    setNicheId(id);
    setMessages([{ role: "assistant", content: next.greeting }]);
    setInput("");
    setChanged(false);
  }

  function switchNiche(id: DemoNicheId) {
    const next = DEMO_NICHES.find((n) => n.id === id)!;
    setNicheId(id);
    setMessages([{ role: "assistant", content: next.greeting }]);
    setInput("");
    setChanged(false);
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading || limitReached) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setTab("chat");

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: nicheId,
          state,
          // dashboard notes are display-only; the live state above is what the bot reads
          messages: next.filter((m) => m.role !== "system"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      setMessages([...next, { role: "assistant", content: data.reply || "Something went wrong. Please try again." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connection problem. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  const chatPanel = (
    <div className="flex flex-col overflow-hidden rounded-[1.5rem] border border-[#CBD9EE] bg-white shadow-xl">
      {/* App-style header */}
      <div className="flex items-center justify-between bg-[#2563EB] px-4 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-display text-sm font-semibold">
            {niche.initials}
          </span>
          <div>
            <p className="text-sm font-semibold">{niche.businessName}</p>
            <p className="text-xs text-white/80">Online · replies in any language</p>
          </div>
        </div>
        <button
          onClick={() => reset(nicheId)}
          className="inline-flex h-10 items-center gap-1.5 px-2 text-xs text-white/80 transition-colors hover:text-white"
          aria-label="Restart demo"
        >
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-[380px] space-y-3 overflow-y-auto bg-[#EAF1FB] px-4 py-4 sm:h-[420px]"
        aria-live="polite"
      >
        {messages.map((m, i) =>
          m.role === "system" ? (
            <div key={i} className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#EDE9FE] px-3 py-1 text-center text-[11px] font-medium text-[#6D28D9]">
                <LayoutDashboard size={11} aria-hidden />
                Dashboard: {m.content}
              </span>
            </div>
          ) : (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <p
                dir="auto"
                className={`max-w-[85%] whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-2xl rounded-br-md bg-[#2563EB] text-white"
                    : "rounded-2xl rounded-bl-md border border-[#D6E2F3] bg-white text-[#0F172A]"
                }`}
              >
                {m.content}
              </p>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start">
            <span className="rounded-2xl rounded-bl-md border border-[#D6E2F3] bg-white px-4 py-2.5 text-sm text-slate-500">
              Typing...
            </span>
          </div>
        )}
      </div>

      {userCount === 0 && (
        <div className="flex gap-2 overflow-x-auto border-t border-[#D6E2F3] bg-white px-4 py-3">
          {niche.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              dir="auto"
              className="shrink-0 rounded-full border border-[#BFD3F2] bg-[#F3F8FF] px-3.5 py-2 text-xs font-medium text-[#1D4ED8] transition-colors hover:bg-[#E3EEFF]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {limitReached ? (
        <div className="border-t border-[#D6E2F3] bg-white px-4 py-5 text-center">
          <p className="text-sm text-muted">That's the end of the demo. Want one built for your business?</p>
          <a
            href="/contact"
            className="mt-3 inline-flex h-12 items-center gap-2 rounded-full bg-mint px-6 text-sm font-semibold text-white"
          >
            Get a free quote <ArrowRight size={16} />
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 border-t border-[#D6E2F3] bg-white px-3 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            maxLength={500}
            dir="auto"
            placeholder="Type a message in any language..."
            aria-label="Message"
            className="h-12 min-w-0 flex-1 rounded-full border border-[#BFD3F2] bg-white px-4 text-base text-[#0F172A] outline-none focus:border-[#2563EB] sm:text-sm"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white transition-opacity disabled:opacity-40"
          >
            <Send size={17} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl">
      {/* Business picker */}
      <div
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Choose a sample business"
      >
        {DEMO_NICHES.map((n) => {
          const Icon = NICHE_ICONS[n.id];
          const active = n.id === nicheId;
          return (
            <button
              key={n.id}
              role="tab"
              aria-selected={active}
              onClick={() => switchNiche(n.id)}
              className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-full border-2 px-5 text-sm font-semibold transition-colors ${
                active
                  ? "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E]"
                  : "border-[#CBD5E1] bg-white text-[#334155] hover:border-[#F59E0B]/70"
              }`}
            >
              <Icon size={16} aria-hidden />
              {n.label}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
        Switch an item off, change a price, or make your own field in the dashboard, then ask the bot about it. It updates instantly.
      </p>

      {/* Mobile: tabs. Desktop: side by side. */}
      <div className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-border bg-surface p-1 lg:hidden" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "chat"}
          onClick={() => setTab("chat")}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${
            tab === "chat" ? "bg-[#2563EB] text-white" : "text-muted"
          }`}
        >
          <MessageCircle size={16} /> Customer chat
        </button>
        <button
          role="tab"
          aria-selected={tab === "dashboard"}
          onClick={() => {
            setTab("dashboard");
            setChanged(false);
          }}
          className={`relative inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${
            tab === "dashboard" ? "bg-[#0F172A] text-white" : "text-muted"
          }`}
        >
          <LayoutDashboard size={16} /> Owner dashboard
          {changed && tab !== "dashboard" && <span className="absolute right-4 top-2.5 h-2 w-2 rounded-full bg-[#8B5CF6]" />}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2 lg:items-start">
        <div className={`min-w-0 ${tab === "dashboard" ? "block" : "hidden lg:block"}`}>
          <p className="mb-2 hidden items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-[#6D28D9] lg:flex">
            <LayoutDashboard size={14} aria-hidden /> Owner view: manage stock and prices
          </p>
          <DemoDashboard niche={niche} state={state} actions={actions} />
        </div>
        <div className={`min-w-0 ${tab === "chat" ? "block" : "hidden lg:block"}`}>
          <p className="mb-2 hidden items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-[#1D4ED8] lg:flex">
            <MessageCircle size={14} aria-hidden /> Customer view: chat on your website
          </p>
          {chatPanel}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Sample businesses. Your bot would answer from your own menu, prices and policies.
      </p>
    </div>
  );
}
