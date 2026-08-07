import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We will replace the entire services-hero-title-container block and below
new_css_block = """/* --- Title Container (Left) --- */
.services-hero-title-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.services-hero-title-top {
  position: absolute;
  top: 239px;
  left: 64px;
  width: 785px;
  height: 58px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-size: 67px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin: 0;
  display: flex;
  align-items: center;
}

.services-hero-title-bottom {
  position: absolute;
  top: 297px;
  left: 64px;
  width: 785px;
  height: 74px;
  font-family: 'Mona Sans', sans-serif;
  margin: 0;
  display: flex;
  align-items: center;
}

.services-hero-title-bottom .orange-italic {
  font-weight: 700;
  font-style: italic;
  font-size: 69px;
  line-height: 30px;
  letter-spacing: -0.03em;
  color: #FFA726;
  margin-right: 15px;
}

.services-hero-title-bottom .white-bold {
  font-weight: 700;
  font-size: 69px;
  line-height: 30px;
  letter-spacing: -0.03em;
  color: #FFFFFF;
}

/* --- Text and Button Block (Right) --- */
.services-hero-text-block {
  position: absolute;
  top: 511px;
  right: 64px;
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}"""

# Replace in css
css = re.sub(r'/\* --- Title Container \(Left\) --- \*/.*?/\* --- Text and Button Block \(Right\) --- \*/.*?gap: 56px;.*?\}', new_css_block, css, flags=re.DOTALL)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS updated for exact coordinates.")
