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
