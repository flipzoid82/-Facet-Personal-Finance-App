# Creative → Architect — Approved Project Discovery Handoff

**Handoff type:** `PROJECT_DISCOVERY_APPROVED_TO_ARCHITECT_PROJECT_PLANNING`  
**Producer:** CREATIVE  
**Destination role:** ARCHITECT  
**Destination action:** Validate the exact approved Discovery scope and enter `ARCHITECT_PROJECT_PLANNING` from the passive `READY_FOR_ARCHITECT_PROJECT_PLANNING` state, then work with the user on a candidate, feasible, evidence-bound project roadmap.  
**Project phase:** Project planning before Iteration 001  
**Authoritative repository:** `flipzoid82/-Facet-Personal-Finance-App`  
**Authoritative branch/ref:** `main`  
**Baseline:** none (initial root project; do not invent a previous baseline)  
**Iteration / WorkPackage:** none / none  
**ImplementationAuthorized:** false

## Exact authoritative product and approval identities

1. **Approved Discovery checkpoint**
   - Path: `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md`
   - Version: `1.0`
   - ArtifactBlob: `1cac418428e75a0db7a2551fd6e250dec878e473`
   - ArtifactContainingCommit: `d3c73a734cd4d0d108fb0449324ac089fda1066e`
2. **User approval record**
   - Path: `docs/project-planning/APPROVALS.md`
   - Approval type: `PROJECT_DISCOVERY`
   - Approval identity: `APR20261107T232700Z`
   - User wording: "I approve Discovery v1.0"
   - Recorded UTC: `2026-11-07T23:27:00Z`
   - ArtifactBlob: `6f241148236a0d7d9aade264d324ee183b60b2d2`
   - ArtifactContainingCommit: `beb41ad6db0004df0695badece2fe7461322f7ca`
3. **Living approved product reference (derived, not an independent approval)**
   - Path: `docs/PRODUCT.md`
   - ArtifactBlob: `f523c4127211041d48e2d2f71672b446d86c12e3`
   - ArtifactContainingCommit: `03fdfea9df5fda835c5455a1b5cec15db868a013`

The controlling workflow and role contracts remain `.project/CURRENT_STATE.md`, `docs/WORKFLOW.md`, and `chatgpt/roles/ARCHITECT.md`. The project's `docs/PROJECT_BRIEF.md` is immutable bootstrap history rather than approved truth.

## Product direction inherited from the approved checkpoint

The user approved a first useful release direction for a **read-only**, **Plaid-connected**, **browser-based** personal finance experience usable on desktop and phone, for one user managing their household's finances. Core outcomes include a unified dashboard; checking/savings/credit-card/mortgage/loan account views to the extent technically supported; consolidated and per-account source transactions including pending/unidentified entries; recurring income and bill discovery with user confirmation; a quiet discovery inbox; a separate bill calendar; explainable potentially overdue statuses; user-correctable interpretations; data freshness/completeness visibility; and distinctly labeled current-after-obligations versus projected month-end figures with explained surplus.

Unconfirmed **future** bill inferences must not enter main forecasts before user acceptance. Recorded source transactions remain visible. Budgeting, investments, long-term projections, multi-user operation, native apps, money movement, and sophisticated advice are not required in the first useful release. Basic informational surplus suggestions are optional and must not silently expand required scope.

**Read the full v1.0 checkpoint for all wording and boundaries; this summary does not override it.**

## Architect planning questions and constraints

The user has not yet authorized or confirmed:
- Plaid institution and account-field coverage, eligibility and service/provider cost.
- Actual machine/OS edition, deployment and testing environment, runtime resources, licensing, or maintenance commitments.
- Authentication, financial-data storage/retention, network/offline expectations, privacy and security preferences, service privileges, and any bank-linking/credential interactions.
- Exact calculation rules for cash available after obligations and month-end projected cash flow, including internal transfers, credit-card payment double-counting, posted vs pending activity, timing, and missing data.
- Technical feasibility of irregular bill recognition and overdue detection.

Architect must consult the user before consequential options or obligations, attribute confirmed facts and UNKNOWNs in the versioned roadmap, and independently obtain the required Builder roadmap review through the authorized Clerk route. Product scope changes and unresolved product meaning return to Creative. Do not infer cost consent, real-host access, universal data coverage, implementation readiness, or acceptance of optional surplus guidance.

## Route and nonauthorizations

**Legal receiving state after separate routing commit:** `READY_FOR_ARCHITECT_PROJECT_PLANNING`, passive `ActiveRole: none`, `NextRole: ARCHITECT`, `Handoff: docs/project-planning/CREATIVE_TO_ARCHITECT.md`, `ApprovalRequiredFrom: none`, `ImplementationAuthorized: false`, `Iteration: none`, `WorkPackage: none`.

Architect should independently resolve the authoritative remote `main` head, validate this exact handoff's blob/containing commit and the approval/checkpoint identities against the current state and ledger, then perform the documented planning entry. This handoff grants no implementation, paid services, financial connections, experiment, Builder activity, roadmap approval, or Iteration 001 direction.
