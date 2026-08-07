import re

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html', 'r', encoding='utf-8') as f:
    text = f.read()

old_svg = re.compile(r'<svg class="d-none d-lg-block"[^>]*>.*?</svg>', re.DOTALL)
new_img = '<img class="d-none d-lg-block discover-arrow-img" src="assets/images/discover_arrow.png" alt="Arrow" style="width: 32px; height: 10px; object-fit: contain;">'

text = old_svg.sub(new_img, text)

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Replaced inline SVG with image tag.')
