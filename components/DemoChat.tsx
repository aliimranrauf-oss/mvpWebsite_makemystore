"use client";

import { useEffect, useRef, useState } from "react";
import { Send, RotateCcw, ArrowRight } from "lucide-react";
import { DEMO_NICHES, type DemoNicheId } from "@/lib/demo-bots";

type Msg = { role: "user" | "assistant"; content: string };

const MAX_USER_MESSAGES = 10;

export default function DemoChat() {
  const [nicheId, setNicheId] = useState<DemoNicheId>("clinic");
  const niche = DEMO_NICHES.find((n) => n.id === nicheId)!;

  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: niche.greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function switchNiche(id: DemoNicheId) {
    const next = DEMO_NICHES.find((n) => n.id === id)!;
    setNicheId(id);
    setMessages([{ role: "assistant", content: next.greeting }]);
    setInput("");
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading || limitReached) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: nicheId, messages: next }),
      });
      const data = await res.json().catch(() => ({}));
      setMessages([
        ...next,
        { role: "assistant", content: data.reply || "Something went wrong. Please try again." },
      ]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connection problem. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose a sample business">
        {DEMO_NICHES.map((n) => (
          <button
            key={n.id}
            role="tab"
            aria-selected={n.id === nicheId}
            onClick={() => switchNiche(n.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              n.id === nicheId
                ? "border-mint bg-mint text-white"
                : "border-border bg-surface text-ink hover:border-mint/60 hover:text-mint"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl2 border border-border bg-surface shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-ink">{niche.businessName}</p>
            <p className="text-xs text-muted">Demo bot, replies in your language</p>
          </div>
          <button
            onClick={() => switchNiche(nicheId)}
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-mint"
            aria-label="Restart demo"
          >
            <RotateCcw size={14} /> Restart
          </button>
        </div>

        <div ref={scrollRef} className="h-[340px] space-y-3 overflow-y-auto bg-surface2 px-4 py-4" aria-live="polite">
          {messages.map((m, i) => (
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
          ))}
          {loading && (
            <div className="flex justify-start">
              <span className="flex gap-1 rounded-2xl border border-border bg-surface px-4 py-3" aria-label="Typing">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
              </span>
            </div>
          )}
        </div>

        {userCount === 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {niche.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                dir="auto"
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-ink transition-colors hover:border-mint/60 hover:text-mint"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {limitReached ? (
          <div className="border-t border-border px-4 py-4 text-center">
            <p className="text-sm text-muted">That's the end of the demo. Want one built for your business?</p>
            <a
              href="/contact"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-white"
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
              className="min-w-0 flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-mint"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-white transition-opacity disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        These are sample businesses. Your bot would answer from your own menu, prices and policies.
      </p>
    </div>
  );
}
