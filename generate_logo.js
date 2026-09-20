import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#FFFFFF"/>
  <!-- Outer Red Box Frame -->
  <rect x="72" y="36" width="368" height="440" fill="none" stroke="#EE2B2E" stroke-width="48"/>
  <!-- Top-Right to Center-Left Diagonal -->
  <line x1="396" y1="126" x2="118" y2="256" stroke="#EE2B2E" stroke-width="48" stroke-linecap="square"/>
  <!-- Bottom-Right to Center-Left Diagonal -->
  <line x1="396" y1="386" x2="118" y2="256" stroke="#EE2B2E" stroke-width="48" stroke-linecap="square"/>
</svg>`;

const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'fav.svg'), svgString, 'utf8');

// Render crisp PNG using sharp
const svgBuffer = Buffer.from(svgString);

await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(path.join(publicDir, 'fav.png'));

await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(path.join(assetsDir, 'fav.png'));

console.log('Successfully generated public/fav.png, public/fav.svg, and src/assets/fav.png');
