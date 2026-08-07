import re

with open('c:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\sold\\insights.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace title
content = re.sub(r'<title>.*?</title>', '<title>Insights Details - SOLD</title>', content)

# Replace css link
content = re.sub(r'<link href="css/insights.css" rel="stylesheet" />', '<link href="css/insights-details.css" rel="stylesheet" />', content)

# Replace body class
content = re.sub(r'<body class="insights-page-body">', '<body class="insights-details-page-body">', content)

# Replace <main> block
main_pattern = re.compile(r'<main>.*?</main>', re.DOTALL)

new_main = """<main>
      <!-- Details Section -->
      <section class="insights-details-section">
        <div class="insights-details-container">
          <div class="insights-details-hero">
            <img src="assets/images/lastedbloginsight.svg" alt="Featured Story" class="insights-details-hero-img">
          </div>
          <div class="insights-details-content">
            <h1 class="insights-details-title">Global Office space provider</h1>
            <div class="insights-details-meta">
              <img src="assets/images/calendar_grey.png" alt="Calendar" class="insights-calendar-icon">
              <span>July 10,2026</span>
            </div>
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
