import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fixture, joinedTransactions } from '../src/shared/domain.js';
import { scenarios, scenarioSnapshot } from '../src/shared/scenarios.js';
import { OverrideStore } from '../src/storage/override-store.js';
import { createServer } from '../src/server/index.js';

const view = () => ({ ...fixture, transactions: joinedTransactions({}) });
test('every scenario is deterministic and preserves canonical source; reset restores full exact IDs', () => {
  const original = JSON.stringify(fixture);
  for (const name of Object.keys(scenarios)) {
    const first = scenarioSnapshot(view(), name);
    assert.deepEqual(first, scenarioSnapshot(view(), name));
    assert.ok(first.transactions.every(row => fixture.transactions.some(source => source.id === row.id)));
    if (first.accounts.length) first.accounts[0].name = 'mutated derived view';
    assert.equal(JSON.stringify(fixture), original);
  }
  assert.equal(scenarioSnapshot(view(), 'unknown').accounts[0].balanceCents, null);
  assert.equal(scenarioSnapshot(view(), 'partial').balanceCoverage, 'partial');
  assert.equal(scenarioSnapshot(view(), 'missing').transactionCoverage, 'missing');
  assert.deepEqual(scenarioSnapshot(view(), 'normal').transactions.map(x => x.id), fixture.transactions.map(x => x.id));
  assert.throws(() => scenarioSnapshot(view(), 'https://bank.example'), /Unknown/);
});
test('real API allowlist, failure/retry, partial view and scenario reset preserve override bytes', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-scenarios-'));
  let server;
  try {
    const store = new OverrideStore(directory);
    await store.update('txn-unidentified', { category: 'Kept', label: 'saved', notes: 'persist' });
    const before = await fs.readFile(store.file, 'utf8');
    server = await createServer({ overrideStore: store });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await fetch(`${origin}/api/snapshot?scenario=arbitrary`)).status, 400);
    assert.equal((await fetch(`${origin}/api/snapshot?scenario=failure`)).status, 503);
    assert.equal((await fetch(`${origin}/api/snapshot?scenario=failure&recovered=1`)).status, 200);
    for (const scenario of Object.keys(scenarios).filter(x => x !== 'failure')) {
      const response = await fetch(`${origin}/api/snapshot?scenario=${scenario}`);
      assert.equal(response.status, 200); assert.equal((await response.json()).scenario, scenario);
    }
    const reset = await (await fetch(`${origin}/api/snapshot`)).json();
    assert.equal(reset.transactions.find(x => x.id === 'txn-unidentified').interpretation.category, 'Kept');
    assert.equal(await fs.readFile(store.file, 'utf8'), before);
  } finally { if (server) await new Promise(resolve => server.close(resolve)); await fs.rm(directory, { recursive: true, force: true }); }
});
test('unsupported version and corrupt/truncated JSON reject reads and edits without rewriting bytes', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-corruption-'));
  try {
    const store = new OverrideStore(directory);
    for (const bytes of ['{"version":2,"overrides":{}}', '{"version":1,', '{"version":1,"overrides":{"orphan":{"category":"","label":"","notes":""}}}']) {
      await fs.writeFile(store.file, bytes);
      await assert.rejects(store.read());
      await assert.rejects(store.update('txn-pending', { category: 'x', label: '', notes: '' }));
      assert.equal(await fs.readFile(store.file, 'utf8'), bytes);
    }
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});
