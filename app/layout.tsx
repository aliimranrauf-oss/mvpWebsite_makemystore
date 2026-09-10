import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME, GA_MEASUREMENT_ID, CHATBOT_MODE } from "@/lib/constants";
import FaqChatBot from "@/components/FaqChatBot";
import AiChatBot from "@/components/AiChatBot";
import HybridChatBot from "@/components/HybridChatBot";

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
  title: "MakeMyStore — AI Chatbots, SaaS MVPs & Project Rescue",
  description:
    "Custom AI chatbots, AI-powered SaaS MVPs, and fixes for stuck AI-generated projects. Real production code, delivered on Next.js, Supabase, and Vercel — you own everything.",
  keywords: [
    "AI chatbot development",
    "SaaS MVP development",
    "Next.js developer",
    "fix Lovable project",
    "AI app development",
    "WhatsApp chatbot",
  ],
  openGraph: {
    title: "MakeMyStore — AI Chatbots, SaaS MVPs & Project Rescue",
    description:
      "Custom AI chatbots, AI-powered SaaS MVPs, and fixes for stuck AI-generated projects — real code, fast delivery, full ownership.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MakeMyStore — AI Chatbots, SaaS MVPs & Project Rescue",
    description:
      "Custom AI chatbots, AI-powered SaaS MVPs, and fixes for stuck AI-generated projects — real code, fast delivery, full ownership.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Custom AI chatbots, AI-powered SaaS MVPs, and fixes for stuck AI-generated projects, delivered on Next.js, Supabase, and Vercel.",
    email: "info@makemystore.online",
    areaServed: "Worldwide",
    priceRange: "$150-$1600+",
    knowsAbout: [
      "AI Chatbot Development",
      "SaaS MVP Development",
      "Next.js",
      "Supabase",
      "Project Rescue",
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
