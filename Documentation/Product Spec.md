# Product Spec: Strike — AI Coin Scanner

**Working name:** Strike *(double meaning: the "strike" of a coin's minting, and "you just struck gold." Run a trademark / app-store-name clearance pass before locking — backup names: Relic, Mint Drop, CoinPop.)*
**Tagline:** Scan. Strike. Cash in.
**One-liner:** A live AR coin scanner built around a single mechanic — a cinematic, screen-recordable "reveal" moment — so that identifying a coin is content, not a utility task.

**Category context:** The coin-identifier category (CoinSnap, CoinKnow, Coinoscope, Coin ID Scanner, et al.) is saturated with near-identical snap-a-photo-and-wait utilities. Ad Library research shows 390+ active ads running generic "Install Free" performance creative against an identical value prop. Strike's wedge is emotional design, not database size: nobody in the category has made the *moment of discovery* itself the product.

---

## 1. Look and Feel / Branding Guidelines

### 1.1 Brand personality
Cinematic, kinetic, a little bit greedy in a fun way — closer to a loot-reveal in a game or a scratch-off ticket than a reference app. Confident and a little irreverent in copy ("Let's see what you've got"), never dry or encyclopedic. The camera view should feel like a viewfinder for treasure, not a scanner for data.

Explicitly **avoid** literal casino/slot-machine imagery (spinning reels, dice, chips) — it earns the payoff psychology of gambling without tripping App Store gambling-policy reviews or an inflated age rating. The reveal mechanic borrows the *feeling* of a jackpot through motion, light, and sound — not the visual vocabulary of a casino.

### 1.2 Color palette

Dark-first UI: the camera feed is the hero, so chrome stays low-contrast and dark until a reveal fires, at which point saturated accent colors do all the work.

| Role | Name | Hex | Use |
|---|---|---|---|
| Base | Ink Black | `#0B0B0F` | App background, camera chrome |
| Surface | Slate | `#1D1D24` | Cards, sheets, nav bars |
| Primary | Antique Gold | `#D4A657` | Brand mark, primary buttons, coin-metal warmth |
| Secondary | Aged Bronze | `#8C6239` | Secondary UI, dividers, inactive states |
| Text (on dark) | Parchment White | `#F5F1E8` | Primary text — warm off-white, not stark white |
| Text (muted) | Warm Gray | `#9A958C` | Secondary text, timestamps, metadata |
| Success / Rarity glow | Spark Green | `#39FF88` | Rare-tier reveal glow, positive value deltas |
| Legendary glow | Ruby Flare | `#FF3B6B` | Top-tier reveal glow, used sparingly so it stays special |
| Info | Electric Cyan | `#4FD8EA` | AR scan reticle, live-tracking states |

Rule of thumb: gold and bronze are the *brand at rest*; green, ruby, and cyan are the *brand in motion* — reserved for scan-tracking and reveal moments so they keep their charge and never feel decorative.

### 1.3 Typography

- **Display / numerals — Space Grotesk (Bold/Medium).** Geometric, confident, and — critically — has strong tabular figures, since dollar values roll up like an odometer during the reveal and digits must align without jitter.
- **Body / UI — Inter (Regular/Medium).** Neutral, highly legible at small sizes for coin metadata, settings, chat.
- **Numeral treatment:** all currency and rarity-count figures use tabular lining numerals with a slight monospace rhythm during count-up animations (e.g., `$0 → $1 → $4 → $12 → $47`).

### 1.4 Iconography, shape & motion language

- **Corners:** consistently rounded (16–24px radii) — cards, sheets, and the reveal frame all share one radius scale so the UI feels like a single coin-adjacent object, not a generic app.
- **Materials:** subtle glassmorphism on overlays atop the live camera feed (frosted scrim, not opaque), so the real world is always half-visible — reinforces "this is really happening to your coin, right now."
- **Rarity tiers** get a consistent visual language across the entire app (icon, color, particle style, sound) so a tier is recognizable at a glance in a screenshot, a leaderboard, or a TikTok thumbnail:

| Tier | Color cue | Particle/FX motif | Feel |
|---|---|---|---|
| Common | Bronze outline | Soft dust shimmer | "Neat, logged it" |
| Uncommon | Silver outline | Light spark trail | "Ooh, okay" |
| Rare | Gold glow | Rising embers | "Wait, WHAT" |
| Ultra Rare | Spark Green aura | Particle burst + screen flash | Phone-shake reaction |
| Legendary | Ruby/prismatic aura | Full-screen burst, haptic thump, distinct chime | Scream-and-call-someone-over |

- **Motion principles:** fast, purposeful easing everywhere *except* the reveal sequence, which deliberately uses an anticipation-then-payoff curve — a ~1.5s slow build (coin rotates in 3D, gauge climbs, tension music swells) followed by a ~200ms snap payoff (burst, haptic, sound). Every other interaction in the app (nav, taps, sheets) stays snappy (150–250ms) so the reveal's slowness reads as intentional drama, not lag.
- **Sound & haptics:** each tier has a distinct short sound cue and haptic pattern (light tap for Common, escalating to a heavy thump + rumble for Legendary). Sound is on by default — it's a TikTok app; silent video is a worse asset.

---

## 2. Functionality & Viral-Growth Highlights

### 2.1 Core loop

```
Open app → Live AR viewfinder auto-locks onto coin → Tap "Strike"
   → 1.5–2s cinematic reveal build-up → Tiered payoff burst
   → Result card (ID, era, mint, condition, value range, rarity tier)
   → One-tap: [ Save to Vault ] [ Share Clip ] [ Get Cash Offer ]
```

Every scan — even a common 2019 quarter — completes this loop and produces a tier badge. This matters because most coins people scan *aren't* valuable; competitor apps end the experience on a flat, disappointing "worth $0.25." Strike reframes every scan as a small win ("Common" is still a collected tier, not a dead end), which is what makes daily reuse and collection psychology possible.

### 2.2 Key features

**a) Live AR auto-lock scanning.** A real-time computer-vision reticle tracks and locks onto a coin in the live camera feed and auto-captures at focus — no "line it up and hope" photo-taking like every competitor. Feels closer to Pokémon GO / Google Lens than a document scanner. *Removes the single biggest friction point in the category.*

**b) The Strike reveal (signature mechanic).** Described above — the anticipation-payoff animation is the product's core IP. It is explicitly designed to be screen-recorded: full-bleed, sound-on, portrait-native, nothing else on screen competing for attention.

**c) Rarity tier system.** Common → Uncommon → Rare → Ultra Rare → Legendary, assigned to *every* coin based on population data, condition, and known error/variety status. Turns identification into a collect-them-all mechanic (gacha-style psychology) that works for casual users, not just serious numismatists.

**d) Auto-generated share clip.** The reveal isn't just an in-app animation — every result auto-renders a branded 9:16 video (tier badge, value count-up, coin macro shot) ready for one-tap export straight into TikTok/Reels/Stories, pre-filled with a caption template and a suggested trending-audio pairing. This is the single highest-leverage growth feature: it removes all effort from content creation instead of hoping users manually screen-record. **This is the feature most likely to drive organic virality.**

**e) The Vault (collection).** Saved coins live in a trophy-case / trading-card-binder view, organized by tier, with daily scan streaks and a personal "best find" pinned at the top. Drives return visits independent of any single big find.

**f) Leaderboards.** Weekly local/national/friends leaderboards of best finds by tier and value. Screenshot-native by design ("I'm #4 in California this week") and gives creators a recurring, low-effort reason to post.

**g) Cash-offer close-the-loop flow.** For Rare tier and above, a one-tap "Get a cash offer" flow routes into a coin-buying marketplace/partner network so a discovery converts into an actual payout inside the app. This produces the strongest possible testimonial content ("the app just paid me $340") — a hook no competitor currently owns since none of the top 10 close the loop to real money.

**h) Built-in Creator Mode / referral flywheel.** Any user can flip on a trackable referral code and see a lightweight dashboard of referred installs and earned commission. Turns everyday users — not just professional creators — into a paid-social-style acquisition channel run by the community itself.

**i) AI Coin Concierge.** A follow-up chat for history, grading guidance, and selling tips, voiced in the app's playful tone rather than a generic support bot. Table-stakes vs. Coin ID Scanner/CoinScan, but here it reinforces the "treasure guide" persona instead of feeling bolted on.

**j) Roadmap (v2+):** extend scanning beyond coins to banknotes, tokens, and eventually general "attic treasure" objects — broadens the addressable audience and ad-creative angles once the coin niche is established.

### 2.3 Why each highlight is a growth lever

| Feature | Organic lever | Paid lever |
|---|---|---|
| Strike reveal animation | Native screen-record bait; the "what is that app" comment magnet | Reveal clips *are* the ad creative — no separate production needed |
| Rarity tiers | Collect-them-all sharing, even for common coins | Creative variety (5 distinct payoff looks) fights ad fatigue |
| Auto-generated share clip | Removes all content-creation friction — the #1 blocker to UGC volume | Best-performing user clips can be whitelisted/boosted as UGC ads |
| Leaderboards | Recurring, low-effort brag content | Retargeting hook ("you're about to drop out of the top 10") |
| Cash-offer payouts | Ultimate social proof ("it paid me $340") | High-converting testimonial ad format |
| Creator Mode | User-run referral loops | Lowers blended CAC over time |

---

## 3. Primary Screens

### 1. Onboarding — "What's your oldest coin worth?"
Full-bleed cinematic background (slow-motion coin flip in gold light), single hook question, camera-permission ask framed as "let's find out" rather than a system dialog. Ends with a guided first scan using a sample/demo coin so every new user experiences one Strike reveal before hitting any paywall or friction — the reveal *is* the onboarding.

### 2. Live Scan (Home)
The default screen on every app open. Full-screen live camera feed; a soft cyan reticle drifts to track any coin-like object and locks with a snap animation when confident. Minimal chrome: a "Strike" shutter button bottom-center, streak counter top-left, Vault/profile icon top-right. No tab bar clutter — this screen is meant to feel like a viewfinder, not a dashboard.

### 3. The Strike Reveal (transient, full-screen)
Not a distinct navigational screen but the centerpiece sequence: camera freezes on the captured coin → coin lifts into a 3D rotating hero shot on a dark stage → a rarity gauge fills accompanied by rising tension audio → tier-specific payoff (particle burst / glow / haptic / chime) → result card slides up from the bottom, sealing the sequence. Built to be captured start-to-finish in one continuous screen recording.

### 4. Result Card
Coin macro image, tier badge, identity (denomination, year, mint mark, country), estimated value range, population rarity ("~1 of 40,000 known in this grade"), condition estimate. Three persistent actions: **Save to Vault**, **Share Clip**, and (Rare+) **Get Cash Offer**. Secondary link into the AI Concierge for follow-up questions.

### 5. Share Export
Vertical video preview of the auto-generated clip with a scrubber, an editable caption (pre-filled, on-brand, editable), a suggested-audio picker, and one-tap destination buttons (TikTok, Instagram Reels/Stories, Snapchat, Save to Camera Roll). Designed to be a two-tap path from reveal to posted.

### 6. The Vault (Collection)
Trading-card-binder grid of every saved coin, filterable by tier/date/value, with the user's single best find pinned as a hero card at the top. Includes the daily streak tracker and a small "Vault value" total that ticks upward as coins are added — a persistent, growing number is itself a retention hook.

### 7. Leaderboard
Tabbed view — Friends / Local / National — ranking best finds by tier and value this week, with each entry rendered as a mini reveal-card thumbnail (not just a name and number) so the leaderboard doubles as a feed of other people's exciting moments, encouraging return visits even without a new find of your own.

### 8. Cash Offer Flow
Triggered from a Rare+ result card: shows the marketplace/partner's offer, a simple accept-and-ship (or drop-off) flow, and a payout tracker. Ends in a dedicated "Payout confirmed" celebration screen — deliberately built as its own shareable moment, since a real cash screenshot is the highest-trust ad creative the app can produce.

---

## Appendix: Notes for a follow-up spec pass
- **Monetization** was intentionally kept light here since it wasn't asked for, but the research flagged predatory subscription-trial funnels as a category-wide user complaint — a fair, transparent pricing model (e.g., generous free tier + optional one-time "unlimited Vault" purchase, plus a modest take-rate on Cash Offer transactions) is itself a differentiation and organic-content angle worth speccing separately.
- **AR/CV implementation** (on-device model for live tracking vs. cloud call for full identification/valuation) and **rarity/valuation data sourcing** are technical/data decisions that deserve their own spec once product direction here is confirmed.
