/* Showcase data (T, VIDEOS_READY) comes from assets/js/data.js */
/* TODO: production constants */
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
function lead(kind, o){ if (window.FS) window.FS.open(kind, o || {}); }

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
var brandKey = 'beauty';
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
    + '<dl class="ch-io"><div><dt>You</dt><dd>' + s.you + '</dd></div><div><dt>You get</dt><dd>' + s.get + '</dd></div></dl><div class="ch-hand" id="hand-' + i + '"></div></div>'
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
    + '<div class="sd-foot"><span><b>' + r.deliver.length + ' files</b> ready in your library</span><a class="btn sm" href="#contact-us" data-cta="project" data-src="tour-delivery">Start yours ' + ARROW_S + '</a></div></div>';
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
  var hd = $('hand-' + i); if (hd) hd.innerHTML = handoff(i, RUNS[brandKey]);
  setTimeout(syncVideos, 60);
}

/* ============================================================ RUNS (whose real campaign the tour replays) */
function runChip(k){ var r = RUNS[k]; return '<button type="button" class="run" data-run="' + k + '" aria-pressed="' + (k === brandKey) + '" aria-label="Follow the ' + r.name + ' campaign"><img src="' + r.frames[0] + '" alt=""><span>' + r.short + '</span></button>'; }
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
  note.textContent = '';
  lead('project', { website: v, src: 'hero-link' });
});
/* the mic dictates into the link field where the browser supports speech input, and hides itself where it doesn't */
(function(){
  var mic = $('composer').querySelector('.mic'), SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  mic.innerHTML = MIC;
  if (!SR){ mic.hidden = true; return; }
  var rec = null;
  mic.addEventListener('click', function(){
    if (rec){ rec.stop(); return; }
    rec = new SR(); rec.lang = 'en-IN'; rec.interimResults = true; rec.maxAlternatives = 1;
    mic.classList.add('on'); mic.setAttribute('aria-pressed', 'true'); note.textContent = 'Listening. Say your website or product name.';
    rec.onresult = function(e){ var t = ''; for (var i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; $('link').value = t.replace(/\s+dot\s+/gi, '.').replace(/\s+(?=\.)/g, '').trim(); };
    rec.onerror = function(e){ note.textContent = e.error === 'not-allowed' ? 'Allow the microphone to speak your link, or just type it.' : 'Didn’t catch that. Try again or type it.'; };
    rec.onend = function(){ rec = null; mic.classList.remove('on'); mic.setAttribute('aria-pressed', 'false'); if ($('link').value && /^Listening/.test(note.textContent)) note.textContent = 'Got it. Press Make my ad when it looks right.'; };
    rec.start();
  });
})();

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
  var dpr = Math.min(devicePixelRatio || 1, 2), DPR_MIN = Math.min(dpr, 1.5);
  renderer.setPixelRatio(dpr);
  var scene = new THREE.Scene(); scene.background = new THREE.Color(0x050506); scene.fog = new THREE.Fog(0x050506, 14, 34);
  var cam = new THREE.PerspectiveCamera(38, 1, .1, 120);
  /* Frame each composition in the open area beside (desktop) or above (tablet) the panel, not behind it */
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
      var L = tx.right, Rr = cs.left > tx.right + 40 ? cs.left : w;
      if (cs.left <= tx.right + 40) L = Math.max(tx.right, cs.right);
      ox = Math.round(w / 2 - ((L - ar.left) + (Rr - ar.left)) / 2);
      var hr = $('panel-hero').getBoundingClientRect(); OXH = Math.round(w / 2 - ((hr.right - ar.left) + w) / 2);
    }
    else { var ph = Math.min(innerHeight * .5, 520) + 104, top = 72; oy = Math.round(h / 2 - (top + h - ph) / 2); }
    ZK = w / h < 1.25 ? clamp(1.35 / (w / h), 1, 1.75) : 1;
    VW = w; VH = h; OXS = ox; OYS = oy; lastK = -1; applyView(typeof camC === 'number' ? camC : 0);
  }
  glSize = function(){ size(); wakeGL(); };
  size(); addEventListener('resize', glSize);

  /* ------------------------------------------------------------ helpers */
  var ANISO = Math.min(16, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 8), GAP = 10, loader = new THREE.TextureLoader(), texCache = {}, alphaCache = {};
  function texP(p, ar){
    var t = texCache[p];
    if (!t){ t = texCache[p] = loader.load(p, function(){ wakeGL(); t.dispatchEvent({ type: 'ready' }); }); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = ANISO; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; }
    return t;
  }
  function cover(map, w, h){
    /* show the image like CSS object-fit: cover, on a clone so one texture can fill different shapes */
    var t = map.clone(); t.needsUpdate = true;
    function fit(){ var img = t.image; if (!img || !img.width) return; var ia = (img.videoWidth || img.width) / (img.videoHeight || img.height), ca = w / h;
      if (ia > ca){ t.repeat.set(ca / ia, 1); t.offset.set((1 - ca / ia) / 2, 0); } else { t.repeat.set(1, ia / ca); t.offset.set(0, (1 - ia / ca) / 2); } t.needsUpdate = true; }
    if (map.image && (map.image.width || map.image.videoWidth)) fit(); else { map.addEventListener('ready', function(){ t.image = map.image; fit(); }); }
    return t;
  }
  function rounded(w, h, r){
    var k = w.toFixed(2) + 'x' + h.toFixed(2) + ':' + r; if (alphaCache[k]) return alphaCache[k];
    var c = document.createElement('canvas'), s = 512 / Math.max(w, h); c.width = Math.round(w * s); c.height = Math.round(h * s);
    var x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height); x.fillStyle = '#fff'; x.beginPath(); x.roundRect(1, 1, c.width - 2, c.height - 2, r * s); x.fill();
    return (alphaCache[k] = new THREE.CanvasTexture(c));
  }
  var shadowTex = (function(){ var c = document.createElement('canvas'); c.width = c.height = 128; var x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 4, 64, 64, 64); g.addColorStop(0, 'rgba(0,0,0,.75)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
  var glowTex = (function(){ var c = document.createElement('canvas'); c.width = c.height = 128; var x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.35, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
  /* a framed card: image (cover), rounded corners, a fine border that can glow, a soft shadow on the floor */
  function card(src, w, h, o){
    o = o || {}; var g = new THREE.Group(), r = o.r == null ? .08 : o.r;
    var map = src && src.isTexture ? src : src ? texP(src) : null;
    var mat = new THREE.MeshBasicMaterial({ map: map ? cover(map, w, h) : null, color: map ? 0xffffff : (o.color || 0x111114), alphaMap: rounded(w, h, r), transparent: true, depthWrite: true });
    var face = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); g.add(face);
    var bw = o.bw == null ? .025 : o.bw;
    var bmat = new THREE.MeshBasicMaterial({ color: o.border || 0x2a2a32, alphaMap: rounded(w + bw * 2, h + bw * 2, r + bw), transparent: true });
    var border = new THREE.Mesh(new THREE.PlaneGeometry(w + bw * 2, h + bw * 2), bmat); border.position.z = -.004; g.add(border);
    g.userData = { face: face, border: border, w: w, h: h };
    return g;
  }
  function textTex(text, o){ o = o || {}; var w = o.w || 512, h = o.h || 128, c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d');
    var font = (o.weight || 600) + ' ' + (o.size || 56) + 'px ' + (o.font || 'Figtree, system-ui, sans-serif');
    function ink(){ if (o.bg){ x.clearRect(0, 0, w, h); x.fillStyle = o.bg; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, o.r || 28); x.fill(); if (o.border){ x.lineWidth = 5; x.strokeStyle = o.border; x.stroke(); } } else x.clearRect(0, 0, w, h);
      x.fillStyle = o.color || '#f4f4f5'; x.font = font; x.textAlign = o.align || 'center'; x.textBaseline = 'middle'; x.fillText(text, o.align === 'left' ? 36 : w / 2, h / 2 + 2); }
    ink(); var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    if (document.fonts && document.fonts.load) document.fonts.load(font).then(function(){ ink(); t.needsUpdate = true; });
    return t; }
  function pill(text, w, h, o){ var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: textTex(text, Object.assign({ w: Math.min(1024, Math.round(128 * w / h)), h: 128, r: 60, size: 54 }, o)), transparent: true, depthWrite: false })); return m; }
  function floorShadow(w, d, x, z){ var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(x || 0, .01, z || 0); return m; }
  function glowSprite(col, s){ var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: col, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 })); sp.scale.set(s, s, 1); return sp; }
  function vidTex(src){ var v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto'; v.crossOrigin = 'anonymous'; if (src) v.src = src; var t = new THREE.VideoTexture(v); t.colorSpace = THREE.SRGBColorSpace; t.userData.video = v; return t; }
  function fade(g, o){ g.traverse(function(m){ if (m.material){ if (m.material.userData.base == null) m.material.userData.base = m.material.opacity; m.material.opacity = m.material.userData.base * o; m.visible = o > .01; } }); }

  /* ------------------------------------------------------------ the space: dark floor with a fine grid, a glow behind each stage */
  var floorC = document.createElement('canvas'); floorC.width = floorC.height = 512; (function(){ var x = floorC.getContext('2d'); x.fillStyle = '#0a0a0c'; x.fillRect(0, 0, 512, 512); x.strokeStyle = 'rgba(255,255,255,.05)'; x.lineWidth = 2; for (var i = 0; i <= 512; i += 64){ x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 512); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(512, i); x.stroke(); } })();
  var floorT = new THREE.CanvasTexture(floorC); floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping; floorT.repeat.set(60, 10); floorT.anisotropy = 8;
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(240, 40), new THREE.MeshBasicMaterial({ map: floorT })); floor.rotation.x = -Math.PI / 2; floor.position.set(40, 0, -6); scene.add(floor);
  var X = [-GAP * 1.4, 0, GAP, GAP * 2, GAP * 3, GAP * 4, GAP * 5];
  var COLS = [0x8b6bff].concat(S.map(function(s){ return new THREE.Color(s.c).getHex(); }));
  var glows = X.map(function(x, i){ var g = glowSprite(COLS[i], 11); g.position.set(x, 2.2, -3.2); scene.add(g); return g; });
  var groups = X.map(function(x){ var g = new THREE.Group(); g.position.x = x; scene.add(g); return g; });
  var anim = [];     /* per-stage animation callbacks: fn(n, t, dt) */
  var videos = [], introVids = [];

  /* ------------------------------------------------------------ 0 · intro: a showreel arc of real work */
  (function(){
    var g = groups[0], items = [0, 6, 1, 7, 3, 9, 2, 8, 4], cards = [];
    /* every card is a live loop (8s, 540p cuts in assets/creatives/journey/intro/); the still shows until its video is playing */
    items.forEach(function(ti, k){
      var isReel = ti < 10, h = isReel ? 2.1 : 1.6, w = isReel ? h * 9 / 16 : (ti >= 16 ? 1.6 : 1.28);
      var c = card(T[ti].data, w, h, { r: .1, border: k === 2 ? 0x8b6bff : 0x26262c, bw: k === 2 ? .035 : .02 });
      if (T[ti].video){
        var vt = vidTex('assets/creatives/journey/intro/' + T[ti].video.split('/').pop()), ve = vt.userData.video;
        ve.addEventListener('playing', function once(){ ve.removeEventListener('playing', once); var m = c.userData.face.material; m.map = cover(vt, w, h); m.needsUpdate = true; wakeGL(); });
        introVids.push(ve);
      }
      var a = (k - (items.length - 1) / 2) * .24, R = 6.8;
      c.userData.base = new THREE.Vector3(Math.sin(a) * R + 2.6, 2.2 + (k % 2 ? -.18 : .22), -Math.cos(a) * R + 4.2);
      c.rotation.y = -a; c.position.copy(c.userData.base); c.userData.k = k; g.add(c); cards.push(c);
    });
    g.add(floorShadow(12, 4, 0, -1.6));
    anim[0] = function(n, t){ cards.forEach(function(c){ var k = c.userData.k; c.position.y = c.userData.base.y + Math.sin(t * .6 + k) * .08; c.rotation.z = Math.sin(t * .4 + k * .7) * .015; }); };
  })();

  /* ------------------------------------------------------------ stages 1-6 are rebuilt for whichever campaign is selected */
  var renderVid = vidTex(null), editVid = renderVid; videos.push(renderVid);
  function clear(g){ while (g.children.length) g.remove(g.children[0]); }
  function build(r){
    for (var i = 1; i <= 6; i++){ clear(groups[i]); anim[i] = null; }
    var ACC = COLS;

    /* 1 · brief: the product page, with what we pull from it lifting out toward you */
    (function(){
      var g = groups[1], acc = ACC[1];
      var pc = document.createElement('canvas'); pc.width = 1024; pc.height = 680; var x = pc.getContext('2d');
      x.fillStyle = '#f6f3ee'; x.fillRect(0, 0, 1024, 680); x.fillStyle = '#e7e2d9'; x.fillRect(0, 0, 1024, 64);
      ['#ff5f57', '#febc2e', '#28c840'].forEach(function(cl, k){ x.fillStyle = cl; x.beginPath(); x.arc(34 + k * 26, 32, 8, 0, 7); x.fill(); });
      x.fillStyle = '#fff'; x.beginPath(); x.roundRect(130, 14, 760, 36, 18); x.fill(); x.fillStyle = '#5b554c'; x.font = '500 22px ui-monospace, Menlo, monospace'; x.fillText(r.url, 150, 40);
      x.fillStyle = '#16121f'; x.font = '800 44px Outfit, system-ui, sans-serif'; var words = r.product.split(' '), line = '', y = 170; words.forEach(function(wd){ if (x.measureText(line + wd).width > 420){ x.fillText(line, 560, y); line = ''; y += 54; } line += wd + ' '; }); x.fillText(line, 560, y);
      x.fillStyle = '#6b6457'; x.font = '500 26px Figtree, system-ui, sans-serif'; x.fillText('Your brand', 560, y + 50);
      x.fillStyle = acc ? '#' + new THREE.Color(acc).getHexString() : '#8b6bff'; x.beginPath(); x.roundRect(560, y + 92, 220, 56, 28); x.fill(); x.fillStyle = '#fff'; x.font = '700 24px Figtree, system-ui, sans-serif'; x.fillText('Add to cart', 600, y + 128);
      for (var l = 0; l < 3; l++){ x.fillStyle = '#e4dfd3'; x.fillRect(560, y + 190 + l * 30, 380 - l * 90, 12); }
      var pt = new THREE.CanvasTexture(pc); pt.colorSpace = THREE.SRGBColorSpace; pt.anisotropy = 8;
      var page = card(pt, 3.3, 2.19, { r: .08, border: 0x3a3a44, bw: .02 }); page.position.set(-.55, 1.95, -.4); page.rotation.y = .16; g.add(page);
      var hero = card(r.hero, 1.22, 1.6, { r: .04, bw: 0 }); hero.position.set(-1.65, -.06, .01); page.add(hero);
      var scan = new THREE.Mesh(new THREE.PlaneGeometry(3.3, .5), new THREE.MeshBasicMaterial({ map: glowTex, color: acc, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .0 })); scan.position.z = .02; page.add(scan);
      g.add(floorShadow(5, 2, -.4, -.2));
      /* pulled items: logo, three shots, palette, then the brief fields */
      var pulled = [], tx = 1.7;
      var logo = card(r.logo, .62, .62, { r: .12, color: 0xffffff, border: 0xffffff }); logo.userData.face.material.color.set(0xffffff); pulled.push([logo, new THREE.Vector3(tx - .55, 3.15, .9)]);
      r.frames.slice(0, 3).forEach(function(f, k){ pulled.push([card(f, .5, .78, { r: .08, border: 0x3a3a44 }), new THREE.Vector3(tx + .2 + k * .58, 3.05, .9 - k * .04)]); });
      var pal = new THREE.Group(); r.palette.forEach(function(cl, k){ var sw = card(null, .3, .3, { r: .07, color: new THREE.Color(cl).getHex(), border: 0x3a3a44, bw: .015 }); sw.userData.face.material.color.set(cl); sw.position.x = k * .36; pal.add(sw); }); pulled.push([pal, new THREE.Vector3(tx - .6, 2.38, 1.0)]);
      [['Product', r.product], ['Message', r.msg], ['Offer', r.offer], ['Audience', r.aud]].forEach(function(f, k){
        var cv = document.createElement('canvas'); cv.width = 900; cv.height = 128; var c2 = cv.getContext('2d'); c2.fillStyle = 'rgba(14,14,18,.94)'; c2.beginPath(); c2.roundRect(3, 3, 894, 122, 30); c2.fill(); c2.strokeStyle = '#' + new THREE.Color(acc).getHexString(); c2.lineWidth = 4; c2.stroke();
        c2.fillStyle = '#8b8b95'; c2.font = '700 26px ui-monospace, Menlo, monospace'; c2.fillText(f[0].toUpperCase(), 36, 72); c2.fillStyle = '#f4f4f5'; c2.font = '600 34px Figtree, system-ui, sans-serif'; var tt = f[1]; while (c2.measureText(tt).width > 600 && tt.length > 6) tt = tt.slice(0, -2); c2.fillText(tt === f[1] ? tt : tt + '…', 236, 74);
        var t2 = new THREE.CanvasTexture(cv); t2.colorSpace = THREE.SRGBColorSpace; t2.anisotropy = 8;
        var m = new THREE.Mesh(new THREE.PlaneGeometry(2.25, .32), new THREE.MeshBasicMaterial({ map: t2, transparent: true, depthWrite: false })); var w2 = new THREE.Group(); w2.add(m);
        pulled.push([w2, new THREE.Vector3(tx + .55, 1.85 - k * .42, 1.05)]);
      });
      pulled.forEach(function(p, k){ p[0].userData.k = k; p[0].position.set(-.3, 1.9, -.3); g.add(p[0]); });
      anim[1] = function(n, t){
        scan.position.y = 1.1 - ((t * .45) % 1) * 2.2; scan.material.opacity = .55 * n;
        pulled.forEach(function(p){ var k = p[0].userData.k, a = easeOut(clamp((n - .35 - k * .045) / .4, 0, 1)); p[0].position.lerpVectors(new THREE.Vector3(-.5, 1.9, -.3), p[1], a); p[0].position.y += Math.sin(t * 1.1 + k) * .025 * a; p[0].rotation.y = -.12 * a; fade(p[0], a); });
      };
    })();

    /* 2 · script: the film as a storyboard; the active shot lights up, one line gets caught */
    (function(){
      var g = groups[2], acc = ACC[2], cards = [];
      r.script.forEach(function(l, k){
        var c = card(r.frames[k], 1.02, 1.81, { r: .08, border: 0x2e2e36, bw: .025 }), a = (k - 1.5) * .3;
        c.position.set(Math.sin(a) * 4.4, 2.15, -Math.cos(a) * 4.4 + 4.1); c.rotation.y = -a;
        var tc = pill(l[0] + '  ·  ' + l[2].toUpperCase(), 1.1, .2, { bg: 'rgba(14,14,18,.92)', color: '#f4f4f5', size: 50, font: 'ui-monospace, Menlo, monospace', weight: 700 }); tc.position.set(0, -1.12, .01); c.add(tc);
        var lt = pill(l[1].length > 34 ? l[1].slice(0, 33) + '…' : l[1], 1.5, .19, { color: '#a7a7b0', size: 44, w: 1024, h: 128 }); lt.position.set(0, -1.36, .01); c.add(lt);
        g.add(c); cards.push(c);
      });
      var wi = r.warn.i, flag = pill('Not in the footage · rewritten', 1.7, .24, { bg: '#f7b955', color: '#1a1405', size: 50, weight: 700 }); g.add(flag);
      flag.position.copy(cards[wi].position).add(new THREE.Vector3(0, 1.18, .1)); flag.rotation.y = cards[wi].rotation.y;
      var bar = new THREE.Mesh(new THREE.PlaneGeometry(4.9, .03), new THREE.MeshBasicMaterial({ color: 0x2a2a32 })); bar.position.set(0, .62, 1.1); g.add(bar);
      var fill = new THREE.Mesh(new THREE.PlaneGeometry(4.9, .035), new THREE.MeshBasicMaterial({ color: acc })); fill.position.set(0, .62, 1.11); g.add(fill);
      g.add(floorShadow(7, 2.2, 0, .4));
      anim[2] = function(n, t){
        var p = (t * .22) % 1, ai = Math.floor(p * 4);
        fill.scale.x = Math.max(.001, p); fill.position.x = -2.45 + 2.45 * p;
        cards.forEach(function(c, k){ var on = k === ai; c.userData.border.material.color.setHex(on ? (k === wi ? 0xf7b955 : acc) : 0x2e2e36); var s = on ? 1.06 : 1; c.scale.lerp(new THREE.Vector3(s, s, 1), .1); });
        flag.material.opacity = ai === wi ? 1 : .35; flag.position.y = cards[wi].position.y + 1.18 + Math.sin(t * 3) * .02;
      };
    })();

    /* 3 · create: three directions fan out; one is picked and comes forward */
    (function(){
      var g = groups[3], acc = ACC[3], cs = [];
      r.concepts.forEach(function(c, k){
        var cd = card(c[0], 1.35, 1.9, { r: .08, border: 0x2e2e36, bw: .025 });
        var lb = pill(c[1], 1.3, .22, { bg: 'rgba(14,14,18,.92)', color: '#f4f4f5', size: 52, weight: 700 }); lb.position.set(0, -1.15, .01); cd.add(lb);
        var sb = pill(c[2], 1.0, .17, { color: '#a7a7b0', size: 46 }); sb.position.set(0, -1.36, .01); cd.add(sb);
        cd.userData.k = k; cd.userData.pos = new THREE.Vector3((k - 1) * 1.75, 2.1, -Math.abs(k - 1) * .5); cd.userData.rot = -(k - 1) * .32;
        g.add(cd); cs.push(cd);
      });
      var badge = pill('Picked', .78, .24, { bg: '#f0a0ff', color: '#1d0f22', size: 56, weight: 700 }); g.add(badge);
      /* moodboard behind: palette chips, type, logo */
      var mood = new THREE.Group(); mood.position.set(0, 3.6, -1.4); g.add(mood);
      r.palette.forEach(function(cl, k){ var sw = card(null, .4, .4, { r: .1, color: 0, border: 0x3a3a44, bw: .015 }); sw.userData.face.material.color.set(cl); sw.position.set(-1.6 + k * .5, 0, 0); mood.add(sw); });
      var aa = pill('Aa', .5, .4, { bg: 'rgba(20,20,26,.95)', color: '#f4f4f5', size: 70, font: 'Outfit, system-ui, sans-serif', weight: 800, w: 160, h: 128, r: 30 }); aa.position.set(.6, 0, 0); mood.add(aa);
      var lg = card(r.logo, .4, .4, { r: .1, border: 0xffffff }); lg.position.set(1.2, 0, 0); mood.add(lg);
      g.add(floorShadow(6, 2.2, 0, 0));
      anim[3] = function(n, t){
        var picked = n > .55 ? clamp((n - .55) / .3, 0, 1) : 0, pk = r.pick;
        cs.forEach(function(c){ var k = c.userData.k, me = k === pk, p = c.userData.pos.clone(), rot = c.userData.rot;
          if (me){ p.lerp(new THREE.Vector3(0, 2.2, 1.2), easeOut(picked)); rot *= 1 - picked; }
          else { p.z -= .9 * picked; p.x *= 1 + .25 * picked; }
          c.position.lerp(p, .12); c.rotation.y += (rot - c.rotation.y) * .12; c.position.y += Math.sin(t + k) * .01;
          c.userData.border.material.color.setHex(me && picked > .5 ? acc : 0x2e2e36); fade(c, me ? 1 : 1 - .6 * picked); });
        badge.position.copy(cs[pk].position).add(new THREE.Vector3(-.4, 1.08, .05)); badge.material.opacity = picked; badge.visible = picked > .02;
        mood.position.y = 3.6 + Math.sin(t * .7) * .05;
      };
    })();

    /* 4 · render: the film resolves on a big screen; the other formats queue beside it */
    (function(){
      var g = groups[4], acc = ACC[4];
      renderVid.userData.video.src = r.reel.preview;
      var scr = card(renderVid, 1.5, 2.67, { r: .1, border: acc, bw: .03 }); scr.position.set(0, 2.15, 0); g.add(scr);
      var veil = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.67), new THREE.MeshBasicMaterial({ color: 0x0b0b10, transparent: true, opacity: .92 })); veil.position.z = .01; scr.add(veil);
      var line = new THREE.Mesh(new THREE.PlaneGeometry(1.6, .035), new THREE.MeshBasicMaterial({ color: acc })); line.position.z = .02; scr.add(line);
      var lineGlow = glowSprite(acc, .9); lineGlow.scale.set(2.4, .5, 1); line.add(lineGlow);
      var eng = pill(r.engine + '  ·  rendering', 1.5, .24, { bg: 'rgba(14,14,18,.92)', color: '#f4f4f5', size: 50, font: 'ui-monospace, Menlo, monospace', weight: 700 }); eng.position.set(0, 1.55, .02); scr.add(eng);
      var side = r.deliver.slice(1, 5).map(function(d, k){ var w = d.ratio === '1:1' ? .9 : d.ratio === '4:5' ? .8 : .62, h = d.ratio === '1:1' ? .9 : d.ratio === '4:5' ? 1.0 : 1.1;
        var c = card(d.src, w, h, { r: .07, border: 0x2e2e36 }); var L = k < 2; c.position.set((L ? -1 : 1) * (1.55 + (k % 2) * .95), 2.55 - (k % 2) * 1.2 + (L ? 0 : .3), -.4 - (k % 2) * .3); c.rotation.y = (L ? 1 : -1) * .3;
        var tag = pill(d.kind + ' · ' + d.ratio, .9, .17, { bg: 'rgba(14,14,18,.92)', color: '#a7a7b0', size: 44 }); tag.position.set(0, -h / 2 - .14, .01); c.add(tag); c.userData.k = k; g.add(c); return c; });
      var beams = ENG.map(function(cl, k){ var b = glowSprite(new THREE.Color(cl).getHex(), 1); b.scale.set(.5, 5, 1); b.position.set(-2.6 + k * 1.04, 4.4, -1.6); g.add(b); return b; });
      g.add(floorShadow(6, 2.2, 0, 0));
      var dev = 0;
      anim[4] = function(n, t, dt){
        dev += ((n > .55 ? 1 : 0) - dev) * dt * 1.1; var p = clamp(dev, 0, 1);
        veil.scale.y = Math.max(.0001, 1 - p); veil.position.y = -1.335 * p; line.position.y = 1.335 - 2.67 * p; line.visible = p > .02 && p < .98;
        beams.forEach(function(b, k){ b.material.opacity = n * (.15 + .35 * Math.max(0, Math.sin(t * 2 - k))); });
        side.forEach(function(c){ var a = clamp((p - .2 - c.userData.k * .15) / .3, 0, 1); fade(c, .25 + .75 * a); });
        eng.material.map.needsUpdate = false;
      };
    })();

    /* 5 · edit: the film above a timeline; a shot is swapped and the cut stretches to 40s */
    (function(){
      var g = groups[5], acc = ACC[5];
      var scr = card(editVid, 1.2, 2.13, { r: .09, border: 0x2e2e36, bw: .025 }); scr.position.set(0, 2.75, -.3); g.add(scr);
      var langs = ['English', 'Hindi', 'Tamil'].map(function(l, k){ var p = pill(l, .9, .28, { bg: 'rgba(14,14,18,.92)', color: '#f4f4f5', size: 64, weight: 700 }); p.position.set(1.2, 3.4 - k * .36, -.25); g.add(p); return p; });
      var tl = new THREE.Group(); tl.position.set(0, 1.05, .7); tl.rotation.x = -.55; g.add(tl);
      tl.add(Object.assign(card(null, 4.6, .95, { r: .14, color: 0x101014, border: 0x2a2a32 }), {}));
      var clips = r.frames.map(function(f, k){ var c = card(f, .74, .56, { r: .05, border: acc, bw: .018 }); c.position.set(-1.95 + k * .8, 0, .02); tl.add(c); return c; });
      var swap = card(r.concepts[(r.pick + 1) % 3][0], .78, .56, { r: .05, border: 0xf7b955, bw: .022 }); tl.add(swap);
      var ext = card(r.frames[3], .74, .56, { r: .05, border: 0xf7b955, bw: .018 }); tl.add(ext);
      var ph = new THREE.Mesh(new THREE.PlaneGeometry(.025, .85), new THREE.MeshBasicMaterial({ color: 0xffffff })); ph.position.z = .05; tl.add(ph);
      var l40 = pill('0:20  →  0:40', 1.1, .2, { bg: 'rgba(14,14,18,.92)', color: '#f7b955', size: 50, font: 'ui-monospace, Menlo, monospace', weight: 700 }); l40.position.set(1.5, .65, .02); tl.add(l40);
      g.add(floorShadow(6, 2.4, 0, .3));
      anim[5] = function(n, t){
        var cyc = (t * .2) % 1, s = clamp((cyc - .25) / .2, 0, 1), e = easeOut(clamp((n - .5) / .35, 0, 1));
        /* shot 2 lifts out and the new take drops in */
        clips[1].position.y = .7 * s; fade(clips[1], 1 - s);
        swap.position.set(-1.95 + .8, .7 * (1 - s), .03); fade(swap, s);
        ext.position.set(1.2 + .4 * e, 0, .02); ext.scale.x = Math.max(.01, e); fade(ext, e);
        ph.position.x = -2.2 + cyc * 4.4 * (.8 + .2 * e);
        var li = Math.floor(t * .45) % 3; langs.forEach(function(p, k){ p.material.opacity = k === li ? 1 : .35; });
        l40.material.opacity = e;
      };
    })();

    /* 6 · deliver: every file lands in the library, each ticked as ready */
    (function(){
      var g = groups[6], acc = ACC[6], tiles = [];
      var lib = card(null, 4.7, 3.25, { r: .16, color: 0x0e0e12, border: 0x2a2a32, bw: .02 }); lib.position.set(0, 2.2, -.5); g.add(lib);
      var head = pill('Your library  ·  ' + r.deliver.length + ' files ready', 2.8, .26, { color: '#f4f4f5', size: 52, weight: 700, align: 'left', w: 1400, h: 130 }); head.position.set(-.85, 3.55, -.48); g.add(head);
      var dl = pill('Download all', 1.1, .26, { bg: '#ffd27a', color: '#1a1405', size: 54, weight: 700 }); dl.position.set(1.65, 3.55, -.47); g.add(dl);
      r.deliver.slice(0, 6).forEach(function(d, k){
        var col = k % 3, row = Math.floor(k / 3), w = 1.15, h = 1.15, c = card(d.src, w, h, { r: .08, border: 0x2e2e36 });
        c.userData.target = new THREE.Vector3(-1.4 + col * 1.4, 2.65 - row * 1.35, -.42); c.userData.start = new THREE.Vector3((Math.random() - .5) * 8, 4 + Math.random() * 2, 3 + Math.random() * 2); c.userData.rz = (Math.random() - .5) * 1.2; c.userData.k = k;
        var kind = pill(d.kind, .8, .17, { bg: 'rgba(0,0,0,.7)', color: '#fff', size: 46 }); kind.position.set(-.13, -.47, .01); c.add(kind);
        var tick = pill('✓', .2, .2, { bg: '#3ecf8e', color: '#04150c', size: 80, weight: 800, w: 128, h: 128, r: 64 }); tick.position.set(.43, .43, .01); c.add(tick); c.userData.tick = tick;
        c.position.copy(c.userData.start); g.add(c); tiles.push(c);
      });
      g.add(floorShadow(6, 2.4, 0, -.2));
      anim[6] = function(n){
        tiles.forEach(function(c){ var k = c.userData.k, a = easeOut(clamp((n - .25 - k * .06) / .45, 0, 1)); c.position.lerpVectors(c.userData.start, c.userData.target, a); c.rotation.z = c.userData.rz * (1 - a); c.rotation.y = -.6 * (1 - a); c.userData.tick.material.opacity = clamp((a - .85) / .15, 0, 1); });
        head.material.opacity = dl.material.opacity = clamp((n - .5) / .3, 0, 1);
      };
    })();
    wakeGL();
  }

  /* dust */
  var N = 700, pos = new Float32Array(N * 3);
  for (var i = 0; i < N; i++){ pos[i * 3] = -20 + Math.random() * 80; pos[i * 3 + 1] = Math.random() * 7; pos[i * 3 + 2] = -8 + Math.random() * 9; }
  var dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xd9ccff, size: .035, map: glowTex, transparent: true, opacity: .5, depthWrite: false, sizeAttenuation: true })));

  /* camera per chapter: an offset from the composition and a look target */
  var CAMS = [
    { dx: 0, y: 2.6, z: 9.4, ly: 2.2, lz: -1 },
    { dx: .5, y: 2.5, z: 9.2, ly: 2.2, lz: 0 },
    { dx: 0, y: 2.4, z: 7.6, ly: 2.0, lz: 0 },
    { dx: 0, y: 2.6, z: 7.2, ly: 2.25, lz: 0 },
    { dx: 0, y: 2.5, z: 7.6, ly: 2.25, lz: 0 },
    { dx: 0, y: 2.8, z: 8.2, ly: 2.05, lz: 0 },
    { dx: 0, y: 2.6, z: 7.6, ly: 2.2, lz: -.5 }
  ];
  function dwell(f){ var i = Math.floor(f), u = f - i; if (i >= NCH) return NCH; var q = clamp((u - .2) / .6, 0, 1); return i + q * q * (3 - 2 * q); }
  function damp(rate, dt){ return 1 - Math.exp(-rate * dt); }
  var ftAcc = 0, ftN = 0, skip = false, camX = 0, mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0, lastWake = performance.now(), visible = true, last = performance.now();
  var camC = dwell(progress * NCH);
  wakeGL = function(){ lastWake = performance.now(); if (!raf && visible && !document.hidden){ last = performance.now(); raf = requestAnimationFrame(frame); } };
  function frame(now){
    raf = 0;
    var idle = now - lastWake > 4000;
    if (idle && (skip = !skip)){ raf = requestAnimationFrame(frame); return; }
    var dt = Math.min(.05, (now - last) / 1000); last = now; var t = now / 1000;
    var f = progress * NCH, target = jumpTo >= 0 ? f : dwell(f); camC += (target - camC) * damp(jumpTo >= 0 ? 6 : 4.5, dt);
    var km = damp(3.6, dt); mx += (tmx - mx) * km; my += (tmy - my) * km;
    var i0 = clamp(Math.floor(camC), 0, NCH), i1 = clamp(i0 + 1, 0, NCH), u = easeOut(clamp(camC - i0, 0, 1)), A = CAMS[i0], B = CAMS[i1];
    camX = lerp(X[i0], X[i1], u); applyView(camC);
    var lz = lerp(A.lz, B.lz, u);
    cam.position.set(camX + lerp(A.dx, B.dx, u) + mx * .6, lerp(A.y, B.y, u) + my * .3, lz + (lerp(A.z, B.z, u) - lz) * ZK);
    cam.lookAt(camX + mx * .2, lerp(A.ly, B.ly, u) + my * .1, lz);
    for (var s = 0; s <= 6; s++){
      var n = clamp(1 - Math.abs(camC - s) * 1.25, 0, 1);
      groups[s].visible = n > 0 || Math.abs(camC - s) < 1.2;
      glows[s].material.opacity = .22 * n;
      if (anim[s] && groups[s].visible) anim[s](n, t, dt);
    }
    var vNear = Math.abs(camC - 4) < 1.4 || Math.abs(camC - 5) < 1.4;
    if (vNear){ if (renderVid.userData.video.paused && renderVid.userData.video.getAttribute('src')) renderVid.userData.video.play().catch(function(){}); } else if (!renderVid.userData.video.paused) renderVid.userData.video.pause();
    var introOn = camC < 1.2 && !document.hidden; introVids.forEach(function(v){ if (introOn){ if (v.paused) v.play().catch(function(){}); } else if (!v.paused) v.pause(); });
    if (introOn) lastWake = now;
    var arr = dustGeo.attributes.position.array; for (var d = 1; d < arr.length; d += 3){ arr[d] += dt * .05; if (arr[d] > 7) arr[d] = 0; } dustGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, cam);
    if (!idle){ ftAcc += dt; if (++ftN >= 50){ if (ftAcc / ftN > .03 && dpr > DPR_MIN){ dpr = Math.max(DPR_MIN, dpr - .25); renderer.setPixelRatio(dpr); size(); } ftAcc = ftN = 0; } }
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  }
  stage.addEventListener('mousemove', function(e){ var r = stage.getBoundingClientRect(); tmx = (e.clientX - r.left) / r.width * 2 - 1; tmy = -((e.clientY - r.top) / r.height * 2 - 1); wakeGL(); }, { passive: true });
  stage.addEventListener('mouseleave', function(){ tmx = 0; tmy = 0; wakeGL(); });
  document.addEventListener('visibilitychange', function(){ if (!document.hidden){ last = performance.now(); wakeGL(); } });
  if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(e){ visible = e.isIntersecting; if (visible) wakeGL(); }); }, { threshold: .02 }).observe(set);
  glRun = function(r){ build(r); };
  build(RUNS[brandKey]);
  wakeGL();
  window.__set = { renderer: renderer, scene: scene, introVids: introVids, get camX(){ return camX; }, get camC(){ return camC; }, get dpr(){ return dpr; } };
}
if (window.THREE) initGL(); else {
  var sc = document.querySelector('script[src*="three.min.js"]');
  if (sc){ sc.addEventListener('load', initGL); sc.addEventListener('error', function(){ set.classList.add('nogl'); }); addEventListener('load', function(){ if (!window.THREE) set.classList.add('nogl'); }); }
  else set.classList.add('nogl');
}


/* ============================================================ WORK · the creative library */
var TAGS = { starter: 'Starter', standard: 'Standard', popular: 'Popular', premium: 'Premium', film: 'Brand Film', ugc: 'AI UGC' };
var TIERS = ['starter', 'standard', 'popular', 'premium'];
function tagPills(tags){ return (tags || []).filter(function(t){ return TIERS.indexOf(t) > -1; }).map(function(t){ return '<span class="tag-p t-' + t + '"><i></i>' + TAGS[t] + '</span>'; }).join(''); }
var lb = $('lb'), lbV = $('lb-v'), lbIm = $('lb-i'), lbDots = $('lb-dots'), lbList = [], lbI = 0, lbSlide = 0;
(function(){
  /* Selected work: one featured piece playing large, a two-row rail of everything else beside it.
     Point at (or tap) any piece to feature it; open the featured piece to watch with sound. */
  var TABS = [
    { k: 'reels', label: 'AI reels', list: LIB.reels, sub: 'tags', subs: [['starter', 'Starter'], ['standard', 'Standard'], ['popular', 'Popular'], ['premium', 'Premium']] },
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
  window.workGo = function(k, s){
    var b = tabsEl.querySelector('[data-k="' + k + '"]'); if (b) b.click();
    if (s){ var x = subsEl.querySelector('[data-s="' + s + '"]'); if (x) x.click(); else { var j = -1; view.some(function(e, i){ if ((e.tags || []).indexOf(s) > -1){ j = i; return true; } }); if (j > -1) feature(j, true); } }
    smoothTo($('work'));
  };
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
/* industry presets: brand-neutral, each re-skins the board with work from that category */
var CS = 'assets/creatives/catalogue/standard/', RP = 'assets/creatives/reels/popular/';
var BR = {
  skincare: { name: 'Your skincare brand', label: 'Skincare', cat: 'skincare', primary: '#2f8f6e', hover: '#5fc7a0', reel: RP + 'acne-patch-266.jpg', prod: CS + 'aloe-gentle-face-cleanser-411.jpg', spin: CS + 'adored-360-255.jpg', car: CS + 'anti-hair-fall-hair-care-combo-413.jpg' },
  fashion: { name: 'Your fashion label', label: 'Fashion', cat: 'fashion', primary: '#e0523a', hover: '#ff8a74', reel: RP + 'coral-candy-boho-mini-dress-394.jpg', prod: CS + 'wine-noor-chanderi-suit-set-344.jpg', spin: CS + 'sky-blue-fandy-silk-embroidered-sharara-set-345.jpg', car: CS + 'orbis-collection-2-319.jpg' },
  jewellery: { name: 'Your jewellery brand', label: 'Jewellery', cat: 'jewellery', primary: '#b8903a', hover: '#e2bd6a', reel: RP + 'vivienne-midnight-glow-maxi-dress-366.jpg', prod: CS + 'divine-combo-pack-material-276.jpg', spin: CS + 'ring-14k-white-gold-plated-352.jpg', car: CS + 'tiger-eye-crystal-ganesh-ji-277.jpg' },
  wellness: { name: 'Your wellness brand', label: 'Wellness', cat: 'wellness', primary: '#c25a7c', hover: '#ef8fb0', reel: RP + 'butterfly-cervical-neck-pillow-323.jpg', prod: CS + 'copper-water-bottle-155.jpg', spin: CS + 'shahi-pure-copper-water-bottle-with-glass-194.jpg', car: CS + 'brass-3-tier-tiffin-158.jpg' },
  home: { name: 'Your home brand', label: 'Home and decor', cat: 'home and decor', primary: '#3b6b9a', hover: '#74a4d4', reel: RP + 'comfort-cushion-v2-380.jpg', prod: CS + 'recliner-manual-sofa-300.jpg', spin: CS + 'royal-hammered-handi-156.jpg', car: CS + 'velvet-suede-fabric-3-1-1-301.jpg' },
  accessories: { name: 'Your accessories brand', label: 'Watches and bags', cat: 'accessories', primary: '#6a4ff0', hover: '#9c88ff', reel: RP + 'ugc-perfume-men-preview-100.jpg', prod: 'assets/creatives/catalogue/premium/aurex-37.jpg', spin: CS + 'devotee-watch-374.jpg', car: CS + 'duffle-bag-1-442.jpg' }
};
var YOUR_LOGO = 'assets/brand/your-logo.svg';
var ROOT = document.documentElement, brandSec = $('brand'), brandCur = null;
function rgba(hex, a){ var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; }
function monogram(name){ var ch = (name || '?').trim().charAt(0).toUpperCase(); return 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="40"><rect width="64" height="40" rx="8" fill="#0a0a0a"/><text x="32" y="27" text-anchor="middle" font-family="Outfit,system-ui,sans-serif" font-weight="700" font-size="22" fill="#fff">' + ch + '</text></svg>'); }
function setImg(id, src, alt){ var e = $(id); if (!e) return; if (!src){ e.removeAttribute('src'); e.style.display = 'none'; return; } e.style.display = ''; e.src = src; if (alt != null) e.alt = alt; }
function applyBrand(key, custom){
  var b = key ? BR[key] : custom || null; brandCur = key || (custom ? 'custom' : null);
  var vars = b ? { '--accent': b.primary, '--accent-hover': b.hover, '--accent-soft': rgba(b.primary, .14), '--accent-line': rgba(b.primary, .5), '--brand-gradient': 'linear-gradient(120deg,' + b.primary + ' 0%,' + b.hover + ' 100%)', '--glow': '0 0 0 1px ' + rgba(b.primary, .4) + ', 0 0 28px -6px ' + rgba(b.primary, .45) } : {};
  ['--accent', '--accent-hover', '--accent-soft', '--accent-line', '--brand-gradient', '--glow'].forEach(function(v){ if (vars[v]) ROOT.style.setProperty(v, vars[v]); else ROOT.style.removeProperty(v); });
  brandSec.style.background = b ? 'radial-gradient(60% 50% at 70% 30%, ' + rgba(b.primary, .16) + ', transparent 70%), var(--bg-0) var(--dots)' : '';
  var logo = b ? (b.logo || YOUR_LOGO) : null;
  $('madefor').classList.toggle('on', !!(b && b.logo)); setImg('madefor-logo', b && b.logo ? b.logo : null, b ? b.name + ' logo' : '');
  setImg('o-logo-bar', logo, b ? b.name + ' logo on the reel caption bar' : ''); setImg('o-logo-st', logo, b ? b.name + ' logo on the static' : '');
  setImg('o-reel-img', b ? b.reel : T[5].data); setImg('o-static-img', b ? b.prod : T[6].data); setImg('o-spin-img', b ? b.spin : T[7].data); setImg('o-car-img', b ? b.car : T[8].data);
  $('o-static-h').textContent = b ? b.cat.charAt(0).toUpperCase() + b.cat.slice(1) + ', in your colours' : 'Your headline, your colours';
  $('h-brand').innerHTML = b ? b.name + ', <span class="hl-p">already made.</span>' : 'Show me what you\'d make for <span class="hl-y">my</span> brand.';
  $('b-narr').innerHTML = b
    ? '<b>' + b.name + '</b>, here’s what we’d make from ' + (b.url ? '<b>' + b.url + '</b>' : 'your product page') + ': a 20-second reel, three statics, a 360° spin, a five-card carousel, and Hindi and Tamil cuts. Your logo stays exact and your colours stay yours.'
    : 'Pick a brand or enter your site. The board fills with a reel, a static, a 360° spin, a carousel and language cuts, all in that brand’s look.';
  $('b-swatch').innerHTML = b ? '<i style="background:' + b.primary + '"></i><i style="background:' + b.hover + '"></i><i style="background:' + rgba(b.primary, .14) + '"></i><span>' + (b.url ? 'Colours from ' + b.url : 'A palette for ' + b.cat) + '</span>' : '';
  $('b-go').setAttribute('data-website', b && b.url ? b.url : ''); $('b-go').setAttribute('data-company', '');
  document.querySelectorAll('#b-logos button').forEach(function(btn){ btn.setAttribute('aria-pressed', btn.getAttribute('data-b') === key ? 'true' : 'false'); });
  $('board-pill').textContent = b ? 'Kit for ' + b.name : 'Sample kit';
  if (typeof fxApi !== 'undefined' && fxApi) fxApi.paint();
  $('b-logos').classList.toggle('has-pick', !!key);
  if (!reduce){ brandSec.classList.remove('flash'); void brandSec.offsetWidth; brandSec.classList.add('flash'); }
}
Object.keys(BR).forEach(function(k){ var btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('data-b', k); btn.setAttribute('aria-label', 'Show a kit for ' + BR[k].label.toLowerCase()); btn.innerHTML = '<img src="' + BR[k].spin + '" alt=""><span>' + BR[k].label + '</span>'; $('b-logos').appendChild(btn); });
var brandT = 0, bSubmit = $('b-submit');
function loadBrand(key, custom){
  clearTimeout(brandT);
  var b = key ? BR[key] : custom;
  if (!b || reduce){ brandSec.classList.remove('loading'); bSubmit.disabled = false; bSubmit.textContent = 'Show me'; applyBrand(key, custom); return; }
  brandSec.classList.add('loading'); bSubmit.disabled = true; bSubmit.textContent = 'Reading…';
  $('b-narr').innerHTML = b.url ? 'Reading <b>' + b.url + '</b> for your logo, colours and products…' : 'Pulling together a ' + b.cat + ' kit…';
  brandT = setTimeout(function(){ brandSec.classList.remove('loading'); bSubmit.disabled = false; bSubmit.textContent = 'Show me'; applyBrand(key, custom); }, 750);
}
$('b-logos').addEventListener('click', function(ev){ var btn = ev.target.closest('button'); if (!btn) return; var k = btn.getAttribute('data-b'); loadBrand(brandCur === k ? null : k); });
$('b-field').addEventListener('submit', function(ev){
  ev.preventDefault();
  var v = $('b-url').value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''); if (!v){ loadBrand(null); return; }
      var host = v.split('/')[0], name = host.split('.')[0]; name = name.charAt(0).toUpperCase() + name.slice(1);
  /* TODO: fetch(BRAND_API + '?url=' + host) → { name, logo, primary } ; generic palette until then */
  loadBrand(null, { name: name, cat: 'your products', url: host, primary: '#7b5cf5', hover: '#a08bff', logo: monogram(name), reel: T[5].data, prod: T[6].data, spin: T[7].data, car: T[8].data });
  setTimeout(function(){ lead('project', { website: host, src: 'brand-show-me' }); }, reduce ? 0 : 900);
});
document.querySelectorAll('.play:empty').forEach(function(b){ b.innerHTML = PLAY; });
applyBrand(null);
brandSec.classList.remove('flash');




/* ============================================================ TRUST MARQUEE, MOCKS */
(function(){
  var mq = $('mq'), logos = '';
  /* single-colour, transparent marks sized to equal visual weight (same rendered ink area) */
  /* brand-neutral: the industries we make work for, not client logos */
  ['Beauty and skincare', 'Fashion', 'Jewellery', 'Wellness', 'Home and decor', 'Food and drinks', 'Watches', 'Bags and travel', 'Ayurveda', 'Electronics', 'Kids and pets', 'Footwear'].forEach(function(n){ logos += '<span class="mq-ind">' + n + '</span>'; });
  mq.innerHTML = logos + logos.replace(/<span class="mq-ind">/g, '<span class="mq-ind" aria-hidden="true">');
  var w = $('wave'), hs = [38, 62, 80, 54, 92, 70, 44, 66, 88, 58, 36, 72, 96, 64, 48, 78, 56, 84, 42, 68, 90, 52, 74, 46];
  if (w) w.innerHTML = hs.map(function(h, i){ return '<i style="--h:' + h + ';--k:' + i + '"></i>'; }).join('');
  $('app-tools').innerHTML = '<span><i class="app-dot"></i>All brands</span><span>This week</span><span>All formats</span><span class="dl">Download all</span>';
  $('app-grid').innerHTML = [[6, 'spin'], [0, 'reel'], [7, 'spin'], [3, 'हिन्दी'], [8, 'spin'], [2, 'reel'], [9, 'spin'], [4, 'reel']].map(function(a){ return '<figure><img src="' + T[a[0]].data + '" alt="" loading="lazy"><figcaption>' + a[1] + '</figcaption></figure>'; }).join('');
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
  lenis = new Lenis({ lerp: .085, smoothWheel: true, wheelMultiplier: 1 }); window.__lenis = lenis;
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

/* ---- creative categories: each card previews its format and opens it in Work */
(function(){
  var box = $('cats'); if (!box) return;
  function count(list, tag){ return tag ? list.filter(function(e){ return e.tags.indexOf(tag) > -1; }).length : list.length; }
  function pick(list, tag, title){ var l = tag ? list.filter(function(e){ return e.tags.indexOf(tag) > -1; }) : list; return l.filter(function(e){ return e.title.indexOf(title) > -1; })[0] || l[0]; }
  var C = [
    { k: 'reels', s: null, t: 'AI Reels', d: 'Scripted, voiced and edited short-form video', n: count(LIB.reels), e: pick(LIB.reels, null, 'Vivienne'), c: '#8b6bff' },
    { k: 'reels', s: 'ugc', t: 'AI UGC', d: 'Creator-style reviews, reactions and try-ons', n: count(LIB.reels, 'ugc'), e: pick(LIB.reels, 'ugc', 'Perfume'), c: '#3ecf8e' },
    { k: 'catalogue', s: null, t: '360° Product Videos', d: 'Your product turned all the way round', n: count(LIB.catalogue), e: pick(LIB.catalogue, null, 'Ring'), c: '#5fd4ff' },
    { k: 'reels', s: 'film', t: 'Brand Films', d: 'Story-led, character and animated films', n: count(LIB.reels, 'film'), e: pick(LIB.reels, 'film', 'Nilini'), c: '#f0a0ff' },
    { k: 'statics', s: null, t: 'Statics', d: 'Ad statics in three sizes', n: LIB.statics.length, img: LIB.statics[11].src, c: '#f7b955' },
    { k: 'carousels', s: null, t: 'Carousels', d: 'Five swipeable cards from one page', n: LIB.carousels.length, img: LIB.carousels[1].slides[0], c: '#ffd27a' }
  ];
  box.innerHTML = C.map(function(c, i){
    var media = c.e ? '<img src="' + escH(c.e.poster) + '" alt="" loading="lazy"><video muted loop playsinline preload="none" data-src="' + escH(c.e.preview) + '"></video>' : '<img src="' + escH(c.img) + '" alt="" loading="lazy">';
    return '<button type="button" class="cat rv" style="--c:' + c.c + ';transition-delay:' + (i % 3) * 60 + 'ms" data-i="' + i + '"><span class="cat-m' + (c.e ? '' : ' fit') + '">' + media + '</span><span class="cat-b"><span class="cat-n">' + c.n + '</span><b>' + c.t + '</b><span class="cat-d">' + c.d + '</span><span class="cat-go">Explore ' + ARROW_S + '</span></span></button>';
  }).join('');
  box.querySelectorAll('.rv').forEach(function(x){ if (window.IntersectionObserver && !reduce){ var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .15 }); io.observe(x); } else x.classList.add('in'); });
  box.addEventListener('click', function(ev){ var b = ev.target.closest('.cat'); if (!b) return; var c = C[+b.getAttribute('data-i')]; workGo(c.k, c.s); });
  function play(b, on){ var v = b.querySelector('video'); if (!v || reduce) return; if (on){ if (!v.getAttribute('src')) v.src = v.getAttribute('data-src'); v.play().then(function(){ b.classList.add('pv'); }).catch(function(){}); } else { v.pause(); b.classList.remove('pv'); } }
  if (FINE){ box.addEventListener('mouseover', function(ev){ var b = ev.target.closest('.cat'); if (b) play(b, true); }); box.addEventListener('mouseout', function(ev){ var b = ev.target.closest('.cat'); if (b && !b.contains(ev.relatedTarget)) play(b, false); }); }
  else if ('IntersectionObserver' in window){ var io2 = new IntersectionObserver(function(es){ es.forEach(function(e){ play(e.target, e.isIntersecting); }); }, { threshold: .7 }); box.querySelectorAll('.cat').forEach(function(b){ io2.observe(b); }); }
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
