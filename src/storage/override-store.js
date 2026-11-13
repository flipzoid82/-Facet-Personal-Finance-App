import { promises as fs } from 'node:fs';
import path from 'node:path';
import { transactionIds, validateOverride } from '../shared/domain.js';

const empty = () => ({ version: 1, overrides: {} });
function checked(value) {
  if (!value || value.version !== 1 || !value.overrides || typeof value.overrides !== 'object' || Array.isArray(value.overrides)) throw new Error('Demo state is corrupt or uses an unsupported version; no data was discarded');
  for (const [id, body] of Object.entries(value.overrides)) {
    if (!transactionIds.has(id)) throw new Error('Demo state refers to an unknown transaction; no data was discarded');
    validateOverride(body);
  }
  return value;
}
export class OverrideStore {
  constructor(directory, operations = fs) { this.directory = path.resolve(directory); this.file = path.join(this.directory, 'overrides.json'); this.queue = Promise.resolve(); this.operations = operations; }
  async read() {
    try {
      const info = await (this.operations.stat ?? fs.stat)(this.directory);
      if (!info.isDirectory()) throw new Error('Demo state directory is not a directory; no data was discarded');
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    try { return checked(JSON.parse(await this.operations.readFile(this.file, 'utf8'))); }
    catch (error) { if (error.code === 'ENOENT') return empty(); throw error; }
  }
  async update(id, body) {
    if (!transactionIds.has(id)) throw new Error('Unknown sample transaction');
    const valid = validateOverride(body);
    const operation = this.queue.then(async () => {
      const state = await this.read();
      const next = { version: 1, overrides: { ...state.overrides, [id]: valid } };
      await this.operations.mkdir(this.directory, { recursive: true });
      const temporary = path.join(this.directory, `overrides-${process.pid}-${crypto.randomUUID()}.tmp`);
      try { await this.operations.writeFile(temporary, JSON.stringify(next), { flag: 'wx', mode: 0o600 }); await this.operations.rename(temporary, this.file); }
      finally { await this.operations.rm(temporary, { force: true }).catch(() => {}); }
      return valid;
    });
    this.queue = operation.catch(() => {});
    return operation;
  }
  async flush() { await this.queue; }
}
