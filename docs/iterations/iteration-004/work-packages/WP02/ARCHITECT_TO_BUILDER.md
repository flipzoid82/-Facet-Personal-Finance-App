# Facet I004 WP02 — Architect → Clerk → independent Builder PLAN_REVIEW

Purpose: PLAN_REVIEW ONLY; not Builder implementation, owner implementation approval, merge or release.
Producer: ARCHITECT, verified `PLANNING / ARCHITECT_PLANNING / Iteration 004 / WP02 / ActiveRole ARCHITECT / ImplementationAuthorized false` on `refs/heads/facet/i004-wp02-synthetic-integration`.
Requested Next State: `CLERK_PLAN_REVIEW_PREFLIGHT`, ActiveRole none, NextRole CLERK, WorkPackage WP02, ImplementationAuthorized false.
SourcePlanCommit: f514ae08fc09390aef7db0a0cb47a1c3baac37a5
WP02PlanPath: docs/iterations/iteration-004/work-packages/WP02/ARCHITECT_PLAN.md
WP02PlanVersion: v0.1.0
WP02PlanBlob: 7403e19b8b591082010042119a61870499202109
WP02PlanFirstContainingCommit: f514ae08fc09390aef7db0a0cb47a1c3baac37a5
AcceptedIterationMapPath: docs/iterations/iteration-004/ITERATION_ACCEPTANCE.md
AcceptedIterationMapBlob: 9abf75c97617b2963588e90b01ac981885fb59c7
AcceptedIterationMapFirstContainingCommit: 873f3b5709871510076dad043e5fafd57b27f9a1
AcceptedRoadmapBlob: e97cf8a679e26bd1c0444465dc7b9ba685e5deab
WP01ApprovedMergePR: 16
WP01ExactApprovedHead: 202016e24b2de5286507eae3bb82f8d1547ea72f
WP01MergeCommit: fc881096ba13020780882fb1df2915357738c68b
WP01MainReconciliationCommit: 2922aa283175d5fe0dd91931a4b9e373831bf2c9
EffectiveMainHeadAndWP02Baseline: 36d302afa3657a7b147d209e2560c5d7ccbd155e
EffectiveWorkflowBlob: 57fd360379b06ab7625cc14fe17e90ef0ee1d176
PlanningActivationHead: 57e40a522c4a746944b5716f3717e1aeef38eceb
ProposedNonMainTechnicalBranch: refs/heads/facet/i004-wp02-synthetic-integration

## Requested independent plan review

Builder must independently assess the exact plan blob above, including whether WP02 can produce **actual running UI/API/storage source and tests** within the approved synthetic-first S1 acceptance map. The already-approved WP01 interfaces and prior first-WP review serve as baseline; new independent scrutiny focuses on WP02 exact scope and genuine changed global assumptions.

Challenge: deterministic normal/loading/empty/stale/disconnected/unknown/missing/partial/failure state drivers and truthful totals; reversible source-preserving filters with pending/unidentified records; keyboard/focus/live announcements, contrast and 375px/1280px layout; separate-process persistence and old-state preservation under corrupt/failed writes; fixture-reset behavior without silent override deletion; and full Builder-owned `tests/e2e/s1-journey.spec.js` real-server, real-disk, browser integration. Require falsifiable negative oracles, reliable environment/test commands, no fake live data, no bank/Plaid or secret access, no owner-host activity, no recurring cost, and T1/T2/T3 vs T4 limits. Report any incompatibility or material source/schema/acceptance/consent change rather than silently widening the plan.

Return one independent `PLAN READY` or numbered `PLAN CHANGES REQUIRED` / `BLOCKED` verdict tied to the exact plan blob, in `docs/iterations/iteration-004/work-packages/WP02/BUILDER_PLAN_REVIEW.md`, with concise evidence, constraints and actionable findings. This is a technical review, not source implementation. Builder never edits Architect plan or controls state.

## Clerk boundary

Clerk must freshly verify exact remote ref/head, active control state, this exact Handoff blob/first-containing commit after publication, plan, acceptance, merged WP01, effective workflow and role contracts, absent conflicting authority, and source ancestry. Clerk uses the existing separate clearance artifact and distinct state-only Builder PLAN_REVIEW release, **ImplementationAuthorized false**. A failure returns deterministically without Builder start. No review may be inferred from this handoff.

This handoff's own blob and first-containing commit must be obtained externally and bound by a **separate subsequent state-only routing commit**. This artifact cannot name its own blob/containing commit. No owner approval for WP02 implementation exists.
