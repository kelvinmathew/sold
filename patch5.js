const fs = require('fs');
const path = require('path');

const cssDir = './css';
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
let anyChanged = false;

for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Look for any image classes ending in -img or similar inside mobile code block that have object-fit: contain;
    // Based on my grep, ai-marketing.css line 612 and 1121 have object-fit: contain;

    if (content.includes('object-fit: contain;')) {
        content = content.replace(/object-fit:\s*contain;/g, 'object-fit: cover !important;');
        fs.writeFileSync(filePath, content);
        anyChanged = true;
        console.log('Replaced object-fit for ' + file);
    }
}

if (anyChanged) {
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
}
