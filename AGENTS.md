# AGENTS.md

## Purpose
This is the AE210 Autograder Suite meta-repo. It pins the individual autograder repos as submodules.
Edit submodules directly, then update the suite submodule pointers.

## Source Of Truth
- Draft Aircraft: `GE3Autograder/`
- Final Aircraft: `FinalProjectAutograder/`
- Final Exam: `FinalExamAutograder/`

## Workflow
1) Make changes inside the submodule repo.
2) Commit and push in that submodule.
3) In this suite repo, `git add <submodule>` and commit the pointer update.
4) Push this suite repo.

## Key Files
- Draft Aircraft MATLAB: `GE3Autograder/GE3_autograde_Olmstead_Fall_2025_v2.m`
- Draft Aircraft Web: `GE3Autograder/docs/engine/`
- Final Aircraft MATLAB: `FinalProjectAutograder/Final_project_autograde_Olmstead_Fall_2025_v02.m`
- Final Aircraft Web: `FinalProjectAutograder/docs/engine/`
- Final Exam MATLAB: `FinalExamAutograder/Final_Exam_autograde_Olmstead_Fall_2025_v01.m`
- Final Exam Web: `FinalExamAutograder/docs/engine/`

## Notes
- Avoid editing duplicate nested suite copies such as `AutograderSuite/`.
- If MATLAB and web logic disagree, MATLAB is the reference unless told otherwise.
- Final Aircraft, Draft Aircraft, and Final Exam each own their own grading values, thresholds, objectives, and point maps.
- Shared helper logic is allowed, but assignment-specific constants must stay local to that assignment repo.
- Do not copy Final Exam values into Final Aircraft or Draft Aircraft by assumption, and do not copy Final Aircraft values into Final Exam by assumption.
- When updating rubric values for one assignment, update only that assignment unless an explicit rubric change says otherwise.
