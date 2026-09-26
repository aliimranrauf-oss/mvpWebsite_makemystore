import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // Core & High-Priority Pages
    {
      url: 'https://www.makemystore.online/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      // ── NEW: Website Speed Optimization service page ──────────────────
      url: 'https://www.makemystore.online/website-speed-optimization',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      // ── NEW: POS & Shop Management System service page ────────────────
      url: 'https://www.makemystore.online/pos-system',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // Service Pages (0.8)
    {
      url: 'https://www.makemystore.online/how-it-works',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/space',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      // ── NEW: Solar Meta Ads service page ───────────────────────────────
      url: 'https://www.makemystore.online/solar-meta-ads',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/tools',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/pricing',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/blog',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.makemystore.online/careers',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Core Pages (0.5)
    {
      url: 'https://www.makemystore.online/about',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.makemystore.online/contact',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // Legal Pages (0.3)
    {
      url: 'https://www.makemystore.online/privacy',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.makemystore.online/terms',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic blog post pages — pulled from Supabase, same `blogs` table /
  // `is_live` filter used in app/blog/page.tsx and app/blog/[slug]/page.tsx.
  const { data: posts, error } = await supabase
    .from('blogs')
    .select('slug, updated_at, published_at')
    .eq('is_live', true);

  if (error) {
    console.error('Supabase Error (sitemap):', error.message);
  }

  const blogPages: MetadataRoute.Sitemap =
    posts?.map((post) => ({
      url: `https://www.makemystore.online/blog/${post.slug}`,
      lastModified: post.updated_at ?? post.published_at ?? lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    })) ?? [];

  return [...staticPages, ...blogPages];
}
