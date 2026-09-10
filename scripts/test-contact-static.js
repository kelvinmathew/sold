const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'contact.html').split(path.sep).join('/');
  console.log('opening', fileUrl);

  async function run(viewport, label) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    page.on('pageerror', e => console.log(`[${label} pageerror]`, e.message));
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.click('.btn-send-message');
    await new Promise(r => setTimeout(r, 350));
    const errors = await page.$$eval('.field-error', els => els.map(e => e.textContent).filter(Boolean));
    console.log(`[${label}] tooltip errors:`, errors);
    await page.screenshot({ path: `C:/Users/HP/.gemini/antigravity-ide/scratch/contact-test-shots/v2-static-${label}-1-tooltips.png` });

    await page.type('[name="first_name"]', 'Test');
    await page.type('[name="last_name"]', 'User');
    await page.type('[name="email"]', 'test@example.com');
    await page.type('[name="phone"]', '+971585931979');
    await page.type('[name="company"]', 'Acme');
    await page.click('.btn-send-message');
    await page.waitForFunction(() => document.querySelector('#contactResultPopup').classList.contains('active'), { timeout: 5000 });
    const msg = await page.$eval('.contact-result-message', el => el.textContent);
    console.log(`[${label}] popup message:`, msg);
    await page.screenshot({ path: `C:/Users/HP/.gemini/antigravity-ide/scratch/contact-test-shots/v2-static-${label}-2-success.png` });
    await page.close();
  }

  await run({ width: 1440, height: 900 }, 'desktop');
  await run({ width: 390, height: 844, isMobile: true }, 'mobile');
  await browser.close();
  console.log('DONE');
})();
