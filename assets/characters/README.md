# TALA character artwork

Each character (Tala, Titik, Likha, Bilang) has three transparent PNGs:

- Neutral: default, listening, and retry pose.
- Talking: active while that character speaks; resets when playback ends or stops.
- Happy: correct answers and completion celebrations; takes priority over Talking.

Filenames follow Tala-Neutral.png, Tala-Happy.png, and Tala-Talking.png. Use the exact character name and casing for all four sets.

js/visuals.js shares the supplied images across every character placement. Original proportions are preserved without cropping. The app supplies labels and speech bubbles.

If an expression fails to load, the app tries Neutral, then the older lowercase SVG, then an icon. Keep the four SVG files as fallbacks.

All twelve PNGs are precached by sw.js and bundled into the APK. Bump the cache/page versions when changing artwork.
