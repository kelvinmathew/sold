// Measures whether the "What services are you interested in?" grid overflows.
const puppeteer = require('puppeteer');

const VIEWS = [
  ['mobile 320', 320, 700], ['mobile 360', 360, 740], ['mobile 375', 375, 812],
  ['mobile 390', 390, 844], ['mobile 414', 414, 896], ['mobile 430', 430, 932],
  ['tablet 768', 768, 1024], ['laptop 1024', 1024, 800], ['laptop 1280', 1280, 900],
  ['desk 1440', 1440, 900], ['desk 1920', 1920, 1080],
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const url = process.argv[2] || 'http://localhost/sold/contact/';
  let bad = 0;

  for (const [name, w, h] of VIEWS) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: w < 992, hasTouch: w < 992 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 350));

    const r = await page.evaluate(() => {
      const ov = document.querySelector('.contact-modal-overlay');
      if (ov) ov.classList.add('active');
      const grids = [...document.querySelectorAll('.services-grid')]
        .filter(g => getComputedStyle(g).display !== 'none');
      if (!grids.length) return { err: 'no visible grid' };
      const g = grids[0];
      const gr = g.getBoundingClientRect();
      const cs = getComputedStyle(g);
      const items = [...g.querySelectorAll('.service-checkbox')];
      let worstRight = 0, widest = null, rows = new Set();
      items.forEach(it => {
        const r = it.getBoundingClientRect();
        rows.add(Math.round(r.top));
        const over = r.right - gr.right;
        if (over > worstRight) { worstRight = over; widest = it.textContent.trim(); }
      });
      const parent = g.parentElement.getBoundingClientRect();
      return {
        gridW: Math.round(gr.width), gridH: Math.round(gr.height),
        cssH: cs.height, cols: cs.gridTemplateColumns,
        colGap: cs.columnGap,
        scrollW: g.scrollWidth, clientW: g.clientWidth,
        contentOverflowX: g.scrollWidth - g.clientWidth,
        itemOverflowRight: Math.round(worstRight),
        widest,
        rowCount: rows.size,
        heightOverflow: Math.round(g.scrollHeight - g.clientHeight),
        pastParent: Math.round(gr.right - parent.right),
      };
    });

    if (r.err) { console.log('?? ' + name + ' ' + r.err); await page.close(); continue; }
    const problems = [];
    if (r.contentOverflowX > 1) problems.push('X-overflow ' + r.contentOverflowX + 'px');
    if (r.itemOverflowRight > 1) problems.push('item past edge ' + r.itemOverflowRight + 'px ("' + r.widest + '")');
    if (r.heightOverflow > 1) problems.push('Y-clipped ' + r.heightOverflow + 'px');
    if (problems.length) bad++;

    console.log((problems.length ? 'X  ' : 'OK ') + name.padEnd(12) +
      'grid ' + String(r.gridW).padStart(4) + 'x' + String(r.gridH).padStart(3) +
      '  rows=' + r.rowCount + '  cssH=' + r.cssH + '  gap=' + r.colGap +
      (problems.length ? '\n        ' + problems.join('  |  ') : ''));
    await page.close();
  }
  console.log('\n' + (bad ? bad + ' viewport(s) broken' : 'grid fits everywhere'));
  await browser.close();
})();
