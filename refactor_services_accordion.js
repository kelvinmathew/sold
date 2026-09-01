const fs = require('fs');
const path = require('path');

const dir = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.php') && (f.startsWith('page-') || f === 'front-page.php' || f === 'home.php' || f === 'archive.php' || f === 'single.php'));

const startTagStr1 = '<section id="services" class="services-list-section">';
const startTagStr2 = '<section id="services" class="services-list-section "'; // handle variations
const endTag = '</section>';
const replacement = "  <?php get_template_part('template-parts/services-accordion'); ?>";

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    let startIdx = content.indexOf(startTagStr1);
    if (startIdx === -1) {
        startIdx = content.indexOf(startTagStr2);
    }

    if (startIdx !== -1) {
        const afterStart = content.substring(startIdx);
        // Ensure this is truly the services accordion structure to avoid replacing things incorrectly
        if (afterStart.includes('services-accordion-new') || afterStart.includes('Strategic marketing solutions')) {
            let sectionEndIdx = afterStart.indexOf(endTag) + endTag.length;
            content = content.substring(0, startIdx) + replacement + content.substring(startIdx + sectionEndIdx);
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
console.log('Done.');
