/* Fastrr Studio: contact popup, accounts and lead capture.
   Talks to Supabase over plain REST (no SDK): Auth for accounts, a `leads` table for enquiries.
   Settings live in assets/js/config.js; the database schema is in supabase/schema.sql.
   Until Supabase is configured, enquiries open the visitor's email app with everything filled in,
   so no lead is ever dropped. */
(function(){
'use strict';
var C = window.FASTRR_CONFIG || {};
var BASE = (C.supabaseUrl || '').replace(/\/+$/, ''), KEY = C.supabaseAnonKey || '', LIVE = !!(BASE && KEY);
var SALES = C.salesEmail || 'studio@fastrr.com', REPLY = C.replyPromise || 'within one working day';
var HOME = location.origin + location.pathname;
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function $(id){ return document.getElementById(id); }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function store(k, v){ try { if (v === undefined) return JSON.parse(localStorage.getItem(k)); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
function first(n){ return String(n || '').trim().split(/\s+/)[0] || ''; }
function initials(n, e){ var p = String(n || '').trim().split(/\s+/).filter(Boolean); return ((p[0] || e || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var ARW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var XIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
var EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
var MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>';
var GOOG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12s4.3 9.7 9.7 9.7c5.6 0 9.3-3.9 9.3-9.5 0-.6-.07-1.1-.16-1.6H12z"/></svg>';

/* ------------------------------------------------------------ attribution: where the visitor came from */
(function(){
  var q = new URLSearchParams(location.search), u = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(function(k){ if (q.get(k)) u[k] = q.get(k).slice(0, 200); });
  if (Object.keys(u).length) store('fs-utm', u);
  if (!store('fs-ref') && document.referrer && document.referrer.indexOf(location.host) < 0) store('fs-ref', document.referrer.slice(0, 300));
})();

/* ------------------------------------------------------------ Supabase over REST */
function api(path, o){
  o = o || {};
  var h = { apikey: KEY, 'Content-Type': 'application/json', Authorization: 'Bearer ' + (o.token || KEY) };
  if (o.headers) Object.keys(o.headers).forEach(function(k){ h[k] = o.headers[k]; });
  return fetch(BASE + path, { method: o.method || 'GET', headers: h, body: o.body ? JSON.stringify(o.body) : undefined }).then(function(r){
    return r.text().then(function(t){
      var d = null; try { d = t ? JSON.parse(t) : null; } catch (e) { d = t; }
      if (!r.ok){ var e2 = new Error(friendly(d, r.status)); e2.status = r.status; e2.code = d && (d.error_code || d.code || d.error); throw e2; }
      return d;
    });
  }, function(){ throw new Error('Couldn’t reach us. Check your connection and try again.'); });
}
function friendly(d, st){
  var m = d && (d.error_description || d.msg || d.message || d.error) || '';
  if (/invalid login credentials|invalid_grant/i.test(m)) return 'That email and password don’t match. Try again or reset your password.';
  if (/email not confirmed/i.test(m)) return 'Please confirm your email first. We’ve sent you a link.';
  if (/already registered|already been registered|user_already_exists/i.test(m)) return 'There’s already an account with this email. Sign in instead.';
  if (/password should be at least|weak_password/i.test(m)) return 'Choose a stronger password: at least 8 characters with a number.';
  if (/rate limit|too many/i.test(m) || st === 429) return 'Too many tries. Wait a minute and try again.';
  if (/signups not allowed|signup_disabled/i.test(m)) return 'New accounts are closed right now. Send us an enquiry and we’ll set you up.';
  return m || 'Something went wrong (' + st + '). Please try again.';
}

var session = store('fs-session') || null;
function setSession(s){ session = s; store('fs-session', s || null); staff = null; renderAcct(); }
function fromToken(d){ return { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Math.floor(Date.now() / 1000) + (+d.expires_in || 3600), user: d.user }; }
function token(){
  if (!LIVE || !session) return Promise.resolve(null);
  if (session.expires_at - 60 > Date.now() / 1000) return Promise.resolve(session.access_token);
  return api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: session.refresh_token } })
    .then(function(d){ setSession(fromToken(d)); return session.access_token; }, function(){ setSession(null); return null; });
}
function meta(){ var u = session && session.user || {}; var m = u.user_metadata || {}; return { name: m.name || m.full_name || '', company: m.company || '', phone: m.phone || '', email: u.email || '' }; }

var Auth = {
  signIn: function(email, pw){ return api('/auth/v1/token?grant_type=password', { method: 'POST', body: { email: email, password: pw } }).then(function(d){ setSession(fromToken(d)); }); },
  signUp: function(email, pw, m){ return api('/auth/v1/signup?redirect_to=' + encodeURIComponent(HOME), { method: 'POST', body: { email: email, password: pw, data: m } }).then(function(d){ if (d && d.access_token){ setSession(fromToken(d)); return { signedIn: true }; } return { confirm: true }; }); },
  recover: function(email){ return api('/auth/v1/recover?redirect_to=' + encodeURIComponent(HOME), { method: 'POST', body: { email: email } }); },
  resend: function(email){ return api('/auth/v1/resend', { method: 'POST', body: { type: 'signup', email: email, options: { email_redirect_to: HOME } } }); },
  setPassword: function(pw){ return token().then(function(t){ if (!t) throw new Error('Your reset link has expired. Ask for a new one.'); return api('/auth/v1/user', { method: 'PUT', token: t, body: { password: pw } }); }); },
  signOut: function(){ var t = session && session.access_token; setSession(null); if (LIVE && t) api('/auth/v1/logout', { method: 'POST', token: t }).catch(function(){}); },
  google: function(){ location.assign(BASE + '/auth/v1/authorize?provider=google&redirect_to=' + encodeURIComponent(HOME)); }
};
var staff = null;
function isStaff(){ if (staff !== null) return Promise.resolve(staff); return token().then(function(t){ if (!t) return false; return api('/rest/v1/rpc/is_staff', { method: 'POST', token: t, body: {} }).then(function(v){ staff = v === true; return staff; }, function(){ return false; }); }); }

/* ------------------------------------------------------------ leads */
function newRef(){ var d = new Date(), p = function(n){ return (n < 10 ? '0' : '') + n; }; return 'FS-' + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(); }
function saveLead(rec){
  if (!LIVE) return Promise.resolve({ mail: true });
  return token().then(function(t){
    if (t && session && session.user) rec.user_id = session.user.id;
    return api('/rest/v1/leads', { method: 'POST', token: t || undefined, headers: { Prefer: 'return=minimal' }, body: rec });
  }).then(function(){ return { ok: true }; });
}
var LABEL = { intent: 'Enquiry', name: 'Name', email: 'Email', phone: 'Phone', company: 'Brand or company', website: 'Website', role: 'Role', creatives: 'Creatives', volume: 'Monthly volume', budget: 'Monthly budget', timeline: 'Timeline', contact_pref: 'Best way to reach', brands_count: 'Brands managed', message: 'Details', ref: 'Reference', source: 'Clicked', page: 'Page' };
function leadText(rec){ return Object.keys(LABEL).filter(function(k){ var v = rec[k]; return v && (!Array.isArray(v) || v.length); }).map(function(k){ return LABEL[k] + ': ' + (Array.isArray(rec[k]) ? rec[k].join(', ') : rec[k]); }).join('\n'); }
function mailLead(rec){
  var subj = 'Enquiry ' + rec.ref + ' from ' + (rec.company || rec.name);
  return 'mailto:' + SALES + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent('Hi Fastrr Studio,\n\n' + leadText(rec) + '\n');
}

/* ------------------------------------------------------------ shared dialog plumbing */
var opener = null;
function show(d){
  opener = document.activeElement;
  if (window.__lenis) window.__lenis.stop();
  document.body.classList.add('fx-open');
  if (d.showModal){ if (!d.open) d.showModal(); } else d.setAttribute('open', '');
}
function hide(d){ if (d.close && d.open) d.close(); else d.removeAttribute('open'); }
function onClose(d){
  d.addEventListener('close', function(){
    if (document.querySelector('dialog.fx-dlg[open]')) return;
    document.body.classList.remove('fx-open');
    if (window.__lenis) window.__lenis.start();
    if (opener && opener.focus && document.contains(opener)) opener.focus({ preventScroll: true });
    if (/^#(contact-us|signin|signup)$/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
  });
  d.addEventListener('click', function(e){ if (e.target === d || e.target.closest('[data-close]')) hide(d); });
}
function field(name, label, input, o){
  o = o || {};
  return '<label class="fx-f' + (o.wide ? ' wide' : '') + '"' + (o.for ? ' data-for="' + o.for + '"' : '') + '><span class="fx-l">' + label + (o.req ? ' <em aria-hidden="true">*</em>' : ' <small>optional</small>') + '</span>' + input + '<span class="fx-hint" data-hint="' + name + '"></span></label>';
}
function chips(name, list, type, o){
  o = o || {};
  return '<fieldset class="fx-group' + (o.wide === false ? '' : ' wide') + '"' + (o.for ? ' data-for="' + o.for + '"' : '') + '><legend class="fx-l">' + o.label + (o.req ? ' <em aria-hidden="true">*</em>' : '') + (o.note ? ' <small>' + o.note + '</small>' : '') + '</legend><div class="fx-chips">'
    + list.map(function(v){ return '<label class="fx-chip"><input type="' + type + '" name="' + name + '" value="' + esc(v) + '"><span>' + esc(v) + '</span></label>'; }).join('')
    + '</div><span class="fx-hint" data-hint="' + name + '"></span></fieldset>';
}
var toastT = 0;
function toast(msg){
  var t = $('fx-toast'); if (!t){ t = document.createElement('div'); t.id = 'fx-toast'; t.className = 'fx-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.innerHTML = CHK + '<span>' + esc(msg) + '</span>'; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function(){ t.classList.remove('on'); }, 4200);
}

/* ============================================================ CONTACT POPUP */
var CREATIVES = ['AI Reels', 'AI UGC', '360° product videos', 'Brand films', 'Statics', 'Carousels', 'AI GIFs', 'Catalogue shots', 'Language cuts', 'Landing pages', 'Brand kits', 'Songs and music'];
var INTENTS = {
  project: { seg: 'A project', h: 'Let’s make something for <span class="hl">your brand.</span>', p: 'Tell us about your brand and what you need. A real person on our team reads every request.' },
  agency: { seg: 'Agency or team', h: 'Run every brand <span class="hl">from one place.</span>', p: 'Tell us about your team and the brands you manage, and we’ll set up a workspace that fits.' },
  question: { seg: 'A question', h: 'Ask us <span class="hl">anything.</span>', p: 'Pricing, formats, timelines or anything else. Write to us and we’ll get back to you.' }
};
var cx = document.createElement('dialog');
cx.className = 'fx-dlg'; cx.id = 'cx'; cx.setAttribute('aria-labelledby', 'cx-t'); cx.setAttribute('data-lenis-prevent', '');
cx.innerHTML = '<div class="fx-card">'
  + '<button type="button" class="fx-x" aria-label="Close" data-close>' + XIC + '</button>'
  + '<aside class="fx-side"><div class="fx-side-in"><span class="fx-eye"><i></i>Contact us</span><h2 id="cx-t"></h2><p id="cx-lede"></p>'
  + '<ol class="fx-next"><li><b>We reply</b><span>' + esc(REPLY) + '</span></li><li><b>A free sample</b><span>made from your own product link</span></li><li><b>A clear plan</b><span>formats, timelines and a quote</span></li></ol>'
  + '<div class="fx-alt"><span>Prefer email?</span><a href="mailto:' + esc(SALES) + '">' + esc(SALES) + '</a>' + (C.whatsapp ? '<a href="https://wa.me/' + esc(C.whatsapp) + '" target="_blank" rel="noopener">WhatsApp us</a>' : '') + '</div></div></aside>'
  + '<div class="fx-main">'
  + '<form class="fx-form" id="cx-form" novalidate>'
  + '<div class="fx-seg" role="radiogroup" aria-label="What brings you here">' + Object.keys(INTENTS).map(function(k){ return '<label><input type="radio" name="intent" value="' + k + '"><span>' + INTENTS[k].seg + '</span></label>'; }).join('') + '</div>'
  + '<div class="fx-prog" data-for="project agency" aria-hidden="true"><span data-s="1"><i>1</i>About you</span><b></b><span data-s="2"><i>2</i>What you need</span></div>'
  + '<div class="fx-step" data-step="1"><div class="fx-grid">'
  + field('name', 'Full name', '<input name="name" autocomplete="name" maxlength="120" required>', { req: 1 })
  + field('email', 'Work email', '<input name="email" type="email" autocomplete="email" maxlength="200" inputmode="email" required>', { req: 1 })
  + field('phone', 'Phone or WhatsApp', '<span class="fx-tel"><select name="cc" aria-label="Country code"><option>+91</option><option>+971</option><option>+1</option><option>+44</option><option>+65</option><option>+61</option><option>+49</option><option>+966</option></select><input name="phone" type="tel" autocomplete="tel-national" inputmode="tel" maxlength="20" placeholder="98765 43210"></span>', { req: 1, for: 'project agency' })
  + field('company', 'Brand or company', '<input name="company" autocomplete="organization" maxlength="160">', { req: 1, for: 'project agency' })
  + field('company', 'Brand or company', '<input name="company_q" autocomplete="organization" maxlength="160">', { for: 'question' })
  + field('website', 'Website or product link', '<input name="website" inputmode="url" autocomplete="url" maxlength="300" placeholder="yourbrand.in">', { for: 'project agency' })
  + field('role', 'Your role', '<select name="role"><option value="">Choose one</option><option>Founder or owner</option><option>Marketing or growth</option><option>Brand or design</option><option>Agency</option><option>Freelancer</option><option>Other</option></select>', { for: 'project agency' })
  + field('message', 'Your question', '<textarea name="message_q" rows="5" maxlength="4000" placeholder="What would you like to know?"></textarea>', { req: 1, wide: 1, for: 'question' })
  + '</div></div>'
  + '<div class="fx-step" data-step="2" data-for="project agency"><div class="fx-grid">'
  + chips('creatives', CREATIVES, 'checkbox', { label: 'What should we make?', req: 1, note: 'pick all that apply' })
  + chips('brands_count', ['1 to 5', '6 to 20', '21 to 50', 'More than 50'], 'radio', { label: 'Brands you manage', req: 1, for: 'agency' })
  + chips('volume', ['Just one to start', '2 to 10', '11 to 50', 'More than 50'], 'radio', { label: 'Creatives a month' })
  + chips('budget', ['Under ₹25k', '₹25k to ₹1L', '₹1L to ₹5L', 'Above ₹5L', 'Not sure yet'], 'radio', { label: 'Monthly budget' })
  + chips('timeline', ['This week', 'This month', 'In 1 to 3 months', 'Just exploring'], 'radio', { label: 'When do you need it?' })
  + chips('contact_pref', ['WhatsApp', 'Call', 'Email'], 'radio', { label: 'Best way to reach you' })
  + field('message', 'Tell us about the project', '<textarea name="message" rows="4" maxlength="4000" placeholder="The product, the launch, the look you love, references…"></textarea>', { wide: 1 })
  + '</div></div>'
  + '<label class="fx-hp" aria-hidden="true">Leave this empty<input name="fax" tabindex="-1" autocomplete="off"></label>'
  + '<label class="fx-consent" data-show="final"><input type="checkbox" name="consent"><span>I’m happy for Fastrr Studio to contact me about this request.</span></label>'
  + '<p class="fx-err" id="cx-err" role="alert"></p>'
  + '<div class="fx-actions"><button type="button" class="btn ghost" id="cx-back">Back</button><button type="submit" class="btn" id="cx-go"></button></div>'
  + '</form>'
  + '<div class="fx-done" id="cx-done" hidden></div>'
  + '</div></div>';
document.body.appendChild(cx); onClose(cx);
var form = $('cx-form'), step = 1, intent = 'project', openedAt = 0, src = '';

function setIntent(k){
  intent = INTENTS[k] ? k : 'project';
  cx.setAttribute('data-intent', intent);
  form.querySelectorAll('input[name=intent]').forEach(function(r){ r.checked = r.value === intent; });
  $('cx-t').innerHTML = INTENTS[intent].h; $('cx-lede').textContent = INTENTS[intent].p;
  form.querySelectorAll('[data-for]').forEach(function(n){ var on = n.getAttribute('data-for').split(' ').indexOf(intent) > -1; n.hidden = !on; n.querySelectorAll('input,select,textarea').forEach(function(i){ i.disabled = !on; }); });
  if (intent === 'agency' && !form.role.value) form.role.value = 'Agency';
  if (intent === 'question') step = 1;
  setStep(step);
}
function steps(){ return intent === 'question' ? 1 : 2; }
function setStep(n){
  step = Math.min(n, steps());
  form.querySelectorAll('.fx-step').forEach(function(s){ s.classList.toggle('on', +s.getAttribute('data-step') === step); });
  form.querySelectorAll('.fx-prog span').forEach(function(s){ var k = +s.getAttribute('data-s'); s.classList.toggle('on', k === step); s.classList.toggle('done', k < step); });
  var last = step === steps();
  form.querySelector('.fx-consent').hidden = !last;
  $('cx-back').hidden = step === 1;
  $('cx-go').innerHTML = (last ? (intent === 'question' ? 'Send question' : 'Send request') : 'Continue') + ' ' + ARW;
  $('cx-err').textContent = '';
}
function hint(name, msg){ var h = form.querySelector('.fx-step.on [data-hint="' + name + '"]') || form.querySelector('[data-hint="' + name + '"]'); if (h) h.textContent = msg || ''; var f = h && h.closest('.fx-f, .fx-group'); if (f) f.classList.toggle('bad', !!msg); }
function clearHints(){ form.querySelectorAll('.fx-hint').forEach(function(h){ h.textContent = ''; }); form.querySelectorAll('.bad').forEach(function(n){ n.classList.remove('bad'); }); }
function val(n){ var i = form.elements[n]; return i && !i.disabled ? String(i.value || '').trim() : ''; }
function vals(n){ return Array.prototype.slice.call(form.querySelectorAll('input[name="' + n + '"]:checked')).filter(function(i){ return !i.disabled; }).map(function(i){ return i.value; }); }
function normUrl(v){ v = v.trim(); if (!v) return ''; return v.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, ''); }
function validate(n){
  clearHints(); var bad = [];
  function need(name, ok, msg){ if (!ok){ hint(name, msg); bad.push(name); } }
  if (n === 1){
    need('name', val('name').length >= 2, 'Please add your name.');
    need('email', EMAIL_RE.test(val('email')), 'That email doesn’t look right.');
    if (intent !== 'question'){
      var ph = val('phone').replace(/[^\d]/g, '');
      need('phone', ph.length >= 6 && ph.length <= 14, 'Add a number we can call or WhatsApp.');
      need('company', val('company').length >= 2, 'Which brand is this for?');
      var w = normUrl(val('website')); need('website', !w || /^[^\s/]+\.[a-z]{2,}(\/\S*)?$/i.test(w), 'Add a link like yourbrand.in, or leave it empty.');
    } else need('message', val('message_q').length >= 5, 'Tell us what you’d like to know.');
  }
  if (n === 2){
    need('creatives', vals('creatives').length > 0, 'Pick at least one.');
    if (intent === 'agency') need('brands_count', vals('brands_count').length > 0, 'Pick one.');
  }
  if (n === steps() && !form.consent.checked){ bad.push('consent'); $('cx-err').textContent = 'Please tick the box so we can get in touch.'; }
  if (bad.length){ var f = form.querySelector('.fx-step.on .bad input, .fx-step.on .bad select, .fx-step.on .bad textarea'); if (f) f.focus(); }
  return !bad.length;
}
function draft(){ var d = {}; Array.prototype.forEach.call(form.elements, function(i){ if (!i.name || i.name === 'fax' || i.name === 'consent') return; if (i.type === 'checkbox' || i.type === 'radio'){ if (i.checked){ if (i.type === 'checkbox'){ (d[i.name] = d[i.name] || []).push(i.value); } else d[i.name] = i.value; } } else if (i.value) d[i.name] = i.value; }); return d; }
function fill(d){ Object.keys(d || {}).forEach(function(k){ var els = form.querySelectorAll('[name="' + k + '"]'); els.forEach(function(i){ if (i.type === 'checkbox') i.checked = [].concat(d[k]).indexOf(i.value) > -1; else if (i.type === 'radio'){ if (k !== 'intent') i.checked = i.value === d[k]; } else i.value = d[k]; }); }); }
form.addEventListener('input', function(e){ var f = e.target.closest('.bad'); if (f){ f.classList.remove('bad'); var h = f.querySelector('.fx-hint'); if (h) h.textContent = ''; } store('fs-lead-draft', draft()); });
form.addEventListener('change', function(e){ if (e.target.name === 'intent'){ setIntent(e.target.value); } if (e.target.name === 'consent' && e.target.checked) $('cx-err').textContent = ''; store('fs-lead-draft', draft()); });
$('cx-back').addEventListener('click', function(){ setStep(step - 1); });
form.addEventListener('submit', function(e){
  e.preventDefault();
  if (!validate(step)) return;
  if (step < steps()){ setStep(step + 1); var f = form.querySelector('.fx-step.on input, .fx-step.on select'); if (f) f.focus({ preventScroll: true }); form.closest('.fx-main').scrollTop = 0; return; }
  var times = (store('fs-lead-times') || []).filter(function(t){ return Date.now() - t < 6e5; });
  if (times.length >= 4){ $('cx-err').innerHTML = 'You’ve sent a few requests already, so we’ll be in touch soon. Anything urgent? Email <a href="mailto:' + esc(SALES) + '">' + esc(SALES) + '</a>.'; return; }
  var cc = val('cc'), ph = val('phone');
  var rec = {
    ref: newRef(), intent: intent, source: src || 'direct',
    name: val('name'), email: val('email').toLowerCase(),
    phone: intent === 'question' || !ph ? null : cc + ' ' + ph,
    company: (intent === 'question' ? val('company_q') : val('company')) || null,
    website: normUrl(val('website')) || null, role: val('role') || null,
    creatives: intent === 'question' ? [] : vals('creatives'),
    volume: vals('volume')[0] || null, budget: vals('budget')[0] || null, timeline: vals('timeline')[0] || null,
    contact_pref: vals('contact_pref')[0] || null, brands_count: vals('brands_count')[0] || null,
    message: (intent === 'question' ? val('message_q') : val('message')) || null,
    consent: true, page: location.pathname + location.hash.replace(/^#(contact-us|signin|signup)$/, ''),
    referrer: store('fs-ref') || null, utm: store('fs-utm') || {}, user_agent: navigator.userAgent.slice(0, 300)
  };
  if (form.fax.value || Date.now() - openedAt < 1500){ done(rec, { ok: true }); return; }   /* bots get a quiet thank-you */
  var go = $('cx-go'); go.disabled = true; go.classList.add('busy'); go.innerHTML = '<i class="fx-spin" aria-hidden="true"></i> Sending';
  saveLead(rec).then(function(r){
    times.push(Date.now()); store('fs-lead-times', times); store('fs-lead-draft', null);
    store('fs-last-lead', { name: rec.name, email: rec.email, company: rec.company, phone: rec.phone });
    if (r.mail) location.href = mailLead(rec);
    done(rec, r);
  }, function(err){
    $('cx-err').innerHTML = esc(err.message) + ' You can also email <a href="' + esc(mailLead(rec)) + '">' + esc(SALES) + '</a> and your details will be filled in.';
  }).then(function(){ go.disabled = false; go.classList.remove('busy'); setStep(step); });
});
function done(rec, r){
  var signedIn = !!session;
  $('cx-done').innerHTML = '<div class="fx-done-in"><span class="fx-ok">' + CHK + '</span>'
    + '<h3>Thanks, ' + esc(first(rec.name)) + '. ' + (r.mail ? 'One last step.' : 'We’ve got it.') + '</h3>'
    + (r.mail
      ? '<p>Your email app has opened with your request filled in. Press send and we’ll reply ' + esc(REPLY) + '. Nothing opened? <a href="' + esc(mailLead(rec)) + '">Open it again</a> or write to <a href="mailto:' + esc(SALES) + '">' + esc(SALES) + '</a>.</p>'
      : '<p>We’ll reply ' + esc(REPLY) + (rec.contact_pref ? ' by ' + esc(rec.contact_pref.toLowerCase() === 'call' ? 'phone' : rec.contact_pref) : '') + '. A copy of this request is saved with your reference number.</p>')
    + '<dl class="fx-ref"><div><dt>Reference</dt><dd>' + esc(rec.ref) + '</dd></div>' + (rec.company ? '<div><dt>Brand</dt><dd>' + esc(rec.company) + '</dd></div>' : '') + (rec.creatives.length ? '<div><dt>Creatives</dt><dd>' + esc(rec.creatives.join(', ')) + '</dd></div>' : '') + '</dl>'
    + '<div class="fx-actions"><a class="btn ghost" href="#work" data-close>See our work</a>' + (signedIn ? '<button type="button" class="btn" data-close>Done</button>' : '<button type="button" class="btn" data-cta="signup" data-src="lead-done">Create your account ' + ARW + '</button>') + '</div></div>';
  form.hidden = true; $('cx-done').hidden = false; cx.classList.add('is-done');
  var b = $('cx-done').querySelector('.btn:last-child'); if (b) b.focus();
}
function openContact(kind, o){
  o = o || {};
  if (kind === 'talk'){ kind = 'project'; o.contact_pref = o.contact_pref || 'Call'; }
  src = o.src || ''; openedAt = Date.now();
  form.reset(); form.hidden = false; $('cx-done').hidden = true; cx.classList.remove('is-done');
  var m = meta(), last = store('fs-last-lead') || {};
  fill(store('fs-lead-draft') || {});
  ['name', 'email', 'company', 'phone'].forEach(function(k){ var i = form.elements[k]; if (i && !i.value){ var v = m[k] || last[k] || ''; if (k === 'phone') v = String(v).replace(/^\+\d+\s*/, ''); i.value = v; } });
  if (o.website) form.website.value = normUrl(o.website);
  if (o.company){ form.company.value = o.company; form.company_q.value = o.company; }
  if (o.contact_pref) form.querySelectorAll('input[name=contact_pref]').forEach(function(r){ r.checked = r.value === o.contact_pref; });
  step = 1; setIntent(kind); clearHints();
  show(cx);
  setTimeout(function(){ var f = Array.prototype.filter.call(form.querySelectorAll('.fx-step.on input:not([type=checkbox]):not([type=radio]), .fx-step.on textarea'), function(i){ return !i.disabled && !i.value && i.offsetParent; })[0]; if (f) f.focus({ preventScroll: true }); }, 60);
}

/* ============================================================ ACCOUNTS */
var au = document.createElement('dialog');
au.className = 'fx-dlg fx-auth'; au.id = 'au'; au.setAttribute('aria-labelledby', 'au-t'); au.setAttribute('data-lenis-prevent', '');
function pw(name, label, ac){ return field(name, label, '<span class="fx-pw"><input name="' + name + '" type="password" autocomplete="' + ac + '" minlength="8" maxlength="72" required><button type="button" class="fx-eyeb" aria-label="Show password" aria-pressed="false">' + EYE + '</button></span>', { req: 1, wide: 1 }); }
au.innerHTML = '<div class="fx-card fx-card-sm">'
  + '<button type="button" class="fx-x" aria-label="Close" data-close>' + XIC + '</button>'
  + '<div class="au-top"><img src="assets/brand/fastrr-studio-logo.svg" alt="Fastrr Studio" width="120" height="42"><h2 id="au-t"></h2><p id="au-p"></p></div>'
  + '<div class="fx-tabs" role="tablist"><button type="button" role="tab" data-v="signin">Sign in</button><button type="button" role="tab" data-v="signup">Create account</button></div>'
  + (LIVE ? '' : '<p class="au-note">Accounts are opening to brands in batches. Create yours and we’ll email your invite, usually ' + esc(REPLY) + '.</p>')
  + (LIVE && C.googleSignIn ? '<div class="au-oauth" data-v="signin signup"><button type="button" class="btn ghost au-g" id="au-g">' + GOOG + ' Continue with Google</button><span class="au-or">or with email</span></div>' : '')
  + '<form class="fx-form" data-v="signin" novalidate><div class="fx-grid">' + field('email', 'Email', '<input name="email" type="email" autocomplete="email" required>', { req: 1, wide: 1 }) + pw('password', 'Password', 'current-password') + '</div>'
  + '<button type="button" class="au-link" data-go="forgot">Forgot your password?</button><p class="fx-err" role="alert"></p><button type="submit" class="btn wide">Sign in ' + ARW + '</button></form>'
  + '<form class="fx-form" data-v="signup" novalidate><div class="fx-grid">' + field('name', 'Full name', '<input name="name" autocomplete="name" maxlength="120" required>', { req: 1 }) + field('company', 'Brand or company', '<input name="company" autocomplete="organization" maxlength="160" required>', { req: 1 })
  + field('email', 'Work email', '<input name="email" type="email" autocomplete="email" required>', { req: 1, wide: 1 }) + pw('password', 'Password', 'new-password') + '</div>'
  + '<div class="au-meter" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="au-mtxt">At least 8 characters, with a number.</span>'
  + '<label class="fx-consent"><input type="checkbox" name="consent"><span>I agree to be contacted by Fastrr Studio about my account.</span></label><p class="fx-err" role="alert"></p><button type="submit" class="btn wide">Create account ' + ARW + '</button></form>'
  + '<form class="fx-form" data-v="forgot" novalidate><div class="fx-grid">' + field('email', 'Email', '<input name="email" type="email" autocomplete="email" required>', { req: 1, wide: 1 }) + '</div><p class="fx-err" role="alert"></p><button type="submit" class="btn wide">Send reset link ' + ARW + '</button><button type="button" class="au-link" data-go="signin">Back to sign in</button></form>'
  + '<form class="fx-form" data-v="reset" novalidate><div class="fx-grid">' + pw('password', 'New password', 'new-password') + pw('password2', 'Type it again', 'new-password') + '</div><p class="fx-err" role="alert"></p><button type="submit" class="btn wide">Save new password ' + ARW + '</button></form>'
  + '<div class="au-msg" data-v="sent"><span class="fx-ok">' + MAIL + '</span><p id="au-sent"></p><button type="button" class="btn ghost wide" id="au-resend">Send it again</button><button type="button" class="au-link" data-go="signin">Back to sign in</button></div>'
  + '<div class="au-msg" data-v="invited"><span class="fx-ok">' + CHK + '</span><p id="au-inv"></p><button type="button" class="btn wide" data-cta="project" data-src="signup-invite">Tell us what you need ' + ARW + '</button></div>'
  + '<div class="au-switch" data-v="signin signup"></div>'
  + '</div>';
document.body.appendChild(au); onClose(au);
var VIEWS = {
  signin: ['Welcome back.', 'Sign in to see your library, requests and downloads.'],
  signup: ['Create your account.', 'One account for every brand, every creative and every download.'],
  forgot: ['Reset your password.', 'We’ll email you a link to choose a new one.'],
  reset: ['Choose a new password.', 'Make it at least 8 characters, with a number.'],
  sent: ['Check your inbox.', ''],
  invited: ['You’re on the list.', '']
};
var view = 'signin', lastEmail = '';
function setView(v){
  view = v; au.setAttribute('data-view', v);
  $('au-t').textContent = VIEWS[v][0]; $('au-p').textContent = VIEWS[v][1];
  au.querySelectorAll('[data-v]').forEach(function(n){ if (n.getAttribute('role') === 'tab'){ var on = n.getAttribute('data-v') === v; n.setAttribute('aria-selected', on); n.classList.toggle('on', on); return; } n.hidden = n.getAttribute('data-v').split(' ').indexOf(v) < 0; });
  au.querySelector('.fx-tabs').hidden = !(v === 'signin' || v === 'signup');
  var sw = au.querySelector('.au-switch');
  sw.innerHTML = v === 'signin' ? 'New to Fastrr Studio? <button type="button" class="au-link" data-go="signup">Create an account</button>' : 'Already have an account? <button type="button" class="au-link" data-go="signin">Sign in</button>';
  au.querySelectorAll('.fx-err').forEach(function(e){ e.textContent = ''; });
  var f = au.querySelector('form[data-v="' + v + '"]');
  if (f){ if (f.email && !f.email.value && lastEmail) f.email.value = lastEmail; setTimeout(function(){ var i = Array.prototype.filter.call(f.querySelectorAll('input'), function(x){ return !x.value && x.type !== 'checkbox'; })[0] || f.querySelector('input'); if (i) i.focus({ preventScroll: true }); }, 40); }
}
function openAuth(v, o){ o = o || {}; au.querySelectorAll('form').forEach(function(f){ f.reset(); }); var m = store('fs-last-lead') || {}; var su = au.querySelector('form[data-v=signup]'); su.name.value = m.name || ''; su.company.value = m.company || ''; lastEmail = o.email || m.email || lastEmail; meter(''); setView(v); show(au); }
au.addEventListener('click', function(e){
  var g = e.target.closest('[data-go]'); if (g){ var f = au.querySelector('form[data-v="' + view + '"]'); if (f && f.email && f.email.value) lastEmail = f.email.value.trim(); setView(g.getAttribute('data-go')); return; }
  var t = e.target.closest('[role=tab]'); if (t){ setView(t.getAttribute('data-v')); return; }
  var eye = e.target.closest('.fx-eyeb'); if (eye){ var i = eye.previousElementSibling, on = i.type === 'password'; i.type = on ? 'text' : 'password'; eye.setAttribute('aria-pressed', on); eye.setAttribute('aria-label', on ? 'Hide password' : 'Show password'); }
});
if ($('au-g')) $('au-g').addEventListener('click', Auth.google);
function strength(p){ var s = 0; if (p.length >= 8) s++; if (/\d/.test(p)) s++; if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++; if (/[^\w\s]/.test(p) || p.length >= 14) s++; return s; }
function meter(p){ var s = p ? strength(p) : 0, m = au.querySelector('.au-meter'); m.setAttribute('data-s', s); au.querySelector('.au-mtxt').textContent = !p ? 'At least 8 characters, with a number.' : ['Too short', 'Weak: add a number', 'Good', 'Strong', 'Very strong'][s]; }
au.querySelector('form[data-v=signup]').password.addEventListener('input', function(e){ meter(e.target.value); });
function busy(f, on, label){ var b = f.querySelector('button[type=submit]'); if (on){ b.setAttribute('data-l', b.innerHTML); b.disabled = true; b.innerHTML = '<i class="fx-spin" aria-hidden="true"></i> ' + label; } else if (b.getAttribute('data-l')){ b.disabled = false; b.innerHTML = b.getAttribute('data-l'); } }
function err(f, m){ f.querySelector('.fx-err').innerHTML = m; }
function bad(f, name, m){ var i = f.elements[name], l = i && i.closest('.fx-f'); if (l){ l.classList.add('bad'); l.querySelector('.fx-hint').textContent = m; i.focus(); } return false; }
au.addEventListener('input', function(e){ var l = e.target.closest('.bad'); if (l){ l.classList.remove('bad'); l.querySelector('.fx-hint').textContent = ''; } });
au.addEventListener('submit', function(e){
  e.preventDefault(); var f = e.target, v = f.getAttribute('data-v'); err(f, '');
  var email = f.email ? f.email.value.trim().toLowerCase() : '';
  if (f.email && !EMAIL_RE.test(email)) return bad(f, 'email', 'That email doesn’t look right.');
  if (f.email) lastEmail = email;
  if (v === 'signin'){
    if (!f.password.value) return bad(f, 'password', 'Enter your password.');
    if (!LIVE){ err(f, 'Sign-in opens once your invite arrives. New here? <button type="button" class="au-link" data-go="signup">Request an account</button>.'); return; }
    busy(f, true, 'Signing in');
    Auth.signIn(email, f.password.value).then(function(){ hide(au); toast('Signed in. Welcome back, ' + (first(meta().name) || 'friend') + '.'); }, function(x){ err(f, esc(x.message) + (/confirm/i.test(x.message) ? ' <button type="button" class="au-link" id="au-re2">Resend the link</button>' : '')); var r = $('au-re2'); if (r) r.onclick = function(){ Auth.resend(email).then(function(){ setSent('confirm'); }); }; }).then(function(){ busy(f, false); });
  }
  if (v === 'signup'){
    var name = f.name.value.trim(), company = f.company.value.trim(), p = f.password.value;
    if (name.length < 2) return bad(f, 'name', 'Please add your name.');
    if (company.length < 2) return bad(f, 'company', 'Which brand is this for?');
    if (p.length < 8 || !/\d/.test(p)) return bad(f, 'password', 'At least 8 characters, with a number.');
    if (!f.consent.checked){ err(f, 'Please tick the box to continue.'); return; }
    var rec = { ref: newRef(), intent: 'signup', source: 'signup', name: name, email: email, company: company, creatives: [], consent: true, page: location.pathname, referrer: store('fs-ref') || null, utm: store('fs-utm') || {}, user_agent: navigator.userAgent.slice(0, 300) };
    store('fs-last-lead', { name: name, email: email, company: company });
    busy(f, true, 'Creating your account');
    if (!LIVE){ location.href = mailLead(rec); $('au-inv').innerHTML = 'Your email app has opened with your details. Press send and we’ll email your invite to <b>' + esc(email) + '</b>. While you wait, tell us what you’d like made first.'; busy(f, false); setView('invited'); return; }
    Auth.signUp(email, p, { name: name, company: company }).then(function(r){
      saveLead(rec).catch(function(){});
      if (r.signedIn){ hide(au); toast('Your account is ready, ' + first(name) + '.'); } else setSent('confirm');
    }, function(x){ err(f, esc(x.message) + (/sign in instead/i.test(x.message) ? ' <button type="button" class="au-link" data-go="signin">Sign in</button>' : '')); }).then(function(){ busy(f, false); });
  }
  if (v === 'forgot'){
    if (!LIVE){ err(f, 'Write to <a href="mailto:' + esc(SALES) + '?subject=Password%20reset">' + esc(SALES) + '</a> and we’ll reset it for you.'); return; }
    busy(f, true, 'Sending');
    Auth.recover(email).then(function(){ setSent('reset'); }, function(x){ err(f, esc(x.message)); }).then(function(){ busy(f, false); });
  }
  if (v === 'reset'){
    var a = f.password.value, b = f.password2.value;
    if (a.length < 8 || !/\d/.test(a)) return bad(f, 'password', 'At least 8 characters, with a number.');
    if (a !== b) return bad(f, 'password2', 'These don’t match.');
    busy(f, true, 'Saving');
    Auth.setPassword(a).then(function(){ hide(au); toast('Password saved. You’re signed in.'); }, function(x){ err(f, esc(x.message)); }).then(function(){ busy(f, false); });
  }
});
var sentKind = 'confirm';
function setSent(kind){ sentKind = kind; $('au-sent').innerHTML = (kind === 'reset' ? 'If there’s an account for <b>' + esc(lastEmail) + '</b>, a reset link is on its way.' : 'We sent a confirmation link to <b>' + esc(lastEmail) + '</b>. Open it to finish setting up your account.') + ' It can take a minute, and sometimes lands in spam.'; setView('sent'); }
$('au-resend').addEventListener('click', function(){ var b = this; b.disabled = true; (sentKind === 'reset' ? Auth.recover(lastEmail) : Auth.resend(lastEmail)).then(function(){ b.textContent = 'Sent again'; }, function(x){ b.textContent = x.message; }).then(function(){ setTimeout(function(){ b.disabled = false; b.textContent = 'Send it again'; }, 30000); }); });

/* ------------------------------------------------------------ the header account menu */
var acct = $('acct');
function renderAcct(){
  if (!acct) return;
  var on = !!session;
  acct.hidden = !on; var si = $('hd-signin'); if (si) si.hidden = on;
  document.querySelectorAll('[data-auth-out]').forEach(function(n){ n.hidden = on; });
  if (!on){ acct.innerHTML = ''; return; }
  var m = meta();
  acct.innerHTML = '<button type="button" class="acct-b" aria-haspopup="menu" aria-expanded="false"><i>' + esc(initials(m.name, m.email)) + '</i><span>' + esc(first(m.name) || m.email.split('@')[0]) + '</span></button>'
    + '<div class="acct-m" role="menu" hidden><div class="acct-h"><b>' + esc(m.name || 'Your account') + '</b><span>' + esc(m.email) + '</span></div>'
    + '<button type="button" role="menuitem" data-cta="project" data-src="account-menu">Start a project</button>'
    + '<button type="button" role="menuitem" data-act="requests">My requests</button>'
    + '<a role="menuitem" href="leads.html" data-staff hidden>Sales dashboard</a>'
    + '<button type="button" role="menuitem" data-act="signout">Sign out</button></div>';
  isStaff().then(function(s){ var a = acct.querySelector('[data-staff]'); if (a) a.hidden = !s; });
}
if (acct){
  acct.addEventListener('click', function(e){
    var b = e.target.closest('.acct-b'), m = acct.querySelector('.acct-m');
    if (b){ var o = m.hidden; m.hidden = !o; b.setAttribute('aria-expanded', o); return; }
    var a = e.target.closest('[data-act]'); if (m) m.hidden = true;
    if (a && a.getAttribute('data-act') === 'signout'){ Auth.signOut(); toast('You’re signed out.'); }
    if (a && a.getAttribute('data-act') === 'requests') openRequests();
  });
  document.addEventListener('click', function(e){ var m = acct.querySelector('.acct-m'); if (m && !m.hidden && !acct.contains(e.target)){ m.hidden = true; acct.querySelector('.acct-b').setAttribute('aria-expanded', 'false'); } });
}

/* ------------------------------------------------------------ "My requests": what a signed-in visitor has sent us */
var mr = document.createElement('dialog');
mr.className = 'fx-dlg fx-auth'; mr.id = 'mr'; mr.setAttribute('aria-labelledby', 'mr-t'); mr.setAttribute('data-lenis-prevent', '');
mr.innerHTML = '<div class="fx-card fx-card-sm"><button type="button" class="fx-x" aria-label="Close" data-close>' + XIC + '</button><div class="au-top"><h2 id="mr-t">Your requests</h2><p>Everything you’ve sent us, and where it stands.</p></div><div id="mr-list" class="mr-list"></div><button type="button" class="btn wide" data-cta="project" data-src="my-requests">Start a new request ' + ARW + '</button></div>';
document.body.appendChild(mr); onClose(mr);
var STATUS = { new: 'Received', contacted: 'In touch', qualified: 'In review', proposal: 'Proposal sent', won: 'In production', lost: 'Closed', spam: 'Closed' };
function openRequests(){
  var L = $('mr-list'); L.innerHTML = '<p class="mr-empty"><i class="fx-spin"></i> Loading</p>'; show(mr);
  token().then(function(t){
    if (!t) throw new Error('Please sign in again.');
    return api('/rest/v1/leads?select=ref,created_at,intent,company,creatives,status&user_id=eq.' + encodeURIComponent(session.user.id) + '&order=created_at.desc&limit=50', { token: t });
  }).then(function(rows){
    L.innerHTML = rows && rows.length ? rows.map(function(r){ return '<div class="mr-row"><div><b>' + esc(r.company || (r.intent === 'question' ? 'Question' : 'Request')) + '</b><span>' + esc(r.ref || '') + ' · ' + new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + '</span>' + (r.creatives && r.creatives.length ? '<small>' + esc(r.creatives.join(', ')) + '</small>' : '') + '</div><em data-st="' + esc(r.status) + '">' + esc(STATUS[r.status] || r.status) + '</em></div>'; }).join('') : '<p class="mr-empty">Nothing yet. Start a request and it will show up here.</p>';
  }).catch(function(x){ L.innerHTML = '<p class="mr-empty">' + esc(x.message) + '</p>'; });
}

/* ------------------------------------------------------------ wiring: every [data-cta] on the page, plus deep links */
function open(kind, o){
  o = o || {};
  document.querySelectorAll('dialog.fx-dlg[open]').forEach(function(d){ if (d.close) d.close(); });
  var menu = document.getElementById('menu'); if (menu && menu.classList.contains('open')){ var mb = document.getElementById('menu-btn'); if (mb) mb.click(); }
  if (kind === 'signin' || kind === 'signup'){ if (session && kind === 'signin'){ openRequests(); return; } openAuth(kind, o); return; }
  openContact(kind, o);
}
document.addEventListener('click', function(e){
  var a = e.target.closest('[data-cta]'); if (!a) return;
  e.preventDefault();
  open(a.getAttribute('data-cta'), { src: a.getAttribute('data-src') || '', website: a.getAttribute('data-website') || '', company: a.getAttribute('data-company') || '' });
});
document.querySelectorAll('a[data-mail]').forEach(function(a){ a.href = 'mailto:' + SALES; a.textContent = SALES; });

function fromHash(){
  var h = location.hash.slice(1);
  if (/access_token=|error_description=/.test(h)){
    var q = new URLSearchParams(h); history.replaceState(null, '', location.pathname + location.search);
    if (q.get('error_description')){ openAuth('signin'); err(au.querySelector('form[data-v=signin]'), esc(q.get('error_description').replace(/\+/g, ' ')) + '. Try again or ask for a new link.'); return; }
    var s = { access_token: q.get('access_token'), refresh_token: q.get('refresh_token'), expires_at: +q.get('expires_at') || Math.floor(Date.now() / 1000) + (+q.get('expires_in') || 3600), user: null };
    if (!LIVE) return;
    api('/auth/v1/user', { token: s.access_token }).then(function(u){
      s.user = u; setSession(s);
      var type = q.get('type');
      if (type === 'recovery'){ openAuth('reset'); return; }
      toast(type === 'signup' ? 'Email confirmed. Welcome to Fastrr Studio, ' + (first(meta().name) || 'friend') + '.' : 'You’re signed in.');
    }, function(){ openAuth('signin'); });
    return;
  }
  if (h === 'contact-us') open('project', { src: 'link' });
  if (h === 'signin' || h === 'signup') open(h, { src: 'link' });
}
addEventListener('hashchange', fromHash);
renderAcct();
if (session) token();
fromHash();

window.FS = { open: open, auth: Auth, api: api, token: token, live: LIVE, session: function(){ return session; }, isStaff: isStaff, esc: esc, config: C };
})();
