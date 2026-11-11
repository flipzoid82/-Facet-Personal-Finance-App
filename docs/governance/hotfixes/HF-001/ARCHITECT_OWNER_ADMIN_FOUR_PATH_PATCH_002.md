# HF-001 — Exact owner administrative installation patch v0.2 (PREVIEW ONLY)

**STATUS: DRAFT EXACT PATCH / NOT APPLIED / NOT AN OPEN PR / NOT EFFECTIVE.**

This artifact contains **the four-file additive patch**, generated from immutable effective main H0 `99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8` and the candidate amendment package `docs/governance/hotfixes/HF-001/ARCHITECT_OWNER_ADMIN_INSTALLATION_PACKAGE_001.md` blob `d403c58875acbdc290e3be9bb0020b00ad03cfaa`. The source main and isolated review state are not modified by this patch document. **Never merge this governance review branch into main.**

This exact patch is prepared for an administrative-only branch independently created from H0, with NO review-branch history. The current role-selected review state expressly forbids Architect from opening a PR, so this patch is not an agent-created PR and does not pretend otherwise.

## Change manifest

| Path | H0 Git blob | Intended change |
| --- | --- | --- |
| `docs/WORKFLOW.md` | `8e8aea04765386b1535b30dff33e30eaf68f7f11` | Append scoped owner-installed exception only (+18 lines) |
| `chatgpt/roles/ARCHITECT.md` | `9402fb8bfe089f0886eddfc2bd306ca111b0f9c0` | Append scoped owner-installed exception only (+4 lines) |
| `chatgpt/PROJECT_INSTRUCTIONS.md` | `5a2191d23be54ec232ddf51f685d526c3f11bd74` | Append scoped owner-installed exception only (+4 lines) |
| `docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md` | absent | Create conditional source-bound owner-installation capsule (+29 lines) |

**Owner-controlled GitHub merge adaptation:** The earlier package envisioned owner approval words frozen inside the main installation commit. A future approval cannot be included verbatim before it happens without an extra commit, creating a circular step. This four-path patch instead explicitly treats a separately attributable, exact owner **squash-merge event** as the installation approval evidence, confirmed in the GitHub PR and observed afterward by Architect. This is a **material procedural clarification** and requires the owner's explicit approval of the patch/actor/method. A generic "merge" from any other actor is insufficient.

**Squash constraint:** On an owner-approved administrative PR from H0, squash to one direct-child commit. If `main` is no longer H0, changed paths exceed four, historical I003 state or accepted roadmap blobs differ, PR's head is not exact, or owner cannot verify permission, do **not** merge. A normal multi-parent merge cannot satisfy the direct-child installation contract. No automatic branch update or GitHub-native PR merge of the later substantive HF-001 technical PR is authorized.

## Exact four-file unified diff

```diff
--- a/docs/WORKFLOW.md
+++ b/docs/WORKFLOW.md
@@ -375,1 +375,19 @@
 **Verification priority:** An isolated review-ref handoff or owner statement alone can never supply this action. Only the independently verified installed main charter+workflow+role addenda and an exact role-selected review/implementation ref can jointly authorize each step. A mismatch is a reportable blocker, not an excuse to extend the exception.
+
+## HF001_OWNER_FILTERED_PUBLICATION_v0_2 — one-use owner-installed exact-head method
+
+**Installation scope and priority.** This clause is effective only if directly installed by the repository owner as a single H0→H1 commit whose parent is `99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8`, whose changed paths are exactly `docs/WORKFLOW.md`, `chatgpt/roles/ARCHITECT.md`, `chatgpt/PROJECT_INSTRUCTIONS.md`, and `docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md`, and whose immutable capsule binds separately recorded explicit owner ratification of candidate proposal Git blob `513933c27a231a8d66f7dc4f67251a0834151a05`. Owner execution of this administrative installation does not grant any agent retroactive write permission. Verify H1 on remote; preserve original I003 `.project/CURRENT_STATE.md` blob `2e3178505a3dbe9bb31ed864a17a13b0453c3e42` and accepted roadmap blob `19014633c69b976db874c50be880bfbd11c02819`. For this single HF-001 v0.3 chain, verified H1 expressly replaces the previous v0.1 bridge's fixed H0 prerequisite; all other original gates survive. The immutable capsule cannot self-reference H1.
+
+**Plan review and implementation.** Continue only from the correct active Architect governance review state and exact handoff, with a newly H1-bound implementation plan and full Architect compatibility audit. Materially revised plan candidates receive fresh Clerk `CLERK_PLAN_REVIEW_PREFLIGHT` and independent Builder `BUILDER_PLAN_REVIEW` using existing states; original cycle-003 `CHANGES REQUIRED` is not PLAN READY. No fourth Clerk state. After a fresh PLAN READY and Architect reconciliation, Clerk alone may use existing `CLERK_IMPLEMENTATION_PREFLIGHT` and an independently verified atomic create-only claim of the single `refs/heads/governance/hf-001-implementation` from H1, then a separate state-only `BUILDER_IMPLEMENTATION` release for `HF001-WP01`, with exact `BuilderWorkStartHead` and `ImplementationAuthorized true`. Absent a proven atomic missing-ref operation, STOP; available tool names are not proof.
+
+**Delivery/audit/owner wait.** Builder edits only reviewed approved technical paths and records genuine evidence; Clerk performs deterministic intake/one evidence PR; Architect independently audits actual code, regression evidence, final tree and source provenance. An audit failure follows existing Clerk/Builder correction and fresh audit. After audit PASS, the same technical ref enters a separately guarded state-only `AWAITING_HF001_MERGE_APPROVAL / ActiveRole none / NextRole ARCHITECT / ApprovalRequiredFrom USER / WorkPackage HF001-WP01 / ImplementationAuthorized false` with exact audit handoff. This passive W is not an active Architect session. The technical W ref and its PR head remain frozen after the owner request; any change invalidates the requested approval.
+
+**Audit-time filtered candidate.** Under active Architect audit authority only, prepare and independently verify prospective resulting tree T by starting at the exact H1 main tree and copying only separately approved/audited technical blobs. Exclude temporary committee/technical `.project/CURRENT_STATE.md`, unchanged original I003 state/roadmap, and all unrelated paths. Before W, Architect may create a **detached, unreferenced** single-parent Git commit Z (sole parent H1, exact tree T) solely for audit/owner decision. No Git ref move, new auxiliary branch, release assertion or automatic publication is permitted. Verify Z/T and record the literal Z SHA, tree SHA, H1 and audited path/blob set in the Architect owner-request artifact before creating W. If tool permission or tree proof fails, STOP.
+
+**Frozen owner decision.** The owner must later separately authorize the **exact** H1, Z/tree, W technical-ref SHA, PR number/head, approved file scope, and `ARCHITECT` as publisher, specifically using a **non-PR filtered Git publication** with `update_ref(main, sha=Z, expected_sha=H1, force=false)`. The older bounded implementation approval and the administrative installation are NOT this final consent. The evidence PR is never reported as natively merged by this mechanism. Unknown or negative owner decision keeps W passive.
+
+**Architect-only passive owner-decision intake.** A fresh exact affirmative owner decision while the technical W remains `ActiveRole none / NextRole ARCHITECT / ApprovalRequiredFrom USER` authorizes only the named `HF001_OWNER_PUBLICATION_DECISION_INTAKE` exception. Architect rechecks current remote H1/W/PR/Builder/Clerk/audit/Z/T and owner wording, then records a unique append-only immutable `docs/governance/hotfixes/HF-001/approvals/OWNER_FILTERED_PUBLICATION_DECISION_00X.md` on the **administrative review ref only**, using a guarded receipt-only direct-child commit and no change to its `.project/CURRENT_STATE.md`. The receipt must preserve exact owner wording and all approval bindings. This exception does not activate another role or modify W, the PR head, or main; duplicate/contradictory receipt or unavailable exact proof STOPS.
+
+**Architect-only final publication.** Only with an independently verified matching owner receipt and the exact unchanged authorized H1/W/PR/Z/T/approved scope may Architect use the distinct, one-use `HF001_FILTERED_PUBLICATION` action for a single nonforced guarded expected-old-main update to Z. A tool contract is not proof of atomicity, branch-policy permission or outcome. Before the attempt, verify that the operation's actual concurrency semantics meet the approved exact-head guarantee; otherwise STOP. No native PR squash/merge as substitute, no force, no new source head, no retry after uncertain result without read-only re-verification. On success, reread remote main and independently prove HEAD=Z, sole parent H1, tree=T, exact allowed path diff, original I003 state and accepted roadmap byte-identical, and no imported temporary history. Record truthful filtered-publication outcome on the administrative review ref. Keep the evidence PR open unless a separately authorized close exists; never claim it was natively merged.
+
+**Expiry and exclusions.** This method expires after one verified HF-001 v0.3 filtered publication and receipt reconciliation. No I004, automatic RELEASE_COMPLETE, roadmap revision, I003 legacy migration, unreviewed plan, unapproved merge, real G0/M0/M1 clearance, Plaid/bank/financial access, host/backup/device change, paid service or purchase. Any stale ref, permission failure, branch-protection failure, unproven create-only/CAS behavior, unexpected diff, missing review, wrong state/actor/approval or race STOPS, with no force or authority workaround.
--- a/chatgpt/roles/ARCHITECT.md
+++ b/chatgpt/roles/ARCHITECT.md
@@ -61,1 +61,5 @@
 **ARCHITECT ONLY:** After independent Builder implementation-plan review and Clerk completion return, reconcile original PLAN READY or changes; material edits require renewed independent review. Bind the installed bridge-bearing *current* main head (not the historical `758f0a97...` source baseline) and approved reviewed plan in a distinct handoff before later Clerk technical preflight. Independently audit Builder's exact implementation and test proof on the separate technical branch after Clerk intake; ensure no committee review-branch state/roadmap changes leak into main. Route only a passive `AWAITING_HF001_MERGE_APPROVAL` after a verified audit; no user merge consent is inferred. No Clerk or Builder impersonation.
+
+## HF001_OWNER_FILTERED_PUBLICATION_v0_2 — exactly one owner-installed exception
+
+Only when the matching `HF001_OWNER_FILTERED_PUBLICATION_v0_2` clause and immutable capsule are proven installed on effective main by an owner-controlled exact four-path direct-child H0→H1 commit, the active HF-001 review-ref Architect may revise/independently self-check the full H1-bound implementation plan and route it through existing Clerk/independent Builder review. During a separately authorized active Architect audit on the implementation ref, Architect may prepare/verify an unreferenced single-parent H1 filtered candidate Z/T without moving any ref. From an exactly verified passive technical W and fresh exact final owner decision, Architect may **only** perform the workflow-named bounded `HF001_OWNER_PUBLICATION_DECISION_INTAKE` receipt action on the isolated review ref, then the separate one-time `HF001_FILTERED_PUBLICATION` guarded main action after all proof gates. No role activation by a prompt alone, no Clerk publication, no routine GitHub PR merge, no branch bypass, no self-review and no other main authority. Failure or unknown permission means STOP; historical I003 and roadmap remain unchanged.
--- a/chatgpt/PROJECT_INSTRUCTIONS.md
+++ b/chatgpt/PROJECT_INSTRUCTIONS.md
@@ -22,1 +22,5 @@
 This action is review-only until independently current plan READY, Architect reconciliation, and later separate Clerk implementation ref release. See detailed R1–R4 in the current effective main `docs/WORKFLOW.md`. No role may use the historical committee review branch's stale workflow as an excuse to ignore new main or as permission to exceed the bridge.
+
+## HF001_OWNER_FILTERED_PUBLICATION_v0_2 — effective source exception
+
+For this exact HF-001 v0.3 chain only, a separately owner-installed and externally verified H0→H1 four-path amendment in effective main governs the named publication/decision-intake action classes even if isolated review/technical refs contain historic workflow/role copies. The exact isolated ref's current durable state and handoff still select the actor; effective main supplies **only** the narrowly installed action class. Rebind the subsequently reviewed plan, technical ref, detached candidate, audits and final owner decision to observed H1. Honor all ordinary independent Clerk/Builder/Architect separation and separate owner gates. The previous continuation bridge is not reusable installation permission; no main change or special action from this proposal alone.
--- /dev/null
+++ b/docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md
@@ -0,0 +1,29 @@
+# HF-001 — Owner-filtered publication authority v0.2 installation receipt
+
+Status: CONDITIONAL — EFFECTIVE ONLY AFTER VERIFIED OWNER APPROVAL AND FOUR-PATH INSTALLATION
+Version: HF001_OWNER_FILTERED_PUBLICATION_v0_2
+SourceMainH0: 99284c6c5820dc5cc82dd585aaa2ef4889b8d2b8
+RatifiedSubstantiveProposalPath: docs/governance/hotfixes/HF-001/PROPOSAL_REVISION_002.md
+RatifiedSubstantiveProposalBlob: 99be3ba8d9108c791e52f7b82d364ca9cfa41531
+PriorBoundedImplementationApprovalLedgerBlob: cc4520f1367316f2b9224b5f72960f1161c8af71
+AdministrativeDesignCandidatePath: docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_PROPOSAL_002.md
+AdministrativeDesignCandidateBlob: 513933c27a231a8d66f7dc4f67251a0834151a05
+CorrectedInstallationActorPackagePath: docs/governance/hotfixes/HF-001/ARCHITECT_OWNER_ADMIN_INSTALLATION_PACKAGE_001.md
+CorrectedInstallationActorPackageBlob: d403c58875acbdc290e3be9bb0020b00ad03cfaa
+OwnerInstallationActor: REPOSITORY_OWNER, acting with independently granted GitHub repository permission; NOT an Architect agent.
+OwnerInstallationDecision: Owner's affirmative and attributable GitHub merge of an exact four-file administrative PR, explicitly choosing single-parent SQUASH into unchanged H0, after reviewing this clause, the precise patch, its full resulting tree, and the corrected owner-installation actor; no agent-assumed consent.
+OwnerApprovalEvidenceLocation: GitHub PR review/merge event and merged commit SHA, independently verified and attributed by Architect after publication; owner merge is the consent event, not a claim that a pre-merge file contains future words.
+InstallationChangedPathCount: 4
+InstallationChangedPaths:
+- docs/WORKFLOW.md
+- chatgpt/roles/ARCHITECT.md
+- chatgpt/PROJECT_INSTRUCTIONS.md
+- docs/governance/hotfixes/HF-001/OWNER_FILTERED_PUBLICATION_AUTHORITY_V0.2.md
+HistoricalI003StateBlobToPreserve: 2e3178505a3dbe9bb31ed864a17a13b0453c3e42
+AcceptedRoadmapBlobToPreserve: 19014633c69b976db874c50be880bfbd11c02819
+ResultingMainH1: intentionally omitted (a commit cannot contain its own SHA)
+OwnerFinalTechnicalPublicationAuthorization: NOT GRANTED — separate exact W/PR/Z/T/H1/actor/method decision required.
+
+This receipt does not authorize implementation or publication merely by existing as a Git blob. It becomes evidence of owner-installed action-class authority only after the repository owner has affirmatively merged the exact four-file administrative changes into the unchanged H0, and Architect independently verifies the single direct-child H1, exact approved paths and file contents, owner merge attribution, preserved historic state and roadmap, and required scope and approval identities. Merge commit, rebase, imported isolated review history, changed H0, fifth path, guessed approval, or unknown GitHub controls FAIL the installation preflight. No technical PR merge may use this administrative installation procedure as authorization.
+
+The operative conditions in docs/WORKFLOW.md and matching Architect/Project contract additions are binding only upon that complete source/owner verification. This capsule is scoped to a single HF-001 v0.3 administrative amendment; it does not change the separately required independent Builder implementation-plan review, Clerk Builder activation, independent Architect audit, or final exact publication approval.
```

## Architect pre-review checks / stop conditions

- A patch is a draft, not executable effective authority. Existing Universal Authority Preflight controls until independently verified owner installation.
- Confirm SHA H0 and original source blobs above immediately before any owner-staged PR.
- Require a truly isolated owner-controlled administrative PR containing **only** these four changed paths. No `.project/CURRENT_STATE.md`, roadmap, role-other-than-Architect, Builder/Clerk state, review docs or technical implementation history.
- Require the owner to explicitly approve **this exact four-path patch and squash method** and personally perform the merge. The actual GitHub owner event, PR SHA, merge SHA, installation commit parent, tree and diff must be verified afterward.
- Confirm approved owner edit incorporates only this corrected prospective method; no Builder PLAN READY, main Z/PR technical publication or G0/M0/M1 proof is claimed.
- The repository's squash capability is advertised but is not evidence of branch-policy permission or guaranteed merge outcome. Any refusal/stale base is a STOP.
- The proposal says the eventual technical publication uses exact-old-head CAS; the connected GitHub interface advertises an expected SHA but its actual atomicity, ref protection and privileges remain UNPROVEN. The later action cannot assume those conditions PASS.
- If GH's owner installation mechanism does not produce a direct-child H1 of H0, STOP and reconcile before further changes; never rewrite or force a ref as recovery.
- All later technical branch, review, audit, exact owner technical publication, privacy, host and iteration restrictions remain effective.

## Status

**Prepared only.** This patch is a separately reviewable exact installation candidate, not a completed administrative installation, PR or approval. No execution, technical ref or main update occurred.
