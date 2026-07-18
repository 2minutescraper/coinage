import Coin from "@/components/Coin";

const standouts = [
  { name: "1909-S VDB Lincoln Cent", year: "1909", value: "$740" },
  { name: "1916-D Mercury Dime", year: "1916", value: "$610" },
  { name: "1921 Morgan Dollar", year: "1921", value: "$95" },
];

export default function ValueRevealMock() {
  return (
    <div className="flex h-full w-full flex-col bg-parchment px-4 pt-9 pb-4 text-ink">
      <p className="text-center text-[10px] font-medium uppercase tracking-[0.14em] text-warmgrey">
        Dad&apos;s Collection
      </p>

      <div className="relative mt-3 flex flex-col items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 h-32 w-32 rounded-full opacity-70 blur-2xl"
          style={{ background: "radial-gradient(circle, var(--color-brass) 0%, transparent 70%)" }}
        />
        <p className="font-serif-display relative text-4xl font-medium text-ledger tabular-nums-serif">
          $2,340
        </p>
        <p className="relative mt-1 text-[11px] text-warmgrey">14 coins identified</p>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {standouts.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-2.5 rounded-xl border border-brass/20 bg-cream px-2.5 py-2"
          >
            <Coin size={26} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-ink">{c.name}</p>
              <p className="text-[10px] text-warmgrey">{c.year}</p>
            </div>
            <p className="font-serif-display text-[13px] text-ledger tabular-nums-serif">
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-center gap-2 rounded-full bg-brass py-2.5 text-[12px] font-medium text-cream shadow-sm">
          <span>Share the Reveal</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 0 6c.35 0 .68-.06 1-.17l-6.1 3.66a3 3 0 1 0 0 3.02L16 20.17A3 3 0 1 0 18 16a3 3 0 0 0-1 .17l-6.1-3.66a3.1 3.1 0 0 0 0-1.02L17 8.17c.32.11.65.17 1 .17Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
