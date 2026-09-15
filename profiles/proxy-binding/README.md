# proxy-binding/

## Purpose
Binds a specific proxy configuration (SOCKS5/HTTP) to a given browser profile, so switching profiles automatically switches network identity. Includes a built-in proxy testing tool to confirm IP change and leak-test DNS/WebRTC. Optionally supports Tor as a selectable proxy mode for specific profiles.

## Roadmap Phase
Populated in **Phase 1** (Privacy Core). Currently empty.

## Constraints
Proxy configuration is per-profile, not global. Each profile must be able to have its own independent proxy settings, including no proxy at all.
