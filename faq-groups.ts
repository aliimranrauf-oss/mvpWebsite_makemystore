// One place that gathers every FAQ group on the site, so the homepage FAQ,
// the /pricing page and the structured data always show the same questions.
// Edit the questions themselves in lib/data.ts (developer services) and
// lib/cv-data.ts (CV & LinkedIn). Only the pricing group lives here.

import { chatbotFaqs, mvpFaqs, posFaqs, rescueFaqs } from "@/lib/data";
import { content as cvContent } from "@/lib/cv-data";

export type FaqItem = { q: string; a: string };
export type FaqGroupData = { id: string; title: string; items: FaqItem[] };

export const pricingFaqs: FaqItem[] = [
  {
    q: "What currency are your prices in?",
    a: "All prices are in pounds sterling (GBP). If you would rather pay in another currency, such as USD, AED or SAR, tell us when you order and we confirm the equivalent before you pay. Local-currency figures on our country pages are rough guides only.",
  },
  {
    q: "Are the prices fixed or estimates?",
    a: "CV, LinkedIn, Complete, Biography and Portfolio Website prices are fixed, and you see the exact price before you order. For AI chatbots, SaaS MVPs, POS systems and Project Rescue, the tiers show starting prices or ranges that depend on scope. You always get a fixed quote before any work starts.",
  },
  {
    q: "How do I pay?",
    a: "Nothing is charged when you send a form or an enquiry. Once your order or scope is confirmed, we send an invoice or payment link. Payoneer is our main method, and a secure Fiverr payment is available if you prefer that route.",
  },
];

export const faqGroups: FaqGroupData[] = [
  { id: "pricing", title: "Pricing & payment", items: pricingFaqs },
  { id: "ai-chatbot", title: "AI Chatbot", items: chatbotFaqs },
  { id: "saas-mvp", title: "AI-Powered SaaS MVP", items: mvpFaqs },
  { id: "pos-system", title: "POS & Shop Management", items: posFaqs },
  { id: "project-rescue", title: "Project Rescue", items: rescueFaqs },
  { id: "cv-writing", title: "CV, LinkedIn & Career Writing", items: cvContent.en.faq.items },
];

export const allFaqItems: FaqItem[] = faqGroups.flatMap((g) => g.items);
