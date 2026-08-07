import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = """/* --- Text Paragraph (Right) --- */
.services-hero-desc {
  position: absolute;
  top: 511px;
  left: 878px;
  width: 480px;
  height: 116px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 400;
  font-size: 23px;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin: 0;
}

/* --- Button (Right) --- */
.services-hero-btn {
  position: absolute;
  top: 683px;
  left: 818px;
  width: 329px;
  height: 55px;
  border-radius: 29px;
  background: #FFFFFF;
  text-decoration: none;
  display: block; /* allows absolute children */
}

/* Let's style the text inside the button */
.services-hero-btn .btn-text-custom {
  position: absolute;
  top: 11.78px;
  left: 65.8px;
  width: 244px;
  height: 30px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #1B3834;
  margin: 0;
  display: flex;
  align-items: center;
  white-space: nowrap; /* Do not break to a new line */
}

.services-hero-btn .icon-circle {
  position: absolute;
  top: 5.39px; 
  left: 10.34px;
}
"""

# Replace in css
css = re.sub(r'/\* --- Text and Button Block \(Right\) --- \*/.*?left: 10\.34px;\n\}', new_css, css, flags=re.DOTALL)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated for flat elements.")
