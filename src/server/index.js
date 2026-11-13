import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixture, joinedTransactions } from '../shared/domain.js';
import { OverrideStore } from '../storage/override-store.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'dist');
const port = Number(process.env.FACET_PORT ?? 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('FACET_PORT must be 1–65535');
const store = new OverrideStore(process.env.FACET_STATE_DIR ?? path.join(root, '.facet-demo-state'));
const send = (res, status, value) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.svg': 'image/svg+xml' };
export async function createServer() {
  await fs.access(path.join(dist, 'index.html'));
  await store.read();
  return http.createServer(async (req, res) => {
    const origin = `http://127.0.0.1:${port}`;
    if (req.headers.host !== `127.0.0.1:${port}`) return send(res, 403, { error: 'Loopback host required' });
    const url = new URL(req.url, origin);
    if (url.pathname.startsWith('/api/')) {
      if (req.method === 'GET' && url.pathname === '/api/snapshot') {
        try { const state = await store.read(); return send(res, 200, { ...fixture, transactions: joinedTransactions(state.overrides) }); }
        catch { return send(res, 503, { error: 'Demo state cannot be read safely; inspect the state file before retrying' }); }
      }
      const match = /^\/api\/transactions\/([^/]+)\/override$/.exec(url.pathname);
      if (req.method === 'PATCH' && match) {
        if (req.headers.origin !== origin) return send(res, 403, { error: 'Same-origin edit required' });
        try {
          let raw = '';
          for await (const chunk of req) { raw += chunk; if (raw.length > 4096) return send(res, 413, { error: 'Edit too large' }); }
          const saved = await store.update(decodeURIComponent(match[1]), JSON.parse(raw));
          return send(res, 200, { saved });
        } catch (error) { return send(res, error instanceof SyntaxError ? 400 : /Unknown|Only|Supply|must be/.test(error.message) ? 422 : 503, { error: error.message }); }
      }
      return send(res, 404, { error: 'Unknown demo API route' });
    }
    if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
    const relative = url.pathname === '/' || !path.extname(url.pathname) ? 'index.html' : url.pathname.slice(1);
    const target = path.resolve(dist, relative);
    if (!target.startsWith(dist + path.sep) && target !== path.join(dist, 'index.html')) return send(res, 403, { error: 'Invalid path' });
    try { const bytes = await fs.readFile(target); res.writeHead(200, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(bytes); }
    catch { send(res, 404, { error: 'Asset not found' }); }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createServer().then(server => {
    server.on('error', error => { console.error(`Facet demo startup failed: ${error.message}`); process.exitCode = 1; });
    server.listen(port, '127.0.0.1', () => console.log(`Facet SYNTHETIC / DEMO at http://127.0.0.1:${port}`));
    process.on('SIGINT', () => server.close(async () => { await store.flush(); process.exit(0); }));
  }).catch(error => { console.error(`Facet demo startup failed: ${error.message}`); process.exitCode = 1; });
}
