# fingerprint-binding/

## Purpose
Binds a specific fingerprint identity (UA string, screen/font/GPU profile, timezone, etc.) to a given browser profile, so switching profiles switches identity consistently across all fingerprint vectors at once — not just one setting at a time.

## Roadmap Phase
Populated in **Phase 3** (Profile Architecture) and **Phase 2** (Ghost Cloak). Currently empty — depends on `cloak/engine-patches/` existing first, since fingerprint identities are only meaningfully enforced in Ghost Cloak mode.

## Constraints
Per Section 0: fingerprint-binding only applies meaningfully to Ghost Cloak profiles. Ghost Standard profiles use FPP's uniformity model instead and should not have per-profile fingerprint identities forced onto them — that would fight FPP's own approach.
