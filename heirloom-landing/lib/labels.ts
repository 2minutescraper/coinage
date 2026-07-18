import type {
  AgeRange,
  CollectionSize,
  CollectionStatus,
  Gender,
  HowAcquired,
} from "./types";

export const GENDER_LABELS: Record<Gender, string> = {
  female: "Female",
  male: "Male",
  prefer_not_to_say: "Prefer not to say",
};

export const AGE_LABELS: Record<AgeRange, string> = {
  under_25: "Under 25",
  "25_34": "25–34",
  "35_44": "35–44",
  "45_54": "45–54",
  "55_64": "55–64",
  "65_plus": "65+",
};

export const COLLECTION_STATUS_LABELS: Record<CollectionStatus, string> = {
  have_now: "Yes, I have one right now",
  had_before: "I had one — it's already handled",
  expect_to: "Not yet, but I expect to",
  not_yet: "No, just curious",
};

export const HOW_ACQUIRED_LABELS: Record<HowAcquired, string> = {
  inherited_parent_relative: "Inherited from a parent or relative",
  cleaning_out_home: "Found while cleaning out a home",
  passed_down_family: "Passed down within the family",
  other: "Something else",
};

export const COLLECTION_SIZE_LABELS: Record<CollectionSize, string> = {
  handful: "A handful of coins",
  jar_or_box: "A jar or shoebox",
  album_or_multiple_boxes: "A full album or several boxes",
  not_sure: "Honestly not sure",
};

export function optionsFrom<T extends string>(
  labels: Record<T, string>,
): { value: T; label: string }[] {
  return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));
}
