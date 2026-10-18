// Facts that live on the website but are NOT in the service tiers or service
// FAQs: contact details, payment, policies, tech stack, who we are, and so on.
// Both bots read this one file, so the Instant Answers bot and the AI bot can
// never disagree. Every statement here must match what the site actually says
// (Terms, Privacy, About, Contact pages). Do not add anything the site does not
// say: if it isn't published, the bots should send people to the team instead.

import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

/** Tap-to-chat link for the business WhatsApp number. */
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
import { chatbotCarePlan } from "@/lib/data";

export type SiteFact = {
  q: string;
  a: string;
  /** Matched anywhere in the visitor's message. Prefix "~" = whole word only. */
  keywords: string[];
  /** If set, at least one of these must also appear. */
  requires?: string[];
  /** Show the "Get a quote" button (opens the lead form that saves to Supabase). */
  suggestQuote?: boolean;
};

export const siteFacts: SiteFact[] = [
  {
    q: "How do I order or get started, and where do I go?",
    keywords: [
      "how to order", "how do i order", "where to order", "where can i order", "where do i order", "place an order",
      "want to order", "ready to order", "order now", "how can i buy", "how do i buy", "where to buy", "how to hire",
      "how do i hire", "how do i get started", "how to get started", "how to start", "where do i start", "how do i begin",
      "how do i start", "contact form", "contact page", "contact link", "form link", "order form", "link to order",
      "link to the form", "get a quote", "request a quote", "send my details", "fill the form", "fill in the form",
      "where is the form", "where do i sign up", "sign up",
    ],
    a: `To order, tap "Get a quote" below and fill in the quick form with what you need, and we\'ll confirm everything within 24 hours. You can also WhatsApp us on ${WHATSAPP_DISPLAY} or email ${CONTACT_EMAIL}.`,
    suggestQuote: true,
  },
  {
    q: "How do I contact you?",
    keywords: [
      "contact", "email address", "your email", "phone number", "whatsapp number", "reach you", "get in touch",
      "call you", "talk to you", "speak to someone", "speak to a person", "customer service", "support email",
      "your number", "message you", "do you have whatsapp", "have a whatsapp", "your whatsapp", "whatsapp you",
      "~whatsapp me", "whatsapp link", "whatsapp contact", "contact you on whatsapp", "contact on whatsapp",
      "message you on whatsapp", "chat with you on whatsapp", "mobile number", "contact details", "contact info",
      "contact information", "where can i contact", "where do i contact", "how can i contact", "where to contact",
      "how to contact", "email you", "send an email", "write to you",
    ],
    a: `You can reach us on WhatsApp at ${WHATSAPP_DISPLAY} or by email at ${CONTACT_EMAIL}. Or tap "Get a quote" below and fill in the quick form, and the team replies within 24 hours.`,
    suggestQuote: true,
  },
  {
    q: "How quickly do you reply?",
    keywords: ["reply time", "how long to reply", "how quickly do you reply", "how soon will you reply", "response time", "how fast do you reply", "get back to me", "hear back"],
    a: "We reply to every message within 24 hours. It's a real reply from the team, not an autoresponder loop.",
  },
  {
    q: "Is a quote or consultation free?",
    keywords: ["free quote", "free consultation", "free consult", "no obligation", "free estimate", "any obligation", "commitment"],
    a: "Yes. Asking is free and carries no obligation: send your details at /contact and you get a fixed quote back first. POS projects start with a free consultation and Project Rescue starts with a free scope review.",
  },
  {
    q: "How do I pay?",
    keywords: [
      "how do i pay", "how to pay", "how can i pay", "payment method", "payment methods", "pay by", "paypal", "payoneer",
      "fiverr", "bank transfer", "credit card", "deposit", "pay by invoice", "direct invoice", "send me an invoice", "upfront", "advance payment", "installment",
      "instalment", "payment terms", "when do i pay",
    ],
    a: "We mainly take payment through Payoneer, either by direct invoice or a payment link, and a secure Fiverr payment is available if you'd rather pay that way. Nothing is charged when you send a form. For development projects our Terms say a deposit may be required to begin, with the balance due on delivery unless agreed otherwise. For CV and career-document orders, we confirm your payment details when we confirm your order. All prices are in GBP, and you can tell us your preferred currency so we confirm the equivalent first.",
  },
  {
    q: "What currency are your prices in?",
    keywords: ["what currency", "which currency", "currency", "pay in dollars", "pay in usd", "pay in pounds", "pay in sar", "pay in aed", "in dollars", "in riyal", "in dirham"],
    a: "All prices are in pounds sterling (GBP). If you'd rather pay in another currency such as USD, AED or SAR, tell us when you order and we confirm the equivalent before you pay. The local-currency figures on our country pages are rough guides only.",
  },
  {
    q: "Do you offer discounts?",
    keywords: ["discount", "coupon", "promo", "offer code", "negotiate", "reduce the price", "lower price", "best price", "special offer"],
    a: "Our prices are set as listed. The built-in savings are the Complete Package (£50 less than buying the CV & Cover Letter and LinkedIn packages separately) and the limited-offer All-in-One Career Bundle: a fixed £500 that includes the CV, cover letter, LinkedIn, biography and portfolio website. For anything else, ask the team at /contact. If a lighter option helps, the Starter MVP and Basic FAQ Bot tiers are our entry points.",
  },
  {
    q: "What is your refund and cancellation policy?",
    keywords: ["refund", "money back", "cancel", "cancellation", "terms of service", "terms and conditions", "your terms", "guarantee", "satisfaction"],
    a: "Our Terms of Service (/terms) cover this. For development projects: you get a fixed quote before work starts, a deposit may be required to begin, and deposits are generally non-refundable once work has started, except where the law requires. Either side can cancel before delivery by email, and work already completed is billable. We address defects reported within a reasonable period after delivery. For CV and career-document orders you see the fixed price first and nothing is charged until we confirm your order, so email us at " + CONTACT_EMAIL + " with any specific refund question before you pay.",
  },
  {
    q: "How do you handle my personal data?",
    keywords: ["privacy", "personal data", "data safe", "my data safe", "data protection", "delete my data", "cookies", "analytics", "do you sell my data", "store my information"],
    a: "We only collect what you put in the contact form (name, email, optional phone, service, optional budget and your message), plus your IP address and browser details to catch spam. It's stored in a Supabase database, we send replies through Resend, and we never sell or trade your information. The site uses Google Analytics. You can ask for a copy of your data, a correction or deletion by emailing " + CONTACT_EMAIL + ". Full policy: /privacy",
  },
  {
    q: "What technology do you use?",
    keywords: ["tech stack", "technology", "technologies", "what stack", "nextjs", "next js", "framework", "programming language", "built with", "what do you use", "what do you build with", "tailwind", "openai"],
    a: "Everything is built on Next.js, Supabase and Vercel, with Tailwind CSS and GitHub, and OpenAI and Claude for the AI features. There's no proprietary platform or black box, so any developer can pick the code up later, and it all lives in your own accounts.",
  },
  {
    q: "Who are you and where are you based?",
    keywords: [
      "who are you", "who is behind", "who built", "where are you", "where is your", "based in", "your location",
      "which country are you", "uk based", "uk-based", "real developers", "real people", "real person", "are you a bot",
      "are you ai", "is this ai", "about your company", "about your team", "about makemystore", "about the company",
      "about us", "your team", "who am i talking",
    ],
    a: "MakeMyStore is a UK-based team of real developers. We build AI chatbots, SaaS MVPs and POS systems, rescue stuck AI-built projects, and run a career-documents service for job seekers in the Gulf. AI is a tool we use where it genuinely helps, but a human builds and checks every delivery, and you deal directly with the person building it, with no account managers. More: /about",
  },
  {
    q: "Which countries do you work with?",
    keywords: ["which countries", "what countries", "work with clients", "clients in", "work internationally", "international clients", "worldwide", "do you work in", "do you serve", "outside the uk", "overseas"],
    a: "We serve clients in the US, UK, Europe, Australia and the UAE, and our CV service is built for job seekers across the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman). Prices are in GBP. We have chatbot pages for the UK (/ai-chatbot/uk), USA (/ai-chatbot/usa), Australia (/ai-chatbot/australia) and UAE (/ai-chatbot/uae).",
  },
  {
    q: "What support do I get after delivery, and who hosts it?",
    keywords: ["maintenance", "after delivery", "after launch", "after it's live", "after its live", "ongoing support", "support after", "help after", "hosting", "who hosts", "host it", "hosting cost", "domain name"],
    a: `For existing customers, small tweaks and quick help after launch are free. Bigger requests, like new features or major changes, are separate paid work with their own quote. Hosting runs on your own Vercel and Supabase accounts, so there's no lock-in. Chatbots also have an optional care plan (${chatbotCarePlan.price}) where we host and monitor the bot for you.`,
  },
  {
    q: "How many revisions do I get?",
    keywords: ["revisions", "revision", "amendments", "changes after", "edits"],
    a: "CV, LinkedIn, Biography, Portfolio Website and Complete packages all include 11 months of free revisions. The Basic FAQ Bot includes 1 revision round. For other projects, small tweaks after launch are free for existing customers.",
  },
  {
    q: "Can you build something that isn't on your list?",
    keywords: ["marketing website", "mobile app", "e-commerce", "ecommerce", "online store", "browser extension", "api integration", "automation", "website development", "build a website", "web design", "landing page", "dashboard app", "custom software", "something else", "something different"],
    a: "That's generally the kind of work the team takes on. We don't list a fixed price for it, so share what you need at /contact and we'll confirm the scope and send you a fixed quote.",
  },
  {
    q: "Do you have a blog?",
    keywords: ["blog", "articles", "guides", "tutorials"],
    a: "Our blog at /blog will carry straight-talk guides on AI chatbots, SaaS MVPs, POS systems and shipping real production code. There are no posts yet, so check back soon.",
  },
];
