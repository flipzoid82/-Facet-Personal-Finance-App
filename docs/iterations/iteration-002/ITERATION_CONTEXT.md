# Facet — Iteration 002 Prerequisite-Resolution Planning Context

**Status:** Architect planning artifact; NOT a Work Package implementation plan, released evidence, M0 activation, approval of any test, or grant of access to accounts/devices.

- Iteration: **002**; DirectionKind: **PREREQUISITE_RESOLUTION**; target blocked milestone: **M0**; missing prerequisite: **G0 credible Production-path hypothesis**.
- Authoritative branch: `continuation/iteration-002-intake`; source release ref/HEAD: `main` / `1e14ff466669ad3d385e6eb3ce65cc3bf7f32e07`.
- Verified planning-activation head before this artifact: `72c9b9c2348f8278d7306c5183e5f4b06494419f`; predecessor ledger-only commit: `394a1e6f3968a919a8f57a1e9f8ee7280f412953`.
- Owner planning direction: `docs/iterations/iteration-002/approvals/APPROVALS.md` blob `edfbe704f931aa76da51048d3b554c33e15d1b5e`, first containing commit `394a1e6f3968a919a8f57a1e9f8ee7280f412953`; **ImplementationAuthorized: false; WorkPackage: none**.
- Previous G0 I001 release: `RELEASE_COMPLETE` at `3cb928e2dbc7dd93df467ea5fe8e8eb8594f0962`; release closeout blob `97ab28f646dc2760bcb29ed4e2404ceee47f8d03`. Historical **G0 INDETERMINATE; M0 PASS-TO-EXPLORE NOT CLEARED**.
- Roadmap: conditional `docs/PROJECT_ROADMAP.md` v0.1.1, original accepted blob `4e00d17702be6ad31b36d47491d777bc2032d77e`, current status-only blob `70dfa942f704a07e61d9085925a7f6db8ebd7356`.
- Evidence: owner/Codex read-only Plaid fact-finding `docs/research/iteration-001/PLAID_ACCOUNT_FACT_FINDING_2026-11-08.md` blob `83f7196b37914f5c32b3048680a9f62ea0344111`; prospective [readiness assessment #5](https://github.com/flipzoid82/-Facet-Personal-Finance-App/issues/5).

## Planning problem

I001 established the documentary question but not a credible-enough **full lifecycle** browser path to clear the approved G0 gate. General Plaid guidance suggests initial desktop/Android **ordinary browser** OAuth may work without an owned domain, whereas update-mode repair/consent reauthorization has unresolved redirect URI conditions. Provider contracts and institution-specific behavior are still unknown, and no actual Production Item or host/browser demonstration exists.

The owner's priority is to advance **small, safe, falsifiable synthetic tests** rather than repeatedly asking Bill to interpret Dashboard `0/20`. Trial lifetime Item allowance, price and sustainable $0/month remain **UNKNOWN**, deferred until real Production or financial obligations become material. Deferral does not erase the $0 requirement.

## Outcome sought (planning and later separately authorized proof)

Produce an **evidence-based G0 prerequisite-resolution matrix** distinguishing:
1. Plaid documentation and owner-supplied account observations from actual executed tests.
2. Initial browser Link/OAuth from OAuth **update mode and repair**, including callback/redirect requirements and Android standard-browser versus embedded-webview constraints.
3. Pure fake-data mock behavior from Plaid **Sandbox** API behavior and never infer Navy Federal/U.S. Bank Production compatibility from either.
4. >7-day offline catch-up for Transactions cursor, pending replacement and other product/state changes (Item/consent/account/balance/liability) that may require polling, targeted refreshing or honest UNKNOWN indicators.
5. The security and resource stop gates required before any real financial data or new host permissions.

A proof-failure or UNKNOWN is a legitimate technical result. It does not authorize M0 implementation or reclassify the I001 G0 release.

## Constraints and safety

Single user; browser on owned Windows 11 Home Dell and Android phone; local network/on-demand, no owned public domain or always-public endpoint; $0 incremental monthly cost preference; real read-only Plaid connection ultimately required for first useful app. **Do not downgrade** the product to fake/Sandbox-only. Preserve all source transactions (pending/unidentified included), per-account inspection, honest stale versus fresh status, and user correction. Do not modify the existing PersonalFinanceApp database/volumes, the Samsung T7 backup, firewall, certificates, Windows security/storage, network exposure or account configuration without separate informed approval.

No authorized code, host execution, Sandbox Item, Production Item, bank connection, API credentials, paid service, user device inspection or configuration change exists at this planning stage. Later synthetic execution would require an exact reviewed WP, Clerk clearance, explicit user implementation consent and separate opt-in to service or host changes.

## Initial decomposition and ownership

One proposed narrowly scoped **WP01 — Synthetic G0 proof harness and decision matrix**; **not opened or executed**. The planned deliverable would contain (a) separately evaluated initial/repair OAuth evidence, (b) deterministic fake-data 8+ day recovery/reconciliation scenarios and non-Transactions failure matrix, (c) cost/privacy/host stop conditions, (d) evidence-tier labels and (e) integrated supported/falsified/unknown recommendation. Split into more than one WP only if an independently reviewed plan finds concrete ownership, environment or test-coupling reasons; no artificial extra Clerk/Builder cycle.

- Future Builder (only after separately authorized WP review and implementation approval): generate and run exactly bounded synthetic material and report reproducible results, if approved.
- Architect: independently determine testability and approved-constraint fit, reconcile cross-path proof, own all iteration criteria, validate no false Production claims, and make a **prospective** G0 gate recommendation.
- Clerk: deterministic first-WP preflight/review/return only after valid handoff.
- User/Creative: only consequential changes to product or cost, privilege, hosting and privacy obligations.

## Next lawful planning work

Architect creates `ITERATION_ACCEPTANCE.md` with stable I002-Cxx IDs and integrated proof ownership, then a future exact WP01 plan/handoff for independent Builder plan review. **Do not** direct Builder work, run tests, or request secrets merely because the acceptance map exists.
