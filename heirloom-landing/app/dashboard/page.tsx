import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/dashboard/LogoutButton";
import { DASHBOARD_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getFunnelSummary } from "@/lib/analytics";
import {
  AGE_LABELS,
  COLLECTION_STATUS_LABELS,
  GENDER_LABELS,
} from "@/lib/labels";
import { getAllSubmissions } from "@/lib/store";

export const dynamic = "force-dynamic";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-cream px-4 py-4">
      <p className="text-[11px] font-medium tracking-wide text-warmgrey uppercase">{label}</p>
      <p className="font-serif-display mt-1 text-2xl text-ink tabular-nums-serif">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-warmgrey">{sub}</p>}
    </div>
  );
}

function labelOr(map: Record<string, string>, key?: string): string {
  if (!key) return "—";
  return map[key] ?? key;
}

export default async function DashboardPage() {
  // Defense in depth: proxy already checked this optimistically, re-verify here.
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    redirect("/dashboard/login");
  }

  const [summary, submissions] = await Promise.all([getFunnelSummary(), getAllSubmissions()]);
  const maxStepCount = Math.max(1, ...summary.stepReach.map((s) => s.count));

  return (
    <div className="min-h-screen bg-parchment px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif-display text-2xl text-ink">Heirloom waitlist results</p>
            <p className="text-xs text-warmgrey">
              Local test data — resets if the /data folder is cleared.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/dashboard/export"
              className="rounded-full bg-brass px-4 py-1.5 text-xs font-semibold text-cream transition hover:bg-brass-dark"
            >
              Export CSV
            </a>
            <LogoutButton />
          </div>
        </div>

        {/* Top-line funnel */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Page views" value={String(summary.totalViews)} />
          <StatCard label="Signup starts" value={String(summary.totalStarts)} />
          <StatCard label="Completed" value={String(summary.totalCompleted)} />
          <StatCard label="Start rate" value={`${summary.startRate}%`} sub="starts / views" />
          <StatCard
            label="Completion rate"
            value={`${summary.completionRate}%`}
            sub="completed / starts"
          />
          <StatCard label="Overall rate" value={`${summary.overallRate}%`} sub="completed / views" />
        </div>

        {/* Step-by-step drop-off */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-cream p-5">
          <h2 className="text-sm font-semibold text-ink">Form drop-off by step</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {summary.stepReach.map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-xs text-ink/70">{s.label}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-ledger"
                    style={{ width: `${(s.count / maxStepCount) * 100}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-xs tabular-nums text-ink/70">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion by traffic source — this is the ad-testing table */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-cream p-5">
          <h2 className="text-sm font-semibold text-ink">Conversion by traffic source</h2>
          <p className="mt-1 text-xs text-warmgrey">
            Reads utm_source from the landing URL — tag each ad/campaign link so this breaks out
            per creative or channel.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead>
                <tr className="text-warmgrey">
                  <th className="pb-2 pr-3 font-medium">Source</th>
                  <th className="pb-2 pr-3 font-medium">Views</th>
                  <th className="pb-2 pr-3 font-medium">Starts</th>
                  <th className="pb-2 pr-3 font-medium">Completed</th>
                  <th className="pb-2 pr-3 font-medium">Start rate</th>
                  <th className="pb-2 pr-3 font-medium">Completion rate</th>
                  <th className="pb-2 font-medium">Overall rate</th>
                </tr>
              </thead>
              <tbody>
                {summary.bySource.map((row) => (
                  <tr key={row.source} className="border-t border-ink/10">
                    <td className="py-2 pr-3 font-medium text-ink">{row.source}</td>
                    <td className="py-2 pr-3 text-ink/80">{row.views}</td>
                    <td className="py-2 pr-3 text-ink/80">{row.starts}</td>
                    <td className="py-2 pr-3 text-ink/80">{row.completions}</td>
                    <td className="py-2 pr-3 text-ink/80">{row.startRate}%</td>
                    <td className="py-2 pr-3 text-ink/80">{row.completionRate}%</td>
                    <td className="py-2 text-ink/80">{row.overallRate}%</td>
                  </tr>
                ))}
                {summary.bySource.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-warmgrey">
                      No traffic yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Demographic breakdown among completed signups */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BreakdownCard title="Gender (completed)" data={summary.genderBreakdown} labels={GENDER_LABELS} />
          <BreakdownCard title="Age range (completed)" data={summary.ageBreakdown} labels={AGE_LABELS} />
          <BreakdownCard
            title="Collection status (completed)"
            data={summary.collectionStatusBreakdown}
            labels={COLLECTION_STATUS_LABELS}
          />
        </div>

        {/* Full submission data */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-cream p-5">
          <h2 className="text-sm font-semibold text-ink">All responses ({submissions.length})</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-xs">
              <thead>
                <tr className="text-warmgrey">
                  <th className="pb-2 pr-3 font-medium">Started</th>
                  <th className="pb-2 pr-3 font-medium">Status</th>
                  <th className="pb-2 pr-3 font-medium">Gender</th>
                  <th className="pb-2 pr-3 font-medium">Age</th>
                  <th className="pb-2 pr-3 font-medium">Collection status</th>
                  <th className="pb-2 pr-3 font-medium">How acquired</th>
                  <th className="pb-2 pr-3 font-medium">Size</th>
                  <th className="pb-2 pr-3 font-medium">First name</th>
                  <th className="pb-2 pr-3 font-medium">Email</th>
                  <th className="pb-2 pr-3 font-medium">UTM source</th>
                  <th className="pb-2 font-medium">Campaign</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.sessionId} className="border-t border-ink/10 align-top">
                    <td className="py-2 pr-3 whitespace-nowrap text-ink/70">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          s.completed
                            ? "bg-ledger/15 text-ledger"
                            : "bg-brass/15 text-brass-dark"
                        }`}
                      >
                        {s.completed ? "Completed" : `Step ${s.currentStep}/7`}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-ink/80">{labelOr(GENDER_LABELS, s.gender)}</td>
                    <td className="py-2 pr-3 text-ink/80">{labelOr(AGE_LABELS, s.ageRange)}</td>
                    <td className="py-2 pr-3 text-ink/80">
                      {labelOr(COLLECTION_STATUS_LABELS, s.collectionStatus)}
                    </td>
                    <td className="py-2 pr-3 text-ink/80">{s.howAcquired ?? "—"}</td>
                    <td className="py-2 pr-3 text-ink/80">{s.collectionSize ?? "—"}</td>
                    <td className="py-2 pr-3 text-ink/80">{s.firstName ?? "—"}</td>
                    <td className="py-2 pr-3 text-ink/80">{s.email ?? "—"}</td>
                    <td className="py-2 pr-3 text-ink/80">{s.utm.source ?? "—"}</td>
                    <td className="py-2 text-ink/80">{s.utm.campaign ?? "—"}</td>
                  </tr>
                ))}
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-4 text-center text-warmgrey">
                      No responses yet — submit the form on the landing page to test.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function BreakdownCard({
  title,
  data,
  labels,
}: {
  title: string;
  data: Record<string, number>;
  labels: Record<string, string>;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  return (
    <div className="rounded-2xl border border-ink/10 bg-cream p-5">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-3 flex flex-col gap-2">
        {entries.length === 0 && <p className="text-xs text-warmgrey">No data yet.</p>}
        {entries.map(([key, count]) => (
          <div key={key} className="flex items-center justify-between text-xs">
            <span className="text-ink/75">{labels[key] ?? key}</span>
            <span className="tabular-nums text-ink/60">
              {count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
