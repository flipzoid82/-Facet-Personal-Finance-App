# Facet — Architect Working Decision and Evidence Record

**Record revision:** 0.1 (initial capture, 2026-11-07)
**Owner:** ARCHITECT, project-stage consultation
**Authority:** Active `ARCHITECT_PROJECT_PLANNING` from `.project/CURRENT_STATE.md`; approved Discovery v1.0 is controlled by `docs/project-planning/PROJECT_DISCOVERY_CHECKPOINT.md` and `docs/project-planning/APPROVALS.md`.
**Status:** Working consultation evidence; **NOT** an approved roadmap, implementation plan, hosting authorization, permission to connect financial accounts, acceptance of new costs, or authorization for Iteration 001.
**Evidence convention:** [USER] = directly selected/preferred in Architect consultation; [OBSERVED] = user-supplied screenshot or command output; [REFERENCE] = inspected code/documentation; [PROPOSED] = Architect recommendation not approved; [UNKNOWN] = requires further evidence or consequential user choice. Source conversation is the Architect consultation on 2026-11-07. Summaries do not replace the governing Discovery artifact.

## A. User-confirmed planning preferences [USER]

### Operating model, access, budget, and maintenance
- Prefer **$0/month** additional recurring operating cost, including hosting, Plaid and other third-party services. No subscription, spend or service enrollment authorization is implied.
- Run on the user's existing Dell Windows machine **on demand**; no requirement for availability while the Dell is off.
- **One-click Windows desktop shortcut** to launch necessary local components and open the browser. No requirement to start automatically at Windows logon.
- Browser access from desktop and phone; **home Wi-Fi first for the initial release**. Private Tailscale access while away from home is a **deferred enhancement**, not installed or selected. Avoid avoidable architecture coupling that would force a later rebuild.
- **No owned/controlled internet domain** is available for Facet as of this consultation [USER]. Do not assume domain ownership or authorize registration/purchase. Evaluate a no-domain, local-only HTTPS approach first; trust installation and private CA management require separate approval and security review.
- [USER] The user is comfortable **considering a one-time guided installation of a trusted local CA certificate on their Dell and phone**, conditional on prior security review, explanation of trust implications, and a safe removal procedure. This is a feasibility preference **only**, not consent to install certificates, change device trust stores, enable services, or alter firewall/DNS configuration.
- One Facet user; Dell is not ordinarily shared with another Windows user.
- Facet-specific password and remembered trusted-device sessions. Session expiry, recovery, and reauthentication mechanics require security design and review.
- Notify before Facet application updates; require explicit approval to install. No automatic host upgrades, software installation, elevated actions or service changes are authorized.

### Plaid and synchronization
- Real Plaid-connected accounts are essential to the first useful release; **read-only financial access**; no transfers or bill pay.
- Prioritize **checking and savings coverage verification first**; credit cards, mortgages and loans remain within the approved Discovery direction subject to provider/institution coverage.
- On launch, **open Overview immediately with dated cached data**; synchronize available Plaid changes in the background; show connection, source freshness, completeness and failure indicators.
- For initial release, prefer **catch-up synchronization while Facet runs** rather than an always-online webhook receiver. Do not mistake `/transactions/sync` for a forced institution refresh; paid `/transactions/refresh` and any other billed services are not authorized.
- Upon disconnection, stop syncing and retain existing permissible historical transactions and user corrections until explicit deletion, with the account clearly marked disconnected/stale; reconcile with applicable Plaid obligations before implementation.

### Storage, backup, and recovery
- Automatic bounded encrypted **internal recovery snapshots while Facet is running**, subject to realistic retention, storage headroom, key protection and restore verification.
- External encrypted backups to the pre-existing **Samsung T7 Shield**, periodically connected for backup and disconnected afterward; flexible reminders based on elapsed time and important changes.
- **All existing T7 files are important and must remain unchanged**: do not format, repartition, overwrite, move or remove them. Backup data must use its own designated location and validate drive identity rather than blindly trusting a drive letter.
- A printed recovery sheet stored securely at home **separately from the external backup drive** is acceptable; don't put keys or secrets in Git, chat, unprotected logs, or plain text on the backup disk.
- Any old PersonalFinanceApp database/volumes are to be preserved until separately verified and explicitly dispositioned.

### Product-facing interface and financial meaning
- **Overview** is the desired starting page, summarizing accounts/balances, upcoming bills, deposited/expected income, transaction activity and outlook. Separate Accounts, Bills, Transactions, Income and Outlook detail views (including clickable per-account transaction pages) are **provisional interface concepts**, not a finalized UI roadmap.
- Show **every available provider transaction**, including pending, posted, unmatched and unidentified items. Keep the original source facts and user interpretations separate.
- Let the user select which checking/savings accounts contribute to **available money after obligations**; other accounts stay visible. Account balances, credit-card debt and cash available for obligations must not be conflated.
- Expected income must be visibly separate from money currently available. **Whether expected income contributes to projected month-end cash flow is explicitly UNKNOWN**.
- For each credit card, use the **user-confirmed planned monthly payment** to represent the upcoming obligation; suggest the previous planned amount but require confirmation every month.
- Before confirmation, show **two distinctly labeled illustrative scenarios** when a verified minimum is available: verified minimum versus prior planned payment; do not treat prior amount as confirmed. If minimum is unavailable, do not invent a value.
- Automatically mark bill payments matched to sufficiently strong posted transaction evidence; ask the user about uncertain matches and permit reversal.
- Automatically reconcile expected income with strong deposit matches, confirm uncertain matches, and avoid double-counting. Classify clear deposits (income, internal transfers, refunds, etc.) and request review for ambiguous deposits; establishing a new recurring pattern still requires Discovery confirmation.
- Edit user-adjustable transaction labels, categories, notes and bill associations; preserve immutable source-reported amount/date and allow **flagging questionable source amounts/dates**, rather than silently overriding their financial value.
- Offer to remember transaction corrections for future matching transactions **only with explicit user approval**; keep individual one-time overrides and rule management distinct.
- Display both **all last-known cash balances** and a **sufficiently fresh-data subtotal**, each clearly labeled with completeness/coverage. Use **context-aware freshness** (source timestamp, sync result, connection health and age), not an arbitrary blanket freshness deadline. Exact freshness thresholds are UNKNOWN.
- Avoid double-counting internal transfers, payment-related transactions and pending-to-posted replacements. Unconfirmed future inferred bills are excluded from main projections per approved Discovery; recorded source transactions remain visible.

## B. Verified local-environment evidence [OBSERVED]

User-provided PowerShell outputs and screenshots on 2026-11-07:
- Windows 11 Home, build **10.0.26300.9818**; RAM approximately **31.7 GB**.
- C: NTFS on **Micron 2300 NVMe SSD**, approximately **48 GB free**; D: NTFS on **Seagate ST2000DM008 HDD**, approximately **1,154.6 GB free**. Disk bus type reported as RAID, but physical device models identify SSD/HDD respectively.
- Samsung T7 Shield external SSD, nominal **2 TB** (reported about 1,863 GB physical). Periodic offline use; existing data must be protected.
- Node.js **v24.18.0**, pnpm **11.9.0**, Docker CLI **29.9.2**, Docker Compose **v5.6.1**, WSL **2.7.10.0**; Ubuntu WSL2 and docker-desktop WSL2 distributions present.
- Docker Desktop **4.98.0 Personal**, engine running during screenshot; no containers running; Resource Saver enabled.
- Docker Desktop's WSL disk-image location is under the Windows profile on **C:**, with screenshot reporting about **2.63 GB** disk usage. The approximately 1,006.85 GB figure is the configured virtual-disk limit, not occupied capacity.
- Existing old-project container `personalfinanceapp-postgres-1`: **stopped (exit 0)**, based on `postgres:16-alpine`; image about **419.6 MB**, persisted volume `personalfinanceapp_finance_postgres_data` about **140.8 MB**, no build cache. Preserve this volume.

## C. Existing implementation reference [REFERENCE]

Inspected `flipzoid82/PersonalFinanceApp`, branch main, as a **read-only reference**, not the current Facet implementation:
- Next.js 16, React, Prisma and PostgreSQL 16; pnpm 11.9; PowerShell startup/shutdown logic; Docker-based database.
- Old Plaid configuration is **Sandbox-only** (environment schema and sandbox basePath). Existing Docker Compose publishes the development database port and uses development credentials. This must **not** be copied unchanged for real sensitive financial data.
- Existing code and database schema may provide patterns, not authorization to merge, deploy, migrate or operate with real Plaid data.

## D. Current technical alternatives [PROPOSED; NOT CHOSEN]

1. **Runtime:** Native Windows Node.js application and a suitably validated local database; versus Windows Node.js with Docker PostgreSQL (current evaluation leader due to previous-project compatibility); versus fully containerized app. Final runtime/hosting not selected.
2. **Storage:** Live PostgreSQL on C: NVMe if safe headroom and monitoring can be assured; D: HDD for suitable large files, controlled encrypted internal snapshots and possibly DB if acceptable in testing; separate offline encrypted T7 backups. Do not relocate existing Docker image or old database without a preservation/recovery plan.
3. **Initial network:** Home-LAN-only HTTPS for Dell and phone, with app authentication regardless of network; no public dashboard exposure or router port forwarding. Tailscale remote connectivity may be added later under separate approval.
4. **TLS:** Compare internal CA certificates with trust setup on each device versus publicly trusted certificate using a controlled domain and DNS-01 validation with a LAN-only service. Both entail security and maintenance questions. Neither selected and no certificate installation authorized.
5. **Plaid:** Verify account-specific Production Trial entitlement, institution/OAuth compatibility, localhost/LAN browser Link behavior, redirect URI, initial asynchronous transaction readiness, webhook dependencies and whether catch-up-only operation provides sufficient actual coverage. No Production financial Item connection or billable API add-ons authorized.

## E. Active UNKNOWNs and feasibility gates

- Exact Windows/Node/Docker/PostgreSQL production suitability, secure setup, maintenance burden and final host/storage architecture.
- Free production Plaid account entitlement and institution-level support, especially checking/savings then cards/loans; eligibility of other products and account types.
- Whether no always-online webhook endpoint can support all **required** first-release flows, not merely Transactions sync.
- Device/browser HTTPS method, local name resolution, secure session cookies, certificate trust and rotation, and whether any external domain/DNS registration cost is needed.
- Explicit owner tolerance for installing a local trusted CA on phone/desktop, configuring firewall or DNS, moving Docker data, running services, and performing administrator-level setup; **none granted**.
- Credible encrypted-at-rest storage/key recovery/restore design, actual backup testing, internal retention levels, and disconnection/deletion obligations.
- Exact projected month-end income treatment and certain detailed financial calculation rules remain undecided. If their resolution changes approved product meaning, follow governed Creative return rather than silently decide within architecture.

## F. Planning and governance status

- Next investigation: compare local HTTPS and Plaid OAuth/connectivity under **home-Wi-Fi first, $0/month preferred**, before settling final host/runtime/network decisions.
- A future versioned `docs/PROJECT_ROADMAP.md` candidate must bind confirmed choices, alternatives, dependencies, evidence and conditions; then take the independent Builder review route through Clerk under `docs/WORKFLOW.md`.
- **No roadmap approval, Iteration 001 direction, work package, implementation, paid service, real bank connection, host change or deployment is authorized by this working record.**
- Changes in this record describe consultation status only. The approved Discovery checkpoint/ledger and durable `.project/CURRENT_STATE.md` remain governing.

## G. Plaid OAuth and HTTPS documentation feasibility review (2026-11-08) [REFERENCE]

**This is document research, not an actual hosted integration, installation, bank connection, or Production proof. No architecture is selected.**

- **Local HTTPS:** Caddy can issue local-CA TLS certificates to IP/internal names. Every accessing client must separately trust the local CA; certificate signing keys, revocation/removal, renewal and phone/browser trust behavior are material security obligations. Ref: https://caddyserver.com/docs/automatic-https .
- **Plaid web OAuth:** The OAuth guide says desktop/mobile web browser Link can sometimes use a popup/new tab without specifying `redirect_uri`, but warns that mobile embedded webviews cannot reliably complete this without a redirect. When configured in Production, `redirect_uri` must be HTTPS and on the Dashboard allowlist. Refs: https://plaid.com/docs/link/oauth/ and https://plaid.com/docs/api/link/ .
- **Material compatibility caution:** Plaid's troubleshooting guide identifies a missing `redirect_uri` / allowlist entry as a possible reason OAuth banks do not appear in Link. Thus the popup path must **not** be treated as guaranteed compatibility for the target institutions, despite the general OAuth guide. Plaid acceptance of LAN-only IP or internal-CA names as Production redirect URIs is **UNVERIFIED**. Ref: https://plaid.com/docs/link/troubleshooting/ .
- **No always-on receiver:** `/transactions/sync` supports retrieving incremental transactions, including additions/modifications/removals, after offline intervals. First-history readiness may be asynchronous; webhook receipt is Plaid's recommended mechanism for update notification. Other product webhook paths need individual review. `/beta/webhook_events/list` can recover certain non-Transactions webhook events only for a limited seven-day window; Transactions changes must be recovered through `/transactions/sync`. Refs: https://plaid.com/docs/api/products/transactions/ , https://plaid.com/docs/transactions/webhooks/ and https://plaid.com/docs/api/webhooks/webhook-events/ .
- **No-domain operating constraint:** No currently controlled domain; browser access restricted to home LAN for initial release; local CA evaluation is acceptable only subject to further security review and later separate host/device installation approval. Neither public redirect endpoint nor domain registration is authorized.
- **Plaid Trial entitlement discrepancy:** Plaid's publicly documented Trial specifies **10 lifetime Production Items** (including non-replenishment after removal), but user's earlier account dashboard reportedly displayed **20 connections**. Do **not** infer the user's actual entitlement from public documentation or expend Items; request account-specific clarification using sanitized dashboard information before real integrations. Ref: https://plaid.com/docs/account/billing/ .
- **Result:** CONDITIONAL, NOT PROVEN. Next feasibility gates: confirm whether specific in-scope checking/savings institutions require registered OAuth redirects; validate whether a local-only domainless environment is accepted for their Production Link flows without installing anything or consuming Items; consider alternatives if full required coverage cannot be achieved. Preserve UI and product meaning, $0 preference, hosting undecided and implementation false.

## H. Checking/savings institution-specific feasibility: Navy Federal (2026-11-08) [REFERENCE]

**Documentation-only research, not tested in the user's Plaid account or with any real institution. No bank connection or consumption of Trial Items.**

- Plaid's official Navy Federal page lists **Transactions**, **Balance**, **Auth**, **Assets** and **Investments** among supported products; this suggests useful checking/savings coverage but does **not** prove account-specific data fields, actual available balances, availability or freshness. https://plaid.com/institutions/navy-federal-credit-union/
- Plaid identifies **Navy Federal Credit Union as an OAuth institution**. Its official support guidance says Plaid Trial customers get OAuth institution access without separately completing full registration, though entitlement, institution visibility and current account good standing still need checking. https://support.plaid.com/hc/en-us/articles/15687521555607-What-OAuth-institutions-does-Plaid-support and https://support.plaid.com/hc/en-us/articles/15769780649751-How-do-I-get-access-to-OAuth-institutions
- Plaid's web OAuth documentation states desktop/mobile browser OAuth may complete in popup/new tab **without a configured redirect URI**; mobile embedded webviews usually require one. Troubleshooting nonetheless identifies absent/not-allowlisted redirect URIs as a potential cause of OAuth institutions not appearing. **Consequently, no-domain home-only Production Link/OAuth coverage for Navy Federal remains UNKNOWN, not established by the institution listing.** https://plaid.com/docs/link/oauth/ and https://plaid.com/docs/link/troubleshooting/
- Plaid lists Navy Federal among institutions requiring **OAuth consent refresh about every 12 months** (unless updated documentation says otherwise); `/item/get` includes `consent_expiration_time`, and update-mode can renew consent. With Facet running on demand, plan to inspect expiration on launch rather than require continuous webhook availability. Exact viable reconnection workflow is NOT VERIFIED. https://plaid.com/docs/link/oauth/
- **Potential product/legal conflict requiring governing review:** Plaid's OAuth documentation warns that revoked institution/Item consent may trigger deletion obligations for covered data, with limited exceptions for data reasonably necessary to provide the consumer-requested service. User prefers historical data retention after disconnect. Do **not** assume unconditional retention or silently change approved product meaning: obtain precise applicable Plaid/contract/legal terms and route a material product conflict through the governed Creative return if necessary. https://plaid.com/docs/link/oauth/
- Institution-level product listing does **not** guarantee Plaid Liabilities/mortgage data; those remain separate coverage gates.
- **Technical verdict so far: DOCUMENTED SUPPORT, LOCAL PRODUCTION COMPATIBILITY UNPROVEN.** Next safe steps: inspect sanitized account-specific Plaid Dashboard OAuth institution status and available Products (no secrets), then scope a non-Production OAuth test in Sandbox and separate authorization gates for any real connection. Exact local HTTPS implementation and hosting remain UNKNOWN.

## I. Institution feasibility: U.S. Bank (2026-11-08) [REFERENCE]

**Documentation research only; no use of Plaid account credentials, bank account, Production Trial Item, host installation or network change.**

- Plaid's official U.S. Bank institution page lists supported account categories **Depository, Credit, Loan, Investment, Other** and products **Transactions, Balance, Auth, Assets, Investments**. This indicates possible checking/savings and credit-card connectivity, not a guarantee that the user's specific accounts, minimum due, statements, mortgage or liability details are available. https://plaid.com/institutions/u-s-bank/
- Plaid lists **U.S. Bank as an OAuth institution**. The web OAuth guide permits standard browser popup/new-tab flows without `redirect_uri` in some cases; lack of registered redirect can still affect OAuth coverage. The institution's Production connectivity with Facet's proposed internal-CA/LAN-only HTTPS **remains UNKNOWN**. https://support.plaid.com/hc/en-us/articles/15687521555607-What-OAuth-institutions-does-Plaid-support and https://plaid.com/docs/link/oauth/
- U.S. Bank describes third-party sharing through **Akoya**, with customer-controlled account/data permissioning; permissions and retention obligations should be assessed through actual relevant terms, not inferred from general product listing. https://www.usbank.com/online-mobile-banking/account-aggregation-faq.html
- Plaid's U.S. Bank troubleshooting page says third-party connections can require a **72-hour waiting period after opening a new bank account**, which may trigger `USER_SETUP_REQUIRED`. Not a universal block for existing accounts. https://support.plaid.com/hc/en-us/articles/25973710146199-Why-am-I-getting-USER-SETUP-REQUIRED-on-a-US-Bank-account
- Plaid's public OAuth institution-specific guide names U.S. Bank's **tokenized account/routing numbers for Auth/Transfer**. Facet's approved release is read-only and does not require those transfer-related credentials; **do not request Auth solely because Transactions and Balance are supported**. https://plaid.com/docs/link/oauth/
- U.S. Bank **is not explicitly listed** among institution-specific annual consent-refresh banks in the consulted Plaid OAuth guide. **Do not conclude indefinite consent**; check `/item/get` consent expiration and error/status signals when an Item is legitimately connected. https://plaid.com/docs/link/oauth/
- Plaid documents cached balances and `/item/get` health/last successful update signals. The documented coverage supports considering account freshness, but no live source-age validation has been done. https://support.plaid.com/hc/en-us/articles/15197235844119-Why-is-an-Item-s-balance-out-of-date
- Plaid explicitly lists **U.S. Bank as a Sandbox example OAuth institution**, but warns that Sandbox uses a representative/mock OAuth experience and is not an institution-specific Production proof. https://plaid.com/docs/link/oauth/

**Verdict: PRODUCT SUPPORT DOCUMENTED; USER-SPECIFIC COVERAGE AND DOMAINLESS PRODUCTION OAUTH UNPROVEN.** Navy Federal and U.S. Bank remain potential high-priority institutions to inspect via sanitized Plaid Dashboard status, then future separately authorized tests. No Product/hosting decision is approved by this research.

## J. Account Dashboard screenshots: Navy Federal, U.S. Bank, CIT Bank and Trial Usage (2026-11-08) [OBSERVED]

User shared four redacted screenshots from their own Plaid developer Dashboard. These are **Institution detail/health views**, not the separate OAuth registration-status page or successful Link sessions. **No institution was connected in this consultation.**

1. **Navy Federal Credit Union:** Institution detail screen is visible. The health chart reads: "Not available — Institution health insights become available once your application has production access." This neither proves nor denies this Trial team's permitted OAuth access.
2. **U.S. Bank:** Institution detail screen visible with **"This institution has an active incident"** banner. Incident category, scope, product(s), incident start/end and connection impact are UNKNOWN; screenshot does not demonstrate general unavailability. Health chart likewise unavailable. The "View incident details" action can be inspected read-only later, without authorizing integration.
3. **CIT Bank - Personal:** Institution detail screen visible; no active-incident banner shown; health chart unavailable as above. Appearing in institution directory does **not** itself establish successful account-specific support or OAuth access. Whether this institution is part of the user's desired initial real connections is UNKNOWN.
4. **Observe → Usage:** Screen says **"Full Production required"** for product-level Usage reporting, and instructs Trial-plan users to consult the Overview page to find how many Items have been created. This gate is not, by itself, evidence that the Trial team lacks the ability to access real Production data. Do not select "Request access" merely to reveal Usage data.

### Provider-documentation corrections and caveats [REFERENCE]

- Plaid Trial documentation currently says the bundled products include **Transactions Refresh** and **Investments Refresh**. Earlier Architect statements broadly characterizing Transactions Refresh as a separately billed optional operation **must be qualified for this Trial plan**; charging on later paid-plan upgrade is distinct, and no upgrade or add-on call is authorized. Sources: https://plaid.com/docs/account/billing/ and https://support.plaid.com/hc/en-us/articles/16110110883479-How-are-Sandbox-Production-Trial-plan-and-Limited-Production-different
- Plaid currently publishes a **10-lifetime-Production-Item Trial limit** (removal does not replenish slots). An earlier user-reported Trial Dashboard display of **20 available connections** conflicts with public documentation; **actual account-specific limit remains UNKNOWN** until current Home/Overview evidence or Plaid clarification. Do not invent a resolution. Source: https://plaid.com/docs/account/billing/
- Plaid says Trial generally supports most OAuth institutions, including Navy Federal and U.S. Bank, without the full paid Production registration process. Institution *health insight* gating is separate from *OAuth connection permission*; neither can be inferred from these screenshots. Sources: https://support.plaid.com/hc/en-us/articles/15769780649751-How-do-I-get-access-to-OAuth-institutions and https://support.plaid.com/hc/en-us/articles/15141515967639-How-do-I-monitor-institution-health-on-the-Plaid-Dashboard
- Upgrading from Trial to paid Full Production **cannot be reversed** after approval and will introduce billing conditions. No action to "Request access", register/upgrade, make a real Link, or use Production Items is authorized for this feasibility assessment. Source: https://support.plaid.com/hc/en-us/articles/39917307426967-How-do-I-upgrade-from-the-Trial-plan-to-a-paid-Production-plan

**Next permitted read-only evidence:** Inspect the Dashboard **Home/Overview** Trial usage indicator (redact personal identifiers and all secrets); optionally inspect U.S. Bank "View incident details" and/or the actual OAuth institutions registration status without requesting changes. Exact browser OAuth+local-CA compatibility, account-level products, and final hosting remain UNVERIFIED.

## K. Plaid Trial Home/Overview allowance screenshot (2026-11-08) [OBSERVED]

User provided an additional screenshot of their own Plaid developer Dashboard **Home/Overview** screen. **Do not record screenshot credential values**; the image also displays the Production Client ID and masked Secret.

- Plan banner displays **"Free trial"**, with **"0/20"** on the connection/allowance progress indicator. This is direct **account-specific user-visible evidence** of **zero counted connections out of twenty displayed Trial slots as of the screenshot**, superseding any earlier characterization that the 20 display was an unverified recollection. Do not represent this as a promise that all 20 can be consumed free in every circumstance without confirming current contractual terms.
- The panel labeled **"Automatic bank access"** explicitly says **"No action is needed to access banks through Plaid's free trial."** This favors Trial general institution access, not proof that any particular Navy Federal, U.S. Bank or CIT Bank account can successfully complete real OAuth/Link with Facet's local-only HTTPS topology.
- The screenshot displays a Production Client ID and a **masked** secret; nothing establishes that the secret was disclosed. Future evidence should crop/redact the credentials panel. Do not reproduce Client ID or secret in Git, notes, logs, or user reports.
- Earlier reviewed public Plaid documentation indicated a **10 lifetime Trial Item** allowance, which differs from the **20 slots shown in this actual Dashboard**. Prefer the screenshot for **what this account currently displays**; mark binding entitlement, lifetime/non-replenishing treatment, product-level caps, and potential charges/plan changes as **still to confirm in Plaid's specific applicable Trial terms**. No connection, plan upgrade or billable API use is authorized.
- Prior Dashboard screenshot demonstrated "Full Production required" for detailed Usage reports. This is **not evidence of no Trial access**, and the Home screenshot is the relevant Trial counter.

**Updated assessment:** Trial Home displays **Free trial, 0/20**, with automatic bank access. Trial availability is more promising than previously established, but institution-specific OAuth, real account coverage, domainless Production Link, and exact legal/billing entitlements remain **UNVERIFIED**. Continue no-cost, read-only feasibility review; no Production Items consumed.

## L. U.S. Bank incident-details button unavailable (2026-11-08) [OBSERVED]

- After seeing the U.S. Bank **"This institution has an active incident"** banner, user reports that selecting **"View incident details"** has no visible effect in the Plaid Dashboard. Cause is UNKNOWN: do not assert that Trial gating, a browser extension, popup blocking or an active service failure is the reason. Do not ask for repeated clicks or upgrade access to investigate.
- Plaid's public system-wide status page reported systems operational when checked in this consultation, but it expressly directs institution- and Item-level checks to Dashboard/Institutions APIs. **System-wide status does not refute or resolve the U.S. Bank-specific banner.** https://status.plaid.com/
- Plaid's official Institutions API documents `health_incidents` fields in institution data, with titles and updates, subject to account/environment permissions. This may support a future read-only, appropriately permissioned feasibility method; access was NOT attempted, and no API secrets, Production requests, or connections are authorized now. https://plaid.com/docs/api/institutions/
- **Disposition:** U.S. Bank incident details and scope = UNKNOWN / non-blocking for present documentary research; carry institution incident status and OAuth production compatibility as open feasibility gates. Do not treat the institution as wholly unavailable, and do not claim the currently displayed incident remains ongoing indefinitely. No application decision or provider connection was made.
