import re
import shutil

# Reset from index.html
shutil.copy('index.html', 'services.html')

with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update active nav link
html = html.replace('class="nav-link active">Home', 'class="nav-link">Home')
html = html.replace('class="nav-link">Services', 'class="nav-link active">Services')
html = html.replace('class="offcanvas-link active">Home', 'class="offcanvas-link">Home')
html = html.replace('class="offcanvas-link">Services', 'class="offcanvas-link active">Services')

# 2. Change Hero title & subtitle
hero_title_repl = r'''<h1 class="hero-title-top"><span class="orange-text">Get the Real Estate</span></h1>
          <h2 class="hero-title-bottom"><span class="orange-italic">Experts</span> on Your Team</h2>'''
html = re.sub(r'<h1 class="hero-title-top">.*?</h2>', hero_title_repl, html, flags=re.DOTALL)

hero_subtitle_repl = r'''<p style="max-width: 480px; font-size: 23px; line-height: 29px; letter-spacing: 0.01em;">20+ years founding and scaling Real Estate businesses in MENA, Asia & Europe generating millions of dollars in property sales for clients every year.</p>'''
html = re.sub(r'<p>We drive off-plan real estate sales with<br>.*?beyond.</p>', hero_subtitle_repl, html, flags=re.DOTALL)


# 3. Remove sections: what-we-do, Testimonials, Insights
# Remove What We Do
html = re.sub(r'<!-- What We Do Section -->.*?<!-- Who do we work with -->', '<!-- Who do we work with -->', html, flags=re.DOTALL)

# Remove Testimonials
html = re.sub(r'<!-- Testimonials -->.*?<!-- Services List -->', '<!-- Services List -->', html, flags=re.DOTALL)

# Remove Why Sold (Wait, is Why Sold in the figma? No. Remove it too)
html = re.sub(r'<section id="why-sold" class="why-sold-section">.*?<!-- Insights -->', '<!-- Insights -->', html, flags=re.DOTALL)

# Remove Insights
html = re.sub(r'<!-- Insights -->.*?<!-- Pre-footer -->', '<!-- Pre-footer -->', html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated services.html')
