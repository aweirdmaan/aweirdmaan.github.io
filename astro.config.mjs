// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static output — Cloudflare Pages serves the built `dist/` directly (no adapter needed).
// `site` is the canonical origin — drives canonical URLs, OG URLs, and the sitemap.
// Update this if a custom domain (e.g. https://aweirdmaan.me) is added.
// https://astro.build/config
export default defineConfig({
  site: 'https://aweirdmaan.pages.dev',
  output: 'static',
  integrations: [react(), sitemap()],
});
