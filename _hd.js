const puppeteer = require('puppeteer');
const URL = process.argv[2];
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const p = await b.newPage(); await p.setViewport({ width: 1440, height: 900 });
  for (let t = 0; t < 3; t++) { try { await p.goto(URL + '?c=' + Date.now(), { waitUntil: 'networkidle2', timeout: 90000 }); break; } catch (e) {} }
  await new Promise(r => setTimeout(r, 2500)); // let the contact popup preload
  console.log((await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => {
    const vis = !!h.offsetParent; const sec = h.closest('section,header,footer,[id]');
    return `${h.tagName} ${vis ? '' : '(hidden) '}.${[...h.classList].join('.')}  @${sec ? (sec.id ? '#' + sec.id : '.' + [...sec.classList][0]) : ''}  "${h.textContent.replace(/\s+/g, ' ').trim().slice(0, 70)}"`;
  }))).join('\n'));
  await b.close();
})();
