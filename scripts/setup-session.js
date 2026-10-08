const { chromium } = require('@playwright/test');
const path = require('path');

async function setupSession() {
  const userDataDir = path.resolve('.auth/user-data');

  console.log(' Profil:', userDataDir);
  console.log(' Ouverture du navigateur...');
  console.log('');
  console.log(' Connectez-vous MANUELLEMENT à Messenger');
  console.log(' Résolvez le captcha si demandé');
  console.log('');
  console.log('⏳ Vous avez 3 MINUTES pour vous connecter...');
  console.log('');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 800 },
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-first-run',
      '--no-default-browser-check',
    ],
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://www.messenger.com');

  console.log(' Attente de 3 minutes...');
  await page.waitForTimeout(180_000);

  const isLoggedIn = await page
    .locator('[aria-label="Message"]')
    .isVisible({ timeout: 5000 })
    .catch(() => false);

  if (isLoggedIn) {
    console.log(' Connexion détectée !');
  } else {
    console.log('  Connexion non détectée, mais session sauvegardée.');
  }

  console.log(' Sauvegarde de la session...');
  await context.close();
  console.log(' Session sauvegardée dans .auth/user-data');
}

setupSession().catch(console.error);