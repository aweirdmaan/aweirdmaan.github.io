# aweirdmaan.github.io

Amaan Shaikh's personal portfolio site. Static, hosted on GitHub Pages (served from `main`).
Built during the 2020 lockdown to showcase blogs and edited photographs.

## Structure
- `index.html` — home / bio landing page
- `blog.html`, `blog1.html` — blog listing + a post
- `gallery.html` — photo gallery
- `resume/resume.html` — resume (own `resume.css`)
- `app.js` — hamburger nav toggle (`navSlide`)
- `css/styles.css` — site styles
- `css/gallery/`, `css/blog-images/` — image assets; icons in `css/*-NNNN/`

## Stack
Bootstrap 4.5, jQuery 3.5, Font Awesome — all via CDN. No build step, no package manager.
Edit HTML/CSS/JS directly and commit; GitHub Pages publishes from `main`.

## Notes
- Google Analytics tag is `UA-174218862-1` (Universal Analytics, sunset by Google in 2023 — replace with GA4 if analytics are wanted).
- To preview locally: `python3 -m http.server` then open http://localhost:8000
