// Zero-cost, zero-API "Instant Answers" bot. Pure keyword matching against
// content that already exists in lib/data.ts, so it can never say something
// inconsistent with the rest of the site — and it never claims to be AI.

import { services, chatbotTiers, mvpTiers, rescueTiers, posTiers, faqs, posFaqs } from "@/lib/data";
import { content as cvContent } from "@/lib/cv-data";

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

type Entry = {
  keywords: string[];
  /** Optional extra condition: at least one of these must ALSO appear. Lets short words
   *  like "price" or "how long" match only when the topic (e.g. a CV) is mentioned. */
  requires?: string[];
  response: string;
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [];

  // ---- CV, LinkedIn & career documents (page: /cv-writing) -------------------
  // Built from lib/cv-data.ts so prices/features stay in sync with the page.
  // These go FIRST, but each one also needs a CV-related word (or a CV-specific
  // phrase), so they never steal questions about the other services.
  const cvList = cvContent.en.packages.items.map((p) => `• ${p.name} — ${p.price}`).join("\n");
  const CV_TERMS = ["cv", "resume", "linkedin", "cover letter", "biography", "curriculum vitae"];
  const LINK = "/cv-writing#order";

  entries.push(
    {
      keywords: ["price", "pricing", "cost", "how much", "rates", "cheap", "affordable", "budget"],
      requires: CV_TERMS,
      response: `Our CV & Cover Letter package starts from £40, with the cover letter included free. LinkedIn, Complete and Biography packages are quoted individually based on seniority and scope — you always get a fixed price before any work starts.\n\nPrices are listed in GBP. Tell us your preferred currency (SAR, AED, USD…) and we'll confirm the equivalent in your quote.\n\nGet your exact price: ${LINK}`,
    },
    {
      keywords: ["how long", "delivery", "turnaround", "how fast", "timeline", "deadline", "urgent"],
      requires: CV_TERMS,
      response: `Delivery time depends on the package and how quickly you send us your details. We confirm a delivery date in your quote and we deliver on time. If it's urgent, choose "Urgent (24–48 hrs)" in the order form: ${LINK}`,
    },
    {
      keywords: ["pay", "payment", "currency", "sar", "aed", "usd", "dollar", "riyal", "dirham"],
      requires: CV_TERMS,
      response: `Prices are listed in GBP. In the order form you can pick your preferred currency (SAR, AED, QAR, KWD, USD or GBP) and we'll confirm the equivalent and the payment options in your quote. No payment is taken until you've seen and accepted the fixed quote.`,
    },
    {
      keywords: ["revision", "revisions", "edits", "update my", "changes after", "free updates", "11 months"],
      requires: [...CV_TERMS, "11 months"],
      response: `Every package comes with 11 months of free revisions. New job, new certification or new achievement? Send us the updates and we'll refresh your documents at no cost.`,
    },
    {
      keywords: ["sample", "samples", "example", "examples", "template"],
      requires: CV_TERMS,
      response: `Yes — tick "Send me CV samples for my industry" on the order form and we'll send samples relevant to your field: ${LINK}`,
    },
    {
      keywords: ["applicant tracking", "ats friendly", "ats compatible", "ats cv", "ats resume", "pass ats"],
      response: `Yes — every CV is formatted to pass applicant tracking systems (ATS) and uses the right keywords from your target role and industry, so it reaches a human recruiter.`,
    },
    {
      keywords: ["arabic cv", "cv in arabic", "arabic resume", "resume in arabic", "bilingual", "translate my cv", "arabic and english cv"],
      response: `Our CV, LinkedIn and bio packages are written in English. If you need an Arabic or bilingual version, mention it in the order form and the team will confirm whether they can do it and what it costs: ${LINK}`,
    },
    {
      keywords: ["cover letter"],
      response: `A tailored cover letter is included free with our CV packages — no extra charge. We also include a free interview follow-up email. See the packages: /cv-writing#packages`,
    },
    {
      keywords: ["linkedin", "linked in"],
      response: `We write and optimise LinkedIn profiles: an SEO-friendly headline and About section, experience and skills rewritten for recruiter search, plus tips on photo, banner and URL — with 11 months of free revisions. LinkedIn is quoted individually, or bundled in the Complete Package (CV + cover letter + LinkedIn). Get your price: ${LINK}`,
    },
    {
      keywords: ["biography", "professional bio", "personal bio", "speaker bio"],
      response: `We write professional biographies for websites, conferences, company profiles, boards and press — in first or third person, in short, medium or long versions. It's quoted individually: ${LINK}`,
    },
    {
      keywords: ["academic cv", "academic resume", "research cv", "lecturer cv", "phd cv"],
      response: `Yes, we write academic CVs covering research, publications, teaching, grants and conferences. Mention it in the order form: ${LINK}`,
    },
    {
      keywords: ["saudi", "ksa", "gulf", "gcc", "dubai", "uae", "emirates", "riyadh", "jeddah", "abu dhabi", "qatar", "doha", "kuwait", "bahrain", "oman", "vision 2030", "saudization", "nationality"],
      requires: [...CV_TERMS, "job", "jobs", "career", "hiring", "recruiter"],
      response: `Yes — our CV service is built for the Gulf job market (KSA, UAE, Qatar, Kuwait, Bahrain, Oman). We structure your CV the way GCC recruiters scan it, include Gulf details like nationality, visa status and notice period only where they help, and position your experience for sectors like construction, energy, tourism, healthcare, tech and finance. We also help expats translate overseas experience into terms Gulf employers trust. Details: /cv-writing`,
    },
    {
      keywords: ["arabic version", "in arabic", "arabic language", "arabic page", "arabic website", "arabic site", "speak arabic"],
      response: `Our CV & LinkedIn page (/cv-writing) has an Arabic version — tap the Arabic language button at the top of the page to switch (English is the default). Our CV packages themselves are written in English; for an Arabic or bilingual CV, mention it in the order form and the team will confirm.`,
    },
    {
      // General CV overview — keep LAST among the CV entries (it's the catch-all).
      keywords: CV_TERMS,
      response: `We write professional CVs, cover letters, LinkedIn profiles and bios — built for job seekers in Saudi Arabia, the UAE and the wider Gulf.\n\n${cvList}\n\nEvery CV package includes a free cover letter, a free interview follow-up email and 11 months of free revisions. Services start from £40. See details and get a fixed quote: /cv-writing`,
    }
  );

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
    response: `Here's what we offer:\n\n${servicesSummary}\n• CV, LinkedIn & Career Documents (from £40) — professional CV, cover letter, LinkedIn and bio writing for job seekers in KSA, UAE and the Gulf. See /cv-writing\n\nWant details on one? Just ask.`,
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
    if (!entry.keywords.some((k) => normalized.includes(k))) continue;
    if (entry.requires && !entry.requires.some((r) => normalized.includes(r))) continue;
    return { text: entry.response, suggestQuote: hasLeadIntent, matched: true };
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
    text: "I didn't quite catch that — I can answer questions about pricing, services, timelines and our CV & LinkedIn writing. For anything else, let's get you to a real person.",
    suggestQuote: true,
    matched: false,
  };
}
