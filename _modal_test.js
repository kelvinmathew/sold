// Reproduces the contact modal clipping on short (iPhone-with-chrome) viewports.
const puppeteer = require('puppeteer');

const VIEWPORTS = [
  { name: 'iPhone SE   375x667', w: 375, h: 667 },
  { name: 'iPhone 12   390x664', w: 390, h: 664 },  // 844 minus Safari chrome
  { name: 'iPhone 12   390x844', w: 390, h: 844 },
  { name: 'iPhone 14PM 430x700', w: 430, h: 700 },
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const url = process.argv[2] || 'http://localhost/sold/';

  for (const v of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: v.w, height: v.h, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 500));

    const res = await page.evaluate(() => {
      const ov = document.querySelector('.contact-modal-overlay');
      if (!ov) return { err: 'no overlay' };
      ov.classList.add('active');
      const cont = ov.querySelector('.contact-modal-container');
      const ovCS = getComputedStyle(ov);
      const cr = cont.getBoundingClientRect();
      const btn = ov.querySelector('.btn-send-message');
      const br = btn ? btn.getBoundingClientRect() : null;
      // can we scroll the overlay to reveal everything?
      const canScroll = ov.scrollHeight > ov.clientHeight;
      ov.scrollTop = ov.scrollHeight;               // scroll to the very bottom
      const afterBottom = cont.getBoundingClientRect();
      const btnAfter = btn ? btn.getBoundingClientRect() : null;
      ov.scrollTop = 0;                              // and back to the top
      const afterTop = cont.getBoundingClientRect();
      return {
        vh: window.innerHeight,
        overlayH: Math.round(ov.clientHeight),
        overlayScrollH: Math.round(ov.scrollHeight),
        alignItems: ovCS.alignItems,
        overflowY: ovCS.overflowY,
        cardH: Math.round(cr.height),
        canScroll,
        topAtScroll0: Math.round(afterTop.top),
        bottomAtScrollEnd: Math.round(afterBottom.bottom),
        sendBtnBottomAtScrollEnd: btnAfter ? Math.round(btnAfter.bottom) : null,
        sendBtnVisibleAtEnd: btnAfter ? (btnAfter.bottom <= window.innerHeight + 1 && btnAfter.top >= -1) : null,
      };
    });

    const topCut = res.topAtScroll0 < -1;
    const btnCut = res.sendBtnVisibleAtEnd === false;
    console.log(v.name);
    console.log('   overlay ' + res.overlayH + 'px  content ' + res.overlayScrollH +
                'px  card ' + res.cardH + 'px   align=' + res.alignItems + '  overflowY=' + res.overflowY);
    console.log('   top of card at scrollTop=0      : ' + res.topAtScroll0 + 'px  ' +
                (topCut ? '<-- CUT OFF, unreachable' : 'ok'));
    console.log('   SEND button bottom at max scroll: ' + res.sendBtnBottomAtScrollEnd +
                'px (viewport ' + res.vh + 'px)  ' + (btnCut ? '<-- HIDDEN' : 'ok'));
    console.log('');
    await page.close();
  }
  await browser.close();
})();
