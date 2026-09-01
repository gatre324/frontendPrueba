import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const apiUrl = process.env.API_URL?.trim();
const isVercelBuild = process.env.VERCEL === '1';

if (isVercelBuild && !apiUrl) {
  throw new Error('API_URL debe estar configurada en Vercel antes de ejecutar el build.');
}

if (!apiUrl) {
  process.exit(0);
}

let normalizedApiUrl;
try {
  normalizedApiUrl = new URL(apiUrl).toString().replace(/\/$/, '');
} catch {
  throw new Error('API_URL debe ser una URL válida, por ejemplo https://api.example.com/api/v1');
}

const environmentPath = resolve('src/app/core/config/environment.production.ts');
const environmentSource = `export const environment = ${JSON.stringify({
  production: true,
  apiUrl: normalizedApiUrl,
}, null, 2)};\n`;

if (!existsSync(environmentPath) || readFileSync(environmentPath, 'utf8') !== environmentSource) {
  writeFileSync(environmentPath, environmentSource, 'utf8');
}
