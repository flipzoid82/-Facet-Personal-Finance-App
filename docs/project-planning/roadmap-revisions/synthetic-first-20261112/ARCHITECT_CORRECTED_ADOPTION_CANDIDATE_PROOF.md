# Facet — Architect Corrected Adoption Candidate Proof and Supersession

Action: ARCHITECT_PREPARE_OWNER_APPROVED_ADOPTION_CANDIDATE
ReviewKey: synthetic-first-20261112
ReviewContext: HF001_V0_3_ROADMAP_REVISION
Date: 2026-11-12 (America/Los_Angeles); exact source-message time not asserted
Status: CLEAN CORRECTED DIRECT-CHILD CANDIDATE STAGED — MAIN PUBLICATION REQUIRES FRESH EXACT OWNER CONSENT
AuthoritativeReviewRef: refs/heads/review/roadmap/synthetic-first-20261112
SourcePriorReviewVerificationCommit: fc6856f69d49f3bd003aac94caacea11580401ac
SourcePriorReviewVerificationBlob: 761df3a561cbc019d4860db9012ea7b9bfe960fa
SourceOwnerVersionApprovalReceiptCommit: 40450d9c16f3a9df719d05d6d75bd78937351a45
SourceOwnerVersionApprovalReceiptBlob: 366ae7be4f72c99e9f6b2884201c04b86e7ae7e6
ActualPassiveMainH2: 93fe29b02db169f6a31ed19d41b4b1058cb2f43e
ActualMainH2Tree: ad2b7601e9a5584f2a7d4edcb76324f53500d9c2
CorrectedAdoptionBranch: refs/heads/adoption/roadmap/synthetic-first-20261112
CorrectedAdoptionBranchHeadK: 6bda7f54157a3ee25848a66912cef4f3c6bbad32
SupersededInitialBranchStagingZ1: 7e752fde2e7d83d9ff6bc7ee4507750025c41651
FINAL_PREPARED_DIRECT_CHILD_CANDIDATE_Z: 72899784ecba17f8fabf01bbec8272b1f816d315
FINAL_PREPARED_DIRECT_CHILD_CANDIDATE_TREE: d161b7b1c198427ae10b2d32597372926d0aaa89
FinalCandidateSoleParent: 93fe29b02db169f6a31ed19d41b4b1058cb2f43e
ApprovedRoadmapPath: docs/PROJECT_ROADMAP.md
ApprovedRoadmapBlob: e97cf8a679e26bd1c0444465dc7b9ba685e5deab
AdoptionReceiptPath: docs/project-planning/roadmap-revisions/synthetic-first-20261112/ADOPTION_APPROVAL_RECEIPT.md
CorrectedAdoptionReceiptBlob: b64ba8577f626a8d7f5ee5dfb6058c10b8d75293
MainStateBlobPreserved: 944aaec92c0918b59d724140d60b8a2b1f576dd6
FirstContainingApprovedRoadmapCommit: 0577d104287c4c2ead8165912486529701a01dd1
BuilderIndependentReviewBlob: 4634dff89383e198d2ef741d9951d874aec13af4
CreativeIndependentReviewBlob: c4b367c8b350cac59939883d4648d57d30990bda
ArchitectFinalReconciliationBlob: 8d041e67c6cd5ab68ae2a3d43e702e950cd4b51c
SeparateOwnerMainPublicationConsent: NOT GIVEN
I004Authorized: false
ImplementationAuthorized: false
HistoricalG0M0M1: G0 NOT CLEARED; M0 PAUSED; M1 NOT AUTHORIZED

## 1. Why the original staged Z1 is superseded

A post-staging identity check on the first adoption receipt detected exactly one 38-character malformed, noncontrolling historical review-direction blob pointer (V01). The real original owner review direction blob is 8977ce63a0447c21ec69774c89470430457a74b5. The owner's **distinct version approval** receipt was correctly attributed even in Z1. Nevertheless, Architect did not propose publishing that imperfect adoption receipt to main and did not force-update, reset, delete or rewrite any ref.

A corrected approval-receipt blob, b64ba8577f626a8d7f5ee5dfb6058c10b8d75293, replaces only that malformed pointer. The adoption branch received an ordinary, guarded nonforce child correction K = 6bda7f54157a3ee25848a66912cef4f3c6bbad32 from original staged Z1. K changes exactly the adoption receipt; it retains the same approved roadmap and no review state. K's Git tree is d161b7b1c198427ae10b2d32597372926d0aaa89.

**To satisfy the required single-parent adoption publication shape despite K's two-commit staging history**, Architect separately created the final exact candidate commit Z = 72899784ecba17f8fabf01bbec8272b1f816d315 with ONE Git parent H2 and the EXACT SAME final tree as K. It is a prepared main-rooted commit object, **not the current adoption-branch HEAD**. Do not mistake K for the direct-child Z, approve original Z1, or casually merge the adoption branch and import unwanted history. The lawful possible publication is the separately approved direct H2→Z guarded fast-forward, not a review branch merge or K direct fast-forward.

## 2. Exact proofs rechecked after correction

- Read actual Git commits for K and Z: K has sole parent Z1; Z has sole parent H2. K tree = Z tree = d161b7b1c198427ae10b2d32597372926d0aaa89.
- The GitHub H2...Z comparison returns **ahead 1 / behind 0** and exactly TWO changed paths: docs/PROJECT_ROADMAP.md (approved owner/Builder/Creative-reviewed blob e97cf8a679e26bd1c0444465dc7b9ba685e5deab) and docs/project-planning/roadmap-revisions/synthetic-first-20261112/ADOPTION_APPROVAL_RECEIPT.md (corrected blob b64ba8577f626a8d7f5ee5dfb6058c10b8d75293).
- Actual Z file reads confirm CURRENT_STATE.md remains exactly H2 blob 944aaec92c0918b59d724140d60b8a2b1f576dd6, with no review state or review approval-receipt imported. The corrected adoption receipt has the real full 40-character original direction blob and no malformed pure-hex identity field.
- The reviewed roadmap candidate and Builder PLAN READY/Creative PRODUCT READY exact blobs are untouched. Original C01-C03 and O01 conditions apply unchanged. Correction of a pointer in a **new adoption receipt**, not the roadmap itself, does not change technical/product claims or require new Builder/Creative review.
- The corrected staging K was published to the adoption ref using expected-old-HEAD Z1 and force=false; current refs after read-back were adoption K, main H2 and review at its previous pre-correction verification head. No external financial/private source, host or payment action was used.
- Current GitHub main branch inspection at preparation found protected=false and no repository rulesets; these are **not** advance publication permission. Recheck permission, policy and main H2 immediately before any publication attempt.

## 3. Next owner decision and strict boundaries

**Only a fresh separate explicit approval naming exact Z 72899784ecba17f8fabf01bbec8272b1f816d315, Z tree d161b7b1c198427ae10b2d32597372926d0aaa89, sole parent H2 93fe29b02db169f6a31ed19d41b4b1058cb2f43e, ReviewKey synthetic-first-20261112, approved roadmap blob e97cf8a679e26bd1c0444465dc7b9ba685e5deab and exactly TWO changed paths** could authorize Architect to attempt one guarded fast-forward of refs/heads/main H2→Z using expected_sha=H2 and force=false, after rechecking all evidence and applicable branch policies. Publication permission cannot be assumed from the owner's prior exact *version* approval, this proof, the adoption branch or a technical PLAN READY / product PRODUCT READY.

On any mismatch, changed main, unknown branch policy/CAS capability, malformed approval, withdrawn direction, owner refusal or conflicting review/adoption ref, STOP for reconciliation rather than force or substitute a PR. If main is lawfully published as Q, the installed bridge still requires a **new distinct owner post-adoption reentry consent bound to actual Q** before I003 P/A2/R2/D2 can assess whether S1 is genuinely READY. No I004, implementation, host/network, bank/Plaid Item, payment or T4 proof is authorized by Z or this document.

This proof is retained on the isolated review branch only; it must not be merged into main. The adoption-only receipt and roadmap, not review control records, are the sole prospective main changes.
