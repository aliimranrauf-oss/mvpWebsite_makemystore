// All search-engine settings for /cv-writing (English) and /cv-writing/ar (Arabic).
// Edit titles, descriptions and keywords here, in one place.

import type { Metadata } from "next";
import { content, priceRange, type Lang } from "@/lib/cv-data";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/seo";

export const CV_PATH: Record<Lang, string> = { en: "/cv-writing", ar: "/cv-writing/ar" };

// Page-specific share image (WhatsApp, LinkedIn, X) instead of the generic site image.
const OG_IMAGE: Record<Lang, { url: string; width: number; height: number; alt: string }> = {
  en: {
    url: "/images/hero/cv-writing.png",
    width: 1586,
    height: 992,
    alt: "Professional CV writing for Dubai, Abu Dhabi and Saudi Arabia",
  },
  ar: {
    url: "/images/hero/cv-writing.png",
    width: 1586,
    height: 992,
    alt: "كتابة السيرة الذاتية لدبي وأبوظبي والسعودية",
  },
};

const SEO = {
  en: {
    // 59 characters: fits Google's title width without being cut off.
    title: "CV Writing in Dubai, Abu Dhabi & Saudi Arabia | MakeMyStore",
    // 146 characters: fits Google's description width.
    description:
      "Professional CV writing for Dubai, Abu Dhabi, Riyadh & the Gulf. ATS-friendly CV, free cover letter, LinkedIn & portfolio. Fixed prices from £100.",
    // Google ignores the keywords tag; kept short for other engines only.
    keywords: [
      "CV writing Dubai",
      "CV writing service Abu Dhabi",
      "CV writing service Saudi Arabia",
      "CV writing Riyadh",
      "CV writing Jeddah",
      "CV writing service UAE",
      "professional CV writer Gulf",
      "ATS friendly CV",
      "LinkedIn profile writing",
      "cover letter writing",
    ],
    locale: "en_GB",
    home: "Home",
    page: "CV & LinkedIn Writing",
  },
  ar: {
    title: "كتابة السيرة الذاتية في دبي وأبوظبي والسعودية | MakeMyStore",
    description:
      "كتابة سيرة ذاتية احترافية لدبي وأبوظبي والرياض ودول الخليج. سيرة متوافقة مع ATS وخطاب تقديم مجاني وLinkedIn. أسعار ثابتة من £100.",
    keywords: [
      "كتابة السيرة الذاتية دبي",
      "كتابة سيرة ذاتية أبوظبي",
      "كتابة سيرة ذاتية السعودية",
      "كتابة سيرة ذاتية الرياض",
      "كتابة سيرة ذاتية جدة",
      "تصميم سيرة ذاتية احترافية",
      "كتابة ملف LinkedIn",
    ],
    locale: "ar_SA",
    home: "الرئيسية",
    page: "كتابة السيرة الذاتية وLinkedIn",
  },
} as const;

export function cvMetadata(lang: Lang): Metadata {
  const m = SEO[lang];
  const url = `${SITE_URL}${CV_PATH[lang]}`;
  const base = OG_IMAGE[lang];
  const image = { ...base, url: `${SITE_URL}${base.url}` };
  return {
    title: m.title,
    description: m.description,
    keywords: [...m.keywords],
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}${CV_PATH.en}`,
        ar: `${SITE_URL}${CV_PATH.ar}`,
        "x-default": `${SITE_URL}${CV_PATH.en}`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: SITE_NAME,
      locale: m.locale,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image.url],
    },
  };
}

const CITIES = ["Dubai", "Abu Dhabi", "Riyadh", "Jeddah"];
const COUNTRIES = ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"];

export function cvJsonLd(lang: Lang) {
  const t = content[lang];
  const m = SEO[lang];
  const url = `${SITE_URL}${CV_PATH[lang]}`;
  const packages = t.packages.items;
  const lows = packages.map((p) => priceRange(p).low);
  const highs = packages.map((p) => priceRange(p).high);

  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbJsonLd([
      { name: m.home, path: "/" },
      { name: m.page, path: CV_PATH[lang] },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${url}#service`,
      name: `${SITE_NAME} ${lang === "ar" ? "كتابة السيرة الذاتية وLinkedIn" : "CV & LinkedIn Writing"}`,
      url,
      description: m.description,
      inLanguage: lang,
      availableLanguage: ["English", "Arabic"],
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      priceRange: `£${Math.min(...lows)}-£${Math.max(...highs)}`,
      // Countries and the four cities this page targets.
      areaServed: [
        ...COUNTRIES.map((n) => ({ "@type": "Country", name: n })),
        ...CITIES.map((n) => ({ "@type": "City", name: n })),
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: lang === "ar" ? "باقات السيرة الذاتية والمستندات المهنية" : "CV & Career Document Packages",
        itemListElement: packages.map((p) => {
          const r = priceRange(p);
          return {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: p.name, description: p.tagline },
            priceCurrency: "GBP",
            ...(r.low === r.high
              ? { price: r.low }
              : {
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "GBP",
                    minPrice: r.low,
                    maxPrice: r.high,
                  },
                }),
          };
        }),
      },
    },
  ];
}
