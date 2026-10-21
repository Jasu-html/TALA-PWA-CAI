# TALA app icon

The active color icon uses the supplied Tala portrait on a violet background.
The original and AI-assisted background-edited master are preserved in
[docs/icon-source](../../docs/icon-source/EDIT_NOTES.md), with the final edit prompt.
No source character files used inside lessons have been replaced.

Run `node tools/create-icons.cjs` with Chrome and development dependencies to
regenerate the install exports. This resizes/masks the existing portrait master;
it does not redraw the character. It checks that the master is opaque and square
and that manually recorded eye/mouth landmarks fit Android's central safe circle.

- `tala-192.png`, `tala-512.png`: rounded PWA color icons; the 192px PNG is also
  the active browser favicon.
- `tala-maskable-512.png`: full-bleed maskable PWA icon.
- `tala-180.png`: full-bleed Apple touch icon.
- Android density folders: matching legacy square/round and adaptive resources.
- Android splash: shares the portrait foreground through `tala_icon.xml`.
- `tala.svg`: preserved legacy star artwork, not the active color icon.
- Android `tala_monochrome.xml`: intentionally keeps the simplified star brand
  glyph for optional themed/monochrome mode; a detailed portrait is unsuitable
  as a single-color silhouette.

Android adaptive foregrounds contain the full-bleed portrait composition, with
launchers choosing the final mask. A separate violet background layer remains
available. Fine hair/accessory details can be cropped; face recognition matters
most. See [Android guidance](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive)
and [PWA maskable-icon guidance](https://web.dev/articles/maskable-icon).

`tests/icons.cjs` checks install/cache references, PNG dimensions, density assets,
and portrait-source wiring. Real-device launcher testing is still recommended.
Do not uninstall or clear app data just to refresh a cached icon.
