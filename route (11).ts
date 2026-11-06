import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { buildSystemPrompt } from "@/lib/chatbot/system-prompt";
import { callGemini, DEFAULT_GEMINI_MODEL, type ChatMsg } from "@/lib/gemini";

export const runtime = "nodejs";

// WhatsApp Business bot: customer message -> Meta webhook -> THIS file -> Gemini -> reply.
// Uses the SAME prompt/knowledge as the website bot (lib/chatbot/system-prompt.ts).
//
// Env vars: GEMINI_API_KEY, WHATSAPP_VERIFY_TOKEN, WHATSAPP_ACCESS_TOKEN,
//           WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_APP_SECRET
// Optional: GEMINI_MODEL

const MODEL = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
const GRAPH = "https://graph.facebook.com/v21.0";
const MAX_HISTORY = 10;
const MAX_MESSAGE_LENGTH = 1000;
const PER_USER_PER_HOUR = 30; // stops one person from running up your bill

// WhatsApp has no lead-capture form, so we adjust the website prompt for chat.
const WHATSAPP_EXTRA = `

IMPORTANT - YOU ARE REPLYING ON WHATSAPP, NOT THE WEBSITE:
- Plain text only. No markdown, no **bold**, no headings. Short paragraphs.
- Reply in the same language and script the customer writes in (English, Arabic, Urdu, etc.).
- There is NO form here. If the customer wants a quote or to start a project, ask for their name and a short description of what they need (one question at a time), then say the team will reply on this same chat soon.
- If the customer asks for contact details or how to order, share the email and the contact form link from the prompt, and say this WhatsApp chat is our WhatsApp line.
- Never output the [[COLLECT_CONTACT]] marker.`;

const SYSTEM_PROMPT = buildSystemPrompt() + WHATSAPP_EXTRA;

// Memory per customer phone number. Resets on cold start (OK for a start; use a database later).
const history = new Map<string, ChatMsg[]>();
const usage = new Map<string, { count: number; resetAt: number }>();
const seenMessageIds = new Set<string>(); // Meta sometimes sends the same message twice

function overLimit(phone: string): boolean {
  const now = Date.now();
  const e = usage.get(phone);
  if (!e || now > e.resetAt) {
    usage.set(phone, { count: 1, resetAt: now + 3600_000 });
    return false;
  }
  if (e.count >= PER_USER_PER_HOUR) return true;
  e.count += 1;
  return false;
}

// STEP A: Meta calls this once when you click "Verify and save".
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  if (p.get("hub.mode") === "subscribe" && p.get("hub.verify_token") === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(p.get("hub.challenge") ?? "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

function validSignature(raw: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !header) return false;
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function sendWhatsApp(to: string, text: string) {
  const res = await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: text.slice(0, 4000) } }),
  });
  if (!res.ok) console.error("WhatsApp send error:", res.status, await res.text().catch(() => ""));
}

// STEP B: Meta calls this for every message a customer sends you.
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-hub-signature-256"))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return new NextResponse("ok", { status: 200 });
  }

  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return new NextResponse("ok", { status: 200 });
  }

  const msg = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!msg) return new NextResponse("ok", { status: 200 }); // delivery/read receipts etc.

  if (seenMessageIds.has(msg.id)) return new NextResponse("ok", { status: 200 });
  seenMessageIds.add(msg.id);
  if (seenMessageIds.size > 5000) seenMessageIds.clear();

  const from: string = msg.from;

  if (msg.type !== "text") {
    await sendWhatsApp(from, "Hi! I can only read text messages for now. Please type your question and I'll help.");
    return new NextResponse("ok", { status: 200 });
  }

  if (overLimit(from)) {
    await sendWhatsApp(from, "You've sent a lot of messages. Our team will get back to you shortly.");
    return new NextResponse("ok", { status: 200 });
  }

  const userText = String(msg.text?.body ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!userText) return new NextResponse("ok", { status: 200 });

  const messages: ChatMsg[] = [...(history.get(from) ?? []), { role: "user" as const, content: userText }].slice(
    -MAX_HISTORY
  );
  while (messages.length && messages[0].role !== "user") messages.shift();

  const result = await callGemini({
    apiKey,
    model: MODEL,
    system: SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 700,
    thinkingLevel: "minimal",
  });

  let reply: string;
  if (result.ok) {
    reply = result.reply.replace("[[COLLECT_CONTACT]]", "").trim();
  } else {
    console.error("Gemini WhatsApp error:", result.status, result.error);
    reply = "Sorry, something went wrong on our side. Our team will reply to you shortly.";
  }

  history.set(from, [...messages, { role: "assistant" as const, content: reply }].slice(-MAX_HISTORY));
  await sendWhatsApp(from, reply);

  return new NextResponse("ok", { status: 200 }); // always 200 so Meta doesn't retry
}
