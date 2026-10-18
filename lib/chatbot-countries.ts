/**
 * Country landing pages for the AI chatbot service: /ai-chatbot/<slug>.
 *
 * Each country has its own copy, channels, industries, privacy-law notes, FAQs
 * and local-currency price guide, so the pages are genuinely different (not the
 * same text with the country name swapped).
 *
 * PRICES: all business prices are in GBP (see chatbotTiers in lib/data.ts). The
 * USD / AUD / AED figures below are approximate guides at rough October 2026
 * rates (about $1.35, A$1.90 and AED 4.95 to the pound) and are labelled
 * "approx." on the page. Update them here if rates move a lot.
 *
 * PRIVACY COPY: describes what the law covers and how the bot is designed. It
 * deliberately does NOT claim legal compliance on the client's behalf.
 */

export type CountrySlug = "uk" | "usa" | "australia" | "uae";

export type CountryPage = {
  slug: CountrySlug;
  /** Name used in schema.org areaServed. */
  schemaCountry: string;
  /** Short label for headings and links, e.g. "UK". */
  label: string;
  /** hreflang code. */
  hreflang: string;
  ogLocale: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  channelsHeading: string;
  channelsIntro: string;
  channels: { title: string; desc: string }[];
  industriesHeading: string;
  industries: { title: string; ask: string }[];
  /** Price guide shown next to each tier, keyed by chatbotTiers slug. */
  currencyName: string;
  tierPrices: Record<"basic-faq-bot" | "ai-bot" | "ai-bot-dashboard", string>;
  addonNote: string;
  priceNote: string;
  privacy: {
    heading: string;
    law: string;
    intro: string;
    points: string[];
  };
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  availableLanguage: string[];
};

export const chatbotCountries: CountryPage[] = [
  {
    slug: "uk",
    schemaCountry: "United Kingdom",
    label: "UK",
    hreflang: "en-GB",
    ogLocale: "en_GB",
    metaTitle: "AI Chatbot Development for UK Businesses — MakeMyStore",
    metaDescription:
      "Custom AI chatbot for UK businesses, on your website and WhatsApp. Answers enquiries out of hours, books leads, built around UK GDPR. Fixed price from £120.",
    keywords: [
      "AI chatbot for UK businesses",
      "WhatsApp chatbot UK",
      "AI chatbot developer UK",
      "chatbot for dental practice UK",
      "chatbot for letting agents",
      "website chatbot UK small business",
      "UK GDPR chatbot",
    ],
    eyebrow: "AI Chatbots for UK Businesses",
    h1: "An AI chatbot for your UK business that answers enquiries while you're closed",
    intro:
      "A chatbot trained on your own services, prices and policies. It replies on your website and on WhatsApp, collects names and numbers, and hands every lead to you. Built for UK small businesses, with data handling designed around UK GDPR. Fixed price, agreed before we start.",
    channelsHeading: "Where your UK customers will talk to it",
    channelsIntro:
      "Most UK enquiries arrive in the evening, at weekends or on bank holidays, exactly when nobody is at the desk.",
    channels: [
      {
        title: "Website chat",
        desc: "A branded chat widget that works on WordPress, Shopify, Wix, Squarespace, Webflow or a custom site. Visitors get an instant answer instead of leaving for a competitor.",
      },
      {
        title: "WhatsApp Business",
        desc: "Many UK customers already message businesses on WhatsApp. We connect your bot to your WhatsApp number (+£95), so it answers there too and passes anything tricky to you.",
      },
      {
        title: "Out-of-hours lead capture",
        desc: "Evenings, Sundays and bank holidays: the bot answers, takes the customer's name, number and what they need, and you have a list of warm leads in the morning.",
      },
    ],
    industriesHeading: "Typical UK use cases",
    industries: [
      { title: "Dental and private clinics", ask: "“Are you taking on new patients? Do you do Saturday appointments?”" },
      { title: "Letting and estate agents", ask: "“Is the two-bed near the station still available? Can I view on Thursday?”" },
      { title: "Takeaways and restaurants", ask: "“Is everything halal? Do you deliver to my postcode?”" },
      { title: "Hair, beauty and barbers", ask: "“How much is a gel manicure? Any slots after work?”" },
      { title: "Plumbers, electricians and trades", ask: "“Can someone come out today? Is there a call-out charge?”" },
      { title: "Independent online shops", ask: "“Where's my parcel? What's your returns policy?”" },
    ],
    currencyName: "GBP",
    tierPrices: {
      "basic-faq-bot": "£120–£200",
      "ai-bot": "£480–£950",
      "ai-bot-dashboard": "from £950",
    },
    addonNote: "WhatsApp connection: +£95.",
    priceNote:
      "Prices are in pounds sterling. You get a fixed quote before anything starts, with no surprises later.",
    privacy: {
      heading: "Privacy and UK GDPR",
      law: "UK GDPR and the Data Protection Act 2018",
      intro:
        "If a chatbot collects customer details, UK data protection law applies to how you handle them. We design the bot to keep that simple. This is general information, not legal advice.",
      points: [
        "The bot answers only from the business information you give us, and says when it isn't sure instead of guessing.",
        "It collects only what you need, usually name, phone or email and the enquiry. The lead data is yours.",
        "Your privacy notice should mention the chatbot. We'll tell you what to add so you can check it with your own adviser.",
        "Cookie and marketing consent across your wider website is still covered by PECR. We'll flag anything the chat widget stores.",
      ],
    },
    faqs: [
      {
        q: "Can the chatbot answer on WhatsApp for my UK business?",
        a: "Yes. Every bot includes the website chat widget, and a WhatsApp connection is an add-on (+£95). Customers message your number and the bot replies using your information, and passes anything it can't answer to you. WhatsApp's own messaging charges may apply, and we explain those in your quote.",
      },
      {
        q: "Is the chatbot UK GDPR compliant?",
        a: "Compliance depends on how your business uses the bot, so we can't promise it on your behalf. What we do is keep data collection minimal, make the bot answer only from information you supply, and tell you what to cover in your privacy notice. For sector-specific questions, check the ICO's guidance or a data protection adviser.",
      },
      {
        q: "How much does an AI chatbot cost in pounds?",
        a: "Basic FAQ bots start at £120, AI bots run £480 to £950, and AI Bot + Dashboard starts at £950. Optional care plans are £25 to £65 a month. The fixed quote you receive before we start is what counts.",
      },
      {
        q: "Can I change opening hours for bank holidays myself?",
        a: "Yes, with the AI Bot + Dashboard package. You log in to a private dashboard on your phone or computer, change your hours, prices or stock, and the bot uses the new information straight away.",
      },
      {
        q: "Does it reply to customers who don't write in English?",
        a: "Yes. The AI Bot replies in the language the customer writes in and switches if they do. That is useful in areas with Urdu, Arabic, Polish or other community languages alongside English.",
      },
    ],
    ctaTitle: "Ready to stop missing enquiries?",
    ctaText: "Tell us what your customers ask and we'll send a fixed quote back within 24 hours.",
    availableLanguage: ["English"],
  },

  {
    slug: "usa",
    schemaCountry: "United States",
    label: "USA",
    hreflang: "en-US",
    ogLocale: "en_US",
    metaTitle: "AI Chatbot Development for US Businesses — MakeMyStore",
    metaDescription:
      "Custom AI chatbot for US small businesses: instant answers on your website, lead and appointment capture, optional WhatsApp and text follow-up. Fixed price from about $160 (£120).",
    keywords: [
      "AI chatbot for small business",
      "custom AI chatbot developer USA",
      "website chatbot for lead capture",
      "chatbot for med spa",
      "chatbot for home services",
      "AI chatbot for real estate agents",
      "CCPA chatbot",
    ],
    eyebrow: "AI Chatbots for US Businesses",
    h1: "An AI chatbot for your US business that turns website visitors into booked appointments",
    intro:
      "A chatbot trained on your services, pricing and policies. It answers visitors instantly, captures leads and appointment requests, and can follow up on WhatsApp. Priced in pounds sterling with a dollar guide, quoted before we start, and your content stays yours.",
    channelsHeading: "How US businesses use it",
    channelsIntro:
      "In the US the website is usually the first stop, so the focus is on turning a visit into a lead before the visitor clicks away.",
    channels: [
      {
        title: "Website chat and lead capture",
        desc: "The bot answers questions about services, pricing and availability, then collects name, phone, email, the service wanted and a preferred time, and sends it all to you.",
      },
      {
        title: "Text (SMS) follow-up, on request",
        desc: "Texting customers is available as a custom add-on, quoted after we check your provider. US rules (TCPA and carrier registration) require customer consent, so we set it up carefully rather than as a default.",
      },
      {
        title: "English and Spanish",
        desc: "The AI Bot replies in the language the visitor writes in, including Spanish and English, and switches mid-conversation. A WhatsApp connection (+£95, about $130) is available for customers who prefer it.",
      },
    ],
    industriesHeading: "Typical US use cases",
    industries: [
      { title: "Dental offices and med spas", ask: "“Do you take my insurance? What's the soonest appointment?”" },
      { title: "HVAC, plumbing and roofing", ask: "“Can you come out today? Do you give free estimates?”" },
      { title: "Real estate agents", ask: "“Is the listing on Oak Street still available? Can I tour it Saturday?”" },
      { title: "Restaurants and cafes", ask: "“Are you open Sundays? Do you have gluten-free options?”" },
      { title: "Law and accounting firms", ask: "“Do you take this kind of case? Is the first consultation free?”" },
      { title: "Online stores", ask: "“Where's my order? Can I return this after 30 days?”" },
    ],
    currencyName: "USD",
    tierPrices: {
      "basic-faq-bot": "approx. $160–$270",
      "ai-bot": "approx. $650–$1,300",
      "ai-bot-dashboard": "from approx. $1,300",
    },
    addonNote: "WhatsApp connection: +£95 (about $130). Text (SMS) follow-up is quoted separately.",
    priceNote:
      "Our prices are set in pounds sterling. The dollar figures are a rough guide at recent exchange rates and will move a little. You get a fixed quote before anything starts.",
    privacy: {
      heading: "Privacy, CCPA and texting rules",
      law: "CCPA/CPRA and state privacy laws",
      intro:
        "US privacy rules vary by state and by the kind of business. Here is how we approach it. This is general information, not legal advice.",
      points: [
        "California's CCPA/CPRA and a growing list of state laws can apply depending on your size and the data you collect. We keep collection minimal and tell you what to mention in your privacy policy.",
        "We design the bot to ask for contact details and the enquiry only, not sensitive data like Social Security numbers or card numbers.",
        "Healthcare: the standard bot is built for general questions and appointment requests, not for handling patient health information. If you are a HIPAA covered entity, tell us before ordering so we can scope it properly.",
        "Text messages need prior consent under the TCPA. We only add SMS when it is set up with that consent in mind.",
      ],
    },
    faqs: [
      {
        q: "Can the chatbot send text messages to my customers?",
        a: "Not by default. Every bot includes website chat, and WhatsApp is available as an add-on (+£95, about $130). Text (SMS) follow-up can be built as a custom add-on, quoted separately once we know which provider you use. US texting rules require customer consent, so we set it up with that in mind.",
      },
      {
        q: "Is the chatbot HIPAA compliant?",
        a: "The standard packages are built for general enquiries and booking requests, not for collecting or storing protected health information. If you are a covered entity, tell us before ordering. A bot that touches patient information needs extra safeguards and agreements beyond our standard packages.",
      },
      {
        q: "Will it connect to Calendly, Square or my CRM?",
        a: "Out of the box, the bot collects booking and enquiry details and passes them to you. Connecting to tools like Square, Calendly or a CRM is possible and quoted separately after we check what you use.",
      },
      {
        q: "How much does an AI chatbot cost?",
        a: "Prices are set in pounds sterling. Basic FAQ bots start at £120 (about $160), AI bots run £480 to £950 (about $650 to $1,300), and AI Bot + Dashboard starts at £950 (about $1,300). Optional care plans are £25 to £65 a month. Dollar figures move with exchange rates. You get a fixed quote before anything starts.",
      },
      {
        q: "Can it talk to Spanish-speaking customers?",
        a: "Yes. The AI Bot replies in the language the customer writes in, including Spanish, and switches back if they do. Try the live demo on the main chatbot page and type in any language.",
      },
    ],
    ctaTitle: "Want more leads from the visitors you already have?",
    ctaText: "Tell us what customers ask and we'll send a fixed quote back within 24 hours.",
    availableLanguage: ["English", "Spanish"],
  },

  {
    slug: "australia",
    schemaCountry: "Australia",
    label: "Australia",
    hreflang: "en-AU",
    ogLocale: "en_AU",
    metaTitle: "AI Chatbot Development for Australian Businesses — MakeMyStore",
    metaDescription:
      "Custom AI chatbot for Australian businesses. Answers customers on your website around the clock, captures leads and bookings, optional WhatsApp. Fixed price from about A$230.",
    keywords: [
      "AI chatbot for Australian businesses",
      "AI chatbot developer Australia",
      "chatbot for tradies",
      "website chatbot for small business Australia",
      "chatbot for physio clinics",
      "chatbot for real estate agencies Australia",
      "Privacy Act chatbot",
    ],
    eyebrow: "AI Chatbots for Australian Businesses",
    h1: "An AI chatbot for your Australian business that answers when you're on the job",
    intro:
      "A chatbot trained on your own services, prices and policies. It answers customers on your website around the clock, takes name, number and job or booking details, and passes every lead to you. Fixed price, quoted before we start.",
    channelsHeading: "Built for how Australian businesses work",
    channelsIntro:
      "If you're on a roof, with a patient or behind the counter, you can't answer every message. The bot can.",
    channels: [
      {
        title: "Website chat that never clocks off",
        desc: "Australia spans three mainland time zones, with daylight saving in some states, so \"after hours\" keeps moving. The bot answers whenever the customer writes, in any state.",
      },
      {
        title: "Lead capture for tradies and clinics",
        desc: "It collects name, number, suburb and what the customer needs, then sends the details to you, so you can ring back at a sensible time instead of losing the job.",
      },
      {
        title: "Optional WhatsApp",
        desc: "If your customers use it, a WhatsApp connection is available (+£95, about A$180). Every bot includes the website widget as standard.",
      },
    ],
    industriesHeading: "Typical Australian use cases",
    industries: [
      { title: "Plumbers, electricians and landscapers", ask: "“Can someone come out this arvo? Is there a call-out fee?”" },
      { title: "Physios, dentists and allied health", ask: "“Do you have HICAPS? Is there a gap fee?”" },
      { title: "Cafes and restaurants", ask: "“Is there a vegan option? Can I book for 8 on Friday?”" },
      { title: "Real estate agencies", ask: "“Is the 3-bedder still available? What time is the inspection?”" },
      { title: "Vets and pet services", ask: "“Do you take emergencies? How much is a puppy vaccination?”" },
      { title: "Online shops and local retailers", ask: "“Do you ship to WA? How long does delivery take?”" },
    ],
    currencyName: "AUD",
    tierPrices: {
      "basic-faq-bot": "approx. A$230–$380",
      "ai-bot": "approx. A$910–$1,800",
      "ai-bot-dashboard": "from approx. A$1,800",
    },
    addonNote: "WhatsApp connection: +£95 (about A$180).",
    priceNote:
      "Our prices are set in pounds sterling. The Australian dollar figures are a rough guide at recent exchange rates and will move a little. You get a fixed quote before anything starts.",
    privacy: {
      heading: "Privacy Act and the Australian Privacy Principles",
      law: "Privacy Act 1988 and the Australian Privacy Principles (APPs)",
      intro:
        "The Privacy Act applies to many Australian businesses, including every health service provider regardless of size. A small-business exemption exists but has exceptions. This is general information, not legal advice.",
      points: [
        "The APPs expect you to tell people what you collect and why. We'll note what to add to your privacy policy for the chatbot.",
        "We keep collection minimal: usually name, phone or email and the enquiry. The lead data is yours.",
        "The bot answers only from the business information you provide, and says when it isn't sure instead of guessing.",
        "If you send follow-up marketing messages to people who contact you, the Spam Act 2003 requires their consent. We can help you keep the chatbot setup consistent with that.",
      ],
    },
    faqs: [
      {
        q: "Will it work for tradies who can't answer the phone on the job?",
        a: "That's one of the best uses. The bot answers questions about your services, areas and pricing, then collects the customer's name, number, suburb and job details and sends them to you. You call back when you're off the tools instead of losing the lead.",
      },
      {
        q: "How much does an AI chatbot cost in Australian dollars?",
        a: "Pricing is set in pounds sterling: Basic FAQ bots from £120, AI bots from £480 and the dashboard version from £950. At recent exchange rates that is roughly A$230, A$910 and A$1,800. Rates move, so treat the AUD figures as a guide. The fixed quote you receive before we start is what counts.",
      },
      {
        q: "Does the Privacy Act apply to my business?",
        a: "It applies to many Australian businesses, including all health service providers. Small businesses under a turnover threshold can be exempt, with exceptions, so check with a privacy adviser or the OAIC's guidance. Either way, we keep data collection minimal and tell you what to mention in your privacy policy.",
      },
      {
        q: "Can it take bookings for my clinic or cafe?",
        a: "It collects booking requests, including name, contact details and preferred time, and passes them to you. Connecting directly to a booking system is possible and quoted separately after we check what you use.",
      },
    ],
    ctaTitle: "Stop losing jobs and bookings to missed messages",
    ctaText: "Tell us what customers ask and we'll send a fixed quote back within 24 hours.",
    availableLanguage: ["English"],
  },

  {
    slug: "uae",
    schemaCountry: "United Arab Emirates",
    label: "UAE",
    hreflang: "en-AE",
    ogLocale: "en_GB",
    metaTitle: "Arabic & English AI Chatbot for UAE Businesses — MakeMyStore",
    metaDescription:
      "Custom AI chatbot for UAE businesses that replies in Arabic and English on WhatsApp and your website. Trained on your menu, services and prices. Fixed price from about AED 600.",
    keywords: [
      "Arabic AI chatbot UAE",
      "WhatsApp chatbot Dubai",
      "AI chatbot for UAE businesses",
      "Arabic English chatbot",
      "chatbot for real estate Dubai",
      "chatbot for clinics Dubai",
      "AI chatbot developer UAE",
    ],
    eyebrow: "AI Chatbots for UAE Businesses",
    h1: "Arabic and English AI chatbots for UAE businesses, on WhatsApp and your website",
    intro:
      "A chatbot trained on your own menu, services and prices. It replies in Arabic or English, whichever your customer writes in, on WhatsApp and on your website. It captures bookings and enquiries and hands them to you. Fixed price, quoted before we start.",
    channelsHeading: "Where your UAE customers will talk to it",
    channelsIntro:
      "In the UAE, customers expect fast replies, in their own language, on the app they already use.",
    channels: [
      {
        title: "WhatsApp first",
        desc: "WhatsApp is a main way people contact businesses across the UAE. The WhatsApp connection (+£95, about AED 470) puts your bot where customers already are, with the website widget alongside it.",
      },
      {
        title: "Arabic, English and more in one bot",
        desc: "The AI Bot replies in the language the customer uses and switches mid-chat. It also handles Urdu, Hindi and other languages common among UAE residents, so one bot serves your whole customer base.",
      },
      {
        title: "Update hours and offers yourself",
        desc: "With the dashboard package you change prices, stock, Ramadan opening hours and Eid offers yourself from your phone, and the bot uses the new information immediately.",
      },
    ],
    industriesHeading: "Typical UAE use cases",
    industries: [
      { title: "Clinics and dental centres", ask: "“هل لديكم موعد اليوم؟ / Do you have an appointment today?”" },
      { title: "Real estate brokers", ask: "“Is the 1-bed in the Marina still available? Can I view tomorrow?”" },
      { title: "Restaurants and cafes", ask: "“Do you have a table for 6 tonight? Is there outdoor seating?”" },
      { title: "Salons and spas", ask: "“How much is a keratin treatment? Do you offer home service?”" },
      { title: "Car rental and auto services", ask: "“What's the deposit? Can you deliver to the airport?”" },
      { title: "Gyms and wellness studios", ask: "“What are the membership prices? Do you have ladies-only classes?”" },
    ],
    currencyName: "AED",
    tierPrices: {
      "basic-faq-bot": "approx. AED 600–1,000",
      "ai-bot": "approx. AED 2,400–4,700",
      "ai-bot-dashboard": "from approx. AED 4,700",
    },
    addonNote: "WhatsApp connection: +£95 (about AED 470).",
    priceNote:
      "Our prices are set in pounds sterling. The dirham figures use a recent rate of about 4.95 dirhams to the pound, rounded, and will move a little. You get a fixed quote before anything starts.",
    privacy: {
      heading: "Privacy and the UAE PDPL",
      law: "UAE Federal Decree-Law No. 45 of 2021 (PDPL)",
      intro:
        "The UAE's federal personal data protection law can apply when your chatbot collects customer details. Free zones such as DIFC and ADGM have their own data regimes. This is general information, not legal advice.",
      points: [
        "If you operate from a free zone, tell us so we can note which rules apply to your business.",
        "We keep collection minimal: usually name, phone and the enquiry. The lead data is yours.",
        "The bot answers only from the business information you provide, and says when it isn't sure instead of guessing.",
        "WhatsApp's business policy requires customers to have opted in before you send them outbound messages, and we set the bot up around that.",
      ],
    },
    faqs: [
      {
        q: "Can the chatbot reply in Arabic and English on WhatsApp?",
        a: "Yes. The AI Bot replies in whichever language the customer writes in, including Arabic and English, and switches when they do. The WhatsApp connection is an add-on (+£95, about AED 470). WhatsApp's own messaging charges may apply, and we explain those in your quote.",
      },
      {
        q: "How much does an AI chatbot cost in dirhams?",
        a: "Pricing is set in pounds sterling: Basic FAQ bots from £120, AI bots from £480 and the dashboard version from £950. At about 4.95 dirhams to the pound, that is roughly AED 600, AED 2,400 and AED 4,700. You get a fixed quote before anything starts.",
      },
      {
        q: "Can I change Ramadan hours and offers myself?",
        a: "Yes, with the AI Bot + Dashboard package. You log in to a private dashboard from your phone, change hours, prices, stock or offers, and the bot uses them straight away. No need to call us for each change.",
      },
      {
        q: "Does the chatbot comply with the UAE PDPL?",
        a: "Compliance depends on how your business uses it, so we can't promise it on your behalf. We keep data collection minimal, make the bot answer only from information you supply, and tell you what to mention in your privacy notice. Check with a legal adviser for your sector, especially if you operate in DIFC or ADGM.",
      },
      {
        q: "Do you work with businesses in Dubai, Abu Dhabi and Sharjah?",
        a: "Yes. We work with businesses across the UAE remotely: you send us your menu, services and prices, we build and test the bot, show you a preview, and put it live on your website and WhatsApp.",
      },
    ],
    ctaTitle: "Ready to answer every customer, in their language?",
    ctaText: "Tell us what your customers ask and we'll send a fixed quote back within 24 hours.",
    availableLanguage: ["English", "Arabic"],
  },
];

export const getCountry = (slug: string) => chatbotCountries.find((c) => c.slug === slug);

/** hreflang map shared by the main /ai-chatbot page and every country page. */
export function chatbotHreflang(siteUrl: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const c of chatbotCountries) map[c.hreflang] = `${siteUrl}/ai-chatbot/${c.slug}`;
  map["x-default"] = `${siteUrl}/ai-chatbot`;
  return map;
}
