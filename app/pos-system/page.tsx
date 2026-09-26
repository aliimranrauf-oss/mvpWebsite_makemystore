import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PixelViewContent from '@/components/PixelViewContent'
import LeadFormPOS from '@/components/pos/LeadForm'
import {
  Package, Receipt, Users, Truck, Wallet, BarChart3, Bot, WifiOff,
  MessageCircle, ShieldCheck, CheckCircle2, ArrowRight, Store, Pill,
  ShoppingCart, BatteryCharging, Shirt, Car, Wrench, Sparkles, Smartphone,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────
// SEO METADATA
// Keep this generic + broad: this is a CUSTOM POS / shop-management build
// service for ANY retail or service vertical. The battery/solar build
// (AK Solar / AK Power) is used further down only as a proof-of-work case
// study — it must never read as "we only build for solar/battery shops".
// ─────────────────────────────────────────────────────────────────────────
const PAGE_URL = 'https://www.makemystore.online/pos-system'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.makemystore.online'),
  title: 'Custom POS & Shop Management System with Inventory, Invoicing & AI Assistant',
  description:
    'Custom-built POS and shop management software for any business — retail, wholesale, pharmacy, grocery, electronics, hardware, garments, solar/battery and more. Inventory, invoicing, customers & suppliers, payments, reports, offline mode, and a built-in AI assistant. One-time build, source code is yours.',
  keywords: [
    'pos system',
    'point of sale software',
    'shop management system',
    'shop management software',
    'inventory management software',
    'billing software',
    'invoicing software for small business',
    'custom pos software development',
    'ai pos system',
    'pos system with ai assistant',
    'retail management system',
    'pos system for small business',
    'grocery store pos system',
    'pharmacy pos software',
    'hardware store management software',
    'electronics shop pos system',
    'garments shop pos software',
    'wholesale distribution software',
    'battery shop management software',
    'solar shop pos system',
    'custom inventory system development',
    'offline pos system',
    'multi user pos software',
    'pos software with customer ledger',
    'udhaar khata app for shop',
    'pos system Pakistan',
    'shop billing software with reports',
  ],
  category: 'Software Development Services',
  authors: [{ name: 'MakeMyStore.online' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'Custom POS & Shop Management System with Inventory, Invoicing & AI Assistant',
    description:
      'One system for stock, billing, customers, suppliers, payments, and reports — with an AI assistant that proposes changes for you to confirm, not a black box. Built for any business type, on any device, works offline.',
    url: PAGE_URL,
    siteName: 'MakeMyStore.online',
    type: 'website',
    images: [
      {
        url: 'https://www.makemystore.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Custom POS and shop management system with AI assistant — MakeMyStore.online',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom POS & Shop Management System with Inventory, Invoicing & AI Assistant',
    description:
      'Inventory, invoicing, customers, suppliers, payments, reports & an AI assistant — one custom-built system for any business, works offline.',
    images: ['https://www.makemystore.online/og-image.png'],
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

// ─────────────────────────────────────────────────────────────────────────
// JSON-LD structured data
// ─────────────────────────────────────────────────────────────────────────
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom POS & Shop Management System Development',
  serviceType: 'Point of Sale & Retail Management Software Development',
  provider: {
    '@type': 'Organization',
    name: 'MakeMyStore.online',
    url: 'https://www.makemystore.online',
  },
  areaServed: 'Worldwide',
  description:
    'Custom point-of-sale and shop management software with inventory, invoicing, customer and supplier ledgers, payments, expense tracking, reporting, offline sync, and an optional AI assistant. Built for any retail, wholesale, or service business.',
  offers: [
    { '@type': 'Offer', name: 'Starter POS', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Business POS + AI Assistant', availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Custom / Multi-Branch', availability: 'https://schema.org/InStock' },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.makemystore.online/' },
    { '@type': 'ListItem', position: 2, name: 'POS & Shop Management System', item: PAGE_URL },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this POS system only for solar or battery shops?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The AK Solar / AK Power build shown on this page is a real, live example of our work — it is not the only type of shop we build for. The same system (inventory, invoicing, customers, suppliers, payments, reports, AI assistant) is fully rebuilt around your own products, pricing, and workflow for grocery stores, pharmacies, electronics and mobile shops, hardware stores, garment shops, wholesale distributors, or any other business.',
      },
    },
    {
      '@type': 'Question',
      name: 'What exactly is included in a shop management system build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inventory with stock history, sales and invoicing with PDF/WhatsApp sharing, a customer ledger for cash and credit (udhaar) sales, a supplier ledger for purchases and payments, expense tracking, dashboards and sales reports, staff logins with roles, and an optional AI assistant that proposes an action for you to confirm before anything is saved. Extra modules — such as service jobs, warranty claims, or trade-in/scrap tracking — are added when your business needs them.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the AI assistant work, and is it safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You type or speak a request in plain language, such as adding stock or creating a bill. The assistant shows a proposal card summarizing exactly what it is about to do, and nothing is saved until you tap Confirm. It never writes to your data directly — it uses the same save logic as the regular forms, so every change is exactly as safe as doing it manually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the system work without internet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bills, stock changes, and customer records can be created while offline. Everything is queued on the device and synced automatically the moment the connection returns, with an on-screen status showing Offline, Syncing, or Synced.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I own the app and the source code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This is a one-time custom build, not a rented subscription license. The source code and database are yours, and the app is set up under your own accounts (hosting, database, and app store listing where relevant).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a custom POS system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on scope. A focused Starter build (inventory, billing, customers, reports) typically takes a few weeks. Adding the AI assistant, multi-branch support, or industry-specific modules extends the timeline. An exact estimate is given after a short discovery call about your workflow.',
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────
// Static content
// ─────────────────────────────────────────────────────────────────────────
const coreFeatures = [
  { icon: Package, title: 'Inventory Management', desc: 'Stock levels, low-stock alerts, and a full history of every addition or removal — one source of truth for stock.' },
  { icon: Receipt, title: 'Sales & Invoicing', desc: 'Create bills in seconds. Print, download as PDF, or send straight to WhatsApp — cash or credit (udhaar).' },
  { icon: Users, title: 'Customers (CRM)', desc: 'Every customer\u2019s full history, balance owed, and contact details, found with one search.' },
  { icon: Truck, title: 'Suppliers & Purchases', desc: 'Track what you buy, from whom, and what you still owe — stock updates automatically on receiving.' },
  { icon: Wallet, title: 'Payments & Expenses', desc: 'Log payments to suppliers and running costs like rent, salaries, and utilities, feeding straight into profit reports.' },
  { icon: BarChart3, title: 'Reports & Dashboard', desc: 'Sales, cash-in, gross profit, and best-sellers by day, month, or custom range — for real decisions, not guesswork.' },
  { icon: Bot, title: 'AI Assistant', desc: 'Type or speak a request in plain language. It proposes the change, you confirm — nothing is saved without your approval.' },
  { icon: WifiOff, title: 'Works Offline', desc: 'Keep billing and adding stock with no internet. Everything syncs automatically the moment you\u2019re back online.' },
  { icon: MessageCircle, title: 'Share Anywhere', desc: 'Every invoice, receipt, and slip is print-ready and shareable via the native share sheet on any phone.' },
]

const verticals = [
  { icon: BatteryCharging, name: 'Battery & Solar Shops', note: 'Live case study below' },
  { icon: ShoppingCart, name: 'Grocery & General Stores' },
  { icon: Pill, name: 'Pharmacies' },
  { icon: Smartphone, name: 'Electronics & Mobile Shops' },
  { icon: Wrench, name: 'Hardware Stores' },
  { icon: Shirt, name: 'Garments & Boutiques' },
  { icon: Car, name: 'Auto Parts Shops' },
  { icon: Store, name: 'Wholesale & Distribution' },
]

const pricingTiers = [
  {
    name: 'Starter POS',
    priceNote: 'one-time build, from',
    price: 'Get a Quote',
    description: 'Core billing and stock for a single shop.',
    features: [
      'Inventory with stock history',
      'Sales & invoicing (print, PDF, WhatsApp)',
      'Customers ledger (cash & credit)',
      'Basic sales reports',
    ],
    cta: 'Ask About Starter',
    highlighted: false,
  },
  {
    name: 'Business POS + AI',
    priceNote: 'one-time build, from',
    price: 'Get a Quote',
    description: 'Everything in Starter, plus suppliers, payments, expenses, and the AI assistant.',
    features: [
      'Everything in Starter POS',
      'Suppliers, purchases & payments',
      'Expense tracking & gross-profit reports',
      'AI Assistant (propose \u2192 confirm)',
      'Offline mode with auto-sync',
      'Staff roles & logins',
    ],
    cta: 'Ask About Business',
    highlighted: true,
  },
  {
    name: 'Custom / Multi-Branch',
    priceNote: 'scoped after a call',
    price: 'Let\u2019s Talk',
    description: 'Multiple branches, industry-specific modules, or integrations.',
    features: [
      'Everything in Business POS + AI',
      'Multiple branches / multi-store',
      'Industry-specific modules (e.g. service jobs, warranty claims, trade-ins)',
      'Custom integrations & reporting',
    ],
    cta: 'Book a Discovery Call',
    highlighted: false,
  },
]

const caseStudyPoints = [
  'One system, 12 connected modules — inventory, sales, customers, suppliers, purchases, payments, expenses, reports, battery services, scrap trade-in, AI assistant, and staff logins.',
  'AI assistant proposes every change as a plain-language card and only saves after the owner taps Confirm — using the exact same save logic as the manual forms.',
  'Fully offline-capable: bills and stock changes queue on the device and sync automatically the moment the connection returns.',
  'Every document — invoice, purchase bill, payment receipt, service slip — is print-ready and shareable straight to WhatsApp.',
]

export default function POSSystemPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PixelViewContent name="POS System Landing Page" />

      <main id="main-content" className="bg-[#0b0f1a] text-white">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/[0.06] text-sm text-[#00d4ff] font-semibold mb-6">
              <Sparkles size={14} /> Custom Software Development
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A POS &amp; <span className="text-gradient">Shop Management System</span> Built Around Your Business
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Inventory, invoicing, customers &amp; suppliers, payments, and reports — in one system, with a built-in
              AI assistant. Not a rigid template: built for <em>your</em> products and workflow, for any retail or
              service business, and it&apos;s yours to keep.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link href="#lead-form" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
                Get a Free Consultation <ArrowRight size={18} />
              </Link>
              <a
                href="#case-study"
                className="text-sm font-semibold px-8 py-3 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/[0.06] transition-all"
              >
                See a Real Build
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/75">
              {['Works offline', 'AI assistant included', 'You own the source code', 'Any business type'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#00ffaa]" /> {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core features ─────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              One System, <span className="text-gradient">Every Part Connected</span>
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
              Every module talks to the others — a sale updates stock, a customer&apos;s balance, and your reports,
              all from one save.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass rounded-xl p-6 border border-white/10">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--gradient)' }}
                  >
                    <Icon size={20} className="text-[#0b0f1a]" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Verticals ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              Built for <span className="text-gradient">Any Business</span>, Not Just One
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-4">
              The battery &amp; solar build below is one real example of our work — the same system is rebuilt
              around your products for any of these, and more.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {verticals.map(({ icon: Icon, name, note }) => (
                <div key={name} className="glass rounded-xl p-5 text-center border border-white/10">
                  <Icon size={24} className="text-[#00d4ff] mx-auto mb-3" />
                  <div className="text-sm font-semibold text-white/85">{name}</div>
                  {note && <div className="text-[11px] text-[#00ffaa] mt-1">{note}</div>}
                </div>
              ))}
            </div>
            <p className="text-center text-white/50 text-sm mt-8">
              Don&apos;t see your business listed? That&apos;s fine — if you sell, stock, or invoice anything, this
              system can be built around it.
            </p>
          </div>
        </section>

        {/* ── Case study: AK Solar / AK Power ──────────────────────────── */}
        <section id="case-study" className="py-16 px-4 sm:px-6 border-t border-white/5 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-[#00d4ff] uppercase tracking-widest mb-3 block">
                Real Client Build
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                AK Solar / AK Power — <span className="text-gradient">Battery &amp; Solar Shop Management System</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Built for a battery and solar retailer as a reference of what this service delivers end to end —
                the same depth is available for any vertical.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudyPoints.map((point) => (
                <div key={point} className="glass rounded-xl p-5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#00d4ff] shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Simple <span className="text-gradient">Packages</span>, Custom Scope
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                A one-time build fee — no forced monthly license. Exact pricing depends on the modules you need.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-7 flex flex-col ${
                    tier.highlighted ? 'glass border-2 border-cyan-400/40 shadow-lg shadow-cyan-500/10' : 'glass'
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white/85 mb-1">{tier.name}</h3>
                  <div className="text-xs text-white/50 mb-1">{tier.priceNote}</div>
                  <div className="text-2xl font-bold text-gradient mb-4">{tier.price}</div>
                  <p className="text-sm text-white/65 mb-6 leading-relaxed">{tier.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                        <span className="text-cyan-400 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#lead-form" className="btn-primary text-center text-sm">{tier.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust / security ──────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <ShieldCheck size={32} className="text-[#00d4ff] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your Data, Your System</h2>
            <p className="text-white/65 max-w-2xl mx-auto leading-relaxed">
              This is a one-time custom build, not a rented license — the source code and database are set up under
              your own accounts from day one. Staff sign in with roles set by the owner (no public self-signup), and
              every change made by the AI assistant runs through the exact same save logic as the manual screens, so
              nothing is ever changed without a human confirming it.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((qa) => (
                <details key={qa.name} className="glass rounded-xl p-5 border border-white/10 group">
                  <summary className="font-semibold text-white/90 cursor-pointer list-none flex items-center justify-between gap-4">
                    {qa.name}
                    <span className="text-[#00d4ff] shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="text-sm text-white/65 mt-3 leading-relaxed">{qa.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead form ─────────────────────────────────────────────────── */}
        <LeadFormPOS />

        {/* ── Final CTA ─────────────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Replace Registers &amp; Spreadsheets with <span className="text-gradient">One System</span>?
            </h2>
            <p className="text-white/65 mb-8">
              Tell us about your shop and how you currently manage stock and billing — we&apos;ll map out exactly
              what your system should include.
            </p>
            <Link href="/contact" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2 mx-auto w-fit">
              Talk to Us <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
