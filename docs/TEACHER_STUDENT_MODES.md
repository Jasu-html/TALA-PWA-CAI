# Teacher and Student modes — TALA 1.3.0

## Choose a role

Every app launch starts at the title screen with two clear choices:

- **Maglaro bilang Student** opens the active learner's game (guardian approval still applies).
- **Buksan bilang Teacher** opens classroom setup or the Teacher PIN screen. The teacher context contains no built-in game navigation.

Role choice does not replace consent or authenticate a teacher. The existing local Teacher PIN protects classroom controls. Teacher sessions are not retained across a reload; the app returns to role choice. The PIN remains a UI lock, not encryption of local records.

## Teacher navigation (icons only)

1. **Home / Dashboard**: student roster, progress, completed built-in levels, custom-result totals, profile management, assignments and history. The header brand returns here, never to the student game.
2. **Make Activity** (open book): Lesson Builder, custom module/stage/level creation, draft and published library, pictures/recordings, previews, versioned publishing, package import/export, student assignment and custom results. Preview is a teacher-only testing tool; it does not save learner results.
3. **Teacher Settings** (gear): volume controls, sound test, classroom backup/CSV and **Log out of Teacher Mode**. Existing classroom administrative tools and restore controls remain on the dashboard as well.

Suggested later additions to Make Activity: reusable question templates, classroom-wide assignment, due dates and assignment filters. These are not implemented in this milestone.

To hand the shared device to a learner, select **Gamitin ang profile** on the teacher roster. This explicitly selects that student, locks teacher authority, and returns to role choice. Tap **Maglaro bilang Student**. To return to teaching from student Settings, choose **Bumalik sa pagpili ng role**, then **Buksan bilang Teacher** and enter the PIN.

Logging out, pressing Back from the teacher dashboard, or choosing Student clears teacher authority. Student navigation cannot accidentally take a teacher into the game; teachers may deliberately switch roles for learner handoff.

## Student navigation and layout

Student tabs remain **Home / Mga Gawain / Tagumpay / Settings**. Teacher reports and lesson-building controls are no longer part of student Settings; parent/guardian controls remain behind the adult gate.

The Home teacher-task shortcut is a compact row and appears only when there is an assignment or unfinished activity. Character artwork now scales to its own card frame, without a minimum height that crops heads. Mga Gawain fills the remaining viewport and gives the assigned level a larger card; longer assignment lists can still scroll. Settings uses a more spacious, full-height layout and may scroll intentionally. Very short screens retain scrolling instead of clipping text or shrinking touch targets.

Existing learner progress, recordings, published lessons, assignments and results are preserved. This is a local shared-device workflow, not cloud teacher/student accounts.

Run `npm run test:roles` for role separation, teacher navigation/logout, task shortcut height, character frame bounds and phone/tablet layouts. The existing lesson-builder and classroom workflows are separate regression checks.
