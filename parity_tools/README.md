Suite-level parity utilities for the AE210 autograder suite.

Why these stay at suite level:
- They compare grader behavior across assignment repos.
- They share common workbook-loading helpers.
- They are support tooling, not assignment grading logic.

Current tools:
- `ge3_batch_parity.mjs`: batch Draft Aircraft web-vs-MATLAB parity runner.
- `fp_batch_parity.mjs`: batch Final Aircraft web-vs-MATLAB parity runner.
- `jet11_xlsx_loader.py`: general workbook-to-JSON loader for JET11-style sheets.
- `fp_xlsx_xml_loader.py`: Final Aircraft workbook loader.

Path behavior:
- Scripts resolve the suite root relative to this directory.
- `fp_batch_parity.mjs` uses `PARITY_BASELINE_ROOT` when provided.
- Otherwise it prefers a sibling suite checkout named `<suite>_git` when present.

Recommended location:
- Keep `parity_tools/` in the suite repo root.
- Do not duplicate these files into each assignment repo unless an assignment gains a standalone, repo-local parity workflow that no longer depends on suite context.
