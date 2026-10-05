const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({headless: 'new'});
  const p = await b.newPage();
  const widths = (process.argv[3]||'1920,1440,1280,1024,768,393').split(',').map(Number);
  for (const w of widths) {
    await p.setViewport({width: w, height: 900});
    await p.goto(process.argv[2] || 'http://localhost/sold/insights/', {waitUntil: 'domcontentloaded', timeout: 90000});
    if (process.env.INJECT) await p.addStyleTag({content: require('fs').readFileSync('_feat_block.css','utf8')});
    await p.waitForSelector('.insights-featured-img', {timeout: 60000});
    await p.evaluate(() => new Promise(r => { const i = document.querySelector('.insights-featured-img'); i.complete ? r() : (i.onload = r, setTimeout(r, 8000)); }));
    const r = await p.evaluate(() => {
      const box = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; };
      const card = document.querySelector('.insights-featured-card').getBoundingClientRect();
      const kids = [...document.querySelectorAll('.insights-featured-card *')].filter(e => e.offsetParent && e.textContent.trim());
      const over = kids.filter(e => e.getBoundingClientRect().bottom > card.bottom + 0.5 || e.getBoundingClientRect().right > card.right + 0.5).map(e => e.className).slice(0,3);
      return {card: box('.insights-featured-card'), wrap: box('.insights-featured-img-wrap'), img: box('.insights-featured-img'),
        fit: getComputedStyle(document.querySelector('.insights-featured-img')).objectFit, over, hscroll: document.documentElement.scrollWidth > innerWidth};
    });
    console.log(w, JSON.stringify(r));
    if (process.argv[4]) await (await p.$('.insights-featured-card')).screenshot({path: process.argv[4] + '-' + w + '.png'});
  }
  await b.close();
})();
