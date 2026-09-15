# Ghost Browser — Project Roadmap

**Codename:** Ghost Browser
**Type:** Privacy-hardened, fingerprint-resistant, fully customizable web browser
**Base engine:** Gecko (Firefox), forked from Zen Browser
**License target:** Open source (MPL 2.0 inherited, or dual MPL/GPL depending on component)
**Cost:** $0 — 100% free/open-source stack
**Runtime:** Native PC app (Windows + Linux first, macOS later), fully offline-capable
**Status:** Pre-build / research complete / architecture phase

---

## 0. Read This First — Philosophy & Honest Constraints

Before any code is written, everyone working on this (human or AI agent) needs to understand the core tension this project is built around, because it determines every architectural decision below.

> **Anti-fingerprinting via uniformity requires everyone to look identical. Deep UI customization requires your browser to look unique. You cannot maximize both with a single mechanism.**

Ghost Browser resolves this by **not pretending it's resolved**. Instead, it runs **two distinct operating modes**, and the user (or profile) explicitly chooses which one applies:

| Mode | Philosophy | Use case | Fingerprint resistance | Customization |
|---|---|---|---|---|
| **Ghost Standard** | Fingerprinting Protection (FPP) + hardened config, on Zen/Gecko base | Daily driving, general browsing | Medium-High | Full (themes, layout, dev tools) |
| **Ghost Cloak** | Engine-level entropy injection (Camoufox-derived approach), isolated instance | High-threat research, anti-bot bypass, sensitive OSINT | Very High | Minimal (uniform by design) |

This two-mode design is the single most important architectural decision in this document. Do not try to merge them into one mode — the research phase confirmed this breaks both.

**Also read:** this browser is a **privacy and anti-fingerprinting tool**, not an anonymity network. It does not replace Tor for high-stakes anonymity (whistleblowing, evading state-level adversaries, etc.). Ghost Cloak mode narrows the gap but does not erase it, since network-level traffic (IP address, TLS/JA3 fingerprint) is a separate problem from browser fingerprinting and requires pairing with a VPN/proxy layer, which is covered below.

---

## 1. Vision Statement

Ghost Browser is a free, open-source, offline-capable desktop browser for people who want serious control over their privacy and their browser's appearance/behavior without needing five different tools duct-taped together. It combines:

- Real engine-level and config-level anti-fingerprinting (not just an ad-blocker extension)
- Native multi-profile architecture with per-profile identity (proxy, fingerprint, geolocation)
- Zero persistent cookie/tracking storage by default
- A fully custom, theme-able UI (frameless windows, custom title bars, layout control)
- Built-in professional developer/researcher tooling, without needing the Chrome/Firefox extension store
- A clear, honest security model, documented in plain language, with no overstated claims

---

## 2. Non-Negotiable Constraints

- **$0 cost.** Every dependency, library, and base project must be free and open-source.
- **Native PC app.** No cloud streaming, no server dependency, no Docker-only deployment for the daily-driver mode.
- **Offline-capable.** Core browsing, profile management, theming, and fingerprint protection must all function without network access. (VPN/Tor/proxy features obviously require network — that's expected and fine.)
- **No telemetry.** Ghost Browser itself must never phone home. This applies to the project's own code, not just the upstream engine's telemetry (which is also stripped).
- **Honest marketing.** Internal docs and user-facing docs must never claim protection Ghost Browser doesn't actually provide. If a feature is "medium confidence," say so.

---

## 3. Architecture Overview

```
ghost-browser/
├── core/                      # Forked Zen Browser (Gecko) — Ghost Standard mode
│   ├── patches/                # Our own C++/JS patches on top of Zen
│   ├── userchrome/              # Default theme + theming engine
│   └── prefs/                  # Arkenfox-derived default preference sets
│
├── cloak/                     # Ghost Cloak mode — isolated high-resistance instance
│   ├── engine-patches/          # Studied from Mullvad + Tor Uplift + Camoufox scaffolding
│   └── launcher/                # Handles switching daily browser -> Cloak instance
│
├── profiles/                  # Multi-profile management system
│   ├── profile-manager/         # Create/switch/delete isolated profiles
│   ├── proxy-binding/           # Per-profile proxy/VPN assignment
│   ├── fingerprint-binding/     # Per-profile fingerprint identity (Cloak mode only)
│   └── geo-spoofing/            # Per-profile geolocation override
│
├── devtools/                  # Built-in professional tooling (native, not extensions)
│   ├── network-inspector/
│   ├── js-console-plus/
│   ├── fingerprint-auditor/     # Self-test against CreepJS/BrowserScan/AmIUnique
│   └── cookie-cookie-jar-ui/    # Visual cookie/storage control panel
│
├── theming/                   # UI customization layer
│   ├── userchrome-presets/
│   ├── title-bar-engine/        # Frameless window + custom title bar system
│   └── theme-marketplace/       # Local, offline-first theme browser (like Zen Mods)
│
├── docker/                    # Phase 3 — optional container isolation layer
│
├── teaching/                  # Reference clones — READ, DO NOT SHIP CODE FROM HERE
│   ├── mullvad-browser/
│   ├── tor-browser-patches/
│   ├── arkenfox-userjs/
│   ├── camoufox-scaffolding/
│   ├── dooble/
│   └── notes/                   # Running technical notes as we learn each patch
│
├── docs/                      # User + developer documentation
└── ai-instructions/            # Agent task specs (see Section 9)
```

---

## 4. Feature Roadmap by Phase

### Phase 0 — Foundation (Weeks 1–2)
Goal: get a rebrand-able, buildable base with the profile skeleton in place.

- [ ] Fork Zen Browser, confirm it builds locally on Windows + Linux
- [ ] Rebrand: app name, icons, default splash, about page → "Ghost Browser"
- [ ] Strip all upstream telemetry pings (verify via network capture during build)
- [ ] Set up `teaching/` folder with clones (see Section 8)
- [ ] Establish CI build pipeline (GitHub Actions, free tier)
- [ ] Write CONTRIBUTING.md and CODE_OF_CONDUCT.md

### Phase 1 — Ghost Standard: Privacy Core (Weeks 2–6)
Goal: a genuinely private daily-driver browser, no fingerprint-evasion moonshots yet.

**Cookie & Storage Control**
- [ ] Total Cookie Protection enabled by default (per-site containers, no cross-site cookie leakage)
- [ ] Default: no persistent cookies unless the user explicitly allows a site (allow-list model, not block-list)
- [ ] Visual cookie/storage control panel (devtools/cookie-jar-ui) — see per-site storage, wipe with one click
- [ ] Auto-purge on profile close, configurable per profile

**Preference Hardening**
- [ ] Import and adapt Arkenfox user.js v144+ as the default preference baseline
- [ ] Default to `privacy.fingerprintingProtection` (FPP), not `resistFingerprinting` + letterboxing, to preserve custom UI (documented tradeoff — see Section 0)
- [ ] Expose an "Advanced / Paranoid" toggle in settings that switches a profile to full RFP + letterboxing for users who want max protection over UI freedom on that specific profile
- [ ] Strip referrer headers cross-origin by default
- [ ] Disable WebRTC IP leak vector by default (configurable)

**Multi-Profile System**
- [ ] Native profile creation/switching UI (build on Firefox's existing profile architecture, don't rewrite it)
- [ ] Each profile: isolated cookies, cache, storage, extensions/tools, and identity settings
- [ ] Quick-switch UI (profile picker on new window, not buried in settings)
- [ ] Profile templates (e.g., "Banking," "Research," "Anonymous Browsing" presets with different default hardening levels)

**Geolocation Spoofing**
- [ ] Implement Data URI-based location override (`geo.provider.network.url`) per profile
- [ ] Settings UI: pick a location on a map or enter coordinates manually, no extension needed
- [ ] Disable OS-level geo providers (`geo.provider.use_geoclue`, `use_corelocation`) by default
- [ ] Validate: confirm spoofed location holds up under `navigator.geolocation` test pages

**Per-Profile Proxy Support**
- [ ] Native proxy configuration per profile (SOCKS5/HTTP), not global-only
- [ ] Built-in proxy testing tool (confirm IP change, leak-test DNS/WebRTC)
- [ ] Optional: Tor integration as a selectable proxy mode for specific profiles

### Phase 2 — Ghost Cloak: Engine-Level Fingerprint Resistance (Weeks 6–14)
Goal: build the high-resistance isolated mode, studied from real open-source engine patches.

- [ ] Study Mullvad Browser's Gecko patches (fully open) — build a checklist of every fingerprint vector they address (canvas, WebGL, AudioContext, fonts, timezone, screen, hardware concurrency, etc.)
- [ ] Study Tor Uplift patches — origin of the uniformity technique
- [ ] Study Camoufox's open scaffolding (build/config system only — spoofing core is closed-source, do not attempt to reverse-engineer it; build our own from Mullvad/Tor patches instead)
- [ ] Implement per-vector engine-level overrides, one at a time, each verified against test suites before moving to the next
- [ ] Build "Cloak Identity Generator" — statistically plausible, internally consistent fake hardware/software profiles (own implementation, inspired by the *concept* of BrowserForge, not copied code)
- [ ] Per-profile fingerprint binding — each Cloak profile gets a distinct, consistent identity
- [ ] Document known limitation up front: TLS/JA3 handshake will still reveal Gecko-based traffic regardless of spoofed UA — be transparent about this in docs, don't oversell
- [ ] Resource budgeting: keep Cloak instance launch time and RAM usage reasonable; document expected overhead vs. Ghost Standard

### Phase 3 — Theming & Customization Engine (Weeks 10–16, parallel with Phase 2)
Goal: give users real visual/functional control without breaking Phase 1's protections.

- [ ] Native theming engine built on userChrome.css / userContent.css, exposed through a GUI (no manual file editing required for standard users; power users can still hand-edit)
- [ ] Frameless window mode + custom title bar system
- [ ] Vertical tabs, sidebar layouts, workspace switching (Zen-inspired, our own implementation)
- [ ] Offline-first local theme marketplace — ship a curated set of themes with the browser, allow importing community themes from local files (no forced network dependency)
- [ ] Explicit UI warning when a user enables a Paranoid/RFP profile + custom theme simultaneously, explaining the letterboxing conflict documented in research (Section 0)

### Phase 4 — Built-In Developer & Researcher Tools (Weeks 14–20, parallel)
Goal: give devs/researchers professional tooling natively, no extension store dependency.

- [ ] Network request inspector (built on `QWebEngineUrlRequestInterceptor`-equivalent Gecko hooks)
- [ ] Enhanced JS console with saved snippets, per-profile script injection
- [ ] **Fingerprint Auditor** — one-click self-test that runs the profile against CreepJS, BrowserScan, AmIUnique, EFF Cover Your Tracks, and Fingerprint.com test pages, and reports a plain-language score + what's leaking
- [ ] Header/request editor for manual testing
- [ ] Local HTTP archive (HAR) export for research documentation
- [ ] Built-in note-taking/annotation panel for OSINT-style research workflows

### Phase 5 — Docker Isolation Layer (Optional, Weeks 20+)
Goal: additional isolation for advanced users who want disposable, containerized sessions on top of everything above.

- [ ] Only pursue this after Phases 1–4 are stable — this is the largest scope jump in the project
- [ ] Containerized Ghost Cloak instances, spun up/destroyed per session
- [ ] Document clearly that this is infrastructure-heavy and optional, not required for the core privacy model
- [ ] Evaluate whether this duplicates existing tools (e.g., Kasm Workspaces) before building from scratch — if an existing open-source isolation layer fits, integrate rather than reinvent

### Phase 6 — Polish, Audit, Public Release (Ongoing)
- [ ] Third-party or community security review of preference set and patches
- [ ] Full documentation pass (Section 10)
- [ ] Accessibility pass (keyboard nav, screen reader compatibility for the custom UI — custom title bars and frameless windows are notorious for breaking this if untested)
- [ ] Cross-platform QA (Windows/Linux at minimum)
- [ ] Versioned release process + changelog discipline

---

## 5. Security Model (Document This Honestly, Always)

Ghost Browser protects against:
- Persistent cookie-based tracking (via Total Cookie Protection + allow-list model)
- Cross-site tracking via storage/cache correlation
- Basic-to-intermediate canvas/WebGL/font/AudioContext fingerprinting (Ghost Standard, via FPP)
- Advanced fingerprinting heuristics including CreepJS-style detection (Ghost Cloak, via engine-level patches)
- IP-based geolocation queries (via spoofed provider)
- Casual network eavesdropping of DNS/WebRTC leaks (via leak-testing tools + proxy support)

Ghost Browser does **not** protect against:
- Network-level deanonymization by a resourced adversary (state-level actors, ISP-level surveillance) — that requires Tor's onion routing, which Ghost Browser can integrate as a proxy option but does not replace
- TLS/JA3-level fingerprinting distinguishing Gecko from other engines, even in Cloak mode
- Malicious extensions/tools the user installs themselves that break isolation
- Physical device compromise, keyloggers, or OS-level malware

This section must ship in the user-facing docs verbatim in spirit — no marketing language that overstates protection.

---

## 6. Testing & Verification Protocol

Every fingerprinting-related change must be verified before merging, not assumed correct:

1. Run the change against **CreepJS** (https://abrahamjuliot.github.io/creepjs/) — check trust score
2. Run against **BrowserScan** and **AmIUnique**
3. Run against **EFF's Cover Your Tracks**
4. Confirm internal consistency manually (e.g., does a spoofed macOS UA also report Apple-plausible fonts/GPU renderer?)
5. Log results in `teaching/notes/verification-log.md` with date, commit hash, and score, so regressions are traceable over time

AI agents must not mark a fingerprinting task "done" without pasting actual test results into the PR/commit description. Self-reported confidence from an agent is not sufficient evidence.

---

## 7. Documentation Plan (`docs/`)

- `docs/user-guide/` — plain-language guide for non-technical users (profile setup, theming, what each protection level means)
- `docs/security-model.md` — the honest capabilities/limitations doc (Section 5, expanded)
- `docs/dev-guide/` — build instructions, architecture overview, how to add a new patch safely
- `docs/preference-reference.md` — every custom `user_pref` we ship, what it does, and why (Arkenfox-style documentation, but for our own overrides)
- `docs/theming-guide.md` — how to build/install a Ghost theme
- `docs/faq.md`
- `docs/threat-models.md` — worked examples: "if you're worried about X, use profile template Y"
- `CHANGELOG.md` — every release, every fingerprint-relevant change flagged clearly

---

## 8. Reference Material (`teaching/` folder)

This folder exists so contributors and AI agents have **real ground-truth source code** to study and adapt from, instead of generating fingerprinting logic from guesses. Clone these into `teaching/` before starting Phase 2:

| Folder | Source | Purpose |
|---|---|---|
| `teaching/mullvad-browser/` | github.com/mullvad/mullvad-browser | **Primary reference** — fully open engine-level fingerprint patches |
| `teaching/tor-browser-patches/` | gitlab.torproject.org/tpo/applications/tor-browser | Original uniformity/Tor Uplift patches |
| `teaching/arkenfox-userjs/` | github.com/arkenfox/user.js | Best-documented preference reference, explains *why* per setting |
| `teaching/camoufox-scaffolding/` | github.com/daijro/camoufox | Build/config structure only — core spoofing logic is closed-source, do not attempt to extract or reverse-engineer it |
| `teaching/dooble/` | github source (Dooble Wikipedia/project page) | Lightweight Qt reference, useful if a low-resource fallback build is ever pursued |
| `teaching/zen-browser/` | github.com/zen-browser/desktop | Our actual fork base — study their userChrome/theming architecture directly |

Maintain `teaching/notes/` as a living document: for every patch studied, write down which fingerprint vector it addresses, in plain language, before implementing our own version.

---

## 9. Instructions for AI Coding Agents

**Read this before generating any code for this project.**

1. **Do not write fingerprinting-evasion or engine patch logic from scratch/from training data alone.** Locate the relevant file in `teaching/` first, read the actual patch, and adapt it — cite which upstream file/commit inspired the change in your commit message.
2. **Do not claim a fingerprint fix "works" without running it through the verification protocol in Section 6** and pasting real output.
3. **Respect the two-mode split (Section 0).** Never propose merging Ghost Standard's customization freedom directly into Ghost Cloak's uniformity model, or vice versa — this recreates the exact contradiction the research phase identified.
4. **When unsure whether a Qt/Gecko API exists**, check the actual doc source (doc.qt.io for Qt, searchfox.org for Gecko/Firefox source) rather than guessing — Gecko-internals and QtWebEngine are both low-representation in general training data and hallucination risk is high here.
5. **Never invent security claims for docs or UI copy.** If a feature is untested or partial, say so explicitly (e.g., "reduces fingerprint uniqueness" not "makes you untraceable").
6. **Scope tasks tightly.** Prefer many small, independently-verifiable PRs (one fingerprint vector, one UI component, one pref group at a time) over large multi-feature changes that are hard to verify.
7. **Flag anything that would require closed-source code, paid services, or network-dependent infrastructure** back to the human maintainer — this violates the $0/offline-first constraint and needs explicit sign-off before proceeding.
8. **Log all preference changes** in `docs/preference-reference.md` as part of the same PR that introduces them — undocumented `user_pref` entries are not acceptable.

---

## 10. Milestone Summary

| Milestone | Target | Success criteria |
|---|---|---|
| M0 — Buildable fork | Week 2 | Ghost Browser launches, rebranded, builds clean on Win/Linux |
| M1 — Privacy core | Week 6 | Cookie control, profiles, geo-spoofing, proxy support all functional |
| M2 — Cloak mode alpha | Week 14 | Passes CreepJS with a documented trust score, internally consistent identity |
| M3 — Theming engine | Week 16 | Frameless UI, custom title bar, at least 3 shipped themes |
| M4 — Dev tools suite | Week 20 | Fingerprint Auditor, network inspector, console all shipped |
| M5 — Public alpha release | Week 22–24 | Full docs published, security model documented, community feedback loop open |

---

## 11. Open Questions (Resolve Before Phase 2 Starts)

- [ ] Exact scope of "advanced developer tools" — confirm final list with maintainer before Phase 4 begins
- [ ] Windows vs. Linux build priority — which ships first?
- [ ] Whether Docker isolation (Phase 5) is truly needed given the two-mode architecture already provides strong separation
- [ ] Update cadence — how will Ghost Browser track upstream Zen/Firefox security patches without falling behind?

---

*This document is a living roadmap. Update it as phases complete or scope changes — do not let the shipped product silently drift from what's documented here.*
