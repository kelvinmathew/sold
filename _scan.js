// Usage: node _scan.js <url> [--chrome]   (--chrome = include header/footer/menu/whatsapp)
// Lists every VISIBLE text / image / placeholder at 1440 and 393. Text containing a QZ<n> marker (or the marker
// image) comes from an admin field; everything else is hard-coded (or from somewhere else, reported with context).
const puppeteer = require('puppeteer');
const url = process.argv[2];
const chrome = process.argv.includes('--chrome');
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const p = await b.newPage();
  const all = {};
  for (const w of [1440, 393]) {
    await p.setViewport({ width: w, height: 900 });
    await p.goto(url + (url.includes('?') ? '&' : '?') + 'c=' + Date.now(), { waitUntil: 'networkidle2', timeout: 90000 });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    const items = await p.evaluate((chrome) => {
      const skip = chrome ? '.contact-modal, #contactModal, [class*="contact-modal"], .page-loader' : '.site-header, .site-footer, #mobileMenu, .whatsapp-float-btn, .contact-modal, #contactModal, [class*="contact-modal"], .page-loader';
      const inSkip = (el) => el.closest(skip);
      const visible = (el) => { if (!el) return false; const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return false; const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1 && (el.offsetParent || cs.position === 'fixed'); };
      const where = (el) => { const s = el.closest('section, header, footer, nav, [id]'); const c = s ? (s.id ? '#' + s.id : '.' + [...s.classList].slice(0, 2).join('.')) : 'body'; const own = el.closest('[class]'); return c + ' > ' + (own ? '.' + [...own.classList].slice(0, 2).join('.') : el.tagName.toLowerCase()); };
      const out = [];
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = tw.nextNode())) {
        const t = n.textContent.replace(/\s+/g, ' ').trim();
        if (!t) continue;
        const el = n.parentElement;
        if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName) || inSkip(el) || !visible(el)) continue;
        const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getBoundingClientRect();
        if (rr.width < 1 || rr.height < 1) continue;
        out.push({ k: 'TEXT', t: t.slice(0, 90), w: where(el) });
      }
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => { if (!inSkip(el) && visible(el)) out.push({ k: 'PLACEHOLDER', t: el.placeholder, w: where(el) }); });
      document.querySelectorAll('img').forEach(el => { if (!inSkip(el) && visible(el)) out.push({ k: 'IMG', t: el.currentSrc.split('/').slice(-2).join('/'), w: where(el) }); });
      document.querySelectorAll('body *').forEach(el => { if (inSkip(el) || !visible(el)) return; const bg = getComputedStyle(el).backgroundImage; if (bg && bg.includes('url(')) out.push({ k: 'BG-IMG', t: bg.slice(0, 120).split('/').slice(-2).join('/'), w: where(el) }); });
      return out;
    }, chrome);
    all[w] = items;
  }
  const mark = (x) => /qz\d+/i.test(x.t) || /zz-marker/.test(x.t);
  for (const w of [1440, 393]) {
    const hard = all[w].filter(x => !mark(x)), ok = all[w].filter(mark);
    console.log(`\n===== ${w}px: ${ok.length} editable, ${hard.length} NOT from admin =====`);
    const seen = new Set();
    hard.forEach(x => { const key = x.k + x.t + x.w; if (seen.has(key)) return; seen.add(key); console.log(`  ${x.k.padEnd(11)} "${x.t}"   @ ${x.w}`); });
  }
  await b.close();
})();
