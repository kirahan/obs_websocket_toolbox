# OBS Websocket Toolkit

**[中文文档](./README_CN.md)**

Modular OBS WebSocket toolkit — debug, direct, monitor and integrate.

Live demo: **[https://kirahan.github.io/obs_websocket_toolbox](https://kirahan.github.io/obs_websocket_toolbox)**

Built on the official [obs-websocket](https://github.com/obsproject/obs-websocket) protocol ([Protocol.md](https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md)). Supports OBS 28+ and obs-websocket 5.x.

---

## Overview

OBS Websocket Toolkit is a browser-based suite of tools for working with OBS WebSocket. Instead of a single debug page, it provides **independent modules** for different workflows — from protocol exploration and live production control to event monitoring and screenshot export.

**Cross-cutting features**

| Feature | Description |
|---------|-------------|
| **Command Palette** (`⌘K` / `Ctrl+K`) | Search any Request, Event, preset or connection profile from anywhere |
| **Protocol doc panel** | Open API documentation in a side iframe without leaving the current module |
| **Bottom bar** | Shared OBS connection, version info and resource stats |
| **i18n** | English, Simplified Chinese, Traditional Chinese |
| **Protocol sync** | Auto-sync request/event definitions from upstream obs-websocket docs |

![Home — module hub](./screenshots/home/overview.png)

![Protocol doc side panel](./screenshots/home/protocol-doc-panel.png)

> All screenshots live under [`screenshots/`](./screenshots/) by module. See [`screenshots/README.md`](./screenshots/README.md).

---

## Modules

### Debugger

The original core of this project — connect to OBS (or the built-in Simulator), browse the full protocol tree, send requests, inspect responses, and watch events in real time.

**Key capabilities**

- Protocol browser with search (Requests + Events)
- Request form builder, payload preview, presets and diff inspector
- Live event viewer with filter, pause and JSON tree/raw view
- Connection profiles and subscription configuration

| | |
|---|---|
| Route | `/debug` |

![Connected to Simulator](./screenshots/debugger/connected.png)

![Request detail — GetVersion](./screenshots/debugger/request-detail.png)

![Search requests or events](./screenshots/debugger/search.png)

![Event viewer](./screenshots/debugger/event-viewer.png)

![JSON drawer](./screenshots/debugger/json-drawer.png)

---

### Controller 3.0

Unified live production console. Combines scene preview, PVW/PGM monitors, transitions, scene tree and audio mixing in one resizable layout.

**Key capabilities**

- Dual PVW/PGM monitors with periodic scene screenshots (Studio Mode aware)
- Transition bar: type, duration, T-Bar, Transition and Cut
- Scene panel with thumbnails, PROGRAM/PREVIEW badges, refresh and batch export
- Scene tree with visibility/lock toggles and filter details
- Compact audio strips with volume, mute and level meters
- Toolbar: Record, Stream, Studio Mode, Virtual Camera

| | |
|---|---|
| Route | `/controller` |

![Controller 3.0](./screenshots/controller/overview.png)

---

### OBS Simulator

Run a mock obs-websocket 5.x server in the browser — no local OBS install required for development and testing.

**Key capabilities**

- Start/stop in-browser WebSocket simulator
- Editable mock state (scenes, streaming, recording, studio mode, etc.)
- Custom response overrides per request type
- Manual event broadcast with JSON payload
- One-click connect from Simulator to Debugger

| | |
|---|---|
| Route | `/simulator` |

![OBS Simulator](./screenshots/simulator/overview.png)

---

### Batch Runner

Visually compose and execute multiple WebSocket requests — useful for multi-step workflows and testing batch-only requests like `Sleep`.

**Key capabilities**

- Step list: pick request type, edit JSON payload, reorder and remove
- Serial or parallel execution
- Per-step delay and execution log
- Import / export batch JSON

| | |
|---|---|
| Route | `/batch-runner` |

![Batch Runner](./screenshots/batch-runner/overview.png)

---

### Event Monitor

Dedicated timeline for OBS events and request/response traffic — better suited for long sessions than the Debugger's inline event viewer.

**Key capabilities**

- Timeline: time, type, name, **Summary** (human-readable) and raw **Payload**
- Filter by search text, event category; toggle request/response rows
- Pause / resume capture, clear session
- Export JSON or CSV; click event name to open protocol doc panel
- Drawer with structured JSON tree for full payload

| | |
|---|---|
| Route | `/event-monitor` |

![Event Monitor timeline](./screenshots/event-monitor/overview.png)

![Event Monitor detail drawer](./screenshots/event-monitor/detail-drawer.png)

---

### Code Generator

Generate client code from a selected Request and JSON parameters — skip manual copy-paste after debugging.

**Key capabilities**

- Pick any Request, edit params JSON
- Output: JavaScript (obs-websocket-js), Python, curl, raw JSON
- Event subscription snippet generator
- One-click copy

| | |
|---|---|
| Route | `/code-generator` |

![Code Generator](./screenshots/code-generator/overview.png)

---

### Vendor Explorer

Explore and test third-party plugin **Vendor Request** / **Vendor Event** APIs exposed via `CallVendorRequest`.

**Key capabilities**

- Vendor list with known request and event types
- Send vendor requests and view response data
- Vendor event log

| | |
|---|---|
| Route | `/vendor-explorer` |

![Vendor Explorer](./screenshots/vendor-explorer/overview.png)

---

### Screenshot Studio

Focused UI around `GetSourceScreenshot` and `SaveSourceScreenshot` — preview, tune parameters and export.

**Key capabilities**

- Pick scene or input source
- Width, height, native size, format and JPEG quality
- Preview capture, download, copy to clipboard
- Save to OBS filesystem path
- Batch export all scene screenshots

| | |
|---|---|
| Route | `/screenshot-studio` |

![Screenshot Studio](./screenshots/screenshot-studio/overview.png)

---

## Planned modules

These appear on the home page as **In Development** (see [home — planned cards](./screenshots/home/planned-modules.png)). UI previews:

| Module | Description | Preview |
|--------|-------------|---------|
| **Stream Deck Lite** | Custom button grid bound to WebSocket actions | ![Stream Deck](./screenshots/planned/stream-deck.png) |
| **Automation** | When event / schedule → then request sequence | ![Automation](./screenshots/planned/automation.png) |
| **Webhook Bridge** | OBS events → HTTP out; HTTP in → OBS requests | ![Webhook Bridge](./screenshots/planned/webhook-bridge.png) |
| **Multi-OBS Manager** | Connect and control multiple OBS instances | ![Multi-OBS](./screenshots/planned/multi-obs.png) |

See [docs/modules/README.md](./docs/modules/README.md) for the full module roadmap.

---

## Getting started

### Use online

Open **[https://kirahan.github.io/obs_websocket_toolbox](https://kirahan.github.io/obs_websocket_toolbox)**, pick a module, connect OBS via the bottom bar (default `ws://localhost:4455`), or start the **Simulator** first.

### Develop locally

```bash
git clone https://github.com/kirahan/obs_websocket_toolbox.git
cd obs_websocket_toolbox
yarn install
yarn dev
```

Build for production:

```bash
yarn build
```

Run tests:

```bash
yarn test
```

### Sync OBS protocol docs

Protocol data is generated from the official obs-websocket documentation:

```bash
yarn sync-protocol
```

This updates `src/data/generated/protocol.json` and locale files. GitHub Actions runs a weekly sync workflow; you can also trigger it manually.

Use a local protocol file:

```bash
node scripts/sync-protocol.mjs --local path/to/protocol.md
```

---

## Tech stack

- Vue 3 + TypeScript + Vite
- Ant Design Vue
- [obs-websocket-js](https://github.com/obs-websocket-community-projects/obs-websocket-js) 5.x
- Deployed to GitHub Pages (`base: /obs_websocket_toolbox/`)

---

## License

MIT License
