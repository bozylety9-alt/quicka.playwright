import { test as base } from '@playwright/test';
import { ApiDriver } from '../src/driver/api-driver';

export const test = base.extend<{ api: ApiDriver }>({
  api: async ({}, use) => {
    const driver = new ApiDriver();
    await driver.init();
    await use(driver);
    await driver.close();
  },
});

export { expect } from '@playwright/test';