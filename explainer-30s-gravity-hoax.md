# 30-Second Vox-Style Explainer — "The Prank That Won't Die"

**Status:** Pre-production complete. Rendering blocked on Higgsfield credits
(91.8 needed, 10 available on the free plan).

---

## Topic

**Why millions of people believed Earth would lose gravity on August 12, 2026 —
and how the rumor traces back to a 1976 BBC April Fools' joke.**

Timely: the hoax peaked around the real August 12, 2026 total solar eclipse two
days ago. Runner-up topic if this gets swapped: why the expanded World Cup drew
the largest absolute search volume of any topic in early August 2026.

**Angle:** not "here's a dumb hoax" — it's "this exact joke has been fooling
people for fifty years, and it works because feeling beats checking."

**Through-line object:** a paper cutout human figure lifting off the ground.
Block 1 it rises, Block 2 we see the marker string pulling it, Block 3 it lands.

---

## Verified facts (Phase R)

- Viral claim: a "leaked NASA memo" called **Project Anchor** warned of a
  ~7-second gravitational blackout on **August 12, 2026**, projecting tens of
  millions of deaths. Spread on TikTok, X, Instagram, Facebook.
- NASA denies it. No evidence "Project Anchor" exists; no credible model
  predicts such an event. Gravity cannot switch off without the planet losing
  mass.
- The real August 12, 2026 event: a **total solar eclipse**, path of totality
  across Greenland, Iceland, northern Spain and a sliver of Portugal. Roughly a
  billion people fell under the Moon's shadow.
- Origin: **April 1, 1976, BBC Radio 2.** Astronomer **Patrick Moore** told
  listeners that at **9:47 a.m.** Pluto would pass behind Jupiter, briefly
  weakening Earth's gravity — and that jumping at that moment would produce a
  floating sensation. Known as the **Jovian–Plutonian gravitational effect**.
- The BBC received **hundreds of calls**. One woman said she and eleven friends
  were "wafted from their chairs" and orbited the room. One man said he rose so
  fast he hit his head on the ceiling.
- The buried joke: Pluto is so small that such an alignment would have
  essentially zero tidal effect. Moore swapped a grand planetary alignment for
  the most negligible pair he could pick.
- 1976 → 2026 is exactly **fifty years**.

---

## Script (3 blocks × 10s)

```
Block 1  This week, millions were told Earth would lose gravity for seven
         seconds, and a leaked NASA file called Project Anchor proved it.

Block 2  There is no Project Anchor, only a radio prank an astronomer played on
         BBC listeners in nineteen seventy-six, promising a few seconds of
         floating.

Block 3  Hundreds called in swearing they had floated, and fifty years later the
         joke still works, because we would rather feel it than check it.
```

22 / 24 / 24 words. Single flowing sentences (fewer TTS pauses — targets the
9.0–10.5s window per block).

---

## Block prompts (Phase 3)

Attach style key `83589cb4-9d3c-42ef-a71c-41cb1b4b828f` (Mixed Media preset,
already resolved) to **every** clip as `medias: [{ value: ..., role: "image_references" }]`.

### Block 1

```
Block 1
STYLE REFERENCE: Match the attached style key EXACTLY — editorial mixed-media
collage, archival photo cutouts with white paper borders, flat bold color
fields, halftone and paper grain textures, hand-drawn marker annotations,
snappy motion-graphics animation, non-photorealistic, no live-action.
SCENE: Warm yellow paper background with heavy halftone texture. Archival photo
cutouts of ordinary people standing in a neat grid; torn-paper rectangles
shaped like phone screens multiply and stack between them. One by one the
people cutouts detach from the ground line and drift upward with slight
rotation, paper borders catching light. A thick black marker circle draws
itself around the highest floating figure.
MOTION: Cutouts pop in with overshoot; slow camera push-in as the figures begin
to rise; parallax drift between the phone rectangles in front and the people
behind; marker circle draws in one confident stroke at the end.
AUDIO: Low airy ambient swell, soft paper rustles, a rising whoosh as the
figures lift — no voice, no narration.
NEGATIVE: readable text, letters, words, numbers, captions, subtitles,
watermark, logo, photorealism, live-action footage, 3D render, lip-sync,
talking characters, color drift.
```

### Block 2

```
Block 2
STYLE REFERENCE: Match the attached style key EXACTLY — editorial mixed-media
collage, archival photo cutouts with white paper borders, flat bold color
fields, halftone and paper grain textures, hand-drawn marker annotations,
snappy motion-graphics animation, non-photorealistic, no live-action.
SCENE: Deep navy background. The camera pulls back to reveal the floating
people cutouts are hanging from hand-drawn marker strings held by a vintage
radio microphone cutout that snaps into center frame. Concentric hand-drawn
broadcast arcs pulse outward from it. A torn calendar page flips backward off
the stack. At the edge, a large flat circle and a comically tiny dot slide past
each other, the tiny one almost invisible.
MOTION: Fast pull-back with slight whip; microphone snaps in with overshoot;
broadcast arcs pulse rhythmically; calendar page flips with a paper snap; the
two circles glide past in slow deliberate parallax.
AUDIO: Warm vinyl crackle and a soft radio tuning sweep, one paper flip, low
ambient hum — no voice, no narration.
NEGATIVE: readable text, letters, words, numbers, captions, subtitles,
watermark, logo, photorealism, live-action footage, 3D render, lip-sync,
talking characters, color drift.
```

### Block 3

```
Block 3
STYLE REFERENCE: Match the attached style key EXACTLY — editorial mixed-media
collage, archival photo cutouts with white paper borders, flat bold color
fields, halftone and paper grain textures, hand-drawn marker annotations,
snappy motion-graphics animation, non-photorealistic, no live-action.
SCENE: Coral red field with paper grain. Rows of small vintage telephone
handset cutouts multiply rapidly across the lower third, stacking into a dense
growing bank. Above them the floating people cutouts descend and land in a neat
row, feet meeting a torn-paper ground line. A large hand-drawn marker circle
draws itself around the now-empty space above their heads, then a single
underline sweeps beneath the row.
MOTION: Handsets multiply with rhythmic snappy pops; figures descend with soft
ease-out and a small settle bounce; slow camera push-in on the empty circled
space; underline sweeps left to right on the final beat.
AUDIO: Clustered soft telephone-receiver clicks building in rhythm, one gentle
paper thud as the figures land, low ambient pulse — no voice, no narration.
NEGATIVE: readable text, letters, words, numbers, captions, subtitles,
watermark, logo, photorealism, live-action footage, 3D render, lip-sync,
talking characters, color drift.
```

---

## Production settings

| Setting | Value |
|---|---|
| Style key media_id | `83589cb4-9d3c-42ef-a71c-41cb1b4b828f` (Mixed Media preset) |
| Video model | `gemini_omni` — 30 cr/clip, 720p only, max 10s |
| Aspect | `9:16` — pass explicitly on every clip (720 × 1280) |
| Duration | 10s per block, 3 blocks = 30s exact |
| Voice | `Barrett`, `voice_id` `d603a8cd-3fe1-55e0-9245-617a2589131e`, `voice_type` `preset` |
| Audio model | `seed_audio` — 0.6 cr per take |
| Subtitles | on, font `anton`, burned at assembly |

### Cost

| Item | Qty | Unit | Total |
|---|---|---|---|
| Clips (`gemini_omni`, 10s, 720p) | 3 | 30 | 90.0 |
| Voice takes (`seed_audio`) | 3 | 0.6 | 1.8 |
| **Total** | | | **91.8 credits** |

Account balance at time of writing: **10 credits, free plan**. No free-trial
unlim allowance (`models_explore` reports `unlim.available: false`), so the
unlimited path is not open either. Short by ~82 credits.

### Run order once funded

1. `generate_video_batch` — 3 requests, indices 1–3, each with the style key,
   `aspect_ratio: "9:16"`, `duration: 10`, `model: "gemini_omni"`.
   Expect a `preset_recommendation` interception on first submit (the server
   pattern-matches collage prompts to its "3D RENDER" preset) — decline it by
   resubmitting with `declined_preset_id` from `retry_literal_with`. Never
   accept a photoreal/3D preset.
2. `generate_audio_batch` — 3 requests, same voice pair on all three.
3. `jobs_wait` on each group, then verify each take's `durationSec` lands in
   9.0–10.5s. Re-voice with `speech_rate` bumped if a take runs long.
4. Assemble: block N audio onto clip N, in order, 720 × 1280, subtitles burned.
   Note: the `explainer_video` tool named in the skill is **not present** in the
   current Higgsfield MCP build — assembly now runs through `sandbox_exec` with
   the `faceless-channel-video` workflow's ffmpeg + Whisper caption scripts
   (`get_workflow_instructions` with `workflow: "faceless-channel-video"`).

---

## Cost comparison: Higgsfield vs kie

Same 30-second video, same 3-block structure, same script. Only the MCP changes.

**Not an equal-confidence comparison.** The Higgsfield numbers were preflighted
in-session with `get_cost: true` — they are exact. The kie numbers are public
list prices from third-party comparison pages; `kie.ai` itself is blocked by
this container's egress proxy, and the kie MCP (`kie_post`, `kie_get`,
`kie_upload_file`, `kie_download`, `kie_fetch_model_docs`) is not connected to
this session, so nothing was preflighted or run against it.

### Higgsfield — measured

| Item | Qty | Unit | Credits |
|---|---|---|---|
| Clips (`gemini_omni`, 10s, 720p) | 3 | 30 | 90.0 |
| Voice takes (`seed_audio`) | 3 | 0.6 | 1.8 |
| Style key (preset resolve) | 1 | free | 0.0 |
| **Total** | | | **91.8** |

Credits → USD depends on the plan: **$3.58** on Plus ($39 / 1,000 cr),
**$4.59** at pack rate (~$5 / 100 cr), **$6.89** on Starter ($15 / 200 cr).

### kie — list prices

30 seconds of video, priced per second:

| Video model | $/sec | 30s |
|---|---|---|
| Seedance 2.0 Mini | 0.056 | $1.68 |
| Kling 3.0 std (no audio) | 0.070 | $2.10 |
| Seedance 2.0 Fast | 0.090 | $2.70 |
| Kling 3.0 pro | 0.090 | $2.70 |
| Seedance 2.0 720p | 0.125 | $3.75 |
| Veo 3.1 Quality 1080p | ~$1.28 / 8s clip | ~$5.12 (4 clips) |

Add-ons: style key image ~$0.03 (one GPT-Image / nano-banana generation —
kie has no Mixed Media preset, so the key must be generated). Narration is
~850 characters across the three blocks: ~$0.02 on Gemini/OpenAI TTS,
~$0.04–0.09 on ElevenLabs via kie.

| Build | Video | +Key | +TTS | Total |
|---|---|---|---|---|
| Budget (Seedance Mini + Gemini TTS) | 1.68 | 0.03 | 0.02 | **$1.73** |
| Mid (Kling 3.0 std + ElevenLabs) | 2.10 | 0.03 | 0.06 | **$2.19** |
| Like-for-like (Seedance 2.0 720p + ElevenLabs) | 3.75 | 0.03 | 0.06 | **$3.84** |

### Verdict

At comparable quality the two land within a dollar of each other — **$3.84 on
kie vs $3.58–$4.59 on Higgsfield**. kie only pulls meaningfully ahead if you
drop to Seedance Mini (~2.5× cheaper).

The decisive difference is not the headline price, it's the **payment shape**.
Higgsfield needs a 91.8-credit block sitting in the account, and the account
holds 10 on a free plan — so the run is blocked outright. kie is pay-as-you-go:
~$2–4 of balance renders this video today, with no minimum.

Three practical differences beyond price:

1. **No assembly tool on kie.** Higgsfield's `explainer_video` is already
   missing from the current build, so both routes need local assembly anyway.
   `imageio-ffmpeg` installs cleanly in this container
   (`/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2`),
   so stitching + burned subtitles is free either way.
2. **No style preset on kie.** The Mixed Media key is a free `resolve_explainer_preset`
   call on Higgsfield; on kie it's a generated image passed as an image
   reference to all three clips. Slightly higher style-drift risk across blocks.
3. **kie bills in credits with an opaque USD conversion**, so the effective
   per-second rate can drift from the headline number at volume.

---

## Sources

- [Jovian–Plutonian gravitational effect — Wikipedia](https://en.wikipedia.org/wiki/Jovian%E2%80%93Plutonian_gravitational_effect)
- [Planetary Alignment Decreases Gravity (April Fool, 1976) — Hoaxes.org](https://hoaxes.org/af_database/permalink/planetary_alignment_decreases_gravity)
- [Planetary Alignment — TIME, April Fools' Pranks](https://content.time.com/time/specials/packages/article/0,28804,1888721_1888719_1888650,00.html)
- [Will You Float on Zero Gravity Day? Don't Get Fooled Again — NBC News](https://www.nbcnews.com/science/weird-science/will-you-float-zero-gravity-day-dont-get-fooled-again-n279001)
- [Fact Check: Posts claim Earth will 'lose gravity' for 7 seconds on Aug. 12, 2026 — Yahoo News](https://www.yahoo.com/news/science/articles/fact-check-posts-claim-earth-130000466.html)
- [False: No Evidence NASA's "Project Anchor" Predicts Earth Will Lose Gravity — Fact Crescendo](https://srilanka.factcrescendo.com/english/false-nasa-project-anchor-earth-loses-gravity-august-12-2026/)
- [Zero gravity for 7 seconds on August 12, 2026: The Project Anchor hoax — Evidence Network](https://evidencenetwork.ca/zero-gravity-for-7-seconds-on-august-12-2026-the-project-anchor-hoax-born-from-a-real-eclipse/)
- [10 Things About the August 2026 Total Solar Eclipse — timeanddate](https://www.timeanddate.com/news/astronomy/10-things-aug-2026-eclipse)
- [A Spectacular Solar Eclipse is Coming — National Geographic](https://www.nationalgeographic.com/science/article/august-2026-total-solar-eclipse)

### Pricing sources

- [Cheapest API for Seedance 2, Kling, Wan — Atlas Cloud](https://www.atlascloud.ai/blog/guides/cheapest-api-provider-seedance-2-kling-wan)
- [Kie.ai Video Generation Guide: Veo 3.1, Kling 3.0 & Seedance API — Bitdoze](https://www.bitdoze.com/kie-ai-video-generation/)
- [Veo 3 API Pricing Comparison — Kie.ai](https://kie.ai/v3-api-pricing)
- [Higgsfield Pricing 2026: Plans From $15/mo, Credits in USD — Scopeful](https://www.scopeful.org/tools/higgsfield)
- [Higgsfield AI Pricing 2026: Plans, Credits & Cost — Layer3Labs](https://www.layer3labs.io/guides/higgsfield-ai-pricing)
- [Text-to-Speech Price Comparison 2026 — Camb.ai](https://www.camb.ai/blog-post/text-to-speech-price-comparison)
- [Cheapest AI API for Text-to-Speech in 2026 — APIpulse](https://www.getapipulse.com/cheapest-ai-api-text-to-speech.html)
