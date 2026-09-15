// Multi-page responsive overflow audit (one browser, many pages x widths).
const puppeteer = require('puppeteer');

const BASE = process.argv[2] || 'http://localhost/sold';
const PATHS = [
  '/', '/services/', '/client-success/', '/why-sold/', '/contact/', '/events/', '/insights/',
  '/branding-design/', '/ai-marketing/', '/lead-generation/',
  '/social-media-marketing/', '/seo-geo/', '/public-relations/', '/real-estate-websites/',
];
const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920];

const scan = (vw) => {
  const de = document.documentElement;
  const scrollW = Math.max(de.scrollWidth, document.body.scrollWidth);
  const out = [];
  document.querySelectorAll('body *').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const over = Math.round(r.right - vw);
    if (over > 1 || r.left < -1) {
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) {
        const pc = getComputedStyle(p);
        if (/hidden|clip/.test(pc.overflowX) || /hidden|clip/.test(pc.overflow)) { clipped = true; break; }
        p = p.parentElement;
      }
      if (clipped) return;
      out.push({
        sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
             (typeof el.className === 'string' && el.className.trim()
                ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : ''),
        over, w: Math.round(r.width)
      });
    }
  });
  const best = {};
  out.forEach(o => { if (!best[o.sel] || o.over > best[o.sel].over) best[o.sel] = o; });
  return { scrollW, offenders: Object.values(best).sort((a, b) => b.over - a.over).slice(0, 6) };
};

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  let totalBad = 0;

  for (const path of PATHS) {
    const url = BASE.replace(/\/$/, '') + path;
    const bad = [];
    let failed = false;

    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: 900 });
      let ok = false;
      for (let a = 1; a <= 3 && !ok; a++) {
        try { await page.goto(url, { waitUntil: 'networkidle2' }); ok = true; }
        catch (e) { await new Promise(r => setTimeout(r, 2500 * a)); }
      }
      if (!ok) { failed = true; continue; }
      await new Promise(r => setTimeout(r, 350));
      const res = await page.evaluate(scan, w);
      if (res.scrollW > w + 1) bad.push({ w, res });
    }

    if (failed) { console.log('??  ' + path + '  (load failed)'); continue; }
    if (!bad.length) { console.log('OK  ' + path); continue; }

    totalBad++;
    console.log('X   ' + path);
    bad.forEach(b => {
      console.log('      @' + b.w + 'px  scrollWidth=' + b.res.scrollW + ' (+' + (b.res.scrollW - b.w) + ')');
      b.res.offenders.forEach(o =>
        console.log('          +' + String(o.over).padStart(5) + 'px  w=' +
                    String(o.w).padStart(5) + '  ' + o.sel));
    });
  }

  console.log('\n' + (totalBad ? totalBad + ' page(s) with overflow' : 'No overflow on any page'));
  await browser.close();
})();
