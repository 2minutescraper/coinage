"use client";

import { useState } from "react";
import { getOrCreateSessionId, getReferrer, getUtmParams } from "@/lib/clientSession";
import {
  AGE_LABELS,
  COLLECTION_SIZE_LABELS,
  COLLECTION_STATUS_LABELS,
  GENDER_LABELS,
  HOW_ACQUIRED_LABELS,
  optionsFrom,
} from "@/lib/labels";
import type {
  AgeRange,
  CollectionSize,
  CollectionStatus,
  Gender,
  HowAcquired,
} from "@/lib/types";

interface Option<T extends string> {
  value: T;
  label: string;
}

const GENDER_OPTIONS = optionsFrom(GENDER_LABELS);
const AGE_OPTIONS = optionsFrom(AGE_LABELS);
const COLLECTION_STATUS_OPTIONS = optionsFrom(COLLECTION_STATUS_LABELS);
const HOW_ACQUIRED_OPTIONS = optionsFrom(HOW_ACQUIRED_LABELS);
const COLLECTION_SIZE_OPTIONS = optionsFrom(COLLECTION_SIZE_LABELS);

const TOTAL_STEPS = 7;

interface Answers {
  gender?: Gender;
  ageRange?: AgeRange;
  collectionStatus?: CollectionStatus;
  howAcquired?: HowAcquired;
  collectionSize?: CollectionSize;
  firstName?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstNameDraft, setFirstNameDraft] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  function goToStep(next: number) {
    setError(null);
    setStep(next);
  }

  async function submitProgress(
    stepNum: number,
    fields: Partial<Answers>,
    isCompleted = false,
  ): Promise<boolean> {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getOrCreateSessionId(),
          step: stepNum,
          fields,
          completed: isCompleted,
          utm: getUtmParams(),
          referrer: getReferrer(),
          landingPath: window.location.pathname,
        }),
        keepalive: true,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Something went wrong. Please try again.");
        return false;
      }
      return true;
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      return false;
    }
  }

  function selectAndAdvance<K extends keyof Answers>(
    key: K,
    value: NonNullable<Answers[K]>,
    stepNum: number,
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    void submitProgress(stepNum, { [key]: value } as Partial<Answers>);
    window.setTimeout(() => goToStep(stepNum + 1), 180);
  }

  async function handleFirstNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = firstNameDraft.trim();
    if (!trimmed) {
      setError("Let us know what to call you.");
      return;
    }
    setAnswers((prev) => ({ ...prev, firstName: trimmed }));
    const ok = await submitProgress(6, { firstName: trimmed });
    if (ok) goToStep(7);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = emailDraft.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("That doesn't look like a valid email — mind double-checking it?");
      return;
    }
    setSubmitting(true);
    const ok = await submitProgress(7, { email: trimmed }, true);
    setSubmitting(false);
    if (ok) {
      setAnswers((prev) => ({ ...prev, email: trimmed }));
      setCompleted(true);
    }
  }

  if (completed) {
    return (
      <div className="animate-rise mx-auto max-w-md rounded-2xl border border-brass/25 bg-cream px-6 py-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ledger/12">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 13 4.5 4.5L19 8"
              stroke="var(--color-ledger)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-serif-display text-2xl text-ink">You&apos;re on the list.</h3>
        <p className="mt-2 text-sm text-ink/75">
          {answers.firstName ? `Thanks, ${answers.firstName}. ` : "Thanks. "}
          We&apos;ll email you the moment early access opens — no spam, just one note when it&apos;s
          your turn.
        </p>
      </div>
    );
  }

  return (
    <div
      id="signup-card"
      className="mx-auto max-w-md rounded-2xl border border-brass/25 bg-cream px-6 py-7 shadow-sm"
    >
      <div className="mb-6">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-warmgrey">
          <span>
            Step {Math.min(step, TOTAL_STEPS)} of {TOTAL_STEPS}
          </span>
          {step > 1 && step <= TOTAL_STEPS && (
            <button
              type="button"
              onClick={() => goToStep(Math.max(1, step - 1))}
              className="font-medium text-ink/60 hover:text-ink"
            >
              ← Back
            </button>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-brass transition-all duration-300"
            style={{ width: `${(Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div key={step} className="animate-rise">
        {step === 1 && (
          <StepChoice
            title="Quick one to start — how do you identify?"
            options={GENDER_OPTIONS}
            selected={answers.gender}
            onSelect={(v) => selectAndAdvance("gender", v, 1)}
          />
        )}
        {step === 2 && (
          <StepChoice
            title="What's your age range?"
            options={AGE_OPTIONS}
            selected={answers.ageRange}
            onSelect={(v) => selectAndAdvance("ageRange", v, 2)}
          />
        )}
        {step === 3 && (
          <StepChoice
            title="Do you currently have a coin collection to deal with?"
            options={COLLECTION_STATUS_OPTIONS}
            selected={answers.collectionStatus}
            onSelect={(v) => selectAndAdvance("collectionStatus", v, 3)}
          />
        )}
        {step === 4 && (
          <StepChoice
            title="How did (or would) it come to you?"
            options={HOW_ACQUIRED_OPTIONS}
            selected={answers.howAcquired}
            onSelect={(v) => selectAndAdvance("howAcquired", v, 4)}
          />
        )}
        {step === 5 && (
          <StepChoice
            title="Roughly how big is it?"
            options={COLLECTION_SIZE_OPTIONS}
            selected={answers.collectionSize}
            onSelect={(v) => selectAndAdvance("collectionSize", v, 5)}
          />
        )}
        {step === 6 && (
          <form onSubmit={handleFirstNameSubmit}>
            <h3 className="font-serif-display text-xl text-ink">Almost there — first name?</h3>
            <input
              autoFocus
              type="text"
              value={firstNameDraft}
              onChange={(e) => setFirstNameDraft(e.target.value)}
              placeholder="Jordan"
              className="mt-4 w-full rounded-xl border border-ink/15 bg-parchment px-4 py-3 text-sm text-ink outline-none focus:border-brass"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-brass py-3 text-sm font-semibold text-cream transition hover:bg-brass-dark"
            >
              Continue
            </button>
          </form>
        )}
        {step === 7 && (
          <form onSubmit={handleEmailSubmit}>
            <h3 className="font-serif-display text-xl text-ink">
              Last thing, {answers.firstName || "friend"} — where should we send early access?
            </h3>
            <input
              autoFocus
              type="email"
              value={emailDraft}
              onChange={(e) => setEmailDraft(e.target.value)}
              placeholder="you@email.com"
              className="mt-4 w-full rounded-xl border border-ink/15 bg-parchment px-4 py-3 text-sm text-ink outline-none focus:border-brass"
            />
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full rounded-full bg-brass py-3 text-sm font-semibold text-cream transition hover:bg-brass-dark disabled:opacity-60"
            >
              {submitting ? "Joining…" : "Get Early Access"}
            </button>
            <p className="mt-3 text-center text-[11px] text-warmgrey">
              We&apos;ll only email you about Heirloom early access. No spam, unsubscribe anytime.
            </p>
          </form>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-rust">{error}</p>}
    </div>
  );
}

function StepChoice<T extends string>({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: Option<T>[];
  selected?: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <h3 className="font-serif-display text-xl text-ink">{title}</h3>
      <div className="mt-4 flex flex-col gap-2.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
              selected === opt.value
                ? "border-brass bg-brass/10 text-ink"
                : "border-ink/12 bg-parchment text-ink/85 hover:border-brass/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
