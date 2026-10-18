// Zero-cost, zero-API "Instant Answers" bot. Pure keyword matching against
// content that already exists in lib/data.ts, so it can never say something
// inconsistent with the rest of the site — and it never claims to be AI.

import { services, chatbotTiers, chatbotAddons, chatbotCarePlan, chatbotFaqs, mvpTiers, rescueTiers, posTiers, faqs, posFaqs, mvpFaqs, rescueFaqs, type Tier } from "@/lib/data";
import { chatbotCountries } from "@/lib/chatbot-countries";
import { demos } from "@/lib/demos";
import { faqGroups } from "@/lib/faq-groups";
import { siteFacts } from "@/lib/chatbot/site-facts";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/constants";
import { content as cvContent, priceLine, gbp, priceRange } from "@/lib/cv-data";

export type FaqBotReply = {
  text: string;
  suggestQuote?: boolean;
  /**
   * True only when a real keyword/topic entry matched (services, pricing,
   * a specific FAQ, greeting, etc). False for both fallback branches below
   * (the lead-intent nudge and the generic "didn't catch that" message) —
   * neither is a real answer, so hybrid mode should escalate to the AI
   * endpoint in both cases rather than treat them as "handled".
   */
  matched: boolean;
};

type Entry = {
  keywords: string[];
  /** Optional extra condition: at least one of these must ALSO appear. Lets short words
   *  like "price" or "how long" match only when the topic (e.g. a CV) is mentioned. */
  requires?: string[];
  response: string;
  /** Force the "Get a quote" button for this answer. */
  suggestQuote?: boolean;
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Keyword test. A leading "~" means whole word only (so "~pos" never matches "possible"). */
function has(normalized: string, k: string): boolean {
  if (k.startsWith("~")) return ` ${normalized} `.includes(` ${k.slice(1)} `);
  return normalized.includes(k);
}

const tierLines = (tiers: Tier[]) =>
  tiers.map((t) => `• ${t.name}: ${t.price}. ${t.desc} Includes: ${t.features.join("; ")}.`).join("\n");

function buildEntries(): Entry[] {
  const entries: Entry[] = [];

  // ---- AI chatbot service (page: /ai-chatbot) ---------------------------------
  // Built from lib/data.ts so it matches the page. These go BEFORE the CV and
  // generic entries but each one needs a chatbot word, so they never steal other topics.
  // ("bot" alone is avoided on purpose: it would match "about".)
  const CB_TERMS = ["chatbot", "chat bot", "ai bot", "faq bot", "whatsapp bot"];
  const cbTierList = chatbotTiers.map((t) => `• ${t.name}: ${t.price}. ${t.desc}`).join("\n");

  // Country pages (/ai-chatbot/uk, /usa, /australia, /uae), generated from lib/chatbot-countries.ts.
  const COUNTRY_WORDS: Record<string, string[]> = {
    uk: ["~uk", "united kingdom", "britain", "british", "england"],
    usa: ["~usa", "united states", "america", "american"],
    australia: ["australia", "australian"],
    uae: ["~uae", "dubai", "emirates", "abu dhabi"],
  };
  for (const c of chatbotCountries) {
    const kw = COUNTRY_WORDS[c.slug];
    if (!kw) continue;
    entries.push({
      keywords: kw,
      requires: CB_TERMS,
      response: `Yes, we build AI chatbots for ${c.label} businesses. Prices are in GBP (Basic FAQ Bot ${chatbotTiers[0].price}, AI Bot ${chatbotTiers[1].price}, AI Bot + Dashboard ${chatbotTiers[2].price}).${c.currencyName !== "GBP" ? ` Local guide in ${c.currencyName}: Basic ${c.tierPrices["basic-faq-bot"]}, AI Bot ${c.tierPrices["ai-bot"]}, Dashboard ${c.tierPrices["ai-bot-dashboard"]}.` : ""} ${c.privacy.law}\n\nChannels, industries and FAQs for ${c.label}: /ai-chatbot/${c.slug}`,
    });
  }

  entries.push(
    {
      keywords: ["remember", "memory", "remembers"],
      requires: [...CB_TERMS, "bot", "conversation"],
      response: "Yes. The AI Bot and AI Bot + Dashboard remember the conversation, so customers don't have to repeat themselves. The Basic FAQ Bot answers from a Q&A list you approve instead.",
    },
    {
      keywords: ["replies a month", "replies per month", "how many replies", "message limit", "usage limit", "replies included"],
      response: chatbotFaqs[6].a,
    },
    {
      keywords: ["demo", "try it", "try the", "try out", "test it", "see it", "example"],
      requires: CB_TERMS,
      response: "Yes, there's a live demo on our AI chatbot page: /ai-chatbot#demo. You see both sides: the owner's dashboard (mark items out of stock, change prices and hours) and the customer's chat. Pick a sample business (restaurant, clinic or salon) and ask anything, in any language.",
    },
    {
      keywords: ["care plan", "monthly", "per month", "running cost", "ongoing", "hosting", "maintenance", "ai cost", "usage"],
      requires: CB_TERMS,
      response: `${chatbotCarePlan.desc} AI Bot: £25–£40 per month; AI Bot + Dashboard: £40–£65 per month.\n\n${chatbotFaqs[6].a}`,
    },
    {
      keywords: ["price", "pricing", "cost", "how much", "rates", "cheap", "affordable", "budget", "packages", "plans"],
      requires: CB_TERMS,
      response: `Chatbot packages:\n${cbTierList}\n\nAdd-ons: ${chatbotAddons.map((a) => `${a.name} (${a.price})`).join("; ")}.\n\nYou get a fixed quote before anything starts. Full details: /ai-chatbot#pricing`,
    },
    {
      keywords: ["which option", "which plan", "which package", "which one", "should i choose", "which tier"],
      requires: CB_TERMS,
      response: chatbotFaqs[0].a,
    },
    {
      keywords: ["language", "languages", "arabic", "urdu", "multilingual", "hindi", "french"],
      requires: CB_TERMS,
      response: chatbotFaqs[1].a,
    },
    {
      keywords: ["wix", "squarespace", "wordpress", "shopify", "webflow", "my website", "my site", "install", "embed"],
      requires: CB_TERMS,
      response: chatbotFaqs[2].a,
    },
    {
      keywords: ["dashboard", "log in", "login", "out of stock", "change prices", "update prices", "edit prices", "update menu"],
      requires: CB_TERMS,
      response: `${chatbotFaqs[3].a}\n\n${chatbotFaqs[4].a}`,
    },
    {
      keywords: ["what information", "what data", "trained on", "answer from", "doesn't know", "does not know", "make things up", "hallucinate"],
      requires: CB_TERMS,
      response: chatbotFaqs[5].a,
    },
    {
      keywords: ["whatsapp", "telegram"],
      requires: CB_TERMS,
      response: chatbotFaqs[7].a,
    },
    {
      keywords: ["how long", "how fast", "timeline", "delivery", "turnaround", "how soon"],
      requires: CB_TERMS,
      response: chatbotFaqs[8].a,
    },
    {
      keywords: ["own my", "do i own", "my data", "ownership", "move it"],
      requires: CB_TERMS,
      response: chatbotFaqs[9].a,
    },
    {
      keywords: ["after it's live", "after its live", "after launch", "changes after", "support", "help after"],
      requires: CB_TERMS,
      response: chatbotFaqs[10].a,
    },
    {
      // General chatbot overview, keep LAST among the chatbot entries (it's the catch-all).
      keywords: CB_TERMS,
      response: `We build AI chatbots that answer your customers 24/7 in their own language (Arabic, English, Urdu and more), capture leads and bookings, and run on your website and WhatsApp.\n\n${cbTierList}\n\nTry the live demo, including the owner dashboard: /ai-chatbot#demo`,
    }
  );

  // ---- CV, LinkedIn & career documents (page: /cv-writing) -------------------
  // Built from lib/cv-data.ts so prices/features stay in sync with the page.
  // These go FIRST, but each one also needs a CV-related word (or a CV-specific
  // phrase), so they never steal questions about the other services.
  const cvById = (id: string) => cvContent.en.packages.items.find((p) => p.id === id)!;
  const cvList = cvContent.en.packages.items.map((p) => `• ${p.name} — ${priceLine(p)}`).join("\n");
  const pfPrice = gbp(cvById("portfolio").prices.entry);
  const levelsGuide = cvContent.en.packages.levels.map((l) => `• ${l.label} (${l.years})`).join("\n");
  const CV_TERMS = ["cv", "resume", "linkedin", "cover letter", "biography", "curriculum vitae"];
  const LINK = "/cv-writing#order";

  // Portfolio website (same page, anchor #portfolio). Checked BEFORE the CV
  // entries so "portfolio website price" never falls through to the CV answers.
  const PF_TERMS = ["portfolio", "personal website", "personal site", "personal web site", "online portfolio"];
  const pf = cvContent.en.portfolio;
  const pfPkg = cvContent.en.packages.items.find((p) => p.id === "portfolio");
  const pfFeatures = pfPkg ? pfPkg.features.map((x) => `• ${x}`).join("\n") : "";
  const PF_LINK = "/cv-writing#portfolio";

  entries.push(
    {
      keywords: ["price", "pricing", "cost", "how much", "rates", "cheap", "affordable", "budget", "quote"],
      requires: PF_TERMS,
      response: `The Portfolio Website package is a fixed ${pfPrice} at every career level. Prices are listed in GBP; tell us your preferred currency (SAR, AED, USD…) and we'll confirm the equivalent. No payment is taken until we've confirmed your order. If you also need a CV, CV & Cover Letter is ${priceLine(cvById("cv-cover-letter"))} (cover letter free). Order here: ${LINK} (choose "Portfolio Website").`,
    },
    {
      keywords: ["how long", "delivery", "turnaround", "how fast", "timeline", "deadline", "urgent"],
      requires: PF_TERMS,
      response: `We confirm a delivery date when we confirm your order, and we deliver on time. Tell us your deadline in the order form: ${LINK}`,
    },
    {
      keywords: ["domain", "hosting", "my own domain", "custom domain", "yourname com"],
      requires: PF_TERMS,
      response: `Your portfolio is set up so it can live on your own domain. Any domain and hosting costs are confirmed with you before work starts, so there are no surprises. Order or ask a question: ${LINK}`,
    },
    {
      keywords: ["sample", "samples", "example", "examples", "template", "see", "look like", "preview"],
      requires: PF_TERMS,
      response: `You can see a sample portfolio layout on our CV page: ${PF_LINK}. Every portfolio is custom-designed around your work, not a fixed template.`,
    },
    {
      keywords: ["revision", "revisions", "edits", "changes", "update", "11 months"],
      requires: PF_TERMS,
      response: `The Portfolio Website package includes 11 months of free revisions, so you can send updates as your projects and experience grow.`,
    },
    {
      keywords: ["arabic", "bilingual", "english"],
      requires: PF_TERMS,
      response: `Portfolios are built in English, with Arabic available on request. Mention it in the order form and the team will confirm what's possible and the cost: ${LINK}`,
    },
    {
      keywords: ["who is it for", "who is this for", "who needs", "do i need", "should i", "designer", "developer", "freelancer", "consultant", "creative", "photographer", "student", "graduate"],
      requires: PF_TERMS,
      response: `A portfolio website suits designers, developers, consultants, creatives and executives, and anyone who wants to show real work instead of just listing it. ${pfPkg?.bestFor ?? ""} It pairs well with a CV and LinkedIn profile so everything tells the same story.`,
    },
    {
      // General portfolio overview, the catch-all for portfolio questions.
      keywords: PF_TERMS,
      response: `${pf.title}. ${pf.intro}\n\nThe Portfolio Website package includes:\n${pfFeatures}\n\nIt's a fixed ${pfPrice} and you can order it together with a CV or LinkedIn package. Details and sample layout: ${PF_LINK}`,
    }
  );

  entries.push(
    {
      // Which level am I? (no CV word needed: "entry level", "executive price" etc. are CV-specific here)
      keywords: ["which level", "what level", "my level", "career level", "entry level", "fresh graduate", "professional level", "senior level", "executive level", "years of experience", "years experience"],
      requires: [...CV_TERMS, "level", "price", "cost", "package"],
      response: `Our CV prices depend on your career level:\n\n${levelsGuide}\n\nCV & Cover Letter: ${priceLine(cvById("cv-cover-letter"))}\nLinkedIn: ${priceLine(cvById("linkedin"))}\nComplete Package: ${priceLine(cvById("complete"))}\n\nIf you're between two levels, pick the one that matches the role you're applying for. Choose yours here: /cv-writing#packages`,
    },
    {
      keywords: ["complete package", "complete cv", "cv and linkedin", "cv + linkedin", "bundle", "everything"],
      requires: ["price", "cost", "how much", "pricing", "rates", "package"],
      response: `The Complete Package (CV, cover letter and LinkedIn) is fixed by level: ${priceLine(cvById("complete"))}. That saves £50 compared with buying the CV & Cover Letter and LinkedIn packages separately. Order: ${LINK}`,
    },
    {
      keywords: ["price", "pricing", "cost", "how much", "rates"],
      requires: ["linkedin", "linked in"],
      response: `LinkedIn Profile prices are fixed by career level: ${priceLine(cvById("linkedin"))}. It includes a full profile rewrite, SEO-optimised headline and About section, a custom cover banner and profile picture, and 11 months of free revisions. Order: ${LINK}`,
    },
    {
      keywords: ["price", "pricing", "cost", "how much", "rates"],
      requires: ["biography", "professional bio", "personal bio", "speaker bio"],
      response: `Professional Biography: ${priceLine(cvById("biography"))}. Biographies are written for Senior and Executive profiles, in short, medium and long versions, with 11 months of free revisions. Order: ${LINK}`,
    },
    {
      keywords: ["price", "pricing", "cost", "how much", "rates"],
      requires: ["cover letter"],
      response: `The cover letter is free with every CV package. CV & Cover Letter is fixed by level: ${priceLine(cvById("cv-cover-letter"))}. Order: ${LINK}`,
    }
  );

  entries.push(
    {
      keywords: ["price", "pricing", "cost", "how much", "rates", "cheap", "affordable", "budget"],
      requires: CV_TERMS,
      response: `Our CV prices are fixed and depend on your career level:\n\n${cvList}\n\nThe cover letter is free with CV packages. Prices are listed in GBP; tell us your preferred currency (SAR, AED, USD…) and we'll confirm the equivalent when we confirm your order.\n\nNot sure which level you are? Entry is 0–2 years, Professional 2–5, Senior 5–10, Executive 10+. Order here: ${LINK}`,
    },
    {
      keywords: ["how long", "delivery", "turnaround", "how fast", "timeline", "deadline", "urgent"],
      requires: CV_TERMS,
      response: `Delivery time depends on the package and how quickly you send us your details. We confirm a delivery date when we confirm your order and we deliver on time. If it's urgent, choose "Urgent (24–48 hrs)" in the order form: ${LINK}`,
    },
    {
      keywords: ["pay", "payment", "currency", "sar", "aed", "usd", "dollar", "riyal", "dirham"],
      requires: CV_TERMS,
      response: `Prices are listed in GBP. In the order form you can pick your preferred currency (SAR, AED, QAR, KWD, USD or GBP) and we'll confirm the equivalent and the payment options when we confirm your order. No payment is taken until we've confirmed your order and you've agreed. Payment is mainly by Payoneer invoice or payment link, with a secure Fiverr payment as an alternative.`,
    },
    {
      keywords: ["revision", "revisions", "edits", "update my", "changes after", "free updates", "11 months"],
      requires: [...CV_TERMS, "11 months"],
      response: `Every package comes with 11 months of free revisions. New job, new certification or new achievement? Send us the updates and we'll refresh your documents at no cost.`,
    },
    {
      keywords: ["sample", "samples", "example", "examples", "template"],
      requires: CV_TERMS,
      response: `Yes — tick "Send me CV samples for my industry" on the order form and we'll send samples relevant to your field: ${LINK}`,
    },
    {
      keywords: ["applicant tracking", "ats friendly", "ats compatible", "ats cv", "ats resume", "pass ats"],
      response: `Yes — every CV is formatted to pass applicant tracking systems (ATS) and uses the right keywords from your target role and industry, so it reaches a human recruiter.`,
    },
    {
      keywords: ["arabic cv", "cv in arabic", "arabic resume", "resume in arabic", "bilingual", "translate my cv", "arabic and english cv"],
      response: `Our CV, LinkedIn and bio packages are written in English. If you need an Arabic or bilingual version, mention it in the order form and the team will confirm whether they can do it and what it costs: ${LINK}`,
    },
    {
      keywords: ["cover letter"],
      response: `A tailored cover letter is included free with our CV packages — no extra charge. We also include a free interview follow-up email. See the packages: /cv-writing#packages`,
    },
    {
      keywords: ["linkedin", "linked in"],
      response: `We write and optimise LinkedIn profiles: an SEO-friendly headline and About section, experience and skills rewritten for recruiter search, plus tips on photo, banner and URL — with 11 months of free revisions. LinkedIn is fixed by career level (${priceLine(cvById("linkedin"))}), or bundled in the Complete Package (CV + cover letter + LinkedIn). Order: ${LINK}`,
    },
    {
      keywords: ["biography", "professional bio", "personal bio", "speaker bio"],
      response: `We write professional biographies for websites, conferences, company profiles, boards and press — in first or third person, in short, medium or long versions. Fixed price: ${priceLine(cvById("biography"))}. Order: ${LINK}`,
    },
    {
      keywords: ["academic cv", "academic resume", "research cv", "lecturer cv", "phd cv"],
      response: `Yes, we write academic CVs covering research, publications, teaching, grants and conferences. Mention it in the order form: ${LINK}`,
    },
    {
      keywords: ["saudi", "ksa", "gulf", "gcc", "dubai", "uae", "emirates", "riyadh", "jeddah", "abu dhabi", "qatar", "doha", "kuwait", "bahrain", "oman", "vision 2030", "saudization", "nationality"],
      requires: [...CV_TERMS, "job", "jobs", "career", "hiring", "recruiter"],
      response: `Yes — our CV service is built for the Gulf job market (KSA, UAE, Qatar, Kuwait, Bahrain, Oman). We structure your CV the way GCC recruiters scan it, include Gulf details like nationality, visa status and notice period only where they help, and position your experience for sectors like construction, energy, tourism, healthcare, tech and finance. We also help expats translate overseas experience into terms Gulf employers trust. Details: /cv-writing`,
    },
    {
      keywords: ["arabic version of the page", "arabic version of your", "arabic page", "arabic website", "arabic site", "page in arabic", "website in arabic"],
      requires: [...CV_TERMS, "page", "website", "site", "version"],
      response: `Our CV & LinkedIn page (/cv-writing) has an Arabic version — tap the Arabic language button at the top of the page to switch (English is the default). Our CV packages themselves are written in English; for an Arabic or bilingual CV, mention it in the order form and the team will confirm.`,
    },
    {
      keywords: ["how to order", "how do i order", "place an order", "order a cv", "how can i order", "what do you need from me", "what do i need to send", "what information do you need"],
      requires: CV_TERMS,
      response: `To order, tap "Get a quote" below and tell us the package you want and your target role, and we\'ll confirm your order and delivery date within 24 hours. You can also WhatsApp us on ${WHATSAPP_DISPLAY} or email ${CONTACT_EMAIL}. Prices by level: /cv-writing#packages`,
      suggestQuote: true,
    },
    {
      keywords: ["interview follow", "follow up email", "follow-up email", "follow up mail", "thank you note", "thank-you note", "thank you email", "thank-you"],
      response: "Yes. A ready-to-send interview follow-up (thank-you) email is included free with the CV & Cover Letter and Complete packages, along with a tailored cover letter. See the packages: /cv-writing#packages",
    },
    {
      keywords: ["refund", "money back", "guarantee"],
      requires: CV_TERMS,
      response: `For CV and career-document orders you see the fixed price before you order, we confirm the order with you first, and nothing is charged until you agree. Every package includes 11 months of free revisions. For a specific refund question, email ${CONTACT_EMAIL} before you pay. Our Terms: /terms`,
    },
    {
      // General CV overview — keep LAST among the CV entries (it's the catch-all).
      keywords: CV_TERMS,
      response: `We write professional CVs, cover letters, LinkedIn profiles and bios, and build personal portfolio websites — built for job seekers in Saudi Arabia, the UAE and the wider Gulf.\n\n${cvList}\n\nEvery CV package includes a free cover letter, a free interview follow-up email and 11 months of free revisions. Prices are fixed by career level. See details and order: /cv-writing`,
    }
  );

  // ---- Site facts: contact, payment, policies, tech stack, who we are ------------
  // From lib/chatbot/site-facts.ts (shared with the AI bot). Placed before the
  // generic FAQ entries so "how long to reply" isn't taken for a delivery question.
  for (const f of siteFacts) {
    entries.push({ keywords: f.keywords, requires: f.requires, response: f.a, suggestQuote: f.suggestQuote });
  }

  // ---- SaaS MVP, POS and Project Rescue: service-specific answers -----------------
  const PRICE_WORDS = ["price", "pricing", "cost", "how much", "rates", "cheap", "affordable", "budget", "packages", "plans", "tiers", "fee"];
  const MVP_TERMS = ["mvp", "saas", "startup", "minimum viable", "my idea", "app idea", "web app", "build my app", "build an app"];
  const POS_TERMS = ["~pos", "point of sale", "shop management", "inventory", "billing software", "billing system", "retail system", "stock management", "cash register"];
  const RESCUE_TERMS = ["rescue", "full rebuild", "quick fix", "standard rescue", "lovable", "bolt", "ai builder", "ai-built", "ai built", "stuck project", "broken app", "fix my app", "fix my project", "fix my website", "unfinished", "half built", "half-built", "finish my"];
  const demo = demos.find((d) => d.live);
  const POS_DEMO = demo ? `/pos-system/${demo.slug}` : "/pos-system";

  entries.push(
    // MVP
    {
      keywords: PRICE_WORDS,
      requires: MVP_TERMS,
      response: `SaaS MVP packages (fixed quote before anything starts):\n${tierLines(mvpTiers)}\n\nOptional AI chatbot is built into Pro and can be added to Starter or Growth. Details: /saas-mvp#pricing`,
    },
    {
      keywords: ["starter", "growth", "pro tier", "pro plan", "included", "what do i get", "features", "what's in", "whats in"],
      requires: MVP_TERMS,
      response: `Here's what each SaaS MVP tier includes:\n${tierLines(mvpTiers)}\n\nAll of it is built on Next.js and Supabase and deployed to your own accounts. Details: /saas-mvp`,
    },
    {
      keywords: ["how long", "how fast", "timeline", "delivery", "turnaround", "how soon", "48", "72"],
      requires: MVP_TERMS,
      response: faqs[5].a + " Timelines are estimates based on typical projects of that size, and you get a timeline with your quote.",
    },
    {
      keywords: ["source code", "own the code", "code ownership", "who owns", "do i own"],
      requires: MVP_TERMS,
      response: mvpFaqs[4].a,
    },
    {
      keywords: ["add ai", "ai chatbot", "add a chatbot", "ai in my", "ai assistant", "~ai"],
      requires: MVP_TERMS,
      response: mvpFaqs[1].a,
    },
    {
      keywords: ["admin panel", "admin page", "admin dashboard"],
      response: mvpFaqs[5].a,
    },
    {
      keywords: ["after launch", "after delivery", "changes after", "help after"],
      requires: MVP_TERMS,
      response: mvpFaqs[6].a,
    },
    {
      keywords: MVP_TERMS,
      response: `We build working SaaS products on Next.js and Supabase, delivered in 48–72 hours, with real accounts, a real database, an admin panel and an optional AI chatbot. You describe what the product needs to do, and you own the code, hosting and deployment. Starter ${mvpTiers[0].price}, Growth ${mvpTiers[1].price}, Pro ${mvpTiers[2].price}. Details: /saas-mvp`,
    },

    // POS
    {
      keywords: ["demo", "try", "example", "sample", "see it", "live"],
      requires: POS_TERMS,
      response: `Yes, there's a live POS demo (a battery & solar shop build): ${POS_DEMO}. Click "Log in to demo" with no sign-up. It uses sample data only and resets every hour, so please don't enter real business information. Your system is built around your own business.`,
    },
    {
      keywords: PRICE_WORDS,
      requires: POS_TERMS,
      response: `POS & shop management is a one-time build fee, with no forced monthly license. Exact pricing depends on the modules you need:\n${tierLines(posTiers)}\n\nDetails: /pos-system#pricing`,
    },
    {
      keywords: ["how long", "how fast", "timeline", "delivery", "turnaround", "how soon"],
      requires: POS_TERMS,
      response: posFaqs[5].a,
    },
    {
      keywords: ["multi branch", "multi-branch", "multiple branches", "multi store", "multi-store", "multiple shops", "branches", "several shops"],
      response: `Yes. The Custom / Multi-Branch tier covers multiple branches or stores, industry-specific modules and custom integrations, and it's priced after a short call. ${posTiers[2].desc} Start here: /contact`,
    },
    {
      keywords: ["own the app", "source code", "one-time", "one time", "monthly license", "subscription", "license fee", "licence"],
      requires: POS_TERMS,
      response: posFaqs[4].a,
    },
    {
      keywords: ["included", "features", "modules", "what does", "what can", "staff", "roles", "invoice", "invoices", "pdf", "ledger", "expense", "reports", "supplier", "customers"],
      requires: POS_TERMS,
      response: posFaqs[1].a,
    },
    {
      keywords: ["pharmacy", "pharmacies", "grocery", "hardware store", "garments", "boutique", "wholesale", "electronics shop", "mobile shop", "auto parts", "any business", "my business type"],
      requires: [...POS_TERMS, "shop", "store", "business", "system"],
      response: posFaqs[0].a,
    },
    {
      keywords: ["offline", "without internet", "no internet", "internet"],
      requires: POS_TERMS,
      response: posFaqs[3].a,
    },
    {
      keywords: ["ai assistant", "assistant", "ai safe", "is the ai"],
      requires: POS_TERMS,
      response: posFaqs[2].a,
    },
    {
      keywords: POS_TERMS,
      response: `We build custom POS & shop management systems: inventory with stock history, invoicing (print, PDF, WhatsApp), customer and supplier ledgers, payments, expenses, reports, staff roles and an optional AI assistant. It works offline, and it's a one-time build you own. Starter POS ${posTiers[0].price}, Business POS + AI ${posTiers[1].price}, Custom / Multi-Branch ${posTiers[2].price.toLowerCase()}. Live demo: ${POS_DEMO}. Details: /pos-system`,
    },

    // Project Rescue
    {
      keywords: PRICE_WORDS,
      requires: RESCUE_TERMS,
      response: `Project Rescue packages (a fixed quote before work starts; a Full Rebuild is priced after a quick, free review):\n${tierLines(rescueTiers)}\n\nDetails: /project-rescue#pricing`,
    },
    {
      keywords: ["free review", "scope review", "review first", "free quote"],
      requires: RESCUE_TERMS,
      response: "Yes. Project Rescue starts with an honest, free review: send us the current state of the project and you get a clear read on what's actually broken, then a fixed quote before anything starts. Get a free review: /project-rescue",
    },
    {
      keywords: ["how long", "how fast", "timeline", "turnaround", "how soon"],
      requires: RESCUE_TERMS,
      response: rescueFaqs[4].a,
    },
    {
      keywords: ["problems", "what do you fix", "kinds of", "what can you fix", "common issues"],
      requires: RESCUE_TERMS,
      response: rescueFaqs[1].a,
    },
    {
      keywords: ["full rebuild", "rebuild", "start over", "start from scratch"],
      requires: RESCUE_TERMS,
      response: rescueFaqs[2].a,
    },
    {
      keywords: RESCUE_TERMS,
      response: rescueFaqs[0].a + " Pricing: " + rescueTiers.map((t) => `${t.name} ${t.price}`).join(", ") + ". Details: /project-rescue",
    },

    // Cross-service
    {
      keywords: ["free review", "scope review"],
      response: "Yes. Project Rescue starts with an honest, free review: send us the current state of the project and you get a clear read on what's actually broken, then a fixed quote before anything starts. Get a free review: /project-rescue",
    },
    {
      keywords: ["reset", "is it safe", "is the demo safe", "real data", "real information", "sample data", "is it real"],
      requires: ["demo"],
      response: "Both demos use made-up sample data. In the chatbot demo nothing is actually booked, and there's a message limit. The POS demo resets every hour, so please don't enter real customer or business information.",
    },
    {
      keywords: ["deploy", "deployed", "deployment", "vercel", "github", "supabase"],
      response: faqs[2].a,
    },
    {
      keywords: ["live demo", "see a demo", "show me a demo", "any demo", "demos", "try the demo", "demo"],
      response: `We have two live demos. The AI chatbot demo (both the owner dashboard and the customer chat, with sample restaurant, clinic and salon businesses): /ai-chatbot#demo. The POS system demo (a battery & solar shop build, sample data, resets hourly): ${POS_DEMO}.`,
    },
    {
      keywords: ["telegram"],
      response: chatbotFaqs[7].a,
    },
    {
      keywords: ["~rag", "retrieval"],
      response: "RAG (retrieval-augmented generation) means the bot looks up the answer in your own information (menu, services, prices, policies) before it replies, so it answers from your real data instead of guessing. " + chatbotFaqs[5].a,
    },
    {
      keywords: ["speak arabic", "reply in arabic", "answer in arabic", "arabic customers", "arabic speaking", "urdu", "multilingual", "other languages", "in my language", "my language"],
      requires: ["bot", "chat", "reply", "answer", "customers", "speak"],
      response: chatbotFaqs[1].a,
    },
  );

  // FAQs, reused verbatim from lib/data.ts.
  entries.push(
    {
      keywords: ["coding knowledge", "need to code", "know how to code", "non-technical", "technical skills"],
      response: faqs[0].a,
    },
    {
      keywords: ["broken", "half built", "half-built", "already started", "stuck project", "existing project"],
      response: faqs[1].a,
    },
    {
      keywords: ["own the code", "who owns", "ownership", "my accounts", "own it afterward"],
      response: faqs[2].a,
    },
    {
      keywords: ["add more features", "add features later", "extend it", "scale it up", "future features"],
      response: faqs[3].a,
    },
    {
      keywords: ["without ai", "ai vs", "difference between", "basic bot vs", "scripted vs ai", "faq bot vs ai"],
      response: faqs[4].a,
    },
    {
      keywords: ["how fast", "delivery time", "turnaround", "how long", "timeline"],
      response: faqs[5].a,
    }
  );

  // POS-specific FAQs, reused verbatim from lib/data.ts (posFaqs), same
  // pattern as the generic faqs entries above. Kept to the 3 most likely
  // visitor questions rather than all 6, to avoid a noisy keyword list
  // that collides with the generic entries.
  entries.push(
    {
      keywords: ["solar", "battery shop", "only for", "specific business", "my type of shop", "my type of business"],
      response: posFaqs[0].a,
    },
    {
      keywords: ["work offline", "without internet", "no internet", "offline mode", "no connection"],
      response: posFaqs[3].a,
    },
    {
      keywords: ["ai assistant safe", "is the ai safe", "ai save automatically", "ai save on its own", "ai assistant work", "how does the ai"],
      response: posFaqs[2].a,
    }
  );

  // Services summary, generated from the same data the Services section uses.
  const servicesSummary = services
    .map((s) => `• ${s.title} (${s.price}) — ${s.desc}`)
    .join("\n");
  entries.push({
    keywords: ["service", "services", "what do you offer", "what do you do", "what can you build"],
    response: `Here's what we offer:\n\n${servicesSummary}\n• CV, LinkedIn & Career Documents (fixed prices from £100, by career level) — professional CV, cover letter, LinkedIn and bio writing for job seekers in KSA, UAE and the Gulf. See /cv-writing\n• Portfolio Websites (fixed £350) — a personal portfolio site that shows your work, built to go with your CV. See /cv-writing#portfolio\n\nAll prices are in GBP. Full pricing: /pricing\n\nWant details on one? Just ask.`,
  });

  // Pricing summary, generated from the same data used on /pricing and the homepage.
  const cvLowest = Math.min(...cvContent.en.packages.items.filter((p) => !p.flat).map((p) => priceRange(p).low));
  const chatbotSummary = chatbotTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  const mvpSummary = mvpTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  const posSummary = posTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  const rescueSummary = rescueTiers.map((t) => `${t.name}: ${t.price}`).join(", ");
  entries.push({
    keywords: ["price", "pricing", "cost", "how much", "rates", "budget"],
    response: `Quick pricing overview (all prices in GBP):\n• Chatbots: ${chatbotSummary}\n• SaaS MVPs: ${mvpSummary}\n• POS & Shop Management: ${posSummary}\n• Project Rescue: ${rescueSummary}\n• CV, LinkedIn & career writing: fixed prices by career level, from ${gbp(cvLowest)} (CV & Cover Letter from ${gbp(priceRange(cvById("cv-cover-letter")).low)})\n• Portfolio Website: ${pfPrice} fixed\n\nCV and portfolio prices are fixed. The others get a fixed quote before any work starts. Everything on one page: /pricing`,
  });

  // Small talk.
  entries.push({
    keywords: ["~hello", "~hi", "~hey", "good morning", "good afternoon", "~salam", "assalam"],
    response: "Hey there! Ask me about pricing, services, or timelines — happy to help.",
  });

  // "What's the process?" is one of the most common follow-ups after
  // someone asks about a specific service, so it gets its own grounded
  // entry rather than falling through to the AI every time.
  entries.push({
    keywords: [
      "process",
      "how it works",
      "how does it work",
      "how do you work",
      "what steps",
      "what happens next",
      "how do we start",
      "how do i start",
      "getting started",
    ],
    response:
      "Here's how it works:\n\n1. You tell us what you need (right here, or via the contact form).\n2. We confirm scope and send a fixed quote — no surprises later.\n3. We build it — most chatbots and MVPs are delivered within a few days to 72 hours.\n4. You get full ownership: it's deployed on your own GitHub, Vercel, and Supabase accounts.\n5. Small tweaks after launch are free for existing customers.\n\nWant to get started? Share a few details and we'll follow up.",
  });

  return entries;
}

// ---- Whole-site FAQ search (fallback) ------------------------------------------
const STOP = new Set(
  "the and for you your are does did can could will would that this with what how much many about have has from get any our can't there their them they then than into just like want need please tell know let make who why when where which also".split(" ")
);
const stem = (w: string) => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w);
const tokenize = (t: string) => normalize(t).split(" ").filter((w) => w.length > 2 && !STOP.has(w)).map(stem);

type PoolItem = { a: string; link: string; q: Set<string>; body: Set<string> };

const GROUP_LINK: Record<string, string> = {
  pricing: "/pricing",
  "ai-chatbot": "/ai-chatbot",
  "saas-mvp": "/saas-mvp",
  "pos-system": "/pos-system",
  "project-rescue": "/project-rescue",
  "cv-writing": "/cv-writing",
};

function buildPool(): PoolItem[] {
  const items: PoolItem[] = [];
  const add = (q: string, a: string, link: string) =>
    items.push({ a, link, q: new Set(tokenize(q)), body: new Set(tokenize(a)) });
  for (const g of faqGroups) for (const f of g.items) add(f.q, f.a, GROUP_LINK[g.id] ?? "/pricing");
  for (const d of demos.filter((x) => x.live)) for (const f of d.faqs) add(f.q, f.a, `/pos-system/${d.slug}`);
  for (const f of siteFacts) add(f.q, f.a, "/contact");
  return items;
}
const POOL = buildPool();

function bestPoolMatch(normalized: string): string | null {
  const qt = [...new Set(tokenize(normalized))];
  if (qt.length < 2) return null;
  let best: PoolItem | null = null;
  let bestScore = 0;
  for (const item of POOL) {
    let inQuestion = 0;
    let inAnswer = 0;
    for (const t of qt) {
      if (item.q.has(t)) inQuestion++;
      else if (item.body.has(t)) inAnswer++;
    }
    if (inQuestion < 2 || inQuestion / qt.length < 0.5) continue;
    const score = inQuestion * 3 + inAnswer;
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best ? `${best.a}\n\nMore: ${best.link}` : null;
}

const ENTRIES = buildEntries();

const LEAD_INTENT_KEYWORDS = [
  "quote",
  "hire",
  "price for my project",
  "start a project",
  "get started",
  "work with you",
  "need a developer",
  "build me",
  "custom project",
  "talk to a human",
  "talk to someone",
];

export function getFaqResponse(userMessage: string): FaqBotReply {
  const normalized = normalize(userMessage);
  const hasLeadIntent = LEAD_INTENT_KEYWORDS.some((k) => normalized.includes(k));

  for (const entry of ENTRIES) {
    if (!entry.keywords.some((k) => has(normalized, k))) continue;
    if (entry.requires && !entry.requires.some((r) => has(normalized, r))) continue;
    return { text: entry.response, suggestQuote: hasLeadIntent || Boolean(entry.suggestQuote), matched: true };
  }

  // No keyword topic matched: look across EVERY FAQ on the site (all service
  // FAQs, pricing FAQs, the POS demo FAQs and the site facts) for the closest
  // question, so anything that is written on the website can still be answered.
  const pool = bestPoolMatch(normalized);
  if (pool) {
    return { text: pool, suggestQuote: hasLeadIntent, matched: true };
  }

  // Fallback branches below: neither is a real topic match, so both are
  // matched: false. In hybrid mode this means both escalate to the AI
  // endpoint instead of showing these canned replies. In pure "faq" mode
  // (FaqChatBot.tsx) these are still shown as-is — matched is simply
  // ignored there.
  if (hasLeadIntent) {
    return {
      text: "Sounds like you're ready to start something. Want to leave a few details and we'll follow up within 24 hours?",
      suggestQuote: true,
      matched: false,
    };
  }

  return {
    text: `I didn't quite catch that. I can answer questions about prices, services, timelines, payment, our CV, LinkedIn & portfolio website service and more. For anything else, a real person will reply within 24 hours: ${CONTACT_EMAIL}, WhatsApp ${WHATSAPP_DISPLAY}, or /contact.`,
    suggestQuote: true,
    matched: false,
  };
}
