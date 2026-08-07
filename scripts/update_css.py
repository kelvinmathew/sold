import re

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\css\style.css', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update .footer-heading
text = re.sub(
    r'\.footer-heading \{.*?padding-bottom: 1\.0416cqi;.*?\}',
    '''.footer-heading {
  font-family: "Mona Sans", var(--font-heading);
  font-size: 3.125cqi;
  font-weight: 400;
  line-height: 1.875cqi;
  letter-spacing: -0.03em;
  color: #1B3834;
  margin: 0;
  padding: 0;
}''', text, flags=re.DOTALL)

# 2. Update .footer-headingg
text = re.sub(
    r'\.footer-headingg \{.*?margin: 0 0 0\.5555cqi 0;.*?\}',
    '''.footer-headingg {
  font-family: "Mona Sans", var(--font-heading);
  font-size: 3.125cqi;
  font-weight: 400;
  line-height: 1.875cqi;
  letter-spacing: -0.03em;
  color: #1B3834;
  margin: 0;
  padding: 0;
}''', text, flags=re.DOTALL)

# 3. Update margins and width for footer-links-list in the three groups
# Services list
text = re.sub(
    r'\.footer-col-services \.footer-links-list \{[^{}]*?margin-top: 1\.3888cqi;[^{}]*?\}',
    '''.footer-col-services .footer-links-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 35px;
  width: 198px;
  height: 174px;
}''', text, flags=re.DOTALL)

# Quick links list
text = re.sub(
    r'\.quick-links-group \.footer-links-list \{[^{}]*?gap: 0;[^{}]*?height: auto;\s*\}',
    '''.quick-links-group .footer-links-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 35px;
  width: 198px;
  height: 174px;
}''', text, flags=re.DOTALL)

# Legal group list
text = re.sub(
    r'\.legal-group \.footer-links-list \{[^{}]*?gap: 0;[^{}]*?height: auto;\s*\}',
    '''.legal-group .footer-links-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 35px;
  width: 198px;
  height: 174px;
}''', text, flags=re.DOTALL)

with open(r'c:\Users\HP\.gemini\antigravity-ide\scratch\sold\css\style.css', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated width, height, and gap-to-heading.')
