"use client";

import { useRef, useState } from "react";
import type { Review } from "@/lib/reviews";
import ReviewCard from "@/components/ReviewCard";

const PAGE_SIZE = 3;
const SWIPE_THRESHOLD_PX = 50;

const ChevronLeft = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const touchStartX = useRef<number | null>(null);

  function goTo(next: number) {
    setPage(((next % totalPages) + totalPages) % totalPages); // wraps both ways
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) goTo(deltaX < 0 ? page + 1 : page - 1);
    touchStartX.current = null;
  }

  const visible = reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const arrowCls =
    "hidden shrink-0 items-center justify-center self-center rounded-full border border-border bg-surface p-2 text-ink shadow-sm transition-colors hover:border-mint hover:text-mint sm:flex";

  return (
    <div>
      <div className="flex items-stretch gap-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {totalPages > 1 && (
          <button type="button" aria-label="Previous reviews" onClick={() => goTo(page - 1)} className={arrowCls}>
            <ChevronLeft />
          </button>
        )}

        <div key={page} className="review-fade grid min-w-0 flex-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        {totalPages > 1 && (
          <button type="button" aria-label="Next reviews" onClick={() => goTo(page + 1)} className={arrowCls}>
            <ChevronRight />
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous reviews"
            onClick={() => goTo(page - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink sm:hidden"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show review page ${i + 1}`}
                aria-current={i === page}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-mint" : "w-1.5 bg-ink/15"}`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next reviews"
            onClick={() => goTo(page + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink sm:hidden"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
