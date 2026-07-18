import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DASHBOARD_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getAllSubmissions } from "@/lib/store";

const COLUMNS = [
  "sessionId",
  "createdAt",
  "updatedAt",
  "completed",
  "currentStep",
  "gender",
  "ageRange",
  "collectionStatus",
  "howAcquired",
  "collectionSize",
  "firstName",
  "email",
  "utm.source",
  "utm.medium",
  "utm.campaign",
  "utm.content",
  "utm.term",
  "referrer",
  "landingPath",
  "userAgent",
] as const;

function csvCell(value: unknown): string {
  const str = value === undefined || value === null ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  // Re-verify server-side; the proxy check is optimistic only.
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getAllSubmissions();

  const lines = [COLUMNS.join(",")];
  for (const s of submissions) {
    const row = [
      s.sessionId,
      s.createdAt,
      s.updatedAt,
      s.completed,
      s.currentStep,
      s.gender,
      s.ageRange,
      s.collectionStatus,
      s.howAcquired,
      s.collectionSize,
      s.firstName,
      s.email,
      s.utm.source,
      s.utm.medium,
      s.utm.campaign,
      s.utm.content,
      s.utm.term,
      s.referrer,
      s.landingPath,
      s.userAgent,
    ];
    lines.push(row.map(csvCell).join(","));
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="heirloom-signups-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
