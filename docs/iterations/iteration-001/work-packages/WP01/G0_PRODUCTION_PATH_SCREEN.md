# Facet I001 WP01 — G0 Production-path documentary screen

**Checked:** 2026-11-08 UTC. **Method:** read public Plaid documentation and public Plaid institution pages; compare their claims with the approved Facet plan, roadmap, Discovery and the owner's previously recorded observations. No owner screenshots or private terms were copied into the repository. No Plaid Dashboard, bank, Item, API, credentials, host or phone was accessed. **Evidence tier:** T1 for the cited public documents and repository records; T2 for this Builder's source comparison. No T3 independent Architect assessment or T4 account/physical proof is claimed.

**Builder's one provisional disposition: INDETERMINATE.** Plaid documents a plausible no-redirect path for standard desktop and mobile web browsers and several polling routes for current data, so this screen does not establish a categorical conflict. It also cannot establish this user's Trial terms, four working institution-specific initial/repair flows, required account/field coverage, or complete >7-day non-Transactions state recovery. Those material gaps preclude PASS-TO-EXPLORE-M0 under the approved plan. Facet I001 ARCHITECT independently verifies the final G0 disposition.

## 1. Attributed source register (T1)

All sources below were checked on 2026-11-08 UTC. Unless noted, the public page did not expose a stable publication or revision identifier in the material reviewed. An API description is evidence of documented behavior, not evidence that this owner's account, chosen institution, device or consent supports it. Plaid's institution marketing pages are weaker evidence than current institution/product status for a specific Item. No community source was used.

| ID | Official public source and applicability | Documented point or limitation used here |
| --- | --- | --- |
| S01 | [Plaid pricing and billing](https://plaid.com/docs/account/billing/) | Public Trial 10 Production Items, non-replenishment on removal, included products, paid-plan/product caveats; account-specific contract is not shown. |
| S02 | [Plaid Trial plan help](https://support.plaid.com/hc/en-us/articles/16110502116887-What-are-Plaid-s-prices-and-pricing-plans-and-how-do-they-differ) | Public Trial eligibility is stated for new US/Canada teams created on or after 2026-04-15; not proof this account has that plan. |
| S03 | [Plaid Link OAuth guide](https://plaid.com/docs/link/oauth/) | Standard desktop/mobile web may use popup/new tab without a redirect URI; webviews need redirect/reinitialization; OAuth permissions and institution migration can vary. |
| S04 | [Plaid Link update mode](https://plaid.com/docs/link/update-mode/) | Existing Items can need reauthentication, consent renewal or additional account/product permission; update mode uses the existing Item's access token and may need repeated user action. |
| S05 | [Plaid Link API](https://plaid.com/docs/api/link/) | If a Production redirect_uri is used, it must be HTTPS and allowlisted; this does not establish a viable local/private receiver. |
| S06 | [Plaid Institutions API](https://plaid.com/docs/api/institutions/) | Institution records carry products, availability and status; success still depends on registration, account, requested products and account standing. No API call was made. |
| S07 | [Plaid OAuth institution support](https://support.plaid.com/hc/en-us/articles/15687521555607-What-OAuth-institutions-does-Plaid-support) | Names Navy Federal and U.S. Bank among major OAuth institutions; Dashboard or Institutions API holds more current, account-specific registration/status. |
| S08 | [Plaid Navy Federal public page](https://plaid.com/institutions/navy-federal-credit-union/) | Public page lists Assets, Auth, Balance, Transactions and Investments; it is not an Item or field guarantee. |
| S09 | [Plaid U.S. Bank public page](https://plaid.com/institutions/u-s-bank/) | Public page lists Assets, Auth, Balance, Transactions and Investments and broad account types; it is not an Item or field guarantee. |
| S10 | [Plaid Transactions API](https://plaid.com/docs/api/products/transactions/) | Sync cursor, added/modified/removed, pagination, update timestamp and optional separately priced refresh. |
| S11 | [Plaid transaction states](https://plaid.com/docs/transactions/transactions-data/) | Pending-to-posted can remove one ID and add another, potentially on different pages of one update. |
| S12 | [Plaid Accounts API](https://plaid.com/docs/api/accounts/) | Accounts/get returns currently shared active accounts and cached balances; new accounts may require update-mode consent; live Balance is a paid endpoint. |
| S13 | [Plaid Items API](https://plaid.com/docs/api/items/) | Item/get exposes current error, product/status and some update/consent timestamps; Item webhooks include errors, new-account and revocation signals. |
| S14 | [Plaid webhooks guide](https://plaid.com/docs/api/webhooks/) | Webhooks can be duplicate/out of order or missed; Plaid advises endpoint polling or other recovery logic. |
| S15 | [Plaid webhook-events API](https://plaid.com/docs/api/webhooks/webhook-events/) | Beta replay lists non-Transactions webhook events for only the previous seven days; Transactions uses sync separately. |
| S16 | [Plaid Liabilities API](https://plaid.com/docs/api/products/liabilities/) and [Liabilities guide](https://plaid.com/docs/liabilities/) | Liabilities/get can return current loan/card fields, including some due dates; updates are roughly daily and a webhook announces changes. Institution/field coverage remains conditional. |
| S17 | [Plaid Transactions troubleshooting](https://plaid.com/docs/transactions/troubleshooting/) and [Transactions errors](https://plaid.com/docs/errors/transactions/) | Initial history may be delayed or institution-limited; mutation during pagination requires restarting the entire update from the original cursor. |
| S18 | [Plaid US/Canada coverage explorer](https://plaid.com/docs/institutions/) | Its table is not real-time; it points to the Institutions API/Dashboard for current coverage. Public page stated last update 2026-10-16 when checked. |

## 2. Trial, entitlements and cost (I001-C02, C06)

| Question | Public evidence | Owner-specific evidence and result |
| --- | --- | --- |
| Production Item allowance | S01 and S02 describe a free Trial with 10 Production Items for eligible new teams; removal does not replenish capacity. | The approved roadmap records the owner's prior Dashboard report of “Free trial 0/20.” No attributable current terms or Dashboard capture was supplied to this WP. **CONTRADICTED across sources; account allowance UNKNOWN (T4 NOT TESTED).** The public 10 must not overwrite the reported 20, or vice versa. |
| Account eligibility and expiration | S02 ties its public Trial offer to new US/Canada teams created on or after 2026-04-15. S01 does not establish this user's account creation date, contract or indefinite free entitlement. | **UNKNOWN.** No login, account terms or support confirmation. |
| Products | S01's public Trial bundle includes Transactions, Balance and Liabilities among other listed products. S06 says an institution and an integration may still lack a requested product or consent. | Actual account product entitlements, specific bank/account combinations and OAuth registration status **UNKNOWN**. |
| After the Trial / more Items | S01 says a paid plan is needed beyond the public Trial cap; subscription products can incur charges after upgrading. It does not publish a complete price list. S10 labels Transactions Refresh separately priced; S12 labels real-time accounts/balance/get paid. | No upgrade, fee, product add-on or recurring spend is approved. An architecture that requires paid refresh or live Balance must return for a separate owner choice. |
| Re-creation and deletion | S01 says a Trial Item still counts after item/remove. S13 says removal invalidates its access token. | No Item was created, removed or consumed. Exact remaining account capacity **UNKNOWN**. |

**Cost conclusion:** A no-fee path is a plausible public hypothesis for a limited eligible Trial, but durable $0/month operation for this account and required products is **UNKNOWN**. Do not recommend a paid upgrade or Item experiment as a way to resolve the discrepancy.

## 3. Initial and update-mode OAuth paths (I001-C03, C06)

The proposed no-domain route means **standard browser Link without a redirect URI**. S03 says desktop web opens a popup if possible and mobile web a new tab, even when no redirect URI is configured. It also says embedded mobile webviews often need a hosted redirect page and Link reinitialization. S04 describes update mode for expired authorization, permissions and accounts; S03 discusses OAuth permissions during both initial and update flows. The documentation does not demonstrate these paths for Facet's actual bank Items or browsers.

| Browser and task | Source-supported route | Conditions and untested failure points | Result |
| --- | --- | --- | --- |
| Dell desktop, initial Link | S03: standard web popup may complete OAuth without redirect URI. | OAuth institution must be accessible on this account; popup/return, product scopes and consent must work. No browser or bank test. | **HYPOTHESIS; T4 NOT TESTED** |
| Dell desktop, update-mode repair | S04: launch Link update mode for an existing Item; S03 documents web popup and OAuth permission return. | Existing Item/token and user consent are required; actual error path, recovery, popup and institution behavior untested. | **HYPOTHESIS; T4 NOT TESTED** |
| Phone standard browser, initial Link | S03: mobile web can use a new tab without redirect URI. | The actual phone browser must remain a standard browser, not an embedded webview; tab/return, session and consent untested. | **HYPOTHESIS; T4 NOT TESTED** |
| Phone standard browser, update-mode repair | S03 and S04 describe the same browser pattern plus update mode. | Mobile session continuity, OAuth handoff, reauthorization and repeated repair are untested. An embedded webview has a documented redirect/reinitialization dependency. | **HYPOTHESIS; T4 NOT TESTED** |

**Domain/receiver boundary:** If a future flow actually needs a redirect_uri, S05 requires a registered HTTPS URI; S03's normal example hosts a page that receives the return. No owned domain, public receiver, local CA trust or private LAN redirect eligibility was verified here. The documented redirectless standard-browser route avoids assuming a receiver, but popup guidance alone does not prove end-to-end initial or update-mode OAuth. A required hosted redirect, public endpoint, certificate trust or always-on callback would be a new burden for Architect/user review. S03's webview caveat must remain visible if the phone launches Facet from an embedded browser.

**Consent and repair boundary:** An Item error, expired consent or revoked account can require Link update mode rather than more background polling (S04, S13). S03 also documents that missing OAuth product/account permission can cause an access error. No claim is made that all repairs are automatic, that old data remains available after revocation, or that a no-webhook app will receive a timely prompt.

## 4. Institution, account and field coverage (I001-C04)

| Institution / priority | Public Plaid evidence | Required scope and unresolved limits |
| --- | --- | --- |
| Navy Federal — required | S07 identifies it as an OAuth institution. S08 publicly lists Assets, Auth, Balance, Transactions and Investments. | Checking/savings via Transactions and Balance are a **public coverage hypothesis**, not a successful Item. Credit card, loan/mortgage accounts, Liabilities product, due/minimum fields, pending data, consent, current health and this account's entitlement **UNKNOWN**. Absence of Liabilities from S08's list is not proof of unsupported coverage. |
| U.S. Bank — required | S07 identifies it as OAuth. S09 publicly lists Assets, Auth, Balance, Transactions and Investments and broad depository/credit/loan account types. | Same account, Liabilities, field and consent limits as above. The user's previously observed U.S. Bank incident banner has no independently refreshed status here; current health **UNKNOWN**. |
| CIT — conditional | No current institution-specific official public coverage claim was established in this source set. S06/S18 identify the mechanisms for a later current coverage check. | Initial priority awaits the owner's existing unresolved choice. No CIT success, product support or omission from eventual approved product scope is inferred. |

S10 documents Transactions for depository, credit and loan type accounts generally; S16 documents a separate Liabilities product for certain card and loan fields, including possible payment dates and amounts. Those are **product-level capabilities**, not evidence that either named institution supplies each field. S06 explicitly says listed support and institution status do not guarantee a connection; registration, selected products and the actual account matter. S18's coverage table is not current enough to substitute for an Item. The later independent proof gate must test the supported, user-authorized account set and field availability without using source listings as a guarantee. This WP did not inspect or connect any account.

## 5. On-demand and >7-day offline state recovery (I001-C05)

Plaid's beta webhook-events list retains only seven days of **non-Transactions** events (S15). An app powered off longer than that cannot treat webhook replay as complete history. S14 advises polling or other recovery logic; that general advice does not establish that every missed state transition is reconstructible. The matrix below separates documented current-state endpoints from event history and future M1/M2 tests.

| State after reconnect | Documented source route or limit | >7-day conclusion and future proof |
| --- | --- | --- |
| Initial transaction history | S10/S17: first sync may be empty while initial history loads; default requested history is limited and institution history can be narrower. | **SUPPORTED as a documented route, not actual coverage.** Later test chosen days_requested, initial/historical readiness, institution limits and all available source entries. Do not treat first empty result as complete. |
| Existing transaction changes | S10: saved sync cursor returns added, modified and removed changes; the final fully paginated cursor is documented valid for at least one year. S15 excludes Transactions from webhook replay. | **SUPPORTED as a documented >7-day catch-up hypothesis** for a healthy, retained Item/cursor; actual offline test **NOT TESTED**. Preserve cursor and every page. No guarantee if the Item lost consent or a required history is unavailable. |
| Pagination and mutation | S10/S17: one update can span pages and mutation during pagination requires restart at the **original** cursor. S11: pending-to-posted may remove and add on different pages. | Future implementation must apply the **entire** page set atomically with the final cursor; on mutation, discard the partial update and restart. A page-by-page commit could lose or duplicate records. **Design obligation, not tested code.** |
| Pending, posted, modified, deleted | S10/S11: sync distinguishes added/modified/removed; pending may disappear or be replaced by a posted transaction with a new ID. | Future tests must retain every currently available pending/unidentified record and reconcile replacement/removal without rewriting the source. **No actual Item proof.** |
| Account set and new-account consent | S12: accounts/get lists currently shared active accounts, not closed ones; S13 documents NEW_ACCOUNTS_AVAILABLE, but S15 limits replay. S04 allows update mode to request access. | Polling can compare **currently shared** accounts. An unshared new account may not be visible without a timely event or user consent action. **UNKNOWN** whether a missed >7-day new-account event can be found exhaustively under the on-demand model. |
| Removed/revoked/closed accounts | S12 may omit a non-active account; S13 has revocation events and current Item information. | A current-list comparison can detect disappearance of a formerly known account, but may not determine its cause or retained-data obligations. Historical event detail after seven days **UNKNOWN**. Do not silently delete or present it as current. |
| Balances and source freshness | S12: accounts/get returns cached balances; a healthy subscription Item may update roughly daily. S13 gives product-specific successful/failed update timestamps; S12 distinguishes paid real-time Balance. | A successful local API read is **not** a fresh bank pull. Show last-known and freshness/coverage separately; paid live Balance needs a new owner cost decision. Actual bank cadence and available/current balance fields **UNKNOWN**. |
| Item error, consent, update mode | S13: item/get exposes current Item error and some consent/product/status fields; S04 describes user-driven repair. S15 cannot replay >7-day non-Transactions history. | Current blocking error can be polled while online; an earlier event or account-level revocation may be missed. **UNKNOWN** whether all consent transitions and their effect on historical data can be reconstructed after long downtime. No silent automatic repair. |
| Credit, loan, mortgage fields | S16: liabilities/get returns currently available details and updates roughly daily; its webhook signals changes. Institution/product/field coverage is conditional. | Polling may retrieve latest available fields, but the full sequence of missed changes, due-date/minimum availability and bank-specific completeness after >7 days **UNKNOWN**. Do not infer bill payment from a current value alone. |
| Other non-Transactions events | S13/S16 enumerate Item and Liabilities events; S15 has a seven-day beta replay limit; S14 suggests endpoint polling. | No general >7-day event-replay guarantee exists in the consulted docs. Current-state polling may repair some snapshots but does not prove every intermediate event or action requiring user consent is recoverable. **INDETERMINATE for complete state.** |
| Provider/legal retention | S03 discusses revocation and covered-data retention limits; S13 documents Item removal, which invalidates access. | Retention of disconnected history must be separately checked against actual provider terms and applicable obligations before a later design decision. **UNKNOWN** here; no unconditional historical retention promise. |

**Freshness rule for later work:** Keep (1) the time Facet last requested Plaid data, (2) Plaid's documented last successful institution update when available, (3) the date of the underlying record or balance, and (4) Item/consent health as distinct facts. No single API response proves all accounts or transactions are fresh. The future physical/synthetic tests must cover a restart after more than seven days, absent webhooks, error/consent repair, account changes, and mutation during multi-page sync; this dossier claims none of those tests occurred.

## 6. Owner obligations, stop gates and decision

| Obligation or risk | Documentary result | Gate/owner |
| --- | --- | --- |
| No owned domain, public financial site or port forwarding | Redirectless standard-browser Link is a documented **HYPOTHESIS** (S03); actual initial/repair flows and any necessary hosted callback remain **NOT TESTED**. | Architect assesses feasibility; USER decides any new domain, public endpoint or exposure. |
| Preferred $0/month and on-demand Dell | Public Trial terms and the prior 0/20 report conflict (S01/S02); paid refresh/Balance and possible subscription fees exist (S01/S10/S12/S16). **Account terms UNKNOWN.** | USER decides any cost or paid service after an exact proposal. No purchase or upgrade here. |
| Windows 11 Home real-data security | Approved roadmap R-02 requires proof for the actual live C:/D:/WSL placement, independent token and backup encryption, key custody and full synthetic restore. This documentary WP supplied **no T4 host proof**. | Later M0/M1 planning, separately informed owner host consent, physical validation and independent Architect review before real data. |
| Phone trust, LAN HTTPS, private CA and network | Actual phone/browser and certificate trust were not exercised; no root CA, DNS, firewall, Docker/WSL or T7 operation occurred. | Separate later plan and informed owner choice; no implicit install or always-on receiver. |
| Real financial data and consent | No bank/Production or Sandbox Item, Dashboard login, credentials or account-data API was used. | Explicit later bank/Item and privacy consent plus ordinary implementation gates. |
| Retention, account revocation and product meaning | Historical retention and due/forecast semantics remain conditional; expected future income in month-end is undecided. | Architect routes legal/provider and technical questions; USER/Creative own changed product, privacy or resource decisions. |

### Provisional decision rule applied

- **PASS-TO-EXPLORE-M0** would require a credible documented path for all four OAuth scenarios, no identified mandatory unaccepted burden, and material unknowns assigned future proof gates. It would permit only a separately approved synthetic M0 proposal.
- **BLOCKED** would require a documented indispensable conflict with accepted constraints. The consulted docs show possible redirectless browser flow, so this screen does not establish that conflict. A paid live Balance call is not inherently indispensable if the later product can honestly show cached data and freshness.
- **INDETERMINATE — selected:** the account-specific Trial entitlement and $0 durability, real institution/product/field coverage, initial/repair OAuth for the owner's browsers and banks, and >7-day non-Transactions completeness remain materially unproven. S15's seven-day limit is a concrete gap; S12/S13/S16 provide only partial current-state routes. No T4 evidence was supplied. **G0's pass-to-explore dependency is not cleared.**

**Least-invasive next choices for the owning Architect/user route:** (1) independently audit this documentary record and preserve INDETERMINATE while the owner declines further evidence; (2) if the owner voluntarily wishes, assess a narrowly specified, sanitized statement of their current Trial terms and permitted products without credentials or account numbers; (3) plan a separately reviewed, consented future proof method for standard-browser OAuth and >7-day recovery only if the owner accepts its privacy, Item-capacity, cost and host effects. No option is automatically authorized. Repeating the same public-document search without new account terms, source revisions or a different evidence method would not close the identified gaps.

## 7. Iteration criterion and Discovery non-regression trace (I001-C08)

| Criterion | WP01 evidence delivered | Status and independent owner |
| --- | --- | --- |
| I001-C01 | Dated S01–S18 official-source register with source scope and weaker/public-page limits. | **T1/T2 documented**; Facet I001 ARCHITECT independently checks citation and conflict sufficiency (T3 not yet performed). |
| I001-C02 | Public Trial-versus-reported 0/20 comparison, product and cost matrix. | **Contradiction disclosed; account-specific T4 NOT TESTED.** |
| I001-C03 | Four separate desktop/phone initial/repair OAuth rows and redirect/no-domain boundary. | **Documented hypothesis; real flow T4 NOT TESTED.** |
| I001-C04 | Navy Federal, U.S. Bank and conditional CIT matrix; account/field uncertainty separated from product listings. | **Public evidence only; institution success and Liabilities fields UNKNOWN.** |
| I001-C05 | >7-day recovery matrix for Transactions, Accounts, Balance, Item/consent, Liabilities and other webhooks; atomic cursor obligation. | **Some documented routes; complete non-Transactions recovery INDETERMINATE.** |
| I001-C06 | Cost/domain/host/phone/privacy/retention stop gates and later R-02 physical proof. | **Obligations documented; no owner burden accepted or T4 gate cleared.** |
| I001-C07 | Exactly one source-grounded provisional disposition with alternatives and lawful next owner. | **INDETERMINATE; Architect owns final technical judgment.** |
| I001-C08 | This cross-criterion trace and the P01–P13 preservation below. | **Builder integration preparation complete; independent Architect integration check pending.** |

| Approved Discovery ID | Preserved future obligation; no G0 satisfaction claim |
| --- | --- |
| P01 | Real, supported, read-only Plaid accounts remain required; public coverage is not a connected Item. |
| P02 | Unified Overview must still explain balances, received income, bills, other spending and available after obligations. |
| P03 | Available-after-obligations and projected month-end remain separately defined and labeled. |
| P04 | Separate account inspection and combined activity remain required; missing account consent is visible. |
| P05 | Every available pending and unidentified source transaction remains visible; sync changes and replacements must be reconciled. |
| P06 | Recurring income and bill discovery remains an inference requiring confirmation. |
| P07 | Initial review and quiet discovery inbox remain user-controlled, without repeated unchanged prompts. |
| P08 | Bill calendar and possible overdue warnings remain explained and correctable, not proof of nonpayment. |
| P09 | Source records remain distinct from user-adjustable Facet interpretations; no bank-side editing. |
| P10 | Desktop and phone browser access remain required; standard versus embedded phone browser matters to OAuth. |
| P11 | Stale, disconnected and incomplete account views must be flagged; an API request is not source freshness. |
| P12 | Estimated surplus remains explainable; advanced advice is not silently added. |
| P13 | External institution access and actions remain read-only; no transfers or bank changes. |

Expected future income's effect on projected month-end remains an unresolved USER/Creative product decision. The G0 result neither removes nor settles any P01–P13 requirement. A later merged/audited WP and iteration exit assessment need exact evidence accounting; this dossier alone is not a release candidate.
