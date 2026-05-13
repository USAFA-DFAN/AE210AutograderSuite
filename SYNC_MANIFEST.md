## Sync Manifest

Use this list when copying approved changes from this working folder into `AutograderSuite_git`.

### Final Exam
- `FinalExamAutograder/Final_Exam_autograde_Olmstead_Fall_2025_v01.m`
- `FinalExamAutograder/docs/engine/grade.js`
- `FinalExamAutograder/docs/engine/messages.js`
- `FinalExamAutograder/docs/engine/rules.js`

### Final Aircraft
- `FinalProjectAutograder/Final_project_autograde_Olmstead_Fall_2025_v02.m`
- `FinalProjectAutograder/docs/engine/grade.js`
- `FinalProjectAutograder/docs/engine/messages.js`
- `FinalProjectAutograder/docs/engine/pchip.js`
- `FinalProjectAutograder/docs/engine/rules.js`
- `FinalProjectAutograder/docs/engine/rules/stealth.js`
- `FinalProjectAutograder/docs/index.html`
- `FinalProjectAutograder/docs/test_runner.html`
- `FinalProjectAutograder/docs/test_runner.js`

Notes:
- `_git` contains extra `textout_2026-04-07_*.txt` files that should not be copied back into the working folder.

### Draft Aircraft
- `GE3Autograder/GE3_autograde_Olmstead_Fall_2025_v2.m`
- `GE3Autograder/docs/engine/messages.js`
- `GE3Autograder/docs/engine/rules.js`
- `GE3Autograder/docs/engine/rules/aero.js`
- `GE3Autograder/docs/engine/rules/attachments.js`
- `GE3Autograder/docs/engine/rules/constraints.js`
- `GE3Autograder/docs/engine/rules/mission.js`

### Suite Tools
- `parity_tools/fp_batch_parity.mjs`
- `parity_tools/fp_xlsx_xml_loader.py`
- `parity_tools/ge3_batch_parity.mjs`
- `parity_tools/jet11_xlsx_loader.py`
- `parity_tools/README.md`

### Suite Metadata
- `SYNC_MANIFEST.md`

### Exclusions
- Do not sync nested `AutograderSuite/` contents as assignment source.
- Do not sync generated parity reports unless intentionally preserving artifacts.
- Do not sync editor-local files such as `.vscode/`.
