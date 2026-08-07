const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const results = await page.evaluate(() => {
    const leadingEl = document.querySelector('.hero-title-top .orange-italic');
    const bottomEl = document.querySelector('.hero-title-bottom');
    
    if (!leadingEl || !bottomEl) return 'Elements not found';
    
    const leadingRect = leadingEl.getBoundingClientRect();
    
    // Wrap Agency in a span to measure its left coordinate
    bottomEl.innerHTML = bottomEl.innerHTML.replace('Agency', '<span id="agency-span">Agency</span>');
    const agencySpan = document.querySelector('#agency-span');
    const agencyRect = agencySpan.getBoundingClientRect();
    
    const diffPx = agencyRect.left - leadingRect.left;
    const diffVw = diffPx / 14.4;
    
    return {
      leadingLeftPx: leadingRect.left,
      agencyLeftPx: agencyRect.left,
      diffPx: diffPx,
      diffVw: diffVw
    };
  });
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
