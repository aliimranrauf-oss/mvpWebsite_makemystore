"use client";

import { useEffect, useRef, useState } from "react";
import { Send, RotateCcw, ArrowRight, MessageCircle, LayoutDashboard } from "lucide-react";
import { DEMO_NICHES, initialState, type DemoNicheId, type DemoState } from "@/lib/demo-bots";
import DemoDashboard from "@/components/DemoDashboard";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const MAX_USER_MESSAGES = 12;

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

  function onItem(id: string, patch: Partial<{ price: number; available: boolean }>) {
    const item = niche.items.find((i) => i.id === id)!;
    patchState((s) => ({ ...s, items: { ...s.items, [id]: { ...s.items[id], ...patch } } }));
    if (patch.available !== undefined) {
      note(`${item.name} marked ${patch.available ? niche.availableLabel.toLowerCase() : niche.unavailableLabel.toLowerCase()}`);
    } else if (patch.price !== undefined) {
      note(`${item.name} price changed to ${patch.price} ${niche.currency}`);
    }
  }

  function onToggle(id: string, on: boolean) {
    const t = niche.toggles.find((x) => x.id === id)!;
    patchState((s) => ({ ...s, toggles: { ...s.toggles, [id]: on } }));
    note(`${t.label} turned ${on ? "on" : "off"}`);
  }

  function onHours(hours: string) {
    patchState((s) => ({ ...s, hours }));
    note(`Opening hours updated to ${hours}`);
  }

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
    <div className="flex flex-col overflow-hidden rounded-xl2 border border-border bg-surface shadow-lg">
      <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint/10 text-mint">
            <MessageCircle size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{niche.businessName}</p>
            <p className="text-xs text-muted">Customer chat. Replies in any language</p>
          </div>
        </div>
        <button
          onClick={() => reset(nicheId)}
          className="inline-flex h-10 items-center gap-1.5 px-2 text-xs text-muted transition-colors hover:text-mint"
          aria-label="Restart demo"
        >
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      <div
        ref={scrollRef}
        className="h-[380px] space-y-3 overflow-y-auto bg-surface2 px-4 py-4 sm:h-[420px]"
        aria-live="polite"
      >
        {messages.map((m, i) =>
          m.role === "system" ? (
            <div key={i} className="flex justify-center">
              <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-center text-[11px] font-medium text-mint">
                Dashboard: {m.content}
              </span>
            </div>
          ) : (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <p
                dir="auto"
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-mint text-white" : "border border-border bg-surface text-ink"
                }`}
              >
                {m.content}
              </p>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start">
            <span className="rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-muted">
              Typing...
            </span>
          </div>
        )}
      </div>

      {userCount === 0 && (
        <div className="flex gap-2 overflow-x-auto border-t border-border px-4 py-3">
          {niche.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              dir="auto"
              className="shrink-0 rounded-full border border-border bg-surface px-3.5 py-2 text-xs text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {limitReached ? (
        <div className="border-t border-border px-4 py-5 text-center">
          <p className="text-sm text-muted">That's the end of the demo. Want one built for your business?</p>
          <a
            href="/contact"
            className="mt-3 inline-flex h-12 items-center gap-2 rounded-full bg-mint px-6 text-sm font-semibold text-white"
          >
            Get a free quote <ArrowRight size={16} />
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 border-t border-border px-3 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            maxLength={500}
            dir="auto"
            placeholder="Type a message in any language..."
            aria-label="Message"
            className="h-12 min-w-0 flex-1 rounded-full border border-border bg-surface px-4 text-base text-ink outline-none focus:border-mint sm:text-sm"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mint text-white transition-opacity disabled:opacity-40"
          >
            <Send size={17} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      {/* Business picker */}
      <div
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Choose a sample business"
      >
        {DEMO_NICHES.map((n) => (
          <button
            key={n.id}
            role="tab"
            aria-selected={n.id === nicheId}
            onClick={() => switchNiche(n.id)}
            className={`h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors ${
              n.id === nicheId
                ? "border-mint bg-mint text-white"
                : "border-border bg-surface text-ink hover:border-mint/60 hover:text-mint"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
        Switch an item off or change a price in the dashboard, then ask the bot about it. It updates instantly.
      </p>

      {/* Mobile: tabs. Desktop: side by side. */}
      <div className="mt-5 grid grid-cols-2 gap-1 rounded-full border border-border bg-surface p-1 lg:hidden" role="tablist">
        <button
          role="tab"
          aria-selected={tab === "chat"}
          onClick={() => setTab("chat")}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${
            tab === "chat" ? "bg-mint text-white" : "text-muted"
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
            tab === "dashboard" ? "bg-mint text-white" : "text-muted"
          }`}
        >
          <LayoutDashboard size={16} /> Owner dashboard
          {changed && tab !== "dashboard" && <span className="absolute right-4 top-2.5 h-2 w-2 rounded-full bg-mint" />}
        </button>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className={tab === "dashboard" ? "block" : "hidden lg:block"}>
          <p className="mb-2 hidden px-1 text-xs font-semibold uppercase tracking-wide text-muted lg:block">
            What the owner sees
          </p>
          <DemoDashboard
            niche={niche}
            state={state}
            onItem={onItem}
            onToggle={onToggle}
            onHours={onHours}
            onAskBot={() => setTab("chat")}
          />
        </div>
        <div className={tab === "chat" ? "block" : "hidden lg:block"}>
          <p className="mb-2 hidden px-1 text-xs font-semibold uppercase tracking-wide text-muted lg:block">
            What the customer sees
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
