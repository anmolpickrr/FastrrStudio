# Fastrr Studio · The Set

The Fastrr Studio site: an AI creative studio that turns one product link into reels, 360° spins, statics, carousels and campaign kits in Indian languages.

The page is one story, told over a scroll-driven 3D film set. The set walks through how a creative project actually runs:

The tour follows one campaign from brief to delivery. Pick it from the hero: **Beauty** (character film), **Wellness** (animated explainer) or **Fashion** (festive menswear). The homepage is brand-neutral: no client names or logos; the trust band lists industries and the brand studio offers industry presets. Tour frames and clips are 720p. Their frames, script, concepts and deliverables live in `assets/js/journey.js` and `assets/creatives/journey/`.

| Step | Purpose | What you see |
| --- | --- | --- |
| 00 Intro | What the studio makes and what you bring | The delivery wall, then the camera sweeps into the set |
| 01 Brief | Capture what to say | The product page is read; logo, shots and colours are pulled out; the brief fills in |
| 02 Script | Turn the brief into a timed script | Real shots from the film, timed, each checked; one claim the footage can't back is rewritten |
| 03 Create | Develop directions | Three concepts fan out in 3D and one is picked; moodboard of palette, type and logo |
| 04 Render | Make it | The campaign's film resolves as the render counts up; other formats queue alongside. On the 3D set the same film plays on the render stage |
| 05 Edit | Refine | A shot is swapped, the cut stretches to 40s, captions switch language |
| 06 Deliver | Hand over | The brand's real files tick in as ready |

Every stage opens with a hand-off line (what came in, what it makes) and a six-part progress bar, so the chain reads at a glance.

After the set: **What we make** (glass bento), **Work** (a featured piece playing large beside a two-row rail; point to play, open to watch with sound; tier filters), **The edit suite** (a live editor: reframe, effects, music and retime, with collaborator cursors and a running timeline), **Try it with your brand** (the page re-skins to your brand), **How it works**, **Agencies**, **A week on the set** (real work and stickers you can drag and throw, powered by Matter.js), **FAQ** and a closing call to action.

## Motion and interaction

- **Intro curtain** with real load progress (fonts, 3D engine, page), shortened on repeat visits in a session.
- **Viewfinder HUD** over the set: frame corners, REC and a running timecode, and a slate ("Scene 04 · Render · Take 1") on every cut between chapters.
- **Floating glass cards** around the hero model, drifting with the pointer.
- **Particle field** behind every section after the set. One cloud morphs into a form per section (bento, film reel, globe, helix, wave, knot, then the FASTRR wordmark) and takes on the brand colour when the page is re-skinned.
- **Work** fits one screen: the featured piece auto-advances like a showreel, the rail drags and scrolls, and every format opens in the viewer.
- **Kinetic marquee** of outlined format names that speeds up and leans with scroll velocity.
- Inertial smooth scrolling (desktop), custom cursor with contextual labels, magnetic buttons, 3D tilt with glare on cards, and word-by-word headline reveals.
- Everything honours `prefers-reduced-motion`: no intro, no smooth scroll, no particles, static headlines.

## Design system

All type comes from one scale in `assets/css/styles.css` (`--fs-display`, `--fs-h1` … `--fs-tag`), with matching line-height and tracking tokens, and one spacing rhythm (`--sp-section`, `--sp-head`, `--sp-eyebrow`, `--sp-lead`). Section titles, chapter titles, card titles, leads, body, small text and mono labels each map to exactly one step.

Live: https://anmolpickrr.github.io/fastrrstudio/

Everything the page needs is stored in this repository. It loads nothing from a CDN or any other host.

## Structure

```
index.html                 page markup
assets/css/styles.css      all styles (tokens and type scale at the top)
assets/js/creatives.js     the creative library: every reel, 360° catalogue video, static, carousel and brand logo
assets/js/data.js          slots used by the 3D set, tour demos and brand studio (point into assets/creatives/)
assets/js/app.js           set, scroll, 3D scene, tour, work library, lightbox, brand re-skin, motion
assets/creatives/
  reels/<tier>/            100 AI reels: <name>.mp4, <name>.preview.mp4 (6s silent), <name>.jpg poster
  catalogue/<tier>/        36 360° catalogue videos, same three files each
  statics/<category>/      19 statics (beauty, health, fashion, food)
  carousels/<name>/        3 carousels, one folder of numbered cards each
assets/brand/              Fastrr Studio logo and favicons
assets/fonts/              Outfit and Figtree (woff2, OFL)
vendor/                    three.js r160, Lenis 1.1, Matter.js 0.19 (all MIT)
```

Creatives were collected from creative.fastrr.com (read only) and are stored and served from this repository.

### Tags
Every video carries `tags` in `assets/js/creatives.js`: one tier (`starter`, `standard`, `popular`, `premium`) and, for longer story-led pieces, `film` (shown as **Brand Film**). Tags drive the filter chips, the pill on each card and the viewer, each in its own colour.

### Video encoding
All films are H.264 High, 720 wide, constant frame rate (30 fps max), a keyframe every 2 seconds, bitrate capped at the source rate (max 1.1 Mbps) with a 2-second buffer, AAC 96 kbps, `+faststart`. This keeps playback and seeking smooth on mobile data. Grid previews are separate 6-second silent clips at 360 wide (~160 KB), so the library never downloads a full film until it is opened. Settings to reproduce:

```bash
ffmpeg -i in.mp4 -vf "fps=30,scale='min(720,iw)':-2,format=yuv420p" -c:v libx264 -preset medium -profile:v high -level 3.1 -crf 24 -maxrate 1100k -bufsize 2200k -g 60 -keyint_min 60 -sc_threshold 0 -c:a aac -b:a 96k -movflags +faststart out.mp4
```

## Run locally

The 3D set needs a web server; opened straight from disk (`file://`) the page falls back to the illustrated SVG set.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Configuration

`assets/js/config.js` switches on accounts and the leads database (Supabase URL and anon key, sales email, WhatsApp). Every button on the site opens the contact popup or the account popup (`assets/js/studio.js`), and the sales team works the leads in `leads.html`. Setup steps and the database schema: [docs/LEADS-AND-ACCOUNTS.md](docs/LEADS-AND-ACCOUNTS.md), `supabase/schema.sql`.

At the top of `assets/js/app.js`:

- `BRAND_API`: endpoint that returns `{ name, logo, primary }` for a site URL. Empty = sampled palette.
- `MODEL_URL`: licensed GLB for the turntable. Empty = procedural figure.
- `PROTO`: `true` keeps the hand-off in the page instead of navigating to the app.


