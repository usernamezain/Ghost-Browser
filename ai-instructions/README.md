# ai-instructions/

## Purpose
Agent task specifications and rules for AI coding agents working on Ghost Browser. This directory ensures that any AI agent opening just this folder gets the full set of project rules without needing to read the entire roadmap document.

## Roadmap Phase
Populated in **Phase 0** (Foundation). This is a living document — update as project rules evolve.

---

## Instructions for AI Coding Agents

**Read this before generating any code for this project.**

1. **Do not write fingerprinting-evasion or engine patch logic from scratch/from training data alone.** Locate the relevant file in `teaching/` first, read the actual patch, and adapt it — cite which upstream file/commit inspired the change in your commit message.

2. **Do not claim a fingerprint fix "works" without running it through the verification protocol** (see `GHOST_BROWSER_ROADMAP.md` Section 6) **and pasting real output.** Self-reported confidence from an agent is not sufficient evidence.

3. **Respect the two-mode split.** Never propose merging Ghost Standard's customization freedom directly into Ghost Cloak's uniformity model, or vice versa — this recreates the exact contradiction the research phase identified. Ghost Cloak and Ghost Standard are two distinct operating modes and must NEVER be merged into a single mechanism.

4. **When unsure whether a Gecko API exists**, check the actual doc source (searchfox.org for Gecko/Firefox source) rather than guessing — Gecko internals are low-representation in general training data and hallucination risk is high.

5. **Never invent security claims for docs or UI copy.** If a feature is untested or partial, say so explicitly (e.g., "reduces fingerprint uniqueness" not "makes you untraceable").

6. **Scope tasks tightly.** Prefer many small, independently-verifiable PRs (one fingerprint vector, one UI component, one pref group at a time) over large multi-feature changes that are hard to verify.

7. **Flag anything that would require closed-source code, paid services, or network-dependent infrastructure** back to the human maintainer — this violates the $0/offline-first constraint and needs explicit sign-off before proceeding.

8. **Log all preference changes** in `docs/preference-reference.md` as part of the same PR that introduces them — undocumented `user_pref` entries are not acceptable.

## Verification Protocol

Every fingerprinting-related change must be verified before merging:

1. Run against **CreepJS** (https://abrahamjuliot.github.io/creepjs/) — check trust score
2. Run against **BrowserScan** and **AmIUnique**
3. Run against **EFF's Cover Your Tracks**
4. Confirm internal consistency (e.g., does a spoofed macOS UA also report Apple-plausible fonts/GPU renderer?)
5. Log results in `teaching/notes/verification-log.md` with date, commit hash, and score

## Key Architectural Constraints

- **Two-Mode Rule:** Ghost Standard and Ghost Cloak are separate modes. Never merge them.
- **$0 Cost:** Every dependency must be free and open-source.
- **Offline-Capable:** Core functionality must work without network access.
- **No Telemetry:** Ghost Browser must never phone home.
- **Honest Documentation:** Never overstate protection capabilities.

## Reference
For the full project roadmap, see `GHOST_BROWSER_ROADMAP.md` in the repository root.
