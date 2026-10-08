const { chromium } = require('@playwright/test');
const path = require('path');
const readline = require('readline');

async function setupSession() {
  const userDataDir = path.resolve('.auth/user-data');

  console.log(' Profil:', userDataDir);
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
  await page.goto('https://www.facebook.com/login');

  console.log('═══════════════════════════════════════════════');
  console.log(' ÉTAPE 1 : Connectez-vous à Facebook');
  console.log(' ÉTAPE 2 : Résolvez le captcha');
  console.log(' ÉTAPE 3 : Attendez d\'être sur le fil d\'actualité');
  console.log(' ÉTAPE 4 : Allez sur https://www.messenger.com');
  console.log(' ÉTAPE 5 : Vérifiez que vous voyez vos conversations');
  console.log('═══════════════════════════════════════════════');
  console.log('');
  console.log('  NE FERMEZ PAS le navigateur manuellement');
  console.log('  Quand vous êtes prêt, revenez ICI et appuyez sur ENTRÉE');
  console.log('');

  // Attendre que l'utilisateur appuie sur ENTRÉE
  await new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Appuyez sur ENTRÉE quand vous êtes connecté... ', () => {
      rl.close();
      resolve();
    });
  });

  console.log('');
  console.log(' Capture de vérification...');

  // Vérifier l'état actuel
  const currentUrl = page.url();
  console.log('URL actuelle:', currentUrl);

  await page.screenshot({
    path: 'reports/session-finale.png',
    fullPage: true,
  });

  // Vérifier la connexion Facebook
  await page.goto('https://www.facebook.com/me');
  await page.waitForTimeout(3000);
  const meUrl = page.url();
  console.log('URL après /me:', meUrl);

  if (meUrl.includes('/login') || meUrl.includes('checkpoint')) {
    console.log(' NON CONNECTÉ — Recommencez et attendez d\'être sur le fil d\'actualité');
    console.log('   Le navigateur reste ouvert 30 secondes pour que vous puissiez voir');
    await page.waitForTimeout(30_000);
  } else {
    console.log(' CONNECTÉ ! Session valide.');
  }

  console.log(' Fermeture et sauvegarde...');
  await context.close();
  console.log(' Session sauvegardée dans .auth/user-data');
  console.log('');
  console.log(' Prochaine étape : lancez le test verifier-session.spec.ts');
}

setupSession().catch(console.error);