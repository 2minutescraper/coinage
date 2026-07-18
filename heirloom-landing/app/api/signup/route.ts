import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { upsertSubmission, type UpsertSubmissionInput } from "@/lib/store";
import type {
  AgeRange,
  CollectionSize,
  CollectionStatus,
  Gender,
  HowAcquired,
  UtmParams,
} from "@/lib/types";

const GENDERS: Gender[] = ["female", "male", "prefer_not_to_say"];
const AGE_RANGES: AgeRange[] = ["under_25", "25_34", "35_44", "45_54", "55_64", "65_plus"];
const COLLECTION_STATUSES: CollectionStatus[] = [
  "have_now",
  "had_before",
  "expect_to",
  "not_yet",
];
const HOW_ACQUIRED: HowAcquired[] = [
  "inherited_parent_relative",
  "cleaning_out_home",
  "passed_down_family",
  "other",
];
const COLLECTION_SIZES: CollectionSize[] = [
  "handful",
  "jar_or_box",
  "album_or_multiple_boxes",
  "not_sure",
];

interface SignupBody {
  sessionId?: string;
  step?: number;
  completed?: boolean;
  utm?: UtmParams;
  referrer?: string;
  landingPath?: string;
  fields?: {
    gender?: string;
    ageRange?: string;
    collectionStatus?: string;
    howAcquired?: string;
    collectionSize?: string;
    firstName?: string;
    email?: string;
  };
}

function isOneOf<T extends string>(value: unknown, allowed: T[]): value is T {
  return typeof value === "string" && (allowed as string[]).includes(value);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: SignupBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.sessionId || typeof body.sessionId !== "string") {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }
  if (typeof body.step !== "number" || body.step < 1 || body.step > 7) {
    return NextResponse.json({ error: "step must be between 1 and 7" }, { status: 400 });
  }

  const raw = body.fields ?? {};
  const fields: UpsertSubmissionInput["fields"] = {};

  if (raw.gender !== undefined) {
    if (!isOneOf(raw.gender, GENDERS)) {
      return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
    }
    fields.gender = raw.gender;
  }
  if (raw.ageRange !== undefined) {
    if (!isOneOf(raw.ageRange, AGE_RANGES)) {
      return NextResponse.json({ error: "Invalid ageRange" }, { status: 400 });
    }
    fields.ageRange = raw.ageRange;
  }
  if (raw.collectionStatus !== undefined) {
    if (!isOneOf(raw.collectionStatus, COLLECTION_STATUSES)) {
      return NextResponse.json({ error: "Invalid collectionStatus" }, { status: 400 });
    }
    fields.collectionStatus = raw.collectionStatus;
  }
  if (raw.howAcquired !== undefined) {
    if (!isOneOf(raw.howAcquired, HOW_ACQUIRED)) {
      return NextResponse.json({ error: "Invalid howAcquired" }, { status: 400 });
    }
    fields.howAcquired = raw.howAcquired;
  }
  if (raw.collectionSize !== undefined) {
    if (!isOneOf(raw.collectionSize, COLLECTION_SIZES)) {
      return NextResponse.json({ error: "Invalid collectionSize" }, { status: 400 });
    }
    fields.collectionSize = raw.collectionSize;
  }
  if (raw.firstName !== undefined) {
    if (typeof raw.firstName !== "string" || raw.firstName.trim().length === 0) {
      return NextResponse.json({ error: "Invalid firstName" }, { status: 400 });
    }
    fields.firstName = raw.firstName.trim().slice(0, 80);
  }
  if (raw.email !== undefined) {
    if (typeof raw.email !== "string" || !EMAIL_RE.test(raw.email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    fields.email = raw.email.trim().slice(0, 200).toLowerCase();
  }

  const submission = await upsertSubmission({
    sessionId: body.sessionId,
    step: body.step,
    fields,
    completed: Boolean(body.completed),
    utm: body.utm ?? {},
    referrer: body.referrer,
    landingPath: body.landingPath,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true, submission });
}
