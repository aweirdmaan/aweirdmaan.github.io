# aweirdmaan.github.io

Amaan Shaikh's personal portfolio — an **Astro + React** static site (modern rebuild of the
original lockdown-era Bootstrap site). Three pages: Home, Blog, Gallery.

## Stack
- **Astro 5** (static output) + **React 19** islands for interactivity
- Self-hosted **Josefin Sans** via `@fontsource` (no external font/CDN requests)
- No Bootstrap, no jQuery. Plain CSS with design tokens in `src/styles/global.css`.
- Deployed on **Cloudflare Pages** (build `npm run build`, output `dist/`).

## Commands
- `npm run dev` — local dev server (http://localhost:4321)
- `npm run build` — static build to `dist/` (auto-runs the Cloudinary fetch first)
- `npm run preview` — serve the built `dist/`
- `npm run gallery` — regenerate `src/data/gallery.json` from Cloudinary

## Deploy
Live at **https://aweirdmaan.pages.dev** (Cloudflare Pages, project `aweirdmaan`).
Currently deployed by direct upload (the built `dist/` is fully static — Cloudinary URLs are
baked in, so no env vars are needed on Cloudflare):

```
npm run build
npx wrangler pages deploy dist --project-name aweirdmaan --branch main
```

To switch to push-to-deploy: connect the GitHub repo in the Cloudflare Pages dashboard,
set build `npm run build` / output `dist`, and add `CLOUDINARY_URL` +
`PUBLIC_CLOUDINARY_CLOUD_NAME` as build env vars (so the fetch script runs in CI).

## Photos
Served from Cloudinary (folder `gallery/`). Add photos = upload to that folder, then
`npm run gallery && npm run build && wrangler pages deploy ...`. Needs `.env` locally with
`CLOUDINARY_URL` and `PUBLIC_CLOUDINARY_CLOUD_NAME` (gitignored).

## Structure
```
src/
  layouts/BaseLayout.astro   — <head>, SEO meta, fonts, Nav + Footer, <slot>
  components/
    Nav.tsx        — React island (client:load): mobile hamburger + active link
    Lightbox.tsx   — React island (client:visible): masonry gallery + enlarge overlay
    Footer.astro   — social links (inline SVG icons)
    BlogCard.astro — one blog post card
  data/
    posts.ts       — blog entries (currently 1, the Medium crypto post)
    gallery.ts     — gallery image lists (landscape / portrait)
  pages/
    index.astro        — home / bio
    blog/index.astro   — blog list
    gallery.astro      — photo gallery
  styles/global.css    — design tokens + all styling
public/
  favicon.ico
  images/gallery/*     — gallery photos
```

## Conventions
- React components use `className` (`.tsx`); Astro components use `class` (`.astro`).
- Add a React island only when something needs client interactivity; everything else stays
  static `.astro`. Hydrate with the narrowest directive (`client:visible` > `client:load`).
- Blog posts: add to `src/data/posts.ts`. `href` can be external (opens new tab) or internal.
  Graduate to an Astro content collection of Markdown if/when posts are written on-site.

## Notes / TODO
- Home bio still says "pursued my B.Tech …" copy from 2021 — refresh when ready (see TODO in `index.astro`).
- Analytics: enable **Cloudflare Web Analytics** in the CF Pages dashboard (no code; the old
  Google Universal Analytics tag was dead and has been removed).
