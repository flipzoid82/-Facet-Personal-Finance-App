import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, joinedTransactions, validateOverride } from '../src/shared/domain.js';

test('all fixture rows remain visible and original source is immutable after joining an interpretation', () => {
  const original = JSON.stringify(fixture);
  const rows = joinedTransactions({ 'txn-pending': { category: 'Coffee', label: 'Sample', notes: 'demo' } });
  assert.equal(rows.length, fixture.transactions.length);
  assert.equal(rows.find(x => x.id === 'txn-pending').pending, true);
  assert.equal(rows.find(x => x.id === 'txn-pending').category, null);
  assert.equal(rows.find(x => x.id === 'txn-pending').interpretation.category, 'Coffee');
  assert.ok(rows.find(x => x.id === 'txn-unidentified'));
  assert.equal(JSON.stringify(fixture), original);
});
test('only bounded interpretation fields are accepted', () => {
  assert.throws(() => validateOverride({ category: 'x', label: '', notes: '', amountCents: 0 }));
  assert.throws(() => validateOverride({ category: '', label: '', notes: 'x'.repeat(501) }));
});
