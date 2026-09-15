# engine-patches/

## Purpose
Engine-level patches that override individual fingerprint vectors (canvas, WebGL, AudioContext, fonts, timezone, screen resolution, hardware concurrency, etc.) to provide very high fingerprint resistance in Ghost Cloak mode. These patches are studied and adapted from Mullvad Browser's open Gecko patches, Tor Uplift patches, and Camoufox's open build/config scaffolding.

## Roadmap Phase
Populated in **Phase 2** (Ghost Cloak, Weeks 6–14). Each vector is implemented one at a time, each verified against the test suite before moving to the next. Currently empty.

## Constraints
- Per Section 9: do not write fingerprint-evasion logic from scratch or from training data alone. Locate the relevant file in `teaching/` first, read the actual patch, and adapt it — cite which upstream file/commit inspired the change.
- Camoufox's core spoofing logic is closed-source. Study only the open build/config scaffolding. Do not attempt to reverse-engineer the closed portions.
- Per the two-mode rule (Section 0): these patches apply only to Ghost Cloak mode and must never be merged into Ghost Standard's FPP-based approach.
