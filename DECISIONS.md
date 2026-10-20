# Decisions

## PWA curriculum and answer audio — 2026-10-21

- The user requested complete A–Z stages and expansion of each currently implemented module. The PWA has four worlds: 33 language stages, 15 number stages, 15 arts stages, and 10 values stages.
- Each quiz stage has five questions. The arts finale is free drawing. Early language stages teach one letter at a time; later language content uses Filipino words.
- Selecting an answer plays the author's option recording and highlights the choice. Only the separate “Ito ang sagot ko” button submits it. Learners may replay or change selection before submission without penalty.
- Audio paths are stable by module/stage/question/option position. Each question has its own recording script. No lesson, question, hint, or answer-option audio is generated or synthesized.
- General encouragement may use an installed Filipino/Tagalog TTS voice. There is no English voice fallback.
- Correct feedback advances only after a next-question tap. After three misses the answer is shown; the question is recorded as not first-try correct.
- Old three-stage demo progress is migrated by concept, including the old M stage to phonics stage 13. No learner progress or recorded MP3s are deleted.

## Phase 0-4 Design Decisions

### Default Language: Filipino
- **Decision:** All UI text, narration, and content should default to Filipino (Tagalog) on first launch.
- **Rationale:** Target audience is Filipino Grade 1 learners; many cannot read well. Voice narration is primary, requiring Filipino audio.
- **Implementation:**
  - `settings.json` defaults `narrationLanguage = "fil"`
  - `strings_en.json` and `strings_fil.json` both required
  - Language toggle enabled in settings (Phase 15)
- **Impact:**
  - Requires bilingual strings for all screens
  - Default TTS locale: `fil-PH` with `en-US` fallback
  - Teacher setup shows Filipino prompts initially
- **Date:** 2026-10-19

### Voice Name Entry
- **Decision:** Student names should be entered via voice recording, not text input.
- **Rationale:** Target audience (6-7 year olds) cannot yet read or type their names reliably; voice recognition is intuitive and inclusive.
- **Implementation:**
  - Add `speechRecognizer` permission to AndroidManifest.xml
  - Create `VoiceNameRecorder` composable with microphone button
  - Display recognized text in large, labeled box
  - Provide "Retake" button to retry recording
  - Alternative: tap-to-pick from a list of common Filipino names
- **Fallback:** Manual typing option for cases where speech recognition fails (rare in practice with MediaPipe/Marvin TTS context)
- **Date:** 2026-10-19

### Avatar Selection in Login
- **Decision:** Add 8 predefined avatar icons that students can tap to select.
- **Rationale:** Kids identify with visual characters; provides instant avatar to personalize experience.
- **Implementation:**
  - Use vector avatars in `drawables`
  - Display in a 4x2 grid in login screen
  - Tapping selects avatar and fills outlines on character
  - "Make my own!" option separately in Phase 13
  - Disable tapping until voice name is captured
- **Date:** 2026-10-19

### Bilingual Content Strategy
- **Decision:** All JSON content (phonics, numbers, stories, etc.) will contain both `text_en` and `text_fil` fields.
- **Rationale:** Voice narration is primary; having all content in Filipino by default ensures no switches are needed for common use.
- **Implementation:**
  - Update `strings_en.json` and `strings_fil.json` to contain all app strings in both languages (when applicable)
  - Content loader reads current language from DataStore before selecting `text_xxx` fields
  - Error handling if missing string (developer error)
- **Date:** 2026-10-19
