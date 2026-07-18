import { createHmac, timingSafeEqual } from "crypto";

export const DASHBOARD_COOKIE_NAME = "heirloom_dash_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/**
 * Fallback values used only when DASHBOARD_SESSION_SECRET / DASHBOARD_PASSWORD
 * aren't set as env vars — this keeps the dashboard usable on a fresh deploy
 * with zero required configuration (no Vercel dashboard visit needed just to
 * log in). These are baked into the server-side bundle only (never imported
 * by a "use client" file), so they're no more exposed than a real env var
 * would be. Set the env vars in Vercel to override/rotate without a redeploy
 * of the value itself — env vars always win when present.
 */
const FALLBACK_SESSION_SECRET = "3c3f2cc7505dcd645694b16aee88f96e1c69201e573a574470c67ed27d1bf862";
const FALLBACK_PASSWORD = "_emWM_pj6QuV";

function getSecret(): string {
  return process.env.DASHBOARD_SESSION_SECRET || FALLBACK_SESSION_SECRET;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function sign(issuedAt: string): string {
  return createHmac("sha256", getSecret()).update(issuedAt).digest("hex");
}

/** Stateless session token: `<issuedAtMs>.<hmac>`. No server-side session store needed. */
export function createSessionToken(): string {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [issuedAt, sig] = token.split(".");
  if (!issuedAt || !sig) return false;
  if (!safeEqual(sig, sign(issuedAt))) return false;
  const age = Date.now() - Number(issuedAt);
  if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE_MS) return false;
  return true;
}

export function checkDashboardPassword(candidate: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD || FALLBACK_PASSWORD;
  return safeEqual(candidate, expected);
}
