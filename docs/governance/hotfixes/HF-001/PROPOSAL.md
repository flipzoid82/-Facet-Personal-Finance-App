# HF-001 Proposal Snapshot — DRAFT UNREVIEWED

Source: https://github.com/flipzoid82/-Facet-Personal-Finance-App/issues/11
Issue title: HF-001 — Owner-initiated governance hotfix draft: iteration continuity and pause/resume
Issue updated at: 2026-11-10T05:56:17Z
Source authoritative main: 758f0a97adaa15cda37ba08a1958d5896e9699cd
Installed owner review charter blob: 4ccb635a5ddda5baa0351d8b1d8bfb95bd8e329a

The following is a verbatim snapshot of the Issue #11 body for independent review. It is not an approved policy, implementation plan, or change to the accepted roadmap.

# HF-001 — Owner-initiated governance hotfix committee: DRAFT v0.1

**NOT EFFECTIVE / UNREVIEWED / NO REPO WORKFLOW CHANGE.** Date: 2026-11-09 America/Los_Angeles. **Owner request:** Can we quickly work on the governance? This issue keeps popping up every iteration end. I thought we fixed this earlier, but i guess not. We need to address this now. Consider this as an owner-initiated hotfix committee. I need you to draft a hotfix to the workflow governance considering some of these ideas: 1. RELEASE_COMPLETE is no longer the end result of an iteration's completion. After the Creative and architect finishes closeout procedures, the architect will declare ITERATION_COMPLETE and then setup the workflow for the next Iteration according to the roadmap. If all roadmap milestones are complete, only then can the architect declare RELEASE_COMPLETE. 2. Establish a pathway for the owner to pause current work to address a reasonable grievance or workflow blocker. This pause would allow the current agent to take a snapshot of the current workflow status and return to it later once the issue has been resolved. The owner has to approve this stoppage, which will be durably recorded in the repo. After the draft I'll have the builder review (after Clerk preflight), then Architect review, then authorize implementation separately.

**Context and binding:** completed Facet I003, remote `main` exact `1dd698bb4e28fe1ddb6c58555eb40f6e57f5b367`, passive `RELEASE / RELEASE_COMPLETE / ActiveRole none / NextRole none / WorkPackage none / Handoff none / ApprovalRequiredFrom none / ImplementationAuthorized false / ProjectLifecycle ACTIVE`, state blob `2e3178505a3dbe9bb31ed864a17a13b0453c3e42`. Current `docs/WORKFLOW.md` blob `c1c4cd8a6e9ada545ba8be8b9e619db5a68e0e98`, Architect contract blob `4eb621a773c5ea6a61a7bf221708c5bca1fb9aa7`; exact completed closeout blob `46010b9a2cbaf73fa9271c0b3a593af248bd2729`. Accepted conditional roadmap v0.1.1 blob `19014633c69b976db874c50be880bfbd11c02819`. Related issue [#10](https://github.com/flipzoid82/-Facet-Personal-Finance-App/issues/10) revealed missing post-release roadmap-review routing.

## Diagnosis: why the earlier fix did not prevent this

Current `docs/WORKFLOW.md` line 134 sends every numbered `ARCHITECT_RELEASE_CLOSEOUT → RELEASE_COMPLETE`, line 136 leaves `NextRole none`, and the four Architect post-release exceptions (§§174–249) only permit archival, readiness advice, *fresh explicitly owner-directed successor*, and whole-project lifecycle decision. Those exceptions have no durable project-wide **roadmap revision review** path through Clerk/Builder/Creative while the iteration is complete. `scripts/post_release_contract_fixture.py` and `tests/test_post_release_continuation.py` currently hardcode the per-iteration passive `RELEASE_COMPLETE` contract. Fixing just the current Issue #10 would repeat the deadlock.

## Normative patch proposal A — ITERATION_COMPLETE, bounded automatic readiness and final RELEASE_COMPLETE

**A1. Distinguish lifecycle meanings.**
- `ITERATION_COMPLETE` = the numbered iteration N finished *its scoped acceptance*, after the original independently audited WP(s), separate merge/UAT/owner completion approval and Architect → Creative → Architect reconciliation. Project still `ACTIVE`. Documentary-only completion does not assert G0 PASS, physical T4 proof, application readiness or real-bank integration.
- `RELEASE_COMPLETE` = *entire accepted roadmap's required first-use release* demonstrably satisfied and owner **separately approves final project release**. It must have independent end-to-end integration, security and relevant consent proofs; `ProjectLifecycle COMPLETE`; no standing roles or implementation. Merely exhausting an iteration number or skipping UAT does not qualify. Owner cancellation is instead distinct `PROJECT_CLOSED_INCOMPLETE` (never call it a delivered release).

**A2. Replace ordinary end transition, without skipping any existing approval.**
```
AWAITING_RELEASE_COMPLETION_APPROVAL (owner approves iteration scope)
 -> ARCHITECT_RELEASE_RECONCILIATION
 -> CREATIVE_RELEASE_RECONCILIATION
 -> ARCHITECT_RELEASE_CLOSEOUT
 -> ITERATION_COMPLETE (separate state-only commit)
 -> ARCHITECT_NEXT_ITERATION_PREP (separate bounded activation)
 -> NEXT_ITERATION_READINESS [READY | BLOCKED | ROADMAP_DECISION_REQUIRED | ALL_MILESTONES_VERIFIED]
```
- `ITERATION_COMPLETE` tuple: `Phase RELEASE; Iteration N; ActiveRole none; NextRole ARCHITECT; WorkPackage none; Handoff exact N closeout; ApprovalRequiredFrom none; ImplementationAuthorized false; ProjectLifecycle ACTIVE; NextAction NEXT_ITERATION_PREPARATION`.
- Distinct activation `CONTINUATION / ARCHITECT_NEXT_ITERATION_PREP`: `Iteration N` **remains the completed predecessor** until a verified successor exists; `ActiveRole ARCHITECT / NextRole none / WorkPackage none / ImplementationAuthorized false`. This gives Architect **readiness and proposal authority only**, not implementation or real-data work. Owner's eventual adoption of HF-001 would supply a standing workflow-level *planning-only* continuation rule; no fresh “keep going” message every ordinary iteration.
- Architect publishes `NEXT_ITERATION_READINESS.md` with exact roadmap/version, completed milestones and proof, next candidate, remaining dependencies, owner/cost/host privacy burdens and falsifiable decision. 
- **READY:** stage and obligations unambiguously accepted → can create exact `continuation/iteration-{N+1:03d}-intake` **planning-only** by exclusive absent-ref claim, ledger-only commit L then separate state-only S; no Work Package or Builder execution until normal reviewed plan and new owner exact implementation consent. No duplicate or auto-cascade.
- **BLOCKED / ROADMAP_DECISION_REQUIRED:** no successor activation. Route to bounded **review-only roadmap-revision** proposal/owner choice; `AWAITING_OWNER_PATH_DECISION` remains resumable. No “G0 now PASS” by inference, no M0, bank Items, host modifications or arbitrary plan substitution.
- **ALL_MILESTONES_VERIFIED:** verify the accepted complete roadmap, end-to-end functionality and security proof; enter `AWAITING_FINAL_PROJECT_RELEASE_APPROVAL` and await distinct owner approval before `RELEASE_COMPLETE / ProjectLifecycle COMPLETE`. If an accepted milestone remains blocked or the owner hasn't accepted a revised scope, stay non-final.

**A3. Add an explicit review-only roadmap lane independent of I004.**
From Architect next-prep or owner-approved governance review, permit `ROADMAP_REVISION_REVIEW` on a unique isolated candidate ref. Architect binds a versioned proposed roadmap, exact historical accepted blob, affected stages/gates, consent obligations and alternatives. **Clerk uses existing `CLERK_PLAN_REVIEW_PREFLIGHT`** with a new `Purpose PROJECT_ROADMAP_REVISION_REVIEW` and **WorkPackage none** to validate exact refs/heads/handoff and candidate, then activates independent Builder `BUILDER_PLAN_REVIEW` **review only**. Builder returns structured feasibility verdict without acting as Architect/Creative or editing the candidate. Clerk completion routes to Architect; Architect resolves technical findings, Creative separately reviews product/resource changes and gets any distinct owner choice; material revision triggers fresh review. Only an **exact reviewed version-bound owner roadmap approval** may replace the accepted roadmap. Neither review nor roadmap approval starts I004 or grants implementation. Do not create a fourth Clerk state if an existing one can be extended.

## Normative patch proposal B — owner-approved PAUSE and safe RESUME

**B1. Owner's power:** may request pause during any active role, wait, PR/review, next-prep or grievance. If the agent proposes pause, it must solicit explicit affirmative owner consent; an explicit “I approve PAUSE…” is itself consent. A mere complaint is not consent. An immediate safety “STOP” halts unsafe activity as possible even before durable publication, but is *not* falsely labeled a committed pause.

**B2. Exact snapshot and two-phase control:**
1. Current responsible role stops affected work, captures the *actual* branch/ref HEAD, observed `main`, original `.project/CURRENT_STATE.md` fields/blob, role/phase/action, iteration/WP, source/test/plan/approved/handoff/PR/Builder head/audit/merge and pending approvals, actual uncommitted worktree/side effects, blockers and resume requirements. Write an immutable **sanitized** `docs/governance/pauses/<PauseID>/PAUSE_SNAPSHOT.md` in the authorized branch; do not save secrets, keys, personal finance data or pretend uncommitted code is durably preserved. The Owner approves precise pause scope and effects in a durable append-only `PAUSE_APPROVAL` record. If a Builder is currently active, Builder may snapshot technical/WIP facts but must **not** self-authorize Clerk state changes; use a narrowly defined deterministic pause-publication exception/delegate.
2. Publish a **separate state-only** `OWNER_PAUSED` with `Phase GOVERNANCE / ActiveRole none / NextRole none / ApprovalRequiredFrom USER (resume choice) / ImplementationAuthorized false / Handoff exact snapshot`, preserving original Iteration, Branch, Baseline and naming pre-existing PauseID/approval/snapshot blob and containing commit. Stop on stale heads or failure to preserve WIP. Paused original branch has no further technical or merge work.
3. Grievance resolution is allowed only on a separately owner-approved, isolated hotfix/ref, *not* by quietly continuing the paused WP. Record residual external side effects; a Git state cannot physically stop already-running services.

**B3. Resume or abandon requires affirmative user choice:**
- Owner explicitly says `RESUME <PauseID>` or `ABANDON <PauseID>` after a source-identified resolution report. No auto-resume after merging a hotfix.
- Deterministic `RESUME_PREFLIGHT` verifies exact snapshot, pause approval and branch/main heads, target code/PR, owner permissions, affected policy version, and whether plan review, implementation approval or audit are still fresh. Classify `UNCHANGED_AND_FRESH`, `REVIEW_REFRESH_REQUIRED`, `CONFLICT/BLOCKED`.
- Fresh → separate resumptive approval/control commits restore *only* the original scoped role/state/handoff; never invent privilege. Changed → refresh relevant independent review/owner approval first. Conflict → remain paused, no destructive reset, rebase, force push, silent reconciliation or duplicate PauseID. Abandon is recorded separately without claiming work was completed.
- One active PauseID per scope; duplicates are idempotent; nested/conflicting pauses stop for owner decision. Snapshot contains **no credentials or recovery keys**.

## Normative patch C — committee review and one-time bootstrap

**Critical circular-authority problem:** At the verified current I003 `RELEASE_COMPLETE` state no role is active. A GitHub Issue is **not** a durable handoff; the current Clerk cannot simply preflight an issue, and Builder cannot start a review because owner requested it in chat. The new governance route cannot be treated as already effective before adoption.

**Required bootstrap:** After the owner reviews this exact HF-001 draft/version, seek a **separate narrowly scoped owner-ratified GOVERNANCE_REVIEW_CHARTER** (bound to source `main` H, Issue revision/immutable candidate blob, HotfixID and review-only powers). The charter must provide a verified review-only active control/ref path from a completed iteration, with distinct role heads/handoffs and no change to accepted product, original release or `main`. Review route:
```
Owner-chartered isolated HF-001 review ref and immutable draft
 -> Architect exact governance proposal
 -> Clerk preflight (Purpose GOVERNANCE_HOTFIX_REVIEW; WP none)
 -> independent Builder substantive contract/regression review
 -> Clerk completion intake
 -> Architect findings/disposition
 -> Creative only if product/resource semantics change
 -> exact final version and separate owner authorization for implementation
 -> preferably Builder implements; Architect independently audits
 -> separate owner exact-head merge approval
 -> only then optional separately approved forward-only legacy migration
```
Do not simultaneously treat Architect as substantive implementer and independent auditor. A review verdict is not implementation authorization. All pre-existing approved Builder/Clerk boundaries and ordinary exact-head merge/UAT/resource gates remain.

**Forward-only compatibility:** Never rewrite I001–I003 release history or call those commits a full first-use release. Recognize old numbered-iteration `RELEASE_COMPLETE / ProjectLifecycle ACTIVE` as `LEGACY_ITERATION_COMPLETE` *only as a prospective interpretation*; validate old hashes/approval before any current-state migration. HF adoption must include a **separate explicit owner-approved migration** of current I003 if needed, on an exact current head with append-only receipt and separate state-only control, and must not silently open I004 or clear G0. Keep previous post-release exceptions for legacy historical states; revise contract fixtures/tests, do not simply delete old checks.

## Scope of hotfix files (candidate patch, not yet edits)

- `docs/WORKFLOW.md` — new transition tables, release vocabulary, prep/review/pause/hotfix/migration and atomicity clauses.
- `chatgpt/PROJECT_INSTRUCTIONS.md` and **all four** role contracts — matching authority gates/exception, Clerk preflight, Builder review-only, Creative product-decision and Architect final control.
- `scripts/post_release_contract_fixture.py`, `tests/test_post_release_continuation.py` and any compatibility/enforcement tests — new state enum/transition fixtures, old historical release migration checks and adversarial race tests. These are **pure tests**, not witnessed GitHub enforcement.
- `.project/CURRENT_STATE.md` — **do not modify in this draft/review**. Potential migration only after hotfix adoption and distinct owner consent. No accepted `docs/PROJECT_ROADMAP.md` stage-order revision in HF-001.

## Required Builder review / falsifiable regression matrix

| ID | Case / expected outcome |
| --- | --- |
| HF01 | Completed ordinary iteration N → exact `ITERATION_COMPLETE`, not project `RELEASE_COMPLETE` |
| HF02 | Ready next accepted roadmap stage → Architect planning-only exclusive successor with no WP/Builder execution |
| HF03 | G0 blocked, M0 paused → no automatic activation; produces owner options/review-only path |
| HF04 | Material S0 roadmap proposal → valid Clerk preflight + independent Builder and Creative review before separate exact owner roadmap approval |
| HF05 | All milestones claimed complete but actual final integration/T4/user final approval missing → no project `RELEASE_COMPLETE` |
| HF06 | Owner-approved pause mid-Builder WP with dirty WIP → durable snapshot or explicit STOP; never pretend local WIP is saved |
| HF07 | Pause while exact plan/merge approval pending → do not treat approval as fresh after changes |
| HF08 | Resume exact unchanged branch/head/approvals → idempotent, scope-preserving return |
| HF09 | Resume after main/PR/plan/source/tool governance divergence → block or refresh affected reviews/owner consent |
| HF10 | Crash between snapshot, pause ledger and state commits → verify each recorded phase and never double-write |
| HF11 | Concurrent competing PAUSE/ref publication or two successive starts → compare-and-swap/absent-ref protection; no force/rebase |
| HF12 | I001–I003 historic legacy `RELEASE_COMPLETE` → not retroactively asserted project release |
| HF13 | Owner cancels project before completing roadmap → distinct `PROJECT_CLOSED_INCOMPLETE`, not `RELEASE_COMPLETE` |
| HF14 | No API/Item/bank/host/fee/roadmap changes by merely approving committee review, pause or iteration prep |
| HF15 | Builder/Clerk/Architect/Creative separation enforced; reviewer never self-approves policy |

**Current disposition:** DRAFT READY FOR OWNER INSPECTION **ONLY**. Independent Clerk/Builder review **NOT YET ROUTED**, not performed; no approved fix, no owner charter for the exceptional review transition, no main change, no new iteration, no app implementation. Existing I003 is still passive completed. Owner can approve or modify this proposed hotfix committee charter in a separate bounded step without prematurely approving code execution.

