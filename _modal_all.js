// Contact modal reachability across real phone/tablet resolutions,
// including short viewports (browser chrome visible).
const puppeteer = require('puppeteer');

const DEVICES = [
  ['Android small', 320, 568], ['Android small (chrome)', 320, 480],
  ['Android common', 360, 640], ['Android common (chrome)', 360, 560],
  ['Galaxy S', 360, 740], ['Galaxy S (chrome)', 360, 650],
  ['Galaxy S20', 360, 800],
  ['iPhone SE2/8', 375, 667], ['iPhone SE2 (chrome)', 375, 560],
  ['iPhone X/11Pro', 375, 812],
  ['iPhone 12/13/14', 390, 844], ['iPhone 12 (chrome)', 390, 664],
  ['Pixel 7', 393, 851], ['Pixel 7 (chrome)', 393, 680],
  ['iPhone 8 Plus', 414, 736], ['iPhone XR/11', 414, 896],
  ['Pixel 6/7 Pro', 412, 915], ['Pixel 6 Pro (chrome)', 412, 750],
  ['iPhone 13 Pro Max', 428, 926], ['iPhone 15 Pro Max', 430, 932],
  ['iPhone 15PM (chrome)', 430, 700],
  ['Tablet portrait', 768, 1024], ['Tablet short', 768, 700],
  ['Landscape phone', 844, 390], ['Landscape small', 667, 375],
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const url = process.argv[2] || 'http://localhost/sold/contact/';
  let bad = 0;

  for (const [name, w, h] of DEVICES) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: w < 992, hasTouch: w < 992 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 350));

    const r = await page.evaluate(() => {
      const ov = document.querySelector('.contact-modal-overlay');
      if (!ov) return { err: 'no overlay' };
      ov.classList.add('active');
      const card = ov.querySelector('.contact-modal-container');
      const btn = ov.querySelector('.btn-send-message');
      const firstInput = ov.querySelector('input, .mobile-contact-header, .contact-modal-right');

      ov.scrollTop = 0;
      const topAt0 = card.getBoundingClientRect().top;
      const headTop = firstInput ? firstInput.getBoundingClientRect().top : null;

      ov.scrollTop = ov.scrollHeight;
      const bottomAtEnd = card.getBoundingClientRect().bottom;
      const btnBottom = btn ? btn.getBoundingClientRect().bottom : null;

      return {
        vh: window.innerHeight,
        topAt0: Math.round(topAt0),
        headTop: headTop === null ? null : Math.round(headTop),
        bottomAtEnd: Math.round(bottomAtEnd),
        btnBottom: btnBottom === null ? null : Math.round(btnBottom),
        scrollH: Math.round(ov.scrollHeight),
        clientH: Math.round(ov.clientHeight),
      };
    });

    if (r.err) { console.log('?? ' + name + ': ' + r.err); await page.close(); continue; }

    const topOK = r.topAt0 >= -1 && (r.headTop === null || r.headTop >= -1);
    const botOK = r.btnBottom === null ? r.bottomAtEnd <= r.vh + 1 : r.btnBottom <= r.vh + 1;
    const ok = topOK && botOK;
    if (!ok) bad++;

    console.log(
      (ok ? 'OK ' : 'X  ') + (name + ' ').padEnd(24) + (w + 'x' + h).padEnd(10) +
      'top@0=' + String(r.topAt0).padStart(5) +
      '  sendBtn@end=' + String(r.btnBottom).padStart(5) + '/' + r.vh +
      (topOK ? '' : '   <-- TOP CUT') + (botOK ? '' : '   <-- BOTTOM HIDDEN')
    );
    await page.close();
  }
  console.log('\n' + (bad ? bad + ' viewport(s) broken' : 'All ' + DEVICES.length + ' viewports reachable top-to-bottom'));
  await browser.close();
})();
