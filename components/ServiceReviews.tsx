import ReviewsSection from "@/components/ReviewsSection";
import { getApprovedReviews } from "@/lib/get-reviews";
import { aggregateRatingFrom } from "@/lib/seo";

// Shows ONLY reviews for the given services. Renders nothing when there are
// none yet, so a page never shows an empty or off-topic reviews block.
export default async function ServiceReviews({
  services,
  title,
}: {
  services: readonly string[];
  title: string;
}) {
  const reviews = await getApprovedReviews(services);
  if (reviews.length === 0) return null;
  const agg = aggregateRatingFrom(reviews);

  return (
    <ReviewsSection
      id="service-reviews"
      eyebrow="Client reviews"
      title={title}
      reviews={reviews.slice(0, 9)}
      total={reviews.length}
      average={agg ? String(agg.ratingValue) : "5.0"}
    />
  );
}
