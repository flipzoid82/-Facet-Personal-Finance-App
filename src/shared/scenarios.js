// All scenarios are invented views. They never write the canonical fixture or store.
export const scenarios = {
  normal: 'Populated / fresh sample', delayed: 'Delayed loading',
  'no-accounts': 'No accounts', 'empty-transactions': 'Empty transactions',
  stale: 'Stale source', disconnected: 'Disconnected source',
  unknown: 'Unknown balance', missing: 'Missing transactions',
  partial: 'Partial coverage', failure: 'Snapshot failure / retry'
};

export function scenarioSnapshot(snapshot, name) {
  if (!Object.hasOwn(scenarios, name)) throw new Error('Unknown synthetic scenario');
  const view = structuredClone(snapshot);
  view.scenario = name;
  view.balanceCoverage = 'complete';
  view.transactionCoverage = 'complete';
  view.sourceState = 'Fresh sample (simulated, not live)';
  if (name === 'no-accounts') { view.accounts = []; view.transactions = []; }
  if (name === 'empty-transactions') view.transactions = [];
  if (name === 'stale' || name === 'disconnected') {
    view.sourceState = name === 'stale' ? 'Stale sample — last observed values' : 'Disconnected sample — last observed values';
    view.observedAt = '2025-01-15T12:00:00.000Z';
  }
  if (name === 'unknown') {
    view.accounts[0].balanceCents = null;
    view.balanceCoverage = 'unknown';
  }
  if (name === 'missing') { view.transactions = []; view.transactionCoverage = 'missing'; }
  if (name === 'partial') {
    view.accounts = view.accounts.slice(0, 1);
    view.transactions = view.transactions.filter(row => row.accountId === view.accounts[0].id).slice(0, 2);
    view.balanceCoverage = 'partial'; view.transactionCoverage = 'partial';
  }
  view.coverage = `${view.accounts.length} included invented accounts; balances ${view.balanceCoverage}; transactions ${view.transactionCoverage}`;
  return view;
}
