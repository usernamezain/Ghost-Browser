# theming/

## Purpose
The UI customization layer for Ghost Browser. Provides a native theming engine built on userChrome.css / userContent.css exposed through a GUI, frameless window mode with custom title bars, and an offline-first local theme marketplace. This layer applies to **Ghost Standard mode only** — Ghost Cloak mode intentionally restricts customization to maintain fingerprint uniformity.

## Roadmap Phase
Populated in **Phase 3** (Theming & Customization Engine, Weeks 10–16, parallel with Phase 2). Currently empty.

## Subdirectories
- `userchrome-presets/` — Pre-built userChrome.css theme presets
- `title-bar-engine/` — Frameless window + custom title bar system
- `theme-marketplace/` — Local, offline-first theme browser

## Constraints
Per Section 0: an explicit UI warning must be shown when a user enables a Paranoid/RFP profile + custom theme simultaneously, explaining the letterboxing conflict.
