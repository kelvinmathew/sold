const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const url = 'http://localhost/sold/contact/';
  const outDir = path.join(__dirname, '..', '..', 'contact-test-shots');
  require('fs').mkdirSync(outDir, { recursive: true });

  async function run(viewport, label) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    page.on('console', msg => console.log(`[${label} console]`, msg.text()));
    page.on('pageerror', err => console.log(`[${label} pageerror]`, err.message));
    await page.goto(url, { waitUntil: 'networkidle0' });

    await page.click('.btn-send-message');
    await new Promise(r => setTimeout(r, 400));
    const errorsAfterEmpty = await page.$$eval('.field-error', els => els.map(e => e.textContent).filter(Boolean));
    console.log(`[${label}] errors after empty submit:`, errorsAfterEmpty);
    await page.screenshot({ path: path.join(outDir, `${label}-1-empty-errors.png`) });

    await page.type('[name="first_name"]', 'Test');
    await page.type('[name="last_name"]', 'User');
    await page.type('[name="email"]', 'not-an-email');
    await page.type('[name="phone"]', '12345');
    await page.type('[name="company"]', 'Acme');
    await page.click('.btn-send-message');
    await new Promise(r => setTimeout(r, 400));
    const errorsAfterInvalid = await page.$$eval('.field-error', els => els.map(e => e.textContent).filter(Boolean));
    console.log(`[${label}] errors after invalid email/phone:`, errorsAfterInvalid);
    await page.screenshot({ path: path.join(outDir, `${label}-2-invalid-errors.png`) });

    await page.evaluate(() => { document.querySelector('[name="email"]').value = ''; document.querySelector('[name="phone"]').value = ''; });
    await page.type('[name="email"]', 'test@example.com');
    await page.type('[name="phone"]', '+971585931979');
    await page.click('.btn-send-message');
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, `${label}-3-success.png`) });

    const statusText = await page.$eval('.form-status', el => el.textContent).catch(() => null);
    console.log(`[${label}] status text:`, statusText);

    const check = await page.evaluate(() => {
      const btn = document.querySelector('.btn-send-message');
      const panel = document.querySelector('.contact-modal-right');
      const btnRect = btn.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      return {
        btnRect: { top: btnRect.top, bottom: btnRect.bottom, height: btnRect.height },
        panelRect: { top: panelRect.top, bottom: panelRect.bottom },
        panelScrollHeight: panel.scrollHeight,
        panelClientHeight: panel.clientHeight,
        btnHasSize: btnRect.width > 0 && btnRect.height > 0,
      };
    });
    console.log(`[${label}] layout check:`, JSON.stringify(check));

    await page.close();
  }

  await run({ width: 1440, height: 900 }, 'desktop');
  await run({ width: 390, height: 844, isMobile: true }, 'mobile');

  await browser.close();
  console.log('DONE, screenshots in', outDir);
})();
