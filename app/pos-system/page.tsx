import type { Metadata } from "next";
import {
  ArrowRight, Check, Plus, Package, Receipt, Bot, Users, ShieldCheck,
  Store, Pill, ShoppingCart, Smartphone, Wrench, Shirt, Car,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoEmbed from "@/components/DemoEmbed";
import PageHeader from "@/components/PageHeader";
import { posTiers, posFaqs } from "@/lib/data";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/constants";
import { liveDemos } from "@/lib/demos";

const POS_TITLE = "Custom POS & Inventory Software for Shops | Live Demo";
const POS_DESC =
  "Custom POS, billing and inventory software for retail shops, pharmacies, convenience, hardware and auto parts stores in the US, UK, Europe, Australia and UAE. Offline mode, AI assistant, you own the code.";

export const metadata: Metadata = {
  title: { absolute: `${POS_TITLE} | ${SITE_NAME}` },
  description: POS_DESC,
  keywords: [
    "pos system development",
    "custom pos software",
    "shop management software",
    "inventory management software for small business",
    "billing software for small business",
    "retail management system developer",
    "ai pos system",
    "offline pos software",
    "customer credit ledger software",
    "custom retail pos software",
    "pos software for small business usa",
    "pos software uk",
    "pos system australia",
    "pos software uae",
    "inventory software for convenience store",
    "pharmacy pos software",
    "grocery store pos software",
    "mobile shop pos software",
    "hardware store pos software",
  ],
  alternates: { canonical: `${SITE_URL}/pos-system` },
  openGraph: {
    title: `${POS_TITLE} | ${SITE_NAME}`,
    description: POS_DESC,
    url: `${SITE_URL}/pos-system`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ ...DEFAULT_OG_IMAGE, alt: "Custom POS and shop management system by MakeMyStore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${POS_TITLE} | ${SITE_NAME}`,
    description: POS_DESC,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const included = [
  {
    icon: Package,
    title: "Inventory, billing & customers",
    desc: "Stock, invoicing with PDF/WhatsApp sharing, and a customer ledger for cash and credit sales — all connected.",
  },
  {
    icon: Bot,
    title: "AI assistant, built in",
    desc: "Type or speak a request. The assistant proposes exactly what it's about to do, and nothing saves until you confirm.",
  },
  {
    icon: ShieldCheck,
    title: "You own it, works offline",
    desc: "One-time build, source code and database under your own accounts. Keeps working with no internet and syncs when it returns.",
  },
];

const verticals: { icon: typeof Store; name: string; href?: string }[] = [
  { icon: Store, name: "Battery & Solar Shops", href: "/pos-system/battery-solar-shop" },
  { icon: ShoppingCart, name: "Grocery & General Stores" },
  { icon: Pill, name: "Pharmacies" },
  { icon: Smartphone, name: "Electronics & Mobile Shops" },
  { icon: Wrench, name: "Hardware Stores" },
  { icon: Shirt, name: "Garments & Boutiques" },
  { icon: Car, name: "Auto Parts Shops" },
  { icon: Users, name: "Wholesale & Distribution" },
];

export default function PosSystemPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: posFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const url = `${SITE_URL}/pos-system`;
  const pageJsonLd = [
    faqJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Custom POS & Shop Management System Development",
      serviceType: "POS and inventory software development",
      description: POS_DESC,
      url,
      areaServed: ["United States", "United Kingdom", "European Union", "Australia", "United Arab Emirates", "Canada"],
      provider: { "@id": `${SITE_URL}/#organization` },
      offers: posTiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        description: t.desc,
        url: `${url}#pricing`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "POS System", item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Navbar />
      <main>
        <PageHeader
          eyebrow="POS & Shop Management System"
          title="A POS system built around your business, not a template"
          description="Inventory, invoicing, customers & suppliers, payments, and reports — in one system, with an AI assistant. Built for any retail or service business, and it's yours to keep."
          image={{ src: "/images/hero/pos-system.png", alt: "Custom POS and shop management system dashboard" }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Get a free consultation
              <ArrowRight size={16} />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-mint/60 bg-surface px-6 py-3.5 text-sm font-semibold text-mint transition-colors hover:bg-mint/10"
            >
              Try the live demo
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              See pricing
            </a>
          </div>
        </PageHeader>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                What's included
              </h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {included.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="demo" className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Try an example build
              </h2>
              <p className="mt-4 text-muted">
                This demo is one example, a battery and solar shop. Your system is built
                around your own business and the features you need. Sample data only, no
                sign-up: click Log in and explore. Please don&apos;t enter real business
                information; the demo resets every hour.
              </p>
            </div>
            <div className="mt-10">
              <DemoEmbed demoUrl={liveDemos[0].demoUrl} title="POS system live demo" />
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Built for any business
              </h2>
              <p className="mt-4 text-muted">
                A battery and solar retailer&apos;s system is one real example of
                this build — the same depth is rebuilt around your own products
                for any of these, and more.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {verticals.map(({ icon: Icon, name, href }) => {
                const inner = (
                  <>
                    <Icon size={22} className="text-mint" />
                    <span className="text-sm font-medium text-ink">{name}</span>
                    {href && <span className="text-xs font-semibold text-mint">Live demo →</span>}
                  </>
                );
                const cls = "flex flex-col items-center gap-2 rounded-xl2 card-glow-border p-5 text-center";
                return href ? (
                  <a key={name} href={href} className={`${cls} transition-transform hover:scale-[1.02]`}>
                    {inner}
                  </a>
                ) : (
                  <div key={name} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-center text-sm text-muted">
              Don&apos;t see your business listed? If you sell, stock, or invoice
              anything, this system can be built around it.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Your features, not a fixed template
              </h2>
              <p className="mt-4 text-muted">
                Every system is custom. Tell us how your business works and we build
                around it: your own stock structure, billing flow, reports, staff
                roles, multiple branches or an AI assistant. Keep what you need and
                drop what you don&apos;t.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/contact?service=pos-system"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Tell us what you need
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-4 text-muted">
                A one-time build fee — no forced monthly license. Exact pricing
                depends on the modules you need.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {posTiers.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-xl2 p-6 ${
                    t.highlight ? "card-glow-border card-glow-border--accent" : "card-glow-border"
                  }`}
                  style={{ ["--card-bg" as string]: t.highlight ? "#F7FBF8" : "#FFFFFF" }}
                >
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-ink">{t.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="mt-10 divide-y divide-border border-t border-border">
              {posFaqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                    <span className="font-medium">{f.q}</span>
                    <Plus
                      size={18}
                      className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-mint/10 blur-[110px]"
          />
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Ready to replace registers and spreadsheets?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Tell us about your shop and how you currently manage stock and
              billing — you&apos;ll get a fixed quote and timeline back.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Start a project
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
