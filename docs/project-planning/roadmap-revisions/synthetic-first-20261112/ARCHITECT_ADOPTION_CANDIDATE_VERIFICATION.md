# Facet — Architect Filtered Adoption Candidate Verification (Not Published)

ReviewKey: synthetic-first-20261112
ReviewContext: HF001_V0_3_ROADMAP_REVISION
Actor: ARCHITECT
VerificationDate: 2026-11-12 (America/Los_Angeles); no unobserved message clock time claimed
Purpose: Verify separate main-rooted filtered adoption candidate BEFORE asking owner for exact-Z publication approval
Status: STAGED ONLY — MAIN NOT MODIFIED — PUBLICATION APPROVAL REQUIRED
AuthoritativeReviewRef: refs/heads/review/roadmap/synthetic-first-20261112
CurrentOwnerVersionApprovalReceiptFirstContainingCommit: 40450d9c16f3a9df719d05d6d75bd78937351a45
CurrentOwnerVersionApprovalReceiptBlob: 366ae7be4f72c99e9f6b2884201c04b86e7ae7e6
OwnerVersionApprovalType: ROADMAP_REVISION_APPROVAL (not main publication)
FilteredAdoptionRef: refs/heads/adoption/roadmap/synthetic-first-20261112
FilteredAdoptionCandidateZ: 7e752fde2e7d83d9ff6bc7ee4507750025c41651
FilteredAdoptionCandidateTree: 0fc4b3d5a6ee532e23a6e80bfff15fa7f14b8d31
FilteredAdoptionCandidateOnlyParentH2: 93fe29b02db169f6a31ed19d41b4b1058cb2f43e
H2MainTree: ad2b7601e9a5584f2a7d4edcb76324f53500d9c2
MainH2CurrentStateBlobPreserved: 944aaec92c0918b59d724140d60b8a2b1f576dd6
OldAcceptedMainRoadmapBlob: 19014633c69b976db874c50be880bfbd11c02819
NewExactOwnerApprovedRoadmapBlob: e97cf8a679e26bd1c0444465dc7b9ba685e5deab
NewRoadmapOriginalFirstContainingCommit: 0577d104287c4c2ead8165912486529701a01dd1
AdoptionReceiptPath: docs/project-planning/roadmap-revisions/synthetic-first-20261112/ADOPTION_APPROVAL_RECEIPT.md
AdoptionReceiptBlob: e50f3be2157633a04e43107a3dd3ea9b781cce7c
BuilderReviewBlob: 4634dff89383e198d2ef741d9951d874aec13af4
CreativeReviewBlob: c4b367c8b350cac59939883d4648d57d30990bda
ArchitectFinalReconciliationBlob: 8d041e67c6cd5ab68ae2a3d43e702e950cd4b51c
MainPublicationDecision: NOT YET GIVEN
ImplementationAuthorized: false
I004Authorized: false

## 1. Independently observed exact Git proof

1. Remote main, the isolated review ref and separate adoption ref were independently resolved. At this verification main was exactly H2 93fe29b02db169f6a31ed19d41b4b1058cb2f43e, the review ref was the separately published exact owner-version approval receipt commit 40450d9c16f3a9df719d05d6d75bd78937351a45, and the adoption ref was the staged candidate Z 7e752fde2e7d83d9ff6bc7ee4507750025c41651.
2. The adoption ref was checked absent by an exact GitHub ref GET (404) and prefix matching ref listing (empty), then created at exactly H2 through the GitHub branch-creation operation and reread at H2 before any candidate move. No alternate or reused ref was used.
3. Z was prepared with exactly one parent H2, the confirmed H2 tree as its tree base and precisely two tree elements. GitHub's actual Git commit read confirmed its sole parent H2 and exact resulting tree 0fc4b3d5a6ee532e23a6e80bfff15fa7f14b8d31.
4. GitHub's independent commit file list and H2...Z comparison both returned exactly the same two-path whitelist: docs/PROJECT_ROADMAP.md MODIFIED to approved blob e97cf8a679e26bd1c0444465dc7b9ba685e5deab; docs/project-planning/roadmap-revisions/synthetic-first-20261112/ADOPTION_APPROVAL_RECEIPT.md ADDED as blob e50f3be2157633a04e43107a3dd3ea9b781cce7c. Comparison was ahead 1, behind 0. No further changed paths.
5. The adoption candidate contains the unmodified inherited H2 CURRENT_STATE.md blob 944aaec92c0918b59d724140d60b8a2b1f576dd6; the review control state, other review documents, and original owner-version approval receipt were NOT merged into Z. GitHub file reads independently confirmed the new candidate roadmap and adoption receipt blobs.
6. A separately guarded expected-old-head H2, nonforce update moved ONLY the adoption ref to Z; after publication the adoption ref read Z, remote main remained H2 and review remained at the owner-version approval receipt commit.
7. A read-only main branch/ruleset check reported main protected=false and an empty repository rulesets list at this stage. **These are observations only, not authorization**; freshness and GitHub policy/permissions must be independently rechecked if a later exact owner publication decision is obtained.

## 2. Ancillary receipt provenance typo (V01) — disclosed, not silently modified

A further consistency check found that the staged ADOPTION_APPROVAL_RECEIPT.md field OwnerOriginalReviewOnlyDirectionBlob contains a malformed, 38-character hexadecimal reference, 8977ce63a0447c21ec69774c89470457a74b5. The actual owner review-direction receipt has exact, independently verified 40-character blob 8977ce63a0447c21ec69774c89470430457a74b5, first containing main commit 95a826f2ad7ae0a92ca7a0987d7eced23fee6334b. This is a **wrong ancillary historic source pointer in the new adoption receipt**. It is neither the exact owner VERSION approval receipt (correctly cited in Z as blob 366ae7be4f72c99e9f6b2884201c04b86e7ae7e6) nor the exact approved roadmap (correct blob e97cf8a679e26bd1c0444465dc7b9ba685e5deab). Both independent verdicts, current source H2, same-value owner wording and permitted two-path Z diff verify independently.

**Architect materiality assessment:** V01 does not change adoption-tree scope, product/technical meaning, approved candidate, owner constraints or consent, and does not require renewing Builder/Creative review. It **is nevertheless a real documentary defect**, not a valid SHA identity. This note discloses the correct provenance for reviewers; the staged Z itself remains byte-identical and main is untouched. The owner must be told of V01 before any specific publication decision. Do not claim the malformed pointer is verified and do not silently rewrite Z, force the adoption ref, add a third adoption path or merge the review branch. If later exact publication checks or the owner require a corrected in-Z pointer, STOP and seek a lawful separate bounded correction route rather than publish the defective receipt. This note by itself does not authorize publication or waive exact-evidence requirements.

## 3. Precise review and owner approval limits

The exact reviewed v0.2.0 candidate, Builder PLAN READY and Creative PRODUCT READY did not change; Architect's final reconciliation explicitly preserved C01, C02, C03 and O01. The actual owner subsequently approved this exact version and expressly prohibited publication to main. The adoption receipt records that attribution and its limits. This staged Z does not mean the owner adopted the roadmap, authorized I004 or approved implementation.

G0 remains NOT CLEARED; M0 PAUSED / NOT CLEARED; M1 NOT AUTHORIZED. No real Plaid provider entitlement or Navy Federal Item, host T4 encryption/restore, login, financial data, purchases, installation, network/phone change, code delivery or new cost was undertaken. The accepted roadmap and prior historical approvals on main remain as they were.

## 4. Separate decision required: exact-Z publication

Only a FRESH, explicit owner's consent naming **Z 7e752fde2e7d83d9ff6bc7ee4507750025c41651**, **tree 0fc4b3d5a6ee532e23a6e80bfff15fa7f14b8d31**, **parent H2 93fe29b02db169f6a31ed19d41b4b1058cb2f43e**, **ReviewKey synthetic-first-20261112**, the approved roadmap blob and the strictly two-path whitelist may authorize a later main-rooted adoption publication attempt. Suggested method, subject to a fresh applicable-policy and atomic-concurrency check, is one nonforce expected-old-main-HEAD H2 guarded fast-forward to the exact candidate Z. No PR/merge of the full review branch or unexpected squash/rebase/history rewrite is allowed. If current main, Z tree, owner approval, branch rules or read-back mismatches, STOP rather than relax or infer consent.

After *separately* verified actual published Q, the I003 bridge still requires another fresh Q-bound post-adoption readiness reentry approval before P/A2/R2/D2; no I004 or implementation is authorized by publication alone. Do not initiate those actions without their distinct decisions and gates.
