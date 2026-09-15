# profiles/

## Purpose
The multi-profile management system for Ghost Browser. Each profile operates as a fully isolated browsing identity with its own cookies, cache, storage, extensions, proxy configuration, fingerprint identity (in Cloak mode), and geolocation settings. Profiles are the primary mechanism through which users organize and compartmentalize their browsing activities.

## Roadmap Phase
Populated in **Phase 1** (Privacy Core, Weeks 2–6) for the core profile manager, proxy binding, and geo-spoofing. Fingerprint binding is populated in **Phase 2** (Ghost Cloak) since per-profile fingerprint identities only apply meaningfully in Cloak mode.

## Subdirectories
- `profile-manager/` — Create, switch, delete isolated profiles; profile templates
- `proxy-binding/` — Per-profile proxy/VPN assignment
- `fingerprint-binding/` — Per-profile fingerprint identity (Cloak mode only)
- `geo-spoofing/` — Per-profile geolocation override
