# TALA PWA

TALA is an offline-first Progressive Web App for Grade 1 learners, with Filipino lessons and plain Taglish parent/help screens. It teaches early letters and words, counting, shapes and colors, and good values through short lessons, picture-based questions, character guides, stars, and a winding level path.

The web app uses HTML, CSS, and browser JavaScript without a bundler, so it can be demonstrated immediately. A Capacitor Android wrapper and Gradle project are also included for building a test APK with all lessons and recordings bundled.

## Separate Teacher / Student modes (1.3.0)

The launch screen offers **Maglaro bilang Student** and **Buksan bilang Teacher**. Teacher Mode uses its own **Dashboard / Make Activity / Settings** icon bar; it never routes the teacher to built-in learner games. The dashboard shows roster/progress summaries. Make Activity holds the custom lesson library, builder, recordings, previews and assignment forms. Teacher Settings includes sound controls, exports and logout. Selecting a student explicitly locks Teacher Mode and returns to role choice for learner handoff. Existing local PIN, guardian consent and saved data remain in place.

Student Home now has a compact teacher-task shortcut and uncropped character artwork. Mga Gawain fills the viewport with a larger task card; student Settings fills more space and can scroll. See [Teacher and Student modes](docs/TEACHER_STUDENT_MODES.md).

## Navigation and rewards (1.1.2)

The header menu has been replaced with a fixed bottom bar: **Home → Mga Gawain → Tagumpay → Settings**, displayed as original SVG icons without visible labels or emoji (accessible labels/tooltips remain). Settings contains separate saved music and SFX/ambience sliders; recorded voice guides keep their existing volume. Teacher reports and profiles are now on the separate Teacher Dashboard, with existing PIN protection unchanged.

**Mga Gawain** shows the active learner’s current teacher assignment, resumable classroom quiz, and completed core stages available to replay. Without Classroom Mode it shows completed stages and a clear link to explore Home; it does not invent assignments or resumable sessions. Teacher Mode currently holds one assignment per learner, not an assignment queue.

There are [78 achievements](docs/ACHIEVEMENTS.md), calculated independently from each learner’s saved progress. Previously completed activities count automatically. The bar reserves space below the content; short screens can still scroll rather than clip controls or shrink text.

## Teacher Lesson Builder (1.2.0)

Choose **Buksan bilang Teacher** at startup, unlock the PIN, then open **Make Activity** (book icon) or **Teacher Lesson Builder** on the dashboard. Create custom module/stage/level titles, multiple-choice questions, pictures and optional recorded/uploaded instruction, question, hint and answer audio. Preview, publish immutable revisions and assign levels to **Mga Gawain**. Results stay separate from built-in stars. Media is local in IndexedDB; self-contained lesson packages transfer media between devices, while classroom backups transfer learner assignments/results separately. See the [full builder guide](docs/TEACHER_LESSON_BUILDER.md) for limits and steps. Physical-phone microphone testing is still needed.

## What is currently included

The app now opens with an animated loading screen and a dedicated **Magsimula /
Magpatuloy** title screen. Before learner setup, a parent/guardian completes an adult
gate and separate, unchecked terms/data-consent choices. Returning learners keep
their progress but must approve a revised policy version. Voice input is off by
default and has its own optional consent; typing remains available.

**Para sa magulang** includes privacy/terms and a child-friendly explanation, help,
about/version/contact details, motion/sound preferences, local-data export, and typed
deletion/withdrawal. The adult gate is not identity verification or secure authentication.
Terms and privacy are review drafts informed by Philippine sources, not legal certification.
See the [public-release checklist](docs/PUBLIC_RELEASE_CHECKLIST.md): rights to the generated
audio, legal-operator/address details, legal review, and production signing still need
resolution before public distribution. Run `npm run test:launch` for the full guardian,
offline-startup, export/deletion, and failed-boot checks.

- A skippable three-panel Filipino story introduces Tala and her friends before first-time learner setup. Returning learners go straight to home and can replay it using **Ang kuwento ni Tala**. Optional story recordings use the [Tala intro script](docs/voice-scripts/TALA_INTRO.md).

- **Titik** — letters A-Z, word blending, sight words, and review (33 stages)
- **Bilang** — numbers 1-10, counting, ordering, more/fewer, addition, subtraction, and review (15 stages)
- **Likha** — shapes, colors, color mixing, patterns, review, and a drawing finale (15 stages)
- **Tala** — Filipino stories and situations about kindness, respect, sharing, hygiene, tidiness, and responsibility (10 stages)
- 73 core stages: 72 five-question activities and one drawing activity, plus 10 Quest Quiz rounds hosted by Tala.
- **Hamon ni Tala (Quest Quiz)** unlocks after completing every stage in all four core worlds, including the drawing finale. Any star rating counts; five stars are not required. Rounds 1-3 have eight questions; rounds 4-10 have ten. Each round draws from completed lessons, removes duplicate questions within the round, and unlocks the next round on completion. Later rounds favor harder learned questions, with a 2/2/2/2 or 3/3/2/2 subject mix.
- A three-panel Quest opening introduces **Anino**, a shadow who tries to steal Tala's restored shine. Completing all ten rounds, at any star rating, opens a three-panel ending where Tala regains her light and thanks the learner by name on screen. Both stories have replay controls and optional recorded narration. Progress is saved before the ending begins.
- 360 quiz questions, with Filipino text and picture/visual choices.
- Select an answer first, listen to its word recording, then press **Ito ang sagot ko** to confirm it. This button gently pulses after selection (static highlight with reduced motion); its label is not spoken. Correct answers automatically advance after success feedback, with no Next button. After three misses the correct answer is narrated before advancing.
- Three unsuccessful confirmations reveal the correct answer so the experience stays encouraging and no-fail.
- First-try accuracy awards 1-5 stars. Replaying a stage only adds stars above the previous best.
- Progress and learner name are stored locally in the browser.
- The welcome screen automatically plays Tala's guidance, with a replay button. Supported browsers offer Filipino voice input for the learner's name after a parent-permission notice. The recognized name stays in the editable field until “Tara na!” is pressed. Teachers/parents can correct it from Settings → Progreso at learner profiles → “Pangalan ng mag-aaral” without resetting progress.
- Voice naming is optional, browser-dependent, and may need internet and a secure context (HTTPS or localhost). The browser may send speech to its recognition provider; TALA does not save an audio recording. Typing remains available. The microphone stops on navigation, tab hiding, manual typing, cancellation, or after 15 seconds. This is separate from cached MP3 playback, which works offline after caching. See [browser speech-recognition behavior](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API).
- Next stages and Quest rounds unlock after the previous one is completed. Completing a Quest round lights a constellation point; the teacher/parent progress view also lists Quest stars and attempts.
- Supplied character PNGs for Tala, Likha, Titik, and Bilang appear throughout the app, with Neutral, Talking, and Happy expressions tied to narration and answer feedback.
- Saturated child-friendly colors, background scenery, moving particles, scroll reveals, domino-style level entrances, confetti, and reduced-motion support.
- Offline Web Audio effects for taps, selections, correct answers, retries, hints, stamps, painting, level completion, and scrolling piano-like notes.
- Five distinct offline musical identities: welcoming celesta/piano on Home, woodland flute and birds for Titik, beach marimba with surf and seabirds for Bilang, playful pizzicato and brush sparkles for Likha, and warm piano/bells for Tala. Music and ambience soften under narration. Module selection adds a world-colored wave transition (skipped with reduced motion). See [sound design](docs/SOUND_DESIGN.md).
- Recorded Filipino introductions for welcome, home, each module map, Hamon ni Tala, menu, and completion play once per device/browser. “Pakinggan” always replays them; three minutes without interaction offers a reminder without interrupting active audio. Heard introductions persist across app restarts and are cleared by progress reset. Navigation uses sound effects rather than repeated spoken labels. Questions, choices, hints, stories, and brief answer feedback remain voiced.

## What is not included yet

This is not the old native Android/Kotlin implementation: the Android project wraps the current web app. There is no Jetpack Compose UI, Room database, Firebase backend, online account/sync system, PDF reporting, avatar shop, tracing activity, or drag-and-drop activity in the current PWA. Skill-mastery charts and curriculum alignment still need teacher review; they should not be treated as implemented features.

## Teacher Classroom Mode — first milestone (1.1.0)

The title screen now opens a separate teacher workspace with a 6-digit PIN,
recovery code and timed lockout. Existing progress migrates into the first student
profile. Teachers can add/search/edit/archive profiles, select a learner and
assign one core activity. Progress, guardian approval and microphone permissions
are isolated per student; teacher setup never substitutes for guardian approval.

New classroom activity attempts keep confirmations, selected answers, hint/reveal
evidence and dates. Interrupted quizzes can resume; drawing strokes cannot.
The roster shows recent independent first responses and full attempt history.
CSV exports contain raw answer records. JSON backup/restore replaces the local
classroom with validation and preview; it does not merge devices or import PINs
and consent records. Android exports/imports use system document pickers.

This remains a review/test build. PIN access is not storage encryption. The
updated privacy notice requires renewed approval, and actual school use needs
school/privacy-officer authorization review. Use demo records for testing first.
See [Teacher guide](USER_GUIDE.md), [milestone/remaining work](docs/CLASSROOM_ROADMAP.md),
and `npm run test:classroom` for browser verification.

## Run locally

A local server is needed for the service worker and offline behavior. From the project folder, run:

```powershell
node tools/serve.cjs
```

Then open `http://localhost:4173`.

Node.js is the only tool needed to run the current project. No package installation or build step is required.

For a quick automated check, run:

```powershell
node --test tests/smoke.cjs tests/presentation.cjs tests/offline.cjs
```

The tests simulate the DOM and Web Audio APIs. They verify curriculum coverage, progress behavior, shared audio paths, character assets, scenery, sound lifecycle, and presentation interactions. A real phone check is still recommended for visual layout, Filipino voice availability, and audio balance.

## Main project structure

Real Chrome checks are available with `npm run test:phone`, `npm run test:tablet`, and
`npm run test:sound` after installing development dependencies. Sound checks generate
short WAV previews in `.tools/sound-design/` and verify the wave transition. The trail's
sticky Back/count bar turns solid while scrolling; Back from a trail always returns
Home, including after level completion.

`npm run test:theme` checks 51 rendered color/type samples and transparent-to-solid
navigation states. The [night theme review](docs/THEME_REVIEW.md) records measured
improvements, palette choices, short-screen scrolling, and accessibility limits.

```text
index.html                  App shell and accessible page mount
css/styles.css              Base layout and component styles
css/playful.css             Playful UI and character presentation styles
css/vibrant.css             Saturated palette, scenery, motion, and transitions
css/night.css               Shared midnight sky, moonlit worlds, and contrast-safe surfaces
js/data.js                  Filipino curriculum data and 73 stages
js/quest.js                 Learned-content pool, unlocks, and mixed round generation
js/app.js                   Screen rendering, level flow, answers, and events
js/storage.js               Local progress storage and migration
js/speech.js                Filipino TTS and shared MP3 playback
js/sfx.js                   Web Audio effects, themes, and scroll piano notes
js/visuals.js               Avatars, world scenery, and visual helpers
manifest.webmanifest        Installable PWA metadata
sw.js                       Update-aware shell caching and offline media cache
assets/characters/          Three PNG expressions per character plus SVG fallbacks
assets/audio/fil/shared/    Folder for reusable recorded MP3 phrases
docs/voice-scripts/         Character-separated phrase lists for voice actors
tests/                      Smoke and presentation tests
tools/serve.cjs             Dependency-free local development server
```

## Adding the recorded Filipino audio

Tala's intro and challenge stories automatically advance **five seconds after the voiceover ends**. Learners can pause auto-next, replay a page, or use Back/Next/Skip. Leaving the screen or hiding the app cancels any pending advance. If narration cannot play, the story stays on its current page. Quiz answers still require explicit confirmation, but correct answers advance automatically after feedback. The confirmation button pulses after a choice is selected and is never read aloud. No Next button is shown. After three misses the correct answer is voiced before advancing.

The app loads lesson/question recordings from shared MP3 files. The full generated library uses Filipino narration and English names for single-letter/letter-pair clips (A = “ey”, B = “bee”). It covers the curriculum and story paths in the 887-entry manifest. Human recordings can be substituted at the same filenames. See the [audio generation workflow](AUDIO_GENERATION.md), [voice notes](VOICE_RESEARCH.md), and reusable phrase lists:

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

Quest questions, options, and hints reuse their source character's existing MP3s, even though Tala hosts the round. Question prompts play automatically when a Quest question opens; missing files remain silent and never block answering. One optional reusable Tala instruction is listed in [TALA_QUEST.md](docs/voice-scripts/TALA_QUEST.md). The six opening/ending narration clips and exact filenames are in [TALA_QUEST_STORY.md](docs/voice-scripts/TALA_QUEST_STORY.md); no generated voices are included.

## Replacing character art

The four current SVGs are placeholders. Replace them using the guidance in [assets/characters/README.md](assets/characters/README.md). If filenames remain `tala.svg`, `likha.svg`, `titik.svg`, and `bilang.svg`, no JavaScript changes are needed.

## Data and progress

Curriculum content is defined in `js/data.js`. Progress is stored locally under the browser key `tala-pwa-progress-v1`; it does not leave the device. The teacher/parent menu includes a reset action for clearing the demo learner and progress.

When Classroom Mode is configured, `tala-classroom-v1` is the authoritative record
for all profiles, permissions and attempt history. The original single-learner
keys are compatibility mirrors, not the source of classroom truth. Use the UI's
backup/restore and scoped reset/deletion rather than removing keys manually.

The service worker checks the network for HTML, CSS, and JavaScript, then falls back to the current release cache when offline. Images and recordings use the cache first. CSS and JavaScript URLs include a release version to avoid pairing new markup with stale styles. Keep these URLs in `index.html`, the cache name, and the matching file list in `sw.js` in sync for each release.

## Design and accessibility notes

The app is designed for touch screens and small phone displays. It includes safe-area spacing for phone status bars, a sticky navigation bar that becomes solid while scrolling, keyboard-visible focus states, labeled controls, `aria-live` feedback, and a reduced-motion mode. Lessons stay in Filipino; privacy, terms, help, and parent controls use everyday Taglish with familiar English labels.

## Android test APK

The repository includes a Capacitor Android project. Run `npm ci`, then `npm run android:build` on Windows with JDK 21 and Android SDK 36 installed. Debug APKs are written to `builds/TALA-debug.apk` and a versioned filename. All recordings and lessons are bundled for offline use. Android 1.0.1 includes protected black system-bar space, in-app phone Back navigation, compact phone layouts, and native Filipino voice-name recognition via the phone's speech service (often Google). See [Android build and phone testing](ANDROID_BUILD.md) for installation, permissions, rebuild instructions, and separate native progress storage. Release signing and store publishing are not configured.

## Related documentation

- [README-PWA.md](README-PWA.md) — implementation and presentation notes
- [TALA_PROGRAMMING_GUIDE.md](TALA_PROGRAMMING_GUIDE.md) — original project guide and requirements reference
- [PROGRESS.md](PROGRESS.md) — project progress notes
- [DECISIONS.md](DECISIONS.md) — implementation decisions
- [assets/audio/fil/README.md](assets/audio/fil/README.md) — audio folder reference

