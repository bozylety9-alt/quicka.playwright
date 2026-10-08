import { test as base, Page } from '@playwright/test';
import { launchPersistentBrowser } from '../src/driver/browser-factory';

export const test = base.extend<{ persistentPage: Page }>({
  persistentPage: async ({}, use) => {
    const { context, page } = await launchPersistentBrowser();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';