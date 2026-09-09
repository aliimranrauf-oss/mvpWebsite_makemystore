import { NextRequest, NextResponse } from "next/server";
import { services, chatbotTiers, mvpTiers, rescueTiers, faqs, benefits, type Tier } from "@/lib/data";

export const runtime = "nodejs";

// Uses Google's Gemini API (free tier: ~1,500 requests/day on gemini-2.0-flash
// at time of writing) via plain fetch — no extra npm dependency needed.
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_OUTPUT_TOKENS = 300;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 20; // per IP, per window

// In-memory only: this resets on cold start and isn't shared across
// serverless instances. Fine for current traffic on a single Vercel
// deployment — revisit with Redis/Upstash if traffic grows.
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

function formatTiers(label: string, tiers: Tier[]): string {
  const lines = tiers.map((t) => `  - ${t.name}: ${t.price} — ${t.desc}`).join("\n");
  return `${label}:\n${lines}`;
}

function buildSystemPrompt(): string {
  const servicesText = services.map((s) => `- ${s.title}: ${s.desc} (${s.price})`).join("\n");

  const pricingText = [
    formatTiers("Chatbots", chatbotTiers),
    formatTiers("SaaS MVPs", mvpTiers),
    formatTiers("Project Rescue", rescueTiers),
  ].join("\n");

  const faqText = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  const benefitsText = benefits.map((b) => `- ${b.title}: ${b.desc}`).join("\n");

  // Generated from lib/data.ts at module load, so pricing/service changes
  // there flow into the bot's knowledge automatically — nothing to keep in sync by hand.
  return `You are the assistant for MakeMyStore.online, a company that builds AI chatbots, AI-powered SaaS MVPs, and rescues stuck AI-generated projects.

Answer questions about services, pricing, and timelines using ONLY the information below. If asked something outside this scope, say you're not sure and offer to connect them with the team. Keep answers short: 2 to 4 sentences.

Services:
${servicesText}

Pricing:
${pricingText}

FAQs:
${faqText}

Why clients choose us:
${benefitsText}

If the user expresses interest in starting a project, hiring the team, or getting a quote, ask for their name and email so the team can follow up. The moment you send a reply that asks for their name and email, end that exact reply with the marker [[COLLECT_CONTACT]] on its own line. This marker is stripped before the user ever sees it — never explain it or mention it exists.`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

type IncomingMessage = { role: "user" | "assistant"; content: string };

function clean(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
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

  // Gemini uses "user"/"model" roles rather than "user"/"assistant".
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.4,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text().catch(() => "");
      console.error("Gemini API error:", geminiRes.status, errText);
      return NextResponse.json(
        { reply: "Something went wrong — try again, or use the contact form." },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const parts: { text?: string }[] = data?.candidates?.[0]?.content?.parts ?? [];
    const rawReply = parts.map((p) => p.text ?? "").join("").trim();

    if (!rawReply) {
      return NextResponse.json(
        { reply: "Something went wrong — try again, or use the contact form." },
        { status: 502 }
      );
    }

    const suggestQuote = rawReply.includes("[[COLLECT_CONTACT]]");
    const reply = rawReply.replace("[[COLLECT_CONTACT]]", "").trim();

    return NextResponse.json({ reply, suggestQuote });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { reply: "Something went wrong — try again, or use the contact form." },
      { status: 502 }
    );
  }
}
