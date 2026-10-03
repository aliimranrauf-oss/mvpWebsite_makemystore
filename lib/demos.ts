import {
  Store, Package, Receipt, Users, Wrench, Recycle, BarChart3, Bot, WifiOff,
  type LucideIcon,
} from "lucide-react";

export type DemoFeature = { icon: LucideIcon; title: string; desc: string };

export type Demo = {
  /** URL slug → /pos-system/<slug>. Lowercase, hyphens only (never underscores). */
  slug: string;
  /** Short name used in cards and breadcrumbs */
  name: string;
  icon: LucideIcon;
  /** Base URL of the separate demo app (its own Vercel project + Supabase) */
  demoUrl: string;
  /** false = "coming soon": page 404s and is left out of the sitemap */
  live: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  features: DemoFeature[];
  /** Short steps telling a visitor what to try inside the demo */
  tryIt: string[];
  audience: string[];
  /** Roman Urdu paragraph shown on the page, for local searches */
  romanUrdu: { title: string; body: string };
  faqs: { q: string; a: string }[];
};

// Content here must only describe what the demo app really does.
export const demos: Demo[] = [
  {
    slug: "battery-solar-shop",
    name: "Battery & Solar Shops",
    icon: Store,
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? "https://demo.makemystore.online",
    live: true,
    metaTitle: "Battery & Solar Shop POS Software — Live Demo | MakeMyStore",
    metaDescription:
      "POS & inventory software for battery and solar shops: billing with udhaar, low-stock alerts, warranty claims, scrap trade-in. Try the free live demo.",
    keywords: [
      "car battery shop pos software",
      "battery shop inventory software",
      "battery shop management system",
      "solar shop pos",
      "battery warranty claim tracking",
      "udhaar ledger software",
      "old battery scrap software",
    ],
    eyebrow: "POS for Battery & Solar Shops",
    h1: "Battery & solar shop POS with inventory, udhaar and warranty claims",
    intro:
      "Billing, battery stock, warranty claims, charging jobs and old-battery scrap in one system. Try the real working demo below with sample data.",
    features: [
      {
        icon: Receipt,
        title: "Fast billing",
        desc: "Make a bill and take cash, card or credit (udhaar) in a few taps.",
      },
      {
        icon: Package,
        title: "Stock levels and low-stock alerts",
        desc: "See how many batteries you have and get alerted when an item runs low.",
      },
      {
        icon: Wrench,
        title: "Warranty claims and charging jobs",
        desc: "Keep track of battery warranty claims and batteries left in the shop for charging.",
      },
      {
        icon: Recycle,
        title: "Old battery (scrap) buying and selling",
        desc: "Record old batteries you buy or take in, and the scrap you sell on.",
      },
      {
        icon: Users,
        title: "Customer and supplier ledgers",
        desc: "Know what each customer owes you and what you owe each supplier.",
      },
      {
        icon: BarChart3,
        title: "Purchases, expenses and daily cash book",
        desc: "Record stock purchases and shop expenses, and check the daily cash book report.",
      },
      {
        icon: Bot,
        title: "AI assistant",
        desc: "Ask questions about your shop in plain language and get answers from your own data.",
      },
      {
        icon: WifiOff,
        title: "Works offline, installs as an app",
        desc: "Keeps working without internet and installs on your phone like a normal app.",
      },
    ],
    tryIt: [
      "Click Log in to demo. No sign-up or typing needed.",
      "Make a bill and choose cash, card or udhaar.",
      "Check battery stock and low-stock alerts.",
      "Open warranty claims, charging jobs and scrap.",
      "Ask the AI assistant a question about the shop.",
    ],
    audience: [
      "Car battery shops",
      "Battery and solar retailers",
      "Shops that sell on udhaar",
      "Shops that buy or take in old batteries",
    ],
    romanUrdu: {
      title: "Roman Urdu mein",
      body: "Battery aur solar dukan ke liye POS aur inventory software: bill, stock, udhaar, warranty claim, charging jobs aur purani battery (scrap) ka record ek hi app mein. Internet na ho tab bhi chalta hai aur phone mein app ki tarah install hota hai. Neeche live demo khud try karein: Log in to demo dabayein aur dekhein.",
    },
    faqs: [
      {
        q: "Does it track old batteries and scrap?",
        a: "Yes. The demo includes old battery (scrap) buying and selling, so you can record batteries you take in and the scrap you sell on.",
      },
      {
        q: "Can it track warranty claims and charging jobs?",
        a: "Yes. Warranty claims and charging jobs are both part of the demo.",
      },
      {
        q: "Can I sell on credit (udhaar)?",
        a: "Yes. Bills can be cash, card or credit, and customer ledgers show what each customer still owes.",
      },
      {
        q: "Does it work without internet?",
        a: "Yes. It works offline and can be installed as an app on your phone.",
      },
      {
        q: "Is the demo safe to try? Will my data be kept?",
        a: "The demo uses sample data only and resets every hour. Please don't enter real customer or business information.",
      },
      {
        q: "Is this only for battery and solar shops?",
        a: "No. This is one example build. The same approach is used for grocery stores, pharmacies, mobile shops and any other business, with the features you choose.",
      },
      {
        q: "Can it be customised for my shop?",
        a: "Yes. The demo is a working example. We rebuild the items, fields and reports around what you actually sell, and the source code and database are yours.",
      },
    ],
  },
  // To add a vertical later: copy the object above, change the fields, and set live: true
  // once its demo app is ready. The page, metadata, JSON-LD and sitemap update themselves.
];

export const liveDemos = demos.filter((d) => d.live);
export const getDemo = (slug: string) => demos.find((d) => d.slug === slug && d.live);
