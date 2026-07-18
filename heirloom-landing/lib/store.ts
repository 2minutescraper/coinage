/**
 * Data layer entry point — every route handler and the dashboard page import
 * from here, never from store.local.ts / store.postgres.ts directly.
 *
 * Local dev has no DATABASE_URL, so it uses the JSON-file store. Once
 * deployed to Vercel with a Marketplace Postgres store connected (Neon),
 * Vercel injects DATABASE_URL automatically and this switches to Postgres —
 * no other code changes needed.
 */
import * as localStore from "./store.local";
import * as postgresStore from "./store.postgres";

const impl = process.env.DATABASE_URL ? postgresStore : localStore;

export const recordPageView = impl.recordPageView;
export const upsertSubmission = impl.upsertSubmission;
export const getAllSubmissions = impl.getAllSubmissions;
export const getAllPageViews = impl.getAllPageViews;

export type { UpsertSubmissionInput } from "./types";
