import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { guides } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides & Comparisons for Online Stores and SaaS | MakeMyStore",
  description: "Practical guides on starting an online store, building a SaaS MVP, and comparing platforms and POS systems.",
  path: "/guides",
  keywords: ["ecommerce guides", "saas mvp guide", "shopify vs custom", "pos comparison"],
});

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="Guides" title="Guides and comparisons" description="Plain-English advice for store owners and founders." />
        <section className="mx-auto grid max-w-content gap-5 px-5 py-14 sm:grid-cols-2 sm:px-8">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-xl2 border border-border p-6 hover:border-mint">
              <span className="text-xs font-semibold text-mint">{g.kind}</span>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink">{g.title}</h2>
              <p className="mt-2 text-sm text-muted">{g.description}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
