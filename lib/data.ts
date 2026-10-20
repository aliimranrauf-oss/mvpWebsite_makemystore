// Shared content used across the homepage and the dedicated service pages.
// Update prices, copy, or FAQs here once — every page that uses them stays in sync.

export type Tier = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlight?: boolean;
  slug?: string; // used to pre-fill the contact form when the card is clicked
  setupFrom?: number; // lowest one-time price in GBP (for the first-year cost line)
  monthlyFrom?: number; // lowest care-plan price per month in GBP (omit if no care plan)
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
    price: "From £120",
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
    price: "From £200",
    accent: "cyan" as const,
  },
  {
    slug: "pos-system",
    title: "POS & Shop Management System",
    desc: "Inventory, invoicing, customers, suppliers, and reports — with a built-in AI assistant. Custom-built for any business.",
    points: [
      "Inventory, billing, customers & suppliers in one system",
      "AI assistant proposes changes, you confirm",
      "Works offline, syncs automatically",
    ],
    price: "From £320",
    accent: "mint" as const,
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
    price: "From £120",
    accent: "cyan" as const,
  },
];

export const chatbotTiers: Tier[] = [
  {
    name: "Basic FAQ Bot",
    slug: "basic-faq-bot",
    price: "£120–£200",
    desc: "Instant answers to the questions customers ask every day: hours, prices, location, policies.",
    features: [
      "Answers from a Q&A list you approve",
      "Chat widget on your website",
      "Lead capture form (name, phone, email)",
      "1 revision round",
    ],
  },
  {
    name: "AI Bot",
    slug: "ai-bot",
    setupFrom: 480,
    monthlyFrom: 25,
    price: "£480–£950",
    desc: "Understands any question and replies in your customer's language, using your real business information.",
    features: [
      "Everything in Basic",
      "Replies in Arabic, English, Urdu and more",
      "Answers from your menu, services and prices",
      "Remembers the conversation",
      "Takes booking and enquiry details",
    ],
    highlight: true,
  },
  {
    name: "AI Bot + Dashboard",
    slug: "ai-bot-dashboard",
    setupFrom: 950,
    monthlyFrom: 40,
    price: "from £950",
    desc: "Run your bot yourself. Change stock, prices and hours in a private dashboard, and the bot updates instantly.",
    features: [
      "Everything in AI Bot",
      "Private login to your own dashboard",
      "Mark items in or out of stock",
      "Edit prices, hours and offers yourself",
      "Add any custom field you need",
      "See conversations and leads",
    ],
  },
];

/** "From" first-year cost = setup + 12 months of care plan. Used for the pricing cards. */
export function firstYearFrom(t: Tier): number | null {
  if (!t.setupFrom || !t.monthlyFrom) return null;
  return t.setupFrom + t.monthlyFrom * 12;
}

export const chatbotAddons = [
  { name: "WhatsApp connection", price: "+£95" },
  { name: "Telegram connection", price: "+£80" },
  { name: "Live menu page for your website (always matches your dashboard)", price: "+£120–£200" },
  { name: "Your own address, e.g. bot.yourbusiness.com", price: "+£40" },
];

export const chatbotCarePlan = {
  name: "Care plan",
  price: "£25–£40 / month (AI Bot) · £40–£65 / month (Dashboard)",
  desc: "We host and monitor your bot, update your information and fix problems. Includes the AI usage for up to 3,000 customer replies a month.",
};

export const mvpTiers: Tier[] = [
  {
    name: "Starter",
    price: "£200",
    desc: "A focused, single-purpose MVP to validate an idea fast.",
    features: ["Core feature set", "Next.js + Supabase", "48–72 hour delivery"],
  },
  {
    name: "Growth",
    price: "£520",
    desc: "A more complete product with auth, database, and a few key flows.",
    features: ["Everything in Starter", "User accounts + database", "Basic admin view"],
    highlight: true,
  },
  {
    name: "Pro",
    price: "£1,250",
    desc: "A fuller build for products ready to bring on real users.",
    features: ["Everything in Growth", "Optional AI chatbot built in", "Priority delivery"],
  },
];

export const rescueTiers: Tier[] = [
  {
    name: "Quick Fix",
    price: "£120–£240",
    desc: "Small bugs or a missing feature on an otherwise working project.",
    features: ["Bug fixes", "Minor feature additions", "Delivered on your GitHub"],
  },
  {
    name: "Standard Rescue",
    price: "£320–£640",
    desc: "Broken features, hosting issues, or a project that needs real cleanup.",
    features: ["Feature repair", "Proper GitHub + Vercel setup", "Code cleanup"],
    highlight: true,
  },
  {
    name: "Full Rebuild",
    price: "From £800",
    desc: "The project needs to be largely rebuilt. Priced after a quick review.",
    features: ["Free scope review first", "Rebuilt on Next.js", "Fixed quote before we start"],
  },
];

export const posTiers: Tier[] = [
  {
    name: "Starter POS",
    price: "From £320",
    desc: "Core billing and stock for a single shop.",
    features: [
      "Inventory with stock history",
      "Sales & invoicing (print, PDF, WhatsApp)",
      "Customer ledger (cash & credit)",
      "Basic sales reports",
    ],
  },
  {
    name: "Business POS + AI",
    price: "From £720",
    desc: "Everything in Starter, plus suppliers, payments, and the AI assistant.",
    features: [
      "Everything in Starter POS",
      "Suppliers, purchases & payments",
      "Expense tracking & profit reports",
      "AI assistant (propose → confirm)",
      "Offline mode with auto-sync",
    ],
    highlight: true,
  },
  {
    name: "Custom / Multi-Branch",
    price: "Priced after a call",
    desc: "Multiple branches, industry-specific modules, or integrations.",
    features: [
      "Everything in Business POS + AI",
      "Multiple branches / multi-store",
      "Industry-specific modules",
      "Custom integrations & reporting",
    ],
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

export const chatbotFaqs = [
  {
    q: "Which option should I choose?",
    a: "Choose Basic if customers mostly ask the same few simple questions. Choose AI Bot if they ask all kinds of questions, in different languages, and you want bookings and enquiries captured. Choose AI Bot + Dashboard if your menu, prices or stock change often and you want to update them yourself without calling us.",
  },
  {
    q: "Does the chatbot reply in my customers' language?",
    a: "Yes. The AI Bot replies in whatever language the customer writes in, including Arabic and English, and switches when they do. Try the live demo above and type in any language.",
  },
  {
    q: "Will it work with my website (Wix, Squarespace, WordPress, Shopify)?",
    a: "Yes. The chat widget is added with one small piece of code, which works on WordPress, Shopify, Wix, Squarespace, Webflow and custom websites. We add it for you or send you simple steps. A few website builders only allow custom code on a paid plan. If yours doesn't, we can give you a link to a hosted chat page or connect the bot to your WhatsApp instead.",
  },
  {
    q: "Where do I log in to the dashboard?",
    a: "The dashboard is a private page on our site, protected by your own login. It works on your phone or computer, and you don't install anything. Your website only shows the chat widget. If you want a branded address such as bot.yourbusiness.com, that's available as a small add-on.",
  },
  {
    q: "If I change something in the dashboard, does my website menu change too?",
    a: "The chatbot updates instantly. Your website's own menu only updates if you add our live menu page (a small add-on), which you paste into your site and which always matches your dashboard. Connecting to an existing system such as Shopify, Square or a POS is possible but quoted separately after we check what you use.",
  },
  {
    q: "What information does the bot use to answer?",
    a: "Only your own business content: menu, services, prices, opening hours, policies and FAQs. If a customer asks something outside that, the bot says it isn't sure and offers to pass them to you, instead of guessing.",
  },
  {
    q: "What does it cost to run the AI?",
    a: "The AI is billed by usage, and for a small business it is usually only a few pounds a month. The care plan includes up to 3,000 AI replies a month. Busier bots pay a small extra amount for each additional 5,000 replies (about £8), or you can connect your own AI account and pay the provider directly.",
  },
  {
    q: "Can the chatbot connect to WhatsApp or Telegram?",
    a: "Yes. Every bot comes with a website chat widget. WhatsApp and Telegram connections are available as add-ons (+£95 and +£80).",
  },
  {
    q: "How long does it take?",
    a: "Basic FAQ bots are the quickest. AI bots take a little longer because we load and test your business information, but most are live within a few days. Dashboard projects take longer, and we confirm the timeline in your quote.",
  },
  {
    q: "Do I own my chatbot and my data?",
    a: "You own your content and your data. By default your bot runs on our hosting, covered by the care plan, so there's nothing technical for you to manage. You can ask us to move it to your own accounts at any time.",
  },
  {
    q: "What if I need help or changes after it's live?",
    a: "Small tweaks in the first month are free. After that, the care plan covers updates to your information and quick fixes. Bigger requests, like new features, are separate work with their own quote.",
  },
  {
    q: "What will it cost me in the first year?",
    a: "Setup is a one-time price, and the optional care plan is monthly. For example, an AI Bot starting at £480 with the £25/month care plan is from £780 in the first year, and an AI Bot + Dashboard starting at £950 with the £40/month care plan is from £1,430. Your fixed quote shows your exact numbers before we start.",
  },
  {
    q: "Is my customers' data safe, and who owns it?",
    a: "Your business content and your customers' chat and lead data belong to you. It is stored in a private database with access controls, only your bot and your dashboard login can read it, and we never sell or share it. You can ask for an export or deletion at any time, and we can move everything to your own accounts. We don't claim legal compliance on your behalf, but we can tell you exactly what is stored so you can complete your own privacy notice.",
  },
  {
    q: "Are there extra fees for WhatsApp?",
    a: "Our connection fee (+£95) is a one-time setup price. WhatsApp itself is run by Meta, which has its own price list. Replies to customers who message you first are normally free, while messages your business starts (such as reminders or promotions) can be charged by Meta, billed directly to your WhatsApp Business account. We explain the current rates for your country before you decide.",
  },
];

export const mvpFaqs = [
  {
    q: "What exactly do I get in 48–72 hours?",
    a: "A working, deployed product on Next.js and Supabase — not a mockup. The Starter tier covers a focused, single-purpose build; Growth and Pro add user accounts, a database, and more complete flows.",
  },
  {
    q: "Can I add an AI chatbot to my MVP?",
    a: "Yes — it's built into the Pro tier, and can be added to Starter or Growth as well. The same AI chatbot service that trains on your data can be wired straight into your MVP.",
  },
  {
    q: "What if I need more features after launch?",
    a: "Every MVP is built on clean, standard Next.js and Supabase, so new features can be added later without rebuilding what's already there.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "No. You describe what the product needs to do, and the technical side — code, database, hosting, deployment — is handled for you. You still end up owning real, readable code.",
  },
  {
    q: "Who owns the code and hosting after delivery?",
    a: "You do, completely. GitHub, Vercel, and Supabase are all set up under your own accounts from day one.",
  },
  {
    q: "Will you set up the admin panel for me too?",
    a: "Yes. Every MVP is built from scratch and handed over complete — including a working admin panel — so you can run and manage your business without touching any code.",
  },
  {
    q: "What if I need help or changes after launch?",
    a: "For existing customers, small tweaks and quick help are provided free whenever needed. Bigger requests — new features or major changes — are treated as separate, paid work with their own quote.",
  },
];

export const rescueFaqs = [
  {
    q: "My project was built with Lovable, Bolt, or another AI builder — can you fix it?",
    a: "Yes. That's exactly what Project Rescue is for. Send the current state of it and you'll get an honest read on what it needs, with a fixed quote before anything starts.",
  },
  {
    q: "What kinds of problems do you fix?",
    a: "Broken or half-working features, missing or misconfigured databases, failed deployments, and projects that technically run but were never set up properly on real hosting.",
  },
  {
    q: "What if the project needs a full rebuild?",
    a: "That's the Full Rebuild tier — priced after a quick, free review, rebuilt cleanly on Next.js, with a fixed quote agreed before work starts.",
  },
  {
    q: "Will I own the fixed project afterward?",
    a: "Yes. It's rebuilt and deployed on your own GitHub, Vercel, and Supabase accounts — no lock-in to any platform.",
  },
  {
    q: "How fast can a rescue be done?",
    a: "Quick fixes and standard rescues are often turned around in a few days. Full rebuilds depend on the size of the existing project, and you'll get a timeline with the quote.",
  },
];

export const posFaqs = [
  {
    q: "Is this only for solar or battery shops?",
    a: "No. It's shown with a battery/solar shop build as a real, working example — not a limit on what's offered. The same system (inventory, invoicing, customers, suppliers, payments, reports, AI assistant) is rebuilt around your own products for grocery stores, pharmacies, electronics and mobile shops, hardware stores, garment shops, wholesale distributors, or any other business.",
  },
  {
    q: "What's included in a shop management system build?",
    a: "Inventory with stock history, sales and invoicing with PDF/WhatsApp sharing, a customer ledger for cash and credit sales, a supplier ledger for purchases and payments, expense tracking, dashboards and reports, staff logins with roles, and an optional AI assistant that proposes an action for you to confirm before anything is saved.",
  },
  {
    q: "How does the AI assistant work, and is it safe?",
    a: "You type or speak a request in plain language, such as adding stock or creating a bill. The assistant shows a proposal summarizing exactly what it's about to do, and nothing is saved until you confirm it. It never writes to your data directly — it uses the same save logic as the regular forms.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. Bills, stock changes, and customer records can be created while offline. Everything is queued on the device and synced automatically the moment the connection returns.",
  },
  {
    q: "Do I own the app and the source code?",
    a: "Yes. This is a one-time custom build, not a rented license. The source code and database are yours, set up under your own accounts.",
  },
  {
    q: "How long does it take to build?",
    a: "A focused Starter build typically takes a few weeks. Adding the AI assistant, multi-branch support, or industry-specific modules extends the timeline — an exact estimate is given after a short discovery call about your workflow.",
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
