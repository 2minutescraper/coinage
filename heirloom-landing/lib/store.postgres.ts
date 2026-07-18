import { neon } from "@neondatabase/serverless";
import type { PageView, Submission, UpsertSubmissionInput } from "./types";

/**
 * Postgres-backed data layer, used automatically when DATABASE_URL is set
 * (Vercel injects this once a Marketplace Postgres store — e.g. Neon — is
 * connected to the project). See lib/store.ts for the switch and
 * lib/store.local.ts for the local-dev JSON-file equivalent.
 */

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set — lib/store.postgres.ts should not be reachable.");
  }
  return neon(url);
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = getSql();
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS heirloom_submissions (
          session_id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL,
          completed BOOLEAN NOT NULL DEFAULT FALSE,
          current_step INTEGER NOT NULL,
          gender TEXT,
          age_range TEXT,
          collection_status TEXT,
          how_acquired TEXT,
          collection_size TEXT,
          first_name TEXT,
          email TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_campaign TEXT,
          utm_content TEXT,
          utm_term TEXT,
          referrer TEXT,
          landing_path TEXT,
          user_agent TEXT
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS heirloom_pageviews (
          id BIGSERIAL PRIMARY KEY,
          session_id TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          path TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_campaign TEXT,
          utm_content TEXT,
          utm_term TEXT,
          referrer TEXT,
          user_agent TEXT
        )
      `;
    })();
  }
  return schemaReady;
}

function undef<T>(value: T | null | undefined): T | undefined {
  return value === null ? undefined : value;
}

interface SubmissionRow {
  session_id: string;
  created_at: string;
  updated_at: string;
  completed: boolean;
  current_step: number;
  gender: string | null;
  age_range: string | null;
  collection_status: string | null;
  how_acquired: string | null;
  collection_size: string | null;
  first_name: string | null;
  email: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  landing_path: string | null;
  user_agent: string | null;
}

function rowToSubmission(row: SubmissionRow): Submission {
  return {
    sessionId: row.session_id,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    completed: row.completed,
    currentStep: row.current_step,
    gender: undef(row.gender) as Submission["gender"],
    ageRange: undef(row.age_range) as Submission["ageRange"],
    collectionStatus: undef(row.collection_status) as Submission["collectionStatus"],
    howAcquired: undef(row.how_acquired) as Submission["howAcquired"],
    collectionSize: undef(row.collection_size) as Submission["collectionSize"],
    firstName: undef(row.first_name),
    email: undef(row.email),
    utm: {
      source: undef(row.utm_source),
      medium: undef(row.utm_medium),
      campaign: undef(row.utm_campaign),
      content: undef(row.utm_content),
      term: undef(row.utm_term),
    },
    referrer: undef(row.referrer),
    landingPath: undef(row.landing_path),
    userAgent: undef(row.user_agent),
  };
}

export async function recordPageView(view: Omit<PageView, "createdAt">): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO heirloom_pageviews
      (session_id, created_at, path, utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer, user_agent)
    VALUES
      (${view.sessionId}, ${new Date().toISOString()}, ${view.path},
       ${view.utm.source ?? null}, ${view.utm.medium ?? null}, ${view.utm.campaign ?? null},
       ${view.utm.content ?? null}, ${view.utm.term ?? null},
       ${view.referrer ?? null}, ${view.userAgent ?? null})
  `;
}

export async function upsertSubmission(input: UpsertSubmissionInput): Promise<Submission> {
  await ensureSchema();
  const sql = getSql();
  const now = new Date().toISOString();
  const f = input.fields;
  const utm = input.utm ?? {};

  const rows = (await sql`
    INSERT INTO heirloom_submissions (
      session_id, created_at, updated_at, completed, current_step,
      gender, age_range, collection_status, how_acquired, collection_size,
      first_name, email,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      referrer, landing_path, user_agent
    ) VALUES (
      ${input.sessionId}, ${now}, ${now}, ${Boolean(input.completed)}, ${input.step},
      ${f.gender ?? null}, ${f.ageRange ?? null}, ${f.collectionStatus ?? null},
      ${f.howAcquired ?? null}, ${f.collectionSize ?? null},
      ${f.firstName ?? null}, ${f.email ?? null},
      ${utm.source ?? null}, ${utm.medium ?? null}, ${utm.campaign ?? null},
      ${utm.content ?? null}, ${utm.term ?? null},
      ${input.referrer ?? null}, ${input.landingPath ?? null}, ${input.userAgent ?? null}
    )
    ON CONFLICT (session_id) DO UPDATE SET
      updated_at = EXCLUDED.updated_at,
      completed = heirloom_submissions.completed OR EXCLUDED.completed,
      current_step = GREATEST(heirloom_submissions.current_step, EXCLUDED.current_step),
      gender = COALESCE(EXCLUDED.gender, heirloom_submissions.gender),
      age_range = COALESCE(EXCLUDED.age_range, heirloom_submissions.age_range),
      collection_status = COALESCE(EXCLUDED.collection_status, heirloom_submissions.collection_status),
      how_acquired = COALESCE(EXCLUDED.how_acquired, heirloom_submissions.how_acquired),
      collection_size = COALESCE(EXCLUDED.collection_size, heirloom_submissions.collection_size),
      first_name = COALESCE(EXCLUDED.first_name, heirloom_submissions.first_name),
      email = COALESCE(EXCLUDED.email, heirloom_submissions.email),
      utm_source = COALESCE(EXCLUDED.utm_source, heirloom_submissions.utm_source),
      utm_medium = COALESCE(EXCLUDED.utm_medium, heirloom_submissions.utm_medium),
      utm_campaign = COALESCE(EXCLUDED.utm_campaign, heirloom_submissions.utm_campaign),
      utm_content = COALESCE(EXCLUDED.utm_content, heirloom_submissions.utm_content),
      utm_term = COALESCE(EXCLUDED.utm_term, heirloom_submissions.utm_term),
      referrer = COALESCE(heirloom_submissions.referrer, EXCLUDED.referrer),
      landing_path = COALESCE(heirloom_submissions.landing_path, EXCLUDED.landing_path),
      user_agent = COALESCE(heirloom_submissions.user_agent, EXCLUDED.user_agent)
    RETURNING *
  `) as unknown as SubmissionRow[];

  return rowToSubmission(rows[0]);
}

export async function getAllSubmissions(): Promise<Submission[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM heirloom_submissions ORDER BY created_at DESC
  `) as unknown as SubmissionRow[];
  return rows.map(rowToSubmission);
}

export async function getAllPageViews(): Promise<PageView[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM heirloom_pageviews
  `) as unknown as Array<{
    session_id: string;
    created_at: string;
    path: string;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    utm_term: string | null;
    referrer: string | null;
    user_agent: string | null;
  }>;

  return rows.map((row) => ({
    sessionId: row.session_id,
    createdAt: new Date(row.created_at).toISOString(),
    path: row.path,
    utm: {
      source: undef(row.utm_source),
      medium: undef(row.utm_medium),
      campaign: undef(row.utm_campaign),
      content: undef(row.utm_content),
      term: undef(row.utm_term),
    },
    referrer: undef(row.referrer),
    userAgent: undef(row.user_agent),
  }));
}
