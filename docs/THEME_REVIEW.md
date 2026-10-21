# Night theme review — 1.0.11

Layout update in 1.0.14: the dialogue and answer regions share the available
play space equally on roomy screens. Answers use compact natural-height rows
with 8px vertical padding, not stretched grid tracks; extra room is distributed
between rows. Short/landscape screens use content-aware sizing instead of forcing
equal halves that would clip content. The bottom margin remains in place. Tests
check equal zone heights on tall screens and compact simple-answer row heights.

Layout update in 1.0.13: answers form one full-width vertical column on phones
and tablets. The question conversation no longer stretches to consume free
height; its simple-prompt box is about 110–200px tall, with content allowed to
grow for longer questions. Answer rows absorb spare space instead. Short
landscape layouts use compact rows (minimum 44px) and smaller decorative art.
Tests assert vertical order, no overlap, and a bounded simple question box.

Layout update in 1.0.12: lesson and question cards now grow into the available
viewport again, keeping a 24–36px bottom reserve (18px on short screens).
Illustration/conversation areas absorb the extra space, not the buttons. The
phone/tablet regression test checks both bottom breathing room and that panels
do not leave an excessive blank area below them. Contrast choices are unchanged.

The night canvas stays dark blue/violet. Reading surfaces are now opaque tinted
paper (`#E8E2F1`, raised `#F1EBF6`), not pure white or translucent gray. Dark ink
(`#1E1B4B`) and secondary ink (`#4B4680`) establish a clear text hierarchy.
Purple actions, blue/pink/amber module accents, and gold rewards have distinct roles.
Tala's module illustration now has a warm sunset rather than a slate background.

## Navigation correction

The header and winding-path Back bar have transparent fills at the top. The
existing `scrollY > 24` state adds a solid lavender background, shadow, and dark
labels. Scrolling back to the top removes that fill again. Both remain sticky.
Individual header controls keep their own visible button backgrounds.

## Measured findings

These values come from rendered Chrome styles, not estimates from a screenshot.
Gradient areas use sampled stops/reference colors rather than pixel-by-pixel
compositing. They are useful regression checks, not an exhaustive certification.

| Sample | Before | After |
| --- | --- | --- |
| Home stage counts | 4.48:1 | 6.67:1 |
| Answer boundary | 1.39:1 | 4.09:1 |
| Name input boundary | 1.30:1 | 4.62:1 |
| Header subtitle | 8px | 12px |
| Module guide labels | 11px | 12px, at least 4.68:1 |
| Main answer text | 18px | 18px, 13.67:1 |
| Menu replay guidance | Overridden by light-panel text rule | 10.83:1 |
| Trail level label | Inherited light night text on light paper | 13.67:1 |

Some supplied screenshot estimates did not match the existing app: the Hamon
heading already measured about 8.66:1, and lesson Listen/tutorial text about
5.33:1. Those were not treated as measured contrast failures.

Filled and empty rating stars now have separate styles and shapes. Empty report
stars measure 4.73:1; filled report stars 4.48:1 (non-text indicator target 3:1).
Actual stage progress tracks have visible outlines. The white decorative circles
in module artwork are now recognizable crescent moons, not apparent empty rings.
Destructive actions use red labels and outlines, plus explicit action wording.

## Type and responsive behavior

Important learner instructions/answers use 16–18px; targeted secondary labels use
at least 12px. The full official subtitle occupies a second header row on phones.
Brief Home copy reduces wrapping without changing lesson content or recordings.
Regular/tall phone layouts fill the viewport; short/narrow phones may scroll
rather than clip content or shrink text. Example: Home is 698px tall at 360×640
and 758px at 320×568. Tablets retain responsive portrait/landscape layouts.

## Verification

- `npm test`: 75 automated behavior/content/offline/native tests.
- `npm run test:theme`: 51 targeted contrast/type samples, plus top/scroll/top
  navigation-state assertions. Missing required samples fail the audit.
- Phone layout checks: five sizes; tablet checks: seven sizes.
- Public launch checks: guardian approval, privacy, export/deletion, reduced
  motion, offline reload, and startup recovery at three sizes.
- Screenshots and raw measurements: ignored `.tools/theme-audit/` directory.

The audit uses the [WCAG text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
(4.5:1 for normal text) and [non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
(3:1 for necessary control/state visuals). WCAG does not prescribe a universal
16px minimum font size. Decorative artwork and disabled controls have different
requirements. This review does not certify all screens/states, text-spacing
overrides, assistive technology behavior, or physical-device display quality.
