import type { Review } from "@/lib/reviews";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import { StarRating } from "@/components/ReviewCard";

export default function ReviewsSection({
  reviews,
  total,
  average,
  eyebrow = "Client reviews",
  title = "What clients say about working with us",
  id = "reviews",
}: {
  reviews: Review[];
  total: number;
  average: string;
  eyebrow?: string;
  title?: string;
  id?: string;
}) {
  return (
    <section id={id} dir="ltr" className="scroll-mt-20 border-t border-border bg-surface2">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {title}
            </h2>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted">
              <StarRating rating={Math.round(Number(average))} />
              <span>
                <strong className="font-semibold text-ink">{average}</strong> from {total}{" "}
                {total === 1 ? "review" : "reviews"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/reviews"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-mint hover:text-mint"
            >
              Read all reviews
            </a>
            <a
              href="/reviews#leave-a-review"
              className="inline-flex items-center justify-center rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Leave a review
            </a>
          </div>
        </div>

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
