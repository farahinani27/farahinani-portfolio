# Fonts

Self-hosted web fonts go here as `.woff2`.

When you add one:
1. Drop `YOURFONT.woff2` (and any weights) in this folder.
2. Add an `@font-face` block in `assets/css/main.css` (base layer) with
   `font-display: swap`.
3. Set `--font-heading` / `--font-body` tokens to use it.
4. Preload the most critical file in `index.html`:
   `<link rel="preload" href="/assets/fonts/YOURFONT.woff2" as="font" type="font/woff2" crossorigin>`

Until then the site uses the system UI font stack.
