const puppeteer = require('puppeteer');
const [, , OUT, BASE] = process.argv;
const devices = [['iPhone SE', 375, 667, 2], ['iPhone 12/13/14', 390, 844, 3], ['iPhone 14 Pro', 393, 852, 3], ['iPhone Pro Max', 430, 932, 3],
  ['Galaxy S8/S9', 360, 740, 3], ['Pixel 7', 412, 915, 2.625], ['Galaxy S20 Ultra', 412, 915, 3.5], ['Small Android', 320, 640, 2]];
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  for (const [name, w, h, dpr] of devices) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr, isMobile: true, hasTouch: true });
    await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
    for (let t = 0; t < 3; t++) { try { await p.goto(BASE + '/insights/?c=' + Date.now(), { waitUntil: 'networkidle2', timeout: 90000 }); break; } catch (e) {} }
    const r = await p.evaluate(() => {
      const k = innerWidth / 393, ok = (a, e) => Math.abs(a - e * k) <= 1.2, R = e => e.getBoundingClientRect();
      const sec = document.querySelector('#lorem-blogs'); const tw = sec.querySelector('.insights-feed-title-wrap'); const bar = sec.querySelector('.insights-feed-bar');
      const hl = [...sec.querySelectorAll('.insights-feed-headline')].find(e => e.offsetParent);
      const cards = [...sec.querySelectorAll('.insights-blog-card')].filter(c => c.offsetParent); const C = cards.map(R);
      const img = R(cards[0].querySelector('.insights-blog-img-wrap')); const g = document.createRange(); g.selectNodeContents(sec.querySelector('.insights-feed-title'));
      tw.scrollIntoView();
      return { n: cards.length, oneCol: C.every((x, i) => i === 0 || x.top > C[i - 1].bottom) && new Set(C.map(x => Math.round(x.left))).size === 1,
        figma: ok(R(tw).height, 35) && ok(R(bar).width, 5.4) && ok(R(bar).height, 31) && ok(R(hl).top - R(tw).bottom, 29) && ok(C[0].top - R(hl).bottom, 29) &&
          C.every(x => ok(x.width, 333) && ok(x.height, 278)) && ok(C[0].left, 30) && ok(img.width, 317) && ok(img.height, 147) && C.slice(1).every((x, i) => ok(x.top - C[i].bottom, 8)),
        headingOneLine: new Set([...g.getClientRects()].map(q => Math.round(q.top))).size === 1,
        imgsLoaded: cards.every(c => { const i = c.querySelector('img'); return i.complete && i.naturalWidth > 0; }),
        hscroll: document.documentElement.scrollWidth > innerWidth, y: Math.round(R(tw).top + scrollY), hh: Math.round(C[C.length - 1].bottom - R(tw).top + 10) };
    });
    console.log(`${name.padEnd(17)} ${w}px@${dpr}: ${r.n} cards, one per row ${r.oneCol}, Figma sizes+gaps ${r.figma}, heading 1 line ${r.headingOneLine}, images ${r.imgsLoaded}, sideways scroll ${r.hscroll}`);
    await p.screenshot({ path: `${OUT}/dex-${w}-${String(dpr).replace('.', '_')}.png`, clip: { x: 0, y: r.y - 10, width: w, height: r.hh + 10 } });
    await p.close();
  }
  await b.close();
})();
