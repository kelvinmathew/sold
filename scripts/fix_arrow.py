import re

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('style="width: 32px; height: 10px; object-fit: contain;"', 'style="width: 41.53px; height: 44px; object-fit: contain; border-radius: 24px;"')

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated arrow dimensions to perfectly match the asset.')
