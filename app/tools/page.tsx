import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Online Tools for Stores & Freelancers | MakeMyStore",
  description: "Free invoice generator, profit margin calculator, QR code maker, CV builder, currency converter and more. No sign-up, runs in your browser.",
  path: "/tools",
  keywords: ["free online tools", "invoice generator", "profit calculator", "qr code generator", "cv builder"],
});

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader eyebrow="Free tools" title="Free tools for online stores and freelancers" description="No sign-up and no uploads. Everything runs in your browser." />
        <section className="mx-auto max-w-content px-5 py-14 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="rounded-xl2 border border-border p-6 hover:border-mint">
                <h2 className="font-display text-lg font-semibold text-ink">{t.name}</h2>
                <p className="mt-2 text-sm text-muted">{t.description}</p>
              </Link>
            ))}
          </div>
          <h2 className="mt-14 font-display text-2xl font-bold text-ink">Guides and comparisons</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {guides.map((g) => (<li key={g.slug}><Link className="text-mint hover:underline" href={`/guides/${g.slug}`}>{g.title}</Link></li>))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
