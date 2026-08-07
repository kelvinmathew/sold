import re

with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update active nav link
html = html.replace('class="nav-link active">Home', 'class="nav-link">Home')
html = html.replace('class="nav-link">Services', 'class="nav-link active">Services')
html = html.replace('class="offcanvas-link active">Home', 'class="offcanvas-link">Home')
html = html.replace('class="offcanvas-link">Services', 'class="offcanvas-link active">Services')

# 2. Change Hero title
html = re.sub(r'<h1 class="hero-title-top">.*?</h1>', '<h1 class="hero-title-top"><span class="orange-text">Our</span><span class="orange-space"> </span><span class="orange-italic">Services</span></h1>', html, flags=re.DOTALL)
html = re.sub(r'<h2 class="hero-title-bottom">.*?</h2>', '<h2 class="hero-title-bottom">What We Do</h2>', html, flags=re.DOTALL)

# 3. Remove sections: what-we-do, who-we-work, why-sold, insights
html = re.sub(r'<!-- What We Do Section -->.*?<!-- Who do we work with -->', '<!-- Who do we work with -->', html, flags=re.DOTALL)
html = re.sub(r'<!-- Who do we work with -->.*?<!-- Testimonials -->', '<!-- Testimonials -->', html, flags=re.DOTALL)
html = re.sub(r'<section id="why-sold" class="why-sold-section">.*?<!-- Insights -->', '<!-- Insights -->', html, flags=re.DOTALL)
html = re.sub(r'<!-- Insights -->.*?<!-- Pre-footer -->', '<!-- Pre-footer -->', html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Updated services.html')
