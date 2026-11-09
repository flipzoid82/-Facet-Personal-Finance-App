# Facet — I002 WP01 Builder implementation return

## Bounded F01–F03 correction return — 2026-11-09

**Current action:** `BUILDER_CORRECTION` under the original Architect `CHANGES_REQUIRED` audit, blob `6b287f29380ff453a579a6c1b084d429e7af7ef3`, and the fresh Clerk CORRECTION clearance, blob `6db2c3b200c272b5e3bfb358e2c7772005655bc6`. **Branch:** `facet/i002-wp01-g0-synthetic`; existing open, unmerged PR #6 targets `main`. **Current BuilderWorkStartHead:** `a4b45a262d0e1a32c580035ebad5212ac4513134`. **New SubstantiveImplementationHead:** `9b9dd80753b9d2cf690534c0344260a1a75fafc7`, independently observed at the remote branch after the source/test pushes. No source/test semantics follow that head in this correction return. The approved I002-WP01 Plan v0.1.0 and owner approval remain unchanged.

The correction changes only `proof/browser.mjs`, `proof/non-transactions.mjs`, `proof/transactions.mjs` and `proof/proof.test.mjs`. Exact source blobs, F01–F03 adversarial oracles, current public Sync ordering references, reproduction command, test result and limits are in `docs/iterations/iteration-002/work-packages/WP01/BUILDER_CORRECTION_EVIDENCE_001.md`. Final Builder-observed result: `node run-tests.mjs` from `proof/`, Node `v24.18.0 / win32 / x64`, exit `0`, **18 passed, 0 failed**. The original nine-day golden, mutation restart, rollback, replay, pending association and non-Transactions oracles remain green.

Builder asks Clerk only for bounded implementation-completion intake of this correction after the final pushed `BuilderTechnicalHead` is externally observed. Clerk should carry the exact current return and correction evidence paths into the existing PR #6 workflow and route independent Architect audit under its own authority. Builder makes no state/routing commit, PR change, merge or audit. The synthetic corrections do not establish real Plaid Production feasibility; domainless update-mode provider support remains UNKNOWN/BLOCKED, historical I001 G0 INDETERMINATE, and M0 NOT CLEARED.

## Original implementation return — historical record

**Action:** BUILDER_IMPLEMENTATION, exact owner-approved I002-WP01 Architect Plan v0.1.0 (blob `45dab36b244098d57316005a1e8098a9957d33be`) on `facet/i002-wp01-g0-synthetic`. **Technical branch baseline:** `3f1f5b6ef709e56f4df8be3f88af9d02f091f014`. **BuilderWorkStartHead:** `34db35ac2bf345d7bbde847ebcf22bce248eb40a`. **SubstantiveImplementationHead:** `e4a6dd8f1d28046c0deec52370aaeffddacb2ad8`, externally observed on the authoritative remote branch before this return. All source, fixture and test semantics are in that pre-existing commit; this return and its companion report add documentation only.

## Exact governing inputs

- Fresh Clerk IMPLEMENTATION clearance `docs/iterations/iteration-002/work-packages/WP01/CLERK_TO_BUILDER.md` blob `b8213cff271d2f03885c24398749a08f347262b9`, first containing commit `64d22772aef9cf341cb63e1b5479374b10147b3e`, CompatibilityCheck PASS.
- Original Architect implementation handoff `docs/iterations/iteration-002/work-packages/WP01/ARCHITECT_TO_BUILDER_IMPLEMENTATION.md` blob `a9eb2323578966ba60e03193e1f5e65b8e521834`, first containing commit `f44ae1115c65c2239cb112d1d646a885291471a6`.
- Owner's distinct exact-plan implementation approval `I002-WP01-IMPLEMENTATION-APPROVAL-20261109`, ledger blob `d390cf5c1d76f5fda35e9d020d12cd8d50e0a375`, first containing commit `3f1f5b6ef709e56f4df8be3f88af9d02f091f014`.
- Independent PLAN READY review blob `19ab6cbf13d3400b1f1cc66c4bbb13f005a082b4`, BuilderTechnicalHead `61c6129cd8b47aa849e1cf8495817d919b637d51`; I002-C01–C07 map blob `112f8f4a9821f0667cbd19d3ae1541bdf5052ad0`.

## Delivery and reproducible T2 result

The isolated fake model, fixed nine-day fixture, network-denying runner, tests and reproduction instructions are under `docs/iterations/iteration-002/work-packages/WP01/proof/` at the SubstantiveImplementationHead. Exact blob manifest, dated public-source register, four browser/mode outcomes, golden pre/post state, failure oracles, non-Transactions gap matrix, consent boundaries and criterion trace are in `docs/iterations/iteration-002/work-packages/WP01/G0_SYNTHETIC_PROOF_REPORT.md`.

Command from `proof/`: `node run-tests.mjs`. Node-reported environment: `v24.18.0 / win32 / x64`. Observed exit code `0`; **13 tests passed, 0 failed**. The network guard test throws before synthetic TCP/fetch calls can start. No real provider, bank or device result is claimed. The report's T2 evidence is Builder-observed command output; T3 independent recorded-oracle review and any T4 physical/provider proof remain outside Builder authority.

| Iteration criterion | Return evidence and limitation |
| --- | --- |
| I002-C01 | Report §1 T1 public-source/owner-report register, with update-mode redirect contradiction and account-specific cost unknown. |
| I002-C02 | `proof/browser.mjs`, browser tests and report §3: desktop/Android initial fake callback and failure oracles; actual provider/browsers untested. |
| I002-C03 | Same model/tests and report §3: update login/consent/account reselection, retry and post-repair checks; domainless provider repair UNKNOWN/BLOCKED. |
| I002-C04 | `proof/transactions.mjs`, nine-day fixture/tests and report §4: two-page atomic cursor, whole-loop mutation restart, rollback, replay, pending replacement and correction preservation; real provider recovery untested. |
| I002-C05 | `proof/non-transactions.mjs`, negative/cross-family tests and report §5: separate Item, account, balance, liability, history, recurring and missed-event statuses; real field/event coverage unknown. |
| I002-C06 | `proof/run-tests.mjs`, network-guard test and report §6: synthetic no-secret/no-Item boundary; owner-host/security/cost/consent gates remain. |
| I002-C07 | Report §6 integrated T1/T2 matrix and prospective recommendation. Architect owns independent integration verification; no G0 or M0 clearance is asserted. |

**Truthful outcome:** The approved synthetic proof exercises Facet's proposed state handling and falsifies several unsafe shortcuts (cross-mode/replay callbacks, partial cursor commits, guessed pending matches, fetch-time freshness). It does **not** establish Plaid Production viability, no-domain update-mode support, required institutions, long-term $0 pricing, or owner-host security. Historical I001 G0 remains INDETERMINATE and M0 NOT CLEARED. Further material provider/host/cost/product proof needs the existing separate decision and consent routes.

This return requests only Clerk's bounded implementation-completion intake after the pushed final BuilderTechnicalHead is externally observed. Builder makes no state/routing commit, PR, merge or Architect audit.
