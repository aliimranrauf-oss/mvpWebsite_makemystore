import { getSupabaseServerClient } from "@/lib/supabase-server";
import { fallbackReviews, type Review } from "@/lib/reviews";

// Server-only. Uses the service role key, and deliberately selects ONLY the
// public columns — order_number and contact must never be returned here.
// Pass `services` to get only reviews for those services (service pages).
export async function getApprovedReviews(services?: readonly string[]): Promise<Review[]> {
  const fallback = services
    ? fallbackReviews.filter((r) => r.service && services.includes(r.service))
    : fallbackReviews;

  try {
    const supabase = getSupabaseServerClient();
    let query = supabase
      .from("reviews")
      .select("id, name, company, country, rating, review, avatar_url, service, created_at")
      .eq("status", "approved")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    if (services) query = query.in("service", [...services]);

    const { data, error } = await query;
    if (error) {
      console.error("getApprovedReviews error:", error.message);
      return fallback;
    }
    return data && data.length > 0 ? (data as Review[]) : fallback;
  } catch (err) {
    console.error("getApprovedReviews failed:", err);
    return fallback;
  }
}
