import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests/e2e', use: { browserName: 'chromium', headless: true }, workers: 1, timeout: 30000 });
