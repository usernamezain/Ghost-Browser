# prefs/

## Purpose
Arkenfox-derived default preference sets (`user.js` overrides) that ship with Ghost Browser. These define the privacy-hardening baseline for Ghost Standard mode, including FPP configuration, referrer policy, WebRTC leak prevention, and cookie/storage defaults.

## Roadmap Phase
Populated in **Phase 1** (Privacy Core). Depends on studying `teaching/arkenfox-userjs/` first to understand each setting's rationale before importing. Currently empty.

## Constraints
Per Section 9, Rule 8: every preference change must be logged in `docs/preference-reference.md` as part of the same PR that introduces it. Undocumented `user_pref` entries are not acceptable.
