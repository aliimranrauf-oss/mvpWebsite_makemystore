import crypto from "crypto";
import { cookies } from "next/headers";

// Simple single-admin login. No extra database or library needed.
//
// Env vars (Vercel):
//   ADMIN_PASSWORD        required. Your admin password (use a long one).
//   ADMIN_SESSION_SECRET  recommended. Any long random string; signs the login cookie.
//                         If missing, ADMIN_PASSWORD is used as the signing secret.

export const ADMIN_COOKIE = "mms_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // stay logged in for 7 days

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret() as string).update(payload).digest("hex");
}

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

export function passwordMatches(input: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Hash both so lengths are equal, then compare in constant time.
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const exp = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${exp}.${sign(exp)}`;
}

export function isValidToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function isAdmin(): boolean {
  return isValidToken(cookies().get(ADMIN_COOKIE)?.value);
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
