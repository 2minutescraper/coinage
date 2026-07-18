const steps = [
  {
    n: "01",
    title: "Lay the coins out",
    body: "Spread the box, jar, or album on a table. One sweep of the camera finds every coin at once — no one-at-a-time scanning.",
  },
  {
    n: "02",
    title: "See the full picture",
    body: "One number for the whole collection, plus the handful of pieces actually worth a closer look. No jargon required.",
  },
  {
    n: "03",
    title: "Decide together",
    body: "Bring siblings or co-heirs into the same collection, add the story behind a piece, and choose what to keep, split, or sell.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-walnut py-16 text-parchment">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold tracking-[0.14em] text-brass uppercase">
            How it works
          </p>
          <h2 className="font-serif-display mt-2 text-3xl sm:text-4xl">
            One afternoon instead of six months
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center sm:text-left">
              <p className="font-serif-display text-3xl text-brass">{s.n}</p>
              <h3 className="font-serif-display mt-2 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-parchment/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
