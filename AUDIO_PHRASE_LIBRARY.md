# TALA — Reusable audio phrase library

Mas maikli na ang recording workflow: isang MP3 lang bawat natatanging linyang maririnig ng bata.

## Mga file na ipapadala sa voice actors

- [Tala intro script](docs/voice-scripts/TALA_INTRO.md) — tatlong recording para sa pambungad na kuwento
- [Hamon ni Tala script](docs/voice-scripts/TALA_QUEST.md) — isang gabay sa lahat ng Quest rounds; inuulit ang dati nang recordings para sa mga tanong, sagot, at pahiwatig
- [Tala at Anino — pambungad at wakas](docs/voice-scripts/TALA_QUEST_STORY.md) — anim na linyang isasalaysay ni Tala para sa huling hamon at pasasalamat

- [Likha phrase list](docs/voice-scripts/LIKHA_PHRASES.md) — hugis, kulay, pattern, at drawing
- [Tala phrase list](docs/voice-scripts/TALA_PHRASES.md) — mabuting gawi
- [Titik phrase list](docs/voice-scripts/TITIK_PHRASES.md) — A–Z, pantig, at sight words
- [Bilang phrase list](docs/voice-scripts/BILANG_PHRASES.md) — bilang at basic math

## Folder naming

I-save ang recordings sa:

assets/audio/fil/shared/<character>/<filename>.mp3

Halimbawa:

assets/audio/fil/shared/likha/bilog.mp3

Kapag ginamit ang bilog sa maraming tanong, yugto, o option order, pareho pa rin ang file na iyon. Hindi na kailangan ng option-1.mp3, option-2.mp3, at option-3.mp3 copies.

## Paano ginagamit ng app

Ang app ay tumitingin sa phrase mismo, gumagawa ng stable filename, at nagpe-play ng shared file. Kaya kahit magpalit ang order ng choices, tama pa rin ang recording.

Ang visual-only shape labels tulad ng ●, ■, ▲, ▬, ★, at ♥ ay awtomatikong binabasa bilang bilog, parisukat, tatsulok, parihaba, bituin, at puso.

Ang mga lumang per-stage SCRIPT.md files ay iniwan bilang reference, pero hindi na iyon ang kailangang sundin para sa bagong recording workflow.

## Tinatayang bawas sa trabaho

Dating kailangan: 1,863 linked recording destinations.

Bagong workflow: 819 unique phrase files sa kasalukuyang curriculum at mga kuwento: Titik 434, Tala 231, Likha 84, at Bilang 70. Pinagsasama ang paulit-ulit na tanong, hint, option, salita, titik, at bilang.

## Opsyonal na AI voice workflow

Tingnan ang [AUDIO_GENERATION.md](AUDIO_GENERATION.md) para sa local Edge TTS samples, generator, voice profiles, pronunciation overrides, at mga limitasyon sa paggamit ng serbisyo. Ang `audio-manifest.json` at apat na phrase list ay nabubuo mula sa mismong curriculum gamit ang `node tools/audio-catalog.cjs --write`, kaya naayos ang dating nawawalang mga letra sa mga linya. Nananatiling hiwalay sa app recordings ang mga preview.
