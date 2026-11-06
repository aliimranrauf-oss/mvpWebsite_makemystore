"use client";

import { useState } from "react";
import { CalendarCheck, MessageCircle, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/DemoDashboard";
import {
  BOOKING_STATUSES,
  NICHE_EXTRAS,
  type Booking,
  type BookingStatus,
} from "@/lib/demo-extras";
import { LANGUAGES, MAX_FAQS, TONES, type DemoLanguage, type DemoNiche, type DemoState, type DemoTone } from "@/lib/demo-bots";
import { Chip, FilterPills, PanelShell, ghostBtn, inputCls, primaryBtn, selectCls, useFlash, type ChipTone } from "@/components/demo/ui";

export type BotSettingsActions = {
  setTone: (t: DemoTone) => void;
  setLanguage: (l: DemoLanguage) => void;
  setAfterHours: (on: boolean) => void;
  setWelcome: (text: string) => void;
  addFaq: (q: string, a: string) => void;
  removeFaq: (id: string) => void;
};

type Props = {
  niche: DemoNiche;
  state: DemoState;
  bookings: Booking[];
  onBookings: (next: Booking[]) => void;
  settings: BotSettingsActions;
  stats: { visitorMsgs: number; aiReplies: number; teamReplies: number; chatLeads: number };
  onClose: () => void;
  onSeeChat: () => void;
};

type Tab = "bookings" | "bot" | "insights";

const STATUS_TONE: Record<BookingStatus, ChipTone> = { pending: "amber", confirmed: "green", cancelled: "rose" };

const newId = () => Math.random().toString(36).slice(2, 8);

export default function ManagePanel(p: Props) {
  const extras = NICHE_EXTRAS[p.niche.id];
  const [tab, setTab] = useState<Tab>("bookings");
  const [faqQ, setFaqQ] = useState("");
  const [flash, doFlash] = useFlash();

  const tabs: { id: Tab; label: string }[] = [
    { id: "bookings", label: extras.manage.bookingsTitle },
    { id: "bot", label: "Bot settings" },
    { id: "insights", label: "Insights" },
  ];

  return (
    <PanelShell title="Manage" subtitle={`${p.niche.businessName} settings`} onClose={p.onClose} flash={flash}>
      <div className="sticky top-0 z-10 border-b border-[#1E293B] bg-[#0F172A] px-3 py-2 sm:px-4">
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-[#1E293B] p-1" role="tablist" aria-label="Manage sections">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-10 truncate rounded-md px-1 text-xs font-medium transition-colors sm:text-sm ${
                tab === t.id ? "bg-[#8B5CF6] text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "bookings" && <BookingsTab {...p} flash={doFlash} />}
      {tab === "bot" && <BotTab {...p} faqQ={faqQ} setFaqQ={setFaqQ} flash={doFlash} />}
      {tab === "insights" && (
        <InsightsTab
          {...p}
          onTeach={(q) => {
            setFaqQ(q);
            setTab("bot");
          }}
        />
      )}
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------------------------
// Reservations / appointments / viewings

function BookingsTab({ niche, bookings, onBookings, flash }: Props & { flash: (m: string) => void }) {
  const m = NICHE_EXTRAS[niche.id].manage;
  const detailOptions = m.detailOptions ?? niche.items.map((i) => i.name);

  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [adding, setAdding] = useState(false);
  const [moveId, setMoveId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [detail, setDetail] = useState(detailOptions[0] ?? "");
  const [resource, setResource] = useState(m.resources[0] ?? "");
  const [slot, setSlot] = useState(m.slots[0] ?? "");

  const order = (b: Booking) => {
    const i = m.slots.indexOf(b.slot);
    return i === -1 ? 999 : i;
  };
  const sorted = [...bookings].sort((a, b) => order(a) - order(b));
  const visible = sorted.filter((b) => filter === "all" || b.status === filter);

  // The double-booking guard: one resource (table, dentist, stylist, agent) cannot hold two bookings in a slot.
  function clash(resourceName: string, slotName: string, ignoreId?: string): Booking | undefined {
    return bookings.find(
      (b) => b.id !== ignoreId && b.status !== "cancelled" && b.resource === resourceName && b.slot === slotName
    );
  }

  function setStatus(id: string, status: BookingStatus) {
    onBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
    flash(status === "confirmed" ? "Confirmation sent (sample)" : status === "cancelled" ? "Cancelled. Customer notified (sample)" : "Updated");
    setError("");
  }

  function reschedule(b: Booking, nextSlot: string) {
    if (nextSlot === b.slot) {
      setMoveId(null);
      return;
    }
    const c = clash(b.resource, nextSlot, b.id);
    if (c) {
      setError(`${b.resource} is already booked at ${nextSlot}. Pick another time.`);
      return;
    }
    onBookings(bookings.map((x) => (x.id === b.id ? { ...x, slot: nextSlot } : x)));
    setMoveId(null);
    setError("");
    flash("Rescheduled. Customer notified (sample)");
  }

  function add() {
    const n = name.trim().slice(0, 40);
    if (!n) {
      setError("Enter the customer's name.");
      return;
    }
    if (clash(resource, slot)) {
      setError(`${resource} is already booked at ${slot}. Pick another time or ${m.resourceLabel.toLowerCase()}.`);
      return;
    }
    onBookings([...bookings, { id: newId(), name: n, detail, slot, resource, status: "pending" }]);
    setName("");
    setError("");
    setAdding(false);
    flash("Added. Double bookings are blocked.");
  }

  return (
    <div className="space-y-3 px-3 py-3 sm:px-4">
      <FilterPills
        label="Filter by status"
        value={filter}
        onChange={setFilter}
        options={[
          { id: "all", label: "All", count: bookings.length },
          ...BOOKING_STATUSES.map((s) => ({ id: s.id, label: s.label, count: bookings.filter((b) => b.status === s.id).length })),
        ]}
      />

      {error && (
        <p role="alert" className="rounded-lg bg-rose-500/10 px-3 py-2 text-xs leading-relaxed text-rose-200">
          {error}
        </p>
      )}

      {visible.length === 0 ? (
        <p className="rounded-lg bg-[#1E293B] p-4 text-center text-sm text-slate-400">Nothing here. Pick All or add one below.</p>
      ) : (
        <ul className="divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
          {visible.map((b) => (
            <li key={b.id} className="space-y-2 px-3 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{b.name}</p>
                  <p className="truncate text-xs text-slate-400">{b.detail}</p>
                </div>
                <Chip tone={STATUS_TONE[b.status]}>{BOOKING_STATUSES.find((s) => s.id === b.status)?.label}</Chip>
              </div>
              <p className="text-xs text-slate-300">
                {b.slot} · {b.resource}
              </p>

              {moveId === b.id ? (
                <div className="flex items-center gap-2">
                  <select
                    aria-label={`New time for ${b.name}`}
                    defaultValue={b.slot}
                    onChange={(e) => reschedule(b, e.target.value)}
                    className={`${selectCls} flex-1`}
                  >
                    {m.slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => { setMoveId(null); setError(""); }} className="h-11 px-2 text-sm text-slate-400 hover:text-white">
                    Cancel
                  </button>
                </div>
              ) : (
                b.status !== "cancelled" && (
                  <div className="flex flex-wrap gap-2">
                    {b.status === "pending" && (
                      <button type="button" onClick={() => setStatus(b.id, "confirmed")} className="h-10 rounded-lg bg-emerald-500 px-3 text-xs font-semibold text-white">
                        Confirm
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setMoveId(b.id);
                        setError("");
                      }}
                      className="h-10 rounded-lg border border-[#334155] px-3 text-xs font-medium text-slate-200 hover:bg-[#273449]"
                    >
                      Reschedule
                    </button>
                    <button type="button" onClick={() => setStatus(b.id, "cancelled")} className="h-10 rounded-lg px-3 text-xs font-medium text-rose-300 hover:bg-rose-500/10">
                      Cancel booking
                    </button>
                  </div>
                )
              )}
            </li>
          ))}
        </ul>
      )}

      {adding ? (
        <div className="space-y-2 rounded-lg border border-[#6D5BD0] bg-[#1E293B] p-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            maxLength={40}
            autoFocus
            placeholder="Customer name"
            aria-label="Customer name"
            className={inputCls}
          />
          <div className="grid grid-cols-2 gap-2">
            <label className="min-w-0">
              <span className="mb-1 block text-xs text-slate-400">{m.detailLabel}</span>
              <select value={detail} onChange={(e) => setDetail(e.target.value)} className={`${selectCls} w-full`}>
                {detailOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="min-w-0">
              <span className="mb-1 block text-xs text-slate-400">{m.resourceLabel}</span>
              <select value={resource} onChange={(e) => setResource(e.target.value)} className={`${selectCls} w-full`}>
                {m.resources.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs text-slate-400">Time</span>
            <select value={slot} onChange={(e) => setSlot(e.target.value)} className={`${selectCls} w-full`}>
              {m.slots.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={add} className={`${primaryBtn} flex-1`}>
              <CalendarCheck size={15} aria-hidden /> {m.addLabel}
            </button>
            <button type="button" onClick={() => { setAdding(false); setError(""); }} className="h-11 px-3 text-sm text-slate-400 hover:text-white">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#6D5BD0] text-sm font-medium text-violet-300 transition-colors hover:bg-[#8B5CF6]/10"
        >
          <Plus size={16} aria-hidden /> {m.addLabel}
        </button>
      )}
      <p className="pb-2 text-center text-[11px] leading-relaxed text-slate-500">
        Sample bookings. Confirmations and reminders are only shown here, nothing is sent.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Bot settings (these really change how the demo bot answers)

function BotTab({
  niche,
  state,
  settings,
  onSeeChat,
  faqQ,
  setFaqQ,
  flash,
}: Props & { faqQ: string; setFaqQ: (v: string) => void; flash: (m: string) => void }) {
  const [welcome, setWelcome] = useState(state.welcome);
  const [faqA, setFaqA] = useState("");
  const safety = NICHE_EXTRAS[niche.id].safetyNote;
  const canAddFaq = state.faqs.length < MAX_FAQS;
  const faqReady = faqQ.trim().length > 0 && faqA.trim().length > 0;

  return (
    <div className="space-y-5 px-3 py-3 sm:px-4">
      <p className="rounded-lg bg-[#8B5CF6]/10 px-3 py-2 text-xs leading-relaxed text-slate-300">
        These change how the bot answers. Change something, then ask the bot in the customer chat.
      </p>

      <section>
        <h3 className="px-0.5 text-sm font-semibold text-white">Tone</h3>
        <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-[#1E293B] p-1">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={state.tone === t.id}
              onClick={() => {
                settings.setTone(t.id);
                flash("Tone updated");
              }}
              className={`h-10 rounded-md text-sm font-medium transition-colors ${
                state.tone === t.id ? "bg-[#8B5CF6] text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <label className="block">
          <span className="px-0.5 text-sm font-semibold text-white">Reply language</span>
          <select
            value={state.language}
            onChange={(e) => {
              settings.setLanguage(e.target.value as DemoLanguage);
              flash("Language updated");
            }}
            className={`${selectCls} mt-2 w-full`}
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section>
        <ul className="overflow-hidden rounded-lg bg-[#1E293B]">
          <li className="flex items-center gap-2 px-3 py-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Pretend it is after closing time</p>
              <p className="text-xs text-slate-400">The bot says you are closed and still takes details.</p>
            </div>
            <Switch
              on={state.afterHours}
              label="Pretend it is after closing time"
              onChange={(v) => {
                settings.setAfterHours(v);
                flash(v ? "After-hours replies on" : "After-hours replies off");
              }}
            />
          </li>
        </ul>
      </section>

      <section>
        <label htmlFor="demo-welcome" className="px-0.5 text-sm font-semibold text-white">
          Welcome message
        </label>
        <textarea
          id="demo-welcome"
          value={welcome}
          onChange={(e) => setWelcome(e.target.value)}
          rows={3}
          maxLength={160}
          dir="auto"
          className="mt-2 w-full resize-none rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-base text-white outline-none focus:border-[#8B5CF6] sm:text-sm"
        />
        <button
          type="button"
          disabled={!welcome.trim() || welcome.trim() === state.welcome}
          onClick={() => {
            settings.setWelcome(welcome.trim());
            flash("Welcome message saved");
          }}
          className={`${ghostBtn} mt-2`}
        >
          Save welcome message
        </button>
      </section>

      <section>
        <h3 className="px-0.5 text-sm font-semibold text-white">Teach the bot an answer</h3>
        <p className="mt-0.5 px-0.5 text-xs text-slate-400">Add a question customers ask and the answer you want. The bot uses it straight away.</p>

        {state.faqs.length > 0 && (
          <ul className="mt-2 divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
            {state.faqs.map((f) => (
              <li key={f.id} className="flex items-start gap-2 px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <p dir="auto" className="break-words text-sm font-medium text-white">
                    {f.q}
                  </p>
                  <p dir="auto" className="mt-0.5 break-words text-xs text-slate-400">
                    {f.a}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    settings.removeFaq(f.id);
                    flash("Answer removed");
                  }}
                  aria-label={`Remove answer: ${f.q}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-[#273449] hover:text-white"
                >
                  <Trash2 size={15} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}

        {canAddFaq ? (
          <div className="mt-2 space-y-2 rounded-lg border border-[#6D5BD0] bg-[#1E293B] p-3">
            <input
              value={faqQ}
              onChange={(e) => setFaqQ(e.target.value)}
              maxLength={100}
              dir="auto"
              placeholder="Question, e.g. Do you have parking?"
              aria-label="Question"
              className={inputCls}
            />
            <textarea
              value={faqA}
              onChange={(e) => setFaqA(e.target.value)}
              rows={2}
              maxLength={250}
              dir="auto"
              placeholder="Your answer"
              aria-label="Answer"
              className="w-full resize-none rounded-lg border border-[#334155] bg-[#0F172A] px-3 py-2 text-base text-white outline-none placeholder:text-slate-500 focus:border-[#8B5CF6] sm:text-sm"
            />
            <button
              type="button"
              disabled={!faqReady}
              onClick={() => {
                settings.addFaq(faqQ.trim(), faqA.trim());
                setFaqQ("");
                setFaqA("");
                flash("Answer added. Try asking the bot.");
              }}
              className={`${primaryBtn} w-full`}
            >
              <Plus size={15} aria-hidden /> Add answer
            </button>
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-400">The demo holds {MAX_FAQS} extra answers. Remove one to add another.</p>
        )}
      </section>

      {safety && (
        <p className="rounded-lg border border-[#334155] bg-[#1E293B] px-3 py-2.5 text-xs leading-relaxed text-slate-300">{safety}</p>
      )}

      <button type="button" onClick={onSeeChat} className={`${ghostBtn} w-full lg:hidden`}>
        <MessageCircle size={15} aria-hidden /> Test it in the customer chat
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Insights + integrations

function InsightsTab({ niche, stats, onTeach }: Props & { onTeach: (q: string) => void }) {
  const x = NICHE_EXTRAS[niche.id].insights;
  const tiles = [
    { label: "Visitor messages", value: stats.visitorMsgs },
    { label: "Answered by AI", value: stats.aiReplies },
    { label: "Answered by team", value: stats.teamReplies },
    { label: "Leads from this chat", value: stats.chatLeads },
  ];
  const integrations = ["Website chat widget", "WhatsApp number", "Google Calendar", "Email alerts"];

  return (
    <div className="space-y-5 px-3 py-3 sm:px-4">
      <section>
        <h3 className="px-0.5 text-sm font-semibold text-white">This demo chat</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-lg bg-[#1E293B] px-3 py-2.5">
              <p className="font-display text-xl font-semibold text-white">{t.value}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-slate-400">{t.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-1.5 px-0.5 text-[11px] text-slate-500">Live counts from the chat you are testing.</p>
      </section>

      <section>
        <h3 className="px-0.5 text-sm font-semibold text-white">Most asked questions</h3>
        <ul className="mt-2 divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
          {x.topQuestions.map((q) => (
            <li key={q} className="px-3 py-2.5 text-sm text-slate-200">
              {q}
            </li>
          ))}
        </ul>
        <p className="mt-1.5 px-0.5 text-[11px] text-slate-500">Sample data.</p>
      </section>

      <section>
        <h3 className="px-0.5 text-sm font-semibold text-white">Questions the bot could not answer</h3>
        <ul className="mt-2 divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
          {x.unanswered.map((q) => (
            <li key={q} className="flex items-center gap-2 px-3 py-2">
              <span className="min-w-0 flex-1 text-sm text-slate-200">{q}</span>
              <button
                type="button"
                onClick={() => onTeach(q)}
                className="h-10 shrink-0 rounded-lg border border-[#6D5BD0] px-3 text-xs font-medium text-violet-300 hover:bg-[#8B5CF6]/10"
              >
                Add an answer
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-1.5 px-0.5 text-[11px] text-slate-500">Sample data. Tap Add an answer to teach the bot.</p>
      </section>

      <section>
        <h3 className="px-0.5 text-sm font-semibold text-white">Connections</h3>
        <ul className="mt-2 divide-y divide-[#334155] overflow-hidden rounded-lg bg-[#1E293B]">
          {integrations.map((i) => (
            <li key={i} className="flex items-center justify-between gap-2 px-3 py-2.5">
              <span className="text-sm text-slate-200">{i}</span>
              <Chip tone="green">Connected in your build</Chip>
            </li>
          ))}
        </ul>
        <p className="mt-1.5 px-0.5 text-[11px] leading-relaxed text-slate-500">Not live in this demo. We set these up for your real bot.</p>
      </section>
    </div>
  );
}
