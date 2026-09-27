export const SITE_URL = "https://makemystore.online";
export const CONTACT_EMAIL = "info@makemystore.online";
export const SITE_NAME = "MakeMyStore";
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
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Controls which chat widget (if any) renders site-wide.
// Flip with NEXT_PUBLIC_CHATBOT_MODE in Vercel — no code deploy needed.
export const CHATBOT_MODE: "faq" | "ai" | "hybrid" | "off" =
  (process.env.NEXT_PUBLIC_CHATBOT_MODE as "faq" | "ai" | "hybrid" | "off") || "faq";
