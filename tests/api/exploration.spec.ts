import { test } from '../api-fixtures';
import * as fs from 'fs';

test.setTimeout(180_000);

test('Explorer le parcours du bot', async ({ api }) => {
  const responses: any[] = [];

  const log = (step: string, response: any) => {
    console.log(`\n═══════════════════════════════════════`);
    console.log(`ÉTAPE : ${step}`);
    console.log(`═══════════════════════════════════════`);
    console.log(JSON.stringify(response, null, 2));
    responses.push({ step, response });
  };

  // 1. Message d'accueil
  const r1 = await api.sendMessage('voir mes assignations');
  log('voir mes assignations', r1);

  await new Promise(r => setTimeout(r, 2000));

  // 2. Envoyer un chiffre (peut être interprété comme un ticket)
  const r2 = await api.sendMessage('1');
  log('message "1"', r2);

  await new Promise(r => setTimeout(r, 2000));

  // 3. Envoyer un texte libre
  const r3 = await api.sendMessage('test');
  log('message "test"', r3);

  // 4. Envoyer une position GPS
  const r4 = await api.sendLocation(-18.9137, 47.5361);
  log('position GPS', r4);

  // Sauvegarder pour analyse
  fs.writeFileSync(
    'reports/exploration.json',
    JSON.stringify(responses, null, 2)
  );
  console.log('\n Résultats dans reports/exploration.json');
});