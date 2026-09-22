const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  for (const width of [320, 375, 393]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.goto('http://localhost:3000/branding-design.html', { waitUntil: 'networkidle0' });
    const w = await page.evaluate(() => {
      const c = document.querySelector('.branding-page-body .page-container');
      return c ? c.getBoundingClientRect().width : null;
    });
    console.log(`viewport=${width} containerWidth=${w}`);
    await page.close();
  }
  await browser.close();
})();
