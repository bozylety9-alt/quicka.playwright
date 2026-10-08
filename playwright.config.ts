import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 60_000,
  retries: 0,
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['list'],
  ],
  projects: [
    // ═══════════════════════════════════════════════
    // PROJET API — rapide, sans navigateur
    // ═══════════════════════════════════════════════
    {
      name: 'api',
      testDir: './tests/api',
      fullyParallel: true,
      workers: 4,
      use: {
        baseURL: process.env.BOT_API_URL,
      },
    },

    // ═══════════════════════════════════════════════
    // PROJET UI — lent, avec navigateur Messenger
    // ═══════════════════════════════════════════════
    {
      name: 'ui',
      testDir: './tests/ui',
      fullyParallel: false,
      workers: 1,
      timeout: 120_000,
      use: {
        headless: false,
        viewport: { width: 1280, height: 800 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
});