export type Gender = "female" | "male" | "prefer_not_to_say";

export type AgeRange = "under_25" | "25_34" | "35_44" | "45_54" | "55_64" | "65_plus";

export type CollectionStatus = "have_now" | "had_before" | "expect_to" | "not_yet";

export type HowAcquired =
  | "inherited_parent_relative"
  | "cleaning_out_home"
  | "passed_down_family"
  | "other";

export type CollectionSize =
  | "handful"
  | "jar_or_box"
  | "album_or_multiple_boxes"
  | "not_sure";

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

/**
 * One row per form session. Upserted step-by-step so the dashboard can show
 * true funnel drop-off, not just completed rows.
 */
export interface Submission {
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  currentStep: number;
  gender?: Gender;
  ageRange?: AgeRange;
  collectionStatus?: CollectionStatus;
  howAcquired?: HowAcquired;
  collectionSize?: CollectionSize;
  firstName?: string;
  email?: string;
  utm: UtmParams;
  referrer?: string;
  userAgent?: string;
  landingPath?: string;
}

export interface PageView {
  sessionId: string;
  createdAt: string;
  path: string;
  utm: UtmParams;
  referrer?: string;
  userAgent?: string;
}

export const TOTAL_FORM_STEPS = 7;

export const STEP_LABELS: Record<number, string> = {
  1: "Gender",
  2: "Age range",
  3: "Collection status",
  4: "How acquired",
  5: "Collection size",
  6: "First name",
  7: "Email (completed)",
};
