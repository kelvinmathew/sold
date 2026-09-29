const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost/sold/', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 500));

  // Real click test - click dead center of the large card's visible title text
  const clickResult = await page.evaluate(() => {
    const titleEl = document.querySelector('.insights-large-title');
    const rect = titleEl.getBoundingClientRect();
    const el = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    const anchor = el.closest('a');
    return { hitAnchor: !!anchor, anchorHref: anchor ? anchor.href : null };
  });
  console.log('click-point resolves to anchor:', JSON.stringify(clickResult));

  // Actually click and confirm navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
    page.click('.insights-card-large .insights-large-title'),
  ]);
  const landedOn = page.url();
  const bodyClass = await page.evaluate(() => document.body.className);
  console.log('landed on:', landedOn);
  console.log('body class:', bodyClass);
  console.log('errors:', JSON.stringify(errs));

  await browser.close();
})();
