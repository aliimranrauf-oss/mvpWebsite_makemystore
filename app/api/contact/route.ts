import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { CONTACT_EMAIL } from "@/lib/constants";
import { services } from "@/lib/data";

export const runtime = "nodejs";

const VALID_SERVICE_SLUGS = new Set(services.map((s) => s.slug).concat("other"));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  company_website?: unknown; // honeypot
};

function clean(value: unknown, maxLen = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot: if it's filled, silently report success without inserting.
  const honeypot = clean(body.company_website, 200);
  if (honeypot.length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 50);
  const rawService = clean(body.service, 50);
  const budget = clean(body.budget, 100);
  const message = clean(body.message, 5000);

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message) errors.message = "Message is required.";

  const service = VALID_SERVICE_SLUGS.has(rawService) ? rawService : "other";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, error: "Please fix the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";

  try {
    const supabase = getSupabaseServerClient();

    const { error: insertError } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      service,
      budget: budget || null,
      message,
      status: "new",
      source: "contact_page",
      user_agent: userAgent,
      ip_address: ip,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Something went wrong saving your message. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }

  // Optional: send notification + auto-reply emails via Resend.
  // Failure to send email should never fail the lead submission —
  // the lead is already safely stored in Supabase at this point.
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: `MakeMyStore <notifications@makemystore.online>`,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `New lead: ${name} (${service})`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Service: ${service}`,
          `Budget: ${budget || "—"}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });

      await resend.emails.send({
        from: `MakeMyStore <notifications@makemystore.online>`,
        to: email,
        subject: "Thanks for reaching out to MakeMyStore",
        text: `Hi ${name},\n\nThanks for getting in touch — we'll get back to you within 24 hours with next steps.\n\nIn the meantime, feel free to reply directly to this email with any extra details.\n\n— MakeMyStore`,
      });
    } catch (err) {
      console.error("Resend email error (lead was still saved):", err);
    }
  }

  return NextResponse.json({ success: true });
}
