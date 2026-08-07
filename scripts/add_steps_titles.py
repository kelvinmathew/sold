import re

with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_elements = """        <div class="steps-container">
          <!-- Title Container -->
          <div class="steps-title-wrapper">
            <h3 class="steps-title-1">3 easy steps to get</h3>
            <h3 class="steps-title-2">started with</h3>
            <img src="assets/images/logosold_dark.png" alt="SOLD." class="steps-logo">
          </div>
          
          <!-- Subtitle -->
          <p class="steps-subtitle">Our three-step method blends strategy and creativity<br>while keeping you in the loop</p>
        </div>"""

html = re.sub(r'<div class="steps-container">.*?</div>', new_elements, html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)

css_append = """
/* --- 3 Steps Typography --- */
.steps-title-wrapper {
  position: absolute;
  top: 0;
  left: 347px;
  width: 487px;
  height: 128px;
}

.steps-title-1 {
  position: absolute;
  top: 9px;
  left: -10px;
  width: 495px;
  height: 49px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 800;
  font-size: 52px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #263238;
  margin: 0;
  display: flex;
  align-items: center;
}

.steps-title-2 {
  position: absolute;
  top: 72px;
  left: 0;
  width: 322px;
  height: 49px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 800;
  font-size: 52px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #263238;
  margin: 0;
  display: flex;
  align-items: center;
}

.steps-logo {
  position: absolute;
  top: 75px;
  left: 332px;
  width: 135px;
  height: 48px;
  object-fit: contain;
}

.steps-subtitle {
  position: absolute;
  top: 142px;
  left: 347px;
  width: 486px;
  height: 50px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 25px;
  letter-spacing: 0.02em;
  color: #000000;
  text-align: center;
  margin: 0;
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Title elements added to steps section!")
