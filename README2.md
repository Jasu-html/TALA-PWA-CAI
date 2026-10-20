# TALA: Voice-Guided Learning App for Grade 1 Learners

A complete, offline-first Android app for Grade 1 pupils (ages 6-7) in the Philippines.

## Project Status: Phase 0 - Environment Setup (80% complete)

### What's Been Created

✅ **Gradle Build System**
- Kotlin DSL build files
- Gradle version catalog for dependency management
- Gradle wrapper configuration

✅ **Dependencies Configured**
- Jetpack Compose + Material 3
- Room (SQLite ORM) with KSP code generation
- Hilt (Dependency Injection)
- Kotlin Coroutines + StateFlow
- Navigation Compose
- DataStore for settings
- Testing dependencies (JUnit, MockK, Turbine)

✅ **Core Application Structure**
- `TalaApplication.kt` - Hilt application class
- `MainActivity.kt` - Entry point
- `AndroidManifest.xml` - Manifest with offline-first declaration

✅ **Theme & Design System**
- Color palette (cream, night blue, star yellow, etc.)
- Typography configuration
- Compose theme implementation

✅ **Navigation**
- Navigation graph setup
- Routes definition

✅ **Splash Screen**
- Production-ready splash screen with Tala character
- Loading animation
- "I'm ready" button
- Grown-up area indicator

✅ **Character Art**
- Tala the star girl (vector graphics with 5 animated states)

### What Still Needs Files

❌ **Icon Assets** (Critical for build)
- Application icon (TALA star logo)
- Essential feature icons (levels, menus, buttons)
- Material icons can be used initially

❌ **Strings/Resources**
- All app strings (currently only basic ones in strings.xml)

### Files Created

```
TALA-CAI-SYSTEM/
├── build.gradle.kts (root)
├── gradle/
│   ├── libs.versions.toml (dependency catalog)
│   └── wrapper/
│       └── gradle-wrapper.properties
├── gradle.properties
├── app/
│   ├── build.gradle.kts
│   ├── src/main/
│   │   ├── AndroidManifest.xml
│   │   ├── java/com/capstone/tala/
│   │   │   ├── TalaApplication.kt
│   │   │   ├── MainActivity.kt
│   │   │   ├── navigation/
│   │   │   │   ├── Routes.kt
│   │   │   │   └── TalaNavigation.kt
│   │   │   └── feature/splash/
│   │   │       ├── SplashScreen.kt
│   │   │       └── SplashViewModel.kt
│   │   └── res/
│   │       └── values/
│   │           └── strings.xml
│   └── src/main/java/com/capstone/tala/core/
│       ├── ui/theme/
│       │   ├── TALAColor.kt
│       │   └── TalaTheme.kt
│       └── designsystem/components/
│           └── TalaCharacterView.kt
├── .gitignore
├── PROGRESS.md
├── DECISIONS.md
└── local.properties.template
```

## How to Build

### Prerequisites
1. Android SDK (API 24+)
2. JDK 8 or higher
3. Gradle 8.2+

### Setup

1. **Copy local.properties**
   ```bash
   cp local.properties.template local.properties
   ```
   Edit `local.properties` to point to your Android SDK:
   ```
   sdk.dir=C:\Users\YourName\AppData\Local\Android\Sdk
   ```

2. **Install Gradle Wrapper** (if not present)
   ```bash
   gradle wrapper --gradle-version=8.2
   ```

3. **Sync Gradle**
   ```bash
   gradle build
   ```

### Expected Output

After building, you would have an APK like:
```
app/build/outputs/apk/debug/app-debug.apk
```

## Next Steps (Phase 1)

### To Complete Phase 0

1. **Create app icon** (`mipmap-*/ic_launcher.png`)
   - Download TALA star logo or create vector icon
   - Size: 512x512 px (mdpi), 512x512 px (hdpi), 512x512 px (xhdpi), etc.
   - Keep in `app/src/main/res/mipmap-*/`

2. **Verify build succeeds**
   ```bash
   gradle assembleDebug
   ```

3. **Test on emulator or device**
   ```bash
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

4. **Commit Phase 0 completion**
   ```bash
   git add .
   git commit -m "Phase 0: Project setup complete - TALA appears on screen"
   ```

## Tech Stack (Per Spec)

- ✅ Kotlin
- ✅ Gradle Kotlin DSL
- ✅ Jetpack Compose + Material 3
- ✅ Navigation Compose
- ✅ MVVM + Hilt
- ✅ Room + DataStore
- ✅ Coroutines + StateFlow
- ✅ kotlinx.serialization
- ❌ Record navigation (will use Compose)
- ✅ TTS (TextToSpeech)
- ✅ PDF documents
- ✅ Custom Canvas charts

## Architecture

```
app/src/main/java/com/capstone/tala/
├── core/        # Shared theme, components, utilities
├── audio/       # Narration, sound effects (coming)
├── data/        # Room entities, DAOs, repositories (coming)
├── domain/      # Business logic, scoring rules (coming)
├── feature/     # Screen-specific viewmodels + composable screens
│   ├── splash/  # Splash screen
│   ├── login/   # Student login
│   ├── home/    # Level path screen
│   └── ...    (more screens)
└── main/        # App entry point
```

## Design Guidelines

- **Layout**: Landscape tablet first (1024x768)
- **Colors**: Cream backgrounds, night blue text, star yellow accents
- **Typography**: Fredoka (headings), Nunito (body)
- **Touch targets**: Minimum 72dp
- **Accessibility**: High contrast, contentDescription on all controls
- **No-fail**: No red X marks, gentle "try again" hints

## Privacy & Safety

- ✅ No INTERNET permission
- ✅ No analytics/tracking
- ✅ All data stays on device
- ✅ Parent gate (hold button 3 seconds)
- ✅ PIN-protected dashboards
- ✅ Offline-first

## Documentation

- `PROGRESS.md` - Phase-by-phase completion tracking
- `DECISIONS.md` - Architecture and design decisions
- `TESTING.md` - Testing checklist (coming in Phase 16)

---

**Built with ❤️ for Filipino Grade 1 learners**

Co-Authored-By: Claude Code <noreply@anthropic.com>