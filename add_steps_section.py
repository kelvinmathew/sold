import re

with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_section = """
    <!-- 3 Steps Section -->
    <section id="steps-section" class="steps-section">
      <div class="steps-container-wrapper">
        <div class="steps-container">
          <!-- Elements will be added here -->
        </div>
      </div>
    </section>

    <!-- Pre-footer -->
"""

# Replace the pre-footer comment to inject before it
html = html.replace('<!-- Pre-footer -->', new_section)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)

css_append = """
/* ==========================================================================
   3 Steps Section (Services Page)
   ========================================================================== */
.steps-section {
  position: relative;
  width: 100%;
  background: #FFFFFF;
}

.steps-container-wrapper {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.steps-container {
  position: relative;
  width: 1209px;
  height: 1657px;
  left: 130px; /* Aligns to left 130px relative to the 1440px wrapper */
}

/* Responsive adjustment for screens smaller than 1440px */
@media (max-width: 1439px) {
  .steps-container {
    width: 100%;
    max-width: 1209px;
    left: 0;
    margin: 0 auto;
    padding: 0 20px;
  }
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Steps section added!")
