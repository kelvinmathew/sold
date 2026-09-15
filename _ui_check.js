// Deep UI check: horizontal overflow, broken images, clipped text, collapsed boxes.
const puppeteer = require('puppeteer');

const BASE = process.argv[2] || 'http://localhost/sold';
const PATHS = (process.argv[3] || '/').split(',');
const WIDTHS = (process.argv[4] || '320,375,414,768,1024,1280,1440,1920').split(',').map(Number);

const scan = (vw) => {
  const de = document.documentElement;
  const scrollW = Math.max(de.scrollWidth, document.body.scrollWidth);
  const overflow = [], broken = [], clipped = [];

  document.querySelectorAll('img').forEach(img => {
    const cs = getComputedStyle(img);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (img.complete && img.naturalWidth === 0) {
      broken.push((img.getAttribute('src') || '(empty src)').split('/').slice(-1)[0] +
                  (img.className ? '  .' + String(img.className).split(/\s+/)[0] : ''));
    }
    if (!img.getAttribute('src')) broken.push('(empty src) .' + String(img.className).split(/\s+/)[0]);
  });

  document.querySelectorAll('body *').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;

    const over = Math.round(r.right - vw);
    if (over > 1 || r.left < -1) {
      let p = el.parentElement, hid = false;
      while (p && p !== document.body) {
        const pc = getComputedStyle(p);
        if (/hidden|clip/.test(pc.overflowX) || /hidden|clip/.test(pc.overflow)) { hid = true; break; }
        p = p.parentElement;
      }
      if (!hid) overflow.push({
        sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
             (typeof el.className === 'string' && el.className.trim()
               ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''),
        over
      });
    }

    // text visually cut off by a fixed height
    if (/hidden|clip/.test(cs.overflowY) && el.scrollHeight - el.clientHeight > 4 &&
        el.children.length === 0 && el.textContent.trim().length > 8) {
      clipped.push({
        sel: el.tagName.toLowerCase() +
             (typeof el.className === 'string' && el.className.trim()
               ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''),
        cut: el.scrollHeight - el.clientHeight,
        txt: el.textContent.trim().slice(0, 40)
      });
    }
  });

  const dedupe = (arr, k) => {
    const m = {};
    arr.forEach(o => { const key = typeof o === 'string' ? o : o[k]; if (!m[key] || o.over > m[key].over) m[key] = o; });
    return Object.values(m);
  };
  return {
    scrollW,
    overflow: dedupe(overflow, 'sel').sort((a, b) => b.over - a.over).slice(0, 6),
    broken: [...new Set(broken)],
    clipped: dedupe(clipped, 'sel').slice(0, 6)
  };
};

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  let issues = 0;

  for (const path of PATHS) {
    const url = BASE.replace(/\/$/, '') + path;
    const found = [];
    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: 900 });
      let ok = false;
      for (let a = 1; a <= 3 && !ok; a++) {
        try { await page.goto(url, { waitUntil: 'networkidle2' }); ok = true; }
        catch (e) { await new Promise(r => setTimeout(r, 2500 * a)); }
      }
      if (!ok) { found.push({ w, load: true }); continue; }
      await new Promise(r => setTimeout(r, 350));
      const r = await page.evaluate(scan, w);
      if (r.scrollW > w + 1 || r.broken.length || r.clipped.length) found.push({ w, r });
    }
    if (!found.length) { console.log('OK   ' + path); continue; }
    issues++;
    console.log('X    ' + path);
    found.forEach(f => {
      if (f.load) { console.log('       @' + f.w + 'px LOAD FAILED'); return; }
      console.log('       @' + f.w + 'px');
      if (f.r.scrollW > f.w + 1) {
        console.log('         overflow  scrollWidth=' + f.r.scrollW + ' (+' + (f.r.scrollW - f.w) + ')');
        f.r.overflow.forEach(o => console.log('           +' + o.over + 'px  ' + o.sel));
      }
      f.r.broken.forEach(b => console.log('         BROKEN IMG  ' + b));
      f.r.clipped.forEach(c => console.log('         CLIPPED -' + c.cut + 'px  ' + c.sel + '  "' + c.txt + '"'));
    });
  }
  console.log('\n' + (issues ? issues + ' page(s) with issues' : 'All clean'));
  await browser.close();
})();
