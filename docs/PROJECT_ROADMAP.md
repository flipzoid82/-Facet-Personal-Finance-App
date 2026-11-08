# Facet — Project Roadmap (Conditional Review Candidate)

**Candidate version:** 0.1.1 — Architect revision responding to Builder PLAN CHANGES REQUIRED (R-01–R-03); **NOT APPROVED**, **NOT INDEPENDENTLY RE-REVIEWED**  
**Prepared:** 2026-11-08 by ARCHITECT  
**Repository:** `flipzoid82/-Facet-Personal-Finance-App`, authoritative `main`  
**Status at revision intake:** passive `BUILDER_PLAN_REVIEW` returned to `NextRole: ARCHITECT`, Iteration `none`, WorkPackage `none`, ImplementationAuthorized `false`; not a new role activation or implementation gate  
**Original v0.1.0 candidate:** blob `e23069eff49a3e639f8fdcde44da294045d457f5`, containing commit `398102ec8575e748648e0ec28d515bed2cb55b4f`. **Revised from returned-review remote HEAD:** `14f3da7a6b8e43615b1ab3f8c591dd7b9a4aaa11`. This revision cannot name its own containing commit.  
**Controlling Discovery:** `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md` v1.0, blob `1cac418428e75a0db7a2551fd6e250dec878e473`, containing commit `d3c73a734cd4d0d108fb0449324ac089fda1066e`; `docs/project-planning/APPROVALS.md` record `APR20261107T232700Z`, blob `6f241148236a0d7d9aade264d324ee183b60b2d2`.  
**Planning evidence:** `docs/project-planning/ARCHITECT_WORKING_DECISION_RECORD.md` blob `74ca2c0a5a5f948004ba887df0d0852a2d073b3f` and `docs/project-planning/ARCHITECT_FEASIBILITY_ASSESSMENT.md` v0.1 blob `306a666b1536e4e78c983173be4b164c3fddee49`.  
**Returned review:** `docs/project-planning/BUILDER_ROADMAP_REVIEW.md`, blob `8f6185ee949acf880c2d48d0f5d3aa00c2168d9f`, BuilderTechnicalHead `2f46a1fe953ec11912ff29cd7af880a81a135074`, verdict `PLAN CHANGES REQUIRED`; acceptance of R-01–R-03 here is Architect technical disposition, not user approval. **Governance:** `docs/WORKFLOW.md` and `chatgpt/roles/ARCHITECT.md`. This materially revised candidate requires a **fresh exact-candidate independent Builder roadmap review through Clerk** before any user approval wait. Its existence **does not authorize** a host change, install, credential use, bank connection, paid service, execution of any milestone, Iteration 001, or a Work Package.

## 1. Outcome, scope and decision boundaries

The **first useful release** must be a single-user, browser-based personal finance app on desktop and phone, with **real read-only Plaid connections** and a unified **Overview** as preferred landing page. It must support separate account and transaction inspection, every available source transaction (pending/unidentified included), recurring income/bill recognition with confirmation, a dedicated bill calendar, a quiet discovery inbox, honest account/transaction freshness and coverage, bill-payment reconciliation and user-adjustable interpretations. It must distinctly explain **available after obligations** and **projected month-end** financial figures, without silently inventing certainty or counting unconfirmed inferred *future* bills in main projections.

Checking and savings are the first institution feasibility priority; credit cards, mortgages and loans remain in approved scope to the extent actual provider coverage allows. Separate Accounts, Bills, Transactions, Income and Outlook screens and clickable account detail pages are **provisional navigation concepts**; they are not approval to expand approved product scope.

**Not required in the first useful release:** payments/transfers, multi-user accounts, native apps, budgeting, investments, elaborate long-term projections or sophisticated advice. Do not downgrade the release to mock/Sandbox/CSV-only data to avoid blocked real Plaid feasibility. Disconnected historical data is preferred retained where legally and contractually permissible, with explicit stale/disconnected flags and deletion controls.

## 2. Attributed user direction and evidence trail

The following is a faithful planning summary of the Architect consultation; the detailed record is the authoritative evidence for exact wording and changed preferences.

| Subject | User-confirmed preference or observed fact | Remaining boundary |
| --- | --- | --- |
| Cost and operation | **Prefer $0/month** additional costs; owned Dell running only when used; one-click Windows shortcut; no Windows logon startup | No approval to spend, register services or change host |
| Host OS and resources | [OBSERVED] Windows 11 **Home** build 26300.9818, ~31.7 GiB RAM; Node 24.18, pnpm 11.9, Docker 29.9.2, Compose 5.6.1, WSL 2.7.10, Docker Desktop 4.98.0 Personal | Command presence not proof of secure working production deployment |
| Storage | [OBSERVED] C: Micron NVMe SSD **48 GB free**; D: Seagate HDD **1,154.6 GB free**; existing PostgreSQL 16 Docker image and stopped legacy volume ~140.8 MB; Docker WSL disk image on C: | Final live DB placement and capacity protections unselected; preserve legacy data |
| Backups | [USER] bounded encrypted internal snapshots; periodically connected/disconnected 2 TB T7 Shield for offline encrypted backups; existing drive files untouched; printed recovery sheet stored separately; flexible reminders | Key management, safe consistency/restore, retention and installation unknown |
| Auth and device access | [USER] Facet password + remembered trusted-device sessions; phone and desktop browsers; **home Wi-Fi first**, Tailscale private access later if appropriate | LAN HTTPS and local certificate trust not installed; final hosts undecided |
| Local CA | [USER] willing to **consider** one-time guided certificate trust setup, after safety review and removal procedure; user owns **no domain** | Willingness is not permission to install root certificates/change phone or PC |
| Updates | [USER] notify and require approval for Facet app updates; no silent host/software changes | Maintenance schedule, admin privileges and service installation UNKNOWN |
| Plaid | [USER] real Plaid, read-only; open cached dated Overview instantly, sync changes in background while app runs; no always-on webhook server preferred initially | Domainless Production OAuth, required institutions, Trial limits/terms, webhook-dependent products not proven |
| Institutions | [OBSERVED] Navy Federal, U.S. Bank, CIT Bank listed; U.S. Bank incident banner with unavailable details; Trial Home says **Free trial 0/20**, automatic bank access | Directory and counter are not a successful Item, OAuth entitlement or guaranteed $0 indefinitely |
| Account views | [USER] user-selected checking/savings accounts determine available funds; combined and per-account transactions, original data visible | Account type coverage and availability field semantics to test |
| Corrections/reconciliation | [USER] automatic strong bill and income matches; ambiguous cases to Discovery Inbox; user-adjustable labels/category/notes/bill matching; flag suspicious source amounts/dates without mutating source; opt-in reuse rules | Matching confidence, pending-to-posted reconciliation and evidence must be tested |
| Credit cards | [USER] monthly confirmed planned payment; previous amount suggested but not silently accepted; pending confirmation show verified minimum vs prior plan as distinct estimates if data available | Source availability of due dates/minima and accounting/double-counting to test |
| Freshness | [USER] separate last-known total and fresh-data subtotal; context-aware freshness classifications rather than hard-coded age alone | Source timestamps and freshness criteria UNKNOWN |
| Forecast | [USER] expected income displayed separately from money already available | **Expected income included or excluded from month-end projection = UNDECIDED**. Cannot assign product meaning without user/Creative route |

## 3. Architectural alternatives and decision status

No final hosting/runtime choice has been made. Comparison is a **proposed** ranking for review, not settled vendor/design authority.

| Decision | Leading evaluation candidate | Meaningful alternative | Cost/owner/security consequence | Evidence/status |
| --- | --- | --- | --- | --- |
| Application runtime | Native Windows Node.js/production Next.js plus one-click launcher | Fully Dockerized app | Fewer app containers vs possibly more direct Windows process maintenance; packaging/support lifecycle not verified | Candidate only |
| Database | Separate PostgreSQL instance/volume using Docker Desktop WSL2 | Supported native DB or alternate engine | Reuses earlier Prisma/Postgres knowledge, but Docker processes, data protection and resource consumption require validation; no exposed DB port | Candidate only |
| Live storage | NVMe on C: only with reserve monitoring/caps and backup isolation | D: HDD if measured performance and durability acceptable | Speed vs 48-GB free-space constraint; moving Docker image may impact legacy project and demand preservation plan | Unknown |
| LAN security | HTTPS reverse proxy, e.g. Caddy local CA; Facet login required | Domain/certificate with private DNS, or other validated private HTTPS scheme | No domain owned; trusting private CA requires explicit guided OS/phone trust actions, CA-key protection and reversal | Conditional; not selected |
| Plaid connectivity | Browser-native Link popup/new-tab OAuth where supported; server-side Plaid tokens; on-launch cursor catch-up | Registered redirect and/or permitted external endpoint, if mandatory | Critical tradeoffs across no-domain, cost, exposure, offline operation, browser behavior; no real proof | **Critical blocker to production-viability claim** |
| Sync timing | On-launch sync and while-running refresh with cursor idempotency/failure recovery; no 24/7 server | Online webhook receiver | Less maintenance/cost initially but longer delays, Item readiness and other webhook dependencies must be proven | Conditional |
| Recovery | Encrypted consistent internal snapshots on D: plus independent T7 backup after user connects it | Another securely maintained storage/recovery arrangement | Restore testing, key custody, encryption, file separation and old data preservation; no service installs authorized | Conditional |
| Remote reach | Local Wi-Fi now, no port forwarding; avoid hardcoded origins | Future private Tailscale, not public app hosting | Later network/cert tests likely; must not require DB/UI rewrite | User-preferred staged direction |

**No adoption of a Home → Pro, paid Plaid upgrade, domain purchase, public endpoint, new driver/service, certificate authority, Windows firewall change or user credential use is approved.** Any such burden is a **conditional uncommitted dependency** and requires a specific subsequent informed decision (plus ordinary authorized implementation gates).

## 4. Roadmap stages and dependency order (planning, not numbered Iterations)

Stage IDs below identify an **ordered conceptual path**; they are not the first user's Iteration 001 direction and do not authorize Builder work. Each future numbered iteration and Work Package must be planned and approved under normal governance.

### G0 — Read-only Production-path documentary screen (mandatory pre-M0 gate; R-01)

**Goal:** Before asking for new root-certificate trust, firewall changes, Docker storage relocation, service installation, or host/phone changes, determine whether there is a **credible** real Plaid Production route under the user's preferred no-domain, home-Wi-Fi-first, on-demand, read-only and $0/month envelope.

**Read-only evidence required:** Plaid account-specific Trial status, lifetime Item allowance and product entitlement, allowable Production redirect URI forms and whether a redirectless popup route remains feasible for required institutions; available public institution/product/OAuth/consent/repair evidence for Navy Federal and U.S. Bank (CIT only if its inclusion is user-confirmed); account-level data fields that cannot be known without a connection clearly marked UNKNOWN; initial transaction availability and other webhook-dependent states; costs and non-replenishing Item implications. Evidence may come from sanitized owner Dashboard views, Plaid official documentation or provider support without credentials, upgrades, tests, or real Items. **Do not describe institution listing or Trial 0/20 as actual connection proof.**

**Pass-to-explore condition:** A reasoned feasible hypothesis for desktop and phone browser Link and update-mode repair, honest UNKNOWNs requiring later separately consented tests, and no identified mandatory unaccepted cost/exposure/privilege burden. **This permits consideration of M0 only after its own later plan/approval/host consent; it does not clear Production.** If there is no credible route inside accepted constraints, stop before invasive M0 setup and present user-facing options and cost/security tradeoffs. No downgrade to mock-only product or invented Production success.


### M0 — Reproducible secure, synthetic feasibility slice (proposed first milestone)

**Goal:** Determine whether the owned Windows 11 Home environment can securely support a single-user, on-demand Facet web runtime and reliable recovery **before** putting real financial information at risk.

**Dependency:** Only after G0 documentary screen finds a credible but still unproven Production-path hypothesis, and after this **v0.1.1** candidate undergoes fresh independent Builder roadmap review and explicit user roadmap approval, a separate Iteration 001 direction, detailed Work Package plan/review and **separate exact implementation approval** are required before any tests that install software or change the host. Any admin/network/certificate actions require their own informed opt-in.

**Candidate evidence/acceptance:** With clearly labeled fake data and Plaid Sandbox only, and after separately authorized owner-host steps, show a reproducible one-click launch/stop of project-specific services; secured, LAN-only HTTPS from both Dell and phone with no public exposure; server-side authentication and protected sessions; separate database from old PersonalFinanceApp; safe first-sync/retry and pending-to-posted correction persistence across restart; encrypted, consistent and independently **restorable** synthetic backup, bounded storage use, safe key custody, a **selected and testable live-database-at-rest protection boundary** for eventual financial records on the actual selected C:/D:/WSL storage, and explicit failure messages. Before any real data, require attributable verification of Windows 11 Home Device Encryption eligibility, enabled status and actual covered volumes (do not assume Windows Pro BitLocker), or an independently defensible alternative with its own disclosed security/maintenance burden. Test least-privilege DB/file/process access, protected token/backup keys isolated from encrypted backup data, safe recovery-key custody, and **restore of both synthetic database and necessary encrypted application state** without exposing secrets. Report exact Windows Home prerequisites, permissions, resource/cost usage, stop/reversal and limitations. Neither user device trust nor host modification is assumed already granted.

**Out-of-scope proof:** Sandbox does **not** prove Navy Federal/U.S. Bank/CIT Production OAuth, real bank balances, indefinite $0 provider entitlement or real-data retention law. If M0 cannot be proven safely within owner permissions, stop or propose a revised option for review, not a workaround that silently changes product meaning.

**Conditional exit (R-02):** Architectural feasibility evidence with pass/fail/blocked matrix; tested synthetic full-state recovery and a defensible live-data encryption plan tied to actual storage. If live-data encryption/keys/restore cannot be safely proven, **M1 Production input stays BLOCKED**, regardless of green Sandbox or encrypted backup evidence. Any admin, encryption or device change needs its own explicit future owner permission; refusal/unavailable protection remains BLOCKED. All critical Production blockers remain blockers. Passing M0 **does not** equal authorization for Production Items or a usable real-bank release.

### M1 — Plaid Production path decision and safe user-consent gate

**Goal:** Confirm an acceptable real read-only Plaid connection path, including **Navy Federal/U.S. Bank/CIT as applicable**, first checking and savings, with provider products/fees and OAuth UX matching the approved use case.

**Dependencies:** G0 documentation and M0 evidence where relevant; **mandatory M1 entry gate: live PostgreSQL records encrypted at rest on their actual physical/WSL storage with attributable owner-host proof, separately encrypted Plaid tokens and backups, independent custody and tested recovery for DB plus application encrypted state, plus accepted key-loss recovery and least-privilege access**. A successful backup alone is not live database encryption. If these conditions are absent or user declines necessary privileged setup, no Production data may enter Facet. Require provider documentation and actual account entitlement; user consultation on any domain/online/paid exposure or new certificate/network burden; separate real account consent and explicit acknowledgment of Trial Item lifetime implications **before** creating a Production Item. A Production connection may be refused or blocked; no automatic trial consumption.

**Candidate evidence/acceptance:** Exact target institution discovery and product support, browser-based OAuth on desktop/phone, redirect handling and reauthorization, credential storage/revocation, actual per-account balances and sync/freshness, legal data retention rules, cost status, and the **R-03 no-webhook product/state completeness matrix** below. Never interpret a successful sync request as a fresh source update. If scope cannot be supported safely and within the user's accepted envelope, **mark BLOCKED** and request a material owner/Creative decision. Do not replace required real Plaid data with fake data.

### M2 — Account/transaction foundation and correction persistence

**Goal:** Deliver explainable aggregated and per-account balances and complete visible source activity, with all pending/unidentified transactions, no hidden filtering or false balance assumptions.

**Dependencies:** M1 acceptable actual connection path and fields **and R-03 state-recovery matrix evidence**; G0 and M0 data/runtime proof; acceptance of rules from approved Discovery.

**Candidate evidence/acceptance:** Show reconciled state after restart and **more than seven days with Facet off**, including how each required field becomes current, stale, unknown or requires user repair. Prove cursor pagination persistence/restart, idempotence and pending replacement; demonstrate account and Item changes independently of Transactions. Overview account breakdown, account detail pages, this-month combined and per-account activity, correct pending/posted reconciliation and cursor checkpoints, source/user override separation, editable categories/names/notes/associations and flag-only source errors; approved user rules applied predictably; last-known versus fresh-data subtotals and freshness coverage explained. Never double-count inter-account transfers, refunds or card payments.

### M3 — Confirmed bills, income and discovery workflow

**Goal:** Discover and allow user verification of recurring bills/income; show bills calendar, paid/potentially overdue explanations, quiet discovery inbox and deposited vs expected income.

**Dependencies:** Reliable M2 transactions/reconciliation and account coverage; verified due-date/minimum/payment data availability or honest missing-data states.

**Candidate evidence/acceptance:** Strong match and low-confidence confirmation, correction/reversal, card planned payments with monthly user confirmation and preconfirmation scenario estimates, income matching without duplicates, recurring pattern one-time approval and material-change review. Unconfirmed inferred **future** bills excluded from main obligations/projections; recorded transactions never disappear.

### M4 — Explainable financial outlook and integrated first-use release readiness

**Goal:** Deliver the approved currently-available-after-obligations and distinct month-end Outlook, explain transaction/category assumptions and data gaps, plus coherent Overview linking to details.

**Dependencies:** M2+M3 coverage and robust correction behavior; **explicit resolution of expected-income effect on month-end projection**, through the appropriate user/Creative authority; proven backup/restore, protected credentials, recoverable offline operation, maintainability, and cost/license constraints.

**Candidate evidence/acceptance:** Account-selected available cash, accepted obligations and non-double-counted payment handling; distinct forecast with all inputs and assumptions; freshness warnings, incomplete balances and consistent recomputation; desktop/phone UX; repeatable one-click start/stop, backup failure handling and trusted device sessions; independent testing and user review according to governance. Real-account capability and approved product scope **cannot** be waived by a well-made mock UI.

### After the first useful release — explicitly deferred

Explore Tailscale private remote access, additional budgeting, investments, complex advice, richer custom dashboards and native apps **only through later user-involved planning**. Do not treat these as approved future commitments or change the initial cost/privacy envelope.

## 5. First milestone proof and known external constraints

The **first planning proof is G0: documentary-only Provider/Production-path screening**, with no installation or Item use. The **earliest host technical proof** after a credible G0 result is M0 with strictly synthetic records, an isolated new DB, Sandbox credentials only if separately authorized later, and a temporary user-approved test setup. There is **no authority to perform M0 now**. It is conditional specifically because:
- Windows Home, package versions, Docker Desktop Personal license applicability, and WSL/network/cert behavior need practical tests; the submitted PowerShell inventory proves installed tooling, not all application operations.
- No domain exists; private CA has root-of-trust risks; phone browser acceptance/renewal/removal have not been verified; earlier user said a one-time guided install could be considered, *not* approved.
- No acceptable Production OAuth redirect path or all-required institution coverage proven; no universal assumption that popup OAuth works.
- Plaid Dashboard displayed **Free Trial, 0/20** and automatic bank access. This conflicts with public default 10 lifetime Items; exact contractual allowance, non-replenishment, and any lifetime/free-fee conditions remain unresolved. No hidden request for plan upgrade.
- Current Docker disk image is on C:, and the old project volume must remain intact. PostgreSQL's new volume and future secure storage/recovery are not provisioned.
- User may decline host privileges, router/DNS/certificate changes or paid services. If refusal blocks required in-scope behavior, stop and present options, do not proceed anyway.
- Financial-data retention on account disconnect is subject to Plaid/provider obligations; user preference is not proof of unconditional legal permission.
- Projected income effect on the month-end forecast is explicitly undecided; do not decide by technical convenience.

## 6. Technical/security and operational acceptance across milestones

- **Security (R-02):** block any real financial record ingress until **live database-at-rest protection** is selected and empirically verified on Windows 11 Home actual volumes; encrypt tokens and backups independently, keep and recover necessary app keys separately, verify synthetic whole-state restore and least-privilege access; never infer live-data encryption from backup encryption. Minimize network binding and exposed ports; HTTPS with intentional certificate trust and removal; robust Facet password hashing, cookie and session revocation, CSRF/origin protections, rate limiting and audit-friendly safe logs; independent authenticated encryption for Plaid credentials and backups; no secret in Git/console/browser storage.
- **No-webhook completeness (R-03):** require the product/state evidence matrix below and offline gap/restart tests beyond seven days; a healthy Transactions cursor alone cannot clear account, consent, error, balance, loan or product-specific completeness.
- **Data fidelity:** preserve source payload/IDs and user interpretation provenance, no hidden transactions, idempotent incremental sync and transaction deletion/replacement reconciliation, no duplicate transfer/refund/payment accounting. Data quality and source freshness communicated, not presumed.
- **Backup:** consistent encrypted snapshots with bounded space/retention, testing of a restore without touching the live database, safe external T7 drive identity validation and separate folder; protect existing drive data and printed recovery key held apart.
- **Operations:** one-click bounded start/stop, errors surfaced, no silent updates, no silently installed services or boot-time startup, predictable crash recovery, documented user maintenance and rollback. Host permission, license and operating costs disclosed before acceptance.
- **Privacy and governance:** no public financial web server; isolate from legacy project; no unapproved Production bank accounts; user retains app-level ability to correct classifications and revoke credentials; no user-edited source amounts/date substituted into bank truth. Any conflict with approved product meaning returns through Creative.
- **Proof quality:** document actual commands/environments and sanitized observed results, not only architectural plausibility or mock screenshots. Distinguish static document proof from Windows/phone physical evidence and real bank OAuth evidence; any missing proof stays BLOCKED.

## 7. Open decision register (do not fill by inference)

| ID | Material open item | Resolution owner / prerequisite |
| --- | --- | --- |
| U-01 | Final runtime and hosting/DB technology; C: SSD vs D: HDD placement; performance/headroom threshold | Architect technical comparison and independent Builder challenge; consult owner on maintenance/privilege burden |
| U-02 | Exact local HTTPS naming, CA root/trust device setup, certificate protection, renewal, removal | Architect feasibility and later explicit owner permission for physical setup |
| U-03 | Production OAuth on domainless LAN for required financial institutions; redirects, reconnection and webhook dependencies | Plaid/provider evidence; bounded separately authorized tests; material alternative requires user decision |
| U-04 | Account-specific Plaid Free Trial contracts, 0/20 display vs published 10 lifetime, cost and ongoing license | Provider terms/user evidence; no upgrade or Item use without separate consent |
| U-05 | Encryption of live data, credential key custody, backup consistency/restore/retention and legally permissible historical retention | Security/technical proof; privacy/contract review; Creative if approved product meaning must change |
| U-06 | Installation privileges, Windows/Home/WSL/Docker changes, phone trust-store admin, upkeep | USER consent is conditional and uncommitted; final steps disclosed individually |
| U-07 | Whether expected future income contributes to month-end projected cash flow | USER + Creative product decision when necessary; **UNKNOWN**, no fixed formula |
| U-08 | U.S. Bank active incident details, CIT Bank required account scope, actual account-level coverage | Provider-specific evidence; no forced repeated dashboard actions |
| U-09 | Precise account freshness thresholds and credit-card minimum/due date coverage | Technical/product validation, clear unknown data handling |

## 8. R-03 — No-webhook state-recovery proof matrix (mandatory M1/M2 gate)

The on-demand design cannot assume receipt of webhooks while Dell is off. For each required provider/institution capability, the future exact plan must name a **documented status/poll API, recoverable cursor, or user-visible UNKNOWN/error**; any required state that cannot be recovered without an online receiver blocks the affected release outcome and requires Architect/user options rather than silent loss of data. Production-specific proof is separately gated by consent.

| Required state | Recovery approach to substantiate (not yet tested) | Observable acceptance / failure state |
| --- | --- | --- |
| Initial Transactions history readiness | Status/result behavior for asynchronous history plus repeated eligible sync while running; explicit not-ready handling | Show data pending or incomplete, never falsely assert all transactions retrieved |
| Added/modified/removed transactions and pending→posted | Persist cursor only with successfully committed page/state; cover paginated `has_more`, `TRANSACTIONS_SYNC_MUTATION_DURING_PAGINATION` restart and idempotent upserts/deletes | No hidden/duplicated source items, corrections retained when transaction identities change; restart safe |
| Accounts added, removed, closed or disconnected | Evaluate a documented account/Item listing or status route independent of cursor; account identity reconciliation | Stale/removed clearly labeled; don't silently hide transactions or invent current balance |
| Balance current/available age | Distinguish cached balance retrieval and source-reported actual refresh timestamps; provider-specific availability | Source age and partial coverage visible; no false 'fresh' from a successful API response |
| Item errors, reauthentication and consent | Poll Item status/error/consent expiry when app runs; verify update-mode recovery and phone return | Reauthorization action surfaced; cannot imply active consent during an offline gap |
| Credit and mortgage/loan coverage | Per-product fields/availability and error/status checks where supported; respect approved scope and actual provider limits | Explicit unsupported/unknown flags; don't invent minimums, due dates or liabilities |
| Other non-Transactions notifications after >7 days offline | Identify which events are recoverable from current authoritative state and which are not; do not rely on limited webhook history | Durable rebuild/reconcile where possible; otherwise material missing-state condition and BLOCKED release outcome |

**Test gate:** synthetic/Sandbox simulated extended outage and process crash; then separately approved Production/device verification for bank-specific behavior. Record exact API versions, observed results, freshness timestamps, correction preservation, zero data-loss assumptions and explicit unknowns. Initial data readiness, individual institution consent, phone repair and available account fields **must each have independent proof**. If any mandatory state has no recoverable on-demand path, stop before first-use release and return network/availability/cost options to the user through the governing route.

## 9. Risks, stop conditions and independent review requests

**Critical risks:** 1) real-provider OAuth cannot work on secure no-domain LAN for required institutions; 2) supposedly free usage requires paid plan or new domain/service that user declines; 3) retention/privacy/security conflict with approved product obligations; 4) inability to ensure safe encrypted backup/restore without changing host in unaccepted ways.

**Stop, do not silently compensate:** If critical risk remains unproven when acceptance requires it, mark BLOCKED; present technically credible, costed alternatives and consult the user, or invoke bounded Architect → Creative return if approved product meaning changes. Do not route fake implementation approval from a "review ready" document.

**Independent Builder roadmap-review questions, routed only through Clerk:**
1. Are Windows **11 Home** (not Pro), Node 24, Docker Desktop Personal/WSL2, database/storage placement and licensing sufficient within on-demand $0/month operation?
2. Can authenticated HTTPS work on home LAN for Dell + phone with a defendable local-CA/key rotation/CA-removal approach, without public exposure or a domain? Enumerate admin/phone/user steps.
3. Does Plaid's browser OAuth support **all required initial bank flows** without a domain, registered redirect or always-online receiver? Precisely identify what is documented, hypothetical and only provable by a separately authorized real Item test.
4. Is cursor-based catch-up sufficient for required data and reconnects after extended power-off? Identify nontransaction webhook gaps, initial history, consent and billing limits.
5. Can a separate PostgreSQL instance and encrypted, recoverable backups be configured without touching legacy volumes/T7 contents, leaking secrets or exhausting C:?
6. Are stage ordering, M0 milestone evidence, owner maintenance/installation burdens and refusal/stop conditions realistic? What should be reconsulted before final roadmap approval?
7. Does any proposed technical convenience contradict approved Discovery or assign the undecided forecast question without Creative/user authority?

**Review target:** Feasibility verdict with PASS / CONDITIONAL / BLOCKED for each major assumption, concrete constraints and recommended changes. An independent technical verdict is not an approval, host test, account connection, license purchase or implementation.

## 10. Change and authorization boundaries

This document is **v0.1.1 revised review candidate**, not final. It incorporates independent Builder R-01 (documentary gate), R-02 (live encryption/whole-state restore before real data), and R-03 (no-webhook product/state matrix). These gates impose **no presently accepted or authorized device, privilege, service, bank or cost change**; all require separate consent when actually proposed. Any material change to its feasibility claims requires a current exact-candidate independent review; any new material user burden requires reconsultation. Upon Builder return, Architect must compare evidence and resolve or mark UNKNOWN items before submitting an exact, reviewed candidate for explicit user approval. That approval, if later given, still **does not** authorize Iteration 001 direction, Work Package implementation, real financial connection or host modifications; each has a separate gate under `docs/WORKFLOW.md`.

**Final candidate status: CONDITIONAL — NOT APPROVED, NOT IMPLEMENTATION READY.**
