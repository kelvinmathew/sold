import re

with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_cards = """          <!-- Step 2 Card -->
          <div class="step-card step-card-2">
            <div class="step-card-inner-2">
              <div class="step-card-title-wrapper">
                <span class="step-number">02.</span>
                <span class="step-title">Design & Prototype</span>
              </div>
              <p class="step-desc-2">Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit, sed<br>do eiusmod tempor incididunt.</p>
            </div>
          </div>

          <!-- Step 3 Card -->
          <div class="step-card step-card-3">
            <div class="step-card-inner-3">
              <div class="step-card-title-wrapper">
                <span class="step-number">03.</span>
                <span class="step-title">Launch & Support</span>
              </div>
              <p class="step-desc-3">Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit, sed<br>do eiusmod tempor incididunt.</p>
            </div>
          </div>"""

# Insert right after the step-card-1 div closes
html = re.sub(r'(<div class="step-card step-card-1">.*?</div>\n          </div>)', r'\1\n\n' + new_cards, html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)

css_append = """
/* --- Step 2 Card --- */
.step-card-2 {
  position: absolute;
  top: 831px;
  left: 0px;
  width: 503px;
  height: 271px;
  background: #EDEDED;
  border-radius: 26px;
  box-sizing: border-box;
  padding: 70px 50px 0 52px;
}

.step-card-inner-2 {
  width: 401px;
  display: flex;
  flex-direction: column;
  gap: 43px;
}

.step-desc-2 {
  width: 342px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 21px;
  line-height: 31px;
  letter-spacing: 0.01em;
  color: #000000;
  margin: 0;
}

/* --- Step 3 Card --- */
.step-card-3 {
  position: absolute;
  top: 1256px;
  left: 706px;
  width: 503px;
  height: 271px;
  background: #EDEDED;
  border-radius: 26px;
  box-sizing: border-box;
  padding: 66px 50px 0 50px;
}

.step-card-inner-3 {
  width: 403px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.step-desc-3 {
  width: 337px;
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

print("Steps 2 and 3 cards added!")
