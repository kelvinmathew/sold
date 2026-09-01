const fs = require('fs');

const htmlReplacement = `        <div class="steps-container-wrapper">
          <!-- Absolute Positioned Header Elements -->
          <div class="sf-title-wrapper">
            <span class="sf-title-part">The</span>
            <img src="assets/images/soldclient.svg" alt="SOLD" class="sf-title-logo">
            <span class="sf-title-part">Success Formula</span>
          </div>

          <p class="sf-subtitle d-none d-lg-block">Everything campaign, big or small, is focused on one outcome:<br>
          <span class="orange-text">helping your business sell more.</span></p>

          <p class="sf-subtitle-mobile d-lg-none">Our three-step method blends strategy and creativity while keeping you in the loop</p>

          <div class="steps-container">`;

const files = [
    'c:/Users/HP/.gemini/antigravity-ide/scratch/sold/services.html',
    'c:/Users/HP/.gemini/antigravity-ide/scratch/sold/why-sold.html'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let regex = /<div class="steps-container-wrapper">\s*<div class="steps-container">\s*<!-- Title Container -->\s*<div class="steps-title-wrapper">[\s\S]*?<p class="steps-subtitle">[\s\S]*?<\/p>/;

    if (regex.test(content)) {
        let replaced = content.replace(regex, htmlReplacement);
        fs.writeFileSync(f, replaced);
        console.log('Replaced HTML in ' + f);
    } else {
        console.log('Regex did not match in ' + f);
    }
});
