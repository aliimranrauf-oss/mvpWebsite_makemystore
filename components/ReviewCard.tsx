import { flagFor, type Review } from "@/lib/reviews";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < rating ? "#F2A93B" : "none"}
          stroke={i < rating ? "#F2A93B" : "#CBD5D0"}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5z"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ReviewCard({ review: r }: { review: Review }) {
  const flag = flagFor(r.country);
  return (
    <figure className="flex h-full flex-col rounded-xl2 border border-border bg-surface p-6 shadow-[0_10px_30px_-14px_rgba(16,36,30,0.12)]">
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={r.rating} />
        {r.service && (
          <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[11px] font-semibold text-mint">
            {r.service}
          </span>
        )}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
        &ldquo;{r.review}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {r.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.avatar_url} alt={r.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint/10 text-xs font-semibold text-mint">
            {initials(r.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
          <p className="truncate text-xs text-muted">
            {flag && <span aria-hidden="true">{flag} </span>}
            {r.company ? `${r.company}, ` : ""}
            {r.country} · {formatDate(r.created_at)}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
