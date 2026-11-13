import { test, expect } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { runtime } from '../runtime.js';

const ids = ['txn-grocery', 'txn-pending', 'txn-unidentified', 'txn-pay', 'txn-save', 'txn-interest'];
const checking = ids.slice(0, 4);
const banner = 'SYNTHETIC / DEMO — no real accounts connected';
const visibleIds = page => page.locator('[data-source-id]').evaluateAll(rows => rows.map(x => x.dataset.sourceId));
async function tabTo(page, locator) {
  for (let index = 0; index < 60; index++) {
    if (await locator.evaluate(el => el === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  throw new Error('Control not keyboard reachable');
}
async function keyboardActivate(page, locator) { await tabTo(page, locator); await expect(locator).toBeFocused(); await page.keyboard.press('Enter'); }
async function stable(page) { await expect(page.getByText('Loading invented sample data…')).toHaveCount(0); }
async function layout(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const control of await page.locator('main button, main input, main select, main textarea').all()) {
    await expect(control).toBeVisible();
    const box = await control.boundingBox();
    expect(box.width).toBeGreaterThan(0); expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 1);
  }
}
function contrast(a, b) {
  const lum = rgb => rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(x => x / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((v, x, i) => v + x * [.2126, .7152, .0722][i], 0);
  const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}

test('S1 real-server/disk journey: IDs, reversible filters, keyboard edits, restart, faults and both viewports', async ({ page }, testInfo) => {
  test.setTimeout(120000);
  const app = await runtime();
  const outbound = [], errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => {
    if (!route.request().url().startsWith(app.origin + '/')) { outbound.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  const fixtureBefore = await fs.readFile('fixtures/snapshot.json', 'utf8');
  try {
    const firstPid = await app.start();
    await page.goto(app.origin);
    await expect(page.getByTestId('balance-total')).toContainText('$11,150.00');
    await keyboardActivate(page, page.getByRole('navigation').getByRole('link', { name: 'Accounts', exact: true }));
    await expect(page.getByRole('heading', { name: 'Accounts', exact: true })).toBeFocused();
    await keyboardActivate(page, page.getByRole('link', { name: 'Sample Checking', exact: true }));
    await expect(page.getByRole('heading', { name: 'Sample Checking', exact: true })).toBeFocused();
    await expect.poll(() => visibleIds(page)).toEqual(checking);
    await keyboardActivate(page, page.getByRole('navigation').getByRole('link', { name: 'Transactions', exact: true }));
    await expect.poll(() => visibleIds(page)).toEqual(ids);
    await tabTo(page, page.getByRole('combobox', { name: 'Account', exact: true }));
    await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
    await expect.poll(() => visibleIds(page)).toEqual(checking);
    await page.getByRole('combobox', { name: 'Status', exact: true }).selectOption('pending');
    await expect.poll(() => visibleIds(page)).toEqual(['txn-pending']);
    await page.getByRole('combobox', { name: 'Category filter', exact: true }).selectOption('Groceries');
    await expect(page.getByText('No matches for selected filters. No source records were deleted.')).toBeVisible();
    await keyboardActivate(page, page.getByRole('button', { name: 'Clear filters' }));
    await expect.poll(() => visibleIds(page)).toEqual(ids);
    const editButton = page.locator('[data-source-id="txn-pending"]').getByRole('button');
    await keyboardActivate(page, editButton);
    await expect(page.getByRole('textbox', { name: 'Category', exact: true })).toBeFocused();
    await page.keyboard.type('Coffee'); await page.keyboard.press('Tab'); await page.keyboard.type('Morning');
    await page.keyboard.press('Tab'); await page.keyboard.type('Invented note');
    await keyboardActivate(page, page.getByRole('button', { name: 'Cancel', exact: true }));
    await expect(editButton).toBeFocused();
    await keyboardActivate(page, editButton);
    await page.keyboard.type('Coffee'); await page.keyboard.press('Tab'); await page.keyboard.type('Morning');
    await page.keyboard.press('Tab'); await page.keyboard.type('Invented note');
    await keyboardActivate(page, page.getByRole('button', { name: 'Save interpretation' }));
    await expect(page.getByRole('status').last()).toHaveText('Saved to demo disk state.');
    await expect(page.getByRole('heading', { name: 'Transactions', exact: true })).toBeFocused();
    await page.getByRole('navigation').getByRole('link', { name: 'Accounts', exact: true }).click();
    await app.stop();
    await expect(page.request.get(app.origin, { timeout: 500 })).rejects.toThrow();
    const secondPid = await app.start(); expect(secondPid).not.toBe(firstPid);
    await page.goto(`${app.origin}/transactions`);
    await editButton.click();
    for (const [name, value] of [['Category', 'Coffee'], ['Label', 'Morning'], ['Notes', 'Invented note']]) await expect(page.getByRole('textbox', { name, exact: true })).toHaveValue(value);
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    const saved = await fs.readFile(path.join(app.directory, 'overrides.json'), 'utf8');
    const response = await (await page.request.get(`${app.origin}/api/snapshot`)).json();
    expect(response.transactions.map(({ interpretation, sourceOrigin, ...source }) => source)).toEqual(JSON.parse(fixtureBefore).transactions);

    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const scenario of ['normal', 'delayed', 'no-accounts', 'empty-transactions', 'stale', 'disconnected', 'unknown', 'missing', 'partial', 'failure']) {
        await page.goto(`${app.origin}/?scenario=${scenario}`);
        if (scenario === 'delayed') await expect(page.getByRole('status').filter({ hasText: 'Loading invented' })).toBeVisible();
        await stable(page); await expect(page.getByText(banner, { exact: true })).toBeVisible(); await layout(page);
        if (scenario === 'failure') {
          await expect(page.getByRole('alert')).toContainText('Simulated snapshot failure');
          await keyboardActivate(page, page.getByRole('button', { name: 'Retry', exact: true }));
          await expect(page.getByRole('heading', { name: 'Overview' })).toBeFocused();
        }
        if (['unknown', 'partial'].includes(scenario)) {
          await expect(page.getByTestId('balance-total')).toContainText('Unknown / incomplete');
          await expect(page.getByTestId('balance-total')).not.toContainText('balances total');
          await expect(page.getByTestId('balance-total')).toContainText(scenario === 'unknown' ? '$8,700.00' : '$2,450.00');
        }
        if (scenario === 'stale' || scenario === 'disconnected') await expect(page.getByText(/last observed values/).first()).toBeVisible();
        if (scenario === 'no-accounts') await expect(page.getByText('No accounts in this sample dataset.')).toBeVisible();
        for (const route of ['/accounts', '/accounts/acct-sample-checking', '/transactions']) {
          await page.goto(`${app.origin}${route}?scenario=${scenario}`); await stable(page);
          await expect(page.getByText(banner, { exact: true })).toBeVisible(); await layout(page);
          if (scenario === 'failure') { await expect(page.getByRole('alert')).toBeVisible(); continue; }
          if (route === '/transactions') {
            await expect.poll(() => visibleIds(page)).toEqual(['missing', 'no-accounts', 'empty-transactions'].includes(scenario) ? [] : scenario === 'partial' ? ids.slice(0, 2) : ids);
            if (scenario === 'missing') await expect(page.getByText('Transactions are missing; coverage is unknown, not an empty history.')).toBeVisible();
            if (scenario === 'empty-transactions') await expect(page.getByText('No transactions in this sample dataset.')).toBeVisible();
          }
        }
      }
      await keyboardActivate(page, page.getByRole('button', { name: 'Reset scenario' })); await stable(page);
      await expect.poll(() => visibleIds(page)).toEqual(ids);
      expect(await fs.readFile(path.join(app.directory, 'overrides.json'), 'utf8')).toBe(saved);
      await keyboardActivate(page, editButton); await layout(page);
      await expect(page.getByRole('textbox', { name: 'Category', exact: true })).toBeFocused();
      await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('ControlOrMeta+A'); await page.keyboard.type(`Viewport ${width}`);
      await keyboardActivate(page, page.getByRole('button', { name: 'Save interpretation' }));
      await expect(page.getByRole('status').last()).toHaveText('Saved to demo disk state.');
      await page.screenshot({ path: testInfo.outputPath(`transactions-${width}.png`), fullPage: true });
      // Restore identical override bytes for next reset comparison.
      await editButton.click(); await page.getByRole('textbox', { name: 'Notes' }).fill('Invented note');
      await page.getByRole('button', { name: 'Save interpretation' }).click();
      await expect(page.getByRole('status').last()).toHaveText('Saved to demo disk state.');
    }
    // Real disk corruption while serving: visible read/save failure; old bytes survive.
    await editButton.click();
    await fs.writeFile(path.join(app.directory, 'overrides.json'), '{broken');
    await page.getByRole('textbox', { name: 'Notes' }).fill('Must not persist');
    await page.getByRole('button', { name: 'Save interpretation' }).click();
    await expect(page.getByRole('alert')).toContainText('Save failed:');
    await expect(page.getByRole('textbox', { name: 'Category', exact: true })).toBeFocused();
    expect(await fs.readFile(path.join(app.directory, 'overrides.json'), 'utf8')).toBe('{broken');
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    await page.reload(); await expect(page.getByRole('alert')).toContainText('cannot be read safely');
    await expect(page.getByText(banner, { exact: true })).toBeVisible();
    await fs.writeFile(path.join(app.directory, 'overrides.json'), saved); // Test-owned recovery, never an app reset.
    await keyboardActivate(page, page.getByRole('button', { name: 'Retry', exact: true }));
    await expect(page.getByRole('heading', { name: 'Transactions', exact: true })).toBeFocused();
    await expect.poll(() => visibleIds(page)).toEqual(ids);
    expect(await fs.readFile('fixtures/snapshot.json', 'utf8')).toBe(fixtureBefore);
    expect(outbound).toEqual([]); expect(errors).toEqual([]);
    await fs.writeFile(testInfo.outputPath('integration-oracle.json'), JSON.stringify({ firstPid, secondPid, sourceIds: ids, widths: [375, 1280], outbound, errors, browser: page.context().browser().version() }, null, 2));
    await testInfo.attach('integration-oracle', { body: JSON.stringify({ firstPid, secondPid, sourceIds: ids, widths: [375, 1280], outbound, errors, browser: page.context().browser().version() }, null, 2), contentType: 'application/json' });
  } finally { await app.dispose(); }
});

test('recorded contrast, named controls and visible keyboard focus', async ({ page }, testInfo) => {
  const app = await runtime();
  try {
    await app.start(); await page.goto(app.origin); await stable(page);
    const pairs = await page.evaluate(() => {
      const read = (selector, background) => { const style = getComputedStyle(document.querySelector(selector)); return { selector, foreground: style.color, background: background ?? style.backgroundColor }; };
      return [read('main', getComputedStyle(document.documentElement).backgroundColor), read('.banner'), read('nav a', 'rgb(255, 255, 255)'), read('button'), read('select')];
    });
    for (const pair of pairs) { pair.ratio = contrast(pair.foreground, pair.background); expect(pair.ratio).toBeGreaterThanOrEqual(4.5); }
    await tabTo(page, page.getByRole('button', { name: 'Reset scenario' }));
    const focus = await page.getByRole('button', { name: 'Reset scenario' }).evaluate(el => { const s = getComputedStyle(el); return { color: s.outlineColor, width: s.outlineWidth, style: s.outlineStyle }; });
    expect(focus.width).toBe('3px'); expect(focus.style).toBe('solid'); expect(contrast(focus.color, 'rgb(245, 248, 250)')).toBeGreaterThanOrEqual(3);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('combobox', { name: 'Synthetic scenario' })).toBeVisible();
    await fs.writeFile(testInfo.outputPath('contrast-and-semantics.json'), JSON.stringify({ pairs, focus }, null, 2));
    await testInfo.attach('contrast-and-semantics', { body: JSON.stringify({ pairs, focus, semantics: 'One h1, named native controls, main navigation, status/alert live regions; keyboard journey in companion test' }, null, 2), contentType: 'application/json' });
  } finally { await app.dispose(); }
});
