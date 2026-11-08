/* Fastrr Studio: sales dashboard. Reads and updates public.leads as a signed-in staff member (RLS enforces it). */
(function(){
'use strict';
var FS = window.FS, esc = FS.esc;
function $(id){ return document.getElementById(id); }
var ST = [['new', 'New'], ['contacted', 'Contacted'], ['qualified', 'Qualified'], ['proposal', 'Proposal sent'], ['won', 'Won'], ['lost', 'Lost'], ['spam', 'Spam']];
var STL = {}; ST.forEach(function(s){ STL[s[0]] = s[1]; });
var INT = { project: 'Project', agency: 'Agency', question: 'Question', signup: 'Sign-up' };
var rows = [], cur = null;
ST.forEach(function(s){ var o = document.createElement('option'); o.value = s[0]; o.textContent = s[1]; $('f-status').appendChild(o); });

function when(d){ d = new Date(d); var m = (Date.now() - d) / 6e4; if (m < 1) return 'just now'; if (m < 60) return Math.round(m) + ' min ago'; if (m < 1440) return Math.round(m / 60) + ' h ago'; if (m < 10080) return Math.round(m / 1440) + ' d ago'; return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); }
function full(d){ return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }); }
function digits(p){ return String(p || '').replace(/[^\d]/g, ''); }

function gate(t, p, act){ $('ld-app').hidden = true; $('ld-gate').hidden = false; $('gate-t').textContent = t; $('gate-p').textContent = p; $('gate-act').innerHTML = act || ''; }
function boot(){
  if (!FS.live){ gate('Connect the database first', 'Add your Supabase URL and anon key to assets/js/config.js, then run supabase/schema.sql. The steps are in docs/LEADS-AND-ACCOUNTS.md.'); return; }
  var s = FS.session();
  renderMe();
  if (!s){ gate('Sales dashboard', 'Sign in with your team email to see and manage leads.', '<button type="button" class="btn wide" data-cta="signin">Sign in</button>'); return; }
  FS.isStaff().then(function(ok){
    if (!ok){ gate('No access yet', 'You’re signed in as ' + s.user.email + ', which isn’t on the sales team list. Ask an admin to add it to the staff table.', '<button type="button" class="btn ghost wide" id="g-out">Sign in with another account</button>'); $('g-out').onclick = function(){ FS.auth.signOut(); boot(); }; return; }
    $('ld-gate').hidden = true; $('ld-app').hidden = false; load();
  });
}
function renderMe(){ var s = FS.session(); $('ld-me').innerHTML = s ? '<span>' + esc(s.user.email) + '</span><button type="button" class="btn ghost sm" id="me-out">Sign out</button>' : ''; if (s) $('me-out').onclick = function(){ FS.auth.signOut(); boot(); }; }
/* studio.js re-renders after sign-in; watch the session so the page follows */
var lastTok = null; setInterval(function(){ var s = FS.session(), t = s && s.access_token; if (t !== lastTok){ var first = lastTok === null && !t; lastTok = t; if (!first) boot(); } }, 700);

function load(){
  $('ld-rows').innerHTML = '<tr><td colspan="7" class="ld-load"><i class="fx-spin"></i> Loading leads</td></tr>';
  FS.token().then(function(t){ return FS.api('/rest/v1/leads?select=*&order=created_at.desc&limit=2000', { token: t }); })
    .then(function(r){ rows = r || []; render(); }, function(e){ $('ld-rows').innerHTML = '<tr><td colspan="7" class="ld-load">' + esc(e.message) + '</td></tr>'; });
}
function filtered(){
  var q = $('f-q').value.trim().toLowerCase(), st = $('f-status').value, it = $('f-intent').value, wd = +$('f-when').value;
  var since = wd ? (wd === 1 ? new Date().setHours(0, 0, 0, 0) : Date.now() - wd * 864e5) : 0;
  return rows.filter(function(r){
    if (st && r.status !== st) return false;
    if (it && r.intent !== it) return false;
    if (since && new Date(r.created_at) < since) return false;
    if (q && [r.name, r.company, r.email, r.phone, r.ref, r.website, r.message].join(' ').toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
}
function stats(){
  var wk = Date.now() - 7 * 864e5, n = function(f){ return rows.filter(f).length; };
  var items = [['Total leads', rows.length], ['New, not contacted', n(function(r){ return r.status === 'new'; })], ['This week', n(function(r){ return new Date(r.created_at) > wk; })], ['In pipeline', n(function(r){ return ['contacted', 'qualified', 'proposal'].indexOf(r.status) > -1; })], ['Won', n(function(r){ return r.status === 'won'; })]];
  $('ld-stats').innerHTML = items.map(function(i){ return '<div><span>' + i[0] + '</span><b>' + i[1] + '</b></div>'; }).join('');
}
function render(){
  stats(); var list = filtered();
  $('ld-empty').hidden = list.length > 0;
  $('ld-rows').innerHTML = list.map(function(r){
    return '<tr data-id="' + esc(r.id) + '" tabindex="0"><td><b>' + esc(when(r.created_at)) + '</b><small>' + esc(r.ref || '') + '</small></td>'
      + '<td><b>' + esc(r.name) + '</b><small>' + esc(r.email) + (r.phone ? ' · ' + esc(r.phone) : '') + '</small></td>'
      + '<td><b>' + esc(r.company || '—') + '</b><small>' + esc(r.website || INT[r.intent] || '') + '</small></td>'
      + '<td><span class="ld-int" data-i="' + esc(r.intent) + '">' + esc(INT[r.intent] || r.intent) + '</span><small>' + esc((r.creatives || []).slice(0, 3).join(', ') + ((r.creatives || []).length > 3 ? ' +' + (r.creatives.length - 3) : '')) + '</small></td>'
      + '<td>' + esc(r.budget || '—') + '</td><td>' + esc(r.timeline || '—') + '</td>'
      + '<td><span class="ld-st" data-s="' + esc(r.status) + '">' + esc(STL[r.status] || r.status) + '</span></td></tr>';
  }).join('');
}
['f-q', 'f-status', 'f-intent', 'f-when'].forEach(function(id){ $(id).addEventListener('input', render); });
$('f-refresh').addEventListener('click', load);
$('ld-rows').addEventListener('click', function(e){ var tr = e.target.closest('tr[data-id]'); if (tr) openLead(tr.getAttribute('data-id')); });
$('ld-rows').addEventListener('keydown', function(e){ if (e.key === 'Enter'){ var tr = e.target.closest('tr[data-id]'); if (tr) openLead(tr.getAttribute('data-id')); } });

function row(k, v){ return v ? '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>' : ''; }
function openLead(id){
  var r = rows.filter(function(x){ return x.id === id; })[0]; if (!r) return; cur = r;
  var ph = digits(r.phone), utm = r.utm && Object.keys(r.utm).length ? Object.keys(r.utm).map(function(k){ return esc(k) + ': ' + esc(r.utm[k]); }).join('<br>') : '';
  $('ld-dr').innerHTML = '<button type="button" class="fx-x" id="dr-x" aria-label="Close">×</button>'
    + '<span class="ld-int" data-i="' + esc(r.intent) + '">' + esc(INT[r.intent] || r.intent) + '</span>'
    + '<h2 id="dr-t">' + esc(r.name) + '</h2><p class="ld-sub">' + esc(r.company || '') + (r.role ? ' · ' + esc(r.role) : '') + '</p>'
    + '<div class="ld-quick"><a class="btn sm" href="mailto:' + esc(r.email) + '?subject=' + encodeURIComponent('Your Fastrr Studio request ' + (r.ref || '')) + '">Email</a>'
    + (ph ? '<a class="btn ghost sm" href="tel:+' + ph + '">Call</a><a class="btn ghost sm" href="https://wa.me/' + ph + '" target="_blank" rel="noopener">WhatsApp</a>' : '')
    + (r.website ? '<a class="btn ghost sm" href="https://' + esc(r.website.replace(/^https?:\/\//, '')) + '" target="_blank" rel="noopener noreferrer">Website</a>' : '') + '</div>'
    + '<div class="ld-pipe"><label><span>Status</span><select id="dr-status">' + ST.map(function(s){ return '<option value="' + s[0] + '"' + (s[0] === r.status ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('') + '</select></label>'
    + '<label><span>Owner</span><input id="dr-owner" maxlength="120" value="' + esc(r.owner || '') + '" placeholder="Who’s on it"></label>'
    + '<label class="wide"><span>Notes</span><textarea id="dr-notes" rows="4" maxlength="8000" placeholder="Calls, next steps, quotes">' + esc(r.notes || '') + '</textarea></label>'
    + '<div class="wide ld-save"><span id="dr-msg" role="status"></span><button type="button" class="btn sm" id="dr-save">Save</button></div></div>'
    + '<dl class="fx-ref">' + row('Reference', esc(r.ref)) + row('Received', esc(full(r.created_at))) + row('Email', esc(r.email)) + row('Phone', esc(r.phone)) + row('Website', esc(r.website))
    + row('Creatives', esc((r.creatives || []).join(', '))) + row('Brands', esc(r.brands_count)) + row('Volume', esc(r.volume)) + row('Budget', esc(r.budget)) + row('Timeline', esc(r.timeline)) + row('Reach by', esc(r.contact_pref))
    + row('Message', esc(r.message).replace(/\n/g, '<br>')) + row('Clicked', esc(r.source)) + row('Page', esc(r.page)) + row('Came from', esc(r.referrer)) + row('Campaign', utm) + row('Account', r.user_id ? 'Signed in' : '') + '</dl>';
  $('ld-drawer').classList.add('on'); $('ld-drawer').setAttribute('aria-hidden', 'false'); $('ld-scrim').hidden = false; $('ld-drawer').focus();
  $('dr-x').onclick = closeLead; $('dr-save').onclick = save;
}
function closeLead(){ $('ld-drawer').classList.remove('on'); $('ld-drawer').setAttribute('aria-hidden', 'true'); $('ld-scrim').hidden = true; cur = null; }
$('ld-scrim').addEventListener('click', closeLead);
addEventListener('keydown', function(e){ if (e.key === 'Escape' && cur) closeLead(); });
function save(){
  var b = $('dr-save'), body = { status: $('dr-status').value, owner: $('dr-owner').value.trim() || null, notes: $('dr-notes').value.trim() || null };
  b.disabled = true; $('dr-msg').textContent = 'Saving…';
  FS.token().then(function(t){ return FS.api('/rest/v1/leads?id=eq.' + encodeURIComponent(cur.id), { method: 'PATCH', token: t, headers: { Prefer: 'return=representation' }, body: body }); })
    .then(function(r){ var u = r && r[0]; if (!u) throw new Error('Not saved: your account can’t edit leads.'); Object.assign(cur, u); render(); $('dr-msg').textContent = 'Saved'; }, function(e){ $('dr-msg').textContent = e.message; })
    .then(function(){ b.disabled = false; });
}
$('f-csv').addEventListener('click', function(){
  var cols = ['ref', 'created_at', 'status', 'owner', 'intent', 'name', 'email', 'phone', 'company', 'website', 'role', 'creatives', 'brands_count', 'volume', 'budget', 'timeline', 'contact_pref', 'message', 'notes', 'source', 'page', 'referrer', 'utm'];
  var q = function(v){ if (v == null) v = ''; if (Array.isArray(v)) v = v.join('; '); else if (typeof v === 'object') v = JSON.stringify(v); v = String(v); if (/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; };
  var csv = '﻿' + cols.join(',') + '\n' + filtered().map(function(r){ return cols.map(function(c){ return q(r[c]); }).join(','); }).join('\n');
  var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = 'fastrr-leads-' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
});
boot();
})();
