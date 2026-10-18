import { getSupabaseServerClient } from "@/lib/supabase-server";
import { fallbackReviews, type Review } from "@/lib/reviews";

// Server-only. Uses the service role key, and deliberately selects ONLY the
// public columns — order_number and contact must never be returned here.
export async function getApprovedReviews(): Promise<Review[]> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, company, country, rating, review, avatar_url, service, created_at")
      .eq("status", "approved")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getApprovedReviews error:", error.message);
      return fallbackReviews;
    }
    return data && data.length > 0 ? (data as Review[]) : fallbackReviews;
  } catch (err) {
    console.error("getApprovedReviews failed:", err);
    return fallbackReviews;
  }
}
