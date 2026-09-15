# Preference Reference

TBD — populated incrementally starting in Phase 1 (Privacy Core).

Every custom `user_pref` Ghost Browser ships, what it does, and why. Arkenfox-style documentation for our own overrides. Per Section 9 Rule 8: this document must be updated in the same PR that introduces any new preference change.

| Preference / Endpoint | What it does | How disabled | Risk if upstream re-enables |
| --- | --- | --- | --- |
| `toolkit.telemetry.enabled` | Mozilla Telemetry | `false` | High - sends usage data |
| `toolkit.telemetry.unified` | Unified Telemetry | `false` | High - core telemetry |
| `toolkit.telemetry.server` | Telemetry endpoint | `"data:,"` | High - sets invalid endpoint |
| `datareporting.healthreport.uploadEnabled` | Health report | `false` | Medium - sends health data |
| `datareporting.policy.dataSubmissionEnabled` | Data submission policy | `false` | High - enables data uploads |
| `app.shield.optoutstudies.enabled` | Shield Studies | `false` | Medium - enrolls in experiments |
| `app.normandy.enabled` | Normandy Studies | `false` | Medium - remote configurations |
| `app.normandy.api_url` | Normandy endpoint | `""` | Medium - disables API |
| `breakpad.reportURL` | Crash Reporter endpoint | `""` | High - prevents crash uploads |
| `browser.ping-centre.telemetry` | Ping Centre | `false` | Medium - sends pings |
| `network.cookie.cookieBehavior` | Total Cookie Protection | `5` | High - Reject track/partition cross-site |
| `network.cookie.lifetimePolicy` | Cookie Lifetime | `2` | Medium - Accept for session, auto-purge on close |
| `privacy.fingerprintingProtection` | Fingerprinting Protection (FPP) | `true` | High - FPP instead of RFP (which breaks custom UI) |
| `network.http.referer.XOriginPolicy` | Referrer Spoofing/Stripping | `2` | Medium - Only send referrer to same origin |
| `media.peerconnection.enabled` | WebRTC IP Leak Protection | `false` | High - Prevents IP leaks via WebRTC |
