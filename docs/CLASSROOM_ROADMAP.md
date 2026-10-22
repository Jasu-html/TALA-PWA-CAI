# Teacher-managed TALA: implementation milestone 1.1.0

## Implemented in this milestone

- Optional offline classroom setup; legacy learner migrates into a distinct ID.
- Separate student progress, consent, microphone permission and heard guidance.
- Teacher PIN (salted PBKDF2-SHA256, 120,000 iterations), separate recovery code,
  persisted failure counter, 30-second lockout after five failures, five-minute UI
  expiry and background locking. No claim of encrypted storage or verified identity.
- Roster: add, rename, search, section, archive/unarchive and teacher-only switching.
- One current core-level assignment per learner, opening from Home without fake
  prerequisite completion. Completion and replay supported.
- New attempts preserve individual confirmations, selected words, hints, reveal
  status, timestamps and source-question keys. Historical legacy data is unchanged.
- Practice checkpoints survive reload; completion updates classroom progress and
  attempt status in the same localStorage write. Repeated confirmation IDs are
  deduplicated within an attempt. New starts retain previous unfinished attempts.
- Teacher roster summary, attempt history and raw CSV. Independent first answers
  are distinguished from hinted answers; no automatic mastery/grade designation.
- Validated, previewed JSON backup replacement. Stable IDs retained; PIN and
  permissions are not imported. Invalid data/quota failures do not replace records.
- Native Android JSON/CSV save and JSON import using document pickers. No broad
  storage permission. Uses [Android SAF](https://developer.android.com/training/data-storage/shared/documents-files)
  and [Capacitor activity callbacks](https://capacitorjs.com/docs/plugins/android).
- Typed active-profile reset / entire-classroom deletion, and scoped guardian
  withdrawal that leaves classmates intact.
- Policy version 2026-10-23.1 describes the additional local classroom records.
  Guardian re-approval required; school authorization is not presumed.

## Deliberately not claimed as complete

1. Formal skill tagging, mastery evidence thresholds, trend charts, intervention
   groups and actionable skill-specific recommendations.
2. Individual/class printable PDF summaries, date filters and reviewed parent
   reports. CSV is currently raw confirmation data, not a replacement for PDFs.
3. Group/class assignment queues, multiple simultaneous assignments and teacher
   demonstration/check modes. Assignments currently target one learner at a time.
4. Teacher-reviewed curriculum mapping, phonics sound/name separation, consistent
   picture assets, expanded question variants and per-attempt option shuffling.
5. Daily duration/break settings, richer accessibility controls and saveable art.
6. Multi-device import merging, synchronization, accounts and a school server.
7. Production storage/security hardening and school authorization workflow. Current
   canonical classroom data is a versioned localStorage record, not an encrypted
   IndexedDB/Room database; benchmark larger pilots before expanding usage.

## Verification

- `npm test`: classroom migration/isolation, lockout/recovery/concurrency, journal,
  assignments, backups, invalid inputs, quota failures and native file-adapter
  checks, alongside the existing curriculum/voice/native tests.
- `npm run test:classroom`: real Chrome at 390×844, 1024×768 and 320×568; setup,
  migration, switching, per-profile consent, assigned-level completion, hint-aware
  evidence, CSV, backup/restore, interrupted quiz resume and no horizontal overflow.
- Existing phone/tablet, public launch/offline and theme checks remain required.
- Native plugin compilation/package verification is not an Android device test.
  Physically test document-provider save/import/cancel, background locking, low
  storage and denied microphone permission before a school pilot.

Next milestone: add stable skill metadata and a teacher-reviewed evidence model,
then build useful learner/class reports from the recorded attempts. Continue the
existing PWA rather than reimplementing the UI in Kotlin.
