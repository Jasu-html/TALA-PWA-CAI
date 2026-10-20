# TALA PWA

TALA is a Filipino-only, offline-first Progressive Web App for Grade 1 learners. It teaches early letters and words, counting, shapes and colors, and good values through short lessons, picture-based questions, character guides, stars, and a winding level path.

This repository contains the current web presentation build. It is intentionally buildless: it uses HTML, CSS, and browser JavaScript, so it can be demonstrated immediately and later wrapped as an Android APK with Capacitor or another PWA wrapper.

## What is currently included

- **Titik** — letters A-Z, word blending, sight words, and review (33 stages)
- **Bilang** — numbers 1-10, counting, ordering, more/fewer, addition, subtraction, and review (15 stages)
- **Likha** — shapes, colors, color mixing, patterns, review, and a drawing finale (15 stages)
- **Tala** — Filipino stories and situations about kindness, respect, sharing, hygiene, tidiness, and responsibility (10 stages)
- 73 stages total: 72 five-question activities and one drawing activity.
- 360 quiz questions, with Filipino text and picture/visual choices.
- Select an answer first, listen to its word recording, then press **Ito ang sagot ko** to confirm it.
- Three unsuccessful confirmations reveal the correct answer so the experience stays encouraging and no-fail.
- First-try accuracy awards 1-5 stars. Replaying a stage only adds stars above the previous best.
- Progress and learner name are stored locally in the browser.
- Next stages unlock after the previous stage is completed.
- Placeholder avatars for TALA, LIKHA, TITIK, and BILANG appear throughout the home screen, maps, lessons, questions, painting activity, and celebrations.
- Saturated child-friendly colors, background scenery, moving particles, scroll reveals, domino-style level entrances, confetti, and reduced-motion support.
- Offline Web Audio effects for taps, selections, correct answers, retries, hints, stamps, painting, level completion, and scrolling piano-like notes.
- Four looping local Web Audio themes: forest for Titik, beach for Bilang, garden for Likha, and village for Tala.
- Filipino browser text-to-speech is used only for general interface encouragement when a Filipino voice is installed. Lesson and question recordings are supplied by the project owner.

## What is not included yet

This is not the old native Android/Kotlin project. There is no Gradle project, Jetpack Compose UI, Room database, Firebase backend, account system, teacher dashboard, PDF reporting, avatar shop, Quest module, tracing activity, or drag-and-drop activity in the current PWA. Those ideas may be added later, but they should not be treated as implemented features.

## Run locally

A local server is needed for the service worker and offline behavior. From the project folder, run:

```powershell
node tools/serve.cjs
```

Then open `http://localhost:4173`.

Node.js is the only tool needed to run the current project. No package installation or build step is required.

For a quick automated check, run:

```powershell
node --test tests/smoke.cjs tests/presentation.cjs
```

The tests simulate the DOM and Web Audio APIs. They verify curriculum coverage, progress behavior, shared audio paths, character assets, scenery, sound lifecycle, and presentation interactions. A real phone check is still recommended for visual layout, Filipino voice availability, and audio balance.

## Main project structure

```text
index.html                  App shell and accessible page mount
css/styles.css              Base layout and component styles
css/playful.css             Playful UI and character presentation styles
css/vibrant.css             Saturated palette, scenery, motion, and transitions
js/data.js                  Filipino curriculum data and 73 stages
js/app.js                   Screen rendering, level flow, answers, and events
js/storage.js               Local progress storage and migration
js/speech.js                Filipino TTS and shared MP3 playback
js/sfx.js                   Web Audio effects, themes, and scroll piano notes
js/visuals.js               Avatars, world scenery, and visual helpers
manifest.webmanifest        Installable PWA metadata
sw.js                       Cache-first service worker
assets/characters/          Replaceable SVG character placeholders
assets/audio/fil/shared/    Folder for reusable recorded MP3 phrases
docs/voice-scripts/         Character-separated phrase lists for voice actors
tests/                      Smoke and presentation tests
tools/serve.cjs             Dependency-free local development server
```

## Adding the recorded Filipino audio

The app does not generate or include the lesson/question recordings. Use the reusable phrase lists:

- [AUDIO_PHRASE_LIBRARY.md](AUDIO_PHRASE_LIBRARY.md) — overview and naming rules
- [TITIK_PHRASES.md](docs/voice-scripts/TITIK_PHRASES.md)
- [BILANG_PHRASES.md](docs/voice-scripts/BILANG_PHRASES.md)
- [LIKHA_PHRASES.md](docs/voice-scripts/LIKHA_PHRASES.md)
- [TALA_PHRASES.md](docs/voice-scripts/TALA_PHRASES.md)

Place the finished MP3 files here:

```text
assets/audio/fil/shared/<character>/<filename>.mp3
```

Use lowercase character folders: `titik`, `bilang`, `likha`, and `tala`. The filename is generated from the spoken phrase: a single alphabet letter stays uppercase (`A.mp3`), while phrases become lowercase hyphen-separated names such as `ano-ang-pangalan-ng-hugis.mp3`. The app also converts standalone shape symbols to names such as `bilog.mp3` and `parisukat.mp3`.

The older per-stage scripts under `assets/audio/fil/` and [VOICE_ACTOR_SCRIPTS.md](VOICE_ACTOR_SCRIPTS.md) are retained as reference. The shared phrase workflow is preferred because it avoids recording the same word repeatedly.

## Replacing character art

The four current SVGs are placeholders. Replace them using the guidance in [assets/characters/README.md](assets/characters/README.md). If filenames remain `tala.svg`, `likha.svg`, `titik.svg`, and `bilang.svg`, no JavaScript changes are needed.

## Data and progress

Curriculum content is defined in `js/data.js`. Progress is stored locally under the browser key `tala-pwa-progress-v1`; it does not leave the device. The teacher/parent menu includes a reset action for clearing the demo learner and progress.

The service worker uses a versioned cache. When adding or renaming shell files, update the cache version and file list in `sw.js` so installed copies receive the new files.

## Design and accessibility notes

The app is designed for touch screens and small phone displays. It includes safe-area spacing for phone status bars, a sticky navigation bar that becomes solid while scrolling, keyboard-visible focus states, labeled controls, `aria-live` feedback, and a reduced-motion mode. The app remains Filipino-only; English text is limited to developer documentation and code comments.

## Future Android packaging

Once the PWA is ready for distribution, it can be wrapped with Capacitor, synced into an Android project, and built as a debug or release APK. That packaging step is not part of this repository yet. The current local PWA is the source of truth for the implemented experience.

## Related documentation

- [README-PWA.md](README-PWA.md) — implementation and presentation notes
- [TALA_PROGRAMMING_GUIDE.md](TALA_PROGRAMMING_GUIDE.md) — original project guide and requirements reference
- [PROGRESS.md](PROGRESS.md) — project progress notes
- [DECISIONS.md](DECISIONS.md) — implementation decisions
- [assets/audio/fil/README.md](assets/audio/fil/README.md) — audio folder reference

