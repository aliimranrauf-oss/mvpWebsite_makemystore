import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import Benefits from "@/components/Benefits";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { allFaqItems } from "@/lib/faq-groups";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/constants";

const HOME_TITLE = "MakeMyStore: Custom AI Chatbots, SaaS MVPs & POS Systems";
const HOME_DESC =
  "Hire a developer for a custom AI chatbot, SaaS MVP, or POS & inventory system on Next.js and Supabase. Serving clients in the US, UK, Europe, Australia & UAE. Prices in GBP, fixed quotes, you own the code.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESC,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESC,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const services = [
  { name: "AI Chatbot Development", path: "/ai-chatbot", desc: "Custom AI chatbots trained on your data for your website, WhatsApp, or Telegram." },
  { name: "SaaS MVP Development", path: "/saas-mvp", desc: "A working SaaS product on Next.js and Supabase with accounts, database, and optional AI." },
  { name: "POS & Shop Management System", path: "/pos-system", desc: "Custom POS with inventory, invoicing, customers, payments, reports, and an AI assistant." },
  { name: "Project Rescue", path: "/project-rescue", desc: "Fix and deploy stuck projects from Lovable, Bolt, and other AI builders." },
  { name: "CV, LinkedIn & Career Writing", path: "/cv-writing", desc: "ATS-ready CVs, cover letters, LinkedIn profiles, biographies and portfolio websites at fixed prices." },
];


export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MakeMyStore services",
      itemListElement: services.map((sv, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: sv.name,
          description: sv.desc,
          url: `${SITE_URL}${sv.path}`,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <Hero />
        <ServiceCards />
        <Benefits />
        <TechStack />
        <Pricing />
        <HowItWorks />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
