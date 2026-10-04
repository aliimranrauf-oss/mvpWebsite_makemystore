import type { MetadataRoute } from "next";
import { SITE_URL, SITE_LAST_UPDATED } from "@/lib/constants";
import { supabase } from "@/lib/supabaseClient";
import { liveDemos } from "@/lib/demos";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fixed date: a new Date() on every build tells Google nothing changed meaningfully.
  const lastModified = new Date(SITE_LAST_UPDATED);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ai-chatbot`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/saas-mvp`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pos-system`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...liveDemos.map((d) => ({
      url: `${SITE_URL}/pos-system/${d.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/project-rescue`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Best-effort: if Supabase isn't reachable/configured at build time, the
  // sitemap still returns every static page rather than failing the build.
  if (!supabase) return staticRoutes;

  try {
    const { data: posts } = await supabase
      .from("blogs")
      .select("slug, updated_at")
      .eq("is_live", true);

    const postRoutes: MetadataRoute.Sitemap =
      posts?.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      })) ?? [];

    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
