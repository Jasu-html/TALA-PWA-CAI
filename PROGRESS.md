# TALA Progress Tracker

## Current PWA implementation — 2026-10-21

### Visual and sound update

- Four local SVG character placeholders and a single replacement configuration in js/visuals.js.
- Character-and-speech-bubble layouts for lessons and questions, with selection/retry/success reactions.
- Character placements on the welcome, home, world cards, maps, painting, and completion screens.
- World-themed winding-path scenery with non-interactive decorative landmarks.
- Offline Web Audio effects for taps, option selection, hints, correct answers, gentle retries, stage entry, painting stamps, and completion.
- Persistent sound-effect mute toggle, background-audio stopping, and reduced-motion support.
- Updated service-worker shell includes all new character, visual, CSS, and sound assets.

The sections below this note describe the previous native Android specification. The current workspace implementation is a Filipino-only HTML/CSS/JavaScript PWA.

- 73 playable stages across the four implemented worlds: 33 language, 15 numbers, 15 arts, 10 values.
- A–Z have individual stages; language also includes Filipino blending, sight words, and review.
- 360 practice questions (five per quiz stage) plus a canvas painting finale.
- Winding paths scale to each world's stage count and include a jump-to-current-stage button.
- Answers use select/listen/confirm. Option selection plays a per-question MP3; only confirmation scores the answer.
- Third unsuccessful confirmation reveals the answer and permits moving forward.
- Stage stars use first-try accuracy. Replays award only the improvement above the saved best.
- Demo completions migrate to equivalent concepts in the expanded curriculum.
- Author-provided narration paths and recording scripts cover lessons, prompts, hints, and all answer options. No audio is generated; recordings still need to be supplied.
- Automated coverage includes completion of every quiz stage, selection, confirmation, retry behavior, scoring, migration, painting completion, and audio routing.
- Pending: real-browser visual checks and actual recorded audio playback on the target phone.

This completes the expanded lesson/choice content in the current PWA. Native-spec tracing, drag-and-drop activities, animated multipage storybooks, Quest Quiz, and APK packaging are separate work.

---

Project: TALA: A Voice-Guided Learning App for Grade 1 Learners
Date: 2026-10-18

---

## Phase Status

### Phase 0: Environment and project setup
- [x] Project structure created
- [x] Build configuration (Gradle, Kotlin DSL, version catalog)
- [x] Hilt DI configuration
- [x] Room with KSP setup
- [x] Jetpack Compose + Material 3
- [x] Navigation Compose + window-size-class
- [x] Coroutines + StateFlow
- [x] kotlinx.serialization
- [x] Lint configuration
- [x] .gitignore
- [x] Gradle wrapper configuration
- [x] main application files (TalaApplication, MainActivity)
- [x] Navigation setup (Routes, TalaNavigation)
- [x] Theme system (TALAColor, TalaTheme)
- [x] Splash screen with Tala character
- [x] Icon asset placeholder (vector drawable)
- [x] Build succeeds in debug configuration after fixing a Windows ACL issue in the generated build directory
- [ ] Proper app icon for all densities

**Status:** 95% complete - The project infrastructure and debug build are validated. Remaining work is icon polish and a quick device smoke test.

---

### Phase 1: Design system, characters, adaptive foundation
- [x] Color palette
- [x] Type (Fredoka + Nunito bundled as local TTF resources)
- [x] Shared components (TalaPrimaryButton, TalaSecondaryButton, BigIconButton, HintBulb, SpeakerButton, level node, wallet, progress dots, segmented top bar)
- [x] Interaction helpers (StagePanel, GhostHand, adaptive stage shell)
- [x] Character art (state animations)
- [x] Responsive gallery shell (design-system preview screen)
- [x] UI polish pass: gradient surfaces, richer home hierarchy, stronger spacing/shadows, and shared tap feedback

**Status:** Phase 1 is substantially complete. The shared UI now uses richer gradients, depth, spacing, and tap feedback; device visual QA remains open.

---

### Phase 2: Audio and narration engine
- [x] NarrationManager
- [x] TTS locale availability checks with en-US fallback and observable status
- [x] SfxPlayer (SoundPool)
- [x] Subtitle bar
- [x] Audio focus handling, background pause/resume, and release
- [x] Lesson-flow audio API (speak, queue, repeat, SFX, subtitle and availability state)
- [x] Debug audio screen and all seven SFX resources
- [x] Recorded-clip-first key resolution, localized JSON TTS text, and letter soundText
- [x] Teacher-only one-time TTS recovery notice with automatic subtitles and settings action
- [ ] Device smoke test: all effects/repeat audibly verified

**Status:** Audio implementation is complete; the guide's audible SFX/repeat smoke check remains open. On the API 37 emulator, an English narration subtitle and active repeat toggle survived rotation with no fatal app error. Rotation was triggered through `adb emu rotate`, not the Android Studio Device Manager UI. The emulator audio output could not be heard/confirmed, so audible playback of every SFX and repeat remains unverified.

**Phase 2 verification:** `NarrationLanguageResolverTest` has 8 tests covering clip-first resolution, JSON TTS fallback, `soundText`, language fallback, and Filipino subtitle/spoken text behavior. All seven SFX files are generated by `tools/generate_phase2_sfx.js`; file hashes are distinct. Current JVM class counts: audio resolver 8, DAO 1, progress recorder 9, home path 2, parent access 3 (23 total). Before the resolver expansion, that class had 3 tests and the suite had 18; five resolver tests were added, with no tests removed, renamed, or merged. Latest full run: 23 passed, 0 failed, 0 skipped. `./gradlew assembleDebug` succeeded.

---

### Phase 3: Data layer and content loader
- [x] DataStore configuration
- [x] Content loader (JSON parsing)
- [x] Shared lesson content models
- [x] Hilt wiring for content and settings
- [x] Room entities and DAOs
- [x] Repositories
- [x] ProgressRecorder
- [x] Unit tests

**Status:** Complete - the Room schema, repository layer, and transaction-based progress recorder are implemented and verified with unit tests and a debug build.

**Phase 3 verification:** `ProgressRecorderTest` has 9 tests, including Robolectric/Room in-memory coverage for atomic progress recording, badge uniqueness, equal/lower-star replays, and module-final-level bounds. Star-mapping assertions cover every tier boundary from 0 through 90 percent. `TalaDatabaseDaoTest` has 1 Room in-memory DAO test. Full JVM unit-test results: 15 total, 15 passed, 0 failed, 0 skipped. `./gradlew assembleDebug` succeeded. Shop spending is not implemented; its balance and lifetime-star invariants are recorded for Phase 13 in `DECISIONS.md`.

---

### Phase 4: Story intro, splash, setup, and student login
- [x] Grown-up setup flow
- [x] Story intro (animated)
- [x] Splash screen
- [x] Student login
- [x] Parent gate
- [x] PIN pad

**Status:** In progress - the app now includes the splash, student login, adult-access flow, teacher setup, and story intro screens. The remaining work is polishing the launch-only onboarding flow and validating it in the real app UX.

---

### Phase 5: Home and level path
- [ ] Home screen
- [ ] Level path navigation
- [ ] Module banners
- [ ] Level nodes (locked/current/completed)
- [ ] Constellation strip
- [ ] Wallet display

**Status:** Not started

---

### Phase 6: Level flow engine
- [x] LevelFlow state machine
- [x] Lesson -> Practice -> LevelComplete phases
- [ ] Demo replay with ghost hand
- [x] Hint system
- [x] Persistence
- [x] Simplified five-question multiple-choice practice with first-try scoring

**Status:** Simplified flow is working in source: lesson, five-question practice, hints, replay reset, star scoring, and Room persistence. Demo animation and richer activity types remain open.

---

### Phase 7: Module 1 - Phonics and Reading
- [ ] Lesson phase (26 letters)
- [ ] Letter Sound Safari
- [ ] Finger Tracing (evaluator)
- [ ] Picture Match
- [ ] Blend and Build
- [ ] Sight Words
- [ ] 20 levels end-to-end

**Status:** Not started

---

### Phase 8: Module 2 - Numbers
- [ ] Lesson phase (nums 1-10)
- [ ] Count & Drop
- [ ] How many?
- [ ] Number Order
- [ ] More or Fewer
- [ ] Add and Take Away
- [ ] 15 levels end-to-end

**Status:** Not started

---

### Phase 9: Module 3 - Shapes, Colors, and Arts
- [ ] Lesson phase (shapes/colors)
- [ ] Shape Sorter
- [ ] Color Match
- [ ] Color Mixing
- [ ] Pattern Builder
- [ ] Free Painting
- [ ] 15 levels end-to-end

**Status:** Not started

---

### Phase 10: Module 4 - Good Values
- [ ] Storybooks (6 books)
- [ ] Choice scenarios
- [ ] Values in action
- [ ] Review level
- [ ] 10 levels end-to-end

**Status:** Not started

---

### Phase 11: Module 5 - Quest Quiz
- [ ] Round generation from pool
- [ ] Mixed quiz types
- [ ] Question filtering by learned content
- [ ] Quest map
- [ ] 10 rounds end-to-end

**Status:** Not started

---

### Phase 12: Level Complete, stars, constellations, badges
- [ ] Star animation (confetti, popping stars)
- [ ] Wallet rules
- [ ] Constellation lighting
- [ ] Badges system (10+ badges)
- [ ] 5-star accuracy mapping
- [ ] Replays add only new stars

**Status:** Not started

---

### Phase 13: Avatar Creator, Closet, Star Shop, Sky Map
- [ ] 8 preset kid avatars
- [ ] Avatar Creator UI
- [ ] Closet (owned items, equip)
- [ ] Star Shop (purchase flow)
- [ ] Sky Map/Sticker Book
- [ ] Wallet math

**Status:** Not started

---

### Phase 14: Teacher and Parent Dashboards
- [ ] Parent gate + PIN + role choice
- [ ] Teacher dashboard (sidebar/bottom nav)
- [ ] Default view (class cards, summary)
- [ ] Students list/details
- [ ] Student detail view (charts, mastery, badges)
- [ ] Reports (PDF export, CSV export, individual report)
- [ ] Difficulty settings
- [ ] Admin tools (PIN management, backup/restore, reset)

**Status:** Not started

---

### Phase 15: Settings, break reminders, accessibility, polish
- [x] Unlocked orientation policy for portrait and landscape
- [ ] Gated settings (volume, speed, lang, subtitles, etc.)
- [ ] Break popup (15 min)
- [ ] Play-time limit lock
- [ ] Accessibility check (TalkBack, reduced motion)
- [ ] Edge-to-edge + immersive
- [ ] Adaptive launcher icon
- [ ] Responsive QA pass

**Status:** Not started

**Orientation update:** Both manifest activities use `screenOrientation="unspecified"`. On the API 37 phone emulator, splash, login, parent gate, and teacher setup were inspected in portrait and landscape; parent gate math/answer and teacher form values survived rotation. Teacher setup actions are reachable by scrolling in landscape. The debug subtitle and active repeat toggle remained after rotation. Rotation used `adb emu rotate` because Android Studio Device Manager UI was unavailable. Full device-matrix QA remains pending.

---

### Phase 16: Testing and hardening
- [ ] Unit tests (star rules, mastery, tracing, evaluations)
- [ ] Instrumented tests (Room, Compose UI tests)
- [ ] Monkey test (no crashes)
- [ ] Android 7.0 (API 24) compatibility
- [ ] MANUAL_TEST_CHECKLIST.md execution

**Status:** Not started

---

### Phase 17: Packaging and documentation
- [ ] Release APK (R8)
- [ ] README.md (build, architecture, content schemas, usage)
- [ ] USER_GUIDE.md for teachers
- [ ] Screenshots (phone + tablet)
- [ ] Testing documentation

**Status:** Not started

---

## Git Commits

- Initial project structure
- Build configuration (Gradle, version catalog, dependency declarations)

---

## Decisions

None yet.

---

## Known Limitations

None yet.
