# HF-001 — Architect owner-controlled administrative installation package 001

**STATUS: PREPARED PROPOSAL / NOT OWNER-RATIFIED / NOT INSTALLED / NOT EFFECTIVE.**
**Purpose:** make the already designed candidate 002 installable by its lawful owner, without a fourth Clerk state, another speculative Builder review, or importing isolated review-state history into main. This is Architect drafting under the existing active review-ref reconciliation authority. It is **not** a grant for Architect, Clerk, or Builder to move main.

## 1. Source lock and authority disposition

- Repository: `flipzoid82/-Facet-Personal-Finance-App`.
- Effective main **H0**: `99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8`, direct child of original pre-bridge `758f0a97adaa15cda37ba08a1958d5896e9699cd`.
- Effective source blobs: `docs/WORKFLOW.md` `8e8aea04765386b1535b30dff33e30eaf68f7f11`; `chatgpt/roles/ARCHITECT.md` `9402fb8bfe089f0886eddfc2bd306ca111b0f9c0`; `chatgpt/PROJECT_INSTRUCTIONS.md` `5a2191d23be54ec232ddf51f685d526c3f11bd74`.
- Installed continuation capsule: `docs/governance/hotfixes/HF-001/OWNER_CONTINUATION_AUTHORITY_BRIDGE_V0.1.md` blob `53f5f7865129bb410d78bb24f04b4d88a17dfccd`.
- Current isolated review-ref authority state: `GOVERNANCE / ARCHITECT_GOVERNANCE_REVIEW_RECONCILIATION / ActiveRole ARCHITECT / Iteration 003 / WorkPackage none / ImplementationAuthorized false`, state blob `e776cc537d874cdd9c8adba500aa68d17699c7a7`. Review ref at preparation start: `7fbd1cbb1025d5b16116fff76c91d641d8741cae`.
- Previously frozen substantive HF-001 v0.3 `PROPOSAL_REVISION_002.md` blob `99be3ba8d9108c791e52f7b82d364ca9cfa41531` and original owner implementation approval ledger blob `cc4520f1367316f2b9224b5f72960f1161c8af71` remain unchanged. Cycle-003 Builder `CHANGES REQUIRED` review blob `0990dc4bca64a0232f0668682b7f514525d77037` remains the latest implementation-plan verdict.
- Candidate 002 to install in operative form: `OWNER_FILTERED_PUBLICATION_AUTHORITY_PROPOSAL_002.md` blob `513933c27a231a8d66f7dc4f67251a0834151a05`; its paper compatibility audit `ARCHITECT_PRE_REVIEW_AUTHORITY_COMPATIBILITY_002.md` blob `d0bc080aa179860e31b4d989a4fdc6255028427d`. This package supplies concrete proposed operative wording and installation verification. Its one deliberate material delta from candidate 002 is the **installation actor**: owner-executed rather than Architect-executed H0→H1. Architect's pre-owner reconciliation and reasons are recorded in §6. The user must approve this corrected combined package, not candidate 002 alone; no silent substitution.

**Critical authority finding (G1):** workflow §Universal Authority Preflight requires both an active-role selection and an already effective permitted action class. The already consumed `HF001_OWNER_APPROVED_CONTINUATION_v0_1` authorizes the reviewed HF-001 continuation, but not a new Architect administrative publication to main. A user message, a draft on this review ref, or a GitHub connector action cannot create that missing agent action class. Therefore **do not use an Architect tool to publish H0→H1 solely because the owner says "proceed"/"approve"**. The noncircular path is for the **repository owner, acting through their own authorized GitHub access**, to ratify and install the exact four-path administrative change; afterwards, agents verify the resulting effective authority. If the owner cannot or does not want to make that external administrative publication, report G1 BLOCKED; do not disguise an agent write as an owner action. This changes only the **installation actor/mechanism** contemplated in candidate 002 §2A, not the later Architect publication responsibility. **Architect disposition:** supersede candidate 002's conditional Architect installer with direct repository-owner installation for H0→H1; see §6. This is a material administrative amendment requiring exact informed owner ratification of this package, not a replay of the original owner approval.

## 2. Exact four-path intended main diff — no other paths

The owner-installed change must be exactly one direct-child H0→H1 commit and **only** these paths:

1. `docs/WORKFLOW.md`: append/insert a narrow effective `HF001_OWNER_FILTERED_PUBLICATION_v0_2` clause equivalent to the text below, without weakening existing universal gates or deleting the prior historical bridge.
2. `chatgpt/roles/ARCHITECT.md`: append a matching Actor exception, text below.
3. `chatgpt/PROJECT_INSTRUCTIONS.md`: append a matching precedence/authority-source exception, text below.
4. `docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md`: create an immutable installation capsule with exact affirmative owner wording, approved candidate 002 blob, this package blob once known, H0, those four paths, the new operative clause hash or complete clause, and the explicitly limited scope. Do **not** put H1 SHA in its own containing commit.

The additions below are **installation text candidates**, not already operative policy. Final byte-identical contents and the owner's exact approval must be fixed before publishing. A source change, different clauses, fifth path, or absent installation consent requires a stop and renewed approval.

### Proposed addition to `docs/WORKFLOW.md`

```md
## HF001_OWNER_FILTERED_PUBLICATION_v0_2 — one-use owner-installed exact-head method

**Installation scope and priority.** This clause is effective only if directly installed by the repository owner as a single H0→H1 commit whose parent is `99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8`, whose changed paths are exactly `docs/WORKFLOW.md`, `chatgpt/roles/ARCHITECT.md`, `chatgpt/PROJECT_INSTRUCTIONS.md`, and `docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md`, and whose immutable capsule binds separately recorded explicit owner ratification of candidate proposal Git blob `513933c27a231a8d66f7dc4f67251a0834151a05`. Owner execution of this administrative installation does not grant any agent retroactive write permission. Verify H1 on remote; preserve original I003 `.project/CURRENT_STATE.md` blob `2e3178505a3dbe9bb31ed864a17a13b0453c3e42` and accepted roadmap blob `19014633c69b976db874c50be880bfbd11c02819`. For this single HF-001 v0.3 chain, verified H1 expressly replaces the previous v0.1 bridge's fixed H0 prerequisite; all other original gates survive. The immutable capsule cannot self-reference H1.

**Plan review and implementation.** Continue only from the correct active Architect governance review state and exact handoff, with a newly H1-bound implementation plan and full Architect compatibility audit. Materially revised plan candidates receive fresh Clerk `CLERK_PLAN_REVIEW_PREFLIGHT` and independent Builder `BUILDER_PLAN_REVIEW` using existing states; original cycle-003 `CHANGES REQUIRED` is not PLAN READY. No fourth Clerk state. After a fresh PLAN READY and Architect reconciliation, Clerk alone may use existing `CLERK_IMPLEMENTATION_PREFLIGHT` and an independently verified atomic create-only claim of the single `refs/heads/governance/hf-001-implementation` from H1, then a separate state-only `BUILDER_IMPLEMENTATION` release for `HF001-WP01`, with exact `BuilderWorkStartHead` and `ImplementationAuthorized true`. Absent a proven atomic missing-ref operation, STOP; available tool names are not proof.

**Delivery/audit/owner wait.** Builder edits only reviewed approved technical paths and records genuine evidence; Clerk performs deterministic intake/one evidence PR; Architect independently audits actual code, regression evidence, final tree and source provenance. An audit failure follows existing Clerk/Builder correction and fresh audit. After audit PASS, the same technical ref enters a separately guarded state-only `AWAITING_HF001_MERGE_APPROVAL / ActiveRole none / NextRole ARCHITECT / ApprovalRequiredFrom USER / WorkPackage HF001-WP01 / ImplementationAuthorized false` with exact audit handoff. This passive W is not an active Architect session. The technical W ref and its PR head remain frozen after the owner request; any change invalidates the requested approval.

**Audit-time filtered candidate.** Under active Architect audit authority only, prepare and independently verify prospective resulting tree T by starting at the exact H1 main tree and copying only separately approved/audited technical blobs. Exclude temporary committee/technical `.project/CURRENT_STATE.md`, unchanged original I003 state/roadmap, and all unrelated paths. Before W, Architect may create a **detached, unreferenced** single-parent Git commit Z (sole parent H1, exact tree T) solely for audit/owner decision. No Git ref move, new auxiliary branch, release assertion or automatic publication is permitted. Verify Z/T and record the literal Z SHA, tree SHA, H1 and audited path/blob set in the Architect owner-request artifact before creating W. If tool permission or tree proof fails, STOP.

**Frozen owner decision.** The owner must later separately authorize the **exact** H1, Z/tree, W technical-ref SHA, PR number/head, approved file scope, and `ARCHITECT` as publisher, specifically using a **non-PR filtered Git publication** with `update_ref(main, sha=Z, expected_sha=H1, force=false)`. The older bounded implementation approval and the administrative installation are NOT this final consent. The evidence PR is never reported as natively merged by this mechanism. Unknown or negative owner decision keeps W passive.

**Architect-only passive owner-decision intake.** A fresh exact affirmative owner decision while the technical W remains `ActiveRole none / NextRole ARCHITECT / ApprovalRequiredFrom USER` authorizes only the named `HF001_OWNER_PUBLICATION_DECISION_INTAKE` exception. Architect rechecks current remote H1/W/PR/Builder/Clerk/audit/Z/T and owner wording, then records a unique append-only immutable `docs/governance/hotfixes/HF-001/approvals/OWNER_FILTERED_PUBLICATION_DECISION_00X.md` on the **administrative review ref only**, using a guarded receipt-only direct-child commit and no change to its `.project/CURRENT_STATE.md`. The receipt must preserve exact owner wording and all approval bindings. This exception does not activate another role or modify W, the PR head, or main; duplicate/contradictory receipt or unavailable exact proof STOPS.

**Architect-only final publication.** Only with an independently verified matching owner receipt and the exact unchanged authorized H1/W/PR/Z/T/approved scope may Architect use the distinct, one-use `HF001_FILTERED_PUBLICATION` action for a single nonforced guarded expected-old-main update to Z. A tool contract is not proof of atomicity, branch-policy permission or outcome. Before the attempt, verify that the operation's actual concurrency semantics meet the approved exact-head guarantee; otherwise STOP. No native PR squash/merge as substitute, no force, no new source head, no retry after uncertain result without read-only re-verification. On success, reread remote main and independently prove HEAD=Z, sole parent H1, tree=T, exact allowed path diff, original I003 state and accepted roadmap byte-identical, and no imported temporary history. Record truthful filtered-publication outcome on the administrative review ref. Keep the evidence PR open unless a separately authorized close exists; never claim it was natively merged.

**Expiry and exclusions.** This method expires after one verified HF-001 v0.3 filtered publication and receipt reconciliation. No I004, automatic RELEASE_COMPLETE, roadmap revision, I003 legacy migration, unreviewed plan, unapproved merge, real G0/M0/M1 clearance, Plaid/bank/financial access, host/backup/device change, paid service or purchase. Any stale ref, permission failure, branch-protection failure, unproven create-only/CAS behavior, unexpected diff, missing review, wrong state/actor/approval or race STOPS, with no force or authority workaround.
```

### Proposed addition to `chatgpt/roles/ARCHITECT.md`

```md
## HF001_OWNER_FILTERED_PUBLICATION_v0_2 — exactly one owner-installed exception

Only when the matching `HF001_OWNER_FILTERED_PUBLICATION_v0_2` clause and immutable capsule are proven installed on effective main by an owner-controlled exact four-path direct-child H0→H1 commit, the active HF-001 review-ref Architect may revise/independently self-check the full H1-bound implementation plan and route it through existing Clerk/independent Builder review. During a separately authorized active Architect audit on the implementation ref, Architect may prepare/verify an unreferenced single-parent H1 filtered candidate Z/T without moving any ref. From an exactly verified passive technical W and fresh exact final owner decision, Architect may **only** perform the workflow-named bounded `HF001_OWNER_PUBLICATION_DECISION_INTAKE` receipt action on the isolated review ref, then the separate one-time `HF001_FILTERED_PUBLICATION` guarded main action after all proof gates. No role activation by a prompt alone, no Clerk publication, no routine GitHub PR merge, no branch bypass, no self-review and no other main authority. Failure or unknown permission means STOP; historical I003 and roadmap remain unchanged.
```

### Proposed addition to `chatgpt/PROJECT_INSTRUCTIONS.md`

```md
## HF001_OWNER_FILTERED_PUBLICATION_v0_2 — effective source exception

For this exact HF-001 v0.3 chain only, a separately owner-installed and externally verified H0→H1 four-path amendment in effective main governs the named publication/decision-intake action classes even if isolated review/technical refs contain historic workflow/role copies. The exact isolated ref's current durable state and handoff still select the actor; effective main supplies **only** the narrowly installed action class. Rebind the subsequently reviewed plan, technical ref, detached candidate, audits and final owner decision to observed H1. Honor all ordinary independent Clerk/Builder/Architect separation and separate owner gates. The previous continuation bridge is not reusable installation permission; no main change or special action from this proposal alone.
```

### Proposed new immutable capsule (fourth path)

Use a filled document with the following fields **before owner installation**; no `PENDING`, vague approval, assumed statement or guessed final H1 in the installed file:

```md
# HF-001 — Owner-filtered publication authority v0.2 installation capsule
Status: OWNER-RATIFIED / INSTALLED ONLY UPON VERIFIED DIRECT-CHILD MAIN COMMIT
RatifiedCandidatePath: docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_PROPOSAL_002.md
RatifiedCandidateBlob: 513933c27a231a8d66f7dc4f67251a0834151a05
ArchitectInstallationPackagePath: docs/governance/hotfixes/HF-001/ARCHITECT_OWNER_ADMIN_INSTALLATION_PACKAGE_001.md
ArchitectInstallationPackageBlob: [externally verified Git blob before actual owner approval]
OriginalEffectiveMainH0: 99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8
OwnerApprovalVerbatim: [owner's fresh exact affirmative words naming scope, baseline and candidate]
InstallationActor: REPOSITORY_OWNER (own GitHub authority), not agent-from-chat
InstallationChangedPaths: docs/WORKFLOW.md; chatgpt/roles/ARCHITECT.md; chatgpt/PROJECT_INSTRUCTIONS.md; docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md
OnlyScope: one-use HF-001 v0.3 administrative action-class installation; not technical work nor exact final publication approval
HistoricalI003StateBlobToPreserve: 2e3178505a3dbe9bb31ed864a17a13b0453c3e42
AcceptedRoadmapBlobToPreserve: 19014633c69b976db874c50be880bfbd11c02819
ResultingMainH1: omitted by design; observed/recorded later on isolated review ref
```

## 3. Owner ratification and noncircular installation path

**This user turn "Proceed" authorizes preparation of this package, not installation of a still-unreviewed exact four-path blob change.** The final owner installation decision must name the candidate 002 Git blob, the newly verified package Git blob, H0 and the explicit four-path content/scope. No agent may move main until an already installed durable action class independently authorizes the move. In the currently operative contract there is no demonstrated new Architect administrative installer exception. Hence the lawful noncircular option is **owner-executed GitHub installation** (if the owner's own repository permissions and any branch policy permit), not reclassifying a chat approval as an agent action.

Pre-install owner procedure: review the frozen candidate 002 and this package, affirm the precise final contents and four-path scope, verify main still H0, prepare exactly one ordinary Git commit with parent H0 and those four changes under the owner's GitHub authority, publish via whatever repository-authorized owner process actually exists, and inspect the result. If branch protection requires a PR, a normal **administrative four-path PR with owner-reviewed exact resulting tree** may be considered as a **separate approval/process decision**; it is NOT the later technical filtered publication and it must not carry any review-ref state/history. Do not assume any of those provider permissions or create an extra branch without scope review.

After installation, Architect **independently** resolves main, validates H1 direct-parent H0, changed-path set exactly equal the four allowed paths, new workflow/role/project instruction/capsule blobs, owner wording and capsule candidate/package identities, source I003 state/roadmap, and the original substantive governance approval and reviews. If installation did not succeed or cannot be proved, remain at G1 BLOCKED. Do not automatically set active Builder, technical ref, or new permission.

## 4. Preflight matrix (all mandatory)

| Check | Expected result |
| --- | --- |
| Owner did not explicitly ratify exact candidate/package/4 paths | BLOCK; no installation |
| An Architect uses current review-ref ActiveRole to publish directly to main | DENY; absent already effective action class |
| Historical H0 advanced before owner install | STOP; rebase/reapproval not automatic |
| Installation adds fifth path or alters original I003 state/roadmap | DENY |
| Installation copies isolated review branch commits into main history | DENY |
| Owner installation is verified H0→H1, direct one-parent, four paths exactly | ADMIN INSTALLATION VERIFIED only; no implementation clearance |
| Any new implementation plan binds H0 after H1 installed | DENY |
| Fourth Clerk state, or passive W with NextRole none | DENY |
| Owner says "merge" without exact PR W, Z/T, H1, actor and method | DENY |
| Owner receipt changes W/PR head | DENY |
| Missing atomic absent-only technical branch operation | STOP at Clerk implementation preflight |
| Detached Z has extra parent/technical state/roadmap changes | DENY |
| Expected-head ref move is only check-then-write, not provably atomic at actual gate | STOP; no casual CAS claim |
| GitHub protection/authorization denies final publication | STOP; no bypass/force |
| All later exact approvals and proofs pass and guarded update succeeds | Verify actual main outcome; never call technical PR "merged" |

## 5. Next bounded steps (not yet accomplished)

1. Preserve this package as a new Architect-authored proposal on the isolated review ref, with no change to its `.project/CURRENT_STATE.md`. Verify exact containing commit, blob, diff and both remote refs.
2. Use the Architect's documented §6 disposition: candidate 002 §2A's proposed agent installation is **rejected as unproven**, and this package's owner-executed H0→H1 administrative installation is the corrected candidate. Present both immutable identities and the final four-path contents for fresh owner ratification. Do not treat the older candidate 002 as independently executable.
3. Obtain a specific, informed owner approval for the actual final four-path administrative contents and their independently verified baseline and package identities. This is neither a new v0.3 implementation consent nor a later publication approval.
4. The owner performs the separate effective-main installation (if GitHub permissions allow), then Architect verifies it. Only after H1 proof write and self-check a complete H1-bound implementation plan and pass it to Clerk for a fresh independent Builder review. G2 atomic branch creation, G3 final main privileges/atomic expected-head behavior, and G4 independent review remain genuine stop gates.

**Unchanged absolutes:** No substantive implementation, no new technical ref/PR, no Architect direct-main write, no Iteration 004/roadmap/legacy migration, no live Plaid or financial data, no host change/purchase, no claim of G0/M0/M1 clearance. Earlier reviewed evidence remains immutable.

## 6. Architect pre-owner conflict disposition — installation actor reconciliation

**Decision: REPLACE ONLY THE INSTALLATION ACTOR IN CANDIDATE 002 §2A; DO NOT CLAIM EITHER PROPOSAL IS EFFECTIVE.** Candidate 002 describes installation by Architect only if a separately verifiable effective one-time installer exception already exists. Current main Universal Authority Preflight and the exhausted v0.1 bridge do not provide that exception. There is no honest basis to certify Architect H0→H1 permission today. Rather than creating a second self-authorizing agent exception, this package substitutes the **actual repository owner's direct, independently consented GitHub installation**. The owner is not an agent using role-based workflow grants. If repository permissions or owner willingness do not support that route, G1 remains blocked. This is an Architect-only proposed correction; it does not direct an agent to perform an owner action.

**Compatibility disposition, conditional not independent review:** The owner-execution substitution leaves Architect as later independent technical auditor and one-time filtered publisher *only after* the matching authority is effectively installed, renewed H1-bound Builder PLAN READY, Clerk and Builder execution, Architect audit, and a separate exact final publication consent. Existing Clerk states, approval-wait `NextRole ARCHITECT`, W head preservation, unique administrative owner receipt, parent-H1 Z, excluded I003 state/roadmap, no native technical PR merge, and no automatic I004 are unchanged. The generated workflow/role/project proposed additions above are aligned on this actor selection. None of these design conclusions proves live GitHub permissions, atomic missing-ref creation or true atomic ref CAS behavior.

**Explicit owner decision must approve this material delta:** ratify candidate 002 blob `513933c27a231a8d66f7dc4f67251a0834151a05` **as corrected for installation actor and operative wording by the exact current Git blob of this package** (not the former §2A Architect-installer wording); approve all four actual target-file contents and one-time owner-executed H0→H1 parent/diff; reserve a distinct exact final technical publication decision. The pending capsule must copy the owner's exact affirmative words. Unknown/contradictory scope, other actor, other parent, fifth path, changed main or tool refusal means stop.

**Pre-owner result:** Internal conflict of who installs is resolved in the corrected proposed architecture, not in effective policy or live provider access. G1 requires owner installation. G2 atomic technical-ref create-only, G3 final expected-old main/branch-policy acceptance, and G4 fresh independent Builder plan review remain open. No Clerk/Builder activation, technical branch, PR, or main ref change is appropriate now.
