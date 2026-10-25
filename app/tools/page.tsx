import Link from "next/link";
import { ArrowRight, Globe, Lightbulb, QrCode, ShoppingCart, Smartphone, UserX, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolsDirectory from "@/components/tools/ToolsDirectory";
import { tools, getTool } from "@/lib/tools";
import { toolMeta, featuredSlugs } from "@/lib/tools-meta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Free Online Tools for Stores & Freelancers | MakeMyStore",
  description: "Free invoice generator, profit margin calculator, QR code maker, CV builder, currency converter and more. No sign-up, runs in your browser.",
  path: "/tools",
  keywords: ["free online tools", "invoice generator", "profit calculator", "qr code generator", "cv builder", "shopify fee calculator"],
});

const faqs = [
  { q: "Are these tools really free?", a: "Yes. There is no sign-up, paywall or usage limit." },
  { q: "Is my data sent to a server?", a: "The calculators, invoice, CV builder and QR code run in your browser. The image compressor processes files on your device and does not upload them. The currency converter only requests public exchange rates." },
  { q: "Can I suggest a new tool?", a: "Yes, send us the idea through the contact page." },
];

export default function ToolsPage() {
  const items = tools.map((t) => ({ slug: t.slug, name: t.name, description: t.description, ...toolMeta[t.slug] }));
  const featured = featuredSlugs.map(getTool).filter((t): t is NonNullable<ReturnType<typeof getTool>> => !!t);
  const ld = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "Free Online Tools", url: `${SITE_URL}/tools`, mainEntity: { "@type": "ItemList", itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE_URL}/tools/${t.slug}` })) } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const chip = "flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur";
  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <section className="relative overflow-hidden bg-[#0A1424]">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(14,165,233,0.25),transparent),radial-gradient(40%_60%_at_10%_100%,rgba(46,158,72,0.22),transparent)]" />
          <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"><Zap aria-hidden className="h-3.5 w-3.5" />FREE ONLINE TOOLS</p>
              <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Powerful Tools for Online Stores &amp; Freelancers</h1>
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-slate-300 sm:text-lg">Free tools to calculate profits, create business documents, improve your website, and grow your online business.</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                <li className="flex items-center gap-2"><Zap aria-hidden className="h-4 w-4 text-emerald-300" />100% Free</li>
                <li className="flex items-center gap-2"><UserX aria-hidden className="h-4 w-4 text-emerald-300" />No Sign-up Required</li>
                <li className="flex items-center gap-2"><Globe aria-hidden className="h-4 w-4 text-emerald-300" />Works in Your Browser</li>
              </ul>
              <a href="#all-tools" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Browse tools <ArrowRight aria-hidden className="h-4 w-4" /></a>
            </div>
            <div aria-hidden className="hidden grid-cols-2 gap-3 lg:grid">
              <div className="col-span-2 rounded-xl2 border border-white/10 bg-white/5 p-4"><div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-white/30" /><i className="h-2 w-2 rounded-full bg-white/30" /><i className="h-2 w-2 rounded-full bg-white/30" /></div><div className="mt-4 flex h-24 items-end gap-2">{[35, 55, 40, 70, 60, 85, 95].map((h, i) => <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/60 to-cyan-400/80" />)}</div></div>
              <div className={chip}><ShoppingCart className="h-5 w-5 text-emerald-300" />Calculate profit margins</div>
              <div className={chip}><Lightbulb className="h-5 w-5 text-cyan-300" />Generate business names</div>
              <div className={`${chip} col-span-2`}><QrCode className="h-5 w-5 text-violet-300" />Create QR codes</div>
            </div>
          </div>
        </section>

        <section id="all-tools" className="mx-auto max-w-content scroll-mt-20 px-5 py-12 sm:px-8"><ToolsDirectory items={items} /></section>

        <section aria-labelledby="featured-h" className="mx-auto max-w-content px-5 pb-12 sm:px-8">
          <h2 id="featured-h" className="font-display text-2xl font-bold text-ink">Most useful for sellers</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {featured.map((t) => (<Link key={t.slug} href={`/tools/${t.slug}`} className="rounded-xl2 border border-border bg-[#0A1424] p-6 text-white transition-shadow hover:shadow-lg motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"><h3 className="font-display text-lg font-semibold">{t.name}</h3><p className="mt-2 text-sm text-slate-300">{t.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-300">Open tool <ArrowRight aria-hidden className="h-4 w-4" /></span></Link>))}
          </div>
        </section>

        <section className="mx-auto max-w-content px-5 pb-12 sm:px-8">
          <div className="grid gap-6 rounded-xl2 bg-[#0A1424] p-6 text-white sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div><h2 className="font-display text-xl font-bold">More free tools coming soon</h2><p className="mt-2 text-sm text-slate-300">Tell us which tool would save you time.</p><Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Suggest a tool <ArrowRight aria-hidden className="h-4 w-4" /></Link></div>
            <ul className="grid gap-4 text-sm sm:grid-cols-2">
              <li><strong className="block text-white">Browser-based</strong><span className="text-slate-300">Calculations run on your device.</span></li>
              <li><strong className="block text-white">No registration</strong><span className="text-slate-300">Open a tool and use it.</span></li>
              <li><strong className="block text-white">Free access</strong><span className="text-slate-300">No hidden fees or limits.</span></li>
              <li><strong className="flex items-center gap-1 text-white"><Smartphone aria-hidden className="h-4 w-4" />Any device</strong><span className="text-slate-300">Desktop, tablet or mobile.</span></li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-h" className="mx-auto max-w-[70ch] px-5 pb-16 sm:px-8">
          <h2 id="faq-h" className="font-display text-2xl font-bold text-ink">Frequently asked questions</h2>
          <div className="mt-4 space-y-2">{faqs.map((f) => (<details key={f.q} className="rounded-lg border border-border p-4"><summary className="cursor-pointer font-medium text-ink">{f.q}</summary><p className="mt-2 text-muted">{f.a}</p></details>))}</div>
          <p className="mt-6 text-sm text-muted">Need more than a tool? See our <Link className="text-mint underline" href="/ai-chatbot">AI chatbots</Link>, <Link className="text-mint underline" href="/pos-system">POS systems</Link>, <Link className="text-mint underline" href="/saas-mvp">SaaS MVP</Link> and <Link className="text-mint underline" href="/cv-writing">CV writing</Link>, or read our <Link className="text-mint underline" href="/guides">guides</Link>.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
