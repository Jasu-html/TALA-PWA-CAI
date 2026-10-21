# TALA public-release readiness

Status: **testing/review build, not cleared for public distribution**. Adding terms does not certify legal compliance or eliminate liability. Have a Philippine-qualified lawyer review the actual operator, use case, school arrangements, and final policies. No app has been uploaded or published by this work.

## Implemented foundations

- Animated readiness-based launch screen with reduced-motion behavior, retry on failed startup, and no fabricated loading percentage.
- Dedicated Start screen on every launch; existing learner progress is preserved.
- Parent-facing terms, privacy notice, and short child-friendly explanation, all available offline after the web shell is cached and bundled in Android.
- Unchecked, separate guardian declaration, acceptance of terms, and consent to local learner-data processing. Policy version and local timestamp are recorded; revised policy versions require renewed approval.
- Parent adult gate before approval, sensitive settings, or opening the progress menu. It expires after five minutes. **This is only a friction mechanism, not identity/age/guardianship verification, secure authentication, or conclusive proof of consent.** It must not be represented as such in a store listing.
- Optional voice input disabled by default and consented separately. Enabling it never itself activates capture. Typing and all lessons remain available without it.
- Local-data export, correction through the existing name editor, explicit typed deletion and consent withdrawal, and a persistent reduced-motion preference.
- No ads, purchases, chat, added analytics, or remote learner-profile database. Email/official-source actions require an adult session and confirmation.
- Standard local PWA icons (192/512 PNG plus vector), app version, help, about, contacts, and support instructions.
- Existing safety insets, Android Back navigation, sound controls, and offline bundled lesson audio retained.

## Must resolve before a public release

1. **Identify the legal operator/controller.** The supplied project label is `Olivarez College - IT Students`; contacts are `j.alarcio@olivarezcollege.edu.ph` and `kylestephen.verdan@olivarezcollege.edu.ph`. Confirm who legally operates and controls the app, authority to use the college name/email, a valid postal/contact address, and any school/student agreements. The app does not assert college or DepEd endorsement. The address remains deliberately blank in `js/legal.js`.
2. **Legal/privacy review.** Review terms, privacy notice, legal bases for education-related information, meaningful parent authorization, child-oriented transparency, retention, security, and complaint handling. Assess privacy impact, applicable NPC registration/DPO obligations, school processing agreements, and an incident-response process with counsel. Local-only storage does not automatically make privacy law irrelevant.
3. **Audio redistribution rights.** The current library was generated with an unofficial Edge TTS development workflow. `AUDIO_GENERATION.md` already warns that public/commercial redistribution rights must not be assumed. Obtain written clearance or replace the files with human recordings under signed releases or an explicitly licensed service. A disclaimer is not a license.
4. **Artwork/content rights.** Verify provenance and permissions for all supplied character PNGs, stories, fonts, images, and learning content. Keep releases/licenses and third-party notices. Original app-code ownership and school/client ownership must also be settled rather than inferred from a copyright footer.
5. **Real privacy operations.** Confirm both mailboxes are monitored, how access/deletion/complaints will be answered, responsibility for incidents, and how families will be informed of changes. Set the actual voice-provider and hosting disclosures. Keep reports free of children's names, voice, photos, and unnecessary logs.
6. **Distribution model.** For PWA hosting, choose HTTPS, document hosting/request logs and retention, deploy security headers, publish a stable public privacy-policy URL, and test installation/offline behavior. No hosting configuration has been invented or deployed here.
7. **Child-directed store compliance.** If using Google Play, review Families requirements, voice-recognition provider/SDK suitability for children, age targeting, Data safety, content rating, permissions, and privacy-policy requirements. Do not assume an adult gate alone satisfies them. If distributing outside the Philippines, assess other applicable children's privacy laws rather than reusing these terms blindly.
8. **Production signing/release pipeline.** Current APKs are debug-signed. A public store release needs a protected release signing setup/AAB, appropriate publisher identity, versioning, tested updates, backups of the signing credentials, and a repeatable secure build. Never commit signing passwords or keys.
9. **Accessibility and device QA.** Test with real Grade 1 learners under adult supervision, multiple phones/tablets, Android accessibility/text scaling, screen readers, offline startup, denied mic permission, and low storage. The new child notice is intentionally short and can be read by a parent; add licensed recorded narration if needed for independent comprehension. The arithmetic adult gate is not an accessibility-complete or identity-verified solution.
10. **Approval and policy versioning.** Only after the above are resolved should `releaseStatus` change from `review`, the real operator/address and dates be finalized, and `TALA_LEGAL.version` be bumped. Keep prior approved policy versions and releases in project records. Rebuild and reverify the signed production package; do not just rename a debug APK.

## Legal design notes and primary sources (checked 21 October 2026)

- The [Data Privacy Act, RA 10173](https://privacy.gov.ph/data-privacy-act/) informs data minimization, purpose disclosure, security, and treatment of education-related information. The [NPC DPA IRR](https://privacy.gov.ph/implementing-rules%20regulations-data-privacy-act-2012/) informs the explanation of access/correction/deletion and other applicable rights.
- The [NPC advisories/circulars index](https://privacy.gov.ph/pips-and-pics/advisories-circulars/) lists Advisory 2024-03 on Child-Oriented Transparency and Circular 2023-04 on consent. The [NPC explanation of the children's guidelines](https://privacy.gov.ph/npc-strengthens-efforts-to-protect-children-against-online-sexual-abuse-and-exploitation/) supports supplying an understandable notice for children, not only an adult legal page.
- The [Civil Code, RA 386](https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/53360), particularly Articles 1170-1172 and 1306, is why the draft does not promise a universal liability waiver or waiver of future fraud.
- [IPOPHL's laws index](https://www.ipophil.gov.ph/reference/laws-issuance-and-treaties/) identifies RA 8293; content owners' rights and permissions must be assessed for the actual assets, not assumed from authorship claims.
- [Google Play Families policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) and [target-audience guidance](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en) are store requirements in addition to applicable law, not substitutes for it.

These are implementation choices informed by the cited sources, not a legal opinion that the app complies with every provision. Recheck current law and store requirements at actual release time.

## Verification commands

```powershell
npm test
npm run test:phone
npm run test:tablet
npm run test:launch
npm run test:sound
powershell -ExecutionPolicy Bypass -File tools/build-android.ps1
.\.venv-audio\Scripts\python.exe tools\verify_apk.py builds/TALA-1.0.6-debug.apk
```

Visuals/download test artifacts are under `.tools/public-launch/`; no real learner information is used by these tests. Offline legal-page access is verified after a real service-worker install and offline reload. Blocking the consent script is tested to ensure startup fails closed instead of bypassing the guardian flow.
