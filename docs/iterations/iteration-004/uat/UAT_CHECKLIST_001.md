# Facet — Iteration 004 User Acceptance Test Checklist 001

**Cycle:** `I004-UAT-001`; **owner decision:** **PERFORM UAT**, decision record `UAT_DECISION_001.md` blob `767f5c9f21e0eda3beede5bdc6feda7ac172b1a7`, first containing commit `ffd53bc31949a62f7f3f7354194dcddbf4faa1bb`.
**Assessment:** `UAT_ASSESSMENT_001.md` blob `43ea3dc93db99c3b0b7f666cef95b57440431e68`, first containing commit `7bb4b3dfeceacab0283c8e6d567e5fa57d3a1d8e`.
**Exact substantive candidate:** `f286934e286d965e3068548b10e9ee43070313b5` (merged WP01 PR #16 and WP02 PR #18). **Acceptance map:** `ITERATION_ACCEPTANCE.md` v0.1.0 blob `9abf75c97617b2963588e90b01ac981885fb59c7`.
**Status:** Checklist prepared, **no user UAT run/results yet**. Execution prerequisite remains unverified. This is owner-facing descriptive feedback, not another Builder technical audit or host-security test.

## Before any interaction — mandatory safe-access prerequisite

- The owner must first be offered an **actually available, authorized, owner-accessible controlled runtime** of the exact synthetic candidate, with clear access details from its authorized operator. None is established by the decision or this checklist. If unavailable, mark **EXECUTION BLOCKED — NO APPROVED ACCESSIBLE DEMO** and stop: do not fabricate observations or treat builder test logs as owner UAT. Preparation alone does not start the app.
- **No change to the owner's personal computer without fresh separate explicit approval**: do not install Node/npm/Chromium, run local scripts, configure Windows, add firewall exceptions, change port/network/browser trust, alter files/drives/backup/phone, or expose a LAN/public interface. Do not ask for credentials, bank account access or Plaid tokens. If a safe browser-only preview is later offered, separately verify its legitimacy, actual deployment and exact synthetic candidate; GitHub source or CI evidence alone is not a running demo.
- Any runtime operator must stop its *own* permitted demo and preserve test/synthetic state according to its authorization. Data must be fictional; no personal accounts or financial records. The owner's PERFORM choice is not environment or host permission.
- When access is ready, owner can describe each item as **worked / did not work / confusing / not observed**, with notes in ordinary language. No severity labels or test-engineering terminology are needed. Skip any item whose setup isn't available; mark it **not observed**, not PASS.

## User-facing UAT items (record observations separately; do not prefill results)

### UAT-01 — Identify the demo and navigate the Overview (new S1 experience; I004-C01, C02, C06)
**Precondition:** verified authorized running sample app in a browser, default Normal scenario, no real accounts.
**User action:** Open the provided app URL; look at the top banner and Overview, then find Accounts and Transactions navigation.
**Expected:** Prominent “SYNTHETIC / DEMO — no real accounts connected” label is visible. Overview describes **$11,150.00** as fictional sample-account balances, not available cash; links/screens are understandable and navigable. No bank connection/login prompt.
**Describe:** Are the names, money labels and navigation clear? Any confusion about whether this is real financial information?

### UAT-02 — Inspect accounts and drill down (new WP01 behavior, preserved WP02; I004-C02, C03)
**Precondition:** Normal scenario and overview visible.
**User action:** Open Accounts; select Sample Checking; view its sample balance and transaction activity; navigate back to Accounts and to Transactions.
**Expected:** An understandable account list, a matching account detail screen and the account's fictional transactions; no missing navigational route or misplaced data; demo identity stays visible.
**Describe:** Did the account detail and return navigation make sense? Were transactions plausibly linked to the account?

### UAT-03 — Inspect complete transaction history (WP01 focused regression; I004-C03, C06)
**Precondition:** Normal scenario.
**User action:** Open Transactions without filters, then inspect both posted and pending activity and the record with unidentified merchant.
**Expected:** **Six fictional source transactions** are available in the combined list, including pending and unidentified rows. Rows show sample source IDs and do not look like actual bank activity.
**Describe:** Are rows, pending status and unidentified descriptions comprehensible?

### UAT-04 — Filter and restore transactions (new WP02 behavior; I004-C03)
**Precondition:** Transactions page, Normal scenario; any earlier filters cleared.
**User action:** Choose Sample Checking in Account filter; choose Pending in Status; optionally choose a category that makes zero matches; then choose **Clear filters**.
**Expected:** Account filter narrows to **four** checking transactions; Pending narrows further to the pending row; an incompatible category gives **No matches** without suggesting deletion. Clear filters restores **all six** original source rows.
**Describe:** Did you understand which filters were active? Could you easily get all transactions back?

### UAT-05 — Edit a transaction (new WP01 feature, retained WP02; I004-C04)
**Precondition:** Normal scenario with at least one visible transaction; a permitted disposable synthetic state store is associated with the demo.
**User action:** Edit a fictional transaction's **Category, Label and Notes** using memorable invented text; save, navigate away, return and re-open its editor.
**Expected:** A clear saved confirmation after successful refresh; all three interpretation fields remain, original source amount/merchant/status unchanged. The editor and Cancel/Save actions are easy to understand.
**Describe:** Did editing feel intuitive? Were there errors or any ambiguous success message?

### UAT-06 — Non-destructive scenario reset (WP02 new behavior, WP01 persistence regression; I004-C04, C05)
**Precondition:** An invented edit from UAT-05 has been saved.
**User action:** Choose a non-default Synthetic scenario, then select **Reset scenario**; return to the previously edited fictional transaction.
**Expected:** Scenario resets to Normal; saved category/label/notes remain. Reset does **not** say it deleted transactions or wipe edits.
**Describe:** Was the difference between sample scenario reset and saved interpretation clear?

### UAT-07 — Unknown and partial totals (WP02 new behavior; I004-C02, C05)
**Precondition:** Overview, with Synthetic scenario selector available.
**User action:** Choose **Unknown balance**, then **Partial coverage**, and inspect each total, source time and coverage explanation.
**Expected:** No falsely complete total. Unknown balance shows a **$8,700.00 known subtotal** with total explicitly unknown/incomplete; Partial coverage shows **$2,450.00 known subtotal** and coverage limited. No display claims a current connected bank balance.
**Describe:** Does the language clearly explain incomplete totals rather than making the subtotal look like all your money?

### UAT-08 — Missing, stale and disconnected states (WP02 new behavior; I004-C05, C06)
**Precondition:** Scenario selector, no need to modify storage.
**User action:** Review **Empty transactions**, **Missing transactions**, **No accounts**, **Stale source** and **Disconnected source** scenarios.
**Expected:** Empty means an empty fictional dataset; missing means coverage is unknown, not proof of zero history; no-accounts has clear messaging; stale/disconnected figures say **last observed** and do not claim live freshness. Demo banner remains visible.
**Describe:** Which states were helpful or unclear? Were any values misleading?

### UAT-09 — Safe error and Retry (WP02 new behavior; WP01 failed-refresh regression context; I004-C04, C05)
**Precondition:** Valid authorized demo; do **not** manually edit or corrupt files.
**User action:** Select **Snapshot failure / retry**, read its message and use **Retry**.
**Expected:** The app explains synthetic data is temporarily unavailable, retains the DEMO identity, presents an obvious retry control, and reloads its fictional state without altering saved edits. No fake success or request for bank credentials.
**Describe:** Was recovery self-explanatory? Did Retry behave as you expected?

### UAT-10 — Keyboard and readable responsive UI (WP02 new behavior; I004-C07)
**Precondition:** A permitted browser interface supports keyboard navigation and, if already provided by its operator, narrow/mobile-sized and desktop viewport previews. **Do not change the owner's device/browser configuration or install test tools for this item.**
**User action:** Navigate using Tab/Shift+Tab and Enter through navigation, filters, transaction editor and Retry; look for visible focus. If supported by the existing accessible preview, inspect narrow and wide layouts.
**Expected:** Focus is obvious, controls have understandable names, error/saved messages are noticeable, and content and actions are readable without horizontal cutoff at the prepared **375px** and **1280px** reference widths. Actual phone or screen-reader operation is not certified by this test.
**Describe:** What felt awkward, hidden, inaccessible or hard to read? If viewport preview isn't available, mark that portion **not observed**.

### UAT-11 — Stop/restart and retained edits (focused WP01/WP02 persistence regression; I004-C01, C04, C08)
**Precondition:** Only if a separately authorized operator controls the running demo and agrees to restart **its own permitted synthetic process** without touching the owner's machine. Otherwise mark **not observed**; Builder's prior automated distinct-process test remains valid separate T2 proof.
**User action:** Ask the authorized runtime operator to stop and restart the synthetic app; revisit the edited transaction.
**Expected:** App returns after the operator's authorized restart; saved category, label and notes from UAT-05 persist while the original source information stays the same.
**Describe:** Was the restart/recovery understandable? Did edits survive? Do not perform system/terminal operations yourself without a separate applicable authorization.

## How to return observations

Reply with item numbers and plain descriptions, e.g. **“UAT-04 — filters worked, but I couldn't tell which were active”; “UAT-07 — the partial-total label was confusing”; “UAT-11 — not observed, no approved runtime operator.”** You do not have to assign pass/fail or severity. Screenshots are optional and should contain fictitious data only.

Architect will preserve your exact observations in `UAT_REPORT_001.md` and separately triage actual findings as `BLOCKS_RELEASE`, `CORRECTION_REQUIRED` or `NON_BLOCKING`. No observation grants implementation authority. Post-merge defects require a fresh separately approved corrective WP. After performed UAT and successful triage, release still requires a **separate owner release-completion approval**; real Plaid, Navy Federal, physical host security/storage, paid services and later WPs remain outside S1.
