import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { freePort } from './runtime.js';

async function failedStart(cwd, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['src/server/index.js'], { cwd, env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    let output = '';
    const timer = setTimeout(() => { child.kill(); reject(new Error('Expected bounded startup failure')); }, 10000);
    child.stdout.on('data', x => { output += x; }); child.stderr.on('data', x => { output += x; });
    child.once('error', error => { clearTimeout(timer); reject(error); });
    child.once('exit', code => { clearTimeout(timer); resolve({ code, output }); });
  });
}
test('startup rejects missing build, occupied port, invalid directory, corrupt and unsupported state without deletion', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-startup-'));
  let listener;
  try {
    await fs.cp('src', path.join(directory, 'src'), { recursive: true });
    await fs.cp('fixtures', path.join(directory, 'fixtures'), { recursive: true });
    await fs.writeFile(path.join(directory, 'package.json'), '{"type":"module"}');
    const state = path.join(directory, 'state');
    const base = { FACET_STATE_DIR: state, FACET_PORT: String(await freePort()) };
    const missing = await failedStart(directory, base); assert.equal(missing.code, 1); assert.match(missing.output, /startup failed.*ENOENT/);
    await fs.cp('dist', path.join(directory, 'dist'), { recursive: true });
    listener = net.createServer(); await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve));
    const occupied = await failedStart(directory, { ...base, FACET_PORT: String(listener.address().port) });
    assert.equal(occupied.code, 1); assert.match(occupied.output, /EADDRINUSE/);
    assert.equal(listener.listening, true);
    const invalidPort = await failedStart(directory, { ...base, FACET_PORT: 'bad' }); assert.notEqual(invalidPort.code, 0); assert.match(invalidPort.output, /FACET_PORT/);
    await fs.writeFile(state, 'sentinel');
    const invalid = await failedStart(directory, base); assert.equal(invalid.code, 1); assert.match(invalid.output, /startup failed/);
    assert.equal(await fs.readFile(state, 'utf8'), 'sentinel');
    await fs.unlink(state); await fs.mkdir(state);
    for (const bytes of ['{broken', '{"version":2,"overrides":{}}']) {
      await fs.writeFile(path.join(state, 'overrides.json'), bytes);
      const corrupt = await failedStart(directory, base); assert.equal(corrupt.code, 1); assert.match(corrupt.output, /startup failed/);
      assert.equal(await fs.readFile(path.join(state, 'overrides.json'), 'utf8'), bytes);
    }
  } finally { if (listener) await new Promise(resolve => listener.close(resolve)); await fs.rm(directory, { recursive: true, force: true }); }
});
test('runtime source has no provider dependency, server outbound primitive or external client request', async () => {
  const manifest = JSON.parse(await fs.readFile('package.json', 'utf8'));
  assert.deepEqual(Object.keys(manifest.dependencies).sort(), ['@vitejs/plugin-react', 'react', 'react-dom', 'vite']);
  for (const directory of ['src/server', 'src/storage', 'src/shared']) {
    for (const name of await fs.readdir(directory)) {
      const source = await fs.readFile(path.join(directory, name), 'utf8');
      assert.doesNotMatch(source, /\bfetch\s*\(|\b(?:https?|net)\.(?:request|get|connect)\s*\(|plaid|access_token|client_secret/i);
    }
  }
  const client = await fs.readFile('src/client/main.jsx', 'utf8');
  const calls = [...client.matchAll(/fetch\(([^,\n]+)/g)].map(x => x[1]);
  assert.equal(calls.length, 2); assert.ok(calls.every(x => x.startsWith('`/api/')));
  assert.doesNotMatch(client, /https?:\/\/|access_token|client_secret|plaid/i);
});
