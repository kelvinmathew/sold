import os
import re
import glob

# Source folder
folder = r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold'
html_files = glob.glob(os.path.join(folder, '*.html'))

replacement_left = """<!-- Left Side (Dark Panel) -->
            <div class="contact-modal-left">
              <h2 class="contact-title">Contact <br>The Team</h2>

              <div class="contact-info-list">
                <div class="contact-info-item">
                  <div class="contact-icon">
                    <img src="assets/images/call.png" alt="Call" style="width: 24px; height: 24px; object-fit: contain;">
                  </div>
                  <span>+971 58 593 1979</span>
                </div>
                <div class="contact-info-item">
                  <div class="contact-icon">
                    <img src="assets/images/office.png" alt="Office" style="width: 24px; height: 24px; object-fit: contain;">
                  </div>
                  <span>growth@getsold.ae</span>
                </div>
                <div class="contact-info-item align-start">
                  <div class="contact-icon">
                    <img src="assets/images/car.png" alt="Car" style="width: 24px; height: 24px; object-fit: contain;">
                  </div>
                  <span style="max-width: 284px;">The Meydan Hotel | Grandstand |<br>Meydan Road, Dubai</span>
                </div>
              </div>
            </div>

            <!-- Right Side (Form Panel) -->"""

count = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply left side changes (adding back the manual <br> for same line and removing margin-top:2px)
    pattern_left = re.compile(r'<!-- Left Side \(Dark Panel\) -->.*?<!-- Right Side \(Form Panel\) -->', re.DOTALL)
    new_content = pattern_left.sub(replacement_left, content)

    # Change logosold_dark to contactlogo in the Right side Form Panel logo
    new_content = re.sub(r'<img[^>]*src="assets/images/logosold_dark\.png"[^>]*class="contact-logo"[^>]*>', '<img src="assets/images/contactlogo.png" alt="SOLD Logo" class="contact-logo">', new_content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {os.path.basename(file)}')
        count += 1
        
print(f'Updated a total of {count} files.')
