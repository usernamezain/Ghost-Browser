# teaching/

## Purpose
Reference clones of open-source browser projects, kept for study and adaptation purposes only. Contributors and AI agents use these as ground-truth source code to understand real fingerprinting patches, preference hardening, and browser architecture — instead of generating logic from guesses or training data.

> **⚠️ READ, DO NOT SHIP CODE FROM HERE ⚠️**
>
> Code in this directory is for study and reference only. Do not copy code directly from these repositories into Ghost Browser's production directories. Instead: read the patches, understand which fingerprint vector they address, document your understanding in `teaching/notes/`, and then write Ghost Browser's own implementation adapted from that understanding.

## Roadmap Phase
Populated in **Phase 0** (Foundation). Already contains reference clones — this directory is populated separately from the main skeleton.

## Contents
| Folder | Source | Purpose |
|---|---|---|
| `mullvad-browser/` | Mullvad Browser (GitHub) | **Primary reference** — fully open engine-level fingerprint patches |
| `tor-browser-patches/` | Tor Browser (GitLab) | Original uniformity/Tor Uplift patches |
| `arkenfox-userjs/` | Arkenfox user.js (GitHub) | Best-documented preference reference |
| `camoufox-scaffolding/` | Camoufox (GitHub) | Build/config structure only — core spoofing logic is closed-source |
| `dooble/` | Dooble | Lightweight Qt reference |
| `zen-browser/` | Zen Browser (GitHub) | Our actual fork base |
| `notes/` | Internal | Running technical notes as we learn each patch |

## Constraints
- Camoufox's core spoofing logic is closed-source. Study only the open build/config scaffolding. Do not attempt to extract or reverse-engineer the closed portions.
- Per Section 9: cite which upstream file/commit inspired any change in your commit message.
