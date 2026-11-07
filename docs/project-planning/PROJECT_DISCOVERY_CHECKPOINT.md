# Facet — Project Discovery Checkpoint

**Checkpoint version:** 1.0  
**Status:** APPROVAL CANDIDATE — NOT APPROVED  
**Project stage:** PROJECT_DISCOVERY (before Iteration 001)  
**Date:** 2026-11-07  
**Producer / role:** Creative  
**Source:** User's direct responses in Discovery Rounds 1–7; `docs/discovery/PROJECT_DISCOVERY.md` as generated starting context; `docs/PROJECT_BRIEF.md` preserved as immutable bootstrap history.  
**Authority:** User-confirmed preferences are distinguished from proposed product interpretations below. This checkpoint is a version-bound request for product approval, not evidence that approval has already been given.

## 1. Core problem and product purpose

**Primary user problem:** The user needs a clear, consolidated understanding of the household's financial position without repeatedly navigating financial accounts and tools. Account balances alone do not explain income received, upcoming bills, spending outside bills, or money remaining after obligations.

**Proposed product purpose for approval:** Facet is a read-only, Plaid-connected personal finance web application that helps a user understand the household's finances through a unified overview, account and transaction detail, automatically discovered recurring activity, and an upcoming-bills calendar. It should make estimates understandable and user-correctable without pretending that inferred data is verified.

**Initial success experience:** After connecting supported accounts and reviewing detected financial patterns, the user can open Facet on a computer or phone and answer:
- What do my connected accounts show, individually and together?
- How much income has actually arrived, and what income is expected?
- What bills are expected or potentially overdue, and how much remains due this month?
- How much was spent outside recognized bills?
- How much money appears available after remaining obligations, and what is the **separately labeled** projected month-end cash flow?
- Where did any figure come from, and how can I inspect or correct an interpretation?

This experience is more important initially than budgeting, investing, or sophisticated recommendations.

## 2. Initial user and platform

- **Audience:** One signed-in user managing their household's financial picture; the initiating user's household is the primary initial use case. The user and spouse share bank accounts. Separate household members' logins, invitations, roles, or collaborative editing are not required for the initial release.
- **Access:** Browser-based application usable on both desktop and phone. Detailed browser compatibility, hosting, and technology choices are not decided here.
- **Real connections are essential:** Actual Plaid-linked account information, not merely mock data, a manual-only tracker, or CSV-only import, is necessary for the first useful release.
- **Relevant account types:** Checking, savings, credit cards, mortgages, and loans. Exact supported institutions, fields, freshness, and coverage are subject to feasibility verification; a desire to include an account type is not evidence that every institution or field is available.

## 3. Required first-use and ongoing journey

1. **Connect accounts:** The user connects supported financial accounts through Plaid.
2. **Review initial discoveries:** Facet detects likely recurring income, recurring bills, and recognizable irregular obligations from available financial activity. The user reviews and confirms inferred patterns before they become accepted obligations or income patterns.
3. **See a clear financial overview:** A unified dashboard presents linked accounts, income received, recognized bills, spending outside bills, and both current-after-obligations and projected-month-end figures with distinct labels.
4. **Explore and understand:** The user can inspect an individual account, a consolidated transaction view, source-reported pending/unidentified records, and a separate bill calendar.
5. **Correct interpretations:** The user can easily correct an inferred bill, status, category, due date, or other user-adjustable classification where possible; source-reported information remains distinguishable from Facet's or the user's interpretation.
6. **Review new changes quietly:** New or materially changed financial patterns appear in a quiet discovery inbox rather than repetitive interruptions. Previously resolved discoveries should not require repeated approval without a meaningful change.

This is a product journey, not an implementation sequence or technology design.

## 4. Minimum useful release — candidate acceptance outcomes

| ID | User-visible outcome | Product boundary |
| --- | --- | --- |
| P01 | Real Plaid-connected financial information is available for the user's supported accounts | Do not assume universal institution/account coverage |
| P02 | Unified dashboard covers account position, income received, recognized bills, non-bill spending, and explained money remaining after obligations | Clearly distinguish observed data from estimates |
| P03 | Both **currently available after remaining obligations** and **projected month-end cash flow** are presented with distinct names/explanations | Not interchangeable or guaranteed available funds |
| P04 | The user can inspect each connected account separately and combined activity across accounts | One user/household initially |
| P05 | Transaction activity remains visible even when pending, unidentified, or not categorized | Display all entries currently available from the connected data source; do not hide them due to classification state. Source updates/replacements/removals may change the underlying records |
| P06 | Facet identifies likely recurring income and bills, including recognizable irregular obligations where sufficient evidence exists | Discovery is an inference requiring confirmation; unsupported prediction is not asserted as fact |
| P07 | An initial confirmation review and quiet discovery inbox allow the user to accept or correct newly identified or materially changed patterns | Avoid repeated approval requests for unchanged confirmed findings |
| P08 | A dedicated bill calendar shows accepted upcoming obligations and flags potentially overdue ones with explanations and correction options | The warning is not confirmation of nonpayment; display uncertainty |
| P09 | The user can conveniently examine source financial records and correct Facet's user-adjustable interpretations | No silent alteration of bank-reported source meaning; no bank-side changes |
| P10 | The web application is usable on both desktop and phone browsers | Native desktop/mobile apps not required |
| P11 | Account update/freshness information is visible; disconnected/stale accounts and materially incomplete financial pictures are clearly flagged | Do not present incomplete data as comprehensive or current |
| P12 | The app shows an **explainable estimated surplus** with relevant amounts and assumptions | Recommendations and allocation advice are **not** mandatory in the first release |
| P13 | All account access and user actions are **read-only with respect to external financial institutions** | No transfers, payments, trades, or account-changing bank actions in the initial release |

### Confirmed-versus-inferred information

- **All available source transactions remain visible**, whether posted, pending, unidentified, or awaiting correction. Visibility of a transaction is distinct from an accepted recurring bill pattern.
- **Future bills inferred but not confirmed by the user do not count toward the main bill totals or financial projections.** They may appear as proposed discoveries for review, with an indication that projections may omit unconfirmed obligations.
- A potentially overdue bill can be flagged when expected payment evidence is missing, but the app must explain the basis, allow corrections, and not assert nonpayment as established fact.
- Source-reported transactions, user-confirmed obligations, Facet predictions, and user corrections must be distinguishable to the user.
- A financial overview must indicate important freshness/coverage limitations when the available linked data is stale or incomplete.

## 5. Deferred and optional capabilities

**Not required in the first useful release:**
- Budget creation, detailed budget management, and advanced budgeting features.
- Long-horizon projections and financial modeling beyond the basic current/month-end financial picture.
- Investments and investment tracking.
- Multi-user or multi-household accounts and shared permissions.
- Native desktop or mobile applications.
- Money movement, bill payment, transfers, trades, and other external account-changing actions.
- Sophisticated personalized financial advice or automated surplus allocations.

**Optional idea, not committed first-release scope:** Simple informational surplus suggestions such as considering savings or future bills could be evaluated during planning **only if clearly low-cost and low-complexity**. The minimum release must remain useful without them; materially expanding scope or cost requires separate user direction and appropriate approval.

The above are candidate deferrals pending explicit approval of this checkpoint. `docs/BACKLOG.md` may record approved deferrals as needed; backlog ideas do not authorize implementation.

## 6. Remaining open matters and implementation-independent constraints

These do **not** silently enlarge the first-release requirement. The Architect must make consequential choices transparently with the user, record unknowns, and route changes in product meaning back to Creative.

- **Plaid reach and service suitability:** Which of the user's actual institutions, account types, loan/mortgage obligations, transaction feeds, due dates, and balance fields can be connected in the chosen operating environment? Plaid connectivity does not guarantee all requested data.
- **Cost, eligibility and setup:** Provider enrollment/product permissions, possible paid services, deployment/testing runtime, licenses, and maintenance are not established or approved.
- **Sensitive-data and security envelope:** Storage/retention, authentication, privacy expectations, connection revocation, network exposure, and permissions need user-informed consideration. No credential disclosure or cost/privilege consent is inferred.
- **Calculations and reconciliation:** Exact definitions of available-after-obligations versus month-end cash flow, expected income, time windows, internal transfers, credit card payment double-counting, uncertainty, and stale-data caveats require review.
- **Uncertain bill discovery:** Rules for identifying infrequent/irregular obligations, recognizing potentially overdue items, matching payment evidence, and reshowing materially changed patterns require careful scoping. Unconfirmed projected bills remain excluded from the main forecasts.
- **Data limitations:** Pending transactions can change, post, be replaced or disappear at the institution/provider; source completeness and update frequency vary. User-facing completeness and freshness must be honest, not promised absolutely.
- **Product detail decisions:** Exact information hierarchy, visual design, correction affordances, and discovery inbox mechanics are intentionally left for suitable later design and planning, without changing the accepted journey or boundary.

If a material first-release outcome proves infeasible within confirmed constraints, return the tradeoff to the user through the appropriate Creative/Architect authority path rather than silently dropping it, inventing coverage, or requiring an unapproved paid or privileged dependency.

## 7. Decision attribution and approval boundary

**Direct user direction across Discovery:** The user prioritized understanding their complete position; chose Plaid as essential; specified household coverage and account types; requested automatic bill/income recognition with one-time review; wanted raw transactions including pending/unidentified entries, a bill calendar, and easy corrections; preferred a quiet inbox, explainable potential-overdue warnings, browser access on desktop/phone, clearly separated current and projected figures, and one initial user; excluded unconfirmed future bills from main projections; chose explained surplus as the minimum rather than required advice; agreed to read-only financial operations and data freshness/completeness safeguards; and said the proposed first-release scope looked good so far.

**Creative synthesis submitted for approval:** The proposed product purpose, core journey, acceptance outcomes P01–P13, first-release deferrals, and constraint handling organize those preferences into one candidate product scope. They are **not yet an approved product baseline**.

**Formal checkpoint approval:** **PENDING USER DECISION.** Verbal alignment in Discovery rounds is not explicit approval of this exact document version. Only explicit approval bound to this committed checkpoint can permit Creative to record `PROJECT_DISCOVERY` approval in `docs/project-planning/APPROVALS.md` and, after a separately committed identity-bound handoff and routing state, make Architect project planning available. No implementation, purchase, credential use, deployment, Work Package, Iteration 001 entry, or roadmap approval is authorized by this checkpoint.
