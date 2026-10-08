// import { test, expect } from '@playwright/test';
// import { MessengerDriver } from '../src/driver/messenger-driver';

// test('Se connecter à Messenger et ouvrir le bot', async ({ page }) => {
//   const driver = new MessengerDriver(page);

//   // Récupérer les identifiants depuis les variables d'environnement
//   const email = process.env.FB_EMAIL || '';
//   const password = process.env.FB_PASSWORD || '';

//   if (!email || !password) {
//     throw new Error('FB_EMAIL et FB_PASSWORD doivent être définis');
//   }

//   await driver.login(email, password);
//   await driver.openConversation('QuickA_dev_1');

//   // Vérifier qu'on est bien dans la conversation
//   await expect(page.locator('[aria-label="Message"]')).toBeVisible();

//   await driver.screenshot('connexion-reussie');
// });