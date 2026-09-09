// Zero-cost, zero-API "Instant Answers" bot. Pure keyword matching against
// content that already exists in lib/data.ts, so it can never say something
// inconsistent with the rest of the site — and it never claims to be AI.

import { services, chatbotTiers, mvpTiers, rescueTiers, faqs } from "@/lib/data";

export type FaqBotReply = {
  text: string;
  suggestQuote?: boolean;
};

type Entry = { keywords: string[]; response: string };

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [];

  // FAQs, reused verbatim from lib/data.ts.
  entries.push(
    {
      keywords: ["coding knowledge", "need to code", "know how to code", "non-technical", "technical skills"],
      response: faqs[0].a,
    },
    {
      keywords: ["broken", "half built", "half-built", "already started", "stuck project", "existing project"],
      response: faqs[1].a,
    },
    {
      keywords: ["own the code", "who owns", "ownership", "my accounts", "own it afterward"],
      response: faqs[2].a,
    },
    {
      keywords: ["add more features", "add features later", "extend it", "scale it up", "future features"],
      response: faqs[3].a,
    },
    {
      keywords: ["without ai", "ai vs", "difference between", "basic bot vs", "scripted vs ai", "faq bot vs ai"],
      response: faqs[4].a,
    },
    {
      keywords: ["how fast", "delivery time", "turnaround", "how long", "timeline"],
      response: faqs[5].a,
    }
  );

  // Services summary, generated from the same data the Services section uses.
  const servicesSummary = services
    .map((s) => `• ${s.title} (${s.price}) — ${s.desc}`)
    .join("\n");
  entries.push({
    keywords: ["service", "services", "what do you offer", "what do you do", "what can you build"],
    response: `Here's what we offer:\n\n${servicesSummary}\n\nWant details on one? Just ask.`,
  });

  // Pricing summary, generated from the same tier data used on /#pricing.
  const chatbotSummary = chatbotTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  const mvpSummary = mvpTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  const rescueSummary = rescueTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  entries.push({
    keywords: ["price", "pricing", "cost", "how much", "rates", "budget"],
    response: `Quick pricing overview:\n• Chatbots: ${chatbotSummary}\n• SaaS MVPs: ${mvpSummary}\n• Project Rescue: ${rescueSummary}\n\nSee full details at /#pricing.`,
  });

  // Small talk.
  entries.push({
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    response: "Hey there! Ask me about pricing, services, or timelines — happy to help.",
  });

  return entries;
}

const ENTRIES = buildEntries();

const LEAD_INTENT_KEYWORDS = [
  "quote",
  "hire",
  "price for my project",
  "start a project",
  "get started",
  "work with you",
  "need a developer",
  "build me",
  "custom project",
  "talk to a human",
  "talk to someone",
];

export function getFaqResponse(userMessage: string): FaqBotReply {
  const normalized = normalize(userMessage);
  const hasLeadIntent = LEAD_INTENT_KEYWORDS.some((k) => normalized.includes(k));

  for (const entry of ENTRIES) {
    if (entry.keywords.some((k) => normalized.includes(k))) {
      return { text: entry.response, suggestQuote: hasLeadIntent };
    }
  }

  if (hasLeadIntent) {
    return {
      text: "Sounds like you're ready to start something. Want to leave a few details and we'll follow up within 24 hours?",
      suggestQuote: true,
    };
  }

  return {
    text: "I didn't quite catch that — I can answer questions about pricing, services, and timelines. For anything else, let's get you to a real person.",
    suggestQuote: true,
  };
}
