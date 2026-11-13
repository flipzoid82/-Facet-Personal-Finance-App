# Facet synthetic first slice

This repository now includes the Iteration 004 WP01 local demo. Its accounts and transactions are invented. It does not connect to Plaid or contain real financial records.

## Supported development run

Use a permitted controlled workspace with Node.js 24 and npm 11, an ordinary local browser, and an unused loopback port. From a clean checkout:

```powershell
npm ci
npm run build
npm start
```

Open `http://127.0.0.1:4173`. The built Node server serves the client and `/api` from one loopback listener. Stop with Ctrl+C. A second start on an occupied port fails visibly. No daemon, Docker, WSL, database, cloud account or paid service is required. The server binds only `127.0.0.1`; do not expose it on a network or put real data into this demo. `FACET_PORT` selects another local port. `FACET_STATE_DIR` selects a dedicated *new* demo-state directory; by default the ignored `.facet-demo-state` directory under this checkout is used. Do not point this variable at existing owner data. The only persisted file is `overrides.json` within that directory.

The fixture at `fixtures/snapshot.json` is immutable source data. Category, label and notes are separate user interpretations keyed by stable transaction ID. Writes are serialized within this one Node process and replace a versioned JSON file. This is a single-process synthetic store, not a multi-process database. A corrupt or unsupported store is refused rather than reset; preserve the file and inspect it before any manual recovery. There is no automatic destructive reset. Failed saves report an error and retain the prior committed state. A power-loss guarantee and real-data backup/restore are outside this slice.

## Verification

```powershell
npm test
npm run test:e2e
```

Browser tests require Playwright Chromium installed in the permitted test runtime (`npx playwright install chromium`). The browser test builds on the existing `dist`, launches its own loopback server with isolated temporary state, navigates all four routes, edits through the actual UI and API, stops and restarts the server as a separate process, verifies persisted fields and unchanged source facts, and removes its test state. Run `npm run build` before the browser test. Tests must not be interpreted as proof of the owner's Windows device, physical phone, storage protection or real banking behavior.

If startup reports missing `dist`, build first. If it reports an occupied port, stop the process that owns that port or choose an unused `FACET_PORT`; this server never switches itself to a public interface. If the app reports a demo state read error, preserve the state file and inspect the problem. A missing browser binary blocks browser proof until installed in an authorized runtime.

WP02 will extend the deterministic state and fault matrix, reversible filters, accessibility and viewport checks, corruption/reset behavior, and final cross-package browser journey. Its implementation and integration evidence require separate approval.
