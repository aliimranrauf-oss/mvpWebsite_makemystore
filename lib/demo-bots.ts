// Sample businesses for the live demo on /ai-chatbot.
// These are FICTIONAL businesses — the demo shows prospects what a bot built
// for their own business would feel like. Edit freely.

export type DemoNicheId = "clinic" | "restaurant" | "salon";

export type DemoNiche = {
  id: DemoNicheId;
  label: string;
  businessName: string;
  greeting: string;
  suggestions: string[];
  knowledge: string;
};

export const DEMO_NICHES: DemoNiche[] = [
  {
    id: "clinic",
    label: "Dental clinic",
    businessName: "BrightSmile Dental (sample)",
    greeting:
      "Hi! I'm the BrightSmile Dental assistant. Ask me about treatments, prices or booking — in any language.",
    suggestions: ["How much is teeth whitening?", "Are you open on Fridays?", "كم سعر تنظيف الأسنان؟"],
    knowledge: `Business: BrightSmile Dental, a family dental clinic (SAMPLE business for a demo).
Hours: Sat–Thu 9:00–21:00. Friday 14:00–20:00. Emergency line 24/7.
Treatments & prices: Check-up and cleaning 150 AED; whitening 800 AED; filling from 250 AED; braces consultation free; root canal from 900 AED; emergency visit 200 AED.
Insurance: accepts most major insurance; direct billing with Daman and Thiqa.
Booking: ask for name, preferred day/time and phone number, then say the team will confirm by WhatsApp within an hour.
Location: Dubai, Jumeirah Lake Towers. Parking available. Languages: English, Arabic, Urdu, Hindi.`,
  },
  {
    id: "restaurant",
    label: "Restaurant",
    businessName: "Olive & Ember (sample)",
    greeting:
      "Welcome to Olive & Ember! Ask about the menu, opening hours or reserving a table — in any language.",
    suggestions: ["Do you have vegetarian dishes?", "Can I book a table for 6?", "Do you deliver?"],
    knowledge: `Business: Olive & Ember, a Mediterranean restaurant (SAMPLE business for a demo).
Hours: daily 12:00–23:30.
Menu highlights: grilled chicken souvlaki 48; lamb kofta 62; mezze platter for two 85; falafel bowl (vegan) 38; mushroom risotto (vegetarian) 52; baklava 24. Prices in AED.
Dietary: vegan, vegetarian and gluten-free options marked on the menu. Halal certified.
Reservations: tables for 1–10 guests; ask for name, date, time, party size and phone, then say the team will confirm. Groups over 10 need a call.
Delivery: yes, within 8 km, 30–45 minutes, free over 100 AED.`,
  },
  {
    id: "salon",
    label: "Beauty salon",
    businessName: "Glow Studio (sample)",
    greeting:
      "Hello! I'm the Glow Studio assistant. Ask about services, prices or booking — in any language.",
    suggestions: ["How much is a haircut and colour?", "Do you do bridal makeup?", "What time do you close?"],
    knowledge: `Business: Glow Studio, a women's beauty salon (SAMPLE business for a demo).
Hours: daily 10:00–21:00.
Services & prices (AED): haircut 90; colour from 250; keratin treatment from 450; manicure 70; pedicure 90; facial 180; bridal makeup from 900 (trial included); henna from 150.
Booking: ask for name, service, preferred day/time and phone; then say the team will confirm by WhatsApp. Bridal bookings need 2 weeks' notice.
Cancellation: free up to 12 hours before the appointment.`,
  },
];

export function getNiche(id: unknown): DemoNiche {
  return DEMO_NICHES.find((n) => n.id === id) ?? DEMO_NICHES[0];
}
