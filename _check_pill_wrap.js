const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  for (const width of [320, 360, 375, 390, 414, 430]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.goto('http://localhost:3000/branding-design.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 300));
    const info = await page.evaluate(() => {
      const pills = Array.from(document.querySelectorAll('.branding-pill'));
      return pills.map(p => {
        const text = p.querySelector('.branding-pill-text');
        return { label: text.textContent.trim(), pillHeight: Math.round(p.getBoundingClientRect().height), textLines: Math.round(text.getBoundingClientRect().height / 22) };
      });
    });
    const headingAlign = await page.evaluate(() => getComputedStyle(document.querySelector('.branding-production-heading')).textAlign);
    console.log(`width=${width} headingAlign=${headingAlign}`);
    info.forEach(p => console.log(`  "${p.label}" pillHeight=${p.pillHeight} approxLines=${p.textLines}`));
    if (width === 320) {
      const el = await page.$('.branding-production-list');
      await el.screenshot({ path: path.join(process.argv[2], 'pills-320.png') });
    }
    await page.close();
  }
  await browser.close();
})();
