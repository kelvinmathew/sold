import re

# 1. Update HTML
with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_breadcrumb = """        <!-- Breadcrumb (Bottom Left) -->
        <div class="services-hero-breadcrumb d-none d-md-flex">
          <a href="index.html" class="breadcrumb-home">Home</a>
          <img src="assets/images/Frame 6.svg" alt=">>>" class="breadcrumb-icon">
          <div class="breadcrumb-services-wrapper">
            <span class="current">Services</span>
          </div>
        </div>"""

html = re.sub(r'<!-- Breadcrumb \(Bottom Left\) -->.*?</div>', new_breadcrumb, html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update CSS
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = """/* Breadcrumb (Bottom Left) */
.services-hero-breadcrumb {
  position: absolute;
  top: 709px;
  left: 104px;
  width: 236px;
  height: 29px;
  display: flex;
  align-items: center; /* keep them aligned */
  gap: 8px;
}

.services-hero-breadcrumb .breadcrumb-home {
  width: 55px;
  height: 29px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.services-hero-breadcrumb .breadcrumb-icon {
  width: 23px;
  height: 15px;
  object-fit: contain;
}

.services-hero-breadcrumb .breadcrumb-services-wrapper {
  width: 142px;
  height: 29px;
  display: flex;
  align-items: flex-end; /* user requested vertical-align: bottom equivalent */
}

.services-hero-breadcrumb .current {
  width: 73px;
  height: 29px;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  display: flex;
  align-items: flex-end; /* vertical-align: bottom */
}
"""

css = re.sub(r'/\* Breadcrumb \(Bottom Left\) \*/.*?text-decoration: none;\n\}', new_css, css, flags=re.DOTALL)

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Breadcrumb CSS updated!")
