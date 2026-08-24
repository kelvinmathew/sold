const fs = require('fs');
const path = require('path');

const cssDir = './css';
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of cssFiles) {
    const filePath = path.join(cssDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Prefix extraction like .social, .seo, .lead tracking the hero string
    const prefixMatch = content.match(/\.([a-zA-Z0-9-]+)-hero-breadcrumb/);
    if (!prefixMatch) continue;

    const prefix = prefixMatch[1]; // social, seo, lead, etc.

    // Some files might be ws-hero-breadcrumb, etc.
    const isWS = prefix === 'ws'; // why-sold uses .ws-hero-breadcrumb

    const mobileQuery = '@media (max-width: 991px) {';

    // We want to force the gap between title container and breadcrumbs
    // Breadcrumb icon -> 23x15
    // Breadcrumb text -> 13px / 29px line height
    const titleContainer = isWS ? 'ws-hero-content' : `${prefix}-hero-text-container`;

    const overrides = `
  /* UNIVERSAL MOBILE BREADCRUMB OVERRIDES */
  .${prefix}-hero-breadcrumb {
    margin-left: 0 !important;
    gap: 8px !important;
  }
  .${prefix}-hero-breadcrumb a,
  .${prefix}-hero-breadcrumb .current,
  .${prefix}-hero-breadcrumb .ws-breadcrumb-current,
  .${prefix}-hero-breadcrumb .ws-breadcrumb-home {
    font-size: 13px !important;
    line-height: 29px !important;
    text-decoration: none !important;
    color: #ffffff !important;
    opacity: 1 !important;
  }
  .${prefix}-hero-breadcrumb img.breadcrumb-icon,
  .${prefix}-hero-breadcrumb img.ws-breadcrumb-icon {
    width: 23px !important;
    height: 15px !important;
    object-fit: fill !important;
  }
  .${titleContainer} {
    margin-bottom: 24px !important; /* True Figma Mobile Gap to Breadcrumb */
    gap: 10px !important;
  }
  .${prefix}-hero-title {
    font-size: 34.2px !important;
    line-height: 43px !important;
  }
  .${prefix}-hero-subtitle {
    font-size: 16px !important;
    line-height: 30px !important;
  }
`;

    if (content.includes('UNIVERSAL MOBILE BREADCRUMB OVERRIDES')) {
        console.log(`Already patched ${file}`);
        continue;
    }

    // Insert precisely under the mobile marker
    if (content.includes(mobileQuery)) {
        content = content.replace(mobileQuery, mobileQuery + overrides);
        fs.writeFileSync(filePath, content);
        console.log(`Patched ${file}`);
    }
}

// BUMP ALL HTML CACHES
const rootDir = './';
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
for (const f of htmlFiles) {
    const htmlPath = path.join(rootDir, f);
    let html = fs.readFileSync(htmlPath, 'utf8');

    // increment CSS cache query strings
    let changed = false;
    html = html.replace(/href="css\/(.*?\.css)\?v=(\d+)"/g, (match, cssFile, version) => {
        changed = true;
        return 'href="css/' + cssFile + '?v=' + (parseInt(version) + 1) + '"';
    });

    if (changed) {
        fs.writeFileSync(htmlPath, html);
        console.log(`Bumped cache for ${f}`);
    }
}
