// UI fingerprint: computed styles + boxes of the target elements, and the box of every visible text run, per width.
// Usage: node _uisnap.js <url> <out.json> [--popup]
const puppeteer = require('puppeteer'); const fs = require('fs');
const [, , URL, OUT] = process.argv;
const TARGETS = ['.hero-title-top', '.hero-title-bottom', '.what-we-do-label', '.what-we-do-lead', '.who-title', '.who-line-two', '.with-text',
  '.services-text', '.services-title', '.service-list-item .title', '.why-sold-label', '.insights-label', '.insights-title',
  '.insights-large-title', '.insights-small-title', '.faq-mobile-label', '.faq-mobile-question-text', '.faq-label-text', '.faq-question-text',
  '.contact-title', '.mobile-contact-title', '.testimonials-title', '.pre-footer-title', '.footer-heading',
  '.services-hero-title-top', '.services-hero-title-bottom', '.services-intro-heading', '.sf-title-wrapper', '.sf-title-part', '.sf-title-logo', '.step-card-title-wrapper', '.step-number', '.step-title',
  '.client-success-hero-title', '.client-success-hero-subtitle', '.cs-intro-label', '.cs-intro-text', '.cs-card-title',
  '.ws-section-label-text', '.ws-section-label-logo', '.ws-info-title', '.ws-founder-name', '.ws-founder-subtitle', '.ws-team-label-text', '.ws-team-name', '.ws-team-mobile-name',
  '.insights-hero-title', '.hero-title-highlight', '.insights-featured-headline', '.insights-latest-headline', '.insights-feed-headline', '.insights-blog-headline'];
const PROPS = ['display', 'position', 'top', 'left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-bottom',
  'padding-left', 'padding-right', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-transform',
  'text-align', 'color', 'white-space', 'width', 'height', 'opacity', 'vertical-align', 'word-spacing', 'text-decoration-line'];
(async () => {
  const b = await puppeteer.launch({ args: ['--disable-dev-shm-usage'] });
  const res = {};
  for (const w of [1440, 1024, 768, 393, 320]) {
    const p = await b.newPage(); await p.setViewport({ width: w, height: 900 });
    await p.goto(URL + (URL.includes('?') ? '&' : '?') + 'c=' + Date.now(), { waitUntil: 'networkidle2', timeout: 90000 });
    await new Promise(r => setTimeout(r, 3000)); // contact popup preload
    await p.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 800)); });
    res[w] = await p.evaluate((TARGETS, PROPS) => {
      const out = { targets: {}, text: [] };
      TARGETS.forEach(sel => {
        out.targets[sel] = [...document.querySelectorAll(sel)].map(e => {
          const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
          const o = { tag: e.tagName, box: [r.left, r.top + scrollY, r.width, r.height].map(v => Math.round(v * 10) / 10) };
          PROPS.forEach(k => o[k] = cs.getPropertyValue(k)); return o;
        });
      });
      // every visible text run's box (layout fingerprint of the whole page)
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = tw.nextNode())) {
        const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue; const el = n.parentElement;
        if (!el || ['SCRIPT', 'STYLE'].includes(el.tagName) || !el.offsetParent) continue;
        if (el.closest('#contactModal, .whatsapp-float-btn, .testimonials-track, .ws-clients-marquee')) continue; // popup preload + moving carousel
        const g = document.createRange(); g.selectNodeContents(n); const r = g.getBoundingClientRect();
        if (r.width < 1) continue;
        out.text.push(`${t.slice(0, 40)} @ ${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
      out.pageHeight = document.documentElement.scrollHeight;
      return out;
    }, TARGETS, PROPS);
    await p.close();
  }
  fs.writeFileSync(OUT, JSON.stringify(res));
  console.log('snapshot saved', OUT);
  await b.close();
})();
