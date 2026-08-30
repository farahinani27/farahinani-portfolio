# farahinani.com

Personal portfolio. Plain HTML, CSS, and vanilla JavaScript with GSAP for
scroll reveals. **No build step.**

> Neutral scaffold. The visual design is being restarted — palette, fonts,
> hero and layout in `index.html` / `assets/css/main.css` are placeholders.
> (An earlier Anna Jóna-style prototype was moved to the `halaman-website`
> repo.)

## Run locally

- **VS Code Live Server** — right-click `index.html` → *Open with Live Server*.
- **Terminal** — `npm run serve`.

## Structure

```
index.html              Home: hero + Projects / About / Services / Contact (placeholders)
blog/index.html          Post list
blog/<slug>.html          One file per post
404.html
.htaccess                Apache config for Hostinger (HTTPS, 404, gzip, caching, headers)
partials/                Reference header/footer to paste into blog pages
assets/css/main.css      One stylesheet, @layer-organised
assets/js/main.js         Nav toggle, footer year, [data-reveal] scroll fades
assets/js/vendor/         GSAP + ScrollTrigger (vendored, committed)
assets/fonts/, assets/img/
scripts/build-images.mjs  One-off responsive-image generator (dev dep 'sharp')
robots.txt, sitemap.xml
```

## Shared header / footer

No templating. When the header or footer changes, update the files in
`partials/` and paste the block into `index.html` and each `blog/*.html`.

## Publish (manual)

Upload to Hostinger `public_html/` — do include `.htaccess` (hidden). Don't
upload `node_modules/`, `partials/`, `.vscode/`, `.git/`, `package*.json`,
`scripts/`, `README.md`, or the other dotfiles.

## Before going live

Work through `fiaentreprise/ops/launch-checklist.md`: real content, brand,
favicon, `og-image.jpg`, Lighthouse pass, form handling, analytics.
