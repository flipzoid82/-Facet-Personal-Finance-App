# Facet — Iteration 002 WP01 Independent Architect Audit

**AUDIT VERDICT: CHANGES_REQUIRED** — numbered material technical findings F01–F03, confined to the exact authorized synthetic proof scope. No product revision, new implementation approval, G0/M0 clearance or merge authorization.

**Auditor:** I002 ARCHITECT, AUDIT / ARCHITECT_AUDIT. **Branch:** facet/i002-wp01-g0-synthetic. **WP:** I002 WP01. **PR:** #6, https://github.com/flipzoid82/-Facet-Personal-Finance-App/pull/6, independently observed OPEN/UNMERGED at audit entry, head 07471164513058562ad86c8c50c51de79e632445, base main 1e14ff466669ad3d385e6eb3ce65cc3bf7f32e07. Active audit entry was a separate state-only child 723acb2b76df9b0a06a72ed3f3365c42fd72dd55. This artifact cannot contain its own commit or blob identity.

## 1. Source, scope and administrative preflight

| Controlling evidence | Exact verified identity |
| --- | --- |
| Clerk original audit handoff | docs/iterations/iteration-002/work-packages/WP01/CLERK_TO_ARCHITECT_AUDIT.md blob ddc2acb9b46849aeedb10258ba7f2a87264f397d; ClerkAuditCompilationCommit cbe8310147282ef48d612c0c8f97379fb0376b2c, direct parent PreCompilationPRHead 59856378c3133d4800d6fb9e1b1bbe22887315b8; separate state-only direct child AuditEntryPRHead 07471164513058562ad86c8c50c51de79e632445. |
| Builder work start | 34db35ac2bf345d7bbde847ebcf22bce248eb40a; separate Clerk release for exact approved implementation. |
| SubstantiveImplementationHead | e4a6dd8f1d28046c0deec52370aaeffddacb2ad8; two source/fixture/test commits after BuilderWorkStartHead, seven proof files added. |
| BuilderTechnicalHead | 98506c43733d62d12bada7af6ab9a2cf0339146b, direct child of substantive head, only Builder return and report documents added. |
| Builder return and report | docs/iterations/iteration-002/work-packages/WP01/BUILDER_IMPLEMENTATION_RETURN.md blob eda3a5b3711cdf0de301109a37cad5248fccfa63; G0_SYNTHETIC_PROOF_REPORT.md blob 167454a160b9ef0dd2ce8558f05d434b475b0f89. |
| Approved plan and map | I002-WP01 Architect Plan v0.1.0 blob 45dab36b244098d57316005a1e8098a9957d33be; full I002-C01–C07 acceptance/decomposition blob 112f8f4a9821f0667cbd19d3ae1541bdf5052ad0; independent PLAN READY review blob 19ab6cbf13d3400b1f1cc66c4bbb13f005a082b4. |
| Actual owner approval | I002-WP01-IMPLEMENTATION-APPROVAL-20261109 in I002 ledger blob d390cf5c1d76f5fda35e9d020d12cd8d50e0a375, first containing commit and technical baseline 3f1f5b6ef709e56f4df8be3f88af9d02f091f014. Only isolated fake-data implementation was approved. |

Proof source manifest at the substantive head was inspected against these exact Git blob IDs:
- proof/browser.mjs — 1074772d0592c2c368761f4a378c59fdcd5ae787
- proof/transactions.mjs — 9b4c666eb26780ca9df7e2800ce484fbe11b3916
- proof/non-transactions.mjs — a260f6ee2b402670304996295bde11fc57e4abf5
- proof/fixtures/nine-day-gap.json — 1a6191e3d96b7d681f6e59a8ee9a21a473d299c9
- proof/proof.test.mjs — 153a7ee13dfc73727e99558a5f8a8c5c0474a5c8
- proof/run-tests.mjs — d22624d6e8422741a119cd7dc9a5aca8bb31b4e1
- proof/README.md — e0ace1d04287508a053779e89b305d693fe63636

The Clerk administrative compilation and PR representation are valid but **not** an independent technical PASS.

## 2. Method, evidence levels and environment

**T1:** examined committed code, complete fixture and tests, source register, approved plan, acceptance and provenance; correct reporting of historical G0 and provider unknowns.

**T2 Builder-reported only:** Builder recorded command node run-tests.mjs, exit 0, 13 passed / 0 failed, on Node v24.18.0 win32 x64. This was not witnessed by Architect. Existing tests pass only their current scenarios.

**T3 independent challenge:** Architect read every proof source, fixture, test and report. Reconstructed the three affected original source files in a separate audit container and verified byte-for-byte equivalence by git hash-object: browser.mjs 1074772d0592c2c368761f4a378c59fdcd5ae787, non-transactions.mjs a260f6ee2b402670304996295bde11fc57e4abf5, transactions.mjs 9b4c666eb26780ca9df7e2800ce484fbe11b3916. Executed three extra in-memory adversarial counterexamples on the auditor's Node v22.16.0 Linux environment. This is not a repeat of the whole Builder suite and does not substitute for the Builder's later correction-run environment proof. All three model defects reproduced with exact source. No Plaid call, network, financial data or owner computer interaction.

**T4 not performed:** actual Plaid initial/update OAuth, ordinary physical desktop/Android browser, real institution, Items, offline provider recovery, device security, price/entitlements or user host. No modeled green result supplies T4.

## 3. Numbered in-scope correction findings

### F01 — Callback one-time consumption/replay has no atomicity guarantee (I002-C02/C03; material)

**Actual code:** proof/browser.mjs, finishBrowserFlow. The function returns a newly frozen COMPLETE flow; its original AWAITING_CALLBACK flow remains reusable. The existing proof.test.mjs replay assertion passes the returned COMPLETE object, not the original state shared by multiple or concurrent callers.

**Independently reproduced:** Create one fake initial flow, then call finishBrowserFlow(originalFlow, validCallback, now+1) and finishBrowserFlow(originalFlow, validCallback, now+2). BOTH return MOCK_CALLBACK_ACCEPTED. Passing the newly completed flow to the second call does reject, but that conditional caller behavior does not establish one-time atomic consume or protection from stale callers. Same shared model also affects update mode.

**Required evidence to close:** Add an in-scope state owner, single-consumption guard or model abstraction demonstrating atomic compare-and-consume across duplicate/stale callers, including both initial and update mode. A regression test must reject a second callback supplied with the original reference, not only with the new completed object. Preserve nonce/session/origin/expiry/cancel and repair behavior. No actual Plaid integration or physical browser required.

### F02 — Omitted available balance mislabeled FRESH (I002-C05; material)

**Actual code:** proof/non-transactions.mjs, balanceFields[accountId].available. If an available balance is null, UNKNOWN is emitted. If the property is OMITTED/undefined, the fallback expression observed?.available ?? observed classifies the parent account balance observation as the available field. A complete recent parent sourceAt can incorrectly yield FRESH.

**Independently reproduced:** Fake account a with COMPLETE coverage, recent sourceAt, explicit current observation, and no available property yields balanceFields.a.available.state = FRESH with SYNTHETIC_SOURCE_TIME_WITHIN_ORACLE, despite no available value ever being supplied. This is incompatible with the required independent field availability and truthful freshness semantics.

**Required evidence to close:** Treat absent, undefined, null, unsupported and present available fields distinctly; do not inherit a sibling/parent field's freshness as evidence that the available amount exists. Add focused regression for omitted/null/present values and stale/unknown/fresh source time, also preserving consent-repair behavior and current-balance distinction.

### F03 — Cross-page add-then-remove left active by flattened change ordering (I002-C04; material proof gap)

**Actual code:** proof/transactions.mjs, applyCompleteBatch, processes ALL removed IDs first and then ALL added/modified upserts after flattening across pages. An ID introduced on an earlier page can be reintroduced after its later removal without any removal-history entry.

**Independently reproduced:** Original transactions empty, cursor c0. Page 1 adds ID x and hasMore=true, page 2 removes x and hasMore=false. runSyntheticSync returns COMMITTED/cursor c2, still includes x in active transactions, and contains no removedHistory for x. Existing golden fixture only removes IDs already present before the fetch.

**Required evidence to close:** Validate and cite the current provider Sync ordering contract. If add-then-remove across a paginated update is valid or cannot be excluded, preserve the relevant event order and demonstrate correct final removal, retry/idempotency and user-correction safety. If documentation guarantees this sequence cannot occur, document the exact guarantee and an explicit unsupported-input/blocked oracle rather than silently assuming. Add an adversarial regression. Preserve successful nine-day golden, mutation restart at original cursor, page-failure rollback and atomic snapshot/cursor commit.

These are changed test inputs and credible progress deltas; the ordinary bounded correction route suffices. Do not expand into account-specific production research, host setup, paid balances, provider Items or revised product meaning.

## 4. Independent acceptance / cross-family disposition

| Criterion | Exact-delivery audit judgment |
| --- | --- |
| I002-C01 | T1 source register appropriately attributable and bounded. Account-specific Trial, 0/20, costs and live Product entitlements remain UNKNOWN. |
| I002-C02 | CHANGES_REQUIRED for one-time callback replay protection F01. Other fake initial desktop/Android positive and negative paths covered as T2. Actual devices/provider NOT TESTED. |
| I002-C03 | CHANGES_REQUIRED for common replay invariant F01. Fake update intent/repair checks documented; provider update-mode domainless redirect path UNKNOWN/BLOCKED, not real success. |
| I002-C04 | CHANGES_REQUIRED for cross-page removal ordering F03. Existing 9-day cursor/pending/rollback positive fixture otherwise credible T2, no actual provider demonstration. |
| I002-C05 | CHANGES_REQUIRED for missing-field freshness F02. Conservative Item/consent/accounts/liabilities/missed-event modeling otherwise meaningful; provider completeness still unknown. |
| I002-C06 | Source/runner and guard evidence limited to synthetic T1/T2. No privileged/paid/financial activity seen in code. No physical host/network/backup/security T4. |
| I002-C07 | BLOCKED for complete current synthetic integration while F01–F03 remain; Architect T3 final integration PASS withheld. After correction, G0 Production-path feasibility and M0 remain uncleared absent their separate prerequisites. |

**Overall verdict: CHANGES_REQUIRED, not AUDIT PASS.** The current 13 passed results support limited normal-oracle behavior but fail material adversarial scenarios. This is the first distinct Builder delivery plus independent Architect audit pair for the unresolved WP, not a repetitive retry or third-pair continuation gate.

## 5. Lawful disposition and boundaries

Architect commits this original ARCHITECT_AUDIT.md and then **separately** routes its exact blob and first containing commit to CLERK_IMPLEMENTATION_PREFLIGHT with ActiveRole none / NextRole CLERK / ImplementationAuthorized false. Clerk independently checks exact original findings and unchanged approved plan, review, owner approval, technical branch, same WP PR and ancestry before releasing bounded BUILDER_CORRECTION in another separate state-only commit. Clerk must not judge technical fixes or implement them. The original Architect audit remains immutable; correction changes Builder-owned source/tests only within the accepted WP and produces fresh evidence followed by Clerk intake and a new independent Architect audit. No new plan review or user implementation approval is needed solely for these in-plan defects.

**Explicit nonauthorizations:** no PR merge, exact-head merge permission, UAT, release, M0/M1, Plaid Dashboard/API/Sandbox/Production Item, financial account/credentials, owner PC/Android/device/network/storage/CA modifications, purchase, contract or new product scope. Preserve I001 G0 INDETERMINATE, M0 NOT CLEARED and deferral of Dashboard 0/20.
