"use client";

import ChatWidget, { type ChatBotReply } from "@/components/ChatWidget";
import { getFaqResponse } from "@/lib/chatbot/faq-bot";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function FaqChatBot() {
  async function handleSend(userMessage: string): Promise<ChatBotReply> {
    // Tiny artificial pause so the reply doesn't feel like a flat text lookup.
    await delay(350);
    return getFaqResponse(userMessage);
  }

  return (
    <ChatWidget
      mode="faq"
      botName="Store Bot"
      greeting="Hi! I'm Store Bot, here 24/7 for quick questions about pricing, services, and timelines. For anything else, I'll get you to a real person."
      leadSource="faq_chatbot"
      onSend={handleSend}
    />
  );
}
