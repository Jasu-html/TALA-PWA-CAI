# TALA sound design

All music and environmental effects are synthesized locally by `js/sfx.js` using Web Audio. No downloads, external music services, voice generation, or additional audio files are required. Nature effects are stylized synthesized textures, not wildlife field recordings. Existing MP3 narration is unchanged.

## Sound identities

| Screen / world | Music | Arrival and environment |
| --- | --- | --- |
| Home / welcome | Bright celesta-like melody with warm broken piano chords | Gentle welcoming musical texture |
| Titik / forest | Spacious pentatonic flute-like melody and wooden plucks | Leaf/wind rustle and rising bird calls |
| Bilang / beach | Syncopated marimba with off-beat ukulele-like strums | Filtered surf swells and lower seabird calls |
| Likha / shapes and colors | Quick, skipping pizzicato melody with three-beat accompaniment | Brush-like swish and ascending color sparkles |
| Tala / good values | Slower, warm piano-like lullaby | Soft garden breeze and welcoming bell tones |

Hamon ni Tala uses Tala's theme. Stories remain focused on narration; completion screens retain their victory jingle.

## Behavior

- Home music starts after a user gesture unlocks device audio. Initial rendering alone does not try to autoplay Web Audio.
- Entering a module plays its arrival cue with a roughly 0.9-second layered, world-colored wave wipe. The overlay is decorative, cannot intercept taps, and is removed immediately if the learner navigates away.
- Reduced motion skips the wipe without changing navigation or sound controls.
- Arrivals play only when selecting a module, not every time a learner returns from a lesson to its trail.
- Music continues through a world's map, lessons, and questions without restarting on every screen change.
- Sparse forest/beach/breeze textures accompany musical phrases. They do not create independent recurring timers.
- Music and ambience use separate gain buses and smoothly lower their volume during recorded narration, spoken guidance, or name voice input. Scroll piano notes stay silent during narration.
- Interface clicks have their own effect group, so normal taps do not cut off the arrival's environmental texture.
- The existing sound button mutes music, ambience, and game effects together; its choice is saved locally. Recorded speech keeps its existing independent playback behavior.
- Switching worlds clears old scheduled notes and ambience. Muting or hiding the app stops all Web Audio sound and loop timers; returning to the visible app resumes the selected theme when enabled.

## Navigation

Both Android Back and the trail's on-screen Bumalik button return directly to Home from a module map, clearing old victory history. Lesson/question Back still follows the normal learning flow. The trail's Back/count bar stays below the app header and transitions to an opaque background while scrolling.

## Verification

The current game-audio mix uses master gain `0.48`, music gain `0.72`, and
ambience gain `0.60`. During narration, music ramps to `0.30` and ambience to
`0.25` instead of nearly disappearing. Compared with the previous mix, game SFX
gain is about 1.7x and the normal music signal gain about 2.9x. These are signal
gain ratios, not claims about perceived loudness. Voiceover files and their
playback volume are unchanged. Device media volume and the saved sound toggle
still apply; check the final balance on real phone speakers.

- `npm test`: sound lifecycle, five distinct musical patterns, speech ducking, mute/background behavior, arrival routing, and victory-to-map Back regression.
- `npm run test:phone` / `npm run test:tablet`: layouts, sticky bar position/background, Back behavior, artwork, and resizing.
- `npm run test:sound`: actual Chrome OfflineAudioContext renders of all five soundscapes (finite samples, audible signal, no clipping), non-reduced-motion wave transitions on phone/tablet, and early navigation cleanup.

Preview WAVs and wave screenshots are generated under `.tools/sound-design/` for review and are not bundled in the app. Physical phone listening is still necessary to judge speaker balance and the subjective quality of synthesized timbres.
