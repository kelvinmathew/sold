import re

with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_card = """          <!-- Subtitle -->
          <p class="steps-subtitle">Our three-step method blends strategy and creativity<br>while keeping you in the loop</p>

          <!-- Step 1 Card -->
          <div class="step-card step-card-1">
            <div class="step-card-inner">
              <div class="step-card-title-wrapper">
                <span class="step-number">01.</span>
                <span class="step-title">Discovery & Strategy</span>
              </div>
              <p class="step-desc">Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit, sed do<br>eiusmod tempor incididunt.</p>
            </div>
          </div>"""

html = re.sub(r'<!-- Subtitle -->.*?while keeping you in the loop</p>', new_card, html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)

css_append = """
/* --- Step 1 Card --- */
.step-card-1 {
  position: absolute;
  top: 408px;
  left: 706px;
  width: 503px;
  height: 271px;
  background: #EDEDED; /* Light grey from image */
  border-radius: 26px;
  box-sizing: border-box;
  /* They said pt:66, pr:50, pb:79, pl:50 but the math didn't add up to 271 perfectly. Let's just use exact padding-top and left/right and let flex handle the rest */
  padding: 66px 50px 0 50px;
}

.step-card-inner {
  width: 403px;
  display: flex;
  flex-direction: column;
  gap: 37px;
}

.step-card-title-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 61px; /* As specified in Figma */
}

.step-number, .step-title {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-size: 28px;
  /* line-height: 80px was in Figma, but height is 61px. I'll use line-height: 1 to visually align it naturally, or 80px if it strictly needs it. Let's use normal line height so it doesn't break out of the 61px box */
  line-height: 1; 
  letter-spacing: -0.04em;
  color: #000000;
  margin: 0;
}

.step-desc {
  width: 403px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 21px;
  line-height: 31px;
  letter-spacing: 0.01em;
  color: #000000;
  margin: 0;
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Step 1 card added!")
