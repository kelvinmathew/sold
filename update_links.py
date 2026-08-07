import os
for file in ['index.html', 'services.html']:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()

    # Desktop Nav
    html = html.replace('<a href="#" class="nav-link active">Home</a>', '<a href="index.html" class="nav-link active">Home</a>')
    html = html.replace('<a href="#" class="nav-link">Home</a>', '<a href="index.html" class="nav-link">Home</a>')
    
    html = html.replace('<a href="#" class="nav-link">Services</a>', '<a href="services.html" class="nav-link">Services</a>')
    html = html.replace('<a href="#" class="nav-link active">Services</a>', '<a href="services.html" class="nav-link active">Services</a>')

    # Mobile Nav
    html = html.replace('<a href="#" class="offcanvas-link active">Home</a>', '<a href="index.html" class="offcanvas-link active">Home</a>')
    html = html.replace('<a href="#" class="offcanvas-link">Home</a>', '<a href="index.html" class="offcanvas-link">Home</a>')
    
    html = html.replace('<a href="#" class="offcanvas-link">Services</a>', '<a href="services.html" class="offcanvas-link">Services</a>')
    html = html.replace('<a href="#" class="offcanvas-link active">Services</a>', '<a href="services.html" class="offcanvas-link active">Services</a>')

    # Quick Links footer
    html = html.replace('<li><a href="#">Home</a></li>', '<li><a href="index.html">Home</a></li>')
    html = html.replace('<li><a href="#">Services</a></li>', '<li><a href="services.html">Services</a></li>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(html)

print('Links updated successfully.')
