import ValueRevealMock from "@/components/mocks/ValueRevealMock";
import PhoneFrame from "@/components/PhoneFrame";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-parchment pt-14 pb-16 sm:pt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
        <div className="animate-rise mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brass/30 bg-cream px-3 py-1 text-[11px] font-medium tracking-wide text-brass-dark uppercase">
            Early access · limited preview
          </p>
          <h1 className="font-serif-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            You just inherited a box of coins.
            <span className="block text-ledger">Let&apos;s find out what it&apos;s worth.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-lg">
            Heirloom scans the whole collection at once, tells you what&apos;s actually valuable,
            and helps you settle it with family — without turning you into a coin expert first.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#signup"
              className="w-full rounded-full bg-brass px-7 py-3.5 text-center text-sm font-semibold text-cream shadow-md shadow-brass/20 transition hover:bg-brass-dark sm:w-auto"
            >
              Get Early Access
            </a>
            <p className="text-xs text-warmgrey">
              Free to join the waitlist · takes about 30 seconds
            </p>
          </div>
        </div>

        <div className="animate-rise mx-auto w-full max-w-[300px] [animation-delay:150ms]">
          <PhoneFrame>
            <ValueRevealMock />
          </PhoneFrame>
          <div className="mt-5 rounded-xl border border-brass/25 bg-cream px-4 py-3 text-left">
            <p className="text-[11px] font-semibold tracking-[0.1em] text-brass-dark uppercase">
              Why this spreads
            </p>
            <p className="mt-1 text-sm text-ink/80">
              One total, revealed all at once — a personal, once-you-see-it-you-share-it moment,
              not a single-coin flex. It reads as discovery, not bragging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
