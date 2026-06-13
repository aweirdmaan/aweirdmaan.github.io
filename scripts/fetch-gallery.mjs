// Build-time: list the Cloudinary `gallery/` folder and generate the gallery data
// (optimized delivery URLs + dimensions + alt) into src/data/gallery.json.
//
// Runs automatically before `dev` and `build` (see package.json prebuild/predev).
// Adding photos later = upload to the `gallery/` folder in Cloudinary, then rebuild.
import { v2 as cloudinary } from 'cloudinary';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Env comes from `node --env-file-if-exists=.env` locally, or the CI environment
// (Cloudflare Pages) in production. Reconfigure explicitly in case the SDK auto-config
// ran before the env was populated.
cloudinary.config(true);
const cloud = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
if (!process.env.CLOUDINARY_URL || !cloud) {
  console.error('[fetch-gallery] Missing CLOUDINARY_URL / PUBLIC_CLOUDINARY_CLOUD_NAME — skipping.');
  process.exit(1);
}

const base = `https://res.cloudinary.com/${cloud}/image/upload`;
// f_auto = best modern format (AVIF/WebP via Accept negotiation); q_auto:best = visually
// lossless; c_limit = never upscale. The trailing extension is nominal (f_auto overrides it)
// but required for the URL to resolve on this account.
const url = (publicId, fmt, w) => `${base}/f_auto,q_auto:best,c_limit,w_${w}/${publicId}.${fmt}`;
const WIDTHS = [480, 768, 1080, 1280, 1600, 2000];

const { resources } = await cloudinary.api.resources({
  type: 'upload',
  prefix: 'gallery/',
  context: true,
  max_results: 500,
  resource_type: 'image',
});

const photos = resources
  .map((r) => {
    const ctx = r.context?.custom ?? {};
    const ratio = r.height / r.width;
    return {
      order: Number(ctx.order ?? 999),
      src: url(r.public_id, r.format, 1280),
      large: `${base}/f_auto,q_auto:best,c_limit,w_2400/${r.public_id}.${r.format}`,
      // Tiny, heavily-blurred placeholder shown while the full image loads (blur-up).
      lqip: `${base}/e_blur:1200,q_30,f_auto,w_40/${r.public_id}.${r.format}`,
      width: r.width,
      height: r.height,
      alt: ctx.alt ?? r.public_id.split('/').pop(),
      srcSet: WIDTHS.map((w) => ({ src: url(r.public_id, r.format, w), width: w, height: Math.round(w * ratio) })),
    };
  })
  .sort((a, b) => a.order - b.order)
  .map(({ order, ...photo }) => photo);

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'gallery.json');
writeFileSync(out, JSON.stringify(photos, null, 2) + '\n');
console.log(`[fetch-gallery] wrote ${photos.length} photos → src/data/gallery.json`);
