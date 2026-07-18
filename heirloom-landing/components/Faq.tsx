const faqs = [
  {
    q: "Is this free?",
    a: "Joining the early access list is free. Heirloom will have a free tier for identifying and organizing your collection, with optional paid features for things like executor reports and consignment.",
  },
  {
    q: "What happens with my email?",
    a: "We'll only use it to let you know when early access opens for you. No spam, no sharing with third parties, unsubscribe anytime.",
  },
  {
    q: "I'm not a coin collector — is this still for me?",
    a: "Yes. Heirloom is built specifically for people who didn't ask to become coin experts but suddenly have a collection to deal with — not for hobbyists hunting pocket change.",
  },
  {
    q: "When does the app launch?",
    a: "We're in early access preview right now. Joining the list is how you'll hear the moment it's ready.",
  },
];

export default function Faq() {
  return (
    <section className="bg-parchment py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-serif-display text-center text-3xl text-ink">A few questions</h2>
        <div className="mt-10 flex flex-col divide-y divide-ink/10">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="text-sm font-semibold text-ink">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
