# core/

## Purpose
The forked Zen Browser (Gecko) engine that powers **Ghost Standard mode** — the daily-driver browsing experience. This directory contains our own C++/JS patches on top of Zen, the default theme via userChrome, and Arkenfox-derived default preference sets. Ghost Standard prioritizes strong privacy hardening via Firefox's built-in Fingerprinting Protection (FPP) while preserving full UI customization freedom.

## Roadmap Phase
Populated in **Phase 0** (Foundation) and **Phase 1** (Privacy Core). The fork, rebrand, and telemetry stripping happen in Phase 0; preference hardening and cookie/storage control are built out in Phase 1.

## Subdirectories
- `patches/` — Our own C++/JS patches on top of Zen Browser
- `userchrome/` — Default theme and theming engine integration
- `prefs/` — Arkenfox-derived default preference sets
