const people = [
  { initial: "S", name: "Sarah", role: "Can view & add notes", status: "Invited" },
  { initial: "M", name: "Mike", role: "Can view & add notes", status: "Invited" },
  { initial: "D", name: "You", role: "Owner", status: "Active" },
];

export default function FamilySharingMock() {
  return (
    <div className="flex h-full w-full flex-col bg-parchment px-4 pt-9 pb-4 text-ink">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/15">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="6" r="3" stroke="var(--color-terracotta)" strokeWidth="1.6" />
            <circle cx="5" cy="18" r="3" stroke="var(--color-terracotta)" strokeWidth="1.6" />
            <circle cx="19" cy="18" r="3" stroke="var(--color-terracotta)" strokeWidth="1.6" />
            <path d="M12 9v3m0 0-5 3m5-3 5 3" stroke="var(--color-terracotta)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-serif-display text-lg text-ink">Settling this together</p>
        <p className="mt-1 text-[10px] text-warmgrey">
          3 people are settling Dad&apos;s Collection together
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {people.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2.5 rounded-xl border border-brass/20 bg-cream px-2.5 py-2"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ledger/15 font-serif-display text-[13px] text-ledger">
              {p.initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-ink">{p.name}</p>
              <p className="text-[10px] text-warmgrey">{p.role}</p>
            </div>
            <span className="rounded-full bg-brass/15 px-2 py-0.5 text-[9px] font-medium text-brass-dark">
              {p.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-center gap-2 rounded-full bg-brass py-2.5 text-[12px] font-medium text-cream shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span>Invite a Sibling</span>
        </div>
      </div>
    </div>
  );
}
