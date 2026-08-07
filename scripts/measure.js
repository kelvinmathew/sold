const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const results = await page.evaluate(() => {
    const designTextEl = document.querySelectorAll('.feature-content-cell p')[0];
    const launchTextEl = document.querySelectorAll('.feature-content-cell p')[1];
    const sellTextEl = document.querySelectorAll('.feature-content-cell p')[2];
    
    if (!designTextEl) return 'Elements not found';
    
    // Remove <br> just in case
    designTextEl.innerHTML = designTextEl.innerHTML.replace(/<br\s*[\/]?>/gi, ' ');
    launchTextEl.innerHTML = launchTextEl.innerHTML.replace(/<br\s*[\/]?>/gi, ' ');
    sellTextEl.innerHTML = sellTextEl.innerHTML.replace(/<br\s*[\/]?>/gi, ' ');
    
    const cells = document.querySelectorAll('.feature-content-cell');
    
    const getLines = (el) => {
      const words = el.innerText.split(' ');
      el.innerHTML = words.map(w => '<span>' + w + '</span>').join(' ');
      
      const spans = el.querySelectorAll('span');
      let lines = [];
      let currentLineTop = -1;
      let currentLine = [];
      
      spans.forEach((span, i) => {
        const top = span.getBoundingClientRect().top;
        if (top > currentLineTop + 5) {
          if (currentLine.length > 0) lines.push(currentLine.join(' '));
          currentLine = [];
          currentLineTop = top;
        }
        currentLine.push(words[i]);
      });
      if (currentLine.length > 0) lines.push(currentLine.join(' '));
      el.innerText = words.join(' ');
      return lines;
    };
    
    let logs = [];
    for (let w = 350; w <= 440; w+=5) {
      cells.forEach(c => {
        c.style.width = w + 'px';
        c.style.maxWidth = w + 'px';
        c.style.minWidth = w + 'px';
      });
      logs.push({ w: w, design: getLines(designTextEl), launch: getLines(launchTextEl), sell: getLines(sellTextEl) });
    }
    return logs;
  });
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
