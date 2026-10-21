# TALA Android test build

This repository now includes a Capacitor Android wrapper around the existing PWA.
The app ID is `com.tala.learning`; the launcher name is **TALA**. The full title
remains **TALA — A Voice-Guided Learning App for Grade 1 Learners** in the app header.
This is a debug-signed testing build, not a Play Store release.

The current verified build is `builds/TALA-1.0.2-debug.apk`, approximately **20.08 MiB**,
with minimum SDK 24 (**Android 7.0+**) and target SDK 36. Android's `apksigner`
successfully verified its debug signature. Archive verification confirmed all
**907 public source files**, including **887 catalogued voice recordings**, match the current source.
This does not replace testing the app on a physical phone.

SHA-256: `cc2852af96323e1fc2fd2d97658d55978a5cecae944b7aeed9046de597ebb5dc`.

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

All 887 catalogued MP3s, curriculum files, character placeholders, CSS, and JavaScript are
bundled in the APK. The native app skips service-worker registration; it uses its
bundled assets directly. The browser PWA keeps its existing service worker.

The APK has its **own** local progress store; browser/PWA progress does not migrate
automatically. Clearing app data or uninstalling removes that progress. Android
backup is disabled to keep learner data from being backed up by this wrapper.

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
