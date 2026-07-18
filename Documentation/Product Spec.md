# Heirloom — Product Spec
**Working name:** Heirloom (app store name TBD, e.g. "Heirloom: Coin & Collection Value")
**Category:** Coin identifier / collectibles appraisal
**Positioning:** The coin identifier app built for the moment you inherit a collection — not for hobbyists hunting pocket change.
**Author:** Product spec draft
**Status:** v1.0 draft

---

## 0. The wedge (context)

The coin identifier category (CoinSnap, CoinKnow, CoinHix, Coinoscope, etc.) is a commodity: every competitor runs the same loop — snap a photo, wait, get a value, hit a paywall — aimed at active hobbyists scanning pocket change for pennies worth money. It's a crowded, feature-cloned, "get rich quick" red ocean.

Nobody in the category owns the **inheritance / estate-cleanout moment**: a person (usually 35–65) who has just lost a parent or relative and is sitting in front of a shoebox, a cigar tin, or an old dresser drawer full of coins they didn't collect and don't understand. This is a distinct audience with different needs (bulk volume, not single coins), different emotional register (grief and duty, not treasure-hunting excitement), different economics (whole collections, higher basket size, legal/probate use cases), and — critically — a wide-open, untargeted lane on paid social.

Heirloom is built around that moment end-to-end: **intake a whole collection at once, understand what it's worth, preserve the story behind it, decide what to do with it (keep, split among family, or sell) — without feeling like a slot machine.**

---

## 1. Look & Feel / Brand Guidelines

### 1.1 Brand personality
Heirloom should feel like a **calm, competent family archivist** — closer in spirit to a genealogy or estate-planning product than to a gamified "which-coin-is-this" scanner app. The competitive set skews toward neon, shiny-gold, slot-machine visual language ("💰🔥 Install Free!!"). Heirloom deliberately zigs the other way: warm, restrained, editorial, trustworthy. The emotional job is closer to *Ancestry* or *Copilot Money* than to a mobile game.

Three words the design should always pass: **Warm. Trustworthy. Unhurried.**
Three words it should never read as: **Gamey. Urgent. Salesy.**

### 1.2 Color palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Base / background | Parchment | `#F7F2E9` | Primary background, card surfaces |
| Base / background (dark mode) | Deep Walnut | `#211B16` | Dark mode background |
| Primary accent | Heritage Brass | `#B8874B` | Primary buttons, coin/value highlights, icons |
| Secondary accent | Ledger Green | `#2F4A3E` | Trust elements, confirmations, financial figures |
| Tertiary accent | Terracotta | `#C1613F` | Emotional/story moments (memory notes, family sharing) |
| Ink | Charcoal Ink | `#2B2620` | Primary text |
| Muted | Warm Grey | `#8B8175` | Secondary text, captions |
| Alert (sparing use only) | Faded Rust | `#9C4A38` | Errors only — never used for urgency/FOMO messaging |

Explicitly avoid: neon/gambling gold gradients, red "URGENT" banners, countdown timers, and the saturated purple-blue gradients common to utility-scanner app icons. No slot-machine visual metaphors (spinning reels, coin-shower animations).

### 1.3 Typography

- **Display / headline typeface:** a warm, editorial serif (e.g., a Tiempos/Freight/Fraunces-class serif). Used for the app name, the Value Reveal number, section headers, and anything meant to feel like a keepsake or a printed appraisal. This is the single biggest lever that separates Heirloom visually from every neon-sans competitor icon on the App Store shelf.
- **UI / body typeface:** a clean humanist sans (e.g., Inter, Public Sans) for buttons, lists, form fields, and dense data (coin details, price comps). Optimized for legibility at small sizes, since the target user skews slightly older than the hobbyist coin-scanner audience.
- **Numerals:** tabular/lining figures for all monetary values so lists of prices align cleanly — this is a "financial document," not a game score.

### 1.4 Iconography & imagery

- Custom line-art icon set at 1.5px stroke weight — a keepsake box, a magnifying glass, a wax seal, a family tree, a ledger page — rather than flat gambling-style filled icons.
- Real photography of coins and collections (shot warmly, shallow depth of field, on linen/wood surfaces) instead of stock 3D-render gold-coin-explosion art used across the category.
- No badges, confetti, or slot-machine-style "win" animations on identification. The one moment that *is* allowed a bigger visual flourish is the **Value Reveal** (Section 2.3) — that is the app's single "wow" beat, and it should feel more like unwrapping something than winning something.

### 1.5 Tone of voice

Plain, warm, second person, unhurried. Copy examples:

| Instead of (category norm) | Heirloom says |
|---|---|
| "🔥 SCAN NOW — You Could Be Rich!" | "Let's see what's in the box." |
| "LIMITED TIME — Unlock Full Value!!" | "Here's everything we found." |
| "Your coins could be WORTH THOUSANDS 💰" | "A few of these are worth a closer look." |

No countdown timers, no red badges, no "X people identified a rare coin in the last hour" social-pressure banners. Trust is the product; urgency tactics undercut it.

### 1.6 Sound & motion

A single soft chime (not a jackpot jingle) on successful batch scan. Page transitions are gentle cross-fades / page-turns (echoing a physical coin album), not bouncy game-like springs.

---

## 2. Functionality

### 2.1 Core functional pillars

1. **Estate Intake** — an onboarding flow built for "I just inherited/found a collection," not "I'm a hobbyist."
2. **Batch Scan** — identify a whole tray/box of coins in one pass, not one coin at a time.
3. **The Collection Book** — an auto-organized, browsable digital album (not a flat list).
4. **Value Reveal** — a single, cumulative "here's what the whole collection is worth" moment, designed to be the app's shareable centerpiece.
5. **Provenance Notes** — attach memories/stories to coins or the collection as a whole.
6. **Family Sharing** — invite co-heirs/siblings into a shared, view-only or collaborative version of the collection.
7. **Sell / Consign Concierge** — a guided path from "identified" to "sold or appraised," via vetted partners.
8. **Executor Mode** — exportable, dated PDF appraisal reports for probate/legal/insurance use.

### 2.2 Feature detail

**Estate Intake (onboarding)**
A short, empathetic flow instead of a generic "create account" screen: *Whose collection is this? Roughly how did it come to you? Do you have a sense of how big it is (a jar, a box, an album, more)?* Answers tailor later copy (e.g., "your father's collection" is referenced by name throughout) and set expectations for batch scanning up front. No paywall interstitial before the user has scanned anything and seen value — this is a hard rule, a direct contrast to the #1 review complaint across every competitor.

**Batch Scan (the core mechanic that competitors don't have)**
Every competitor scans one coin at a time. Inherited collections are jars, boxes, and albums — dozens to hundreds of coins. Heirloom's camera mode lets a user spread coins on a tray/table and do a single sweeping scan (or a short video pan) that segments and identifies every visible coin in one pass, showing live bounding boxes and running count as it works ("47 coins found so far..."). This is both a genuine utility advantage and, per Section 2.3, the mechanical basis for the viral share moment.

**The Collection Book**
Scanned coins auto-file into a visual album that mimics a classic Whitman coin folder — organized by denomination/series/date — rather than a flat scrollable list like every competitor. Users can flip through it like a book. This gives the product a "keepsake" identity distinct from a utility scanner, and is itself a natural screen-recording / screenshot subject for organic content ("look what I found going through my grandpa's coins").

**Value Reveal (the growth-critical feature)**
After a batch scan (or at any time as the collection grows), the user gets a single cumulative screen: one large number — total appraised collection value — followed by a ranked breakdown of standout pieces ("3 coins here are worth a closer look"). This is deliberately modeled on the "Spotify Wrapped" mechanic: a satisfying, personal, once-you-see-it-you-want-to-show-someone summary, auto-rendered as a beautifully branded, shareable image/video card. See Section 2.3 for why this is the primary growth lever.

**Provenance Notes**
Users can attach a short note, voice memo, or photo to any coin or to the collection as a whole ("This was in Dad's dresser — he brought it back from Korea"). This is a memory-keeping feature, not a data feature, and is what separates Heirloom's emotional register from a transactional scanner. It also produces the most naturally shareable, non-salesy organic content of any feature in the app.

**Family Sharing**
Inherited collections are frequently split among siblings/heirs. Heirloom lets the primary user invite family members to view (or, with permission, edit) the shared Collection Book. This is a legitimate utility feature that also functions as a built-in viral loop — every invite is a new install driven by a real, warm reason (see K-factor note in Section 2.3).

**Sell / Consign Concierge**
Once a collection is valued, users can request a guided path to sell or consign standout pieces through vetted marketplace/auction-house partners, or request professional authentication for high-value or ambiguous pieces. This closes the loop competitors leave open (identify-only, no path to cash) and is a monetization channel (referral/consignment fee) beyond subscription.

**Executor Mode**
For users acting as an estate executor or working with a probate attorney, Heirloom can generate a dated, itemized PDF appraisal summary (with photos, estimated values, and methodology notes) suitable for legal, insurance, or IRS estate-valuation purposes. This is a premium-tier feature that also legitimizes the brand relative to "toy" scanner apps and unlocks a B2B2C channel (estate attorneys, probate services, financial advisors referring clients).

### 2.3 What's most likely to go viral (organic + paid)

Ranked by expected growth impact:

1. **The Value Reveal share card/video is the single most important growth feature.** It's a self-contained, branded, emotionally loaded "reveal" — the exact mechanic behind Spotify Wrapped, BeReal memories, and Duolingo streak cards, all proven organic-growth engines. Unlike a competitor's single-coin flex ("look, my coin is worth $40"), Heirloom's reveal is a *life-event* moment ("my mom's coin jar is worth $2,300") — inherently more narratively interesting, more emotionally shareable, and far less likely to read as bragging (it reads as *discovery*, not *flex*), which matters for organic reach on algorithms that reward relatable, non-salesy content.

2. **Family Sharing is a built-in K-factor loop with a real reason to invite.** Every other coin app's "invite a friend" mechanic is artificial (referral credit). Heirloom's is structural: if three siblings split a parent's estate, all three plausibly need the app. This is a rare case where the viral loop is also just... the correct way to do the task.

3. **Provenance Notes generate the best organic (non-paid) content.** "I found my grandfather's war-era coins and what he wrote about them" is a TikTok/Instagram Reels narrative format that already performs extremely well (grief/nostalgia/discovery content is a proven-out genre), and it's a category no competitor touches — every existing coin-app ad is "look what this is worth," which is a much narrower creative well than "look what I found out about my family."

4. **Paid social creative angles this positioning unlocks** (validated against a gap in the Meta Ad Library — only one small competitor is testing adjacent messaging, in Spanish, with no English-language equivalent at scale):
   - *"Found in my mom's closet after she passed — here's what it was actually worth."*
   - *"Don't sell grandpa's coin jar before you do this."*
   - *"I organized my late father's coin collection in one afternoon instead of six months."*
   - *"My siblings and I split up mom's coins — here's how we made sure it was fair."*
   These hooks target a life-event audience (recent bereavement, estate settlement, home downsizing) that is both highly identifiable for ad targeting and currently uncontested creative territory in this category.

5. **Executor Mode is the credibility anchor for earned/press coverage.** A feature aimed at probate attorneys and financial advisors gives the brand a legitimate press/PR angle ("an app built for estate settlement, not treasure hunting") that trade press and local news (a proven organic channel for the "6 best coin apps" article genre already ranking in this category) will cover more readily than another "AI coin scanner."

---

## 3. Primary Screens

### 3.1 Estate Intake (onboarding)
Three short warm-toned questions (whose collection, how it came to you, rough size) before any account/paywall friction. Ends by naming the collection (e.g., "Dad's Collection") — that name persists through the entire app.

### 3.2 Home / Collection Dashboard
The main hub. Shows the named collection(s), a running total value (once scanning has begun), a "Continue scanning" prompt if the batch isn't finished, and quick access to the Collection Book, Family Sharing, and Sell/Consign. Financial figures in the serif/tabular numeral style; overall layout closer to a bank/finance app than a game home screen.

### 3.3 Batch Scan (camera)
Live camera view with real-time bounding boxes over each detected coin and a running counter ("52 coins identified"). Designed for a table/tray of coins, not a single object. A calm progress indicator instead of a spinner; no "loading..." dead time — coins populate into results as they're identified, live.

### 3.4 Scan Results / Coin Detail
Per-coin detail: photo, identification (denomination, year, mint mark, variety), estimated value range with sourcing (auction comps, dealer listings), confidence level stated plainly (not hidden), and a "flag for closer look" indicator for anything unusual or high-value. Includes the entry point to add a Provenance Note.

### 3.5 Collection Book
The flip-through visual album — coins auto-sorted into folder-style pages by series/date, mimicking a physical coin album. This is the primary "browse what we have" screen and the most screenshot/screen-record-friendly view in the app.

### 3.6 Value Reveal / Share Card
The centerpiece growth screen: one large total value figure, a short ranked list of standout finds, and a one-tap "Share" action that generates a beautifully branded, portrait-format image/video card (safe for Stories/Reels/TikTok) — collection name, total value, and (optionally, user-controlled) a headline standout coin. Privacy-conscious by default: exact addresses/identity never included; user chooses what's shown.

### 3.7 Provenance Note
A lightweight capture screen — text, one photo, or a short voice memo — attachable to a single coin or the whole collection. Displayed as a small "story" marker inside the Collection Book.

### 3.8 Family Sharing
Invite flow for co-heirs: generate a shareable link/code, set each invitee's permission level (view-only vs. can-edit-notes), and see a simple activity log of who's viewed or added to the collection. Framed entirely around "settling this together," not referral incentives.

### 3.9 Sell / Consign Concierge
For flagged high-value or standout coins: a guided comparison of vetted paths (marketplace listing, consignment/auction house, professional authentication), plain-language explanation of fees/timelines for each, and a request/handoff flow — Heirloom facilitates, it doesn't require the user to become a numismatics expert.

### 3.10 Executor Report Export
Form to configure a PDF appraisal report (date range, which coins/collections to include, valuation methodology note), preview, and export/share — sized for attorneys, insurers, or estate paperwork rather than for social sharing.

---

## 4. Summary

Heirloom wins by refusing to compete on the category's existing axis (fastest/most-accurate single-coin scanner for hobbyists) and instead owning an adjacent, underserved, emotionally rich moment — settling an estate — with product mechanics (batch scan, Value Reveal, Family Sharing, Provenance Notes) that are simultaneously genuine utility *and* structurally built to travel on social media, plus a brand system that deliberately looks and sounds like nothing else on the coin-app shelf.
