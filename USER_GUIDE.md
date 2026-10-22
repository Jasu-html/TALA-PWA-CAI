# Teacher quick guide — Classroom milestone 1.3.0

This is an offline, shared-device **test build**, not a central school database.
Use demo nicknames until school authorization/privacy review is complete.

## Separate roles

Choose **Maglaro bilang Student** or **Buksan bilang Teacher** at launch. Teacher navigation is **Dashboard / Make Activity / Settings**. Enter the existing Teacher PIN to access classroom data. Teacher Settings has logout; the header Home/brand returns to the teacher dashboard, not the game. To hand off the device, select **Gamitin ang profile** on the roster, then choose Student from the title screen. [Detailed role guide](docs/TEACHER_STUDENT_MODES.md).

## Navigation and audio

The four bottom icons are, left to right: **Home / Mga Gawain / Tagumpay / Settings** (house / open book / trophy / gear). Labels are available to screen readers and as tooltips, not visible text. Open the separate Teacher Dashboard from **Buksan bilang Teacher** at startup; the existing PIN/adult check still applies. **Tagumpay** shows 78 progress-based badges for the active learner. Badges are not an assessment of mastery.

In **Settings**, adjust **Music** and **Sound effects at ambience** separately. These device-wide preferences persist after closing the app, without changing the recorded voice guide. The header speaker remains the global music/SFX on/off switch.

Open **Mga Gawain** (the book) to start the current teacher assignment, resume an unfinished classroom quiz, or replay completed core stages. A completed assignment stays visible as “Tapos na!” until Teacher replaces it. Completed stages below it are actual learning progress, not a historical assignment list. No classmates’ tasks or results appear here.

On mobile, completed stages are under an expandable list, and **Audio guide at sound test** holds optional sound help/test controls. Volume sliders remain visible. Very short screens and expanded lists can still scroll; nothing is clipped to force a single screen.

## Custom teacher lessons

After unlocking Teacher Mode, choose **Teacher Lesson Builder**. Create a level, enter module/stage names, add three-choice questions and optional pictures/voiceovers, save a draft, preview, publish, then assign to a student. Students open it under **Mga Gawain → Custom lessons ni Teacher**. Published edits make new versions; results for earlier versions remain separate.

See the [Teacher Lesson Builder guide](docs/TEACHER_LESSON_BUILDER.md) for recording, Android picker handling, transfers and limits. Export lesson packages **with media** in addition to the classroom backup. Policy version 2026-10-23.2 describes teacher recordings; returning learners may need renewed guardian approval.

## 1. Create Teacher Mode

On the title screen choose **Buksan bilang Teacher**. Complete the arithmetic
adult check, enter a school/project label and section, and create a 6-digit PIN.
Write down the recovery code and confirm it is safely stored. There is no remote
PIN recovery. The PIN locks the UI, not the underlying local data.

The existing learner becomes the first classroom profile, preserving stars and
completed levels. Old attempts are **not** reconstructed as detailed history.
If the privacy notice has changed, the learner needs renewed guardian approval.

## 2. Manage students

Add a nickname and section. Names can repeat; internal IDs keep records separate.
Use **Edit profile / assign activity** to correct names without changing results.
Archive hides a student from selection but does not erase their records. Select
another profile before archiving the currently active one.

**Gamitin ang profile** selects that learner, locks Teacher Mode, and returns to
the title screen. New students do not inherit another student's guardian or
microphone permissions. Teacher setup is not a declaration of guardianship.
Do not check a guardian declaration unless you are that child's legal guardian.
Classroom authorization needs school/privacy-officer review before deployment.

## 3. Assign and play

Expand the student's activity form, select a core module/level, and assign it.
Each profile currently has one current assignment. Select the profile and start
learning; after approval/onboarding, **Gawain ngayon** opens the assigned lesson.
An assignment may open a later level without marking its prerequisites complete.
Any completion marks the assignment completed; five stars are not required.
**Ulitin ang gawain** replays the assigned activity.

After a quiz is interrupted, its saved state appears as **Ituloy ang hindi pa
tapos** on Home. Confirmed responses and selected answers are checkpointed.
Drawing strokes are not checkpointed; the painting activity must be restarted.

## 4. Review results

Settings → Progreso at learner profiles opens Teacher Mode when a classroom exists. Enter the PIN; the
workspace locks after five minutes and when backgrounded. Search by nickname or
section. Open **Attempt history** to see activity dates, status and confirmations.

The latest completed attempt shows independent first responses. A response is
counted independent here only if its first confirmation is correct and no hint
was used before that confirmation. This does not establish reading mastery,
exclude unrecorded adult help, or produce an official school grade. A painting
activity has no quiz response evidence. Stars retain the existing game scoring.
Dates in raw records are ISO timestamps (UTC, indicated by Z).

## 5. Export and back up

- **Export answer records (CSV)** exports one row per confirmed response, including
  student/attempt IDs, activity, selected answer, hint count and reveal status.
- **Download classroom backup** exports roster, progress, assignments and history.
  It does not contain the Teacher PIN, recovery code, guardian permissions or
  microphone permissions.
- Browser exports use downloads; APK exports use Android's system document picker.
  Choose a secure save location. Cancellation is not reported as a successful save.
- Exports/imports are limited to 5 MB. Local browser/WebView storage also has a
  finite capacity. Back up regularly; the app does not silently prune old records.

## 6. Restore carefully

Save a current backup first. Choose the JSON file under **Restore classroom
backup**. On Android use **Pumili ng classroom backup**; if opening the picker
locks Teacher Mode, enter the PIN again to review it. Confirm the student count
and type **RESTORE**.

Restore **replaces** the classroom; it does not merge files from multiple devices.
The current device's Teacher PIN remains. Student IDs and history are preserved;
guardian/microphone permissions must be approved again. Invalid/unsupported files
are rejected before replacement. Pending quiz drafts are not transferred.

## 7. Reset, withdrawal and deletion

Administrative tools require a typed confirmation. **RESET** clears the active
learner's progress/history/assignment only. **DELETE CLASSROOM** removes the entire
local classroom and its teacher credentials. Both are permanent unless you have
a suitable backup. Neither deletes exported files elsewhere.

Parent-screen withdrawal clears only the active learner's details, assignment,
history and permissions, leaving a blank profile slot. It does not erase other
students. Ask the school to establish a retention/deletion process.

## Before classroom use

Test on actual school phones/tablets: speaker volume, guardian approval, learner
switching, rotation, interruption/reload, airplane mode, low storage, and native
file save/import/cancellation. The automated browser checks do not replace this.
Keep the device locked at OS level and restrict exported records to authorized
adults. No records automatically synchronize between devices.
