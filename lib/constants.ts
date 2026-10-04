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
export const SITE_LAST_UPDATED = "2026-10-04";
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
    ],
  },
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
