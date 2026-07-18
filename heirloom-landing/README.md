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

## Storage: local JSON file vs. Postgres

`lib/store.ts` is a thin switch, not an implementation:

- **No `DATABASE_URL` set** (local dev, `.env.local` today) → `lib/store.local.ts`, which reads
  and writes JSON files under `/data`. Fine for a single long-running `next dev` / `next start`
  process; **not** safe on Vercel (serverless functions there have an ephemeral, effectively
  read-only filesystem, and requests can land on different instances).
- **`DATABASE_URL` set** → `lib/store.postgres.ts`, using `@neondatabase/serverless`. Tables
  (`heirloom_submissions`, `heirloom_pageviews`) are created automatically on first request — no
  migration step needed.

Vercel injects `DATABASE_URL` automatically once you connect a Marketplace Postgres store (Neon)
to the project — see deploy steps below. Nothing else in the app needs to change either way; every
route/page only imports from `lib/store.ts`.

## Deploying to Vercel

1. **Import the repo**: [vercel.com/new](https://vercel.com/new) → import `2minutescraper/coinage`
   → set **Root Directory** to `heirloom-landing` → set the branch to
   `claude/coin-identifier-research-kvvg6z` (or merge it to `main` first if you'd rather deploy
   from there).
2. **Add a Postgres store**: in the new project, go to **Storage → Marketplace Database Providers → Postgres**
   (Neon), create a store, and connect it to this project. Vercel injects `DATABASE_URL` (and
   `DATABASE_URL_UNPOOLED`) automatically — no manual copy-pasting.
3. **Set the two dashboard env vars** (Project Settings → Environment Variables) — don't reuse the
   local dev values in `.env.local`, generate fresh ones for production:
   - `DASHBOARD_PASSWORD` — whatever you want the dashboard password to be
   - `DASHBOARD_SESSION_SECRET` — a random string, e.g. `openssl rand -hex 32`
4. **Deploy.** First request to `/api/track-view` or `/api/signup` after deploy will create the
   Postgres tables automatically.

I couldn't run this deploy myself from this session — `vercel.com`/`api.vercel.com` are blocked by
this sandbox's network egress policy, and there's no Vercel connector enabled here — so steps 1–4
need to happen from your own Vercel account.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · `@neondatabase/serverless` for
Postgres (only loaded when `DATABASE_URL` is set) · no other external UI/data libraries. Brand
tokens (colors, fonts) live in `app/globals.css`, matching `../Documentation/Product Spec.md`.
