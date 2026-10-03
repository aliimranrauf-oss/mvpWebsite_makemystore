import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plus, ArrowLeft, Languages } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DemoEmbed from "@/components/DemoEmbed";
import { liveDemos, getDemo } from "@/lib/demos";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

type Props = { params: { vertical: string } };

// Only slugs returned below exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return liveDemos.map((d) => ({ vertical: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const d = getDemo(params.vertical);
  if (!d) return {};
  const url = `${SITE_URL}/pos-system/${d.slug}`;
  const image = { url: "/images/og-image.png", width: 1200, height: 630 };
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    keywords: d.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: d.metaTitle,
      description: d.metaDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: d.metaTitle,
      description: d.metaDescription,
      images: [image.url],
    },
  };
}

export default function VerticalPage({ params }: Props) {
  const d = getDemo(params.vertical);
  if (!d) notFound();

  const url = `${SITE_URL}/pos-system/${d.slug}`;
  const contactHref = `/contact?service=pos-system&ref=${d.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${d.name} POS`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: d.metaDescription,
      url,
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "POS System", item: `${SITE_URL}/pos-system` },
        { "@type": "ListItem", position: 3, name: d.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <PageHeader
          eyebrow={d.eyebrow}
          title={d.h1}
          description={d.intro}
          image={{ src: "/images/hero/pos-system.png", alt: `${d.name} POS and inventory system dashboard`, width: 1586, height: 992 }}
        >
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Try the live demo
              <ArrowRight size={16} />
            </a>
            <a
              href={contactHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-mint/60 hover:text-mint"
            >
              Get a quote for my shop
            </a>
          </div>
        </PageHeader>

        <section id="demo" className="border-b border-border bg-surface/40">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Try the {d.name.toLowerCase()} demo
              </h2>
              <p className="mt-4 text-muted">
                A live app with sample data. No sign-up: click Log in and explore. Please don&apos;t enter
                real business information; the demo resets every hour.
              </p>
            </div>
            <div className="mt-10">
              <DemoEmbed demoUrl={d.demoUrl} title={`${d.name} POS live demo`} />
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">What you can try in the demo</h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {d.features.map(({ icon: Icon, title, desc }) => (
                <div key={title}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-mint/10 text-mint">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface/40">
          <div className="mx-auto grid max-w-content gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Try it in 5 steps</h2>
              <ul className="mt-8 space-y-4">
                {d.tryIt.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Who it&apos;s for</h2>
              <ul className="mt-8 space-y-3">
                {d.audience.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl2 card-glow-border p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Languages size={16} className="text-mint" />
                  {d.romanUrdu.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.romanUrdu.body}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Frequently asked questions</h2>
            </div>
            <div className="mt-10 divide-y divide-border border-t border-border">
              {d.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-ink">
                    <span className="font-medium">{f.q}</span>
                    <Plus size={18} className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-content px-5 py-20 text-center sm:px-8 sm:py-28">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Want this built around your shop?</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Tell us what you sell and how you bill today. You&apos;ll get a fixed quote and timeline back.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Start a project
                <ArrowRight size={16} />
              </a>
              <a href="/pos-system" className="inline-flex items-center gap-2 text-sm text-muted hover:text-mint">
                <ArrowLeft size={14} /> Different business? See all POS systems
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
