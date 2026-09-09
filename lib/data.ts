// Shared content used across the homepage and the dedicated service pages.
// Update prices, copy, or FAQs here once — every page that uses them stays in sync.

export type Tier = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlight?: boolean;
};

export const services = [
  {
    slug: "ai-chatbot",
    title: "Custom AI Chatbot",
    desc: "A chatbot trained on your business — from a simple FAQ bot to a full AI assistant with memory.",
    points: [
      "Basic scripted bot or GPT/Claude-powered",
      "Real memory + RAG on your own data",
      "WhatsApp, Telegram, or website widget",
    ],
    price: "From $150",
    accent: "mint" as const,
  },
  {
    slug: "saas-mvp",
    title: "AI-Powered SaaS MVP",
    desc: "A working SaaS product built on Next.js and Supabase, delivered in days, not months.",
    points: [
      "Production code, not a template",
      "48–72 hour delivery",
      "Optional AI chatbot built in",
    ],
    price: "From $250",
    accent: "cyan" as const,
  },
  {
    slug: "project-rescue",
    title: "Project Rescue",
    desc: "Stuck on a project from Lovable, Bolt, or another AI builder? We finish it properly and deploy it right.",
    points: [
      "We review and fix what's broken",
      "Rebuilt cleanly on Next.js",
      "Deployed to your GitHub + Vercel",
    ],
    price: "From $150",
    accent: "mint" as const,
  },
];

export const chatbotTiers: Tier[] = [
  {
    name: "Basic FAQ Bot",
    price: "$150–$250",
    desc: "Scripted replies, no AI. Good for straightforward, repeatable questions.",
    features: ["Rule-based Q&A flow", "Website popup widget", "1 revision round"],
  },
  {
    name: "AI-Powered Bot",
    price: "$500–$900",
    desc: "GPT, Claude, or Grok — trained on your own business data.",
    features: [
      "Real memory + RAG on your data",
      "Website widget included",
      "WhatsApp / Telegram: +$120 / +$100",
    ],
    highlight: true,
  },
];

export const mvpTiers: Tier[] = [
  {
    name: "Starter",
    price: "$250",
    desc: "A focused, single-purpose MVP to validate an idea fast.",
    features: ["Core feature set", "Next.js + Supabase", "48–72 hour delivery"],
  },
  {
    name: "Growth",
    price: "$650",
    desc: "A more complete product with auth, database, and a few key flows.",
    features: ["Everything in Starter", "User accounts + database", "Basic admin view"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "$1,600",
    desc: "A fuller build for products ready to bring on real users.",
    features: ["Everything in Growth", "Optional AI chatbot built in", "Priority delivery"],
  },
];

export const rescueTiers: Tier[] = [
  {
    name: "Quick Fix",
    price: "$150–$300",
    desc: "Small bugs or a missing feature on an otherwise working project.",
    features: ["Bug fixes", "Minor feature additions", "Delivered on your GitHub"],
  },
  {
    name: "Standard Rescue",
    price: "$400–$800",
    desc: "Broken features, hosting issues, or a project that needs real cleanup.",
    features: ["Feature repair", "Proper GitHub + Vercel setup", "Code cleanup"],
    highlight: true,
  },
  {
    name: "Full Rebuild",
    price: "From $1,000",
    desc: "The project needs to be largely rebuilt. Priced after a quick review.",
    features: ["Free scope review first", "Rebuilt on Next.js", "Fixed quote before we start"],
  },
];

export const benefits = [
  {
    title: "Real production code",
    desc: "No drag-and-drop templates. Every project is written, readable code you can hand to any developer.",
  },
  {
    title: "Full source on your GitHub",
    desc: "The complete codebase is pushed to a repository you own from day one.",
  },
  {
    title: "No lock-in, ever",
    desc: "Your GitHub, your Vercel, your Supabase. Nothing is tied to my accounts.",
  },
  {
    title: "Fast turnaround",
    desc: "Most MVPs ship in 48–72 hours. Chatbots and fixes are usually quicker.",
  },
  {
    title: "Direct communication",
    desc: "You talk to the person building it — no account managers, no handoffs.",
  },
  {
    title: "Built to grow",
    desc: "Clean, scalable structure so new features don't mean starting over.",
  },
];

export const techStack = [
  "Next.js",
  "Supabase",
  "Vercel",
  "OpenAI",
  "Claude",
  "Tailwind CSS",
  "GitHub",
];

export const howItWorksSteps = [
  {
    n: "1",
    title: "Tell us what you need",
    desc: "A chatbot, a new MVP, or a project that's stuck. Send a few details through the contact form.",
  },
  {
    n: "2",
    title: "Get a fixed quote",
    desc: "You'll hear back with a clear price and timeline before anything starts — no surprises later.",
  },
  {
    n: "3",
    title: "We build or fix it",
    desc: "Work happens on Next.js, Supabase, and Vercel, with updates along the way.",
  },
  {
    n: "4",
    title: "You get everything",
    desc: "Full source pushed to your GitHub, deployed to your Vercel. You own all of it.",
  },
];

export const trustPoints = [
  {
    title: "You own every account",
    desc: "GitHub, Vercel, Supabase, OpenAI — all set up under your own accounts, not mine.",
  },
  {
    title: "Full code ownership",
    desc: "The entire codebase belongs to you the moment it's delivered. No licensing, no revoked access.",
  },
  {
    title: "No lock-in",
    desc: "Hand the project to any other developer at any time — it's plain Next.js, nothing proprietary.",
  },
];

export const faqs = [
  {
    q: "Do I need any coding knowledge?",
    a: "No. You describe what you need, and everything technical — code, hosting, deployment — is handled for you. You'll still end up owning real, readable code.",
  },
  {
    q: "What if my project is already broken or half-built?",
    a: "That's exactly what Project Rescue is for. Send the current state of it and you'll get an honest read on what it'll take to fix or finish, with a fixed quote before anything starts.",
  },
  {
    q: "Who owns the code and accounts afterward?",
    a: "You do, completely. The GitHub repository, Vercel deployment, and Supabase project are all set up under your accounts from the start.",
  },
  {
    q: "Can I add more features later?",
    a: "Yes. Every project is built with clean, standard Next.js so new features can be added later without rebuilding what already exists.",
  },
  {
    q: "How is a chatbot without AI different from one with AI?",
    a: "A Basic bot answers from a fixed script you provide — good for simple, repeated questions. An AI-powered bot understands open-ended questions and answers from your actual business data.",
  },
  {
    q: "How fast is delivery?",
    a: "Most SaaS MVPs ship in 48–72 hours. Chatbots and quick fixes are often faster. Full rebuilds depend on the size of the existing project.",
  },
];
