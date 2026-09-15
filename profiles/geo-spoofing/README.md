# geo-spoofing/

## Purpose
Implements per-profile geolocation override using Data URI-based location spoofing (`geo.provider.network.url`). Provides a settings UI where users can pick a location on a map or enter coordinates manually — no extension needed. Disables OS-level geo providers by default.

## Roadmap Phase
Populated in **Phase 1** (Privacy Core). Currently empty.

## Constraints
Must validate that the spoofed location holds up under `navigator.geolocation` test pages. Geo-spoofing is per-profile — each profile can have a different spoofed location.
