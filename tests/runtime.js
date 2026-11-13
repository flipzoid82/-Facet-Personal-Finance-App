import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';

export async function freePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
export async function runtime() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-wp02-'));
  const port = await freePort();
  const origin = `http://127.0.0.1:${port}`;
  let child;
  return {
    directory, origin,
    async start() {
      child = spawn(process.execPath, ['src/server/index.js'], { env: { ...process.env, FACET_PORT: String(port), FACET_STATE_DIR: directory }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
      await new Promise((resolve, reject) => {
        let output = '';
        const timer = setTimeout(() => reject(new Error(`Startup timeout: ${output}`)), 10000);
        child.stdout.on('data', chunk => { output += chunk; if (output.includes('Facet SYNTHETIC')) { clearTimeout(timer); resolve(); } });
        child.stderr.on('data', chunk => { output += chunk; });
        child.once('error', error => { clearTimeout(timer); reject(error); });
        child.once('exit', code => { clearTimeout(timer); reject(new Error(`Startup exit ${code}: ${output}`)); });
      });
      return child.pid;
    },
    async stop() {
      if (!child || child.exitCode !== null || child.signalCode !== null) return;
      const exited = once(child, 'exit'); child.kill('SIGINT');
      let timer;
      try { await Promise.race([exited, new Promise((_, reject) => { timer = setTimeout(() => { child.kill(); reject(new Error('Child shutdown timeout')); }, 10000); })]); }
      finally { clearTimeout(timer); }
    },
    async dispose() { await this.stop(); await fs.rm(directory, { recursive: true, force: true }); }
  };
}
