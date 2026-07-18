import { getAllPageViews, getAllSubmissions } from "./store";
import { STEP_LABELS, TOTAL_FORM_STEPS, type PageView, type Submission } from "./types";

function pct(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10; // one decimal
}

function sourceKey(utmSource?: string): string {
  return utmSource?.trim() ? utmSource.trim().toLowerCase() : "direct / unknown";
}

export interface SourceFunnelRow {
  source: string;
  views: number;
  starts: number;
  completions: number;
  startRate: number;
  completionRate: number;
  overallRate: number;
}

export interface FunnelSummary {
  totalViews: number;
  totalStarts: number;
  totalCompleted: number;
  startRate: number;
  completionRate: number;
  overallRate: number;
  stepReach: { step: number; label: string; count: number }[];
  bySource: SourceFunnelRow[];
  genderBreakdown: Record<string, number>;
  ageBreakdown: Record<string, number>;
  collectionStatusBreakdown: Record<string, number>;
}

function tally(rows: (string | undefined)[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) {
    if (!r) continue;
    out[r] = (out[r] ?? 0) + 1;
  }
  return out;
}

export async function getFunnelSummary(): Promise<FunnelSummary> {
  const [views, submissions] = await Promise.all([getAllPageViews(), getAllSubmissions()]);

  const totalViews = views.length;
  const totalStarts = submissions.length;
  const totalCompleted = submissions.filter((s) => s.completed).length;

  const stepReach = Array.from({ length: TOTAL_FORM_STEPS }, (_, i) => {
    const step = i + 1;
    return {
      step,
      label: STEP_LABELS[step] ?? `Step ${step}`,
      count: submissions.filter((s) => s.currentStep >= step).length,
    };
  });

  const bySource = buildSourceFunnel(views, submissions);

  return {
    totalViews,
    totalStarts,
    totalCompleted,
    startRate: pct(totalStarts, totalViews),
    completionRate: pct(totalCompleted, totalStarts),
    overallRate: pct(totalCompleted, totalViews),
    stepReach,
    bySource,
    genderBreakdown: tally(submissions.filter((s) => s.completed).map((s) => s.gender)),
    ageBreakdown: tally(submissions.filter((s) => s.completed).map((s) => s.ageRange)),
    collectionStatusBreakdown: tally(
      submissions.filter((s) => s.completed).map((s) => s.collectionStatus),
    ),
  };
}

function buildSourceFunnel(views: PageView[], submissions: Submission[]): SourceFunnelRow[] {
  const sources = new Set<string>();
  views.forEach((v) => sources.add(sourceKey(v.utm.source)));
  submissions.forEach((s) => sources.add(sourceKey(s.utm.source)));

  const rows: SourceFunnelRow[] = Array.from(sources).map((source) => {
    const viewCount = views.filter((v) => sourceKey(v.utm.source) === source).length;
    const sourceSubmissions = submissions.filter((s) => sourceKey(s.utm.source) === source);
    const starts = sourceSubmissions.length;
    const completions = sourceSubmissions.filter((s) => s.completed).length;
    return {
      source,
      views: viewCount,
      starts,
      completions,
      startRate: pct(starts, viewCount),
      completionRate: pct(completions, starts),
      overallRate: pct(completions, viewCount),
    };
  });

  return rows.sort((a, b) => b.views - a.views);
}
