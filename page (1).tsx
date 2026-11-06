import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { logoutAction, updateLeadAction } from "./actions";

export const metadata: Metadata = { title: "Leads - Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Lead = {
  id: string | number;
  created_at?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  service?: string;
  budget?: string | null;
  message?: string;
  source?: string;
  status?: string | null;
  notes?: string | null;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost"];
const PAGE_SIZE = 30;

const statusStyle: Record<string, string> = {
  new: "bg-mint/15 text-mint",
  contacted: "bg-blue-100 text-blue-700",
  quoted: "bg-amber-100 text-amber-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-slate-200 text-slate-600",
};

const fmt = (d?: string) =>
  d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; service?: string; page?: string; err?: string };
}) {
  if (!isAdmin()) redirect("/admin/login");

  const supabase = getSupabaseServerClient();
  let res = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(1000);
  if (res.error) res = await supabase.from("leads").select("*").limit(1000);
  const loadError = res.error ? res.error.message : null;
  const all = ((res.data ?? []) as Lead[]).map((l) => ({ ...l, status: l.status || "new" }));

  const q = (searchParams.q || "").trim().toLowerCase();
  const fStatus = searchParams.status || "";
  const fService = searchParams.service || "";

  const filtered = all.filter((l) => {
    if (fStatus && l.status !== fStatus) return false;
    if (fService && l.service !== fService) return false;
    if (q && !`${l.name} ${l.email} ${l.phone} ${l.message}`.toLowerCase().includes(q)) return false;
    return true;
  });

  const page = Math.max(1, Number(searchParams.page) || 1);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const weekAgo = Date.now() - 7 * 86400_000;
  const stats = [
    { label: "Total leads", value: all.length },
    { label: "New (not contacted)", value: all.filter((l) => l.status === "new").length },
    { label: "Last 7 days", value: all.filter((l) => l.created_at && new Date(l.created_at).getTime() > weekAgo).length },
    { label: "Won", value: all.filter((l) => l.status === "won").length },
  ];
  const services = Array.from(new Set(all.map((l) => l.service).filter(Boolean))) as string[];

  const qs = (p: number) => {
    const u = new URLSearchParams();
    if (searchParams.q) u.set("q", searchParams.q);
    if (fStatus) u.set("status", fStatus);
    if (fService) u.set("service", fService);
    u.set("page", String(p));
    return `/admin?${u.toString()}`;
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-ink">Leads</h1>
        <div className="flex items-center gap-3 text-sm">
          <a href="/admin/export" className="rounded-full border border-border bg-surface px-4 py-2 font-medium text-ink hover:border-mint/60">
            Export CSV
          </a>
          <form action={logoutAction}>
            <button className="rounded-full px-4 py-2 font-medium text-muted hover:text-ink">Log out</button>
          </form>
        </div>
      </div>

      {loadError && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load leads: {loadError}
        </p>
      )}
      {searchParams.err === "save" && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Could not save. Run supabase/leads-admin.sql in the Supabase SQL editor first (adds the status and notes columns).
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      <form method="get" className="mt-6 flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search name, email, phone, message"
          className="min-w-[220px] flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-mint"
        />
        <select name="status" defaultValue={fStatus} className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="service" defaultValue={fService} className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm">
          <option value="">All services</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-white">Filter</button>
      </form>

      <p className="mt-4 text-xs text-muted">{filtered.length} lead(s)</p>

      <div className="mt-2 space-y-3">
        {rows.length === 0 && <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">No leads found.</p>}
        {rows.map((l) => {
          const wa = l.phone ? l.phone.replace(/\D/g, "") : "";
          return (
            <article key={String(l.id)} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">{l.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    <a className="hover:text-mint" href={`mailto:${l.email}`}>{l.email}</a>
                    {l.phone && (
                      <>
                        {" · "}
                        <a className="hover:text-mint" href={wa ? `https://wa.me/${wa}` : undefined} target="_blank" rel="noopener noreferrer">
                          {l.phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <div className="text-right text-xs text-muted">
                  <p>{fmt(l.created_at)}</p>
                  <p className="mt-1">
                    <span className={`rounded-full px-2 py-0.5 font-medium ${statusStyle[l.status || "new"] || statusStyle.new}`}>{l.status}</span>
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted">
                {l.service} · {l.source}{l.budget ? ` · budget ${l.budget}` : ""}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink">{l.message}</p>

              <form action={updateLeadAction} className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                <input type="hidden" name="id" value={String(l.id)} />
                <select name="status" defaultValue={l.status || "new"} className="rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input
                  name="notes"
                  defaultValue={l.notes || ""}
                  maxLength={2000}
                  placeholder="Private notes (not shown to the customer)"
                  className="min-w-[200px] flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-mint"
                />
                <button className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:border-mint/60">Save</button>
              </form>
            </article>
          );
        })}
      </div>

      {pages > 1 && (
        <nav className="mt-6 flex items-center justify-between text-sm">
          {page > 1 ? <a className="text-mint hover:underline" href={qs(page - 1)}>← Newer</a> : <span />}
          <span className="text-muted">Page {page} of {pages}</span>
          {page < pages ? <a className="text-mint hover:underline" href={qs(page + 1)}>Older →</a> : <span />}
        </nav>
      )}
    </main>
  );
}
