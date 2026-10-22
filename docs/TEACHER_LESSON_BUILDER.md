# Teacher Lesson Builder — TALA 1.3.0

## Where to find it

1. On the title screen choose **Buksan bilang Teacher**. Set up the classroom and Teacher PIN if necessary.
2. Unlock Teacher Mode. Tap **Make Activity** (book icon) in the teacher navbar, or **Teacher Lesson Builder** in the dashboard actions.
3. Press **Gumawa ng level**. Enter a module name, stage name, level title and instructions. Reuse module/stage names to group your levels.
4. Add 1–20 questions. Each has question text, an optional picture and hint, exactly three choices, and a correct-answer selector. All three choices must be different.
5. **Save draft** before leaving the editor. Draft fields are not automatically saved. You can return to a draft through the builder library.

## Record or upload voices

Instruction, question, hint and each answer have their own optional voiceover slot.
Choose **I-record**, allow microphone access, speak, then **Stop recording**. Wait for the Recording notice before speaking. Maximum 30 seconds and 1 MB per recording. Use **Pakinggan** to review and **Alisin** to replace a recording. Pictures: PNG/JPG/WebP, max 1 MB each.

Alternatively upload an existing audio file (MP3/WAV/WebM/OGG/M4A supported when the browser supplies a supported MIME type). Microphone support depends on the browser/WebView, permissions and a secure origin (HTTPS/localhost or the APK). Unsupported/denied recording does not block uploading existing audio. Physical-phone microphone testing is still required.

Android may lock Teacher Mode while the file picker is open. Unlock it and reopen **Teacher Lesson Builder** to apply the pending file/import. Unsaved draft media remains in memory during this flow, not across an app restart.

Do not record children's voices or upload identifiable student photographs. Use your own recordings and images, or media you have permission to distribute. Recordings are saved locally in IndexedDB and included in exported lesson files; they are not sent to an AI service. Back up content before clearing app/browser data.

## Preview, publish and assign

- **Preview** requires complete questions and answer choices, but never writes student results.
- **Publish level** freezes that revision. **Gumawa ng bagong version** copies a published level to a new draft/version. Old assignments/results still refer to the original immutable revision.
- In the builder's **I-assign ang published lesson** form, choose a learner and a published level. Switch to that learner normally. In **Mga Gawain**, look for **Custom lessons ni Teacher**.
- Students select an answer to hear its recording, then press **Ito ang sagot ko**. Correct answers advance automatically; incorrect answers allow retries. Hints are optional and reduce the independent first-try count. Missing recordings remain silent.
- Completed results are under **Custom lesson results** in the builder, separate from built-in stars and achievements. The score counts first-try correct answers without a hint, not a formal mastery assessment.

## Transfer between devices

**Export with media** downloads one self-contained JSON lesson package, including pictures and recordings. Maximum package size is 4.8 MB (under the native file-transfer limit). Import that package through the builder on the other device. Imported IDs/revisions are preserved, so assignments restored from a classroom backup can find the same content. Identical imports do not duplicate lessons; conflicting content under an existing ID is rejected.

Use **classroom backup** separately for learner profiles, custom assignments and results. It does **not** embed lesson-library recordings. Transfer both the classroom backup and all assigned lesson packages. Classroom imports still require renewed learner consent. Store learner backups securely; lesson packages contain teacher media but no roster/results.

Current scope: local shared-device multiple-choice levels; no cloud sync, bulk package export, custom drawing games, custom winding map or interrupted custom-quiz resume. An interrupted custom quiz restarts; built-in quiz resume is unchanged. Only completed custom attempts are saved. Custom modules do not change the 73 built-in stages or Hamon ni Tala unlock rules.

Reset/withdrawal clears only the active learner's custom assignments/results. **Delete entire classroom** also clears the shared custom lesson library. Exported copies elsewhere cannot be erased by the app.

## Verification

Run `npm run test:builder` for the Chrome workflow covering microphone capture, picture upload, draft, preview, publish, immutable versions, media export/import, assignment, retries, separate scoring and reload persistence. This uses a simulated browser microphone, not a physical Android microphone.
