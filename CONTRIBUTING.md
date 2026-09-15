# Contributing to Ghost Browser

Thank you for your interest in Ghost Browser! Before you start, please read this document carefully.

**Project Status: PRE-ALPHA (Phase 0)**
Ghost Browser is currently in its foundational phase. It is not a mature project, and much of the architecture is still being built. We value honest documentation and expect all contributors to adhere to the same standard.

## 1. Ground Rules and Constraints

- **No Overstated Claims**: We do not pretend our browser makes users "untraceable" or "anonymous". If a feature offers "medium confidence" protection, we document it exactly as such in PRs, docs, and UI copy.
- **Two-Mode Architecture**: Ghost Browser uses a distinct two-mode split to resolve the tension between customization and fingerprint resistance:
  - **Ghost Standard**: For daily driving. Emphasizes customization, with medium-high fingerprint resistance.
  - **Ghost Cloak**: For high-threat research. Emphasizes uniformity, with minimal customization.
  
  **DO NOT** submit patches that attempt to merge these modes (e.g., adding deep customization to Cloak or extreme uniformity to Standard). Respect the separation.
- **AI/Agent Instructions**: Human contributors must follow the same rules outlined for AI agents in `GHOST_BROWSER_ROADMAP.md` Section 9.

## 2. The Teaching-Before-Implementing Workflow

Do not write fingerprinting-evasion or engine patch logic from scratch or guesswork.
Before proposing changes to fingerprint-related code:
1. Locate the relevant reference implementation in the `teaching/` directory (e.g., Mullvad, Tor browser patches).
2. Study the actual patch and understand its purpose.
3. Adapt it for Ghost Browser, and clearly cite the upstream file or commit that inspired your change in your PR description.

## 3. Pull Request and Issue Flow

- **Scope tightly**: We prefer small, independently-verifiable PRs. Submit one fingerprint vector, one UI component, or one preference group at a time. Large, sweeping PRs are harder to verify and review.
- **Document Preference Changes**: Any PR that modifies or introduces `user_pref` changes must also update `docs/preference-reference.md` in the same PR. Undocumented preference changes will be rejected.
- **Verification Protocol**: You must verify your fingerprinting claims before submitting a PR. Do not ship unverified claims. Run your changes against CreepJS, BrowserScan, AmIUnique, and Cover Your Tracks, and paste the actual test results in your PR description. (See Roadmap Section 6).

## 4. Building the Project

For build instructions and environment requirements, please refer to: `docs/dev-guide/build-environment.md`.

## 5. License

All contributions will inherit the MPL 2.0 license from our upstream base (Zen Browser/Gecko). By contributing, you agree to release your code under these terms.
