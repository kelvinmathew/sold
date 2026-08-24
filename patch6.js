const fs = require('fs');
const path = require('path');

let css = fs.readFileSync('css/style-v2.css', 'utf8');

// Replace corrupted viewport constraints inside FAQ Mobile
css = css.replace(/padding: 0 9\.92vw !important;/g, 'padding: 0 22.5px !important;');
css = css.replace(/gap: 9\.16vw !important;/g, 'gap: 36px !important;');
css = css.replace(/gap: 2\.29vw !important;/g, 'gap: 9px !important;');
css = css.replace(/width: 0\.51vw !important;/g, 'width: 2px !important;');
css = css.replace(/height: 5\.6vw !important;/g, 'height: 22px !important;');
css = css.replace(/font-size: 5\.09vw !important;/g, 'font-size: 20px !important;');
css = css.replace(/line-height: 7\.63vw !important;/g, 'line-height: 30px !important;');
css = css.replace(/padding-top: 2\.54vw !important;/g, 'padding-top: 10px !important;');
css = css.replace(/padding-bottom: 5\.34vw !important;/g, 'padding-bottom: 21px !important;');
css = css.replace(/font-size: 3\.56vw !important;/g, 'font-size: 14px !important;');
css = css.replace(/line-height: 5\.09vw !important;/g, 'line-height: 20px !important;');
css = css.replace(/margin-top: 3\.05vw !important;/g, 'margin-top: 12px !important;');

// Care needed for `gap: 0 !important;` in .faq-mobile-list
css = css.replace(/\.faq-mobile-list \{\s*display: flex !important;\s*flex-direction: column !important;\s*gap: 0 !important;/g, '.faq-mobile-list {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 9px !important;');

fs.writeFileSync('css/style-v2.css', css);
console.log('patched style-v2.css');

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
