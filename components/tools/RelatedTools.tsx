import Link from "next/link";
import { getTool } from "@/lib/tools";
import { serviceTools } from "@/lib/tools-meta";

/** "Free tools" block shown on each service page. */
export default function RelatedTools({ service, title = "Free tools you can use right now" }: { service: string; title?: string }) {
  const list = (serviceTools[service] ?? []).map(getTool).filter((t): t is NonNullable<ReturnType<typeof getTool>> => !!t);
  if (!list.length) return null;
  return (
    <section aria-labelledby="free-tools-h" className="border-t border-border bg-surface2">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
        <h2 id="free-tools-h" className="font-display text-2xl font-bold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-muted">No sign-up, runs in your browser.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((t) => (<li key={t.slug}><Link href={`/tools/${t.slug}`} className="block h-full rounded-xl2 border border-border bg-white p-4 hover:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"><span className="font-display font-semibold text-ink">{t.name}</span><span className="mt-1 line-clamp-2 block text-sm text-muted">{t.description}</span></Link></li>))}
        </ul>
        <p className="mt-4 text-sm"><Link href="/tools" className="text-mint hover:underline">Browse all free tools</Link></p>
      </div>
    </section>
  );
}
