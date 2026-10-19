"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, RotateCcw, ArrowRight, MessageCircle, LayoutDashboard, UtensilsCrossed, Stethoscope, Scissors, Home } from "lucide-react";
import { DEMO_NICHES, LANGUAGES, MAX_CUSTOM, MAX_FAQS, TONES, cleanText, initialState, type DemoNicheId, type DemoState } from "@/lib/demo-bots";
import DemoDashboard, { type DashboardActions } from "@/components/DemoDashboard";
import DemoToolbar, { type DemoPanelId } from "@/components/demo/DemoToolbar";
import InboxPanel from "@/components/demo/InboxPanel";
import LeadsPanel from "@/components/demo/LeadsPanel";
import ManagePanel, { type BotSettingsActions } from "@/components/demo/ManagePanel";
import {
  findPhone,
  initialExtras,
  todayISO,
  wantsHuman,
  type ConvStatus,
  type DemoExtras,
  type Lead,
  type LiveMsg as Msg,
} from "@/lib/demo-extras";

const mk = (role: Msg["role"], content: string, by?: Msg["by"]): Msg => ({ role, content, at: Date.now(), by });

// Per demo conversation. Generous so prospects can really explore the dashboard + chat.
const MAX_USER_MESSAGES = 40;

const NICHE_ICONS = {
  restaurant: UtensilsCrossed,
  clinic: Stethoscope,
  salon: Scissors,
  realestate: Home,
} as const;

const newId = () => Math.random().toString(36).slice(2, 8);

function freshStates(): Record<DemoNicheId, DemoState> {
  return Object.fromEntries(DEMO_NICHES.map((n) => [n.id, initialState(n)])) as Record<DemoNicheId, DemoState>;
}

function freshExtras(): Record<DemoNicheId, DemoExtras> {
  return Object.fromEntries(DEMO_NICHES.map((n) => [n.id, initialExtras(n.id)])) as Record<DemoNicheId, DemoExtras>;
}

export default function DemoChat() {
  const [nicheId, setNicheId] = useState<DemoNicheId>("restaurant");
  const niche = DEMO_NICHES.find((n) => n.id === nicheId)!;

  const [states, setStates] = useState<Record<DemoNicheId, DemoState>>(freshStates);
  const state = states[nicheId];

  const [extras, setExtras] = useState<Record<DemoNicheId, DemoExtras>>(freshExtras);
  const ex = extras[nicheId];

  const [messages, setMessages] = useState<Msg[]>(() => [mk("assistant", niche.greeting, "ai")]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"chat" | "dashboard">("chat");
  const [changed, setChanged] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inbox / Leads / Manage panels (all demo-only, in-browser state)
  const [panel, setPanel] = useState<DemoPanelId | null>(null);
  const [humanMode, setHumanMode] = useState(false); // true = a person has taken over from the AI
  const [handoff, setHandoff] = useState(false); // the visitor asked for a person
  const [unread, setUnread] = useState(0); // visitor messages that arrived while a person is in charge
  const sessionRef = useRef(newId()); // changes on every restart so late AI replies are ignored

  const userCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, tab]);

  function note(text: string) {
    setMessages((m) => [...m, mk("system", text)]);
    setChanged(true);
  }

  function patchExtras(id: DemoNicheId, fn: (e: DemoExtras) => DemoExtras) {
    setExtras((all) => ({ ...all, [id]: fn(all[id]) }));
  }

  // One lead per chat session: created from the first phone number, enriched when the bot reports name + need.
  function upsertChatLead(id: DemoNicheId, info: { name?: string; phone?: string; need?: string }) {
    const leadId = `chat-${sessionRef.current}`;
    patchExtras(id, (e) => {
      const found = e.leads.find((l) => l.id === leadId);
      if (found) {
        return {
          ...e,
          leads: e.leads.map((l) =>
            l.id === leadId
              ? { ...l, name: info.name || l.name, phone: info.phone || l.phone, need: info.need || l.need }
              : l
          ),
        };
      }
      const lead: Lead = {
        id: leadId,
        name: info.name || "Chat visitor",
        phone: info.phone || "",
        need: info.need || "Enquiry from the demo chat",
        status: "new",
        priority: "medium",
        notes: "",
        followUp: todayISO(),
        fromChat: true,
      };
      return { ...e, leads: [lead, ...e.leads] };
    });
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

  const settings: BotSettingsActions = {
    setTone(t) {
      patchState((s) => ({ ...s, tone: t }));
      note(`Tone set to ${TONES.find((x) => x.id === t)?.label.toLowerCase()}`);
    },
    setLanguage(l) {
      patchState((s) => ({ ...s, language: l }));
      note(l === "auto" ? "Bot now matches the customer's language" : `Bot now always replies in ${l}`);
    },
    setAfterHours(on) {
      patchState((s) => ({ ...s, afterHours: on }));
      note(on ? "After-hours mode on: the bot says you are closed" : "After-hours mode off");
    },
    setWelcome(text) {
      const t = cleanText(text, 160);
      if (!t) return;
      patchState((s) => ({ ...s, welcome: t }));
      setMessages((m) => (m[0]?.role === "assistant" ? [{ ...m[0], content: t }, ...m.slice(1)] : m));
      note("Welcome message updated");
    },
    addFaq(q, a) {
      const cq = cleanText(q, 100);
      const ca = cleanText(a, 250);
      if (!cq || !ca) return;
      patchState((s) => ({ ...s, faqs: [...s.faqs, { id: newId(), q: cq, a: ca }].slice(0, MAX_FAQS) }));
      note(`Bot taught a new answer: ${cq}`);
    },
    removeFaq(id) {
      const f = state.faqs.find((x) => x.id === id);
      patchState((s) => ({ ...s, faqs: s.faqs.filter((x) => x.id !== id) }));
      if (f) note(`Answer removed: ${f.q}`);
    },
  };

  const closePanel = useCallback(() => setPanel(null), []);

  function openPanel(id: DemoPanelId) {
    setPanel((cur) => (cur === id ? null : id));
    if (id === "inbox") setUnread(0);
  }

  function takeover(on: boolean) {
    setHumanMode(on);
    if (on) setHandoff(false);
    else setUnread(0);
    note(on ? "You took over. AI replies are paused" : "AI replies resumed");
  }

  function ownerReply(text: string) {
    const t = text.trim().slice(0, 500);
    if (!t) return;
    setMessages((m) => [...m, mk("assistant", t, "owner")]);
    setUnread(0);
    patchExtras(nicheId, (e) => ({ ...e, liveStatus: "waiting" }));
  }

  function resetConversation(id: DemoNicheId, greeting: string) {
    sessionRef.current = newId();
    setNicheId(id);
    setMessages([mk("assistant", greeting, "ai")]);
    setInput("");
    setChanged(false);
    setPanel(null);
    setHumanMode(false);
    setHandoff(false);
    setUnread(0);
    setLoading(false);
  }

  function reset(id: DemoNicheId) {
    const next = DEMO_NICHES.find((n) => n.id === id)!;
    setStates((all) => ({ ...all, [id]: initialState(next) }));
    setExtras((all) => ({ ...all, [id]: initialExtras(id) }));
    resetConversation(id, next.greeting);
  }

  function switchNiche(id: DemoNicheId) {
    resetConversation(id, states[id].welcome);
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading || limitReached) return;

    const next: Msg[] = [...messages, mk("user", content)];
    const nid = nicheId;
    const sid = sessionRef.current;
    setMessages(next);
    setInput("");
    setTab("chat");

    // Lead capture: a phone number in the visitor's text starts a lead (the bot adds name and need below).
    const phone = findPhone(content);
    if (phone) upsertChatLead(nid, { phone: cleanText(phone, 24) });

    // The visitor asked for a person: flag it in the Inbox.
    if (!humanMode && wantsHuman(content)) setHandoff(true);

    // A person has taken over: no AI call. The message waits in the Inbox for a manual reply.
    if (humanMode) {
      setUnread((u) => u + 1);
      patchExtras(nid, (e) => ({ ...e, liveStatus: "open" as ConvStatus }));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: nicheId,
          state,
          // dashboard notes are display-only; the live state above is what the bot reads
          messages: next.filter((m) => m.role !== "system").map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (sessionRef.current !== sid) return; // the demo was restarted while the bot was thinking
      setMessages((m) => [...m, mk("assistant", data.reply || "Something went wrong. Please try again.", "ai")]);
      const l = data.lead;
      if (l && typeof l.phone === "string") {
        upsertChatLead(nid, {
          name: cleanText(l.name, 40),
          phone: cleanText(l.phone, 24),
          need: cleanText(l.need, 100),
        });
      }
    } catch {
      if (sessionRef.current !== sid) return;
      setMessages((m) => [...m, mk("assistant", "Connection problem. Please try again.", "ai")]);
    } finally {
      if (sessionRef.current === sid) setLoading(false);
    }
  }

  const lastChat = [...messages].reverse().find((m) => m.role !== "system");
  const chatLeads = ex.leads.filter((l) => l.fromChat).length;

  const inboxBadge = panel === "inbox" ? undefined : handoff && !humanMode ? "!" : unread > 0 ? String(Math.min(unread, 9)) : undefined;

  const overlay =
    panel === "inbox" ? (
      <InboxPanel
        niche={niche}
        extras={ex}
        messages={messages}
        humanMode={humanMode}
        handoff={handoff}
        onClose={closePanel}
        onTakeover={takeover}
        onOwnerReply={ownerReply}
        onSeeChat={() => setTab("chat")}
        onLiveStatus={(st) => patchExtras(nicheId, (e) => ({ ...e, liveStatus: st }))}
        onLiveAssignee={(name) => patchExtras(nicheId, (e) => ({ ...e, liveAssignee: name }))}
        onSampleStatus={(id, st) =>
          patchExtras(nicheId, (e) => ({ ...e, conversations: e.conversations.map((c) => (c.id === id ? { ...c, status: st } : c)) }))
        }
        onSampleAssignee={(id, name) =>
          patchExtras(nicheId, (e) => ({ ...e, conversations: e.conversations.map((c) => (c.id === id ? { ...c, assignee: name } : c)) }))
        }
      />
    ) : panel === "leads" ? (
      <LeadsPanel
        businessName={niche.businessName}
        leads={ex.leads}
        onClose={closePanel}
        onPatch={(id, patch) =>
          patchExtras(nicheId, (e) => ({ ...e, leads: e.leads.map((l) => (l.id === id ? { ...l, ...patch } : l)) }))
        }
      />
    ) : panel === "manage" ? (
      <ManagePanel
        niche={niche}
        state={state}
        bookings={ex.bookings}
        onBookings={(b) => patchExtras(nicheId, (e) => ({ ...e, bookings: b }))}
        settings={settings}
        stats={{
          visitorMsgs: userCount,
          aiReplies: messages.filter((m, i) => i > 0 && m.role === "assistant" && m.by !== "owner").length,
          teamReplies: messages.filter((m) => m.by === "owner").length,
          chatLeads,
        }}
        onClose={closePanel}
        onSeeChat={() => setTab("chat")}
      />
    ) : null;

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
            <p className="text-xs text-white/80">
              {humanMode ? "A team member is replying" : "Online · replies in any language"}
            </p>
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
              <div className="flex max-w-[85%] flex-col items-start">
                {m.by === "owner" && <span className="mb-0.5 px-1 text-[11px] font-medium text-[#6D28D9]">Team member</span>}
                <p
                  dir="auto"
                  className={`whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-2xl rounded-br-md bg-[#2563EB] text-white"
                      : m.by === "owner"
                        ? "rounded-2xl rounded-bl-md border border-[#DDD6FE] bg-[#F5F3FF] text-[#0F172A]"
                        : "rounded-2xl rounded-bl-md border border-[#D6E2F3] bg-white text-[#0F172A]"
                  }`}
                >
                  {m.content}
                </p>
              </div>
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
        {humanMode && lastChat?.role === "user" && (
          <div className="flex justify-start">
            <span className="rounded-2xl rounded-bl-md border border-[#DDD6FE] bg-[#F5F3FF] px-4 py-2.5 text-sm text-[#6D28D9]">
              A team member will reply shortly
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
      <p className="mx-auto mt-1.5 max-w-md text-center text-xs text-muted">
        Try Inbox, Leads and Manage at the top of the dashboard to see more.
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
          <DemoDashboard
            niche={niche}
            state={state}
            actions={actions}
            botPaused={humanMode}
            leadsCaptured={9 + chatLeads}
            toolbar={<DemoToolbar active={panel} onOpen={openPanel} badges={{ inbox: inboxBadge }} />}
            overlay={overlay}
          />
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
