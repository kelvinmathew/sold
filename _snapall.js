// Full-page snapshot of visible text + images + placeholders for every template, web + mobile.
const puppeteer = require('puppeteer'); const fs = require('fs');
const OUT = process.argv[2];
const B = 'http://localhost/sold';
const pages = ['/', '/services/', '/why-sold/', '/client-success/', '/insights/', '/contact/', '/branding-design/',
  '/insights/dubai-off-plan-sales-hit-record-highs-in-2026/', '/insights/category/ai-marketing/'];
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const p = await b.newPage(); const res = {};
  for (const u of pages) for (const w of [1440, 393]) {
    await p.setViewport({ width: w, height: 900 });
    await p.goto(B + u + '?c=' + Date.now(), { waitUntil: 'networkidle2', timeout: 90000 });
    res[u + '@' + w] = await p.evaluate(() => {
      const txt = document.body.innerText.replace(/[ \t]+/g, ' ');
      const imgs = [...document.querySelectorAll('img')].map(i => (i.getAttribute('src') || '').replace(/\?ver=[\d.]+/, '')).join('\n');
      const ph = [...document.querySelectorAll('[placeholder]')].map(i => i.placeholder).join('|');
      const html = document.querySelector('main') ? document.querySelector('main').innerHTML.length : 0;
      return { txt, imgs, ph };
    });
  }
  fs.writeFileSync(OUT, JSON.stringify(res));
  await b.close();
  console.log('snapshot', Object.keys(res).length, 'page x width');
})();
