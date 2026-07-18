import { promises as fs } from "fs";
import path from "path";
import type { PageView, Submission, UpsertSubmissionInput } from "./types";

/**
 * Local JSON-file data layer — used only when DATABASE_URL is not set (i.e.
 * local dev). See lib/store.postgres.ts for the Vercel-deployed backend and
 * lib/store.ts for the switch between the two.
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
