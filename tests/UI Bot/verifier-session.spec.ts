import { test } from '../ui-fixtures';

test('Diagnostic complet de la session', async ({ persistentPage }) => {
  test.setTimeout(120_000);

  // 1. Aller sur Facebook pour voir si on est connecté
  console.log('\n=== TEST 1 : Facebook /me ===');
  await persistentPage.goto('https://www.facebook.com/me');
  await persistentPage.waitForTimeout(5000);
  console.log('URL après /me:', persistentPage.url());
  console.log('Titre:', await persistentPage.title());
  await persistentPage.screenshot({
    path: 'reports/diag-1-facebook-me.png',
    fullPage: true,
  });

  // 2. Aller sur Messenger
  console.log('\n=== TEST 2 : messenger.com ===');
  await persistentPage.goto('https://www.messenger.com');
  await persistentPage.waitForTimeout(5000);
  console.log('URL après messenger.com:', persistentPage.url());
  console.log('Titre:', await persistentPage.title());
  await persistentPage.screenshot({
    path: 'reports/diag-2-messenger.png',
    fullPage: true,
  });

  // 3. Aller sur Facebook messages
  console.log('\n=== TEST 3 : facebook.com/messages ===');
  await persistentPage.goto('https://www.facebook.com/messages/t');
  await persistentPage.waitForTimeout(5000);
  console.log('URL après /messages/t:', persistentPage.url());
  console.log('Titre:', await persistentPage.title());
  await persistentPage.screenshot({
    path: 'reports/diag-3-fb-messages.png',
    fullPage: true,
  });

  // 4. Chercher TOUS les éléments interactifs de la page actuelle
  console.log('\n=== TEST 4 : Recherche des sélecteurs ===');
  const selectors = [
    '[aria-label="Message"]',
    '[aria-label="Message"]',
    '[contenteditable="true"]',
    'textarea',
    '[role="textbox"]',
    '[aria-label*="essage"]',
    '[placeholder*="essage"]',
    '[placeholder*="Aa"]',
  ];

  for (const sel of selectors) {
    const count = await persistentPage.locator(sel).count();
    console.log(`  ${sel} → ${count} élément(s)`);
  }

  // 5. Lister tous les role="textbox"
  console.log('\n=== TEST 5 : Tous les role=textbox ===');
  const textboxes = persistentPage.locator('[role="textbox"]');
  const tbCount = await textboxes.count();
  console.log(`Trouvé ${tbCount} textbox(es)`);
  for (let i = 0; i < tbCount; i++) {
    const el = textboxes.nth(i);
    const ariaLabel = await el.getAttribute('aria-label').catch(() => null);
    const placeholder = await el.getAttribute('placeholder').catch(() => null);
    console.log(`  [${i}] aria-label="${ariaLabel}" placeholder="${placeholder}"`);
  }

  // 6. Lister tous les contenteditable
  console.log('\n=== TEST 6 : Tous les contenteditable ===');
  const editables = persistentPage.locator('[contenteditable="true"]');
  const edCount = await editables.count();
  console.log(`Trouvé ${edCount} contenteditable(s)`);
  for (let i = 0; i < edCount; i++) {
    const el = editables.nth(i);
    const ariaLabel = await el.getAttribute('aria-label').catch(() => null);
    const role = await el.getAttribute('role').catch(() => null);
    console.log(`  [${i}] aria-label="${ariaLabel}" role="${role}"`);
  }

  // 7. Attendre 30 secondes pour laisser le temps de regarder
  console.log('\n Attente de 30 secondes pour inspection visuelle...');
  await persistentPage.waitForTimeout(30_000);
});

test('Lister toutes les conversations', async ({ persistentPage }) => {
  await persistentPage.goto('https://www.messenger.com');
  await persistentPage.waitForTimeout(5000);

  // Lister toutes les conversations visibles
  const conversations = persistentPage.locator('[role="row"], [role="listitem"], a[href*="/t/"]');
  const count = await conversations.count();
  console.log(`\n ${count} conversations trouvées`);

  for (let i = 0; i < Math.min(count, 20); i++) {
    const el = conversations.nth(i);
    const text = await el.textContent().catch(() => '');
    const href = await el.getAttribute('href').catch(() => null);
    console.log(`  [${i}] "${text?.substring(0, 50)}" → ${href}`);
  }

  await persistentPage.waitForTimeout(30_000);
});