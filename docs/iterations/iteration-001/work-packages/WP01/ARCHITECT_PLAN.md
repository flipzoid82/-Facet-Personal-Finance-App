# Facet — Iteration 001 WP01 Architect Plan

**Plan version:** WP01 v0.1.0 (FIRST REVIEW CANDIDATE; NOT REVIEWED, NOT APPROVED FOR EXECUTION)  
**Purpose:** WORK_PACKAGE_PLAN_REVIEW for a strictly documentary G0 Production-path feasibility screen.  
**Author/role:** I001 ARCHITECT; **phase:** PLANNING; **iteration:** 001; **WorkPackage:** WP01 (proposed first and only I001 WP).  
**Repository/control branch:** flipzoid82/-Facet-Personal-Finance-App / authoritative remote main; **source HEAD at authorship:** 68fb31bbe082b39dcccbd840a3f8f40550273413. This document does not contain its own Git blob/commit identity.  
**ImplementationAuthorized:** false. **Baseline:** none (no earlier numbered release).  
**Proposed future implementation destination:** `facet/i001-wp01-g0-docs`, a non-main branch **selected but not created**. Branch name/availability and current base must be reverified under later exact implementation preflight; no Builder implementation or correction on main. Independent Builder PLAN REVIEW is routed via main under Clerk, not this future technical branch.  
**Status:** PLAN FOR INDEPENDENT REVIEW ONLY. No G0 execution, production/host result, WP implementation, PR, merge, UAT, or release is authorized.

## 1. Exact governing identities and authorization

| Source | Exact identity and authority |
| --- | --- |
| Active I001 control | .project/CURRENT_STATE.md on main; PLANNING / ARCHITECT_PLANNING / I001 / ActiveRole ARCHITECT / WorkPackage none / NextRole none / ImplementationAuthorized false at plan-preparation HEAD |
| Exact Handoff | docs/iterations/iteration-001/ITERATION_CONTEXT.md; blob `71cf052f55d25abe2a25b6141146f6d7cbd7d8ab`; first containing commit `b081ed368070be5806bc382ac939e8e891c638a9` |
| Approved Discovery | docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md v1.0; blob `1cac418428e75a0db7a2551fd6e250dec878e473`; decision PROJECT_DISCOVERY / APR20261107T232700Z |
| Approved roadmap | docs/PROJECT_ROADMAP.md v0.1.1; blob `4e00d17702be6ad31b36d47491d777bc2032d77e`; decision PROJECT_ROADMAP / APR20261108T105904Z; independently reviewed PLAN READY **conditional** in review blob `2db66fa3d32b554f4bbfd246bb29f51d898ae937` |
| I001 entry | ITERATION_001_DIRECTION / APR20261108T110553Z, project-stage approvals ledger; I001 planning direction only |
| Iteration acceptance | docs/iterations/iteration-001/ITERATION_ACCEPTANCE.md, blob `686119e7de51ff496cc5719ec8afaba302ac303e`, first containing commit `0b57eebe65ec3b5480bac09d6d9391a15753ea5c`; I001-C01 through I001-C08 |
| User scope approval | I001-G0-SCOPE-20261108; I001 iteration approvals ledger, retaining all boundaries |
| User WP plan/review direction | I001-WP01-PLAN-REVIEW-DIRECTION-20261108; same iteration ledger, blob `2423e7d4f72dc42705ea360149031a64a70f2852`, containing commit `68fb31bbe082b39dcccbd840a3f8f40550273413`; explicit permission to PREPARE and ROUTE WP01 FOR REVIEW ONLY, no WP execution |

This plan's source authority is the actual approval ledger plus verified repository state, **not** a new user consent for documentary execution or provider/account access. Plan identity and content are subject to fresh independent Builder review; a PLAN READY verdict would still require distinct explicit user approval of the exact WP plan before any work is performed under BUILDER_IMPLEMENTATION.

## 2. Iteration objective, product boundaries and architecture decision

**I001 outcome:** one trustworthy G0 documentary feasibility dossier that permits an informed **PASS-TO-EXPLORE-M0**, **BLOCKED**, or **INDETERMINATE** decision under approved roadmap v0.1.1. It does not build a working app or prove a successful Plaid Production Item. The path order remains G0 → M0 → M1 → M2 → M3 → M4, with M0 and later stages NOT included in this WP or this I001 scope.

**User operating envelope:** single-user, real read-only Plaid ultimately required, desktop and phone browsers, owned Windows 11 Home Dell, home Wi-Fi first, no domain, no public financial site/port-forwarding, on-demand runtime (Dell may be off for more than seven days), preferred $0/month incremental recurring cost; no hidden privilege, certificate, device/storage changes, paid services or automatic updates. Existing PersonalFinanceApp Docker volume and T7 Shield files remain untouched. The product ultimately must show every available pending/unidentified source transaction and distinguish freshness, original source data and user adjustments, confirmed obligations and tentative discoveries. Expected future income's effect on projected month-end is UNDECIDED and outside WP01.

**Technical question:** Is there an evidence-supported *credible hypothesis*, inside existing owner constraints, for authorized future real read-only Plaid Production connectivity including initial Link AND OAuth update-mode repair from desktop and phone, institution/product support, entitlements and data state recovery? If key account-specific facts cannot be documented, conclude INDETERMINATE. If a known indispensable burden violates accepted constraints, conclude BLOCKED. Neither result silently changes the product.

**Source-only scope, NOT execution under this review authorization:** propose a future documentary research deliverable based on current public official documentation, public institution/provider statements, and **optional** voluntarily provided sanitized owner evidence. The current review phase may assess this plan but must not execute its research tasks, access Plaid Dashboard, request credentials, use any bank or Plaid API, create an Item or run host/device commands. No account numbers, secrets, screenshots containing PII, or private account terms should be committed.

## 3. Work decomposition and interfaces (one WP only)

| Task | Future Builder documentary task (after exact implementation approval) | Output / acceptance map coverage |
| --- | --- | --- |
| T1 — Source provenance | Establish dated official-source register: full URL, named Plaid product, statement/limitation, checked date, version or publication if known, scope, conflicts and applicable evidence tier. Identify any unverified community claim as NONAUTHORITATIVE. | Source registry in final WP01 dossier; I001-C01 and feeding every criterion |
| T2 — Trial, lifetime Items and cost | Compare user's previously reported Free Trial 0/20 Dashboard counter with current official published Trial terms (reported 10 lifetime Production Items), licensed products, required Products/Plan, item re-creation/upgrade billing/expiration and possible costs. Mark account-specific contract UNKNOWN without attributable evidence; never use or consume Items. | Account-vs-public allowance table, cost/license decision and unproven facts; I001-C02, C06 |
| T3 — OAuth initial and repair scenarios | Document independent initial and reauthorization/update-mode paths on Windows desktop browser and phone browser, OAuth institution redirects, Link popup/new-tab, registered/allowlisted redirect URI eligibility, LAN/private-CA versus public domain, update-mode error/return, user consent and required online callback dependencies. For each scenario identify sourced, conditional hypothesis or blocker. | Four-path minimum matrix (desktop initial/repair, phone initial/repair), no-domain conflict and stop decision; I001-C03, C06 |
| T4 — Institution, accounts and products | Document Navy Federal and U.S. Bank at minimum, checking/savings priority, actual Plaid Products and OAuth considerations; list credit card/loan/mortgage scope subject to genuine availability and per-field uncertainty; CIT initial priority explicitly conditional pending owner choice. Distinguish availability directory/incident notices from actual connected Items/fields. | Provider/product/account matrix, error/incident limits, no false guarantee; I001-C04 |
| T5 — On-demand completeness and retention | Produce the full roadmap R-03 matrix for initial history, transaction cursor, deleted/modified/pending→posted records, account additions/removals, balance age, Item status/consent/update mode, card/loan fields and non-Transactions webhook events after >7 days offline; name supported API/status/poll/reconciliation or clearly UNKNOWN/BLOCKED. Separate Transactions cursor backlog from freshness; identify future whole-update atomic pagination and mutation retry test obligations; document provider legal retention uncertainty. | Product/event recovery matrix and future test gates; I001-C05, C06 |
| T6 — Decision, alternatives and trace | Cross-check T1–T5 and every owner obligation. Produce one defensible provisional PASS-TO-EXPLORE-M0 / BLOCKED / INDETERMINATE decision with cited reasons, alternatives, tradeoffs, missing T4, open decision owner and next gate. Trace every I001 criterion and the unchanged Discovery P01–P13 future product obligations. | Final cited dossier, issue-to-owner/stop summary and trace; I001-C07, C08; integration prepared for Architect |

**Interfaces/dependencies:** T1 is provenance basis for T2–T5; T3 OAuth is prerequisite for any credible pass-to-explore; T2 cost and T4 institution coverage cannot be inferred from OAuth docs alone; T5 no-webhook state reconstruction must not inherit the Transactions-only conclusion. T6 integrates those tables. The sole I001 WP covers every I001-Cxx; there are NO cross-WP interfaces or orphaned criteria. Any later technical stage is not inside this decomposition.

## 4. Expected deliverables, evidence tiers and failure visibility

**Proposed Builder evidence path (not yet created):** `docs/iterations/iteration-001/work-packages/WP01/G0_PRODUCTION_PATH_SCREEN.md`, containing (a) source register, (b) Trial/account entitlement and cost uncertainty table, (c) 4-path OAuth+repair matrix, (d) institution/product/field matrix, (e) extended-offline recovery matrix, (f) explicit privacy/security/host obligations, (g) criterion trace, (h) decision and next-step/stop disposition. A conventional `BUILDER_IMPLEMENTATION_RETURN.md` would be produced separately only in a later authorized Builder delivery, with actual evidence/commit identities. Neither output currently exists.

**T1:** committed source register, official documentation checks and directly evidenced textual claims (no institution success inference). **T2:** separately approved Builder's attributable documentary methods/results and Git environment; no host command is needed for the documentary claims. **T3:** Architect independent evidence/oracle review, including contradiction tests, coverage and final integration assessment. **T4:** optional, attributable, sanitized user Dashboard/terms or later physically verified evidence; T1–T3 cannot impersonate T4. No direct login/screenshots collection, bank-specific Production test or physical proof is permitted by this plan/review authorization.

For every claim report **SUPPORTED / HYPOTHESIS / UNKNOWN / CONTRADICTED** with source and environment, AND report any material missing physical or account-specific proof separately as **BLOCKED/NOT TESTED** for the affected future stage. An INDETERMINATE finding meets the *honest reporting* goal but does not pass the external G0 entry dependency for M0. A documentary report shall never count as Product, OAuth, bank, Windows encryption, phone trust or offline recovery certification.

**Pass-to-explore rule:** All four initial/repair OAuth browser scenarios have a plausible documented route and no identified mandatory unaccepted recurring cost, domain/public endpoint or privileged device/network burden; mandatory institution/product constraints have no documented incompatible contradiction; material UNKNOWNs are explicitly disclosed and assigned future proof gates. **Account-specific Trial limits/terms remain UNKNOWN without attributable evidence; if those unknowns preclude a credible no-cost hypothesis, the disposition is INDETERMINATE instead of optimistic PASS.** A pass permits only discussion/planning of a *separately consented, independently reviewed* M0 synthetic feasibility approach, not its automatic launch.

**Stop rules:** documented mandatory recurring fee or unwillingly exposed/public service, registration of a redirect not possible with the user's operating model, unsupported essential read-only account type/product, documented irremediable >7-day data/state gap, a consent or privacy conflict, or lack of a plausible repair path -> BLOCKED or INDETERMINATE with a bounded alternative list. Never suggest fake/Sandbox/CSV substitution as a completed first-use release. If new costs, admin actions, sensitive evidence, or changed product meaning are required, Architect consults USER and/or CREATIVE; no Builder self-authorization.

## 5. Exact iteration acceptance trace and proof owner

| Stable ID | WP01 evidence task(s) | Documentary observable | Final verifier |
| --- | --- | --- | --- |
| I001-C01 | T1 | Complete attributable dated source register | ARCHITECT T3 |
| I001-C02 | T2 | Published-vs-account Trial, Products and $0 cost comparison, explicit UNKNOWN | ARCHITECT T3 |
| I001-C03 | T3 | Initial/repair desktop+phone OAuth matrix, redirection and update mode limits | ARCHITECT T3 |
| I001-C04 | T4 | Navy Federal and U.S. Bank scope/Products; CIT conditional; missing fields | ARCHITECT T3 |
| I001-C05 | T5 | >7 days offline, transactions and independent non-Transactions status/recovery matrix | ARCHITECT T3 |
| I001-C06 | T2–T5 | Privacy, no-domain/no-cost, Home encryption and future host consent stop gates | ARCHITECT T3 |
| I001-C07 | T6 | Exactly one evidence-based G0 disposition plus consequences | ARCHITECT T3 |
| I001-C08 | T6 | Integration cross-check C01–C07 and Discovery P01–P13 non-regression | **Facet I001 ARCHITECT** T3 |

**Named final integration verification owner:** Facet Iteration 001 ARCHITECT. Proposed Builder documents evidence and internal linkage; Architect independently confirms cross-criterion sufficiency and the final G0 verdict. Later actual audited/merged WP and iteration exit proof must be recorded in the ONE existing `uat/UAT_ASSESSMENT_XXX.md` matrix, with current exact Git identities. UAT choice remains USER-owned; SKIP UAT does not waive required evidence.

## 6. Independent Builder plan-review questions and required verdict

After Clerk clears this exact version and Builder receives an independently observed start HEAD, **Builder reviews the plan only**, not performs T1–T6. Deliver `docs/iterations/iteration-001/work-packages/WP01/BUILDER_PLAN_REVIEW.md` with one **PLAN READY** or **PLAN CHANGES REQUIRED** verdict and numbered material findings, under the ordinary Clerk completion-intake route. In addition to WP01 itself, challenge the *entire I001 one-WP decomposition*:

1. Is the documentary-only G0 decision a realistically bounded first I001 outcome and does WP01 cover I001-C01–C08 without cross-interface gaps?
2. Are T1–T6, evidence paths/tier attributions, normal git identities, independent integration owner and unknown-vs-pass-to-explore distinctions precise, testable and resource-realistic?
3. Does the plan independently challenge the no-domain desktop/phone initial *and* update-mode OAuth repair issue, not infer success from browser popup guidance?
4. Does it handle Free Trial 0/20 versus published 10 lifetime allowance, lifetime consumption, plan Products, billing, bank-specific coverage, CIT conditional status and U.S. Bank incident uncertainty without invented proof?
5. Does the R-03 matrix cover independent accounts, balances, consent, errors, loans/card fields and >7-day non-Transactions events rather than just /transactions/sync? Does the future whole-update cursor transactionality requirement remain clear?
6. Does R-02 remain a later physical protection gate on Windows 11 Home actual C:/D:/WSL volumes, keys and complete synthetic restore, not an alleged G0 outcome?
7. Are any new material cost, public hosting, root trust, license, account/credential, security or user obligations silently imposed? Have unchanged Discovery v1.0 requirements been preserved?
8. Is non-main future technical branch selection compatible with the exact plan, and does the proposed work avoid host/provider access and implementation on main?
9. If source gaps persist, can the dossier honestly exit INDETERMINATE/BLOCKED with a lawful next choice, without iterative no-delta research or unapproved owner actions?

Builder reviews official public docs if necessary to judge plan soundness **without performing the future WP research deliverable as work**. The independent review must distinguish insufficiency of a plan from unresolved external feasibility that the plan correctly proposes to investigate. A PLAN READY verdict is NOT G0 clearance or permission to execute T1–T6.

## 7. Governance and stop boundaries

**Current authorization:** User explicitly authorized WP01 **plan preparation + independent review routing ONLY**. Active I001 ARCHITECT may create this plan and identity-bound handoff, then separately route `CLERK_PLAN_REVIEW_PREFLIGHT`. Clerk owns deterministic clearance and separate active `BUILDER_PLAN_REVIEW` release. Architect may evaluate any returned verdict only after lawful Clerk return/activation. No Clerk or Builder may interpret the user's plan-preparation consent as user implementation approval.

**Future action after a genuinely current PLAN READY:** Architect gives the concise exact-plan approval report, enters passive `AWAITING_IMPLEMENTATION_APPROVAL`, and obtains a **distinct** owner approval of the exact plan/version/branch before `CLERK_IMPLEMENTATION_PREFLIGHT`. Only then could Builder execute source-only G0 investigation, on its authorized non-main branch, subject to any separate evidence/host/provider consents. The full original merge, UAT decision, release completion and reconciliation gates still apply.

**Explicitly excluded now:** actual G0 investigation execution as a WP; all host/Dell/phone commands, installation, admin privileges, CA/HTTPS trust, firewall/DNS/network changes, Docker/WSL/image/volume mutation, old PersonalFinanceApp/T7 data, purchases, paid services, Plaid Dashboard/account credentials, Sandbox or Production Items, real bank connection, API transactions, source coding, PR/merge, UAT, deployment, release. Keep all unresolved Production compatibility, Trial, offline recovery, retention, Windows Home encryption and income-projection semantics honestly UNKNOWN/BLOCKED.

**Proposed review route:** ARCHITECT plan artifact -> separate ARCHITECT_TO_BUILDER.md handoff (binds existing plan+acceptance+approval identities) -> separate state-only `CLERK_PLAN_REVIEW_PREFLIGHT` -> independent Clerk clearance -> distinct state-only `BUILDER_PLAN_REVIEW` -> pushed review -> Clerk completion -> Architect technical judgment and later user gate.
