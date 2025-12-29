# AGENTS.md

## Purpose
This is the AE210 Autograder Suite meta-repo. It pins the individual autograder repos as submodules.
Edit submodules directly, then update the suite submodule pointers.

## Source Of Truth
- GE3: `GE3Autograder/`
- Final Project: `FinalProjectAutograder/`
- Final Exam: `FinalExamAutograder/`
- Shared assets: `CommonAssets/`

## Workflow
1) Make changes inside the submodule repo.
2) Commit and push in that submodule.
3) In this suite repo, `git add <submodule>` and commit the pointer update.
4) Push this suite repo.

## Key Files
- GE3 MATLAB: `GE3Autograder/GE3_autograde_Olmstead_Fall_2025_v2.m`
- GE3 Web: `GE3Autograder/docs/engine/`
- Final Project MATLAB: `FinalProjectAutograder/Final_project_autograde_Olmstead_Fall_2025_v02.m`
- Final Project Web: `FinalProjectAutograder/docs/engine/`
- Final Exam MATLAB: `FinalExamAutograder/Final_Exam_autograde_Olmstead_Fall_2025_v01.m`
- Final Exam Web: `FinalExamAutograder/docs/engine/`

## Notes
- Avoid editing any duplicate copies outside `AutograderSuite/`.
- If MATLAB and web logic disagree, MATLAB is the reference unless told otherwise.
