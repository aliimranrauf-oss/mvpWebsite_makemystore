import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CvPage from "@/components/CvPage";
import { cvPackages, cvFaqs } from "@/lib/cv-data";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const TITLE = "Professional CV, LinkedIn & Cover Letter Writing for KSA, UAE & the Gulf — MakeMyStore";
const DESC =
  "ATS-friendly CV writing, free cover letter, LinkedIn optimisation and professional biographies for job seekers in Saudi Arabia, the UAE and the GCC. From £40, 11 months free revisions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "CV writing service Saudi Arabia",
    "CV writing service UAE",
    "CV writing Dubai",
    "CV writing Riyadh",
    "professional resume writer Gulf",
    "LinkedIn profile writing",
    "ATS friendly CV",
    "cover letter writing",
    "academic CV writing",
    "professional biography writing",
    "كتابة السيرة الذاتية",
    "كتابة سيرة ذاتية السعودية",
  ],
  alternates: { canonical: `${SITE_URL}/cv-writing` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/cv-writing`, type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

export default function CvWritingPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cvFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${SITE_NAME} CV & LinkedIn Writing`,
      url: `${SITE_URL}/cv-writing`,
      description: DESC,
      availableLanguage: ["English", "Arabic"],
      areaServed: [
        "Saudi Arabia",
        "United Arab Emirates",
        "Qatar",
        "Kuwait",
        "Bahrain",
        "Oman",
      ].map((n) => ({ "@type": "Country", name: n })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CV & Career Document Packages",
        itemListElement: cvPackages.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.name, description: p.tagline },
        })),
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <CvPage />
      </main>
      <Footer />
    </>
  );
}
