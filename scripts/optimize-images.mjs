// Originals (archive/media-src) -> public/media/{stem}-{w}.avif|webp  + src/data/media.json (dimensions)
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const SRC = 'archive/media-src', OUT = 'public/media', WIDTHS = [480, 960, 1600];
await fs.mkdir(OUT, { recursive: true });
const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
// Output variants are named by stem; sources sharing a stem (3.jpg + 3.png) would overwrite each other,
// so those get the extension folded into the stem (3-jpg, 3-png).
const stemCount = {};
for (const f of files) { const n = path.parse(f).name; stemCount[n] = (stemCount[n] || 0) + 1; }
const stemOf = (f) => { const { name, ext } = path.parse(f); return stemCount[name] > 1 ? `${name}-${ext.slice(1).toLowerCase()}` : name; };
const failed = [];
const manifest = {};
for (const f of (await fs.readdir(SRC)).filter((f) => /\.(gif|svg)$/i.test(f))) await fs.copyFile(path.join(SRC, f), path.join(OUT, f));
let done = 0, skipped = 0;

async function one(f) {
  const stem = stemOf(f);
  const srcMtime = (await fs.stat(path.join(SRC, f))).mtimeMs;
  const img = sharp(path.join(SRC, f), { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  if (!meta.width) return;
  const ws = [...new Set(WIDTHS.filter((w) => w < meta.width).concat(Math.min(meta.width, 1600)))].sort((a, b) => a - b);
  // Tone analysis: 'white' = product shot on white/blank background (border mostly near-white).
  const { data } = await sharp(path.join(SRC, f), { failOn: 'none' }).flatten({ background: '#fff' }).resize(24, 24, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const lum = (i) => 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  let border = 0, bn = 0, all = 0;
  for (let y = 0; y < 24; y++) for (let x = 0; x < 24; x++) {
    const L = lum((y * 24 + x) * 3); all += L;
    if (x === 0 || y === 0 || x === 23 || y === 23) { border += L > 235 ? 1 : 0; bn++; }
  }
  manifest[f] = { w: meta.width, h: meta.height, widths: ws, stem, white: border / bn > 0.6, lum: Math.round(all / 576) };
  for (const w of ws) {
    const base = path.join(OUT, `${stem}-${w}`);
    // Reuse existing variants only if they are newer than the source (a replaced original is re-encoded).
    try {
      const [a, b] = await Promise.all([fs.stat(base + '.avif'), fs.stat(base + '.webp')]);
      if (a.mtimeMs >= srcMtime && b.mtimeMs >= srcMtime) { skipped++; continue; }
    } catch {}
    const r = sharp(path.join(SRC, f), { failOn: 'none' }).rotate().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: 50, effort: 3 }).toFile(base + '.avif');
    await r.clone().webp({ quality: 78 }).toFile(base + '.webp');
  }
  done++;
}
const q = [...files];
await Promise.all(Array.from({ length: Math.max(2, os.cpus().length - 1) }, async () => { while (q.length) { const f = q.shift(); await one(f).catch((e) => { failed.push(f); console.error('FAIL', f, e.message); }); } }));
await fs.writeFile('src/data/media.json', JSON.stringify(manifest));
const du = (await fs.readdir(OUT)).length;
console.log(`processed ${done}, skipped variants ${skipped}, output files ${du}`);
if (failed.length) { console.error(`${failed.length} source image(s) could not be processed: ${failed.join(', ')}`); process.exitCode = 1; }
