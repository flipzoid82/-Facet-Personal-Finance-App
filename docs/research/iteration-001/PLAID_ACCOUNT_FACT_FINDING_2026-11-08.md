# Plaid developer account fact-finding — owner-supplied evidence, 2026-11-08

**Archive provenance:** Transcribed from completed [GitHub Issue #2](https://github.com/flipzoid82/-Facet-Personal-Finance-App/issues/2), which records the owner's independently run general Codex investigation (Plaid Dashboard, developer MCP, Bill automated assistant). This is source-attributed research, not first-party Architect access to private account settings. Facts and unknowns remain as reported. **No implementation/Production Item/paid plan or stage clearance follows from this receipt.**

**Adopted owner priority:** Investigate read-only / synthetic feasibility work without first determining what Dashboard `0/20` counts; defer that uncertainty until material for real Production use. Historic I001 G0 remains INDETERMINATE; M0 stays NOT CLEARED. This report is independent of the reusable post-release governance amendment being proposed in this PR.

**Exact source link:** https://github.com/flipzoid82/-Facet-Personal-Finance-App/issues/2

---

# Plaid developer-account fact-finding — post-I001 evidence archive

**Kind:** Owner-supplied independent research; preserved as a GitHub Issue so the completed release branch and its lifecycle controls do not have to be modified. **Not** a Work Package, active iteration, roadmap amendment, implementation approval, or technical PASS finding.

**Collected:** 2026-11-08 (America/Los_Angeles), through general Codex read-only authenticated Plaid Dashboard/MCP investigation and four rounds of automated Plaid support assistant Bill. **Provenance:** User provided summarized results in the Facet project discussion; this issue is a record of that testimony, not Architect direct authentication or verification of Plaid's contract/ledger. No secrets or bank data included.

## Account-specific observations from owner-supplied Codex results

| Topic | What was observed | Limits |
| --- | --- | --- |
| Account plan | [Overview](https://dashboard.plaid.com/overview) displayed **Free trial**. | Formal legal plan subclass, trial expiry and permitted ongoing use **UNKNOWN**. |
| Dashboard counter | Overview displayed **`0/20`**, without a unit. | **Do not equate 20 with Items**. Actual lifetime/concurrent Item cap, consumed/remaining, reset policy **UNKNOWN**. |
| Full Production | [Usage](https://dashboard.plaid.com/activity/usage) said **Full Production required**; [Billing](https://dashboard.plaid.com/settings/team/billing) gated until Production. | Developer MCP `production` environment entitlement is *configuration-level*, not proof of Full Production enrollment or successful API calls. |
| Onboarding | [Onboarding tasks](https://dashboard.plaid.com/onboarding-tasks) included **Pay-as-you-go** selected in a **not submitted**, incomplete application. | Not an active subscription or authorization to submit/upgrade. |
| Products | [Products](https://dashboard.plaid.com/settings/team/products) marked **Trial** for Assets, Auth, Balance, Identity, Identity Match, Investments, Investments Refresh, Liabilities, Statements, Transactions, Recurring Transactions, Transactions Refresh. | Actual institution/account-field coverage **unverified**. Enrich was mentioned in an unsubmitted request, not enabled list. |
| Cost and usage | [Plans](https://dashboard.plaid.com/settings/team/plans) produced access-denied/invalid-country error; Billing showed **no invoices in displayed 2026 history**, Usage inaccessible. | No invoices is not proof of zero accrued charges. Contract prices, consumption, billing triggers, allowed ongoing $0/month use **UNKNOWN**. |
| OAuth institutions | [OAuth institutions](https://dashboard.plaid.com/activity/status/oauth-institutions) said trial OAuth bank access is automatic. | Not proof of Navy Federal or U.S. Bank real-account connection/fields or browser update-mode repair. |

### Plaid developer MCP evidence

- Installed in general Codex at `https://mcp.plaid.com/mcp`; OAuth developer login succeeded per Codex.
- Advertised six tools: `dashboard_list_clients`, `dashboard_get_state`, `build_guidance`, `build_workflow`, `build_check_acceptance`, `build_feedback`. Only the two `dashboard_*` tools were called.
- MCP reported a developer client authorized for `production` and `sandbox` environment configuration in US and Canada with the enumerated core Production product entitlements, plus extra Sandbox products.
- MCP did **not** expose actual plan, Item counter/limits, contract rates or billed usage. A configured Production environment is compatible with restricted Trial access; it is not proof of Full Production.

### Bill automated support dialogue

User reported four query/follow-up rounds at [Plaid Dashboard Support](https://dashboard.plaid.com/support/new):
1. **Plan, counter, Item limits, expiration:** Bill could not establish account-specific contract, `0/20` meaning, true allowance or trial expiration; gave general Trial rules.
2. **Pricing, invoices, upgrades:** Bill could not establish account-specific price/ledger or upgrade effects. General docs describe subscriptions potentially starting on upgrade.
3. **Browser OAuth:** Bill said ordinary desktop and mobile-browser initial OAuth might use popup/new-tab without a redirect URI; embedded webviews differ. No institution-specific confirmation.
4. **OAuth update mode and escalation:** Bill could not reconcile ordinary redirectless browser guidance with update-mode redirect URI instructions or confirm Trial-team support-case access. A potential Sandbox comparison was suggested but **not executed**; `Create case` was disabled while Full Production gated.

Public references — **not account-specific contract proof**: [Plaid billing](https://plaid.com/docs/account/billing/), [OAuth guide](https://plaid.com/docs/link/oauth/), [update mode](https://plaid.com/docs/link/update-mode/), [OAuth institutions](https://support.plaid.com/hc/en-us/articles/15687521555607-What-OAuth-institutions-does-Plaid-support).

## Mapping to existing G0 documentary acceptance IDs

- **I001-C01:** New owner-supplied authenticated-source summaries and exact page references, with provenance limitations.
- **I001-C02:** Account has reported Free Trial and Trial product access; actual Item allowance, post-trial terms, long-term $0/month **UNKNOWN**.
- **I001-C03:** Initial desktop/Android browser OAuth **plausible**; update-mode/consent repair on domainless private LAN **UNVERIFIED**.
- **I001-C04:** Trial OAuth institutions generally accessible; actual Navy Federal/U.S. Bank account/field coverage **UNVERIFIED**.
- **I001-C05:** No new >7-day-offline catch-up/consent/non-Transactions proof.
- **I001-C06:** No user device/network/privilege changes, Production Items or payments were made.
- **I001-C07:** Historical G0 finding **INDETERMINATE**; M0 precondition **NOT CLEARED**, regardless of these useful new facts.
- **I001-C08:** Approved Discovery/product scope unchanged.

## Explicit owner prioritization and intended next action

After reviewing these findings, the owner said:

> "I don't think we need to find out what the 0/20 represents. From what I've read from your's and codex's findings, we should have enough info to get started. We'll cross that bridge later if encounter it then."

Owner then said:

> "Go ahead. Make sure you record what we just did here (our little fact-finding exercise) somewhere in the repo so we can refer to it later if we need to."

Interpretation: **Defer** `0/20` policy investigation until materially necessary, and explore a narrowly scoped synthetic-data / Plaid Sandbox feasibility proposal. This is a prioritization decision, **not** a statement of what `0/20` means, permanent $0 terms, an approval to consume Items or connect banks, or consent to host/admin/security changes or M0 implementation.

### Future evidence to seek without repeating the same research

- Define separate initial and update-mode desktop/Android browser OAuth hypotheses; specify smallest safe synthetic or approved Sandbox falsification test, without assuming live bank support.
- Define >7-day offline recovery and missing non-Transactions events, cursor, consent/status, account-state, error, reconnection, stale/UNKNOWN, idempotency and restoration test matrix.
- Continue keeping bank credentials, Production Items, paid onboarding, host installation, network/certificate changes and actual engineering implementation behind specific later approvals.
- Revisit plan/Item limits **if and when** live Production use/upgrade/billing makes them material.

## Governance and release boundary

- Facet I001 approved and independently released as **documentary-only G0**. Exact substantive PR #1 merged candidate: `40250b407f74952252ee3d5e5c0bbadd33047a2e`; formal RELEASE_COMPLETE state commit `3cb928e2dbc7dd93df467ea5fe8e8eb8594f0962`.
- G0 **INDETERMINATE**, roadmap G0→M0 **NOT CLEARED**; no successor, Work Package, Production access, or implementation authorized.
- GitHub `main` was later manually edited solely to set `ActiveRole: ARCHITECT` (commit `f61b0d139e834d1f7af34c1768be8a90770a621c`), while still `RELEASE_COMPLETE / Handoff none / NextRole none`. This creates a state-model conflict, **not** a normal role activation. It has not been changed by this research archive.
- **This GitHub Issue is an owner-requested, non-code research reference, not a replacement for a future governed `docs/research/` receipt or a workflow transition.** A permanent workflow fix should permit bounded post-release research intake without reopening an approved iteration, spoofing `ActiveRole`, or granting implementation authority.

