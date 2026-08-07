const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const results = await page.evaluate(() => {
    const icons = document.querySelectorAll('.features-grid .placeholder-svg-icon');
    if (icons.length < 3) return 'Icons not found';
    
    const r1 = icons[0].getBoundingClientRect();
    const r2 = icons[1].getBoundingClientRect();
    const r3 = icons[2].getBoundingClientRect();
    
    // Distance between bottom of design logo (r1.bottom) and top of launch logo (r2.top)
    const dist1to2 = r2.top - r1.bottom;
    const centerDist1to2 = (r2.top + r2.height/2) - (r1.top + r1.height/2);
    const topDist1to2 = r2.top - r1.top;
    
    // Distance between bottom of launch logo (r2.bottom) and top of sell logo (r3.top)
    const dist2to3 = r3.top - r2.bottom;
    const topDist2to3 = r3.top - r2.top;
    
    return {
      designRect: { top: r1.top, bottom: r1.bottom, height: r1.height },
      launchRect: { top: r2.top, bottom: r2.bottom, height: r2.height },
      sellRect: { top: r3.top, bottom: r3.bottom, height: r3.height },
      bottomToTop_DesignToLaunch: dist1to2,
      topToTop_DesignToLaunch: topDist1to2,
      centerToCenter_DesignToLaunch: centerDist1to2,
      bottomToTop_LaunchToSell: dist2to3,
      topToTop_LaunchToSell: topDist2to3
    };
  });
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
