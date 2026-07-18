import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { recordPageView } from "@/lib/store";
import type { UtmParams } from "@/lib/types";

interface TrackViewBody {
  sessionId?: string;
  path?: string;
  utm?: UtmParams;
  referrer?: string;
}

export async function POST(request: NextRequest) {
  let body: TrackViewBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.sessionId || typeof body.sessionId !== "string") {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  await recordPageView({
    sessionId: body.sessionId,
    path: typeof body.path === "string" ? body.path : "/",
    utm: body.utm ?? {},
    referrer: body.referrer,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true });
}
