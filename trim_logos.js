const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const imagesDir = path.join(__dirname, 'assets', 'images');
  const files = ['design-icon.png', 'launch-icon.png', 'sell-icon.png', 'logosold_white.png', 'footer_logo.png', 'fter_logo.png'];
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    const base64 = fs.readFileSync(filePath, 'base64');
    const dataUrl = `data:image/png;base64,${base64}`;
    
    const croppedBase64 = await page.evaluate(async (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          
          let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
          let contentPixels = 0;
          
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const idx = (y * canvas.width + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              const a = data[idx + 3];
              
              // Consider transparent (a===0) or pure white background as empty space
              const isWhiteBg = (r > 245 && g > 245 && b > 245 && a > 200);
              const isEmpty = (a === 0 || isWhiteBg);
              
              if (!isEmpty) {
                contentPixels++;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
          
          if (contentPixels === 0 || (minX === 0 && minY === 0 && maxX === canvas.width - 1 && maxY === canvas.height - 1)) {
            resolve(null);
            return;
          }
          
          const cropWidth = maxX - minX + 1;
          const cropHeight = maxY - minY + 1;
          
          const cropCanvas = document.createElement('canvas');
          cropCanvas.width = cropWidth;
          cropCanvas.height = cropHeight;
          const cropCtx = cropCanvas.getContext('2d');
          cropCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
          
          const dataUrlOut = cropCanvas.toDataURL('image/png');
          resolve(dataUrlOut.replace(/^data:image\/png;base64,/, ''));
        };
        img.src = url;
      });
    }, dataUrl);
    
    if (croppedBase64) {
      fs.writeFileSync(filePath, Buffer.from(croppedBase64, 'base64'));
      console.log(`Successfully trimmed whitespace from ${file}`);
    } else {
      console.log(`No whitespace trimming needed for ${file}`);
    }
  }
  
  await browser.close();
})();
