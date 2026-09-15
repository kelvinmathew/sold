// Responsive audit: finds horizontal overflow + offenders at many widths.
const puppeteer = require('puppeteer');

const URL = process.argv[2] || 'http://localhost/sold/';
const WIDTHS = process.argv[3]
  ? process.argv[3].split(',').map(Number)
  : [320, 360, 375, 390, 414, 480, 576, 768, 992, 1024, 1200, 1280, 1440, 1600, 1920];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  console.log('URL: ' + URL + '\n');

  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    let ok = false;
    for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
      try {
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
        ok = true;
      } catch (e) {
        if (attempt === 4) { console.log('!! ' + w + 'px load failed: ' + e.message.split('\n')[0]); }
        await new Promise(r => setTimeout(r, 3000 * attempt));
      }
    }
    if (!ok) continue;
    await new Promise(r => setTimeout(r, 600));

    const res = await page.evaluate((vw) => {
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
          // skip if an ancestor already clips it
          let p = el.parentElement, clipped = false;
          while (p && p !== document.body) {
            const pc = getComputedStyle(p);
            if (pc.overflowX === 'hidden' || pc.overflowX === 'clip' ||
                pc.overflow === 'hidden' || pc.overflow === 'clip') { clipped = true; break; }
            p = p.parentElement;
          }
          if (clipped) return;
          out.push({
            sel: el.tagName.toLowerCase() +
                 (el.id ? '#' + el.id : '') +
                 (el.className && typeof el.className === 'string'
                    ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : ''),
            over, left: Math.round(r.left), w: Math.round(r.width)
          });
        }
      });
      // dedupe by selector, keep worst
      const best = {};
      out.forEach(o => { if (!best[o.sel] || o.over > best[o.sel].over) best[o.sel] = o; });
      return {
        scrollW, vw,
        offenders: Object.values(best).sort((a, b) => b.over - a.over).slice(0, 8)
      };
    }, w);

    const bad = res.scrollW > w + 1;
    console.log(
      (bad ? 'X ' : 'OK') + ' ' + String(w).padStart(4) +
      'px  scrollWidth=' + res.scrollW + (bad ? '  (+' + (res.scrollW - w) + ')' : '')
    );
    if (bad && res.offenders.length) {
      res.offenders.forEach(o =>
        console.log('        +' + String(o.over).padStart(5) + 'px  w=' +
                    String(o.w).padStart(5) + '  ' + o.sel));
    }
  }
  await browser.close();
})();
