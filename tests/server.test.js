import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { OverrideStore } from '../src/storage/override-store.js';
import { createServer } from '../src/server/index.js';

test('injected disk replacement failure returns HTTP error and preserves committed interpretation', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-api-failure-'));
  const initial = { category: 'Original', label: 'kept', notes: 'still here' };
  let server;
  try {
    const normal = new OverrideStore(directory);
    await normal.update('txn-pending', initial);
    const before = await fs.readFile(path.join(directory, 'overrides.json'), 'utf8');
    const failed = new OverrideStore(directory, {
      readFile: (...args) => fs.readFile(...args),
      mkdir: (...args) => fs.mkdir(...args),
      writeFile: (...args) => fs.writeFile(...args),
      rm: (...args) => fs.rm(...args),
      rename: async () => { throw Object.assign(new Error('Injected disk write failure'), { code: 'EIO' }); }
    });
    server = await createServer({ overrideStore: failed });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const response = await fetch(`${origin}/api/transactions/txn-pending/override`, {
      method: 'PATCH', headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'New', label: 'lost', notes: 'must not persist' })
    });
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: 'Injected disk write failure' });
    assert.equal(await fs.readFile(path.join(directory, 'overrides.json'), 'utf8'), before);
    const snapshot = await (await fetch(`${origin}/api/snapshot`)).json();
    assert.deepEqual(snapshot.transactions.find(x => x.id === 'txn-pending').interpretation, initial);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    await fs.rm(directory, { recursive: true, force: true });
  }
});
