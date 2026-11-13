# Facet I004 WP01 — Architect to Clerk implementation preflight

Purpose: IMPLEMENTATION (not PLAN_REVIEW, correction, audit or merge).
ProducerRole: ARCHITECT
AuthoritativeRef: refs/heads/continuation/iteration-004-intake
EffectivePassiveMain: 28610d824d757f34b4a40d31ddd56fc0587b05f6
Iteration: 004
WorkPackage: WP01
RequestedClerkState: PLANNING / CLERK_IMPLEMENTATION_PREFLIGHT / ActiveRole none / NextRole CLERK / ImplementationAuthorized false
ApprovalLedgerPath: docs/iterations/iteration-004/approvals/APPROVALS.md
ApprovalLedgerBlob: 90159e6fd991e751adad08b7d6a5faf947d4930e
ApprovalFirstContainingCommit: ac6bf7da0e254ae1ba6767b306dbdeed718440b5
ApprovalRecord: I004-WP01-EXACT-IMPLEMENTATION-APPROVAL-20261113
OwnerDecision: Explicitly APPROVED exact WP01 v0.1.0 synthetic implementation, only in permitted controlled development/test runtime; no owner-host changes, financial data, Plaid, purchases, merge or later Work Packages.
ArchitectPlanPath: docs/iterations/iteration-004/work-packages/WP01/ARCHITECT_PLAN.md
ArchitectPlanBlob: 964f0db1fc07744f64e70c3e37076fcc184550ca
ArchitectPlanFirstContainingCommit: 873f3b5709871510076dad043e5fafd57b27f9a1
IterationAcceptancePath: docs/iterations/iteration-004/ITERATION_ACCEPTANCE.md
IterationAcceptanceBlob: 9abf75c97617b2963588e90b01ac981885fb59c7
IterationAcceptanceFirstContainingCommit: 873f3b5709871510076dad043e5fafd57b27f9a1
ArchitectOriginalReviewHandoff: docs/iterations/iteration-004/work-packages/WP01/ARCHITECT_TO_BUILDER.md
ArchitectOriginalReviewHandoffBlob: 8673e2b3d9154bd3032e858e32edd8e72aca283b
IndependentBuilderReviewPath: docs/iterations/iteration-004/work-packages/WP01/BUILDER_PLAN_REVIEW.md
IndependentBuilderReviewBlob: 9fdacc390b8ace2c48e212803237b542acf5cbf6
IndependentBuilderReviewVerdict: PLAN READY
BuilderTechnicalHead: de6c65e4f5702835172d68d836156ae8086598f6
ClerkCompletionIntakeHead: 1facd886a30be093dfe4a87427367bc4c9e2e631
ArchitectReviewedReturnHead: 12939bf207ba5cc840f94cf51fdb5be2c8e6b392
ApprovalWaitHead: bcb904c61b271e2558f6bc4af3846d80e74db2a5
WorkflowBlobOnEffectiveMain: 088762a69caf56091121207fdaff689ae07aa8d2
ArchitectRoleBlobOnEffectiveMain: 135660210e5eb212ae9daf4a31467460c6715d11
AdoptedRoadmapBlob: e97cf8a679e26bd1c0444465dc7b9ba685e5deab

## Exact approved executable scope

Implement first functional Facet synthetic local browser application with deterministic invented fixtures, interactive Overview/Accounts/account detail/Transactions, editable classification fields persisted across distinct server restarts, visible SYNTHETIC / DEMO identity, baseline responsive and accessible navigation, meaningful baseline load/empty/error states, automated browser/API/storage tests and reproducible build/start/stop. Preserve immutable fixture/source values, stable IDs, safe versioned durable override storage, request validation, single-writer envelope, and clearly disclosed runtime/test assumptions. Use the simple reviewed React/Vite + local Node same-origin + disk JSON design, no compulsory Docker/WSL/database/cloud. WP02 and its final integration proof remain separately gated.

## Clerk's narrow independent gate

Resolve authoritative remote ref FIRST and independently read state, effective-main workflow, Clerk role, this exact handoff and bound plan/review/approval/acceptance. Check complete original producer → Builder review → Clerk return → Architect approval-wait → ledger-only approval → handoff-only → state-only routing ancestry, actual file scopes and compatibility with a suitable **non-main** Builder implementation destination (proposed `facet/i004-wp01-synthetic-vertical`, check actual ref and installed workflow before release). Do not infer Builder permission from this artifact alone. If administrative PASS, create the required exact `CLERK_TO_BUILDER.md` clearance artifact on the authoritative control ref, then separately publish the active BUILDER_IMPLEMENTATION state with ImplementationAuthorized true, verify and supply externally observed BuilderWorkStartHead. Do not implement or judge technical sufficiency as Clerk. If blocked, use the ordinary Clerk administrative return. Only Builder may produce the approved software in a subsequently lawful controlled runtime; no owner-host installation/changes, live financial data/Plaid, purchase, merge, later WP or security-gate waiver is authorized.

## Exact next boundary

Architect commits this handoff in its own commit and separately publishes `.project/CURRENT_STATE.md` selecting CLERK_IMPLEMENTATION_PREFLIGHT, with HandoffBlob and HandoffFirstContainingCommit externally read back from the handoff-only commit. No Builder activation or coding by Architect. Original historical G0 NOT CLEARED, M0 PAUSED and M1 NOT AUTHORIZED remain unchanged.
