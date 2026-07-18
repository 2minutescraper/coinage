# Product Spec: Coin Jar — Family Treasure Hunt App

**Working name:** Coin Jar *(literal, ownable, and already the exact object at the center of the organic trend — built to carry a #CoinJarChallenge hashtag. Run a trademark / app-store-name clearance pass before locking.)*
**Tagline:** Every jar has a story.
**One-liner:** A coin identifier built around a real-world ritual — digging through grandma's coin jar with the family — with structured tools that turn that ritual into shareable content instead of hoping it happens organically.

**Category context and rationale:** The existing "grandma's coin jar" trend is already circulating organically on TikTok/Reels ("99% of people don't realize their coins could be rare"), but no app in the category (CoinSnap, CoinKnow, Coinoscope, CoinScan, etc.) owns it — they're all built as solo utility tools, not as something you do *with* family, and none of them give a creator a script, a reason to post twice, or a reward for doing so. Coin Jar's wedge is narrative and network effects: make the coin the excuse for a family story, and make posting that story effortless and rewarded.

*Note: this is a distinct product concept from the "Strike" AR-reveal spec in this same folder — Strike is built around solo adrenaline (a cinematic jackpot moment), Coin Jar is built around shared nostalgia (a family ritual). They intentionally do not share branding.*

---

## 1. Look and Feel / Branding Guidelines

### 1.1 Brand personality
Warm, sentimental, and a little bit scrapbook — the emotional register of a Sunday afternoon at grandma's kitchen table, not an arcade. Where a competitor app feels like a barcode scanner, Coin Jar should feel like flipping through a photo album that occasionally pays you. Copy voice is gentle and personal ("Whose coin is this?" rather than "Scan complete"), and the product treats every coin as a potential memory before it treats it as a potential dollar amount.

Explicitly **avoid** the neon/arcade/gamified-adrenaline visual language (glow bursts, slot-style reveals, esports color) that a "jackpot moment" competitor would use — that register reads as impersonal and try-hard against this brand's nostalgic promise. Warmth and softness are the differentiator, not intensity.

### 1.2 Color palette

Light-first UI (a rarity among camera apps, but correct here): the product should feel like paper and daylight, not a dark cockpit. Photography and handwriting-style notes are the hero content.

| Role | Name | Hex | Use |
|---|---|---|---|
| Base | Warm Ivory | `#FAF3E7` | App background, cards |
| Surface | Aged Paper | `#F0E4D0` | Panels, sheets, jar backdrop |
| Primary | Amber Glass | `#C9812F` | Brand mark, primary buttons — the color of the jar itself held up to light |
| Secondary | Faded Denim | `#5B7A8C` | Secondary UI, links, family-member tags |
| Accent | Dusty Rose | `#C97B72` | Highlights, favorited stories, "new memory" badges |
| Accent 2 | Sage | `#8A9A6E` | Success states, completed prompts |
| Text (primary) | Walnut Ink | `#3B2F2A` | Primary text on light surfaces |
| Text (muted) | Warm Taupe | `#8C7C6E` | Secondary text, timestamps, metadata |

Rule of thumb: amber and denim carry the brand at rest; rose and sage are used sparingly for emotional emphasis (a favorited memory, a completed family challenge) — never as decoration.

### 1.3 Typography

- **Display / headlines — a warm serif (e.g., "Fraunces" or "Lora," Medium/SemiBold).** Evokes a printed postcard or an old family Bible's title page rather than a tech product — sets the nostalgic tone immediately.
- **Body / UI — a humanist sans (e.g., "Nunito Sans" or "Source Sans 3").** Friendly, rounded, highly legible — keeps the app usable for a genuinely wide age range (this product must work for a teenager *and* their grandparent in the same session).
- **Handwritten accent — a restrained script font (e.g., "Caveat"), used only for user-attributed notes** ("Grandpa's favorite," "Found under the porch") so personal annotations visually read as handwriting inside an otherwise typeset app — never used for UI chrome or numbers.
- **Numeral treatment:** value figures use the body sans with tabular figures — legible and warm, deliberately *not* a flashy odometer-roll effect. The emotional payoff here is the story, not a number ticking up.

### 1.4 Iconography, shape & motion language

- **Core motif: the mason jar.** The app icon, empty states, loading states, and the primary Home screen all use a glass jar as the literal, recurring visual container for a family's coins — it's the single most ownable, meme-able image in the product and doubles as the physical prop every piece of UGC is built around.
- **Corners & materials:** soft-rounded photo-corner cards (literally styled like a photo tucked into a paper corner-mount), warm paper-grain textures on backgrounds, no glassmorphism/neon — everything reads as tactile and printed rather than digital-native.
- **Motion principles:** gentle and unhurried. A capture doesn't "snap," it *settles* — a coin drops into the jar with a soft glass clink, ripples briefly, and the jar's fill level rises. No countdown gauges, no screen flashes. The emotional beat is warmth and accumulation over time, not a single adrenaline spike — this is a deliberate contrast with jackpot-style competitors and matches a "build a family archive" retention model rather than a "chase the next big hit" one.
- **Sound & haptics:** a single soft glass-clink sound per coin logged, a slightly richer chime when a coin is tagged with a story or photo. Haptics are light throughout — this app should feel calm to use, even when a find turns out to be valuable.

---

## 2. Functionality & Viral-Growth Highlights

### 2.1 Core loop

```
Open app → "The Jar" (family collection view) → Scan a coin
   → Coin ID + value range revealed → Tag it: who found it / whose was it / a memory + photo
   → Coin drops into the shared family Jar → Prompted: share a Discovery Card or start "Jar Wrapped"
```

Unlike a pure identification app, the loop doesn't end at the ID — it ends at a *tagged story*, because the story (not the dollar value) is what makes content worth posting and worth other family members opening the app to see.

### 2.2 Key features

**a) The Jar (shared family collection).** A single visual, fillable jar that represents one family's collection, viewable by everyone invited to it. Every scanned coin visibly drops into the jar and the fill level rises over time — a slow, persistent, visual sense of progress that works even between individual big finds, and gives every family member a reason to check back in.

**b) Story tagging on every coin.** After identification, users attach who found it, whose coin it originally was, and an optional voice note, photo, or short memory ("Grandpa carried this in his pocket for 40 years"). This is the core differentiator versus every existing app in the category — it turns a database entry into an heirloom record, and it's what makes the resulting content emotionally resonant instead of just informational.

**c) Guided Treasure Hunt prompts.** Scripted, in-app real-world prompts ("Ask grandma if she still has her old coin jar," "Check the junk drawer," "Look in dad's old tackle box") that tell the user exactly where to look and what to say on camera. This directly solves the single biggest blocker to organic content creation — people don't know what to film — by handing them a script, not just a tool. **This is the feature most likely to drive organic virality**, because it converts a passive utility app into an active, family-involving activity with a built-in reason to hit record.

**d) Jar Wrapped (auto-generated recap).** A Spotify-Wrapped-style seasonal recap video, auto-rendered from a family's Jar activity — set to music, showing every coin found, tagged stories, total value, and standout finds. Built for a predictable annual/seasonal viral moment ("Grandma's Jar — 2026 Wrapped") the way Spotify Wrapped and similar recap formats reliably re-trend every year, giving the app a recurring, scheduled organic spike rather than relying purely on evergreen posting.

**e) Discovery Cards (shareable single-image export).** Each tagged coin can be exported as a single postcard-style image (photo, coin ID, story snippet, value) — a lighter-weight, feed/Stories-native alternative to a full video, useful for the large share of users who won't record a video but will post a pretty image.

**f) Multi-user Family Jar with invites.** Any Jar can invite family members as contributors; each invite is a fresh install by design, and a shared Jar gives cross-generational reasons to open the app repeatedly (checking what a sibling or grandparent added). This is a built-in network-effect growth loop, distinct from a typical referral program because the incentive is emotional/social, not financial.

**g) Family Creator Program.** A structured (not generic) creator/affiliate track specifically seeded with the "coin jar" narrative prompts from (c) as ready-to-film scripts, plus a trackable referral code and payout dashboard. Because the content format is already scripted by the app itself, this program should produce much more consistent, on-brand creator output than an open-ended "post about us" affiliate deal.

**h) Cash-in flow.** For coins above a value threshold, a one-tap "Cash in this find" flow connecting to a coin-buying marketplace/partner — framed in-app as "adding to the family jar's total," keeping the money moment consistent with the collection metaphor rather than feeling like a separate e-commerce bolt-on.

**i) AI Family Historian chat.** A follow-up assistant for questions about a coin's history or grading, framed as helping build out the story/record for that coin rather than as generic customer support.

### 2.3 Why each highlight is a growth lever

| Feature | Organic lever | Paid lever |
|---|---|---|
| Guided Treasure Hunt prompts | Solves "what do I film" — turns passive users into active content creators | Prompts double as ready-made ad-creative scripts/hooks |
| Story tagging | Emotional, sharable narrative beats ("this was grandpa's") that outperform pure utility content | Testimonial-style ads with real family stories, high trust |
| Jar Wrapped | Predictable seasonal viral spike (Wrapped-format re-trends yearly) | Seasonal campaign moment to plan paid spend around |
| Discovery Cards | Low-effort, high-volume feed/Stories content | Cheap, varied static ad creative pulled from real user cards |
| Multi-user Family Jar | Built-in invite-driven install loop | Lowers blended CAC as families self-propagate installs |
| Family Creator Program | Scripted, on-brand creator content at scale | Consistent formats are easy to identify and boost as UGC ads |

---

## 3. Primary Screens

### 1. Onboarding — "Whose jar are we filling?"
Warm, photo-album-style intro asking whether this is a personal jar or a family jar to invite others into, with a gentle camera-permission ask framed around finding "the first coin for your jar." Ends with one guided scan of a starter/demo coin so a new user experiences the full tag-a-story loop once before any friction.

### 2. Home — The Jar
A large illustrated glass jar, its fill level reflecting the collection's size, sitting above a scrollable feed of recently added coins with small photo-corner thumbnails and who added them. Family member avatars are shown around the jar's base. A single warm "+ Add a coin" button is the primary action — deliberately calmer than a competitor's shutter button.

### 3. Scan/Capture
A simple, well-lit camera frame (no aggressive live-tracking reticle) with a gentle "hold steady" guide. On capture, a soft glass-clink and a brief settle animation before moving straight into identification — the emotional tone here is anticipation-without-adrenaline, consistent with the brand's calmer register.

### 4. Coin Story Card
The result screen: coin photo, identity, value range, and — front and center — the story-tagging module (who found it, whose it was, an optional voice note or photo, a handwritten-style caption field). This screen, not the reveal, is where the product's real differentiation lives.

### 5. Family Jar / Shared Album
The collaborative view of a multi-user Jar: a scrollable, scrapbook-style timeline of every family member's finds and tagged stories, filterable by person or date. Built to be opened just to browse, the way people scroll a shared photo album.

### 6. Discovery Card Export
A postcard-format preview (photo, coin ID, story snippet, value) with a caption editor and one-tap destination buttons (Instagram, TikTok, Save to Camera Roll, Text to Family). Optimized for a two-tap path from a tagged story to a posted image.

### 7. Jar Wrapped
A seasonal, auto-generated recap video screen — a scrubbable preview set to music, summarizing the season's finds, top stories, and total jar value, with the same one-tap share destinations as the Discovery Card screen. Framed as an annual event inside the app (a push notification moment), not just a feature.

### 8. Creator Dashboard
Shows the user's referral code, install/earnings stats, and a library of ready-to-film Treasure Hunt prompts formatted as simple scripts, so contributing to the creator program feels like following a recipe rather than inventing content from scratch.

---

## Appendix: Notes for a follow-up spec pass
- **Monetization** wasn't requested here either; a natural fit given the brand is a low-friction one-time "Family Plan" purchase to unlock multi-user Jars beyond a small free limit, plus a modest take-rate on Cash-In transactions — consistent with the category-wide complaint (surfaced in the earlier research) about aggressive subscription-trial dark patterns.
- **Data/privacy design** deserves explicit attention before build: this product asks users to upload photos, voice notes, and personal family stories tied to real people (including deceased relatives), which is more sensitive than a typical utility app's data footprint and should be reflected in consent flows and data retention policy.
- **Relationship to the "Strike" spec** in this folder: both are viable takes on the same underlying app category and could theoretically share a scanning/valuation backend, but should stay separate product experiences (or be tested as distinct positioning for two different audience segments) rather than merged, since their emotional promises are opposed by design.
