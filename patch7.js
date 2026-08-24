const fs = require('fs');
const path = require('path');

const cssDir = './css';
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix the globally corrupted 11px gap back to 8px for the breadcrumbs ONLY
    if (content.includes('gap: 11px !important;') && content.includes('.social-hero-breadcrumb {')) {
        content = content.replace(/\.social-hero-breadcrumb \{\s*margin-left: 0 !important;\s*gap: 11px !important;/g, '.social-hero-breadcrumb {\n    margin-left: 0 !important;\n    gap: 8px !important;');
    }

    // Specific fix for seo-geo margin gap (34px instead of global 24px assumption)
    if (file === 'seo-geo.css') {
        content = content.replace(/margin-bottom: 24px !important; \/\* True Figma Mobile Gap to Breadcrumb \*\//g, 'margin-bottom: 34px !important; /* True Figma Mobile Gap to Breadcrumb */');
    }

    fs.writeFileSync(filePath, content);
}
console.log('Fixed breadcrumb gap globally and SEO specific 34px gap.');

// BUMP ALL HTML CACHES
const rootDir = './';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
let bumped = false;
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
        bumped = true;
    }
}
if (bumped) { console.log('Bumped cache'); }
