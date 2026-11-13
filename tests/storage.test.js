import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { OverrideStore } from '../src/storage/override-store.js';

test('queued edits persist across store instances and corrupt state is not discarded', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-store-'));
  try {
    const store = new OverrideStore(directory);
    await Promise.all([store.update('txn-pending', { category: 'Cafe', label: 'a', notes: 'one' }), store.update('txn-grocery', { category: 'Food', label: 'b', notes: 'two' })]);
    const fresh = new OverrideStore(directory);
    assert.equal((await fresh.read()).overrides['txn-pending'].category, 'Cafe');
    assert.equal((await fresh.read()).overrides['txn-grocery'].notes, 'two');
    await fs.writeFile(path.join(directory, 'overrides.json'), '{broken');
    await assert.rejects(fresh.update('txn-pending', { category: 'Other', label: '', notes: '' }));
    assert.equal(await fs.readFile(path.join(directory, 'overrides.json'), 'utf8'), '{broken');
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});
