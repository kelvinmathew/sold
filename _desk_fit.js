// Does the desktop contact modal fit without the right panel scrolling?
const puppeteer = require('puppeteer');

const VIEWS = [
  ['1024x768', 1024, 768], ['1280x720', 1280, 720], ['1366x768', 1366, 768],
  ['1440x900', 1440, 900], ['1536x864', 1536, 864], ['1600x900', 1600, 900],
  ['1920x1080', 1920, 1080], ['2560x1440', 2560, 1440],
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const url = process.argv[2] || 'http://localhost/sold/contact/';
  let bad = 0;

  for (const [name, w, h] of VIEWS) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 350));

    const r = await page.evaluate(() => {
      const ov = document.querySelector('.contact-modal-overlay');
      if (ov) ov.classList.add('active');
      const right = document.querySelector('.contact-modal-right');
      const card = document.querySelector('.contact-modal-container');
      const btn = document.querySelector('.btn-send-message');
      if (!right || !btn) return { err: 'missing nodes' };
      const rr = right.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      // section heights inside the right panel
      const parts = {};
      [['logo', '.contact-logo'], ['rows', '.form-row-fields'],
       ['services', '.services-interest'], ['message', '.message-row'],
       ['button', '.btn-send-message']].forEach(([k, sel]) => {
        const el = right.querySelector(sel);
        if (el) { const b = el.getBoundingClientRect(); parts[k] = Math.round(b.height); }
      });
      return {
        panelScrollH: right.scrollHeight, panelClientH: right.clientHeight,
        overflow: right.scrollHeight - right.clientHeight,
        overflowY: getComputedStyle(right).overflowY,
        btnBottom: Math.round(br.bottom), panelBottom: Math.round(rr.bottom),
        cardTop: Math.round(cr.top), cardBottom: Math.round(cr.bottom), vh: window.innerHeight,
        btnVisible: br.bottom <= rr.bottom + 1 && br.top >= rr.top - 1,
        parts,
      };
    });

    if (r.err) { console.log('?? ' + name + ' ' + r.err); await page.close(); continue; }
    const ok = r.overflow <= 1 && r.btnVisible;
    if (!ok) bad++;
    console.log((ok ? 'OK ' : 'X  ') + name.padEnd(11) +
      'panel ' + r.panelScrollH + '/' + r.panelClientH +
      '  overflow=' + r.overflow + 'px  sendBtn ' + (r.btnVisible ? 'visible' : 'HIDDEN') +
      '  card ' + r.cardTop + '->' + r.cardBottom + ' (vh ' + r.vh + ')');
    if (!ok) console.log('        sections: ' + JSON.stringify(r.parts));
    await page.close();
  }
  console.log('\n' + (bad ? bad + ' viewport(s) with a scrolling/clipped panel' : 'fits without scrolling everywhere'));
  await browser.close();
})();
