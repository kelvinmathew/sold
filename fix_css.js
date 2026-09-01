const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');

// Fix client-success.css
let csContent = fs.readFileSync(path.join(cssDir, 'client-success.css'), 'utf8');
if (csContent.includes('.cs-pre-footer .btn-pre-footer {')) {
    csContent = csContent.replace(/\}\s*\n\s*\.cs-pre-footer \.btn-pre-footer \{/g, '\n.cs-pre-footer .btn-pre-footer {');
    csContent = csContent.replace(/\.cs-pre-footer \.btn-pre-footer \.btn-text \{\s*color: #[0-9A-Fa-f]+;\s*\}/g, match => match + '\n}');
    fs.writeFileSync(path.join(cssDir, 'client-success.css'), csContent);
    console.log('Fixed client-success.css');
}

// Fix insights.css
let inContent = fs.readFileSync(path.join(cssDir, 'insights.css'), 'utf8');
if (inContent.includes('.cs-pre-footer .btn-pre-footer {')) {
    inContent = inContent.replace(/\}\s*\n\s*\.cs-pre-footer \.btn-pre-footer \{/g, '\n.cs-pre-footer .btn-pre-footer {');
    inContent = inContent.replace(/\.cs-pre-footer \.btn-pre-footer \.btn-text \{\s*color: #[0-9A-Fa-f]+;\s*\}\s*\n/g, match => match + '}\n');
}
// Remove mobile overrides in insights.css
const insightsMobRegex = /\/\*\s*Insights Mobile Pre-Footer Overrides[\s\S]*?(?=\/\*|$)/;
if (insightsMobRegex.test(inContent)) {
    inContent = inContent.replace(insightsMobRegex, '');
    console.log('Removed insights.css mobile prefooter overrides');
}
fs.writeFileSync(path.join(cssDir, 'insights.css'), inContent);

// Fix insights-details.css
let inDetContent = fs.readFileSync(path.join(cssDir, 'insights-details.css'), 'utf8');
const insightsDetMobRegex = /\/\*\s*Insights Details Mobile Pre-Footer Overrides[\s\S]*?(?=\/\*|$)/;
if (insightsDetMobRegex.test(inDetContent)) {
    inDetContent = inDetContent.replace(insightsDetMobRegex, '');
    console.log('Removed insights-details.css mobile prefooter overrides');
}
fs.writeFileSync(path.join(cssDir, 'insights-details.css'), inDetContent);

// Fix events.css
let evContent = fs.readFileSync(path.join(cssDir, 'events.css'), 'utf8');
const evMobRegex = /\/\*\s*=+[\s]*8\. EVENTS PRE-FOOTER \(MOBILE\)[\s\S]*?(?=\/\*|$)/;
if (evMobRegex.test(evContent)) {
    evContent = evContent.replace(evMobRegex, '');
    console.log('Removed events.css mobile prefooter overrides');
}
fs.writeFileSync(path.join(cssDir, 'events.css'), evContent);

console.log('All CSS fixed.');
