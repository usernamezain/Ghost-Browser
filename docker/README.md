# Phase 5: Docker Isolation Layer

**NOTICE: This is infrastructure-heavy and optional. It is not required for the core privacy model.**

The purpose of this directory is to provide a disposable containerized environment for running instances of Ghost Cloak. By spinning up Ghost Browser within a Docker container and streaming the UI via KasmVNC/noVNC, we ensure that each browsing session is completely isolated from the host operating system.

## How to run

1. Build the container:
   ```bash
   docker-compose build
   ```
2. Start a disposable session:
   ```bash
   docker-compose up
   ```
3. Access the browser UI by navigating to `http://localhost:8080/vnc.html` in your regular host browser.

When you are done, shut down and destroy the container to discard all session state.
