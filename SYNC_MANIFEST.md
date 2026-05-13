## Sync Manifest

Use this list when copying approved changes from this working folder into `AutograderSuite_git`.

### Final Exam
- `FinalExamAutograder/Final_Exam_autograde_Olmstead_Fall_2025_v01.m`
- `FinalExamAutograder/docs/engine/grade.js`
- `FinalExamAutograder/docs/engine/messages.js`
- `FinalExamAutograder/docs/engine/rules.js`

### Final Aircraft
- `FinalAircraftAutograder/Final_aircraft_autograde_Olmstead_Fall_2025_v02.m`
- `FinalAircraftAutograder/docs/engine/grade.js`
- `FinalAircraftAutograder/docs/engine/messages.js`
- `FinalAircraftAutograder/docs/engine/pchip.js`
- `FinalAircraftAutograder/docs/engine/rules.js`
- `FinalAircraftAutograder/docs/engine/rules/stealth.js`
- `FinalAircraftAutograder/docs/index.html`
- `FinalAircraftAutograder/docs/test_runner.html`
- `FinalAircraftAutograder/docs/test_runner.js`

Notes:
- `_git` contains extra `textout_2026-04-07_*.txt` files that should not be copied back into the working folder.

### Draft Aircraft
- `DraftAircraftAutograder/Draft_aircraft_autograde_Olmstead_Fall_2025_v2.m`
- `DraftAircraftAutograder/docs/engine/messages.js`
- `DraftAircraftAutograder/docs/engine/rules.js`
- `DraftAircraftAutograder/docs/engine/rules/aero.js`
- `DraftAircraftAutograder/docs/engine/rules/attachments.js`
- `DraftAircraftAutograder/docs/engine/rules/constraints.js`
- `DraftAircraftAutograder/docs/engine/rules/mission.js`

### Suite Tools
- `parity_tools/final_aircraft_batch_parity.mjs`
- `parity_tools/final_aircraft_xlsx_xml_loader.py`
- `parity_tools/draft_aircraft_batch_parity.mjs`
- `parity_tools/jet11_xlsx_loader.py`
- `parity_tools/README.md`

### Suite Metadata
- `SYNC_MANIFEST.md`

### Exclusions
- Do not sync nested `AutograderSuite/` contents as assignment source.
- Do not sync generated parity reports unless intentionally preserving artifacts.
- Do not sync editor-local files such as `.vscode/`.
