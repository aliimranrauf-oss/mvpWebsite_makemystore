import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

// This is the shared lead-capture endpoint. Two different callers post here:
//   - components/ContactForm.tsx (the standalone /contact page)
//   - components/ChatWidget.tsx (the inline "Get a quote" form inside any
//     of the three chat widgets — FAQ, AI, or Hybrid)
// Both expect back { success: true } or { success: false, error, fieldErrors? }.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

const VALID_SOURCES = ["faq_chatbot", "ai_chatbot", "contact_page"] as const;
type LeadSource = (typeof VALID_SOURCES)[number];

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 10; // per IP, per window — leads are rarer than chat messages

// In-memory only: resets on cold start, not shared across serverless
// instances. Same caveat as the chat route's limiter — fine for current
// traffic, revisit with Redis/Upstash if it grows.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  entry.count += 1;
  return false;
}

function clean(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many submissions — please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real visitor never fills this hidden field. Bots that
  // blindly fill every input do. Pretend success so the bot doesn't learn
  // anything, but skip the actual DB insert.
  const honeypot = clean(body.company_website, MAX_FIELD_LENGTH);
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const name = clean(body.name, MAX_FIELD_LENGTH);
  const email = clean(body.email, MAX_FIELD_LENGTH);
  const phone = clean(body.phone, MAX_FIELD_LENGTH);
  const service = clean(body.service, MAX_FIELD_LENGTH) || "other";
  const budget = clean(body.budget, MAX_FIELD_LENGTH);
  const message = clean(body.message, MAX_MESSAGE_LENGTH);

  const rawSource = clean(body.source, MAX_FIELD_LENGTH);
  const source: LeadSource = (VALID_SOURCES as readonly string[]).includes(rawSource)
    ? (rawSource as LeadSource)
    : "contact_page"; // ContactForm.tsx doesn't send a source field — default it here.

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Name is required.";
  if (!email) {
    fieldErrors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!message) fieldErrors.message = "Message is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { success: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      service,
      budget: budget || null,
      message,
      source,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Something went wrong saving your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again, or email us directly." },
      { status: 500 }
    );
  }
}
