import os
import glob
import re

folder = r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold'
html_files = glob.glob(os.path.join(folder, '*.html'))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(r'<button type="submit" class="btn-send-message">.*?</button>', re.DOTALL)
    
    new_btn = '''<button type="submit" class="btn-send-message">
                            <span class="btn-text">SEND MESSAGE</span>
                            <span class="icon-circle">
                                <img src="assets/images/arrowcontact.png" alt="Send" style="width: 24px; height: 24px; object-fit: contain;">
                            </span>
                        </button>'''
    
    content = pattern.sub(new_btn, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated buttons in {len(html_files)} files.")
