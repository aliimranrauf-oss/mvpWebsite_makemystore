"use client";

import ChatWidget, { type ChatBotReply, type ChatHistoryMessage } from "@/components/ChatWidget";

export default function AiChatBot() {
  async function handleSend(
    userMessage: string,
    history: ChatHistoryMessage[]
  ): Promise<ChatBotReply> {
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
      mode="ai"
      botName="Store Bot"
      greeting="Hi! I'm Store Bot, here 24/7 — ask me about services, pricing, or timelines."
      leadSource="ai_chatbot"
      onSend={handleSend}
    />
  );
}
