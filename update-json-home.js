const fs = require('fs');

const homePath = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme/acf-json/group_home_page.json';
const whyPath = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme/acf-json/group_why_sold_page.json';

const home = JSON.parse(fs.readFileSync(homePath, 'utf8'));
const why = JSON.parse(fs.readFileSync(whyPath, 'utf8'));

let prefoot = null;

for (const field of why.fields) {
    if (field.name === 'ws_prefoot') prefoot = JSON.parse(JSON.stringify(field));
}

prefoot.key = 'field_h_prefoot';
prefoot.name = 'home_prefoot';
for (const pf of prefoot.sub_fields) {
    pf.key = pf.key.replace('ws_pref_', 'h_pref_');
    pf.parent_repeater = undefined;
}

home.fields.push(prefoot);

fs.writeFileSync(homePath, JSON.stringify(home, null, 4));
console.log('Successfully injected Prefooter block into the Home Page ACF model!');
