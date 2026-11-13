# Facet I004 WP02 — Builder implementation return

Purpose: IMPLEMENTATION_RETURN. Builder delivered only approved WP02 W1–W5 on `refs/heads/facet/i004-wp02-synthetic-integration`.

**SubstantiveImplementationHead: `16c474c37dc002f790ee54502122183264f9c61a`** — source, tests, runbook and retained execution evidence committed, pushed and externally observed before authoring this return. The subsequent return commit is documentary only; its final BuilderTechnicalHead must be externally observed after publication, not predicted here.

## Authority and immutable bindings

- BuilderWorkStartHead: `da3e86cfd88efc62b0c7d0843331cbb1d55ff6f4`. Remote resolved first and matched exactly; clean local checkout fast-forwarded without merge commit or discarded work to exact equality before substantive action.
- Effective main / merged WP01 baseline: `36d302afa3657a7b147d209e2560c5d7ccbd155e`; workflow blob `57fd360379b06ab7625cc14fe17e90ef0ee1d176`.
- Active state: `PLANNING / BUILDER_IMPLEMENTATION / I004 / WP02 / ActiveRole BUILDER / NextRole none / ImplementationAuthorized true`. Builder contract and exact state/Handoff/action gates verified.
- Clerk implementation clearance: `WP02/CLERK_TO_BUILDER.md`, blob `3a2d2d88f3b22eadddd625becb1a5eddb7701539`, ClerkClearanceArtifactCommit `7b7e26c01152b823b48319cf467bbe46964932ba`.
- Original Architect implementation handoff: `WP02/ARCHITECT_TO_CLERK_IMPLEMENTATION.md`, blob `b29daceb6a7167554d2c3056ac55401939384e9e`.
- Approved Architect plan v0.1.0: `7403e19b8b591082010042119a61870499202109`; independent PLAN READY review: `83c7eafc37eb8cc1ada0712333962ad9741b77c6`.
- Owner ledger: `8195d2ef7290f1e1d90a01d11becc511ff9f1b26`, record `I004-WP02-EXACT-IMPLEMENTATION-APPROVAL-20261113-D602A13C`.
- Accepted iteration map: `9abf75c97617b2963588e90b01ac981885fb59c7`.

The original technical plan, handoff and independent review controlled implementation. Clerk supplied no technical judgments. No source changes to the immutable canonical fixture, dependency manifest/lockfile, approved plan, acceptance map, approval records, control state, role contracts or handoffs are included.

## Delivered behavior and contracts

`src/shared/scenarios.js` derives cloned invented views for normal, delayed, no accounts, empty transactions, stale, disconnected, unknown balance, missing transactions, partial coverage and failure/retry. The existing snapshot endpoint accepts an allowlisted `scenario` query; invalid names return 400. Delay is fixed at 700ms. The failure scenario returns 503 until the explicit retry request uses `recovered=1`. These parameters select only invented views; they accept no external URL/path/credentials. The unchanged default request still serves canonical source IDs and interpretation values, with additional scenario/coverage metadata.

The React client exposes the scenario selector and non-destructive reset, labels every state as synthetic, distinguishes unknown totals from known subtotals, and places origin/fixture timestamp/coverage context beside displayed values. Account/status/category filters are reversible; clearing restores the source set for the selected scenario. Changing a scenario or resetting never writes overrides. The version-1 store, valid source-ID set and bounded category/label/notes PATCH contract remain intact. A new directory check prevents a file-valued state path from being mistaken for an absent store.

Keyboard navigation moves focus to page headings; editing focuses Category; Cancel returns to the originating control. Save returns to the heading when refresh replaced the control, or to Retry after a confirmed write with failed refresh. Failed saves retain the editor and announce an alert. Named controls, loading/filter/save live regions, visible focus and 375px/1280px layouts are implemented. `SYNTHETIC_APP.md` documents startup, scenarios, filters, safe reset/corruption handling and reproducible verification.

## Criterion-to-proof manifest

All rows below are **Builder T1/T2 delivery evidence**, pending independent Architect T3 judgment. They are not an iteration exit verdict.

| Criterion | Actual implemented and executed proof | Evidence / limit |
| --- | --- | --- |
| I004-C01 | Locked install and build; child loopback server, stop and distinct-process restart; missing build, occupied/invalid port, invalid state path, corrupt/unsupported startup cases | `tests/startup.test.js`, `tests/runtime.js`, browser journey; controlled Windows development runtime only. Occupied-port test leaves its independently owned listener running until test cleanup. |
| I004-C02 | Four-route navigation; canonical $11,150.00 total; partial $2,450.00 and unknown $8,700.00 known subtotals explicitly incomplete; source/fixture-time/coverage labels | `tests/e2e/s1-journey.spec.js`; both viewport widths and scenario matrix. No live balance or cash projection. |
| I004-C03 | All six exact source IDs, checking-account partition, pending/category filter and no-match explanation; Clear filters and scenario reset restore IDs; pending/unidentified rows preserved | Browser journey plus `tests/scenarios.test.js`; clearing filters restores currently available scenario coverage, not invented missing records. |
| I004-C04 | Actual browser category/label/notes save, route departure, process termination and new process, same persisted interpretations/source; failed rename preserves prior bytes through real storage/API; corruption/version/orphan-ID refusal; ignored interrupted-write temp artifact; scenario reset preserves exact override bytes | Journey, retained WP01 smoke, `tests/storage.test.js`, `tests/server.test.js`, `tests/scenarios.test.js`; no power-loss or multi-process guarantee. |
| I004-C05 | Real API allowlist and deterministic states; browser loading, empty, missing, unknown, partial, stale, disconnected, read failure/retry; real on-disk corruption causes honest read/save failure; successful-write/failed-refresh F1 retained | Journey covers all four routes for ten scenarios at both widths; partial/unknown totals cannot claim completeness. Restoring corrupt test state is an explicit test-owned action, never an application reset. |
| I004-C06 | Persistent DEMO banner on all route/scenario combinations, browser rejects/records non-local outbound requests, server/runtime source and dependency negative checks | `tests/startup.test.js` and journey; recorded outbound list empty. Static server-source checks plus browser observation are bounded synthetic evidence, not production privacy certification. |
| I004-C07 | Keyboard route traversal/filter/edit/cancel/save/retry; focus assertions and alert/status semantics; saves at 375px and 1280px; no overflow or offscreen-width controls; computed contrast and visible focus | Journey and companion contrast test; retained screenshots visually inspected. DOM live-region semantics are verified, not audible assistive-device or physical-phone testing. |
| I004-C08 | Full real built browser/API/disk `s1-journey.spec.js`, exact test oracles, runtime cleanup, retained logs/JSON/screenshots and updated runbook | Evidence below; independent audit and final audited/merged integration assessment remain Architect-owned. |

## Commands, environment and retained results

Executed 2026-11-13 in the existing controlled Windows development workspace: Node `v24.18.0`, npm `11.16.0`, `win32/x64`, OS release `10.0.26300`; Playwright `1.65.0`, headless Chromium `158.0.8127.18`; Vite `8.3.8`, React/React DOM `18.3.1`, React plugin `6.3.0`. These are observed test-runtime facts, not owner-host certification. No browser/system installation or configuration change was needed.

| Command | Final result |
| --- | --- |
| `npm ci --ignore-scripts --cache test-results/npm-cache` | Exit 0; 24 packages installed, 25 audited, reported 0 vulnerabilities at that observation. Existing lockfile unchanged; no lifecycle scripts. |
| `npm run build` | Exit 0; 15 modules built. |
| `npm test` | Exit 0; **11/11 passed**, including real API, temporary disk, startup and interrupted-write cases. |
| `npm run test:e2e` | Exit 0; **3/3 passed**, including the full journey, computed contrast/focus checks and original WP01 smoke/F1/F2 UI assertions. |
| `git diff --check` / staged check | Passed after removing extra trailing blank lines; no semantic source change after the final suite. |

Retained in `docs/iterations/iteration-004/work-packages/WP02/evidence/` at SubstantiveImplementationHead:

- `build.txt`, `unit-api-storage.txt`, `browser.txt`: final command transcripts and counts.
- `integration-oracle.json`: distinct process IDs 12820 → 36116, exact source IDs, widths, browser version, empty outbound-request and page-error lists.
- `contrast-and-semantics.json`: computed text/background ratios 7.75–13.53, exceeding the asserted 4.5 minimum; recorded 3px solid focus outline, separately asserted at least 3 contrast against the surrounding background.
- `transactions-375.png`, `transactions-1280.png`: actual post-save browser screenshots inspected for readable labels, wrapped content, visible focus and intact source rows. These supplement executable assertions rather than replacing them.

The final suite ran after the locked reinstall and final semantic changes. Only trailing-blank-line normalization and runbook wording followed it. Services and directories were test-created; harness cleanup awaited child exit and removed only its own temporary directories. No running demo was left for the owner.

## Failed attempts and resolution

Initial sandbox API runs failed with loopback `EACCES`; the same isolated tests passed with permitted local network access. The new startup regression then exposed a real missing state-directory-type check; the explicit check fixed it and the regression passes. The first integrated journey used a label locator that did not resolve the select control; role/name locators corrected the harness. A reset assertion then raced React rendering; polling observable source IDs corrected that wait without weakening the oracle. All were followed by the final successful suite.

An attempted `npm ci --ignore-scripts --offline` could not complete because the sandbox cache lacked Vite. The locked online install with a workspace-local cache restored dependencies and passed; no package/lockfile change or system installation resulted. Node's NO_COLOR/FORCE_COLOR warning in browser output is a formatting warning, not a test failure.

## Limits and bounded return

This remains a small single-writer synthetic app. Physical power-loss durability, multi-process concurrency, encrypted owner storage, backup/restore, physical phone, audible screen-reader behavior and real-provider behavior are not certified. No real financial/Plaid account, credentials, Item/OAuth, purchase, paid service, owner-host configuration, main modification, PR mechanics, merge, UAT or release was performed. G0 remains not cleared, M0 paused/not cleared and M1 unauthorized/not tested. No Architect audit PASS or T3/T4 is asserted.

Builder stops after publishing this technical return and externally identifying BuilderTechnicalHead. **Clerk bounded completion intake** owns identity derivation, state/routing, PR mechanics and audit packaging; independent Architect audit and separate user exact-head merge authorization remain required. No Builder routing/control-state mutation accompanies this return.
