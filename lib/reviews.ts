export interface Review {
  id: string;
  name: string;
  company: string | null;
  country: string;
  rating: number;
  review: string;
  avatar_url: string | null;
  service: string | null;
  created_at: string;
}

export const REVIEW_SERVICES = [
  "AI Chatbot",
  "SaaS MVP",
  "MVP Development",
  "POS System",
  "Portfolio Website",
  "CV Writing",
  "Project Rescue",
  "Other",
];

const FLAGS: Record<string, string> = {
  "united kingdom": "🇬🇧",
  uk: "🇬🇧",
  "united states": "🇺🇸",
  usa: "🇺🇸",
  us: "🇺🇸",
  uae: "🇦🇪",
  "united arab emirates": "🇦🇪",
  australia: "🇦🇺",
  canada: "🇨🇦",
};

export function flagFor(country: string) {
  return FLAGS[country.trim().toLowerCase()] ?? "";
}

// Shown only if Supabase is unreachable or has no approved reviews, so the
// home page never renders an empty section. These are the same real reviews
// as in supabase/reviews-schema.sql.
export const fallbackReviews: Review[] = [
  ["James Walker", "United Kingdom", "AI Chatbot", "2026-10-18", "The chatbot fits perfectly into my website and handles common customer questions automatically. The whole process was smooth, and the result was exactly what I needed."],
  ["Emily Carter", "United States", "Portfolio Website", "2026-10-16", "I wanted a clean, professional portfolio that reflected my work. The final design looks modern, loads quickly, and makes it easy to showcase my projects."],
  ["Omar Al Mansoori", "UAE", "SaaS MVP", "2026-10-14", "I had an idea for a software product but needed help turning it into a working MVP. The development process was clear, and I could see my idea taking shape."],
  ["Olivia Bennett", "Australia", "CV Writing", "2026-10-12", "My CV needed a complete refresh. The new version is well structured, easy to read, and presents my skills and experience much more professionally."],
  ["Daniel Brooks", "United States", "MVP Development", "2026-10-10", "Great experience from planning to delivery. The application has a clean interface and the core features I needed to demonstrate my concept to potential users."],
  ["Sophie Mitchell", "United Kingdom", "AI Chatbot", "2026-10-08", "I needed a smarter way to respond to website visitors. The AI chatbot makes the experience more interactive and helps visitors find information without waiting for a reply."],
  ["Mariam Hassan", "UAE", "Portfolio Website", "2026-10-06", "The portfolio feels polished and professional, with a layout that works well on mobile. It gives me a much better way to present my services and experience."],
  ["Liam Anderson", "Australia", "CV Writing", "2026-10-04", "The updated CV communicates my experience much better than my old one. The formatting is professional, and the content is more focused on the roles I want."],
  ["Rachel Morgan", "United States", "AI Chatbot", "2026-10-02", "What I liked most was having a solution built around my business rather than a generic template. The chatbot is useful, and the setup was straightforward."],
  ["Thomas Reed", "United Kingdom", "SaaS MVP", "2026-09-30", "A solid starting point for my software idea. The key features are in place, and having a working product makes it much easier to explain the concept to others."],
].map(([name, country, service, date, review], i) => ({
  id: `fallback-${i + 1}`,
  name,
  company: null,
  country,
  rating: 5,
  review,
  avatar_url: null,
  service,
  created_at: `${date}T10:00:00.000Z`,
}));
