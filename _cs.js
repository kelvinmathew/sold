const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('https://valores.newpropertyuae.ae/client-success/?c='+Date.now(), { waitUntil: 'networkidle2', timeout: 60000 });
  console.log((await p.evaluate(() => [...document.querySelectorAll('.cs-card-desc')].filter(e=>e.offsetParent).map((e,i)=>{
    const c=getComputedStyle(e), r=e.getBoundingClientRect(); const rg=document.createRange(); rg.selectNodeContents(e); const lines=new Set([...rg.getClientRects()].map(x=>Math.round(x.top))).size;
    return `${i+1} ${c.fontFamily.split(',')[0]} ${c.fontSize}/${c.lineHeight} w${c.fontWeight} ls${c.letterSpacing} box ${Math.round(r.width)}x${Math.round(r.height)} lines=${lines}`;
  }))).join('\n'));
  await b.close();
})();
