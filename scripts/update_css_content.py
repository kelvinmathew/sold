import re

css_path = 'c:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\sold\\css\\insights-details.css'
with open(css_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the body section rules in the desktop media query
desktop_pattern = re.compile(r'(\.insights-details-container\s*{)[^}]+(}\s*\.insights-details-content\s*{)[^}]+(}\s*\.insights-details-body\s*p\s*{)[^}]+(})', re.DOTALL)

desktop_new = r"""\1
    width: 95.9028vw; /* 1381/1440 */
    max-width: 1381px;
    background: #FFFFFF;
    border-radius: 1.3889vw; /* 20/1440 */
    overflow: hidden;
    box-shadow: 0 0.2778vw 1.3889vw rgba(0, 0, 0, 0.05);
  \2
    padding: 5.5556vw; /* 80/1440 */
    display: flex;
    justify-content: center;
  }

  .insights-details-body {
    width: 100%;
    max-width: 84.7917vw; /* 1221/1440 */
    display: flex;
    flex-direction: column;
    gap: 5.2083vw; /* 75/1440 - Figma gap */
  }

  .insights-details-paragraph {
    font-family: 'Mona Sans', sans-serif;
    font-weight: 400;
    font-size: 2.2917vw; /* 33/1440 */
    line-height: 2.9167vw; /* 42/1440 */
    letter-spacing: 0.01em;
    color: #000000;
    margin: 0;
  }

  .insights-details-subtitle {
    font-family: 'Mona Sans', sans-serif;
    font-weight: 700;
    font-size: 3.125vw; /* 45/1440 */
    line-height: 3.4722vw; /* 50/1440 */
    letter-spacing: 0.01em;
    color: #000000;
    margin: 0;
  }

  .insights-details-list {
    margin: 0;
    padding-left: 2.0833vw; /* 30/1440 */
    font-family: 'Mona Sans', sans-serif;
    font-weight: 400;
    font-size: 2.2917vw; /* 33/1440 */
    line-height: 2.9167vw; /* 42/1440 */
    letter-spacing: 0.01em;
    color: #000000;
    list-style-type: none; /* Removing default disc as requested by exact Figma match */
  }

  .insights-details-list li {
    position: relative;
  }

  .insights-details-list li::before {
    content: '- ';
    position: absolute;
    left: -1.3889vw; /* 20/1440 */
  \4"""

content = desktop_pattern.sub(desktop_new, content)


# Replace the mobile section rules
mobile_pattern = re.compile(r'(\.insights-details-container\s*{)[^}]+(}\s*\.insights-details-content\s*{)[^}]+(}\s*\.insights-details-body\s*p\s*{)[^}]+(})', re.DOTALL)

# Since we updated the desktop match, we have to find the second occurrence. 
# We'll just replace the whole mobile media query part for safety using a simpler approach.

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(content)
