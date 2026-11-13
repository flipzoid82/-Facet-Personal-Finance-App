# Facet — Iteration 004 User UAT Decision 001

**Decision identity:** `I004-UAT-DECISION-001-20261113`.
**Normalized decision:** **PERFORM UAT** for **Iteration 004** S1 synthetic application only.
**Date:** 2026-11-13 (America/Los_Angeles); no exact owner-message clock time inferred.
**Role recording choice:** ARCHITECT under verified `UAT / AWAITING_UAT_DECISION` on main.

## Explicit owner decision and limits

**Owner's exact wording:** "I explicitly choose PERFORM UAT for Facet Iteration 004. Record the UAT decision and prepare the numbered UAT checklist. Do not make changes to my personal computer without separate approval."

The choice follows Architect's UAT APPLICABLE recommendation and is an explicit decision to attempt owner acceptance observations, **not** an assertion that any test has run, that UAT passed, or that the owner can currently access a running Facet instance. It **does not authorize** changes to the owner's personal Windows machine, browser/installations, drives, phone, backup, network, network exposure, credentials, or financial information. No controlled accessible runtime or owner-host consent is established by this message.

## Exact governing source and proof

- **Authoritative intake:** `refs/heads/main` at `e71bf152bc5900fd6f5d05fcdb7e1e8a3b582d9c`, state `UAT / AWAITING_UAT_DECISION / I004 / WorkPackage none / ActiveRole none / NextRole ARCHITECT / ApprovalRequiredFrom USER / ImplementationAuthorized false`, state blob `086fa82f45adbcc523ee84c3f19e2ebd4a081364`.
- **Assessment:** `docs/iterations/iteration-004/uat/UAT_ASSESSMENT_001.md` blob `43ea3dc93db99c3b0b7f666cef95b57440431e68`, first containing `7bb4b3dfeceacab0283c8e6d567e5fa57d3a1d8e`; all I004-C01–C08 SATISFIED at synthetic T1/Builder T2/Architect T3, no host T4 inference.
- **Substantive candidate:** `f286934e286d965e3068548b10e9ee43070313b5`, actual merged PR #18 incorporating previously merged PR #16. A subsequent `main` reconciliation `4404819f75dbf11a8975fb5b519be0a31aa7e835`, assessment commit `7bb4b3dfeceacab0283c8e6d567e5fa57d3a1d8e`, and intake state `e71bf152bc5900fd6f5d05fcdb7e1e8a3b582d9c` were control/assessment-only. No source, tests, accepted meaning or Builder evidence changed after the candidate.
- **Acceptance map:** `docs/iterations/iteration-004/ITERATION_ACCEPTANCE.md` v0.1.0 blob `9abf75c97617b2963588e90b01ac981885fb59c7`. Independent WP01 and WP02 audits PASS; WP01 PR #16 merge `fc881096ba13020780882fb1df2915357738c68b`, WP02 PR #18 merge `f286934e286d965e3068548b10e9ee43070313b5`.
- **Installed UAT workflow:** `docs/WORKFLOW.md` blob `57fd360379b06ab7625cc14fe17e90ef0ee1d176`. The decision is a numbered UAT artifact and is not appended to the implementation/release approvals ledger.

## Execution and report boundary

Architect will write `UAT_CHECKLIST_001.md` with numbered user-facing actions and expected observations for the new synthetic app and focused regression. **Execution prerequisite:** actual owner-accessible, permitted *controlled* Facet runtime, separately provided/authorized without installing or altering owner host resources. If no suitable accessible runtime exists, mark UAT **EXECUTION BLOCKED — ACCESS/PERMISSION PREREQUISITE**, preserve this PERFORM choice and checklist, and do not invent a test or silently switch it to SKIP.

When the owner can lawfully observe the app, invite item-numbered descriptions of success, confusion, failure or unexpected behavior; owner assigns no severity. After receiving actual observations, Architect creates `UAT_REPORT_001.md` and separately triages any findings. PERFORM UAT choice alone grants no coding/correction, real Plaid/bank access, purchases, merge, later WP, or release-completion approval. Any confirmed post-merge defect requires a separately reviewed, owner-approved corrective Work Package. Subsequent release requires its own explicit exact-candidate user approval and normal Architect → Creative → Architect reconciliation.
