# Soulmates. — a tiny playable love story ❤️

A mobile-first, cinematic, interactive anniversary experience for your wife.
It’s not a website — it’s a **tiny video game about your relationship**.

## Quick start

```bash
npm install
npm run dev        # start dev server
npm run build      # production build → /dist
npm run preview    # preview the production build
```

## Tech

React 18 · Vite 5 · Tailwind CSS · Framer Motion · Lucide icons · a custom
WebAudio engine (no audio files required — music & sound are synthesized live).

## How to personalize EVERYTHING

Everything relationship-specific lives in easy-to-edit files. You never need
to touch components.

| File | What it controls |
| --- | --- |
| `src/config/storyConfig.js` | **One-stop shop**: names, dates, secret word, final mode, final call/link, vault key requirement, per-chapter music tracks, all copy. |
| `src/data/memories.js` | The Chapter 1 map memories + Chapter 2 timeline milestones. Add/remove/edit freely. |
| `src/data/quiz.js` | The “Do You Remember?” quiz questions + fun messages + result messages. |
| `src/data/vault.js` | The Memory Vault museum — photos, messages, audio, videos, favorites. |
| `src/data/timeline.js` | The Final Chapter journey + empty Future Map items. |
| `src/data/easterEggs.js` | Hidden easter eggs + the SECRET CHAPTER memory. |
| `src/data/chapters.js` | Chapter titles/subtitles (tweak the flavor). |

### The 3 most important things to change

1. **`relationshipStartDate`** in `storyConfig.js` — powers the “We’ve been us for…” timer.
2. **`secretWord`** in `storyConfig.js` — typing this anywhere (or entering it in the
   ❦ dialog in Settings) unlocks the ❤️ Secret Chapter. Only you should know it.
3. **`finalMode` + `finalContact`** — `"TOGETHER"` (“Look beside you.”) or
   `"LONG_DISTANCE"` (“So call me.” with your real number).

### Adding real memories
- **Photos:** drop files into `public/memories/` (e.g. `first-message.jpg`) and set
  `image: "/memories/first-message.jpg"` on the memory/vault item. Leave `image: null`
  to show tasteful placeholder art.
- **Audio:** drop files into `public/audio/` and set `audio: "/audio/clip.mp3"`.
- **Per-chapter music:** add `"/audio/yourfile.mp3"` under `music.tracks` in
  `storyConfig.js`. Leave `null` and a soft procedural score is generated live instead.

> Every placeholder is intentionally obvious (e.g. `PLACEHOLDER`, `YOUR FIRST PHOTO`)
> so you can find and replace it — while the actual UI looks finished.

## The journey

1. **Loading** — “Preparing our memories…”
2. **Opening** — “Soulmates.” → the two yes buttons
3. **Ch 1 · How It Started** — tap glowing memory objects on a little map
4. **Ch 2 · Soulmates.** — a relationship path/timeline that fills in as you unlock it
5. **Ch 3 · Do You Remember?** — a playful, forgiving quiz
6. **Ch 4 · The Memory Vault** — collect 🔑 keys, open the vault, explore a museum
7. **Final · Our Story Isn’t Finished** — the road from Day 1 into an empty future
8. **Ending** — stats, an achievement, and the final surprise
9. **❤️ Secret Chapter** — only reachable with your secret word

## Features

- **Save progress** via `localStorage` (resume on return; “Start Over” in Settings with confirmation).
- **Easter eggs**: a hidden star, typing a word, tapping the title — plus the secret word.
- **Music system**: play/pause/mute/volume + per-chapter track; respects autoplay policies.
- **Anniversary timer** — subtle, in Settings and at the end of Chapter 2.
- **Accessibility**: keyboard navigation, focus rings, alt text, and full
  **reduced-motion** support (a manual toggle in Settings + `prefers-reduced-motion`).
- **Respondive + mobile-first**, thumb-friendly, no horizontal scroll, safe-area aware.

## Architecture

```
src/
  config/storyConfig.js   ← ALL personalization
  data/                   ← memories, quiz, vault, timeline, easter eggs, chapters
  game/progression.js     ← keys, unlocks, chapter gating
  audio/audio.js          ← synthesized SFX + generative ambient music (WebAudio)
  context/                ← Game (progress), Audio (music), Settings (reduce-motion)
  hooks/                  ← anniversary timer, typewriter
  animations/variants.js  ← shared cinematic motion variants
  components/             ← memory card, polaroid, vault viewer, controls, overlays…
  screens/                ← one component per chapter
  utils/                  ← storage, dates
```

Enjoy — and good luck with the proposal/anniversary. ❤️
