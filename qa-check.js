// QA Check Script - validates all file references in HTML files
const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'services.html', 'why-sold.html'];
const issues = [];

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        issues.push(`HTML FILE MISSING: ${file}`);
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    
    // Check src references (images, scripts)
    const srcRefs = content.matchAll(/src="([^"]+)"/g);
    for (const match of srcRefs) {
        const ref = match[1];
        if (!ref.startsWith('http') && !ref.startsWith('data:') && !ref.startsWith('#')) {
            const decoded = decodeURIComponent(ref);
            if (!fs.existsSync(decoded)) {
                issues.push(`MISSING asset in ${file}: ${ref}`);
            }
        }
    }
    
    // Check href references (CSS, links)
    const hrefRefs = content.matchAll(/href="([^"]+\.(css|js))"/g);
    for (const match of hrefRefs) {
        const ref = match[1];
        if (!ref.startsWith('http')) {
            if (!fs.existsSync(ref)) {
                issues.push(`MISSING CSS/JS in ${file}: ${ref}`);
            }
        }
    }
    
    // Check srcset references
    const srcsetRefs = content.matchAll(/srcset="([^"]+)"/g);
    for (const match of srcsetRefs) {
        const ref = match[1];
        if (!ref.startsWith('http')) {
            const decoded = decodeURIComponent(ref);
            if (!fs.existsSync(decoded)) {
                issues.push(`MISSING srcset in ${file}: ${ref}`);
            }
        }
    }
    
    // Check for broken internal page links
    const pageLinks = content.matchAll(/href="([^"#]+\.html)"/g);
    for (const match of pageLinks) {
        const ref = match[1];
        if (!ref.startsWith('http') && !fs.existsSync(ref)) {
            issues.push(`BROKEN page link in ${file}: ${ref}`);
        }
    }
});

// Check CSS for url() references
const cssFiles = ['css/style-v2.css', 'css/why-sold.css'];
cssFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        issues.push(`CSS FILE MISSING: ${file}`);
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    const urlRefs = content.matchAll(/url\(['"]?([^'")]+)['"]?\)/g);
    for (const match of urlRefs) {
        const ref = match[1];
        if (!ref.startsWith('http') && !ref.startsWith('data:') && !ref.startsWith('#')) {
            const resolved = path.resolve(path.dirname(file), ref);
            if (!fs.existsSync(resolved)) {
                issues.push(`MISSING CSS asset in ${file}: ${ref}`);
            }
        }
    }
});

// Check which CSS files each HTML references
htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    console.log(`\n--- ${file} loads: ---`);
    const cssRefs = content.matchAll(/href="([^"]+\.css)"/g);
    for (const match of cssRefs) console.log(`  CSS: ${match[1]}`);
    const jsRefs = content.matchAll(/src="([^"]+\.js)"/g);
    for (const match of jsRefs) console.log(`  JS:  ${match[1]}`);
});

console.log('\n=== QA RESULTS ===');
if (issues.length === 0) {
    console.log('✅ No broken references found!');
} else {
    console.log(`❌ Found ${issues.length} issue(s):`);
    issues.forEach(i => console.log(`  - ${i}`));
}
