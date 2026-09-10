"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";

export type ChatBotReply = {
  text: string;
  /** When true, the widget shows "Get a quote" / "Not now" buttons after this reply. */
  suggestQuote?: boolean;
};

export type ChatHistoryMessage = { role: "user" | "assistant"; content: string };

type UIMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
};

type LeadStatus = "idle" | "submitting" | "success" | "error";

export type ChatWidgetProps = {
  /** Controls the small subtitle under the bot name — purely cosmetic labeling. */
  mode: "faq" | "ai";
  botName: string;
  greeting: string;
  /** Tags leads created from this widget so they're distinguishable in Supabase. */
  leadSource: "faq_chatbot" | "ai_chatbot";
  placeholder?: string;
  onSend: (
    userMessage: string,
    history: ChatHistoryMessage[]
  ) => Promise<ChatBotReply> | ChatBotReply;
};

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `msg-${idCounter}-${Date.now()}`;
}

export default function ChatWidget({
  mode,
  botName,
  greeting,
  leadSource,
  placeholder = "Type a message...",
  onSend,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [promptMessageId, setPromptMessageId] = useState<string | null>(null);

  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState<LeadStatus>("idle");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadError, setLeadError] = useState("");

  const listRef = useRef<HTMLDivElement>(null);

  // Show the greeting the first time the panel is opened.
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: nextId(), role: "bot", text: greeting }]);
    }
  }, [isOpen, messages.length, greeting]);

  // Keep the panel scrolled to the latest message.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, leadFormOpen, isSending]);

  function historyFor(list: UIMessage[]): ChatHistoryMessage[] {
    return list.map((m) => ({
      role: m.role === "bot" ? "assistant" : "user",
      content: m.text,
    }));
  }

  async function handleSend(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const historySoFar = historyFor(messages);
    const userMsg: UIMessage = { id: nextId(), role: "user", text };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPromptMessageId(null);
    setLeadFormOpen(false);
    setIsSending(true);

    try {
      const reply = await onSend(text, historySoFar);
      const botMsg: UIMessage = { id: nextId(), role: "bot", text: reply.text };
      setMessages((prev) => [...prev, botMsg]);
      setPromptMessageId(reply.suggestQuote ? botMsg.id : null);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "bot",
          text: "Something went wrong — try again, or use the contact form.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function openLeadForm() {
    setLeadFormOpen(true);
    setLeadError("");
    setLeadStatus("idle");
    if (!leadMessage) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (lastUser) setLeadMessage(lastUser.text);
    }
  }

  function dismissPrompt() {
    setPromptMessageId(null);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "bot", text: "No problem — ask away anytime." },
    ]);
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();

    if (!leadName.trim() || !leadEmail.trim() || !leadMessage.trim()) {
      setLeadError("Please fill in all three fields.");
      return;
    }

    setLeadStatus("submitting");
    setLeadError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          service: "other",
          message: leadMessage.trim(),
          source: leadSource,
        }),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !data.success) {
        setLeadStatus("error");
        setLeadError(data.error || "Something went wrong — please try again.");
        return;
      }

      setLeadStatus("success");
      setLeadFormOpen(false);
      setPromptMessageId(null);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "bot",
          text: "Thanks — that's been sent, you'll hear back within 24 hours.",
        },
      ]);
      setLeadName("");
      setLeadEmail("");
      setLeadMessage("");
    } catch {
      setLeadStatus("error");
      setLeadError("Network error — please try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white shadow-lg transition-transform hover:scale-[1.03] sm:bottom-6 sm:right-6"
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400"
          />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex h-[80vh] w-full flex-col rounded-t-2xl border border-border bg-surface shadow-2xl sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[500px] sm:w-[360px] sm:rounded-xl2">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-surface2 px-4 py-3 sm:rounded-t-xl2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint/10 text-mint">
                <Bot size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">{botName}</p>
                <p className="text-xs text-muted">
                  {mode === "ai" ? "AI-powered" : "Instant, scripted answers"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] whitespace-pre-line rounded-xl2 px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-mint text-white" : "bg-surface2 text-ink"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-xl2 bg-surface2 px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                </div>
              </div>
            )}

            {promptMessageId && !leadFormOpen && (
              <div className="flex justify-start gap-2">
                <button
                  type="button"
                  onClick={openLeadForm}
                  className="rounded-full bg-mint px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  Get a quote
                </button>
                <button
                  type="button"
                  onClick={dismissPrompt}
                  className="rounded-full border border-border px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:border-mint/60"
                >
                  Not now
                </button>
              </div>
            )}

            {leadFormOpen && (
              <form
                onSubmit={submitLead}
                className="space-y-2 rounded-xl2 border border-border bg-surface2 p-3"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-mint"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-mint"
                />
                <textarea
                  placeholder="What do you need?"
                  rows={2}
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-mint"
                />
                {leadError && <p className="text-xs text-red-600">{leadError}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={leadStatus === "submitting"}
                    className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {leadStatus === "submitting" && <Loader2 size={12} className="animate-spin" />}
                    {leadStatus === "submitting" ? "Sending..." : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeadFormOpen(false)}
                    className="rounded-full border border-border px-3.5 py-2 text-xs font-medium text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              maxLength={1000}
              className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-mint"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-white transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
