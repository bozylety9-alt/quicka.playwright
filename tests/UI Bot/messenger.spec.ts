import { test, expect } from '@playwright/test';

test('Mon premier test - ouvrir Messenger', async ({ page }) => {
  // 1. Ouvrir le site
  await page.goto('https://www.messenger.com');

  // 2. Vérifier qu'on est sur la page de connexion
  await expect(page).toHaveTitle('/Messenger/');

  // 3. Attendre 5 secondes pour voir
  await page.waitForTimeout(5000);
});