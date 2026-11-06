"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isAdmin,
  passwordMatches,
} from "@/lib/admin-auth";
import { getSupabaseServerClient } from "@/lib/supabase-server";

// In-memory brute-force guard (resets on cold start; enough to stop casual guessing).
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

export async function loginAction(formData: FormData) {
  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const e = attempts.get(ip);
  if (e && now < e.resetAt && e.count >= MAX_ATTEMPTS) redirect("/admin/login?error=locked");

  const password = String(formData.get("password") || "");
  if (!passwordMatches(password)) {
    const cur = e && now < e.resetAt ? e : { count: 0, resetAt: now + WINDOW_MS };
    cur.count += 1;
    attempts.set(ip, cur);
    redirect("/admin/login?error=1");
  }
  attempts.delete(ip);

  cookies().set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logoutAction() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

export async function updateLeadAction(formData: FormData) {
  if (!isAdmin()) redirect("/admin/login");

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");
  const notes = String(formData.get("notes") || "").slice(0, 2000);
  if (!id || !(STATUSES as readonly string[]).includes(status)) redirect("/admin?err=invalid");

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("leads").update({ status, notes }).eq("id", id);
  if (error) {
    console.error("Admin update error:", error);
    redirect("/admin?err=save"); // usually: the SQL migration has not been run yet
  }
  revalidatePath("/admin");
}
