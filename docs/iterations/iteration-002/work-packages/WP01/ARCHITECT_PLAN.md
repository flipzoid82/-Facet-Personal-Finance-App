# Facet — Iteration 002 WP01 Architect Plan

**Candidate:** I002-WP01 v0.1.0 — FIRST INDEPENDENT PLAN-REVIEW CANDIDATE; NOT APPROVED FOR IMPLEMENTATION.
**Purpose:** PLAN_REVIEW, first and only proposed I002 Work Package; planning only.
**Controlling branch:** continuation/iteration-002-intake (non-main); **starting remote HEAD:** a38b32c934e7e3f8c975a513e032c26412afb762; **Baseline:** 1e14ff466669ad3d385e6eb3ce65cc3bf7f32e07 (I001 source main release).
**Author:** ARCHITECT; **Phase / State at preparation:** PLANNING / ARCHITECT_PLANNING; **Iteration:** 002; **active WorkPackage at preparation:** none; **ImplementationAuthorized:** false.
**Future Builder technical destination:** facet/i002-wp01-g0-synthetic — selected non-main branch; search returned no matching branch during planning, **not created**; recheck destination and base when independently approved implementation preflight begins. Plan review uses the current continuation branch through Clerk; no Builder implementation/correction on main.
**Status:** Planning artifact, not evidence that Plaid, any Android browser, the owner's PC, a bank or any real provider path has been tested. No M0 entry.

## 1. Exact authority, unchanged scope and proof boundary

- Owner I002 planning-only direction: docs/iterations/iteration-002/approvals/APPROVALS.md, artifact blob edfbe704f931aa76da51048d3b554c33e15d1b5e; first containing commit 394a1e6f3968a919a8f57a1e9f8ee7280f412953; direction I002-NEXT-ITERATION-PLANNING-DIRECTION-20261109T002852-0800, DirectionKind PREREQUISITE_RESOLUTION.
- I002 complete acceptance/decomposition: docs/iterations/iteration-002/ITERATION_ACCEPTANCE.md, blob 112f8f4a9821f0667cbd19d3ae1541bdf5052ad0; first containing commit a38b32c934e7e3f8c975a513e032c26412afb762. Criteria I002-C01 through I002-C07; exactly **one** proposed WP01, all integration owned.
- I002 context: docs/iterations/iteration-002/ITERATION_CONTEXT.md, blob 3aa95222cd824b47d645fb8d1f3000c027fa710a, first containing commit a38b32c934e7e3f8c975a513e032c26412afb762.
- Accepted conditional roadmap v0.1.1: original approved docs/PROJECT_ROADMAP.md blob 4e00d17702be6ad31b36d47491d777bc2032d77e, first containing commit 01944571dbcf9b5d7cd866ec53e02d927171db9f; reconciled status-only current blob 70dfa942f704a07e61d9085925a7f6db8ebd7356. G0 must precede M0; M0 and M1 host/financial-security gates remain separate.
- I001 documentary G0 release remains historically **INDETERMINATE**, M0 PASS-TO-EXPLORE **NOT CLEARED**; original ARCHITECT_RELEASE_CLOSEOUT.md blob 97ab28f646dc2760bcb29ed4e2404ceee47f8d03; independent audit assessed documentary completeness, not actual Production viability.
- Source-attributed prior Plaid account research: docs/research/iteration-001/PLAID_ACCOUNT_FACT_FINDING_2026-11-08.md blob 83f7196b37914f5c32b3048680a9f62ea0344111, and Issue #5 readiness assessment. Owner explicitly defers the unexplained Dashboard 0/20 count until relevant to real Production/Items/billing. Do not replay the completed investigation.
- Approved Discovery remains real, read-only Plaid for first useful release, checking/savings first, desktop and Android browser access, no hidden source transactions (including pending and unidentified), per-account inspection, editable interpretations, honest stale/fresh/account coverage. Fake data is a **test medium**, not a change in release scope.
- Owner preferences: single user; owned Windows 11 Home Dell on demand, local Wi-Fi first; Android phone ordinary browser; no owned public domain or always-public webhook server; prefer $0 incremental monthly; no privileged host, certificate, public hosting, service, device, legacy data or T7 changes without separate informed consent.

The current authority is only to author and route this plan for independent review through Clerk. Even a PLAN READY result authorizes **no** code, test execution, provider/API usage, Sandbox or Production Item, installation, billable call, bank connection, device access, backup alteration, PR merge or M0.

## 2. Minimal proposed proof and what it cannot prove

**One bounded future technical delivery, only after exact-plan independent review and separate owner implementation approval:** an isolated deterministic no-network fake OAuth/callback and fake Plaid response harness, coupled to a virtual-clock (>8 days offline) account/transaction recovery model, plus dated official-documentation contrasts and an integrated falsification matrix. Prefer the host-neutral Node.js built-in test runner / standard library and static synthetic fixtures if compatible with an approved environment; no dependency install, PostgreSQL, Docker runtime, public server, real Plaid SDK/token, device change or persistent service is assumed or required for the core fake tests. Use mock adapters representing Plaid *contracts*, not a spoofed claim of provider validation.

**Smallest proof first:** executable pure tests and evidence of expected/observed results. Add a loopback-only fake HTML browser demonstration if essential to validate callback UX and separately permitted by exact implementation/environment approval; fake Chrome/Android user agents never equal physical Android evidence. Do not bind to a LAN/public interface; actual Android network or handset testing would be a separate owner-device/network consent gate. Keep fixtures separate from the legacy PersonalFinanceApp and from real financial data.

The fake harness can **falsify** state handling, retry safety, session validation and completeness assumptions; it cannot verify Plaid's actual OAuth endpoint behavior, institution-specific authorization, update-mode redirect policy, Production entitlement, sustainable $0 account plan, real Android browser return, Windows encryption, or no-domain provider acceptance. If the next indispensable test needs Plaid Sandbox calls/Items or an owned device, stop and route it as a **new specifically consented action** after reviewed-plan and exact implementation gates, not a hidden fixture substitution.

## 3. Proposed Builder task sequence and deliverable ownership (not executable now)

| Task | Minimal future activity / reproducible oracle | Outputs and acceptance |
| --- | --- | --- |
| P1 — Source/hypothesis baseline | Capture date/version/URL and the precise attributed T1 claims for official Plaid OAuth, update mode, Link token, Transactions Sync, Item/account/balance/liability status. Contrast public docs with owner-reported Trial. Tag source, confidence, limitation and changed-evidence trigger, not previously exhausted dashboard questions. | Versioned source and contradiction register; C01, guard C06 |
| P2 — Browser initial OAuth model | Model independent desktop Chrome-class and Android external-browser Link open, new popup/tab, blocked popup, success/exit/cancel and callback return. Make no-redirect and registered-redirect hypotheses separate; require one-time state/nonce, expiration, matching session/origin and replay rejection for fake callback. Explicitly mark webview/Android native SDK as different platforms. | Deterministic fake state-transition tests + four-path initial browser hypothesis matrix; C02 |
| P3 — Update mode/repair model | Model Item error/expiring consent, user-initiated update-link-token regeneration, consent renewal vs account re-selection, session-correlation, retry, cancel, aborted redirect, stale state, replay, and post-repair source reconciliation. Explicitly test the domainless-update hypothesis as **unconfirmed provider behavior** against official redirect instructions, on desktop and Android ordinary browser separately. | Repair transition table with guarded outcomes and authoritative-source contradiction/stop condition; C03 |
| P4 — Virtual >8-day Transactions outage | With a frozen virtual clock, construct pre-offline cursor, 9-day downtime, multiple added/modified/removed pages, pending-to-posted replacement, unknown matches, page failure, mutation-during-pagination, restart and duplicate replay. Stage one update batch atomically; persist cursor only after complete successful application. On mutation error restart the **whole page loop from original cursor**, not final failed page. | Golden pre/post state, deterministic scenario fixtures, command results, invariant checks and failure diffs; C04 |
| P5 — Independent non-Transactions reconciliation | Given a virtual 9-day outage, inject changed/removed account, partial/stale balance, Item login error, consent expiry/revocation, changed coverage, unsupported card/loan/liability fields, missing webhook-only signals, and initial-history not-ready condition. Reconstruct what can be polled vs what remains UNKNOWN or REPAIR_REQUIRED; make each status source- and timestamp-qualified. | Product/state recovery and API/poll/retention gap matrix, synthetic negative tests; C05 |
| P6 — Permissions, security and integrated decision | Verify network is disabled in fake tests; no user secrets, real identifiers, external call, logs of tokens, cost, public exposure or touching host resources. Trace P1–P5 outcomes to I002-C01–C07 and produce a supported/falsified/unknown prospective G0 verdict, independently reviewable oracle and stopped actions. | Guard/consent matrix, evidence manifest, risk and least-invasive next decision; C06/C07 |

**One WP and all interfaces:** P1 source constraints feed P2/P3 browser state and P4/P5 data state. P3 and P5 must agree on Item/consent/account outcome after update mode. P4 and P5 must agree on what data may be marked fresh after a crash or 9-day outage. P6 is the Builder-produced evidence integration task; **Facet I002 ARCHITECT alone owns final independent integration verification** across both OAuth modes, both browsers and both data families. No cross-WP interface exists; no separate WP02 or additional routine review is created.

## 4. Exact behavior cases, invariants and stop criteria

### Browser / OAuth: four separate cells and negative paths

| Target browser | Initial Link hypothesis | Update/repair hypothesis | Required falsification and honest limit |
| --- | --- | --- | --- |
| Desktop ordinary browser | Provider may open OAuth bank page in popup; callback with or without configured return path must be independently distinguished. | Renew an existing Item via update mode; same popup behavior **not** presumed. | Test fake success, cancel, popup blocked, expired/invalid nonce, wrong session, wrong origin, return replay. Provider route remains UNKNOWN without separately approved provider test. |
| Android ordinary browser (not webview) | New tab / return-to-original-tab hypothesis, with session continuation and user cancellation. | Existing-Item update and consent renewal with same return restrictions independently evaluated. | Fake tab/state and cancellation cases cannot prove an actual phone/browser return. Webview/mobile SDK redirect requirements are distinct and not substitutes for the approved standard-browser product. |

**Critical documented contradiction to adjudicate, not resolve by assumption:** Plaid OAuth guide says ordinary desktop/mobile web may function without a redirect URI using popup/new-tab; the same guide advises a redirect URI for update mode and describes HTTPS registered redirects (except HTTP localhost in Sandbox). Public links checked 2026-11-09:
- https://plaid.com/docs/link/oauth/ — browser popup/no-redirect discussion and redirect/update-mode clauses.
- https://plaid.com/docs/link/update-mode/ — use of update mode for expired authorization and example redirect.
- https://plaid.com/docs/link/troubleshooting/ and https://plaid.com/docs/api/link/ — redirect-URI/token behavior.

A successful fake callback **does not** override Plaid's documented constraint. If practical update-mode needs a controlled registered HTTPS URI inaccessible to the domainless private-LAN design, classify the provider path UNKNOWN/BLOCKED; document options (e.g. user-approved owned domain/redirect or alternate provider-supported flow), costs/availability/security implications and decision owner, **without** creating a domain or public receiver. Never quietly swap Android web for native app or accept unsafe webview behavior.

Fake browser callback security: one-time unpredictable synthetic nonce/state bound to mode, intended session, expected return origin and expiration; consume state atomically; reject unsolicited/out-of-order/replayed/cross-mode callbacks; never present provider tokens or browser-visible long-lived secrets as fixtures. Treat the browser as untrusted. The session model is a technical test oracle, not a claim of adequate real authentication or HTTPS deployment.

### Transactions: deterministic oracle after nine virtual days offline

Initial state includes 1 Item, multiple accounts, at least 1 pending and 2 posted source transactions, user classification overrides and durable pre-gap cursor. Virtual time advances >=9 days with app offline. Rejoin includes two or more cursor pages with added/modified/removed entries; pending removed and posted replacement linked only if the fixture explicitly supplies credible association, otherwise a visible unmatched review condition (no loss/hidden entry). Assert:
1. Apply an update atomically only after reaching has_more=false; commit cursor and reconciled state together. Crash at page 2 or before commit preserves prior committed cursor and state; rerun yields exactly one logical final result.
2. Mutation during pagination restarts at the original cursor for the **entire affected update**, retries boundedly and surfaces STOP/UNKNOWN if continually changing; never silently skip.
3. Reapplying identical pages, retries and restarts do not duplicate source identities, lose removals or overwrite unrelated user correction data.
4. An account disappears or is revoked without erasing visible transaction history by default **in a fake model only**; actual consent revocation and provider retention/deletion obligations govern future real data. Do not promise indefinite historical retention.
5. Show last-known and verified-current scopes with source time vs fetched-at time distinct. A successful HTTP/mock poll or restart does not by itself make balances, Item status or transaction history source-fresh.

Reference source checks: https://plaid.com/docs/transactions/ and https://plaid.com/docs/errors/transactions/; transaction update/mutation pagination behavior must match the currently consulted official API version. Missing history, sync limits or unbounded error recovery is BLOCKED/NOT TESTED, not a claim of zero data loss.

### Non-Transactions: recoverability is not implied by Transactions cursor

Every required source family — Item error/status, consent expiration/revocation, account presence/selection, balance current/available with timestamps, credit card/minimum/due-date and loans/liabilities where supported, readiness of first history, recurring-data derivation or other non-Transactions notifications — must identify:
- An actually documented on-launch status/list/poll/refresh route and its limitations, OR a condition only observable while online, OR an explicit irreversible/unsupported gap.
- Distinct status enum FRESH / LAST_KNOWN_STALE / UNKNOWN / REQUIRES_REPAIR, with as-of/source-attribution and partial coverage; no generic "synced now means fresh" assertion.
- A fake scenario for no-webhook 9-day gap, API missing product, partial institution data, consent withdrawn, stale account, error/timeout/rate limit, transient failure, backoff and user-visible next action.
- Safe privacy effect after revocation: flag data access/retention review; no assumption that a cached historical copy remains permissible. Exact legal/product requirements remain future M1/M2 gates.

Official starting references: https://plaid.com/docs/api/items/ , https://plaid.com/docs/api/accounts/ , https://plaid.com/docs/link/update-mode/ . A status field may reflect only a particular product's update, not independent freshness for all source families.

## 5. Evidence files, proof tiers, review and adjudication

**Builder deliverables only if later separately approved:**
- docs/iterations/iteration-002/work-packages/WP01/proof/ (minimal isolated fake fixtures/harness, deterministic oracles and README; filenames chosen by Builder within this approved boundary).
- docs/iterations/iteration-002/work-packages/WP01/G0_SYNTHETIC_PROOF_REPORT.md — dated source/contradiction inventory, environment and command transcript, four browser/mode cells, virtual 9-day recovered-state golden outputs, other-state matrix, failures and stop conditions, explicit unsupported/unknown, source URLs, test manifest, no-sensitive-data assertion and exact I002-C01–C07 trace.
- docs/iterations/iteration-002/work-packages/WP01/BUILDER_IMPLEMENTATION_RETURN.md — only after a properly cleared Builder implementation/correction; cite exact committed substantive source/tests and reported run identities, not fabricated T4 or provider API validation.
- Architect later independently reviews results against recorded oracle, code/test identity and cross-family integration; no source modification during Architect audit.

**Evidence tiers:** T1 official dated source/proposed model/committed fixtures; T2 reproducible Builder executed commands + actual host/runtime identity after authorized work; T3 separate Architect challenge of recorded test oracle/output and contradictory docs (not physical witnessing); T4 actual owner-host/browser or provider/bank evidence only after *individually informed* separate opt-in, never presumed. On present planning date all executable T2/T3 claims are **NOT TESTED**. Current repository work contains planning/evidence definitions only.

**Decision register:** Per I002 criterion and four OAuth browser/mode cells: SUPPORTED (source or actually demonstrated, tier specified) / FALSIFIED / UNKNOWN / NOT TESTED or BLOCKED, exact evidence refs and prerequisites. C07 should recommend (a) G0 hypothesis credible enough **to consider a later separately approved M0 plan**, (b) blocked/indeterminate provider route requiring explicit owner alternative, or (c) exact next safe *separately approved* proof. No prospective recommendation alters historical I001 G0 INDETERMINATE automatically. A mock-only green never establishes Production, real institution, sustainable free plan or physical Windows/Android proof.

**Bounded failure handling:** A repeated unreconciled provider redirect contradiction, missing recoverable non-Transactions state or indispensable new domain/fee/privilege/online endpoint is not a reason for endless fake reruns. Return exact failed assumption, credible changed-evidence proposal and lawful user/Creative decision if changed obligations. Builder does not ask Clerk to make technical decisions.

## 6. Safety / consent matrix and exclusions

| Action or resource | Current authority | Future gate |
| --- | --- | --- |
| Read official public documentation, plan and independent review | PLANNING permitted | No secrets, account/dashboard access or executing tests |
| Author isolated fake proof code, run Node tests, launch any local listener, use Builder-owned test host | **NOT AUTHORIZED** now | Current reviewed exact WP, explicit owner implementation approval and compatible environment; no installation/host changes without separate opt-in |
| Create real Plaid Link token, any Sandbox/Production Item, invoke developer API, inspect developer Dashboard, use credentials | **NOT AUTHORIZED** | Separately scoped provider/resource consent with possible usage/rate/Items implications, plus approved exact technical plan; no real-bank access until later security/financial gates |
| Android physical phone browser, home LAN ingress, public hostname, webhook/redirect receiver, domain, reverse proxy, root CA, firewall, certificate, Node/Docker/service install | **NOT AUTHORIZED** | Separate informed owner-device/network/admin/expense/security permission and documented reversal before any change |
| Access bank data, live DB, keys, security state, backup disk/T7, legacy PersonalFinanceApp volumes | **NOT AUTHORIZED** | M0/M1 physical-security, key custody, retention and host-owner consent gates; read-only bank connection requires distinct explicit real-account consent |
| Buy or upgrade Plaid plan, paid hosting/domain, consume paid product usage, submit onboarding | **NOT AUTHORIZED** | Explicit informed price/terms consent; revisit deferred 0/20 only once materially relevant |

Never request credentials or copy sensitive test outputs into Git. Fake tests should default to zero network operations, ephemeral synthetic data and non-persistent storage; clean up own disposable files. Stop before externally connecting, downloading dependencies or modifying owner security/configuration. $0 incremental recurring cost is a constraint to verify, **not** a verified provider pricing promise.

## 7. Criterion trace, independence and complete iteration ownership

| I002 ID | Builder future task and precise primary evidence | Architect independent integration responsibility |
| --- | --- | --- |
| C01 | P1 source/provenance/hypothesis register | Resolve initial/update source tension, avoid unsupported Dashboard conclusions |
| C02 | P2 browser initial matrix and negative-case mock oracle | Distinguish desktop vs Android ordinary browser and T2 fake vs T4 physical/provider |
| C03 | P3 update/consent/repair matrix and rejected callback cases | Independently assess repair/domainless credibility; no pass inherited from initial |
| C04 | P4 virtual-gap transactional cursor/pending/removal/rollback tests | Challenge exact cursor atomicity, replay and correction preservation |
| C05 | P5 Item/account/balance/liability freshness and missing-event matrix | Compare non-Transactions to Transactions and identify webhook-dependent gaps |
| C06 | P6 consent/host/provider/cost/security stop matrix | Enforce no changed product/resources and future M0/M1 physical obligations |
| C07 | P6 supported/falsified/unknown cross-criterion report | **Facet I002 ARCHITECT**, sole accountable final integration verification and G0 prospective disposition |

The existing I002 ITERATION_ACCEPTANCE.md is the complete iteration decomposition. **One** WP01 covers all criteria and one Builder review must assess the **whole** iteration. Builder owns synthetic test construction and recorded cross-path evidence *only after a new approval*; Architect independently validates all material interfaces. Later audited and exact-head merged result can feed only the usual I002 UAT_ASSESSMENT_XXX.md iteration exit matrix and normal UAT decision, release approval and Architect → Creative → Architect reconciliation. A user SKIP UAT never waives mandatory technical proof.

## 8. Independent Builder PLAN REVIEW request (no execution)

After Architect publishes an identity-bound handoff and a **separate** Clerk plan-review preflight/release, Builder reviews exactly this v0.1.0 plan AND the whole I002 acceptance/decomposition with ONE verdict: PLAN READY or PLAN CHANGES REQUIRED. Review must not create code, fixtures, tests, provider Items, host changes or a technical PR.

Review questions:
1. Is one WP01 truly minimal, with no unowned interface or missing C01–C07 outcome? Do P1–P6 support a falsifiable result, not just another documentary repetition of I001?
2. Can fake browser callbacks meaningfully test failure, nonce, replay, expired session and human repair UX without accidentally claiming Plaid real update-mode behavior on desktop/Android?
3. Does the no-domain update-mode redirect contradiction have a defensible STOP/UNKNOWN decision, rather than optimistic assumption? Is real Production bank support treated as an unproven external dependency?
4. Are cursor pagination/restarts after mutation, 9-day clock, idempotence, pending replacement, user correction separation and partial failure oracles sufficiently precise?
5. Are account/Item/consent, balances, card/loan fields, initial history, revocation and offline missed events independently recoverable or explicitly UNKNOWN and correctly dated?
6. Can the proposed no-network mock proof be run in an allowed environment without dependency install, device/legacy-data touching or cost? Which T2/T3 claims would be supported and what essential T4 would remain?
7. Are all new provider/Sandbox Item, browser physical, root-trust, domain, public endpoint, service, expense, secrets, backup and real-account actions individually gated?
8. Is the selected future non-main branch and exact handoff/decomposition binding compatible with ordinary Clerk preflight and later separate implementation approval?
9. If evidence remains inconsistent or incomplete, does the plan return actionable BLOCKED / NOT TESTED and a bounded user decision instead of a no-delta retry or disguised M0 launch?

A PLAN READY verdict means this is a reviewable plan; it does **not** mean G0 is cleared, T2 tests were executed, Sandbox is approved, or the plan itself has implementation consent.

## 9. Required transition after this planning artifact

Commit this Architect-owned candidate and an exact identity-bound ARCHITECT_TO_BUILDER.md, then publish a separate **state-only** transition to PLANNING / CLERK_PLAN_REVIEW_PREFLIGHT, ActiveRole none, NextRole CLERK, WorkPackage WP01, ImplementationAuthorized false; set exact Handoff and its blob/first containing commit in NextAction. Clerk first validates the state, artifacts, authorized plan-review purpose, baseline, non-main implementation destination and approvals; Clerk alone may separately clear/release Builder PLAN REVIEW. Do not activate Builder directly. Even if independently PLAN READY, later exact implementation requires a distinct user approval and Clerk implementation preflight.