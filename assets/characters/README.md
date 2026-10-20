# Your TALA characters

The four SVGs in this folder are simple, replaceable vector placeholders:

- tala.svg — Tala
- likha.svg — Likha
- titik.svg — Titik
- bilang.svg — Bilang

To use your final artwork, put transparent PNG or WebP images in this folder and edit the four image paths at the top of js/visuals.js. For example, change assets/characters/tala.svg to assets/characters/tala.png.

Use roughly 4:5 portrait artwork with the full character visible. Around 640 × 800 pixels works well; leave a little transparent padding around the head and feet. Keep filenames lowercase. All placements (home, world cards, maps, lessons, questions, painting, and completion) update from that one configuration.

The app adds the name label and speech bubble. Do not bake those into the artwork. Gentle idle and celebration motion is handled by CSS and respects reduced-motion settings.

For reliable offline loading on first install, also update the matching character paths in the FILES list in sw.js and increase the cache version after changing artwork.
