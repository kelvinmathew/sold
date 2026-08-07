const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const imagesDir = path.join(__dirname, 'assets', 'images');
  const files = ['design-icon.png', 'launch-icon.png', 'sell-icon.png', 'logosold_white.png', 'footer_logo.png'];
  
  const results = {};
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    const base64 = fs.readFileSync(filePath, 'base64');
    const ext = path.extname(file).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/svg+xml';
    const dataUrl = `data:${mime};base64,${base64}`;
    
    const info = await page.evaluate(async (url, filename) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          
          let hasWhiteBg = false;
          let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
          let totalPixels = canvas.width * canvas.height;
          let whitePixels = 0;
          let transparentPixels = 0;
          let contentPixels = 0;
          
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const idx = (y * canvas.width + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              const a = data[idx + 3];
              
              if (a === 0) {
                transparentPixels++;
              } else if (r > 240 && g > 240 && b > 240) {
                whitePixels++;
              } else {
                contentPixels++;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          
          resolve({
            filename,
            width: canvas.width,
            height: canvas.height,
            transparentPixels,
            whitePixels,
            contentPixels,
            boundingBox: contentPixels > 0 ? { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 } : null
          });
        };
        img.src = url;
      });
    }, dataUrl, file);
    
    results[file] = info;
  }
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
