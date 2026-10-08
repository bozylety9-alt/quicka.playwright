import { test } from '../api-fixtures';
import { request } from '@playwright/test';
import * as fs from 'fs';

test.setTimeout(180_000);

const BASE_URL = 'http://192.168.160.104:61445';
const FB_ID = '31722948147349726';

test('Explorer plusieurs variantes', async () => {
  const ctx = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  });

  const results: any[] = [];

  const testPost = async (name: string, body: any) => {
    try {
      const res = await ctx.post('/api/quicka/post', { data: body });
      const json = await res.json();
      console.log(`\n[${name}] Status: ${res.status()}`);
      console.log(`[${name}] Response:`, JSON.stringify(json));
      results.push({ name, status: res.status(), body: json });
    } catch (e: any) {
      console.log(`\n[${name}] ERREUR: ${e.message}`);
      results.push({ name, error: e.message });
    }
  };

  // Test 1 : message avec isTest: false
  await testPost('isTest false', {
    isTest: false,
    fbId: FB_ID,
    content: 'voir mes assignations',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 2 : hello
  await testPost('hello', {
    isTest: true,
    fbId: FB_ID,
    content: 'hello',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 3 : Bonjour
  await testPost('Bonjour', {
    isTest: true,
    fbId: FB_ID,
    content: 'Bonjour',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 4 : Commencer
  await testPost('Commencer', {
    isTest: true,
    fbId: FB_ID,
    content: 'Commencer',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 5 : Analyser
  await testPost('Analyser', {
    isTest: true,
    fbId: FB_ID,
    content: 'Analyser',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 6 : Mes tâches
  await testPost('Mes tâches', {
    isTest: true,
    fbId: FB_ID,
    content: 'Mes tâches',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 7 : /start
  await testPost('/start', {
    isTest: true,
    fbId: FB_ID,
    content: '/start',
    channel: 'FACEBOOK',
    lon: 0,
    lat: 0,
  });

  // Test 8 : GET sur un autre endpoint possible
  try {
    const res = await ctx.get('/api/quicka/health');
    console.log('\n[health] Status:', res.status());
    console.log('[health] Response:', await res.text());
  } catch (e: any) {
    console.log('\n[health] ERREUR:', e.message);
  }

  // Sauvegarder
  fs.writeFileSync('reports/exploration2.json', JSON.stringify(results, null, 2));
  console.log('\n Résultats dans reports/exploration2.json');

  await ctx.dispose();
});