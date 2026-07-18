import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DASHBOARD_COOKIE_NAME, verifySessionToken } from "./lib/auth";

// Optimistic edge check only — the dashboard page itself re-verifies the
// cookie server-side before reading any data (see app/dashboard/page.tsx).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(DASHBOARD_COOKIE_NAME)?.value;
  if (verifySessionToken(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/dashboard/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/export"],
};
