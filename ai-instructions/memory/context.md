# Ghost Browser — Agent Context Log

This is the running state-of-the-project log maintained by every agent session.
Newest entry at the bottom, oldest at top. Append-only — never overwrite or
delete a prior entry.

Read this file first when opening the repo. It tells you exactly what state
things are in without needing the full roadmap re-explained.

---

## [2026-09-15] — Prompt 1: Fork + Build Verification

**Repo/base commit:** Zen Browser `644bf48b6cc4e41f62f39adecd877b0d248e9cab` (2026-09-14, "gh-13196: Fixed sidebar not hiding if the urlbar is open") — identified as fork target, NOT YET CLONED into the project. Ghost Browser skeleton repo exists at https://github.com/usernamezain/Ghost-Browser with folder structure only.

**What changed:** Audited the Windows build environment against Zen Browser's build requirements. Created `docs/dev-guide/build-environment.md` documenting exact toolchain needs, current state, and gaps. Created this context file. No build was attempted because hard prerequisites are not met.

**Current verified state:** BUILD NOT ATTEMPTED — blocked by multiple missing prerequisites on the current Windows machine:
- **Disk space: 10.7 GB free, need 30 GB minimum** (hard blocker — Gecko source + objdir won't fit)
- MozillaBuild not installed
- 7-Zip not installed/in PATH
- Rust toolchain: rustup present but no default set (`rustup default stable` needed)
- sccache not installed
- VS 2022 "Desktop development with C++" workload not confirmed
- clang not in PATH

**Toolchain/versions (what IS present):**
- Git: 2.52.0.windows.1
- Node.js: v25.2.1 (meets 21+ requirement)
- npm: 11.6.4
- Python: 3.14.0
- Visual Studio: 2022 installed (workload unconfirmed)
- Rust: rustup installed, no default toolchain set

**Files touched:**
- `docs/dev-guide/build-environment.md` — created (toolchain requirements + environment audit)
- `ai-instructions/memory/context.md` — created (this file)

**Next agent should:** DO NOT attempt a build yet. The maintainer must first:
1. Free up disk space to at least 30 GB (ideally 40 GB) — this is the hardest blocker
2. Run `rustup default stable`
3. Install MozillaBuild (from https://ftp.mozilla.org/pub/mozilla/libraries/win32/MozillaBuildSetup-Latest.exe)
4. Install 7-Zip and add to PATH
5. Verify/install VS 2022 "Desktop development with C++" workload
6. Install sccache (`cargo install sccache` after Rust is set up)
Once all six are confirmed, re-run Prompt 1 to clone Zen and attempt the actual build.

**Open questions/flags:**
- The machine has only ~10 GB free. A Gecko build needs 30+ GB. The maintainer needs to decide: free up space on this drive, use a different drive/partition, or use a different machine entirely.
- Linux build was not attempted (no Linux environment available in this session). The roadmap targets Windows + Linux — a Linux build environment will need to be set up separately.
- Zen Browser's `main` branch is the fork target. No tagged release was used — should the maintainer pin to a specific Zen release tag instead of HEAD for stability? Current HEAD is `644bf48b`.
