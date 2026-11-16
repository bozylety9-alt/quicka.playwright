// tests/api/analyse-complete.spec.ts
import { test, expect } from '../api-fixtures';
import { BUTTONS, QUESTIONS } from '../../src/config/payloads';

test.setTimeout(600_000);

test('Analyse complète de A à Z', async ({ api }) => {
  const ticketId = 'C2-CC-2025-07-00004'; // Remplacez par un ticket valide

  // 1. Démarrer
  // console.log('1. Ouverture des assignations');
  // await api.clickButton(BUTTONS.mesAssignations);
  // await new Promise(r => setTimeout(r, 3000));

  await api.sendLocation(-18.9137, 47.5361);
  await new Promise(r => setTimeout(r, 2000));

  console.log('2. Sélection du ticket');
  await api.sendMessage(ticketId);
  await new Promise(r => setTimeout(r, 3000));

  //4. Affichage information client
  console.log('3.Ouverture des infos clients');
  await api.clickButton(BUTTONS.afficher);
  await new Promise(r=> setTimeout(r, 3000));

  // 3. Infos client (on répond "NON" à la modification)
  console.log('4. Pas de modification des infos');
  await api.clickButton(BUTTONS.non);
  await new Promise(r => setTimeout(r, 2000));

  // 4. Nature du client
  console.log('5. Client récurrent');
  await api.clickButton(BUTTONS.clientRecurrent);
  await new Promise(r => setTimeout(r, 2000));

  // 5. Questions ouvertes (répondre par texte)
  console.log('6. Nombre enfants: 2');
  await api.sendMessage('2');
  await new Promise(r => setTimeout(r, 1500));

  console.log('7. Condition logement');
  await api.clickButton(BUTTONS.locataire);
  await new Promise(r => setTimeout(r, 1500));

  // 7. Continuer vers crédit
  console.log('8. Continuer');
  await api.clickButton(BUTTONS.continuer);
  await new Promise(r => setTimeout(r, 2000));

  // 8. Montant et Maturité
  console.log('9. Montant: 5000000');
  await api.sendMessage('5000000');
  await new Promise(r => setTimeout(r, 1500));

  console.log('10. Maturité: 12');
  await api.sendMessage('12');
  await new Promise(r => setTimeout(r, 1500));

  // 10. Secteur
  console.log('11. Secteur Production');
  await api.clickButton(BUTTONS.secteurProduction);
  await new Promise(r => setTimeout(r, 2000));

  // 11. Cashflow (Vente min/max)
  console.log('12. Vente min/max');
  await api.sendMessage('50000;150000');
  await new Promise(r => setTimeout(r, 1500));

  // 12. Continuer...
  console.log('13. Continuer');
  await api.clickButton(BUTTONS.continuer);
  await new Promise(r => setTimeout(r, 2000));

});