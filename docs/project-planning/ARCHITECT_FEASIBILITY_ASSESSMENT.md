# Facet — Conditional Architecture Feasibility Assessment

**Version:** 0.1 — initial architectural feasibility assessment  
**Prepared:** 2026-11-08  
**Role:** ARCHITECT, project-stage consultation  
**Project:** [Facet] Personal Finance App  
**Authority:** `ARCHITECT_PROJECT_PLANNING`, Iteration `none`, WorkPackage `none`, ImplementationAuthorized `false`.  
**Source snapshot:** authorized remote `main` at `415524c9b31e38e0525280e3181a7cccb3bd3ee7` before this document was created.  
**Approved product truth:** `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md` blob `1cac418428e75a0db7a2551fd6e250dec878e473`, approved in `docs/project-planning/APPROVALS.md`, record `APR20261107T232700Z`.  
**Consultation evidence:** `docs/project-planning/ARCHITECT_WORKING_DECISION_RECORD.md` blob `74ca2c0a5a5f948004ba887df0d0852a2d073b3f` (working record; not approval).  
**Status:** **CONDITIONAL / NOT IMPLEMENTATION-READY**. This document is a feasibility assessment, **not** `docs/PROJECT_ROADMAP.md`, a settled hosting decision, a Builder review verdict, a product change, a plan approval, an instruction to connect banks, or authorization for any local computer action.

## 1. Executive conclusion

A self-hosted, browser-based, single-user financial application operating on the user's existing Windows 11 Home Dell **looks technically plausible** within the desired on-demand, home-Wi-Fi-first operating model. A Windows Node.js/Next.js web server with a separately isolated PostgreSQL database in Docker is presently a **leading evaluation candidate**, because compatible tools exist and the user's earlier reference project already uses this general combination. It is **not yet chosen**.

The **largest release feasibility gate is real Plaid Production connectivity**, especially OAuth for target institutions when Facet has no domain and is available only on the user's private home LAN. Plaid's web OAuth guide permits popup/new-tab flows without a configured redirect URI in some desktop/mobile browser situations, but Plaid's troubleshooting guidance identifies absent redirect registration as a possible institution-visibility failure. A local TLS certificate and no-domain LAN URL do **not** prove that this use case works for the user's institutions. If the approved real-connection requirement cannot be satisfied within the accepted cost/security/availability envelope, pause and present alternative options; do not downgrade the product to Sandbox/mock/manual-only.

Other material gates are secure LAN HTTPS, credential encryption and recovery, consistent backups with verified restore, data/consent retention obligations, storage headroom, and actual host/browser/institution behavior. **No current evidence proves production readiness.**

## 2. Evidence classification

- **USER-CONFIRMED:** preferences specifically confirmed in the Architect consultation, preserved in the working decision record.
- **HOST-OBSERVED:** user-supplied screenshots and read-only PowerShell / Docker output; no Architect-controlled host inspection was performed.
- **SOURCE-DOCUMENTED:** official vendor documentation or inspected prior repository, not a live demonstration.
- **CANDIDATE:** a technical option for evaluation, not user selection or approval.
- **UNKNOWN / BLOCKED:** prerequisite not established and may limit a real release.

## 3. Requirements envelope — must be maintained

1. Browser app for **desktop and phone**, one user; **Overview** first, separate Accounts/Bills/Transactions/Income/Outlook details provisional. Show all available provider transactions, preserve provider facts, user corrections and transparent uncertain data.
2. **Real Plaid** connection is required for the first useful release; checking and savings are first verification priority, not the only accounts required. Credit cards, mortgages and loans remain part of approved scope subject to provider support. **Read-only**; no money movement, bill pay or transaction manipulation at the institution.
3. **$0/month preferred** for new hosting, Plaid, and third-party services, without assuming entitlement or authorizing paid features. Existing Dell and home internet are accepted as owned resources; power use and maintenance remain real obligations.
4. Availability only while Dell is powered on; **one-click Windows startup** preferred, no background 24/7 service required. Open the Overview immediately with time-labeled local records; catch up asynchronously through Plaid when the app runs.
5. **Home Wi-Fi access for initial release**, with no public application exposure; private Tailscale remote access is a deferred option to preserve, not authorize now. Facet password and remembered trusted-device sessions remain required.
6. Protected records, reversible user correction rules, automatic bounded encrypted internal recovery snapshots, and **periodic encrypted external backup** to the user's existing Samsung T7 Shield. Existing files on that drive and legacy Docker database volume **must not be moved, deleted, formatted or overwritten**. Separate printed recovery sheet at home is acceptable with clear key-separation design.
7. Updates require explicit owner approval; no new domain, software installation, certificate trust, firewall/network change, elevated action, host migration, API calls using credentials, or financial account connection has been authorized.
8. **Projected-income effect on month-end calculation remains UNDECIDED**. Other user-confirmed accounting and data-freshness choices remain in the working record; this assessment does not settle product meaning.

## 4. Verified environment and reference implementation

| Item | Observation and consequence | Evidence |
| --- | --- | --- |
| OS and resources | Windows 11 Home, build 10.0.26300.9818; ~31.7 GiB RAM. Suitable candidate, full installation suitability not tested. | HOST-OBSERVED |
| Tools | Node v24.18.0, pnpm 11.9.0, Docker CLI 29.9.2, Compose v5.6.1, WSL 2.7.10.0; Docker Desktop Personal v4.98.0 engine running at screenshot time. Command/version presence is not application compatibility or license/operating proof. | HOST-OBSERVED |
| C: | NVMe Micron 2300 SSD, ~48 GB free. Fast, but low headroom for database growth and Docker/Windows virtual disk expansion. | HOST-OBSERVED |
| D: | Internal Seagate ST2000DM008 HDD, NTFS, ~1,154.6 GB free. Suitable capacity candidate for controlled snapshots, files and perhaps a database only after performance/filesystem testing. | HOST-OBSERVED |
| External T7 | Samsung T7 Shield, 2 TB external SSD; periodically attached, existing content valuable. No automatic/always-mounted backup assumption. | USER-CONFIRMED / HOST-OBSERVED |
| Docker location | Docker WSL disk image on C:, with ~2.63 GB reported use during screenshot and Resource Saver enabled. ~1 TB virtual capacity indicator is **not consumed space**. | HOST-OBSERVED |
| Existing Docker data | Stopped `personalfinanceapp-postgres-1` PostgreSQL 16 Alpine, image ~419.6 MB and legacy volume `personalfinanceapp_finance_postgres_data` ~140.8 MB. Preserve old environment; no data purge, no migration. | HOST-OBSERVED |
| Previous code | `flipzoid82/PersonalFinanceApp` includes Next.js 16, Prisma/PostgreSQL 16, PowerShell launcher concept and Sandbox-only Plaid. Existing development password and published database port **must not be copied** into a real-finance setup. | REFERENCE |

## 5. Candidate architecture and options — not finalized

| Layer | Leading candidate | Alternative / constraint | Status |
| --- | --- | --- | --- |
| Application | Node.js server on Windows with a production-built Next.js app and one-click launcher | Fully Dockerized server, or another validated secure runtime; not reuse `next dev` as production | CANDIDATE |
| Database | Separate, least-privilege PostgreSQL 16 instance/volume via Docker, not shared with legacy project | Native database or another suitably secure engine after comparative proof | CANDIDATE |
| Live DB placement | Consider NVMe/C: for responsiveness **only with safe disk reserve, capacity monitoring and bounded growth** | D:/HDD for database if test demonstrates adequate latency, integrity, durability, and supported Docker storage semantics | UNKNOWN |
| Internal snapshots | Encrypted, consistent bounded recovery artifacts on D:, with restore testing | Alternative redundant storage location after capacity/privacy review; same-PC disk is not disaster recovery | CANDIDATE |
| External backups | Encrypted, manually connected/disconnected T7 in a separate folder, key kept separate | None approved that sacrifices existing files | USER-CONFIRMED |
| Local HTTPS | Reverse proxy such as Caddy with local CA and protected key; controlled LAN bind; device trust reviewed | Publicly trusted domain/certificate would require a domain/DNS and extra owner obligation; no domain currently owned | CANDIDATE |
| Login/session | Facet-specific password, secure session cookies, trusted-device controls, timeouts/revocation and sensitive-action reauthentication | Network trust is never a replacement for app login | USER-CONFIRMED intent / detailed security UNKNOWN |
| Plaid connection | Browser-native Link and server-side credentials, explore popup/new-tab OAuth and optional/no public webhook topology | Registered redirect/public routing may be needed for institution/phone compatibility; cannot assume without proof | CRITICAL UNKNOWN |
| Sync | Cursor-based `/transactions/sync` catch-up on launch, full reconciliation and freshness display, supported account/status checks | Always-online webhook receiver deferred unless proven necessary to meet approved scope | USER-CONFIRMED direction / runtime UNKNOWN |
| Future remote | Avoid hard-coded LAN-only origins and assumptions so a private Tailscale proxy can be evaluated later | Not part of initial launch and no installation authorized | DEFERRED |

### Key isolation and recovery constraints

An encrypted external backup is **not evidence that the live PostgreSQL database is encrypted at rest**. Evaluate Windows device/disk encryption availability on this exact Home edition, file/field/token encryption, access-control boundaries, key custody and backup key recovery without plaintext secret leakage. Protect sensitive Plaid access tokens server-side with authenticated encryption and independent keys. Never embed secrets in the browser, repository, scripts, backups without encryption, or diagnostic screenshots.

Backups require transactionally consistent database export/snapshot procedures, integrity checks, retention and **demonstrated restore** on synthetic/non-sensitive data before any real financial data operation. Storing automatic snapshots on D: helps against some failures but does not protect against total PC loss; offline T7 backups are a separate layer.

### Network and OAuth caveats

Caddy supports local certificate issuance for internal names and IP addresses, but each accessing device must trust the CA root; trust-store administration and protection/removal of the signing key require explicit owner consent. Security-sensitive authenticated mobile browser sessions need HTTPS, correct cookie attributes, CSRF and origin protections; LAN binding and firewall rules must prevent unintended inbound exposure. Avoid publishing PostgreSQL's host port.

Plaid's official guide states web OAuth often works without a redirect URI by popup/new tab, while its troubleshooting guide also lists missing registered redirects when OAuth institutions disappear. This **contradiction in practical compatibility is unresolved**, not resolved by a green dashboard institution listing. Target bank consent flows, popup blockers, mobile browser behavior and reauthentication are untested. Do not use an embedded webview in lieu of proper Link support.

Transactions changes can be recovered with cursor-based `/transactions/sync` after offline intervals; this does **not** guarantee that a freshly connected Item has already completed initial history retrieval or that Plaid has recently queried the institution. Some non-Transactions webhook events can be listed for a limited recent period (currently seven days via beta endpoint), so an app offline longer than that must not rely solely on webhook replay. Every required provider product and Item repair flow needs separate viability assessment.

## 6. Institution / plan evidence

| Institution or service | Documented and observed | Unverified |
| --- | --- | --- |
| Navy Federal | Plaid institution support documented for Transactions/Balance; OAuth institution; visible on user's Dashboard | Real Item login, account-level fields, local-only browser OAuth/reconnection, consent retention |
| U.S. Bank | Plaid product support for depository and credit accounts; OAuth; Dashboard incident banner observed | Scope/duration of incident (details button gave no visible result), real access and local OAuth compatibility |
| CIT Bank - Personal | Listed on user's Dashboard institution page | User's intended account scope, product-level/account coverage and OAuth/local setup |
| Plaid Free Trial | User's Dashboard Home shows **Free trial 0/20**, “Automatic bank access; no action is needed”; detailed Usage page says Full Production required | Legal/contractual meaning of 20 slots versus current public docs' 10 lifetime Items, refresh/consent/charges and ongoing suitability |

**Important billing distinction:** Public Plaid Trial docs presently list Transactions Refresh and Investments Refresh as included within Trial-eligible products, unlike the standard separate paid refresh pricing. Do **not** assume either paid entitlement or cost-free ongoing Production beyond the specific Trial terms. No Items have been intentionally consumed in this consultation. Trial upgrade, subscription, paid features and bank authorization remain unapproved.

## 7. Risk and feasibility gate register

| Gate | Priority | Evidence now | What must be proven before declaring viable |
| --- | --- | --- | --- |
| F-01 Real Production OAuth for required banks on home-only/no-domain LAN | **Critical** | Docs and Dashboard institution listings, no actual Link | Institutional browser/phone Link and renewal compatible with acceptable HTTPS/redirect design, otherwise user-facing alternate options |
| F-02 Plaid Trial/license/cost envelope | **Critical** | Screenshot 0/20; official docs say 10 lifetime Items | Account-applicable entitlement/terms, product limits, any incurred costs, and viable no-fee ongoing plan; never authorize upgrades by inference |
| F-03 Secure LAN HTTPS and mobile trust | High | Caddy documented local CA support; user willing to consider guided setup | Controlled certificate authority/storage, device trust, renewal/removal, phone and desktop browser tests, LAN-only reachability and host controls |
| F-04 Offline-first sync and first Item readiness | High | Plaid sync docs, earlier Sandbox-only code | Idempotent cursor recovery after lengthy offline, initial/history completion, status/consent/repair handling without a permanent receiver, reconciliation and transparency |
| F-05 Data security and deletion/retention | **Critical** | User retention preference; provider consent/deletion obligations flagged | Exact contractual retention conditions, encryption/token keys, session access control; if approved product meaning must change, route a governed Creative decision |
| F-06 Database runtime and disk headroom | High | Current Dell and Docker inventory; old PG volume intact | Protected, separate new volume; native-vs-hybrid proof; C: free-space alarm or viable D: placement; no legacy-volume modification |
| F-07 Backup consistency and key recovery | High | Offline T7 use and printed-sheet preference | Encrypted recoverable backups, no modification of existing T7 files, identity checks, bounded retention, synthetic restore, documented stop/reversal |
| F-08 One-click operations and approval-bound updates | Medium | User direction and prior PowerShell scripts | Safe start/stop of only Facet's services, process health, deterministic failure recovery, no invisible upgrades/host modifications |
| F-09 Financial-calculation product unknowns | Medium | Discovery and confirmed correction controls | Month-end treatment of expected income; exact financial rules resolved through appropriate product/user owner before acceptance claims |

**Overall gate assessment: CONDITIONAL.** Existing evidence supports continued research and bounded future test design, **not** a claim that any critical gate is satisfied.

## 8. Ordered future proof sequence — recommendation, NOT implementation instruction

1. **Read-only feasibility completion** (present consultation): consolidate requirements, independent documentation and account/host observations; clarify any material owner-borne cost, admin, trust, network or privacy constraints without asking for secrets.
2. **Prepare a conditional roadmap candidate** with a narrowly scoped first milestone: a secure **synthetic/Sandbox-only** vertical slice testing production-like application startup, LAN HTTPS on Dell and phone, first sync/checkpoint/restore behavior, and clear failure reporting. It must specify exact host/service/permissions/cost/stop-reversal preconditions. **No action is authorized by proposing this milestone**.
3. **Independent Builder roadmap challenge through Clerk** according to `docs/WORKFLOW.md`; require evidence-based verdict, known blockers, realistic owner obligations and corrections before a user approval request. A documentation-only review is not a device test.
4. After a separately approved roadmap and distinct Iteration 001 direction, follow full iteration/WP governance including **separate exact Work Package implementation approval** before any software, host, network, certificate, database, or other implementation action.
5. Any **real Production bank connection** must also have a deliberate informed user decision about non-replenishing Trial Item usage, institution consent and risk, credentials, privacy/cost and retention; Sandbox success is not real-provider proof. If this cannot be demonstrated safely and within approved requirements, stop and return with alternatives rather than silently narrowing scope.

### Proposed first-milestone acceptance evidence (candidate only)

- Specific Windows Home/Node/Docker versions and safe setup prerequisites and effects recorded; no legacy project/volume changes.
- Browser reachable on Dell and phone **with HTTPS** under intentional trust configuration and no public network exposure; Facet login and session controls work.
- Fake/Sandbox Plaid transaction sync reconciles added/modified/removed and pending-to-posted data across stops/restarts, preserving original source and user corrections.
- Synthetic database restorable from consistent encrypted snapshot with key recovery instructions and space/age constraints; existing external files untouched.
- Production OAuth, real account support, and consent/legal obligations remain explicitly blocked until suitable separate proofs and permissions exist.

## 9. Open user/owner obligations and bounded choices

- **Do not assume permission** to install/enable Caddy, register a local CA, trust certificates on desktop/phone, alter Windows firewall, move Docker volumes, change startup behavior, use administrator access, acquire domains, enroll services, or use Plaid credentials. Prior willingness to *consider* guided local certificate setup is conditional, not authorization.
- Runtime, placement and hosting are **UNDECIDED**. If a domain/online component becomes technically necessary, present its privacy, billing, operational and availability implications to the user before revising the candidate.
- The user has not selected how to count expected future income in the month-end forecast; preserve its undecided status. Escalate any change to approved Discovery meaning through Creative rather than assigning technical authority.
- Existing bank transaction coverage and Plaid compliance obligations may differ by institution, connected Item and plan; preserve accurate freshness/coverage disclosures.
- No routine repeated Dashboard click or paid upgrade is a prerequisite to continuing documentary planning.

## 10. References (documentation only)

- Plaid browser OAuth: https://plaid.com/docs/link/oauth/
- Plaid Link OAuth troubleshooting: https://plaid.com/docs/link/troubleshooting/
- Plaid Transactions webhooks and sync: https://plaid.com/docs/transactions/webhooks/ and https://plaid.com/docs/api/products/transactions/
- Plaid initial sync readiness: https://plaid.com/docs/transactions/troubleshooting/
- Plaid missed non-Transactions webhook recovery: https://plaid.com/docs/api/webhooks/webhook-events/
- Plaid Trial billing/Item limits and products: https://plaid.com/docs/account/billing/
- Caddy automatic local HTTPS and CA: https://caddyserver.com/docs/automatic-https
- Docker Desktop disk image configuration: https://docs.docker.com/desktop/settings-and-maintenance/settings/
- Controlling project governance: `docs/WORKFLOW.md`, `chatgpt/roles/ARCHITECT.md`, `.project/CURRENT_STATE.md`, approved Discovery checkpoint and ledger.
- Current planning evidence: `docs/project-planning/ARCHITECT_WORKING_DECISION_RECORD.md`.

## 11. Governance boundary

This document preserves observed facts, user-confirmed preferences, and provisional architecture alternatives. It **does not** authorize a paid service, new Product scope, host experiment, installation, API credential use, Production Item, certificate/trust change, deployment, project roadmap approval, Iteration 001, Work Package, implementation, or handoff to Builder. Continue in `ARCHITECT_PROJECT_PLANNING` until the actual roadmap candidate, governed review and later explicit approval stages are satisfied.
