# TALA — Kumpletong Script para sa mga Voice Actor

Petsa: 21 Oktubre 2026  
Wika: Filipino/Tagalog  
Audience: Grade 1 learners  
Batayan: kasalukuyang js/data.js at per-question recording scripts.

## Mga bahagi

- [Likha — Hugis at Kulay](#likha--hugis-at-kulay)
- [Tala — Mabuting Gawi](#tala--mabuting-gawi)
- [Titik — Titik at Tunog](#titik--titik-at-tunog)
- [Bilang — Pagbibilang](#bilang--pagbibilang)

| Karakter | Mundo | Mga yugto | Naka-link na MP3 slots | Opsyonal na UI lines |
| --- | --- | ---: | ---: | ---: |
| Likha | Hugis at Kulay | 15 | 365 | 5 |
| Tala | Mabuting Gawi | 10 | 260 | 5 |
| Titik | Titik at Tunog | 33 | 858 | 4 |
| Bilang | Pagbibilang | 15 | 380 | 4 |
| **Kabuuan** | | **73** | **1863** | **18** |

Ang 1863 ay bilang ng mga kailangang **destination file**, hindi bilang ng natatanging pangungusap. Maaaring i-reuse ang magkaparehong recording sa maraming path, ngunit huwag ihalo ang boses ng magkaibang karakter. May ilang tanong sa Pagbibilang na dalawa lamang ang pagpipilian; huwag gumawa ng option-3.mp3 kung wala ito sa talahanayan.

Kung hiwa-hiwalay ang ipapadala, may sariling file ang bawat aktor sa docs/voice-scripts/LIKHA.md, TALA.md, TITIK.md, at BILANG.md. Bawat individual file ay may kumpletong gabay at sariling bahagi lamang.

## Gabay sa recording

- **Basahin lamang ang nasa kolum na “Linyang bibigkasin”.** Huwag basahin ang filename, heading, numero ng tanong, emoji, o mga tagubilin.
- Filipino/Tagalog ang mga pangungusap. Malinaw, magaan, at palakaibigan ang boses para sa mga batang Grade 1. Huwag sumigaw, manakot, o manghiya.
- Gumamit ng natural na bilis at maikling pagitan sa bawat pangungusap. Maglaan ng kaunting katahimikan bago at pagkatapos ng linya.
- Isang linya o talata bawat MP3, ayon sa filename. Maaaring iisang take ang gamitin sa **magkaparehong linya ng parehong karakter**, saka kopyahin sa lahat ng nakatalagang filename.
- Huwag isama ang musika, click, chime, o ibang sound effect. Hiwalay na ginagawa ng app ang mga iyon.
- Mag-record sa tahimik na lugar, pare-pareho ang lakas at layo ng mikropono, at walang reverb o clipping. MP3 ang final delivery; panatilihin ang orihinal na WAV kung mayroon.
- Basahin ang mga numerong sagot bilang salitang Filipino: halimbawa, “3” ay **“Tatlo”**. Ang nakasulat na mga numero sa lesson ay babasahin din bilang bilang, hindi digit-by-digit kung hindi iyon ang itinuturo.
- Sa Titik, basahin ang pangalan ng titik ayon sa aralin at bigyan ng maikling pagitan ang mga pantig. Huwag magdagdag ng hiwalay na phonics sound kung wala ito sa script.
- Panatilihin ang mga salitang hiniram na nasa script, gaya ng carrot, folder, jeep, quilt, vase, x-ray, at zebra. Huwag palitan ang salitang sagot: kailangang tumugma sa nakikita ng bata.
- Ang **question.mp3** ay tanong; **hint.mp3** ay pahiwatig; **option-1/2/3.mp3** ay pangalan lamang ng mismong sagot, kahit hindi ito ang tamang sagot. Huwag magbigay ng clue sa tono kung alin ang tama.

## Filename at paghahatid

Lahat ng path sa mga talahanayan ay relative sa ugat ng project. Panatilihin ang eksaktong folder, numero, at lowercase na filename.

Halimbawa: assets/audio/fil/phonics/1/questions/1/option-1.mp3

Huwag ilagay sa filename ang take number o pangalan ng aktor sa final delivery. Maaari mong ilagay ang working takes sa hiwalay na folder. Ipadala ang final MP3 files sa kaparehong folder structure, mas mainam bilang ZIP.

**Paano ginagamit sa app:** Pipindutin ng bata ang pagpipilian upang pakinggan ang option MP3. Hindi pa ito pagsusumite ng sagot. Pipindutin pa niya ang “Ito ang sagot ko” upang kumpirmahin.

**Saklaw:** Ito ang lahat ng kasalukuyang recording slot sa apat na implemented na mundo. Walang script para sa hindi pa implemented na Quest Quiz. Walang audio na ginawa o na-generate para sa packet na ito.

---

## LIKHA — Hugis at Kulay

**Direksiyon ng boses:** Masigla, malikhain, at malambing. Parang kaibigang nag-aanyayang gumuhit at magkulay.

**Mundo:** Hardin ng mga Kulay. **Mga yugto:** 15.

### Opsyonal na pang-interface na linya

**Hiwalay ito sa mga naka-link na lesson recording.** Ang mga path sa ibaba ay mungkahing delivery filenames; hindi pa sila pinapatugtog ng kasalukuyang app. Puwedeng ihuli ang mga ito. Ang paglagay ng MP3 sa mga path na ito ay hindi pa awtomatikong papalit sa TTS.

| Mungkahing filename | Linyang bibigkasin | Gamit / katayuan |
| --- | --- | --- |
| assets/audio/fil/shared/likha/correct.mp3 | Mahusay! Ang galing mo! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/likha/retry.mp3 | Kaya mo iyan. Subukan muli! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/likha/map-welcome.mp3 | Tara, tuklasin natin! Isang yugto, isang bagong galing. | Nasa speech bubble; text lamang sa kasalukuyan. |
| assets/audio/fil/shared/likha/encourage.mp3 | Kaya mo iyan! Sasamahan kita. | Nasa mapa; text lamang sa kasalukuyan. |
| assets/audio/fil/shared/likha/painting.mp3 | Gamitin ang iyong imahinasyon. Bawat guhit ay espesyal! | Nasa painting speech bubble; text lamang sa kasalukuyan. |

### Mga aralin at pagsasanay — naka-link na recording slots

Ang mga sumusunod na filename ay kasalukuyang hinihingi ng app kapag pinindot ang speaker, hint, o answer option.

#### Yugto 1: Hugis bilog

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/1/lesson.mp3 | Walang sulok ang bilog. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/1/questions/1/question.mp3 | Alin ang bilog? |
| assets/audio/fil/arts/1/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/1/questions/1/option-1.mp3 | ● bilog |
| assets/audio/fil/arts/1/questions/1/option-2.mp3 | ■ parisukat |
| assets/audio/fil/arts/1/questions/1/option-3.mp3 | ▬ parihaba |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/1/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/1/questions/2/hint.mp3 | Walang sulok ang bilog. |
| assets/audio/fil/arts/1/questions/2/option-1.mp3 | parisukat |
| assets/audio/fil/arts/1/questions/2/option-2.mp3 | parihaba |
| assets/audio/fil/arts/1/questions/2/option-3.mp3 | bilog |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/1/questions/3/question.mp3 | Alin ang kaparehong hugis? |
| assets/audio/fil/arts/1/questions/3/hint.mp3 | Pagtapatin sa isip ang mga gilid at sulok. |
| assets/audio/fil/arts/1/questions/3/option-1.mp3 | Parihaba |
| assets/audio/fil/arts/1/questions/3/option-2.mp3 | Bilog |
| assets/audio/fil/arts/1/questions/3/option-3.mp3 | Parisukat |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/1/questions/4/question.mp3 | Alin ang hugis na natutuhan natin? |
| assets/audio/fil/arts/1/questions/4/hint.mp3 | Walang sulok ang bilog. |
| assets/audio/fil/arts/1/questions/4/option-1.mp3 | ● bilog |
| assets/audio/fil/arts/1/questions/4/option-2.mp3 | ■ parisukat |
| assets/audio/fil/arts/1/questions/4/option-3.mp3 | ▬ parihaba |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/1/questions/5/question.mp3 | Piliin muli ang bilog. |
| assets/audio/fil/arts/1/questions/5/hint.mp3 | Walang sulok ang bilog. |
| assets/audio/fil/arts/1/questions/5/option-1.mp3 | ● bilog |
| assets/audio/fil/arts/1/questions/5/option-2.mp3 | ■ parisukat |
| assets/audio/fil/arts/1/questions/5/option-3.mp3 | ▬ parihaba |

#### Yugto 2: Hugis parisukat

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/2/lesson.mp3 | May apat na magkakapantay na gilid ang parisukat. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/2/questions/1/question.mp3 | Alin ang parisukat? |
| assets/audio/fil/arts/2/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/2/questions/1/option-1.mp3 | ■ parisukat |
| assets/audio/fil/arts/2/questions/1/option-2.mp3 | ▲ tatsulok |
| assets/audio/fil/arts/2/questions/1/option-3.mp3 | bituin |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/2/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/2/questions/2/hint.mp3 | May apat na magkakapantay na gilid ang parisukat. |
| assets/audio/fil/arts/2/questions/2/option-1.mp3 | tatsulok |
| assets/audio/fil/arts/2/questions/2/option-2.mp3 | bituin |
| assets/audio/fil/arts/2/questions/2/option-3.mp3 | parisukat |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/2/questions/3/question.mp3 | Alin ang kaparehong hugis? |
| assets/audio/fil/arts/2/questions/3/hint.mp3 | Pagtapatin sa isip ang mga gilid at sulok. |
| assets/audio/fil/arts/2/questions/3/option-1.mp3 | Bituin |
| assets/audio/fil/arts/2/questions/3/option-2.mp3 | Parisukat |
| assets/audio/fil/arts/2/questions/3/option-3.mp3 | Tatsulok |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/2/questions/4/question.mp3 | Alin ang hugis na natutuhan natin? |
| assets/audio/fil/arts/2/questions/4/hint.mp3 | May apat na magkakapantay na gilid ang parisukat. |
| assets/audio/fil/arts/2/questions/4/option-1.mp3 | ■ parisukat |
| assets/audio/fil/arts/2/questions/4/option-2.mp3 | ▲ tatsulok |
| assets/audio/fil/arts/2/questions/4/option-3.mp3 | bituin |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/2/questions/5/question.mp3 | Piliin muli ang parisukat. |
| assets/audio/fil/arts/2/questions/5/hint.mp3 | May apat na magkakapantay na gilid ang parisukat. |
| assets/audio/fil/arts/2/questions/5/option-1.mp3 | ■ parisukat |
| assets/audio/fil/arts/2/questions/5/option-2.mp3 | ▲ tatsulok |
| assets/audio/fil/arts/2/questions/5/option-3.mp3 | bituin |

#### Yugto 3: Hugis tatsulok

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/3/lesson.mp3 | May tatlong gilid at tatlong sulok ang tatsulok. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/3/questions/1/question.mp3 | Alin ang tatsulok? |
| assets/audio/fil/arts/3/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/3/questions/1/option-1.mp3 | ▲ tatsulok |
| assets/audio/fil/arts/3/questions/1/option-2.mp3 | ▬ parihaba |
| assets/audio/fil/arts/3/questions/1/option-3.mp3 | puso |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/3/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/3/questions/2/hint.mp3 | May tatlong gilid at tatlong sulok ang tatsulok. |
| assets/audio/fil/arts/3/questions/2/option-1.mp3 | parihaba |
| assets/audio/fil/arts/3/questions/2/option-2.mp3 | puso |
| assets/audio/fil/arts/3/questions/2/option-3.mp3 | tatsulok |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/3/questions/3/question.mp3 | Alin ang kaparehong hugis? |
| assets/audio/fil/arts/3/questions/3/hint.mp3 | Pagtapatin sa isip ang mga gilid at sulok. |
| assets/audio/fil/arts/3/questions/3/option-1.mp3 | Puso |
| assets/audio/fil/arts/3/questions/3/option-2.mp3 | Tatsulok |
| assets/audio/fil/arts/3/questions/3/option-3.mp3 | Parihaba |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/3/questions/4/question.mp3 | Alin ang hugis na natutuhan natin? |
| assets/audio/fil/arts/3/questions/4/hint.mp3 | May tatlong gilid at tatlong sulok ang tatsulok. |
| assets/audio/fil/arts/3/questions/4/option-1.mp3 | ▲ tatsulok |
| assets/audio/fil/arts/3/questions/4/option-2.mp3 | ▬ parihaba |
| assets/audio/fil/arts/3/questions/4/option-3.mp3 | puso |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/3/questions/5/question.mp3 | Piliin muli ang tatsulok. |
| assets/audio/fil/arts/3/questions/5/hint.mp3 | May tatlong gilid at tatlong sulok ang tatsulok. |
| assets/audio/fil/arts/3/questions/5/option-1.mp3 | ▲ tatsulok |
| assets/audio/fil/arts/3/questions/5/option-2.mp3 | ▬ parihaba |
| assets/audio/fil/arts/3/questions/5/option-3.mp3 | puso |

#### Yugto 4: Hugis parihaba

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/4/lesson.mp3 | May apat na sulok ang parihaba. Magkasinghaba ang magkaharap na gilid nito. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/4/questions/1/question.mp3 | Alin ang parihaba? |
| assets/audio/fil/arts/4/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/4/questions/1/option-1.mp3 | ▬ parihaba |
| assets/audio/fil/arts/4/questions/1/option-2.mp3 | bituin |
| assets/audio/fil/arts/4/questions/1/option-3.mp3 | ● bilog |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/4/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/4/questions/2/hint.mp3 | May apat na sulok ang parihaba. Magkasinghaba ang magkaharap na gilid nito. |
| assets/audio/fil/arts/4/questions/2/option-1.mp3 | bituin |
| assets/audio/fil/arts/4/questions/2/option-2.mp3 | bilog |
| assets/audio/fil/arts/4/questions/2/option-3.mp3 | parihaba |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/4/questions/3/question.mp3 | Alin ang kaparehong hugis? |
| assets/audio/fil/arts/4/questions/3/hint.mp3 | Pagtapatin sa isip ang mga gilid at sulok. |
| assets/audio/fil/arts/4/questions/3/option-1.mp3 | Bilog |
| assets/audio/fil/arts/4/questions/3/option-2.mp3 | Parihaba |
| assets/audio/fil/arts/4/questions/3/option-3.mp3 | Bituin |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/4/questions/4/question.mp3 | Alin ang hugis na natutuhan natin? |
| assets/audio/fil/arts/4/questions/4/hint.mp3 | May apat na sulok ang parihaba. Magkasinghaba ang magkaharap na gilid nito. |
| assets/audio/fil/arts/4/questions/4/option-1.mp3 | ▬ parihaba |
| assets/audio/fil/arts/4/questions/4/option-2.mp3 | bituin |
| assets/audio/fil/arts/4/questions/4/option-3.mp3 | ● bilog |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/4/questions/5/question.mp3 | Piliin muli ang parihaba. |
| assets/audio/fil/arts/4/questions/5/hint.mp3 | May apat na sulok ang parihaba. Magkasinghaba ang magkaharap na gilid nito. |
| assets/audio/fil/arts/4/questions/5/option-1.mp3 | ▬ parihaba |
| assets/audio/fil/arts/4/questions/5/option-2.mp3 | bituin |
| assets/audio/fil/arts/4/questions/5/option-3.mp3 | ● bilog |

#### Yugto 5: Hugis bituin

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/5/lesson.mp3 | May matutulis na dulo ang hugis bituin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/5/questions/1/question.mp3 | Alin ang bituin? |
| assets/audio/fil/arts/5/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/5/questions/1/option-1.mp3 | bituin |
| assets/audio/fil/arts/5/questions/1/option-2.mp3 | puso |
| assets/audio/fil/arts/5/questions/1/option-3.mp3 | ■ parisukat |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/5/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/5/questions/2/hint.mp3 | May matutulis na dulo ang hugis bituin. |
| assets/audio/fil/arts/5/questions/2/option-1.mp3 | puso |
| assets/audio/fil/arts/5/questions/2/option-2.mp3 | parisukat |
| assets/audio/fil/arts/5/questions/2/option-3.mp3 | bituin |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/5/questions/3/question.mp3 | Alin ang kaparehong hugis? |
| assets/audio/fil/arts/5/questions/3/hint.mp3 | Pagtapatin sa isip ang mga gilid at sulok. |
| assets/audio/fil/arts/5/questions/3/option-1.mp3 | Parisukat |
| assets/audio/fil/arts/5/questions/3/option-2.mp3 | Bituin |
| assets/audio/fil/arts/5/questions/3/option-3.mp3 | Puso |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/5/questions/4/question.mp3 | Alin ang hugis na natutuhan natin? |
| assets/audio/fil/arts/5/questions/4/hint.mp3 | May matutulis na dulo ang hugis bituin. |
| assets/audio/fil/arts/5/questions/4/option-1.mp3 | bituin |
| assets/audio/fil/arts/5/questions/4/option-2.mp3 | puso |
| assets/audio/fil/arts/5/questions/4/option-3.mp3 | ■ parisukat |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/5/questions/5/question.mp3 | Piliin muli ang bituin. |
| assets/audio/fil/arts/5/questions/5/hint.mp3 | May matutulis na dulo ang hugis bituin. |
| assets/audio/fil/arts/5/questions/5/option-1.mp3 | bituin |
| assets/audio/fil/arts/5/questions/5/option-2.mp3 | puso |
| assets/audio/fil/arts/5/questions/5/option-3.mp3 | ■ parisukat |

#### Yugto 6: Hugis puso

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/6/lesson.mp3 | Ang hugis puso ay may dalawang umbok sa itaas at tulis sa ibaba. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/6/questions/1/question.mp3 | Alin ang puso? |
| assets/audio/fil/arts/6/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/6/questions/1/option-1.mp3 | puso |
| assets/audio/fil/arts/6/questions/1/option-2.mp3 | ● bilog |
| assets/audio/fil/arts/6/questions/1/option-3.mp3 | ▲ tatsulok |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/6/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/6/questions/2/hint.mp3 | Ang hugis puso ay may dalawang umbok sa itaas at tulis sa ibaba. |
| assets/audio/fil/arts/6/questions/2/option-1.mp3 | bilog |
| assets/audio/fil/arts/6/questions/2/option-2.mp3 | tatsulok |
| assets/audio/fil/arts/6/questions/2/option-3.mp3 | puso |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/6/questions/3/question.mp3 | Alin ang kaparehong hugis? |
| assets/audio/fil/arts/6/questions/3/hint.mp3 | Pagtapatin sa isip ang mga gilid at sulok. |
| assets/audio/fil/arts/6/questions/3/option-1.mp3 | Tatsulok |
| assets/audio/fil/arts/6/questions/3/option-2.mp3 | Puso |
| assets/audio/fil/arts/6/questions/3/option-3.mp3 | Bilog |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/6/questions/4/question.mp3 | Alin ang hugis na natutuhan natin? |
| assets/audio/fil/arts/6/questions/4/hint.mp3 | Ang hugis puso ay may dalawang umbok sa itaas at tulis sa ibaba. |
| assets/audio/fil/arts/6/questions/4/option-1.mp3 | puso |
| assets/audio/fil/arts/6/questions/4/option-2.mp3 | ● bilog |
| assets/audio/fil/arts/6/questions/4/option-3.mp3 | ▲ tatsulok |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/6/questions/5/question.mp3 | Piliin muli ang puso. |
| assets/audio/fil/arts/6/questions/5/hint.mp3 | Ang hugis puso ay may dalawang umbok sa itaas at tulis sa ibaba. |
| assets/audio/fil/arts/6/questions/5/option-1.mp3 | puso |
| assets/audio/fil/arts/6/questions/5/option-2.mp3 | ● bilog |
| assets/audio/fil/arts/6/questions/5/option-3.mp3 | ▲ tatsulok |

#### Yugto 7: Kulay pula at asul

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/7/lesson.mp3 | Kilalanin ang pula at asul. Tingnan at ihambing ang dalawang kulay. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/7/questions/1/question.mp3 | Alin ang kulay pula? |
| assets/audio/fil/arts/7/questions/1/hint.mp3 | Tingnan ang bilog na pula. |
| assets/audio/fil/arts/7/questions/1/option-1.mp3 | pula |
| assets/audio/fil/arts/7/questions/1/option-2.mp3 | asul |
| assets/audio/fil/arts/7/questions/1/option-3.mp3 | dilaw |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/7/questions/2/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/7/questions/2/hint.mp3 | Tingnan ang bilog na asul. |
| assets/audio/fil/arts/7/questions/2/option-1.mp3 | asul |
| assets/audio/fil/arts/7/questions/2/option-2.mp3 | dilaw |
| assets/audio/fil/arts/7/questions/2/option-3.mp3 | pula |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/7/questions/3/question.mp3 | Alin ang kulay pula? |
| assets/audio/fil/arts/7/questions/3/hint.mp3 | Tingnan ang bilog na pula. |
| assets/audio/fil/arts/7/questions/3/option-1.mp3 | dilaw |
| assets/audio/fil/arts/7/questions/3/option-2.mp3 | pula |
| assets/audio/fil/arts/7/questions/3/option-3.mp3 | asul |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/7/questions/4/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/7/questions/4/hint.mp3 | Tingnan ang bilog na asul. |
| assets/audio/fil/arts/7/questions/4/option-1.mp3 | pula |
| assets/audio/fil/arts/7/questions/4/option-2.mp3 | asul |
| assets/audio/fil/arts/7/questions/4/option-3.mp3 | dilaw |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/7/questions/5/question.mp3 | Alin ang kulay pula? |
| assets/audio/fil/arts/7/questions/5/hint.mp3 | Tingnan ang bilog na pula. |
| assets/audio/fil/arts/7/questions/5/option-1.mp3 | asul |
| assets/audio/fil/arts/7/questions/5/option-2.mp3 | dilaw |
| assets/audio/fil/arts/7/questions/5/option-3.mp3 | pula |

#### Yugto 8: Kulay dilaw at berde

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/8/lesson.mp3 | Kilalanin ang dilaw at berde. Tingnan at ihambing ang dalawang kulay. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/8/questions/1/question.mp3 | Alin ang kulay dilaw? |
| assets/audio/fil/arts/8/questions/1/hint.mp3 | Tingnan ang bilog na dilaw. |
| assets/audio/fil/arts/8/questions/1/option-1.mp3 | dilaw |
| assets/audio/fil/arts/8/questions/1/option-2.mp3 | berde |
| assets/audio/fil/arts/8/questions/1/option-3.mp3 | kahel |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/8/questions/2/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/8/questions/2/hint.mp3 | Tingnan ang bilog na berde. |
| assets/audio/fil/arts/8/questions/2/option-1.mp3 | berde |
| assets/audio/fil/arts/8/questions/2/option-2.mp3 | kahel |
| assets/audio/fil/arts/8/questions/2/option-3.mp3 | dilaw |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/8/questions/3/question.mp3 | Alin ang kulay dilaw? |
| assets/audio/fil/arts/8/questions/3/hint.mp3 | Tingnan ang bilog na dilaw. |
| assets/audio/fil/arts/8/questions/3/option-1.mp3 | kahel |
| assets/audio/fil/arts/8/questions/3/option-2.mp3 | dilaw |
| assets/audio/fil/arts/8/questions/3/option-3.mp3 | berde |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/8/questions/4/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/8/questions/4/hint.mp3 | Tingnan ang bilog na berde. |
| assets/audio/fil/arts/8/questions/4/option-1.mp3 | dilaw |
| assets/audio/fil/arts/8/questions/4/option-2.mp3 | berde |
| assets/audio/fil/arts/8/questions/4/option-3.mp3 | kahel |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/8/questions/5/question.mp3 | Alin ang kulay dilaw? |
| assets/audio/fil/arts/8/questions/5/hint.mp3 | Tingnan ang bilog na dilaw. |
| assets/audio/fil/arts/8/questions/5/option-1.mp3 | berde |
| assets/audio/fil/arts/8/questions/5/option-2.mp3 | kahel |
| assets/audio/fil/arts/8/questions/5/option-3.mp3 | dilaw |

#### Yugto 9: Kulay kahel at lila

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/9/lesson.mp3 | Kilalanin ang kahel at lila. Tingnan at ihambing ang dalawang kulay. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/9/questions/1/question.mp3 | Alin ang kulay kahel? |
| assets/audio/fil/arts/9/questions/1/hint.mp3 | Tingnan ang bilog na kahel. |
| assets/audio/fil/arts/9/questions/1/option-1.mp3 | kahel |
| assets/audio/fil/arts/9/questions/1/option-2.mp3 | lila |
| assets/audio/fil/arts/9/questions/1/option-3.mp3 | rosas |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/9/questions/2/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/9/questions/2/hint.mp3 | Tingnan ang bilog na lila. |
| assets/audio/fil/arts/9/questions/2/option-1.mp3 | lila |
| assets/audio/fil/arts/9/questions/2/option-2.mp3 | rosas |
| assets/audio/fil/arts/9/questions/2/option-3.mp3 | kahel |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/9/questions/3/question.mp3 | Alin ang kulay kahel? |
| assets/audio/fil/arts/9/questions/3/hint.mp3 | Tingnan ang bilog na kahel. |
| assets/audio/fil/arts/9/questions/3/option-1.mp3 | rosas |
| assets/audio/fil/arts/9/questions/3/option-2.mp3 | kahel |
| assets/audio/fil/arts/9/questions/3/option-3.mp3 | lila |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/9/questions/4/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/9/questions/4/hint.mp3 | Tingnan ang bilog na lila. |
| assets/audio/fil/arts/9/questions/4/option-1.mp3 | kahel |
| assets/audio/fil/arts/9/questions/4/option-2.mp3 | lila |
| assets/audio/fil/arts/9/questions/4/option-3.mp3 | rosas |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/9/questions/5/question.mp3 | Alin ang kulay kahel? |
| assets/audio/fil/arts/9/questions/5/hint.mp3 | Tingnan ang bilog na kahel. |
| assets/audio/fil/arts/9/questions/5/option-1.mp3 | lila |
| assets/audio/fil/arts/9/questions/5/option-2.mp3 | rosas |
| assets/audio/fil/arts/9/questions/5/option-3.mp3 | kahel |

#### Yugto 10: Kulay rosas at kayumanggi

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/10/lesson.mp3 | Kilalanin ang rosas at kayumanggi. Tingnan at ihambing ang dalawang kulay. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/10/questions/1/question.mp3 | Alin ang kulay rosas? |
| assets/audio/fil/arts/10/questions/1/hint.mp3 | Tingnan ang bilog na rosas. |
| assets/audio/fil/arts/10/questions/1/option-1.mp3 | rosas |
| assets/audio/fil/arts/10/questions/1/option-2.mp3 | kayumanggi |
| assets/audio/fil/arts/10/questions/1/option-3.mp3 | pula |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/10/questions/2/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/10/questions/2/hint.mp3 | Tingnan ang bilog na kayumanggi. |
| assets/audio/fil/arts/10/questions/2/option-1.mp3 | kayumanggi |
| assets/audio/fil/arts/10/questions/2/option-2.mp3 | pula |
| assets/audio/fil/arts/10/questions/2/option-3.mp3 | rosas |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/10/questions/3/question.mp3 | Alin ang kulay rosas? |
| assets/audio/fil/arts/10/questions/3/hint.mp3 | Tingnan ang bilog na rosas. |
| assets/audio/fil/arts/10/questions/3/option-1.mp3 | pula |
| assets/audio/fil/arts/10/questions/3/option-2.mp3 | rosas |
| assets/audio/fil/arts/10/questions/3/option-3.mp3 | kayumanggi |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/10/questions/4/question.mp3 | Ano ang pangalan ng kulay? |
| assets/audio/fil/arts/10/questions/4/hint.mp3 | Tingnan ang bilog na kayumanggi. |
| assets/audio/fil/arts/10/questions/4/option-1.mp3 | rosas |
| assets/audio/fil/arts/10/questions/4/option-2.mp3 | kayumanggi |
| assets/audio/fil/arts/10/questions/4/option-3.mp3 | pula |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/10/questions/5/question.mp3 | Alin ang kulay rosas? |
| assets/audio/fil/arts/10/questions/5/hint.mp3 | Tingnan ang bilog na rosas. |
| assets/audio/fil/arts/10/questions/5/option-1.mp3 | kayumanggi |
| assets/audio/fil/arts/10/questions/5/option-2.mp3 | pula |
| assets/audio/fil/arts/10/questions/5/option-3.mp3 | rosas |

#### Yugto 11: Paghaluin: berde

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/11/lesson.mp3 | Asul at dilaw ay berde. Subukang alalahanin ang dalawang kulay. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/11/questions/1/question.mp3 | Ano ang mabubuong kulay? |
| assets/audio/fil/arts/11/questions/1/hint.mp3 | Asul at dilaw ay berde. |
| assets/audio/fil/arts/11/questions/1/option-1.mp3 | Berde |
| assets/audio/fil/arts/11/questions/1/option-2.mp3 | Kahel |
| assets/audio/fil/arts/11/questions/1/option-3.mp3 | Lila |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/11/questions/2/question.mp3 | Ano ang ihahalo sa asul para maging berde? |
| assets/audio/fil/arts/11/questions/2/hint.mp3 | Asul at dilaw ay berde. |
| assets/audio/fil/arts/11/questions/2/option-1.mp3 | Pula |
| assets/audio/fil/arts/11/questions/2/option-2.mp3 | Lila |
| assets/audio/fil/arts/11/questions/2/option-3.mp3 | Dilaw |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/11/questions/3/question.mp3 | Ano ang ihahalo sa dilaw para maging berde? |
| assets/audio/fil/arts/11/questions/3/hint.mp3 | Dilaw at asul ay berde. |
| assets/audio/fil/arts/11/questions/3/option-1.mp3 | Kahel |
| assets/audio/fil/arts/11/questions/3/option-2.mp3 | Asul |
| assets/audio/fil/arts/11/questions/3/option-3.mp3 | Pula |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/11/questions/4/question.mp3 | Alin ang berde? |
| assets/audio/fil/arts/11/questions/4/hint.mp3 | Ito ang kulay ng maraming dahon. |
| assets/audio/fil/arts/11/questions/4/option-1.mp3 | Berde |
| assets/audio/fil/arts/11/questions/4/option-2.mp3 | Asul |
| assets/audio/fil/arts/11/questions/4/option-3.mp3 | Dilaw |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/11/questions/5/question.mp3 | Aling dalawang kulay ang bubuo ng berde? |
| assets/audio/fil/arts/11/questions/5/hint.mp3 | Balikan ang dalawang kulay sa aralin. |
| assets/audio/fil/arts/11/questions/5/option-1.mp3 | Pula at asul |
| assets/audio/fil/arts/11/questions/5/option-2.mp3 | Pula at dilaw |
| assets/audio/fil/arts/11/questions/5/option-3.mp3 | Asul at dilaw |

#### Yugto 12: Paghaluin: kahel at lila

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/12/lesson.mp3 | Pula at dilaw ay kahel. Pula at asul ay lila. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/12/questions/1/question.mp3 | Ano ang mabubuong kulay? |
| assets/audio/fil/arts/12/questions/1/hint.mp3 | Pula at dilaw ay kahel. |
| assets/audio/fil/arts/12/questions/1/option-1.mp3 | Kahel |
| assets/audio/fil/arts/12/questions/1/option-2.mp3 | Berde |
| assets/audio/fil/arts/12/questions/1/option-3.mp3 | Lila |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/12/questions/2/question.mp3 | Ano ang mabubuong kulay? |
| assets/audio/fil/arts/12/questions/2/hint.mp3 | Pula at asul ay lila. |
| assets/audio/fil/arts/12/questions/2/option-1.mp3 | Kahel |
| assets/audio/fil/arts/12/questions/2/option-2.mp3 | Berde |
| assets/audio/fil/arts/12/questions/2/option-3.mp3 | Lila |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/12/questions/3/question.mp3 | Ano ang ihahalo sa pula para maging kahel? |
| assets/audio/fil/arts/12/questions/3/hint.mp3 | Pula at dilaw ay kahel. |
| assets/audio/fil/arts/12/questions/3/option-1.mp3 | Berde |
| assets/audio/fil/arts/12/questions/3/option-2.mp3 | Dilaw |
| assets/audio/fil/arts/12/questions/3/option-3.mp3 | Asul |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/12/questions/4/question.mp3 | Ano ang ihahalo sa asul para maging lila? |
| assets/audio/fil/arts/12/questions/4/hint.mp3 | Pula at asul ay lila. |
| assets/audio/fil/arts/12/questions/4/option-1.mp3 | Pula |
| assets/audio/fil/arts/12/questions/4/option-2.mp3 | Dilaw |
| assets/audio/fil/arts/12/questions/4/option-3.mp3 | Berde |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/12/questions/5/question.mp3 | Piliin ang lila. |
| assets/audio/fil/arts/12/questions/5/hint.mp3 | Ito ang kulay mula sa pula at asul. |
| assets/audio/fil/arts/12/questions/5/option-1.mp3 | Kahel |
| assets/audio/fil/arts/12/questions/5/option-2.mp3 | Berde |
| assets/audio/fil/arts/12/questions/5/option-3.mp3 | Lila |

#### Yugto 13: Mga padron sa banig

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/13/lesson.mp3 | Ang padron ay ayos na paulit-ulit. Sa banig, maaaring magpalitan ang mga kulay o hugis. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/13/questions/1/question.mp3 | Ano ang kasunod? |
| assets/audio/fil/arts/13/questions/1/hint.mp3 | Salit-salitan ang pula at asul. |
| assets/audio/fil/arts/13/questions/1/option-1.mp3 | Pula |
| assets/audio/fil/arts/13/questions/1/option-2.mp3 | Asul |
| assets/audio/fil/arts/13/questions/1/option-3.mp3 | Dilaw |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/13/questions/2/question.mp3 | Ano ang kasunod? |
| assets/audio/fil/arts/13/questions/2/hint.mp3 | Salit-salitan ang tatsulok at parisukat. |
| assets/audio/fil/arts/13/questions/2/option-1.mp3 | ■ Parisukat |
| assets/audio/fil/arts/13/questions/2/option-2.mp3 | ● Bilog |
| assets/audio/fil/arts/13/questions/2/option-3.mp3 | ▲ Tatsulok |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/13/questions/3/question.mp3 | Ano ang kasunod? |
| assets/audio/fil/arts/13/questions/3/hint.mp3 | Bumalik sa unang kulay. |
| assets/audio/fil/arts/13/questions/3/option-1.mp3 | Pula |
| assets/audio/fil/arts/13/questions/3/option-2.mp3 | Dilaw |
| assets/audio/fil/arts/13/questions/3/option-3.mp3 | Berde |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/13/questions/4/question.mp3 | Ano ang kasunod? |
| assets/audio/fil/arts/13/questions/4/hint.mp3 | Salit-salitan ang bituin at puso. |
| assets/audio/fil/arts/13/questions/4/option-1.mp3 | Bituin |
| assets/audio/fil/arts/13/questions/4/option-2.mp3 | Puso |
| assets/audio/fil/arts/13/questions/4/option-3.mp3 | ■ Parisukat |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/13/questions/5/question.mp3 | Ano ang kasunod? |
| assets/audio/fil/arts/13/questions/5/hint.mp3 | Dalawang bilog, saka isang tatsulok. |
| assets/audio/fil/arts/13/questions/5/option-1.mp3 | ● Bilog |
| assets/audio/fil/arts/13/questions/5/option-2.mp3 | ■ Parisukat |
| assets/audio/fil/arts/13/questions/5/option-3.mp3 | ▲ Tatsulok |

#### Yugto 14: Balik-kulay at hugis

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/14/lesson.mp3 | Balikan ang mga hugis, kulay, at padron! |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/14/questions/1/question.mp3 | Alin ang bilog? |
| assets/audio/fil/arts/14/questions/1/hint.mp3 | Tingnan ang hugis sa itaas. |
| assets/audio/fil/arts/14/questions/1/option-1.mp3 | ● bilog |
| assets/audio/fil/arts/14/questions/1/option-2.mp3 | ■ parisukat |
| assets/audio/fil/arts/14/questions/1/option-3.mp3 | ▬ parihaba |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/14/questions/2/question.mp3 | Ano ang pangalan ng hugis? |
| assets/audio/fil/arts/14/questions/2/hint.mp3 | May tatlong gilid at tatlong sulok ang tatsulok. |
| assets/audio/fil/arts/14/questions/2/option-1.mp3 | puso |
| assets/audio/fil/arts/14/questions/2/option-2.mp3 | tatsulok |
| assets/audio/fil/arts/14/questions/2/option-3.mp3 | parihaba |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/14/questions/3/question.mp3 | Alin ang kulay dilaw? |
| assets/audio/fil/arts/14/questions/3/hint.mp3 | Tingnan ang bilog na dilaw. |
| assets/audio/fil/arts/14/questions/3/option-1.mp3 | kahel |
| assets/audio/fil/arts/14/questions/3/option-2.mp3 | dilaw |
| assets/audio/fil/arts/14/questions/3/option-3.mp3 | berde |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/14/questions/4/question.mp3 | Ano ang mabubuong kulay? |
| assets/audio/fil/arts/14/questions/4/hint.mp3 | Asul at dilaw ay berde. |
| assets/audio/fil/arts/14/questions/4/option-1.mp3 | Berde |
| assets/audio/fil/arts/14/questions/4/option-2.mp3 | Kahel |
| assets/audio/fil/arts/14/questions/4/option-3.mp3 | Lila |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/14/questions/5/question.mp3 | Ano ang kasunod? |
| assets/audio/fil/arts/14/questions/5/hint.mp3 | Dalawang bilog, saka isang tatsulok. |
| assets/audio/fil/arts/14/questions/5/option-1.mp3 | ■ Parisukat |
| assets/audio/fil/arts/14/questions/5/option-2.mp3 | ▲ Tatsulok |
| assets/audio/fil/arts/14/questions/5/option-3.mp3 | ● Bilog |

#### Yugto 15: Aking munting obra

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/arts/15/lesson.mp3 | Gamitin ang mga kulay upang gumuhit. Walang maling guhit! Kapag tapos na, pindutin ang Tapos na ang obra ko. |

Ito ay malayang pagguhit. Walang question, hint, o answer-option recording para sa yugtong ito.


---

## TALA — Mabuting Gawi

**Direksiyon ng boses:** Mainit, maalaga, at nagbibigay ng kumpiyansa. Magkuwento nang malinaw; maging mahinahon sa mga aralin sa mabuting gawi.

**Mundo:** Burol ng Kabutihan. **Mga yugto:** 10.

### Opsyonal na pang-interface na linya

**Hiwalay ito sa mga naka-link na lesson recording.** Ang mga path sa ibaba ay mungkahing delivery filenames; hindi pa sila pinapatugtog ng kasalukuyang app. Puwedeng ihuli ang mga ito. Ang paglagay ng MP3 sa mga path na ito ay hindi pa awtomatikong papalit sa TTS.

| Mungkahing filename | Linyang bibigkasin | Gamit / katayuan |
| --- | --- | --- |
| assets/audio/fil/shared/tala/welcome.mp3 | Tara na! Pumili ng isang mundo. | Kasalukuyang TTS sa pagpasok sa home; hindi kailangan ng pangalan ng bata. |
| assets/audio/fil/shared/tala/correct.mp3 | Mahusay! Ang galing mo! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/tala/retry.mp3 | Kaya mo iyan. Subukan muli! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/tala/map-welcome.mp3 | Tara, tuklasin natin! Isang yugto, isang bagong galing. | Nasa speech bubble; text lamang sa kasalukuyan. |
| assets/audio/fil/shared/tala/encourage.mp3 | Kaya mo iyan! Sasamahan kita. | Nasa mapa; text lamang sa kasalukuyan. |

### Mga aralin at pagsasanay — naka-link na recording slots

Ang mga sumusunod na filename ay kasalukuyang hinihingi ng app kapag pinindot ang speaker, hint, o answer option.

#### Yugto 1: Paggalang sa nakatatanda

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/1/lesson.mp3 | Bumisita si Ana kay Lola. Binati niya ito at magalang na nagtanong kung maaari siyang magmano. Natuwa si Lola sa magalang na pagbati. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/1/questions/1/question.mp3 | Paano babatiin si Lola? |
| assets/audio/fil/values/1/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Magandang umaga po!. |
| assets/audio/fil/values/1/questions/1/option-1.mp3 | Magandang umaga po! |
| assets/audio/fil/values/1/questions/1/option-2.mp3 | Hoy! |
| assets/audio/fil/values/1/questions/1/option-3.mp3 | Huwag pansinin |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/1/questions/2/question.mp3 | Ano ang maaari mong itanong? |
| assets/audio/fil/values/1/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Maaari po bang magmano?. |
| assets/audio/fil/values/1/questions/2/option-1.mp3 | Bigyan mo ako! |
| assets/audio/fil/values/1/questions/2/option-2.mp3 | Umalis ka! |
| assets/audio/fil/values/1/questions/2/option-3.mp3 | Maaari po bang magmano? |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/1/questions/3/question.mp3 | Paano makikipag-usap sa nakatatanda? |
| assets/audio/fil/values/1/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Magalang. |
| assets/audio/fil/values/1/questions/3/option-1.mp3 | Pabalang |
| assets/audio/fil/values/1/questions/3/option-2.mp3 | Magalang |
| assets/audio/fil/values/1/questions/3/option-3.mp3 | Pasigaw |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/1/questions/4/question.mp3 | May bisitang nakatatanda. Ano ang gagawin? |
| assets/audio/fil/values/1/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Batiin siya. |
| assets/audio/fil/values/1/questions/4/option-1.mp3 | Batiin siya |
| assets/audio/fil/values/1/questions/4/option-2.mp3 | Talikuran siya |
| assets/audio/fil/values/1/questions/4/option-3.mp3 | Sigawan siya |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/1/questions/5/question.mp3 | Ano ang ipinakita ni Ana? |
| assets/audio/fil/values/1/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Paggalang. |
| assets/audio/fil/values/1/questions/5/option-1.mp3 | Pag-aaway |
| assets/audio/fil/values/1/questions/5/option-2.mp3 | Panunukso |
| assets/audio/fil/values/1/questions/5/option-3.mp3 | Paggalang |

#### Yugto 2: Po at opo

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/2/lesson.mp3 | Tinanong si Ben kung nais niyang kumain. Sumagot siya ng Opo, salamat po. Magalang siyang sumagot sa kanyang tiyahin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/2/questions/1/question.mp3 | Paano magalang na sasagot ng oo? |
| assets/audio/fil/values/2/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Opo. |
| assets/audio/fil/values/2/questions/1/option-1.mp3 | Opo |
| assets/audio/fil/values/2/questions/1/option-2.mp3 | Hoy |
| assets/audio/fil/values/2/questions/1/option-3.mp3 | Ay |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/2/questions/2/question.mp3 | Buuin: Salamat ___. |
| assets/audio/fil/values/2/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: po. |
| assets/audio/fil/values/2/questions/2/option-1.mp3 | hoy |
| assets/audio/fil/values/2/questions/2/option-2.mp3 | ay |
| assets/audio/fil/values/2/questions/2/option-3.mp3 | po |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/2/questions/3/question.mp3 | Tinawag ka ng iyong lolo. Ano ang sagot? |
| assets/audio/fil/values/2/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Bakit po?. |
| assets/audio/fil/values/2/questions/3/option-1.mp3 | Huwag! |
| assets/audio/fil/values/2/questions/3/option-2.mp3 | Bakit po? |
| assets/audio/fil/values/2/questions/3/option-3.mp3 | Ano?! |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/2/questions/4/question.mp3 | Paano hihingi ng tubig? |
| assets/audio/fil/values/2/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Pahingi po ng tubig.. |
| assets/audio/fil/values/2/questions/4/option-1.mp3 | Pahingi po ng tubig. |
| assets/audio/fil/values/2/questions/4/option-2.mp3 | Tubig! Bilis! |
| assets/audio/fil/values/2/questions/4/option-3.mp3 | Akin iyan! |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/2/questions/5/question.mp3 | Ano ang ipinapakita ng po at opo? |
| assets/audio/fil/values/2/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Paggalang. |
| assets/audio/fil/values/2/questions/5/option-1.mp3 | Pang-aasar |
| assets/audio/fil/values/2/questions/5/option-2.mp3 | Galit |
| assets/audio/fil/values/2/questions/5/option-3.mp3 | Paggalang |

#### Yugto 3: Mga mahiwagang salita

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/3/lesson.mp3 | Nanghiram si Mia ng lapis. Nagsabi siya ng Pakiusap, maaari bang humiram? Pagkatapos, nagsabi siya ng Salamat. Nang mabangga ang kaibigan, sinabi niyang Pasensya na. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/3/questions/1/question.mp3 | Ano ang sasabihin kapag tinulungan? |
| assets/audio/fil/values/3/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Salamat!. |
| assets/audio/fil/values/3/questions/1/option-1.mp3 | Salamat! |
| assets/audio/fil/values/3/questions/1/option-2.mp3 | Ayoko! |
| assets/audio/fil/values/3/questions/1/option-3.mp3 | Bilisan mo! |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/3/questions/2/question.mp3 | Ano ang sasabihin kapag nakasakit? |
| assets/audio/fil/values/3/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Pasensya na.. |
| assets/audio/fil/values/3/questions/2/option-1.mp3 | Kasalanan mo! |
| assets/audio/fil/values/3/questions/2/option-2.mp3 | Wala akong pakialam. |
| assets/audio/fil/values/3/questions/2/option-3.mp3 | Pasensya na. |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/3/questions/3/question.mp3 | Paano magalang na hihiram? |
| assets/audio/fil/values/3/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Pakiusap, maaari bang humiram?. |
| assets/audio/fil/values/3/questions/3/option-1.mp3 | Kukunin ko na. |
| assets/audio/fil/values/3/questions/3/option-2.mp3 | Pakiusap, maaari bang humiram? |
| assets/audio/fil/values/3/questions/3/option-3.mp3 | Akin na iyan! |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/3/questions/4/question.mp3 | Ano ang sasabihin matapos humiram? |
| assets/audio/fil/values/3/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Salamat sa pagpapahiram.. |
| assets/audio/fil/values/3/questions/4/option-1.mp3 | Salamat sa pagpapahiram. |
| assets/audio/fil/values/3/questions/4/option-2.mp3 | Akin na ito. |
| assets/audio/fil/values/3/questions/4/option-3.mp3 | Hindi ko ibabalik. |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/3/questions/5/question.mp3 | Paano magalang na dadaan? |
| assets/audio/fil/values/3/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Makikiraan po.. |
| assets/audio/fil/values/3/questions/5/option-1.mp3 | Tabi! |
| assets/audio/fil/values/3/questions/5/option-2.mp3 | Itutulak kita. |
| assets/audio/fil/values/3/questions/5/option-3.mp3 | Makikiraan po. |

#### Yugto 4: Bahaginan at bayanihan

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/4/lesson.mp3 | May mga krayola si Leo. Walang dalang krayola ang kaibigan niya kaya nagbahagi siya. Pagkatapos gumuhit, nagtulungan silang magligpit. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/4/questions/1/question.mp3 | Walang krayola ang kaibigan. Ano ang maaari mong gawin? |
| assets/audio/fil/values/4/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Magpahiram. |
| assets/audio/fil/values/4/questions/1/option-1.mp3 | Magpahiram |
| assets/audio/fil/values/4/questions/1/option-2.mp3 | Manukso |
| assets/audio/fil/values/4/questions/1/option-3.mp3 | Itago lahat |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/4/questions/2/question.mp3 | Maraming kailangang ligpitin. Ano ang gagawin? |
| assets/audio/fil/values/4/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Tumulong. |
| assets/audio/fil/values/4/questions/2/option-1.mp3 | Umalis agad |
| assets/audio/fil/values/4/questions/2/option-2.mp3 | Magkalat pa |
| assets/audio/fil/values/4/questions/2/option-3.mp3 | Tumulong |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/4/questions/3/question.mp3 | Paano magpahiram? |
| assets/audio/fil/values/4/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Iabot nang maingat. |
| assets/audio/fil/values/4/questions/3/option-1.mp3 | Sirain muna |
| assets/audio/fil/values/4/questions/3/option-2.mp3 | Iabot nang maingat |
| assets/audio/fil/values/4/questions/3/option-3.mp3 | Ihagis |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/4/questions/4/question.mp3 | Kapag may humiram, ano ang mabuting paalala? |
| assets/audio/fil/values/4/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Ingatan at ibalik.. |
| assets/audio/fil/values/4/questions/4/option-1.mp3 | Ingatan at ibalik. |
| assets/audio/fil/values/4/questions/4/option-2.mp3 | Huwag mong ibalik. |
| assets/audio/fil/values/4/questions/4/option-3.mp3 | Itapon mo. |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/4/questions/5/question.mp3 | Ano ang bayanihan? |
| assets/audio/fil/values/4/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Pagtutulungan. |
| assets/audio/fil/values/4/questions/5/option-1.mp3 | Pag-aaway |
| assets/audio/fil/values/4/questions/5/option-2.mp3 | Panunukso |
| assets/audio/fil/values/4/questions/5/option-3.mp3 | Pagtutulungan |

#### Yugto 5: Malinis na kamay

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/5/lesson.mp3 | Bago kumain, naghugas ng kamay si Liza gamit ang sabon at tubig. Hinugasan niya ang palad, likod ng kamay, at pagitan ng mga daliri. Nagbanlaw siya at nagpatuyo. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/5/questions/1/question.mp3 | Ano ang gagawin bago kumain? |
| assets/audio/fil/values/5/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Maghugas ng kamay. |
| assets/audio/fil/values/5/questions/1/option-1.mp3 | Maghugas ng kamay |
| assets/audio/fil/values/5/questions/1/option-2.mp3 | Maglaro sa putik |
| assets/audio/fil/values/5/questions/1/option-3.mp3 | Punasan sa damit |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/5/questions/2/question.mp3 | Ano ang kasama ng tubig sa paghuhugas? |
| assets/audio/fil/values/5/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Sabon. |
| assets/audio/fil/values/5/questions/2/option-1.mp3 | Buhangin |
| assets/audio/fil/values/5/questions/2/option-2.mp3 | Pandikit |
| assets/audio/fil/values/5/questions/2/option-3.mp3 | Sabon |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/5/questions/3/question.mp3 | Aling bahagi ang lilinisin? |
| assets/audio/fil/values/5/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Pati pagitan ng daliri. |
| assets/audio/fil/values/5/questions/3/option-1.mp3 | Isang daliri lang |
| assets/audio/fil/values/5/questions/3/option-2.mp3 | Pati pagitan ng daliri |
| assets/audio/fil/values/5/questions/3/option-3.mp3 | Palad lang |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/5/questions/4/question.mp3 | Ano ang gagawin pagkatapos magsabon? |
| assets/audio/fil/values/5/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Magbanlaw. |
| assets/audio/fil/values/5/questions/4/option-1.mp3 | Magbanlaw |
| assets/audio/fil/values/5/questions/4/option-2.mp3 | Humawak ng basura |
| assets/audio/fil/values/5/questions/4/option-3.mp3 | Kumain agad |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/5/questions/5/question.mp3 | Paano patutuyuin ang malinis na kamay? |
| assets/audio/fil/values/5/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Malinis na tuwalya. |
| assets/audio/fil/values/5/questions/5/option-1.mp3 | Maruming damit |
| assets/audio/fil/values/5/questions/5/option-2.mp3 | Sahig |
| assets/audio/fil/values/5/questions/5/option-3.mp3 | Malinis na tuwalya |

#### Yugto 6: Iligpit ang mga laruan

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/6/lesson.mp3 | Masayang naglaro sina Ana at Ben. Pagkatapos, ibinalik nila ang mga laruan sa kahon. Naging maayos at ligtas ang daanan. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/6/questions/1/question.mp3 | Ano ang gagawin pagkatapos maglaro? |
| assets/audio/fil/values/6/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Iligpit ang laruan. |
| assets/audio/fil/values/6/questions/1/option-1.mp3 | Iligpit ang laruan |
| assets/audio/fil/values/6/questions/1/option-2.mp3 | Iwan sa sahig |
| assets/audio/fil/values/6/questions/1/option-3.mp3 | Itago sa ilalim ng kama |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/6/questions/2/question.mp3 | Saan ilalagay ang laruan? |
| assets/audio/fil/values/6/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Sa tamang lalagyan. |
| assets/audio/fil/values/6/questions/2/option-1.mp3 | Sa hagdan |
| assets/audio/fil/values/6/questions/2/option-2.mp3 | Sa daanan |
| assets/audio/fil/values/6/questions/2/option-3.mp3 | Sa tamang lalagyan |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/6/questions/3/question.mp3 | May laruan sa daanan. Ano ang gagawin? |
| assets/audio/fil/values/6/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Iligpit nang maingat. |
| assets/audio/fil/values/6/questions/3/option-1.mp3 | Dagdagan pa |
| assets/audio/fil/values/6/questions/3/option-2.mp3 | Iligpit nang maingat |
| assets/audio/fil/values/6/questions/3/option-3.mp3 | Sipain |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/6/questions/4/question.mp3 | Bakit mahalagang magligpit? |
| assets/audio/fil/values/6/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Upang maayos at ligtas. |
| assets/audio/fil/values/6/questions/4/option-1.mp3 | Upang maayos at ligtas |
| assets/audio/fil/values/6/questions/4/option-2.mp3 | Upang makalat |
| assets/audio/fil/values/6/questions/4/option-3.mp3 | Upang may matisod |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/6/questions/5/question.mp3 | May kaibigang nagliligpit. Ano ang gagawin? |
| assets/audio/fil/values/6/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Tumulong. |
| assets/audio/fil/values/6/questions/5/option-1.mp3 | Manood lang palagi |
| assets/audio/fil/values/6/questions/5/option-2.mp3 | Ikalat ulit |
| assets/audio/fil/values/6/questions/5/option-3.mp3 | Tumulong |

#### Yugto 7: Sa loob ng klase

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/7/lesson.mp3 | Nakikinig si Ana habang nagsasalita ang guro. Kapag nais niyang sumagot, nagtataas siya ng kamay at naghihintay ng pagkakataon. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/7/questions/1/question.mp3 | Ano ang gagawin habang nagsasalita ang guro? |
| assets/audio/fil/values/7/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Makinig. |
| assets/audio/fil/values/7/questions/1/option-1.mp3 | Makinig |
| assets/audio/fil/values/7/questions/1/option-2.mp3 | Sumigaw |
| assets/audio/fil/values/7/questions/1/option-3.mp3 | Tumakbo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/7/questions/2/question.mp3 | Paano hihingi ng pagkakataong sumagot? |
| assets/audio/fil/values/7/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Itaas ang kamay. |
| assets/audio/fil/values/7/questions/2/option-1.mp3 | Sumabat |
| assets/audio/fil/values/7/questions/2/option-2.mp3 | Tumayo sa mesa |
| assets/audio/fil/values/7/questions/2/option-3.mp3 | Itaas ang kamay |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/7/questions/3/question.mp3 | May kaklaseng nagsasalita. Ano ang gagawin? |
| assets/audio/fil/values/7/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Hintaying matapos. |
| assets/audio/fil/values/7/questions/3/option-1.mp3 | Sigawan |
| assets/audio/fil/values/7/questions/3/option-2.mp3 | Hintaying matapos |
| assets/audio/fil/values/7/questions/3/option-3.mp3 | Tawanan |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/7/questions/4/question.mp3 | May pila sa labas. Ano ang gagawin? |
| assets/audio/fil/values/7/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Hintayin ang turno. |
| assets/audio/fil/values/7/questions/4/option-1.mp3 | Hintayin ang turno |
| assets/audio/fil/values/7/questions/4/option-2.mp3 | Sumingit |
| assets/audio/fil/values/7/questions/4/option-3.mp3 | Manulak |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/7/questions/5/question.mp3 | Nagkamali ang kaklase. Ano ang mabuting gawin? |
| assets/audio/fil/values/7/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Hikayatin siyang sumubok. |
| assets/audio/fil/values/7/questions/5/option-1.mp3 | Pagtawanan |
| assets/audio/fil/values/7/questions/5/option-2.mp3 | Asarin |
| assets/audio/fil/values/7/questions/5/option-3.mp3 | Hikayatin siyang sumubok |

#### Yugto 8: Sa ating tahanan

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/8/lesson.mp3 | Nakita ni Ben ang nabasag niyang tasa. Sinabi niya ang totoo sa nakatatanda at humingi ng tulong. Hindi niya hinawakan ang matutulis na bubog. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/8/questions/1/question.mp3 | May nasira kang gamit. Ano ang gagawin? |
| assets/audio/fil/values/8/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Sabihin ang totoo. |
| assets/audio/fil/values/8/questions/1/option-1.mp3 | Sabihin ang totoo |
| assets/audio/fil/values/8/questions/1/option-2.mp3 | Magsinungaling |
| assets/audio/fil/values/8/questions/1/option-3.mp3 | Isisi sa iba |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/8/questions/2/question.mp3 | May bubog sa sahig. Ano ang gagawin? |
| assets/audio/fil/values/8/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Humingi ng tulong sa nakatatanda. |
| assets/audio/fil/values/8/questions/2/option-1.mp3 | Pulutin gamit ang kamay |
| assets/audio/fil/values/8/questions/2/option-2.mp3 | Tapakan |
| assets/audio/fil/values/8/questions/2/option-3.mp3 | Humingi ng tulong sa nakatatanda |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/8/questions/3/question.mp3 | May gawaing kaya mong gawin. Ano ang maaari mong gawin? |
| assets/audio/fil/values/8/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Tumulong. |
| assets/audio/fil/values/8/questions/3/option-1.mp3 | Manigaw |
| assets/audio/fil/values/8/questions/3/option-2.mp3 | Tumulong |
| assets/audio/fil/values/8/questions/3/option-3.mp3 | Magkalat |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/8/questions/4/question.mp3 | May nagpapahinga. Paano kikilos? |
| assets/audio/fil/values/8/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Mahinahon. |
| assets/audio/fil/values/8/questions/4/option-1.mp3 | Mahinahon |
| assets/audio/fil/values/8/questions/4/option-2.mp3 | Maingay |
| assets/audio/fil/values/8/questions/4/option-3.mp3 | Pasigaw |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/8/questions/5/question.mp3 | May nakitang gamit na hindi sa iyo. Ano ang gagawin? |
| assets/audio/fil/values/8/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Ibalik sa may-ari. |
| assets/audio/fil/values/8/questions/5/option-1.mp3 | Itago |
| assets/audio/fil/values/8/questions/5/option-2.mp3 | Sirain |
| assets/audio/fil/values/8/questions/5/option-3.mp3 | Ibalik sa may-ari |

#### Yugto 9: Sa ating pamayanan

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/9/lesson.mp3 | Namasyal si Mia kasama ang nakatatanda. Itinapon niya ang balot sa basurahan. Nang makakita ng ligaw na hayop, hindi niya ito nilapitan at humingi siya ng tulong sa nakatatanda. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/9/questions/1/question.mp3 | Saan itatapon ang balot? |
| assets/audio/fil/values/9/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Sa basurahan. |
| assets/audio/fil/values/9/questions/1/option-1.mp3 | Sa basurahan |
| assets/audio/fil/values/9/questions/1/option-2.mp3 | Sa ilog |
| assets/audio/fil/values/9/questions/1/option-3.mp3 | Sa kalsada |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/9/questions/2/question.mp3 | May di-kilalang hayop. Ano ang ligtas gawin? |
| assets/audio/fil/values/9/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Lumayo at magsabi sa nakatatanda. |
| assets/audio/fil/values/9/questions/2/option-1.mp3 | Hilain ang buntot |
| assets/audio/fil/values/9/questions/2/option-2.mp3 | Habulin |
| assets/audio/fil/values/9/questions/2/option-3.mp3 | Lumayo at magsabi sa nakatatanda |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/9/questions/3/question.mp3 | May bulaklak sa pampublikong hardin. Ano ang gagawin? |
| assets/audio/fil/values/9/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Alagaan at huwag pitasin. |
| assets/audio/fil/values/9/questions/3/option-1.mp3 | Tapakan |
| assets/audio/fil/values/9/questions/3/option-2.mp3 | Alagaan at huwag pitasin |
| assets/audio/fil/values/9/questions/3/option-3.mp3 | Bunutin |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/9/questions/4/question.mp3 | Tatawid ka ng kalsada. Ano ang gagawin? |
| assets/audio/fil/values/9/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Magpatulong sa kasama mong nakatatanda. |
| assets/audio/fil/values/9/questions/4/option-1.mp3 | Magpatulong sa kasama mong nakatatanda |
| assets/audio/fil/values/9/questions/4/option-2.mp3 | Tumakbo mag-isa |
| assets/audio/fil/values/9/questions/4/option-3.mp3 | Maglaro sa gitna |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/9/questions/5/question.mp3 | May matandang may dalang mabigat. Ano ang maaari mong gawin? |
| assets/audio/fil/values/9/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Magtanong nang magalang kung kailangan ng tulong. |
| assets/audio/fil/values/9/questions/5/option-1.mp3 | Pagtawanan |
| assets/audio/fil/values/9/questions/5/option-2.mp3 | Harangan |
| assets/audio/fil/values/9/questions/5/option-3.mp3 | Magtanong nang magalang kung kailangan ng tulong |

#### Yugto 10: Bituin ng kabutihan

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/10/lesson.mp3 | Dalhin ang kabutihan sa klase, tahanan, at pamayanan. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/10/questions/1/question.mp3 | Paano babatiin si Lola? |
| assets/audio/fil/values/10/questions/1/hint.mp3 | Alalahanin ang mabuting gawi: Magandang umaga po!. |
| assets/audio/fil/values/10/questions/1/option-1.mp3 | Magandang umaga po! |
| assets/audio/fil/values/10/questions/1/option-2.mp3 | Hoy! |
| assets/audio/fil/values/10/questions/1/option-3.mp3 | Huwag pansinin |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/10/questions/2/question.mp3 | Ano ang sasabihin kapag tinulungan? |
| assets/audio/fil/values/10/questions/2/hint.mp3 | Alalahanin ang mabuting gawi: Salamat!. |
| assets/audio/fil/values/10/questions/2/option-1.mp3 | Ayoko! |
| assets/audio/fil/values/10/questions/2/option-2.mp3 | Bilisan mo! |
| assets/audio/fil/values/10/questions/2/option-3.mp3 | Salamat! |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/10/questions/3/question.mp3 | Maraming kailangang ligpitin. Ano ang gagawin? |
| assets/audio/fil/values/10/questions/3/hint.mp3 | Alalahanin ang mabuting gawi: Tumulong. |
| assets/audio/fil/values/10/questions/3/option-1.mp3 | Tumulong |
| assets/audio/fil/values/10/questions/3/option-2.mp3 | Umalis agad |
| assets/audio/fil/values/10/questions/3/option-3.mp3 | Magkalat pa |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/10/questions/4/question.mp3 | May pila sa labas. Ano ang gagawin? |
| assets/audio/fil/values/10/questions/4/hint.mp3 | Alalahanin ang mabuting gawi: Hintayin ang turno. |
| assets/audio/fil/values/10/questions/4/option-1.mp3 | Hintayin ang turno |
| assets/audio/fil/values/10/questions/4/option-2.mp3 | Sumingit |
| assets/audio/fil/values/10/questions/4/option-3.mp3 | Manulak |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/values/10/questions/5/question.mp3 | Saan itatapon ang balot? |
| assets/audio/fil/values/10/questions/5/hint.mp3 | Alalahanin ang mabuting gawi: Sa basurahan. |
| assets/audio/fil/values/10/questions/5/option-1.mp3 | Sa ilog |
| assets/audio/fil/values/10/questions/5/option-2.mp3 | Sa kalsada |
| assets/audio/fil/values/10/questions/5/option-3.mp3 | Sa basurahan |


---

## TITIK — Titik at Tunog

**Direksiyon ng boses:** Matiyaga, malinaw, at mausisa. Bigyan ng sapat na pagitan ang mga titik, pantig, at salita.

**Mundo:** Gubat ng mga Titik. **Mga yugto:** 33.

### Opsyonal na pang-interface na linya

**Hiwalay ito sa mga naka-link na lesson recording.** Ang mga path sa ibaba ay mungkahing delivery filenames; hindi pa sila pinapatugtog ng kasalukuyang app. Puwedeng ihuli ang mga ito. Ang paglagay ng MP3 sa mga path na ito ay hindi pa awtomatikong papalit sa TTS.

| Mungkahing filename | Linyang bibigkasin | Gamit / katayuan |
| --- | --- | --- |
| assets/audio/fil/shared/titik/correct.mp3 | Mahusay! Ang galing mo! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/titik/retry.mp3 | Kaya mo iyan. Subukan muli! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/titik/map-welcome.mp3 | Tara, tuklasin natin! Isang yugto, isang bagong galing. | Nasa speech bubble; text lamang sa kasalukuyan. |
| assets/audio/fil/shared/titik/encourage.mp3 | Kaya mo iyan! Sasamahan kita. | Nasa mapa; text lamang sa kasalukuyan. |

### Mga aralin at pagsasanay — naka-link na recording slots

Ang mga sumusunod na filename ay kasalukuyang hinihingi ng app kapag pinindot ang speaker, hint, o answer option.

#### Yugto 1: Ang titik A

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/1/lesson.mp3 | Ito ang malaking A at maliit na a. Nagsisimula sa A ang araw. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/1/questions/1/question.mp3 | Alin ang nagsisimula sa A? |
| assets/audio/fil/phonics/1/questions/1/hint.mp3 | Hanapin ang araw. |
| assets/audio/fil/phonics/1/questions/1/option-1.mp3 | araw |
| assets/audio/fil/phonics/1/questions/1/option-2.mp3 | folder |
| assets/audio/fil/phonics/1/questions/1/option-3.mp3 | lapis |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/1/questions/2/question.mp3 | Alin ang malaking titik A? |
| assets/audio/fil/phonics/1/questions/2/hint.mp3 | Tingnan ang unang titik ng araw. |
| assets/audio/fil/phonics/1/questions/2/option-1.mp3 | F |
| assets/audio/fil/phonics/1/questions/2/option-2.mp3 | L |
| assets/audio/fil/phonics/1/questions/2/option-3.mp3 | A |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/1/questions/3/question.mp3 | Alin ang maliit na titik A? |
| assets/audio/fil/phonics/1/questions/3/hint.mp3 | Magkapareha ang A at a. |
| assets/audio/fil/phonics/1/questions/3/option-1.mp3 | l |
| assets/audio/fil/phonics/1/questions/3/option-2.mp3 | a |
| assets/audio/fil/phonics/1/questions/3/option-3.mp3 | f |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/1/questions/4/question.mp3 | Ano ang unang titik ng araw? |
| assets/audio/fil/phonics/1/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: araw. |
| assets/audio/fil/phonics/1/questions/4/option-1.mp3 | A |
| assets/audio/fil/phonics/1/questions/4/option-2.mp3 | L |
| assets/audio/fil/phonics/1/questions/4/option-3.mp3 | F |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/1/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/1/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/1/questions/5/option-1.mp3 | A f |
| assets/audio/fil/phonics/1/questions/5/option-2.mp3 | F a |
| assets/audio/fil/phonics/1/questions/5/option-3.mp3 | A a |

#### Yugto 2: Ang titik B

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/2/lesson.mp3 | Ito ang malaking B at maliit na b. Nagsisimula sa B ang bola. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/2/questions/1/question.mp3 | Alin ang nagsisimula sa B? |
| assets/audio/fil/phonics/2/questions/1/hint.mp3 | Hanapin ang bola. |
| assets/audio/fil/phonics/2/questions/1/option-1.mp3 | bola |
| assets/audio/fil/phonics/2/questions/1/option-2.mp3 | gatas |
| assets/audio/fil/phonics/2/questions/1/option-3.mp3 | mangga |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/2/questions/2/question.mp3 | Alin ang malaking titik B? |
| assets/audio/fil/phonics/2/questions/2/hint.mp3 | Tingnan ang unang titik ng bola. |
| assets/audio/fil/phonics/2/questions/2/option-1.mp3 | G |
| assets/audio/fil/phonics/2/questions/2/option-2.mp3 | M |
| assets/audio/fil/phonics/2/questions/2/option-3.mp3 | B |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/2/questions/3/question.mp3 | Alin ang maliit na titik B? |
| assets/audio/fil/phonics/2/questions/3/hint.mp3 | Magkapareha ang B at b. |
| assets/audio/fil/phonics/2/questions/3/option-1.mp3 | m |
| assets/audio/fil/phonics/2/questions/3/option-2.mp3 | b |
| assets/audio/fil/phonics/2/questions/3/option-3.mp3 | g |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/2/questions/4/question.mp3 | Ano ang unang titik ng bola? |
| assets/audio/fil/phonics/2/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: bola. |
| assets/audio/fil/phonics/2/questions/4/option-1.mp3 | B |
| assets/audio/fil/phonics/2/questions/4/option-2.mp3 | M |
| assets/audio/fil/phonics/2/questions/4/option-3.mp3 | G |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/2/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/2/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/2/questions/5/option-1.mp3 | B g |
| assets/audio/fil/phonics/2/questions/5/option-2.mp3 | G b |
| assets/audio/fil/phonics/2/questions/5/option-3.mp3 | B b |

#### Yugto 3: Ang titik C

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/3/lesson.mp3 | Ito ang malaking C at maliit na c. Nagsisimula sa C ang carrot. Ang carrot ay karot sa Filipino. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/3/questions/1/question.mp3 | Alin ang nagsisimula sa C? |
| assets/audio/fil/phonics/3/questions/1/hint.mp3 | Hanapin ang carrot. |
| assets/audio/fil/phonics/3/questions/1/option-1.mp3 | carrot |
| assets/audio/fil/phonics/3/questions/1/option-2.mp3 | halaman |
| assets/audio/fil/phonics/3/questions/1/option-3.mp3 | niyog |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/3/questions/2/question.mp3 | Alin ang malaking titik C? |
| assets/audio/fil/phonics/3/questions/2/hint.mp3 | Tingnan ang unang titik ng carrot. |
| assets/audio/fil/phonics/3/questions/2/option-1.mp3 | H |
| assets/audio/fil/phonics/3/questions/2/option-2.mp3 | N |
| assets/audio/fil/phonics/3/questions/2/option-3.mp3 | C |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/3/questions/3/question.mp3 | Alin ang maliit na titik C? |
| assets/audio/fil/phonics/3/questions/3/hint.mp3 | Magkapareha ang C at c. |
| assets/audio/fil/phonics/3/questions/3/option-1.mp3 | n |
| assets/audio/fil/phonics/3/questions/3/option-2.mp3 | c |
| assets/audio/fil/phonics/3/questions/3/option-3.mp3 | h |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/3/questions/4/question.mp3 | Ano ang unang titik ng carrot? |
| assets/audio/fil/phonics/3/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: carrot. |
| assets/audio/fil/phonics/3/questions/4/option-1.mp3 | C |
| assets/audio/fil/phonics/3/questions/4/option-2.mp3 | N |
| assets/audio/fil/phonics/3/questions/4/option-3.mp3 | H |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/3/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/3/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/3/questions/5/option-1.mp3 | C h |
| assets/audio/fil/phonics/3/questions/5/option-2.mp3 | H c |
| assets/audio/fil/phonics/3/questions/5/option-3.mp3 | C c |

#### Yugto 4: Ang titik D

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/4/lesson.mp3 | Ito ang malaking D at maliit na d. Nagsisimula sa D ang dahon. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/4/questions/1/question.mp3 | Alin ang nagsisimula sa D? |
| assets/audio/fil/phonics/4/questions/1/hint.mp3 | Hanapin ang dahon. |
| assets/audio/fil/phonics/4/questions/1/option-1.mp3 | dahon |
| assets/audio/fil/phonics/4/questions/1/option-2.mp3 | isda |
| assets/audio/fil/phonics/4/questions/1/option-3.mp3 | orasan |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/4/questions/2/question.mp3 | Alin ang malaking titik D? |
| assets/audio/fil/phonics/4/questions/2/hint.mp3 | Tingnan ang unang titik ng dahon. |
| assets/audio/fil/phonics/4/questions/2/option-1.mp3 | I |
| assets/audio/fil/phonics/4/questions/2/option-2.mp3 | O |
| assets/audio/fil/phonics/4/questions/2/option-3.mp3 | D |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/4/questions/3/question.mp3 | Alin ang maliit na titik D? |
| assets/audio/fil/phonics/4/questions/3/hint.mp3 | Magkapareha ang D at d. |
| assets/audio/fil/phonics/4/questions/3/option-1.mp3 | o |
| assets/audio/fil/phonics/4/questions/3/option-2.mp3 | d |
| assets/audio/fil/phonics/4/questions/3/option-3.mp3 | i |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/4/questions/4/question.mp3 | Ano ang unang titik ng dahon? |
| assets/audio/fil/phonics/4/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: dahon. |
| assets/audio/fil/phonics/4/questions/4/option-1.mp3 | D |
| assets/audio/fil/phonics/4/questions/4/option-2.mp3 | O |
| assets/audio/fil/phonics/4/questions/4/option-3.mp3 | I |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/4/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/4/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/4/questions/5/option-1.mp3 | D i |
| assets/audio/fil/phonics/4/questions/5/option-2.mp3 | I d |
| assets/audio/fil/phonics/4/questions/5/option-3.mp3 | D d |

#### Yugto 5: Ang titik E

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/5/lesson.mp3 | Ito ang malaking E at maliit na e. Nagsisimula sa E ang elepante. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/5/questions/1/question.mp3 | Alin ang nagsisimula sa E? |
| assets/audio/fil/phonics/5/questions/1/hint.mp3 | Hanapin ang elepante. |
| assets/audio/fil/phonics/5/questions/1/option-1.mp3 | elepante |
| assets/audio/fil/phonics/5/questions/1/option-2.mp3 | jeep |
| assets/audio/fil/phonics/5/questions/1/option-3.mp3 | pusa |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/5/questions/2/question.mp3 | Alin ang malaking titik E? |
| assets/audio/fil/phonics/5/questions/2/hint.mp3 | Tingnan ang unang titik ng elepante. |
| assets/audio/fil/phonics/5/questions/2/option-1.mp3 | J |
| assets/audio/fil/phonics/5/questions/2/option-2.mp3 | P |
| assets/audio/fil/phonics/5/questions/2/option-3.mp3 | E |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/5/questions/3/question.mp3 | Alin ang maliit na titik E? |
| assets/audio/fil/phonics/5/questions/3/hint.mp3 | Magkapareha ang E at e. |
| assets/audio/fil/phonics/5/questions/3/option-1.mp3 | p |
| assets/audio/fil/phonics/5/questions/3/option-2.mp3 | e |
| assets/audio/fil/phonics/5/questions/3/option-3.mp3 | j |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/5/questions/4/question.mp3 | Ano ang unang titik ng elepante? |
| assets/audio/fil/phonics/5/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: elepante. |
| assets/audio/fil/phonics/5/questions/4/option-1.mp3 | E |
| assets/audio/fil/phonics/5/questions/4/option-2.mp3 | P |
| assets/audio/fil/phonics/5/questions/4/option-3.mp3 | J |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/5/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/5/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/5/questions/5/option-1.mp3 | E j |
| assets/audio/fil/phonics/5/questions/5/option-2.mp3 | J e |
| assets/audio/fil/phonics/5/questions/5/option-3.mp3 | E e |

#### Yugto 6: Ang titik F

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/6/lesson.mp3 | Ito ang malaking F at maliit na f. Nagsisimula sa F ang folder. Ang folder ay lalagyan ng mga papel. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/6/questions/1/question.mp3 | Alin ang nagsisimula sa F? |
| assets/audio/fil/phonics/6/questions/1/hint.mp3 | Hanapin ang folder. |
| assets/audio/fil/phonics/6/questions/1/option-1.mp3 | folder |
| assets/audio/fil/phonics/6/questions/1/option-2.mp3 | kamay |
| assets/audio/fil/phonics/6/questions/1/option-3.mp3 | quilt |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/6/questions/2/question.mp3 | Alin ang malaking titik F? |
| assets/audio/fil/phonics/6/questions/2/hint.mp3 | Tingnan ang unang titik ng folder. |
| assets/audio/fil/phonics/6/questions/2/option-1.mp3 | K |
| assets/audio/fil/phonics/6/questions/2/option-2.mp3 | Q |
| assets/audio/fil/phonics/6/questions/2/option-3.mp3 | F |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/6/questions/3/question.mp3 | Alin ang maliit na titik F? |
| assets/audio/fil/phonics/6/questions/3/hint.mp3 | Magkapareha ang F at f. |
| assets/audio/fil/phonics/6/questions/3/option-1.mp3 | q |
| assets/audio/fil/phonics/6/questions/3/option-2.mp3 | f |
| assets/audio/fil/phonics/6/questions/3/option-3.mp3 | k |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/6/questions/4/question.mp3 | Ano ang unang titik ng folder? |
| assets/audio/fil/phonics/6/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: folder. |
| assets/audio/fil/phonics/6/questions/4/option-1.mp3 | F |
| assets/audio/fil/phonics/6/questions/4/option-2.mp3 | Q |
| assets/audio/fil/phonics/6/questions/4/option-3.mp3 | K |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/6/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/6/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/6/questions/5/option-1.mp3 | F k |
| assets/audio/fil/phonics/6/questions/5/option-2.mp3 | K f |
| assets/audio/fil/phonics/6/questions/5/option-3.mp3 | F f |

#### Yugto 7: Ang titik G

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/7/lesson.mp3 | Ito ang malaking G at maliit na g. Nagsisimula sa G ang gatas. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/7/questions/1/question.mp3 | Alin ang nagsisimula sa G? |
| assets/audio/fil/phonics/7/questions/1/hint.mp3 | Hanapin ang gatas. |
| assets/audio/fil/phonics/7/questions/1/option-1.mp3 | gatas |
| assets/audio/fil/phonics/7/questions/1/option-2.mp3 | lapis |
| assets/audio/fil/phonics/7/questions/1/option-3.mp3 | rosas |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/7/questions/2/question.mp3 | Alin ang malaking titik G? |
| assets/audio/fil/phonics/7/questions/2/hint.mp3 | Tingnan ang unang titik ng gatas. |
| assets/audio/fil/phonics/7/questions/2/option-1.mp3 | L |
| assets/audio/fil/phonics/7/questions/2/option-2.mp3 | R |
| assets/audio/fil/phonics/7/questions/2/option-3.mp3 | G |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/7/questions/3/question.mp3 | Alin ang maliit na titik G? |
| assets/audio/fil/phonics/7/questions/3/hint.mp3 | Magkapareha ang G at g. |
| assets/audio/fil/phonics/7/questions/3/option-1.mp3 | r |
| assets/audio/fil/phonics/7/questions/3/option-2.mp3 | g |
| assets/audio/fil/phonics/7/questions/3/option-3.mp3 | l |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/7/questions/4/question.mp3 | Ano ang unang titik ng gatas? |
| assets/audio/fil/phonics/7/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: gatas. |
| assets/audio/fil/phonics/7/questions/4/option-1.mp3 | G |
| assets/audio/fil/phonics/7/questions/4/option-2.mp3 | R |
| assets/audio/fil/phonics/7/questions/4/option-3.mp3 | L |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/7/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/7/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/7/questions/5/option-1.mp3 | G l |
| assets/audio/fil/phonics/7/questions/5/option-2.mp3 | L g |
| assets/audio/fil/phonics/7/questions/5/option-3.mp3 | G g |

#### Yugto 8: Ang titik H

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/8/lesson.mp3 | Ito ang malaking H at maliit na h. Nagsisimula sa H ang halaman. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/8/questions/1/question.mp3 | Alin ang nagsisimula sa H? |
| assets/audio/fil/phonics/8/questions/1/hint.mp3 | Hanapin ang halaman. |
| assets/audio/fil/phonics/8/questions/1/option-1.mp3 | halaman |
| assets/audio/fil/phonics/8/questions/1/option-2.mp3 | mangga |
| assets/audio/fil/phonics/8/questions/1/option-3.mp3 | saging |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/8/questions/2/question.mp3 | Alin ang malaking titik H? |
| assets/audio/fil/phonics/8/questions/2/hint.mp3 | Tingnan ang unang titik ng halaman. |
| assets/audio/fil/phonics/8/questions/2/option-1.mp3 | M |
| assets/audio/fil/phonics/8/questions/2/option-2.mp3 | S |
| assets/audio/fil/phonics/8/questions/2/option-3.mp3 | H |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/8/questions/3/question.mp3 | Alin ang maliit na titik H? |
| assets/audio/fil/phonics/8/questions/3/hint.mp3 | Magkapareha ang H at h. |
| assets/audio/fil/phonics/8/questions/3/option-1.mp3 | s |
| assets/audio/fil/phonics/8/questions/3/option-2.mp3 | h |
| assets/audio/fil/phonics/8/questions/3/option-3.mp3 | m |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/8/questions/4/question.mp3 | Ano ang unang titik ng halaman? |
| assets/audio/fil/phonics/8/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: halaman. |
| assets/audio/fil/phonics/8/questions/4/option-1.mp3 | H |
| assets/audio/fil/phonics/8/questions/4/option-2.mp3 | S |
| assets/audio/fil/phonics/8/questions/4/option-3.mp3 | M |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/8/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/8/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/8/questions/5/option-1.mp3 | H m |
| assets/audio/fil/phonics/8/questions/5/option-2.mp3 | M h |
| assets/audio/fil/phonics/8/questions/5/option-3.mp3 | H h |

#### Yugto 9: Ang titik I

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/9/lesson.mp3 | Ito ang malaking I at maliit na i. Nagsisimula sa I ang isda. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/9/questions/1/question.mp3 | Alin ang nagsisimula sa I? |
| assets/audio/fil/phonics/9/questions/1/hint.mp3 | Hanapin ang isda. |
| assets/audio/fil/phonics/9/questions/1/option-1.mp3 | isda |
| assets/audio/fil/phonics/9/questions/1/option-2.mp3 | niyog |
| assets/audio/fil/phonics/9/questions/1/option-3.mp3 | tasa |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/9/questions/2/question.mp3 | Alin ang malaking titik I? |
| assets/audio/fil/phonics/9/questions/2/hint.mp3 | Tingnan ang unang titik ng isda. |
| assets/audio/fil/phonics/9/questions/2/option-1.mp3 | N |
| assets/audio/fil/phonics/9/questions/2/option-2.mp3 | T |
| assets/audio/fil/phonics/9/questions/2/option-3.mp3 | I |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/9/questions/3/question.mp3 | Alin ang maliit na titik I? |
| assets/audio/fil/phonics/9/questions/3/hint.mp3 | Magkapareha ang I at i. |
| assets/audio/fil/phonics/9/questions/3/option-1.mp3 | t |
| assets/audio/fil/phonics/9/questions/3/option-2.mp3 | i |
| assets/audio/fil/phonics/9/questions/3/option-3.mp3 | n |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/9/questions/4/question.mp3 | Ano ang unang titik ng isda? |
| assets/audio/fil/phonics/9/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: isda. |
| assets/audio/fil/phonics/9/questions/4/option-1.mp3 | I |
| assets/audio/fil/phonics/9/questions/4/option-2.mp3 | T |
| assets/audio/fil/phonics/9/questions/4/option-3.mp3 | N |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/9/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/9/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/9/questions/5/option-1.mp3 | I n |
| assets/audio/fil/phonics/9/questions/5/option-2.mp3 | N i |
| assets/audio/fil/phonics/9/questions/5/option-3.mp3 | I i |

#### Yugto 10: Ang titik J

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/10/lesson.mp3 | Ito ang malaking J at maliit na j. Nagsisimula sa J ang jeep. Ang jeep ay sasakyang pampasahero. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/10/questions/1/question.mp3 | Alin ang nagsisimula sa J? |
| assets/audio/fil/phonics/10/questions/1/hint.mp3 | Hanapin ang jeep. |
| assets/audio/fil/phonics/10/questions/1/option-1.mp3 | jeep |
| assets/audio/fil/phonics/10/questions/1/option-2.mp3 | orasan |
| assets/audio/fil/phonics/10/questions/1/option-3.mp3 | ulan |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/10/questions/2/question.mp3 | Alin ang malaking titik J? |
| assets/audio/fil/phonics/10/questions/2/hint.mp3 | Tingnan ang unang titik ng jeep. |
| assets/audio/fil/phonics/10/questions/2/option-1.mp3 | O |
| assets/audio/fil/phonics/10/questions/2/option-2.mp3 | U |
| assets/audio/fil/phonics/10/questions/2/option-3.mp3 | J |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/10/questions/3/question.mp3 | Alin ang maliit na titik J? |
| assets/audio/fil/phonics/10/questions/3/hint.mp3 | Magkapareha ang J at j. |
| assets/audio/fil/phonics/10/questions/3/option-1.mp3 | u |
| assets/audio/fil/phonics/10/questions/3/option-2.mp3 | j |
| assets/audio/fil/phonics/10/questions/3/option-3.mp3 | o |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/10/questions/4/question.mp3 | Ano ang unang titik ng jeep? |
| assets/audio/fil/phonics/10/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: jeep. |
| assets/audio/fil/phonics/10/questions/4/option-1.mp3 | J |
| assets/audio/fil/phonics/10/questions/4/option-2.mp3 | U |
| assets/audio/fil/phonics/10/questions/4/option-3.mp3 | O |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/10/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/10/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/10/questions/5/option-1.mp3 | J o |
| assets/audio/fil/phonics/10/questions/5/option-2.mp3 | O j |
| assets/audio/fil/phonics/10/questions/5/option-3.mp3 | J j |

#### Yugto 11: Ang titik K

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/11/lesson.mp3 | Ito ang malaking K at maliit na k. Nagsisimula sa K ang kamay. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/11/questions/1/question.mp3 | Alin ang nagsisimula sa K? |
| assets/audio/fil/phonics/11/questions/1/hint.mp3 | Hanapin ang kamay. |
| assets/audio/fil/phonics/11/questions/1/option-1.mp3 | kamay |
| assets/audio/fil/phonics/11/questions/1/option-2.mp3 | pusa |
| assets/audio/fil/phonics/11/questions/1/option-3.mp3 | vase |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/11/questions/2/question.mp3 | Alin ang malaking titik K? |
| assets/audio/fil/phonics/11/questions/2/hint.mp3 | Tingnan ang unang titik ng kamay. |
| assets/audio/fil/phonics/11/questions/2/option-1.mp3 | P |
| assets/audio/fil/phonics/11/questions/2/option-2.mp3 | V |
| assets/audio/fil/phonics/11/questions/2/option-3.mp3 | K |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/11/questions/3/question.mp3 | Alin ang maliit na titik K? |
| assets/audio/fil/phonics/11/questions/3/hint.mp3 | Magkapareha ang K at k. |
| assets/audio/fil/phonics/11/questions/3/option-1.mp3 | v |
| assets/audio/fil/phonics/11/questions/3/option-2.mp3 | k |
| assets/audio/fil/phonics/11/questions/3/option-3.mp3 | p |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/11/questions/4/question.mp3 | Ano ang unang titik ng kamay? |
| assets/audio/fil/phonics/11/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: kamay. |
| assets/audio/fil/phonics/11/questions/4/option-1.mp3 | K |
| assets/audio/fil/phonics/11/questions/4/option-2.mp3 | V |
| assets/audio/fil/phonics/11/questions/4/option-3.mp3 | P |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/11/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/11/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/11/questions/5/option-1.mp3 | K p |
| assets/audio/fil/phonics/11/questions/5/option-2.mp3 | P k |
| assets/audio/fil/phonics/11/questions/5/option-3.mp3 | K k |

#### Yugto 12: Ang titik L

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/12/lesson.mp3 | Ito ang malaking L at maliit na l. Nagsisimula sa L ang lapis. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/12/questions/1/question.mp3 | Alin ang nagsisimula sa L? |
| assets/audio/fil/phonics/12/questions/1/hint.mp3 | Hanapin ang lapis. |
| assets/audio/fil/phonics/12/questions/1/option-1.mp3 | lapis |
| assets/audio/fil/phonics/12/questions/1/option-2.mp3 | quilt |
| assets/audio/fil/phonics/12/questions/1/option-3.mp3 | walis |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/12/questions/2/question.mp3 | Alin ang malaking titik L? |
| assets/audio/fil/phonics/12/questions/2/hint.mp3 | Tingnan ang unang titik ng lapis. |
| assets/audio/fil/phonics/12/questions/2/option-1.mp3 | Q |
| assets/audio/fil/phonics/12/questions/2/option-2.mp3 | W |
| assets/audio/fil/phonics/12/questions/2/option-3.mp3 | L |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/12/questions/3/question.mp3 | Alin ang maliit na titik L? |
| assets/audio/fil/phonics/12/questions/3/hint.mp3 | Magkapareha ang L at l. |
| assets/audio/fil/phonics/12/questions/3/option-1.mp3 | w |
| assets/audio/fil/phonics/12/questions/3/option-2.mp3 | l |
| assets/audio/fil/phonics/12/questions/3/option-3.mp3 | q |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/12/questions/4/question.mp3 | Ano ang unang titik ng lapis? |
| assets/audio/fil/phonics/12/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: lapis. |
| assets/audio/fil/phonics/12/questions/4/option-1.mp3 | L |
| assets/audio/fil/phonics/12/questions/4/option-2.mp3 | W |
| assets/audio/fil/phonics/12/questions/4/option-3.mp3 | Q |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/12/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/12/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/12/questions/5/option-1.mp3 | L q |
| assets/audio/fil/phonics/12/questions/5/option-2.mp3 | Q l |
| assets/audio/fil/phonics/12/questions/5/option-3.mp3 | L l |

#### Yugto 13: Ang titik M

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/13/lesson.mp3 | Ito ang malaking M at maliit na m. Nagsisimula sa M ang mangga. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/13/questions/1/question.mp3 | Alin ang nagsisimula sa M? |
| assets/audio/fil/phonics/13/questions/1/hint.mp3 | Hanapin ang mangga. |
| assets/audio/fil/phonics/13/questions/1/option-1.mp3 | mangga |
| assets/audio/fil/phonics/13/questions/1/option-2.mp3 | rosas |
| assets/audio/fil/phonics/13/questions/1/option-3.mp3 | x-ray |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/13/questions/2/question.mp3 | Alin ang malaking titik M? |
| assets/audio/fil/phonics/13/questions/2/hint.mp3 | Tingnan ang unang titik ng mangga. |
| assets/audio/fil/phonics/13/questions/2/option-1.mp3 | R |
| assets/audio/fil/phonics/13/questions/2/option-2.mp3 | X |
| assets/audio/fil/phonics/13/questions/2/option-3.mp3 | M |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/13/questions/3/question.mp3 | Alin ang maliit na titik M? |
| assets/audio/fil/phonics/13/questions/3/hint.mp3 | Magkapareha ang M at m. |
| assets/audio/fil/phonics/13/questions/3/option-1.mp3 | x |
| assets/audio/fil/phonics/13/questions/3/option-2.mp3 | m |
| assets/audio/fil/phonics/13/questions/3/option-3.mp3 | r |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/13/questions/4/question.mp3 | Ano ang unang titik ng mangga? |
| assets/audio/fil/phonics/13/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: mangga. |
| assets/audio/fil/phonics/13/questions/4/option-1.mp3 | M |
| assets/audio/fil/phonics/13/questions/4/option-2.mp3 | X |
| assets/audio/fil/phonics/13/questions/4/option-3.mp3 | R |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/13/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/13/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/13/questions/5/option-1.mp3 | M r |
| assets/audio/fil/phonics/13/questions/5/option-2.mp3 | R m |
| assets/audio/fil/phonics/13/questions/5/option-3.mp3 | M m |

#### Yugto 14: Ang titik N

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/14/lesson.mp3 | Ito ang malaking N at maliit na n. Nagsisimula sa N ang niyog. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/14/questions/1/question.mp3 | Alin ang nagsisimula sa N? |
| assets/audio/fil/phonics/14/questions/1/hint.mp3 | Hanapin ang niyog. |
| assets/audio/fil/phonics/14/questions/1/option-1.mp3 | niyog |
| assets/audio/fil/phonics/14/questions/1/option-2.mp3 | saging |
| assets/audio/fil/phonics/14/questions/1/option-3.mp3 | yoyo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/14/questions/2/question.mp3 | Alin ang malaking titik N? |
| assets/audio/fil/phonics/14/questions/2/hint.mp3 | Tingnan ang unang titik ng niyog. |
| assets/audio/fil/phonics/14/questions/2/option-1.mp3 | S |
| assets/audio/fil/phonics/14/questions/2/option-2.mp3 | Y |
| assets/audio/fil/phonics/14/questions/2/option-3.mp3 | N |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/14/questions/3/question.mp3 | Alin ang maliit na titik N? |
| assets/audio/fil/phonics/14/questions/3/hint.mp3 | Magkapareha ang N at n. |
| assets/audio/fil/phonics/14/questions/3/option-1.mp3 | y |
| assets/audio/fil/phonics/14/questions/3/option-2.mp3 | n |
| assets/audio/fil/phonics/14/questions/3/option-3.mp3 | s |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/14/questions/4/question.mp3 | Ano ang unang titik ng niyog? |
| assets/audio/fil/phonics/14/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: niyog. |
| assets/audio/fil/phonics/14/questions/4/option-1.mp3 | N |
| assets/audio/fil/phonics/14/questions/4/option-2.mp3 | Y |
| assets/audio/fil/phonics/14/questions/4/option-3.mp3 | S |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/14/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/14/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/14/questions/5/option-1.mp3 | N s |
| assets/audio/fil/phonics/14/questions/5/option-2.mp3 | S n |
| assets/audio/fil/phonics/14/questions/5/option-3.mp3 | N n |

#### Yugto 15: Ang titik O

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/15/lesson.mp3 | Ito ang malaking O at maliit na o. Nagsisimula sa O ang orasan. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/15/questions/1/question.mp3 | Alin ang nagsisimula sa O? |
| assets/audio/fil/phonics/15/questions/1/hint.mp3 | Hanapin ang orasan. |
| assets/audio/fil/phonics/15/questions/1/option-1.mp3 | orasan |
| assets/audio/fil/phonics/15/questions/1/option-2.mp3 | tasa |
| assets/audio/fil/phonics/15/questions/1/option-3.mp3 | zebra |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/15/questions/2/question.mp3 | Alin ang malaking titik O? |
| assets/audio/fil/phonics/15/questions/2/hint.mp3 | Tingnan ang unang titik ng orasan. |
| assets/audio/fil/phonics/15/questions/2/option-1.mp3 | T |
| assets/audio/fil/phonics/15/questions/2/option-2.mp3 | Z |
| assets/audio/fil/phonics/15/questions/2/option-3.mp3 | O |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/15/questions/3/question.mp3 | Alin ang maliit na titik O? |
| assets/audio/fil/phonics/15/questions/3/hint.mp3 | Magkapareha ang O at o. |
| assets/audio/fil/phonics/15/questions/3/option-1.mp3 | z |
| assets/audio/fil/phonics/15/questions/3/option-2.mp3 | o |
| assets/audio/fil/phonics/15/questions/3/option-3.mp3 | t |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/15/questions/4/question.mp3 | Ano ang unang titik ng orasan? |
| assets/audio/fil/phonics/15/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: orasan. |
| assets/audio/fil/phonics/15/questions/4/option-1.mp3 | O |
| assets/audio/fil/phonics/15/questions/4/option-2.mp3 | Z |
| assets/audio/fil/phonics/15/questions/4/option-3.mp3 | T |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/15/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/15/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/15/questions/5/option-1.mp3 | O t |
| assets/audio/fil/phonics/15/questions/5/option-2.mp3 | T o |
| assets/audio/fil/phonics/15/questions/5/option-3.mp3 | O o |

#### Yugto 16: Ang titik P

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/16/lesson.mp3 | Ito ang malaking P at maliit na p. Nagsisimula sa P ang pusa. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/16/questions/1/question.mp3 | Alin ang nagsisimula sa P? |
| assets/audio/fil/phonics/16/questions/1/hint.mp3 | Hanapin ang pusa. |
| assets/audio/fil/phonics/16/questions/1/option-1.mp3 | pusa |
| assets/audio/fil/phonics/16/questions/1/option-2.mp3 | ulan |
| assets/audio/fil/phonics/16/questions/1/option-3.mp3 | araw |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/16/questions/2/question.mp3 | Alin ang malaking titik P? |
| assets/audio/fil/phonics/16/questions/2/hint.mp3 | Tingnan ang unang titik ng pusa. |
| assets/audio/fil/phonics/16/questions/2/option-1.mp3 | U |
| assets/audio/fil/phonics/16/questions/2/option-2.mp3 | A |
| assets/audio/fil/phonics/16/questions/2/option-3.mp3 | P |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/16/questions/3/question.mp3 | Alin ang maliit na titik P? |
| assets/audio/fil/phonics/16/questions/3/hint.mp3 | Magkapareha ang P at p. |
| assets/audio/fil/phonics/16/questions/3/option-1.mp3 | a |
| assets/audio/fil/phonics/16/questions/3/option-2.mp3 | p |
| assets/audio/fil/phonics/16/questions/3/option-3.mp3 | u |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/16/questions/4/question.mp3 | Ano ang unang titik ng pusa? |
| assets/audio/fil/phonics/16/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: pusa. |
| assets/audio/fil/phonics/16/questions/4/option-1.mp3 | P |
| assets/audio/fil/phonics/16/questions/4/option-2.mp3 | A |
| assets/audio/fil/phonics/16/questions/4/option-3.mp3 | U |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/16/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/16/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/16/questions/5/option-1.mp3 | P u |
| assets/audio/fil/phonics/16/questions/5/option-2.mp3 | U p |
| assets/audio/fil/phonics/16/questions/5/option-3.mp3 | P p |

#### Yugto 17: Ang titik Q

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/17/lesson.mp3 | Ito ang malaking Q at maliit na q. Nagsisimula sa Q ang quilt. Ang quilt ay isang kumot na pinagtagpi-tagpi. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/17/questions/1/question.mp3 | Alin ang nagsisimula sa Q? |
| assets/audio/fil/phonics/17/questions/1/hint.mp3 | Hanapin ang quilt. |
| assets/audio/fil/phonics/17/questions/1/option-1.mp3 | quilt |
| assets/audio/fil/phonics/17/questions/1/option-2.mp3 | vase |
| assets/audio/fil/phonics/17/questions/1/option-3.mp3 | bola |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/17/questions/2/question.mp3 | Alin ang malaking titik Q? |
| assets/audio/fil/phonics/17/questions/2/hint.mp3 | Tingnan ang unang titik ng quilt. |
| assets/audio/fil/phonics/17/questions/2/option-1.mp3 | V |
| assets/audio/fil/phonics/17/questions/2/option-2.mp3 | B |
| assets/audio/fil/phonics/17/questions/2/option-3.mp3 | Q |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/17/questions/3/question.mp3 | Alin ang maliit na titik Q? |
| assets/audio/fil/phonics/17/questions/3/hint.mp3 | Magkapareha ang Q at q. |
| assets/audio/fil/phonics/17/questions/3/option-1.mp3 | b |
| assets/audio/fil/phonics/17/questions/3/option-2.mp3 | q |
| assets/audio/fil/phonics/17/questions/3/option-3.mp3 | v |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/17/questions/4/question.mp3 | Ano ang unang titik ng quilt? |
| assets/audio/fil/phonics/17/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: quilt. |
| assets/audio/fil/phonics/17/questions/4/option-1.mp3 | Q |
| assets/audio/fil/phonics/17/questions/4/option-2.mp3 | B |
| assets/audio/fil/phonics/17/questions/4/option-3.mp3 | V |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/17/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/17/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/17/questions/5/option-1.mp3 | Q v |
| assets/audio/fil/phonics/17/questions/5/option-2.mp3 | V q |
| assets/audio/fil/phonics/17/questions/5/option-3.mp3 | Q q |

#### Yugto 18: Ang titik R

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/18/lesson.mp3 | Ito ang malaking R at maliit na r. Nagsisimula sa R ang rosas. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/18/questions/1/question.mp3 | Alin ang nagsisimula sa R? |
| assets/audio/fil/phonics/18/questions/1/hint.mp3 | Hanapin ang rosas. |
| assets/audio/fil/phonics/18/questions/1/option-1.mp3 | rosas |
| assets/audio/fil/phonics/18/questions/1/option-2.mp3 | walis |
| assets/audio/fil/phonics/18/questions/1/option-3.mp3 | carrot |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/18/questions/2/question.mp3 | Alin ang malaking titik R? |
| assets/audio/fil/phonics/18/questions/2/hint.mp3 | Tingnan ang unang titik ng rosas. |
| assets/audio/fil/phonics/18/questions/2/option-1.mp3 | W |
| assets/audio/fil/phonics/18/questions/2/option-2.mp3 | C |
| assets/audio/fil/phonics/18/questions/2/option-3.mp3 | R |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/18/questions/3/question.mp3 | Alin ang maliit na titik R? |
| assets/audio/fil/phonics/18/questions/3/hint.mp3 | Magkapareha ang R at r. |
| assets/audio/fil/phonics/18/questions/3/option-1.mp3 | c |
| assets/audio/fil/phonics/18/questions/3/option-2.mp3 | r |
| assets/audio/fil/phonics/18/questions/3/option-3.mp3 | w |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/18/questions/4/question.mp3 | Ano ang unang titik ng rosas? |
| assets/audio/fil/phonics/18/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: rosas. |
| assets/audio/fil/phonics/18/questions/4/option-1.mp3 | R |
| assets/audio/fil/phonics/18/questions/4/option-2.mp3 | C |
| assets/audio/fil/phonics/18/questions/4/option-3.mp3 | W |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/18/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/18/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/18/questions/5/option-1.mp3 | R w |
| assets/audio/fil/phonics/18/questions/5/option-2.mp3 | W r |
| assets/audio/fil/phonics/18/questions/5/option-3.mp3 | R r |

#### Yugto 19: Ang titik S

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/19/lesson.mp3 | Ito ang malaking S at maliit na s. Nagsisimula sa S ang saging. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/19/questions/1/question.mp3 | Alin ang nagsisimula sa S? |
| assets/audio/fil/phonics/19/questions/1/hint.mp3 | Hanapin ang saging. |
| assets/audio/fil/phonics/19/questions/1/option-1.mp3 | saging |
| assets/audio/fil/phonics/19/questions/1/option-2.mp3 | x-ray |
| assets/audio/fil/phonics/19/questions/1/option-3.mp3 | dahon |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/19/questions/2/question.mp3 | Alin ang malaking titik S? |
| assets/audio/fil/phonics/19/questions/2/hint.mp3 | Tingnan ang unang titik ng saging. |
| assets/audio/fil/phonics/19/questions/2/option-1.mp3 | X |
| assets/audio/fil/phonics/19/questions/2/option-2.mp3 | D |
| assets/audio/fil/phonics/19/questions/2/option-3.mp3 | S |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/19/questions/3/question.mp3 | Alin ang maliit na titik S? |
| assets/audio/fil/phonics/19/questions/3/hint.mp3 | Magkapareha ang S at s. |
| assets/audio/fil/phonics/19/questions/3/option-1.mp3 | d |
| assets/audio/fil/phonics/19/questions/3/option-2.mp3 | s |
| assets/audio/fil/phonics/19/questions/3/option-3.mp3 | x |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/19/questions/4/question.mp3 | Ano ang unang titik ng saging? |
| assets/audio/fil/phonics/19/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: saging. |
| assets/audio/fil/phonics/19/questions/4/option-1.mp3 | S |
| assets/audio/fil/phonics/19/questions/4/option-2.mp3 | D |
| assets/audio/fil/phonics/19/questions/4/option-3.mp3 | X |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/19/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/19/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/19/questions/5/option-1.mp3 | S x |
| assets/audio/fil/phonics/19/questions/5/option-2.mp3 | X s |
| assets/audio/fil/phonics/19/questions/5/option-3.mp3 | S s |

#### Yugto 20: Ang titik T

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/20/lesson.mp3 | Ito ang malaking T at maliit na t. Nagsisimula sa T ang tasa. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/20/questions/1/question.mp3 | Alin ang nagsisimula sa T? |
| assets/audio/fil/phonics/20/questions/1/hint.mp3 | Hanapin ang tasa. |
| assets/audio/fil/phonics/20/questions/1/option-1.mp3 | tasa |
| assets/audio/fil/phonics/20/questions/1/option-2.mp3 | yoyo |
| assets/audio/fil/phonics/20/questions/1/option-3.mp3 | elepante |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/20/questions/2/question.mp3 | Alin ang malaking titik T? |
| assets/audio/fil/phonics/20/questions/2/hint.mp3 | Tingnan ang unang titik ng tasa. |
| assets/audio/fil/phonics/20/questions/2/option-1.mp3 | Y |
| assets/audio/fil/phonics/20/questions/2/option-2.mp3 | E |
| assets/audio/fil/phonics/20/questions/2/option-3.mp3 | T |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/20/questions/3/question.mp3 | Alin ang maliit na titik T? |
| assets/audio/fil/phonics/20/questions/3/hint.mp3 | Magkapareha ang T at t. |
| assets/audio/fil/phonics/20/questions/3/option-1.mp3 | e |
| assets/audio/fil/phonics/20/questions/3/option-2.mp3 | t |
| assets/audio/fil/phonics/20/questions/3/option-3.mp3 | y |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/20/questions/4/question.mp3 | Ano ang unang titik ng tasa? |
| assets/audio/fil/phonics/20/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: tasa. |
| assets/audio/fil/phonics/20/questions/4/option-1.mp3 | T |
| assets/audio/fil/phonics/20/questions/4/option-2.mp3 | E |
| assets/audio/fil/phonics/20/questions/4/option-3.mp3 | Y |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/20/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/20/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/20/questions/5/option-1.mp3 | T y |
| assets/audio/fil/phonics/20/questions/5/option-2.mp3 | Y t |
| assets/audio/fil/phonics/20/questions/5/option-3.mp3 | T t |

#### Yugto 21: Ang titik U

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/21/lesson.mp3 | Ito ang malaking U at maliit na u. Nagsisimula sa U ang ulan. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/21/questions/1/question.mp3 | Alin ang nagsisimula sa U? |
| assets/audio/fil/phonics/21/questions/1/hint.mp3 | Hanapin ang ulan. |
| assets/audio/fil/phonics/21/questions/1/option-1.mp3 | ulan |
| assets/audio/fil/phonics/21/questions/1/option-2.mp3 | zebra |
| assets/audio/fil/phonics/21/questions/1/option-3.mp3 | folder |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/21/questions/2/question.mp3 | Alin ang malaking titik U? |
| assets/audio/fil/phonics/21/questions/2/hint.mp3 | Tingnan ang unang titik ng ulan. |
| assets/audio/fil/phonics/21/questions/2/option-1.mp3 | Z |
| assets/audio/fil/phonics/21/questions/2/option-2.mp3 | F |
| assets/audio/fil/phonics/21/questions/2/option-3.mp3 | U |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/21/questions/3/question.mp3 | Alin ang maliit na titik U? |
| assets/audio/fil/phonics/21/questions/3/hint.mp3 | Magkapareha ang U at u. |
| assets/audio/fil/phonics/21/questions/3/option-1.mp3 | f |
| assets/audio/fil/phonics/21/questions/3/option-2.mp3 | u |
| assets/audio/fil/phonics/21/questions/3/option-3.mp3 | z |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/21/questions/4/question.mp3 | Ano ang unang titik ng ulan? |
| assets/audio/fil/phonics/21/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: ulan. |
| assets/audio/fil/phonics/21/questions/4/option-1.mp3 | U |
| assets/audio/fil/phonics/21/questions/4/option-2.mp3 | F |
| assets/audio/fil/phonics/21/questions/4/option-3.mp3 | Z |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/21/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/21/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/21/questions/5/option-1.mp3 | U z |
| assets/audio/fil/phonics/21/questions/5/option-2.mp3 | Z u |
| assets/audio/fil/phonics/21/questions/5/option-3.mp3 | U u |

#### Yugto 22: Ang titik V

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/22/lesson.mp3 | Ito ang malaking V at maliit na v. Nagsisimula sa V ang vase. Ang vase ay plorera sa Filipino. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/22/questions/1/question.mp3 | Alin ang nagsisimula sa V? |
| assets/audio/fil/phonics/22/questions/1/hint.mp3 | Hanapin ang vase. |
| assets/audio/fil/phonics/22/questions/1/option-1.mp3 | vase |
| assets/audio/fil/phonics/22/questions/1/option-2.mp3 | araw |
| assets/audio/fil/phonics/22/questions/1/option-3.mp3 | gatas |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/22/questions/2/question.mp3 | Alin ang malaking titik V? |
| assets/audio/fil/phonics/22/questions/2/hint.mp3 | Tingnan ang unang titik ng vase. |
| assets/audio/fil/phonics/22/questions/2/option-1.mp3 | A |
| assets/audio/fil/phonics/22/questions/2/option-2.mp3 | G |
| assets/audio/fil/phonics/22/questions/2/option-3.mp3 | V |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/22/questions/3/question.mp3 | Alin ang maliit na titik V? |
| assets/audio/fil/phonics/22/questions/3/hint.mp3 | Magkapareha ang V at v. |
| assets/audio/fil/phonics/22/questions/3/option-1.mp3 | g |
| assets/audio/fil/phonics/22/questions/3/option-2.mp3 | v |
| assets/audio/fil/phonics/22/questions/3/option-3.mp3 | a |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/22/questions/4/question.mp3 | Ano ang unang titik ng vase? |
| assets/audio/fil/phonics/22/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: vase. |
| assets/audio/fil/phonics/22/questions/4/option-1.mp3 | V |
| assets/audio/fil/phonics/22/questions/4/option-2.mp3 | G |
| assets/audio/fil/phonics/22/questions/4/option-3.mp3 | A |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/22/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/22/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/22/questions/5/option-1.mp3 | V a |
| assets/audio/fil/phonics/22/questions/5/option-2.mp3 | A v |
| assets/audio/fil/phonics/22/questions/5/option-3.mp3 | V v |

#### Yugto 23: Ang titik W

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/23/lesson.mp3 | Ito ang malaking W at maliit na w. Nagsisimula sa W ang walis. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/23/questions/1/question.mp3 | Alin ang nagsisimula sa W? |
| assets/audio/fil/phonics/23/questions/1/hint.mp3 | Hanapin ang walis. |
| assets/audio/fil/phonics/23/questions/1/option-1.mp3 | walis |
| assets/audio/fil/phonics/23/questions/1/option-2.mp3 | bola |
| assets/audio/fil/phonics/23/questions/1/option-3.mp3 | halaman |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/23/questions/2/question.mp3 | Alin ang malaking titik W? |
| assets/audio/fil/phonics/23/questions/2/hint.mp3 | Tingnan ang unang titik ng walis. |
| assets/audio/fil/phonics/23/questions/2/option-1.mp3 | B |
| assets/audio/fil/phonics/23/questions/2/option-2.mp3 | H |
| assets/audio/fil/phonics/23/questions/2/option-3.mp3 | W |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/23/questions/3/question.mp3 | Alin ang maliit na titik W? |
| assets/audio/fil/phonics/23/questions/3/hint.mp3 | Magkapareha ang W at w. |
| assets/audio/fil/phonics/23/questions/3/option-1.mp3 | h |
| assets/audio/fil/phonics/23/questions/3/option-2.mp3 | w |
| assets/audio/fil/phonics/23/questions/3/option-3.mp3 | b |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/23/questions/4/question.mp3 | Ano ang unang titik ng walis? |
| assets/audio/fil/phonics/23/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: walis. |
| assets/audio/fil/phonics/23/questions/4/option-1.mp3 | W |
| assets/audio/fil/phonics/23/questions/4/option-2.mp3 | H |
| assets/audio/fil/phonics/23/questions/4/option-3.mp3 | B |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/23/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/23/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/23/questions/5/option-1.mp3 | W b |
| assets/audio/fil/phonics/23/questions/5/option-2.mp3 | B w |
| assets/audio/fil/phonics/23/questions/5/option-3.mp3 | W w |

#### Yugto 24: Ang titik X

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/24/lesson.mp3 | Ito ang malaking X at maliit na x. Nagsisimula sa X ang x-ray. Ang x-ray ay larawang nagpapakita ng loob ng katawan. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/24/questions/1/question.mp3 | Alin ang nagsisimula sa X? |
| assets/audio/fil/phonics/24/questions/1/hint.mp3 | Hanapin ang x-ray. |
| assets/audio/fil/phonics/24/questions/1/option-1.mp3 | x-ray |
| assets/audio/fil/phonics/24/questions/1/option-2.mp3 | carrot |
| assets/audio/fil/phonics/24/questions/1/option-3.mp3 | isda |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/24/questions/2/question.mp3 | Alin ang malaking titik X? |
| assets/audio/fil/phonics/24/questions/2/hint.mp3 | Tingnan ang unang titik ng x-ray. |
| assets/audio/fil/phonics/24/questions/2/option-1.mp3 | C |
| assets/audio/fil/phonics/24/questions/2/option-2.mp3 | I |
| assets/audio/fil/phonics/24/questions/2/option-3.mp3 | X |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/24/questions/3/question.mp3 | Alin ang maliit na titik X? |
| assets/audio/fil/phonics/24/questions/3/hint.mp3 | Magkapareha ang X at x. |
| assets/audio/fil/phonics/24/questions/3/option-1.mp3 | i |
| assets/audio/fil/phonics/24/questions/3/option-2.mp3 | x |
| assets/audio/fil/phonics/24/questions/3/option-3.mp3 | c |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/24/questions/4/question.mp3 | Ano ang unang titik ng x-ray? |
| assets/audio/fil/phonics/24/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: x-ray. |
| assets/audio/fil/phonics/24/questions/4/option-1.mp3 | X |
| assets/audio/fil/phonics/24/questions/4/option-2.mp3 | I |
| assets/audio/fil/phonics/24/questions/4/option-3.mp3 | C |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/24/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/24/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/24/questions/5/option-1.mp3 | X c |
| assets/audio/fil/phonics/24/questions/5/option-2.mp3 | C x |
| assets/audio/fil/phonics/24/questions/5/option-3.mp3 | X x |

#### Yugto 25: Ang titik Y

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/25/lesson.mp3 | Ito ang malaking Y at maliit na y. Nagsisimula sa Y ang yoyo. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/25/questions/1/question.mp3 | Alin ang nagsisimula sa Y? |
| assets/audio/fil/phonics/25/questions/1/hint.mp3 | Hanapin ang yoyo. |
| assets/audio/fil/phonics/25/questions/1/option-1.mp3 | yoyo |
| assets/audio/fil/phonics/25/questions/1/option-2.mp3 | dahon |
| assets/audio/fil/phonics/25/questions/1/option-3.mp3 | jeep |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/25/questions/2/question.mp3 | Alin ang malaking titik Y? |
| assets/audio/fil/phonics/25/questions/2/hint.mp3 | Tingnan ang unang titik ng yoyo. |
| assets/audio/fil/phonics/25/questions/2/option-1.mp3 | D |
| assets/audio/fil/phonics/25/questions/2/option-2.mp3 | J |
| assets/audio/fil/phonics/25/questions/2/option-3.mp3 | Y |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/25/questions/3/question.mp3 | Alin ang maliit na titik Y? |
| assets/audio/fil/phonics/25/questions/3/hint.mp3 | Magkapareha ang Y at y. |
| assets/audio/fil/phonics/25/questions/3/option-1.mp3 | j |
| assets/audio/fil/phonics/25/questions/3/option-2.mp3 | y |
| assets/audio/fil/phonics/25/questions/3/option-3.mp3 | d |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/25/questions/4/question.mp3 | Ano ang unang titik ng yoyo? |
| assets/audio/fil/phonics/25/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: yoyo. |
| assets/audio/fil/phonics/25/questions/4/option-1.mp3 | Y |
| assets/audio/fil/phonics/25/questions/4/option-2.mp3 | J |
| assets/audio/fil/phonics/25/questions/4/option-3.mp3 | D |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/25/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/25/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/25/questions/5/option-1.mp3 | Y d |
| assets/audio/fil/phonics/25/questions/5/option-2.mp3 | D y |
| assets/audio/fil/phonics/25/questions/5/option-3.mp3 | Y y |

#### Yugto 26: Ang titik Z

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/26/lesson.mp3 | Ito ang malaking Z at maliit na z. Nagsisimula sa Z ang zebra. Ang zebra ay hayop na may guhit na itim at puti. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/26/questions/1/question.mp3 | Alin ang nagsisimula sa Z? |
| assets/audio/fil/phonics/26/questions/1/hint.mp3 | Hanapin ang zebra. |
| assets/audio/fil/phonics/26/questions/1/option-1.mp3 | zebra |
| assets/audio/fil/phonics/26/questions/1/option-2.mp3 | elepante |
| assets/audio/fil/phonics/26/questions/1/option-3.mp3 | kamay |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/26/questions/2/question.mp3 | Alin ang malaking titik Z? |
| assets/audio/fil/phonics/26/questions/2/hint.mp3 | Tingnan ang unang titik ng zebra. |
| assets/audio/fil/phonics/26/questions/2/option-1.mp3 | E |
| assets/audio/fil/phonics/26/questions/2/option-2.mp3 | K |
| assets/audio/fil/phonics/26/questions/2/option-3.mp3 | Z |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/26/questions/3/question.mp3 | Alin ang maliit na titik Z? |
| assets/audio/fil/phonics/26/questions/3/hint.mp3 | Magkapareha ang Z at z. |
| assets/audio/fil/phonics/26/questions/3/option-1.mp3 | k |
| assets/audio/fil/phonics/26/questions/3/option-2.mp3 | z |
| assets/audio/fil/phonics/26/questions/3/option-3.mp3 | e |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/26/questions/4/question.mp3 | Ano ang unang titik ng zebra? |
| assets/audio/fil/phonics/26/questions/4/hint.mp3 | Ulitin ang pangalan ng larawan: zebra. |
| assets/audio/fil/phonics/26/questions/4/option-1.mp3 | Z |
| assets/audio/fil/phonics/26/questions/4/option-2.mp3 | K |
| assets/audio/fil/phonics/26/questions/4/option-3.mp3 | E |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/26/questions/5/question.mp3 | Aling pares ng titik ang magkapareha? |
| assets/audio/fil/phonics/26/questions/5/hint.mp3 | Piliin ang malaki at maliit na anyo ng iisang titik. |
| assets/audio/fil/phonics/26/questions/5/option-1.mp3 | Z e |
| assets/audio/fil/phonics/26/questions/5/option-2.mp3 | E z |
| assets/audio/fil/phonics/26/questions/5/option-3.mp3 | Z z |

#### Yugto 27: Buuin ang bata

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/27/lesson.mp3 | Pagsamahin ang mga pantig: ba at ta. ba-ta — bata! |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/27/questions/1/question.mp3 | Anong salita ang mabubuo? |
| assets/audio/fil/phonics/27/questions/1/hint.mp3 | Pagsamahin ang dalawang pantig. |
| assets/audio/fil/phonics/27/questions/1/option-1.mp3 | bata |
| assets/audio/fil/phonics/27/questions/1/option-2.mp3 | mesa |
| assets/audio/fil/phonics/27/questions/1/option-3.mp3 | lobo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/27/questions/2/question.mp3 | Ano ang unang pantig ng bata? |
| assets/audio/fil/phonics/27/questions/2/hint.mp3 | Simulan sa ba. |
| assets/audio/fil/phonics/27/questions/2/option-1.mp3 | ta |
| assets/audio/fil/phonics/27/questions/2/option-2.mp3 | mi |
| assets/audio/fil/phonics/27/questions/2/option-3.mp3 | ba |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/27/questions/3/question.mp3 | Ano ang huling pantig ng bata? |
| assets/audio/fil/phonics/27/questions/3/hint.mp3 | Ang huling bahagi ay ta. |
| assets/audio/fil/phonics/27/questions/3/option-1.mp3 | ko |
| assets/audio/fil/phonics/27/questions/3/option-2.mp3 | ta |
| assets/audio/fil/phonics/27/questions/3/option-3.mp3 | ba |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/27/questions/4/question.mp3 | Ano ang unang titik ng bata? |
| assets/audio/fil/phonics/27/questions/4/hint.mp3 | Tingnan ang simula ng salita. |
| assets/audio/fil/phonics/27/questions/4/option-1.mp3 | b |
| assets/audio/fil/phonics/27/questions/4/option-2.mp3 | t |
| assets/audio/fil/phonics/27/questions/4/option-3.mp3 | e |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/27/questions/5/question.mp3 | Alin ang salitang nasa larawan? |
| assets/audio/fil/phonics/27/questions/5/hint.mp3 | Ito ay bata. |
| assets/audio/fil/phonics/27/questions/5/option-1.mp3 | mesa |
| assets/audio/fil/phonics/27/questions/5/option-2.mp3 | lobo |
| assets/audio/fil/phonics/27/questions/5/option-3.mp3 | bata |

#### Yugto 28: Buuin ang pusa

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/28/lesson.mp3 | Pagsamahin ang mga pantig: pu at sa. pu-sa — pusa! |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/28/questions/1/question.mp3 | Anong salita ang mabubuo? |
| assets/audio/fil/phonics/28/questions/1/hint.mp3 | Pagsamahin ang dalawang pantig. |
| assets/audio/fil/phonics/28/questions/1/option-1.mp3 | pusa |
| assets/audio/fil/phonics/28/questions/1/option-2.mp3 | mesa |
| assets/audio/fil/phonics/28/questions/1/option-3.mp3 | lobo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/28/questions/2/question.mp3 | Ano ang unang pantig ng pusa? |
| assets/audio/fil/phonics/28/questions/2/hint.mp3 | Simulan sa pu. |
| assets/audio/fil/phonics/28/questions/2/option-1.mp3 | sa |
| assets/audio/fil/phonics/28/questions/2/option-2.mp3 | mi |
| assets/audio/fil/phonics/28/questions/2/option-3.mp3 | pu |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/28/questions/3/question.mp3 | Ano ang huling pantig ng pusa? |
| assets/audio/fil/phonics/28/questions/3/hint.mp3 | Ang huling bahagi ay sa. |
| assets/audio/fil/phonics/28/questions/3/option-1.mp3 | ko |
| assets/audio/fil/phonics/28/questions/3/option-2.mp3 | sa |
| assets/audio/fil/phonics/28/questions/3/option-3.mp3 | pu |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/28/questions/4/question.mp3 | Ano ang unang titik ng pusa? |
| assets/audio/fil/phonics/28/questions/4/hint.mp3 | Tingnan ang simula ng salita. |
| assets/audio/fil/phonics/28/questions/4/option-1.mp3 | p |
| assets/audio/fil/phonics/28/questions/4/option-2.mp3 | s |
| assets/audio/fil/phonics/28/questions/4/option-3.mp3 | e |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/28/questions/5/question.mp3 | Alin ang salitang nasa larawan? |
| assets/audio/fil/phonics/28/questions/5/hint.mp3 | Ito ay pusa. |
| assets/audio/fil/phonics/28/questions/5/option-1.mp3 | mesa |
| assets/audio/fil/phonics/28/questions/5/option-2.mp3 | lobo |
| assets/audio/fil/phonics/28/questions/5/option-3.mp3 | pusa |

#### Yugto 29: Buuin ang saging

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/29/lesson.mp3 | Pagsamahin ang mga pantig: sa at ging. sa-ging — saging! |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/29/questions/1/question.mp3 | Anong salita ang mabubuo? |
| assets/audio/fil/phonics/29/questions/1/hint.mp3 | Pagsamahin ang dalawang pantig. |
| assets/audio/fil/phonics/29/questions/1/option-1.mp3 | saging |
| assets/audio/fil/phonics/29/questions/1/option-2.mp3 | mesa |
| assets/audio/fil/phonics/29/questions/1/option-3.mp3 | lobo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/29/questions/2/question.mp3 | Ano ang unang pantig ng saging? |
| assets/audio/fil/phonics/29/questions/2/hint.mp3 | Simulan sa sa. |
| assets/audio/fil/phonics/29/questions/2/option-1.mp3 | ging |
| assets/audio/fil/phonics/29/questions/2/option-2.mp3 | mi |
| assets/audio/fil/phonics/29/questions/2/option-3.mp3 | sa |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/29/questions/3/question.mp3 | Ano ang huling pantig ng saging? |
| assets/audio/fil/phonics/29/questions/3/hint.mp3 | Ang huling bahagi ay ging. |
| assets/audio/fil/phonics/29/questions/3/option-1.mp3 | ko |
| assets/audio/fil/phonics/29/questions/3/option-2.mp3 | ging |
| assets/audio/fil/phonics/29/questions/3/option-3.mp3 | sa |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/29/questions/4/question.mp3 | Ano ang unang titik ng saging? |
| assets/audio/fil/phonics/29/questions/4/hint.mp3 | Tingnan ang simula ng salita. |
| assets/audio/fil/phonics/29/questions/4/option-1.mp3 | s |
| assets/audio/fil/phonics/29/questions/4/option-2.mp3 | g |
| assets/audio/fil/phonics/29/questions/4/option-3.mp3 | e |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/29/questions/5/question.mp3 | Alin ang salitang nasa larawan? |
| assets/audio/fil/phonics/29/questions/5/hint.mp3 | Ito ay saging. |
| assets/audio/fil/phonics/29/questions/5/option-1.mp3 | mesa |
| assets/audio/fil/phonics/29/questions/5/option-2.mp3 | lobo |
| assets/audio/fil/phonics/29/questions/5/option-3.mp3 | saging |

#### Yugto 30: Buuin ang bahay

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/30/lesson.mp3 | Pagsamahin ang mga pantig: ba at hay. ba-hay — bahay! |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/30/questions/1/question.mp3 | Anong salita ang mabubuo? |
| assets/audio/fil/phonics/30/questions/1/hint.mp3 | Pagsamahin ang dalawang pantig. |
| assets/audio/fil/phonics/30/questions/1/option-1.mp3 | bahay |
| assets/audio/fil/phonics/30/questions/1/option-2.mp3 | mesa |
| assets/audio/fil/phonics/30/questions/1/option-3.mp3 | lobo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/30/questions/2/question.mp3 | Ano ang unang pantig ng bahay? |
| assets/audio/fil/phonics/30/questions/2/hint.mp3 | Simulan sa ba. |
| assets/audio/fil/phonics/30/questions/2/option-1.mp3 | hay |
| assets/audio/fil/phonics/30/questions/2/option-2.mp3 | mi |
| assets/audio/fil/phonics/30/questions/2/option-3.mp3 | ba |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/30/questions/3/question.mp3 | Ano ang huling pantig ng bahay? |
| assets/audio/fil/phonics/30/questions/3/hint.mp3 | Ang huling bahagi ay hay. |
| assets/audio/fil/phonics/30/questions/3/option-1.mp3 | ko |
| assets/audio/fil/phonics/30/questions/3/option-2.mp3 | hay |
| assets/audio/fil/phonics/30/questions/3/option-3.mp3 | ba |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/30/questions/4/question.mp3 | Ano ang unang titik ng bahay? |
| assets/audio/fil/phonics/30/questions/4/hint.mp3 | Tingnan ang simula ng salita. |
| assets/audio/fil/phonics/30/questions/4/option-1.mp3 | b |
| assets/audio/fil/phonics/30/questions/4/option-2.mp3 | h |
| assets/audio/fil/phonics/30/questions/4/option-3.mp3 | e |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/30/questions/5/question.mp3 | Alin ang salitang nasa larawan? |
| assets/audio/fil/phonics/30/questions/5/hint.mp3 | Ito ay bahay. |
| assets/audio/fil/phonics/30/questions/5/option-1.mp3 | mesa |
| assets/audio/fil/phonics/30/questions/5/option-2.mp3 | lobo |
| assets/audio/fil/phonics/30/questions/5/option-3.mp3 | bahay |

#### Yugto 31: Basahin: ako at ikaw

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/31/lesson.mp3 | Ang ako ay tumutukoy sa sarili. Ang ikaw ay tumutukoy sa kausap. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/31/questions/1/question.mp3 | Piliin ang salitang ako. |
| assets/audio/fil/phonics/31/questions/1/hint.mp3 | Tingnan ang mga titik a-k-o. |
| assets/audio/fil/phonics/31/questions/1/option-1.mp3 | ako |
| assets/audio/fil/phonics/31/questions/1/option-2.mp3 | ikaw |
| assets/audio/fil/phonics/31/questions/1/option-3.mp3 | si |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/31/questions/2/question.mp3 | Piliin ang salitang ikaw. |
| assets/audio/fil/phonics/31/questions/2/hint.mp3 | Nagsisimula ito sa i. |
| assets/audio/fil/phonics/31/questions/2/option-1.mp3 | ako |
| assets/audio/fil/phonics/31/questions/2/option-2.mp3 | ang |
| assets/audio/fil/phonics/31/questions/2/option-3.mp3 | ikaw |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/31/questions/3/question.mp3 | Ano ang tumutukoy sa sarili? |
| assets/audio/fil/phonics/31/questions/3/hint.mp3 | Kapag itinuturo mo ang iyong sarili. |
| assets/audio/fil/phonics/31/questions/3/option-1.mp3 | si |
| assets/audio/fil/phonics/31/questions/3/option-2.mp3 | ako |
| assets/audio/fil/phonics/31/questions/3/option-3.mp3 | ikaw |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/31/questions/4/question.mp3 | Ano ang tumutukoy sa kausap? |
| assets/audio/fil/phonics/31/questions/4/hint.mp3 | Ito ang salitang ginagamit para sa taong kausap mo. |
| assets/audio/fil/phonics/31/questions/4/option-1.mp3 | ikaw |
| assets/audio/fil/phonics/31/questions/4/option-2.mp3 | ako |
| assets/audio/fil/phonics/31/questions/4/option-3.mp3 | ang |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/31/questions/5/question.mp3 | Buuin: ___ ay bata. (Tinutukoy ang sarili.) |
| assets/audio/fil/phonics/31/questions/5/hint.mp3 | Magsimula sa Ako. |
| assets/audio/fil/phonics/31/questions/5/option-1.mp3 | Si |
| assets/audio/fil/phonics/31/questions/5/option-2.mp3 | Ang |
| assets/audio/fil/phonics/31/questions/5/option-3.mp3 | Ako |

#### Yugto 32: Basahin: si at ang

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/32/lesson.mp3 | Ginagamit ang si bago ang pangalan ng tao. Ginagamit ang ang bago ang pangngalan. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/32/questions/1/question.mp3 | Piliin ang salitang si. |
| assets/audio/fil/phonics/32/questions/1/hint.mp3 | May dalawang titik: s-i. |
| assets/audio/fil/phonics/32/questions/1/option-1.mp3 | si |
| assets/audio/fil/phonics/32/questions/1/option-2.mp3 | ang |
| assets/audio/fil/phonics/32/questions/1/option-3.mp3 | ako |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/32/questions/2/question.mp3 | Piliin ang salitang ang. |
| assets/audio/fil/phonics/32/questions/2/hint.mp3 | Tingnan ang pagkakasulat ng salitang ang. |
| assets/audio/fil/phonics/32/questions/2/option-1.mp3 | si |
| assets/audio/fil/phonics/32/questions/2/option-2.mp3 | ikaw |
| assets/audio/fil/phonics/32/questions/2/option-3.mp3 | ang |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/32/questions/3/question.mp3 | Buuin: ___ Ana ay mabait. |
| assets/audio/fil/phonics/32/questions/3/hint.mp3 | Ginagamit ito bago ang pangalan ng tao. |
| assets/audio/fil/phonics/32/questions/3/option-1.mp3 | Ako |
| assets/audio/fil/phonics/32/questions/3/option-2.mp3 | Si |
| assets/audio/fil/phonics/32/questions/3/option-3.mp3 | Ang |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/32/questions/4/question.mp3 | Buuin: ___ bola ay bilog. |
| assets/audio/fil/phonics/32/questions/4/hint.mp3 | Ginagamit ito bago ang pangngalang bola. |
| assets/audio/fil/phonics/32/questions/4/option-1.mp3 | Ang |
| assets/audio/fil/phonics/32/questions/4/option-2.mp3 | Si |
| assets/audio/fil/phonics/32/questions/4/option-3.mp3 | Ikaw |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/32/questions/5/question.mp3 | Buuin: ___ Ben ay bata. |
| assets/audio/fil/phonics/32/questions/5/hint.mp3 | Ben ang pangalan ng tao. |
| assets/audio/fil/phonics/32/questions/5/option-1.mp3 | Ang |
| assets/audio/fil/phonics/32/questions/5/option-2.mp3 | Ako |
| assets/audio/fil/phonics/32/questions/5/option-3.mp3 | Si |

#### Yugto 33: Balik-tanaw sa mga titik

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/33/lesson.mp3 | Balikan ang mga titik at mga salitang natutuhan natin. Kaya mo ito! |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/33/questions/1/question.mp3 | Alin ang nagsisimula sa A? |
| assets/audio/fil/phonics/33/questions/1/hint.mp3 | Hanapin ang araw. |
| assets/audio/fil/phonics/33/questions/1/option-1.mp3 | araw |
| assets/audio/fil/phonics/33/questions/1/option-2.mp3 | folder |
| assets/audio/fil/phonics/33/questions/1/option-3.mp3 | lapis |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/33/questions/2/question.mp3 | Alin ang nagsisimula sa F? |
| assets/audio/fil/phonics/33/questions/2/hint.mp3 | Hanapin ang folder. |
| assets/audio/fil/phonics/33/questions/2/option-1.mp3 | kamay |
| assets/audio/fil/phonics/33/questions/2/option-2.mp3 | quilt |
| assets/audio/fil/phonics/33/questions/2/option-3.mp3 | folder |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/33/questions/3/question.mp3 | Alin ang nagsisimula sa M? |
| assets/audio/fil/phonics/33/questions/3/hint.mp3 | Hanapin ang mangga. |
| assets/audio/fil/phonics/33/questions/3/option-1.mp3 | x-ray |
| assets/audio/fil/phonics/33/questions/3/option-2.mp3 | mangga |
| assets/audio/fil/phonics/33/questions/3/option-3.mp3 | rosas |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/33/questions/4/question.mp3 | Alin ang nagsisimula sa U? |
| assets/audio/fil/phonics/33/questions/4/hint.mp3 | Hanapin ang ulan. |
| assets/audio/fil/phonics/33/questions/4/option-1.mp3 | ulan |
| assets/audio/fil/phonics/33/questions/4/option-2.mp3 | zebra |
| assets/audio/fil/phonics/33/questions/4/option-3.mp3 | folder |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/phonics/33/questions/5/question.mp3 | Alin ang nagsisimula sa Z? |
| assets/audio/fil/phonics/33/questions/5/hint.mp3 | Hanapin ang zebra. |
| assets/audio/fil/phonics/33/questions/5/option-1.mp3 | elepante |
| assets/audio/fil/phonics/33/questions/5/option-2.mp3 | kamay |
| assets/audio/fil/phonics/33/questions/5/option-3.mp3 | zebra |


---

## BILANG — Pagbibilang

**Direksiyon ng boses:** Masayahin at matiyaga. Bigkasin nang buo ang mga bilang at huwag magmadali sa pagbibilang.

**Mundo:** Pulo ng mga Bilang. **Mga yugto:** 15.

### Opsyonal na pang-interface na linya

**Hiwalay ito sa mga naka-link na lesson recording.** Ang mga path sa ibaba ay mungkahing delivery filenames; hindi pa sila pinapatugtog ng kasalukuyang app. Puwedeng ihuli ang mga ito. Ang paglagay ng MP3 sa mga path na ito ay hindi pa awtomatikong papalit sa TTS.

| Mungkahing filename | Linyang bibigkasin | Gamit / katayuan |
| --- | --- | --- |
| assets/audio/fil/shared/bilang/correct.mp3 | Mahusay! Ang galing mo! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/bilang/retry.mp3 | Kaya mo iyan. Subukan muli! | Kasalukuyang TTS; papalitan ng recording sa susunod na integration. |
| assets/audio/fil/shared/bilang/map-welcome.mp3 | Tara, tuklasin natin! Isang yugto, isang bagong galing. | Nasa speech bubble; text lamang sa kasalukuyan. |
| assets/audio/fil/shared/bilang/encourage.mp3 | Kaya mo iyan! Sasamahan kita. | Nasa mapa; text lamang sa kasalukuyan. |

### Mga aralin at pagsasanay — naka-link na recording slots

Ang mga sumusunod na filename ay kasalukuyang hinihingi ng app kapag pinindot ang speaker, hint, o answer option.

#### Yugto 1: Mga bilang 1 at 2

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/1/lesson.mp3 | Ito ang isa (1) at dalawa (2). Bilangin ang bawat bituin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/1/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/1/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/1/questions/1/option-1.mp3 | Isa |
| assets/audio/fil/numbers/1/questions/1/option-2.mp3 | Dalawa |
| assets/audio/fil/numbers/1/questions/1/option-3.mp3 | Sero |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/1/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/1/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/1/questions/2/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/1/questions/2/option-2.mp3 | Isa |
| assets/audio/fil/numbers/1/questions/2/option-3.mp3 | Dalawa |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/1/questions/3/question.mp3 | Alin ang bilang na isa? |
| assets/audio/fil/numbers/1/questions/3/hint.mp3 | Hanapin ang numerong 1. |
| assets/audio/fil/numbers/1/questions/3/option-1.mp3 | Sero |
| assets/audio/fil/numbers/1/questions/3/option-2.mp3 | Isa |
| assets/audio/fil/numbers/1/questions/3/option-3.mp3 | Dalawa |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/1/questions/4/question.mp3 | Alin ang bilang na dalawa? |
| assets/audio/fil/numbers/1/questions/4/hint.mp3 | Hanapin ang numerong 2. |
| assets/audio/fil/numbers/1/questions/4/option-1.mp3 | Dalawa |
| assets/audio/fil/numbers/1/questions/4/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/1/questions/4/option-3.mp3 | Isa |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/1/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/1/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/1/questions/5/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/1/questions/5/option-2.mp3 | Isa |
| assets/audio/fil/numbers/1/questions/5/option-3.mp3 | Dalawa |

#### Yugto 2: Mga bilang 3 at 4

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/2/lesson.mp3 | Ito ang tatlo (3) at apat (4). Bilangin ang bawat bituin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/2/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/2/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/2/questions/1/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/2/questions/1/option-2.mp3 | Apat |
| assets/audio/fil/numbers/2/questions/1/option-3.mp3 | Dalawa |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/2/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/2/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/2/questions/2/option-1.mp3 | Lima |
| assets/audio/fil/numbers/2/questions/2/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/2/questions/2/option-3.mp3 | Apat |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/2/questions/3/question.mp3 | Alin ang bilang na tatlo? |
| assets/audio/fil/numbers/2/questions/3/hint.mp3 | Hanapin ang numerong 3. |
| assets/audio/fil/numbers/2/questions/3/option-1.mp3 | Dalawa |
| assets/audio/fil/numbers/2/questions/3/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/2/questions/3/option-3.mp3 | Apat |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/2/questions/4/question.mp3 | Alin ang bilang na apat? |
| assets/audio/fil/numbers/2/questions/4/hint.mp3 | Hanapin ang numerong 4. |
| assets/audio/fil/numbers/2/questions/4/option-1.mp3 | Apat |
| assets/audio/fil/numbers/2/questions/4/option-2.mp3 | Lima |
| assets/audio/fil/numbers/2/questions/4/option-3.mp3 | Tatlo |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/2/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/2/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/2/questions/5/option-1.mp3 | Lima |
| assets/audio/fil/numbers/2/questions/5/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/2/questions/5/option-3.mp3 | Apat |

#### Yugto 3: Mga bilang 5 at 6

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/3/lesson.mp3 | Ito ang lima (5) at anim (6). Bilangin ang bawat bituin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/3/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/3/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/3/questions/1/option-1.mp3 | Lima |
| assets/audio/fil/numbers/3/questions/1/option-2.mp3 | Anim |
| assets/audio/fil/numbers/3/questions/1/option-3.mp3 | Apat |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/3/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/3/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/3/questions/2/option-1.mp3 | Pito |
| assets/audio/fil/numbers/3/questions/2/option-2.mp3 | Lima |
| assets/audio/fil/numbers/3/questions/2/option-3.mp3 | Anim |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/3/questions/3/question.mp3 | Alin ang bilang na lima? |
| assets/audio/fil/numbers/3/questions/3/hint.mp3 | Hanapin ang numerong 5. |
| assets/audio/fil/numbers/3/questions/3/option-1.mp3 | Apat |
| assets/audio/fil/numbers/3/questions/3/option-2.mp3 | Lima |
| assets/audio/fil/numbers/3/questions/3/option-3.mp3 | Anim |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/3/questions/4/question.mp3 | Alin ang bilang na anim? |
| assets/audio/fil/numbers/3/questions/4/hint.mp3 | Hanapin ang numerong 6. |
| assets/audio/fil/numbers/3/questions/4/option-1.mp3 | Anim |
| assets/audio/fil/numbers/3/questions/4/option-2.mp3 | Pito |
| assets/audio/fil/numbers/3/questions/4/option-3.mp3 | Lima |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/3/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/3/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/3/questions/5/option-1.mp3 | Pito |
| assets/audio/fil/numbers/3/questions/5/option-2.mp3 | Lima |
| assets/audio/fil/numbers/3/questions/5/option-3.mp3 | Anim |

#### Yugto 4: Mga bilang 7 at 8

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/4/lesson.mp3 | Ito ang pito (7) at walo (8). Bilangin ang bawat bituin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/4/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/4/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/4/questions/1/option-1.mp3 | Pito |
| assets/audio/fil/numbers/4/questions/1/option-2.mp3 | Walo |
| assets/audio/fil/numbers/4/questions/1/option-3.mp3 | Anim |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/4/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/4/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/4/questions/2/option-1.mp3 | Siyam |
| assets/audio/fil/numbers/4/questions/2/option-2.mp3 | Pito |
| assets/audio/fil/numbers/4/questions/2/option-3.mp3 | Walo |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/4/questions/3/question.mp3 | Alin ang bilang na pito? |
| assets/audio/fil/numbers/4/questions/3/hint.mp3 | Hanapin ang numerong 7. |
| assets/audio/fil/numbers/4/questions/3/option-1.mp3 | Anim |
| assets/audio/fil/numbers/4/questions/3/option-2.mp3 | Pito |
| assets/audio/fil/numbers/4/questions/3/option-3.mp3 | Walo |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/4/questions/4/question.mp3 | Alin ang bilang na walo? |
| assets/audio/fil/numbers/4/questions/4/hint.mp3 | Hanapin ang numerong 8. |
| assets/audio/fil/numbers/4/questions/4/option-1.mp3 | Walo |
| assets/audio/fil/numbers/4/questions/4/option-2.mp3 | Siyam |
| assets/audio/fil/numbers/4/questions/4/option-3.mp3 | Pito |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/4/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/4/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/4/questions/5/option-1.mp3 | Siyam |
| assets/audio/fil/numbers/4/questions/5/option-2.mp3 | Pito |
| assets/audio/fil/numbers/4/questions/5/option-3.mp3 | Walo |

#### Yugto 5: Mga bilang 9 at 10

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/5/lesson.mp3 | Ito ang siyam (9) at sampu (10). Bilangin ang bawat bituin. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/5/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/5/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/5/questions/1/option-1.mp3 | Siyam |
| assets/audio/fil/numbers/5/questions/1/option-2.mp3 | Sampu |
| assets/audio/fil/numbers/5/questions/1/option-3.mp3 | Walo |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/5/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/5/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/5/questions/2/option-1.mp3 | Walo |
| assets/audio/fil/numbers/5/questions/2/option-2.mp3 | Siyam |
| assets/audio/fil/numbers/5/questions/2/option-3.mp3 | Sampu |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/5/questions/3/question.mp3 | Alin ang bilang na siyam? |
| assets/audio/fil/numbers/5/questions/3/hint.mp3 | Hanapin ang numerong 9. |
| assets/audio/fil/numbers/5/questions/3/option-1.mp3 | Walo |
| assets/audio/fil/numbers/5/questions/3/option-2.mp3 | Siyam |
| assets/audio/fil/numbers/5/questions/3/option-3.mp3 | Sampu |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/5/questions/4/question.mp3 | Alin ang bilang na sampu? |
| assets/audio/fil/numbers/5/questions/4/hint.mp3 | Hanapin ang numerong 10. |
| assets/audio/fil/numbers/5/questions/4/option-1.mp3 | Sampu |
| assets/audio/fil/numbers/5/questions/4/option-2.mp3 | Walo |
| assets/audio/fil/numbers/5/questions/4/option-3.mp3 | Siyam |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/5/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/5/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/5/questions/5/option-1.mp3 | Walo |
| assets/audio/fil/numbers/5/questions/5/option-2.mp3 | Siyam |
| assets/audio/fil/numbers/5/questions/5/option-3.mp3 | Sampu |

#### Yugto 6: Bilangin ang mga bituin

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/6/lesson.mp3 | Bilangin nang isa-isa. Ang huling bilang ang nagsasabi kung ilan ang lahat. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/6/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/6/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/6/questions/1/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/6/questions/1/option-2.mp3 | Apat |
| assets/audio/fil/numbers/6/questions/1/option-3.mp3 | Dalawa |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/6/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/6/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/6/questions/2/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/6/questions/2/option-2.mp3 | Isa |
| assets/audio/fil/numbers/6/questions/2/option-3.mp3 | Dalawa |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/6/questions/3/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/6/questions/3/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/6/questions/3/option-1.mp3 | Sero |
| assets/audio/fil/numbers/6/questions/3/option-2.mp3 | Isa |
| assets/audio/fil/numbers/6/questions/3/option-3.mp3 | Dalawa |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/6/questions/4/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/6/questions/4/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/6/questions/4/option-1.mp3 | Apat |
| assets/audio/fil/numbers/6/questions/4/option-2.mp3 | Lima |
| assets/audio/fil/numbers/6/questions/4/option-3.mp3 | Tatlo |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/6/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/6/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/6/questions/5/option-1.mp3 | Apat |
| assets/audio/fil/numbers/6/questions/5/option-2.mp3 | Dalawa |
| assets/audio/fil/numbers/6/questions/5/option-3.mp3 | Tatlo |

#### Yugto 7: Bilangin ang mga prutas

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/7/lesson.mp3 | Bilangin nang isa-isa. Ang huling bilang ang nagsasabi kung ilan ang lahat. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/7/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/7/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/7/questions/1/option-1.mp3 | Lima |
| assets/audio/fil/numbers/7/questions/1/option-2.mp3 | Anim |
| assets/audio/fil/numbers/7/questions/1/option-3.mp3 | Apat |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/7/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/7/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/7/questions/2/option-1.mp3 | Lima |
| assets/audio/fil/numbers/7/questions/2/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/7/questions/2/option-3.mp3 | Apat |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/7/questions/3/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/7/questions/3/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/7/questions/3/option-1.mp3 | Dalawa |
| assets/audio/fil/numbers/7/questions/3/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/7/questions/3/option-3.mp3 | Apat |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/7/questions/4/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/7/questions/4/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/7/questions/4/option-1.mp3 | Anim |
| assets/audio/fil/numbers/7/questions/4/option-2.mp3 | Pito |
| assets/audio/fil/numbers/7/questions/4/option-3.mp3 | Lima |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/7/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/7/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/7/questions/5/option-1.mp3 | Anim |
| assets/audio/fil/numbers/7/questions/5/option-2.mp3 | Apat |
| assets/audio/fil/numbers/7/questions/5/option-3.mp3 | Lima |

#### Yugto 8: Bilangin ang mga bulaklak

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/8/lesson.mp3 | Bilangin nang isa-isa. Ang huling bilang ang nagsasabi kung ilan ang lahat. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/8/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/8/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/8/questions/1/option-1.mp3 | Sampu |
| assets/audio/fil/numbers/8/questions/1/option-2.mp3 | Walo |
| assets/audio/fil/numbers/8/questions/1/option-3.mp3 | Siyam |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/8/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/8/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/8/questions/2/option-1.mp3 | Sampu |
| assets/audio/fil/numbers/8/questions/2/option-2.mp3 | Walo |
| assets/audio/fil/numbers/8/questions/2/option-3.mp3 | Siyam |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/8/questions/3/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/8/questions/3/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/8/questions/3/option-1.mp3 | Pito |
| assets/audio/fil/numbers/8/questions/3/option-2.mp3 | Walo |
| assets/audio/fil/numbers/8/questions/3/option-3.mp3 | Siyam |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/8/questions/4/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/8/questions/4/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/8/questions/4/option-1.mp3 | Sampu |
| assets/audio/fil/numbers/8/questions/4/option-2.mp3 | Walo |
| assets/audio/fil/numbers/8/questions/4/option-3.mp3 | Siyam |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/8/questions/5/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/8/questions/5/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/8/questions/5/option-1.mp3 | Walo |
| assets/audio/fil/numbers/8/questions/5/option-2.mp3 | Siyam |
| assets/audio/fil/numbers/8/questions/5/option-3.mp3 | Sampu |

#### Yugto 9: Ayusin ang mga bilang 1–5

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/9/lesson.mp3 | Sundin ang tamang pagkakasunod ng mga bilang: 1, 2, 3, 4, 5. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/9/questions/1/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/9/questions/1/hint.mp3 | Bilangin mula 1 hanggang 5. |
| assets/audio/fil/numbers/9/questions/1/option-1.mp3 | Isa |
| assets/audio/fil/numbers/9/questions/1/option-2.mp3 | Dalawa |
| assets/audio/fil/numbers/9/questions/1/option-3.mp3 | Sero |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/9/questions/2/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/9/questions/2/hint.mp3 | Bilangin mula 1 hanggang 5. |
| assets/audio/fil/numbers/9/questions/2/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/9/questions/2/option-2.mp3 | Isa |
| assets/audio/fil/numbers/9/questions/2/option-3.mp3 | Dalawa |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/9/questions/3/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/9/questions/3/hint.mp3 | Bilangin mula 1 hanggang 5. |
| assets/audio/fil/numbers/9/questions/3/option-1.mp3 | Dalawa |
| assets/audio/fil/numbers/9/questions/3/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/9/questions/3/option-3.mp3 | Apat |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/9/questions/4/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/9/questions/4/hint.mp3 | Bilangin mula 1 hanggang 5. |
| assets/audio/fil/numbers/9/questions/4/option-1.mp3 | Apat |
| assets/audio/fil/numbers/9/questions/4/option-2.mp3 | Lima |
| assets/audio/fil/numbers/9/questions/4/option-3.mp3 | Tatlo |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/9/questions/5/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/9/questions/5/hint.mp3 | Bilangin mula 1 hanggang 5. |
| assets/audio/fil/numbers/9/questions/5/option-1.mp3 | Anim |
| assets/audio/fil/numbers/9/questions/5/option-2.mp3 | Apat |
| assets/audio/fil/numbers/9/questions/5/option-3.mp3 | Lima |

#### Yugto 10: Ayusin ang mga bilang 6–10

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/10/lesson.mp3 | Sundin ang tamang pagkakasunod ng mga bilang: 6, 7, 8, 9, 10. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/10/questions/1/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/10/questions/1/hint.mp3 | Bilangin mula 6 hanggang 10. |
| assets/audio/fil/numbers/10/questions/1/option-1.mp3 | Anim |
| assets/audio/fil/numbers/10/questions/1/option-2.mp3 | Pito |
| assets/audio/fil/numbers/10/questions/1/option-3.mp3 | Lima |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/10/questions/2/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/10/questions/2/hint.mp3 | Bilangin mula 6 hanggang 10. |
| assets/audio/fil/numbers/10/questions/2/option-1.mp3 | Walo |
| assets/audio/fil/numbers/10/questions/2/option-2.mp3 | Anim |
| assets/audio/fil/numbers/10/questions/2/option-3.mp3 | Pito |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/10/questions/3/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/10/questions/3/hint.mp3 | Bilangin mula 6 hanggang 10. |
| assets/audio/fil/numbers/10/questions/3/option-1.mp3 | Pito |
| assets/audio/fil/numbers/10/questions/3/option-2.mp3 | Walo |
| assets/audio/fil/numbers/10/questions/3/option-3.mp3 | Siyam |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/10/questions/4/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/10/questions/4/hint.mp3 | Bilangin mula 6 hanggang 10. |
| assets/audio/fil/numbers/10/questions/4/option-1.mp3 | Siyam |
| assets/audio/fil/numbers/10/questions/4/option-2.mp3 | Sampu |
| assets/audio/fil/numbers/10/questions/4/option-3.mp3 | Walo |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/10/questions/5/question.mp3 | Anong bilang ang nawawala? |
| assets/audio/fil/numbers/10/questions/5/hint.mp3 | Bilangin mula 6 hanggang 10. |
| assets/audio/fil/numbers/10/questions/5/option-1.mp3 | Walo |
| assets/audio/fil/numbers/10/questions/5/option-2.mp3 | Siyam |
| assets/audio/fil/numbers/10/questions/5/option-3.mp3 | Sampu |

#### Yugto 11: Mas marami

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/11/lesson.mp3 | Mas marami ang pangkat na may mas malaking bilang. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/11/questions/1/question.mp3 | Aling pangkat ang mas marami? |
| assets/audio/fil/numbers/11/questions/1/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/11/questions/1/option-1.mp3 | Pangkat A |
| assets/audio/fil/numbers/11/questions/1/option-2.mp3 | Pangkat B |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/11/questions/2/question.mp3 | Aling pangkat ang mas marami? |
| assets/audio/fil/numbers/11/questions/2/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/11/questions/2/option-1.mp3 | Pangkat B |
| assets/audio/fil/numbers/11/questions/2/option-2.mp3 | Pangkat A |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/11/questions/3/question.mp3 | Aling pangkat ang mas marami? |
| assets/audio/fil/numbers/11/questions/3/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/11/questions/3/option-1.mp3 | Pangkat A |
| assets/audio/fil/numbers/11/questions/3/option-2.mp3 | Pangkat B |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/11/questions/4/question.mp3 | Aling pangkat ang mas marami? |
| assets/audio/fil/numbers/11/questions/4/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/11/questions/4/option-1.mp3 | Pangkat B |
| assets/audio/fil/numbers/11/questions/4/option-2.mp3 | Pangkat A |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/11/questions/5/question.mp3 | Aling pangkat ang mas marami? |
| assets/audio/fil/numbers/11/questions/5/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/11/questions/5/option-1.mp3 | Pangkat A |
| assets/audio/fil/numbers/11/questions/5/option-2.mp3 | Pangkat B |

#### Yugto 12: Mas kaunti

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/12/lesson.mp3 | Mas kaunti ang pangkat na may mas maliit na bilang. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/12/questions/1/question.mp3 | Aling pangkat ang mas kaunti? |
| assets/audio/fil/numbers/12/questions/1/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/12/questions/1/option-1.mp3 | Pangkat A |
| assets/audio/fil/numbers/12/questions/1/option-2.mp3 | Pangkat B |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/12/questions/2/question.mp3 | Aling pangkat ang mas kaunti? |
| assets/audio/fil/numbers/12/questions/2/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/12/questions/2/option-1.mp3 | Pangkat B |
| assets/audio/fil/numbers/12/questions/2/option-2.mp3 | Pangkat A |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/12/questions/3/question.mp3 | Aling pangkat ang mas kaunti? |
| assets/audio/fil/numbers/12/questions/3/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/12/questions/3/option-1.mp3 | Pangkat A |
| assets/audio/fil/numbers/12/questions/3/option-2.mp3 | Pangkat B |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/12/questions/4/question.mp3 | Aling pangkat ang mas kaunti? |
| assets/audio/fil/numbers/12/questions/4/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/12/questions/4/option-1.mp3 | Pangkat B |
| assets/audio/fil/numbers/12/questions/4/option-2.mp3 | Pangkat A |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/12/questions/5/question.mp3 | Aling pangkat ang mas kaunti? |
| assets/audio/fil/numbers/12/questions/5/hint.mp3 | Bilangin ang laman ng bawat pangkat. |
| assets/audio/fil/numbers/12/questions/5/option-1.mp3 | Pangkat A |
| assets/audio/fil/numbers/12/questions/5/option-2.mp3 | Pangkat B |

#### Yugto 13: Dagdag na bilang

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/13/lesson.mp3 | Kapag nagdagdag, dumarami ang mga bagay. Dalawa dagdag isa ay tatlo. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/13/questions/1/question.mp3 | Ilan ang lahat? |
| assets/audio/fil/numbers/13/questions/1/hint.mp3 | Magsimula sa 2 at magdagdag ng 1. |
| assets/audio/fil/numbers/13/questions/1/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/13/questions/1/option-2.mp3 | Apat |
| assets/audio/fil/numbers/13/questions/1/option-3.mp3 | Dalawa |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/13/questions/2/question.mp3 | Ilan ang lahat? |
| assets/audio/fil/numbers/13/questions/2/hint.mp3 | Magsimula sa 1 at magdagdag ng 3. |
| assets/audio/fil/numbers/13/questions/2/option-1.mp3 | Lima |
| assets/audio/fil/numbers/13/questions/2/option-2.mp3 | Tatlo |
| assets/audio/fil/numbers/13/questions/2/option-3.mp3 | Apat |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/13/questions/3/question.mp3 | Ilan ang lahat? |
| assets/audio/fil/numbers/13/questions/3/hint.mp3 | Magsimula sa 3 at magdagdag ng 2. |
| assets/audio/fil/numbers/13/questions/3/option-1.mp3 | Apat |
| assets/audio/fil/numbers/13/questions/3/option-2.mp3 | Lima |
| assets/audio/fil/numbers/13/questions/3/option-3.mp3 | Anim |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/13/questions/4/question.mp3 | Ilan ang lahat? |
| assets/audio/fil/numbers/13/questions/4/hint.mp3 | Magsimula sa 4 at magdagdag ng 2. |
| assets/audio/fil/numbers/13/questions/4/option-1.mp3 | Anim |
| assets/audio/fil/numbers/13/questions/4/option-2.mp3 | Pito |
| assets/audio/fil/numbers/13/questions/4/option-3.mp3 | Lima |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/13/questions/5/question.mp3 | Ilan ang lahat? |
| assets/audio/fil/numbers/13/questions/5/hint.mp3 | Magsimula sa 5 at magdagdag ng 3. |
| assets/audio/fil/numbers/13/questions/5/option-1.mp3 | Siyam |
| assets/audio/fil/numbers/13/questions/5/option-2.mp3 | Pito |
| assets/audio/fil/numbers/13/questions/5/option-3.mp3 | Walo |

#### Yugto 14: Pagbabawas

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/14/lesson.mp3 | Kapag may inalis, kumakaunti ang mga bagay. Lima bawas dalawa ay tatlo. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/14/questions/1/question.mp3 | Ilan ang natira? |
| assets/audio/fil/numbers/14/questions/1/hint.mp3 | Mula sa 5, mag-alis ng 2. |
| assets/audio/fil/numbers/14/questions/1/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/14/questions/1/option-2.mp3 | Apat |
| assets/audio/fil/numbers/14/questions/1/option-3.mp3 | Dalawa |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/14/questions/2/question.mp3 | Ilan ang natira? |
| assets/audio/fil/numbers/14/questions/2/hint.mp3 | Mula sa 4, mag-alis ng 1. |
| assets/audio/fil/numbers/14/questions/2/option-1.mp3 | Apat |
| assets/audio/fil/numbers/14/questions/2/option-2.mp3 | Dalawa |
| assets/audio/fil/numbers/14/questions/2/option-3.mp3 | Tatlo |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/14/questions/3/question.mp3 | Ilan ang natira? |
| assets/audio/fil/numbers/14/questions/3/hint.mp3 | Mula sa 6, mag-alis ng 2. |
| assets/audio/fil/numbers/14/questions/3/option-1.mp3 | Tatlo |
| assets/audio/fil/numbers/14/questions/3/option-2.mp3 | Apat |
| assets/audio/fil/numbers/14/questions/3/option-3.mp3 | Lima |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/14/questions/4/question.mp3 | Ilan ang natira? |
| assets/audio/fil/numbers/14/questions/4/hint.mp3 | Mula sa 8, mag-alis ng 3. |
| assets/audio/fil/numbers/14/questions/4/option-1.mp3 | Lima |
| assets/audio/fil/numbers/14/questions/4/option-2.mp3 | Anim |
| assets/audio/fil/numbers/14/questions/4/option-3.mp3 | Apat |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/14/questions/5/question.mp3 | Ilan ang natira? |
| assets/audio/fil/numbers/14/questions/5/hint.mp3 | Mula sa 10, mag-alis ng 1. |
| assets/audio/fil/numbers/14/questions/5/option-1.mp3 | Sampu |
| assets/audio/fil/numbers/14/questions/5/option-2.mp3 | Walo |
| assets/audio/fil/numbers/14/questions/5/option-3.mp3 | Siyam |

#### Yugto 15: Saya sa mga bilang

**Aralin**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/15/lesson.mp3 | Balikan ang pagbibilang, pagdaragdag, at pagbabawas. |

**Tanong 1**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/15/questions/1/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/15/questions/1/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/15/questions/1/option-1.mp3 | Pito |
| assets/audio/fil/numbers/15/questions/1/option-2.mp3 | Walo |
| assets/audio/fil/numbers/15/questions/1/option-3.mp3 | Anim |

**Tanong 2**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/15/questions/2/question.mp3 | Ilan ang nasa larawan? |
| assets/audio/fil/numbers/15/questions/2/hint.mp3 | Ituro ang bawat larawan habang nagbibilang. |
| assets/audio/fil/numbers/15/questions/2/option-1.mp3 | Sampu |
| assets/audio/fil/numbers/15/questions/2/option-2.mp3 | Walo |
| assets/audio/fil/numbers/15/questions/2/option-3.mp3 | Siyam |

**Tanong 3**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/15/questions/3/question.mp3 | Ano ang kasunod ng 5? |
| assets/audio/fil/numbers/15/questions/3/hint.mp3 | Magbilang pasulong. |
| assets/audio/fil/numbers/15/questions/3/option-1.mp3 | Pito |
| assets/audio/fil/numbers/15/questions/3/option-2.mp3 | Anim |
| assets/audio/fil/numbers/15/questions/3/option-3.mp3 | Tatlo |

**Tanong 4**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/15/questions/4/question.mp3 | Ilan ang lahat? |
| assets/audio/fil/numbers/15/questions/4/hint.mp3 | Pagsamahin ang dalawang pangkat ng tatlo. |
| assets/audio/fil/numbers/15/questions/4/option-1.mp3 | Anim |
| assets/audio/fil/numbers/15/questions/4/option-2.mp3 | Lima |
| assets/audio/fil/numbers/15/questions/4/option-3.mp3 | Pito |

**Tanong 5**

| Filename | Linyang bibigkasin |
| --- | --- |
| assets/audio/fil/numbers/15/questions/5/question.mp3 | Ilan ang natira? |
| assets/audio/fil/numbers/15/questions/5/hint.mp3 | Mag-alis ng dalawa mula sa pito. |
| assets/audio/fil/numbers/15/questions/5/option-1.mp3 | Apat |
| assets/audio/fil/numbers/15/questions/5/option-2.mp3 | Anim |
| assets/audio/fil/numbers/15/questions/5/option-3.mp3 | Lima |
