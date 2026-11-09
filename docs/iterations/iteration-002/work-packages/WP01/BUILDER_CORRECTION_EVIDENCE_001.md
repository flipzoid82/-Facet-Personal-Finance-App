# Facet — I002 WP01 bounded Builder correction evidence

**Action:** `BUILDER_CORRECTION` for the original Architect audit's F01–F03 only. **Date:** 2026-11-09 (America/Los_Angeles). **Branch:** `facet/i002-wp01-g0-synthetic`, existing PR #6. **BuilderWorkStartHead:** `a4b45a262d0e1a32c580035ebad5212ac4513134`. **New SubstantiveImplementationHead:** `9b9dd80753b9d2cf690534c0344260a1a75fafc7`, independently observed as the remote branch HEAD after two source/test correction commits. All corrected source and test semantics are at that head; this evidence and the updated Builder return are documentation after it.

**Authority:** original Architect audit verdict `CHANGES_REQUIRED`, blob `6b287f29380ff453a579a6c1b084d429e7af7ef3`, first containing commit `7c2d7e200249e2748afb7b62e08142d09b3ad707`; Clerk correction clearance blob `6db2c3b200c272b5e3bfb358e2c7772005655bc6`, first containing commit `a2a8836d1e662532c46d5642fd5e469be59413a0`. The unchanged approved plan is I002-WP01 v0.1.0 blob `45dab36b244098d57316005a1e8098a9957d33be`; I002-C01–C07 map blob `112f8f4a9821f0667cbd19d3ae1541bdf5052ad0`; owner approval record `I002-WP01-IMPLEMENTATION-APPROVAL-20261109` is in ledger blob `d390cf5c1d76f5fda35e9d020d12cd8d50e0a375`. Original Builder report and return remain historical evidence at their prior committed blobs.

## Correction and challenge matrix

| Finding | Corrected model and focused evidence | Boundary |
| --- | --- | --- |
| **F01 — one-time callback** | `proof/browser.mjs` now gives each fake flow a unique ID and keeps its canonical immutable state in a process-local owner. Valid callback, expiry, cancel and retry synchronously replace that state. A stale original flow or cloned caller cannot accept a second callback. The new regression calls `finishBrowserFlow` twice with the **original reference** for both initial and update modes; only the first call accepts. Existing session, origin, nonce, cross-mode, expiry, cancel, popup and repair tests remain green. | This demonstrates compare-and-consume in one synchronous synthetic process. It does not claim distributed atomicity, durable browser storage or actual Plaid callback security. |
| **F02 — available field** | `proof/non-transactions.mjs` checks whether `available` is an own, present value. Omitted, undefined, null, unsupported and valueless objects stay `UNKNOWN`; the first three have distinct reasons, while numeric zero counts as present. A present field is classified by its own coverage and source time, with stale/unknown/fresh cases. The regression also shows explicit current can be `FRESH` while absent available is `UNKNOWN`, and revoked Item consent downgrades an otherwise fresh available field. | No parent timestamp is treated as evidence of an omitted available amount. Actual institution field coverage and timestamps remain unknown. |
| **F03 — page ordering** | `proof/transactions.mjs` applies staged Sync pages in page order before committing snapshot and cursor. The adversarial earlier-page add/later-page remove leaves the ID absent from active transactions, present in removal history and review queue, with the user correction retained; replay returns the same snapshot. A posted add followed by a later pending removal still transfers the pending correction after the final ordered state. Conflicting operations on one ID **within one page** block the entire batch as `AMBIGUOUS_SAME_PAGE_ID`. | Public provider docs specify paginated change arrays and original-cursor restart on pagination mutation, but do not explicitly exclude add-then-remove across pages or establish intra-page order for a conflicting ID. The synthetic model preserves page order and fails closed for that unresolved same-page case. Actual provider behavior remains untested. |

For F03, current public sources checked 2026-11-09: [Plaid Transactions Sync API](https://plaid.com/docs/api/products/transactions/) and [Sync migration guide](https://plaid.com/docs/transactions/sync-migration/). The absence of an explicit exclusion or intra-page ordering guarantee above is a bounded inference from those public pages, not an account-specific or Production observation. The original source register in `G0_SYNTHETIC_PROOF_REPORT.md` remains the historical T1 record.

## Exact corrected source and test manifest

| Artifact at new SubstantiveImplementationHead | Git blob |
| --- | --- |
| `proof/browser.mjs` | `d74dee5bff3efe2c7f4e9eb8bd3cf0467fdea5e3` |
| `proof/non-transactions.mjs` | `d69186534c4e488d51527ca89fb0d1fb97831240` |
| `proof/transactions.mjs` | `3b710af1f50feda064d723f3ba85b8f8f3d0b763` |
| `proof/proof.test.mjs` | `2425d5fb8dbb9046abe11f2967b92c797971db3d` |

The original nine-day fixture, network-denying runner, proof README and untouched source evidence remain at their prior blobs. No dependency was installed.

## Reproduction and result

From `docs/iterations/iteration-002/work-packages/WP01/proof/`, run `node run-tests.mjs`. Builder observed the final run on Node `v24.18.0`, `win32`, `x64`: exit code `0`, **18 tests passed, 0 failed, 0 skipped or cancelled**. This includes the original nine-day golden oracle, original-cursor mutation restart, pre-commit rollback, replay, pending/user-correction behavior, independent non-Transactions statuses and the F01–F03 regressions above. `git diff --cached --check` was clean before the substantive commit. The original report's 13-test result remains a truthful earlier observation; this 18-test result supersedes it for the corrected source.

## Integrated limit and return

The corrected synthetic evidence addresses the audit's I002-C02/C03 callback, C04 page-order and C05 available-field defects. It also restores the synthetic inputs for C07 integration review. C01 source attribution, C06 process-local safety and all other previously approved synthetic behavior are preserved. **Architect alone** decides whether the correction meets an independent T3 audit. No actual Plaid Production/Trial, real bank or financial data, physical desktop/Android return, paid route, device security or provider entitlement was tested. Domainless update-mode provider feasibility remains UNKNOWN/BLOCKED by the original public-doc contradiction. Historical I001 G0 is **INDETERMINATE** and M0 **NOT CLEARED**.
