# Facet I004 WP02 — Architect to Clerk implementation preflight

Purpose: IMPLEMENTATION (not PLAN_REVIEW, correction, audit, merge or release).
ProducerRole: ARCHITECT
AuthoritativeRef: refs/heads/facet/i004-wp02-synthetic-integration
EffectivePassiveMain: 36d302afa3657a7b147d209e2560c5d7ccbd155e
Iteration: 004
WorkPackage: WP02
RequestedClerkState: PLANNING / CLERK_IMPLEMENTATION_PREFLIGHT / ActiveRole none / NextRole CLERK / ImplementationAuthorized false
ApprovalLedgerPath: docs/iterations/iteration-004/approvals/APPROVALS.md
ApprovalLedgerBlob: 8195d2ef7290f1e1d90a01d11becc511ff9f1b26
ApprovalFirstContainingCommit: 2450d0d366ea8deec62591730ae1e887f16dc4e2
ApprovalRecord: I004-WP02-EXACT-IMPLEMENTATION-APPROVAL-20261113-D602A13C
OwnerDecision: Owner answered "approved" after explicit explanation of exact reviewed WP02 Plan v0.1.0 and five bounded Builder deliverables, excluding owner-host and bank/Plaid access; separate Builder implementation authorization is now to be processed through Clerk.
ApprovalWaitHead: d602a13c8d51ed08ead1fdffde59ec4df31f9d28
ApprovalWaitStateBlob: 42a28a9be0e984dfd83f4805b841453c66638630
ArchitectPlanPath: docs/iterations/iteration-004/work-packages/WP02/ARCHITECT_PLAN.md
ArchitectPlanVersion: v0.1.0
ArchitectPlanBlob: 7403e19b8b591082010042119a61870499202109
ArchitectPlanFirstContainingCommit: f514ae08fc09390aef7db0a0cb47a1c3baac37a5
IterationAcceptancePath: docs/iterations/iteration-004/ITERATION_ACCEPTANCE.md
IterationAcceptanceBlob: 9abf75c97617b2963588e90b01ac981885fb59c7
IterationAcceptanceFirstContainingCommit: 873f3b5709871510076dad043e5fafd57b27f9a1
ArchitectOriginalReviewHandoff: docs/iterations/iteration-004/work-packages/WP02/ARCHITECT_TO_BUILDER.md
ArchitectOriginalReviewHandoffBlob: d4197915db355a3e9b01fb760b71baa6fd823496
IndependentBuilderReviewPath: docs/iterations/iteration-004/work-packages/WP02/BUILDER_PLAN_REVIEW.md
IndependentBuilderReviewBlob: 83c7eafc37eb8cc1ada0712333962ad9741b77c6
IndependentBuilderReviewVerdict: PLAN READY (no material change requests)
BuilderPlanReviewTechnicalHead: e9699c09ba10705cda973b1675647d491666516d
ClerkPlanReviewCompletionIntakeHead: 0d61a8917a3b7f9cdb8ac113f00169ecb0824c3e
ArchitectPlanReviewReturnHead: 8676708ff26e12dbb7f766119756e23dd75f2081
ArchitectApprovalWaitHead: d602a13c8d51ed08ead1fdffde59ec4df31f9d28
WorkflowBlobOnEffectiveMain: 57fd360379b06ab7625cc14fe17e90ef0ee1d176
ArchitectRoleBlobOnEffectiveMain: 135660210e5eb212ae9daf4a31467460c6715d11
AdoptedRoadmapBlob: e97cf8a679e26bd1c0444465dc7b9ba685e5deab
WP01MergedPR: 16
WP01MergeCommit: fc881096ba13020780882fb1df2915357738c68b
WP01StateReconciliationCommit: 2922aa283175d5fe0dd91931a4b9e373831bf2c9
BuilderImplementationDestination: refs/heads/facet/i004-wp02-synthetic-integration
ImplementationAuthorizedByThisHandoff: false

## Exact approved executable scope

Builder may implement only **W1–W5** in the unchanged independently reviewed WP02 Plan v0.1.0 against merged WP01 source:
- **W1:** Deterministic invented-data normal, delayed/loading, empty, stale, disconnected, missing/unknown, partial and failure/retry scenarios; honest provenance, coverage and incomplete balance totals.
- **W2:** Source-preserving, reversible transaction account/status/category filters; full stable-ID reconciliation and transparent zero-result states.
- **W3:** Actual accessible keyboard/focus/form/error interactions, announcements, contrast/readability and 375px/1280px responsive behavior.
- **W4:** Durable category/label/notes edits across a separate process restart, old-byte preservation under failed writes, reject-on-corruption and non-destructive fixture/scenario reset semantics.
- **W5:** Real runnable cross-view browser/API/storage integration journey (`tests/e2e/s1-journey.spec.js` or justified equivalent), exact commands/results and isolated runtime cleanup; preserve prior WP01 tests and update `SYNTHETIC_APP.md`.

The accepted I004-C01–C08 matrix, WP01 fixture/source/interpretation/API/store contract, and the independent review's **nonblocking** implementation cautions control scope. Positive and negative oracles, actual runtime/test results and honest limitations are Builder responsibilities, not automatically passed by PLAN READY. No silent product, schema, security, cost, consent or architecture expansion; material change returns to Architect and necessary Creative/user gate.

**Permitted environment:** Controlled, separately permitted synthetic development/test runtime with zero new monthly recurring cost; no assumption of authority to install or change anything on the owner's personal Windows machine, phone, network, existing drives, backup or other host resources. No real financial information, provider connection, Plaid SDK/Item/OAuth, bank account, credentials, payment or purchase; no Docker/WSL service required. G0 remains NOT CLEARED, M0 PAUSED, M1 NOT AUTHORIZED / NOT TESTED. Physical owner-host T4 proof is outside scope.

## Clerk's narrow independent gate

Clerk freshly resolves this non-main remote ref and effective remote main, independently validates current state, effective main workflow and `chatgpt/roles/CLERK.md`, this handoff's **externally observed** blob and first-containing commit, plan/approval/review/acceptance identities, branch and baseline, unchanged WP01 merge truth, complete linear ancestry and lack of intervening substantive changes since PLAN READY. Confirm this approval record is a separate actual owner decision and that the old Builder plan-review `BuilderTechnicalHead` is **not** an implementation start head.

Only on deterministic compatibility PASS may Clerk commit its exact `WP02/CLERK_TO_BUILDER.md` implementation clearance in an artifact-only commit, then publish a separate guarded state-only `PLANNING / BUILDER_IMPLEMENTATION / WP02 / ActiveRole BUILDER / NextRole none / ImplementationAuthorized true` on the authorized **non-main** branch. Clerk must independently observe `BuilderWorkStartHead` and provide that head to Builder. Clerk cannot approve scope, judge technical feasibility, implement product source/tests, create/merge PRs or release.

Failure or identity ambiguity must be reported by Clerk without a Builder activation. This handoff itself does not confer Builder work authority.

## Exact next boundary

Architect commits this handoff in its own **artifact-only** commit. A subsequent distinct **state-only** commit routes `CLERK_IMPLEMENTATION_PREFLIGHT` with `HandoffBlob` and `HandoffFirstContainingCommit` obtained from that already-published handoff. Implementation remains false until Clerk's separate lawful release. No audit, merge, UAT or release is approved by this owner decision.
