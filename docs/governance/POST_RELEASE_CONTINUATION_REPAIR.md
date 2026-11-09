# Workflow-wide post-release continuation — amendment and controlled repair record

**Source:** [Issue #3 — reusable post-RELEASE_COMPLETE research and readiness](https://github.com/flipzoid82/-Facet-Personal-Finance-App/issues/3). Owner explicitly authorized implementing this general repair on 2026-11-08 (America/Los_Angeles), following the explicit requirement that the fix persist across **every future iteration and RELEASE_COMPLETE milestone**. This file documents the *proposed branch patch*, not effective authority before merge/adoption.

## What this patch changes

- `docs/WORKFLOW.md`: generalized Architect-only `POST_RELEASE_RESEARCH_INTAKE`, `POST_RELEASE_READINESS_ASSESSMENT`, and prerequisite-proof `PREREQUISITE_RESOLUTION` planning directions after ANY verified passive numbered RELEASE_COMPLETE.
- `chatgpt/PROJECT_INSTRUCTIONS.md` and four `chatgpt/roles/*.md`: matching authority and non-authorization statements.
- `scripts/post_release_contract_fixture.py` and `tests/test_post_release_continuation.py`: **pure contract-model/static text regression tests** for multiple N, malformed state, denied disguised execution, blocked ready gate, and ref conflict. These tests are NOT live remote/GitHub race proof or autonomous enforcement.
- `docs/research/iteration-001/PLAID_ACCOUNT_FACT_FINDING_2026-11-08.md`: source-attributed user/Codex observations from archived GitHub Issue #2. Neither the trial counter `0/20` nor long-term billing terms are presented as resolved. G0 remains INDETERMINATE; M0 not cleared.

## Current-state repair, separate from generic rule

At original I001 release completion `3cb928e2dbc7dd93df467ea5fe8e8eb8594f0962`, `.project/CURRENT_STATE.md` had the valid passive `ActiveRole: none`. The owner manually committed `f61b0d139e834d1f7af34c1768be8a90770a621c` changing **only** `ActiveRole: none` → `ActiveRole: ARCHITECT` to try to authorize post-release follow-up. But `Phase: RELEASE / State: RELEASE_COMPLETE / NextRole none / Handoff none` stayed unchanged, producing an inconsistent tuple. The owner subsequently requested and authorized a **permanent workflow-wide repair** rather than a one-off activation.

The last commit on this proposed branch should restore exactly **`ActiveRole: none`** in `.project/CURRENT_STATE.md` as a **separate state-only commit**, preserving every other line byte-for-byte, while this record preserves the purpose and identities of the manual change. This does not retroactively deem a past ARCHITECT role valid or grant implementation permission. Branch/PR merge is a distinct later adoption decision. After adoption the source `main` and release evidence must be independently reverified; existing G0 and M0 verdicts must remain.

## Checkpoints and limitations

1. The generic rules are normative **human/agent process contracts**, not an implemented GitHub Actions concurrency mutex or a guarantee that an LLM will follow them. The canonical successor requires actual atomic create-if-absent and observed-head conditional publication; inability to prove those operations still blocks successor activation.
2. Research-only GitHub issue publication does not alter `main`. A safely created separate research branch is likewise not automatically merged. The archived Issue #2 is completed; Git tracking of the same receipt becomes available only after authorized adoption of this PR.
3. Proof-only successor **planning** may be authorized even with a blocked next milestone; it is not permission for Sandbox resource creation or live Plaid/real-bank connections. Separate work-package approval and service/host constraints continue to control.
4. Accepted roadmap product meaning and historical release approvals are unchanged. If the accepted roadmap does not actually support the proposed prerequisite work, request the relevant Architect/Creative/user roadmap change; do not use this amendment to silently waive scope.
5. After future Iteration 002, 003, 010, etc. the same contracts reference that release's **actual** N, closed evidence, current roadmap and canonical successor ref. No further workflow source edit should be required for a new N.

**Regression command (after checkout):** `python -m unittest discover -s tests -v`. Treat it as contract/model coverage, NOT live GitHub/host demonstration.
