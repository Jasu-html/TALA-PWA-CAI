# TALA PWA

Filipino-only, offline-first presentation MVP for TALA: A Voice-Guided Learning App for Grade 1 Learners.

## Run locally

Service workers require a local web server. From this folder, run one of these commands:

```powershell
node tools/serve.cjs
```

Open http://localhost:4173 in your browser. This server is local to this computer.

The app saves demo progress in the browser's local storage. Use the teacher menu to reset the demo.

## Demo flow

Enter a learner name and open any of the four worlds. Each world has a winding trail. Complete a stage to unlock the next. General encouragement uses an installed Filipino/Tagalog voice; lesson, question, hint, and option recordings are supplied by you.

| World | Stages | Content |
| --- | ---: | --- |
| Titik at Tunog | 33 | A–Z (one stage per letter), four Filipino word-blending stages, two sight-word stages, and review |
| Pagbibilang | 15 | Numbers 1–10, object counting, ordering, more/fewer, addition, subtraction, and review |
| Hugis at Kulay | 15 | Six shapes, eight colors, color mixing, patterns, review, and a free-painting finale |
| Mabuting Gawi | 10 | Short stories and scenarios about respect, politeness, sharing, hygiene, tidying, classroom/home/community behavior, and review |

There are 73 stages: 72 five-question activities (360 questions) plus a drawing activity. Learning activities currently use picture/text choices; tracing and drag-and-drop are not included.

## Select, listen, confirm

1. Tap an option to select it and play your MP3 of that option.
2. Tap it again to replay, or select another option.
3. Tap **Ito ang sagot ko** to submit. Selecting alone never affects the score.
4. After feedback, tap the next-question button.

After three unsuccessful confirmed attempts, the answer is shown and the learner can move on. Stars use first-try accuracy over all five questions. Replays add only stars above the previous best. The painting finale gives five stars for completing an artwork.

## Your voice recordings

To send scripts to voice actors, use the shorter [reusable audio phrase library](AUDIO_PHRASE_LIBRARY.md), with separate lists for [Likha](docs/voice-scripts/LIKHA_PHRASES.md), [Tala](docs/voice-scripts/TALA_PHRASES.md), [Titik](docs/voice-scripts/TITIK_PHRASES.md), and [Bilang](docs/voice-scripts/BILANG_PHRASES.md). The older [complete character-separated script](VOICE_ACTOR_SCRIPTS.md) remains available as a per-stage reference.

See [the audio folder guide](assets/audio/fil/README.md) and the [reusable phrase library](AUDIO_PHRASE_LIBRARY.md). Add the shared MP3s under assets/audio/fil/shared/<character>/. No generated audio is included and missing recordings never fall back to TTS. Cached recordings work offline after they have been played once.

Original three-stage demo progress migrates to matching concepts in the expanded curriculum. Previously completed stages and stars are preserved.

## Verification

Run `node --test tests/smoke.cjs tests/presentation.cjs` for learning-flow checks plus character assets, scenery, sound lifecycle, mute persistence, and offline asset coverage. These are simulated DOM/audio checks; real-device visual and audible checks remain necessary.

## Characters, scenery, and game sounds

Four replaceable character placeholders appear on home, world cards, maps, lessons, questions, painting, and celebrations. See [assets/characters/README.md](assets/characters/README.md) to replace them with your own transparent PNG/WebP images. All character paths live at the top of js/visuals.js.

The winding paths include world-specific decorative books, trees, islands, ponds, flowers, mushrooms, and cottages. Decoration is non-interactive and stays behind the level controls.

The home screen now has a brighter landscape with drifting clouds and floating details. Worlds use more saturated colors, and level completion fills the screen with falling confetti.

Game effects vary across taps, choices, hints, success, retries, stamps, and completion. Four quiet looping themes play during maps and stages: forest for Titik, beach for Bilang, creative garden for Likha, and village for Tala. They are made with Web Audio and need no music files or network connection. The header sound button mutes both music and game effects and remembers the preference. Recorded lesson and option speech remains available; music lowers while speech plays. Music stops in the background and on non-world screens. Reduced-motion settings disable decorative animation and confetti.

## Android packaging next

The next packaging step is Capacitor: initialize Capacitor, add Android, sync the web assets, then build the Android debug APK from Android Studio or Gradle. This local MVP is intentionally buildless so it can be presented immediately and expanded with more content afterward.
