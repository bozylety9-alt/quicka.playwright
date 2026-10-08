import { test, expect } from '../ui-fixtures';

test('Vérifier la session Facebook', async ({ persistentPage }) => {
  await persistentPage.goto('https://www.facebook.com');
  await persistentPage.waitForTimeout(5000);

  const url = persistentPage.url();
  const title = await persistentPage.title();
  console.log('URL:', url);
  console.log('Titre:', title);

  await persistentPage.screenshot({
    path: 'reports/verification-facebook.png',
    fullPage: true,
  });

  // Détecter si connecté : la page d'accueil Facebook connectée contient "Fil d'actualité" ou le profil
  const isLoggedIn = await persistentPage
    .locator('[aria-label="Votre profil"], [aria-label="Your profile"]')
    .isVisible({ timeout: 80000 })
    .catch(() => false);

  if (isLoggedIn) {
    console.log(' Connecté à Facebook');
  } else {
    console.log(' Non connecté à Facebook');
    console.log('   URL:', url);
  }
});
