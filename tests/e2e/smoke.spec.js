import { test, expect } from '@playwright/test';
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

test('four routes, source-visible rows, browser edit and separate-process restart', async ({ page }) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'facet-browser-'));
  const port = 4197;
  const origin = `http://127.0.0.1:${port}`;
  let child;
  async function start() {
    child = spawn(process.execPath, ['src/server/index.js'], { cwd: process.cwd(), env: { ...process.env, FACET_PORT: String(port), FACET_STATE_DIR: directory }, stdio: 'pipe' });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('server did not start')), 10000);
      child.stdout.on('data', chunk => { if (chunk.toString().includes('Facet SYNTHETIC')) { clearTimeout(timer); resolve(); } });
      child.once('exit', code => { clearTimeout(timer); reject(new Error(`server exited ${code}`)); });
    });
  }
  async function stop() { if (!child || child.exitCode !== null) return; child.kill('SIGINT'); await new Promise(resolve => child.once('exit', resolve)); }
  try {
    await start();
    await page.goto(origin);
    await expect(page.getByText('SYNTHETIC / DEMO — no real accounts connected')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await page.getByRole('navigation').getByRole('link', { name: 'Accounts' }).click();
    await expect(page.getByRole('heading', { name: 'Accounts' })).toBeVisible();
    await page.getByRole('link', { name: 'Sample Checking' }).click();
    await expect(page.getByText('Sample Pending Cafe')).toBeVisible();
    await page.getByRole('navigation').getByRole('link', { name: 'Transactions' }).click();
    await expect(page.getByText('Unidentified sample merchant')).toBeVisible();
    const original = await (await page.request.get(`${origin}/api/snapshot`)).json();
    const rejected = await page.request.patch(`${origin}/api/transactions/txn-pending/override`, { headers: { Origin: origin }, data: { category: 'Coffee', label: '', notes: '', amountCents: 1 } });
    expect(rejected.status()).toBe(422);
    const unknown = await page.request.patch(`${origin}/api/transactions/unknown/override`, { headers: { Origin: origin }, data: { category: 'Coffee', label: '', notes: '' } });
    expect(unknown.status()).toBe(422);
    await page.getByRole('listitem').filter({ hasText: 'Sample Pending Cafe' }).getByRole('button', { name: 'Edit interpretation' }).click();
    await page.getByRole('textbox', { name: 'Category' }).fill('Coffee');
    await page.getByRole('textbox', { name: 'Label' }).fill('Morning');
    await page.getByRole('textbox', { name: 'Notes' }).fill('Invented note');
    await page.getByRole('button', { name: 'Save interpretation' }).click();
    await expect(page.getByRole('status').last()).toContainText('Saved');
    await stop(); await start(); await page.reload();
    await expect(page.getByRole('listitem').filter({ hasText: 'Sample Pending Cafe' })).toContainText('Coffee');
    await page.getByRole('listitem').filter({ hasText: 'Sample Pending Cafe' }).getByRole('button', { name: 'Edit interpretation' }).click();
    await expect(page.getByRole('textbox', { name: 'Label' })).toHaveValue('Morning');
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveValue('Invented note');
    const after = await (await page.request.get(`${origin}/api/snapshot`)).json();
    expect(after.transactions.map(x => [x.id, x.amountCents, x.pending, x.merchant])).toEqual(original.transactions.map(x => [x.id, x.amountCents, x.pending, x.merchant]));
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page.getByText('SYNTHETIC / DEMO — no real accounts connected')).toBeVisible();
    expect(await page.locator('body').evaluate(el => el.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Sample Pending Cafe' }).getByRole('button', { name: 'Edit interpretation' }).click();
    await page.getByRole('textbox', { name: 'Notes' }).fill('Saved despite failed refresh');
    await page.route('**/api/snapshot**', async route => {
      await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Injected refresh failure' }) });
    }, { times: 1 });
    await page.getByRole('button', { name: 'Save interpretation' }).click();
    await expect(page.getByRole('alert')).toContainText('Injected refresh failure');
    await expect(page.getByRole('status').last()).toContainText('Write confirmed in demo disk state, but the display could not reload');
    await expect(page.getByRole('status').last()).not.toContainText('Saved to demo disk state.');
    await expect(page.getByRole('button', { name: 'Retry' })).toBeFocused();
    await page.getByRole('button', { name: 'Retry' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Sample Pending Cafe' }).getByRole('button', { name: 'Edit interpretation' }).click();
    await expect(page.getByRole('textbox', { name: 'Notes' })).toHaveValue('Saved despite failed refresh');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.route('**/api/transactions/txn-pending/override', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Injected disk write failure' }) }));
    await page.getByRole('listitem').filter({ hasText: 'Sample Pending Cafe' }).getByRole('button', { name: 'Edit interpretation' }).click();
    await page.getByRole('textbox', { name: 'Notes' }).fill('Should not persist');
    await page.getByRole('button', { name: 'Save interpretation' }).click();
    await expect(page.getByRole('alert').last()).toContainText('Save failed: Injected disk write failure');
    await expect(page.getByRole('status').last()).not.toContainText('Saved to demo disk state.');
    await page.unroute('**/api/transactions/txn-pending/override');
    const unchanged = await (await page.request.get(`${origin}/api/snapshot`)).json();
    expect(unchanged.transactions.find(x => x.id === 'txn-pending').interpretation.notes).toBe('Saved despite failed refresh');
  } finally { await stop(); await fs.rm(directory, { recursive: true, force: true }); }
});
