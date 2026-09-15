# Build Environment Setup Guide

## Status: BLOCKED — Prerequisites Not Met

This document records the exact toolchain requirements for building Ghost Browser
(Zen Browser fork, Gecko/Firefox engine) and the current state of the build environment.

Last updated: 2026-09-15

---

## Required Toolchain (from Zen Browser build docs)

Zen Browser requires the following to build from source. These are Gecko/Firefox
build requirements with Zen-specific additions.

### All Platforms

| Tool | Required Version | Purpose |
|---|---|---|
| Git | Any recent | Source control |
| Node.js | 21+ | Dependency management, build scripts |
| Python | 3.x | Mozilla build system (moz.build, mach) |
| Rust + Cargo | Stable (via rustup) | Gecko Rust components |
| sccache | Latest | Compile caching (speeds up rebuilds significantly) |
| Disk space | **30 GB minimum** | Source + objdir + toolchains |

### Windows-Specific

| Tool | Required Version | Purpose |
|---|---|---|
| Visual Studio | 2022 with "Desktop development with C++" workload | MSVC compiler (cl.exe), Windows SDK |
| MozillaBuild | Latest (mozilla.org) | MSYS2 shell environment for Gecko build on Windows |
| 7-Zip | Latest, in PATH | Archive extraction during bootstrap |

### Linux-Specific

| Tool | Required Version | Purpose |
|---|---|---|
| GCC or Clang | System package | C/C++ compilation |
| Various system libs | See `mach bootstrap` output | GTK, X11/Wayland, etc. |

---

## Current Environment Audit (Windows, 2026-09-15)

### What's Present

| Tool | Version | Status |
|---|---|---|
| Git | 2.52.0.windows.1 | OK |
| Node.js | v25.2.1 | OK (exceeds 21+ requirement) |
| npm | 11.6.4 | OK |
| Python | 3.14.0 | OK |
| Visual Studio | 2022 installed | NEEDS VERIFICATION — "Desktop development with C++" workload not confirmed via vswhere |

### What's Missing or Broken

| Tool | Issue | Fix |
|---|---|---|
| **Disk space** | **10.7 GB free — need 30 GB minimum** | Free up ~20 GB or use a different drive |
| Rust/Cargo | rustup installed but no default toolchain set | Run `rustup default stable` |
| MozillaBuild | Not installed (C:\mozilla-build does not exist) | Download from https://ftp.mozilla.org/pub/mozilla/libraries/win32/MozillaBuildSetup-Latest.exe |
| 7-Zip | Not in PATH | Install from https://7-zip.org and add to PATH |
| sccache | Not installed | `cargo install sccache` (after Rust is set up) |
| clang/cl.exe | Not in PATH from PowerShell | May be available inside MozillaBuild shell or VS Developer Command Prompt — needs MozillaBuild first |

---

## Zen Browser Build Steps (Reference)

Once all prerequisites are installed, the build process is:

```bash
# 1. Clone Zen Browser source (shallow clone to save space/time)
git clone https://github.com/zen-browser/desktop.git --depth 10
cd desktop

# 2. Install npm dependencies
npm install

# 3. Initialize — downloads Firefox source, applies Zen patches
npm run init

# 4. Build the browser
npm run build

# 5. Run the built browser
npm start
```

NOTE: `npm run init` downloads the full Firefox/Gecko source tree (~15-20 GB).
This is the step that requires the bulk of the disk space.

---

## mozconfig

Not yet generated — build has not been attempted. The mozconfig will be created
by `npm run init` or during the `mach build` step. It will be recorded here
once a build is successfully attempted.

---

## Next Steps

1. Free up disk space to at least 30 GB (preferably 40 GB for safety)
2. Run `rustup default stable` to set up Rust toolchain
3. Install MozillaBuild from mozilla.org
4. Install 7-Zip and add to PATH
5. Verify VS 2022 has the "Desktop development with C++" workload installed
6. Install sccache via `cargo install sccache`
7. Re-attempt the build following the steps above
