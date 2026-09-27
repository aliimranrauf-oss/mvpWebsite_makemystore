import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog — AI Development Guides — MakeMyStore",
  description:
    "Guides on AI chatbots, SaaS MVPs, POS systems, and shipping fast on Next.js & Supabase.",
  keywords: [
    "AI chatbot blog",
    "SaaS MVP guides",
    "Next.js Supabase tutorials",
    "AI development blog",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — AI Development Guides — MakeMyStore",
    description:
      "Guides on AI chatbots, SaaS MVPs, POS systems, and shipping fast on Next.js & Supabase.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — AI Development Guides — MakeMyStore",
    description:
      "Guides on AI chatbots, SaaS MVPs, POS systems, and shipping fast on Next.js & Supabase.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// Always fetch fresh so a new post (is_live = true in Supabase) shows up
// immediately without a redeploy.
export const revalidate = 0;

export default async function BlogPage() {
  const { data: posts, error } = supabase
    ? await supabase
        .from("blogs")
        .select("id, slug, title, excerpt, category, published_at, image_url, author_name")
        .eq("is_live", true)
        .eq("lang", "en")
        .order("published_at", { ascending: false })
    : { data: null, error: null };

  if (error) {
    console.error("Supabase blog fetch error:", error.message);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description:
      "AI chatbot, SaaS MVP, and POS system guides for builders shipping on Next.js and Supabase.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/header-logo.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main>
        <PageHeader
          eyebrow="Resources"
          title="The MakeMyStore Blog"
          description="Straight-talk guides on AI chatbots, SaaS MVPs, POS systems, and shipping real production code fast."
        />

        <section className="border-t border-border bg-surface2/60">
          <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts?.map((post, index) => (
                <Reveal key={post.id} delay={(index % 3) * 80}>
                  <article className="flex h-full flex-col overflow-hidden rounded-xl2 card-glow-border">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block h-48 w-full flex-shrink-0 overflow-hidden bg-surface2"
                    >
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          priority={index < 3}
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="h-full w-full bg-surface2" />
                      )}
                    </Link>

                    <div className="flex flex-grow flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint">
                          {post.category || "AI Development"}
                        </span>
                        <span className="text-[11px] text-muted">
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <h2 className="mb-2 line-clamp-2 font-display text-lg font-semibold leading-snug text-ink">
                        <Link href={`/blog/${post.slug}`} className="hover:text-mint">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="mb-5 line-clamp-2 flex-grow text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-mint transition-all hover:gap-2.5"
                      >
                        Read article
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {(!posts || posts.length === 0) && (
              <p className="mt-16 text-center text-muted">
                No posts yet. Check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
