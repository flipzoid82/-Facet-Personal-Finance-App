# Facet — Iteration 001 Approval and Direction Record

This iteration-local record preserves actual user decisions from the active I001 Architect planning conversation. Entries are decision evidence, not invented technical proof or additional approval gates. The separate project-stage Discovery, roadmap, and I001 activation approvals remain in `docs/project-planning/APPROVALS.md`; they are not duplicated here.

## I001-G0-SCOPE-20261108 — G0-only iteration scope

- **Decision type:** `ITERATION_SCOPE`.
- **Decision:** APPROVED — Iteration 001 is limited to the **G0, documentary-only Plaid Production-path feasibility screen**. M0 host/runtime development and M1–M4 remain later, separately governed milestones.
- **User wording:** "Yes, I approve the G0-only scope for Iteration 001."
- **Source:** User's explicit reply in this fresh Facet Iteration 001 ARCHITECT conversation, in response to the Architect's question "Do you approve the G0-only scope for Iteration 001?"
- **Date of decision:** 2026-11-08. An exact UTC time was not independently established; do not infer one from this identifier.
- **Approval identity:** `I001-G0-SCOPE-20261108`.
- **Approval subject:** Bounded *iteration objective* and the intent to keep M0/out-of-iteration work separate. This does **not** approve individual I001-Cxx criteria as already met, an exact WP plan, its execution, or a Production feasibility claim.
- **Referenced acceptance map:** `docs/iterations/iteration-001/ITERATION_ACCEPTANCE.md`, Git blob `686119e7de51ff496cc5719ec8afaba302ac303e`, first containing commit `0b57eebe65ec3b5480bac09d6d9391a15753ea5c`, IDs `I001-C01`–`I001-C08`; one *proposed*, not yet opened, documentary `WP01`, with final integration verification owner **Facet Iteration 001 ARCHITECT**.
- **Planning authority:** `.project/CURRENT_STATE.md` remains `PLANNING / ARCHITECT_PLANNING / Iteration 001 / ActiveRole ARCHITECT / WorkPackage none / Branch main / NextRole none / ImplementationAuthorized false`; exact controlling handoff `docs/iterations/iteration-001/ITERATION_CONTEXT.md`, blob `71cf052f55d25abe2a25b6141146f6d7cbd7d8ab`.
- **Approved roadmap:** `docs/PROJECT_ROADMAP.md` v0.1.1, blob `4e00d17702be6ad31b36d47491d777bc2032d77e`, reviewed `PLAN READY` conditionally (Builder review blob `2db66fa3d32b554f4bbfd246bb29f51d898ae937`), roadmap approval `PROJECT_ROADMAP / APR20261108T105904Z`. Approved Discovery v1.0 remains intact.
- **Permitted by this scope decision:** Keep the G0-only acceptance and planning objective and, upon later separately explicit direction to prepare a WP, scope an identity-bound documentary plan for independent review through Clerk. The decision alone does not open, route, review, approve execution of, or begin any WorkPackage.
- **Material uncertainties preserved:** Production desktop/phone OAuth and update-mode repair without owned domain; Navy Federal/U.S. Bank/product/account coverage (CIT initial priority unresolved); Plaid Trial `0/20` versus published lifetime limits, entitlements and cost; non-Transactions completeness after >7 days offline; Windows 11 Home live-data encryption, secure key/backup recovery; anticipated future income in month-end projections remains undecided.
- **Not authorized:** Any WP creation or start based solely on this scope decision; Builder execution, implementation, device/host/phone operations, privileged commands, installations, purchases or paid services, certificate/network changes, Docker/WSL or old PersonalFinanceApp/T7 content changes, credentials, Dashboard access, Plaid Sandbox/Production Items, bank connections, real financial data, source/test changes, PR/merge, UAT, or release. The later ordinary exact plan review/implementation approval and separate informed owner consents remain mandatory.
- **Supersession:** None.

## I001-WP01-PLAN-REVIEW-DIRECTION-20261108 — Prepare WP01 for independent plan review only

- **Decision type:** `WORK_PACKAGE_PLAN_REVIEW_DIRECTION`.
- **Decision:** APPROVED — ARCHITECT may author exact `WP01` G0-only documentary WorkPackage plan and an identity-bound Architect-to-Builder review handoff, then separately route through `CLERK_PLAN_REVIEW_PREFLIGHT` for an **independent BUILDER_PLAN_REVIEW only**.
- **User wording:** "Yes, you are authorized."
- **Directly answering this specific question:** "Do you separately authorize me to **prepare WP01 and submit it for independent plan review only**, with no implementation or other changes to your devices, accounts, or services?"
- **Source / date:** Explicit owner instruction in the active Iteration 001 ARCHITECT conversation on 2026-11-08; exact UTC time not independently established.
- **Decision identity:** `I001-WP01-PLAN-REVIEW-DIRECTION-20261108`; not a substitute for later plan-specific implementation approval.
- **Repository authority at decision intake:** `flipzoid82/-Facet-Personal-Finance-App` authoritative `main` at `80e306ec8aa40bcb1d0d16bf5c876185ffc0c046`; `PLANNING / ARCHITECT_PLANNING / Iteration 001 / ActiveRole ARCHITECT / WorkPackage none / ImplementationAuthorized false`.
- **Bound scope:** Approved `I001-G0-SCOPE-20261108`, with `docs/iterations/iteration-001/ITERATION_ACCEPTANCE.md` blob `686119e7de51ff496cc5719ec8afaba302ac303e`, first containing commit `0b57eebe65ec3b5480bac09d6d9391a15753ea5c`, I001-C01 through I001-C08; `docs/PROJECT_ROADMAP.md` approved conditional v0.1.1, blob `4e00d17702be6ad31b36d47491d777bc2032d77e`. G0 is a documentary screen; neither its passage nor future M0 is preapproved.
- **Permitted next actions:** Architect plan/handoff authorship and a separate control-only routing commit to CLERK. Clerk may perform only deterministic preflight and independently activate Builder **PLAN REVIEW** under its own verified state and existing workflow. A Builder PLAN READY verdict does not itself approve execution.
- **Not authorized:** Builder implementation or execution of G0 research under a WP, source/test changes, code or host commands/tests, Plaid or bank access (including Dashboard login, Sandbox or Production Items), credentials, phone/Windows/certificate/firewall/WSL/Docker changes, purchases, paid services, PR/merge, UAT, release, or bypassing any later informed owner gate. Any new product/cost/privilege/privacy obligation must return to the correct decision owner.
- **Supersession:** None. The separate G0-only iteration scope decision and project-stage approvals remain unchanged.
