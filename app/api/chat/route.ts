import { NextRequest, NextResponse } from "next/server";
import { services, chatbotTiers, mvpTiers, rescueTiers, posTiers, faqs, posFaqs, benefits, type Tier } from "@/lib/data";
import { PERSONA } from "@/lib/chatbot/persona";

export const runtime = "nodejs";

// Uses Groq's free-tier API — OpenAI-compatible format, no npm dependency
// needed. Switched from Gemini because Google's new "AQ." auth keys are
// currently broken against the standard REST API for many accounts (an
// active, unresolved bug on Google's side, not something fixable here —
// see https://ai.google.dev/gemini-api/docs/api-key and Google's own
// developer forum for other affected users).
const GROQ_MODEL = "openai/gpt-oss-120b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_OUTPUT_TOKENS = 300;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 20; // per IP, per window

const GLOBAL_RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day
const GLOBAL_RATE_LIMIT_MAX_REQUESTS = 300; // whole site, per day — adjust to taste

const RESPONSE_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const CIRCUIT_BREAKER_FAILURE_THRESHOLD = 3; // consecutive Groq failures
const CIRCUIT_BREAKER_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

// In-memory only, all of it: every map/counter below resets on cold start
// and isn't shared across serverless instances/regions. Fine for current
// traffic on a single Vercel deployment (same caveat as the original
// per-IP limiter) — revisit with Redis/Upstash if traffic grows enough
// that cold starts or multi-instance scaling start undercounting these.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Global (site-wide, not per-IP) daily cap — a backstop against a burst
// of requests spread across many different visitors/IPs at once, which
// the per-IP limiter above can't catch on its own.
let globalRateState = { count: 0, resetAt: Date.now() + GLOBAL_RATE_LIMIT_WINDOW_MS };

function isGloballyRateLimited(): boolean {
  const now = Date.now();
  if (now > globalRateState.resetAt) {
    globalRateState = { count: 1, resetAt: now + GLOBAL_RATE_LIMIT_WINDOW_MS };
    return false;
  }
  if (globalRateState.count >= GLOBAL_RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  globalRateState.count += 1;
  return false;
}

// Response cache for repeat questions: keyed on a normalized version of
// the latest user message, so near-identical questions from different
// visitors reuse one Groq call instead of paying for it twice within the
// TTL window. Note this intentionally ignores prior conversation history
// as part of the cache key — if that becomes a problem (e.g. the same
// question means something different mid-conversation), key on the full
// message list instead, at the cost of a much lower cache hit rate.
const responseCache = new Map<string, { reply: string; suggestQuote: boolean; expiresAt: number }>();

function normalizeForCache(message: string): string {
  return message.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function getCachedResponse(message: string) {
  const key = normalizeForCache(message);
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    responseCache.delete(key);
    return null;
  }
  return entry;
}

function setCachedResponse(message: string, reply: string, suggestQuote: boolean) {
  const key = normalizeForCache(message);
  responseCache.set(key, { reply, suggestQuote, expiresAt: Date.now() + RESPONSE_CACHE_TTL_MS });
}

// Circuit breaker: if Groq starts failing repeatedly (rate limit, outage,
// a deprecated model 404ing — all of which have happened before), stop
// hammering it on every visitor request and show a friendly message for
// a cooldown window instead. Resets to closed the moment a call succeeds.
let circuitBreakerState = { consecutiveFailures: 0, openUntil: 0 };

function isCircuitOpen(): boolean {
  return Date.now() < circuitBreakerState.openUntil;
}

function recordGroqFailure() {
  circuitBreakerState.consecutiveFailures += 1;
  if (circuitBreakerState.consecutiveFailures >= CIRCUIT_BREAKER_FAILURE_THRESHOLD) {
    circuitBreakerState.openUntil = Date.now() + CIRCUIT_BREAKER_COOLDOWN_MS;
  }
}

function recordGroqSuccess() {
  circuitBreakerState = { consecutiveFailures: 0, openUntil: 0 };
}

function formatTiers(label: string, tiers: Tier[]): string {
  const lines = tiers.map((t) => `  - ${t.name}: ${t.price} — ${t.desc}`).join("\n");
  return `${label}:\n${lines}`;
}

function buildSystemPrompt(): string {
  const servicesText = services.map((s) => `- ${s.title}: ${s.desc} (${s.price})`).join("\n");

  const pricingText = [
    formatTiers("Chatbots", chatbotTiers),
    formatTiers("SaaS MVPs", mvpTiers),
    formatTiers("POS & Shop Management", posTiers),
    formatTiers("Project Rescue", rescueTiers),
  ].join("\n");

  const faqText = [...faqs, ...posFaqs].map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  const benefitsText = benefits.map((b) => `- ${b.title}: ${b.desc}`).join("\n");

  // Generated from lib/data.ts at module load, so pricing/service changes
  // there flow into the bot's knowledge automatically — nothing to keep in sync by hand.
  return `You are the assistant for MakeMyStore.online, a company that builds AI chatbots, AI-powered SaaS MVPs, custom POS & shop management systems, and rescues stuck AI-generated projects.

Answer questions about services, pricing, and timelines using ONLY the information below. If asked something outside this scope, say you're not sure and offer to connect them with the team. Keep answers short: 2 to 4 sentences.

Always respond to the visitor's most recent message specifically — read it carefully before answering. If it asks something different from your previous reply (e.g. they move from pricing to asking about the process, timelines, or how something works), address that new question directly instead of repeating your last answer. Never pad an answer with pricing or service info the visitor didn't ask about in their latest message.

${PERSONA}

Services:
${servicesText}

Pricing:
${pricingText}

FAQs:
${faqText}

Why clients choose us:
${benefitsText}

If the user expresses interest in starting a project, hiring the team, or getting a quote, do NOT ask them to type their name and email into the chat — there's already a form for that. Just confirm you can help and let them know a quick form will appear so they can leave their details. The moment you send a reply like that, end that exact reply with the marker [[COLLECT_CONTACT]] on its own line. This marker is stripped before the user ever sees it, and it triggers the actual lead-capture form in the UI — never explain it or mention it exists.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

type IncomingMessage = { role: "user" | "assistant"; content: string };

function clean(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("GROQ_API_KEY is not set");
    return NextResponse.json(
      { reply: "The AI assistant isn't configured yet — please use the contact form instead." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { reply: "You've hit the message limit for now — please try again later or use the contact form." },
      { status: 429 }
    );
  }

  if (isGloballyRateLimited()) {
    return NextResponse.json(
      { reply: "We're getting a lot of questions right now — please try again later or use the contact form." },
      { status: 429 }
    );
  }

  if (isCircuitOpen()) {
    return NextResponse.json(
      { reply: "We're experiencing high demand right now — please try again in a few minutes, or use the contact form." },
      { status: 503 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];

  const messages: IncomingMessage[] = rawMessages
    .filter(
      (m): m is IncomingMessage =>
        !!m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .map((m) => ({ role: m.role, content: clean(m.content, MAX_MESSAGE_LENGTH) }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY_MESSAGES);

  if (messages.length === 0) {
    return NextResponse.json({ reply: "Say something and I'll do my best to help!" }, { status: 400 });
  }

  if (messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ reply: "Invalid conversation state." }, { status: 400 });
  }

  const latestUserMessage = messages[messages.length - 1].content;
  const cached = getCachedResponse(latestUserMessage);
  if (cached) {
    return NextResponse.json({ reply: cached.reply, suggestQuote: cached.suggestQuote });
  }

  // Groq's API is OpenAI-compatible: plain "system"/"user"/"assistant"
  // roles in a single messages array — no separate system_instruction field.
  const groqMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: groqMessages,
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.4,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "");
      console.error("Groq API error:", groqRes.status, errText);
      recordGroqFailure();
      return NextResponse.json(
        { reply: "Something went wrong — try again, or use the contact form." },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const rawReply: string = data?.choices?.[0]?.message?.content?.trim() ?? "";

    if (!rawReply) {
      recordGroqFailure();
      return NextResponse.json(
        { reply: "Something went wrong — try again, or use the contact form." },
        { status: 502 }
      );
    }

    recordGroqSuccess();

    const suggestQuote = rawReply.includes("[[COLLECT_CONTACT]]");
    const reply = rawReply.replace("[[COLLECT_CONTACT]]", "").trim();

    setCachedResponse(latestUserMessage, reply, suggestQuote);

    return NextResponse.json({ reply, suggestQuote });
  } catch (err) {
    console.error("Chat route error:", err);
    recordGroqFailure();
    return NextResponse.json(
      { reply: "Something went wrong — try again, or use the contact form." },
      { status: 502 }
    );
  }
}
