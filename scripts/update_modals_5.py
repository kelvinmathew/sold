import os
import glob
import re

folder = r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold'
html_files = glob.glob(os.path.join(folder, '*.html'))

new_contact_list = """<div class="contact-info-list">
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
                  <span style="max-width: 284px; width: 284px; display: inline-block;">The Meydan Hotel | Grandstand | Meydan Road, Dubai</span>
                </div>
              </div>"""

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find boundaries safely
    start_str = '<div class="contact-info-list">'
    end_str = '            <!-- Right Side (Form Panel) -->'
    
    idx_start = content.find(start_str)
    idx_end = content.find(end_str)
    
    if idx_start != -1 and idx_end != -1 and idx_start < idx_end:
        # We need to preserve the whitespace exactly, so let's backtrack idx_end to its previous </div>
        # Actually it's safer to just replace from idx_start to the </div> right before Right Panel.
        content = content[:idx_start] + new_contact_list + "\n            </div>\n\n" + content[idx_end:]
    
    # Replace the logo
    content = re.sub(
        r'<img[^>]*src="assets/images/logosold_dark\.png"[^>]*class="contact-logo"[^>]*>', 
        '<img src="assets/images/contactlogo.png" alt="SOLD Logo" class="contact-logo">', 
        content
    )
    
    # Replace the full-row Company Name with narrow row
    pattern = re.compile(r'<div class="form-row full-row">\s*<div class="form-group" style="width:\s*100%;">\s*<input type="text" class="form-control-custom" placeholder="Company Name\*">\s*</div>\s*</div>')
    content = pattern.sub(r'<div class="form-row">\n                  <div class="form-group">\n                    <input type="text" class="form-control-custom" placeholder="Company Name*">\n                  </div>\n                </div>', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated successfully with safe indexing.')
