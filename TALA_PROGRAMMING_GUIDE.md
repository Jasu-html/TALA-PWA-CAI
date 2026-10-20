# TALA Programming Guide

## 1. Your Role and the Goal

You are a senior Android engineer experienced with children's educational apps. Build **TALA**, a complete, fully working, offline Android app for Grade 1 pupils in the Philippines (ages 6-7, many cannot read well yet). Complete system name: TALA: A Voice-Guided Learning App for Grade 1 Learners

TALA is a Computer-Aided Instruction (CAI) app for a school system project. Its feel is gamified and Duolingo-like (talking characters, a level path, star rewards) but softer, cuter, and Filipino-inspired. Pupils learn through voice narration, big icon buttons, mini-games, quizzes, and star rewards, guided by four friendly characters. Teachers and parents get PIN-protected dashboards with automatic progress tracking, difficulty settings, and one-tap PDF reports.

**Hard rule:** every feature in this document must be implemented end to end and work on a real device or emulator. No placeholders, TODO stubs, fake-data screens, "coming soon" buttons, or features that exist only in the UI. If something truly cannot be done, stop and explain why instead of faking it.

---

## 2. Background, Story, and Game Design

- **Problems:** short attention span with paper worksheets; non-readers need an adult to read every instruction; need for gamified, audio-visual, self-paced tools.

- **Objectives:** lessons with full voice-over; multimedia (animation, audio cues); drag-and-drop exercises and phonics tracing; automatic monitoring and evaluation of performance.

- **Users:** Pupils (primary); Teachers and Parents (progress analytics, difficulty settings); Administrator (content, accounts, maintenance, inside the dashboard).

- **Learning flow:** every level runs Lesson -> Practice -> Level Complete (see "Level structure" below). This keeps the proposal's flow (introduction, lesson audio, game, quiz, reward) inside two phases.

- **Content defaults** follow the proposal (letters A-Z, numbers 1-10, basic shapes and colors, good manners). Higher difficulty extends the range (section 9). All content lives in JSON so the grade level can be adjusted without code changes.

- **Source of the game design:** a teammate's separate prototype brief supplies the story, characters, level path, avatars, and shop described below. Where it conflicts with this document, this document wins: TALA is a native Android app (not web or desktop), student screens are designed landscape-tablet first but fully responsive, and the teacher and parent dashboards live inside the app.

### Story and characters

Tala is a little star who fell from the night sky and lost her sparkle. With her three friends she asks the pupil to collect Star Pieces to relight the constellations. Each friend guides one subject, and the names match the subjects. Every character has five states: waving, talking, thinking, cheering, sleepy.

**Tala**
- Meaning: "star"
- Look: glowing yellow star girl, main host
- Guides: Good Values and the final Quest Quiz
- World: Starlight Hill

**Likha**
- Meaning: "create"
- Look: coral, beret and paintbrush
- Guides: Arts, Shapes and Colors
- World: Art Studio

**Bilang**
- Meaning: "count"
- Look: sky-blue, wears a backpack of numbers
- Guides: Math
- World: Number Market

**Titik**
- Meaning: "letter"
- Look: purple, glasses and a book
- Guides: Phonics and Reading
- World: Story Library

A skippable 3-panel animated story on the first pupil launch shows Tala falling and meeting her friends.

### Modules and levels

Each module has 10-20 levels, and the five modules are the proposal's five modules. All modules are open from the start. Inside a module, level N+1 unlocks when level N is complete (a teacher can unlock all levels for a pupil).

**Module 1: Phonics and Reading**
- Guide and world: Titik, Story Library
- Levels: 20
- Level plan: L1-13 letter pairs (A-B ... Y-Z): sound, tracing, picture match. L14-17 blending three-letter words (cat, dog, sun, pig). L18-19 first sight words (I, a, the, is). L20 review.

**Module 2: Numbers**
- Guide and world: Bilang, Number Market
- Levels: 15
- Level plan: L1-5 numerals in pairs (1-2 ... 9-10). L6-8 Count & Drop. L9-10 number order. L11-12 more or fewer. L13-15 add and take away within 10 using objects.

**Module 3: Shapes, Colors, Arts**
- Guide and world: Likha, Art Studio
- Levels: 15
- Level plan: L1-6 shapes. L7-10 colors, two per level. L11-12 color mixing. L13 banig-style patterns. L14 review. L15 free painting finale.

**Module 4: Good Values**
- Guide and world: Tala, Starlight Hill
- Levels: 10
- Level plan: L1-6 six storybooks. L7-9 values in action (picture-choice scenes: class, home, community). L10 review.

**Module 5: Quest Quiz**
- Guide and world: Tala, Starlight Hill
- Levels: 10
- Level plan: 10 rounds of a mixed voice quiz (8-10 questions). Questions come only from content the pupil has already learned, and rounds get harder. Round 1 unlocks after 3 finished levels in any two modules; each later round unlocks after the one before.

### Level structure

Every level has two phases. A top bar shows two segments, Lesson | Practice, and Level Complete follows.

- **Lesson:** the guide teaches with voiceover, animated visuals, and highlighted words. Then a **"Watch how to play"** demo: an animated hand shows how the activity works. A Replay button and a big **"I'm ready!"** button end the phase.

- **Practice:** the pupil answers 5-8 problems. Progress dots, a hint lightbulb, and the guide in a corner reacting to each answer.

- **Level Complete:** confetti, stars pop in one by one, then fly into the star wallet.

Tapping a level node opens a popup with the level illustration, the best score out of 5 stars, and a big Play button.

### No-fail rules and stars

- A wrong answer never shows a red X, buzzer, or lost star. The guide says "Try again!" and wiggles the right answer. After 3 misses the guide shows the answer, moves on, and records the item as incorrect.

- Hints: after 8 seconds idle (configurable) or a lightbulb tap, the answer glows, the guide gives a hint, and the prompt repeats.

- Level stars (1-5, minimum 1) by first-try accuracy:
  - 90-100% = 5 stars
  - 75-89% = 4 stars
  - 60-74% = 3 stars
  - 40-59% = 2 stars
  - below 40% = 1 star

  A replay adds only the stars above the previous best.

- Two counters: the **Star Wallet** (spendable balance, reduced only by Star Shop purchases) and **Lifetime Stars** (never decreases; drives badges and the dashboard).

- Each module has a constellation with one point per level. The first completion of a level lights its point (a "Star Piece"). A night-sky strip on Home shows the progress.

---

## 3. Non-Negotiable Requirements

- **Offline-first.** No INTERNET permission, no ads, no analytics, no third-party trackers, no cloud. All data stays on the device (children's data privacy).

- **Responsive.** Student screens are designed landscape-tablet first (1024x768 reference) and must work on phones (landscape and portrait) and tablets from 5" to 11", with font scale up to 1.3x and split-screen. Dashboards are designed for large screens and collapse to bottom navigation on phones. Rotation must never lose progress mid-activity (see section 7).

- **Voice first and icon first.** A speaker icon sits beside every instruction, and the characters read it aloud automatically. Text is minimal and large. A pupil never needs to read to use the app.

- **No-fail.** Follow the no-fail rules in section 2: no red X marks, buzzers, the word "wrong", lost stars, or pressure timers.

- **Kid-safe.** No external links, no accidental exit. Grown-up areas sit behind a parent gate (hold a button for 3 seconds or solve a simple sum) and a PIN. A Home button is always visible, and each screen has one main action.

- **Accessible.** Pupil touch targets at least 72dp; text at least 20sp; contrast at least 4.5:1; never rely on color alone; contentDescription on every control.

- **Performance.** 60 fps dragging and tracing; cold start under 3 s on a 2 GB RAM phone; APK under 60 MB.

- **Languages.** English and Filipino (Tagalog), with an English/Filipino toggle for narration and text. No hard-coded strings.

---

## 4. Mandated Tech Stack

- Kotlin; Gradle Kotlin DSL with a version catalog; minSdk 24; compileSdk and targetSdk = latest stable.

- Jetpack Compose + Material 3, Navigation Compose, material3 window-size-class.

- MVVM with ViewModel + StateFlow, Kotlin Coroutines, Hilt for DI.

- Room (KSP) for data, DataStore for settings, kotlinx.serialization for content JSON.

- Audio: Android TextToSpeech for narration, MediaPlayer for optional recorded narration clips, SoundPool for sound effects.

- Reports: android.graphics.pdf.PdfDocument for PDF, plain Kotlin for CSV; save with MediaStore or Storage Access Framework; share with FileProvider and a share Intent.

- Charts: draw with Compose Canvas (no chart library).

- Tests: JUnit4, MockK, Turbine, Room in-memory, Compose UI tests.

- No other third-party libraries unless justified in the README. No Firebase.

- Fonts: Fredoka (headings) and Nunito (body), bundled as OFL-licensed TTF files.

---

## 5. Project Structure

Package: com.capstone.tala

```
app/src/main/
  java/com/capstone/tala/
    core/      theme, adaptive layout helpers, shared components
    audio/     NarrationManager, SfxPlayer
    data/      Room entities, DAOs, repositories, DataStore, content loader
    domain/    scoring, star rules, level unlock, difficulty, tracing
               evaluator, avatar catalog, report builder
    feature/   story, splash, login, home (level path), levelflow, phonics,
               numbers, artstudio, values, quest, rewards, avatar (creator,
               closet), shop, skymap, dashboard (teacher, parent), settings
  assets/content/  phonics.json, numbers.json, shapes_colors_arts.json,
                   values_stories.json, quest_pool.json, avatar_catalog.json,
                   strings_en.json, strings_fil.json
  assets/audio/{en,fil}/  optional recorded clips (file name = narration key)
  res/raw/         sound effects
tools/             script that generates the sound-effect files
```

---

## 6. Data Model

Room entities, with indexes and migrations:

- Student(id, name, avatarSpecJson, section, createdAt)

- LevelProgress(studentId, moduleId, levelIndex, status, bestStars, bestFirstTryAccuracy, lastPlayedAt) with status LOCKED, CURRENT, or COMPLETED. Constellation points are derived from completed levels.

- ActivityResult(id, studentId, moduleId, levelIndex, activityType, itemKey, firstTryCorrect, attempts, hintsUsed, durationMs, difficulty, timestamp) (one row per question or item)

- QuestAttempt(id, studentId, round, startedAt, finishedAt, totalItems, firstTryCorrect, starsAwarded)

- StarWallet(studentId, balance, lifetimeStars) and StarTransaction(id, studentId, delta, reason, refId, timestamp). Only shop purchases give a negative delta, and lifetimeStars never decreases.

- AvatarItemOwned(studentId, itemId) and BadgeEarned(studentId, badgeId, earnedAt)

- ItemMastery(studentId, itemKey, level) with keys like letter_B, number_7, shape_triangle, color_red, value_po. An item is "mastered" when it was first-try correct in 2 of the last 3 attempts. This drives the dashboard mastery grids.

- StudentSettings(studentId, moduleId, difficulty, unlockAllLevels) for per-student overrides.

- PlaySession(id, studentId, startedAt, endedAt) for time spent, the break popup, and play-time limits.

DataStore: PIN hash (PBKDF2 + salt), recovery-code hash, school name, class label, narration language, speech rate, volume, subtitles, hint idle seconds, per-student daily play-time limit (set in the parent view), and class difficulty defaults per module.

Module ids: PHONICS, NUMBERS, SHAPES_COLORS_ARTS, VALUES, QUEST. Guide ids: TALA, LIKHA, BILANG, TITIK.

---

## 7. Responsive Design Rules

- **Reference layouts:** student screens are designed first for landscape tablets (1024x768, 4:3) and must scale to phones in landscape and portrait and to 10-11" tablets. Dashboards are designed for large screens (sidebar with Overview, Students, Reports, Settings) and must collapse to bottom navigation on phones.

- Use WindowSizeClass:
  - **Compact** (under 600dp): single pane, 2-column grids, bottom navigation.
  - **Medium** (600-840dp): 3 columns.
  - **Expanded** (over 840dp): side rail or sidebar, mascot side panel, and two-pane list-detail in the dashboards.

- No fixed pixel sizes. The level path scrolls and its nodes scale. Game scenes use BoxWithConstraints and fractional (0..1) coordinates so everything scales with the stage. The stage keeps a safe 4:3 to 16:9 area and centers on very wide screens.

- Drag-and-drop hit-testing uses measured bounds (onGloballyPositioned), never hard-coded positions.

- State survives rotation (ViewModel + rememberSaveable) and narration is re-queued correctly.

- Verify on: small phone (360x640dp), Pixel 7 portrait and landscape, 8" tablet, 10" tablet landscape, unfolded foldable, and font scale 1.3.

---

## 8. Build Phases (Follow in Order)

After each phase: build, run tests, install on an emulator, check its "Done when" line, commit to git with a clear message, and update PROGRESS.md. Do not start the next phase until the current one is done.

### Phase 0: Environment and project setup

Create the project with the stack above, configure Hilt, Room, Compose, the version catalog, lint, .gitignore, and PROGRESS.md.

**Done when:** ./gradlew assembleDebug succeeds and a blank "TALA" screen runs on a phone and a tablet emulator.

### Phase 1: Design system, characters, adaptive foundation

- **Palette:** cream #FFF8EC (backgrounds), night blue #2B3A67 (text and night-sky scenes), star yellow #FFC93C, coral #FF7A6B, sky #4DB8FF, mint #5BD6A4, purple #8E7CFF. Never rely on color alone: pair color with an icon, shape, or position.

- **Type and shape:** Fredoka for headings, Nunito for body text, chunky 3D buttons with a press-down animation, 24dp corner radius, sticker-style illustrations, twinkling night-sky motifs, and Filipino touches (banig patterns, sampaguita, palengke scenes).

- **Shared components:** BigIconButton (72dp+, press animation, tap sound), SpeakerButton, HintBulb, LevelNode (locked, current, completed, with a 5-star rating), TwoSegmentTopBar, StarWallet, StarRow, ProgressDots, ConfettiOverlay, GhostHand, CharacterView, StagePanel, AdaptiveGrid, PinPad, and a large OnScreenKeyboard that says each letter's name when tapped.

- **Characters:** Tala, Likha, Bilang, and Titik drawn as vector/Canvas art with five animated states each (waving, talking with mouth synced to narration, thinking, cheering, sleepy). Each world (Art Studio, Number Market, Story Library, Starlight Hill) has its own background scene.

- **Object pictures:** draw vectors, or use emoji from Unicode 9 or earlier only. Route all art through one ArtRegistry (item key -> drawable) so art can be swapped later. Pupil avatars are built in Phase 13.

**Done when:** a debug component gallery renders every component and all 20 character-state combinations correctly on all device configs in section 7.

### Phase 2: Audio and narration engine

- NarrationManager: speak(key, args), queue, stop(), isSpeaking flow, repeatEvery(seconds). Each key resolves in this order: recorded clip at assets/audio/{lang}/{key}.ogg, then TTS using the text in strings_{lang}.json.

- TTS: locale fil-PH or en-PH, falling back to en-US; slower rate (0.85) for children. Letter sounds use a separate soundText field (for example "buh" for B) because TTS would otherwise read the letter name. If TTS is missing or lacks the language, show a one-time teacher-only dialog with a button to open the TTS install/settings screen and switch subtitles on automatically.

- Handle audio focus, pause when backgrounded, release resources properly. Narration stops when the child navigates away.

- SfxPlayer (SoundPool): tap, pick up, drop, correct chime, gentle try-again (soft marimba, never a buzzer), star earned, cheering fanfare. Generate original sounds with a script in /tools. No copyrighted audio.

- Optional subtitle bar showing the narrated text.

- Each character has its own TTS pitch and speed so pupils can tell Tala, Likha, Bilang, and Titik apart by voice.

**Done when:** a debug screen plays every SFX and narrates sample keys in English and Filipino, the repeat timer works, and rotation does not break playback.

### Phase 3: Data layer and content loader

Implement the entities, DAOs, and repositories from section 6. The content loader parses JSON into typed models and fails loudly (in debug) on invalid content. Build a ProgressRecorder that, in one transaction, saves each ActivityResult and updates LevelProgress (best stars, status, unlocking the next level), ItemMastery, the StarWallet and StarTransaction, and badges.

**Done when:** unit tests cover the recorder, the mastery rule, the accuracy-to-stars mapping (1-5), replays adding only new stars, wallet versus lifetime stars, and level unlock order, and DAO tests pass.

### Phase 4: Story intro, splash, setup, and student login

- **Grown-up setup (first launch only):** welcome -> teacher creates a 4-6 digit PIN -> an 8-character recovery code is shown once (the teacher confirms it was saved) -> school name and class section -> optionally add students (name only; pupils can also register themselves). Include an "Add sample class" button for demos (Mia, Leo, Ayla, Jun, Bea).

- **Story intro:** shown on the first pupil launch and skippable at any time: 3 animated, narrated panels of Tala falling and meeting Likha, Bilang, and Titik.

- **Splash:** logo, all four characters, a big Play button, and a small Teacher/Parent link.

- **Student login:** returning players tap their saved avatar card (picture plus large name). New players type their name on the big on-screen keyboard, then pick one of 8 preset avatars or "Make my own!" (opens the Avatar Creator from Phase 13). Tapping a card narrates "Hi, [name]!" and the guide waves.

- **Grown-up access:** the Teacher/Parent link opens the parent gate (hold a button for 3 seconds or solve a simple sum), then the PIN pad, then a role choice (Teacher or Parent).

**Done when:** the full flow works offline, relaunch skips setup and the story intro, a new pupil can register and reach Home, and a returning pupil needs no typing.

### Phase 5: Home and level path

Home is a winding level path through the four worlds. Tapping a world banner (or scrolling) jumps to any of the five modules. Level nodes show locked, current, or completed state with a 5-star rating, and the module's guide stands beside the current node with a spoken hint bubble ("Let's learn B!"). Top bar: the pupil's avatar and the star wallet. Icon-only navigation (a bottom bar, or a side rail in landscape): Path, Closet, Star Shop, Sky Map. A night-sky Constellation strip lights up as levels and modules are completed. Tapping a node opens the level popup (illustration, best stars out of 5, big Play button).

**Done when:** every node opens its level, locked nodes explain themselves by voice, and the wallet and constellation strip update live.

### Phase 6: Level flow engine

Build a reusable state machine LevelFlow with phases Lesson -> Practice -> LevelComplete, shown by a two-segment top bar (Lesson | Practice). The Lesson phase ends with a "Watch how to play" demo: every Practice activity exposes a demoScript() that replays one solved example through the real activity UI with an animated ghost hand (tap, drag, or trace). Replay and "I'm ready!" buttons are always large. Practice shows progress dots, a hint lightbulb, and the guide reacting in a corner, and it applies the no-fail and hint rules from section 2. The phase is saved so a pupil can resume, and the Home icon exits and saves state. Level Complete awards stars (Phase 12).

**Done when:** a test level runs Lesson -> demo -> Practice -> Complete with persistence, resume, the 8-second hint, and the "Try again!" wiggle.

### Phase 7: Module 1, Phonics and Reading (Titik's Story Library)

**Level plan:** 20 levels (see section 2): letter pairs A-B through Y-Z, then blending, sight words, and a review.

**Letter content:** every letter has uppercase and lowercase forms, a soundText, a keyword, and a picture: A apple, B ball, C cat, D dog, E egg, F fish, G goat, H hat, I ice cream, J jar, K kite, L lion, M moon, N nest, O orange, P pig, Q queen, R rain, S sun, T tiger, U umbrella, V van, W watermelon, X xylophone, Y yo-yo, Z zebra.

- **Lesson phase (Titik):** each letter card animates and Titik narrates "A says ah, as in apple" with highlighted words, then the "Watch how to play" demo.

- **Letter Sound Safari:** animals pop out of bushes holding letters. A sound plays and the child taps the animal holding the matching letter.

- **Finger Tracing:** a big dotted letter with a start dot and arrow. Evaluator: get the glyph outline from the bundled font with Paint.getTextPath, flatten it with PathMeasure into ordered sample points, and accept the trace when enough points are covered. Coverage is order-agnostic and lenient: Easy 75%, Medium 85%, Hard 90% of points within about 8% of the glyph height of any child stroke. Show bright "ink" with a sparkle trail; on success the letter fills with color and is narrated.

- **Picture Match (voice quiz):** "Which picture starts with this sound?" with 3 picture answers.

- **Blend and Build (levels 14-17):** drag letter tiles into slots to build a word while Titik sounds out each letter and then blends it.

- **Sight Words (levels 18-19):** "Tap the word the" among 3 word cards.

**Done when:** all 26 letters (upper and lower case) can be traced, unit tests show the evaluator accepts a correct trace and rejects scribbles and a single dot, and all 20 levels play end to end.

### Phase 8: Module 2, Numbers (Bilang's Number Market)

**Level plan:** 15 levels (see section 2). Setting: Bilang's palengke, with objects such as mangoes, bananas, fish, eggs, and flowers, and a shopping basket. Hard difficulty extends counts to 20 from level 6.

- **Lesson phase (Bilang):** each numeral appears with that many animated objects, and narration counts them one by one ("one, two, three, three mangoes!").

- **Count & Drop:** prompt "Put 5 mangoes in the basket." The child drags objects into the basket and each drop narrates the running count. Extra drops bounce back gently ("That's enough, let's count together"), and objects can be dragged back out.

- **How many?:** show a group; the child taps the right numeral among 3 tiles.

- **Number Order (levels 9-10):** drag numerals into order.

- **More or Fewer (levels 11-12):** tap the group that has more (or fewer).

- **Add and Take Away (levels 13-15):** "2 mangoes and 1 more mango. How many?" The child drags objects together and taps the answer; take-away works by dragging objects out.

**Done when:** every level plays end to end and Count & Drop works with touch dragging on phone and tablet.

### Phase 9: Module 3, Shapes, Colors, and Arts (Likha's Art Studio)

**Level plan:** 15 levels (see section 2). Shapes: circle, square, triangle, rectangle, star, heart. Colors: red, blue, yellow, green, orange, purple, pink, brown. Hard adds oval and diamond, and black, white, and gray.

- **Lesson phase (Likha):** each shape morphs into real-world objects (clock, window, roof, door, starfish) with narration; each color is shown with matching objects; mixing levels show two paint blobs combining.

- **Shape Sorter:** drag real-world items (clock, ball, window, dice, party hat, pizza slice, door, book, starfish) into the matching shape bin. A mismatch floats the item back after "Try again!" and a hint ("Look at its corners").

- **Color Match:** drag objects into matching paint pots.

- **Color Mixing (levels 11-12):** drag two paint blobs together and tap the resulting color from 3 choices.

- **Pattern Builder (level 13):** continue a banig-style pattern with 3 tile choices.

- **Free Painting (level 15):** a finger-paint canvas with 8 colors, 3 brush sizes, and undo. There are no wrong answers; tapping "I'm done!" after painting completes the level with 5 stars.

**Done when:** every level plays end to end and the painting canvas handles multi-touch smoothly.

### Phase 10: Module 4, Good Values (Tala's Starlight Hill)

**Level plan:** 10 levels (see section 2), hosted by Tala.

- **Lesson phase (animated storybooks, levels 1-6):** 6-8 pages each, with simple vector scenes and motion. Narration highlights words using UtteranceProgressListener.onRangeStart (API 26+) with a sentence-level fallback. Pages turn by swipe or a big arrow, with optional auto-advance. Stories:
  1. *Mano Po* (greeting elders)
  2. *Po at Opo* (respectful speech)
  3. *The Magic Words* (please, thank you, sorry; "Pakiusap, Salamat, Pasensya")
  4. *Sharing and Bayanihan*
  5. *Tidy Up and Wash Up* (cleaning up, washing hands)
  6. *Wait for Your Turn*

- **Practice (choice scenarios):** 5-6 scenes of "What should you do?" with 2-3 picture choices. A good choice gets a cheer. Any other choice makes Tala say "Try again!" and wiggle the good choice, with a gentle spoken reason. Record first-try results.

- **Values in action (levels 7-9):** new scenes set in class, at home, and in the community (honesty, kindness to friends and animals, listening to the teacher), each with a short lesson clip first.

- **Review (level 10):** mixed scenes from the earlier levels.

**Done when:** all six storybooks and all 10 levels play end to end with synced narration.

### Phase 11: Module 5, Quest Quiz (Tala's Starlight Hill)

**Round plan:** 10 rounds of a mixed voice quiz with 8-10 questions each, hosted by Tala. Questions come from quest_pool.json (at least 60 questions in total, no repeats within one round) and only from content the pupil has already learned, so nobody is asked about something they were not taught. Rounds get harder, and each round unlocks after the one before. Round 1 unlocks after 3 finished levels in any two modules; until then Tala says "Learn more with my friends first!"

- **Question types:** voice quiz with 3 picture answers, tap the answer, drag to basket, and mini tracing.

- **Prompts:** each question is read aloud automatically, and the hint rules from section 2 apply (answer glows after 8 seconds idle, prompt repeats, speaker button always available).

- **Feedback:** correct -> instant cheer (several voice-line variants). A miss -> "Try again!" and the right answer wiggles. After 3 misses, Tala says and shows the answer and moves on (recorded as incorrect).

- **Quest map:** a path of stepping stones on Starlight Hill; Tala walks along it as the round advances.

- **Result:** stars only (1-5 by the same accuracy rule as levels). Percentages appear only in the dashboard. Finishing a round lights a point in Tala's constellation.

**Done when:** a pupil with little progress sees the friendly lock message, a pupil with more progress gets rounds drawn only from learned content, and all 10 rounds play end to end.

### Phase 12: Level Complete, stars, constellations, badges

- **Level Complete screen:** confetti, then 1-5 stars pop in one by one with a "ding" and cheering audio, then fly into the star wallet counter. The guide cheers and narrates how many stars were earned. Big "Next level", "Play again", and Home buttons. A replay adds only stars above the previous best.

- **Wallet rules:** lifetimeStars and balance both rise with earned stars; only Star Shop purchases lower balance. Stars are never removed for any other reason.

- **Constellations:** the first completion of a level lights its point (a Star Piece). A fully lit module constellation triggers a celebration and a sticker.

- **Badges (at least 10):**
  - Letter Explorer (finish Module 1)
  - Tracing Star (trace all 26 letters)
  - Number Hero (finish Module 2)
  - Super Counter (10 perfect first-try Count & Drop rounds)
  - Shape Master (finish the shape levels)
  - Color Wizard (finish the color levels)
  - Little Artist (finish Module 3)
  - Good Values Champion (finish Module 4)
  - Quest Master (finish all Quest rounds)
  - TALA Superstar (all others)

**Done when:** each badge is awarded exactly once, persists after restart, and appears in the dashboard.

### Phase 13: Avatar Creator, Closet, Star Shop, Sky Map

- **Avatars:** 8 preset kid avatars (pre-made combinations of the creator parts with Filipino-flavored looks), plus "Make my own!".

- **Avatar Creator:** a big live preview with icon-only tabs: face shape, skin color, eyes, eyebrows, nose, mouth, hair style, hair color, accessories, background. Parts are layered vectors listed in avatar_catalog.json (id, tab, price, art). At least 6 options per tab (at least 3 free), at least 8 skin tones, and paid items from 5 to 50 stars. Owned items are selectable; unowned items show a lock and a star price. A "Surprise me" dice picks random owned parts, and Save stores the avatar.

- **Closet:** a bottom-navigation tab showing owned items by tab, where the pupil can equip or remove them with a live preview.

- **Star Shop:** the same tabs with priced items. Flow: try-on preview -> check/X purchase confirmation showing the balance -> unlock animation -> item becomes owned and balance drops. If the balance is too low, Tala says (and shows) "Keep playing to earn more!" with no red or error styling.

- **Sky Map / Sticker Book:** every constellation and badge. Earned ones are in color; unearned ones are grey silhouettes. Tapping one narrates how to earn it.

**Done when:** buy -> Closet -> equip works end to end, wallet math tests pass, and the avatar appears on login cards, the Home top bar, and the dashboard.

### Phase 14: Teacher and Parent Dashboards

Access: Teacher/Parent link or gear -> parent gate (hold a button for 3 seconds or solve a simple sum) -> PIN pad (30-second lockout after 5 wrong tries) -> role choice (Teacher or Parent). "Forgot PIN" uses the recovery code. Large screens get a sidebar (Overview, Students, Reports, Settings); phones get bottom navigation.

- **Overview:** class cards (students, average stars, completion rate, play time this week, most-practiced module), a "Needs support" list (first-try accuracy under 60% in any module over the last 10 activities), a "Top stars" list, and a 7-day / 30-day / all-time filter.

- **Students:** searchable list; add, edit, delete (with confirmation); sort by name, stars, or last played.

- **Student detail:** progress per module and per level (stars and attempts), accuracy per skill, accuracy trend line chart (last 10 sessions), time spent, mastery grids (A-Z, numbers, shapes, colors, values) colored mastered / practicing / not yet, quiz history table, badges, recent activity feed.

- **Quiz results:** sortable class table by module and student.

- **Difficulty settings:** class defaults plus per-student overrides, for every parameter in section 9. Teachers can also unlock all levels for a pupil. Changes apply from the next activity.

- **Reports:** a big one-tap **Export PTA Report** button shows a PDF preview and, on Save, creates a multi-page PDF with school name, class, date range, summary statistics, a per-student table (stars, completion, first-try accuracy per module), auto-generated strengths and "needs practice" notes (for example "Needs practice with letters B and D"), and a signature line. Save it to Documents/TALA via MediaStore and offer Share. Also provide **Export CSV** (raw ActivityResult) and a one-page **individual student report** PDF for parents.

- **Admin tools:** edit school and class names; change PIN; back up data to a JSON file and restore it (Storage Access Framework); reset one student's progress; reset all progress; delete all data (double confirmation); TTS voice test; app version.

Charts are Canvas-drawn bar and line charts with axis labels that scale with font size and have content descriptions. Report numbers must match the database exactly.

**Parent view** (one child, chosen at the role choice): a weekly summary (time played, stars earned, levels completed), strengths versus "Practice more" skills in plain words, the child's avatar and badges, and a **daily play-time limit** (15, 30, 45, or 60 minutes, or off). When the limit is reached, a sleepy Tala says "See you tomorrow!" and the pupil screens stay locked until a grown-up passes the gate and PIN.

### Phase 15: Settings, break reminders, accessibility, polish

Gated settings: volume, speech speed, English/Filipino toggle, subtitles, hint idle time, haptics toggle, a reduced-motion switch (also honoring the system animation scale), and manage players (add, rename, delete, change avatar).

**Break popup:** after 15 minutes of continuous play, a sleepy Tala says "Let's stretch!" and leads a short stretch animation, then the pupil can continue; it never shows a countdown or blocks progress.

Check TalkBack on the dashboard. Use edge-to-edge with insets, immersive mode and keep-screen-on in activities, and graceful handling of audio or storage failures. Add an adaptive launcher icon and splash (Tala star) with the label "TALA". Do a full responsive QA pass on every configuration in section 7 and fix any overflow or clipping.

**Done when:** the break popup appears at 15 minutes (test with a debug shortcut), the play-time limit lock works, and every setting takes effect immediately.

### Phase 16: Testing and hardening

- **Unit tests:** star rules, mastery rule, difficulty parameters, tracing evaluator (all 26 letters), PIN hashing and lockout, report builder, CSV export, quiz generator (no repeats; 3/3/2/2 distribution).

- **Instrumented tests:** Room DAOs; Compose UI tests for first-run -> login -> module -> quiz -> reward -> dashboard shows the result, on phone and tablet.

- Run adb shell monkey -p com.capstone.tala 5000 with no crashes, enable StrictMode in debug, fix all lint errors, and profile jank on a low-end emulator.

- Write TESTING.md with a manual test checklist and execute it.

- **Also test:** accuracy-to-stars mapping (1-5), replays adding only new stars, wallet versus lifetime stars, level unlock order, shop purchases with enough and too few stars, avatar persistence, demoScript() for every activity, break popup timing, and the play-time limit.

### Phase 17: Packaging and documentation

Produce a debug APK and a release build with R8 enabled, then run the full flow on the release build to catch minification bugs. Document release signing (never commit the keystore). Write README.md (build and run, architecture, content JSON schemas, how to add letters, stories, and questions, how to drop in recorded narration clips, how to change difficulty defaults) and a one-page USER_GUIDE.md for teachers (setup, adding students, reading the dashboard, exporting reports). Include phone and tablet screenshots of every screen.

---

## 9. Difficulty Settings (Defaults)

**Number range**
- Easy: 1-5
- Medium (default): 1-10
- Hard: 1-20

**Answer choices per question**
- Easy: 2
- Medium (default): 3
- Hard: 4

**Practice problems per level**
- Easy: 5
- Medium (default): 6
- Hard: 8

**Tracing coverage needed**
- Easy: 75%
- Medium (default): 85%
- Hard: 90%

**Idle seconds before the answer glows**
- Easy: 5 s
- Medium (default): 8 s
- Hard: 12 s

**Lightbulb hints per level**
- Easy: Unlimited
- Medium (default): Unlimited
- Hard: 3

**Quest round length**
- Easy: 8 questions
- Medium (default): 10 questions
- Hard: 10 questions

---

## 10. Definition of Done

- The app installs and runs on Android 7.0 (API 24) and the latest Android version.

- It works fully in airplane mode and declares no INTERNET permission.

- A pupil can finish every level of every module, and every Quest round, without reading anything.

- All 26 letters trace correctly; counting, sorting, painting, storybooks, and choice scenarios all work.

- Every spoken prompt works in English and Filipino, with a clear fallback if a TTS voice is missing, and each character has a distinct voice.

- No screen shows a failure state to the child: no red X or buzzer, and "Try again!" always wiggles the right answer.

- Level stars follow the 1-5 accuracy rule, replays add only new stars, and Lifetime Stars never decrease.

- Levels unlock one by one; badges and constellation points are awarded exactly once and persist after restart.

- The shop flow (buy, Closet, equip) works, and a too-low balance shows "Keep playing to earn more!".

- Every activity result appears correctly in the teacher and parent dashboards.

- The PTA PDF (with preview), student PDF, and CSV export open correctly and match the database.

- Difficulty changes visibly alter the next activity.

- The parent gate, PIN, lockout, and recovery code work; backup and restore round-trip; the break popup and play-time limit work.

- All layouts pass the device matrix in section 7 with no clipping or overflow.

- Rotation and process death mid-activity do not lose progress.

- Unit and UI tests pass, lint is clean, the monkey test is crash-free, and the release build behaves like debug.

---

## 11. How You Must Work

- Work phase by phase with small, clearly named git commits, and keep PROGRESS.md current.

- Never claim a phase is done without building, running, and testing it. Fix root causes; do not delete or weaken tests.

- No hard-coded user-facing strings and no secrets in the repository.

- Ask me only if you are truly blocked. Otherwise decide, and record the decision in DECISIONS.md. Where this prompt is silent, pick the simplest option that keeps the app child-safe, offline, voice-first, and no-penalty.

- **Final report:** a list of every feature in this prompt with its status (Working, or Not working with the reason), test results, the APK location, known limitations, and the results of the manual test checklist.
