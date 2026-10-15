export const SITE_URL = "https://www.makemystore.online";
export const CONTACT_EMAIL = "info@makemystore.online";
export const SITE_NAME = "MakeMyStore";
export const DEFAULT_OG_IMAGE = {
  url: "/images/og-image.png",
  width: 1200,
  height: 630,
  alt: "MakeMyStore: AI chatbots, SaaS MVPs and POS systems",
};
// Bump this date when you meaningfully change a page (used by sitemap lastmod).
export const SITE_LAST_UPDATED = "2026-10-15";
// Add your real profiles here; they feed the Organization schema (sameAs).
export const SOCIAL_LINKS: string[] = [
  // "https://www.linkedin.com/company/your-page",
  // "https://github.com/aliimranrauf-oss",
];
export const GA_MEASUREMENT_ID = "G-9GHRBEWJ1J";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    children: [
      { href: "/ai-chatbot", label: "AI Chatbot" },
      { href: "/saas-mvp", label: "SaaS MVP" },
      { href: "/pos-system", label: "POS System" },
      { href: "/project-rescue", label: "Project Rescue" },
      { href: "/cv-writing", label: "CV & LinkedIn Writing" },
    ],
  },
  { href: "/cv-writing", label: "CV Writing" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Controls which chat widget (if any) renders site-wide.
// Flip with NEXT_PUBLIC_CHATBOT_MODE in Vercel — no code deploy needed.
export const CHATBOT_MODE: "faq" | "ai" | "hybrid" | "off" =
  (process.env.NEXT_PUBLIC_CHATBOT_MODE as "faq" | "ai" | "hybrid" | "off") || "faq";

// Your WhatsApp number in international format without + or spaces (e.g. "447700900123").
// Leave empty to hide the "Chat on WhatsApp" buttons.
export const WHATSAPP_NUMBER = "447462230676";
// Same number in readable E.164 form, used in schema.org contactPoint.
export const WHATSAPP_DISPLAY = "+44 7462 230676";
export const PHONE_E164 = "+447462230676";

// YouTube walkthrough on /ai-chatbot. To get a VideoObject rich result in Google,
// fill in uploadDate (YYYY-MM-DD, the day the video was published) and make sure
// title/description match the video. Leave uploadDate empty to skip the schema.
export const AI_CHATBOT_VIDEO = {
  id: "krYF4PCZLIw",
  title: "How our AI chatbot and live demo work",
  description:
    "A walkthrough of how the MakeMyStore AI chatbot answers customers, captures leads, and how the owner dashboard updates it.",
  uploadDate: "",
};
