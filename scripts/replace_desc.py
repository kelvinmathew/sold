import re

file_path = r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

target = 'Branding, brochures, project websites and sales materials that elevate your project and equip brokers to sell faster.'

# Replace the content of all <p class="service-desc"> elements with target
new_text = re.sub(r'<p class="service-desc">.*?</p>', f'<p class="service-desc">{target}</p>', text, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_text)

print('Descriptions updated successfully.')
