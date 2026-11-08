# Project-Stage Approvals Ledger

This is the append-only record of actual project-stage user decisions before Iteration 001. Do not infer or fabricate approvals. A recorded project Discovery approval permits only the documented Creative-to-Architect project-planning handoff, not implementation or resource commitments.

## APR20261107T232700Z — PROJECT_DISCOVERY

- **Decision type:** `PROJECT_DISCOVERY`
- **Decision:** APPROVED
- **User wording:** "I approve Discovery v1.0"
- **Source:** User's explicit response in this Creative Discovery conversation on 2026-11-07 (user-designated Creative role).
- **Recorded timestamp (UTC):** `2026-11-07T23:27:00Z`
- **Approval identity:** `APR20261107T232700Z`
- **Artifact:** `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md`
- **Version:** `1.0`
- **ArtifactBlob (Git blob SHA):** `1cac418428e75a0db7a2551fd6e250dec878e473`
- **ArtifactContainingCommit:** `d3c73a734cd4d0d108fb0449324ac089fda1066e`
- **Authoritative branch:** `main`
- **Verified approval-wait HEAD before ledger commit:** `4775a33f1e413ca21999005cd2cf14bb80569309`
- **Approval subject:** Exact v1.0 proposed product direction, initial read-only Plaid-connected web-app scope, minimum useful release boundaries, candidate acceptance outcomes P01–P13, exclusions, and disclosed open feasibility/resource constraints in the identified checkpoint.
- **Authorized next action:** Creative may create an identity-bound `docs/project-planning/CREATIVE_TO_ARCHITECT.md` and separately route the current state to `READY_FOR_ARCHITECT_PROJECT_PLANNING`. Architect may then validate and enter project planning under its own role contract.
- **Not authorized:** Implementation; Iteration 001 entry; Work Packages; purchases, credentials, paid Plaid/other services, bank linking, host/network changes, deployment, or Builder work. Future roadmap and implementation approvals remain separate.
- **Supersession:** None.

## APR20261108T105904Z — PROJECT_ROADMAP

- **Decision type:** `PROJECT_ROADMAP`
- **Decision:** APPROVED — exact **conditional planning roadmap** only.
- **User wording:** "I approve Facet Project Roadmap v0.1.1 as the conditional planning roadmap, with its documented unknowns, blockers and approval boundaries. I am not authorizing Iteration 001, implementation, host changes, purchases or bank connections."
- **Source:** User's explicit approval in the ongoing Architect Facet project-planning conversation on 2026-11-08.
- **Recorded timestamp (UTC):** `2026-11-08T10:59:04Z`
- **Approval identity:** `APR20261108T105904Z`
- **Artifact:** `docs/PROJECT_ROADMAP.md`
- **Version:** `0.1.1`
- **ArtifactBlob (Git blob SHA):** `4e00d17702be6ad31b36d47491d777bc2032d77e`
- **ArtifactContainingCommit:** `01944571dbcf9b5d7cd866ec53e02d927171db9f`
- **Independent review artifact:** `docs/project-planning/BUILDER_ROADMAP_REVIEW.md`
- **ReviewBlob:** `2db66fa3d32b554f4bbfd246bb29f51d898ae937`
- **ReviewContainingCommit / BuilderTechnicalHead:** `1f2478c2cd87c017fcedf9532de86a6d820f2077`
- **Review verdict:** `PLAN READY` for a conditional project roadmap, not implementation or runtime feasibility.
- **Authoritative branch:** `main`
- **Verified approval-wait HEAD before ledger commit:** `0edb286c1d523ae978020f6ebcaaf55b3dadf500`
- **Previous approved Discovery:** `PROJECT_DISCOVERY / APR20261107T232700Z`, checkpoint v1.0 blob `1cac418428e75a0db7a2551fd6e250dec878e473`, ledger record previously preserved without modification.
- **Approval subject:** Adopt the documented conditional project-planning sequence `G0 → M0 → M1 → M2 → M3 → M4` and its evidence/stop boundaries, not success of any untested gate. Preserve real read-only Plaid, pending and unidentified transaction visibility, bill and income reconciliation, fresh-vs-stale balance distinction, and other approved Discovery v1.0 outcomes.
- **Remaining UNKNOWN/BLOCKED:** Real Production OAuth and domainless desktop/phone repair; specific bank and credit/loan field coverage; Trial allowance `0/20` versus public `10 lifetime`, billing and $0/month viability; Windows Home host encryption, CA/trust, capacity, key custody and restore; >7-day offline state completeness; provider/legal consent and retention limits; expected income's role in month-end projection. No UNKNOWN is deemed resolved by this approval.
- **Authorized next action:** Architect may commit the exact version-bound `docs/project-planning/ARCHITECT_PROJECT_PLANNING_CLOSEOUT.md` binding this **pre-existing** roadmap, review and approval ledger identities, then separately enter passive `AWAITING_ITERATION_001_DIRECTION`. Await a **distinct** explicit user direction for I001 planning; neither that future direction nor any later implementation approval is present here.
- **Not authorized:** Iteration 001 entry/direction; a WorkPackage or execution; source implementation, deployment, test host operations, admin privileges, TLS root installation, firewall or Docker/storage changes, purchases, paid services, Plaid Sandbox or Production Items, credentials or bank connections, merges, UAT or release. Host, production-data and expense permissions are separate informed owner gates.
- **Supersession:** None. Does not supersede the earlier Discovery v1.0 approval.

