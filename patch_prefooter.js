const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css') && !f.startsWith('style') && f !== 'home-faq-mobile.css');

files.forEach(file => {
    let content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    let original = content;

    // Pattern 1: Delete entire MOBILE overrides block under "7. PRE-FOOTER OVERRIDES (MOBILE)" or similar inside @media (max-width: 991px)
    // Find the start of "PRE-FOOTER OVERRIDES (MOBILE)"
    const mobileRegex1 = /\/\* =+\s*\d+\.\s*PRE-FOOTER OVERRIDES \(MOBILE\)\s*=+\s*\*\/[\s\S]*?(?=\/\* =+)/;
    if (mobileRegex1.test(content)) {
        content = content.replace(mobileRegex1, '');
        console.log(`Deleted PRE-FOOTER OVERRIDES (MOBILE) in ${file}`);
    }

    // Process "Pre-Footer Overrides for Client Success Page" type un-wrapped rules
    if (file === 'client-success.css' || file === 'insights.css' || file === 'events.css' || file === 'insights-details.css') {
        const desktopRegex = /(\/\* --- Pre-Footer Overrides[^\*]*\*\/\s*)((\.[\w-]+\s+\.pre-footer(-title)?[\s\S]*?\})+(?=[\s\S]*?(?:\/\*|$)))/i;
        const match = content.match(desktopRegex);
        if (match) {
            // Check if it's already inside a media query (very basic heuristic)
            const beforeMatch = content.substring(0, match.index);
            const openBraces = (beforeMatch.match(/\{/g) || []).length;
            const closeBraces = (beforeMatch.match(/\}/g) || []).length;
            if (openBraces === closeBraces) {
                // It's not wrapped in a media query! Let's wrap it in min-width 992px
                const replacement = match[1] + `@media (min-width: 992px) {\n` + match[2] + `\n}\n`;
                content = content.replace(match[0], replacement);
                console.log(`Wrapped un-wrapped Pre-Footer rules in ${file}`);
            }
        }
    }

    if (content !== original) {
        fs.writeFileSync(path.join(cssDir, file), content);
    }
});
console.log('Done fixing pre-footers.');
