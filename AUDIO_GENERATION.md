# Optional Filipino AI voice generation

The project now includes an Edge TTS experiment and a reusable batch generator. It runs during development; the phone app still plays ordinary MP3 files and does not need Python or an online synthesis service at runtime.

## Completed library

All **887 catalogued MP3s** have been generated into `assets/audio/fil/shared/`: Titik 437, Bilang 73, Likha 90, and Tala 287. File validation found no missing or invalid MP3s. The library totals approximately **15.87 MiB / 46.2 minutes**. There are 104 English single-letter/letter-pair clips; the other 783 recordings use Filipino voices. This includes 15 reusable tutorial clips. The main twelve-clip preview gallery has also been refreshed to the English letter-name configuration.

Lessons, each new question, and every Tala story page automatically start their recorded narration. General screen introductions (welcome, home, module/Quest maps, menu, completion, and painting instructions) play once per device/browser, with explicit replay and three-minute inactivity reminders. These introductions are remembered when playback starts successfully; interrupted introductions need not repeat. Blocked audio is not marked heard. Navigation labels no longer play on every tap. The “Paano ito laruin?” steps play their character's recording when clicked; “Ulitin” plays the three steps sequentially, waiting for each clip to end. Navigation, choosing an answer, or requesting another recording stops the previous narration. Browsers may block first-visit autoplay until a user gesture: the existing “Pakinggan” button remains available and a Filipino message explains the required tap. All Tala story pages (intro, challenge opening, and ending) advance five seconds after successful narration ends, including the last page. Back, Next, Skip, and pause/resume controls remain available. Replaying or navigating cancels the old timer; hiding the page cancels it too. Missing or blocked narration never starts auto-next; tap Pakinggan to retry. Questions never auto-submit: learners must confirm their choice. Correct answers then advance automatically after success feedback, without a Next button; three misses reveal and narrate the correct answer before advancing. The confirmation label is silent and the button pulses after selection.

## What has been verified

The library also includes Tala's welcome-screen instructions. Spoken learner names use the browser's speech-recognition API in the PWA and Android's native speech service in the APK, not this MP3 generator. They are never synthesized or added to the static phrase library. Voice input starts only after an explicit tap and parent-permission confirmation; the resulting text is saved locally only when the learner continues. Parents can edit the spelling in the menu without changing learning progress.

- The unofficial [edge-tts client](https://github.com/rany2/edge-tts) can generate MP3s without an Azure API key. It contacts Microsoft's online service; it is not an offline model or an official Microsoft SDK.
- The live voice list returned `fil-PH-BlessicaNeural` and `fil-PH-AngeloNeural`. Microsoft also documents these [Filipino voices](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts).
- Azure publishes a [free F0 allowance](https://azure.microsoft.com/en-us/pricing/details/speech/) for experimentation, subject to its quotas. Its [product terms](https://www.microsoft.com/licensing/terms/en-US/productoffering/MicrosoftAzure/EAEAS) explicitly grant prebuilt neural audio output use rights for paid-tier customers. Do not assume an unofficial Edge client or free Azure tier gives equivalent redistribution rights.

The previews are for voice evaluation. Review the applicable service terms before distributing generated recordings with a public/client release. Human recordings remain supported.

## Listen to the samples

The main gallery contains short previews, including English A/B letter names and the corrected number narration. Eight earlier phonics/pitch trials remain in `audio-preview/experiments/` for comparison only. The full library is generated into the app's real `assets/audio/fil/shared/` folders using `--all`. See [VOICE_RESEARCH.md](VOICE_RESEARCH.md) for voice choices and earlier pronunciation experiments.

Run `node tools/serve.cjs`, then open:

<http://localhost:4173/audio-preview/index.html>

Listen to naturalness, speed, number names, and English letter names. The current teaching choice is alphabet names: A = “ey”, B = “bee”, rather than isolated phonics sounds. The `requiresReview` flag still identifies single letters and letter pairs for listening review.

`tools/audio-voices.json` assigns Filipino Blessica to Tala/Likha and Angelo to Titik/Bilang, with small rate/pitch differences. Single-letter and letter-pair clips for Titik use the English voice `en-US-GuyNeural`. Full Filipino words and sentences retain their character profile. For example, `A.mp3` sends `A.` to the English voice to request the English letter name /eɪ/ (“ey”). This is a pronunciation choice, not a switch of the app's Filipino interface language.

## Generate or resume recordings

The local Python environment is `.venv-audio`. The downloaded runtime/tools are in `.tools`. Both are Git-ignored and are not part of the app.

```powershell
# Rebuild exact paths and corrected scripts from the current app curriculum.
node tools/audio-catalog.cjs --write

# List currently available Filipino voices.
.\.venv-audio\Scripts\python.exe tools\generate_audio.py --list-voices

# Create the separate preview gallery; preserve existing files.
.\.venv-audio\Scripts\python.exe tools\generate_audio.py --samples

# Back up and refresh only preview files after a spoken-text correction.
.\.venv-audio\Scripts\python.exe tools\generate_audio.py --samples --refresh-samples

# Compare phonics spellings and pitch adjustments in a separate gallery.
.\.venv-audio\Scripts\python.exe tools\generate_audio.py --experiments

# Generate one character into the app's shared audio folder.
.\.venv-audio\Scripts\python.exe tools\generate_audio.py --all --character Titik

# Generate the entire library after reviewing pronunciation and usage terms.
.\.venv-audio\Scripts\python.exe tools\generate_audio.py --all
```

Generation requires internet access. The catalog currently has **887 unique paths**: Titik 437, Tala 287, Likha 90, and Bilang 73. Repeated lesson/question/option/tutorial uses share one recording per character and filename. No learner names, scores, or saved progress are sent to the service: only the static curriculum phrases being synthesized.

Existing nonempty app MP3s are always preserved, including human recordings. Rerunning resumes missing files; the preview-only `--refresh-samples` option is rejected with `--all`. Preview refresh makes recoverable backups under `audio-preview/history/`. Inspect or move an existing app file manually if you intentionally want to regenerate it. Files are written through `.partial` outputs; retries do not publish half-written MP3s. A JSON report records successes, failures, and clips requiring human recordings. The generation tool does not automatically add recordings to the PWA's initial offline cache.

`--limit 5` limits a run. `--jobs 3` permits three concurrent requests (allowed range 1-4); reports are saved after every processed clip. `--voice fil-PH-BlessicaNeural`, `--rate=-10%`, and `--pitch=+0Hz` override the selected character profile, including the automatic English letter voice.

## Pronunciation corrections without renaming files

Add overrides in `tools/audio-pronunciation.json`, keyed by the complete app path:

```json
{
  "assets/audio/fil/shared/likha/pula.mp3": "Pula."
}
```

This changes the text sent for synthesis but keeps the filename expected by the app. An object can override both text and voice:

```json
{
  "assets/audio/fil/shared/titik/A.mp3": {
    "text": "A.",
    "voice": "en-US-GuyNeural"
  }
}
```

The previous `Ah.` and manual-B settings were removed after the teaching choice changed to English letter names. The generator still supports `null` for any future clip that should require a human recording, but the current full-library configuration has no manual/blank placeholders.

The catalog removes redundant digit annotations after matching Filipino number words, so `isa (1) at dalawa (2)` becomes `isa at dalawa` in spoken scripts. Standalone numbers and arithmetic remain. The original script is kept as `sourceText`; `text` and `synthesisText` contain the cleaned spoken version. Filenames still use the original phrase and therefore remain compatible with the app. The preview audio URLs include a content hash to avoid replaying stale cached clips after refresh.

## Set up on another computer

Install Python 3.10 or newer, then run:

```powershell
python -m venv .venv-audio
.\.venv-audio\Scripts\python.exe -m pip install -r tools\requirements-audio.txt
node tools/audio-catalog.cjs --write
```

The current `edge-tts` version is pinned in `tools/requirements-audio.txt`. Unofficial service access can change or stop working; service availability today is not a promise of ongoing free access.

## Verification

```powershell
node --test tests/smoke.cjs tests/presentation.cjs tests/offline.cjs tests/audio-catalog.cjs
.\.venv-audio\Scripts\python.exe -m unittest discover -s tests -p test_audio_generator.py
node tools/verify-audio.cjs
```

The phrase files were mechanically rebuilt from `js/data.js`, `js/quest.js`, and the runtime filename resolver to repair the old missing-letter formatting bug. They should be regenerated whenever curriculum phrases change.

`verify-audio.cjs` checks every expected file for actual MPEG Layer III frames, reports missing/invalid files, and totals duration and size. Structural validity does not certify pronunciation; clips can still be replaced after listening.
