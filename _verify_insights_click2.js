const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost/sold/', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    const el = document.querySelector('.insights-large-title');
    const rect = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - window.innerHeight / 2, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 100));

  const clickResult = await page.evaluate(() => {
    const titleEl = document.querySelector('.insights-large-title');
    const rect = titleEl.getBoundingClientRect();
    const el = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    const anchor = el ? el.closest('a') : null;
    return { elFound: !!el, hitAnchor: !!anchor, anchorHref: anchor ? anchor.href : null };
  });
  console.log('click-point resolves to anchor:', JSON.stringify(clickResult));

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
    page.click('.insights-card-large .insights-large-title'),
  ]);
  console.log('landed on:', page.url());
  console.log('body class:', await page.evaluate(() => document.body.className));
  console.log('errors:', JSON.stringify(errs));

  await browser.close();
})();
