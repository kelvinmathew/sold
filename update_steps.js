const fs = require('fs');

const sfDesktopCSS = `
/* Copied SF Title Wrapper configurations */
.sf-title-wrapper {
  position: absolute;
  top: 1.0417cqi;
  left: 25.0694cqi;
  width: 50.0694cqi;
  height: 4.0972cqi;
  display: flex;
  justify-content: center;
  gap: .9cqi;
  align-items: baseline;
}
.sf-title-part {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 800;
  font-size: 3.6111cqi;
  line-height: 4.0972cqi;
  letter-spacing: 0.01em;
  color: #263238;
  margin: 0;
}
.sf-title-logo {
  width: 9.375cqi;
  height: 3.3333cqi;
  object-fit: cover !important;
  transform: translateY(0.4cqi);
}
.sf-subtitle {
  position: absolute;
  top: 6.3889cqi;
  left: 30cqi;
  width: 40.0694cqi;
  text-align: center;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 600;
  font-size: 1.1806cqi;
  line-height: 1.7361cqi;
  letter-spacing: 0.02em;
  color: #000000;
  margin: 0;
}
.sf-subtitle .orange-text {
  color: #FFA726;
}
`;

const sfMobileCSS = `
@media (max-width: 991px) {
  .sf-title-wrapper {
    position: relative !important;
    top: auto !important;
    transform: none !important;
    left: auto !important;
    width: 100% !important;
    height: auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 11px !important;
    margin-bottom: 0 !important;
  }
  .sf-title-part {
    font-family: 'Mona Sans', sans-serif !important;
    font-weight: 800 !important;
    font-size: 20px !important;
    line-height: 12px !important;
    letter-spacing: 0.01em !important;
    color: #263238 !important;
    text-align: center !important;
  }
  .sf-title-logo {
    width: 57px !important;
    height: 20px !important;
    object-fit: contain !important;
  }
  .sf-subtitle-mobile {
    font-family: 'Mona Sans', sans-serif !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    line-height: 17px !important;
    letter-spacing: 0.01em !important;
    color: #5D5C5C !important;
    text-align: center !important;
    margin: 15px auto 30px auto !important;
    width: 100% !important;
    max-width: 298px !important;
  }
}
`;

let stylePath = 'c:/Users/HP/.gemini/antigravity-ide/scratch/sold/css/style-v2.css';
let styleContent = fs.readFileSync(stylePath, 'utf8');
if (!styleContent.includes('.sf-title-wrapper')) {
    fs.writeFileSync(stylePath, styleContent + '\n' + sfDesktopCSS + '\n' + sfMobileCSS);
    console.log('Appended SF CSS to style-v2.css');
}

const htmlReplacement = `            <!-- Absolute Positioned Header Elements -->
            <div class="sf-title-wrapper">
              <span class="sf-title-part">The</span>
              <img src="assets/images/soldclient.svg" alt="SOLD" class="sf-title-logo">
              <span class="sf-title-part">Success Formula</span>
            </div>
            
            <p class="sf-subtitle d-none d-lg-block">Everything campaign, big or small, is focused on one outcome:<br>
            <span class="orange-text">helping your business sell more.</span></p>
            
            <p class="sf-subtitle-mobile d-lg-none">Our three-step method blends strategy and creativity while keeping you in the loop</p>`;

const files = [
    'c:/Users/HP/.gemini/antigravity-ide/scratch/sold/services.html',
    'c:/Users/HP/.gemini/antigravity-ide/scratch/sold/why-sold.html'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let regex = /<div class="steps-title-wrapper">[\s\S]*?<p class="steps-subtitle">[\s\S]*?<\/p>/;

    if (regex.test(content)) {
        let replaced = content.replace(regex, htmlReplacement);
        fs.writeFileSync(f, replaced);
        console.log('Replaced HTML in ' + f);
    } else {
        console.log('Regex did not match in ' + f);
    }
});
