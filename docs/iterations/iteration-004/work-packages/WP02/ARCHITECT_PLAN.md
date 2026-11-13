# Facet — Iteration 004 WP02 Architect Plan v0.1.0: synthetic states, accessibility and integrated S1 proof

**Status:** Architect PLAN_REVIEW candidate, **NOT PLAN READY** and **NOT implementation approved**. **Iteration:** 004, **WP:** 02, **scope:** adopted roadmap S1 only. **Authoring authority:** PLANNING / ARCHITECT_PLANNING, state activation `57e40a522c4a746944b5716f3717e1aeef38eceb` on `facet/i004-wp02-synthetic-integration`. **Baseline:** verified main `36d302afa3657a7b147d209e2560c5d7ccbd155e` (contains installed intra-iteration planning rule); **WP01** user-authorized merge PR #16 `fc881096ba13020780882fb1df2915357738c68b` and main reconciliation `2922aa283175d5fe0dd91931a4b9e373831bf2c9`. **Accepted iteration map:** `docs/iterations/iteration-004/ITERATION_ACCEPTANCE.md` blob `9abf75c97617b2963588e90b01ac981885fb59c7`, first containing commit `873f3b5709871510076dad043e5fafd57b27f9a1`. **Roadmap:** `docs/PROJECT_ROADMAP.md` v0.2.0 S1, blob `e97cf8a679e26bd1c0444465dc7b9ba685e5deab`.

## Goal and inherited executable baseline

Complete the existing two-package I004 S1 *first functional local synthetic app*. WP01 is independently audited and merged; the accepted decomposition explicitly makes WP02 the final package, owning state/fault/filter/accessibility implementation and full integrated test proof. WP02 delivers functioning browser/client/API/storage code and executable tests, **not** a documentation-only demo. Architect alone later determines the iteration exit matrix and separately routes UAT/release.

Preserve the verified WP01 technical interface and existing regression tests: invented immutable `fixtures/snapshot.json`; `src/shared/domain.js` with stable source transaction IDs and separate `interpretation`; `src/storage/override-store.js` one-process queued version-1 JSON overrides, atomic rename and reject-on-corruption behavior; `src/server/index.js` loopback `127.0.0.1` single-origin `GET /api/snapshot` and bounded `PATCH /api/transactions/:id/override`; React routes `/`, `/accounts`, `/accounts/:id`, `/transactions` in `src/client/main.jsx`. F1 persisted-write/failed-refresh and F2 injected-rename failure regression oracles must continue to pass.

## Technical work and falsifiable acceptance oracles

### W1 — deterministic synthetic source-state scenarios (I004-C02, C05, C06)

Provide a deterministic, bounded source-state seam that can drive populated/fresh, delayed/loading, no accounts, empty transactions, stale source timestamp, disconnected source, unknown balance, missing transactions, partial coverage, snapshot failure and retry. Choose a fixture/scenario adapter or test-local injected source; reject arbitrary external/debug controls or production-like data connection. Actual UI and API response/coverage behavior must be exercised: distinguish `0` from `unknown`, no records from no coverage, stale last-observed fixture values from live balances, and disconnected/partial from full source. Where a mathematically complete total cannot be proven, show an explicit incomplete/unknown total rather than a misleading sum. Include per-value origin/observed-at/coverage messaging and preserve the always-visible DEMO banner on every route/state.

Minimum negative oracles: under unknown/partial data no invented complete total or live-fresh assertion; deliberate read failure shows a non-destructive retry; delayed load visibly announces loading; empty dataset and zero-result filter have different explanations. Test scenario determinism without altering the immutable production synthetic fixture or user overrides.

### W2 — reversible source-complete filters and cross-view consistency (I004-C02, C03, C06)

Add all-account/per-account and useful reversible transaction controls (pending/status, category if viable) to the consolidated view, with visible selected filters and an accessible `Clear filters` action. Preserve pending, uncategorized and unidentified records. Test that every filtered ID belongs to the original source set, clearing restores the exact same source IDs and number of records, account-specific sets equal the corresponding source partition, and editing category/label/notes does not mutate source identity or irrevocably remove a row. A filter with zero matches must say no matches, never imply records were deleted.

Cross-view Overview balances and transaction counts must have explicit sample basis, source/coverage labels and consistent amounts, without double counting records merely because they appear on multiple routes. Verify both populated and partially covered scenarios.

### W3 — keyboard, focus, semantics, announcements and responsive layouts (I004-C02, C05, C06, C07)

Implement keyboard-only route traversal; reachable edit/filter/retry/save/cancel controls; logical headings; descriptive accessible labels; visible focus and predictable focus transfer/return after navigation and editor open/close/save/failure; status/error announcements; readable contrast and touch/control layout at 375px and 1280px widths. Test common populated, empty, partial, error and edit states at both widths. Browser assertions must detect horizontal overflow and hidden/inaccessible controls; use explicit keyboard/focus assertions, supplemented with a recorded contrast/semantic inspection. A simulated viewport is not physical phone or owner-host T4 evidence.

### W4 — existing persistence contract and safe failure/recovery (I004-C01, C04, C05, C08)

Preserve WP01 version-1 single-writer override and no-silent-data-loss semantics; verify category, label and notes edit through a real UI/API, leave route, terminate a Node process, start a *different* process with same isolated disk directory, and reload preserved interpretation under identical immutable source ID/amount/pending/merchant. Prove rejection of unknown ID, invalid source-field edit and failed write/rename preserves previous committed bytes/interpretation with honest UI/API feedback. Check corrupted/unsupported JSON is not automatically erased or rewritten. Keep isolated temporary directories and explicit cleanup.

For accepted fixture reset/recovery, prefer a non-destructive reset of scenario/test selection that preserves user overrides; if any override reset is exposed, require explicit, safe, bounded confirmation and a genuinely reversible method or a non-destructive alternative. Never silently delete existing owner data. Include occupied-port, missing build and invalid state-directory/malformed state diagnostics. No claim of physical power-loss resilience or multi-process concurrency.

### W5 — full runnable S1 integration and evidence (I004-C01–C08)

Builder MUST add a committed integration journey `tests/e2e/s1-journey.spec.js` (or justified equivalent) that boots the real built app on a controlled loopback listener using an isolated persisted directory, checks source IDs/sets/totals and demo labels across all four routes, changes category/label/notes through the actual browser, stops/restarts the Node process, confirms persisted values and untouched source, exercises state/fault variants and retry, applies/clears filters with exact-source-set reconciliation, tests keyboard/focus/announcements and 375px/1280px, and exits with the service stopped. Include adversarial assertions for forbidden outbound bank/Plaid calls, missing DEMO labels, false-success saves and source loss. Do not substitute DOM-only stubs or screenshot-only proofs for server/storage behavior.

Retain/regress WP01 `npm run build`, `npm test`, `npm run test:e2e`; add focused unit/API/storage tests, exact scenario and source invariant assertions, and a repeatable evidence manifest in WP02 Builder implementation return. Record runtime/Node/npm/browser versions, commands, exit statuses, counts and actual failure/retry evidence; mark any unexecuted proof BLOCKED, not PASS. Architect independently rechecks Builder's artifacts, source/tests/oracles and later maps I004-C01–C08 in the iteration UAT assessment after WP02 merge.

Update `SYNTHETIC_APP.md`: clean checkout/dependency install, build/start/stop, fixture and override paths, scenario/filter use, isolated test setup, browser prerequisite, occupied port/missing build, corrupt state preservation and troubleshooting. All commands are for separately permitted test runtime, not an owner-host deployment command.

## Acceptance coverage matrix

| Iteration criterion | Builder WP02 owned result | Mandatory observable proof |
| --- | --- | --- |
| I004-C01 | Reproducible local startup, stop and diagnosable failure | Clean build, correct loopback listener, occupied port, missing build, stop/restart |
| I004-C02 | Coherent Overview/navigation/source totals with coverage | Cross-view totals, source age/coverage, honest partial/unknown totals |
| I004-C03 | Source-complete account and transaction views | Exact IDs, pending/unidentified preservation, reversible filters and empty results |
| I004-C04 | Durable editable interpretations | Real UI category/label/notes, separate-process restart, immutable source, failures |
| I004-C05 | Falsifiable state and error handling | Delayed, empty, stale, disconnected, missing, unknown, partial, retry/fault |
| I004-C06 | Persistent DEMO/no real-account truth | All routes, all states, negative provider/network/credential checks |
| I004-C07 | Accessible responsive interaction | Keyboard/focus/labels/announcements, contrast, 375px and 1280px |
| I004-C08 | Actual integration and reproducible verification | `s1-journey` browser/API/storage/test results and bounded runbook |

## Architecture and scope guardrails

Stay with existing React/Vite client, minimal Node HTTP server, fixture adapter and one-process JSON override store. A deterministic state scenario seam may be introduced but must not alter real product meaning, require a daemon, add public endpoint exposure, expose sensitive debug paths, or silently mutate WP01 source/override contract. Independent Builder PLAN_REVIEW should specifically challenge scenario isolation, missing/unknown total semantics, reset reversibility, focus/announcements coverage, integration test realism, data/source invariants, changed package/licensing/security assumptions, and sufficiency of negative oracles. A material product/accepted-criterion, consent, security or architectural change returns to Architect/Creative/user under existing gates; never assume approval.

**No real data or host work:** No live Plaid SDK/Item/OAuth, bank credentials, financial accounts, billing, payments, LAN/public binding, browser secrets, physical phone, existing PC backup/drive changes, paid service, Docker/WSL daemon or elevated owner-host install. G0 not cleared; M0 paused/not cleared; M1 not authorized/tested. User prefers $0 monthly, single-user, on-demand PC-on. Physical owner-host T4, key protection, recovery, bank/provider behavior and later real-connected stages are entirely outside S1. Keep all test state in new throwaway directories and preserve legacy files.

## Required workflow after this plan

This is a **planning-only candidate**. On active Architect review route, commit `ARCHITECT_TO_BUILDER.md` separately with exact plan blob/first-containing commit, accepted-iteration map, WP01 merged baseline, branch and source identities; then route `CLERK_PLAN_REVIEW_PREFLIGHT` by separate state-only commit. Clerk does deterministic preflight; Builder independently reviews the exact WP02 plan and changed global assumptions with PLAN READY or numbered PLAN CHANGES REQUIRED. A future PLAN READY is not implementation permission: Architect then requests a distinct explicit **exact-plan WP02 owner implementation approval** before Clerk technical preflight, Builder coding, independent audit, owner exact-head merge authorization, UAT choice and release. Do not merge this plan or activate Builder implementation now.
