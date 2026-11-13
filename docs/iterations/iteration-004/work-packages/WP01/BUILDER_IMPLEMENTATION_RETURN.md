# Facet I004 WP01 — Builder implementation return

Purpose: IMPLEMENTATION_RETURN for the original Architect WP01 plan v0.1.0. Authoritative ref: `refs/heads/continuation/iteration-004-intake`. **SubstantiveImplementationHead:** `169195084bd1e22d84d0170fbdf1141f1f973ea4`. BuilderWorkStartHead: `82de0b0db25ea4e8e70da04d1ed21650a0e9852c`. The later commit containing this return is evidence-only; it does not modify the application.

## Delivered source and interface

The committed application uses a deterministic invented snapshot, a React browser client, a built Vite client served by one Node loopback listener, and a versioned JSON override store. `GET /api/snapshot` returns source records with separate interpretations; `PATCH /api/transactions/:id/override` accepts only bounded category, label and notes for an existing immutable source ID. The store serializes writes within the process and replaces the JSON file in its dedicated state directory. The source adapter is `src/shared/domain.js` with fixtures in `fixtures/snapshot.json`; the storage boundary is `src/storage/override-store.js`. WP02 can build on these IDs, response shape and browser routes. A multi-process writer, live data provider and production secret store are outside this interface's supported envelope.

The four functional routes are `/`, `/accounts`, `/accounts/:id` and `/transactions`. All retain the SYNTHETIC / DEMO banner. The UI shows invented balances and activity, pending, uncategorized and unidentified rows, editable interpretations, loading, unknown route, API read and save errors, and semantic keyboard focus. The runbook is `SYNTHETIC_APP.md`. Existing project README and control files were preserved.

## WP01 criterion and proof mapping

| Criterion | Delivered proof at substantive head | Current limitation |
| --- | --- | --- |
| I004-C01 | Built UI and Node listener; browser launched and stopped in isolated test | Occupied port and missing build have explicit startup failure but no automated browser assertion yet. |
| I004-C02 | Browser navigated populated Overview with fixture totals, account and activity links | Full age/coverage matrix remains WP02. |
| I004-C03 | Browser navigated Accounts, account detail and Transactions; pending and unidentified records visible; domain test retained all source rows | Reversible account filters and full source-set reconciliation remain WP02. |
| I004-C04 | Browser edited category, label and notes via real PATCH, stopped process, launched a new process and read saved fields; storage test checked concurrent queued writes and corrupt state refusal; API rejects unknown ID and source-field mutation | Power-loss durability, safe reset, broader failure injection and multi-process concurrency are not claimed. |
| I004-C05 | UI has loading, unavailable-data retry, failed-save status and unknown route; API rejects corrupt persisted JSON without discarding it | Full stale/disconnected/missing/partial/fault matrix remains WP02. |
| I004-C06 | Permanent banner on all browser routes; fictitious fixture names; no Plaid SDK, network bank call or external asset dependency was added | Automated outbound-request inspection and adversarial error-route banner checks remain WP02. |
| I004-C07 | Semantic links/buttons/labels, visible focus CSS, 375px browser width checked without horizontal overflow | Full keyboard, contrast, announcement and 1280px matrix remain WP02. |
| I004-C08 | Locked dependencies, build, Node tests and browser/API/disk restart smoke test; exact commands below | WP02 owns complete cross-WP `s1-journey.*` integration and final exit proof. |

## Builder T2 verification

Environment: controlled Windows development workspace, Node `v24.18.0`, npm `11.16.0`, Playwright Chromium headless `158.0.8127.18` in the controlled test runtime, fixture-only temporary store. No owner Windows/phone or physical storage proof asserted.

- `npm install --ignore-scripts`: exit 0. This generated the committed lockfile. Initial Vite 5 dependency audit reported two advisories; the committed dependency set uses Vite 8.3.8 and React plugin 6.0.0. Subsequent dependency audit reported **0 vulnerabilities** at verification time.
- `npm run build`: exit 0; Vite 8.3.8 built 14 modules and emitted `dist/index.html`, CSS and JS.
- `npm test`: exit 0; 3/3 domain and storage tests passed.
- `npm run test:e2e`: exit 0 after correcting a test assertion; 1/1 real Chromium browser test passed. It covered four-route navigation, visible sample pending/unidentified rows, invalid/unknown-ID PATCH rejection, UI edit, separate Node process restart, persisted category/label/notes, unchanged source facts and 375px no-overflow.

The first browser attempt was BLOCKED because the controlled runtime had no Playwright Chromium. After installing that test browser, the next attempt exposed an invalid Playwright assertion (`toEvaluate`); that assertion was corrected and the final browser run passed. These are test-environment and test-code corrections, not an assertion of an unperformed host check. Build output and tests were run from the source checkout; generated `dist`, `node_modules` and test artifacts are ignored.

## Risks and remaining obligations

The demo store is deliberately one-process and invented-data only. The current serialized writes and atomic rename are adequate for WP01's bounded controlled test, but this is not certified for concurrent processes, power failure, encrypted storage, backup/restore or real financial records. The fixture timestamp is fixed and labeled as fixture time; current bank freshness remains unknown. WP02 must add the accepted state/fault/filter/accessibility/viewport matrix and the final cross-WP integrated browser task. Architect must independently audit this exact source/test evidence and determine acceptance status. No T3 or T4 is claimed by Builder.

No owner-host, phone, LAN, trust, backup, Plaid, bank or financial data action was performed. No paid service, main change, PR or merge was performed. G0/M0/M1 remain uncleared. Builder returns this pushed technical material to Clerk solely for bounded completion intake; Clerk derives the final BuilderTechnicalHead externally.

## Bounded Architect audit correction return — F1 and F2 (2026-11-13)

This section is an append-only Builder update for the original immutable `ARCHITECT_AUDIT.md` blob `4123115c9b4fb64ae692d828e757bf9b274bab68`, verdict `CHANGES_REQUIRED`. It preserves the original implementation return above and binds the corrections to the same `refs/heads/continuation/iteration-004-intake` branch and open PR #16. Correction BuilderWorkStartHead: `e1624348b09da0855e479c0d021c938747bde591`. **Correction SubstantiveImplementationHead:** `fa17c44e11ca804b15802755cfbd73a1f8596236`. Only F1/F2 source and tests changed at that head. C1 remains exclusively Architect-owned and unresolved by this return.

**F1 (C04/C05):** `src/client/main.jsx` now has `load()` return a success flag. A successful PATCH followed by a failed refresh says the write was confirmed but the display could not reload, with a retry instruction; it does not show the ordinary fully refreshed “Saved” status. A rejected PATCH still says “Save failed” and retains the prior displayed edit. In `tests/e2e/smoke.spec.js`, one-shot GET failure is injected after a real successful PATCH. Chromium asserted the unavailable-data alert, the differentiated status, absence of the ordinary success message, then retried and verified the persisted interpretation. The same test injects a failed PATCH response and asserts no success status.

**F2 (C04/C08):** `OverrideStore` accepts a bounded filesystem-operations argument for deterministic tests; production still uses `node:fs` promises. `tests/storage.test.js` injects a rename failure after a committed override and proves the update rejects, the prior JSON bytes and value remain, and the temporary file is removed. `tests/server.test.js` drives a real loopback PATCH against a store with injected rename failure; the API returns HTTP 503 with an error, never a saved object, and a subsequent GET retains the prior interpretation. The browser test's failed PATCH assertion covers UI feedback. These controlled failure injections are T2 test evidence for the approved synthetic single-writer contract, not physical power-loss or owner-host proof.

**Verification at correction substantive head:** controlled Windows development runtime, Node `v24.18.0`, npm `11.16.0`, headless Playwright Chromium already installed for the original WP01 test. `npm run build`: exit 0, Vite 8.3.8 built 14 modules. `npm test`: exit 0, **5/5** domain, store and HTTP API tests passed. `npm run test:e2e`: exit 0, **1/1** Chromium browser flow passed with original navigation/restart checks and added F1/F2 failure oracles. The first new API test run in the sandbox could not connect to its own loopback listener (`EACCES`); the same test passed when rerun with permitted local network access. The first new browser injection attempt failed due to one-shot route handling in test code; that harness was corrected and the final browser run passed.

No approved plan, acceptance map, fixture data, control state, Clerk artifact, PR mechanics, main, or Architect-owned C1 material was changed by Builder. No T3/T4 is claimed. The final BuilderTechnicalHead must be externally observed after this return is pushed; Clerk performs only bounded completion intake and Architect independently reassesses F1/F2 and C1.
