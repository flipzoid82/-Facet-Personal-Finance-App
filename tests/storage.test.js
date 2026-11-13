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

test('failed replacement leaves the previous committed override intact', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-failed-write-'));
  const first = { category: 'Original', label: 'kept', notes: 'prior committed note' };
  const replacement = { category: 'New', label: 'not saved', notes: 'must not appear' };
  try {
    const normal = new OverrideStore(directory);
    await normal.update('txn-pending', first);
    const before = await fs.readFile(path.join(directory, 'overrides.json'), 'utf8');
    let attempted = false;
    const failing = new OverrideStore(directory, {
      readFile: (...args) => fs.readFile(...args),
      mkdir: (...args) => fs.mkdir(...args),
      writeFile: (...args) => fs.writeFile(...args),
      rm: (...args) => fs.rm(...args),
      rename: async () => { attempted = true; throw Object.assign(new Error('Injected replacement failure'), { code: 'EIO' }); }
    });
    await assert.rejects(failing.update('txn-pending', replacement), /Injected replacement failure/);
    assert.equal(attempted, true);
    assert.equal(await fs.readFile(path.join(directory, 'overrides.json'), 'utf8'), before);
    assert.deepEqual((await new OverrideStore(directory).read()).overrides['txn-pending'], first);
    assert.deepEqual((await fs.readdir(directory)).sort(), ['overrides.json']);
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});
