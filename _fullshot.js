// Full-page screenshots of Home + Services at 5 widths, animations/transitions frozen, carousels stopped.
const puppeteer = require('puppeteer');
const OUT = process.argv[2], TAG = process.argv[3];
const pages = process.argv[4] ? Object.fromEntries(process.argv[4].split(',').map(x => [x.replace(/\W/g, '') || 'home', 'http://localhost/sold/' + x])) : { home: 'http://localhost/sold/', services: 'http://localhost/sold/services/' };
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  for (const [name, url] of Object.entries(pages)) for (const w of [1440, 1024, 768, 393, 320]) {
    const p = await b.newPage(); await p.setViewport({ width: w, height: 900 });
    // stop timers that drive carousels/marquees before any page script runs
    await p.evaluateOnNewDocument(() => { window.setInterval = () => 0; window.requestAnimationFrame = () => 0; });
    await p.goto(url + '?c=' + Date.now(), { waitUntil: 'networkidle2', timeout: 90000 });
    await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important} .whatsapp-float-btn,#contactModal,.page-loader{display:none!important}' });
    await p.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } scrollTo(0, 0); });
    await new Promise(r => setTimeout(r, 1500));
    await p.screenshot({ path: `${OUT}/${TAG}-${name}-${w}.png`, fullPage: true });
    await p.close();
  }
  await b.close(); console.log('shots done:', TAG);
})();
