# Facet synthetic first slice

This repository includes the Iteration 004 WP01 local demo and WP02 state, filter, accessibility and integration work. Its accounts and transactions are invented. It does not connect to Plaid or contain real financial records.

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

If startup reports missing `dist`, build first. If it reports an occupied port, choose an unused `FACET_PORT` or stop only your own permitted demo process; this server never switches itself to a public interface. If the app reports a demo state read error, preserve the state file and inspect the problem. A missing browser binary blocks browser proof until installed in an authorized runtime.

WP02 adds the deterministic state and fault matrix, reversible filters, accessibility and viewport checks, corruption/reset behavior, and final cross-package browser journey described below. Independent audit and exact-head merge authorization remain separate gates.

## WP02 scenarios, filters and safe recovery

The always-visible **Synthetic scenario** selector chooses only allowlisted invented views: populated/fresh sample, delayed loading (700ms), no accounts, empty transactions, stale, disconnected, unknown balance, missing transactions, partial coverage, and snapshot failure/retry. These are simulated source states, never bank connectivity or live freshness. The same bounded selector is available to the API as `GET /api/snapshot?scenario=<name>`; an unknown name returns 400. For the failure scenario, Retry requests `recovered=1`, returning the same invented source without writing anything. No arbitrary file, URL or external source can be selected.

Scenario selection appears in the page URL, survives navigation/reload, and is not persisted to disk. **Reset scenario** restores the normal view without deleting or rewriting overrides. There is no destructive override-reset feature. Unknown/partial balances display an incomplete total and an explicitly known subtotal; missing transaction coverage is distinct from an empty dataset or an empty filter result. Stale/disconnected views identify last-observed fixture values. Each displayed value includes its invented origin, fixture observation timestamp and coverage context.

Transactions provides Account, Status and Category filters. **Clear filters** restores the exact available source set for the selected scenario, including pending, uncategorized and unidentified rows. Interpretation-category edits can change whether a row matches a category filter; they do not remove source records. Reset the scenario and clear filters to recover full sample visibility.

Use Tab/Shift+Tab and Enter for navigation and actions. Navigation moves focus to the page heading; opening an editor focuses Category; Cancel returns to its opener. After a save/refresh, focus returns to the heading if the original row control was replaced. Failed saves announce an alert and retain focus in the editor. Loading, filter results and save confirmation use live status regions. The layout and save flow are tested at 375px and 1280px; this is simulated viewport evidence, not physical phone verification.

If the state directory path is a file, startup refuses it without changing it. Corrupt, truncated, unsupported-version or orphan-ID state is refused, never reset automatically. Preserve the file; do not delete it to hide an error. A failed write retains the prior committed bytes. A successful write followed by a failed refresh reports that distinction and offers Retry. Recovery from corruption requires separately restoring known-good state in the permitted test environment; the application does not invent or overwrite a backup.

## Reproducing the full S1 verification

In the separately permitted controlled development runtime, use the existing Node 24/npm 11 and Playwright Chromium prerequisites:

```powershell
npm ci --ignore-scripts
npm run build
npm test
npm run test:e2e
```

No new application dependency is needed by WP02. If the test browser is absent, browser proof is BLOCKED until provisioning is separately permitted; the commands above do not install a browser or modify system configuration. This is not an instruction to install anything on an owner's personal machine. Build first: both API and browser tests intentionally exercise the built server contract.

`tests/e2e/s1-journey.spec.js` runs the real built service in a child Node process with a newly allocated temporary state directory and loopback port. It checks four routes, exact source sets/totals, filters and clear, keyboard focus/edit/cancel/save, all scenario states, both viewports, real disk corruption/retry, restart in a different process, unchanged fixture/overrides and forbidden outbound browser requests. A companion test records computed contrast ratios and semantic/focus checks. `tests/startup.test.js` uses a separate temporary source/build copy to test missing build, occupied port, invalid port/state path and corrupt state; it never removes the workspace build or stops a foreign process. API/storage tests preserve real rename-failure and prior-byte assertions. Server source/dependency checks complement browser request inspection; these are bounded synthetic checks, not production privacy certification.

Playwright writes screenshots and oracle attachments under ignored `test-results/`. Exact command/environment/results and retained evidence are identified in the WP02 Builder implementation return. All test-created child services stop and temporary test directories are removed on completion. An unavailable loopback permission, missing browser/build or startup collision is a test failure, never a hidden pass or permission to change the host. There is no claimed multi-process store, power-loss, encryption, backup or real-bank proof.
