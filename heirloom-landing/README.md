# Heirloom — waitlist landing page (demand-validation test)

A mobile-first landing page for **Heirloom** (see `../Documentation/Product Spec.md`), built to
smoke-test paid/organic ad conversion before writing any app code. It highlights the three
features flagged as most likely to spread (Value Reveal, Batch Scan, Family Sharing), and ends
in a real waitlist form so response data is genuine, even though the product isn't built yet.

## Running it locally

```bash
npm install
npm run dev
```

- Landing page: http://localhost:3000
- Results dashboard: http://localhost:3000/dashboard (password-protected, see `.env.local`)

Config lives in `.env.local` (gitignored; `.env.example` shows the shape):

- `DASHBOARD_PASSWORD` — password to view `/dashboard`
- `DASHBOARD_SESSION_SECRET` — random secret used to sign the dashboard session cookie

## How the signup form is structured

`components/SignupForm.tsx` is a 7-step tap-to-advance form, ordered easiest → hardest per the
usual multi-step-form completion-rate playbook:

1. Gender (tap)
2. Age range (tap)
3. Current collection status (tap)
4. How it was/would be acquired (tap)
5. Collection size (tap)
6. First name (text)
7. Email (text, final submit)

Every step is upserted to the backing store immediately (`/api/signup`), keyed by a per-visit
`sessionId` — so the dashboard shows true funnel drop-off (how many people got to step 3 vs. how
many finished), not just completed rows. `/api/track-view` logs a page-view beacon on load so the
dashboard can also compute page-view → signup-start → signup-complete conversion, broken out by
`utm_source` — tag your ad links with `?utm_source=...&utm_campaign=...` and the dashboard's
"Conversion by traffic source" table will split results per channel automatically.

## Dashboard

`/dashboard` is gated by `proxy.ts` (Next 16's renamed `middleware.ts`) checking a signed,
stateless session cookie, with a second server-side check in the page itself (the proxy check is
explicitly documented by Next.js as optimistic-only, not a full auth solution). Login sets the
cookie via `/api/dashboard/login`; `/api/dashboard/export` streams every response as CSV.

## ⚠️ Before deploying to Vercel

This currently stores data in local JSON files (`lib/store.ts`, writing to `/data`). That's fine
for this local test server (`next dev` / `next start` on one long-running process), but it will
**not** work once deployed to Vercel — serverless functions there have an ephemeral, effectively
read-only filesystem and requests can land on different instances, so writes would be lost or
inconsistent.

Before deploying: swap the four functions in `lib/store.ts` (`recordPageView`,
`upsertSubmission`, `getAllPageViews`, `getAllSubmissions`) for a real backing store — e.g. Vercel
Postgres, Vercel KV, or Supabase. Nothing else in the app needs to change; every caller only
depends on that one file's exports. Everything else here (Next.js App Router, the `proxy.ts` auth
gate, the API routes) is already Vercel-native and needs no changes.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · no external UI/data libraries.
Brand tokens (colors, fonts) live in `app/globals.css`, matching `../Documentation/Product Spec.md`.
