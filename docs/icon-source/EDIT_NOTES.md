# Tala portrait icon — 1.0.16

- Supplied original (unaltered copy): `Tala-icon.png`.
- Project-bound edited master: `tala-portrait-master.png`.
- Mode: built-in image-generation/edit tool, using the supplied image as an edit
  target, not the CLI/API fallback. Background editing is AI-assisted; the result
  is not claimed to be pixel-identical to the original illustration.
- Exports: `node tools/create-icons.cjs`. This only resizes/masks the edited master
  for installation and does not regenerate the illustration.
- Original and master stay in docs, outside the APK's public web bundle.

## Final edit prompt

Use case: identity-preserve / background compositing. Edit target: the supplied
transparent portrait of Tala. Make one square app-icon master, 1024x1024,
full-bleed opaque violet background. Preserve the supplied illustration exactly
in appearance: same joyful closed eyes and open smile, long dark hair, gold star
hair clip and earrings, yellow/cream Filipino blouse, blue and gold vest, and
both raised fists. Do not redesign or restyle her. Change only the transparent
backdrop to a clean rich violet gradient (#6742CB at upper left to #30246C at lower
right), with a very subtle soft lavender glow behind her head. No text, logos,
extra objects, border, or pre-rounded corners. Frame the portrait from head
through upper torso, centered, with face centered near (50%,43%). Keep the eyes,
smiling mouth and star hair clip comfortably within the central 60% diameter
circle for Android icon masking. Hair and torso can extend beyond the safe
circle, but leave a little headroom. High fidelity to original supplied artwork;
not a new character drawing. Output actual icon artwork only, not a phone mockup.

## Validation limits

Opaque/square checks are automated. The safe-circle check uses manually selected
eye/mouth coordinates for this master, not face detection and not a guarantee
that all hair, accessories, or clothing survives every launcher mask. Review the
round icon export and test a real launcher. Android's optional themed/monochrome
mode intentionally retains the simplified star brand mark; color icons use Tala.
