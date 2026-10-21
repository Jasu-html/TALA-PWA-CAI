# Mga recording ni TALA

Ang app ay gumagamit ng shared MP3 recordings para sa lesson, tanong, hint, sagot, at mga kuwento. May development tool para gumawa ng buong 819-file library; maaari mo ring palitan ang anumang clip ng sariling recording. Tingnan ang [AUDIO_GENERATION.md](../../../../AUDIO_GENERATION.md). Hindi gumagawa ng bagong audio ang app habang naglalaro. Kapag wala pa ang file, magpapakita ito ng maikling notice at hindi ito gagamit ng TTS fallback.

Filipino ang mga pangungusap at salita. English na pangalan ng titik ang ginagamit sa paisa-isang titik at pares nito: A = “ey”, B = “bee”. Hindi ito ang dating phonics experiment na A = “ah”.

## Bagong shared phrase folder

I-save ang files sa:

assets/audio/fil/shared/likha/
assets/audio/fil/shared/tala/
assets/audio/fil/shared/titik/
assets/audio/fil/shared/bilang/

Ang filename ay galing sa phrase mismo. Halimbawa:

assets/audio/fil/shared/likha/bilog.mp3
assets/audio/fil/shared/titik/A.mp3
assets/audio/fil/shared/bilang/5.mp3

Isang file lang ang kailangan kahit gamitin ang phrase sa maraming yugto o tanong. Hindi na kailangan ng option-1.mp3, option-2.mp3, o option-3.mp3 copies.

## Ipadala sa voice actors

Gamitin ang [AUDIO_PHRASE_LIBRARY.md](../../../../AUDIO_PHRASE_LIBRARY.md), na may hiwalay na listahan para kina Likha, Tala, Titik, at Bilang. Ang lumang per-stage SCRIPT.md files at RECORDINGS.md ay iniwan bilang reference lamang.

## Paano tumutugtog ang app

- Ang speaker sa lesson ay gumagamit ng lesson phrase.
- Ang speaker sa tanong ay gumagamit ng tanong na phrase.
- Ang hint ay gumagamit ng hint phrase.
- Ang pagpindot sa sagot ay gumagamit ng mismong sagot na phrase, anuman ang option order.
- Ang parehong phrase ay laging tumuturo sa parehong shared MP3.

Ang character folder ay lowercase. Panatilihin ang eksaktong filename sa phrase list. Pagkatapos magdagdag ng recordings, buksan o i-play ang mga ito kahit isang beses sa bawat device para ma-cache ng offline PWA.
