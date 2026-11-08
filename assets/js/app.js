/* Showcase data (T, VIDEOS_READY) comes from assets/js/data.js */
/* TODO: production constants */
var APP_URL = 'https://app.fastrr.com';   /* TODO: sign-up / sign-in entry of the app */
var BRAND_API = '';                        /* TODO: endpoint returning {name, logo, primary} for a URL (our scraper) */
var MODEL_URL = '';                        /* TODO: licensed character GLB for the turntable; empty = procedural figure */
var PROTO = true;                          /* prototype: never navigate away on hand-off */
(function(){
'use strict';
var FRAMED = window.self !== window.top;
if (FRAMED) document.documentElement.classList.add('framed');
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var MQ = matchMedia('(max-width: 699px)'), mobile = MQ.matches;
var PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
var MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
var CHL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
var CHR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
var XIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
function $(id){ return document.getElementById(id); }
function el(html){ var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
function img(i, cls, alt){ return '<img src="' + T[i].data + '" width="' + T[i].w + '" height="' + T[i].h + '" class="' + (cls || '') + '" alt="' + (alt || T[i].alt).replace(/"/g, '&quot;') + '">'; }
function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
function lerp(a, b, t){ return a + (b - a) * t; }
function easeOut(t){ return 1 - Math.pow(1 - t, 3); }
document.querySelectorAll('[data-app]').forEach(function(a){ a.href = APP_URL; });

/* ============================================================ DATA */
var ENG = ['#7b5cf5', '#a08bff', '#8b6bff', '#c9b8ff', '#6037d7', '#f0a0ff'];
var ENGN = ['Seedance 2.5', 'Kling 3.0', 'Wan 3.0', 'Omni 1.1 Flash', 'HeyGen', 'Higgsfield Cinema Studio'];
var S = [
  { id: 'brief', c: '#8b6bff', name: 'The brief', scene: 'Brief', h: 'First, what should it say?', p: 'We read your product page and write the brief: what you sell, who it’s for and what every frame needs to show.',
    steps: ['Your product, service or experience', 'The message, the offer and the audience', 'Visuals, voiceover, formats and languages'], you: 'A link or a few photos.', get: 'A clear creative brief.' },
  { id: 'script', c: '#f7b955', name: 'The script', scene: 'Script', h: 'Then, every word and every second.', p: 'The brief becomes a timed script with the hook, the offer and the voiceover. Each line is checked against your photos, so nothing promises more than your product shows.',
    steps: ['Hook, message and offer, timed to the second', 'Voiceover and on-screen text', 'Format, language and brand assets'], you: 'Read it. Change any line.', get: 'A script you can sign off.' },
  { id: 'create', c: '#f0a0ff', name: 'The creative', scene: 'Create', h: 'Ideas, built from your own assets.', p: 'We gather your photos, logo and colours, explore a few directions and build a concept for every format, right down to a full 360° turn of your product.',
    steps: ['Your assets and brand kit, gathered', 'Three directions to choose from', 'A concept for every format'], you: 'Pick the direction you like.', get: 'Concepts for statics, video and GIFs.' },
  { id: 'render', c: '#5fd4ff', name: 'The render', scene: 'Render', h: 'Made on the engine that suits each shot.', p: 'Statics, reels, GIFs and spins are made on the best engine for the job, then put together for your first look.',
    steps: ['Six engines, one chosen for each shot', 'Statics, video, GIFs and spins', 'Your logo placed exactly, never redrawn'], engines: true, you: 'Ask for a different look anytime.', get: 'A first preview of everything.' },
  { id: 'edit', c: '#3ecf8e', name: 'The edit', scene: 'Edit', h: 'Polished until you’re happy.', p: 'Swap one shot and keep the rest. Stretch a reel to 40 seconds. Add another language. Just tell us what to change.',
    steps: ['Change any shot in place', 'Stretch a 20-second reel to 40', 'Cut it in हिन्दी, தமிழ் and తెలుగు'], you: 'Tell us what to change.', get: 'A final cut, ready to approve.' },
  { id: 'wall', c: '#ffd27a', name: 'The delivery', scene: 'Deliver', h: 'Ready to post, all in one place.', p: 'Every creative, in every size and language, waiting in your library. Download it all, share it with your team and come back for the next launch.',
    steps: ['Every size, every language', 'Download everything at once', 'One library for your whole team'], you: 'Download or share.', get: 'A campaign ready to go live.' }
];
var brandKey = 'shesha';
function escH(x){ return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
var ARROW_S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

/* ============================================================ CHAPTERS (0 = hero, 1-6 = production stages) */
var panels = $('panels'), NCH = S.length;
/* chapter → physical station on the set (the language booth is passed on the way to delivery) */
var PHYS = [0, 0, 1, 2, 3, 4, 6];
/* what each stage hands to the next */
var ART = ['Creative brief', 'Timed script', 'Picked direction', 'First preview', 'Final cut', 'Delivered'];
S.forEach(function(s, i){
  panels.appendChild(el('<article class="panel ch" id="panel-' + i + '" style="--c:' + s.c + '" aria-labelledby="ph-' + i + '">'
    + '<div class="ch-text"><div class="ch-top"><span class="ch-no" aria-hidden="true">0' + (i + 1) + '</span><span class="ch-eyebrow"><b>Step 0' + (i + 1) + '</b>' + s.name.replace('The ', '') + '</span></div>'
    + '<h2 id="ph-' + i + '">' + s.h + '</h2><p class="ch-lede">' + s.p + '</p>'
    + '<dl class="ch-io"><div><dt>You</dt><dd>' + s.you + '</dd></div><div><dt>You get</dt><dd>' + s.get + '</dd></div></dl></div>'
    + '<div class="console"><div class="console-bar"><span class="pipe" aria-hidden="true">' + S.map(function(x, k){ return '<i class="' + (k < i ? 'done' : k === i ? 'now' : '') + '" style="--pc:' + x.c + '"></i>'; }).join('') + '</span><span class="run-name">' + RUNS[brandKey].name + '</span></div>'
    + '<div class="thread" id="thread-' + i + '" aria-live="polite"></div></div></article>'));
});
var PANELS = [$('panel-hero')].concat(S.map(function(_, i){ return $('panel-' + i); }));

/* ============================================================ PRODUCTION STAGES (one real campaign, brief to delivery) */
var played = {}; var timers = {};
function sw(r){ return r.palette.map(function(c){ return '<i style="background:' + c + '"></i>'; }).join(''); }
function artThumb(i, r){
  if (i === 0) return '<span class="art-sw">' + sw(r) + '</span>';
  var src = i === 1 ? r.frames[0] : i === 2 ? r.concepts[r.pick][0] : r.reel.poster;
  return '<img src="' + escH(src) + '" alt="">';
}
function handoff(i, r){
  if (i === 0) return '<div class="st-in"><span class="st-in-th"><img src="' + escH(r.logo) + '" alt=""></span><span><small>Starts from</small><b>' + escH(r.url.split('/')[0]) + '</b></span><span class="st-arr">' + ARROW_S + '</span><span class="st-out"><small>Makes</small><b>' + ART[0] + '</b></span></div>';
  return '<div class="st-in"><span class="st-in-th">' + artThumb(i - 1, r) + '</span><span><small>From step 0' + i + '</small><b>' + ART[i - 1] + '</b></span><span class="st-arr">' + ARROW_S + '</span><span class="st-out"><small>Makes</small><b>' + ART[i] + '</b></span></div>';
}
function vid(src, poster, cls){ return '<video class="' + (cls || '') + '" muted loop playsinline preload="none" poster="' + escH(poster) + '" data-src="' + escH(src) + '"></video>'; }
function buildStage(i, r){
  var h = handoff(i, r);
  if (i === 0) h += '<div class="st stg-sb"><div class="sb-page"><div class="sb-url"><i></i><span>' + escH(r.url) + '</span></div><div class="sb-hero"><img src="' + escH(r.hero) + '" alt="' + escH(r.product) + '"><span class="sb-scan"></span></div><div class="sb-pt"><b>' + escH(r.product) + '</b><span>' + escH(r.name) + '</span></div></div>'
    + '<div class="sb-pull"><span class="sb-l">Pulled from the page</span><span class="sb-items"><span class="sb-logo"><img src="' + escH(r.logo) + '" alt="' + escH(r.name) + ' logo"></span>' + r.frames.slice(0, 3).map(function(f){ return '<img class="sb-ph" src="' + escH(f) + '" alt="">'; }).join('') + '<span class="sb-sw">' + sw(r) + '</span></span></div>'
    + '<dl class="sb-sheet">' + [['Product', r.product], ['Message', r.msg], ['Offer', r.offer], ['Audience', r.aud], ['Tone', r.tone], ['Formats', r.fmt]].map(function(f, k){ return '<div style="--k:' + k + '"><dt>' + f[0] + '</dt><dd>' + escH(f[1]) + '</dd></div>'; }).join('') + '</dl></div>';
  if (i === 1) h += '<div class="st stg-ss"><div class="ss-head"><span>' + escH(r.reel.dur) + ' film · 9:16</span><span>Every line checked</span></div>'
    + r.script.map(function(l, k){ var w = r.warn.i === k; return '<div class="ss-row' + (w ? ' warn' : '') + '" style="--k:' + k + '"><img src="' + escH(r.frames[k]) + '" alt=""><div><span class="ss-meta"><time>' + l[0] + '</time><b>' + l[2] + '</b></span><p>' + (w ? '<s>' + escH(r.warn.was) + '</s><span class="now">' + escH(l[1]) + '</span>' : escH(l[1])) + '</p><span class="ss-chk">' + (w ? escH(r.warn.why) : 'Matches the footage') + '</span></div></div>'; }).join('') + '</div>';
  if (i === 2) h += '<div class="st stg-sc"><div class="sc-fan">' + r.concepts.map(function(c, k){ return '<figure class="sc-c' + (k === r.pick ? ' pk' : '') + '" style="--k:' + k + '"><img src="' + escH(c[0]) + '" alt=""><figcaption><b>' + escH(c[1]) + '</b>' + escH(c[2]) + '</figcaption><span class="sc-badge">Picked</span></figure>'; }).join('') + '</div>'
    + '<div class="sc-mood"><span class="sc-l">Moodboard</span><span class="sc-sw">' + sw(r) + '</span><span class="sc-aa">Aa</span><span class="sc-logo"><img src="' + escH(r.logo) + '" alt=""></span></div></div>';
  if (i === 3) h += '<div class="st stg-sr"><div class="sr-phone">' + vid(r.reel.preview, r.reel.poster) + '<span class="sr-veil"></span><span class="sr-line"></span><span class="sr-eng"><i></i>' + escH(r.engine) + '</span></div>'
    + '<div class="sr-side"><div class="sr-pct"><b class="sr-n">0</b><i>%</i><span class="sr-st">Rendering</span></div>' + r.deliver.slice(0, 4).map(function(d, k){ return '<div class="sr-q" style="--k:' + k + '"><img src="' + escH(d.src) + '" alt=""><span><b>' + escH(d.kind) + '</b>' + d.ratio + '</span><i class="sr-bar"><i></i></i></div>'; }).join('') + '</div></div>';
  if (i === 4) h += '<div class="st stg-se"><div class="se-mon">' + vid(r.reel.preview, r.reel.poster) + '<span class="se-cap">' + escH(r.msg) + '</span><span class="se-langs"><i class="on">EN</i><i>हिन्दी</i><i>தமிழ்</i></span></div>'
    + '<div class="se-tl"><div class="se-ruler"><span>0s</span><span>10s</span><span>20s</span><span class="x40">40s</span></div><div class="se-track">' + r.frames.map(function(f, k){ return '<span class="se-clip' + (k === 1 ? ' sw' : '') + '"><img src="' + escH(f) + '" alt="">' + (k === 1 ? '<em>Take 2</em>' : '') + '</span>'; }).join('') + '<span class="se-ext"><img src="' + escH(r.frames[3]) + '" alt=""><em>+20s</em></span></div><i class="se-ph"></i></div>'
    + '<ul class="se-log"><li style="--k:0">' + TICK + 'Shot 2 swapped, the rest untouched</li><li style="--k:1">' + TICK + 'Stretched to 40 seconds</li><li style="--k:2">' + TICK + 'Hindi and Tamil cuts added</li></ul></div>';
  if (i === 5) h += '<div class="st stg-sd"><div class="sd-grid">' + r.deliver.map(function(d, k){ return '<figure class="sd-t" style="--k:' + k + '">' + (d.video && k < 2 ? vid(d.video, d.src) : '<img src="' + escH(d.src) + '" alt="">') + '<span class="sd-k">' + escH(d.kind) + '</span><span class="sd-r">' + d.ratio + '</span><i class="sd-ok">' + TICK + '</i></figure>'; }).join('') + '</div>'
    + '<div class="sd-foot"><span><b>' + r.deliver.length + ' files</b> ready in your library</span><a class="btn sm" href="' + APP_URL + '" data-app>Start yours ' + ARROW_S + '</a></div></div>';
  return el('<div class="stage-c">' + h + '</div>');
}
function stageFX(i, node){
  var T_ = timers[i], d = reduce ? 0 : 1;
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ node.classList.add('go'); }); });
  if (i === 1){ var rows = node.querySelectorAll('.ss-row'); rows.forEach(function(rw, k){ T_.push(setTimeout(function(){ rows.forEach(function(x){ x.classList.remove('on'); }); rw.classList.add('on', 'seen'); if (rw.classList.contains('warn')) T_.push(setTimeout(function(){ rw.classList.add('fixed'); }, 900 * d)); }, (500 + k * 1100) * d)); }); T_.push(setTimeout(function(){ rows.forEach(function(x){ x.classList.remove('on'); }); }, (500 + rows.length * 1100) * d)); }
  if (i === 2) T_.push(setTimeout(function(){ node.classList.add('picked'); }, 1500 * d));
  if (i === 3){ var n = node.querySelector('.sr-n'), st = node.querySelector('.sr-st'), t0 = performance.now(), D = reduce ? 1 : 3000;
    (function tick(){ var p = Math.min(1, (performance.now() - t0) / D); n.textContent = Math.round(p * 100); node.style.setProperty('--rp', p.toFixed(3)); if (p < 1 && node.isConnected) requestAnimationFrame(tick); else { st.textContent = 'Ready to preview'; node.classList.add('done'); } })(); }
  if (i === 4){ var langs = node.querySelectorAll('.se-langs i'), cap = node.querySelector('.se-cap'), base = cap.textContent, L = ['', 'हिन्दी', 'தமிழ்'], li = 0;
    T_.push(setInterval(function(){ if (!node.isConnected) return; li = (li + 1) % 3; langs.forEach(function(x, k){ x.classList.toggle('on', k === li); }); cap.textContent = li ? L[li] + ' · ' + base : base; }, 2200)); }
}
function syncVideos(){
  document.querySelectorAll('#panels video').forEach(function(v){
    var p = v.closest('.panel'), on = !reduce && p && (mobile ? p.getBoundingClientRect().top < innerHeight && p.getBoundingClientRect().bottom > 0 : p.classList.contains('on'));
    if (on){ if (!v.getAttribute('src')) v.src = v.getAttribute('data-src'); v.play().catch(function(){}); } else if (!v.paused) v.pause();
  });
}
function reveal(){}
function playStation(i, force){
  var thread = $('thread-' + i); if (!thread) return;
  if (played[i] === brandKey && !force){ syncVideos(); return; }
  played[i] = brandKey;
  (timers[i] || []).forEach(function(t){ clearTimeout(t); clearInterval(t); }); timers[i] = [];
  thread.innerHTML = '';
  var node = buildStage(i, RUNS[brandKey]); thread.appendChild(node); stageFX(i, node);
  setTimeout(syncVideos, 60);
}

/* ============================================================ RUNS (whose real campaign the tour replays) */
function runChip(k){ var r = RUNS[k]; return '<button type="button" class="run" data-run="' + k + '" aria-pressed="' + (k === brandKey) + '" aria-label="Follow the ' + r.name + ' campaign"><img src="' + r.logo + '" alt=""><span>' + r.short + '</span></button>'; }
Object.keys(RUNS).forEach(function(k){ $('hero-runs').insertAdjacentHTML('beforeend', runChip(k)); });
function setRun(k){
  brandKey = k; played = {};
  document.querySelectorAll('[data-run]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-run') === k ? 'true' : 'false'); });
  document.querySelectorAll('.run-name').forEach(function(n){ n.textContent = RUNS[k].name; });
  glRun(RUNS[k]);
  if (mobile) S.forEach(function(_, i){ playStation(i); }); else if (cur > 0) playStation(cur - 1, true);
}
document.addEventListener('click', function(ev){
  var b = ev.target.closest('[data-run]'); if (!b) return;
  setRun(b.getAttribute('data-run'));
  if (b.closest('#hero-runs')) go(1);
});
var note = $('hero-note');
$('composer').addEventListener('submit', function(ev){
  ev.preventDefault();
  var v = $('link').value.trim(); if (!v){ $('link').focus(); return; }
  var low = v.toLowerCase().replace(/[^a-z]/g, ''), hit = Object.keys(RUNS).filter(function(k){ return low.indexOf(RUNS[k].url.split('.')[0]) > -1 || low.indexOf(k) > -1; })[0];
  if (hit){ note.textContent = ''; setRun(hit); go(1); return; }
  var url = APP_URL + '/signup?url=' + encodeURIComponent(v);
  note.innerHTML = 'Great choice. Sign up and we’ll start on this link right away: <a href="' + url + '">' + url.replace(/^https?:\/\//, '') + '</a>';
  if (!PROTO) setTimeout(function(){ location.assign(url); }, 900);
});
$('composer').querySelector('.mic').innerHTML = MIC;
$('composer').querySelector('.mic').addEventListener('click', function(){ note.textContent = 'In the app you can just say what you need, and we’ll type it for you.'; });

/* ============================================================ DOCK + SCROLL */
var set = $('set'), stage = $('stage'), art = $('art'), hd = $('hd'), chaps = $('chaps');
var cur = 0, progress = 0, jumpTo = -1, jumpT = 0;
['Intro'].concat(S.map(function(s){ return s.scene; })).forEach(function(n, k){
  n = n.charAt(0).toUpperCase() + n.slice(1);
  chaps.appendChild(el('<li' + (k === 0 ? ' class="on"' : '') + '><button type="button" data-go="' + k + '" aria-label="' + (k ? 'Step 0' + k + ': ' + S[k - 1].name : 'Intro') + '"' + (k === 0 ? ' aria-current="step"' : '') + '><span class="lbl"><small>0' + k + '</small><span>' + n + '</span></span><span class="bar"><i></i></span></button></li>'));
});
function setStation(i){
  if (i === cur && PANELS[i].classList.contains('on')) return;
  panels.classList.toggle('back', i < cur); panels.classList.toggle('fwd', i > cur);
  cur = i;
  if (!mobile) PANELS.forEach(function(p, k){ p.classList.toggle('on', k === i); });
  [].forEach.call(chaps.children, function(li, k){
    li.classList.toggle('on', k === i);
    var b = li.firstChild; if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    if (mobile) li.style.setProperty('--f', k <= i ? 1 : 0);
  });
  var on = chaps.children[i];
  if (on && chaps.scrollWidth > chaps.clientWidth) chaps.scrollTo({ left: on.offsetLeft - chaps.clientWidth / 2 + on.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
  $('engines').classList.toggle('on', i === 4 && !mobile);
  if (i > 0) playStation(i - 1); else syncVideos();
  svgPan(PHYS[i]);
  wakeGL();
}
function setMax(){ return Math.max(1, set.offsetHeight - innerHeight); }
function stationY(i){ return set.offsetTop + (i / NCH) * setMax(); }
var SPY = ['set', 'formats', 'work', 'brand', 'process', 'agencies', 'faq'].map(function(id){ return $(id); });
var navLinks = document.querySelectorAll('#nav a');
var ticking = false;
function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
function update(){
  ticking = false;
  var r = set.getBoundingClientRect(), vh = innerHeight;
  progress = clamp(-r.top / setMax(), 0, 1);
  if (!mobile){
    var f = progress * NCH, si = Math.min(NCH, Math.round(f));
    if (jumpTo < 0) setStation(si); else if (si === jumpTo) jumpTo = -1;
    [].forEach.call(chaps.children, function(li, k){ li.style.setProperty('--f', clamp(f - k + 1, 0, 1).toFixed(3)); });
    set.classList.toggle('past', progress > .015);
    set.classList.toggle('ended', progress > .985);
  }
  hd.classList.toggle('solid', scrollY > 8 || mobile);
  if (mobile) syncVideos();
  var on = 'set';
  SPY.forEach(function(s){ if (s && s.getBoundingClientRect().top < vh * .4) on = s.id; });
  navLinks.forEach(function(a){ var hit = a.getAttribute('data-spy') === on; a.classList.toggle('on', hit); if (hit) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  wakeGL();
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('scrollend', function(){ if (!lenis || !lenis.isScrolling) jumpTo = -1; onScroll(); });
addEventListener('resize', onScroll);
/* one way to move between chapters: the dock, the hero run chips, the composer and the arrow keys */
function go(g){
  g = String(g);
  if (g.charAt(0) === '#'){ smoothTo(document.querySelector(g)); return; }
  var i = clamp(+g, 0, NCH);
  if (mobile){ var top = parseFloat(getComputedStyle(art).top) || 0, y = PANELS[i].getBoundingClientRect().top + scrollY - top - art.offsetHeight + (i === 0 ? -200 : 8); smoothTo(Math.max(0, y)); return; }
  if (Math.abs(i - cur) > 1){ jumpTo = i; clearTimeout(jumpT); jumpT = setTimeout(function(){ jumpTo = -1; onScroll(); }, 2400); }
  setStation(i);
  smoothTo(stationY(i), function(){ jumpTo = -1; onScroll(); });
}
chaps.addEventListener('click', function(ev){ var b = ev.target.closest('button'); if (b) go(b.getAttribute('data-go')); });
chaps.addEventListener('keydown', function(ev){
  if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
  ev.preventDefault(); var n = clamp(cur + (ev.key === 'ArrowRight' ? 1 : -1), 0, NCH); go(n);
  var b = chaps.children[n].firstChild; if (b) b.focus({ preventScroll: true });
});
var pio = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){ if (!mobile) return; es.forEach(function(e){ if (e.isIntersecting) setStation(PANELS.indexOf(e.target)); }); }, { rootMargin: '-45% 0px -45% 0px' }) : null;
if (pio) PANELS.forEach(function(p){ pio.observe(p); });
if (mobile) S.forEach(function(_, i){ playStation(i); });


/* ============================================================ SVG SET (fallback: phones, reduced motion, no WebGL) */
/* the illustrated set (phones): seven physical stations, labelled by the step they serve */
var SVGLAB = ['01  BRIEF', '02  SCRIPT', '03  CREATE', '04  RENDER', '05  EDIT', 'LANGUAGES', '06  DELIVER'];
var SVGNS = 'http://www.w3.org/2000/svg', svgG = null, SX = 230, SX0 = 700;
function svgSet(svg){
  function mk(tag, attrs, parent){ var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); (parent || svg).appendChild(e); return e; }
  svg.innerHTML = '';
  var defs = mk('defs');
  var fg = mk('linearGradient', { id: 'sv-floor', x1: 0, y1: 0, x2: 0, y2: 1 }, defs); mk('stop', { offset: 0, 'stop-color': '#171718' }, fg); mk('stop', { offset: 1, 'stop-color': '#050505' }, fg);
  var rg = mk('radialGradient', { id: 'sv-glow' }, defs); mk('stop', { offset: 0, 'stop-color': '#8b6bff', 'stop-opacity': .35 }, rg); mk('stop', { offset: 1, 'stop-color': '#8b6bff', 'stop-opacity': 0 }, rg);
  var wg = mk('radialGradient', { id: 'sv-warm' }, defs); mk('stop', { offset: 0, 'stop-color': '#ffd9a8', 'stop-opacity': .22 }, wg); mk('stop', { offset: 1, 'stop-color': '#ffd9a8', 'stop-opacity': 0 }, wg);
  mk('rect', { x: -2000, y: 0, width: 6000, height: 720, fill: '#050505' });
  svgG = mk('g', { id: 'sv-pan' });
  var floorY = 300;
  mk('rect', { x: -1500, y: floorY, width: 5000, height: 720 - floorY, fill: 'url(#sv-floor)' }, svgG);
  for (var y = floorY; y < 720; y += 42) mk('line', { x1: -1500, y1: y, x2: 3500, y2: y, stroke: '#1b1b1d' }, svgG);
  for (var x = -1500; x <= 3500; x += 115) mk('line', { x1: x, y1: floorY, x2: x, y2: 720, stroke: '#1b1b1d' }, svgG);
  function station(i){
    var px = SX0 + i * SX, py = 470;
    var g = mk('g', { transform: 'translate(' + px + ' ' + py + ')' }, svgG);
    mk('ellipse', { cx: 0, cy: -160, rx: 150, ry: 260, fill: i === 3 ? 'url(#sv-glow)' : 'url(#sv-warm)' }, g);
    mk('ellipse', { cx: 0, cy: 44, rx: 90, ry: 16, fill: '#141416', stroke: i === 3 ? '#7b5cf5' : '#2a2a2e' }, g);
    function desk(col){ mk('rect', { x: -60, y: -4, width: 120, height: 10, rx: 2, fill: col }, g); mk('rect', { x: -52, y: 6, width: 6, height: 34, fill: '#1c1c1f' }, g); mk('rect', { x: 46, y: 6, width: 6, height: 34, fill: '#1c1c1f' }, g); }
    if (i === 0){ desk('#5a4a3a'); mk('rect', { x: -40, y: -58, width: 80, height: 22, rx: 6, fill: '#0f0f10', stroke: '#8b6bff' }, g); mk('text', { x: 0, y: -43, 'text-anchor': 'middle', 'font-size': 9, 'font-family': 'ui-monospace,Menlo,monospace', fill: '#f4f4f5' }, g).textContent = 'yourbrand.in/products'; [10, 12, 14].forEach(function(ti, k){ var im = mk('image', { x: -34 + k * 24, y: -22, width: 20, height: 20, preserveAspectRatio: 'xMidYMid slice' }, g); im.setAttribute('href', T[ti].data); }); }
    if (i === 1){ desk('#2a2a33'); for (var k = 0; k < 3; k++) mk('rect', { x: -30 + k * 9, y: -40 + k * 5, width: 40, height: 34, fill: k === 2 ? '#f4f4f5' : '#c9c9cc', stroke: '#777' }, g); for (var t = 0; t < 4; t++) mk('circle', { cx: 26 + t * 9, cy: -14, r: 3, fill: t === 2 ? '#f7b955' : '#3ecf8e' }, g); }
    if (i === 2){ mk('ellipse', { cx: 0, cy: 6, rx: 48, ry: 12, fill: '#2a2a2e', stroke: '#444' }, g); mk('ellipse', { cx: 0, cy: 4, rx: 22, ry: 6, fill: 'rgba(0,0,0,.5)' }, g);
      mk('path', { d: 'M-18 4 L-18 -52 Q-18 -60 -10 -64 L-6 -66 L-6 -72 L6 -72 L6 -66 L10 -64 Q18 -60 18 -52 L18 4 Z', fill: '#3a1f7a', stroke: '#a08bff', 'stroke-width': 1.2 }, g);
      mk('rect', { x: -18, y: -40, width: 36, height: 22, fill: '#f3ede2' }, g); mk('rect', { x: -10, y: -33, width: 20, height: 3, fill: '#6037d7' }, g); mk('rect', { x: -7, y: -27, width: 14, height: 2, fill: '#5b5466' }, g);
      mk('rect', { x: -9, y: -92, width: 18, height: 20, rx: 3, fill: '#e3c07a' }, g);
      mk('ellipse', { cx: 0, cy: -34, rx: 34, ry: 9, fill: 'none', stroke: '#f0a0ff', opacity: .7 }, g);
      mk('path', { d: 'M-62 6 A62 14 0 0 1 62 6', fill: 'none', stroke: '#a08bff', 'stroke-dasharray': '4 5' }, g); }
    if (i === 3){ mk('rect', { x: -84, y: -8, width: 168, height: 14, rx: 2, fill: '#232325' }, g); for (var e = 0; e < 6; e++){ var ex = -65 + e * 26; mk('line', { x1: ex, y1: -8, x2: ex, y2: -72, stroke: '#333' }, g); mk('circle', { cx: ex, cy: -78, r: 7, fill: ENG[e] }, g); mk('circle', { cx: ex, cy: -78, r: 16, fill: ENG[e], opacity: .18 }, g); } var fr = mk('image', { x: -22, y: -150, width: 44, height: 78, preserveAspectRatio: 'xMidYMid slice', opacity: .9 }, g); fr.setAttribute('href', T[0].data); mk('rect', { x: -23, y: -151, width: 46, height: 80, fill: 'none', stroke: '#8b6bff' }, g); }
    if (i === 4){ desk('#2a2a33'); mk('rect', { x: -54, y: -46, width: 50, height: 36, rx: 2, fill: '#1c1b2e', stroke: '#8b6bff' }, g); mk('rect', { x: 4, y: -46, width: 50, height: 36, rx: 2, fill: '#1c1b2e', stroke: '#8b6bff' }, g); mk('rect', { x: -50, y: -56, width: 100, height: 5, fill: '#333' }, g); mk('rect', { x: -50, y: -56, width: 50, height: 5, fill: '#7b5cf5' }, g); mk('rect', { x: 0, y: -56, width: 50, height: 5, fill: '#f7b955' }, g); mk('text', { x: 52, y: -60, 'font-size': 8, 'font-family': 'ui-monospace,Menlo,monospace', fill: '#a1a1aa' }, g).textContent = '0:40'; }
    if (i === 5){ mk('rect', { x: -70, y: -140, width: 140, height: 150, rx: 8, fill: 'rgba(139,107,255,.08)', stroke: '#3a3a44' }, g); ['हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'मराठी'].forEach(function(w, k){ mk('text', { x: -46 + (k % 2) * 60, y: -112 + k * 26, 'font-size': 15, 'font-family': 'Figtree,system-ui,sans-serif', fill: k === 1 ? '#f0a0ff' : '#f4f4f5', opacity: .9 }, g).textContent = w; }); mk('rect', { x: -3, y: -40, width: 6, height: 50, fill: '#333' }, g); mk('circle', { cx: 0, cy: -44, r: 7, fill: '#7b5cf5' }, g); }
    if (i === 6){ mk('rect', { x: -110, y: -170, width: 220, height: 180, fill: '#0f0f10', stroke: '#2a2a2e' }, g); [0, 1, 3, 4, 5, 2].forEach(function(ti, k){ var im = mk('image', { x: -100 + (k % 3) * 68, y: -160 + Math.floor(k / 3) * 82, width: 46, height: 76, preserveAspectRatio: 'xMidYMid slice' }, g); im.setAttribute('href', T[ti].data); }); [10, 16].forEach(function(ti, k){ var im = mk('image', { x: 58, y: -160 + k * 56, width: 44, height: 50, preserveAspectRatio: 'xMidYMid slice' }, g); im.setAttribute('href', T[ti].data); }); }
    mk('text', { x: 0, y: 84, 'text-anchor': 'middle', 'font-size': 12, 'font-family': 'ui-monospace,Menlo,monospace', 'letter-spacing': 1.5, fill: 'rgba(255,255,255,.55)', 'data-lab': i }, g).textContent = SVGLAB[i];
  }
  var path = 'M' + SVGLAB.map(function(_, i){ return (SX0 + i * SX) + ' 514'; }).join(' L');
  mk('path', { d: path, fill: 'none', stroke: '#2a2a2e', 'stroke-dasharray': '3 7' }, svgG);
  SVGLAB.forEach(function(_, i){ station(i); });
  svgG.style.transition = 'transform .7s cubic-bezier(.2,.7,.2,1)';
}
function svgPan(i){ if (!svgG) return; svgG.style.transform = 'translateX(' + (-i * SX + (mobile ? 0 : 300)) + 'px)'; svgG.querySelectorAll('text[data-lab]').forEach(function(t){ t.setAttribute('fill', +t.getAttribute('data-lab') === i ? '#a08bff' : 'rgba(255,255,255,.55)'); }); }
svgSet($('svgset')); function svgView(){ $('svgset').setAttribute('viewBox', mobile ? '300 250 800 370' : '0 0 1400 720'); } svgView(); svgPan(0);


/* ============================================================ THREE.JS SET */
var wakeGL = function(){}, glDone = false, glSize = function(){}, glRun = function(){};
function hasWebGL(){ try { var c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e){ return false; } }
function initGL(){
  if (glDone || mobile) return;            /* phones use the SVG set; GL starts later if the window grows past 700px */
  glDone = true;
  var canvas = $('gl');
  if (reduce || location.protocol === 'file:' || !window.THREE || !hasWebGL()){ set.classList.add('nogl'); return; }
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' }); } catch (e){ set.classList.add('nogl'); return; }
  var dpr = Math.min(devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr); renderer.shadowMap.enabled = false;
  var scene = new THREE.Scene(); scene.background = new THREE.Color(0x050505); scene.fog = new THREE.Fog(0x050505, 13, 42);
  var cam = new THREE.PerspectiveCamera(42, 1, .1, 120);
  /* Frame each station in the open area beside (desktop) or above (tablet) the panel, not behind it */
  var VW = 1, VH = 1, OXS = 0, OYS = 0, OXH = 0, lastK = -1, ZK = 1;
  function applyView(c){
    var k = clamp(c, 0, 1); if (Math.abs(k - lastK) < .002) return; lastK = k;
    var ox = Math.round(lerp(OXH, OXS, k)), oy = Math.round(OYS * k);
    if (ox || oy) cam.setViewOffset(VW, VH, ox, oy, VW, VH); else cam.clearViewOffset();
    cam.updateProjectionMatrix();
  }
  function size(){
    var w = art.clientWidth || innerWidth, h = art.clientHeight || innerHeight, ox = 0, oy = 0;
    renderer.setSize(w, h, false); cam.aspect = w / h;
    if (innerWidth >= 1000){
      var ar = art.getBoundingClientRect(), tx = $('panel-0').querySelector('.ch-text').getBoundingClientRect(), cs = $('panel-0').querySelector('.console').getBoundingClientRect();
      var L = tx.right, Rr = cs.left > tx.right + 40 ? cs.left : w;   /* free strip between story and console */
      if (cs.left <= tx.right + 40) L = Math.max(tx.right, cs.right);
      ox = Math.round(w / 2 - ((L - ar.left) + (Rr - ar.left)) / 2);
      var hr = $('panel-hero').getBoundingClientRect(); OXH = Math.round(w / 2 - ((hr.right - ar.left) + w) / 2);
    }
    else { var ph = Math.min(innerHeight * .5, 520) + 104, top = 72; oy = Math.round(h / 2 - (top + h - ph) / 2); }
    ZK = w / h < 1.25 ? clamp(1.35 / (w / h), 1, 1.75) : 1;   /* tall screens: pull the camera back so stations fit */
    VW = w; VH = h; OXS = ox; OYS = oy; lastK = -1; applyView(typeof camC === 'number' ? camC : 0);
  }
  glSize = function(){ size(); wakeGL(); };
  size(); addEventListener('resize', glSize);
  var GAP = 10;
  var amb = new THREE.AmbientLight(0xffffff, .42); scene.add(amb);
  var hemi = new THREE.HemisphereLight(0x5a4a9a, 0x1a1208, .6); scene.add(hemi);
  var key = new THREE.DirectionalLight(0xffd9a8, .8); key.position.set(4, 9, 6); scene.add(key);
  var follow = new THREE.PointLight(0xffe0bd, 7.5, 11, 2); follow.position.set(0, 4.2, 1.8); scene.add(follow);   /* was 7 fixed lights, one per station */
  var HUES = [0xffe0bd].concat(S.map(function(s){ return s.c; })).map(function(c){ return new THREE.Color(c); });
  var spot = new THREE.SpotLight(0xa08bff, 40, 20, .6, .7, 1.4); spot.position.set(0, 7, 2.5); scene.add(spot); scene.add(spot.target);
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 70), new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 1 })); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  var grid = new THREE.GridHelper(200, 100, 0x2c2c30, 0x202024); grid.position.y = .01; scene.add(grid);
  var backWall = new THREE.Mesh(new THREE.PlaneGeometry(200, 20), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 1 })); backWall.position.set(30, 10, -8); scene.add(backWall);
  function mat(c, o){ return new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: .8, metalness: .05 }, o || {})); }
  function glow(c, i){ return new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: i == null ? .8 : i, roughness: .6 }); }
  function box(w, h, d, m, x, y, z, parent){ var mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); mesh.position.set(x, y, z); (parent || scene).add(mesh); return mesh; }
  var loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous');
  function tex(i, onErr){ var t = loader.load(T[i].data, function(){ t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; wakeGL(); }, undefined, onErr); t.colorSpace = THREE.SRGBColorSpace; return t; }
  function textTex(text, o){ o = o || {}; var w = o.w || 512, h = o.h || 128, c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d');
    if (o.bg){ x.fillStyle = o.bg; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, o.r || 28); x.fill(); if (o.border){ x.lineWidth = 6; x.strokeStyle = o.border; x.stroke(); } }
    x.fillStyle = o.color || '#f4f4f5'; x.font = (o.weight || 600) + ' ' + (o.size || 56) + 'px ' + (o.font || 'Figtree, system-ui, sans-serif'); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, w / 2, h / 2 + 2);
    var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
  function label(text, w, h, o){ var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: textTex(text, o), transparent: true })); return m; }
  function sprite(text, w, h, o){ var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTex(text, o), transparent: true, depthWrite: false, opacity: .9 })); s.scale.set(w, h, 1); return s; }
  function desk(x, c){ var g = new THREE.Group(); g.position.x = x; box(3, .12, 1.4, mat(c), 0, 1, 0, g); [[-1.4, -.6], [1.4, -.6], [-1.4, .6], [1.4, .6]].forEach(function(p){ box(.08, 1, .08, mat(0x1c1c1f), p[0], .5, p[1], g); }); scene.add(g); return g; }

  /* 0 brief desk: floating product link + photos that lift as they import */
  var d0 = desk(0, 0x5a4a3a);
  var link = label('yourbrand.in/products/…', 2.2, .55, { bg: '#0f0f10', border: '#8b6bff', color: '#f4f4f5', size: 54, w: 1024, h: 256, font: 'ui-monospace, Menlo, monospace', weight: 500 }); link.position.set(0, 2.0, .1); d0.add(link);
  var linkLight = new THREE.PointLight(0x8b6bff, 4, 5, 2); linkLight.position.set(0, 2.1, .6); d0.add(linkLight);
  var photos0 = [10, 12, 14].map(function(ti, k){ var m = new THREE.Mesh(new THREE.PlaneGeometry(.6, .6), new THREE.MeshStandardMaterial({ map: tex(ti), roughness: .9 })); m.rotation.x = -Math.PI / 2 + .12; m.position.set(-.85 + k * .7, 1.08, .25); m.userData.k = k; d0.add(m); return m; });
  var logo0 = new THREE.Mesh(new THREE.PlaneGeometry(.7, .28), new THREE.MeshStandardMaterial({ map: tex(24), roughness: .9, transparent: true })); logo0.rotation.x = -Math.PI / 2 + .12; logo0.position.set(1.0, 1.08, -.3); d0.add(logo0);
  var briefCards = ['Product', 'Message', 'Offer', 'Voiceover', 'Formats'].map(function(t, k){
    var sp = sprite(t, .78, .24, { bg: 'rgba(16,16,20,.94)', border: '#8b6bff', color: '#f4f4f5', size: 50, w: 512, h: 158, r: 50, weight: 600 });
    sp.userData = { tx: (k - 2) * .86, ty: 2.95 - Math.abs(k - 2) * .14, k: k }; sp.position.set(0, 1.2, .3); sp.material.opacity = 0; d0.add(sp); return sp;
  });

  /* 1 script table: pages that turn, check lights */
  var d1 = desk(GAP, 0x2a2a33), pages = [];
  for (var k = 0; k < 4; k++){ var pv = new THREE.Group(); pv.position.set(-.45, 1.07 + k * .012, 0); var pg = new THREE.Mesh(new THREE.PlaneGeometry(.75, 1.0), new THREE.MeshStandardMaterial({ color: k === 3 ? 0xf4f4f5 : 0xd6d6d9, roughness: .95, side: THREE.DoubleSide })); pg.rotation.x = -Math.PI / 2; pg.position.x = .375; pv.add(pg); d1.add(pv); pages.push(pv); }
  var pageLines = label('0:00  0:03  0:08  0:14  0:20', .7, .18, { color: '#0a0a0a', size: 40, w: 1024, h: 256, font: 'ui-monospace, Menlo, monospace' }); pageLines.rotation.x = -Math.PI / 2; pageLines.position.set(-.07, 1.13, -.3); d1.add(pageLines);
  var boardCv = document.createElement('canvas'); boardCv.width = 1024; boardCv.height = 640;
  function drawBoard(r){
    var c = boardCv, W = c.width, H = c.height, x = c.getContext('2d'), COL = ['#7b5cf5', '#c2410c', '#2f8f4e', '#b45309'];
    x.clearRect(0, 0, W, H); x.textAlign = 'left'; x.fillStyle = '#f3efe6'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#1a1a1d'; x.font = '700 34px ui-monospace, Menlo, monospace'; x.fillText('SCRIPT · ' + r.reel.dur.toUpperCase() + ' FILM', 48, 70);
    x.fillStyle = '#8a8378'; x.font = '500 24px ui-monospace, Menlo, monospace'; x.fillText(r.name.toUpperCase() + ' · CHECKED AGAINST THE FOOTAGE', 48, 108);
    r.script.forEach(function(rw, k){ var y = 190 + k * 108; x.fillStyle = '#e4dfd3'; x.fillRect(40, y - 56, W - 80, 2);
      x.fillStyle = '#5b554c'; x.font = '600 26px ui-monospace, Menlo, monospace'; x.fillText(rw[0], 48, y);
      x.fillStyle = COL[k % 4]; x.beginPath(); x.roundRect(150, y - 30, 170, 40, 20); x.fill(); x.fillStyle = '#fff'; x.font = '700 20px ui-monospace, Menlo, monospace'; x.textAlign = 'center'; x.fillText(rw[2].toUpperCase(), 235, y - 3); x.textAlign = 'left';
      x.fillStyle = '#1a1a1d'; x.font = '500 28px Figtree, system-ui, sans-serif'; var t = rw[1]; while (x.measureText(t).width > W - 400 && t.length > 4) t = t.slice(0, -2); x.fillText(t === rw[1] ? t : t + '…', 346, y); });
    if (boardTex) boardTex.needsUpdate = true;
  }
  var boardTex = null; drawBoard(RUNS[brandKey]); boardTex = new THREE.CanvasTexture(boardCv); boardTex.colorSpace = THREE.SRGBColorSpace; boardTex.anisotropy = 8;
  var board = new THREE.Mesh(new THREE.PlaneGeometry(2.56, 1.6), new THREE.MeshStandardMaterial({ map: boardTex, roughness: .85 })); board.position.set(0, 2.25, -.52); board.rotation.x = -.06; d1.add(board);
  box(2.66, 1.7, .05, mat(0x141416), 0, 2.25, -.64, d1); box(.05, 1.25, .05, mat(0x333336), -1.05, 1.0, -.66, d1); box(.05, 1.25, .05, mat(0x333336), 1.05, 1.0, -.66, d1);
  var scanBar = new THREE.Mesh(new THREE.PlaneGeometry(2.5, .07), new THREE.MeshBasicMaterial({ color: 0xf7b955, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); scanBar.position.set(0, 2.25, -.49); scanBar.rotation.x = -.06; d1.add(scanBar);
  var checks = [0x3ecf8e, 0x3ecf8e, 0xf7b955, 0x3ecf8e].map(function(c, t){ return box(.11, .11, .11, glow(c, .9), .9, 1.12, -.45 + t * .3, d1); });

  /* 2 turntable: a cel-shaded model turns continuously while catalogue-angle markers light up.
     PRODUCTION PATH: when MODEL_URL is set, load the licensed GLB with GLTFLoader (three/addons/loaders/GLTFLoader.js
     in the module build), drop it into `prod` scaled to ~1.75 units tall, and skip buildHero(). If the load fails,
     or MODEL_URL is empty (this prototype; the review page allows no remote assets), buildHero() below stands in. */
  var tt = new THREE.Group(); tt.position.x = GAP * 2; scene.add(tt);
  var plate = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, .18, 48), mat(0x232325, { metalness: .4, roughness: .45 })); plate.position.y = .09; tt.add(plate);
  var prod = new THREE.Group(); prod.position.y = .18; tt.add(prod);
  /* soft contact shadow on the plate */
  (function(){ var c = document.createElement('canvas'); c.width = c.height = 256; var x = c.getContext('2d'); var g = x.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(.6, 'rgba(0,0,0,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    var sh = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })); sh.rotation.x = -Math.PI / 2; sh.position.y = .005; prod.add(sh); })();
  /* --- toon shading helpers --- */
  var gradientMap = (function(){ var c = document.createElement('canvas'); c.width = 4; c.height = 1; var x = c.getContext('2d'); [[0, '#6a6a6a'], [1, '#9a9a9a'], [2, '#d2d2d2'], [3, '#ffffff']].forEach(function(s){ x.fillStyle = s[1]; x.fillRect(s[0], 0, 1, 1); }); var t = new THREE.CanvasTexture(c); t.minFilter = THREE.NearestFilter; t.magFilter = THREE.NearestFilter; t.generateMipmaps = false; return t; })();
  var OUT = new THREE.MeshBasicMaterial({ color: 0x120c1e, side: THREE.BackSide });
  function toon(c, o){ return new THREE.MeshToonMaterial(Object.assign({ color: c, gradientMap: gradientMap }, o || {})); }
  function part(geo, m, x, y, z, parent, out){ var mesh = new THREE.Mesh(geo, m); mesh.position.set(x, y, z); parent.add(mesh); if (out !== false){ var h = new THREE.Mesh(geo, OUT); var s = out || [1.04, 1.04, 1.04]; h.scale.set(s[0], s[1], s[2]); mesh.add(h); } return mesh; }
  function lathe(pts, segs){ return new THREE.LatheGeometry(pts.map(function(p){ return new THREE.Vector2(p[0], p[1]); }), segs || 40); }
  /* --- the hero product: a violet glass bottle with a gold cap and a Fastrr label --- */
  var envTex = (function(){
    var es = new THREE.Scene(); es.background = new THREE.Color(0x07060b);
    function lamp(c, w, h, x, y, z, ry){ var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry || 0; m.lookAt(0, 0, 0); es.add(m); }
    lamp(0xffffff, 6, 2.2, 0, 5, 5); lamp(0xffe0bd, 2, 8, -7, 1, 2); lamp(0x8b6bff, 2.5, 8, 7, 0, -1); lamp(0xf0a0ff, 6, 1, 0, -4, -6); lamp(0xffffff, 1.2, 6, 3, 2, 7);
    var pm = new THREE.PMREMGenerator(renderer), rt = pm.fromScene(es, .03); pm.dispose(); return rt.texture;
  })();
  function labelTex(){
    var c = document.createElement('canvas'), W = 1024, H = 512; c.width = W; c.height = H; var x = c.getContext('2d');
    var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f6f1e8'); g.addColorStop(1, '#e9e0d0'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = '#6037d7'; x.fillRect(0, 0, W, 10); x.fillRect(0, H - 10, W, 10);
    x.textAlign = 'center'; x.fillStyle = '#6037d7'; x.fillRect(W / 2 - 62, 120, 54, 16); x.fillRect(W / 2 - 34, 152, 70, 16);
    x.fillStyle = '#16121f'; x.font = '800 96px Outfit, system-ui, sans-serif'; x.fillText('fastrr', W / 2 + 24, 168);
    x.font = '600 30px Figtree, system-ui, sans-serif'; x.fillStyle = '#5b5466'; x.fillText('STUDIO  ·  YOUR PRODUCT, 360°', W / 2, 250);
    x.strokeStyle = 'rgba(96,55,215,.35)'; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 180, 300); x.lineTo(W / 2 + 180, 300); x.stroke();
    x.font = 'italic 500 34px Figtree, system-ui, sans-serif'; x.fillStyle = '#16121f'; x.fillText('Made from one link', W / 2, 360);
    x.font = '600 22px ui-monospace, Menlo, monospace'; x.fillStyle = '#8a8378'; x.fillText('50 ML  ·  BATCH 01', W / 2, 430);
    var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
  }
  function buildHero(){
    var g = new THREE.Group();
    var prof = [[0, 0], [.34, 0], [.42, .03], [.45, .12], [.45, 1.02], [.42, 1.12], [.3, 1.22], [.15, 1.28], [.13, 1.34], [0, 1.34]].map(function(p){ return new THREE.Vector2(p[0], p[1]); });
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x3a1f7a, metalness: .1, roughness: .06, clearcoat: 1, clearcoatRoughness: .04, envMap: envTex, envMapIntensity: 1.6, iridescence: .7, iridescenceIOR: 1.4, transparent: true, opacity: .93 });
    var body = new THREE.Mesh(new THREE.LatheGeometry(prof, 72), glass); g.add(body);
    var liquid = new THREE.Mesh(new THREE.CylinderGeometry(.38, .4, .78, 64), new THREE.MeshStandardMaterial({ color: 0xb48cff, emissive: 0x7b5cf5, emissiveIntensity: .55, roughness: .3, transparent: true, opacity: .55 })); liquid.position.y = .48; g.add(liquid);
    var label = new THREE.Mesh(new THREE.CylinderGeometry(.458, .458, .52, 72, 1, true, -1.15, 2.3), new THREE.MeshStandardMaterial({ map: labelTex(), roughness: .55, envMap: envTex, envMapIntensity: .4 })); label.position.y = .6; g.add(label);
    var gold = new THREE.MeshPhysicalMaterial({ color: 0xe3c07a, metalness: 1, roughness: .22, clearcoat: .6, envMap: envTex, envMapIntensity: 1.8 });
    var collar = new THREE.Mesh(new THREE.CylinderGeometry(.17, .17, .08, 48), gold); collar.position.y = 1.36; g.add(collar);
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(.21, .23, .5, 24), gold); cap.position.y = 1.65; g.add(cap);
    var top = new THREE.Mesh(new THREE.SphereGeometry(.21, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), gold); top.position.y = 1.9; top.scale.y = .35; g.add(top);
    var halo = new THREE.Mesh(new THREE.TorusGeometry(.78, .008, 8, 120), new THREE.MeshBasicMaterial({ color: 0xf0a0ff, transparent: true, opacity: .6 })); halo.rotation.x = Math.PI / 2.2; halo.position.y = .9; g.add(halo); g.userData.halo = halo;
    var halo2 = new THREE.Mesh(new THREE.TorusGeometry(.95, .005, 8, 120), new THREE.MeshBasicMaterial({ color: 0xa08bff, transparent: true, opacity: .45 })); halo2.rotation.x = Math.PI / 1.8; halo2.position.y = .9; g.add(halo2); g.userData.halo2 = halo2;
    g.position.y = .02; g.scale.setScalar(1.05);
    return g;
  }
  var figure = { group: buildHero() }; prod.add(figure.group);
  var heroGlow = new THREE.PointLight(0xb48cff, 3, 3.2, 2); heroGlow.position.set(0, .7, .6); prod.add(heroGlow);
  var ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, .012, 8, 96), new THREE.MeshBasicMaterial({ color: 0x8b6bff })); ring.rotation.x = Math.PI / 2; ring.position.y = .02; tt.add(ring);
  var markers = []; for (var a = 0; a < 8; a++){ var ang = a / 8 * Math.PI * 2, mk = new THREE.Mesh(new THREE.SphereGeometry(.032, 10, 8), new THREE.MeshBasicMaterial({ color: 0xa08bff })); mk.position.set(Math.cos(ang) * 1.8, .06, Math.sin(ang) * 1.8); tt.add(mk); markers.push(mk); }
  var ttSpot = new THREE.SpotLight(0xffe6c8, 16, 9, .55, .6, 1.4); ttSpot.position.set(GAP * 2 + 1.5, 4.6, 2.5); ttSpot.target.position.set(GAP * 2, 1, 0); scene.add(ttSpot); scene.add(ttSpot.target);
  var ttRim = new THREE.PointLight(0x8b6bff, 5, 6, 2); ttRim.position.set(GAP * 2 - 1.6, 2.4, -1.6); scene.add(ttRim);
  var swatchTex = (function(){ var c = document.createElement('canvas'); c.width = 256; c.height = 320; var x = c.getContext('2d'); x.fillStyle = '#f3efe6'; x.beginPath(); x.roundRect(0, 0, 256, 320, 26); x.fill(); ['#6037d7', '#f0a0ff', '#ffe14d', '#1a1a1d'].forEach(function(col, k){ x.fillStyle = col; x.beginPath(); x.roundRect(28 + (k % 2) * 104, 30 + Math.floor(k / 2) * 104, 96, 96, 14); x.fill(); }); x.fillStyle = '#1a1a1d'; x.font = '700 30px ui-monospace, Menlo, monospace'; x.fillText('PALETTE', 28, 288); var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  var typeTex = textTex('Aa', { bg: '#141418', border: '#f0a0ff', color: '#f4f4f5', size: 150, w: 256, h: 320, r: 26, weight: 700, font: 'Outfit, system-ui, sans-serif' });
  var mood = [[10], [13], ['sw'], [17], [15], ['aa'], [12], [11]].map(function(a, k){
    var ti = a[0], map = ti === 'sw' ? swatchTex : ti === 'aa' ? typeTex : tex(ti), ar = typeof ti === 'number' ? T[ti].w / T[ti].h : .8;
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: map, transparent: true, opacity: 0, depthWrite: false })); sp.scale.set(.68 * ar, .68, 1); sp.userData = { k: k }; tt.add(sp); return sp;
  });

  /* 3 render stage: six lamps pulse one by one, a frame develops */
  var st = new THREE.Group(); st.position.x = GAP * 3; scene.add(st); box(4.6, .3, 3, mat(0x1c1c1f, { roughness: .9 }), 0, .15, 0, st);
  var lamps = [], bulbs = [];
  ENG.forEach(function(c, e){ var ex = -2.1 + e * .84; box(.04, 2.6, .04, mat(0x333333), ex, 1.6, -1.25, st); var s = new THREE.Mesh(new THREE.SphereGeometry(.14, 16, 12), new THREE.MeshBasicMaterial({ color: c })); s.position.set(ex, 3.0, -1.25); st.add(s); bulbs.push(s); lamps.push(new THREE.Color(c)); });
  var stageLamp = new THREE.PointLight(ENG[0], 0, 7, 2); stageLamp.position.set(-2.1, 2.9, -.9); st.add(stageLamp);
  var frameMat = new THREE.MeshBasicMaterial({ map: tex(0), transparent: true, opacity: 0 });
  var devFrame = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 3.38), frameMat); devFrame.position.set(0, 2.05, -.4); st.add(devFrame);
  box(2.0, 3.48, .05, mat(0x0a0a0a), 0, 2.05, -.44, st);
  var scan = box(2.0, .03, .06, glow(0xa08bff, 1.4), 0, .4, -.36, st); scan.visible = false;
  var dev = 0;
  var sides = [[10, -1.95, .25, 'STATIC'], [13, 1.95, -.25, 'AI GIF']].map(function(a){
    var ti = a[0], hh = 1.3, ar = T[ti].w / T[ti].h, m = new THREE.Mesh(new THREE.PlaneGeometry(hh * ar, hh), new THREE.MeshBasicMaterial({ map: tex(ti), transparent: true, opacity: 0 }));
    m.position.set(a[1], 1.45, -.15); m.rotation.y = a[2]; st.add(m);
    var lb = label(a[3], .7, .16, { color: '#5fd4ff', size: 64, w: 512, h: 118, font: 'ui-monospace, Menlo, monospace', weight: 700 }); lb.position.set(a[1], .62, -.1); lb.rotation.y = a[2]; lb.material.opacity = 0; st.add(lb);
    m.userData.lab = lb; m.userData.ar = ar; return m;
  });
  var rlab = label('9:16 FILM', .6, .16, { color: '#5fd4ff', size: 64, w: 512, h: 118, font: 'ui-monospace, Menlo, monospace', weight: 700 }); rlab.position.set(0, .2, -.35); rlab.material.opacity = 0; st.add(rlab);

  /* 4 edit bay: monitors, a timeline that extends from 20 to 40 s */
  var d4 = desk(GAP * 4, 0x2a2a33);
  var mons = [], mon = function(ti, x){ var m = new THREE.Mesh(new THREE.PlaneGeometry(.56, 1.0), new THREE.MeshBasicMaterial({ map: tex(ti) })); m.position.set(x, 1.86, -.27); d4.add(m); mons.push(m); box(.63, 1.07, .04, mat(0x0a0a0a), x, 1.86, -.32, d4); box(.04, .5, .04, mat(0x1c1c1f), x, 1.25, -.34, d4); };
  mon(1, -.4); mon(5, .4);
  var track = box(2.8, .05, .14, mat(0x232325), 0, 1.1, .35, d4);
  var bar = box(1, .07, .16, glow(0x7b5cf5, .7), 0, 1.11, .35, d4); bar.scale.x = 1.4; bar.position.x = -1.4 + .7;
  var ext = box(1, .07, .16, glow(0xf7b955, .7), 0, 1.11, .35, d4); ext.scale.x = .001; ext.position.x = 0;
  var l20 = label('0:20', .4, .16, { color: '#a1a1aa', size: 70, w: 256, h: 100, font: 'ui-monospace, Menlo, monospace' }); l20.position.set(0, 1.27, .5); d4.add(l20);
  var l40 = label('0:40', .4, .16, { color: '#f7b955', size: 70, w: 256, h: 100, font: 'ui-monospace, Menlo, monospace' }); l40.position.set(1.4, 1.27, .5); l40.material.opacity = 0; d4.add(l40);
  var extAmt = 0;
  var playhead = box(.02, .13, .02, glow(0xffffff, 1.4), -1.4, 1.14, .35, d4);

  /* 5 language booth: words drift inside a glass booth */
  var booth = new THREE.Group(); booth.position.x = GAP * 5; scene.add(booth);
  var glass = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.1, 2.2), new THREE.MeshPhysicalMaterial({ color: 0x8b6bff, transparent: true, opacity: .09, roughness: .15, metalness: 0, side: THREE.DoubleSide, depthWrite: false })); glass.position.y = 1.55; booth.add(glass);
  booth.add((function(){ var e = new THREE.LineSegments(new THREE.EdgesGeometry(glass.geometry), new THREE.LineBasicMaterial({ color: 0x3a3a44 })); e.position.y = 1.55; return e; })());
  box(.06, 1.3, .06, mat(0x333333), 0, .65, 0, booth); booth.add((function(){ var m = new THREE.Mesh(new THREE.SphereGeometry(.14, 16, 12), glow(0x7b5cf5, .9)); m.position.set(0, 1.4, 0); return m; })());
  var boothLight = new THREE.PointLight(0x8b6bff, 3, 5, 2); boothLight.position.set(0, 2.6, 0); booth.add(boothLight);
  var words = ['हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'मराठी', 'ಕನ್ನಡ', 'ગુજરાતી', 'മലയാളം', 'ਪੰਜਾਬੀ'].map(function(w, k){ var s = sprite(w, 1.1, .4, { size: 72, w: 512, h: 192, color: k % 3 === 1 ? '#f0a0ff' : '#f4f4f5', weight: 600 }); s.position.set((Math.random() - .5) * 2.4, .4 + Math.random() * 2.4, (Math.random() - .5) * 1.4); s.userData.v = .08 + Math.random() * .1; booth.add(s); return s; });

  /* 6 delivery wall: real posters fly onto hooks as you arrive */
  var wall = new THREE.Group(); wall.position.set(GAP * 6, 0, -2.4); scene.add(wall); box(10, 5.6, .2, mat(0x0f0f10), 0, 2.8, 0, wall);
  var posters = [];
  function poster(ti, x, y, w, h, k){
    var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .9 }));
    m.material.map = tex(ti, function(){ m.material.map = null; m.material.color.setHex([0x6037d7, 0x3b2a6b, 0x2f5d3a, 0x8a6a2b][k % 4]); m.material.needsUpdate = true; });
    m.userData = { target: new THREE.Vector3(x, y, .12), start: new THREE.Vector3(x + 2.5 + Math.random() * 2.5, y + 2.5 + Math.random() * 1.5, 3.5 + Math.random() * 2.5), rot: (Math.random() - .5) * 1.2, k: k };
    m.position.copy(m.userData.start); wall.add(m); posters.push(m);
    var hook = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, .14, 8), mat(0xa1a1aa, { metalness: .6, roughness: .3 })); hook.rotation.x = Math.PI / 2; hook.position.set(x, y + h / 2 + .06, .1); wall.add(hook);
  }
  [0, 1, 3, 4, 5, 2].forEach(function(ti, k){ poster(ti, -3.6 + k * 1.2, 3.55, 1.0, 1.78, k); });
  poster(10, -3.2, 1.45, 1.1, 1.37, 6); poster(13, -1.9, 1.45, 1.1, 1.37, 7); poster(16, -.5, 1.45, 1.15, 1.15, 8); poster(18, .8, 1.45, 1.15, 1.15, 9); poster(7, 2.2, 1.45, .9, 1.6, 10); poster(15, 3.5, 1.45, 1.1, 1.37, 11);
  var wallLight = new THREE.SpotLight(0xffe0bd, 0, 16, .95, .5, 1.2); wallLight.position.set(GAP * 6, 6.5, 4); wallLight.target.position.set(GAP * 6, 2.6, -2.4); scene.add(wallLight); scene.add(wallLight.target);
  var wallRim = new THREE.PointLight(0x8b6bff, 0, 10, 2); wallRim.position.set(GAP * 6 - 5, 4.5, 1); scene.add(wallRim);

  /* dust */
  var N = 900, pos = new Float32Array(N * 3);
  for (var i = 0; i < N; i++){ pos[i * 3] = -8 + Math.random() * 80; pos[i * 3 + 1] = Math.random() * 6.5; pos[i * 3 + 2] = -8 + Math.random() * 10; }
  var dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xfff1dc, size: .05, map: (function(){ var c = document.createElement('canvas'); c.width = c.height = 32; var x = c.getContext('2d'), g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c); })(), transparent: true, opacity: .45, depthWrite: false, sizeAttenuation: true })); scene.add(dust);

  /* camera per station: dx/y/z are offsets from the station, l* are look targets */
  /* chapter 0 is the hero: a wide establishing shot down the whole set; chapters 1-7 are the stations */
  var BX = [GAP * 6, 0, GAP, GAP * 2, GAP * 3, GAP * 4, GAP * 6];
  var CAMS = [
    { dx: 5.4, y: 2.9, z: 11.2, lx: .6, ly: 2.5, lz: -2.4 },     /* intro: the delivery wall, the work you will get */
    { dx: -1.1, y: 3.5, z: 9.4, lx: 0, ly: 1.95, lz: 0 },         /* brief desk + brief cards */
    { dx: -1.0, y: 3.2, z: 8.2, lx: 0, ly: 1.75, lz: -.3 },       /* script board */
    { dx: -1.4, y: 2.8, z: 11.2, lx: 0, ly: 1.4, lz: 0 },        /* creative process: turntable + moodboard ring */
    { dx: -1.6, y: 3.0, z: 13.2, lx: 0, ly: 1.9, lz: -.6 },       /* render stage */
    { dx: -1.1, y: 2.8, z: 8.4, lx: 0, ly: 1.35, lz: 0 },         /* edit bay */
    { dx: -1.2, y: 3.2, z: 17.5, lx: 0, ly: 2.6, lz: -2.4 }       /* delivery wall */
  ];
  /* scroll → camera: hold still at each station for the middle of its scroll range, travel between them */
  function dwell(f){ var i = Math.floor(f), u = f - i; if (i >= NCH) return NCH; var q = clamp((u - .2) / .6, 0, 1); return i + q * q * (3 - 2 * q); }
  function damp(rate, dt){ return 1 - Math.exp(-rate * dt); }   /* frame-rate independent easing */
  var ftAcc = 0, ftN = 0, skip = false;
  var camX = 0, mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0, lastWake = performance.now(), visible = true, last = performance.now();
  var camC = dwell(progress * NCH); camX = BX[Math.round(camC)];
  wakeGL = function(){ lastWake = performance.now(); if (!raf && visible && !document.hidden){ last = performance.now(); raf = requestAnimationFrame(frame); } };
  function frame(now){
    raf = 0;
    var idle = now - lastWake > 4000;
    if (idle && (skip = !skip)){ raf = requestAnimationFrame(frame); return; }   /* ~30 fps while nobody is scrolling */
    var dt = Math.min(.05, (now - last) / 1000); last = now; var t = now / 1000;
    var f = progress * NCH, target = jumpTo >= 0 ? f : dwell(f); camC += (target - camC) * damp(jumpTo >= 0 ? 6 : 4.5, dt);
    var km = damp(3.6, dt); mx += (tmx - mx) * km; my += (tmy - my) * km;
    var i0 = clamp(Math.floor(camC), 0, NCH), i1 = clamp(i0 + 1, 0, NCH), u = easeOut(clamp(camC - i0, 0, 1)), A = CAMS[i0], B = CAMS[i1];
    camX = lerp(BX[i0], BX[i1], u); follow.position.x = camX; applyView(camC);
    var house = clamp(1 - camC, 0, 1); amb.intensity = .42 + .55 * house; hemi.intensity = .6 + 1.6 * house; key.intensity = .8 + 1.0 * house; scene.fog.near = 13 + 6 * house; scene.fog.far = 42 + 20 * house;
    var sx = camX;
    cam.position.set(sx + lerp(A.dx, B.dx, u) + mx * .7, lerp(A.y, B.y, u) + my * .35, lerp(A.lz, B.lz, u) + (lerp(A.z, B.z, u) - lerp(A.lz, B.lz, u)) * ZK);
    cam.lookAt(sx + lerp(A.lx, B.lx, u) + mx * .3, lerp(A.ly, B.ly, u) + my * .15, lerp(A.lz, B.lz, u));
    var hueT = HUES[clamp(Math.round(camC), 0, NCH)]; spot.color.lerp(hueT, damp(3, dt));
    var near = Math.round(camX / GAP); spot.position.set(near * GAP, 7, 2.5); spot.target.position.set(near * GAP, 1, 0);
    function nearness(i, w){ return clamp(1 - Math.abs(camX - GAP * i) / (GAP * (w || .55)), 0, 1); }
    /* 0 */ var n0 = nearness(0, .7); link.position.y = 2.0 + Math.sin(t * 1.4) * .08; link.rotation.y = Math.sin(t * .7) * .12; linkLight.intensity = 2.5 + Math.sin(t * 2) * 1.2;
    briefCards.forEach(function(sp){ var u = sp.userData, a = easeOut(clamp((n0 - .3 - u.k * .07) / .4, 0, 1)); sp.position.set(lerp(0, u.tx, a), lerp(1.2, u.ty + Math.sin(t * 1.3 + u.k) * .04, a), .3); sp.material.opacity = a; });
    photos0.forEach(function(m){ var lift = n0 * (.5 + .5 * Math.sin(t * 1.6 + m.userData.k * 1.1)); m.position.y = 1.08 + lift * .22; });
    /* 1 */ var n1 = nearness(1, .6); pages.forEach(function(pv, k){ var ph = clamp((t * .45 + k * .25) % 2.6, 0, 1); var ang = (k === 3 ? 0 : easeOut(ph) * Math.PI) * n1; pv.rotation.z = -ang; });
    scanBar.position.y = 2.95 - ((t * .28) % 1) * 1.4; scanBar.material.opacity = n1 * .55;
    checks[2].material.emissiveIntensity = .4 + .6 * (Math.sin(t * 5) > 0 ? 1 : 0);
    /* 2 */ var n2 = nearness(2, .6); var fg = figure.group; fg.rotation.y = (t * (Math.PI * 2 / 9)) % (Math.PI * 2);
    fg.position.y = .04 + Math.sin(t * 1.2) * .05; fg.userData.halo.rotation.z = t * .6; fg.userData.halo2.rotation.z = -t * .4; fg.userData.halo.rotation.x = Math.PI / 2.2 + Math.sin(t * .7) * .12;
    var seg = Math.floor(((fg.rotation.y / (Math.PI * 2)) * 8 + 8) % 8); mood.forEach(function(sp){ var k = sp.userData.k, ang = k / mood.length * Math.PI * 2 + t * .22, rr = lerp(.8, 2.75, easeOut(n2)); sp.position.set(Math.cos(ang) * rr, 1.25 + Math.sin(ang * 2 + t * .8) * .28 + (1 - n2) * .6, Math.sin(ang) * rr); var front = sp.position.z > .2 && Math.abs(sp.position.x) < 1.35 ? clamp(1 - sp.position.z / 1.2, .06, 1) : 1; sp.material.opacity = clamp(n2 * 1.4 - .2, 0, 1) * front; });
    markers.forEach(function(m, k){ var on = k === seg && n2 > .3; m.material.color.setHex(on ? 0xffffff : 0x6037d7); m.scale.setScalar(on ? 1.6 : 1); });
    /* 3 */ var n3 = nearness(3, .6), best = 0, be = 0; bulbs.forEach(function(b, e){ var pulse = Math.max(0, Math.sin(t * 2.2 - e * .95)); b.scale.setScalar(1 + pulse * .45 * n3); if (pulse > best){ best = pulse; be = e; } });
    var kl = damp(7, dt); stageLamp.color.lerp(lamps[be], kl); stageLamp.position.x += ((-2.1 + be * .84) - stageLamp.position.x) * kl; stageLamp.intensity += (n3 * (6 + 8 * best) - stageLamp.intensity) * kl;
    if (n3 > .2){ if (rvid.paused && rvid.getAttribute('src')) rvid.play().catch(function(){}); } else if (!rvid.paused) rvid.pause();
    dev += ((n3 > .5 ? 1 : 0) - dev) * dt * 1.4; frameMat.opacity = dev; rlab.material.opacity = dev; sides.forEach(function(m, k){ var o = clamp((dev - .3 - k * .15) / .3, 0, 1); m.material.opacity = o; m.userData.lab.material.opacity = o; }); scan.visible = dev > .02 && dev < .98; scan.position.y = .36 + dev * 3.38;
    /* 4 */ var n4 = nearness(4, .6); extAmt += ((n4 > .5 ? 1 : 0) - extAmt) * dt * .9; ext.scale.x = Math.max(.001, extAmt * 1.4); ext.position.x = extAmt * .7; l40.material.opacity = extAmt; playhead.position.x = -1.4 + ((t * .3) % 1) * 1.4 * (1 + extAmt); playhead.visible = n4 > .3;
    booth.visible = camC > 1;   /* the booth is only passed on the way to delivery, never behind the intro */
    /* 5 */ words.forEach(function(s){ s.position.y += s.userData.v * dt; if (s.position.y > 2.9) s.position.y = .3; s.material.rotation = Math.sin(t + s.position.x) * .05; });
    /* 6 */ var n6 = nearness(6, .75), kw = damp(5, dt); wallLight.intensity += ((n6 * 90) - wallLight.intensity) * kw; wallRim.intensity += ((n6 * 6) - wallRim.intensity) * kw;
    var busy = false; posters.forEach(function(m){ var a = easeOut(clamp((n6 - .25 - m.userData.k * .035) / .35, 0, 1)); var ud = m.userData; m.position.lerpVectors(ud.start, ud.target, a); m.rotation.z = ud.rot * (1 - a); m.rotation.y = -.8 * (1 - a); if (a > 0 && a < 1) busy = true; });
    /* dust */ var arr = dustGeo.attributes.position.array; for (var d = 1; d < arr.length; d += 3){ arr[d] += dt * .06; if (arr[d] > 6.5) arr[d] = 0; } dustGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, cam);
    /* adaptive resolution: step the pixel ratio down if frames run long */
    if (!idle){ ftAcc += dt; if (++ftN >= 50){ if (ftAcc / ftN > .024 && dpr > 1){ dpr = Math.max(1, dpr - .25); renderer.setPixelRatio(dpr); size(); } ftAcc = ftN = 0; } }
    /* keep the set alive while it is on screen, so nothing freezes mid-motion */
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  }
  stage.addEventListener('mousemove', function(e){ var r = stage.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width * 2 - 1; tmy = -((e.clientY - r.top) / r.height * 2 - 1); wakeGL(); }, { passive: true });
  stage.addEventListener('mouseleave', function(){ tmx = 0; tmy = 0; wakeGL(); });
  document.addEventListener('visibilitychange', function(){ if (!document.hidden){ last = performance.now(); wakeGL(); } });
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(e){ visible = e.isIntersecting; if (visible) wakeGL(); }); }, { threshold: .02 }).observe(set);
  wakeGL();
  /* the selected campaign on the set: desk photos, script board, the film playing on the render stage, edit monitors */
  function texP(p){ var t = loader.load(p, function(){ t.colorSpace = THREE.SRGBColorSpace; t.needsUpdate = true; wakeGL(); }); t.colorSpace = THREE.SRGBColorSpace; return t; }
  var rvid = document.createElement('video'); rvid.muted = true; rvid.loop = true; rvid.playsInline = true; rvid.setAttribute('playsinline', ''); rvid.preload = 'auto';
  var rtex = new THREE.VideoTexture(rvid); rtex.colorSpace = THREE.SRGBColorSpace;
  function ratio(s){ var q = s.split(':'); return +q[0] / +q[1]; }
  glRun = function(r){
    photos0.forEach(function(m, k){ m.material.map = texP(r.frames[k]); m.material.needsUpdate = true; });
    mons.forEach(function(m, k){ m.material.map = texP(r.frames[k + 1]); m.material.needsUpdate = true; });
    drawBoard(r);
    rvid.src = r.reel.preview; frameMat.map = rtex; frameMat.needsUpdate = true;
    sides.forEach(function(m, k){ var d = r.deliver[k + 1] || r.deliver[0]; m.material.map = texP(d.src); m.material.needsUpdate = true; m.scale.x = ratio(d.ratio) / m.userData.ar;
      m.userData.lab.material.map = textTex(d.kind.toUpperCase(), { color: '#5fd4ff', size: 64, w: 512, h: 118, font: 'ui-monospace, Menlo, monospace', weight: 700 }); m.userData.lab.material.needsUpdate = true; });
    wakeGL();
  };
  glRun(RUNS[brandKey]);
  window.__set = { renderer: renderer, scene: scene, get camX(){ return camX; }, get camC(){ return camC; }, get dpr(){ return dpr; } };
}
if (window.THREE) initGL(); else {
  var sc = document.querySelector('script[src*="three.min.js"]');
  if (sc){ sc.addEventListener('load', initGL); sc.addEventListener('error', function(){ set.classList.add('nogl'); }); addEventListener('load', function(){ if (!window.THREE) set.classList.add('nogl'); }); }
  else set.classList.add('nogl');
}


/* ============================================================ WORK · the creative library */
var TAGS = { starter: 'Starter', standard: 'Standard', popular: 'Popular', premium: 'Premium', film: 'Brand Film' };
function tagPills(tags){ return (tags || []).map(function(t){ return '<span class="tag-p t-' + t + '"><i></i>' + TAGS[t] + '</span>'; }).join(''); }
var lb = $('lb'), lbV = $('lb-v'), lbIm = $('lb-i'), lbDots = $('lb-dots'), lbList = [], lbI = 0, lbSlide = 0;
(function(){
  /* Selected work: one featured piece playing large, a two-row rail of everything else beside it.
     Point at (or tap) any piece to feature it; open the featured piece to watch with sound. */
  var TABS = [
    { k: 'reels', label: 'AI reels', list: LIB.reels, sub: 'tags', subs: [['starter', 'Starter'], ['standard', 'Standard'], ['popular', 'Popular'], ['premium', 'Premium'], ['film', 'Brand Film']] },
    { k: 'catalogue', label: '360° catalogue', list: LIB.catalogue, sub: 'tags', subs: [['standard', 'Standard'], ['premium', 'Premium']] },
    { k: 'statics', label: 'Statics', list: LIB.statics, sub: 'catKey', subs: [] },
    { k: 'carousels', label: 'Carousels', list: LIB.carousels, sub: null, subs: [] }
  ];
  var seen = {}; LIB.statics.forEach(function(e){ if (!seen[e.catKey]){ seen[e.catKey] = 1; TABS[2].subs.push([e.catKey, e.cat]); } });
  var tabsEl = $('lib-tabs'), subsEl = $('lib-subs'), rail = $('wk-rail'), feat = $('wk-feat'), media = $('wk-media'), fT = $('wk-t'), fS = $('wk-s'), fTags = $('wk-tags'), fN = $('wk-n'), prog = $('wk-prog');
  var cur = TABS[0], sub = 'all', view = [], fi = 0, autoT = 0, hold = false, live = null;
  function has(e, key, v){ var x = e[key]; return Array.isArray(x) ? x.indexOf(v) > -1 : x === v; }
  function isV(){ return cur.k === 'reels' || cur.k === 'catalogue'; }
  function ar(e){ return isV() ? '9/16' : cur.k === 'carousels' ? '1/1' : e.w + '/' + e.h; }
  function poster(e){ return e.poster || e.src || e.slides[0]; }
  function title(e){ return cur.k === 'carousels' ? e.brand : e.title; }
  function subT(e){ return isV() ? (cur.k === 'reels' ? 'AI reel' : '360° catalogue') + ' · ' + e.dur + (e.lang ? ' · ' + e.lang : '') : cur.k === 'carousels' ? e.title + ' · ' + e.slides.length + ' cards' : e.sub + ' · ' + e.cat; }
  TABS.forEach(function(t, i){ tabsEl.insertAdjacentHTML('beforeend', '<button type="button" role="tab" class="tab" data-k="' + t.k + '" aria-selected="' + (i === 0) + '" tabindex="' + (i ? -1 : 0) + '">' + t.label + ' <small>' + t.list.length + '</small></button>'); });
  function setSubs(){
    subsEl.innerHTML = cur.subs.length ? '<button type="button" class="sub" data-s="all" aria-pressed="true">All</button>' + cur.subs.map(function(s){ var n = cur.list.filter(function(e){ return has(e, cur.sub, s[0]); }).length; return '<button type="button" class="sub' + (TAGS[s[0]] ? ' t-' + s[0] : '') + '" data-s="' + s[0] + '" aria-pressed="false">' + (TAGS[s[0]] ? '<i></i>' : '') + s[1] + ' <small>' + n + '</small></button>'; }).join('') : '';
  }
  function feature(k, user){
    if (!view.length) return; fi = (k + view.length) % view.length; var e = view[fi];
    [].forEach.call(rail.children, function(c, j){ c.classList.toggle('on', j === fi); c.setAttribute('aria-current', j === fi ? 'true' : 'false'); });
    var q = ar(e).split('/'); feat.style.setProperty('--ar', ar(e)); feat.style.setProperty('--arn', (+q[0] / +q[1]).toFixed(4)); feat.className = 'wk-feat k-' + cur.k;
    var html = isV() ? '<img src="' + escH(e.poster) + '" alt=""><video muted loop playsinline preload="auto" poster="' + escH(e.poster) + '" src="' + escH(e.video) + '"></video>'
      : cur.k === 'carousels' ? '<img class="bgb" src="' + escH(e.slides[0]) + '" alt="">' + e.slides.map(function(sl, j){ return '<img class="cs' + (j ? '' : ' on') + '" src="' + escH(sl) + '" alt="' + escH(e.brand) + ', card ' + (j + 1) + '">'; }).join('') : '<img class="bgb" src="' + escH(e.src) + '" alt=""><img class="fit" src="' + escH(e.src) + '" alt="' + escH(e.title) + '">';
    var layer = el('<div class="wk-layer">' + html + '</div>'); media.appendChild(layer);
    requestAnimationFrame(function(){ layer.classList.add('in'); });
    [].slice.call(media.children, 0, -1).forEach(function(o){ o.classList.remove('in'); o.classList.add('out'); var v = o.querySelector('video'); if (v) v.pause(); setTimeout(function(){ o.remove(); }, 600); });
    var v = layer.querySelector('video'); if (v && !reduce){ v.addEventListener('playing', function(){ layer.classList.add('playing'); }); if (wkVis) v.play().catch(function(){}); }
    if (cur.k === 'carousels'){ var cs = layer.querySelectorAll('.cs'), ci = 0; clearInterval(live); live = setInterval(function(){ if (!layer.isConnected) return; cs[ci].classList.remove('on'); ci = (ci + 1) % cs.length; cs[ci].classList.add('on'); }, 1600); }
    fTags.innerHTML = isV() ? tagPills(e.tags) : '<span class="tag-p t-cat"><i></i>' + (cur.k === 'carousels' ? 'Carousel' : 'Static') + '</span>';
    fT.textContent = title(e); fS.textContent = subT(e); fN.innerHTML = '<b>' + (fi < 9 ? '0' : '') + (fi + 1) + '</b> / ' + (view.length < 10 ? '0' : '') + view.length;
    $('wk-play').innerHTML = isV() ? PLAY : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'; $('wk-play').setAttribute('aria-label', isV() ? 'Watch with sound' : 'View full size');
    if (user){ var c = rail.children[fi]; if (c){ var r = c.offsetLeft - rail.scrollLeft; if (r < 0 || r + c.offsetWidth > rail.clientWidth) rail.scrollTo({ left: c.offsetLeft - 8, behavior: reduce ? 'auto' : 'smooth' }); } }
    restartAuto();
  }
  function restartAuto(){ clearTimeout(autoT); if (reduce || hold) return; autoT = setTimeout(function(){ if (wkVis && !hold && !(lb && lb.open)) feature(fi + 1, true); else restartAuto(); }, cur.k === 'carousels' ? 7000 : 6500); }
  function render(){
    view = cur.list.filter(function(e){ return sub === 'all' || !cur.sub || has(e, cur.sub, sub); });
    rail.className = 'wk-rail k-' + cur.k;
    rail.innerHTML = view.map(function(e, j){ return '<button type="button" class="wk-c" data-i="' + j + '" style="--ar:' + ar(e) + ';--d:' + Math.min(j, 14) * 30 + 'ms" aria-label="' + escH(title(e)) + '"><img src="' + escH(poster(e)) + '" alt="" loading="lazy" decoding="async">' + (isV() ? '<span class="wk-tg">' + tagPills(e.tags.slice(0, 1)) + '</span><span class="wk-d">' + escH(e.dur) + '</span>' : '') + '</button>'; }).join('');
    rail.scrollLeft = 0; sizeRail(); feature(0); updProg();
  }
  tabsEl.addEventListener('click', function(ev){ var b = ev.target.closest('.tab'); if (!b) return; cur = TABS.filter(function(t){ return t.k === b.getAttribute('data-k'); })[0]; sub = 'all';
    tabsEl.querySelectorAll('.tab').forEach(function(x){ var on = x === b; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; }); setSubs(); render(); });
  tabsEl.addEventListener('keydown', function(ev){ if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return; var all = [].slice.call(tabsEl.children), i = all.indexOf(document.activeElement); if (i < 0) return; var n = all[(i + (ev.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length]; n.focus(); n.click(); });
  subsEl.addEventListener('click', function(ev){ var b = ev.target.closest('.sub'); if (!b) return; sub = b.getAttribute('data-s'); subsEl.querySelectorAll('.sub').forEach(function(x){ x.setAttribute('aria-pressed', x === b); }); render(); });
  /* rail: point to feature (desktop), tap to feature (touch); the featured piece opens the viewer */
  var hovT = 0;
  rail.addEventListener('mouseover', function(ev){ if (!FINE) return; var c = ev.target.closest('.wk-c'); if (!c) return; clearTimeout(hovT); hovT = setTimeout(function(){ if (+c.getAttribute('data-i') !== fi) feature(+c.getAttribute('data-i')); }, 140); });
  rail.addEventListener('click', function(ev){ var c = ev.target.closest('.wk-c'); if (!c || dragMoved) return; var k = +c.getAttribute('data-i'); if (k === fi && FINE) openLB(view, k, cur.k); else feature(k, true); });
  rail.addEventListener('focusin', function(ev){ var c = ev.target.closest('.wk-c'); if (c) feature(+c.getAttribute('data-i')); });
  $('wk-play').addEventListener('click', function(){ openLB(view, fi, cur.k); });
  media.addEventListener('click', function(){ openLB(view, fi, cur.k); });
  feat.addEventListener('mouseenter', function(){ hold = true; clearTimeout(autoT); }); feat.addEventListener('mouseleave', function(){ hold = false; restartAuto(); });
  rail.addEventListener('mouseenter', function(){ hold = true; clearTimeout(autoT); }); rail.addEventListener('mouseleave', function(){ hold = false; restartAuto(); });
  /* rail scrolling: arrows, drag, progress */
  function sizeRail(){
    var narrow = innerWidth < 1000, rows = narrow ? 1 : 2, h = narrow ? rail.clientHeight - 4 : (rail.clientHeight - 4 - 12 * (rows - 1)) / rows;
    var r = isV() ? 9 / 16 : cur.k === 'carousels' ? 1 : .8;
    rail.style.setProperty('--cw', Math.max(60, h * r).toFixed(1) + 'px'); rail.style.setProperty('--rows', rows);
  }
  addEventListener('resize', sizeRail);
  function step(d){ rail.scrollBy({ left: d * rail.clientWidth * .85, behavior: reduce ? 'auto' : 'smooth' }); }
  $('wk-prev').innerHTML = CHL; $('wk-next').innerHTML = CHR;
  $('wk-prev').addEventListener('click', function(){ step(-1); }); $('wk-next').addEventListener('click', function(){ step(1); });
  function updProg(){ var max = rail.scrollWidth - rail.clientWidth; rail.classList.toggle('more', max - rail.scrollLeft > 4); var p = max > 0 ? rail.scrollLeft / max : 1; prog.style.setProperty('--p', p.toFixed(3)); prog.style.setProperty('--w', Math.min(1, rail.clientWidth / Math.max(1, rail.scrollWidth)).toFixed(3)); $('wk-prev').disabled = rail.scrollLeft < 4; $('wk-next').disabled = rail.scrollLeft > max - 4; }
  rail.addEventListener('scroll', function(){ requestAnimationFrame(updProg); }, { passive: true }); addEventListener('resize', updProg);
  var dragX = null, dragS = 0, dragMoved = false;
  rail.addEventListener('pointerdown', function(e){ if (e.pointerType !== 'mouse') return; dragX = e.clientX; dragS = rail.scrollLeft; dragMoved = false; });
  addEventListener('pointermove', function(e){ if (dragX == null) return; var dx = e.clientX - dragX; if (Math.abs(dx) > 5){ dragMoved = true; rail.classList.add('drag'); } rail.scrollLeft = dragS - dx; });
  addEventListener('pointerup', function(){ dragX = null; rail.classList.remove('drag'); setTimeout(function(){ dragMoved = false; }, 0); });
  rail.addEventListener('keydown', function(e){ if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){ e.preventDefault(); var n = rail.children[fi + (e.key === 'ArrowRight' ? 1 : -1)]; if (n) n.focus(); } });
  /* play only while the section is on screen */
  var wkVis = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ wkVis = es[0].isIntersecting; var v = media.querySelector('.wk-layer:last-child video'); if (v){ if (wkVis && !reduce) v.play().catch(function(){}); else v.pause(); } if (wkVis) restartAuto(); }, { threshold: .3 }).observe(feat);
  setSubs(); render();
})();
/* lightbox: videos play with sound; statics and carousel slides step through */
$('lb-prev').innerHTML = CHL; $('lb-next').innerHTML = CHR; $('lb-x').innerHTML = XIC;
var lbKind = 'reels', lbNext = null;
['playing', 'canplay'].forEach(function(ev){ lbV.addEventListener(ev, function(){ lb.classList.remove('loading'); }); });
lbV.addEventListener('waiting', function(){ lb.classList.add('loading'); });
function lbShow(){
  var e = lbList[lbI], n = lbList.length, isV = lbKind === 'reels' || lbKind === 'catalogue', isC = lbKind === 'carousels';
  lb.className = 'lb k-' + (isV ? 'v' : isC ? 'c' : 's');
  lbV.hidden = !isV; lbIm.hidden = isV; lbDots.innerHTML = '';
  if (isV){
    lb.classList.add('loading'); lbV.preload = 'auto'; lbV.poster = e.poster; lbV.src = e.video; lbV.setAttribute('aria-label', e.title); lbV.muted = false;
    lbV.play().catch(function(){ lbV.muted = true; lbV.play().catch(function(){}); });
    var nx = lbList[(lbI + 1) % n]; if (nx && nx.video){ if (!lbNext){ lbNext = document.createElement('video'); lbNext.preload = 'auto'; lbNext.muted = true; } if (lbNext.getAttribute('src') !== nx.video) lbNext.src = nx.video; }
  }
  else { lbV.pause(); lbV.removeAttribute('src'); }
  if (isC){ lbIm.src = e.slides[lbSlide]; lbIm.alt = e.brand + ', card ' + (lbSlide + 1); lbDots.innerHTML = e.slides.map(function(_, k){ return '<i' + (k === lbSlide ? ' class="on"' : '') + '></i>'; }).join(''); }
  else if (!isV){ lbIm.src = e.src; lbIm.alt = e.title; lbIm.style.aspectRatio = e.w + '/' + e.h; }
  $('lb-n').textContent = isV ? (lbKind === 'reels' ? 'AI reel' : '360° catalogue') + ' · ' + e.dur + ' · ' + (lbI + 1) + ' / ' + n : isC ? 'Carousel · card ' + (lbSlide + 1) + ' of ' + e.slides.length : 'Static · ' + e.cat + ' · ' + (lbI + 1) + ' / ' + n;
  $('lb-t').textContent = isC ? e.brand : e.title;
  $('lb-s').textContent = isV ? (e.lang ? e.lang + ' voiceover' : '') : isC ? e.title + '. ' + e.hook : (e.sub ? e.sub + '. ' : '') + e.hook;
  $('lb-tags').innerHTML = isV ? tagPills(e.tags) : '<span class="tag-p t-cat"><i></i>' + e.cat + '</span>';
}
function lbStep(d){ var e = lbList[lbI]; if (lbKind === 'carousels'){ var ns = lbSlide + d; if (ns >= 0 && ns < e.slides.length){ lbSlide = ns; lbShow(); return; } lbI = (lbI + d + lbList.length) % lbList.length; lbSlide = d > 0 ? 0 : lbList[lbI].slides.length - 1; lbShow(); return; } lbI = (lbI + d + lbList.length) % lbList.length; lbShow(); }
function openLB(list, k, kind){ lbList = list; lbI = k; lbKind = kind || 'reels'; lbSlide = 0; if (!lb.showModal){ window.open(list[k].video || list[k].src || list[k].slides[0], '_blank', 'noopener'); return; } lbShow(); if (!lb.open){ lb.showModal(); if (typeof lenis !== 'undefined' && lenis) lenis.stop(); } }
function closeLB(){ if (lb.open) lb.close(); }
lb.addEventListener('close', function(){ if (typeof lenis !== 'undefined' && lenis) lenis.start(); lbV.pause(); lbV.removeAttribute('src'); lbV.load(); if (lbNext){ lbNext.removeAttribute('src'); lbNext.load(); } });
lb.addEventListener('click', function(ev){ if (ev.target === lb) closeLB(); });
lb.addEventListener('keydown', function(ev){ if (ev.key === 'ArrowRight'){ ev.preventDefault(); lbStep(1); } if (ev.key === 'ArrowLeft'){ ev.preventDefault(); lbStep(-1); } });
$('lb-x').addEventListener('click', closeLB); $('lb-prev').addEventListener('click', function(){ lbStep(-1); }); $('lb-next').addEventListener('click', function(){ lbStep(1); });

/* ============================================================ BRAND RE-SKIN */
var BR = {
  deyga: { t: 24, name: 'Deyga', cat: 'natural skincare', url: 'deyga.in', primary: '#2f8f4e', hover: '#5fc786', reel: 9, prod: 10, spin: 9, car: 12 },
  shesha: { t: 30, name: 'Shesha Ayurveda', cat: 'ayurvedic hair and skin care', url: 'sheshaayurveda.com', primary: '#6a4fb5', hover: '#9d85e8', reel: 11, prod: 12, spin: 9, car: 17 },
  juvia: { t: 20, name: 'Juvia Jewellery', cat: 'jewellery', url: 'juviajewellery.com', primary: '#b8903a', hover: '#e2bd6a', reel: 7, prod: 8, spin: 7, car: 8 },
  nooky: { t: 19, name: 'Nooky', cat: 'fashion', url: 'nooky.in', primary: '#e0523a', hover: '#ff8a74', reel: 5, prod: 15, spin: 6, car: 13 },
  cink: { t: 23, name: 'Cink', cat: 'fashion', url: 'cink.in', primary: '#128a8a', hover: '#3fc4c4', reel: 5, prod: 13, spin: 6, car: 13 },
  aarogya: { t: 21, name: 'Aarogya Nutri Mix', cat: 'food', url: 'aarogyanutrimix.com', primary: '#4f9a2a', hover: '#86cf5e', reel: 14, prod: 14, spin: 9, car: 14 },
  eyesutra: { t: 25, name: 'Eye Sutra', cat: 'eyewear', url: 'eyesutra.in', primary: '#2f55c9', hover: '#6f8ff0', reel: 0, prod: 8, spin: 8, car: 16 },
  estailo: { t: 29, name: 'Estailo', cat: 'fashion', url: 'estailo.in', primary: '#c9a84c', hover: '#ead48b', reel: 5, prod: 13, spin: 6, car: 13 },
  limiteduniq: { t: 22, name: 'Limited Uniq', cat: 'streetwear', url: 'limiteduniq.com', primary: '#f05a1e', hover: '#ff8f5f', reel: 1, prod: 15, spin: 7, car: 15 },
  easify: { t: 26, name: 'Easify', cat: 'everyday essentials', url: 'easify.in', primary: '#6a4ff0', hover: '#9c88ff', reel: 2, prod: 15, spin: 7, car: 16 },
  easypick: { t: 27, name: 'EasyPick', cat: 'home and travel', url: 'easypick.in', primary: '#1f7fe8', hover: '#63adff', reel: 2, prod: 15, spin: 7, car: 15 },
  erweit: { t: 28, name: 'Erweit', cat: 'bags and luggage', url: 'erweit.com', primary: '#3b6b9a', hover: '#74a4d4', reel: 4, prod: 15, spin: 7, car: 15 }
};
var ROOT = document.documentElement, brandSec = $('brand'), brandCur = null;
function rgba(hex, a){ var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; }
function monogram(name){ var ch = (name || '?').trim().charAt(0).toUpperCase(); return 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40"><rect width="64" height="40" rx="8" fill="#0a0a0a"/><text x="32" y="27" text-anchor="middle" font-family="Outfit,system-ui,sans-serif" font-weight="700" font-size="22" fill="#fff">' + ch + '</text></svg>'); }
function setImg(id, src, alt){ var e = $(id); if (!e) return; if (!src){ e.removeAttribute('src'); e.style.display = 'none'; return; } e.style.display = ''; e.src = src; if (alt != null) e.alt = alt; }
function applyBrand(key, custom){
  var b = key ? BR[key] : custom || null; brandCur = key || (custom ? 'custom' : null);
  var vars = b ? { '--accent': b.primary, '--accent-hover': b.hover, '--accent-soft': rgba(b.primary, .14), '--accent-line': rgba(b.primary, .5), '--brand-gradient': 'linear-gradient(120deg,' + b.primary + ' 0%,' + b.hover + ' 100%)', '--glow': '0 0 0 1px ' + rgba(b.primary, .4) + ', 0 0 28px -6px ' + rgba(b.primary, .45) } : {};
  ['--accent', '--accent-hover', '--accent-soft', '--accent-line', '--brand-gradient', '--glow'].forEach(function(v){ if (vars[v]) ROOT.style.setProperty(v, vars[v]); else ROOT.style.removeProperty(v); });
  brandSec.style.background = b ? 'radial-gradient(60% 50% at 70% 30%, ' + rgba(b.primary, .16) + ', transparent 70%), var(--bg-0) var(--dots)' : '';
  var logo = b ? (b.t != null ? T[b.t].data : b.logo) : null;
  $('madefor').classList.toggle('on', !!b); setImg('madefor-logo', logo, b ? b.name + ' logo' : '');
  setImg('o-logo-bar', logo, b ? b.name + ' logo on the reel caption bar' : ''); setImg('o-logo-st', logo, b ? b.name + ' logo on the static' : '');
  setImg('o-reel-img', T[b ? b.reel : 5].data); setImg('o-static-img', T[b ? b.prod : 13].data); setImg('o-spin-img', T[b ? b.spin : 6].data); setImg('o-car-img', T[b ? b.car : 16].data);
  $('o-static-h').textContent = b ? b.cat.charAt(0).toUpperCase() + b.cat.slice(1) + ', in your colours' : 'Your headline, your colours';
  $('h-brand').innerHTML = b ? b.name + ', <span class="hl-p">already made.</span>' : 'Show me what you\'d make for <span class="hl-y">my</span> brand.';
  $('b-narr').innerHTML = b
    ? '<b>' + b.name + '</b>, here’s what we’d make from <b>' + b.url + '</b>: a 20-second reel, three statics, a 360° spin, a five-card carousel, and Hindi and Tamil cuts. Your logo stays exact and your colours stay yours.'
    : 'Pick a brand or enter your site. The board fills with a reel, a static, a 360° spin, a carousel and language cuts, all in that brand’s look.';
  $('b-swatch').innerHTML = b ? '<i style="background:' + b.primary + '"></i><i style="background:' + b.hover + '"></i><i style="background:' + rgba(b.primary, .14) + '"></i><span>Colours from ' + b.url + '</span>' : '';
  $('b-go').href = APP_URL + (b ? '/signup?url=' + encodeURIComponent('https://' + b.url) : '');
  document.querySelectorAll('#b-logos button').forEach(function(btn){ btn.setAttribute('aria-pressed', btn.getAttribute('data-b') === key ? 'true' : 'false'); });
  $('board-pill').textContent = b ? 'Kit for ' + b.name : 'Sample kit';
  if (typeof fxApi !== 'undefined' && fxApi) fxApi.paint();
  $('b-logos').classList.toggle('has-pick', !!key);
  if (!reduce){ brandSec.classList.remove('flash'); void brandSec.offsetWidth; brandSec.classList.add('flash'); }
}
Object.keys(BR).forEach(function(k){ var btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('data-b', k); btn.setAttribute('aria-label', 'Re-skin for ' + BR[k].name); btn.innerHTML = '<img src="' + T[BR[k].t].data + '" alt="">'; $('b-logos').appendChild(btn); });
var brandT = 0, bSubmit = $('b-submit');
function loadBrand(key, custom){
  clearTimeout(brandT);
  var b = key ? BR[key] : custom;
  if (!b || reduce){ brandSec.classList.remove('loading'); bSubmit.disabled = false; bSubmit.textContent = 'Show me'; applyBrand(key, custom); return; }
  brandSec.classList.add('loading'); bSubmit.disabled = true; bSubmit.textContent = 'Reading…';
  $('b-narr').innerHTML = 'Reading <b>' + b.url + '</b> for your logo, colours and products…';
  brandT = setTimeout(function(){ brandSec.classList.remove('loading'); bSubmit.disabled = false; bSubmit.textContent = 'Show me'; applyBrand(key, custom); }, 750);
}
$('b-logos').addEventListener('click', function(ev){ var btn = ev.target.closest('button'); if (!btn) return; var k = btn.getAttribute('data-b'); $('b-url').value = brandCur === k ? '' : BR[k].url; loadBrand(brandCur === k ? null : k); });
$('b-field').addEventListener('submit', function(ev){
  ev.preventDefault();
  var v = $('b-url').value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''); if (!v){ loadBrand(null); return; }
  var hit = Object.keys(BR).filter(function(k){ return v.indexOf(BR[k].url.split('.')[0]) > -1; })[0];
  if (hit){ loadBrand(hit); return; }
  var host = v.split('/')[0], name = host.split('.')[0]; name = name.charAt(0).toUpperCase() + name.slice(1);
  /* TODO: fetch(BRAND_API + '?url=' + host) → { name, logo, primary } ; generic palette until then */
  loadBrand(null, { name: name, cat: 'your products', url: host, primary: '#7b5cf5', hover: '#a08bff', logo: monogram(name), reel: 5, prod: 13, spin: 6, car: 16 });
});
document.querySelectorAll('.play:empty').forEach(function(b){ b.innerHTML = PLAY; });
applyBrand(null);
brandSec.classList.remove('flash');




/* ============================================================ TRUST MARQUEE, MOCKS */
(function(){
  var mq = $('mq'), logos = '';
  /* single-colour, transparent marks sized to equal visual weight (same rendered ink area) */
  LIB.logos.forEach(function(l){ logos += '<img src="' + l.mono + '" alt="' + l.name + '" width="' + Math.round(l.dw) + '" height="' + Math.round(l.dh) + '" style="width:' + l.dw + 'px;height:' + l.dh + 'px' + (l.filter ? ';object-fit:contain;filter:brightness(0) invert(1)' : '') + '" loading="lazy">'; });
  mq.innerHTML = logos + logos.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
  var w = $('wave'), hs = [38, 62, 80, 54, 92, 70, 44, 66, 88, 58, 36, 72, 96, 64, 48, 78, 56, 84, 42, 68, 90, 52, 74, 46];
  if (w) w.innerHTML = hs.map(function(h, i){ return '<i style="--h:' + h + ';--k:' + i + '"></i>'; }).join('');
  $('app-tools').innerHTML = '<span><img src="' + T[30].data + '" alt="">Shesha Ayurveda</span><span>This week</span><span>All formats</span><span class="dl">Download all</span>';
  $('app-grid').innerHTML = [[17, 'carousel'], [11, 'static'], [0, 'reel'], [9, 'spin'], [10, 'static'], [3, 'हिन्दी'], [12, 'static'], [7, 'spin']].map(function(a){ return '<figure><img src="' + T[a[0]].data + '" alt="" loading="lazy"><figcaption>' + a[1] + '</figcaption></figure>'; }).join('');
})();

/* ============================================================ MOBILE MENU */
(function(){
  var btn = $('menu-btn'), menu = $('menu');
  function set(open){
    btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open); document.body.classList.toggle('locked', open); if (lenis){ if (open) lenis.stop(); else lenis.start(); }
    if (open) menu.querySelector('a').focus({ preventScroll: true });
  }
  btn.addEventListener('click', function(){ set(btn.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function(ev){ if (ev.target.closest('a')) set(false); });
  addEventListener('keydown', function(ev){ if (ev.key === 'Escape' && menu.classList.contains('open')){ set(false); btn.focus(); } });
})();

/* ============================================================ REVEAL ON SCROLL */
(function(){
  var els = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function(e){ io.observe(e); });
})();

/* ============================================================ MOTION LAYER */
var FINE = matchMedia('(pointer: fine)').matches;

/* ---- smooth scroll: inertial wheel scrolling on desktop; touch and keyboard stay native */
var lenis = null;
if (window.Lenis && !reduce && FINE){
  lenis = new Lenis({ lerp: .085, smoothWheel: true, wheelMultiplier: 1 });
  (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  document.querySelectorAll('.thread, .chaps, .tabs, .menu').forEach(function(n){ n.setAttribute('data-lenis-prevent', ''); });
}
function smoothTo(target, done){
  var y = typeof target === 'number' ? target : target.getBoundingClientRect().top + scrollY;
  if (lenis){ lenis.scrollTo(y, { duration: Math.min(2.4, .9 + Math.abs(y - scrollY) / 4000), easing: function(t){ return 1 - Math.pow(1 - t, 4); }, onComplete: done }); return; }
  scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); if (done) setTimeout(done, reduce ? 0 : 900);
}
document.addEventListener('click', function(ev){
  var a = ev.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute('href'); if (id.length < 2) return;
  var t = id === '#top' ? 0 : document.querySelector(id); if (t == null) return;
  ev.preventDefault(); smoothTo(t);
  if (history.replaceState) history.replaceState(null, '', id);
});

/* ---- headlines: split into words so each line can slide up out of a mask */
function splitWords(node){
  var k = 0;
  function wrap(content){ var w = document.createElement('span'); w.className = 'w'; var inner = document.createElement('span'); inner.style.setProperty('--i', k++); inner.appendChild(content); w.appendChild(inner); return w; }
  [].slice.call(node.childNodes).forEach(function(c){
    if (c.nodeType === 3){
      var frag = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(function(part){ if (!part) return; if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(' ')); else frag.appendChild(wrap(document.createTextNode(part))); });
      node.replaceChild(frag, c);
    } else if (c.nodeType === 1){ node.replaceChild(wrap(c.cloneNode(true)), c); }
  });
}
document.querySelectorAll('.sw').forEach(splitWords);
PANELS.slice(1).forEach(function(p){ var h = p.querySelector('h2'); h.classList.add('sw'); splitWords(h); });

/* ---- intro curtain: real load progress (fonts, 3D engine, page), never longer than ~4s */
(function(){
  var intro = $('intro'), body = document.body;
  function ready(){ body.classList.add('ready'); }
  var seen = false; try { seen = sessionStorage.getItem('fs-intro') === '1'; sessionStorage.setItem('fs-intro', '1'); } catch (e){}
  if (!intro || reduce){ ROOT.classList.add('no-intro'); ready(); return; }
  if (lenis) lenis.stop();
  var t0 = performance.now(), p = 0, fonts = 0, three = 0, loaded = 0, MIN = seen ? 250 : 1100;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fonts = 1; }); else fonts = 1;
  if (window.THREE) three = 1; else { var sc = document.querySelector('script[src*="three.min.js"]'); if (sc){ sc.addEventListener('load', function(){ three = 1; }); sc.addEventListener('error', function(){ three = 1; }); } else three = 1; }
  if (document.readyState === 'complete') loaded = 1; else addEventListener('load', function(){ loaded = 1; });
  var bar = $('intro-bar'), count = $('intro-count');
  (function tick(){
    var now = performance.now(), target = Math.max(fonts * .3 + three * .4 + loaded * .3, Math.min(.85, (now - t0) / 3000));
    if (target > .999 || now - t0 > 3200) target = 1;
    p += (target - p) * .14; if (target === 1 && (p > .985 || now - t0 > 3800)) p = 1;
    bar.style.setProperty('--p', p.toFixed(3)); count.textContent = ('00' + Math.round(p * 100)).slice(-3);
    if (p >= 1 && now - t0 > MIN){ intro.classList.add('done'); ready(); if (lenis) lenis.start(); setTimeout(function(){ intro.remove(); }, 1400); return; }
    requestAnimationFrame(tick);
  })();
})();

/* ---- viewfinder: running timecode, scene number, and a slate on every cut */
var vfTc = $('vf-tc'), vfSc = $('vf-sc'), slate = $('slate'), slateT = 0, tcStart = performance.now();
setInterval(function(){
  if (mobile || !vfTc || set.getBoundingClientRect().bottom < 0) return;
  var f = Math.floor((performance.now() - tcStart) / (1000 / 24)), ff = f % 24, s = Math.floor(f / 24);
  vfTc.textContent = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60, ff].map(function(n){ return ('0' + n).slice(-2); }).join(':');
}, 42);
var CH_NAMES = ['Intro'].concat(S.map(function(s){ return s.scene; }));
function chapterFX(i){
  for (var k = 0; k <= NCH; k++) set.classList.toggle('at' + k, k === i);
  if (vfSc) vfSc.textContent = 'SC 0' + i;
  if (mobile || i === 0 || !slate) return;
  $('slate-t').innerHTML = 'Scene 0' + i + ' · <b>' + CH_NAMES[i] + '</b> · Take 1'; slate.style.setProperty('--c', S[i - 1].c);
  slate.classList.add('on'); clearTimeout(slateT); slateT = setTimeout(function(){ slate.classList.remove('on'); }, 1600);
}
var _setStation = setStation;
setStation = function(i){ var prev = cur, had = PANELS[i].classList.contains('on'); _setStation(i); if (i !== prev || !had) chapterFX(i); };

/* ---- hero glass cards drift with the pointer */
if (FINE && !reduce) stage.addEventListener('mousemove', function(e){ var r = stage.getBoundingClientRect(); stage.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3)); stage.style.setProperty('--my', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3)); }, { passive: true });

/* ---- cursor + magnetic buttons */
if (FINE && !reduce){
  ROOT.classList.add('has-cursor');
  var curEl = $('cur'), dot = $('cur-dot'), curL = $('cur-l'), cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy, magEl = null;
  addEventListener('mousemove', function(e){ cx = e.clientX; cy = e.clientY; curEl.classList.add('on'); dot.classList.add('on'); }, { passive: true });
  document.addEventListener('mouseleave', function(){ curEl.classList.remove('on'); dot.classList.remove('on'); });
  (function loop(){ rx += (cx - rx) * .2; ry += (cy - ry) * .2; curEl.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)'; dot.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)'; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', function(e){
    var lab = e.target.closest('[data-cursor]'), link = e.target.closest('a,button,summary,[role="tab"],label');
    curEl.classList.toggle('big', !!lab); curEl.classList.toggle('link', !lab && !!link); curL.textContent = lab ? lab.getAttribute('data-cursor') : '';
  });
  document.addEventListener('mousemove', function(e){
    var m = e.target.closest('.btn, .pb, .run, .menu-btn, .tab');
    if (magEl && magEl !== m){ magEl.style.transform = ''; magEl = null; }
    if (!m) return; magEl = m;
    var r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    m.style.transform = 'translate3d(' + (dx * .22).toFixed(1) + 'px,' + (dy * .32).toFixed(1) + 'px,0)';
  }, { passive: true });
  document.querySelectorAll('#gallery .w-item').forEach(function(w){ w.setAttribute('data-cursor', w.classList.contains('vid') ? 'Play' : 'View'); });
  document.querySelectorAll('#b-logos button').forEach(function(b){ b.setAttribute('data-cursor', 'Try'); });
  document.querySelectorAll('.tile').forEach(function(b){ b.setAttribute('data-cursor', 'Explore'); });
}

/* ---- tilt with glare on cards */
if (FINE && !reduce){
  document.querySelectorAll('.tile, .steps li, #gallery .w-item, .app').forEach(function(t){
    t.classList.add('tilt'); t.insertAdjacentHTML('beforeend', '<span class="glare" aria-hidden="true"></span>');
    var max = t.classList.contains('app') ? 3 : 6;
    t.addEventListener('mousemove', function(e){
      var r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      t.style.transition = 'transform .12s linear, border-color .35s';
      t.style.transform = 'perspective(1000px) rotateX(' + ((.5 - y) * max).toFixed(2) + 'deg) rotateY(' + ((x - .5) * max).toFixed(2) + 'deg) translateZ(0)';
      t.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); t.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    });
    t.addEventListener('mouseleave', function(){ t.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1), border-color .35s'; t.style.transform = ''; });
  });
}

/* ---- kinetic marquee: drifts on its own, speeds up and leans with scroll velocity */
(function(){
  var rows = [].slice.call(document.querySelectorAll('.k-row')); if (!rows.length) return;
  rows.forEach(function(r){ r.innerHTML += r.innerHTML + r.innerHTML; r._x = 0; });
  var lastY = scrollY, vel = 0, vis = false, last = performance.now();
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ vis = es[0].isIntersecting; }, {}).observe(rows[0].parentNode); else vis = true;
  (function loop(now){
    var dt = Math.min(.05, (now - last) / 1000); last = now;
    var dy = scrollY - lastY; lastY = scrollY; vel += (dy - vel) * .1;
    if (vis && !reduce) rows.forEach(function(r){
      var dir = +r.getAttribute('data-dir'), w = r.scrollWidth / 3;
      r._x += dir * (38 + Math.abs(vel) * 9) * dt; if (r._x <= -w) r._x += w; if (r._x > 0) r._x -= w;
      r.style.transform = 'translate3d(' + r._x.toFixed(1) + 'px,0,0) skewX(' + clamp(-vel * .25, -8, 8).toFixed(2) + 'deg)';
    });
    requestAnimationFrame(loop);
  })(last);
})();

/* ---- particle field: one cloud that morphs into a new form for each section after the set */
var fxApi = null;
function initFX(){
  if (fxApi || reduce || !window.THREE || !hasWebGL() || location.protocol === 'file:') return;
  var canvas = $('fx'), renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }); } catch (e){ return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); renderer.setClearColor(0x000000, 0);
  var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.set(0, 0, 15);
  var N = mobile ? 2600 : 6500, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), spd = new Float32Array(N), ph = new Float32Array(N);
  function rnd(a, b){ return a + Math.random() * (b - a); }
  for (var i = 0; i < N; i++){ spd[i] = rnd(.55, 1.45); ph[i] = Math.random() * 6.283; pos[i * 3] = rnd(-16, 16); pos[i * 3 + 1] = rnd(-9, 9); pos[i * 3 + 2] = rnd(-8, 4); }
  /* forms */
  function make(fn){ var a = new Float32Array(N * 3); for (var i = 0; i < N; i++){ var v = fn(i, i / N); a[i * 3] = v[0]; a[i * 3 + 1] = v[1]; a[i * 3 + 2] = v[2]; } return a; }
  var GA = Math.PI * (3 - Math.sqrt(5));
  var F = {
    stars: make(function(){ return [rnd(-16, 16), rnd(-9, 9), rnd(-10, 3)]; }),
    bento: make(function(i){ var c = i % 6, gx = (c % 3) - 1, gy = c < 3 ? .75 : -.75, w = c === 0 ? 2.6 : 1.9, h = 1.15, e = Math.random() < .55, x, y;
      if (e){ var t = Math.random() * 4; x = t < 1 ? (t - .5) * w : t < 2 ? w / 2 : t < 3 ? (2.5 - t) * w : -w / 2; y = t < 1 ? h / 2 : t < 2 ? (1.5 - t) * h : t < 3 ? -h / 2 : (t - 3.5) * h; } else { x = rnd(-w / 2, w / 2); y = rnd(-h / 2, h / 2); }
      return [gx * 3 + x * 1.1, gy * 1.75 + y * 1.25, rnd(-.12, .12) - gx * .6]; }),
    reel: make(function(i, u){ var a = u * 6.283 * 7, R = 3.3, r = .32;
      if (i % 5 === 0){ var sp = (i % 30) / 30 * 6.283, d = rnd(.5, R - .2); return [Math.cos(sp) * d, Math.sin(sp) * d, rnd(-.12, .12)]; }
      if (i % 7 === 0){ var hb = Math.random() * 6.283, hr = rnd(0, .7); return [Math.cos(hb) * hr, Math.sin(hb) * hr, rnd(-.2, .2)]; }
      var b = Math.random() * 6.283; return [(R + r * Math.cos(b)) * Math.cos(a), (R + r * Math.cos(b)) * Math.sin(a), r * Math.sin(b)]; }),
    globe: make(function(i){ var y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = GA * i, R = 3.5 + (Math.random() < .08 ? rnd(.3, 1.2) : 0); return [Math.cos(th) * rr * R, y * R, Math.sin(th) * rr * R]; }),
    helix: make(function(i, u){ var t = (u - .5) * 11, a = t * 1.25, s = i % 2 ? Math.PI : 0;
      if (i % 9 === 0){ var k = Math.random(); return [t, Math.cos(a) * 1.5 * (1 - 2 * k), Math.sin(a) * 1.5 * (1 - 2 * k)]; }
      return [t, Math.cos(a + s) * 1.5 + rnd(-.06, .06), Math.sin(a + s) * 1.5 + rnd(-.06, .06)]; }),
    wave: make(function(i){ var g = Math.ceil(Math.sqrt(N)), x = (i % g) / g - .5, z = Math.floor(i / g) / g - .5; return [x * 13, 0, z * 9]; }),
    knot: make(function(i, u){ var t = u * 6.283, p = 2, q = 3, r = Math.cos(q * t) + 2.2, j = rnd(-.14, .14); return [r * Math.cos(p * t) * 1.35 + j, r * Math.sin(p * t) * 1.35 + j, -Math.sin(q * t) * 1.35 + j]; }),
    word: null
  };
  function sampleWord(){
    var c = document.createElement('canvas'), W = 1200, H = 300; c.width = W; c.height = H; var x = c.getContext('2d');
    x.fillStyle = '#fff'; x.font = '800 230px Outfit, system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FASTRR', W / 2, H / 2 + 10);
    var d = x.getImageData(0, 0, W, H).data, pts = [];
    for (var yy = 0; yy < H; yy += 3) for (var xx = 0; xx < W; xx += 3) if (d[(yy * W + xx) * 4 + 3] > 128) pts.push([(xx / W - .5) * 13, -(yy / H - .5) * 3.25]);
    if (!pts.length) return;
    F.word = make(function(){ var q = pts[(Math.random() * pts.length) | 0]; return [q[0] + rnd(-.03, .03), q[1] + rnd(-.03, .03), rnd(-.25, .25)]; });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sampleWord); else sampleWord();
  var geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  var dotTex = (function(){ var c = document.createElement('canvas'); c.width = c.height = 64; var x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.35, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
  var mat = new THREE.PointsMaterial({ size: mobile ? .085 : .07, map: dotTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .9, sizeAttenuation: true });
  var cloud = new THREE.Points(geo, mat), group = new THREE.Group(); group.add(cloud); scene.add(group);
  function paint(){
    var cs = getComputedStyle(ROOT), a = new THREE.Color((cs.getPropertyValue('--accent') || '#7b5cf5').trim()), h = new THREE.Color((cs.getPropertyValue('--accent-hover') || '#a08bff').trim()), pk = new THREE.Color('#f0a0ff'), wt = new THREE.Color('#ffffff'), y = new THREE.Color('#ffe14d');
    for (var i = 0; i < N; i++){ var r = Math.random(), c = r < .42 ? a : r < .78 ? h : r < .9 ? pk : r < .97 ? wt : y, k = rnd(.55, 1); col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    geo.attributes.color.needsUpdate = true;
  }
  paint();
  /* section → form */
  var MAP = [['formats', 'bento', 'Bento', 2.6], ['work', 'reel', 'Film reel', 3.2], ['brand', 'globe', 'Your world', 3.4], ['process', 'helix', 'Pipeline', 0], ['agencies', 'wave', 'One library', 0], ['faq', 'knot', 'Every question', 3.2]];
  var form = 'stars', target = F.stars, gx = 0, tgx = 0, spin = 0, on = false, mx = 0, my = 0, tmx = 0, tmy = 0, last = performance.now(), raf = 0;
  var label = $('fx-label'), fxN = $('fx-n'), fxT = $('fx-t'), wordStage = $('word-stage'), gyv = 0, gsc = 1;
  function pick(){
    var vh = innerHeight, sr = set.getBoundingClientRect(), f = 'stars', name = 'Starfield', n = 1, ox = 0;
    MAP.forEach(function(m, k){ var e = $(m[0]); if (e && e.getBoundingClientRect().top < vh * .55){ f = m[1]; name = m[2]; n = k + 2; ox = m[3]; } });
    var fin = document.querySelector('.final'); if (fin && fin.getBoundingClientRect().top < vh * .6 && F.word){ f = 'word'; name = 'Fastrr'; n = 8; ox = 0; }
    var show = sr.bottom < vh * .65;
    if (show !== on){ on = show; canvas.classList.toggle('on', on); label.classList.toggle('on', on && !mobile); if (on) wake(); }
    if (f !== form){ form = f; target = F[f]; spin += .9; fxN.textContent = ('0' + n).slice(-2); fxT.textContent = name; }
    tgx = innerWidth >= 1000 ? ox : 0;
  }
  addEventListener('scroll', pick, { passive: true });
  if (FINE) addEventListener('mousemove', function(e){ tmx = e.clientX / innerWidth * 2 - 1; tmy = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  function size(){ var w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.position.z = w / h < 1 ? 20 : 15; cam.updateProjectionMatrix(); }
  addEventListener('resize', size); size();
  function wake(){ if (!raf && on && !document.hidden){ last = performance.now(); raf = requestAnimationFrame(frame); } }
  document.addEventListener('visibilitychange', wake);
  function frame(now){
    raf = 0; if (!on || document.hidden) return;
    var dt = Math.min(.05, (now - last) / 1000), t = now / 1000; last = now;
    var k = 1 - Math.exp(-2.6 * dt), wave = form === 'wave';
    for (var i = 0; i < N; i++){
      var j = i * 3, kk = Math.min(1, k * spd[i]), tx = target[j], ty = target[j + 1], tz = target[j + 2];
      if (wave) ty = Math.sin(tx * .7 + t * 1.2) * .55 + Math.cos(tz * .9 + t) * .45 - .6;
      var w = Math.sin(t * .9 + ph[i]) * .035;
      pos[j] += (tx - pos[j]) * kk; pos[j + 1] += (ty + w - pos[j + 1]) * kk; pos[j + 2] += (tz - pos[j + 2]) * kk;
    }
    geo.attributes.position.needsUpdate = true;
    var km = 1 - Math.exp(-3 * dt); mx += (tmx - mx) * km; my += (tmy - my) * km; gx += (tgx - gx) * km; spin *= Math.exp(-1.4 * dt);
    /* the wordmark docks onto its stage in the finale and scrolls with the page */
    var tgy = 0, tsc = 1, tsz = mobile ? .085 : .07;
    if (form === 'word' && wordStage){ var wr = wordStage.getBoundingClientRect(), vhW = 2 * cam.position.z * Math.tan(Math.PI / 8); tgy = -((wr.top + wr.height / 2) - innerHeight / 2) * vhW / innerHeight; tsc = Math.min(1.08, vhW * cam.aspect * .84 / 13); tsz *= 1.25; }
    var ky = 1 - Math.exp(-9 * dt); gyv += (tgy - gyv) * ky; gsc += (tsc - gsc) * km; mat.size += (tsz - mat.size) * km;
    group.position.x = gx; group.position.y = gyv; group.scale.setScalar(gsc);
    group.rotation.y = (form === 'word' || form === 'bento' ? Math.sin(t * .25) * .18 : t * .08) + spin + mx * .35;
    group.rotation.x = (wave ? .55 : form === 'helix' ? .25 : .1) + my * .2 + (form === 'helix' ? Math.sin(t * .3) * .1 : 0);
    if (form === 'helix') group.rotation.z = Math.sin(t * .2) * .08; else group.rotation.z *= .95;
    renderer.render(scene, cam);
    raf = requestAnimationFrame(frame);
  }
  pick();
  fxApi = { paint: paint, get form(){ return form; } };
  window.__fx = fxApi;
}
if (window.THREE) initFX(); else { var fxsc = document.querySelector('script[src*="three.min.js"]'); if (fxsc) fxsc.addEventListener('load', initFX); }

/* ---- floating lights for depth in the finale and footer */
document.querySelectorAll('.motes').forEach(function(m){
  var n = reduce ? 0 : mobile ? 9 : 18, h = '';
  for (var i = 0; i < n; i++){ var sz = 2 + Math.random() * 7; h += '<i style="--x:' + (Math.random() * 100).toFixed(1) + '%;--y:' + (Math.random() * 100).toFixed(1) + '%;--s:' + sz.toFixed(1) + 'px;--o:' + (.14 + Math.random() * .32).toFixed(2) + ';--t:' + (9 + Math.random() * 12).toFixed(1) + 's;--d:-' + (Math.random() * 12).toFixed(1) + 's;--dx:' + ((Math.random() - .5) * 90).toFixed(0) + 'px;--dy:' + (-20 - Math.random() * 60).toFixed(0) + 'px"></i>'; }
  m.innerHTML = h;
});
/* ---- language tile: the script rotates through the languages */
(function(){
  var rot = $('lang-rot'); if (!rot || reduce) return;
  var w = [].slice.call(rot.children), k = 0, vis = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ vis = es[0].isIntersecting; }).observe(rot); else vis = true;
  setInterval(function(){ if (!vis) return; var a = w[k]; k = (k + 1) % w.length; var b = w[k]; a.classList.remove('on'); a.classList.add('out'); setTimeout(function(){ a.classList.remove('out'); }, 900); b.classList.add('on'); }, 1900);
})();

/* ============================================================ EDIT SUITE */
(function(){
  var ed = $('ed'), wrap = $('ed-wrap'); if (!ed) return;
  var acts = [].slice.call(document.querySelectorAll('#acts li')), PH = 3400, ph = 0, t0 = 0, vis = false, timer = 0;
  var MSG = ['Can we try it square?', 'Love that glow.', 'Add our brand track?', 'Perfect. Ship it.'];
  /* cursor targets per phase, as % of the editor box: [you, fastrr] */
  var CP = [[[58, 26], [79, 63]], [[46, 34], [86, 21]], [[30, 70], [57, 78]], [[38, 63], [84, 86]]];
  var you = ed.querySelector('.c-you'), ai = ed.querySelector('.c-ai'), msg = $('ed-msg');
  var wv = $('ed-wave'), hs = [30, 55, 80, 45, 90, 65, 40, 70, 95, 50, 35, 75, 100, 60, 45, 85, 55, 90, 40, 70, 95, 50, 65, 30, 80, 55, 90, 45, 70, 60, 35, 85, 50, 75, 40, 65];
  wv.innerHTML = hs.map(function(h){ return '<i style="--h:' + h + '"></i>'; }).join('');
  function place(){ var w = ed.clientWidth, h = ed.clientHeight, c = CP[ph].map(function(q){ return [Math.min(q[0], mobile ? 64 : 84), q[1]]; }); you.style.transform = 'translate3d(' + (c[0][0] / 100 * w) + 'px,' + (c[0][1] / 100 * h) + 'px,140px)'; ai.style.transform = 'translate3d(' + (c[1][0] / 100 * w) + 'px,' + (c[1][1] / 100 * h) + 'px,140px)'; }
  function set(i){
    ph = i; ed.className = 'ed ph' + i;
    acts.forEach(function(li, k){ li.classList.toggle('on', k === i); var a = li.querySelector('.ap i'); a.style.animation = 'none'; void a.offsetWidth; a.style.animation = ''; });
    msg.style.opacity = 0; setTimeout(function(){ msg.textContent = MSG[i]; msg.style.opacity = 1; }, 250);
    place(); t0 = performance.now();
  }
  ed.style.setProperty('--phd', PH + 'ms'); document.getElementById('acts').style.setProperty('--phd', PH + 'ms');
  function loop(){ clearTimeout(timer); if (!vis || reduce) return; timer = setTimeout(function(){ set((ph + 1) % 4); loop(); }, PH); }
  document.getElementById('acts').addEventListener('click', function(ev){ var b = ev.target.closest('button'); if (!b) return; set(+b.getAttribute('data-ph')); loop(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ vis = es[0].isIntersecting; if (vis){ set(ph); loop(); raf(); } else clearTimeout(timer); }, { threshold: .25 }).observe(wrap);
  addEventListener('resize', place);
  /* playhead, timecode and scroll depth */
  var phEl = $('ed-ph'), tc = $('ed-tc'), tl = ed.querySelector('.ed-tl'), running = false, tx = 0, ty = 0;
  if (FINE && !reduce) wrap.addEventListener('mousemove', function(e){ var r = wrap.getBoundingClientRect(); ty = ((e.clientX - r.left) / r.width - .5) * 10; tx = -((e.clientY - r.top) / r.height - .5) * 8; }, { passive: true });
  wrap.addEventListener('mouseleave', function(){ tx = ty = 0; });
  function raf(){ if (running) return; running = true; requestAnimationFrame(function step(now){
    if (!vis){ running = false; return; }
    var u = ((now - t0) / PH) % 1, track = tl.clientWidth - 28 - (mobile ? 96 : 128), x = ph === 3 ? u * track : (ph * .25 + u * .25) * track * .5;
    phEl.style.setProperty('--px', x.toFixed(1) + 'px');
    var secs = ph === 3 ? u * 40 : (ph * .25 + u * .25) * 20; tc.textContent = '00:' + ('0' + Math.floor(secs)).slice(-2) + ':' + ('0' + Math.floor((secs % 1) * 24)).slice(-2);
    var r = wrap.getBoundingClientRect(), c = clamp(1 - (r.top + r.height / 2) / innerHeight, 0, 1), k = 1 - Math.abs(c - .5) * 2;   /* 0 off-centre → 1 centred */
    ed.style.setProperty('--tx', (reduce ? 0 : (1 - k) * 16 + tx).toFixed(2)); ed.style.setProperty('--ty', (reduce ? 0 : ty).toFixed(2)); ed.style.setProperty('--zs', (reduce ? 1 : 1 + (1 - k) * 1.2).toFixed(3));
    requestAnimationFrame(step);
  }); }
  set(0);
})();

/* ============================================================ PILE (Matter.js) */
(function(){
  var box = $('pile-box'); if (!box) return;
  var els = [].slice.call(box.querySelectorAll('.pi')).filter(function(e){ return e.offsetParent !== null || getComputedStyle(e).display !== 'none'; }), started = false, vis = false;
  function staticLayout(){
    box.classList.add('static'); var W = box.clientWidth, H = box.clientHeight;
    els.forEach(function(e, i){ var w = e.offsetWidth, h = e.offsetHeight, x = ((i * 0.618) % 1) * (W - w), y = H - h - ((i * 37) % Math.max(40, H * .55)); e.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + (((i * 47) % 40) - 20) + 'deg)'; });
  }
  function start(){
    if (started) return; started = true;
    if (reduce || !window.Matter){ staticLayout(); return; }
    var M = Matter, E = M.Engine.create({ gravity: { y: 1.1 } }), W = box.clientWidth, H = box.clientHeight, walls = [];
    function buildWalls(){ walls.forEach(function(w){ M.Composite.remove(E.world, w); }); W = box.clientWidth; H = box.clientHeight; var t = 200;
      walls = [M.Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true }), M.Bodies.rectangle(-t / 2, H / 2 - 600, t, H * 3, { isStatic: true }), M.Bodies.rectangle(W + t / 2, H / 2 - 600, t, H * 3, { isStatic: true })];
      M.Composite.add(E.world, walls); }
    buildWalls();
    var bodies = els.map(function(e, i){
      var w = e.offsetWidth, h = e.offsetHeight, round = e.classList.contains('k-dot');
      var b = round ? M.Bodies.circle(0, 0, w / 2, { restitution: .45, friction: .3, frictionAir: .012 }) : M.Bodies.rectangle(0, 0, w, h, { chamfer: { radius: Math.min(18, h / 2 - 1) }, restitution: .25, friction: .4, frictionAir: .015 });
      M.Body.setPosition(b, { x: w / 2 + Math.random() * Math.max(1, W - w), y: -h - i * 110 - Math.random() * 80 });
      M.Body.setAngle(b, (Math.random() - .5) * 1.2); b.el = e; b.hw = w / 2; b.hh = h / 2;
      return b;
    });
    M.Composite.add(E.world, bodies);
    if (FINE){
      var mouse = M.Mouse.create(box);
      mouse.element.removeEventListener('wheel', mouse.mousewheel); mouse.element.removeEventListener('mousewheel', mouse.mousewheel); mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
      var mc = M.MouseConstraint.create(E, { mouse: mouse, constraint: { stiffness: .18, damping: .1, render: { visible: false } } });
      M.Composite.add(E.world, mc);
    } else {
      /* touch: tap a card to toss it, page scrolling stays free */
      box.addEventListener('click', function(ev){ var el = ev.target.closest('.pi'); if (!el) return; var b = bodies.filter(function(x){ return x.el === el; })[0]; if (b) M.Body.setVelocity(b, { x: (Math.random() - .5) * 14, y: -18 }); });
    }
    $('pile-shake').addEventListener('click', function(){ bodies.forEach(function(b){ M.Body.setVelocity(b, { x: (Math.random() - .5) * 18, y: -12 - Math.random() * 14 }); M.Body.setAngularVelocity(b, (Math.random() - .5) * .3); }); });
    addEventListener('resize', function(){ buildWalls(); bodies.forEach(function(b){ if (b.position.x > W) M.Body.setPosition(b, { x: W - b.hw, y: b.position.y }); }); });
    box.classList.add('live');
    var last = performance.now(), running = false;
    function loop(now){
      if (!vis){ running = false; return; }
      var dt = Math.min(32, now - last); last = now; M.Engine.update(E, dt);
      bodies.forEach(function(b){ var m = Math.min(b.hw, b.hh) * .8; if (b.position.x < m || b.position.x > W - m) M.Body.setPosition(b, { x: clamp(b.position.x, m, W - m), y: b.position.y }); });
      bodies.forEach(function(b){ b.el.style.transform = 'translate3d(' + (b.position.x - b.hw).toFixed(1) + 'px,' + (b.position.y - b.hh).toFixed(1) + 'px,0) rotate(' + b.angle.toFixed(3) + 'rad)'; });
      requestAnimationFrame(loop);
    }
    function go(){ if (!running && vis){ running = true; last = performance.now(); requestAnimationFrame(loop); } }
    box._go = go; go();
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ vis = es[0].isIntersecting; if (vis){ if (window.Matter || reduce) start(); else addEventListener('load', start); if (box._go) box._go(); } }, { threshold: .2 }).observe(box);
  else staticLayout();
  if (FINE) els.forEach(function(e){ e.setAttribute('data-cursor', 'Drag'); });
})();

/* ---- how it works: the line fills as you scroll and each frame lights up */
(function(){
  var rc = $('recap'); if (!rc) return; var fill = $('rc-fill'), lis = [].slice.call(rc.querySelectorAll('.rc-frames li'));
  function upd(){ var r = rc.getBoundingClientRect(), p = clamp((innerHeight * .78 - r.top) / (r.height + innerHeight * .2), 0, 1); if (reduce) p = 1; fill.style.setProperty('--p', p.toFixed(3)); lis.forEach(function(li, k){ li.classList.toggle('lit', p >= k / lis.length + .04); }); }
  addEventListener('scroll', function(){ requestAnimationFrame(upd); }, { passive: true }); upd();
})();

/* ---- tile and canvas videos: load and play only while on screen */
(function(){
  var vs = [].slice.call(document.querySelectorAll('video[data-auto]')); if (!vs.length) return;
  if (reduce || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ var v = e.target; if (e.isIntersecting){ if (!v.getAttribute('src')) v.src = v.getAttribute('data-src'); v.play().catch(function(){}); } else if (!v.paused) v.pause(); }); }, { threshold: .25 });
  vs.forEach(function(v){ io.observe(v); });
})();

/* ============================================================ BREAKPOINT: crossing 700px swaps phone and desktop modes live */
MQ.addEventListener && MQ.addEventListener('change', function(){
  mobile = MQ.matches;
  PANELS.forEach(function(c, k){ c.classList.toggle('on', k === cur); });
  svgView(); svgPan(PHYS[cur]);
  if (mobile) S.forEach(function(_, i){ playStation(i); }); else initGL();
  glSize(); onScroll();
});
onScroll();
})();
