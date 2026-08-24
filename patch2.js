const fs = require('fs');
const path = require('path');

const cssDir = './css';
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Locate intro prefix
    const prefixMatch = content.match(/\.([a-zA-Z0-9-]+)-intro-left/);
    if (!prefixMatch) continue;

    const prefix = prefixMatch[1];
    const mobileQuery = '@media (max-width: 991px) {';

    const overrides = `
  /* UNIVERSAL MOBILE INTRO OVERRIDES */
  .${prefix}-intro-left {
    gap: 8px !important;
  }
  .${prefix}-intro-container {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .${prefix}-intro-desc {
    max-width: 352px !important;
    line-height: 22px !important; /* Force explicit figma text bound */
  }
`;

    if (content.includes('UNIVERSAL MOBILE INTRO OVERRIDES')) {
        console.log('Already patched ' + file);
        continue;
    }

    if (content.includes(mobileQuery)) {
        content = content.replace(mobileQuery, mobileQuery + overrides);
        fs.writeFileSync(filePath, content);
        console.log('Patched intro for ' + file);
    }
}

// BUMP ALL HTML CACHES
const rootDir = './';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
for (const f of htmlFiles) {
    const htmlPath = path.join(rootDir, f);
    let html = fs.readFileSync(htmlPath, 'utf8');

    let changed = false;
    html = html.replace(/href="css\/(.*?\.css)\?v=(\d+)"/g, (match, cssFile, version) => {
        changed = true;
        return 'href="css/' + cssFile + '?v=' + (parseInt(version) + 1) + '"';
    });

    if (changed) {
        fs.writeFileSync(htmlPath, html);
        console.log('Bumped cache for ' + f);
    }
}
