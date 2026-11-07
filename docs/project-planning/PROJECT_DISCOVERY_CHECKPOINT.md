# Project Discovery Checkpoint — Working Draft

**Project:** [Facet] Personal Finance App  
**Stage:** Project-level Discovery, before Iteration 001  
**Status:** WORKING DRAFT — NOT SUBMITTED FOR APPROVAL  
**Draft version:** 0.3  
**Draft started:** 2026-11-07  
**Latest Discovery revision:** 2026-11-07 (Round 5: financial measures, full transaction visibility, single-user scope)  
**Source context:** `docs/discovery/PROJECT_DISCOVERY.md` and direct Creative Discovery discussion with the user  
**Initial repository context:** `main` at `03fe927df8781ba000b918487f5b4307fdb30e37`

> This is a living Discovery work record, not a formal approval checkpoint. It captures direct user statements separately from Creative interpretations and unresolved questions. No product scope has been formally approved. Do not treat this draft as authority for Architect planning, implementation, purchases, services, or other later gates.

## 1. Problem and desired outcome

### User-stated direction

- The primary problem to solve is **understanding the complete financial position**.
- A useful opening experience should answer questions such as:
  - How are all connected accounts doing?
  - How much income has arrived from paychecks?
  - Is there enough money to cover this month's bills?
  - Is there a surplus, and what might be done with it?
  - What bills are coming due, possibly missed, or due this month in total?
  - How much is being spent outside of bills?
- The user wants the underlying financial information consolidated and understandable, with the ability to investigate detail.

### Proposed interpretation (not yet explicitly approved)

Facet should help a user distinguish current balances, observed cash flows, anticipated obligations, and **estimated** money remaining after obligations. This goes beyond simply listing account balances, but it must not present uncertain inferences as verified facts.

## 2. Initial audience

### User-stated direction

- The target audience could depend on the eventual user.
- For the initial user's own use, the financial picture should cover the **whole household**.
- The user and spouse share bank accounts, so the initial household experience need not assume a separate multi-person account-management feature.
- **Round 5:** one user account managing the household's financial picture is sufficient for the first useful release; multiple distinct user profiles are not required initially.

### Open

- Future household sharing, additional user profiles, and support for other users or households are not part of the stated first-release need; their later shape is undecided.

## 3. Candidate initial account coverage

### User-stated direction

- **Real Plaid-based financial account connections are essential to the first useful release.**
- Initial financial picture should consider checking/bank accounts, savings, credit cards, mortgages, and loans.
- Investments can be considered later; they are not an initial priority.

### Open and caveats

- Which institutions and account data must actually be available for the first useful release; connection and data coverage cannot be presumed.
- How unavailable, disconnected, delayed, or partially synced data is communicated to the user.
- Real account linking is a product requirement candidate; provider costs, deployment, credentials, infrastructure, and technical feasibility belong to later Architect planning and separate approvals.

## 4. Proposed first useful release — directly requested capabilities, not final approval

The user explicitly indicated that the following experience would already be very useful:

1. **Unified financial dashboard**: connected account balances; income received; bills identified; expected remaining bills; spending outside bills; and an estimate of money remaining after obligations. **Round 5:** show both (a) currently available money after remaining obligations and (b) projected month-end cash flow, **clearly distinguished and labeled**. The exact calculation, balance treatment, and disclosure of uncertainty are still undecided.
2. **Connected-account exploration**: view information across accounts together and examine each connected account individually.
3. **Transaction visibility**: see the raw transaction list in addition to Facet's categorized/interpreted views. **Round 5:** never hide transaction entries merely because they are pending, unrecognized, or otherwise unresolved; show them with appropriate status labels.
4. **Recurring income and bill identification**: detect recurring paychecks, recurring bills, and potentially irregular obligations from connected data.
5. **Dedicated bill calendar**: visualize upcoming bills separately from the main dashboard.
6. **Straightforward corrections**: allow the user to intuitively review and correct Facet's interpretations where possible.
7. **Browser-based access**: a web application accessible from desktop and phone browsers is the user's first-release platform preference (responsive details and deployment are not yet defined).

These are candidate minimum useful release outcomes derived from the user's expressed preferences; the exact boundaries, acceptance conditions, and prioritization remain to be confirmed.

## 5. Discovery and confirmation behavior

### User-stated direction

- Facet should identify income and bills from connected account information rather than require the user to enter every bill manually.
- Newly discovered information should be **presented for user approval before being incorporated as accepted interpretations of the financial picture**.
- Confirmation should be a **one-time step for each discovery event** when appropriate, avoiding overwhelming repetitive notices.
- Facet may make inferences, but the raw transactions must remain viewable.
- **Round 5:** every transaction should remain visible and appropriately labeled, including pending and unidentified transactions. Lack of a confirmed interpretation must not make a source transaction disappear.
- Users should be able to make corrections easily and intuitively when needed.
- Irregular bills should also be discoverable, subject to how the concept is clarified.
- **Discovery presentation (Round 4):** the user chose an **initial review plus a quiet discovery inbox for new or changed findings**, rather than repetitive immediate notifications or periodic prompts. Exact reconsideration rules and batching remain open.
- **Uncertain bill status (Round 4):** when an expected payment is not found, Facet should show **potentially overdue**, explain why it believes that, and let the user correct the status. This is an inference, not proof a payment was missed.

### Proposed safeguards to discuss (not approved)

- Distinguish original source transactions from Facet's classifications, estimates, and user corrections; corrections should not silently rewrite bank-supplied source records.
- Clearly label expected dates, amounts, and payment statuses as inferred when not confirmed.
- Show observed transactions and pending/unidentified entries separately from any proposed recurring-bill classification. This is a suggested information-trust distinction; exact interface representation is open.
- The chosen quiet inbox should minimize repeated confirmations for findings the user already addressed; its precise triggers and grouping still need definition.

### Open

- What qualifies as a new or materially changed pattern, and how the inbox avoids repetitive approvals.
- **Unresolved from Round 5:** the user's response establishes transaction visibility, but does not yet specify whether an **unconfirmed inferred bill** contributes to projected bill totals. Explicitly distinguish source transaction display from acceptance of an inferred obligation.
- How to distinguish irregular-but-predictable bills from one-off expenses.
- How missing, ambiguous, late, or disputed payments are reconciled and how 'potentially overdue' is explained and corrected.

## 6. Surplus and next-step guidance

### User-stated direction

- The user wants to know if funds remain after bills and what might be done with that surplus.
- Savings, debt repayment, future expenses, and discretionary spending sound like potentially useful suggestions.
- The user **has not decided** the desired degree of suggestion or guidance.

### Open

- Whether first release offers only a surplus estimate, lightweight options, or actionable recommendations.
- How the app should avoid implying that estimated surplus is guaranteed available cash.

## 7. Product accessibility and tentative deferrals

### User-stated platform preference (Round 4)

- The user chose a **browser-based application accessible on desktop and phone**.
- This is a product-access requirement preference, not a choice of frontend framework, hosting vendor, backend, security architecture, or other technical implementation.

### Candidate later-release scope

### User-stated direction

The following may be set aside for future builds:

- Budget creation and advanced budgeting.
- Long-term financial projections.
- Investment tracking.
- Advanced financial advice or sophisticated surplus guidance.

This deferral is a strong scope preference, **not an approved out-of-scope list**. The initial dashboard may still need enough basic calculations to show the monthly financial picture.

## 8. Tentative core journey (Creative synthesis, not approved)

1. Connect financial accounts via Plaid.
2. Review newly inferred recurring income, bills, and other discoveries in an initial review, then use a quiet discovery inbox for new or changed findings.
3. Open a consolidated dashboard for balances, income, bills, expenses, clearly separated current available-after-obligations estimates and projected month-end cash flow.
4. Navigate to an account, raw transaction history, or separate bill calendar, from desktop or phone browsers.
5. Correct misinterpretations and review changes without losing the original transaction evidence.

## 9. Outstanding questions and unresolved boundaries

1. **Unconfirmed inferred bills:** clearly visible source transactions are required, but it remains undecided whether estimated future obligations count toward dashboard projections before confirmation.
2. **Financial measures:** current available-after-obligations estimates and projected month-end cash flow must be distinctly labeled, but calculation inputs, timing, and uncertainty rules need later clarification.
3. **Data trust:** source-data visibility, categorization override behavior, incomplete connections, and stale data warnings.
4. **Discovery inbox details:** how new or changed findings are recognized, grouped, and re-presented without repeated prompts.
5. **Bill-status explanations:** clarify confidence, missed-payment signals, correction behavior, and what can legitimately be labeled 'potentially overdue'.
6. **First-release boundary:** confirm the precise minimum outcomes and what is formally deferred.
7. **Surplus guidance:** confirm whether any recommendation functionality belongs in the first useful release.
8. **Future sharing:** multi-user and multi-household capabilities are not requested for the first release; later direction is open.

## 10. Approval and workflow status

- **Phase/state at draft creation:** `PROJECT_DISCOVERY / CREATIVE_DISCOVERY`.
- **Current role:** `CREATIVE`.
- **Iteration/WorkPackage:** none / none.
- **Handoff:** none.
- **ImplementationAuthorized:** false.
- **Formal project Discovery approval:** **NOT REQUESTED / NOT GRANTED**.
- **Architect handoff:** **NOT AUTHORIZED**.

When Discovery is sufficiently resolved, Creative will revise this draft into an exact approval candidate, commit it, record its blob and containing commit in a **separate passive state transition** to `AWAITING_PROJECT_DISCOVERY_APPROVAL`, and provide the required exact-checkpoint approval report. Only an explicit approval of that candidate may trigger the separate approval-ledger and Creative-to-Architect transition. Planning approval does not authorize implementation.
