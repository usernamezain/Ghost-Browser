# docker/

## Purpose
Optional container isolation layer for advanced users who want disposable, containerized Ghost Cloak sessions. This directory will contain tooling to spin up and destroy containerized Ghost Cloak instances per session, providing an additional layer of isolation beyond the browser's built-in profile separation.

> **🛑 DO NOT BUILD THIS YET 🛑**
>
> This directory is **Phase 5** (Weeks 20+) and is explicitly designated as **optional**.
>
> **Phases 1–4 must be stable before any work begins here.** This is the largest scope jump in the project and carries significant infrastructure complexity.
>
> If you are an AI agent or contributor and you see this empty directory:
> - **Do NOT** start scaffolding container logic, Dockerfiles, or orchestration code
> - **Do NOT** add dependencies or build system changes for containerization
> - **Do NOT** treat this as a "quick win" to fill in while waiting on other work
> - **DO** focus your effort on Phases 1–4 instead
>
> Before building this out, the team must evaluate whether this duplicates existing tools (e.g., Kasm Workspaces). If an existing open-source isolation layer fits, we integrate rather than reinvent.

## Roadmap Phase
**Phase 5** (Docker Isolation Layer, Weeks 20+). **Optional.** Will not be started until Phases 1–4 are verified stable. Currently empty — and intentionally so.

## Planned Scope (When Phase 5 Eventually Begins)
- Containerized Ghost Cloak instances, spun up/destroyed per session
- Clear documentation that this is infrastructure-heavy and optional, not required for the core privacy model
- Evaluation of existing open-source isolation layers before building from scratch

## Constraints
- Per Section 2: the core browser must remain a native PC app, fully offline-capable. Docker isolation is supplementary, never required.
- Per Section 4 (Phase 5): "Only pursue this after Phases 1–4 are stable."
- Must not introduce paid service dependencies ($0 cost constraint).
