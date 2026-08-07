import re

html_path = 'c:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\sold\\insights-details.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

body_pattern = re.compile(r'<div class="insights-details-body">.*?</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)

new_body = """<div class="insights-details-body">
              <p class="insights-details-paragraph">Aliquam metus nibh consectetuer montes nascetur quisque lobortis a aliquet diam. Egestas dapibus hen drerit nascetur etiam sociosqu. Himenaeos interdum tortor augue malesuada id. Fringilla dapibus pellen tesque letius bibendum consequat. Sociosqu quam tincidunt consectetur et integer tortor turpis risus ele ifend. Curabitur sit sollicitudin duis condimentum nec. Venenatis pharetra himenaeos eu dolor vulputate semper lectus. Commodo lacinia primis eleifend ullamcorper fames venenatis suspendisse ultrices scele risque aliquet. Urna iaculis mus class a massa ut ligula leo at taciti. Risus per proin diam non maximus con dimentum viverra nullam arcu. Lectus molestie laoreet nec aptent luctus.<br><br>Himenaeos interdum tortor augue malesuada id. Fringilla dapibus pellen tesque letius bibendum conseq. Sociosqu quam tincidunt consectetur et integer tortor turpis risus ele ifend. Curabitur sit sollicitudin duis condimentum nec. Venenatis pharetra himenaeos eu dolor vulputate semper lectus. Commodo lacinia primis eleifend ullamcorper fames venenatis suspendisse ultrices scele risque aliquet</p>
              
              <h2 class="insights-details-subtitle">Lorem ipsum dolor sit amet consectetur adipiscing elit</h2>
              
              <p class="insights-details-paragraph">Aliquam metus nibh consectetuer montes nascetur quisque lobortis a aliquet diam. Egestas dapibus hen drerit nascetur etiam sociosqu. Himenaeos interdum tortor augue malesuada id. Fringilla dapibus pellen tesque letius bibendum consequat. Sociosqu quam tincidunt consectetur et integer tortor turpis risus ele ifend.</p>
              
              <ul class="insights-details-list">
                <li>Aliquam metus nibh consectetuer</li>
                <li>montes nascetur quisque lobortis a</li>
                <li>aliquet diam. Egestas dapibus hen drerit</li>
                <li>interdum tortor augue malesuada</li>
                <li>Fringilla dapibus pellen tesque</li>
              </ul>
            </div>
          </div>
        </div>
      </section>"""

content = body_pattern.sub(new_body, content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
