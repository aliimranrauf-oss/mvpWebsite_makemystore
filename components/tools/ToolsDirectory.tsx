"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeftRight, Bot, Briefcase, Calculator, FileText, Image as Img, Lightbulb, QrCode, Search, Store, Truck, Wallet, type LucideIcon } from "lucide-react";
import { categories } from "@/lib/tools-meta";

const icons: Record<string, LucideIcon> = { FileText, Calculator, QrCode, Briefcase, Lightbulb, ArrowLeftRight, Bot, Image: Img, Store, Truck, Search, Wallet };
const tint: Record<string, { card: string; icon: string }> = {
  Ecommerce: { card: "bg-emerald-50/60", icon: "bg-emerald-100 text-emerald-700" },
  Business: { card: "bg-sky-50/60", icon: "bg-sky-100 text-sky-700" },
  Marketing: { card: "bg-violet-50/60", icon: "bg-violet-100 text-violet-700" },
  Design: { card: "bg-cyan-50/60", icon: "bg-cyan-100 text-cyan-700" },
  Career: { card: "bg-slate-50", icon: "bg-slate-200 text-slate-700" },
  Utilities: { card: "bg-teal-50/60", icon: "bg-teal-100 text-teal-700" },
};
export type DirItem = { slug: string; name: string; description: string; cat: string; icon: string; tags: string[] };

export default function ToolsDirectory({ items }: { items: DirItem[] }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const list = useMemo(() => { const s = q.trim().toLowerCase(); return items.filter((t) => (cat === "All" || t.cat === cat) && (!s || `${t.name} ${t.description} ${t.tags.join(" ")}`.toLowerCase().includes(s))); }, [items, q, cat]);
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div><h2 className="font-display text-2xl font-bold text-ink">All Tools</h2><p className="mt-1 text-sm text-muted" aria-live="polite">{list.length} of {items.length} tools</p></div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block"><span className="sr-only">Search tools</span><Search aria-hidden className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools..." className="w-full rounded-full border border-border bg-white py-2 pl-9 pr-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint sm:w-64" /></label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => (<button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${cat === c ? "border-mint bg-mint text-white" : "border-border bg-white text-muted hover:text-ink"}`}>{c}</button>))}
          </div>
        </div>
      </div>
      {list.length === 0 ? (
        <div className="mt-8 rounded-xl2 border border-dashed border-border p-10 text-center"><p className="font-display font-semibold text-ink">No tools match your search.</p><p className="mt-1 text-sm text-muted">Try another word, or <button type="button" className="text-mint underline" onClick={() => { setQ(""); setCat("All"); }}>clear filters</button>. Missing a tool? <Link href="/contact" className="text-mint underline">Suggest one</Link>.</p></div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((t) => { const I = icons[t.icon] ?? Calculator; const c = tint[t.cat] ?? tint.Utilities; return (
            <li key={t.slug}><Link href={`/tools/${t.slug}`} className={`group flex min-h-[190px] flex-col rounded-xl2 border border-border p-5 shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${c.card}`}>
              <div className="flex items-start justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.icon}`}><I aria-hidden className="h-5 w-5" /></span><ArrowRight aria-hidden className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-mint motion-reduce:transition-none" /></div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{t.name}</h3>
              <p className="mt-1.5 line-clamp-3 text-sm text-muted">{t.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">{t.tags.map((g) => <span key={g} className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] text-muted ring-1 ring-border">{g}</span>)}</div>
            </Link></li>); })}
        </ul>
      )}
    </div>
  );
}
