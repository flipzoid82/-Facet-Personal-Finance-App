# Facet — Architect Project Planning Closeout

**Closeout type:** `PROJECT_ROADMAP_APPROVAL_CLOSEOUT`  
**Project:** [Facet] Personal Finance App  
**Producer:** ARCHITECT; project planning approval/closeout intake under `docs/WORKFLOW.md`  
**Project stage:** `PROJECT_PLANNING`  
**Project lifecycle:** `ACTIVE`  
**Iteration / WorkPackage / Baseline:** none / none / none  
**Authoritative branch:** `main`  
**ImplementationAuthorized:** false  
**Status:** **APPROVED conditional planning roadmap; awaiting separate explicit Iteration 001 direction.** Not a production-readiness certificate or permission to execute any milestone.  
**Source remote main HEAD before this closeout:** `e3e85935a2b1dd36a55c2a4383f972090ab76da8`. This artifact cannot name its own Git blob or containing commit; the separate later routing state must do that.

## 1. Exact approved project planning authority

- **Approved roadmap:** `docs/PROJECT_ROADMAP.md` v0.1.1, Git blob `4e00d17702be6ad31b36d47491d777bc2032d77e`, ArtifactContainingCommit `01944571dbcf9b5d7cd866ec53e02d927171db9f`.
- **Independent review:** `docs/project-planning/BUILDER_ROADMAP_REVIEW.md`, Git blob `2db66fa3d32b554f4bbfd246bb29f51d898ae937`, ArtifactContainingCommit and BuilderTechnicalHead `1f2478c2cd87c017fcedf9532de86a6d820f2077`. Verdict `PLAN READY` for the **conditional roadmap only**; R-01/R-02/R-03 are sufficiently represented as future proof/stop gates, not technically passed.
- **Approval ledger:** `docs/project-planning/APPROVALS.md`, Git blob `42fc02bba92aa1838ce13d329b3b612522c5a226`, ledger-containing commit `e3e85935a2b1dd36a55c2a4383f972090ab76da8`. Decision `PROJECT_ROADMAP / APR20261108T105904Z`, recorded `2026-11-08T10:59:04Z`.
- **Explicit user approval wording:** "I approve Facet Project Roadmap v0.1.1 as the conditional planning roadmap, with its documented unknowns, blockers and approval boundaries. I am not authorizing Iteration 001, implementation, host changes, purchases or bank connections."
- **Previously approved Discovery:** `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md` v1.0, blob `1cac418428e75a0db7a2551fd6e250dec878e473`, containing commit `d3c73a734cd4d0d108fb0449324ac089fda1066e`, with distinct existing approval `PROJECT_DISCOVERY / APR20261107T232700Z` in the append-only project-stage ledger (pre-roadmap ledger blob `6f241148236a0d7d9aade264d324ee183b60b2d2`, containing commit `beb41ad6db0004df0695badece2fe7461322f7ca`). This remains approved product authority. No product meaning is changed in this closeout.
- **Project-stage review routing evidence:** original v0.1.1 Architect review handoff blob `89205dd98f7e8792909d2922a9d6d0ab0b85db94`, containing commit `02ae54501602e0576890bcafdfc7798d96c31494`; Clerk clearance blob `87ecead340000196aa19bf802edf07bf8174a1a7`, containing commit `145052418f698964f2476661d9c9a090ce30d39a`. Clerk returned the unchanged Builder review to Architect, and Architect entered passive user approval wait via state-only commit `0e3950d18b85f1eb3a0815b5a822b208d4445722`. No Builder decision substitutes for actual user approval.

## 2. Approved roadmap meaning

The user's approval accepts an **ordered conditional planning direction** `G0 → M0 → M1 → M2 → M3 → M4`, with mandatory evidence/acceptance and stop boundaries:

- **G0 — documentary-only Plaid Production-path screen:** Account-specific Trial limits, institution support, desktop and phone OAuth plus update-mode repair and $0/month operating plausibility must have a credible hypothesis **before** invasive host setup; unresolved Production behavior remains UNKNOWN. No Item consumption, credential use, paid upgrade or device changes for G0.
- **M0 — synthetic secure host/runtime and recovery proof:** A future separately approved test on Windows 11 Home must demonstrate suitable runtime, LAN HTTPS, separate legacy-preserving database/storage, actual live-data protection mechanism, encryption/key custody and complete synthetic restore on the actual host and phone. Not authorized now.
- **M1 — real Plaid Production feasibility gate:** Only after independent security/data-at-rest and recovery proof, contractual/provider coverage and explicit separate informed account/Production Item consent may real data enter Facet. No successful OAuth or bank connection is presumed.
- **M2 — source-accurate transactions and accounts:** No hidden pending/unidentified records; separate source truth from corrections, durable sync cursor and reconciliation, distinct last-known vs fresh data, and recovery across extended downtime.
- **M3 — verified bill and income workflow:** Confirm inferred recurring items, preserve ambiguous transaction visibility and bill calendar/inbox, prevent duplicate accounting, handle unknown payment minima and actual versus expected income honestly.
- **M4 — integrated first-use and explainable Outlook:** Distinguish available-after-obligations from projected month-end, explain assumptions, protect user interpretation, and require real-account integration evidence before calling the first useful release complete.

`G0` is a documentation screen rather than technical implementation permission. M0–M4 are **conceptual planning stages**, not authorized numbered iterations, WorkPackages, purchases, or execution steps.

## 3. Open constraints and future decision owners

| Open matter | Current status and boundary |
| --- | --- |
| Production OAuth, no-domain LAN, repair/update mode, phone redirect handling | **BLOCKED/UNKNOWN:** Plaid docs and institution listings cannot certify real Production flows; any necessary domain, public endpoint, fees or changed availability model needs a fresh user choice before adoption. |
| Plaid Free Trial allowance, fees, products and sustainability | **UNKNOWN:** User Dashboard indicated Free Trial `0/20`; public documentation cited `10 lifetime` Items. Do not treat counter as enduring entitlement, spend Items, upgrade plans or claim permanent free Production without independent evidence and consent. |
| Real institution/account coverage including Navy Federal, U.S. Bank, possibly CIT, credit/loan and field availability | **UNKNOWN:** Need permitted provider evidence and later separately authorized account-specific proof; CIT priority requires owner confirmation, not silent in-scope expansion. |
| Windows 11 Home security, Docker/WSL volumes, C:/D: headroom, CA trust, phone browser, credential custody | **CONDITIONAL/BLOCKED:** Physical device verification and informed owner opt-in required before any host, certificate, privilege, firewall or storage changes. Preserve prior project's Docker volume. |
| Live financial data, encrypted backups and T7 recovery | **BLOCKED before real financial data:** Require verified encryption at rest on actual storage, protected tokens and keys, tested full-state restore and safe handling of existing T7 files. |
| On-demand/offline >7 days and no-receiver completeness | **CONDITIONAL:** Required product/status matrix must be independently tested; `/transactions/sync` is not universal freshness or complete account/consent-state proof. |
| Revoked consent and retained data | **UNKNOWN:** Check applicable Plaid/provider terms; do not promise unconditional historical retention or silently change approved Discovery product meaning. |
| Expected future income's inclusion in projected month-end | **UNDECIDED:** Requires user and, if material product interpretation changes, Creative authority before implementing a formula. |
| Exact runtime choice, deployment/maintenance cost, bill minima/due dates, freshness thresholds | **UNSELECTED:** Resolve through future authorized technical planning and relevant user/Creative route. |

All conditions remain actionable gates; approval does not silently deem their evidence satisfied.

## 4. Explicitly prohibited or ungranted authority

This approval and closeout do **not** authorize: Iteration 001 planning direction/entry; any WorkPackage; code implementation or host modification; software/service installation; real-device testing requiring host changes; administrator rights, CA certificate installation, firewall/domain/DNS/network changes; Docker data migration or modification of legacy volumes and existing T7 files; purchases or paid services; Plaid account credentials, Sandbox or Production Item creation, bank connections; PR, merge, UAT or release.

A later **separate explicit owner instruction** must direct Iteration 001 planning before any iteration context is created. After I001 direction, every WorkPackage still requires exact governed plan, independent review and separate implementation approval. Privileged, paid and real bank actions each require their own informed consent.

## 5. Controlled closeout and successor wait

- This closeout records an already verified approved **conditional** project roadmap; it does **not** redefine its reviewed Git blob.
- **Next lawful control transition** is a **separate state-only commit** to passive `AWAITING_ITERATION_001_DIRECTION` with `ActiveRole: none`, `NextRole: ARCHITECT`, `Handoff: docs/project-planning/ARCHITECT_PROJECT_PLANNING_CLOSEOUT.md`, `ApprovalRequiredFrom: USER`, `Iteration: none`, `WorkPackage: none`, `Baseline: none`, `ImplementationAuthorized: false`.
- The state must bind this closeout's **pre-existing actual blob and containing commit**, plus roadmap/review/approval identities. No transition to active `ARCHITECT_PLANNING` or Iteration 001 occurs without a later distinct user direction recorded in the project-stage ledger.
- This closeout is not implementation approval or evidence of technical viability.

**Disposition: PROJECT_ROADMAP v0.1.1 APPROVED WITH CONDITIONAL GATES; AWAITING ITERATION 001 DIRECTION, NOT AUTHORIZED TO ENTER I001.**
