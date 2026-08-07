import re

with open('c:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\sold\\insights-details.html', 'r', encoding='utf-8') as f:
    content = f.read()

main_pattern = re.compile(r'<main>.*?</main>', re.DOTALL)

new_main = """<main>
      <!-- Hero Section -->
      <section class="insights-details-hero vw-fluid-section">
        <div class="insights-details-hero-bg"></div>
        
        <div class="insights-details-hero-content vw-fluid-container">
          <div class="insights-details-hero-title-container">
            <h1 class="insights-details-hero-title">Delivering Results for<br>Leading Real Estate Brands</h1>
          </div>
          
          <div class="insights-details-hero-meta">
            <div class="meta-item">
              <i class="fa-regular fa-clock"></i>
              <span>6 min</span>
            </div>
            <div class="meta-item">
              <i class="fa-regular fa-calendar"></i>
              <span>July 10, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Details Body Section -->
      <section class="insights-details-section">
        <div class="insights-details-container">
          <div class="insights-details-content">
            <div class="insights-details-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrtities and project launches, brochures and presentations, we design assets that sell.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>
            </div>
          </div>
        </div>
      </section>
    </main>"""

content = main_pattern.sub(new_main, content)

with open('c:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\sold\\insights-details.html', 'w', encoding='utf-8') as f:
    f.write(content)
