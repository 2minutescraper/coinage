export default function Coin({ size = 40, tone = "brass" }: { size?: number; tone?: "brass" | "ledger" }) {
  const face = tone === "brass" ? "#c99a5f" : "#5b7768";
  const shadow = tone === "brass" ? "#8f6a39" : "#213931";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill={shadow} />
      <circle cx="20" cy="19" r="17.5" fill={face} />
      <circle
        cx="20"
        cy="19"
        r="17.5"
        fill="none"
        stroke="#00000022"
        strokeWidth="0.75"
        strokeDasharray="1.4 1.6"
      />
      <circle cx="20" cy="19" r="12.5" fill="none" stroke="#00000018" strokeWidth="0.6" />
      <circle cx="20" cy="19" r="5.5" fill="#00000014" />
    </svg>
  );
}
