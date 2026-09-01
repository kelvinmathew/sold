const fs = require('fs');
const path = require('path');

const dir = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme';
const files = ['front-page.php', 'page-services.php']; // These are the files where it was hardcoded based on earlier grep

const startTag = '<section id="who-we-work" class="who-we-work-section">';
const endTag = '</section>';
const replacement = "  <?php get_template_part('template-parts/who-we-work'); ?>";

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const startIdx = content.indexOf(startTag);
    if (startIdx !== -1) {
        const afterStart = content.substring(startIdx);
        // Find matching </section>
        let sectionEndIdx = afterStart.indexOf(endTag) + endTag.length;
        content = content.substring(0, startIdx) + replacement + content.substring(startIdx + sectionEndIdx);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
console.log('Done.');
