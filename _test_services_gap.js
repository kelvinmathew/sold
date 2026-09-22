const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const errors = [];
  for (const width of [320, 360, 375, 390, 393, 414, 430]) {
    const page = await browser.newPage();
    page.on('pageerror', e => errors.push(`${width}px: ${e.message}`));
    await page.setViewport({ width, height: 900 });
    await page.goto('http://localhost:3000/branding-design.html', { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => {
      const pills = Array.from(document.querySelectorAll('.branding-pill')).map(p => {
        const text = p.querySelector('.branding-pill-text');
        const tr = text.getBoundingClientRect();
        const pr = p.getBoundingClientRect();
        return {
          label: text.textContent.trim(),
          lines: Math.round(tr.height / parseFloat(getComputedStyle(text).fontSize) / 1.0),
          textRight: Math.round(tr.right),
          pillRight: Math.round(pr.right),
          fontSize: getComputedStyle(text).fontSize,
          paddingLeft: getComputedStyle(p).paddingLeft,
        };
      });
      const heading = document.querySelector('.branding-production-heading');
      const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      return { pills, headingAlign: getComputedStyle(heading).textAlign, overflowX, docWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
    });
    console.log(`\nwidth=${width} overflowX=${data.overflowX} (scroll=${data.docWidth} client=${data.clientWidth}) headingAlign=${data.headingAlign}`);
    data.pills.forEach(p => {
      const overflowsPill = p.textRight > p.pillRight;
      console.log(`  "${p.label}" font=${p.fontSize} padL=${p.paddingLeft} textRight=${p.textRight} pillRight=${p.pillRight} ${overflowsPill ? '<<< TEXT OVERFLOWS PILL' : 'OK'}`);
    });
    await page.close();
  }
  console.log('\nPage errors:', errors.length ? errors : 'none');
  await browser.close();
})();
