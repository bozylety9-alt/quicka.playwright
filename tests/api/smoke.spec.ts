import { test, expect } from '../api-fixtures';

test.describe('Smoke tests API QUICK-A', () => {
  test('Envoyer un message simple', async ({ api }) => {
    const response = await api.sendMessage('voir mes assignations');
    console.log('Réponse:', JSON.stringify(response, null, 2));
    expect(response).toBeTruthy();
  });

  test('Envoyer un chiffre', async ({ api }) => {
    const response = await api.sendMessage('5000');
    console.log('Réponse:', JSON.stringify(response, null, 2));
    expect(response).toBeTruthy();
  });
});