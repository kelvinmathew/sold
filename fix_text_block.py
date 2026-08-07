import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = """/* --- Text and Button Block (Right) --- */
.services-hero-text-block {
  position: absolute;
  top: 511px;
  left: 878px;
  width: 480px;
  height: 227px;
}

.services-hero-text-block p {
  position: absolute;
  top: 0;
  left: 0;
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

.services-hero-text-block .btn-get-started {
  position: absolute;
  top: 172px; /* 116 + 56 */
  left: 0;
  width: 329px;
  height: 55px;
  border-radius: 29px;
  background: #FFFFFF;
  text-decoration: none;
  display: block; /* to allow absolute positioning of children */
}

/* Let's style the text inside the button */
.services-hero-text-block .btn-get-started .btn-text-custom {
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
}

/* Also ensure the icon inside the button is positioned if needed, though they didn't specify it, it sits on the left. The existing icon-circle is probably fine, but let's make sure it doesn't break. */
.services-hero-text-block .btn-get-started .icon-circle {
  position: absolute;
  top: 5.39px; /* roughly centered vertically (55-43)/2 = 6, user didn't specify icon pos but it sits left */
  left: 10.34px;
}
"""

css = re.sub(r'/\* --- Text and Button Block \(Right\) --- \*/.*?gap: 56px;\n\}', new_css, css, flags=re.DOTALL)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Text block CSS updated.")
