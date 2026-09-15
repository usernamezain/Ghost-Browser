# cloak/

## Purpose
Ghost Cloak mode — the isolated, high-resistance browser instance designed for advanced anti-fingerprinting. Unlike Ghost Standard (which uses Firefox's built-in FPP for medium-high protection while allowing full UI customization), Ghost Cloak applies engine-level entropy injection studied from Mullvad Browser, Tor Uplift, and Camoufox's open scaffolding to achieve very high fingerprint resistance at the cost of minimal customization.

> **⚠️ CRITICAL ARCHITECTURAL CONSTRAINT — TWO-MODE RULE ⚠️**
>
> Ghost Cloak and Ghost Standard are **two distinct operating modes** and must **NEVER be merged into a single mechanism**.
>
> This is the single most important architectural decision in the entire project (Roadmap Section 0). The research phase confirmed that anti-fingerprinting via uniformity (everyone looks identical) and deep UI customization (your browser looks unique) are fundamentally contradictory goals. Attempting to maximize both with a single mechanism breaks both.
>
> **Do not:**
> - Merge Cloak's uniformity model into Standard's customizable UI
> - Merge Standard's theming freedom into Cloak's locked-down identity
> - Propose a "unified mode" that tries to do both
> - Move code from one mode into the other without explicit maintainer sign-off
>
> If you are an AI agent and are tempted to "simplify" by combining these modes, **stop and re-read Section 0 of the roadmap**. This separation exists because the alternative was proven not to work.

## Roadmap Phase
Populated in **Phase 2** (Ghost Cloak: Engine-Level Fingerprint Resistance, Weeks 6–14). Depends on `teaching/` reference material being studied first. Currently empty.

## Subdirectories
- `engine-patches/` — Engine-level fingerprint vector overrides, studied from Mullvad + Tor Uplift + Camoufox scaffolding
- `launcher/` — Handles switching between the daily browser (Ghost Standard) and the Cloak instance

## Constraints
- Fingerprint-binding only applies meaningfully to Ghost Cloak profiles. Ghost Standard profiles use FPP's uniformity model instead.
- Per Section 9: do not write fingerprinting-evasion logic from scratch. Study `teaching/` references first.
- Per Section 6: every fingerprinting change must be verified against CreepJS, BrowserScan, AmIUnique, and EFF Cover Your Tracks before being marked done.
- TLS/JA3 fingerprinting limitation must be documented honestly — Cloak does not hide that the browser is Gecko-based at the network level.
