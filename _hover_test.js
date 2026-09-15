// Measures what happens to the Why SOLD info cards on mobile hover/tap.
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(process.argv[2] || 'http://localhost/sold/why-sold/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  const read = async (label) => {
    const out = await page.evaluate(() => {
      const card = document.querySelector('.ws-info-card');
      if (!card) return null;
      const q = (s) => card.querySelector(s);
      const info = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          color: cs.color, opacity: cs.opacity, visibility: cs.visibility,
          position: cs.position, zIndex: cs.zIndex, display: cs.display,
          top: Math.round(r.top), h: Math.round(r.height)
        };
      };
      const bef = getComputedStyle(card, '::before');
      const cr = card.getBoundingClientRect();
      return {
        cardH: Math.round(cr.height),
        cardOverflow: getComputedStyle(card).overflow,
        beforeH: bef.height, beforeBg: bef.backgroundColor, beforeZ: bef.zIndex,
        icon: info(q('.ws-info-icon')),
        iconImg: info(q('.ws-info-icon img')),
        content: info(q('.ws-info-content')),
        title: info(q('.ws-info-title')),
        desc: info(q('.ws-info-desc')),
      };
    });
    console.log('--- ' + label + ' ---');
    console.log(JSON.stringify(out, null, 1));
    return out;
  };

  await read('BEFORE hover');
  const box = await page.$('.ws-info-card');
  await box.hover();
  await new Promise(r => setTimeout(r, 900));
  await read('AFTER hover');

  await browser.close();
})();
