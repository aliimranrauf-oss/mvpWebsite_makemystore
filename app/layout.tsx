import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import "./globals.css";
import { SITE_URL, SITE_NAME, GA_MEASUREMENT_ID, CHATBOT_MODE, DEFAULT_OG_IMAGE, SOCIAL_LINKS } from "@/lib/constants";

// Only the active bot's code (and the shared ChatWidget it pulls in) ever
// gets fetched — dynamic() + a build-time-constant CHATBOT_MODE lets
// Next.js drop the other two branches from the client bundle entirely,
// and ssr:false keeps it off the initial-render critical path too.
const FaqChatBot = dynamic(() => import("@/components/FaqChatBot"), { ssr: false });
const AiChatBot = dynamic(() => import("@/components/AiChatBot"), { ssr: false });
const HybridChatBot = dynamic(() => import("@/components/HybridChatBot"), { ssr: false });

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { languages: { "en": SITE_URL, "x-default": SITE_URL } },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // After adding the site in Google Search Console / Bing Webmaster, paste the
  // verification codes here (or verify via DNS and leave this out).
  // verification: { google: "YOUR_GOOGLE_CODE", other: { "msvalidate.01": "YOUR_BING_CODE" } },
  title: {
    default: "MakeMyStore — AI Chatbots, SaaS MVPs & POS Systems",
    template: "%s",
  },
  description:
    "Custom AI chatbots, SaaS MVPs & POS systems built on Next.js & Supabase, plus fixes for stuck AI-generated projects. Real code, delivered fast, you own it all.",
  keywords: [
    "AI chatbot development",
    "SaaS MVP development",
    "POS system development",
    "shop management system",
    "inventory management software",
    "Next.js developer",
    "fix Lovable project",
    "AI app development",
    "WhatsApp chatbot",
  ],
  openGraph: {
    title: "MakeMyStore — AI Chatbots, SaaS MVPs, POS Systems & Project Rescue",
    description:
      "Custom AI chatbots, AI-powered SaaS MVPs, POS & shop management systems, and fixes for stuck AI-generated projects — real code, fast delivery, full ownership.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MakeMyStore — AI Chatbots, SaaS MVPs, POS Systems & Project Rescue",
    description:
      "Custom AI chatbots, AI-powered SaaS MVPs, POS & shop management systems, and fixes for stuck AI-generated projects — real code, fast delivery, full ownership.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "Organization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/header-logo.png` },
      image: `${SITE_URL}/images/og-image.png`,
      description:
        "Custom AI chatbots, AI-powered SaaS MVPs, POS & shop management systems, and fixes for stuck AI-generated projects, delivered on Next.js, Supabase, and Vercel.",
      email: "info@makemystore.online",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Canada" },
        { "@type": "AdministrativeArea", name: "European Union" },
      ],
      priceRange: "$150-$1600+",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@makemystore.online",
        availableLanguage: ["English"],
      },
      ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS } : {}),
      knowsAbout: [
        "AI Chatbot Development",
        "SaaS MVP Development",
        "POS & Shop Management Systems",
        "Inventory Management Software",
        "Next.js",
        "Supabase",
        "Project Rescue",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />

        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {children}

        {CHATBOT_MODE === "faq" && <FaqChatBot />}
        {CHATBOT_MODE === "ai" && <AiChatBot />}
        {CHATBOT_MODE === "hybrid" && <HybridChatBot />}
      </body>
    </html>
  );
}
