const fs = require('fs');
const path = require('path');

const dir = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.php') && (f.startsWith('page-') || f === 'front-page.php' || f === 'home.php' || f === 'archive.php' || f === 'single.php'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/(<img\s+class="d-none\s+d-lg-block"\s*src="<\?php\s+echo\s+get_template_directory_uri\(\);\s*\?>\/assets\/images\/get_started_arrow\.png"\s*alt="Arrow"\s*)style="[^"]*"/g,
        '$1style="width: 100%; height: 100%; object-fit: contain; border-radius: 24px;"');

    content = content.replace(/nl2br\(\s*esc_html\(([^)]+)\)\s*\)/g, 'nl2br(wp_kses_post($1))');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
console.log('Done.');
