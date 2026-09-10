"use client";

import ChatWidget, { type ChatBotReply, type ChatHistoryMessage } from "@/components/ChatWidget";
import { getFaqResponse } from "@/lib/chatbot/faq-bot";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Messages this short/low-effort almost never need real AI reasoning
// (e.g. "ok", "hi", "??", a single emoji). Catching these before even
// touching getFaqResponse/the AI endpoint saves a wasted round trip and
// keeps the free path snappy. Real one-word questions ("pricing?") are
// still long enough to pass this and get a proper answer.
const MIN_MESSAGE_LENGTH = 4;
// Message is "just punctuation/emoji" if there's no letter or digit in it.
const HAS_WORD_CHARACTER = /[\p{L}\p{N}]/u;

function isTrivialInput(message: string): boolean {
  const trimmed = message.trim();
  if (trimmed.length < MIN_MESSAGE_LENGTH) return true;
  if (!HAS_WORD_CHARACTER.test(trimmed)) return true;
  return false;
}

export default function HybridChatBot() {
  async function handleSend(
    userMessage: string,
    history: ChatHistoryMessage[]
  ): Promise<ChatBotReply> {
    // Step 0: trivial input never reaches the FAQ matcher or the AI —
    // just a friendly nudge, no API call, no console noise either.
    if (isTrivialInput(userMessage)) {
      await delay(200);
      return {
        text: "Try asking me something like \"how much does a chatbot cost\" or \"how fast can you deliver\" — happy to help!",
      };
    }

    // Step 1: try the free FAQ matcher first.
    await delay(200);
    const faqReply = getFaqResponse(userMessage);

    if (faqReply.matched) {
      // Real topic match — answer instantly, no Groq call made.
      // (Temporary logging during testing; remove before shipping.)
      console.log("[hybrid] answered via FAQ, no API call:", userMessage);
      return { text: faqReply.text, suggestQuote: faqReply.suggestQuote };
    }

    // Step 2: FAQ matcher fell through to its fallback — escalate to the
    // AI endpoint for a real answer.
    console.log("[hybrid] escalating to AI, API call made:", userMessage);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: userMessage }],
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || typeof data.reply !== "string") {
        return { text: "Something went wrong — try again, or use the contact form." };
      }

      return { text: data.reply, suggestQuote: Boolean(data.suggestQuote) };
    } catch {
      return { text: "Something went wrong — try again, or use the contact form." };
    }
  }

  return (
    <ChatWidget
      // "ai" here only controls the cosmetic header subtitle ("AI-powered").
      // That's accurate for hybrid mode: hard questions really do hit the
      // AI, easy ones are answered from the same verified data the FAQ bot
      // uses. The header stays identical either way — no fake "thinking"
      // delays or AI-style theater are added to the free path to disguise
      // which one served a given answer.
      mode="ai"
      botName="Store Bot"
      greeting="Hi! I'm Store Bot, here 24/7 — ask me about services, pricing, or timelines."
      leadSource="ai_chatbot"
      onSend={handleSend}
    />
  );
}
