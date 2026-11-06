import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ToolRunner from "@/components/tools/ToolRunner";
import { tools, getTool } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export const dynamicParams = false;
export const generateStaticParams = () => tools.map((t) => ({ slug: t.slug }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  if (!t) return {};
  return buildMetadata({ title: t.title, description: t.description, path: `/tools/${t.slug}`, keywords: t.keywords });
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  if (!t) notFound();
  const url = `${SITE_URL}/tools/${t.slug}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, url, description: t.description, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: t.name, item: url } ] },
  ];
  const related = tools.filter((x) => x.slug !== t.slug).slice(0, 4);
  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <PageHeader eyebrow="Free tool" title={t.h1} description={t.description} />
        <section className="mx-auto max-w-content px-5 py-12 sm:px-8"><ToolRunner slug={t.slug} /></section>
        <section className="mx-auto max-w-[70ch] px-5 pb-12 sm:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">About this tool</h2>
          <p className="mt-3 leading-relaxed text-muted">{t.intro}</p>
          <h2 className="mt-8 font-display text-2xl font-bold text-ink">How to use it</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-muted">{t.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <h2 className="mt-8 font-display text-2xl font-bold text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-2">{t.faqs.map((f) => (<details key={f.q} className="rounded-lg border border-border p-4"><summary className="cursor-pointer font-medium text-ink">{f.q}</summary><p className="mt-2 text-muted">{f.a}</p></details>))}</div>
          <div className="mt-10 rounded-xl2 bg-mint-dim p-6"><p className="font-display font-semibold text-ink">{t.cta.text}</p><div className="mt-2 flex flex-wrap gap-4"><Link href={t.cta.href} className="font-semibold text-mint hover:underline">{t.cta.label}</Link><Link href="/contact" className="text-ink hover:underline">Get a free quote</Link></div></div>
          <h2 className="mt-10 font-display text-xl font-bold text-ink">More free tools</h2>
          <ul className="mt-3 space-y-1.5">{related.map((r) => <li key={r.slug}><Link className="text-mint hover:underline" href={`/tools/${r.slug}`}>{r.name}</Link></li>)}</ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
