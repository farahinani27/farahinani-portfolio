/* One-off image processor. Not part of any build — run it by hand when you
   add or replace a source photo:

     node scripts/build-images.mjs <source.jpg> <output-basename>

   e.g. node scripts/build-images.mjs "C:/Users/ARIF FIKRI/Downloads/image-placeholder.jpg" interior

   Produces assets/img/<name>-<width>.{avif,webp,jpg} for a few widths.
   The generated files are committed; sharp is only a dev dependency.
*/
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [src, base] = process.argv.slice(2);
if (!src || !base) {
  console.error("usage: node scripts/build-images.mjs <source> <output-basename>");
  process.exit(1);
}

const outDir = "assets/img";
const widths = [960, 1600, 2400];

await mkdir(outDir, { recursive: true });

for (const w of widths) {
  const pipeline = sharp(src).resize({ width: w, withoutEnlargement: true });
  const stem = path.join(outDir, `${base}-${w}`);

  await pipeline.clone().avif({ quality: 48 }).toFile(`${stem}.avif`);
  await pipeline.clone().webp({ quality: 66 }).toFile(`${stem}.webp`);
  await pipeline.clone().jpeg({ quality: 72, progressive: true, mozjpeg: true }).toFile(`${stem}.jpg`);

  console.log(`  ${base}-${w}.{avif,webp,jpg}`);
}

const meta = await sharp(`${outDir}/${base}-1600.jpg`).metadata();
console.log(`done. intrinsic size of the 1600 variant: ${meta.width}x${meta.height}`);
