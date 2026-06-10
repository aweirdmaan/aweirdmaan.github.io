// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static output — Cloudflare Pages serves the built `dist/` directly (no adapter needed).
// https://astro.build/config
export default defineConfig({
  site: 'https://aweirdmaan.github.io',
  output: 'static',
  integrations: [react()],
});
