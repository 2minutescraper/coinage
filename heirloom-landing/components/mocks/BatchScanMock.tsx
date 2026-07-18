import Coin from "@/components/Coin";

const tray = [
  { top: "10%", left: "14%", rot: -8 },
  { top: "8%", left: "52%", rot: 10 },
  { top: "26%", left: "30%", rot: 4 },
  { top: "24%", left: "68%", rot: -14 },
  { top: "42%", left: "12%", rot: 12 },
  { top: "44%", left: "48%", rot: -6 },
  { top: "40%", left: "78%", rot: 8 },
  { top: "60%", left: "26%", rot: -10 },
  { top: "62%", left: "62%", rot: 6 },
];

export default function BatchScanMock() {
  return (
    <div className="relative flex h-full w-full flex-col bg-[#3c3327] px-3 pt-9 pb-4">
      <div className="flex items-center justify-between rounded-full bg-parchment/95 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="var(--color-brass-dark)" strokeWidth="2" />
            <path d="m21 21-4.3-4.3" stroke="var(--color-brass-dark)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-medium text-ink">52 coins identified</span>
        </div>
        <div className="h-1 w-10 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full w-4/5 rounded-full bg-ledger" />
        </div>
      </div>

      <div className="relative mt-3 flex-1 overflow-hidden rounded-2xl bg-[#5b4a34]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 18px)",
          }}
        />
        {tray.map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-md border border-brass/70"
            style={{
              top: pos.top,
              left: pos.left,
              width: 46,
              height: 46,
              transform: `rotate(${pos.rot}deg)`,
            }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Coin size={30} tone={i % 3 === 0 ? "ledger" : "brass"} />
            </div>
            <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-brass px-1 text-[7px] font-medium text-cream">
              1c &apos;{40 + i}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center font-serif-display text-[11px] italic text-parchment/80">
        Lay the coins out, we&apos;ll find the rest.
      </p>

      <div className="mt-3 flex justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brass">
          <div className="h-8 w-8 rounded-full bg-brass" />
        </div>
      </div>
    </div>
  );
}
