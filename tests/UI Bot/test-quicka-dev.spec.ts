import { test, expect } from '../ui-fixtures';
import { MessengerDriver } from '../../src/driver/messenger-driver';
import { TEST_BOT_ID } from '../../src/config/conversations';

test('Ouvrir QuickA_dev_1 et envoyer un message', async ({ persistentPage }) => {
  test.setTimeout(120_000);

  const driver = new MessengerDriver(persistentPage);

  // 1. Aller sur Messenger
  await persistentPage.goto('https://www.messenger.com');
  await persistentPage.waitForTimeout(5000);

  // 2. Ouvrir le bot par ID
  await driver.openConversationById(TEST_BOT_ID);
  await driver.screenshot('01-bot-ouvert');

  // 3. Vérifier le champ de message
  const messageBox = persistentPage
    .locator('[aria-label="Message"], [contenteditable="true"][role="textbox"]')
    .last();
  await expect(messageBox).toBeVisible({ timeout: 10_000 });
  console.log(' Champ de message visible');

  // 4. Envoyer un message
  await driver.sendMessage('voir mes assignations');
  await persistentPage.waitForTimeout(3000);
  await driver.screenshot('02-message-envoye');

  // 5. Vérifier la réponse du bot
  const lastMessage = await driver.getLastMessage();
  console.log(' Dernier message:', lastMessage);
});

test('Envoyer un message avec clic bouton', async ({ persistentPage }) => {
  test.setTimeout(120_000);

  const driver = new MessengerDriver(persistentPage);

  await persistentPage.goto('https://www.messenger.com');
  await persistentPage.waitForTimeout(5000);
  await driver.openConversationById(TEST_BOT_ID);

  // Envoyer le message de démarrage
  await driver.sendMessage('voir mes assignations');
  await persistentPage.waitForTimeout(3000);

  // Attendre le bouton "Mes assignations" et cliquer
  await driver.clickButton('Mes assignations');
  await persistentPage.waitForTimeout(3000);

  await driver.screenshot('03-apres-clic');
  console.log(' Bouton cliqué');
});