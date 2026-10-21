# TALA: younger voices and phonics pronunciation

## Search findings

| Option | What is documented | Practical implication |
| --- | --- | --- |
| Edge TTS: Blessica / Angelo | The live service returned these two Filipino voices. There is no age field identifying either as a child or teenager. | Raising pitch is a comparison effect, not evidence of a genuine child/teen voice. Existing profiles remain unchanged. |
| Google Gemini TTS: **Leda** | Google's voice list describes Leda as **Youthful**, and its supported-language list includes **Filipino**. | The strongest documented younger-sounding candidate found in this search. Audition it in Google AI Studio; its description is not a guarantee of a specific age. No Google audio was generated or account configured here. |
| ElevenLabs | Its official Filipino page lists Filipino voice options. Its Voice Library help page says child and child-like voices cannot be added to the Library. | Do not assume a child-like voice will be available there. An adult youthful voice would need to be auditioned under its current service rules. |

Primary sources:

- [Google Gemini speech generation: voices, supported languages, and AI Studio link](https://ai.google.dev/gemini-api/docs/speech-generation)
- [Edge TTS voice/rate/pitch controls and custom SSML limitation](https://github.com/rany2/edge-tts)
- [ElevenLabs Filipino voices](https://elevenlabs.io/text-to-speech/filipino)
- [ElevenLabs Voice Library child-voice policy](https://elevenlabs.io/docs/help-center/product/voices/voice-library/can-childrens-or-child-like-voices-be-added-to-the-voice-library)

For Leda, audition a short script such as:

> Kumusta, kaibigan! Ako si Tala. Tara, matuto at maglaro! Ito ang isa at dalawa. Bilangin ang bawat bituin.

Use a warm, youthful, clear delivery and a natural Filipino accent. Listen to the result before choosing it for a character. Availability and pricing depend on the provider/account; no paid provider was enabled by this change.

## Current choice: English letter names

The latest project direction supersedes the earlier phonics experiment: use **English alphabet names**, including A = “ey” (/eɪ/) and B = “bee” (/biː/).

- Single-letter and letter-pair clips use `en-US-GuyNeural`. A sends `A.`; a pair such as `A f` sends `A, F.` to the English voice. Filenames remain unchanged.
- Full Filipino words/sentences retain their character's Filipino voice. Tala/Likha use Blessica; Titik/Bilang use Angelo.
- `tools/audio-pronunciation.json` now sets the A text/English voice explicitly. The previous `Ah.` and manual-B entries have been removed. B and all other single-letter clips are included in full generation.
- The earlier `Ah.`, literal `b`, and `Buh.` comparisons are historical experiments, not the current production configuration. They remain available to compare how names and sounds differ.

Respelling can help a text-reading voice, especially with vowels. The example `ˈver-ə-tē` is dictionary-style pronunciation respelling, not a portable instruction format understood by all TTS engines. Full IPA also needs engine-specific support and markup. Edge TTS does not accept custom SSML, so `<phoneme>` tags and plain IPA are not reliable controls in this pipeline. Microsoft's [SSML phonetic-alphabet reference](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-ssml-phonetic-sets) describes phoneme control for supported locales; Filipino is not listed in that reference's locale-specific tables.

Do not truncate a guessed syllable and label it as an approved isolated consonant. Human/teacher review is needed for phonics, including isolated letters, letter pairs, and letters spoken within lessons. Other letter recordings remain flagged for review.

## Local listening comparisons

- [Updated number and English letter-name samples](http://localhost:4173/audio-preview/index.html)
- [Eight phonics and pitch comparisons](http://localhost:4173/audio-preview/experiments/index.html)

The experiment page compares Angelo/Blessica on `Ah.`, literal `b`, and `Buh.`. The B examples are explicitly labeled trials rather than approved short /b/ recordings. It also compares Blessica at +25Hz and +40Hz. These are pitch-adjusted adult service voices, not newly discovered child voices.

Previous previews were backed up under `audio-preview/history/` before refresh. The B phonics preview was archived during the earlier experiment; the current B clip uses its English letter name. Existing human/app recordings are preserved by batch generation.

## Repeated number cleanup

The audio catalog now turns `isa (1) at dalawa (2)` into `isa at dalawa` for speech and voice-actor lines. It also handles `isa 1`, parentheses, and brackets for matching number words from sero through sampu. Standalone digits, arithmetic, decimals, mismatched numbers, and unrelated text are preserved.

Filenames still come from the original app phrase. For example, `ito-ang-isa-1-at-dalawa-2-bilangin-ang-bawat-bituin.mp3` remains the correct link, even though its MP3 now says the numbers once. The manifest retains the original under `sourceText` and the cleaned version under `text` / `synthesisText`.
