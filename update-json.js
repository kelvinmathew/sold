const fs = require('fs');

const hubPath = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme/acf-json/group_services_hub.json';
const whyPath = 'c:/xampp/htdocs/sold/wp-content/themes/sold-theme/acf-json/group_why_sold_page.json';

const hub = JSON.parse(fs.readFileSync(hubPath, 'utf8'));
const why = JSON.parse(fs.readFileSync(whyPath, 'utf8'));

let steps = null;
let prefoot = null;

for (const field of why.fields) {
    if (field.name === 'ws_steps') steps = JSON.parse(JSON.stringify(field));
    if (field.name === 'ws_prefoot') prefoot = JSON.parse(JSON.stringify(field));
}

steps.key = 'field_sh_steps';
steps.name = 'sh_steps';
for (const sf of steps.sub_fields) {
    sf.key = sf.key.replace('wss_', 'shs_');
    sf.parent_repeater = undefined;
}

prefoot.key = 'field_sh_prefoot';
prefoot.name = 'sh_prefoot';
for (const pf of prefoot.sub_fields) {
    pf.key = pf.key.replace('ws_pref_', 'sh_pref_');
    pf.parent_repeater = undefined;
}

hub.fields.push(steps);
hub.fields.push(prefoot);

fs.writeFileSync(hubPath, JSON.stringify(hub, null, 4));
console.log('Successfully injected Steps and Prefooter blocks into the Services Hub ACF model!');
