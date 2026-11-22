(() => {
const C = window.SITE, $ = s => document.querySelector(s);
const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const EXT = ['webp', 'jpg', 'jpeg', 'png'];
const PH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="100%" height="100%" fill="#dfe7f1"/><text x="50%" y="55%" font-size="90" text-anchor="middle">🎂</text></svg>');
const wa = m => 'https://wa.me/' + String(C.whatsapp).replace(/\D/g, '') + (m ? '?text=' + encodeURIComponent(m) : '');
const money = n => C.currency + ' ' + n.toLocaleString('bn-BD');

// ---- স্ট্যাটিক অংশ ----
document.title = C.name;
$('#bn').textContent = $('#fn').textContent = C.name;
$('#hl').textContent = C.headline; $('#hd').textContent = C.description; $('#ab').textContent = C.about;
$('#yr').textContent = new Date().getFullYear();
if (C.logo) { const l = $('#logo'); l.src = C.logo; l.alt = C.name; l.hidden = false; }
if (C.hero) { const h = $('#himg'); h.onerror = () => h.remove(); h.src = C.hero; h.alt = C.name; h.hidden = false; }
['#hwa', '#hwa2'].forEach(s => $(s).href = wa(C.greeting + ', আপনাদের কেক সম্পর্কে জানতে চাই।'));
[['ঠিকানা', C.address], ['ফোন', C.phone, 'tel:' + C.phone], ['WhatsApp', C.whatsapp && '+' + C.whatsapp, wa()], ['Facebook', C.facebook, C.facebook]]
  .forEach(([k, v, h]) => { if (!v) return; const li = el('li', '', k + ': '); if (h) { const a = el('a', '', v); a.href = h; a.target = '_blank'; a.rel = 'noopener'; li.append(a); } else li.append(v); $('#ct').append(li); });
$('#mb').onclick = () => { const o = $('#nv').classList.toggle('open'); $('#mb').setAttribute('aria-expanded', o); };
$('#nv').onclick = e => { if (e.target.tagName === 'A') $('#nv').classList.remove('open'); };

// ---- ছবি (শুধু নিজের Product ID বা image কলামের সাথে মিলবে) ----
const cands = p => {
  const d = C.imageDir, im = (p.image || '').trim(); let a = [];
  if (im) { const b = /^(https?:)?\/\//.test(im) || im.includes('/') ? im : d + im; a = /\.\w{3,4}$/.test(im) ? [b] : EXT.map(e => b + '.' + e); }
  EXT.forEach(e => a.push(d + p.id + '.' + e)); return a;
};
const img = (p, eager) => {
  const i = new Image(), c = cands(p); let k = 0;
  i.alt = p.name; i.decoding = 'async'; if (!eager) i.loading = 'lazy';
  i.onerror = () => { k++; if (k < c.length) i.src = encodeURI(c[k]); else { i.onerror = null; i.src = PH; } };
  i.src = encodeURI(c[0]); return i;
};

// ---- Lightbox ----
let L = [], li = 0, tx = 0; const lb = $('#lb');
const show = () => {
  const p = L[li]; $('#lm').replaceChildren(img(p, true)); $('#lc').textContent = p.cap || '';
  const o = $('#lo'); o.hidden = !p.order; if (p.order) o.href = p.order;
};
const openLb = (list, i) => { L = list; li = i; show(); lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lx').focus(); };
const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; };
const step = d => { li = (li + d + L.length) % L.length; show(); };
$('#lx').onclick = closeLb; $('#lp').onclick = () => step(-1); $('#ln').onclick = () => step(1);
lb.onclick = e => { if (e.target === lb) closeLb(); };
lb.addEventListener('touchstart', e => tx = e.changedTouches[0].clientX, { passive: true });
lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });
document.addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });

// ---- রিভিউ ----
const rl = (C.reviews || []).map((src, i) => ({ id: 'review-' + (i + 1), name: 'গ্রাহকের রিভিউ', image: src, cap: 'গ্রাহকের রিভিউ ' + (i + 1) + '/' + C.reviews.length }));
rl.forEach((r, i) => { const b = el('button'); b.setAttribute('aria-label', r.cap); b.append(img(r)); b.onclick = () => openLb(rl, i); $('#rv').append(b); });
if (!rl.length) $('#reviews').remove();

// ---- ডেটা লোড ----
const jsonp = u => new Promise((ok, no) => {
  const n = 'cb' + Date.now(), s = document.createElement('script');
  const t = setTimeout(() => { no(new Error('সময় শেষ: Apps Script লিংক ও "Anyone" অ্যাক্সেস দেখুন')); s.remove(); }, 12000);
  window[n] = d => { clearTimeout(t); ok(d); s.remove(); delete window[n]; };
  s.onerror = () => { clearTimeout(t); no(new Error('jsonp')); s.remove(); };
  s.src = u + (u.includes('?') ? '&' : '?') + 'callback=' + n; document.head.append(s);
});
const fetchData = async () => {
  if (!C.apiUrl) throw new Error('apiUrl সেট করা নেই');
  try { const r = await fetch(C.apiUrl + (C.apiUrl.includes('?') ? '&' : '?') + 't=' + Date.now(), { signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined }); if (!r.ok) throw 0; return await r.json(); }
  catch (e) { return jsonp(C.apiUrl); }
};
const norm = raw => {
  if (!raw || !Array.isArray(raw.products)) throw new Error(raw && raw.error ? raw.error : 'ডেটার ফরম্যাট ঠিক নেই');
  const seen = new Set();
  return raw.products.map(p => {
    const id = String(p.id == null ? '' : p.id).trim();
    if (!id || seen.has(id.toLowerCase()) || !/^true$/i.test(String(p.status).trim())) return null;
    seen.add(id.toLowerCase());
    const n = parseFloat(String(p.price == null ? '' : p.price).replace(/[^\d.]/g, ''));
    return { id, name: String(p.name || '').trim() || 'কেক', cat: String(p.category || '').trim() || 'অন্যান্য',
      price: n > 0 ? n : null, av: /^available$/i.test(String(p.availability).trim()), image: p.image };
  }).filter(Boolean);
};

// ---- রেন্ডার ----
let all = [], cat = 'সব';
const order = p => wa(C.greeting + ',\nআমি এই কেকটি অর্ডার করতে চাই:\nনাম: ' + p.name + '\nProduct ID: ' + p.id + '\nদাম: ' + (p.price ? money(p.price) : 'জানাবেন') + '\nলিংক: ' + C.siteUrl + '?cake=' + encodeURIComponent(p.id) + '#products');
const chips = () => {
  const box = $('#categories'); box.replaceChildren();
  ['সব', ...new Set(all.map(p => p.cat))].forEach(c => {
    const b = el('button', c === cat ? 'on' : '', c); b.onclick = () => { cat = c; chips(); render(); }; box.append(b);
  });
};
const render = () => {
  const q = $('#q').value.trim().toLowerCase(), s = $('#so').value, g = $('#grid'); g.replaceChildren();
  const v = all.filter(p => (cat === 'সব' || p.cat === cat) && p.name.toLowerCase().includes(q));
  if (s === 'av') v.sort((a, b) => b.av - a.av);
  if (s === 'lo') v.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  if (s === 'hi') v.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  $('#st').textContent = v.length ? v.length + 'টি কেক' : (all.length ? 'কোনো কেক পাওয়া যায়নি। অন্য নাম বা ক্যাটাগরি দিয়ে দেখুন।' : 'এখনো কোনো কেক যোগ করা হয়নি।');
  const items = v.map(p => ({ ...p, cap: p.name + (p.av && p.price ? ' · ' + money(p.price) : ''), order: p.av ? order(p) : '' }));
  items.forEach((p, i) => {
    const c = el('article', 'card'), f = el('button', 'ph'), b = el('div', 'cb');
    f.setAttribute('aria-label', p.name + ' বড় করে দেখুন'); f.append(img(p)); f.onclick = () => openLb(items, i);
    b.append(el('small', '', p.cat), el('b', '', p.name));
    if (p.av) { b.append(el('span', 'pr', p.price ? money(p.price) : 'দাম জানতে মেসেজ করুন')); const a = el('a', 'btn', 'অর্ডার করুন'); a.href = p.order; a.target = '_blank'; a.rel = 'noopener'; b.append(a); }
    else b.append(el('span', 'na', 'Not Available'));
    c.append(f, b); g.append(c);
  });
  return items;
};
const load = async () => {
  const st = $('#st'); st.textContent = 'কেক লোড হচ্ছে…'; $('#grid').replaceChildren();
  try {
    all = norm(await fetchData()); chips(); const items = render();
    const id = new URLSearchParams(location.search).get('cake');
    if (id) { const i = items.findIndex(p => p.id.toLowerCase() === id.toLowerCase()); if (i > -1) openLb(items, i); history.replaceState(null, '', location.pathname + '#products'); }
  } catch (e) {
    st.textContent = 'কেকের তালিকা লোড করা যায়নি (' + e.message + '). ইন্টারনেট দেখে আবার চেষ্টা করুন। ';
    const b = el('button', 'btn', 'আবার লোড করুন'); b.onclick = load; st.append(b);
  }
};
$('#q').oninput = render; $('#so').onchange = render;
load();

// ---- উপরে যান ----
const top = $('#top');
addEventListener('scroll', () => { top.hidden = scrollY < 600; }, { passive: true });
top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
})();
