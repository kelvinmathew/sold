const fs = require('fs');
const path = require('path');

const cssDir = './css';
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Restore gap: 11px !important; inside UNIVERSAL MOBILE INTRO OVERRIDES
    if (content.includes('gap: 8px !important;')) {
        content = content.replace(/gap: 8px !important;/g, 'gap: 11px !important;');
        fs.writeFileSync(filePath, content);
        console.log('Restored 11px gap for ' + file);
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
