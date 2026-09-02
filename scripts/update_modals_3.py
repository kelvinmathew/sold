import os
import re
import glob

# Source folder
folder = r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold'
html_files = glob.glob(os.path.join(folder, '*.html'))

count = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the manual <br> that caused the bad wrap, relying on accurate container width instead
    new_content = content.replace(
        '<span style="max-width: 284px;">The Meydan Hotel | Grandstand |<br>Meydan Road, Dubai</span>',
        '<span style="max-width: 284px; width: 284px; display: inline-block;">The Meydan Hotel | Grandstand | Meydan Road, Dubai</span>'
    )
    
    # Update Company Name full-row to regular form-row (it will auto-size to 280px per our new CSS)
    new_content = new_content.replace(
        '''<div class="form-row full-row">
                  <div class="form-group" style="width: 100%;">
                    <input type="text" class="form-control-custom" placeholder="Company Name*">
                  </div>
                </div>''',
        '''<div class="form-row">
                  <div class="form-group">
                    <input type="text" class="form-control-custom" placeholder="Company Name*">
                  </div>
                </div>'''
    )
    # Accounting for indentation differences in my previous Python run
    new_content = new_content.replace(
        '''<div class="form-row full-row">
                            <div class="form-group" style="width: 100%;">
                                <input type="text" class="form-control-custom" placeholder="Company Name*">
                            </div>
                        </div>''',
        '''<div class="form-row">
                            <div class="form-group">
                                <input type="text" class="form-control-custom" placeholder="Company Name*">
                            </div>
                        </div>'''
    )
    
    # Another variation in whitespace
    new_content = re.sub(
        r'<div class="form-row full-row">\s*<div class="form-group" style="width:\s*100%;">\s*<input type="text" class="form-control-custom" placeholder="Company Name\*">\s*</div>\s*</div>',
        '<div class="form-row">\n                  <div class="form-group">\n                    <input type="text" class="form-control-custom" placeholder="Company Name*">\n                  </div>\n                </div>',
        new_content
    )


    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {os.path.basename(file)}')
        count += 1
        
print(f'Updated a total of {count} files.')
