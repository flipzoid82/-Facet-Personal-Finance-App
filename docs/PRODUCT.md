# Facet — Current Approved Product

**Product:** [Facet] Personal Finance App  
**Status:** Approved Discovery v1.0 product scope and conditional roadmap v0.1.1; Iteration 001 documentary-only and Iteration 002 synthetic-proof-only release completion approved. Historical I001 G0 **INDETERMINATE**; real-world G0 and M0 **NOT CLEARED**. No live Plaid-backed application or Production feasibility approval.  
**Approved checkpoint:** `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md`, version `1.0`  
**Checkpoint blob:** `1cac418428e75a0db7a2551fd6e250dec878e473`  
**Checkpoint containing commit:** `d3c73a734cd4d0d108fb0449324ac089fda1066e`  
**Approval ledger:** `docs/project-planning/APPROVALS.md`, `APR20261107T232700Z`  
**Approval ledger blob:** `6f241148236a0d7d9aade264d324ee183b60b2d2`  
**Approval ledger containing commit:** `beb41ad6db0004df0695badece2fe7461322f7ca`  
**Last updated:** 2026-11-09 (release status reconciliation only)

> This document restates already-approved Discovery meaning for current product reference. It does not add requirements, authorize implementation, choose architecture, or supersede the exact approved checkpoint. If anything here is ambiguous, use the exact approved checkpoint and user approval record as the controlling product source.

## Purpose and audience

Facet gives a single user managing household finances a unified, comprehensible view of real connected financial information. It should help answer how much income arrived, what bills and other expenses exist, which obligations are upcoming or potentially overdue, what money may remain after obligations, and how projected month-end cash flow differs from current financial position.

The initial user needs access from desktop and phone **through a browser**, using **real Plaid-linked account information**. Relevant account types include checking, savings, credit cards, mortgages, and loans, subject to actual verified institution/data coverage. Multi-user account access is not required initially.

## First useful release — approved product outcomes

- Link supported financial accounts through Plaid for **read-only** financial views.
- Present a unified dashboard of connected accounts, income received, recognized bills, non-bill spending, and explained estimates of money remaining.
- Show **currently available after remaining obligations** separately from **projected month-end cash flow**, with transparent assumptions and limitations.
- Offer individual account detail and consolidated cross-account transaction views.
- Preserve visible source activity, including pending, uncategorized, or unidentified transactions returned by a connected source; categorization must not suppress transaction visibility.
- Infer likely recurring income, recurring bills, and recognizable irregular obligations, subject to user confirmation before becoming accepted income/bill patterns.
- Present an initial discovery review and a quiet inbox for new or materially changed patterns, avoiding repetitive confirmation for unchanged information.
- Offer a dedicated upcoming-bills calendar and explainable **potentially overdue** signals, with clear uncertainty and correction options.
- Let users easily inspect source data and correct user-adjustable interpretations without silently modifying bank-supplied source facts.
- Show source freshness; flag disconnected/stale accounts and materially incomplete financial summaries.
- Explain an estimated surplus. Recommendations or automatic allocation of money are not a required outcome.

**Confirmed forecast boundary:** A future bill inferred but not yet confirmed by the user is excluded from main bill totals and projections until confirmed. This does not hide any already-recorded transaction.

**Read-only boundary:** The first release does not transfer money, pay bills, trade, or otherwise change external financial accounts.

## Explicit first-release deferrals

Detailed budgeting, investment tracking, long-term modeling beyond the basic month-end financial picture, multi-user/multi-household features, native desktop/mobile applications, money movement and bill payment, and sophisticated personalized advice are not required for the first useful release. Simple informational surplus suggestions can be investigated only as an optional low-complexity idea and may not become a required feature without the appropriate additional user direction.

## Unresolved matters to take into Architect planning

The approved checkpoint intentionally leaves Plaid institution and field availability, service enrollment/cost, deployment and test environment, privacy/security expectations, calculation/reconciliation details, discovery heuristics, data timeliness, and precise interaction design to later planning and user consultation. Missing evidence must not be silently filled by assumptions or paid/privileged commitments. Infeasible material product outcomes require user-facing tradeoffs through the authorized role path.

**Workflow status (2026-11-08):** Discovery v1.0 and conditional roadmap v0.1.1 approved. Iteration 001 WP01's G0 documentary feasibility dossier was audited (documentary PASS), merged through PR #1, assessed with I001-C01–C08 documentary criteria satisfied, and the user elected SKIP UAT and approved documentary release completion. **G0 remains INDETERMINATE; M0 PASS-TO-EXPLORE is NOT CLEARED.** This is not a working app, demonstrated real-bank connection, or approval for new code, Plaid Items, host actions, costs, or successor stages. See `docs/iterations/iteration-001/reconciliation/ARCHITECT_RELEASE_RECONCILIATION.md` and `docs/iterations/iteration-001/approvals/APPROVALS.md`. Final `RELEASE_COMPLETE` remains subject to Architect closeout.

**Workflow status (2026-11-09, Iteration 002):** The owner separately approved release completion for the bounded synthetic G0 prerequisite-resolution proof following audited **synthetic-only PASS**, exact-head PR #6 merge (`73f32c94985cb83788a90dbf321d4ddd9a9eea34`), I002-C01–C07 synthetic/reporting criteria SATISFIED, and an explicit **SKIP UAT** decision. This confirms only the isolated fake-data model and its documented evidence; it does **not** validate an actual Plaid Production integration, browser/phone OAuth repair, institution/field coverage, more-than-seven-day provider catch-up, host security/backup, Trial economics or real financial data. **Historical I001 G0 remains INDETERMINATE; actual G0 Production feasibility remains NOT CLEARED; M0 remains NOT CLEARED / PAUSED.** No new product requirements, implementation, resource consent, or successor-stage authority are created. See `docs/iterations/iteration-002/reconciliation/ARCHITECT_RELEASE_RECONCILIATION.md` and `docs/iterations/iteration-002/approvals/APPROVALS.md`. Final I002 `RELEASE_COMPLETE` still requires independent Architect closeout.
