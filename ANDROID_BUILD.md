# TALA Android test build

This repository now includes a Capacitor Android wrapper around the existing PWA.
The app ID is `com.tala.learning`; the launcher name is **TALA**. The full title
remains **TALA — A Voice-Guided Learning App for Grade 1 Learners** in the app header.
This is a debug-signed testing build, not a Play Store release.

The current verified build is `builds/TALA-1.0.16-debug.apk`, approximately **28.18 MiB**,
with minimum SDK 24 (**Android 7.0+**) and target SDK 36. Android's `apksigner`
successfully verified its debug signature. Archive verification confirmed all
**929 public source files**, including **887 catalogued voice recordings**, match the current source.
This does not replace testing the app on a physical phone.

SHA-256: `aec293d773890c2932fcbe039090c64a773445d3836fa57076e521561efa5392`.

## Build again on Windows

Requirements: Node 22+, JDK 21, Android SDK platform 36, and an internet connection
for any uncached npm/Gradle dependencies. This machine has these tools installed.
Capacitor's [environment setup](https://capacitorjs.com/docs/getting-started/environment-setup)
describes the Android toolchain.

```powershell
npm ci
powershell -ExecutionPolicy Bypass -File tools/build-android.ps1
```

If your installation paths differ, pass `-SdkPath` and `-JdkPath`.
The build script copies the public web files into `dist/`, syncs Android, builds,
and copies the result to `builds/TALA-debug.apk`. It does not deploy to a phone.
You can also open the `android/` directory in Android Studio.

## Install and test

Transfer `builds/TALA-debug.apk` to the phone and open it. If prompted, allow
**Install unknown apps** only for the app you use to open this APK. Disable that
permission again afterward. The APK must come from a trusted source.

Check the first-run story, name setup, all module maps, option audio, the pulsing
confirmation button, automatic next-question flow, painting, and sound controls.
Close/reopen the app to check saved progress and once-only introductions. Switch
to airplane mode to check lessons and recordings offline.

All 887 catalogued MP3s, curriculum files, character PNGs and fallback SVGs, CSS, and JavaScript are
bundled in the APK. The native app skips service-worker registration; it uses its
bundled assets directly. The browser PWA keeps its existing service worker.

The APK has its **own** local progress store; browser/PWA progress does not migrate
automatically. Clearing app data or uninstalling removes that progress. Android
backup is disabled to keep learner data from being backed up by this wrapper.

## Update 1.0.16

Color app icons now use the supplied Tala portrait with an AI-assisted violet
background edit, replacing the smiling-star color icon. The original upload and
edited master are preserved outside the web bundle in `docs/icon-source/`, with
the final prompt and limitations. Android legacy/adaptive/splash and PWA/touch/
favicon exports derive from this master. Optional Android monochrome mode retains
the simplified star glyph. Existing in-game character art is unchanged.

All 77 automated tests passed, plus public-launch/offline browser checks at three
sizes. Square/opaque master checks, manually selected face-landmark safe-circle
checks and round-export inspection passed. These do not replace real launcher
testing. All 929 public files match the APK, and its debug signature verified.
No policy/progress change; install over the existing app without uninstalling.

## Update 1.0.15

The app icon now uses one refined gold smiling star on a blue-violet night sky.
PWA/favicon/touch exports and Android legacy, adaptive and splash resources share
the same vector artwork. Android 13+ has a monochrome/themed variant. The manifest
now selects the launcher mipmaps instead of the older standalone purple vector.
See [icon assets and regeneration](assets/icons/README.md).

Mask validation confirms an opaque maskable background and the essential star
within Android's safe circle. All 77 automated tests passed, including two new
icon-resource checks. Public launch/offline browser checks passed at three sizes.
APK source matching and debug signature verified. Update over the existing app to
keep progress. Launcher icon caches may take time to refresh; do not uninstall or
clear app data just to refresh the icon. Physical-launcher testing is still needed.

## Update 1.0.14

Roomy quiz screens split the available play area equally between dialogue and
choices. Answer rows keep compact padding/natural height, with spare space
distributed between the rows rather than inside them. Short and landscape layouts
use content-aware sizing, retaining the bottom reserve. Vertical stacking, audio
previews and separate confirmation are unchanged. All 75 automated tests, 51 theme
samples, five phone and seven tablet layouts passed. APK source matching and debug
signature verified. No policy/progress change; update without uninstalling.

## Update 1.0.13

Answer choices now stack in one full-width vertical column on phones and tablets.
Question boxes are compact instead of stretching into large empty panels; answer
rows use the spare height. Short landscape screens have tighter spacing with
44px minimum answer targets. Longer content can still grow/scroll without clipping.
Audio preview, separate confirmation and the bottom margin remain unchanged.
All 75 automated tests, 51 theme samples, five phone and seven tablet layout
checks passed. APK source matching and debug signature verified. Install over the
existing app to preserve progress; no policy change.

## Update 1.0.12

Lesson and question panels now fill the available height, with a small 24–36px
bottom reserve (18px on short screens). Only the illustration/conversation area
expands; answer and navigation controls retain natural sizing. Short screens can
still scroll rather than clip content. All 75 automated tests, 51 theme samples,
five phone layouts and seven tablet layouts passed. APK source matching and the
debug signature verified. No policy or progress changes; install over the existing
app without uninstalling to preserve saved progress.

## Update 1.0.11

The sticky header and trail Back bar are transparent at the top and transition to
solid lavender only after scrolling down. Dark labels appear on the solid bar;
scrolling back to the top restores the transparent state and light labels.

Opaque tinted reading surfaces, stronger module labels/arrows, visible answer
and name-field boundaries, distinct rating stars, and red destructive actions
improve hierarchy and contrast without introducing pure-white reading cards.
Tala's module art uses warm sunset colors; decorative circles are crescent moons.
The full subtitle and key secondary labels are at least 12px. Short phones may
scroll to preserve readable text; regular/tall phones and tablets use their
available space. See [theme review](docs/THEME_REVIEW.md) for measurements and scope.

All 75 automated tests and 51 targeted theme samples passed, plus five phone
sizes, seven tablet sizes, and public-launch/offline checks. All 927 public source
files and 887 catalogued recordings match the APK. Its debug signature verified.
Install over the existing debug app to retain local progress; do not uninstall
first. No policy/consent change. Physical-device visual testing is still needed.

## Update 1.0.10

Muted lavender-blue surfaces replace pure-white answer/speech panels and the
near-white reading cards. The header and trail Back/count bar use lighter lavender
backgrounds with dark labels, retaining sticky positioning and solid scroll states.
Lessons/questions no longer stretch to fill the viewport: the illustration area
is capped and a bottom sky margin is reserved. Short landscape tablets receive
smaller decorative art while text and touch controls retain their readable sizes.

Game audio is stronger: master gain is now 0.48, music 0.72, and ambience 0.60.
During narration music gently ducks to 0.30 and ambience to 0.25, rather than almost
disappearing. Recorded voiceover files and their playback volume are unchanged.
Saved mute choices and device media volume still apply. Check the final balance
on real phone speakers.

All 75 automated tests passed, along with five phone sizes, seven tablet sizes,
bottom-spacing/no-white-surface/header-contrast checks, guardian/privacy/offline
flows, and real Web Audio audibility/no-clipping renders. APK source matching and
the Android debug signature were verified. No policy change; update over the
existing app to retain progress and consent.

## Update 1.0.9

The Start screen's midnight blue-violet gradient now forms the shared app canvas.
Subtle background stars, moonlit Home scenery and module artwork, night-colored
trails, and solid dark sticky navigation replace the old yellow/daylight palette.
Gold remains an accent for stars and rewards. Learning cards, answer choices, and
parent/legal reading panels keep cool, bright surfaces and dark text for contrast.
Android's launch background and the PWA theme/install colors match the night sky.

All 74 automated tests passed, plus five phone sizes, seven tablet sizes, sticky
header contrast checks, and guardian/privacy/offline browser checks. APK source
matching and the debug signature were verified. No policy or curriculum change;
saved consent and progress are preserved. Install over the existing app to update.

## Update 1.0.8

Privacy, Terms of Use, child privacy, help/about, parent settings, consent prompts,
and data/microphone messages now use conversational Taglish instead of formal
Filipino translations. Lesson content and recordings are unchanged. The policy
copy version is now `2026-10-21.2`, so parents must review the updated wording once;
learner progress is retained. Separate data/microphone consent, rights, review
warnings, and the original Capacitor MIT license remain intact.

All 74 automated tests, five phone layout sizes, and the three-size guardian,
offline, and export/deletion browser checks passed. APK archive matching and its
Android debug signature were verified. This remains a review/test build.

## Update 1.0.7

The parent gate randomly chooses only single-digit multiplication (1-9 for each
factor) or two-digit addition (10-99 for each addend). Answer checking supports
both types. All 74 automated tests and the guardian/offline browser checks passed;
the rebuilt APK's signature and bundled source files were verified.

## Update 1.0.6

A modern readiness-based animated launch screen leads to Magsimula/Magpatuloy.
The first learning session now requires an adult gate and three separate unchecked
choices: guardian authority, terms acceptance, and local learner-data processing.
Approval is versioned; existing progress is preserved. The adult gate is a simple
friction mechanism, not identity verification or secure authentication.

Voice input is disabled by default and has a separate optional parent consent.
The family area adds Filipino terms/privacy, a child-friendly explanation, help,
about/contact/version information, local export, typed data deletion/withdrawal,
motion controls, and the Capacitor MIT notice. Legal pages are bundled offline;
new 192/512 PNG icons support PWA installation. A missing consent script fails
closed with Retry rather than bypassing approval.

All 73 automated tests passed; actual Chrome checks cover five phone sizes, seven
tablet sizes, three guardian-flow sizes, offline reload, consent/data controls,
boot failure, sound renders, and wave transitions. The debug signature and all
926 public source files were verified against the APK. Physical-device testing
is still necessary. Install over the existing app to preserve progress.

This is a **review/test build, not public-release clearance**. See the
[release checklist](docs/PUBLIC_RELEASE_CHECKLIST.md) for legal review, operator
identity/address, generated-audio/artwork licensing, hosting/store compliance,
and production-signing requirements. The provided student-team name and emails
do not by themselves establish the legal controller or college endorsement.

## Update 1.0.5

Sound design now has five distinct offline themes, including Home. Titik uses
woodland flute/plucks with birds and leaf rustle; Bilang uses marimba/off-beat
strums with surf and seabirds; Likha uses playful pizzicato with brush sparkles;
Tala uses warm piano and bells. These are synthesized environmental effects,
not field recordings. Music and ambience smoothly duck under narration.

Selecting a module plays its arrival sound with a short world-colored wave wipe.
The wipe never blocks taps, cleans up on navigation, and is skipped with reduced
motion. Trail Back (on-screen and Android) always returns Home instead of an old
victory screen. The Back/count bar stays below the header and becomes solid on scroll.

All 69 automated tests passed, along with five phone layouts, seven tablet layouts,
actual Web Audio rendering checks, and phone/tablet wave-transition checks. Source
archive matching and the Android debug signature were verified. Test speaker balance
and navigation on a physical phone; install over the existing debug app to keep progress.
See [sound-design notes](docs/SOUND_DESIGN.md) for behavior and review commands.

## Update 1.0.4

All four characters now use the supplied transparent PNG artwork in three expressions:
Neutral for resting/listening/retry states, Talking during that character's narration,
and Happy for correct answers and completion celebrations. Happy feedback takes priority
over Talking. Stopping, finishing, or failing narration restores the resting expression;
old interrupted playback cannot reset a newer speaker. Missing variants fall back to
Neutral, then the original SVG, then an icon.

All twelve PNGs are bundled in Android and precached for offline browser use. Browser
checks verified image loading and expression switching at five phone sizes and seven
portrait/landscape tablet sizes. All 66 automated tests passed. Small screens may still
scroll to preserve readable content. Install this update over the existing debug app
to retain progress; do not uninstall first.

## Update 1.0.3

Tablet layouts now adapt in portrait and landscape up to 1366 CSS pixels wide.
Home uses two module columns in portrait and four in landscape. Landscape stories
place artwork beside text and controls. Small landscape tablets use reduced
spacing without shrinking touch controls or clipping learning content. The winding
map remains scrollable. Run `npm run test:tablet` for seven tablet-size checks;
the tests also cover Back navigation, viewport changes, and horizontal overflow.

## Update 1.0.2

Phone layouts now use the remaining viewport height after the header. On taller
screens, the home scene and module artwork expand, the story replay control stays
near the bottom, and lesson/question/story panels fill the available area instead
of leaving a large unused strip. Smaller screens retain intrinsic minimum sizes,
so longer content and larger text can still scroll rather than being clipped.
The winding map remains freely scrollable. Browser checks cover five phone sizes
and viewport resizing, with explicit bottom-gap and horizontal-overflow assertions.

## Update 1.0.1

- Native system-bar insets reserve black space for the status and navigation bars,
  with white icons. Content no longer draws over the battery/Wi-Fi area.
- Android Back closes the keyboard first, then returns through the app's screens.
  On home it asks before exiting. Menu return restores a quiz's selected answer.
- Compact phone layouts reduce decoration and padding. The winding map retains
  its scrollable scale; long text and very small screens may still need scrolling.
  `npm run test:phone` runs actual Chrome checks at 320, 360, and 390 pixel widths.
- Name input uses a custom native Android `SpeechRecognizer` plugin, independent
  of WebView's unsupported Web Speech API. The phone's selected speech service
  (often Google) handles Filipino recognition. No API key is required. Parent
  consent and Android microphone permission are requested; speech can be processed
  online by the system service. TALA never saves the raw recording. The recognized
  name remains a draft until the learner continues. Typing and parent editing remain.
- Four recorded correct-answer praises are randomized with the immediately previous
  phrase excluded, including across stage changes during the app session.

For native voice input, tap the microphone and allow **Microphone → While using
the app**. If no recognition service is installed, enable/update the phone's Google
app and Speech Services or use typing. Filipino support and online/offline operation
depend on the installed service; a physical-phone test is still necessary.

Keep the app ID and debug signing key unchanged when installing updated test APKs
over the existing app. Release signing and store publishing are not configured.
