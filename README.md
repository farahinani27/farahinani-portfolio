# farahinani-portfolio

Portfolio revamp built with [Astro](https://astro.build) + [GSAP](https://gsap.com),
visually inspired by [chungiyoo.com](https://www.chungiyoo.com/): warm paper
background, one display serif doing the branding, a single teal accent, generous
whitespace, and motion-led section reveals.

## Commands

| Command             | Action                                        |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server at `localhost:4321`      |
| `npm run build`     | Build the static site to `./dist/`            |
| `npm run preview`   | Preview the production build locally          |

## Project layout

```
src/
  layouts/Base.astro          # <head>, fonts, global CSS, boots motion.ts
  components/
    SiteHeader.astro          # wordmark · menu button (placeholder) · spinning spark
    sections/
      Hero.astro              # SECTION 1 — eyebrow, oversized name, role, CTAs
      Intro.astro             # SECTION 2 — running "off the clock" line + statement
  scripts/motion.ts           # all GSAP: hero intro timeline + scroll reveals
  styles/global.css           # design tokens (colours, fluid type/space) + base
```

Only sections 1 and 2 are built so far.

## Design knobs (start here when tweaking)

- **Palette + type scale**: CSS custom properties at the top of `src/styles/global.css`.
- **Hero name size**: `--text-display` in `global.css` — currently very large,
  chungiyoo-style. Lower the `13vw` / `13rem` values to tame it.
- **Fonts**: swapped in `Base.astro`. Display is Fraunces (variable, with the
  `opsz` / `SOFT` / `WONK` axes tuned in `global.css` for the swashy look);
  body is Instrument Sans. Both self-hosted via `@fontsource-variable/*`.
- **Motion**: timing/eases live in `src/scripts/motion.ts`. Everything is inside
  `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, so reduced-motion
  users and no-JS visitors get the full content with zero animation.

## Copy to replace

`Hero.astro` and `Intro.astro` are marked `EDIT ME` — the name, intro sentence,
role line, CTA labels and the two section-2 paragraphs are all placeholder text.
