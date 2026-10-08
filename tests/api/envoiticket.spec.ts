import { test } from '../api-fixtures';
import { request } from '@playwright/test';

test.setTimeout(300_000);

const BASE_URL = 'http://192.168.160.104:61445';
const FB_ID = '31722948147349726';

test('Parcours en mode réel (isTest: false)', async () => {
  const ctx = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  });

  const post = async (content: any, label: string) => {
    const res = await ctx.post('/api/quicka/post', {
      data: {
        isTest: false,           // ← CHANGEMENT CLÉ
        fbId: FB_ID,
        content,
        channel: 'FACEBOOK',
        lon: 0,
        lat: 0,
      },
    });
    const json = await res.json();
    console.log(`\n═══ ${label} ═══`);
    console.log('Response:', JSON.stringify(json, null, 2).substring(0, 400));
    return json;
  };

  const geoloc = async (lat: number, lon: number, label: string) => {
    const res = await ctx.post('/api/quicka/geoloc', {
      data: {
        isTest: false,           // ← CHANGEMENT CLÉ
        fbId: FB_ID,
        content: { fbId: FB_ID, lat, lon, channel: 'FACEBOOK' },
        channel: 'FACEBOOK',
        lon,
        lat,
      },
    });
    const json = await res.json();
    console.log(`\n═══ ${label} ═══`);
    console.log('Response:', JSON.stringify(json, null, 2).substring(0, 400));
    return json;
  };

  // 1. Position GPS
  await geoloc(-18.9137, 47.5361, '1. Position GPS');
  await new Promise(r => setTimeout(r, 3000));

  // 2. Demander les assignations
  await post('voir mes assignations', '2. voir mes assignations');
  await new Promise(r => setTimeout(r, 3000));

  // 3. Envoyer le ticket
  await post('C2-AB-2025-03-00028', '3. Ticket');
  await new Promise(r => setTimeout(r, 3000));

  // 4. Observer
  await post('Mes Assignations', '4. Mes Assignations');
  await new Promise(r => setTimeout(r, 3000));

  await ctx.dispose();
});