# Ghost Browser

A free, open-source, privacy-hardened desktop browser built on Gecko (Firefox) via a Zen Browser fork.

Ghost Browser gives you real anti-fingerprinting, multi-profile isolation, and full UI customization without needing five different tools duct-taped together.


## 🚧 Current Status
Ghost Browser is currently in **Pre-Alpha**. 

- **Phase 0 (Foundation):** Complete (Forked, rebranded, and upstream telemetry stripped).
- **Phase 1 (Privacy Core):** Scaffolded (Total Cookie Protection, strict referrers, Arkenfox base, Multi-Profile UI, and High-Contrast Monochromatic Theme implemented in `core/`).
- **Phase 2 (Ghost Cloak):** Scaffolded (WebGL/Canvas spoofing, Timezone UTC enforcement, Hardware Concurrency spoofing, and Deterministic Profile Identity Generator built in `core/`).
- **Phase 3 (Theming Engine):** Scaffolded (Offline-First Local Theme Marketplace and strict RFP warning logic integrated).
- **Phase 4 (DevTools):** Scaffolded (Native Fingerprint Auditor and OSINT Notes Panel added to `core/`).

> [!WARNING]
> This browser is currently undergoing structural changes. Do not use this for critical security or privacy tasks yet. Telemetry and fingerprinting mitigations are being actively ported.

## 🛠 Building Ghost Browser
We build natively using GitHub Actions to overcome local compilation limits.
Check the **Actions** tab to download the latest artifact binary for your OS (Windows + Linux first, macOS later) that combines:

- Engine-level and config-level anti-fingerprinting (not just an ad-blocker extension)
- Native multi-profile architecture with per-profile identity (proxy, fingerprint, geolocation)
- Zero persistent cookie/tracking storage by default
- A fully customizable, theme-able UI (frameless windows, custom title bars, layout control)
- Built-in developer and researcher tooling, without needing any extension store
- An honest security model documented in plain language with no overstated claims


## Two Operating Modes

Ghost Browser runs two distinct modes. This is the core architectural decision.

Ghost Standard
- Daily-driver mode built on Zen/Gecko with Firefox Fingerprinting Protection (FPP)
- Full UI customization (themes, layout, dev tools)
- Medium-high fingerprint resistance
- Use for: general browsing, daily driving

Ghost Cloak
- Isolated high-resistance instance with engine-level entropy injection
- Minimal customization (uniform by design)
- Very high fingerprint resistance
- Use for: high-threat research, anti-bot bypass, sensitive OSINT

These two modes are never merged into one. The research phase confirmed that uniformity-based anti-fingerprinting and deep UI customization are contradictory goals. Trying to do both in one mechanism breaks both.


## Project Structure

ghost-browser/
  core/               Forked Zen Browser (Gecko) engine for Ghost Standard mode
    patches/           C++/JS patches on top of Zen
    userchrome/        Default theme and theming engine
    prefs/             Arkenfox-derived default preference sets

  cloak/              Ghost Cloak mode, isolated high-resistance instance
    engine-patches/    Engine-level fingerprint overrides
    launcher/          Switching between Standard and Cloak instances

  profiles/           Multi-profile management system
    profile-manager/   Create, switch, delete isolated profiles
    proxy-binding/     Per-profile proxy/VPN assignment
    fingerprint-binding/ Per-profile fingerprint identity (Cloak mode only)
    geo-spoofing/      Per-profile geolocation override

  devtools/           Built-in professional tooling (native, not extensions)
    network-inspector/ Network request inspector
    js-console-plus/   Enhanced JS console with saved snippets
    fingerprint-auditor/ Self-test against fingerprinting test suites
    cookie-cookie-jar-ui/ Visual cookie/storage control panel

  theming/            UI customization layer
    userchrome-presets/ Pre-built theme presets
    title-bar-engine/  Frameless window + custom title bar system
    theme-marketplace/ Local, offline-first theme browser

  docker/             Phase 5, optional container isolation (not started)
  teaching/           Reference clones for study only
  docs/               User and developer documentation
  ai-instructions/    Agent task specs and rules


## Current Status

Phase 0 (Foundation) — in progress.

Folder skeleton and documentation complete. Build environment audited on Windows — blocked by
missing prerequisites (10.7 GB free disk, need 30 GB; MozillaBuild, sccache, 7-Zip not installed;
Rust toolchain not configured). See docs/dev-guide/build-environment.md for the full audit and
fix list. No build has been attempted yet locally. CI pipeline is set up in GitHub Actions to build on Windows and Linux, but the first run has not happened yet. Fork target: Zen Browser commit 644bf48b (2026-09-14).


## Roadmap Phases

Phase 0 - Foundation: Fork Zen Browser, rebrand, strip telemetry, set up CI
Phase 1 - Ghost Standard Privacy Core: Cookie control, profiles, geo-spoofing, proxy support
Phase 2 - Ghost Cloak: Engine-level fingerprint resistance, Cloak identity generator
Phase 3 - Theming Engine: Native theming GUI, frameless windows, theme marketplace
Phase 4 - Developer Tools: Network inspector, fingerprint auditor, enhanced console
Phase 5 - Docker Isolation: Optional containerized sessions (only after Phases 1-4 are stable)
Phase 6 - Polish and Release: Security audit, full docs, accessibility, cross-platform QA


## Non-Negotiable Constraints

- $0 cost. Every dependency must be free and open-source.
- Native PC app. No cloud streaming, no server dependency.
- Offline-capable. Core features work without network access.
- No telemetry. Ghost Browser never phones home.
- Honest documentation. Never overstate what the browser protects against.


## What Ghost Browser Does NOT Protect Against

This section exists because honesty matters more than marketing.

- Network-level deanonymization by state-level adversaries (that requires Tor)
- TLS/JA3 fingerprinting that reveals the browser is Gecko-based
- Malicious extensions the user installs themselves
- Physical device compromise, keyloggers, or OS-level malware


## License

Open source. MPL 2.0 inherited from upstream, or dual MPL/GPL depending on component.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, development workflow, and the verification protocol for privacy features. All contributors must also adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), which includes strict rules against overstated security claims. For the full project roadmap and agent rules, see the GHOST_BROWSER_ROADMAP.md file and ai-instructions/.
