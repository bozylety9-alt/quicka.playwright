import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('test ultime import', () => {
  const absolutePath = path.resolve('src/driver/api-driver');
  console.log('Chemin absolu:', absolutePath);
  console.log('Fichier .ts existe:', fs.existsSync(absolutePath + '.ts'));
  console.log('Fichier .js existe:', fs.existsSync(absolutePath + '.js'));

  try {
    const mod = require('../../src/driver/api-driver');
    console.log('Module chargé, clés:', Object.keys(mod));
    console.log('typeof ApiDriver:', typeof mod.ApiDriver);
  } catch (e: any) {
    console.log('ERREUR IMPORT:', e.message);
    console.log('STACK:', e.stack);
  }
});