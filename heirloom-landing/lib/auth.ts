import { createHmac, timingSafeEqual } from "crypto";

export const DASHBOARD_COOKIE_NAME = "heirloom_dash_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "DASHBOARD_SESSION_SECRET is not set. Add it to .env.local (see .env.example).",
    );
  }
  return secret;
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
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    throw new Error("DASHBOARD_PASSWORD is not set. Add it to .env.local (see .env.example).");
  }
  return safeEqual(candidate, expected);
}
