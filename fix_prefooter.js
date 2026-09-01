const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Note: scratch folder has no glob module but we can just use fs.readdirSync

const dir = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.php') && (f.startsWith('page-') || f === 'front-page.php' || f === 'home.php' || f === 'archive.php' || f === 'single.php'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Fix the desktop arrow style to 100%
    content = content.replace(/(<img\s+class="d-none\s+d-lg-block"(?:[\s\S]*?)src="<\?php\s+echo\s+get_template_directory_uri\(\);\s*\?>\/assets\/images\/get_started_arrow\.png"\s+alt="Arrow"(?:[\s\S]*?))style="[^"]*"/g,
        '$1style="width: 100%; height: 100%; object-fit: contain; border-radius: 24px;"');

    // 2. Fix the mobile arrow style to 100% (though most are already 100%)
    content = content.replace(/(<img\s+class="d-lg-none(?:[\s\S]*?)src="<\?php\s+echo\s+get_template_directory_uri\(\);\s*\?>\/assets\/images\/(?:pre-footer-arrow-mob\.svg|Frame%206\.svg)"(?:[\s\S]*?))style="[^"]*"/g,
        '$1style="width: 100%; height: 100%; object-fit: contain; border-radius: 24px;"');

    // 3. Fix the nl2br(esc_html()) to just be wp_kses_post() or completely remove the esc_html to allow <br>
    content = content.replace(/nl2br\(\s*esc_html\(([^)]+)\)\s*\)/g, 'nl2br(wp_kses_post($1))');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
console.log('Done.');
