# Facet — I002 WP01 synthetic G0 proof report

**Evidence date:** 2026-11-09 (America/Los_Angeles). **Scope:** exact approved I002-WP01 Architect Plan v0.1.0, blob `45dab36b244098d57316005a1e8098a9957d33be`, and I002-C01–C07 map blob `112f8f4a9821f0667cbd19d3ae1541bdf5052ad0`. **SubstantiveImplementationHead:** `e4a6dd8f1d28046c0deec52370aaeffddacb2ad8`, externally observed on `facet/i002-wp01-g0-synthetic` before this report was finalized. No code/test semantics follow that head in this report.

## 1. Source, contradiction and changed-evidence register (P1 / C01)

The following are public T1 documentation checks on 2026-11-09, not account-specific entitlement or executed provider behavior. Public pages do not identify the owner's negotiated API/plan terms; recheck the applicable contract/version before any separately authorized provider use.

| Source | Attributed claim and confidence | Limitation / changed-evidence trigger |
| --- | --- | --- |
| [Plaid OAuth guide](https://plaid.com/docs/link/oauth/) | High confidence as current public documentation: ordinary desktop/mobile web OAuth can use popup/new tab without a redirect URI; embedded webviews differ. The same guide instructs use of `redirect_uri` for update mode and specifies HTTPS registered redirects except Sandbox localhost HTTP. | **Unresolved contradiction for the no-owned-domain repair requirement.** A later current official clarification or specifically consented provider result is needed before asserting domainless update-mode support. |
| [Plaid Link update mode](https://plaid.com/docs/link/update-mode/) | Existing Item authorization/login repair, consent and account permission changes use update mode. | Public instructions cannot prove a returned browser session or the owner's institutions/Trial entitlement. |
| [Transactions Sync API](https://plaid.com/docs/api/products/transactions/) and [Sync migration guide](https://plaid.com/docs/transactions/sync-migration/) | Cursor pages expose added/modified/removed changes; a mutation during pagination requires restarting the whole loop at its original cursor. The API describes `pending_transaction_id` and transaction-history readiness status. | Synthetic pages test Facet's state logic only. Actual retention, provider update timing, and institution completeness remain unobserved. |
| [Items API](https://plaid.com/docs/api/items/) | `/item/get` exposes Item/status and consent-expiration data. Revocation webhooks may not always arrive for institution-portal revocation; an update-mode token may fail after revocation. | Polling cannot reconstruct every missed event or guarantee continuous consent. Revocation triggers retention review, not a promise to keep cached data. |
| [Accounts API](https://plaid.com/docs/api/accounts/) | `/accounts/get` returns active linked accounts and cached balances; `/accounts/balance/get` is a paid real-time route. Balance `last_updated_datetime` is documented only for select institutions. | A fresh fetch alone cannot label source balances fresh. New unselected accounts and missing account/available-balance fields remain explicit gaps; no paid call was made. |
| [Liabilities API](https://plaid.com/docs/api/products/liabilities/) | `/liabilities/get` is a separate product route for covered loan/card fields, with roughly daily refresh in public guidance. | Coverage, minimums and due dates are institution/product dependent; no field or cost entitlement is established for the owner's account. |
| Owner-supplied [I001 fact-finding archive](../../../../research/iteration-001/PLAID_ACCOUNT_FACT_FINDING_2026-11-08.md) | The owner reported a Free Trial and product listings, with `0/20` unexplained. | T1 attributed report only; no authenticated Dashboard/contract check was made here. The counter remains deferred until real Item, Production or billing decisions make it material. |

**Stop trigger:** If update mode needs a registered HTTPS redirect, a paid balance route, an always-online receiver, host privilege or a real Item to settle a required claim, the fake harness stops at UNKNOWN/BLOCKED. An Architect/user choice and separate specific consent are needed before such a step. Repeating green fake callbacks cannot change provider evidence.

## 2. Source/test manifest and actual command (P2–P6)

| Artifact at SubstantiveImplementationHead | Git blob | Purpose |
| --- | --- | --- |
| `proof/browser.mjs` | `1074772d0592c2c368761f4a378c59fdcd5ae787` | Pure initial/update browser-state model |
| `proof/transactions.mjs` | `9b4c666eb26780ca9df7e2800ce484fbe11b3916` | Staged all-page cursor recovery |
| `proof/non-transactions.mjs` | `a260f6ee2b402670304996295bde11fc57e4abf5` | Independent source-family status model |
| `proof/fixtures/nine-day-gap.json` | `1a6191e3d96b7d681f6e59a8ee9a21a473d299c9` | Synthetic pre-gap, two pages and golden result |
| `proof/proof.test.mjs` | `153a7ee13dfc73727e99558a5f8a8c5c0474a5c8` | Deterministic positive, failure and integration oracles |
| `proof/run-tests.mjs` | `d22624d6e8422741a119cd7dc9a5aca8bb31b4e1` | Process-local network denial and test import |
| `proof/README.md` | `e0ace1d04287508a053779e89b305d693fe63636` | Reproduction and limits |

**T2 execution environment reported by Node:** `v24.18.0`, `win32`, `x64`; this identifies the test process, **not** an owner-host security validation or physical Android test. No dependency installation, Plaid SDK, server/listener, account, secret or financial data was used. The runner replaces common Node `fetch`, HTTP(S), TCP, TLS and UDP entry points with a pre-socket exception; one test verifies the guard. This is a process-local guard plus source inspection, not an operating-system air-gap certification.

**Command, from `docs/iterations/iteration-002/work-packages/WP01/proof`:** `node run-tests.mjs`. **Observed result:** exit code `0`; `13` tests, `13` pass, `0` fail, `0` skipped/cancelled. No other test command or host/device probe is claimed. The executed cases cover four browser/mode cells; nonce/session/origin/cross-mode/replay/expiry/cancel/blocked-popup/retry; separate consent renewal/account reselection; nine-day two-page Sync, crash/failure rollback, original-cursor mutation restart, bounded failure, replay/idempotence, credible/unmatched pending replacement, user corrections; initial-history readiness, independent Item/account/balance/liability/recurring gaps, revocation and cross-family freshness.

## 3. Four ordinary-browser hypothesis cells (P2/P3 / C02/C03)

| Browser and mode | T2 fake result | Actual Plaid/provider status |
| --- | --- | --- |
| Desktop ordinary browser, initial Link | Synthetic popup callback accepted with valid one-time state; blocked popup, cancel, expiry, wrong session/origin/nonce, cross-mode and replay rejected. | **UNKNOWN / NOT TESTED** on the owner's browser, Trial and banks. Public documentation supports a general redirectless web hypothesis only. |
| Android ordinary browser, initial Link | Synthetic new-tab callback accepted with the same guarded failures. No embedded webview or native SDK was modeled as a substitute. | **UNKNOWN / NOT TESTED** on the physical phone and provider. |
| Desktop ordinary browser, update/repair | Fake existing-Item login repair, consent renewal and account reselection have distinct post-return reconciliation actions. Domainless fake callback can pass. | **UNKNOWN / BLOCKED for unqualified no-domain repair claim:** current public OAuth instructions specify `redirect_uri` for update mode. |
| Android ordinary browser, update/repair | Fake new-tab update callback and rejection paths pass; post-repair source checks are required. | **UNKNOWN / BLOCKED** for the same redirect issue and untested physical tab return. |

The fixture nonce is deterministic solely for the oracle; the model generates a random 16-byte state when a fixture does not supply one. Neither form is real Plaid `oauth_state_id`, a real Link token, an authentication system, or proof of HTTPS/session security. No browser was opened.

## 4. Nine-day offline golden oracle and failure evidence (P4 / C04)

Virtual interval: `2026-11-01T12:00:00Z` to `2026-11-10T12:00:00Z`, exactly **9 days**. Pre-gap cursor `cursor-0`; one fake Item, checking/savings accounts, one pending and two posted source records, and two independent user category corrections. Two staged pages contain added, modified and removed changes. Final committed cursor is `cursor-2`; active source IDs are `fake-posted-1`, `fake-posted-3`, `fake-posted-4`. Removed `fake-pending-1` links to `fake-posted-3` only through the explicit same-account pending ID; its user correction transfers while the unrelated `fake-posted-1` correction survives a source modification. Removed `fake-posted-2` remains in removal history and an unmatched review queue. A deliberately cross-account pending association is rejected and queued instead of transferring its correction.

The model stages all pages and applies source state plus cursor only after `hasMore=false`. Simulated page-2 failure or pre-commit crash leaves the original cursor and data byte-equivalent. A mutation on page 2 requests `cursor-0, cursor-1, cursor-0, cursor-1`, proving restart at the original cursor. Repeated mutation stops after bounded retries with unchanged state. Duplicate replay yields the same final logical state. Empty arrays with `NOT_READY` do not count as complete initial history. The returned fetch time is distinct from source time; because these pages supply no source timestamp, transaction source freshness stays `UNKNOWN`. These are T2 synthetic invariants; actual Plaid catch-up duration, deletion/retention duties and source freshness remain untested.

## 5. Independent non-Transactions and recovery matrix (P5 / C05)

| State family | Planned source route or gap | T2 model outcome after gap / limit |
| --- | --- | --- |
| Item error and consent | `/item/get` can expose status/consent expiration; some revocation is webhook-dependent or delayed. | `ITEM_LOGIN_REQUIRED`, expired or revoked => `REQUIRES_REPAIR`; otherwise `LAST_KNOWN_STALE` for continuous-consent claim. Revocation flags retention review. |
| Account selection/presence | `/accounts/get` returns linked active accounts; newly unselected accounts can require update mode. | Missing/added IDs are enumerated. Partial coverage => `UNKNOWN`; disappearance triggers closed/revoked and retention review, not silent loss of transaction history. |
| Balance current/available | Cached `/accounts/get`; separate potentially paid live-balance route; source timestamps may be absent. | Current and available have separate status. Missing source time or null available => `UNKNOWN`; old source time => `LAST_KNOWN_STALE`; only an explicit complete recent *synthetic* source time => `FRESH`. Fetch time alone never upgrades it. |
| Card minimum/due date and loan balance | Product-specific `/liabilities/get`; incomplete/unsupported fields possible. | Each of three fields is independently `FRESH`, stale or `UNKNOWN`; partial response and absent/unsupported data remain visible. No institution field guarantee. |
| Initial Transactions history | `/transactions/sync` update-status field is separate from nonempty arrays. | `NOT_READY` => `UNKNOWN`; historical-complete fake signal changes readiness only, not balance or Item freshness. |
| Recurring and other notifications | Recurring endpoint/product status and webhook events require separate source checks. | Rate/error retains last-known stale with backoff; missed offline events remain `UNKNOWN` even after cursor completion. Irrecoverable event detail requires a later product/provider decision. |

The cross-family test feeds a completed synthetic Transactions history status into this independent model and still returns `UNKNOWN` balance age/missed events and stale Item continuity. A fake update-mode success similarly requires separate Item/account/source reconciliation. No cached-data retention right is inferred after revocation.

## 6. Safety, proof tiers and integrated I002-C01–C07 disposition (P6)

| Criterion | Builder-produced evidence now | Open limit and owner |
| --- | --- | --- |
| **C01** | **SUPPORTED T1:** dated public-source and owner-attributed hypothesis register above. | T3 independent source reconciliation belongs to Architect; actual Trial contract, `0/20`, pricing and entitlement UNKNOWN. |
| **C02** | **SUPPORTED T2 for fake Facet state model:** four-cell initial browser tests and negative paths. | Actual desktop/Android/Production/bank return **NOT TESTED T4**. |
| **C03** | **SUPPORTED T2 for fake repair state model; provider path UNKNOWN/BLOCKED.** Distinct repair intents and post-repair checks tested. | Domainless update-mode contradicts current redirect guidance; Architect/user decide a separately consented next proof or alternatives. |
| **C04** | **SUPPORTED T2 synthetic** nine-day all-page rollback/restart/idempotency/correction oracle. | Actual provider catch-up and real retention/consent limits **NOT TESTED T4**. |
| **C05** | **SUPPORTED T2 synthetic** independent source-family UNKNOWN/stale/repair behavior, with per-field and cross-family tests. | Real API product coverage, source timestamps and missed-event recoverability remain **UNKNOWN**. |
| **C06** | **SUPPORTED T1/T2 for scoped guard:** no credentials/Items/real data in fixtures; process-local network denial test passes. | No Windows/Android security, encryption, backup, price or device proof; distinct consent remains required. |
| **C07** | **T1 trace + T2 integrated fake oracle supplied** across both OAuth modes, both browsers and both data families. | **Architect alone** supplies T3 independent integration judgment. Prospective G0 recommendation: **do not clear G0 or activate M0** while the provider repair route and real-world obligations remain unresolved. |

**Permission boundary:** This delivery used only local source authoring, public docs and the already available Node runtime. No authenticated Plaid Dashboard/API, Link token, Sandbox/Production Item, real bank/financial data, owned Android test, host listener/LAN/public endpoint, dependency install, privilege/security/storage/backup change, purchase or paid call was made. Any indispensable provider/phone/host/cost step is a separate informed consent and workflow decision, not a continuation of this test command.

**Least-invasive next decision:** Architect independently audit the exact source/tests and recorded oracle, then decide whether the remaining update-mode contradiction can be resolved by current official clarification or merits a specifically consented provider comparison. If a domain, public receiver, fee, host privilege or product-scope change is required, stop for the existing Architect/Creative/user route. Historical I001 G0 stays **INDETERMINATE**; M0 stays **NOT CLEARED**.
