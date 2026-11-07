# Fastrr Studio · The Set

A one-page site that walks visitors past seven "stations" on a 3D film set (brief desk, script table, turntable, render stage, edit bay, language booth, delivery wall), followed by real work, a brand re-skin demo, a 30-second summary and an agencies section.

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
assets/fonts/           Outfit and Figtree (woff2, OFL licence) + fonts.css
assets/video/           MP4s for reels and spins (see assets/video/README.md)
vendor/three/           three.js r160 (MIT)
```

## Run locally

The 3D set needs a web server; opened straight from disk (`file://`) the page falls back to the illustrated SVG set.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Add `?review` to the URL to show the phone-preview strip used for design review.

## Configuration

At the top of `assets/js/app.js`:

- `APP_URL`: where the sign-in and "make my ad" buttons go.
- `BRAND_API`: endpoint that returns `{ name, logo, primary }` for a site URL. Empty = sampled palette.
- `MODEL_URL`: licensed GLB for the turntable. Empty = procedural figure.
- `PROTO`: `true` keeps the hand-off in the page instead of navigating to the app.

In `assets/js/data.js`, `VIDEOS_READY` switches the reel cards from stills to video once the MP4s are in `assets/video/`.
