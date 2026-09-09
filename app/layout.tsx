import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

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
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
