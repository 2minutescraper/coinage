import { promises as fs } from "fs";
import path from "path";
import type { PageView, Submission, UtmParams } from "./types";

/**
 * Local JSON-file data layer for the pre-launch waitlist test.
 *
 * IMPORTANT — Vercel deployment note:
 * This reads/writes files under /data on the local disk, which is fine for
 * `next dev` / `next start` on a single long-running process (this test
 * server). It will NOT work reliably once deployed to Vercel: serverless
 * functions there have an ephemeral, read-only-outside-/tmp filesystem and
 * requests can land on different instances, so writes here would be lost or
 * inconsistent in production.
 *
 * Before deploying to Vercel, swap the four functions below (recordPageView,
 * upsertSubmission, getAllPageViews, getAllSubmissions) for a real backing
 * store — e.g. Vercel Postgres, Vercel KV, or Supabase. Nothing outside this
 * file needs to change; every caller only depends on this module's exports.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const PAGEVIEWS_FILE = path.join(DATA_DIR, "pageviews.json");

// Serializes writes within this process so concurrent requests can't
// interleave a read-modify-write cycle and clobber each other.
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(task, task);
  writeQueue = result.catch(() => undefined);
  return result;
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonArray<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    if (!raw.trim()) return [];
    return JSON.parse(raw) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeJsonArrayAtomic<T>(file: string, rows: T[]) {
  await ensureDataDir();
  const tmpFile = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(rows, null, 2), "utf-8");
  await fs.rename(tmpFile, file);
}

export async function recordPageView(view: Omit<PageView, "createdAt">): Promise<void> {
  await enqueue(async () => {
    const rows = await readJsonArray<PageView>(PAGEVIEWS_FILE);
    rows.push({ ...view, createdAt: new Date().toISOString() });
    await writeJsonArrayAtomic(PAGEVIEWS_FILE, rows);
  });
}

export interface UpsertSubmissionInput {
  sessionId: string;
  step: number;
  fields: Partial<
    Pick<
      Submission,
      | "gender"
      | "ageRange"
      | "collectionStatus"
      | "howAcquired"
      | "collectionSize"
      | "firstName"
      | "email"
    >
  >;
  completed?: boolean;
  utm?: UtmParams;
  referrer?: string;
  userAgent?: string;
  landingPath?: string;
}

export async function upsertSubmission(input: UpsertSubmissionInput): Promise<Submission> {
  return enqueue(async () => {
    const rows = await readJsonArray<Submission>(SUBMISSIONS_FILE);
    const now = new Date().toISOString();
    const existingIndex = rows.findIndex((r) => r.sessionId === input.sessionId);

    if (existingIndex === -1) {
      const created: Submission = {
        sessionId: input.sessionId,
        createdAt: now,
        updatedAt: now,
        completed: Boolean(input.completed),
        currentStep: input.step,
        utm: input.utm ?? {},
        referrer: input.referrer,
        userAgent: input.userAgent,
        landingPath: input.landingPath,
        ...input.fields,
      };
      rows.push(created);
      await writeJsonArrayAtomic(SUBMISSIONS_FILE, rows);
      return created;
    }

    const existing = rows[existingIndex];
    const updated: Submission = {
      ...existing,
      ...input.fields,
      updatedAt: now,
      currentStep: Math.max(existing.currentStep, input.step),
      completed: existing.completed || Boolean(input.completed),
      utm: { ...existing.utm, ...(input.utm ?? {}) },
      referrer: existing.referrer ?? input.referrer,
      userAgent: existing.userAgent ?? input.userAgent,
      landingPath: existing.landingPath ?? input.landingPath,
    };
    rows[existingIndex] = updated;
    await writeJsonArrayAtomic(SUBMISSIONS_FILE, rows);
    return updated;
  });
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const rows = await readJsonArray<Submission>(SUBMISSIONS_FILE);
  return rows.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getAllPageViews(): Promise<PageView[]> {
  return readJsonArray<PageView>(PAGEVIEWS_FILE);
}
