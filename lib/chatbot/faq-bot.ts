// Zero-cost, zero-API "Instant Answers" bot. Pure keyword matching against
// content that already exists in lib/data.ts, so it can never say something
// inconsistent with the rest of the site — and it never claims to be AI.

import { services, chatbotTiers, mvpTiers, rescueTiers, posTiers, faqs, posFaqs } from "@/lib/data";

export type FaqBotReply = {
  text: string;
  suggestQuote?: boolean;
  /**
   * True only when a real keyword/topic entry matched (services, pricing,
   * a specific FAQ, greeting, etc). False for both fallback branches below
   * (the lead-intent nudge and the generic "didn't catch that" message) —
   * neither is a real answer, so hybrid mode should escalate to the AI
   * endpoint in both cases rather than treat them as "handled".
   */
  matched: boolean;
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

  // POS-specific FAQs, reused verbatim from lib/data.ts (posFaqs), same
  // pattern as the generic faqs entries above. Kept to the 3 most likely
  // visitor questions rather than all 6, to avoid a noisy keyword list
  // that collides with the generic entries.
  entries.push(
    {
      keywords: ["solar", "battery shop", "only for", "specific business", "my type of shop", "my type of business"],
      response: posFaqs[0].a,
    },
    {
      keywords: ["work offline", "without internet", "no internet", "offline mode", "no connection"],
      response: posFaqs[3].a,
    },
    {
      keywords: ["ai assistant safe", "is the ai safe", "ai save automatically", "ai save on its own", "ai assistant work", "how does the ai"],
      response: posFaqs[2].a,
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
  const posSummary = posTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  const rescueSummary = rescueTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  entries.push({
    keywords: ["price", "pricing", "cost", "how much", "rates", "budget"],
    response: `Quick pricing overview:\n• Chatbots: ${chatbotSummary}\n• SaaS MVPs: ${mvpSummary}\n• POS & Shop Management: ${posSummary}\n• Project Rescue: ${rescueSummary}\n\nSee full details at /#pricing.`,
  });

  // Small talk.
  entries.push({
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    response: "Hey there! Ask me about pricing, services, or timelines — happy to help.",
  });

  // "What's the process?" is one of the most common follow-ups after
  // someone asks about a specific service, so it gets its own grounded
  // entry rather than falling through to the AI every time.
  entries.push({
    keywords: [
      "process",
      "how it works",
      "how does it work",
      "how do you work",
      "what steps",
      "what happens next",
      "how do we start",
      "how do i start",
      "getting started",
    ],
    response:
      "Here's how it works:\n\n1. You tell us what you need (right here, or via the contact form).\n2. We confirm scope and send a fixed quote — no surprises later.\n3. We build it — most chatbots and MVPs are delivered within a few days to 72 hours.\n4. You get full ownership: it's deployed on your own GitHub, Vercel, and Supabase accounts.\n5. Small tweaks after launch are free for existing customers.\n\nWant to get started? Share a few details and we'll follow up.",
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
      return { text: entry.response, suggestQuote: hasLeadIntent, matched: true };
    }
  }

  // Fallback branches below: neither is a real topic match, so both are
  // matched: false. In hybrid mode this means both escalate to the AI
  // endpoint instead of showing these canned replies. In pure "faq" mode
  // (FaqChatBot.tsx) these are still shown as-is — matched is simply
  // ignored there.
  if (hasLeadIntent) {
    return {
      text: "Sounds like you're ready to start something. Want to leave a few details and we'll follow up within 24 hours?",
      suggestQuote: true,
      matched: false,
    };
  }

  return {
    text: "I didn't quite catch that — I can answer questions about pricing, services, and timelines. For anything else, let's get you to a real person.",
    suggestQuote: true,
    matched: false,
  };
}
