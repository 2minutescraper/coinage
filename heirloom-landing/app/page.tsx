import Faq from "@/components/Faq";
import FeatureRow from "@/components/FeatureRow";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import BatchScanMock from "@/components/mocks/BatchScanMock";
import FamilySharingMock from "@/components/mocks/FamilySharingMock";
import PageViewTracker from "@/components/PageViewTracker";
import PhoneFrame from "@/components/PhoneFrame";
import SignupForm from "@/components/SignupForm";
import StickyMobileCta from "@/components/StickyMobileCta";

export default function Home() {
  return (
    <>
      <PageViewTracker />
      <main>
        <Hero />

        <FeatureRow
          eyebrow="Batch Scan"
          title="Scan the whole box, not one coin at a time"
          description="Every other coin app makes you scan one coin, wait, then do it again. Heirloom sweeps a whole tray at once — because an inherited collection isn't a handful of coins, it's a shoebox, a jar, or a full album."
          bullets={[
            "Lay coins out on any surface and sweep the camera once",
            "Live count as it works — no dead-air loading screen",
            "Built for volume: dozens to hundreds of coins in one pass",
          ]}
          viralNote="The 'lay it all out and watch it fill in live' moment is inherently more satisfying on video than a static photo-and-wait flow — it's the hook in every ad we'd run."
          mock={
            <PhoneFrame>
              <BatchScanMock />
            </PhoneFrame>
          }
        />

        <FeatureRow
          eyebrow="Family Sharing"
          title="Settle it together, not over group texts"
          description="Inherited collections usually belong to more than one person. Invite siblings or co-heirs into the same collection so everyone sees the same values, the same standout pieces, and the same total."
          bullets={[
            "Invite co-heirs with one link — no spreadsheets",
            "Everyone sees the same appraised values",
            "A real reason to invite, not a referral gimmick",
          ]}
          viralNote="Every invite here has a genuine reason behind it — splitting an estate actually requires everyone on the same page. That makes the growth loop structural, not artificial."
          mock={
            <PhoneFrame>
              <FamilySharingMock />
            </PhoneFrame>
          }
          reverse
        />

        <HowItWorks />

        <section id="signup" className="scroll-mt-8 bg-parchment py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-10 max-w-xl text-center">
              <h2 className="font-serif-display text-3xl text-ink sm:text-4xl">
                Get early access
              </h2>
              <p className="mt-3 text-base text-ink/75">
                We&apos;re letting people in a few at a time. Join the list and we&apos;ll email
                you the moment it&apos;s your turn.
              </p>
            </div>
            <SignupForm />
          </div>
        </section>

        <Faq />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
