import { Resend } from "resend";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/constants";

// Lead emails via Resend (domain makemystore.online is verified in Resend).
//
// Env vars (Vercel -> Settings -> Environment Variables):
//   RESEND_API_KEY   required. Without it emails are silently skipped (leads are still saved).
//   LEAD_NOTIFY_TO   optional. Where new-lead alerts go. Default: CONTACT_EMAIL (lib/constants.ts).
//                    Several addresses: comma separated.
//   RESEND_FROM      optional. Default: "MakeMyStore <info@makemystore.online>".

export type LeadEmail = {
  name: string;
  email: string;
  phone?: string | null;
  service: string;
  budget?: string | null;
  message: string;
  source: string;
};

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#64748B;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#10241E">${value}</td></tr>`;

/**
 * Sends (1) an alert to you and (2) an auto-reply to the customer.
 * Never throws: a failed email must not make the customer's form submission fail.
 * Must be awaited in the route, because serverless functions stop right after the response.
 */
export async function sendLeadEmails(lead: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set: lead saved but no email sent.");
    return;
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || `${SITE_NAME} <${CONTACT_EMAIL}>`;
  const to = (process.env.LEAD_NOTIFY_TO || CONTACT_EMAIL)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const alertHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#10241E">
      <h2 style="margin:0 0 12px">New lead: ${esc(lead.name)}</h2>
      <table style="border-collapse:collapse">
        ${row("Name", esc(lead.name))}
        ${row("Email", `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>`)}
        ${row("Phone", lead.phone ? esc(lead.phone) : "-")}
        ${row("Service", esc(lead.service))}
        ${row("Budget", lead.budget ? esc(lead.budget) : "-")}
        ${row("Source", esc(lead.source))}
      </table>
      <p style="margin:16px 0 4px;color:#64748B">Message</p>
      <p style="margin:0;white-space:pre-wrap">${esc(lead.message)}</p>
      <p style="margin:20px 0 0"><a href="${SITE_URL}/admin">Open admin dashboard</a></p>
    </div>`;

  const replyHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#10241E">
      <p>Hi ${esc(lead.name)},</p>
      <p>Thanks for contacting ${SITE_NAME}. We have received your message and will reply within 24 hours with a fixed quote.</p>
      <p style="color:#64748B">Your message:</p>
      <blockquote style="margin:0;padding-left:12px;border-left:3px solid #E6EAE8;white-space:pre-wrap">${esc(lead.message)}</blockquote>
      <p>If it is urgent you can also message us on WhatsApp: ${WHATSAPP_DISPLAY}.</p>
      <p>${SITE_NAME}</p>
    </div>`;

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to,
      replyTo: lead.email, // pressing Reply in your inbox answers the customer
      subject: `New lead: ${lead.name} (${lead.service})`,
      html: alertHtml,
    }),
    resend.emails.send({
      from,
      to: [lead.email],
      replyTo: CONTACT_EMAIL,
      subject: `We received your message - ${SITE_NAME}`,
      html: replyHtml,
    }),
  ]);

  results.forEach((r, i) => {
    const label = i === 0 ? "lead alert" : "auto-reply";
    if (r.status === "rejected") console.error(`Resend ${label} failed:`, r.reason);
    else if (r.value.error) console.error(`Resend ${label} error:`, r.value.error);
  });
}
