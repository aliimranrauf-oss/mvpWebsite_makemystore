import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { loginAction } from "../actions";

export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  if (isAdmin()) redirect("/admin");
  const configured = adminConfigured();

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <h1 className="font-display text-2xl font-semibold text-ink">Admin login</h1>
      {!configured ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ADMIN_PASSWORD is not set in Vercel yet. Add it in Settings → Environment Variables, then redeploy.
        </p>
      ) : (
        <form action={loginAction} className="mt-6 space-y-4">
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-mint"
          />
          {searchParams.error === "locked" ? (
            <p className="text-sm text-red-600">Too many attempts. Try again in 15 minutes.</p>
          ) : searchParams.error ? (
            <p className="text-sm text-red-600">Wrong password.</p>
          ) : null}
          <button className="w-full rounded-full bg-mint px-6 py-3 text-sm font-semibold text-white">Log in</button>
        </form>
      )}
    </main>
  );
}
