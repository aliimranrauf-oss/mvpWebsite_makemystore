import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/constants";

/**
 * Shared SEO helpers.
 *
 * Why this exists: in the Next.js App Router, a page's `openGraph` / `twitter`
 * object REPLACES the root layout's one (it is not merged). Pages that set their
 * own openGraph without `images` therefore lose the share image. buildMetadata()
 * always includes the image, siteName, locale and a large Twitter card.
 */

type BuildMetadataOptions = {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/ai-chatbot". */
  path: string;
  keywords?: string[];
  imageAlt?: string;
  /** Open Graph locale, e.g. "en_GB". Defaults to en_US. */
  ogLocale?: string;
  /** hreflang map, e.g. { "en-GB": "https://…/uk", "x-default": "https://…" }. */
  languages?: Record<string, string>;
};

export function buildMetadata(o: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${o.path}`;
  const image = { ...DEFAULT_OG_IMAGE, alt: o.imageAlt ?? DEFAULT_OG_IMAGE.alt };

  return {
    title: o.title,
    description: o.description,
    ...(o.keywords ? { keywords: o.keywords } : {}),
    alternates: {
      canonical: url,
      ...(o.languages ? { languages: o.languages } : {}),
    },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      siteName: SITE_NAME,
      locale: o.ogLocale ?? "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      images: [image.url],
    },
  };
}

/** Countries the business actively sells to (matches the Organization schema). */
export const SERVED_COUNTRIES = [
  "United States",
  "United Kingdom",
  "Australia",
  "United Arab Emirates",
  "Canada",
];

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Lowest numeric price found in strings like "$150–$250" or "From $1,000". */
export function lowestPrice(prices: string[]): number {
  const nums = prices
    .flatMap((p) => p.match(/\d[\d,]*/g) ?? [])
    .map((n) => Number(n.replace(/,/g, "")))
    .filter((n) => Number.isFinite(n));
  return nums.length ? Math.min(...nums) : 0;
}

type ServiceJsonLdOptions = {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  /** Lowest starting price in USD. Omit to leave offers out. */
  lowPriceUsd?: number;
  offerCount?: number;
  areaServed?: string[];
  availableLanguage?: string[];
};

export function serviceJsonLd(o: ServiceJsonLdOptions) {
  const url = `${SITE_URL}${o.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: o.name,
    serviceType: o.serviceType,
    description: o.description,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: (o.areaServed ?? SERVED_COUNTRIES).map((c) => ({
      "@type": "Country",
      name: c,
    })),
    ...(o.availableLanguage ? { availableLanguage: o.availableLanguage } : {}),
    ...(o.lowPriceUsd
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: o.lowPriceUsd,
            ...(o.offerCount ? { offerCount: o.offerCount } : {}),
            url,
          },
        }
      : {}),
  };
}
