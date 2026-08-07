import re

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# The block to find:
# <svg width="27" height="7" viewBox="0 0 26.29 7.25" fill="none" xmlns="http://www.w3.org/2000/svg">
#   <line x1="0" y1="3.6" x2="22.5" y2="3.6" stroke="white" stroke-width="2" />
#   <polygon points="22,0 26.29,3.6 22,7.25" fill="white" />
# </svg>

old_svg = re.compile(r'<svg width="27" height="7"[^>]*>.*?<\/svg>', re.DOTALL)

# The new HTML block with mobile SVG and desktop Image
new_html = '''<svg class="d-lg-none" width="27" height="7" viewBox="0 0 26.29 7.25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="3.6" x2="22.5" y2="3.6" stroke="white" stroke-width="2" />
              <polygon points="22,0 26.29,3.6 22,7.25" fill="white" />
            </svg>
            <img class="d-none d-lg-block" src="assets/images/get_started_arrow.png" alt="Arrow" style="width: 42px; height: 45px; object-fit: contain; border-radius: 24px;">'''

text = old_svg.sub(new_html, text)

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Replaced GET STARTED NOW arrow with image for web.')
