const fs = require('fs');
const path = require('path');

const dir = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.php') && (f.startsWith('page-') || f === 'front-page.php' || f === 'home.php' || f === 'archive.php' || f === 'single.php'));

const startTag = '<!-- Testimonials -->';
const endTag = '</section>';
const replacement = "      <?php get_template_part('template-parts/testimonials'); ?>";

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const startIdx = content.indexOf(startTag);
    if (startIdx !== -1) {
        // Only if it's the hardcoded testimonials sector, we find the corresponding </section>
        const afterStart = content.substring(startIdx);
        // Ensure it is indeed the testimonials section
        if (afterStart.includes('<section id="testimonials" class="testimonials-section">')) {
            let sectionEndIdx = afterStart.indexOf(endTag) + endTag.length;

            // Reconstruct content
            content = content.substring(0, startIdx) + replacement + content.substring(startIdx + sectionEndIdx);
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
console.log('Done.');
