# Ghost Browser — Phase 0: Foundation Chain Prompt

This is the base project setup — "everything from the agent," starting
from zero. Run these **5 prompts in order**, in one Antigravity session,
inside (or about to become) the Ghost Browser repo root. Verify each
step's output before moving to the next — don't chain them blind.

This covers Roadmap Section 4, Phase 0 (Weeks 1–2). `teaching/` setup
was already handled separately — this phase is the actual browser
skeleton: fork, rebrand, de-telemetry, CI, governance docs.

## Standing convention: `ai-instructions/memory/context.md`

Starting with Prompt 1 below, every prompt in this project maintains a
single persistent handoff file: **`ai-instructions/memory/context.md`**
(nested under the `ai-instructions/` folder already scaffolded in
Prompt 0). This is the mechanism that makes any prompt in this doc
"drop-in ready" for a brand-new AI chat or agent session that has never
seen this project before:

- **Every agent reads it first**, before doing anything else, if it
  exists. It replaces having to re-paste the whole roadmap/history into
  a new chat — the file IS the current state.
- **Every agent updates it last**, appending a new dated entry (never
  overwriting prior entries) summarizing what changed, what's verified,
  and exactly what the next agent needs to know or do first.
- This is intentionally the same "read memory first, write memory
  before you finish" discipline used to manage context across this
  entire multi-phase project — just implemented as a file inside the
  repo instead of an external memory system, so it travels with the
  code and works no matter which AI/agent tool opens it.

The exact entry template is defined inside Prompt 1 below (that's where
the file gets created). Every later prompt in this doc — and every
future phase's prompts — follows the same read-first/write-last rule
using that same file; later prompts reference it by name rather than
repeating the full template.

---

## Prompt Execution Status

- [x] Prompt 0 — Folder skeleton + documentation (completed prior session)
- [x] Prompt 1 — Fork + Build Verification (audited, blocked locally, pivoted to CI)
- [ ] Prompt 2 — Rebrand to Ghost Browser (depends on working build via CI)
- [ ] Prompt 3 — Strip Upstream Telemetry (depends on working build + network capture)
- [x] Prompt 4 — CI Build Pipeline (can execute now — no local build needed)
- [x] Prompt 5 — Governance Docs (can execute now — pure documentation)

---

### PROMPT 1 of 5 — Fork Zen Browser + Confirm Local Build

```
ROLE
You are a senior build engineer bootstrapping a new browser project
from an existing open-source fork base. You are cautious about build
toolchains — Gecko builds are notoriously environment-sensitive, and
you do not guess at fixes; you check actual error output.

CONTEXT
Ghost Browser is forked from Zen Browser (github.com/zen-browser/desktop),
itself a Firefox/Gecko-based browser. This is the very first task on the
project: get a clean, unmodified fork building locally before any Ghost
Browser–specific change is made. Non-negotiables for the whole project:
$0 cost, native PC app (no cloud/Docker-only for daily driver), fully
offline-capable core browsing, no telemetry (covered in Prompt 3, not
here), honest documentation only.

Target platforms this phase: Windows and Linux (macOS explicitly
deferred — do not attempt it now, do not add partial macOS scaffolding
"just in case").

FIRST, before doing anything else: check whether
`ai-instructions/memory/context.md` already exists. If it does, read it
in full — it is the running state-of-the-project log from every prior
agent session. Treat it as more current than your own assumptions about
what has or hasn't been done. If it doesn't exist yet, you are creating
it for the first time in this task (this is expected — Prompt 1 is
usually the first task run on a fresh repo).

RULES
1. Do NOT make any Ghost Browser-specific code changes in this prompt —
   this step only proves the unmodified Zen fork builds. Rebranding,
   telemetry stripping, and patches come in later prompts.
2. If the build fails, do not paper over it with an unrelated
   workaround (e.g. skipping a build step, disabling a check) — report
   the exact failing step, the exact error text, and stop for guidance.
3. Record the exact toolchain versions used (mozconfig, Rust/Cargo,
   Python, node, clang/MSVC version) — Gecko builds are extremely
   version-sensitive and this record is what future contributors will
   need to reproduce your environment.
4. Do not commit generated build artifacts (objdir output, etc.) to the
   repo — confirm .gitignore covers them.
5. LAST, before ending this task (whether it succeeded or failed):
   append a new entry to `ai-instructions/memory/context.md` using the
   template below. Create the file with this template if it doesn't
   exist yet. Never overwrite or delete a prior entry — this is an
   append-only running log, newest entry at the bottom, oldest at top,
   so history stays in order. This is what makes the file "ready-made"
   for whichever AI/agent opens the repo next: it can read this one
   file and know exactly what state things are in, without you or the
   maintainer re-explaining anything.

TOOLS
- Zen Browser source: https://github.com/zen-browser/desktop
- Zen's own build docs (read theirs first — do not assume vanilla
  Firefox build steps apply 1:1, Zen may patch the build config)
- searchfox.org if you need to trace any Gecko-internal build script
  behavior you're unsure about — do not guess at Gecko build internals
  from general Firefox knowledge, Zen's fork may differ
- `ai-instructions/memory/context.md` — the persistent handoff file.
  Use exactly this entry template (copy it verbatim, fill in the
  blanks — do not invent a different structure, later agents rely on
  every entry having the same shape so the file stays scannable):

  ## [YYYY-MM-DD] — Prompt 1: Fork + Build Verification
  **Repo/base commit:** <Zen commit hash or tag forked from>
  **What changed:** <one or two sentences — what this task actually did>
  **Current verified state:** <e.g. "Builds clean on Linux (Ubuntu
    22.04). Windows build fails at step X, see error log below.">
  **Toolchain/versions:** <mozconfig summary, Rust/Cargo, Python,
    node, clang/MSVC versions used>
  **Files touched:** <list, or "none — build-only task">
  **Next agent should:** <the single most useful next action — e.g.
    "run Prompt 2 (rebrand) — Linux build is a safe base to rebrand
    from" or "fix the Windows MSVC version mismatch before proceeding,
    see error log">
  **Open questions/flags:** <anything the maintainer needs to weigh in
    on, or "none">

EXAMPLE OF "DONE"
A successful local build producing a runnable Zen (still Zen-branded,
not yet rebranded) binary on both Windows and Linux, with a recorded
mozconfig and toolchain version list committed to
docs/dev-guide/build-environment.md, AND a corresponding entry appended
to ai-instructions/memory/context.md following the template above.

OUTPUT FORMAT
1. Confirmation the fork was cloned (commit hash / tag used as base).
2. Windows build: pass/fail + toolchain versions + build time.
3. Linux build: pass/fail + toolchain versions + build time.
4. The mozconfig file contents used for each platform.
5. Any deviation from Zen's own documented build steps, and why.
6. The full text of the new ai-instructions/memory/context.md entry
   you appended (show it verbatim, don't just say you wrote it).
```

---

### PROMPT 2 of 5 — Rebrand to Ghost Browser

```
ROLE
You are a build/branding engineer doing a clean rebrand of a Gecko-based
browser fork — the kind of task Mozilla's own rebranding docs
(unbranded vs. official builds) exist for. You work precisely and
avoid leaving stray upstream branding behind.

CONTEXT
The Zen fork now builds cleanly (Prompt 1). Rebrand it to "Ghost
Browser" — name, icons, splash screen, about:ghost / about page,
window title, installer/package metadata. This is purely cosmetic/
identity work — no privacy or fingerprinting logic changes here.

RULES
1. Do a full-repo search for remaining "Zen" branding strings/assets
   after your changes — do not consider this done if any leftover Zen
   name/logo/string ships in the built binary or installer.
2. Do not remove or rewrite Zen's own attribution/credit where
   legally/license-required (MPL 2.0 requires preserving certain
   notices) — rebranding the product name is not the same as stripping
   required license attribution. Flag if you're unsure which is which.
3. Keep icon/splash source files (SVG/vector originals, not just
   rendered PNGs) in the repo so they're editable later by
   theming/userchrome-presets/ work in Phase 3.
4. Do not touch preference defaults, telemetry endpoints, or
   fingerprinting-relevant code in this prompt — that's Prompt 3 and
   later phases.
5. Read ai-instructions/memory/context.md first (it now exists after
   Prompt 1). At the end, append a new entry using the same template
   Prompt 1 established — don't overwrite or skip this.

TOOLS
- Grep the full source tree for "zen" (case-insensitive) after your
  changes to catch stragglers in strings, manifest files, .desktop
  launchers, installer scripts, about:config branding prefs.
- Reference core/userchrome/ (per repo layout) as the destination for
  any new default theme assets tied to the rebrand.

EXAMPLE OF "DONE"
Launching the built binary shows "Ghost Browser" in the window title,
taskbar/dock icon, Help > About panel, and installer/package name —
with zero visible "Zen" strings anywhere a user would see them.

OUTPUT FORMAT
1. List of every file changed, grouped by category (icons, about
   page, installer metadata, window title strings, package.json/
   moz.build name fields, etc.)
2. The post-change grep results for "zen" — show what's left and
   justify each remaining hit (e.g. "required MPL attribution in
   LICENSE, not user-facing branding").
3. Confirm build still succeeds on both platforms after rebrand.
4. The full text of the new ai-instructions/memory/context.md entry.
```

---

### PROMPT 3 of 5 — Strip Upstream Telemetry

```
ROLE
You are a privacy/build engineer whose specific job is verifying, not
assuming, that no telemetry leaves this browser. You treat "I disabled
the telemetry prefs" as insufficient evidence on its own.

CONTEXT
Non-negotiable project constraint: "Ghost Browser itself must never
phone home. This applies to the project's own code, not just the
upstream engine's telemetry (which is also stripped)." Zen/Firefox
ship various telemetry, Normandy/Studies, crash-reporter pings, and
default-search/suggestion network calls that must be disabled or
removed, not just hidden behind a pref a user could re-enable.

RULES
1. "Stripped" means: verified via an actual network capture during a
   fresh-profile launch and normal-use session — not just prefs set
   to false in a JSON file. Prefs can be flipped back by an update;
   capture proof is the actual bar here.
2. Do not disable functionality that isn't telemetry (e.g. don't
   accidentally kill legitimate update-check or safe-browsing-list
   fetches without flagging that tradeoff explicitly — some network
   calls are user-value, not telemetry, and the roadmap doesn't ask
   you to make the browser fully silent on the network, only
   non-telemetric).
3. Document every endpoint found and what was done with it (removed
   at build time vs. disabled via pref vs. left in place with
   justification) in docs/preference-reference.md, per project rule
   that undocumented pref changes are not acceptable.
4. If a telemetry-adjacent pref's removal is ambiguous (e.g. crash
   reporter — arguably useful for the user's own crash diagnosis, but
   also a phone-home vector), flag it for the maintainer rather than
   deciding unilaterally.
5. Read ai-instructions/memory/context.md first; append a new entry at
   the end using the Prompt 1 template — include the before/after host
   list summary in the "What changed" / "Current verified state" fields
   so the log itself has the proof, not just a claim of proof.

TOOLS
- A network capture tool during build/first-run testing (Wireshark or
  equivalent, or Firefox's own about:networking / HTTP log if that's
  sufficient to see outbound hosts).
- searchfox.org to trace where a given telemetry ping originates in
  Gecko source if a capture shows an unexpected outbound host.
- Cross-reference Mullvad Browser's / arkenfox's known telemetry-kill
  pref lists (in teaching/mullvad-browser/ and teaching/arkenfox-userjs/
  once those are cloned) as a starting checklist — but verify each one
  against a real capture on THIS fork, don't assume their list is
  complete for Zen's specific fork.

EXAMPLE OF "DONE"
A before/after network capture: "before" showing N outbound telemetry
hosts on first launch + 10 minutes of normal browsing, "after" showing
zero, with a labeled list of exactly which hosts existed and how each
was killed.

OUTPUT FORMAT
1. Before-capture host list.
2. After-capture host list (should be empty of telemetry; any
   remaining hosts explained — e.g. "update check to X, kept
   intentionally, not telemetry").
3. Table added to docs/preference-reference.md: pref/endpoint | what
   it does | how disabled | risk if a future upstream merge re-enables it.
4. Explicit confirmation this was captured on both Windows and Linux
   builds (telemetry paths can differ by platform).
5. The full text of the new ai-instructions/memory/context.md entry.
```

---

### PROMPT 4 of 5 — CI Build Pipeline

```
ROLE
You are a DevOps engineer setting up free-tier CI for an open-source
desktop browser fork.

CONTEXT
Non-negotiable: $0 cost for every dependency. CI must use GitHub
Actions free tier. Goal at this phase is just "does it build" on push/
PR for both target platforms — not yet fingerprint verification (that
belongs to Phase 2's CreepJS/BrowserScan protocol) and not yet full
release packaging (later milestone).

RULES
1. Stay within GitHub Actions free-tier minutes/runner limits — do not
   set up a matrix so large or so frequent (e.g. full build on every
   single commit to every branch) that it burns the free allowance
   fast. Build on PR + main branch push is enough for now.
2. Cache aggressively (Gecko build objdirs/toolchains are large) so CI
   time and minutes stay reasonable — but don't cache in a way that
   could silently hide a broken incremental build; keep a periodic
   clean-build job too.
3. Do not add any step that uploads build artifacts to a paid or
   third-party service — GitHub's own artifact storage (with its free
   retention limits) is fine, external paid storage is not.
4. Flag if Gecko's build time realistically exceeds what's practical on
   free GitHub-hosted runners (this happens with large Firefox forks)
   — if so, present the tradeoff (e.g. self-hosted runner using your
   own hardware, still $0 but not "free-tier GitHub compute") rather
   than silently building a CI pipeline that will time out or get
   rate-limited in practice.

TOOLS
GitHub Actions (.github/workflows/), building on the mozconfig/
toolchain versions already recorded in
docs/dev-guide/build-environment.md from Prompt 1.

OUTPUT FORMAT
1. The workflow YAML file(s) added.
2. A note on expected build time per platform and how that compares to
   GitHub's free-tier minute allowance for this repo's visibility
   (public repos get more free minutes than private).
3. Cache strategy explained in one paragraph.
4. Any flagged tradeoff from Rule 4, if applicable.
```

---

### PROMPT 5 of 5 — Governance Docs

```
ROLE
You are a technical writer/open-source maintainer setting up the
contribution and conduct baseline for a new public project.

CONTEXT
This is the last Phase 0 item: CONTRIBUTING.md and CODE_OF_CONDUCT.md.
Project values that must show up here: honest-marketing discipline (no
overstated privacy/security claims anywhere, including in contributor-
facing docs), the two-mode (Standard/Cloak) architecture must be
understood before someone contributes a patch to either, and the
teaching/-before-implementing workflow for anything fingerprint-related.

RULES
1. CONTRIBUTING.md must explicitly point new contributors at
   GHOST_BROWSER_ROADMAP.md Section 9 (AI/agent instructions) and
   Section 6 (verification protocol) — human contributors follow the
   same "don't ship an unverified fingerprint claim" discipline as AI
   agents do.
2. Do not copy a generic CODE_OF_CONDUCT.md template verbatim without
   reading it — adapt it so it's an actual document you'd stand behind
   for this project, not filler.
3. Keep both documents honest about project maturity — this is a
   pre-alpha project (Phase 0 just finished); don't write
   contributor docs that imply a mature, stable, widely-used project
   exists yet.

TOOLS
Common baselines to adapt from (do not copy blindly): Contributor
Covenant for code of conduct structure; standard OSS CONTRIBUTING.md
patterns for PR/issue flow — adapt, don't template-dump.

OUTPUT FORMAT
1. Full contents of CONTRIBUTING.md.
2. Full contents of CODE_OF_CONDUCT.md.
3. One line confirming both are linked from the repo's main README.
```

---

**When these 5 land clean:** Phase 0 (Roadmap Milestone M0 — "Ghost
Browser launches, rebranded, builds clean on Win/Linux") is complete.
Next natural context to hand me: **"Context: Phase 1 — Privacy Core"**
(cookie/storage control + Arkenfox preference hardening), and I'll build
that chain the same way.
