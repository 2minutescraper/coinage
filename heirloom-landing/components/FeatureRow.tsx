import type { ReactNode } from "react";

interface FeatureRowProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  viralNote: string;
  mock: ReactNode;
  reverse?: boolean;
}

export default function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  viralNote,
  mock,
  reverse = false,
}: FeatureRowProps) {
  return (
    <div
      className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[280px]">{mock}</div>

      <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
        <p className="text-xs font-semibold tracking-[0.14em] text-terracotta uppercase">
          {eyebrow}
        </p>
        <h3 className="font-serif-display mt-2 text-2xl text-ink sm:text-3xl">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink/75">{description}</p>

        <ul className="mt-5 space-y-2.5 text-left">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-ink/80">
              <svg
                className="mt-0.5 shrink-0 text-ledger"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
                <path
                  d="m8 12.5 2.6 2.6L16.5 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-xl border border-brass/25 bg-cream px-4 py-3 text-left">
          <p className="text-[11px] font-semibold tracking-[0.1em] text-brass-dark uppercase">
            Why this spreads
          </p>
          <p className="mt-1 text-sm text-ink/80">{viralNote}</p>
        </div>
      </div>
    </div>
  );
}
