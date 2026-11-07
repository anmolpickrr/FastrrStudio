# Fastrr Studio · The Set

The Fastrr Studio site: an AI creative studio that turns one product link into reels, 360° spins, statics, carousels and campaign kits in Indian languages.

The page is one story, told over a scroll-driven 3D film set:

1. **Hero**: a wide shot of the set, the headline and the link box (the main action), plus real runs to watch.
2. **The set**: seven chapters, one per station (brief desk, script table, turntable, render stage, edit bay, language booth, delivery wall). Each shows what you do, what the agent does, and a live agent console replaying a real run. A chapter dock at the bottom lets you jump to any station, switch whose run you watch, or skip the tour. Arrow keys move between chapters.
3. **What we make**: every format, as a bento grid.
4. **Work**: a filterable gallery (all, reels, spins, statics, carousels).
5. **Brand studio**: enter a site or pick a brand; the whole page re-skins and the board fills with that brand's kit.
6. **How it works**, **Agencies** (with a library mock-up), **FAQ**, and a closing call to action.

## Motion and interaction

- **Intro curtain** with real load progress (fonts, 3D engine, page), shortened on repeat visits in a session.
- **Viewfinder HUD** over the set: frame corners, REC and a running timecode, and a slate ("Scene 04 · Render · Take 1") on every cut between chapters.
- **Floating glass cards** around the hero model, drifting with the pointer.
- **Particle field** behind every section after the set. One cloud morphs into a form per section (bento, film reel, globe, helix, wave, knot, then the FASTRR wordmark) and takes on the brand colour when the page is re-skinned.
- **Work** is a pinned horizontal film strip on desktop and a masonry grid on phones.
- **Kinetic marquee** of outlined format names that speeds up and leans with scroll velocity.
- Inertial smooth scrolling (desktop), custom cursor with contextual labels, magnetic buttons, 3D tilt with glare on cards, and word-by-word headline reveals.
- Everything honours `prefers-reduced-motion`: no intro, no smooth scroll, no particles, static headlines.

## Design system

All type comes from one scale in `assets/css/styles.css` (`--fs-display`, `--fs-h1` … `--fs-tag`), with matching line-height and tracking tokens, and one spacing rhythm (`--sp-section`, `--sp-head`, `--sp-eyebrow`, `--sp-lead`). Section titles, chapter titles, card titles, leads, body, small text and mono labels each map to exactly one step.

Live: https://anmolpickrr.github.io/fastrrstudio/

Everything the page needs is stored in this repository. It loads nothing from a CDN or any other host.

## Structure

```
index.html              page markup
assets/css/styles.css   all styles (tokens at the top)
assets/js/data.js       showcase data: image paths, titles, alt text, durations, video paths
assets/js/app.js        set, scroll, 3D scene, chat demo, work feed, lightbox, brand re-skin
assets/brand/           Fastrr Studio logo + favicons (light- and dark-theme variants)
assets/img/             31 images: 6 reel stills, 4 spin stills, 6 statics, 3 carousels, 12 brand logos
assets/img/logo-mono/   the 12 logos as single-colour, transparent, trimmed marks (used in the logo marquee)
assets/fonts/           Outfit and Figtree (woff2, OFL licence) + fonts.css
assets/video/           MP4s for reels and spins (see assets/video/README.md)
vendor/three/           three.js r160 (MIT)
vendor/lenis/           Lenis 1.1 smooth scrolling (MIT)
```

## Run locally

The 3D set needs a web server; opened straight from disk (`file://`) the page falls back to the illustrated SVG set.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Configuration

At the top of `assets/js/app.js`:

- `APP_URL`: where the sign-in and "make my ad" buttons go.
- `BRAND_API`: endpoint that returns `{ name, logo, primary }` for a site URL. Empty = sampled palette.
- `MODEL_URL`: licensed GLB for the turntable. Empty = procedural figure.
- `PROTO`: `true` keeps the hand-off in the page instead of navigating to the app.

In `assets/js/data.js`, `VIDEOS_READY` switches the reel cards from stills to video once the MP4s are in `assets/video/`.
