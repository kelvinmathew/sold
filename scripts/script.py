import re

html_content = '''          <div class="services-accordion-new" style="max-width: 1315px; margin: 0 auto; padding-top: 40px;">
'''

services = [
    ("01", "Design & Branding", "service_design.png", "Branding, brochures, project websites and sales materials that elevate your project and equip brokers to sell faster."),
    ("02", "Events", "service_events.png", "Exclusive launch events and networking galas that capture the attention of high-net-worth investors and key stakeholders."),
    ("03", "Demand Generation", "service_demand.png", "Targeted lead generation campaigns to connect you with qualified buyers and expand your market reach globally."),
    ("04", "Social Media", "service_social.png", "Strategic social media management and campaigns to build your brand presence across digital platforms."),
    ("05", "SEO & GEO", "service_seo.png", "Search engine optimization and geo-targeting to ensure your projects rank at the top in relevant markets."),
    ("06", "PR & Media", "service_pr.png", "Comprehensive public relations strategies to secure premium media coverage and enhance reputation."),
    ("07", "Websites", "service_websites.png", "Bespoke, high-performance project websites designed to convert visitors into prospective buyers.")
]

for num, title, img, desc in services:
    active_class = ' active' if num == '01' else ''
    html_content += f'''            <div class="service-list-item{active_class}">
              <div class="service-left">
                <div class="service-num-col">
                  <span class="num">{num}</span>
                  <div class="vertical-line"></div>
                </div>
                <div class="service-content-col">
                  <span class="title">{title}</span>
                  <div class="service-body">
                    <div class="service-body-inner">
                      <p class="service-desc">{desc}</p>
                      <ul class="service-features">
                        <li>
                          <span class="plus-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 0V22M0 11H22" stroke="#FFFFFF" stroke-width="2"/></svg></span>
                          Lorem ipsum dolor sit amet
                        </li>
                        <li>
                          <span class="plus-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 0V22M0 11H22" stroke="#FFFFFF" stroke-width="2"/></svg></span>
                          Lorem ipsum dolor sit amet
                        </li>
                        <li>
                          <span class="plus-icon"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 0V22M0 11H22" stroke="#FFFFFF" stroke-width="2"/></svg></span>
                          Lorem ipsum dolor sit amet
                        </li>
                      </ul>
                      <a href="#" class="btn-read-more-pill">
                        <span class="btn-icon-orange">
                          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5H18M18 5L14 1M18 5L14 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                        <span class="btn-text">Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="service-image-strip">
                <img src="assets/images/{img}" alt="{title}" />
              </div>
            </div>
'''

html_content += '          </div>'

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace between <div class="services-accordion-new" and its closing tag.
# We will use regex
pattern = re.compile(r'          <div class="services-accordion-new".*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
# Actually, standard regex might fail here. Let's do it with replace string since we know start and end lines.
# Start line: 259
# End line: 328
lines = text.splitlines()
new_lines = lines[:258] + [html_content] + lines[328:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(new_lines))

print("Done")
