import type { DemoNicheId } from "@/lib/demo-bots";

/**
 * Industry landing pages: /ai-chatbot/for/<slug>. Each opens the live demo on that business type.
 * Add a vertical here (and a matching demo niche in lib/demo-bots.ts) and the page + sitemap entry appear.
 */
export type ChatbotVertical = {
  slug: string;
  niche: DemoNicheId;
  name: string; // "Restaurants and cafes"
  short: string; // "restaurant"
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  questions: string[]; // what customers really ask
  does: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const chatbotVerticals: ChatbotVertical[] = [
  {
    slug: "restaurants",
    niche: "restaurant",
    name: "Restaurants and cafes",
    short: "restaurant",
    metaTitle: "AI Chatbot for Restaurants & Cafes: Menu, Bookings, WhatsApp | MakeMyStore",
    metaDescription:
      "An AI chatbot for your restaurant that answers menu, allergen, opening-hours and booking questions 24/7 in any language. Try the live demo. From £120, fixed price.",
    keywords: ["AI chatbot for restaurants", "restaurant chatbot", "WhatsApp chatbot for restaurants", "menu chatbot"],
    eyebrow: "AI chatbot for restaurants and cafes",
    h1: "Stop answering the same menu questions all day",
    intro:
      "A chatbot trained on your menu, prices, opening hours and booking rules. It answers guests at any hour, in their own language, and passes table requests to you. Mark a dish out of stock in your dashboard and the bot knows instantly.",
    questions: [
      "Do you have vegan or gluten-free dishes?",
      "Is the lamb kofta available today?",
      "Can I book a table for 6 on Friday?",
      "What time do you close? Do you deliver?",
    ],
    does: [
      { title: "Always matches your menu", desc: "Switch a dish off or change a price in the dashboard and the bot's next answer is correct." },
      { title: "Takes table requests", desc: "It collects name, phone, date and party size and passes them to you." },
      { title: "Speaks your guests' language", desc: "Replies in Arabic, English, Urdu and more, whichever the guest writes in." },
    ],
    faqs: [
      {
        q: "Can the bot answer allergen questions?",
        a: "It only answers from the information you give us. If you list allergens per dish, it can repeat them. For anything it isn't sure about, it says so and offers to pass the guest to you instead of guessing.",
      },
      {
        q: "What if a dish sells out?",
        a: "With the dashboard plan you mark it out of stock yourself, from your phone, and the bot stops offering it straight away.",
      },
      {
        q: "Can it work on WhatsApp too?",
        a: "Yes, WhatsApp is available as an add-on. Meta has its own price list for WhatsApp, and we explain the current rates before you decide.",
      },
    ],
  },
  {
    slug: "clinics",
    niche: "clinic",
    name: "Clinics and dentists",
    short: "clinic",
    metaTitle: "AI Chatbot for Clinics & Dentists: Enquiries & Appointments | MakeMyStore",
    metaDescription:
      "An AI chatbot for clinics and dental practices that answers price, service and opening-hours questions 24/7 and captures appointment requests. Live demo. From £120.",
    keywords: ["AI chatbot for clinics", "dental clinic chatbot", "appointment chatbot", "medical practice chatbot"],
    eyebrow: "AI chatbot for clinics and dentists",
    h1: "Answer patient enquiries even when the front desk is closed",
    intro:
      "A chatbot trained on your services, prices, doctors' hours and policies. It handles the repeated questions, captures appointment requests, and hands anything it is unsure about to your team. It gives practical information from your content, not medical advice.",
    questions: [
      "Do you take my insurance?",
      "How much is a check-up or a whitening session?",
      "Is the doctor available on Saturday?",
      "Can I book an appointment for tomorrow?",
    ],
    does: [
      { title: "Handles the repeated questions", desc: "Prices, services, hours, location and policies, answered from your own content." },
      { title: "Captures appointment requests", desc: "Name, phone and preferred time arrive in your leads view for your team to confirm." },
      { title: "Knows its limits", desc: "It does not give diagnoses or medical advice, and it offers to pass anything unclear to you." },
    ],
    faqs: [
      {
        q: "Does the bot give medical advice?",
        a: "No. It answers practical questions from the information you provide, such as services, prices, hours and policies. For anything clinical or unclear, it says so and offers to pass the patient to your team.",
      },
      {
        q: "Where is patient data stored?",
        a: "In a private database that only your bot and your dashboard login can access. You own the data and can ask for an export or deletion. We don't claim legal compliance on your behalf, so we can tell you exactly what is stored for your own privacy notice.",
      },
      {
        q: "Can it book appointments directly into my calendar?",
        a: "Today it captures the request and sends it to you to confirm. Connecting to an existing booking system is possible but quoted separately after we check what you use.",
      },
    ],
  },
  {
    slug: "salons",
    niche: "salon",
    name: "Salons and spas",
    short: "salon",
    metaTitle: "AI Chatbot for Salons & Spas: Prices, Bookings, WhatsApp | MakeMyStore",
    metaDescription:
      "An AI chatbot for beauty salons and spas that answers price and availability questions 24/7 and captures booking requests. Try the live demo. From £120, fixed price.",
    keywords: ["AI chatbot for salons", "beauty salon chatbot", "spa booking chatbot", "WhatsApp chatbot for salons"],
    eyebrow: "AI chatbot for salons and spas",
    h1: "Turn late-night price questions into booked appointments",
    intro:
      "A chatbot trained on your treatments, prices and opening hours. It answers clients at any hour, in their language, and collects the booking details so you can confirm in the morning.",
    questions: [
      "How much is bridal makeup?",
      "Are you free on Saturday afternoon?",
      "Do you do hair and nails together?",
      "Where are you and when do you open?",
    ],
    does: [
      { title: "Answers price questions instantly", desc: "Treatment lists and prices come from your own content, so clients stop waiting for a reply." },
      { title: "Collects booking details", desc: "Treatment, preferred day and phone number arrive in your leads view." },
      { title: "Update prices yourself", desc: "With the dashboard plan, change an offer or price from your phone and the bot follows." },
    ],
    faqs: [
      {
        q: "Will it confirm appointments for me?",
        a: "It collects the request and passes it to you, and you confirm. Linking to a live booking calendar is possible but quoted separately.",
      },
      {
        q: "Can I run seasonal offers?",
        a: "Yes. With the dashboard plan you edit offers and prices yourself and the bot uses them straight away.",
      },
      {
        q: "Does it work with Instagram or my website?",
        a: "It works on your website with one small piece of code, and on WhatsApp as an add-on. Instagram is not included today.",
      },
    ],
  },
];

export const getVertical = (slug: string) => chatbotVerticals.find((v) => v.slug === slug);
