import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const revalidate = 0;

// Pre-render every live post at build time, and let Next fall back to
// on-demand rendering (via revalidate = 0 above) for anything published
// after the last deploy — so a brand-new post is live immediately.
export async function generateStaticParams() {
  if (!supabase) return [];
  const { data: posts } = await supabase.from("blogs").select("slug").eq("is_live", true);
  return posts?.map((post) => ({ slug: post.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!supabase) return { title: "Post Not Found" };

  const { data: post } = await supabase
    .from("blogs")
    .select("title, excerpt, image_url, published_at, updated_at")
    .eq("slug", slug)
    .eq("is_live", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  const ogImage = post.image_url || `${SITE_URL}/images/og-image.png`;

  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.excerpt || "",
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      siteName: SITE_NAME,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: [ogImage],
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
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!supabase) notFound();

  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_live", true)
    .single();

  if (!post) notFound();

  // Editors drop {{IMAGE_2}} / {{IMAGE_3}} anywhere inside `content` in
  // Supabase and fill image_url_2 / image_url_3 — no code changes needed
  // to add extra in-post images.
  let renderedContent = post.content || "<p>No content available.</p>";

  const buildFigure = (url: string, alt: string) => `
    <figure>
      <img class="post-img" src="${url}" alt="${alt}" />
    </figure>
  `;

  renderedContent = post.image_url_2
    ? renderedContent.replaceAll("{{IMAGE_2}}", buildFigure(post.image_url_2, post.title))
    : renderedContent.replaceAll("{{IMAGE_2}}", "");

  renderedContent = post.image_url_3
    ? renderedContent.replaceAll("{{IMAGE_3}}", buildFigure(post.image_url_3, post.title))
    : renderedContent.replaceAll("{{IMAGE_3}}", "");

  // BlogPosting structured data — this is what lets Google show rich
  // article results (author, dates, image) and target this page for
  // ranking on the post's specific keywords.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt || "",
    image: [post.image_url || `${SITE_URL}/images/og-image.png`],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      "@type": "Organization",
      name: post.author_name || `${SITE_NAME} Team`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/header-logo.png` },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Navbar />
      <main className="pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted">
            <Link href="/blog" className="hover:text-mint">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{post.title}</span>
          </nav>

          {/* Title & meta */}
          <div className="mb-8">
            <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint">
              {post.category || "AI Development"}
            </span>
            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.15] text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-muted">
              By {post.author_name || `${SITE_NAME} Team`} ·{" "}
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Featured image */}
          {post.image_url && (
            <div className="relative mb-10 h-64 w-full overflow-hidden rounded-xl2 bg-surface2 md:h-96">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="rounded-xl2 border border-border bg-white p-8 md:p-12">
            <div
              className="prose prose-lg max-w-none text-ink
              prose-headings:font-display prose-headings:text-ink
              prose-a:text-mint prose-a:no-underline hover:prose-a:underline
              prose-strong:text-ink
              [&_.cta-btn]:mr-3 [&_.cta-btn]:my-2 [&_.cta-btn]:inline-block [&_.cta-btn]:rounded-full [&_.cta-btn]:bg-mint [&_.cta-btn]:px-6 [&_.cta-btn]:py-3 [&_.cta-btn]:font-bold [&_.cta-btn]:text-white [&_.cta-btn]:no-underline [&_.cta-btn]:transition-transform hover:[&_.cta-btn]:scale-[1.02]
              [&_.tldr-box]:my-8 [&_.tldr-box]:rounded-xl2 [&_.tldr-box]:border [&_.tldr-box]:border-mint/20 [&_.tldr-box]:bg-mint/5 [&_.tldr-box]:p-6 [&_.tldr-box_p]:m-0 [&_.tldr-box_ul]:m-0
              [&_.callout-box]:my-8 [&_.callout-box]:rounded-r-xl [&_.callout-box]:border-l-4 [&_.callout-box]:border-cyan [&_.callout-box]:bg-surface2 [&_.callout-box]:p-6 [&_.callout-box]:text-lg [&_.callout-box]:italic [&_.callout-box]:text-ink [&_.callout-box_p]:m-0
              [&_.post-img]:my-8 [&_.post-img]:h-auto [&_.post-img]:w-full [&_.post-img]:rounded-xl2
              [&_figcaption]:mb-8 [&_figcaption]:mt-[-1.5rem] [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:not-italic [&_figcaption]:text-muted
              [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-surface2 [&_th]:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-ink [&_td]:border [&_td]:border-border [&_td]:p-3"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          </div>

          {/* CTA footer — every post nudges toward the core conversion */}
          <div className="mt-10 rounded-xl2 bg-ink p-8 text-center text-white">
            <h2 className="font-display text-2xl font-semibold">
              Want something like this built for you?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-white/70">
              We build AI chatbots, SaaS MVPs, and POS systems on Next.js and
              Supabase — real production code, full ownership.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10">
            <Link href="/blog" className="text-sm font-medium text-mint hover:text-mint/80">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
