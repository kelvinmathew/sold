import os
import glob
import re

folder = r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold'
html_files = glob.glob(os.path.join(folder, '*.html'))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add or update version query string for contact.css
    # e.g., href="css/contact.css" -> href="css/contact.css?v=2"
    # Or href="css/contact.css?v=..." -> href="css/contact.css?v=2"
    
    content = re.sub(r'href="css/contact\.css(\?v=\d+)?"', 'href="css/contact.css?v=2"', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated cache-busters in {len(html_files)} files.")
