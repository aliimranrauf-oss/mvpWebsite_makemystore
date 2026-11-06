import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import Benefits from "@/components/Benefits";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import ReviewsSection from "@/components/ReviewsSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { allFaqItems } from "@/lib/faq-groups";
import { getApprovedReviews } from "@/lib/get-reviews";
import { aggregateRatingFrom, reviewsJsonLd } from "@/lib/seo";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/constants";

const HOME_TITLE = "MakeMyStore: Google Business Profile, Website & AI Chatbot Setup";
const HOME_DESC =
  "We set up your Google Business Profile, build your website or online store, and add an AI chatbot for your website and WhatsApp. Fixed packages in GBP, you own everything.";

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
  { name: "Google Business Profile Setup", path: "/business-setup", desc: "Get found on Google Search and Maps with a properly set up business listing in your own account." },
  { name: "Business Website or Online Store", path: "/business-setup", desc: "A fast website for services or an ecommerce store for sellers, with WhatsApp ordering." },
  { name: "AI Chatbot Development", path: "/ai-chatbot", desc: "Custom AI chatbots trained on your data for your website, WhatsApp, or Telegram." },
  { name: "POS & Shop Management System (add-on)", path: "/pos-system", desc: "Optional POS with inventory, invoicing, customers, payments, and reports for shops." },
];


// Refetch approved reviews at most every 60s so new ones show without a redeploy.
export const revalidate = 60;

export default async function Home() {
  const reviews = await getApprovedReviews();
  const aggregateRating = aggregateRatingFrom(reviews);

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
    ...(aggregateRating
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${SITE_URL}/#organization`,
            aggregateRating,
            review: reviewsJsonLd(reviews),
          },
        ]
      : []),
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
        <ReviewsSection
          reviews={reviews.slice(0, 9)}
          total={reviews.length}
          average={aggregateRating ? String(aggregateRating.ratingValue) : "5.0"}
        />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
