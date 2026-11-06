import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { guides, getGuide } from "@/lib/guides";
import { getTool } from "@/lib/tools";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL, SITE_NAME, SITE_LAST_UPDATED } from "@/lib/constants";

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) return {};
  return buildMetadata({ title: `${g.title} | ${SITE_NAME}`, description: g.description, path: `/guides/${g.slug}`, keywords: g.keywords });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();
  const tool = g.tool ? getTool(g.tool) : undefined;
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, dateModified: SITE_LAST_UPDATED, mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`, author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME } };
  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <PageHeader eyebrow={g.kind} title={g.title} description={g.description} />
        <article className="mx-auto max-w-[70ch] px-5 py-12 sm:px-8">
          {g.sections.map((s) => (<div key={s.h} className="mb-8"><h2 className="font-display text-2xl font-bold text-ink">{s.h}</h2><p className="mt-3 leading-relaxed text-muted">{s.p}</p></div>))}
          {tool && <p className="rounded-xl2 bg-mint-dim p-5 text-ink">Try our free <Link className="text-mint underline" href={`/tools/${tool.slug}`}>{tool.name}</Link>.</p>}
          <p className="mt-6 text-ink">Need help building it? <Link className="text-mint underline" href="/contact">Talk to MakeMyStore</Link>.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
