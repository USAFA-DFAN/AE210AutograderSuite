# Autograder Suite (meta-repo)

This repo tracks the individual AE210 autograder projects as git submodules.

## Included submodules
- CommonAssets (shared docs/assets)
- GE3Autograder
- FinalExamAutograder
- FinalProjectAutograder

## Usage
- Clone and pull modules: `git clone <this-repo> && cd <repo> && git submodule update --init --recursive`
- Update a module: `cd <module> && git pull origin main`, then commit the updated pointer in this repo.
- CommonAssets: create the GitHub remote `https://github.com/dellolmstead/AE210CommonAssets.git` (or adjust `.gitmodules`) and push it so others can fetch that submodule.
