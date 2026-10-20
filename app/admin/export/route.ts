import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COLUMNS = ["created_at", "name", "email", "phone", "service", "budget", "source", "status", "message", "notes"];

// Spreadsheet formula-injection guard: cells starting with = + - @ get a leading apostrophe.
function cell(v: unknown): string {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

  const supabase = getSupabaseServerClient();
  let res = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5000);
  if (res.error) res = await supabase.from("leads").select("*").limit(5000);
  if (res.error) return new NextResponse("Could not load leads", { status: 500 });

  const lines = [COLUMNS.join(",")];
  for (const r of res.data ?? []) lines.push(COLUMNS.map((c) => cell((r as Record<string, unknown>)[c])).join(","));

  return new NextResponse("\uFEFF" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
