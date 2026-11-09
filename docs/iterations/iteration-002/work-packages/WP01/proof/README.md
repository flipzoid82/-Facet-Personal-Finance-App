# I002 WP01 isolated synthetic proof

Run from this directory with the already available Node runtime:

```text
node run-tests.mjs
```

The runner installs process-local guards against `fetch`, HTTP(S), TCP, TLS and UDP calls before importing the tests. It uses only Node built-ins and synthetic names/amounts. It opens no listener, reads no credentials, installs nothing, and writes no runtime data. It is a small model of Facet state handling, not an implementation of Plaid Link or a provider API client.

Files:

- `browser.mjs`: separate desktop/Android ordinary-browser and initial/update flow states, callback validation, expiry, cancellation and retry. The update-mode domainless provider route remains `UNKNOWN` even when the fake callback passes.
- `transactions.mjs`: in-memory multi-page Sync staging, all-pages-before-commit, original-cursor restart on mutation, bounded failure, pending replacement and correction preservation.
- `non-transactions.mjs`: independent Item/consent, account, balance, liability, recurring, initial-history and missed-webhook status assessment with explicit source age and repair/retention flags.
- `fixtures/nine-day-gap.json`: a fixed virtual nine-day gap with two pages and an auditable expected state.
- `proof.test.mjs`: deterministic positive and negative oracles; the test script imports no Plaid SDK or application database.

The `FRESH` state is a *synthetic oracle output* only when a fixture supplies complete coverage and a recent explicit source time. A successful API fetch alone cannot establish it. Physical Android, owner PC, real bank/provider, long-term cost, security and no-domain update-mode feasibility remain untested.
