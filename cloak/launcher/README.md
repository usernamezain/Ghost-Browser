# launcher/

## Purpose
Handles the switching mechanism between the daily-driver browser (Ghost Standard) and the isolated Ghost Cloak instance. The launcher ensures Cloak runs as a separate, isolated process with its own profile directory, preventing any state leakage between modes.

## Roadmap Phase
Populated in **Phase 2** (Ghost Cloak, Weeks 6–14). Currently empty.

## Constraints
Per the two-mode rule (Section 0): the launcher must enforce clean separation between Standard and Cloak instances. They share no cookies, cache, storage, or runtime state.
