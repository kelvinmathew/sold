# SOLD — Deployment & Handoff Guide

**Purpose of this file.** It is the pick-up point after a network drop, a new chat session, or a handoff.
Send/open this file and you should be able to continue the work — deploying or building — without
re-deriving anything. Everything needed is below: where the code lives, how to run it locally, the rules
for making changes, and what is currently waiting to go live.

Live site: **https://valores.newpropertyuae.ae**
cPanel prefix `uaenewpr_` · DB `uaenewpr_sold` · DB user `uaenewpr_solduser` · table prefix `wp_`

---

# PART 1 — PENDING DEPLOY

## LIVE 2026-10-02, verified (theme zip `_S_VERSION 1.5.60`, no SQL, no images) — Insights Featured Story card back to the earlier size (web only)

Client: the whole-image Featured card (1.5.58, 1197 x 1078 at 1440) is too big - wanted the earlier size. New block at the
end of `css/insights.css` (min-width 768) overrides the three 2026-10-02 Featured blocks: card 1197 x 695 at 1440
(83.125vw x 48.2639vw), image area 1141 x 384 (26.6667vw), image object-fit cover (crops top/bottom like before).
Heading/description fonts from 1.5.56 kept. Mobile unchanged (355 x 408 at 393). Verified local + live (CSS injected)
at 1920/1440/1280/1024/768/393: sizes exact, no text outside the card, no sideways scroll. Zip includes 1.5.59.

## LIVE 2026-10-02 with 1.5.60 (theme zip `_S_VERSION 1.5.59`, no SQL, no images) — contact popup links underline + Why SOLD mobile founder card = Figma
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). Includes 1.5.58 if not deployed.
- css/contact.css (end): #contactModal a.contact-tap - mouse devices `@media (hover: hover)`: underline on hover / focus-visible;
  touch devices `@media (hover: none)`: always underlined (offset 0.18em, 1px). Colour + font unchanged (inherit).
- css/why-sold.css (end), mobile: founder card 1 = Figma 1655:2193 as a flow layout (was absolute tops): padding 31 top / 43
  bottom, name lh 21, name->subtitle 7 (subtitle lh 20), ->bio 12, bio padding 23 each side (310 box), ->button 32, ->photo 32,
  photo 296 tall (flex 0 0 auto - a 320px flex-basis rule took over in column flex). Fonts unchanged.
- Verified: live injection 280-767 - 393: name 31 / subtitle 59 / bio 91 / button 228 / photo 303 / card 642 (live admin text is
  5 lines = Figma + 21); local (Figma's 4-line fallback text): card 356x621, button 207, photo 282 = Figma exactly. Photo sizes
  = before at every width. Web unchanged. Contact links: 1440/1024 underline only on hover; 393/820 touch always; colour same.

## ✅ CONFIRMED LIVE 2026-10-02 with 1.5.59 — (was PENDING) (theme zip `_S_VERSION 1.5.58`, no SQL, no images) — Insights Featured whole image + blog details article spacing (web)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). Includes 1.5.57 (Featured width back to 1197).
- css/insights.css (end), web: Featured card 1197 wide (as before), image full width + WHOLE image (img height auto, wrap height
  auto) -> card 1197 x 1078 @1440 (user OK: "if the image is showing fully then it is fine"). Mobile unchanged.
- css/insights-details.css (end), web only: .insights-details-body gap 0; h2/h3 max-width none (were capped 719 of 1221 -> wrapped
  early); spacing 40 above everything, 16 for text after text/heading (p, ul, ol after p/h2/h3/h4/ul/ol); p with an image keeps
  40 above + below; > p margin-bottom 0 (pasted Google Docs 12pt margins in 4 old posts); p.sold-empty-p hidden.
- functions.php: sold_post_mark_empty_paragraphs (the_content, single posts) adds class sold-empty-p to blank paragraphs
  (<p>&nbsp;</p>, <p></p>) keeping their content - hidden on web only; the saved posts are NOT changed.
- Verified local: all 15 posts x 1440/1024/768/393 - headings full width, gaps 16 (text) / 40 (headings, images), no overlap,
  no h-scroll (60/60); mobile 393/320 gaps IDENTICAL to live; Insights featured 1197 x 1078 whole image. Live injection same.
  Previous zip: scratchpad theme-code-only-1.5.57.zip.

## (superseded by 1.5.58, never deployed alone) — (theme zip `_S_VERSION 1.5.57`, no SQL, no images) — Insights Featured card (web): width + image back to earlier, only shorter
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- User: 1.5.56's 900-wide card + narrow whole image was too small. css/insights.css (end), `@media (min-width: 768px)`: card
  width 83.125vw (1197 @1440, as before), image full card width again (object-fit cover, wrap radius 26, overflow hidden).
  Kept from 1.5.56: image area 340 tall (was 384), card height auto -> 1197 x 603 @1440 (was 695). Mobile unchanged.
- Verified: injected on LIVE 768-1920 (1197x603 @1440, centred L121/R122, all inside, no h-scroll); local same.

## ✅ CONFIRMED LIVE 2026-10-02 (live = tested numbers 280-1920; Featured size then changed again in 1.5.57) — (was PENDING) (theme zip `_S_VERSION 1.5.56`, no SQL, no images) — Insights: Featured + Latest headings in full, Featured card smaller/centred with whole image, Explore text sizes
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). (Includes 1.5.55 steps fix if not deployed.)
- css/insights.css (end). Web (>= 768): .insights-featured-headline + .insights-latest-headline = Explore heading (700, 1.6667vw,
  lh 1) with NO clamp (was 2 lines + "..."); .insights-featured-excerpt + .insights-latest-excerpt = Explore desc (400, 0.9722vw /
  1.3889vw, 12px floor 768-1199; still 2 lines "..."; were 23/29 and 18/23). Featured card: `.insights-featured-container
  .insights-featured-card` 62.5vw wide (900 @1440, was 83.125vw = 1197), height auto (was fixed 48.2639vw = 695 -> 627), centred;
  image area 23.6111vw tall (340, was 384), img object-fit contain, own shape, centred, rounded (was cover = top/bottom cut).
- Mobile (<= 767): Featured + Latest heading = Explore (700, 2.5445vw / 5.598vw, 10px @393; was 20px/600 and 12px), desc = Explore
  (2.5445vw / 3.5623vw; was 13px and 11px). Featured image on mobile unchanged (user: web only).
- Verified: injected on LIVE 280-1920 - fonts = Explore at every width, all text/images inside every card, Featured centred
  (L=R), Latest cards 4-8px shorter, no h-scroll, colours unchanged. Real file local: identical numbers. Previous zip: scratchpad
  theme-code-only-1.5.55.zip.

## PENDING (theme zip `_S_VERSION 1.5.55`, no SQL, no images) — Services + Client Success: steps cards 02/03 = card 01 layout (web only)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- css/style-v2.css (end), `@media (min-width: 768px)`, `:is(.services-page-body, .client-success-page-body)`: .step-card-2/-3
  padding 2.3264cqi 3.4722cqi 3.2292cqi; .step-card-inner-2/-3 width 27.9861cqi + gap 2.5694cqi; .step-desc-2/-3 width 27.9861cqi
  (= the Why SOLD fix in why-sold.css). Before: 02 pad 47/52/45 gap 43 desc 342, 03 pad 38/50/51 gap 28 desc 337 (01: 34/50/47,
  37, 403 @1440).
- Verified: injected on LIVE 768-1920 - 01/02/03 identical on both pages, card sizes identical before/after, text inside;
  mobile (393/767) + Why SOLD unchanged. Real file local: same. Previous zip: scratchpad theme-code-only-1.5.54.zip.

## ✅ CONFIRMED LIVE 2026-10-02 (live why-sold.css?ver=1.5.54: founder bio 5 lines inside card 280-767, no h-scroll; all 1.5.53 Mona Sans targets OK) — (was PENDING) (theme zip `_S_VERSION 1.5.54`, no SQL, no images) — Why SOLD mobile: Our Founders bio wraps inside the card
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- css/why-sold.css (end), `@media (max-width: 767px)` `.why-sold-page-body .ws-founder-bio.d-lg-none`: white-space normal (was
  nowrap !important - built for the fallback text with <br>s; the live admin text "For over two decades..." has no breaks, so it
  ran on ONE line, cut off at the card edge - already so before 1.5.53), padding 0 5.09vw (20px @393), border-box.
- Verified: injected on LIVE 280-767 - 5 centred lines at every width, inside the card, 8-22px above Get in touch, no h-scroll.
  Local (fallback text with <br>s) still 4 lines as designed. Web unchanged (rule is mobile-only; this <p> is hidden on web).

## ✅ LIVE 2026-10-01 (live shows style-v2.css?ver=1.5.53) — (was PENDING) (theme zip `_S_VERSION 1.5.53`, no SQL, no images) — Mona Sans for description texts (web + mobile)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- Same block at the end of css/style.css (Home) + css/style-v2.css (all other pages), font-family ONLY (sizes, weights, spacing
  unchanged): Services list `.service-desc` + `.service-features li` ('+' lines) (Home, Services); Steps section `.sf-subtitle`,
  `.sf-subtitle-mobile` (+ `.orange-text`), `.step-desc`, `-2`, `-3` (Services, Why SOLD, Client Success - selector
  `body :is(#steps-section, .steps-section) ...` to beat the mobile `:is(.services-page-body, .why-sold-page-body) .step-desc`
  and client-success.css Inter !important rules); Why SOLD `.ws-about-text` (+ `.ws-about-text-mobile p`), `.ws-founder-bio`,
  `.ws-testimonial-text` (was already Mona Sans - kept for safety).
- Before (live): these were Inter (service desc/li, step descs, about text, founder bio on web). Home testimonials (Poppins) not
  requested - untouched.
- Verified: injected on LIVE Home/Services/Why SOLD/Client Success at 280-1920 - all targets Mona Sans, same sizes, no text cut by
  its box, no h-scroll; a few texts wrap 1 line more/less (normal for the font change). Real files local: same. Previous zip:
  scratchpad theme-code-only-1.5.52.zip.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.52`; live: all 8 service pages intro desc Mona Sans on mobile 320-767 (40/40), web unchanged (Mona Sans 500), text inside, no h-scroll; identical to the tested injection)
## (was PENDING) (theme zip `_S_VERSION 1.5.52`, no SQL, no images) — 8 service pages: intro description in Mona Sans on mobile
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). (Includes 1.5.51 Insights headings if not deployed.)
- css/branding-design.css (shared by all 8 service pages, end): `@media (max-width: 767px) .branding-intro-desc { font-family:
  'Mona Sans' }` (was Inter on mobile; web already Mona Sans). Mobile size 16px / line 22px / weight 400 unchanged.
- Verified: injected on all 8 LIVE service pages at 320/375/393/430/767 - Mona Sans loads, text inside screen, no h-scroll; web
  (768/1440) rows identical before/after; real file local (branding-design) same. Class only in page-service.php.

## ✅ CONFIRMED LIVE 2026-10-01 with 1.5.52 (live: Featured + Latest headings = Explore size at 768-1920, Latest 2 lines, Read More inside, mobile sizes unchanged) — (was PENDING) (theme zip `_S_VERSION 1.5.51`, no SQL, no images) — Insights: Featured + Latest card headings = Explore heading size (web)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- css/insights.css (end), `@media (min-width: 768px)`: .insights-featured-headline + .insights-latest-headline font-size 1.6667vw,
  line-height 1 (= .insights-blog-headline: 24px @1440; were 45px / 32px one line), up to 2 lines then "…".
- Verified local 768-1920: both = Explore size + line height at every width; Featured card same size (its text + Read More sit
  higher inside it), Latest cards 2px shorter (page 2-5px shorter); Read More inside all cards; no h-scroll; mobile (320-767)
  IDENTICAL. Classes used only on Insights (+ archive.php which 301s). Previous zip: scratchpad 1.5.50.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.50` + 15-post import; live: 15 posts, no duplicates, flow 40/40 (Featured = Cost of PPC, Load More 6->12->15, ?fpage=2/3), device emulation Home/Services list/Why SOLD OK 280-1920)
## (was PENDING) (theme zip `_S_VERSION 1.5.50` + `old-blogs-import.zip` (15 posts), no SQL) — the 9 remaining old blog posts (all 15 on the blog) + article tables
**Steps:** 1) upload `theme-code-only.zip` -> extract in `wp-content/themes/`; 2) upload `old-blogs-import.zip` -> extract in
`wp-content/themes/` (overwrite posts.json, adds 23 images; 38 files); 3) open wp-admin once (refresh an open tab), first load
~15-20 s. `sold_import_old_blogs` step 2 (flag `sold_old_blogs_done` 1 -> 2) adds the 9 posts, skips the 6 that exist. (Includes
1.5.49 services spacing if not yet deployed.)
- Source: the 9 are NOT in the gbbck backup (its trash = lorem placeholders + old drafts) - taken from getsold.ae's public REST API
  (wp-json/wp/v2/posts: content, date_gmt/modified_gmt, featured media, yoast_head_json). They were Elementor posts with Google-Docs
  inline styles: converted (scratchpad prep_blogs9.py) to plain article HTML - heading widgets -> h2/h3, text-editor -> p/ul/li/
  table, bold/italic spans -> strong/em, images re-hosted (23, <=1600px, 27-305 KB), getsold.ae links mapped (0 unmapped); each
  post's hand-made Article JSON-LD (old URLs) dropped - Yoast prints the Article schema. Text = old site word-for-word (100%).
- css/insights-details.css (end): article tables - header row bold, thin row lines, top-aligned cells; on mobile a table wider
  than the screen (Cost of PPC, 4 columns) scrolls sideways inside its box (was cut off). Only 2 posts have tables.
- Verified local: 15 posts (exact old dates, featured image, AI Marketing, old SEO title/desc); Insights Featured = newest (Cost of
  PPC), Latest 4, Explore 6 -> Load More 12 -> 15, button gone; ?fpage=2/3 titled, ?fpage=4 + ?page=2 301; all 15 articles x
  1440/393: 1 title/H1, description, canonical, og + twitter, schema, alt, img sizes, no broken img / overlap / h-scroll / errors
  (40/40). DB backup before: scratchpad sold-before-9blogs.sql. Previous zips: scratchpad 1.5.49 + old-blogs-import-6.zip.

## ✅ CONFIRMED LIVE 2026-10-01 with 1.5.50 — (was PENDING) (theme zip `_S_VERSION 1.5.49`, no SQL, no images) — Services list spacing: web heading->subtitle gap + mobile '+' line spacing
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). 1.5.47 + 1.5.48 are already LIVE (verified).
- Same edits in css/style.css (Home) + css/style-v2.css (Services), inside the services-list block added in 1.5.48:
  web (>= 768): open item's title margin-bottom 1.25cqi (heading -> subtitle 18px @1440, was 9 = 0.625cqi); open area min-height
  23.4333cqi (was 24.0583) so the row keeps the same height (free space under the button absorbs it). Verified row heights
  identical 768-1920.
- Mobile (<= 767): '+' li line-height 23px (was 14px - a wrapped '+' line squeezed its 2 lines and spilled ~2px above its row),
  li height auto / min-height 31.6667px (= the real rendered height: 105px list shrank 3 x 35px rows), list height auto / min 105px,
  .service-desc height auto / min 63px (a 4-line subtitle ran into the 30px gap: 10px left -> now 31px), list + li max-width 100%
  (Galaxy Fold 280px: '+' lines went off screen). One-line rows: same 31.7px height + icon spot, text 0.6px lower (rounding).
- Verified: injected on LIVE content 280-1920, then real files local; device emulation (Galaxy Fold 280, iPhone SE, Galaxy S8,
  iPhone 14, Pixel 7, iPhone 14 Pro Max, iPad Mini/Air/Pro, laptops 1280/1366, desktop 1920) - all services-list checks pass on
  Home + Services; Why SOLD OK. Full-page vs originals: changes only inside the services list. NOTE: Services page also has the
  steps section (cards 02/03 still old layout - the 1.5.47 fix was Why SOLD only, as asked). Previous zip: scratchpad 1.5.48.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.48` + 1.5.47; live: Why SOLD steps 02/03 = 01 at 768-1920; services list text 17-46px from image, 0 cut, button 1 line; device emulation Home/Why SOLD OK)
## (was PENDING) (theme zip `_S_VERSION 1.5.48`, no SQL, no images) — Services list 01-08 (Home + Services page): text gap to image + mobile button on one line
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). (Includes 1.5.47 Why SOLD steps if not deployed yet.)
- Same block appended to css/style.css (Home) and css/style-v2.css (Services): web/tablet `@media (min-width: 768px)`: open
  item's .service-body width = 100% - 2.0833cqi (30px @1440 gap to the image; was 0 / -0.9px overlap on 02 + 04 subtitles and
  08's last '+' line), .service-desc max-width none, open area height auto with min-height = the design 24.0583cqi (grows only
  when content needs it - at 768 item 06 was already cut 4px before), '+' lines line-height = icon height + align flex-start
  (a wrapped '+' line no longer overlaps; one-line rows move < 1px). Service names (headings) untouched.
- Mobile `@media (max-width: 767px)`: .btn-read-more-pill width fit-content, min-width 158px, padding 10/20/0/50 (text now in flow,
  same 50,10 position, nowrap) - live label "Discover More" (Theme Settings services_acc_readmore_text) = 176px one line (was
  158px, 2 lines); "Read More" stays exactly 158x47.
- Verified (fix injected on LIVE content, then real files local): 768-1920 smallest text-to-image gap 17-46px, 0px content cut,
  button 1 line; mobile 320-767 button 1 line, inside screen, text/list positions unchanged, no h-scroll. Full-page Home +
  Services vs originals: changes only inside the services list (+ Home Insights cards = earlier blog content); Services mobile
  identical. Why SOLD has no services list (user meant the Services page). Previous zip: scratchpad 1.5.47.

## ✅ CONFIRMED LIVE 2026-10-01 with 1.5.48 — (was PENDING) (theme zip `_S_VERSION 1.5.47`, no SQL, no images) — Why SOLD steps: cards 02 + 03 use step 01's card layout (web/tablet)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- css/why-sold.css (end, `@media (min-width: 768px)`, `.why-sold-page-body` = Why SOLD only): step-card-2/3 padding = step 01
  (2.3264/3.4722/3.2292/3.4722cqi = 33.5/50/46.5/50 @1440; were 47/50/45/52 and 38/50/51/50), inner width 403 + gap 37 (were
  401/43 and 403/28), text width 403 (were 342 / 337). Card size/position, timeline, circles, swing animation unchanged.
- Verified local (cards measured flat): at 768/992/1024/1025/1200/1280/1440/1920 card 01 unchanged; 02 + 03 title position,
  title->text gap, text width, padding = card 01; outer boxes unchanged; text fits (same bottom space as 01). Mobile (320/393)
  of Why SOLD + Services + Client Success and web of Services + Client Success PIXEL-IDENTICAL to the originals; Why SOLD web
  changes only inside cards 02/03. Live texts have no manual <br>, so they wrap like 01. Previous zip: scratchpad 1.5.46.

## ✅ LIVE 2026-10-01 except step 3 (`_S_VERSION 1.5.46`; live: icon tags = sold-site-icon-v2 (32/192/apple/tile), 3 icon files 200, popup tel:+971585931979 + mailto:growth@getsold.ae in panel + mobile bar). OPEN: step 3 root `public_html/favicon.ico` still 404 - user: do later. Visual popup check on live DONE after the server recovered (it was serving files at ~1.6 KB/s for a while): phone/email position + look = original at 1440/1024/768/393/320 (10/10), hover unchanged, tap hands off to phone/mail app, 0 JS errors.
## (was PENDING) (theme zip `_S_VERSION 1.5.46` + `new-images-v1.5.46.zip` + root `favicon.ico`, no SQL) — Contact popup phone/email tappable + favicon = footer SOLD. logo
**Steps:**
1. Upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
2. Upload `new-images-v1.5.46.zip`, extract in `wp-content/themes/` too (3 files in `sold-theme/assets/images/seo/`:
   `sold-site-icon-v2.png`, `sold-apple-touch-icon-v2.png`, `favicon-v2.ico`).
3. Upload `deploy/favicon.ico` into **`public_html/`** (site root, next to wp-config.php) - LiteSpeed answers /favicon.ico itself.
4. Open any wp-admin page once (refresh an open tab). `sold_site_icon_setup` (flag `sold_site_icon_done` = 2) adds the icon to
   the Media Library ("SOLD icon") and sets it as Settings -> General -> Site Icon.
- Contact popup (template-parts/contact-modal.php): phone -> `tel:+971585931979`, email -> `mailto:` (desktop/tablet left
  panel + mobile bottom bar). Link sits inside the original span; css/contact.css `.contact-tap` = inherit colour/font, no
  underline in every state. Verified local: popup PIXEL-IDENTICAL at 1440/1024/768/393/320, text boxes + styles identical,
  hover look unchanged, click hands off to the phone/mail app (page + popup stay), 0 JS errors.
- Favicon (user/senior 2026-10-01): the footer logo (footer_logo.png: black SOLD + orange dot) on a white rounded square (visible
  on light AND dark tabs), 512 site icon + 16/32/48 .ico + 180 apple icon. Replaces the unshipped orange-dot version (old
  local attachment removed). Admin bar: WordPress "W" removed (`sold_admin_bar_logo`); WP's own site-name item already shows
  the SOLD icon. Login page already shows the SOLD logo (1.5.43+, live).
- After deploy check: icon tags on pages, /favicon.ico 200, popup links (tel/mailto) on 1440/768/393, popup look unchanged.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.45`; live: Featured H3 = post title + excerpt, still 6 posts (import did not re-run); card layout IDENTICAL at 11 widths 1920-320 vs the original measurements, Read More inside, no h-scroll; blog flow 270/270; UI break check 11 pages x 9 widths = 99/99 clean)
## (was PENDING) (theme zip `_S_VERSION 1.5.45`, no SQL, no images) — Insights Featured card shows the post's own title + excerpt
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). (The old-blogs import already ran on
live; its flag stops it running again. The favicon code stays off until its icon files are uploaded.)
- User (2026-10-01): "no fixed title" - the Featured Story card showed fixed copy "Featured Insights" + "SOLD breaks down the
  latest story..." (ACF insights_featured, now unused). home.php: H3 = get_the_title($fid), text = sold_post_excerpt($fid, 60).
  Matches the heading sheet's Insights recommendation (featured H3 = the post title).
- The card is a fixed-height box on >= 768 (overflow hidden): a 2-line title pushed Read More out by 25-61px. css/insights.css
  (end): title 1 line + "…", excerpt 2 lines (4 below 768) + "…" = the design's own line counts. Card image/date/title/text/
  Read More boxes IDENTICAL at 1920/1440/1280/1024/768/767/430/393/375/360/320; Read More inside; no h-scroll. Full title is
  still in the H3 (SEO) and on the post page. Classes only used here (+ archive.php, which always 301s).
- Verified local: blog flow 270/270 (Featured now passes too). Previous zip: scratchpad theme-code-only-1.5.44.zip.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.44` + old-blogs-import.zip; importer ran: 6 old posts published, 12 samples trashed (404); blog flow 268/270 (2 = Featured card fixed design copy), SEO vs getsold.ae: 99 tags equal incl. exact dates, only expected diffs; UI break check 11 pages x 9 widths (1920-320) = 99/99 clean; Services/Client Success/Why SOLD image boxes = 808/808 identical to the step-7 live recording. Favicon files NOT uploaded yet (waiting senior) -> favicon code inactive)
## (was PENDING) (theme zip `_S_VERSION 1.5.44` + `old-blogs-import.zip`, no SQL) — Old blog posts for client review (6 from the gbbck backup) + mobile long-title fix
NOTE: 1.5.44 also contains the favicon/login work (1.5.43, waiting for the senior's OK on the dot). Deploying 1.5.44 deploys
that code too; it only switches on when wp-admin is opened AND its 3 icon files (new-images-v1.5.43.zip) are on the server.
**Steps:**
1. Upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
2. Upload `old-blogs-import.zip`, extract in `wp-content/themes/` too (15 files in `sold-theme/import/old-blogs/`: posts.json + 14 images).
3. Open any wp-admin page once (refresh an already-open tab). `sold_import_old_blogs` (runs once, option `sold_old_blogs_done`):
   adds the 6 posts (published, original dates, category AI Marketing, featured image, old Yoast SEO title + description),
   adds their 14 images to the Media Library, then moves the 12 sample articles to the Trash (restorable 30 days).
   The first admin load takes ~15 s (image processing).
- Source: gbbck backup DB (24 Sep 2025) = 6 published posts (10 more were in the old site's Trash). The current getsold.ae
  has 15 - the 9 newer ones are not in the backup (user chose the 6). Content is plain HTML (h2/h3/p/ul/b/img) -> uses the
  existing single.php design. Old image URLs (getsold.ae/wp-content/...) -> our copies; links to old pages -> new pages
  (real-estate-pr -> /public-relations/, ai-search-page -> /ai-marketing/, lead-generation, home). 0 getsold.ae refs left.
  Featured images > 1 MB resized to 1600 px JPG (one was 26 MB); the 2 AVIF inline images converted to JPG (server can't
  resize AVIF). Old SEO titles end in "| Get Sold" - copied as-is, flag to client.
- SEO = old site (checked tag by tag vs getsold.ae): title + description (old Yoast), robots, og:type article, og:title/desc,
  published + modified dates EXACT (old GMT times, `date_gmt`/`modified_gmt` in posts.json; modified set after save + Yoast
  indexable rebuilt), "Selling Dubai..." title = the online one ("...in 2026", edited on the old site after the backup),
  twitter:title/description/image added back on posts (`sold_post_twitter_*`; old Yoast 25.7 printed them, Yoast 28 omits),
  schema Article/WebPage/Breadcrumb/Organization/Person. Author stays "SOLD" (user, old = "Get Sold"). 1 empty inline alt
  -> post title (doc #3). Expected differences: domain + /insights/ path (canonical/og:url), image copies, AdSense (tracking, skipped).
- Flow verified local (268/270): every Insights card (Featured/Latest/Explore), Home card and related card -> Read More -> the
  right post (H1/date/excerpt match). The 2 'fails' = Featured card headline/text are FIXED design copy ("Featured Insights",
  ACF insights_featured) by design - only its image/date/link come from the post. Explore cards use the fixed design images.
- front-page.php: Home Insights cards skip a hand-picked post that is no longer published (else a trashed pick = broken card).
- css/insights-details.css (end): mobile hero - titles of 5+ lines ran over the read-time/date line (pinned 212px below the
  title top; also hit the old sample "Golden Visa Demand..." = 5 lines). Meta now follows the title, title box min 212px:
  1-4 line titles IDENTICAL (measured 0.1px at 320/375/393/430/767), longer ones get the same 40px gap. >= 768 untouched.
- Insights with 6 posts: Featured 1 + Latest 4 + Explore 6, no Load More (comes back at 7+ posts; ?fpage=2 -> /insights/).
  Tabs: All + AI Marketing = 6; Marketing & Branding / Lead Generation / Trending Topics empty (client adds later - OK'd).
- Verified local: 6 articles x 1440/393 = 1 H1, old SEO title, featured + inline images load, related 4, links to new pages,
  no h-scroll, 0 errors; Insights + Home OK; DB backup before import: scratchpad sold-before-old-blogs.sql.
- After deploy check: same on live; old URLs need 301s at launch (getsold.ae/<slug>/ -> /insights/<slug>/).

## ❌ SUPERSEDED by 1.5.46 (do NOT use new-images-v1.5.43.zip - deleted) — was: Favicon = orange SOLD dot + SOLD logo on the login page
Client: "Change the WordPress logo to orange SOLD dot". User chose (2026-10-01): favicon = the orange dot only; login page
logo too; admin bar left as is. **Four steps:**
1. Upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
2. Upload `new-images-v1.5.43.zip`, extract in `wp-content/themes/` too (3 files in `sold-theme/assets/images/seo/`:
   `sold-site-icon.png`, `sold-apple-touch-icon.png`, `favicon.ico`).
3. Upload `deploy/favicon.ico` into **`public_html/`** (the site root, next to wp-config.php). Needed because LiteSpeed answers
   `/favicon.ico` with its own 404 before WordPress runs.
4. Open any wp-admin page once (refresh if a tab was already open). `sold_site_icon_setup` adds `sold-site-icon.png` to
   the Media Library ("SOLD icon") and sets it as Settings -> General -> Site Icon (runs once; option `sold_site_icon_done`).
- Icons: dot colour = the logo's own dot `#FCA82D`. Site icon 512x512 transparent (tab icon, Android, Windows tile);
  apple-touch-icon 180 = dot on white (iOS paints transparency black; `sold_apple_touch_icon` swaps that tag only while the
  SOLD icon is the Site Icon); favicon.ico 16/32/48.
- Login page (`sold_login_logo`): logosold_dark.png (dark SOLD + orange dot) 240x76, links to the site, text "SOLD" -
  was the WordPress W linking to wordpress.org.
- Verified local: icon tags on every page (icon 32 + 192, apple-touch, msapplication tile); login page screenshot; 5
  in-scope pages x 5 widths = 25/25 pixel-identical to the ORIGINAL pre-step-4 design (one Services 320 shot was image-load
  noise, re-shot twice identical). Previous zip: scratchpad theme-code-only-1.5.42.zip.
- After deploy check: icon tags in view-source; /favicon.ico 200 image; login page logo; tab shows the orange dot.

## 🔎 FULL RE-AUDIT 2026-10-01 (steps 1-7, local + live, scratchpad audit.js / popscroll.js / pop4.js)
- Step 1: /contact + /contact/ 301 Home; 4 category URLs 301 to tabs; no /contact/ links; 1 <title> + 1 H1 + no duplicate ids on 7 pages x
  1440/393; every visible Contact trigger opens the popup and X / Esc / backdrop close it; page returns to the same scroll spot
  (live 77/78 + the 78th re-run 5/5 OK - the miss was the test reading mid smooth-scroll; Bootstrap sets scroll-behavior:smooth, so
  tests must wait for scroll to settle); mobile drawer Contact + Book a Call open the popup and close the drawer; empty submit = field
  errors, 0 requests. Step 2: every image has alt on Home/Why SOLD/Services/Client Success/Insights; Branding & Design still has 3
  icons without alt (branding-hero-cta-icon / branding-cta-icon / branding-step-arrow = doc #3 items, deferred with the service pages).
  Step 3: every internal link ends in / and opens 200 directly (live 24 URLs; local = same except the 7 service pages not in the local
  DB). Step 4: exact titles/descriptions, index,follow, self canonicals, sitemaps. Step 5: og:image 1200x630 + Organization SOLD/logo,
  both files 200. Step 6: 11 URL variants + Load More. Step 7: all images sized. UI: no JS/network errors (favicon.ico excepted), no
  horizontal scroll; local screenshots 7 pages x 5 widths = 35/35 pixel-identical to the pre-step-4 originals.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.42`; live: 336 img on 7 pages all sized, 0 missing, <source> sized, breadcrumb tags intact; every image's box on live vs a pre-deploy live recording = 1,551 boxes (33 page/width sets) IDENTICAL; popup 7 pages x 1440/393 OK (favicon.ico 404 pre-existing); Load More 5 widths + 4 mobile runs OK, new cards sized; sitemaps/robots/feed/REST untouched; redirects intact; Home ~1.4 s)
## (was PENDING) (theme zip `_S_VERSION 1.5.42`, no SQL, no images, no new files) — SEO doc step 7: image width/height (#9)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
- functions.php (`sold_add_img_sizes` + helpers): the finished HTML of every front-end page (output buffer, template_redirect
  prio 99; not admin/feeds/robots/AJAX/REST, only text/html) gets `width` + `height` on every `<img>` without them whose file
  is in this theme or in uploads (real size: getimagesize, SVG from its width/height or viewBox), plus on `<picture>`'s
  `<source srcset>` (mobile hero = 393x852, its own shape). Sizes cached in option `sold_img_sizes` (autoload off, keyed by
  file + mtime). Tag regex respects quoted values (breadcrumb icon alt=">>>" contains ">").
- No visual change by design: processed images also get `data-sold-size`, and `<style id="sold-img-size">
  :where(img[data-sold-size]){width:auto;height:auto}</style>` (wp_head prio 1, zero specificity, so every stylesheet
  rule still wins) stops the attributes from setting the drawn size - they only give the shape (aspect ratio), so the
  browser can reserve space when CSS sets one side (the CLS fix).
- Not touched: images that already have width/height (WordPress's own, e.g. article featured SVGs get width="1"
  height="1" from WordPress - pre-existing, articles are out of scope), external images.
- Verified local: 7 pages - 300 img all sized (0 missing), sources sized; every image's rendered box at 5 widths x 7 pages
  = 1,583 boxes IDENTICAL to before (to 0.01px); shape of attrs = file shape for all 94 files (mobile hero handled by its
  <source>); screenshots 35 pairs vs step 6 = 34 identical + the known 1/255 Why SOLD 768 noise pixel; popup 7 pages x
  1440/393, 0 JS errors; Load More still OK (new cards arrive sized); sitemaps / feed / REST JSON untouched; cost ~14 ms
  per page. Previous zip: scratchpad theme-code-only-1.5.41.zip.
- After deploy check: view-source shows width/height on images; same box check on live (rects.js) vs before.

## ✅ CONFIRMED LIVE 2026-10-01 (`_S_VERSION 1.5.41`; live: all 11 URL variants = table below (status, X-Redirect-By, title, robots, canonical, prev/next, og:url), one hop, https; Load More at 1440/1024/768/393/320 = 6 -> 12 cards all visible + unique, same document + URL, button gone, 0 JS errors; tabs + search work, noindex; popup 7 pages x 1440/393 OK (favicon.ico 404 pre-existing); Home CSS/JS unchanged; sitemap has no fpage URLs)
## (was PENDING) (theme zip `_S_VERSION 1.5.41`, no SQL, no images) — SEO doc step 6: Insights canonicals / noindex / page titles / Load More (#5, #7, #13)
**One step:** upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite). It has 1 NEW file:
`sold-theme/js/insights-load-more.js` (zip now 49 files).
- The feed's page parameter is `fpage` (the doc says `?page=` - WordPress reserves `page` and redirects it, so it stays
  `fpage`). Rules (functions.php `sold_redirect_insights_variants`, `sold_insights_seo_presentation`,
  `sold_insights_noindex_when_filtered`, `sold_insights_no_canonical_when_filtered`):
  | URL | Result |
  |---|---|
  | `/insights/` | index, self canonical, title from step 4, rel=next `?fpage=2` (was `/insights/page/2/`) |
  | `/insights/?fpage=2` (3, ...) | index, self canonical, title + og:title "Insights – Page N \| SOLD", prev/next |
  | `?fpage=1`, junk, out-of-range | 301 -> `/insights/` (filters kept: `?insights_cat=x&fpage=1` -> `?insights_cat=x`) |
  | `/insights/page/N/`, `/insights/?page=N` | 301 -> `?fpage=N` (one hop; these showed page 1 again = duplicates, not in the doc) |
  | `?insights_cat=` / `?insights_search=` | noindex, follow; no canonical; no prev/next |
  Redirects carry `X-Redirect-By: SOLD Insights`. Category tab links no longer add `fpage=1` (home.php `sold_insights_url`).
- Load More (#13): `js/insights-load-more.js` (only on Insights) fetches the button's `?fpage=N` URL and appends its
  cards - no reload, URL unchanged; button moves to the next page or disappears. The link stays a real link (works
  without JS / for crawlers; on a failed request the click falls back to it). Mobile shows 4 of each 6 (design): a Load
  More click first reveals the hidden ones, so no article is skipped on mobile (before, cards 5-6 of each page were never
  visible on mobile). Keyboard: focus moves to the first new card. Behaviour change: Load More now ADDS articles below
  (before it reloaded the page showing only the next 6).
- Verified local: all URL variants above (status, X-Redirect-By, title, robots, canonical, prev/next, og:url, schema
  WebPage url/name); Load More at 1440/1024/768/393/320: 6 -> 12 cards, all visible, all unique, same document, same
  URL, button gone, 0 JS errors; multi-click test with 3/page (temporary) 3->6->9->12 incl. keyboard Enter; category tabs
  + search work and are noindex; 7 pages x 5 widths screenshots vs step 5 identical (3 single-pixel 1/255 render-noise
  spots that move between runs); popup 7 pages x 1440/393, 0 JS errors. Previous zip: scratchpad theme-code-only-1.5.40.zip.
- After deploy check: the URL table above on live; Load More on live at 1440 + 393.

## ✅ CONFIRMED LIVE 2026-09-30 (`_S_VERSION 1.5.40` + images zip; wp-admin opened -> attachments 1115 etc. created 13:21; live: og:image sold-share.jpg 1200x630 + Organization SOLD / sold-logo.png 1200x480 on Home, Why SOLD, Services, Client Success, Insights, a post; 1 title each; CSS/JS list identical to before; popup 7 pages x 1440/393, 0 JS errors (favicon.ico 404 pre-existing). NOTE: an admin tab opened BEFORE the upload must be refreshed (F5) for the one-time setup to run)
## (was PENDING) (theme zip `_S_VERSION 1.5.40` + `new-images-v1.5.40.zip`, no SQL) — SEO doc step 5: Open Graph image + Organization schema (#11, #12)
**Three steps:**
1. Upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
2. Upload `new-images-v1.5.40.zip`, extract in `wp-content/themes/` too (2 files: `sold-theme/assets/images/seo/sold-logo.png`,
   `sold-share.jpg`).
3. Open any wp-admin page once (e.g. Dashboard). Theme code (`sold_yoast_defaults`, step 2) then adds the 2 images to
   the Media Library ("SOLD logo", "SOLD") and sets Yoast: Organization name "SOLD" + logo, sitewide share image.
   Only fills empty Yoast fields; runs once (option `sold_yoast_defaults_done` = 2). Editable later in Yoast -> Settings
   (Site representation / Site basics).
- Why: old getsold.ae (also Yoast) had og:image + an Organization "SOLD" with logo; the new site had neither. User
  decided 2026-09-30: use ONLY new-site images - the old Client Success / Insights og:images are screenshots of another
  brand ("nestopa") and the old logo is the old wordmark. New images: `sold-share.jpg` 1200x630 (56 KB) = the site's
  hero photo (bannersold.png) + the new logo; `sold-logo.png` 1200x480 (82 KB) = new logo (from logosold.svg) on brand
  dark #263238 (the logo is white, so on Google's white it needs a background).
- Result per page: og:image (+width/height/type) = share image (articles with a PNG featured image use it; the 8 with
  SVG featured images fall back to the share image - SVG isn't allowed for og:image). Schema graph = WebPage,
  BreadcrumbList, WebSite, Organization(SOLD + logo) - same structure as getsold.ae. og:title/description/url/type,
  twitter:card were already equal since step 4.
- Verified local: 6 pages og tags + schema as above; 7 pages x 5 widths full-page screenshots vs step 4 = 35/35
  pixel-identical (2 had 1/255 decode noise, re-shot identical); popup 7 pages x 1440/393, 0 JS errors.
  Previous zip: scratchpad theme-code-only-1.5.39.zip.
- After deploy check: view-source Home -> og:image = .../uploads/.../sold-share.jpg, schema has "Organization" with
  sold-logo.png; share test in https://www.opengraph.xyz or LinkedIn Post Inspector; Google Rich Results Test.

## ✅ CONFIRMED LIVE 2026-09-30 (`_S_VERSION 1.5.39` + Yoast SEO 28.6 + `seo-yoast-titles-descriptions.sql` = 6 rows; live: Home/Client Success/Insights old titles + descriptions exact, 1 title/1 H1/canonical/index,follow on 14 pages, sitemap_index = page+post sitemaps, category/author 404, /wp-sitemap.xml 301 -> sitemap_index, contact + category 301s intact, robots.txt now 200 (Yoast, Disallow: empty + Sitemap line), Yoast loads no front-end CSS/JS (head assets identical), popup opens on 7 pages x 1440/393, 0 JS errors (favicon.ico 404 = pre-existing, no favicon file))
## (was PENDING) (theme zip `_S_VERSION 1.5.39` + Yoast SEO plugin + `seo-yoast-titles-descriptions.sql`) — SEO doc step 4: Yoast + SEO titles / meta descriptions (#7, #8)
**Four steps, IN THIS ORDER** (the SQL must go in before Yoast is activated - Yoast caches each page's SEO
in its own table the first time it sees the page, and would miss values added later):
1. Upload `theme-code-only.zip`, extract in `wp-content/themes/` (overwrite).
2. wp-admin -> Plugins -> Add New -> search "Yoast SEO" (by Team Yoast) -> **Install Now. Do NOT click Activate yet.**
3. phpMyAdmin -> `uaenewpr_sold` -> SQL tab -> run `deploy/seo-yoast-titles-descriptions.sql`. The last query lists
   the values: expect 6 rows (title + description for home, client-success, insights).
   Safe to run twice (adds only where empty). The 8 service pages are NOT in it (later, with the service rebuild).
4. Plugins -> Yoast SEO -> **Activate**. Skip/close Yoast's setup wizard (First-time configuration) - not needed.
   Opening any wp-admin page sets the title separator to "|" once (theme code).
- What changes: every page gets one `<title>` "Page | SOLD" (separator was "–") and Yoast's canonical; Home, Client
  Success, Insights get the old getsold.ae SEO title + meta description (editable later in each page's Yoast box). Old -> new map is at the
  top of the SQL file. Sitemap becomes `/sitemap_index.xml` (Yoast); `/wp-sitemap.xml` redirects to it (root installs
  only - 404 locally because of the /sold/ subfolder). Contact page, category and author sitemaps excluded
  (`sold_yoast_sitemap_exclude_*` in functions.php). Yoast also adds its default OG + schema tags (tuned in step 5).
- No text for (client to supply): Services, Why SOLD, the 12 Insights posts -> title "Page | SOLD", no description.
  8 service pages: later (re-fetch their values from the matching getsold.ae service pages then; lead-generation's old
  description duplicates Home's, flag to client then).
- Re-checked after trimming scope: SQL run on a clean copy of the 2026-09-30 DB = 6 rows, 2nd run adds none, "Don’t"
  apostrophe intact; local Yoast cache (wp_yoast_indexable) = values only on Home/Client Success/Insights; 7 pages
  1 title/1 H1/1 canonical, robots index,follow.
- Verified local: 7 pages (5 in scope + branding-design + a post) = 1 title, 1 H1, 1 canonical each; descriptions exact
  (curly apostrophe OK); sitemap_index = page + post sitemaps only; 7 pages x 5 widths full-page screenshots
  PIXEL-IDENTICAL before/after (35/35); popup opens on 7 pages x 1440/393, 0 JS errors. SQL run twice = no duplicates.
  Yoast 28.6 files checked against wordpress.org checksums (1938/1938 match). Previous zip: scratchpad theme-code-only-1.5.38.zip.
- After deploy check: view-source of Home / Client Success / Insights / a service page = old title + description;
  `/sitemap_index.xml` loads; `/wp-sitemap.xml` redirects; no visual change; popup works; ver=1.5.39.

## ✅ CONFIRMED LIVE 2026-09-30 (`_S_VERSION 1.5.38`; live: 846 internal links on 7 pages x 1440/393 = 0 without the slash, all 25 targets direct 200; popup/drawer/validation OK on 7 pages x 5 widths, 0 JS errors; UI: live pages with vs without the change (links reverted in-browser) pixel-identical; vs 1.5.37 shots 24/25 identical, Insights 1440 photo-decoding noise max 7/255) — SEO doc step 3: internal links straight to the final URL (#6)
- `sold_trailing_slash()` (functions.php): internal page URLs get the ending "/" (before any ?query/#fragment); external,
  files, mailto:/tel:/#, protocol-relative untouched. Used by `sold_resolve_link()` (ACF link fields: services accordion Read
  More + All Services, Who-we-work Discover Now, Home Insights button, footer fallback) and `wp_nav_menu_objects` filter
  (menus, front end only - saved admin values untouched). home_url('/x') -> home_url('/x/') in header/footer/front-page;
  Client Success breadcrumb home_url() -> home_url('/').
- Verified local: 846 internal links on 7 pages x 1440/393 - 0 without the slash; edge-case unit test OK; 5 pages x 5 widths +
  popup PIXEL-IDENTICAL to the morning baseline. The 7 service URLs 404 locally only (not in local DB) - all 200 on live.

## ✅ CONFIRMED LIVE 2026-09-30 (`_S_VERSION 1.5.37`; live: 573/573 img have alt text on the 5 pages @1440+393, new alts correct; step 1 re-checked (redirects, sitemap, 1 title/H1, popup on 7 pages x 5 widths, drawer, validation, 0 JS errors, scroll 54/54); UI: live page vs same page with the changes undone in-browser = identical 23/25, 2 = max 1/255 colour noise) — SEO doc step 2: alt text (#3)
- whatsppmob.svg alt "" -> "WhatsApp" (whatsapp-float.php; link keeps its aria-label) · Client Success doublequotes.png
  "" -> "Quote" · popup icons Call/Office/Car -> Phone/Email/Address, mobile bar Call -> Phone (contact-modal.php).
- green SOLD logos (Success Formula title x3 pages, Why SOLD "About SOLD.") "" -> "SOLD logo" (user wants EVERY image with alt;
  heading textContent unchanged = live). Local check: 520/520 img have alt text on the 5 pages at 1440 + 393. "Arrow" alts kept
  (the client's audit tool flags EMPTY alt, so blanking them would add flags). branding-* images = service pages, later.
- Verified local: 5 pages x 5 widths + popup at 5 sizes pixel-identical (Services vs the morning baseline; the step-1
  "final" Services shot was photo-loading noise). Zip carries step 1 too (1.5.36 is already live).

## ✅ CONFIRMED LIVE 2026-09-30 (`_S_VERSION 1.5.36`; live: /contact/ + /contact 301 Home, 4 category URLs 301 to their tabs,
sitemap clean, 1 title + 1 H1 on every page, 0 /contact/ links, popup same design; 7 pages x 5 widths every button opens/closes,
drawer Contact + Book a Call open the popup, validation OK, 0 JS errors; scroll restore 54/54)
## (was PENDING) (theme zip `_S_VERSION 1.5.36`, no SQL) — SEO doc step 1: Contact page (#1, #2, #4) + category archive redirects
Client SEO doc: https://docs.google.com/document/d/10dEIi2fhPzuzTL2fkAiDLWgfr48QTP-_6G_FW7-pCMU (14 items; #10 skipped, #14 done 09-29;
scope = Home, Services, Client Success, Why SOLD, Contact, Insights - the 8 service pages later).
- Contact popup no longer fetched from /contact/: `template-parts/contact-modal.php` (same markup, reads the Contact page's ACF by
  its ID - still edited in Pages -> Contact) printed on every page via `sold_print_contact_modal()` (wp_footer, prio 5).
  `js/contact-modal.js` uses the in-page modal. Titles are divs (same as the old injected popup).
- `sold_contact_url()` now returns `#contact`; `sold_contact_page_url()` = real permalink; `sold_is_contact_link()` maps saved
  /contact links (ACF fields via sold_resolve_link, menu items in the nav walker) to `#contact`. Why SOLD founder button now uses
  sold_cta_url(). Mobile drawer "Book a Call" got data-contact-trigger (it used to navigate to /contact/).
- `/contact/` and `/contact` -> 301 Home in one hop (`sold_redirect_contact_page`, template_redirect prio 1). `page-contact.php`
  kept (ACF group is attached to its template) but reduced to the shared part; its duplicate `<title>` removed.
- `/insights/category/<slug>/` -> 301 `/insights/?insights_cat=<slug>#lorem-blogs` (uncategorized -> /insights/)
  (`sold_redirect_category_archives`). archive.php rendered with no footer/scripts and nothing links to it.
- Verified local: popup pixel-identical at 1440x900/1024x768/768x1024/393x852/320x568; 5 pages x 5 widths full-page identical
  (2 photo-loading noise diffs re-shot identical); every visible trigger on the 5 pages opens+closes the popup (1440 + 393);
  form submit OK (test enquiry deleted, mail blocked during test); 0 links to /contact/ left; category redirect = same tab +
  same posts as clicking the tab. Previous zip saved as scratchpad theme-code-only-1.5.35.zip.
- wp-sitemap.xml: Contact page and the category sitemap removed (they 301) - `sold_sitemap_exclude_contact`,
  `sold_sitemap_drop_categories`. Pages sitemap = home, why-sold, client-success, services, insights, branding-design; 12 posts.
- Pre-deploy full check (local): 7 pages (5 in scope + branding-design + a post) x 1440/1024/768/393/320 - every visible trigger
  opens/closes (X / Esc / backdrop), mobile drawer Contact + Book a Call open the popup and close the drawer, empty-submit
  validation shows 5 messages with no request, 0 requests to /contact/, 0 duplicate ids, 0 JS errors; popup DOM = live's
  (95 elements, classes, texts, images identical); scroll after close back to the exact spot 54/54 (live 54/54 too); admin edit
  of Pages -> Contact title shows in the popup on every page (restored).
- After deploy check: /contact/ 301, popup opens on every page, category URLs 301 to tabs, sitemap clean, ver=1.5.36.

## ✅ CONFIRMED LIVE 2026-09-29 (theme zip `_S_VERSION 1.5.35` + `footer-social-links.sql`) — Footer social icon links (all pages)
- `footer.php`: Facebook / LinkedIn / Instagram icons fall back to SOLD's pages instead of "#" when the Theme Settings field is empty.
- `deploy/footer-social-links.sql`: fills Theme Settings -> Facebook / LinkedIn / Instagram Link (only if empty; editable in admin after).
  - Facebook https://www.facebook.com/GetSold.ae/ · LinkedIn https://www.linkedin.com/company/soldmedia/?originalSubdomain=ae · Instagram https://www.instagram.com/getsold.ae/
- Verified local: all pages with the footer, 1440 + 393, links correct, icons unchanged 34x34. Zip also carries 1.5.34 below.

## ✅ CONFIRMED LIVE 2026-09-29 (included in the 1.5.35 zip, no SQL) — Insights MOBILE: "Explore All Insights" one card per row (was 2)

`css/insights.css` (block at the end), mobile only (<768). Figma 4050:1735 / 1530 / 1570 / 1651 / 1653 / 1655 / 4075:1744 /
4075:1746 (393 frame): heading 35 tall (bar 5.4x31, SemiBold 20/30 orange 11.2 after the bar, left 21) -29- headline (Bold
20/24, left 20, 352 wide) -29- 4 cards 333 x 278, 30 from each side, 8 apart; card #E9EAEB r5, padding 7/8/14, gap 6, image
317 x 147 r4; date Inter 8, title Bold 10 (1 line "..."), excerpt 10/14 (3 lines "..."), Read More SemiBold 8. vw-based.
Verified locally 320-767 = Figma x scale exactly, no overflow/h-scroll; web/tablet 1440/1024/768 PIXEL-IDENTICAL to before
on /insights/ and a category page. Category pages share the section: their small cards are now 1 per row too (below their
large featured card) - web unchanged.

## ✅ FINAL SEO AUDIT 2026-09-29 (live 1.5.33, fresh copy of the client sheet) — Homepage 34/34, All Services 32/32,
Client Success 27/27, Why SOLD 36/36, Insights 21/21 headings: every TAG and the ORDER match "Recommended". Wording differs
only in 3 deliberately-kept texts (CS + Insights pre-footer desktop line, Insights featured "Featured Insights"). UI: 1,070
computed-style checks of every changed element vs the original version at 1440/1024/768/393/320 = identical. 1 H1 per page,
0 headings in the popup, no h-scroll, all images load (a "23 broken" reading at home 1440 = lazy-load timing; slow re-check:
69/69 loaded), no JS errors. Service pages (Branding & Design tab) = later, per client.

## ✅ CONFIRMED LIVE 2026-09-29 (`_S_VERSION 1.5.33`; live Insights 21/21 tags = sheet, H1 text now exact, only the 2 known TEXT choices differ (Featured "Featured Insights", pre-footer desktop wording); category H1 fixed; heading styles identical to original at 1440/1024/768/393/320 (80 + 75 checks); filter, search, Load More, card links work; 1 H1; no h-scroll/broken imgs/JS errors) — SEO heading tags: Insights (+ category pages)

Sheet tab "Insights": live already matched the recommended tags except the H1 TEXT, which read "UAE Real EstateInsights,
Trends & Marketing" (no space - the <br> between the two lines). functions.php sold_title_with_highlight(): space before the
first <br> -> "UAE Real Estate Insights, Trends & Marketing" (Insights + category pages share it). Styles + full-page
screenshots identical at 1440/1024/768/393/320 on both. Left as is (text, not tag - editable in the admin): Featured card H3
shows the fixed "Featured Insights" (sheet wants the post title; hiding it as invisible text = risky, so no); pre-footer
desktop wording. Branding & Design / the 8 service pages: client said LATER - not started.

## ✅ CONFIRMED LIVE 2026-09-29 (`_S_VERSION 1.5.32`; live outline = sheet: Why SOLD 36/36 headings exact; Client Success 27/27 tags exact - only the pre-footer TEXT differs (tag-only task, kept); styles of every changed element identical to the original at 1440/1024/768/393/320 (CS 160 + WS 230 checks); FAQ, popup work, 1 H1 each, popup + mobile team carousel 0 headings, no h-scroll, no JS errors) — SEO heading tags: Why SOLD

Sheet tab "Why SOLD". Outline now: H1 Get the Real Estate Experts on Your Team (hero lines in h1.services-hero-title-seo,
same classes/CSS as Services) > H2 About SOLD. (span -> h2 + hidden " SOLD.", logo alt "") > H3 Our Mission / Our Vision
/ Collaborate with Us (h4 -> h3) > H2 Our Founders > H3 "Andy Birt Co-Founder | CEO" (h3.ws-founder-heading
display:contents around name + title spans) > H2 Our Team > H3 x12 names (DESKTOP grid; phone carousel names h4 -> div
because the carousel clones a card for its loop) > H2 What Our Clients Say > H2 The SOLD Success Formula (hidden SOLD)
> H3 x3 steps > H2 pre-footer > H2 Have Questions ? > H3 x6 (phone FAQ copy) > H4 x3.
`page-why-sold.php` + `css/why-sold.css` (block at the end; h3 team/info keep h4 default size, mobile names keep h4
defaults, founder spans keep h3/div defaults). Verified locally: styles/boxes/text positions identical at
1440/1024/768/393/320 (only the 2 clipped hidden words); full-page screenshots PIXEL-IDENTICAL original vs new (768:
1 px inside the logo-animation spot that also differs original-vs-original); FAQ, popup, carousel same as live.

## ✅ CONFIRMED LIVE 2026-09-29 (shipped in 1.5.32) — SEO heading tags: Client Success

Sheet tab "Client Success". Outline now: H1 Growing Sales for Leading Brands > H2 Client Success (div.cs-intro-label -> h2)
> H3 x10 case studies (unchanged) > H2 The SOLD Success Formula (h2, hidden "SOLD", logo alt "") > H3 01./02./03. steps
> H2 pre-footer > H2 Have Questions ? > H3 x6 (phone FAQ copy) > H4 x3. Demoted: "Designed For Deals" (phone hero
subtitle h2 -> div). `page-client-success.php` + `css/client-success.css` (2 :where rules; FAQ/steps reuse the style-v2 ones).
NOT changed (text, not tag): sheet recommends pre-footer "READY TO GROW YOUR BUSINESS FROM THE REAL ESTATE EXPERTS?",
page says "READY TO WORK WITH THE REAL ESTATE EXPERTS?" - kept (tag-only task); editable in Client Success -> Pre-Footer.
Verified locally: styles/boxes/text positions identical at 1440/1024/768/393/320 (only the clipped hidden word) and
full-page screenshots PIXEL-IDENTICAL original vs new at all 5 widths; FAQ, card buttons -> popup work; no JS errors.

## ✅ CONFIRMED LIVE 2026-09-29 (`_S_VERSION 1.5.30`; live outline = sheet exactly: Home 34 / Services 32 headings, tag + text + order; styles (display, margins, padding, font family/size/weight, line-height, spacing, colour) of every changed element identical to the original version at 1440/1024/768/393/320; FAQ, accordion, popup work, popup has 0 headings; no h-scroll, no JS errors. Before deploy: full-page pixel comparison original vs new code on local = identical at all 5 widths) — SEO heading tags: All Services (/services/)

Sheet tab "All Services". Outline now: H1 Industry Leading Marketing Services (hero lines in h1.services-hero-title-seo,
display:contents) > H2 Services (intro) > H3 Strategic marketing solutions... (accordion title_tag h3) > H3 x8 names >
H2 The SOLD Success Formula (div.sf-title-wrapper -> h2, visually-hidden "SOLD", logo alt "") > H3 01./02./03. steps
(div.step-card-title-wrapper -> h3) > H2 WHO DO SOLD WORK WITH? > H3 x4 > H2 pre-footer > H2 Have Questions ? > H3 x7
(phone FAQ copy only) > H4 x3. Accordion label stays a div here (the intro "Services" is the H2).
`page-services.php` + `css/style-v2.css` (block at the end: :where() resets; span.services-hero-title-bottom keeps the h2
defaults it had; h1 wrapper display:contents - without it the phone hero moved 8px). Verified locally at
1440/1024/768/393/320: every changed element's styles/boxes, every text position and page height IDENTICAL to before
(only the clipped hidden "SOLD" + a 0.016px sub-pixel width); Success Formula title pixel-identical with/without it.

## ✅ CONFIRMED LIVE 2026-09-29 (shipped in 1.5.30) — SEO heading tags: Homepage (client sheet tab "Homepage")

Client SEO sheet: https://docs.google.com/spreadsheets/d/10_85HhFbFDJP_itcUkHuFJYEOEhsw76AYE5P_8tmSFA (tabs: Instructions,
Homepage, All Services, Client Success, Why SOLD, Branding & Design = model for all service pages, Insights). Rules: backend
only, design must not change; follow the recommended structure; remove all other headings. Doing one tab at a time.
Homepage outline now = sheet: H1 "The UAE's No. 1 Real Estate Marketing Agency" (hero lines in ONE h1.hero-title-seo,
display:contents, lines are spans) > H2 What we do > H3 Design/Launch/Sell > H2 WHO DO SOLD WORK WITH? (visually-hidden
"SOLD" in the logo spacer) > H3 x4 > H2 What Our Clients Say > H2 Services > H3 x8 service names > H2 Why SOLD? > H2 Insights
> H3 Latest real estate updates and insights > H2 pre-footer > H2 Have Questions ? > H3 x6 (phone FAQ copy only; desktop
copy stays spans, no duplicates) > H4 footer x3. Demoted: "We ensure..." (p), accordion long heading (div), 3 insight card
titles (div), popup "Contact The Team" x2 (div, converted in js/contact-modal.js; Contact page keeps its h2).
Files: front-page.php, template-parts/services-accordion.php (label/title/item tags via get_template_part args; Services
page passes its CURRENT tags until its tab is done), template-parts/who-we-work.php, page-services.php, js/contact-modal.js,
css/style.css + css/contact.css (:where() resets so the new tags look exactly like the old span/div/h2).
Verified locally: computed styles + boxes of every changed element and the position of every visible text run at
1440/1024/768/393/320 IDENTICAL to before (page heights too); hidden "SOLD" pixel-identical. Services: only WHO DO SOLD
+ popup change (both in its sheet tab); Contact page headings unchanged.

## ✅ CONFIRMED LIVE 2026-09-28 (`_S_VERSION 1.5.28`; 8 emulated phones 320-430 = Figma x scale: heading 35, bar 3.8x31, gap 27 at 393; 1 per row, no h-scroll; desktop unchanged gap 62 / 589x582; no JS errors) — Insights MOBILE: Latest Blogs heading -> first card gap to Figma

`css/insights.css` (end of the 1.5.27 mobile block). Figma 4050:1514 (heading, 35 tall: bar 3.77x31, text 20/30 SemiBold
8px after the bar) + 4050:1736 (first card 27 below). Was: 30 tall block, 4x24 bar, 14px gap. Now vw-based: at 393 =
heading 35, bar 3.8x31, gap 27 (exact Figma x scale at 320-430). Space above the heading unchanged (54 at 393x852).
Web unchanged (gap 62, 589x582). Figma's heading text is "Latest Insights"; live says "Latest Blogs" - left as is,
editable in Pages -> Insights -> Latest Blogs -> Section Title.

## ✅ CONFIRMED LIVE 2026-09-28 (`_S_VERSION 1.5.27`; live on 8 emulated phones 320-430 incl. real DPRs: 4 cards one per row at Figma size, heading 1 line, images loaded, no h-scroll; web 1440 unchanged 589x582 / section 1391; category pages mobile same 333x287; SEO & GEO unaffected; no JS errors) — Insights MOBILE Latest Blogs: one card per row (was 2 x 2)

`css/insights.css` (block at the end), mobile only (<768). Figma 4050:1736 / 1574 / 1576 / 1593 (393 frame): 4 cards
stacked, 333 x 287, 30 from each side, 10 apart; #E9EAEB, radius 5, padding 7/8/10, gap 6; image 317 x 160 r4; date
Inter 8 (icon 13x12, gap 7), title Mona Sans Bold 12 in a 22 row (1 line, "..."), excerpt 11/14 #292626 fixed 3 lines
("..."), Read More SemiBold 9 in a 24 row. All vw (/393) -> identical proportions on every phone. Verified locally
320/360/375/390/393/412/430/767 = Figma x scale exactly, no overflow/h-scroll; web 768 + 1440 unchanged (589x582).
Figma's 3rd card is 305 tall with a 177 image (designer slip) - kept all four equal.
Also: "Latest Blogs" heading wrapped to 2 lines on phones < ~375 (old fixed margin-right 201px) -> one line everywhere.
Final local check emulating iPhone SE / 12-14 / 14 Pro / Pro Max, Galaxy S8, Pixel 7, S20 Ultra, 320 Android (real
DPRs): identical layout on all; web section vs live = same height (1391) and card positions. Nothing new for the admin:
cards = posts; "Latest Blogs" = Insights -> Latest Blogs; "Read More..." + calendar icon = Theme Settings.

## ⏳ PENDING — client to-dos only: Privacy/Terms pages, delete the 6 ignored sub-items under "Services" in Appearance -> Menus -> Menu 1; security: delete fake plugin wp-optimizer-pro (+ gboost, sold-theme-backup), host malware scan, change the SOLD admin password (it was shared in chat for testing).

## ✅ CONFIRMED LIVE 2026-09-26 (`_S_VERSION 1.5.26` + theme-settings-fill-current-values.sql + admin-fields-fill-current-values.sql (122 queries)). Live check: 9 templates x 1440/393 - all expected texts/placeholders present, no broken text/images, no h-scroll, no JS errors; every saved admin value in the new/parent-row groups is what the page shows; Why SOLD + Client Success steps pixel-compared with 25 Sep screenshots = same content (only scroll-animation frames differ); live Theme Settings shows the 5 tabs + filled values — Admin audit: EVERY page, navbar, footer editable in the admin (web + mobile)

**Three steps, in order:** (1) upload `theme-code-only.zip` (extract in wp-content/themes/), (2) run
`deploy/theme-settings-fill-current-values.sql`, (3) run `deploy/admin-fields-fill-current-values.sql`.
Both SQL files only fill EMPTY fields with today's visible text (nothing on the site changes). Includes 1.5.25 below.
Method (local only): every ACF field of every page + Theme Settings (+ posts) filled with unique markers "QZ<n>",
each page scanned at 1440 + 393 for visible text/images/placeholders WITHOUT a marker = hard-coded; fixed; re-scanned;
local DB restored from zzbk_* backup tables (still in the local DB, drop when done).
Now editable (new fields, empty = today's text/icon):
- Theme Settings > Shared Sections: Who We Work With heading (3 words + logo) + mobile Discover Now text/link;
  Testimonials heading (Enter = mobile break); Services accordion label, heading desktop/mobile, All Services
  text/link/mobile icon, Read More; step circles 1/2/3; mobile breadcrumb icon (Insights); blog "Read More..." /
  "Load More..."; calendar icons (cards / post hero); blog post hero background desktop/mobile.
- Theme Settings > Contact & Social: Contact Form Messages (success, sending, errors, field warnings) - used by
  functions.php AJAX handler and js/contact-form.js (via SoldContact.msgs).
- Why SOLD: Section Labels group (About + logo, Our Founders, Our Team), hero breadcrumb ("Why SOLD ?", trailing ? keeps
  the yellow dot), clients label + quote icon, steps title logo + step numbers.
- Client Success: Case Study Cards group (FIND OUT MORE, arrow icon, quote icon), formula title (The / logo / Success
  Formula) + step numbers.
- Insights: hero breadcrumb, Featured Story title, Latest Blogs group, search placeholder, "All", "Sort By Category",
  Explore grid images (repeater), Category Pages group (All Blogs + headline desktop/mobile). Hero background now uses
  the existing Background Image fields (were ignored). archive.php (category pages) now reads the Insights fields -
  its intro used to show the Client Success paragraph by mistake; now shows the Insights intro (the one real change).
- Contact (page + popup): Form Texts (6 placeholders, services question, SEND MESSAGE), Contact Icons (phone/email/address).
- Service pages: mobile pill icon now follows Production -> Pill Icon (mobile CSS forced the default before).
Still automatic/by design: post dates, read time, 01-04 step numbering on service pages, pagination, "/" separators,
close x. Breadcrumb "Services"/"Client Success"/service names = the page title.
Verified locally: markers on every page = no hard-coded text left; SQL filled values read back by ACF (group parent rows
added where missing - without them ACF ignores a whole group); full-page snapshots of 9 templates x web/mobile identical
before/after the SQL (only async contact-popup preload noise); new fields shown with current text on the edit screens.

## ⏳ (shipped inside 1.5.26) — Admin audit part 1: Navbar + Footer fully editable

Admin editability audit (client: every visible thing on web + mobile must be an ACF field). Navbar + Footer done:
all visible items were already fields/menus except 4 icons; most Theme Settings fields were EMPTY on live (site
showed code defaults, editors saw blank boxes).
- `acf-json/group_global_settings.json`: Theme Settings split into tabs Header & Navbar / Footer / Contact & Social /
  Shared Sections / Page Loader (+ notes pointing to Appearance -> Menus); clearer instructions. No field renamed.
  NEW image fields (empty = today's icon): nav_dropdown_arrow_icon, mobile_menu_close_icon, whatsapp_float_icon,
  whatsapp_float_icon_mobile (functions.php walker, footer.php, template-parts/whatsapp-float.php).
- footer.php: footer WhatsApp icon linked "#" when WhatsApp Link empty -> now same wa.me link as the float button.
- SQL fills ONLY empty fields with today's visible values (book a call text, WhatsApp text/link, phone, public
  email, footer tagline/book call text/company/3 headings, Services Dropdown 9 rows). Local: header/footer/mobile
  menu identical before/after on 3 pages x web/mobile; ACF reads all values; new icon fields tested (set -> shown ->
  cleared). Includes 1.5.24 (Insights label fallback lowercase).
Still needs the client: Facebook / LinkedIn / Instagram URLs (icons link "#"); Privacy Policy / Terms pages (links
"#"); delete the 6 ignored sub-items under "Services" in Appearance -> Menus -> Menu 1 (dropdown comes from Theme
Settings). Local test admin user `claude-local-test` exists for the audit - delete when done.

## ⏳ PENDING (`deploy/insights-intro-label-lowercase.sql`) — Insights intro label lowercase "articles"

Client wants the label lowercase (web + mobile). The theme already shows it exactly as typed (no text-transform
since 1.5.21), so the SQL alone fixes live: saved value ARTICLES -> articles (tested locally: 1 row; web + mobile
show "articles"). Zip 1.5.24 only changes home.php's fallback (used if the admin field is ever emptied) to
lowercase. Editable any time: Pages -> Insights -> "2. Blogs Intro Section" -> Label.

## ✅ CONFIRMED LIVE 2026-09-25 (`_S_VERSION 1.5.23` + steps SQL run: 3 rows; live check at 320/360/375/390/393/414/430: CS intro 7 lines at Figma spots, 10 buttons 234 wide with 6px gap, steps 3 lines 12px orange on all 3 pages (1 <br>, blank line gone), home bar visible, Insights hero 3 lines on 375+, no h-scroll, no JS errors) — 4 mobile fixes

All mobile only (<768). Verified locally at 320/360/375/393/414/430, no h-scroll; desktop sizes unchanged.
1. Client Success intro (Figma 2079:822/823): Inter 16/22 -> Mona Sans Medium 24/37 (0.01em), text at 101 below
   the hero (Figma 953), label 54 -> 44 (Figma bar y 896); text now in flow, section = 101 + text + 71 (was a fixed
   298px). vw-based so all phones show Figma's 7 lines. `css/client-success.css` (block at end).
2. Home "Insights" label line (Figma 1363:886): bar existed but was 0px wide (flex-shrunk: 86.88px wrap too small
   for bar + 11 gap + 77 text). Now flex-shrink 0, 1.88x26.36 orange, gap 8. `css/style.css` (end).
3. Client Success card "FIND OUT MORE" (Figma 2095:1200/1201/1204): text 60.82 -> 47.16 from the left (arrow->text
   gap 19.8 -> 6px), button 249 -> 234 wide. All 10 cards (one template). `css/client-success.css`.
4. Success Formula mobile subtitle on Services, Why SOLD, Client Success (Figma 1680:2414): text = desktop's
   "Everything campaign... one outcome:<br><span class=orange-text>helping your business sell more.</span>"
   (ACF sh_steps_subtitle_mob / ws_steps_subtitle_mobile / cs_formula_subtitle_mob via the SQL + PHP fallbacks);
   12/17 (was 14/20), orange line #FFA726; 15px top / 30px bottom gaps unchanged; 3 lines on every phone.
   Live CS had shown a blank line (value had <br> + Enter -> nl2br double break) - the SQL fixes that too.

## ✅ CONFIRMED LIVE 2026-09-25 (shipped in 1.5.23) — Insights MOBILE hero heading + intro text to Figma

Mobile only (<768). `css/insights.css` (2 blocks at the end) + `functions.php` (sold_title_with_highlight).
Figma "iPhone 14 & 15 Pro - 15" (1997:258): heading 1997:274, intro 1997:277.
1. Heading: live wrapped to 5 lines in a 278px top-aligned box ("UAE Real / Estate / Insights, / Trends & /
   Marketing"); Figma = 3 lines "UAE Real Estate" white / "Insights, Trends" / "& Marketing" orange, centred in
   a 224 box at (25,269). Box now 330 wide (so " &" drops like Figma), 224 tall, flex-centred; the desktop <br>
   after "Trends &" hidden on mobile. functions.php now emits a space before that <br> (else "&Marketing" when
   hidden; invisible at a line end - desktop/other pages' h1 unchanged, checked). Breadcrumb top 588 -> 548
   (Figma y 498); <360px phones 568 (5-line heading). 375-430: 3 lines; 360: 4; 320: 5, no overlap/h-scroll.
2. Intro text: Inter 16/22 at 117 -> Mona Sans Medium 24/35 (0.01em, #0B0B0B) at 97 below the hero (Figma 949),
   352 wide, 5 lines; label 54 -> 44 (Figma 896) to keep Figma's 18px label->text gap.

## ✅ CONFIRMED LIVE 2026-09-25 (`_S_VERSION 1.5.21` + label SQL run: 1 row, page 98 = ARTICLES; row 1103 still "articles" = a non-public revision, harmless; live check 768-1920 + short/tall windows = Figma x scale, mobile unchanged, no text overflow, no JS errors) — Insights: Featured + Latest Blogs cards to Figma (web), intro label as typed in admin

**Two steps:** upload `theme-code-only.zip`, then run the SQL. `css/insights.css` (blocks at the end) + `home.php`.
Figma "Desktop - 7": 1867:1934/1936 (Featured), 1867:1955/1974/1976/1993/1995 (Latest Blogs), 1867:1915 (intro).
1. Cards used vh/dvh padding/gaps/image height -> sizes changed with window HEIGHT. Now all /1440 vw (web 768+):
   Featured card 1197x695 (was 1080x639), image 1141x384, padding 17/28/44, gap 33, title->card 32.
   Latest cards 589x582 (was 646.7x634.9), 2 columns + 32 gap = 1210 centred (was full 1321, 42 gap), image 549x298
   (was 335 tall), padding 17/20/33, text gaps 13. Headline 1 line (32px/50, "..."), excerpt 2 lines (18/23, "...") -
   real titles are longer than Figma's sample (were 2 + 3 lines = 643 tall). Verified 768-1920 and 1440x700/900:
   exact Figma x scale. Mobile (<768) unchanged.
2. Intro label: CSS no longer forces uppercase (web + mobile) - shows exactly what's typed in Pages -> Insights ->
   "2. Blogs Intro Section" -> Label. SQL changes the saved "articles" to "ARTICLES" (Figma 1867:1931); fallback too.
   Intro text desktop/mobile were already editable there.

## ✅ CONFIRMED LIVE 2026-09-25 (`_S_VERSION 1.5.20`; all 8 service pages x 1920/1440/1024/393: gallery = min(natural, box) with ratio kept, centred, no JS errors) — Service page gallery image shown at its natural size

`css/branding-design.css` (shared Service Page template, all 8 pages, desktop + mobile): `.branding-gallery-img`
was width:100% (small uploads stretched up to the container and went soft). Now width:auto + max-width:100% +
margin auto: an image narrower than the container shows at its real pixel size, centred; a wider one is scaled
down to the container; aspect ratio always kept. Container unchanged (78.0556cqi = 1124px at 1440; mobile
screen - 74px). Tested locally: 800x500 -> 800x500, 600x900 -> 600x900, 3000x1500 -> 1124x562, 1808x1060 unchanged.
VISIBLE CHANGE on live (current uploads are 900-1168px wide): at 1440 branding-design (900x528), seo-geo (924x813),
social-media-marketing (951x633), real-estate-websites (929x728) now show smaller than the box; at 1920 all 8 do.
To fill the box, upload >= 1124px wide (1440 screens) / ~1500px (1920).

## ✅ CONFIRMED LIVE 2026-09-25 (`_S_VERSION 1.5.19` + prefooter SQL run: 3 rows; live check at 1024/1280/1366/1440/1536/1920/393: pre-footer SPEAK TO AN EXPERT same size on all 13 pages, founder btn = Figma at every width, 12 team cards 0.0px off-centre, mobile unchanged, no JS errors) — Pre-footer CTA text on all pages + Why SOLD team names centred + founder "Get in touch" to Figma

**Two steps:** upload `theme-code-only.zip` (extract in `wp-content/themes/`), then run the SQL (SQL or Import tab).
1. Pre-footer CTA: Home, Services and Why SOLD said "GET STARTED NOW" (333x58 desktop / 229x42 mobile);
   service pages, Client Success, Insights, posts already said "SPEAK TO AN EXPERT" (362x58 / 249x42). Same
   `.btn-pre-footer` class everywhere and the width follows the text, so only the text changes: theme fallbacks
   in front-page.php / page-services.php / page-why-sold.php, and the SQL updates the saved ACF values
   (home_prefoot_btn_text, sh_prefoot_btn_text, ws_prefoot_btn_text; only where still "GET STARTED NOW").
   Locally (SQL run, 3 rows): every pre-footer = SPEAK TO AN EXPERT, 362x58 / 249x42. Hero buttons NOT changed.
2. Why SOLD "Our Team" (desktop): first card of each row had .ws-team-info fixed at 7.7778cqi (112px, sized
   for "Ben Neve"); longer nowrap names overflowed right - live: Mike Semmance +24.8px, Anum Ashfaq +10.2px
   off-centre at 1440. Removed the 3 rules (`css/why-sold.css`); all names/roles now 0.0px off-centre at
   1024/1440/1920. Figma 3291:1309/1311.
3. (1.5.19) Why SOLD founder "Get in touch" (web 768+ only, `css/why-sold.css` block at the end): Figma 1512:3049
   is scaled inside the founder card, real box 254x60 at card (53,320) - live was the unscaled 282x67 at (51,294).
   Now 254x60 at (53,320), icon 42x41 at (11,8), text from 70px, 25px. Mobile (<768) identical to live (checked 393/767).
Checked but NOT changed (already identical to Figma at 1440 and scaling with it): Why SOLD About "Get in touch"
button 282x67 (Figma 3291:1329), founder "Co-Founder | CEO" 17.1px Inter 600 (1512:3047), Client Success
card titles 39/50px (1867:1635) - waiting on the client to say what looks different.

## ✅ CONFIRMED LIVE 2026-09-25 (`_S_VERSION 1.5.17` + `new-images-v1.5.17.zip`; live check: 10 cards x 11 widths 320-1920, 0 covered, 0 outside box/card, no JS errors) — Home testimonials: quote icon no longer covers the text

**Two uploads**, both extracted in `wp-content/themes/` (overwrite): `theme-code-only.zip` and
`new-images-v1.5.17.zip` (1 file: `sold-theme/assets/images/quote.png`). No SQL. Home page only (`css/style.css`).
Bug: the double-quote icon (bottom-right of each dark quote box) was a PNG with an opaque #263238 square, and
long quotes ran under it, so letters were hidden ("...to an excep[hidden]", "...outsta[hidden]"). On live 1.5.16,
with the 10 live quotes: 2-3 cards hit at 1024-1920, 8-9 of 10 at 768-800; mobile (<768) was already fine.
1. `assets/images/quote.png`: background made transparent (marks colour + alpha; identical on the dark box,
   max 3/255 diff). Original kept in `deploy/backups/quote-original-2026-09-25.png`.
2. `css/style.css` (2 blocks appended at the end):
   - 1024+: text wraps around the icon - right float with shape-outside cut to the bottom-right corner, so
     only lines level with the icon wrap; line counts identical to live at 1024-1920.
   - 768-1023 (tablet): box grows (icon sits under the last line), quote line-height 1.35 (was 10.7px under a
     12px font floor - lines overlapped on live), card 23.82 -> 27.5cqi tall with logo/stars/box pinned to
     their old positions (within 1px of live). Longest quote at 768: box ends 8px inside the card.
Verified locally with all 10 live quotes at 320-1920: 0 overlaps with the icon, no text past the box. Mobile unchanged.

## ✅ CONFIRMED LIVE 2026-09-25 (all 9 swapped in Theme Settings; uploads/2026/09/*.png byte-identical to the transparent files; Cushman still the old image) — Testimonials: 9 client logos with background/whitespace removed

Files: `C:\Users\HP\Downloads\PNG logos\transparent\` (betterhomes, estro, ellington, knight-frank, ayat,
mashriq-elite, sobha, banyan, regus .png) - white turned to transparency (smooth edges kept) and cropped
tight to the artwork, so each fills the card logo box (145x79 desktop / 135x54 mobile, contain, left) like
banyan/regus did. Before: betterhomes (1.png) + Estro (2.png) were uploaded with ~100px white padding and
rendered tiny. Previewed inside live cards at 1440 + 393. Cushman & Wakefield (10th card) not in the set - unchanged.
To ship: Media -> Add New (9 files), then Theme Settings -> Testimonials -> each card's Client Logo -> Remove ->
pick the new file -> Update. The field stores the attachment ID, so no code/SQL change.

## ✅ CONFIRMED LIVE 2026-09-25 (`_S_VERSION 1.5.16` + `deploy/footer-address-and-services-order.sql` run via Import: 4 option rows inserted, 5 menu rows changed; live footer verified - new order 943,1068,626,628,629,1067,627,630 and the admin address values rendering) — Footer address wording + editable in admin, footer Services order, home mobile address clipping

**Two steps:** upload the theme zip FIRST, then run the SQL in phpMyAdmin (uaenewpr_sold).
1. Address wording: "The Meydan Hotel, Grandstand, Meydan Road, Dubai." / "Circle Mall, Level 2, Jumeirah
   Village Circle, Dubai." (commas + full stops, no "|"). `footer.php`: defaults updated; admin values now nl2br'd
   (Enter = line break; before, a newline typed in admin didn't show); mobile falls back to the desktop value.
   `acf-json/group_global_settings.json`: labels + help text. The SQL fills Theme Settings -> Footer Address
   (Desktop / Mobile) on live (options_footer_address_* + ACF _field-key rows) so the admin boxes aren't empty.
2. Footer Services menu order = accordion order (Branding & Design, Events, Lead & Demand Gen, SEO & GEO,
   PR & Media, AI Marketing, Social Media, Real Estate Websites): SQL sets menu_order on live items
   943,1068,626,628,629,1067,627,630 (IDs from live footer HTML). The template's fallback list (used only if the
   menu is empty) updated to the same 8 items/order with real links.
3. `css/style.css` (home only): mobile footer address box was a fixed 346.88px, clipping the text on 320-375px
   phones on live; ported style-v2.css's existing fix (max-width + nowrap + clamp font). 4 lines on every phone.
Tested on local: SQL run (address rows read by ACF; menu IDs don't exist locally so 0 rows there, as expected).
Later: can also be reordered by drag in Appearance -> Menus.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.15` + fix-percent-placeholder.sql run; it updated 10 wp_postmeta rows - the live answer plus, most likely, copies of it on the page's revisions; remaining = 0, 0 codes on all 14 pages) — Client Success FAQ "%" bug + home intro orange text SemiBold

**Two steps:** upload the theme zip, then run `fix-percent-placeholder.sql` in phpMyAdmin (DB uaenewpr_sold).
1. SQL: Client Success FAQ #6 answer ("What measurable results has SOLD delivered...") showed
   "95{eb4af9f0...}" instead of "95%" (and "25{...}+"), web + mobile. Cause: `deploy/fix_faq_content.sql`
   (2026-09-15) was generated with WordPress's internal %-placeholder baked in; corrected in that file too
   (backup in deploy/backups/). The fix SQL REPLACEs the code with "%" in wp_postmeta/wp_posts, skipping
   serialized values; tested on local with temp rows (plain row fixed, serialized row untouched, rows removed).
   Live audit 2026-09-24: all 14 pages, 12 posts, every FAQ on 13 pages - this is the ONLY affected value;
   all other FAQs clean (no codes/entities/tags-as-text/empty answers; web and mobile sets match).
2. Theme (`css/style.css`): home "What we do" lead - the orange highlight span is now font-weight 600
   (Figma 3620:1154 Mona Sans SemiBold, "faster" SemiBold Italic); rest stays 500. Line count unchanged at
   320-1920 vs live.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.14`) — Home: mobile "What we do" image to Figma + Insights cards text clamp (web + mobile)

`css/style.css` only (two blocks appended at the end of the file).
1. Mobile "What we do" image (Figma iPhone 1363:570 / node 1363:671): box now keeps Figma's 331:355 proportion
   (aspect-ratio) instead of fixed 355px height + variable width (which cropped the square 1311px photo differently
   per phone - at 320px it cut the "Campaigns That Reach / The Right Buyers" headline). left 30 / right 32, top
   1028px (= 74px below last feature text at 954, Figma 1913->1987), section height follows the image so the 50px
   gap to "Who do SOLD work with" stays. Exactly 331x355 at 393px. Desktop unchanged (verified identical to live).
2. Home Insights cards: title and excerpt clamped to 2 lines with ellipsis (Figma 1363:909, 3620:1077/1096,
   mobile 1363:926) + height:auto (a fixed height made Chrome draw the ellipsis but still show line 3). Real post
   titles (3-4 lines) were overlapping the excerpt on mobile and the excerpt overflowed the card on mobile and
   desktop. Images/links unchanged (cards still open the post). Verified 320-1920: no overlap, nothing past card.
   Note 768px (tablet): small cards are tiny there, so title/excerpt show 1 line each (was overlapping before).

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.13`) — Footer address: "Jumeirah Village Circle | Dubai" -> ", Dubai"

`footer.php` fallback text only (desktop + mobile). The Meydan line keeps its "|". NOTE: if Theme Settings ->
footer_address_desktop / _mobile is ever filled in on live, that value overrides this default and must be edited
there instead (both empty locally; live output matched the default exactly, so assumed empty there too).

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.12`, shipped in 1.5.13) — Why SOLD mobile client logos: each sized to the largest that fits its circle

NEW `js/why-sold-logo-fit.js` (enqueued on why-sold in `functions.php`). Mobile only (<=767px): measures each logo's
visible artwork (canvas, non-transparent pixels - the SVGs carry 2-14% padding) and sets the largest width at which
every artwork corner stays within 94% of the dark circle's radius (~2px clearance). Written as one CSS rule per img
src so why-sold-scroll.js's arc clones get it too; vw units; recomputed on resize. Cross-origin fallback = full image
box (always safe). At 393px: Better Homes 55->66, Regus 48->53, AYAT 55->64, Banyan 52->55, Sobha 55->74,
Mashriq 55->58, Knight Frank 55->61, Cushman 55->69 px wide. Circle/ring/positions unchanged; desktop unchanged.
Verified 320-767px: worst artwork corner 94.5% of radius. No SQL, no images.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.11`) — Why SOLD "What Our Clients Say": heading text + bigger mobile logos

`page-why-sold.php` + `css/why-sold.css`.
- Heading "What our Client say" -> "What Our Clients Say" (hard-coded in the template, web + mobile). Mobile label box
  was a fixed 212.59px (sized to the old text) -> max-content + nowrap so the longer text stays on one line.
- 1.5.11: DESKTOP label text also had a fixed width (19.7917cqi = 285px) and wrapped the new heading to 2 lines
  on live 1.5.10 -> max-content + nowrap. Verified 1 line at 320-1920 via range client rects (the first check used
  height/line-height, which silently reported 1 line on desktop where line-height is `normal`).
- Mobile only: logo max-width 48px -> 55px (13.99vw), max-height unchanged 26px. Measured at 320-430px: every
  logo's bounding-box corner stays within 96% of the 61px circle's radius, so nothing is clipped. Desktop unchanged.
No SQL, no images.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.9` + images zip) — Insights hero gap, Latest/Explore images, intro->search gap

**Two uploads this time**, both extracted in `wp-content/themes/` (the images zip also has `sold-theme/` paths):
`theme-code-only.zip` and `new-images-v1.5.9.zip` (2 JPGs: `assets/images/insights-explore-office.jpg`,
`insights-explore-tower.jpg`, from Figma 1867:2094, transparent corners flattened onto card bg #e9eaeb).
- Hero text+button block: bottom gap to hero edge 100/1440 (6.9444vw) per request (supersedes 1.5.7's 116).
- Latest Blogs image box: fixed 335/1440 (was 35dvh capped at 335 -> 315 on a 900px window). The 4 live
  images were already byte-for-size identical to Figma 1867:1972 - only the crop box changed.
- Explore All Insights grid: fixed Figma images office / tower / tower repeating (not post thumbnails).
- Intro -> search gap reduced: desktop 126 -> 72px (5vw), mobile 33 -> 24px.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.8`, shipped in 1.5.9) — Insights search bar + Featured Story card to Figma

`home.php`, `css/insights.css`, `acf-json/group_insights_page.json`. Figma 3929:4896, 1867:1938/1952/1953/1954.
- Search bar: "Go" button removed (Enter still submits - tested). Placeholder "Search" black like Figma.
  Categories in Figma order: All / Marketing & Branding / Lead Generation / Trending Topics / AI Marketing
  (unlisted categories follow alphabetically).
- Featured Story card: headline + text are now Figma's fixed copy ("Featured Insights" + "SOLD breaks down
  the latest story...") instead of the post's title/excerpt, editable via NEW ACF group
  `insights_featured` (Insights page -> Featured Story). Image, date and link still from the post.
- Desktop card spacing: 13px gaps (was ~5px / 0.6vh), line-heights 50 / 29 / 34 per Figma.
No SQL. Confirm `insights.css?ver=1.5.8`.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.7`, shipped in 1.5.9) — Insights hero + Articles intro to Figma

`home.php` + `css/insights.css`. Figma nodes 1867:1774 / 1766 / 1915 / 1932.
- Hero title desktop: font was 4.1528vw (~60px) -> 4.6528vw (67px, Figma; same as Client Success).
  Mobile: "Insights, Trends & Marketing" now orange like desktop (was forced white).
- Hero text+button block (desktop): desc font 1.4972vw -> 1.5972vw (23px, 4 lines like Figma); block
  bottom 7.4306vw -> 8.0556vw so the description starts at exactly Client Success's position.
- Articles intro: label uppercase ("ARTICLES") web + mobile. Mobile text was Client Success's copy
  (wrong fallback) -> now the same Figma copy as desktop (falls back to text_desktop). Mobile section
  now auto-height (text in flow) instead of a fixed 227px sized to the old 5-line copy.
No SQL. Confirm `insights.css?ver=1.5.7`.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.6`, shipped in 1.5.9; Branding card 3 line break added by client) — Service Page card titles: Enter now works in admin

The cards' `title` / `title_mobile` ACF fields were single-line `text`, so an editor could not type a
line break (Enter did nothing) - e.g. live's Branding card 3 was saved as "Built for Today.Ready for
Tomorrow.". Changed both to a 2-row `textarea` (`new_lines: ""`; `page-service.php` already does
nl2br -> `<br>`) in `acf-json/group_service_page.json`. Existing values are kept as-is. After deploy:
edit Branding & Design, card 3 title, press Enter between the sentences, Update.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.5`) — Service Page template: mobile hero wrap, cards heading/titles wrap, dynamic step capsules

Shared template (`page-service.php` + `css/branding-design.css`), so it fixes all 8 service pages at once.

1. **Hero title (mobile):** was `white-space:nowrap`, so "Social Media Marketing", "Lead & Demand
   Generation", "Real Estate Websites" ran past the right edge. Now wraps inside the 24px side gutters.
   The text block is bottom-anchored at 377px, so extra lines grow upward and the gap to the CTA
   (pinned at top:435px) stays 58px for any title length.
2. **"Where Great Brands Begin" (mobile):** the heading's fixed `max-width:199px` forced 3 lines on longer
   headings; now full width + `text-wrap:balance`, font eases 28px -> 24px only below ~393px. 2 lines on
   every page down to 320px. Card titles: the per-card nowrap/font hacks (tuned to Branding's own words)
   replaced by one wrapping rule; `page-service.php` now outputs an ACF line break as a real `<br>`
   and no longer leaves whitespace inside the `<h3>`.
3. **Step capsules (web + mobile):** fixed width -> `min-width` (Figma size) + padding + nowrap, so they
   grow with the label and stay one line ("Content Optimisation", "Launch & Optimise"). Desktop step
   column grows with its pill (min 281/1440); the connecting arrow shrinks to make room (min 100/1440).

Verified with Puppeteer against all 8 LIVE pages (local CSS injected) at 320/360/375/393/414/430/768/
1024/1440/1920: no hero/card-title overflow, cards heading <=2 lines on mobile, every capsule one line,
no row overflow, no horizontal page scroll. Deploy: upload `theme-code-only.zip` to
`wp-content/themes/`, extract, overwrite. No SQL. Confirm `?ver=1.5.5` in page source.

## ✅ LOADER DISABLED LIVE NOW / ⏳ code default pending in `_S_VERSION 1.5.4` zip — page loader removed site-wide, web + mobile

Client requested the branded full-screen loader removed entirely, web and mobile, every page.

**Didn't delete the feature - disabled it, both immediately (content) and structurally (code).** The
loader was already built to be a real ACF toggle (Theme Settings -> Page Loader) with genuinely zero
CSS/JS/markup footprint when off - so "remove it" is exactly what turning that toggle off already does,
without needing to rip out the feature (which would make it harder to bring back if ever wanted).
Turned the toggle off directly on **live** via wp-admin (immediate effect, confirmed via curl: zero
occurrences of `sold-page-loader` markup or its CSS/JS requests on both the homepage and `/contact/`).

**Also flipped the code's own default from on to off**, in both `functions.php` (the enqueue check) and
`template-parts/page-loader.php` (the markup check) - previously `!isset($loader['enabled']) ||
$loader['enabled']` (on unless explicitly disabled), now `isset($loader['enabled']) &&
$loader['enabled']` (off unless explicitly enabled). This is a safety net, not required for the current
live state (which is already fixed via the direct toggle change above) - it just means the loader stays
off even if that ACF field is ever cleared/reset, rather than silently reverting to on.

Verified on local WordPress too (same toggle set to off via a real `update_field()` call): zero
`sold-page-loader` markup, zero `page-loader.css`/`.js` requests.

## ✅ FOOTER FIXED LIVE - deploy the `_S_VERSION 1.5.4` zip to see it — extra white space below the footer removed, web + mobile

Client reported extra white space after the footer on every page (both breakpoints), allowing the page
to scroll further than the real content. Also asked about the Contact page specifically.

**Root cause: the exact same "fixed height + absolutely-positioned children" pattern this project has
fixed repeatedly elsewhere** (pre-footer, cards, WhatsApp button...). `.site-footer` had a hardcoded
height (`829px` desktop / `1255px` mobile) from whenever the footer was first built, with its 3 real
content pieces (`footer-logo`, `footer-line`, `footer-content`) each absolutely positioned inside via
hand-set `top` offsets - meaning the box's own height was **never actually derived from its content**,
just a number someone measured once. Content has since grown (the Services column just went from 6 to
8 links this session) without the fixed height ever being revisited - left a measured **~165px dead
zone** below the real content on desktop, and mobile's `overflow: hidden` meant it could have gone the
other way (silently clipping content) just as easily.

**Fix:** converted `.site-footer`/`.footer-inner`/`.footer-logo`/`.footer-line`/`.footer-content` from
fixed-height-with-absolute-positioning to auto-height with real padding/margin/flow - same conversion
pattern already proven multiple times on this project. Every child inside `.footer-content` (the 3
columns) was *already* normal flow, not absolute, so this was a contained 5-selector fix, not a full
footer rebuild. Preserved every original visual gap exactly (65px top/bottom, 83px left/right, 20px
logo-to-line, 52px line-to-content) by converting the old absolute `top` offsets into equivalent
`margin-bottom` values - same numbers, different mechanism. Both `css/style.css` (Home) and
`css/style-v2.css` (everywhere else), both desktop and the separate mobile `!important` block.

**Verified on local WordPress**, both breakpoints, both a home-page-body page and a style-v2 page (Why
SOLD): measured gap between the footer's real bottom edge and the page's total scroll height - was
0.45-165px depending on page/breakpoint, now consistently ~0px (±0.4px, pure rounding) on every
combination tested. Screenshotted the scrolled-to-bottom result - footer content now genuinely reaches
the true end of the page.

**Contact page - investigated, did NOT change anything, need your confirmation before touching it.**
Contact is structurally different from every other page (`page-contact.php` builds its own standalone
document, not the shared header/footer - a pre-existing, deliberate design). Checked its actual
measurements directly:
- **Desktop:** the contact card fills the full viewport height exactly (0px gap) - no issue found.
- **Mobile:** found a real ~110px gap, but it's **symmetric** - ~110px above the card AND ~110px below
  it, both sides, not just below. The CSS comments here explain this is deliberate, carefully-tuned
  behaviour (`flex-start` + `margin:auto` specifically chosen so a card taller than a short phone screen
  never gets its top clipped) - this is centred content on a short form within a taller phone viewport,
  which is fairly normal UX, not an obvious bug the way the footer was.

Flagging this rather than guessing and risking breaking deliberately-engineered centering: if what's
wanted is the form anchored to the top (less symmetric empty space) rather than centred, or something
else specific, that needs a quick confirmation before changing this page's careful mobile-height
handling.

Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.5.3` -> `1.5.4`, includes both the loader-default
change and the footer fix). Same deploy steps: upload to `wp-content/themes/`, extract with overwrite,
no SQL.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.5.3`) — all 7 rebuilt service pages unlocked

Client had rebuilt all 7 remaining service pages (Events, Lead & Demand Generation, SEO & GEO, PR &
Media, AI Marketing, Social Media Marketing, Real Estate Websites) on the Service Page template in
wp-admin, but they weren't linked anywhere - navbar dropdown, Home/Services "Read More" buttons, and
2 of them missing from the footer entirely.

**Confirmed all 7 are actually ready first, not just template-switched.** Checked each live URL
directly: all return 200, all have 4 filled Cards and real FAQ content (3-18 questions each) - not the
empty-template state AI Marketing was in a few passes ago.

**Root cause (navbar + accordion "Read More"):** `sold_removed_service_slugs()` in `functions.php`
still listed all 7 as "removed" - a leftover from the 2026-09-20 page-deletion project, meant to
neutralise dead links to `#` until each page was rebuilt. Every one of these 7 pages *was* rebuilt, but
this list was never updated to reflect that - `sold_resolve_link()` (used by both the navbar dropdown
and every "Read More" button) was still routing all 7 to `#` regardless of the real pages existing.
Emptied the array (kept the function itself, and its own explanatory comment, for whenever a 9th
service is added later and needs the same staging mechanism). Verified on local: all 9 navbar dropdown
links and all 8 accordion "Read More" links now resolve to their real URLs, not `#`.

**Root cause (footer, 2 missing entirely):** the footer's "Services" column uses a real WP menu
(`Footer Services`, ID 8), not the `sold_resolve_link()` mechanism - so this was a separate bug, not
fixed by the code change above. Checked directly: the menu had only 6 of 8 items - "AI Marketing" and
"Events" were never added to it at all (not just neutralised, genuinely absent). Fixed by adding both
directly to this live menu via wp-admin (Appearance → Menus → Footer Services) - confirmed via a fresh
page load: all 8 service links now present.

**Already live, no deploy needed:** the footer menu fix (a content/menu edit, not code).
**Still needs the theme zip:** the `sold_removed_service_slugs()` code change - packaged into
`theme-code-only.zip`, `_S_VERSION` bumped `1.5.2` -> `1.5.3`. Same deploy steps: upload to
`wp-content/themes/`, extract with overwrite, no SQL.


## ⏳ REVERTED, NO LONGER PENDING (`_S_VERSION 1.5.2`) — Services accordion collapsed-preview crop fix was undone by client request

Client reported the Services accordion (Home + Services page - shared component,
`template-parts/services-accordion.php`) shows the full photo correctly once expanded, but the
collapsed/preview strip's crop doesn't match Figma - width/height of the strip itself were already
right, only which *portion* of the photo shows was wrong.

**Root cause:** `.service-image-strip img { object-position: top; }` - the collapsed strip (a thin
~69px-tall band) was always showing each photo's absolute top edge. Checked Figma's own crop directly
(nodes 3387:1507 and 3387:1519, two different collapsed items): both show a band from roughly the
photo's vertical middle, not the top - one has the visible slice starting ~34% down, the other has the
image itself shifted up by only ~11%. Neither matches "top" - confirms the client's own suspicion
("they taking center portion to preview it?").

**Fix:** `object-position: top` -> `object-position: center` on `.service-image-strip img`, both
`css/style.css` (Home) and `css/style-v2.css` (Services + everywhere else this component is used). Only
this one collapsed-state rule changed - the expanded-state rule (`.service-list-item.active
.service-image-strip img`, already showing the full photo correctly) was untouched, and so was every
width/height value on the strip itself, per the client's own note that sizing was already correct.

**Web only, confirmed by construction, not just by not touching mobile's CSS:** mobile's own separate
rule for this component (`@media max-width:767px`) sets `display:none !important` on the collapsed
strip - the image is hidden entirely until a card is expanded, so there's no collapsed-preview crop to
even show on mobile. Nothing needed there.

**Also clarified for the client:** the images used differ between local (WP's own PHP fallback array,
`service_social.png` etc., since the ACF option field isn't populated in the local test environment)
and live (real uploaded photos via the `global_services_acc` options field) - this is expected and
unrelated to the bug; the crop-position fix applies identically regardless of which image source is
active, confirmed by testing against the local fallback set.

**Verified on local WordPress:** confirmed all 8 collapsed strips now compute `object-position: 50% 50%`
(was `0% 0%`/top); expanded item's own size/crop unchanged (0% width/height difference, still full-photo,
no cropping); screenshotted the collapsed items - each one now shows a meaningful, subject-containing
slice of its photo instead of a mostly-empty top edge.

Mirrored to the static prototype (`css/style.css`, `css/style-v2.css`).

**Reverted the same session, same message thread - client re-sent the identical request then said "we
did this now revert it now we dont need."** `object-position` restored to `top` in all 4 files
(`css/style.css`/`css/style-v2.css`, both theme and static prototype), byte-identical to before this
entry - confirmed via a fresh computed-style check (`50% 0%`, i.e. `top`, not `50% 50%`). Since this was
never uploaded to live (still sitting in an undeployed zip the whole time), there is nothing to undo on
the live site itself - only the local zip needed rebuilding. `_S_VERSION` bumped `1.5.1` -> `1.5.2`
purely to keep the zip's version number moving; no functional change from `1.5.0`'s state for this
specific rule.

## ✅ CONTENT LIVE NOW / ⏳ CSS pending in the `_S_VERSION 1.5.0` zip — Client Success card titles corrected to two-tone (Figma), not uniform orange

Client flagged that an earlier fix (making all 10 Client Success card titles solid orange) was wrong -
asked to check 3 Figma nodes and confirm. **Fetched the real Figma design for all 10 cards directly**
(not a sample) and found every single one uses **two colours**: a base of `#263238` (dark slate) with
only a specific phrase per card highlighted in `#FFA726` (orange) - never a uniform colour anywhere.
Client's own first message described the second colour as "green" - clarified it's `#263238`, a dark
slate that can read as green-ish, not an actual green hex.

**This is a revert-and-redo of the earlier (wrong) fix**, not new work: that pass made the *entire*
title orange on both breakpoints, which was a misread of the design. Reverted `.cs-card-title`'s base
colour back to `#263238` (desktop) / `#000000` (mobile, its own original colour), and added a new
`.cs-card-title .cs-title-highlight { color: #FFA726; }` rule - the orange now comes from a `<span>`
wrapping only the correct phrase, not the whole element.

**Mapped all 10 titles' exact orange phrase from Figma, one at a time** (not a mechanical "first N
words" guess - card 4 and card 8 have the orange portion in the *middle*/*end* of the title, not the
start):

| # | Client | Orange phrase |
|---|--------|---------------|
| 1 | Mered | "Accelerating Sales" |
| 2 | Ellington | "Building Global" |
| 3 | Jubail Island | "Building International Demand" |
| 4 | Knight Frank | "GCC's Leading Destination" (mid-sentence) |
| 5 | Beyond | "Driving Demand" |
| 6 | Banyan Group | "Turning Inspiration " |
| 7 | Regus | "Turning Local Searches" |
| 8 | (Masaraj) | "Successful Multilingual Property Launch" (end of sentence) |
| 9 | betterhomes | "Growing Organic Buyer Demand" |
| 10 | AVAT | "Selling Out Phase 1 Through" |

**Content updated directly in both databases, right now, no theme deploy needed for this part:**
local via a real `update_field()` call (wrapping each stored title in the matching
`<span class="cs-title-highlight">`); live via the same real save pathway WordPress's own admin uses -
this field group has `show_in_rest: false` (confirmed by reading its own JSON), so the REST API
approach that worked for Latest Blogs' images wasn't available here. Logged into wp-admin, set each of
the repeater's 10 `acf[field_cs_cards][row-N][field_cs_c_t]` inputs directly via the DOM, then submitted
the real Update button - the same POST-based save every normal edit in wp-admin uses. Verified via a
live curl: all 10 `.cs-title-highlight` spans present with the correct phrase, in order.

**Important - live will look unchanged until the CSS deploys.** The content (the `<span>` wrapper) is
live now, but live is still serving `_S_VERSION 1.4.1`'s CSS, which still has the *old* "make it all
orange" rule active - so right now the titles show fully orange on live still, just with the correct
HTML underneath. The moment this zip (`1.5.0`) goes up, it'll immediately snap to the correct two-tone
look with no further action needed.

Mirrored to the static prototype (`client-success.html`, `css/client-success.css`) - same 10 spans,
same CSS revert, both breakpoints. Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.9` ->
`1.5.0`). Same deploy steps: upload to `wp-content/themes/`, extract with overwrite, no SQL (the
content half of this fix is already live independently of this zip).

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.9`, not yet uploaded) — Feed/"Explore All Insights" section audited against Figma: heading text was wrong, everything else already matched

Client supplied 5 nodes for this section (whole frame, label, headline, the 6-card grid, Load More) -
asked for the heading text, Load More top/bottom gap, and every card's image/content to be checked and
fixed against Figma.

**Audited every measurement before changing anything, rather than assuming something was broken.**
Compared each of the 6 grid cards' CSS (`.insights-blog-card`/`-img-wrap`/`-date`/`-icon`/`-headline`/
`-excerpt`/`-readmore`) against Figma's real numbers (node 1867:2094) one property at a time: card
padding, border-radius, image height (265px) and corner radius (21px), grid gap (12px), date/icon
size, and all 4 text sizes (18/24/14/21px). **Every single one already matched exactly** - this section
had clearly already been built against this same Figma spec at some point. Also measured the Load
More button's own gaps directly (Puppeteer, real `getBoundingClientRect()`): grid-to-Load-More gap
measured `65.98px` (Figma: `66px`) and Load-More-to-section-end measured `0px` (Figma: also `0`, it's
the section's last element) - both already correct too. `font-size: 45px` on `.insights-load-more`
looked suspiciously large at first glance (bigger than any card text) but is confirmed correct - Figma
really does specify a large, bold, centred 45px style for this link (node 1867:2213), not a typo copied
from a heading rule.

**The one real bug: heading text.** Label was "Lorem Blogs" -> should be "Explore All Insights" (node
1867:2067); headline was the generic "Lorem ipsum dolor sit amet consectetur adipiscing elit" -> should
be "Everything You Need to Know to Stay Ahead in UAE Real Estate" (node 1867:2068). Fixed the default
in `home.php`, added matching `default_value`s to the ACF field group (`field_ins_feed_label`/
`field_ins_feed_head`) so a first-time edit in admin starts from the right text, and updated the static
prototype's hardcoded copy (`insights.html`, both its desktop and mobile headline variants).

**Card content stays dynamic** - same architecture/decision as Featured Story and Latest Blogs; Figma's
own card text here is generic placeholder ("Global Office space provider" on all 6 cards, not 6 real
distinct examples like Latest Blogs had), reinforcing that it's mockup filler, not literal required
copy.

Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.8` -> `1.4.9`). Same deploy steps: upload to
`wp-content/themes/`, extract with overwrite, no SQL.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.8`, not yet uploaded) — Feed section's "Large Card" removed, both web and mobile; 6-card grid below it kept

Client-requested: under the Feed section's "Lorem Blogs" / "Lorem ipsum..." heading, the single big
image+description card that used to sit right below it should be removed entirely (web and mobile) -
the 6-card grid further down stays.

**Found a real pagination bug while removing this.** The big card and the grid below it were reading
from the *same* `WP_Query` object (`$feed_query`) - the big card called `$feed_query->the_post()` once
to grab the first post, then the grid's own `while ($feed_query->have_posts())` loop continued from
wherever that left off. `$feed_per_page` was `7` specifically so the math worked out to "1 for the big
card + 6 for the grid." Simply deleting the big card's markup without changing anything else would
have left the grid's loop starting fresh from post #1 - showing **7** posts instead of 6, since nothing
would be "used up" by the removed card anymore.

**Fix:** removed the entire `.insights-feed-main-content` block (the big card) from `home.php`, and
changed `$feed_per_page` from `7` to `6` - the whole feed section is now just the grid, 6 posts per
page, pagination math correct with nothing consumed by a card that no longer exists. Also removed the
now-unused `$bigid`/`get_permalink()`/`sold_post_excerpt($bigid, ...)` calls that only existed for that
card.

Mirrored to the static prototype (`insights.html`) - same block removed there (its own hardcoded
markup, not query-driven, so no pagination math to adjust).

**Verified on local WordPress:** `.insights-feed-main-content` and any `.insights-featured-card` inside
the Feed section confirmed gone from the DOM; grid still renders exactly **6** cards (confirmed via a
real element count, not assumed); Feed Title ("Lorem Blogs") and Headline text unchanged, sitting
directly above the grid now with no card in between. Screenshotted both 1440px and 390px - clean
transition straight from the heading into the grid, no dead space or broken layout, confirmed on both
breakpoints as requested.

Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.7` -> `1.4.8`). Same deploy steps: upload to
`wp-content/themes/`, extract with overwrite, no SQL.

## 🚨 FLAGGED, LEFT AS-IS PER CLIENT — 2 spam/casino posts live in the real Insights feed

Found while working on the Latest Blogs images: two published posts titled "How to Identify Leading
High RTP Online Casino Australia Operators" and "The Comprehensive Guide to Visa Online Online
Casino: What You Required to Know" are live on the real site (IDs 947 and 932) and are dated NEWER
than all real content - meaning they currently occupy the "Featured Story" slot and the first "Latest
Blogs" card on the real, public `/insights/` page. This is the same 2026-09-17 compromise
([[sold-live-malware]]) actively injecting fake published content into the real post feed, not just a
dormant backdoor file - confirmed directly: `curl .../insights/` shows the casino post as the literal
`insights-featured-headline` text.

**Asked the client how to handle it - they chose to leave both posts published for now** and have me
continue past them. Not touched. Still recommend removing these (Posts -> All Posts -> Trash) whenever
convenient - they push 2 real articles out of the visible Featured/Latest Blogs slots on every page
load until removed.

## ✅ DONE, LIVE NOW (content only, no theme deploy needed for this part) — Latest Blogs images replaced with Figma's real photos, both local and live

Client re-sent the same 4 Latest Blogs nodes (1867:1955/1974/1975/1976), asking specifically for the
same images Figma uses, on both the static prototype and the live site.

**Confirmed these are real WordPress posts with real (if low-quality) featured images already set** -
not template fallback images. Figma's mockup shows 4 specific photos (a Palm-view penthouse terrace, a
sunset high-rise interior, a "Cushman & Wakefield" website screenshot, an "Arancia Yards" ad banner) for
4 specific example articles ("Pay-Per-Click Campaigns", "Luxury Properties Online", "Cushman &
Wakefield Core's SEO", "Targeted Social Media Ads"). Downloaded all 4 image assets directly from Figma
(`assets/images/latest-blog-1.png` through `-4.png`, added to both the theme and the static prototype).

**Static prototype (`insights.html`):** replaced all 4 cards' images, headlines, and descriptions with
Figma's real example content - this file has no dynamic data source, so it's the actual literal content
now (previously mismatched lorem-ipsum/generic text and unrelated svg icon placeholders).

**Local + live WordPress:** the 4 "Latest Blogs" cards pull real posts (IDs 118-121, same content on
both databases) - kept dynamic per the earlier decision, only replaced each post's actual featured
image (was a crude `.svg` icon, e.g. `lastestone.svg`) with the matching Figma photo. Local: via a
direct `wp_insert_attachment()`/`set_post_thumbnail()` script. Live: first attempt via the classic
media-modal UI (Puppeteer) silently failed to persist (confirmed via REST afterward - featured_media
unchanged) despite the UI appearing to succeed; switched to driving the WP REST API directly through
the authenticated admin session's own nonce (upload to `/wp/v2/media`, then `POST
featured_media` to `/wp/v2/posts/{id}`) - far more reliable than fighting the modal's upload/selection
timing, confirmed each of the 4 by re-reading `featured_media` back from the REST API afterward.

**Why you may not see all 4 new images on the live page yet:** the 2 spam posts above occupy the
Featured Story slot and the first Latest Blogs card, pushing 2 of the 4 real posts (with their new
images already correctly set) out of the visible 4-card area for now. They'll appear automatically
once those posts are removed - nothing further needed on the image side.

**This part needed no theme code/deploy** - images were uploaded straight into each site's own media
library via REST, already live on both local and the real site right now.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.7`, not yet uploaded) — Latest Blogs + Featured Story card typography was systematically undersized at the 1440px Figma reference; found and fixed the root cause

**Note: this theme zip (1.4.7, from the previous pass) is still not deployed to live** - the image
content above is live already, but the correct spacing/sizing (32px row gap, 21px image corners, the
corrected font sizes) that make these new images sit correctly still needs this zip uploaded. Live is
currently still serving `_S_VERSION 1.4.1`.

Client supplied 6 nodes for the Latest Blogs section (whole section, label, grid, both cards, one
card's content block), reporting the image, gaps, and every card's text all looked different from
Figma.

**Root cause: `clamp()` formulas that never reach their own stated max at the 1440px reference width.**
Both this section's cards and the Featured Story card above it use rules like
`font-size: clamp(20px, 2vw, 32px)` - the intent was clearly "scale with the viewport, capped at
Figma's 32px" but `2vw` at exactly 1440px is `28.8px`, not `32px` - the clamp's preferred value never
actually reaches its own ceiling at the one width these were supposedly tuned for. Checked every text
element in both cards against Figma's real numbers (nodes 1867:1974/1867:1976 for Latest Blogs,
1867:1936 from the previous pass for Featured Story) and found this same gap on all of them, roughly
15-30% smaller than intended - explains "each card text... different" precisely. Two of the old
ceilings were also just wrong regardless of the clamp bug: Featured Story's headline capped at 40px
(Figma is 45px) and excerpt capped at 21px (Figma is 23px).

**Fix:** replaced every `clamp(min, vw, max)` in both cards with a flat, precise `vw` value computed
directly from Figma's real px at 1440 (matching the convention already used everywhere else on this
page, e.g. the Articles intro, the search bar) - `.insights-latest-date`, `.insights-latest-icon`,
`.insights-latest-headline`, `.insights-latest-excerpt`, `.insights-latest-readmore`, and the same 5
rules for `.insights-featured-*`. Verified via computed style after the fix: Featured Story now reads
`45px/23px/21px/20px` (headline/excerpt/readmore/date) and Latest Blogs `32px/18px/21px/20px` -
matching Figma exactly, not approximately.

**Also fixed while auditing this card:**
- `.insights-latest-img-wrap` border-radius was `26px` (Featured Story's own larger image radius,
  reused here by copy-paste) - Latest Blogs' own image (node 1867:1975) is `21px`, corrected.
- `.insights-latest-grid` row-gap was `3vh`/`4dvh` (viewport-height-relative, no fixed relationship to
  Figma's real spacing) - replaced with `32px` (`2.2222vw`), computed directly from the two rows'
  actual Figma positions (662 - 630 = 32).

**Mobile:** no dedicated mobile Figma spec was supplied for either card, and both already have their
own separately-tuned, purpose-built compact mobile rules (own font sizes, own 2-column grid, own
padding) completely unrelated to the desktop clamp() values touched here - confirmed mobile's computed
font-size is untouched (`10px`, unchanged) after this pass, only the desktop `@media (min-width: 768px)`
block was touched.

Mirrored to the static prototype (`css/insights.css`). Rebuilt `theme-code-only.zip` (`_S_VERSION`
bumped `1.4.6` -> `1.4.7`). Same deploy steps: upload to `wp-content/themes/`, extract with overwrite,
no SQL.

## ✅ CONFIRMED LIVE 2026-09-24 (content only, no code/deploy needed) — Insights category names renamed to match Figma

Client pointed at the Featured Story card (node 1867:1936) and the category filter bar (node
3929:4899) again, saying the text needs to match Figma.

**Featured Story card - confirmed to stay dynamic, asked first.** Figma's card shows fixed-looking
text ("Featured Insights", "July 10,2026", a generic description) instead of a real post's title/date/
excerpt. Rather than guess, asked the client directly: keep pulling the real latest post (matches the
architecture already built, stays useful as real articles get published) or hardcode Figma's literal
text. **Client chose to keep it dynamic** - Figma's text is just placeholder copy for its own mockup,
not literal required content. No code change needed here; the card already pulls
`get_the_title()`/`get_the_date()`/excerpt from the real latest post.

**Category names - this was real.** The filter bar's category NAMES themselves were dummy placeholders
("Architecture & Design", "Investment Insights", "Lifestyle & Living", "Market Insights") unrelated to
SOLD's actual services, while Figma's example bar shows real service-style names ("Marketing &
Branding", "Lead Generation", "Trending Topics", "AI Marketing") - not a styling difference, a genuine
content/taxonomy fix. These are real WordPress categories (`get_categories()`, unchanged code), so the
fix is renaming the 4 existing terms, not touching any template.

Renamed all 4 categories **directly in both databases** (same term IDs, both local and live matched
exactly, so the same mapping applied to both): term 6 Architecture & Design -> Marketing & Branding,
term 5 Investment Insights -> Lead Generation, term 7 Lifestyle & Living -> Trending Topics, term 4
Market Insights -> AI Marketing. Local via a direct `wp_update_term()` script; live via the same
wp-admin session already used for the earlier ACF field-group fix (Posts -> Categories -> Edit each,
one at a time - the first attempt failed silently from a too-short page-load wait, redone with
`waitForSelector('#name')` before typing, confirmed all 4 succeeded).

Also updated the static prototype's hardcoded category list (`insights.html`) to the same 4 names, and
moved its `active` class from a random one to "All" (a more sensible default state for a static
mockup).

**Verified:** live REST API (`/wp-json/wp/v2/categories`) confirms all 4 renamed; local page render
confirms the new names show in the actual filter bar. Category *order* is alphabetical (WordPress's
`get_categories()` default) rather than matching Figma's exact example sequence - kept this way
deliberately, since a fixed manual order would need re-tuning by hand every time a category is added or
renamed later; Figma's own ordering is very likely just how their example happened to be typed, not a
requirement.

**No theme zip needed for this - it's pure database content**, already live on both local and the real
site, nothing pending to deploy for this part.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.6`, not yet uploaded) — Insights "Articles" intro fixed + search/filter bar moved up to match Figma's real page order

Client supplied nodes 1867:1915/1867:1932 (the "Articles" intro block) and 3929:4896-4899 (the search +
category filter bar), asking for matching text/alignment/spacing on the intro, and for the search bar
to move up ("came top") - it currently lives much further down the page, inside the Feed section near
the pagination.

**Articles intro - content + 2 small precision fixes:**
- Label default: `'Blogs'` -> `'Articles'` (node 1867:1931's real text). Desktop paragraph default:
  the old placeholder Lorem ipsum text -> "Built from real campaign data, market intelligence, and
  what we see driving results for real estate brands across the UAE." (node 1867:1932's exact copy).
  Mobile's own paragraph text left untouched (it's real, intentional copy, not a placeholder, and no
  mobile spec was given for this section).
- `.insights-blogs-text` font-size: `2.2222vw` (32px) -> `2.3611vw` (34px) - node 1867:1932 is 34px,
  the existing rule was 2px off.
- `.insights-blogs-container` gap: was relying on `justify-content: space-between` to approximate the
  gap from the two children's widths (landed ~72.6px, a few px short) - switched to Figma's real
  `gap: 75px` directly (node 1867:1915's own `gap-[75px]`), more precise and matches the flex structure
  Figma actually uses.
- Also fixed `archive.php`'s own copy of this label (`Blogs` -> `Articles`) for consistency, since
  category-archive pages share the same intro block.

**Search + filter bar - moved, not rebuilt.** Checked the existing `.insights-feed-search`/
`.insights-feed-divider`/`.insights-feed-categories` CSS before touching anything: it already matched
Figma's numbers for this exact block pixel-for-pixel (`1277px` divider width, `19px`/`20px` type,
`19px` internal gap, active category already coloured `#FFA726`) - this was clearly built against this
same Figma spec already, just left in the wrong place on the page. Moved the real, fully-functional
search form + category filter markup (`$search_term`/`$active_cat`/`sold_insights_url()` - unchanged,
still the same `$_GET`-driven feed lower down) out of the Feed section and into a new
`.insights-searchbar-section`, positioned right after the Articles intro and before Featured Story -
matches Figma's real order (Hero -> Articles -> Search/Filter -> Featured Story -> Latest Blogs ->
Feed). New section's spacing computed from Figma's real numbers: `126px` gap from the intro's bottom
edge to the search bar, and `67px` from the search bar's bottom edge to Featured Story (was `93px`,
tuned for the old flow with no search bar between them).

**Mobile:** the search/filter markup was already in normal document flow at this breakpoint (no
`position: absolute` to fight with), so the move required no restructuring there - just gave the new
wrapping section the same horizontal inset and top gap Featured Story already uses on mobile, for a
consistent look, since no dedicated mobile Figma spec was supplied for this specific block yet.

Mirrored to the static prototype (`insights.html` uses static filter-link markup, no live PHP form,
same visual result).

**Verified on local WordPress:** confirmed via the real page section order
(`hero -> blogs-intro -> searchbar -> featured -> latest -> feed -> pre-footer`) that the search bar
now renders in the right place; divider still measures exactly `1277px`; categories render real WP
category names with "All" correctly active by default; the Feed section further down still renders
its large card correctly with the old filter markup fully removed (no duplicate). Screenshotted both
1440px and 390px - clean, no overlap, matches Figma's visual order at both breakpoints.

Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.5` -> `1.4.6` - 1.4.5 was never uploaded, this
supersedes it, now the 6th unreleased Insights-page version in a row). Same deploy steps: upload to
`wp-content/themes/`, extract with overwrite, no SQL.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.5`, not yet uploaded) — Insights hero container was overflowing past the hero's real bottom edge on shorter browser windows; bottom-anchored it instead of top-anchored

Client reported the description+button block (node 1867:1766) "goes down" - moved somewhere wrong
after the 1.4.4 container rebuild.

**Root cause:** `.insights-hero` is `height: 100vh` - the real browser viewport height, which varies
per screen and is very often shorter than Figma's own 825px-tall reference frame (a maximized 1440-wide
window is commonly 700-800px of actual content height once browser chrome is subtracted). 1.4.4's
container used a **top**-anchor (`top: 34.0972vw`, a fixed 491px from the hero's top) - correct at
exactly 825px tall, but pinned at that same fixed distance from the top regardless of the hero's real
height. On any shorter real window, the 227px-tall container's bottom edge (491+227=718px down) can
exceed the hero's actual shorter height, spilling past the dark hero background into the section below
- reported as the block "going down."

**Fix:** switched the container from `top` to `bottom` anchoring (`bottom: 7.4306vw`, 107px - Figma's
825 - 718 = 107 gap from the frame's own bottom edge), same anchor style the block used before the
1.4.4 rebuild. This keeps it glued to the hero's actual bottom edge at any real viewport height instead
of drifting past it. Kept everything else from 1.4.4 (the real flex/gap container, exact 504px width,
56px internal gap) - only the anchor direction changed.

**Verified on local WordPress** at three different viewport heights (700px, 825px - the Figma
reference, and 900px): gap between the container's bottom edge and the hero's real bottom edge stays
exactly `107px` at all three, confirming it no longer overflows regardless of the actual browser
window height. Re-confirmed the Figma reference height still matches exactly (`878/491/504x227`, 56px
internal gap). Mobile re-checked, still unaffected (`40px` breadcrumb gap, unchanged from the last 2
passes).

**Four Insights-hero passes in a row haven't been uploaded yet** (1.4.2 through this one, 1.4.5) -
live is still serving `1.4.1`. Recommended before any further hero tweaks: deploy this one so the
client can review against a real browser/screen instead of iterating further on descriptions alone -
several of these issues (the archive.php/home.php mix-up, the wrong bottom values, this viewport-height
overflow) only became visible through direct measurement, and a real live check would likely surface
anything else faster than another round of Figma-node comparisons.

Mirrored to the static prototype. Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.4` -> `1.4.5`
- 1.4.4 was never uploaded, this supersedes it). Same deploy steps: upload to `wp-content/themes/`,
extract with overwrite, no SQL.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.4`, not yet uploaded) — Insights hero description+button rebuilt as a real container matching Figma's own frame, not two independently-positioned elements

Client pointed at node 1867:1766 directly ("this is the container") after the 1.4.3 pass, suspecting
the real container was wider than Figma's. Correct diagnosis of the *approach*, if not the exact
number: the 1.4.3 fix corrected the description/button's individual `bottom` values to the right
*numbers*, but they were still two separately positioned absolute elements approximating a shared
box, rather than an actual shared container - fragile (any future spec tweak means re-deriving two
separate `bottom` values by hand again) and not what "same as Figma" really means structurally.

**Rebuilt properly this time.** Figma's node 1867:1766 ("Frame 9") is a single container: absolute,
top/left-anchored at (878, 491), fixed 504x227px, `flex-direction: column`, `gap: 56px`. Added a new
`.insights-hero-text-container` div in the markup wrapping the description paragraph and the button
together (`home.php`, `archive.php`, `insights.html`) - this class already existed as a **dead,
unused mobile CSS rule** (`margin-bottom`/`gap`, comment: "True Figma Mobile Gap to Breadcrumb") that
had no matching element in the HTML until now; reused it rather than inventing a new name. Desktop CSS:
`position:absolute; left:60.9722vw(878); top:34.0972vw(491); width:35vw(504); display:flex;
flex-direction:column; align-items:flex-start; gap:3.8889vw(56)`. The description and button are now
real flex children (no more of their own `position:absolute`/`bottom`/`right`) - the button keeps
`position:relative` only so its own icon/text children (which ARE absolutely positioned relative to
the button) keep working exactly as before.

This is the same reliable top/left anchor style the title already used successfully (and which is why
the title never had a position bug across any of these passes, only the bottom/right-anchored elements
did) - eliminates the whole class of "bottom/right doesn't reproduce Figma's real height-relative
position" bug for this section going forward, not just this one instance of it.

**Verified on local WordPress** (Puppeteer, 1440x825): container measures `left:878, top:491,
width:504, height:227` - matches Figma's Frame 9 numbers exactly (not approximately). Gap between
description and button: exactly `56px`. **Mobile re-checked** (390px): the container's dormant mobile
CSS rule now actually applies (harmless - both children stay `display:none` on mobile per the earlier
pass, so it renders as an empty, invisible block with no layout effect), breadcrumb gap still exactly
`40px`, no overlap, pixel-identical to the 1.4.3 mobile fix.

Mirrored to the static prototype. Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.3` -> `1.4.4`
- 1.4.3 was never uploaded, this supersedes it). Same deploy steps: upload to `wp-content/themes/`,
extract with overwrite, no SQL.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.3`, not yet uploaded) — Insights hero title/alignment corrected to match Figma exactly, follow-up to the 1.4.2 pass below

Client pointed back at the same 3 hero nodes (1867:1774 title, 1867:1767 description, 1867:1768
button) after the 1.4.2 pass: title needed to wrap the same 3 visual lines Figma shows, and the
description/button needed "the same alignment" as Figma.

**Title - 3 lines, not 2.** Figma's title node is two real paragraphs: a plain first line ("UAE Real
Estate"), then a second, entirely-orange paragraph ("Insights, Trends & Marketing") that itself wraps
onto a 2nd line inside Figma's own 933px-wide text box (confirmed via the node's own height: 205px =
3 x its own 69px line-height). The 1.4.2 pass only highlighted the text after a single forced `<br>`.
which produced the right *colouring* but the real browser (actual Mona Sans web-font metrics differ
slightly from Figma's canvas) fit "Insights, Trends & Marketing" onto **one** line instead of wrapping
- 2 visual lines total, not 3.

Rather than rely on font-metric coincidence, forced the exact same break Figma shows: default title is
now `UAE Real Estate<br>Insights, Trends &<br>Marketing` (2 `<br>`s). Re-worked
`sold_title_with_highlight()` (`functions.php`) so it splits on only the **first** `<br>` - everything
before it stays plain, everything after (including any further `<br>`s inside that remainder) is
wrapped in `.hero-title-highlight` as one block. This matches Figma's real paragraph1/paragraph2
structure (not "always just the last line"), and still lets an editor force a specific wrap point
inside the orange portion by typing a 2nd `<br>`, exactly as this default value now does. Updated the
ACF field's `default_value` and instructions to match.

**Description/button - real position bug, not just "alignment".** Measured both against Figma's own
numbers (825px-tall hero reference frame) and found `.insights-hero-desc` and `.insights-hero-btn`'s
`bottom` values were genuinely wrong - not a rounding difference: description was `10.6889vw` (153.9px)
but should be `15.1389vw` (218px per node 1867:1767's real y-position); button was `4.8417vw` (87px)
but should be `7.4306vw` (107px per node 1867:1768). Measured live before fixing: the gap between the
description and button was **29px**, not Figma's real **56px** flex-gap - this is what "same
alignment" and "fix it in web" were both pointing at, confirmed by these being the same underlying
frame (Figma's "Frame 9") mispositioned as a whole. Left-alignment itself (both already sharing the
same 878px left edge) and every other dimension (widths, heights, font sizes, icon size) were already
correct - only the two `bottom` values needed correcting.

**Mobile regression caught and fixed in the same pass.** The title's new 3-segment default wraps to 5
lines at mobile's narrower 278px box (vs. the old default's ~3-4), overflowing the title's fixed
160px-tall box and overlapping the breadcrumb positioned right below it - caught via a mobile
screenshot, not assumed safe. Grew the mobile title box to 215px and shifted the breadcrumb's own
fixed `top` down by the same 55px, preserving the exact 40px gap that existed between them before -
mobile's title stays all-white (untouched colour-wise, per the 1.4.2 pass's own mobile-only override),
only the box sizing needed to catch up to the new, longer default content.

**Verified on local WordPress** (Puppeteer, at Figma's own 1440x825 reference viewport): title renders
as 3 real lines (2-line orange span confirmed via computed height), gap between description and
button measures exactly `56.02px`, both share the same `878px` left edge. Mobile (390px) re-screenshotted:
title and breadcrumb no longer overlap, `40px` gap confirmed, matches the pre-existing mobile look
exactly aside from the extra line the longer text now needs.

Mirrored to the static prototype (`insights.html`, `css/insights.css`). Rebuilt `theme-code-only.zip`
(`_S_VERSION` bumped `1.4.2` -> `1.4.3` - 1.4.2 was never uploaded, this supersedes it). Same deploy
steps as before: upload to `wp-content/themes/`, extract with overwrite, no SQL.

## ⏳ PENDING (theme zip, `_S_VERSION 1.4.2`, not yet uploaded) — Insights hero section rebuilt to match Figma (text + accent colour), desktop only, first of a section-by-section Insights page rebuild

Client is rebuilding the Insights (blog listing) page against a fresh Figma pass, section by section -
this is the first section (Hero), 4 Figma nodes supplied (1867:1752 full-page reference, 1867:1753 the
hero frame/nav, 1867:1774 the heading text, 1867:1766 the description+CTA).

**Found and fixed a template mix-up while investigating.** Initially edited `archive.php`'s hero markup
(same field group, same variable shape) and couldn't get the change to show up locally even after an
Apache restart and a direct DB check confirming the ACF field really was empty. Root cause: WordPress's
own template hierarchy renders the Insights page (a static "Posts page", not the true front page) via
**`home.php`**, not `archive.php` - `archive.php` only fires for category/tag/date archives, a
different, unrelated context that happens to share the same `insights.css` enqueue condition
(`is_archive()`). Made the real edit in `home.php` (kept the `archive.php` copy too, since it's
harmless there and archive pages may want the same "Articles" breadcrumb consistency later).

**Content changes (`home.php` + `functions.php`), matched to Figma exactly:**
- Hero title default: "Delivering Results for / Leading Real Estate Brands" -> "UAE Real Estate /
  Insights, Trends & Marketing" - the **last line is now always shown in orange** (`#FFA726`), any
  number of preceding lines stay white. Built as a small reusable helper,
  `sold_title_with_highlight()` in `functions.php`, rather than a one-off string hack: it splits the
  raw `<br>`-separated value and wraps only the final segment in `.hero-title-highlight`, so an editor
  keeps typing plain text with `<br>` exactly as the field always instructed - no HTML/class knowledge
  needed on their end, and this can be reused for any other hero that needs the same "last line accent
  colour" pattern later.
- Hero description default: -> "Stay ahead of the market with SOLD insights on UAE real estate trends,
  buyer behaviour, property marketing, lead generation, SEO, and AI search." (matches node 1867:1766).
- Breadcrumb label: "Blogs" -> "Articles" (both the desktop and mobile breadcrumb, matches Figma's
  wireframe node 1867:1753).
- **Background image - checked, not changed.** Downloaded Figma's own hero background asset (node
  1867:1753's fill) and diffed it byte-for-byte against the theme's existing `bannersold.png` - **MD5
  identical**. The background photo was already exactly right; nothing to update there.

**Already ACF-editable, confirmed not just assumed:** `acf-json/group_insights_page.json`'s Hero group
(`field_ins_hero`) already has Title/Description/Button Text/Background (desktop+mobile)/Button
Link/Button Icon as real fields - client can already override every piece of this section from
wp-admin (Insights page's meta box) once these new defaults ship. Added `default_value` to the Title
and Description fields (matching the new copy) so a first-time edit in admin starts from the right
content instead of blank, and updated the Title field's instructions to mention the automatic last-line
highlight. Bumped the JSON's own `modified` timestamp so ACF's sync screen picks up the change.

**Verified on local WordPress** (Puppeteer, after tracing the archive.php/home.php mix-up down to a
real DB check via `get_post_meta()` confirming the field was genuinely empty, not just displaying
stale cache): highlight span computes to `rgb(255, 167, 38)` (#FFA726 exact) at 1440px, base title
text stays white, breadcrumb reads "Articles". **Mobile explicitly re-checked and confirmed
untouched** - added a mobile-only override (`.insights-hero-title .hero-title-highlight { color:
#FFFFFF !important; }`) specifically so the new span doesn't turn orange there too, since mobile's own
Figma spec for this section hasn't been supplied yet (mobile hides the description/button entirely on
this page, "client-success approach" per its own existing comment) - computed color still `rgb(255,
255, 255)` on both the base title and the new span at 390px, pixel-identical to before this change.

Mirrored to the static prototype (`insights.html`, `css/insights.css`) - same content changes, no ACF
involved there since it's plain HTML.

Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.1` -> `1.4.2`). Upload to cPanel File Manager,
extract into `wp-content/themes/` (one level **above** `sold-theme/`, not inside it - see the folder-
depth note earlier in this file) with overwrite. No SQL, no new images.

## ✅ CONFIRMED LIVE 2026-09-24 (`_S_VERSION 1.4.1`) — Mobile pre-footer/CTA button was silently clipped to ~16px tall site-wide; fixed to auto-size + 50px bottom gap

Client reported the CTA button looked too small on mobile while reviewing the new Events page (built
from `page-service.php`) - supplied two Figma node links for the mobile button (3548:4017 the
section frame, 3548:4019 the button itself: 239x39px, positioned so its bottom sits 50px above the
section's own bottom edge) and asked for the same 50px gap site-wide, since the button reads small on
every page, not just Events.

**Root cause, found by measuring, not assumed:** `.btn-pre-footer`'s desktop base rule (in both
`css/style.css` and `css/style-v2.css`) sets `height: 4.0278cqi` (the ~58px fixed height added in the
earlier Figma-button-match fix, intended to resolve against the ~1440px desktop container). The mobile
`@media (max-width: 767px)` override never resets `height` at all, so that same `cqi` value keeps
applying at mobile widths too - but `cqi` scales to the *actual* container size, so against a ~390px
mobile container the identical rule silently computed to **~15.7px** instead of ~58px, clipping the
34px icon and 30px-line-height text into a box far shorter than either. This is why it looked broken
on every page using this shared button, not something specific to the Events page or its content.

**Verified live on both Branding & Design and Events before fixing** - identical broken numbers on
both (`height: 15.7px`, icon 34px/text 30px overflowing it) - confirming this was already live and
site-wide, not an Events-only regression.

**Fix, both `css/style.css` and `css/style-v2.css`:**
- `.btn-pre-footer` (mobile block): added `height: auto !important` so the box sizes itself from its
  own padding + tallest child (icon 34px + 4px top/bottom padding = 42px) instead of inheriting the
  stray desktop `cqi` value - same "auto-size, don't hardcode" approach already used for this button's
  width.
- `.pre-footer-inner` (mobile block): `padding: 56px 24px` → `padding: 56px 24px 50px 24px` - the
  button is the last child in this column-flex layout, so its own bottom padding *is* the button's gap
  to the section's bottom edge. Top/left/right padding (56px/24px) untouched, only the bottom value
  matches the client's requested 50px.

**Verified on local WordPress** (Puppeteer, real DOM measurement, not just reading the CSS):
- Mobile (390px), Branding & Design: button height `42px` (was `15.7px`), bottom gap to container
  `50.00px` exactly.
- Desktop (1440px), same page: button height `58px`, bottom gap `45px` - both completely unchanged,
  confirming the mobile-only fix didn't touch the desktop rule from the earlier Figma-match pass.

**Intro section - checked, not a bug.** Client also asked to confirm the Intro section (heading +
description + container width) matches between Events and Branding & Design, web and mobile. Measured
both pages directly at 1440px and 390px: container width, padding, heading font-size, and description
font-size/width are byte-identical between the two pages at both breakpoints (both use the exact same
shared `page-service.php` template + `branding-design.css` classes). The only difference is **content**
- the Events page's Intro Description field still has placeholder "Lorem ipsum..." text in wp-admin,
not a CSS/template problem. No code change made for this part; needs the real copy entered in the ACF
field instead.

Rebuilt `theme-code-only.zip` (`_S_VERSION` bumped `1.4.0` -> `1.4.1`). Upload this to cPanel File
Manager, extract with overwrite into `wp-content/themes/sold-theme/` (same as every past theme-only
deploy) - no SQL, no new images this round.

## ⏳ PENDING (theme zip only, rides along with the `_S_VERSION 1.4.0` zip below) — Pre-footer/CTA button resized + repositioned to match Figma exactly, site-wide, web only

Client supplied 4 Figma node links for the pre-footer/CTA button (the full section frame plus 3 of its
sub-elements: the button box, its text, its icon). Fetched via the Figma MCP and cross-checked with
`get_metadata` for exact pixel values (1440x286 reference frame): button 347x58px, positioned so its
bottom edge sits exactly **45px** above the section's own bottom edge - matches the client's own
independently-stated number exactly, confirming the right element/measurement. Icon 41.64x45.49px
(already ~42x45px live, negligible), text 25px Inter Medium (already matched live, unchanged),
icon-to-text gap 16.85px (~17px), left inset 10.91px (~11px, unchanged), right margin 26.77px (~27px).

**The button's width was deliberately NOT hardcoded to Figma's 347px.** That number is what Figma's own
"GET STARTED NOW" reference text happens to produce - the real site's CTA text differs per page (e.g.
Home's "SPEAK TO AN EXPERT" is a different length), and this section was made genuinely dynamic earlier
in this project specifically so it adapts to whatever text a given page has instead of clipping/
overflowing a fixed box. Fixed the *padding/gap values* to Figma's exact numbers instead (icon-to-text
gap 18px->17px, right padding 25px->27px, height now an explicit fixed 58px) - width still auto-sizes
from those paddings + whatever text is present, and happens to land almost exactly on 347px for
"SPEAK TO AN EXPERT" too (measured 333.02px live - close because the paddings are now Figma-exact, the
remaining difference is purely the two reference strings' different lengths, not a padding error).

**The 45px bottom gap.** `.pre-footer-inner`'s shared bottom padding (58px, used by both the title and
the button via `align-items:flex-end`) was reduced to 45px in `css/style.css` and `css/style-v2.css` -
since `branding-design.css` has no rules of its own for this section (confirmed - it reuses these same
two files' shared rules), this one change covers every page site-wide, service pages included, with no
separate edit needed anywhere else. Reducing that shared padding would also have pulled the title 13px
closer to the bottom, which wasn't asked for - added `margin-bottom: 13px` to `.pre-footer-title` to
exactly cancel that out, so only the button's gap actually changed.

**Web only, confirmed** - mobile's own separate `@media (max-width: 767px)` rules for this section were
never touched.

Verified via Puppeteer across Home (`style.css`), Services, Why SOLD, and Branding & Design
(`style-v2.css`, service-page template): button bottom gap reads exactly `45.00px` and height exactly
`58.00px` on every page checked; title's own bottom gap reads `58.00px` - unchanged from before this
fix, confirming the compensation works. Mobile re-checked and shows completely different values (own
independent layout, `flex-direction: column`), confirming it's untouched. Screenshot compared side by
side with the Figma reference image - matches closely.

## ⏳ PENDING (theme zip only, rides along with the `_S_VERSION 1.4.0` zip below) — Why SOLD founder quote: added Figma's quote marks, letter-spacing set to 0, web only

Client supplied two Figma node links for the "Our Founders" section (Andy Birt's card) - fetched both
via the Figma MCP. Two changes, web only (mobile explicitly confirmed fine, untouched):

1. **Quote marks.** Figma wraps the bio in curly quotes (`"…"`) as part of the quote-card's design.
   The live/database value (`ws_founders[0].bio_desk`, ACF) has **no quote characters at all** - the
   static prototype's `why-sold.html` had them hardcoded directly in the HTML text instead, which is
   the more fragile approach (an editor typing new bio text would need to remember to include them).
   Fixed at the CSS level instead: `.ws-founder-1 .ws-founder-bio.d-lg-block::before/::after` now
   generate the opening/closing curly quotes (`\201C`/`\201D`), so they're always correct regardless of
   what text is entered - removed the hardcoded quote characters from the static prototype's HTML to
   match (avoids double-quoting there), the WP fallback text already had none. `.d-lg-block` (not just
   `.ws-founder-bio`) keeps this scoped to the desktop paragraph only - the separate mobile paragraph
   (`.d-lg-none`) has its own Figma design with no quotes, untouched.
2. **Letter-spacing.** Figma specifies `0.01em` (1%) here - client explicitly asked for `0` instead,
   overriding Figma. Changed in the same `.ws-founder-1 .ws-founder-bio` rule
   (`@media (min-width: 768px)` block only).

**Verified:** both Figma nodes fetched and cross-checked against the live font-size (22px)/line-height
(25px)/color (#0F0F0F) to confirm the correct element before touching anything. Computed-style check
initially looked wrong (`letter-spacing: normal` instead of `0px`) - traced this down to confirm it's
expected Chromium behaviour (an explicit 0 computes to the "normal" keyword, since they're visually
identical) rather than the rule failing to apply, by forcing other explicit values (`0.01em`, `5px`) on
the same element and confirming those *do* show their real pixel value, only exact zero shows as
"normal". Screenshotted the result: curly quotes render correctly around the real live bio text, tighter
letter-spacing visible. Mobile re-checked and confirmed untouched (no generated quotes, its own separate
letter-spacing value unaffected).

## ⏳ PENDING (theme zip only, rides along with the `_S_VERSION 1.4.0` zip below) — Client Success card titles recoloured orange, all 10 boxes, web + mobile

Client-requested: all 10 Client Success case-study cards' title (e.g. "Accelerating Sales for One of
the UAE's Fastest-Growing Developers") should use the brand orange `#FFA726` instead of its previous
colour. One shared rule (`.cs-card-title`) covers all 10 cards, so a single change per breakpoint fixes
every card - confirmed via computed-style check that no individual card has its own colour override
(a couple do have their own *width* override, unrelated). Desktop was `#263238` (dark slate), mobile was
`#000000` (black) - both changed to `#FFA726` in `css/client-success.css`. No other property (font,
size, spacing, layout) touched.

Verified: computed `color` on all 10 `.cs-card-title` elements reads `rgb(255, 167, 38)` (`#FFA726`
exactly) at both 1440px and 390px; screenshotted cards 1, 5, and 10 (not just the one the client quoted)
to confirm every card picked up the change consistently, not just one.

## ⏳ PENDING (theme zip only, `_S_VERSION 1.4.0`, not yet uploaded) — Testimonials: web drag replaced with two-finger trackpad swipe

Client-requested: replace the "click and hold, then drag" interaction on the testimonials carousel
(web only) with a two-finger trackpad swipe. Mobile's existing touch-swipe must stay exactly as-is.

**What changed, in both `js/main.js` (Home) and `js/main-v2.js` (every other page):** the
`mousedown`/`mousemove`/`mouseup` click-and-drag block is gone, replaced by a `wheel` event listener on
`.testimonials-track`. A trackpad two-finger swipe fires `wheel` events with a horizontal `deltaX` -
this is a fundamentally different browser event from a touchscreen finger swipe (which fires `touch`
events, untouched by this change), so it's naturally web/desktop-only without needing any width check.
A vertical-dominant `wheel` event (a normal mouse wheel, or a two-finger vertical scroll) is left
completely alone - no `preventDefault()`, so the page still scrolls normally under the cursor.

One physical two-finger swipe fires many small `wheel` events in quick succession, not one clean event
- `deltaX` is accumulated across the gesture (the accumulator resets after a brief 150ms pause with no
further wheel events) and a slide only fires once the accumulated total crosses a 50px threshold,
followed by a 500ms cooldown that swallows the rest of that same physical gesture's leftover events -
otherwise one swipe could fire several slides in a row.

Also removed the now-dead `.testimonials-dragging` CSS rule (`css/style.css` and `css/style-v2.css`,
`@media (min-width: 768px)`) - it only ever existed to suppress text selection while the now-removed
drag handler was active, and nothing adds that class anymore.

**Verified via Puppeteer** (had to fix the test's own positioning first - `scrollIntoView`'s smooth-
scroll animation was racing ahead of `boundingBox()`, the same class of bug already documented
elsewhere in this project; switched to instant `window.scrollTo`, matching that established fix):
- Forward swipe (positive `deltaX`) advances to the next testimonial; reverse swipe (negative `deltaX`)
  goes to the previous one, correctly wrapping around at both ends.
- A vertical-dominant wheel gesture changes nothing about the carousel and the page still scrolls
  normally (`window.scrollY` increased as expected).
- The old click-and-drag gesture (mousedown → move → mouseup) no longer changes the active slide at all
  - confirms the interaction was actually replaced, not just supplemented.
- A single swipe burst (6 rapid wheel events, well over the 50px threshold) advances **exactly one**
  slide, not several - confirms the accumulate/cooldown logic works.
- Mobile touch-swipe re-tested and confirmed completely unaffected (still advances the carousel exactly
  as before this change).

## ✅ CONFIRMED LIVE 2026-09-23 — `_S_VERSION 1.3.0` — Site-wide AJAX page navigation FULLY REVERTED (+ Service Page CTA/card fixes, navbar height, pre-footer align)

**Client decision: remove the AJAX-nav feature entirely, not just fix it.** The feature (documented in
the two entries directly below this one) had briefly been live on production at `_S_VERSION 1.2.0` -
this revert took it back down. Verified directly against the live domain after deploy: `_S_VERSION`
serving `1.3.0`, `ajax-nav.js` absent from every enqueued script list, `main.js`/`main-v2.js`/
`why-sold-scroll.js`/`why-sold-animations.js`/`contact-modal.js`/`page-loader.js` all confirmed
byte-level reverted (checked via their exact distinguishing code, not just a version number), all 6
key pages returning 200 with zero PHP warnings, and a live click test confirming navigation is a real
full-page reload again (no AJAX interception). This same zip also carried the Service Page CTA-button
width fix, the card-3 mobile overflow fix, the sticky-navbar height, and the pre-footer bottom-align
fix (their own entries further down) - all confirmed live the same way.

**What was reverted, file by file** (both the WP theme and the static prototype):
- `js/ajax-nav.js` - **deleted** entirely (was the whole click-interception/fetch/swap engine).
- `js/main.js`, `js/main-v2.js` - un-split back into a single `DOMContentLoaded` handler each (no more
  `initHeaderChrome()`/`initMainContent()` split, no `cleanupMainContent()` registry, no
  `window.SoldHomeMain`/`window.SoldPageMain` exports). Every other fix that landed in these files this
  session (the testimonials-dragging text-selection fix, in particular) was **kept** - only the
  AJAX-reusability restructuring was undone.
- `js/why-sold-scroll.js`, `js/why-sold-animations.js` - same treatment: un-split back to a single
  top-level `DOMContentLoaded` handler each, no `init()`/`cleanup()` exports.
- `js/contact-modal.js` - reverted from a single delegated `document`-level click listener back to a
  per-trigger `triggers.forEach(...)` listener (its original, pre-AJAX-nav form).
- `js/page-loader.js` - reverted back to **removing** the loader element from the DOM 400ms after first
  use (its original, single-use form) instead of keeping it around for reuse on later transitions. The
  loader itself (the branded full-screen animation on a normal page load) is untouched and still works -
  this only undoes the part that let `ajax-nav.js` fade it back in for a transition.
- `functions.php` - the `sold-ajax-nav` script enqueue (and its dependency-array block) removed entirely.
- All 15 static prototype HTML pages - the `<script src="js/ajax-nav.js">` tag removed.

**Confirmed NOT touched by this revert** (unrelated fixes from other requests in this same window, kept
as-is): the sticky/compact navbar pill height (40px) and the pre-footer button's bottom-right anchor -
see their own entries further down.

**Verified, not assumed:** after the revert, clicking a nav link on the local WordPress install triggers
a real, full browser navigation again (confirmed via `framenavigated` events and a `window` marker that
does NOT survive the click, proving it's a genuine reload, not an intercepted one) - `js/ajax-nav.js` is
confirmed absent from both the enqueued script list and the rebuilt zip. All reverted JS files pass
`node --check`. `js/why-sold-scroll.js`, `js/why-sold-animations.js`, `js/contact-modal.js`, and
`js/page-loader.js` now match this project's git history for those files exactly (byte-for-byte, per
`git diff`); `main.js`/`main-v2.js` differ from git history only by the still-wanted testimonials-drag
fix, confirmed via diff.

## ⏳ SUPERSEDED/ABANDONED — Site-wide AJAX page navigation (no full reload)

**This feature was reverted - see the 🔴 URGENT entry above.** Left here only as a historical record of
what was built and why; do not deploy anything described below, deploy the revert instead.

Client requirement: navigating via the navbar/other links should not fully reload the browser, while
keeping URL structure, SEO, and back/forward working correctly, on web and mobile, without changing
any existing UI/functionality. Chosen transition visual: fade the existing branded page loader in/out
during the swap (reusing the loader built in the previous pending entry below), not an instant swap.

**Architecture.** Every template already followed one shared shape: `get_header()` → `<main>...</main>`
→ `get_footer()`, with the header/footer output identical on every page (only which template fills
`<main>` differs). `js/ajax-nav.js` (new) intercepts clicks on same-origin links, `fetch()`s the
destination's real URL, and replaces only the `<main>` element with the fetched page's `<main>` - the
header, footer, WhatsApp float, mobile offcanvas drawer, contact modal and page loader are never
removed or re-created, so their own event listeners stay valid and nothing needs re-binding for them.
Every URL still serves a complete, real server-rendered document on its own (confirmed by fetching
each URL directly) - this is progressive enhancement of normal navigation, not a single-page app; a
crawler, a user with JS disabled, or a hard refresh all get identical content, and every transition
still calls a real `history.pushState()` with the real destination URL, which is what keeps SEO and
back/forward intact.

**The Contact page is deliberately excluded** - `page-contact.php` builds its own standalone document
instead of using the shared header/`<main>`/footer structure (pre-existing, unrelated to this change),
so it has no `<main>` to swap into. Rather than hardcoding that one exception, `ajax-nav.js` checks for
a `<main>` in the fetched response and falls back to a real, normal navigation whenever it's missing -
which also makes it safe against any future template that doesn't follow the shared structure.

**Per-page CSS/JS reconciliation, not a hardcoded manifest.** This theme enqueues a real matrix of
conditional assets per page type (`style.css` vs `style-v2.css`, `main.js` vs `main-v2.js`, `why-sold.css`
+ 2 dedicated scripts only on Why SOLD, per-slug CSS files, `seo-geo` uniquely loading *both* `style.css`
and `style-v2.css` together, etc. - see `sold_theme_scripts()`). Rather than duplicating that matrix in
JS (which would silently drift out of sync with `functions.php` over time), `ajax-nav.js` diffs the
fetched page's actual `<head>` stylesheet `<link>`s and `<body>` `<script src>` tags against what's
currently loaded: missing stylesheets are added and re-ordered to match the fetched page's cascade
order exactly (`appendChild` on an already-attached `<link>` moves it without reloading it - needed
because `seo-geo` requires `style.css` to be applied *before* `style-v2.css`, a real cascade-order
dependency, not just presence/absence), stylesheets the new page doesn't need are removed, and any
script not already on the page is injected and loaded (in fetched-document order, awaiting each
before the next, matching `defer` semantics) - deduped by path so a script already loaded is never
re-injected (re-running an already-initialized script's top-level code would double-bind its listeners
- e.g. a second delegated click handler in `contact-modal.js`, or a second `contactModal` DOM injection).

**Every interactive script needed a re-init path.** `main.js`/`main-v2.js` previously ran their entire
setup exactly once inside a single top-level `DOMContentLoaded` handler - FAQ accordion, services
accordion, testimonials carousel (drag/swipe/auto-scroll), mobile insights carousel, steps timeline
scroll animation, header compact-scroll toggle, mobile offcanvas drawer, nav dropdowns. Split each file
into `initHeaderChrome()` (header/offcanvas/dropdowns - runs once; that DOM is never swapped) and
`initMainContent()` (everything scoped inside `<main>` - runs on first load **and** again after every
AJAX swap, since that content is fully replaced each time). `initMainContent()` starts with a
`cleanupMainContent()` pass that clears the testimonials auto-scroll `setInterval` and any lingering
`window`-level drag listeners from the previous run before setting up the new content - listeners
attached to elements *inside* `<main>` are cleaned up for free when that DOM is removed, but a
`setInterval` or a `window.addEventListener('scroll'/'resize', ...)` is not, and would otherwise pile
up a duplicate for every transition (confirmed this exact leak pattern in the steps-timeline scroll
animation, which had 3 `window` listeners with no teardown). Same treatment for
`why-sold-scroll.js` (team carousel + client-logo arc rotation, Why SOLD only) and
`why-sold-animations.js` (rotating 3-card info stack, Why SOLD only) - both now expose an idempotent
`init()` that `ajax-nav.js` calls after detecting the `why-sold-page-body` class on the swapped-in page.
Each file exposes its main-content init as a distinct global (`window.SoldHomeMain` for `main.js`,
`window.SoldPageMain` for `main-v2.js`, `window.SoldWhySoldScroll`, `window.SoldWhySoldAnimations`) so
both the Home and non-Home script can be loaded at the same time (needed once a session has visited
both) without colliding.

**Contact modal + page loader also refactored to be AJAX-safe:**
- `contact-modal.js` switched from a per-trigger-element listener (bound once, at initial load) to a
  single delegated `click` listener on `document`. This means a `[data-contact-trigger]` button that
  arrives later as part of a swapped-in `<main>` works immediately with nothing needing to re-run, and
  a trigger already in the persistent header/footer never accumulates a second listener either. The
  modal itself is fetched once and appended to `document.body` (a sibling of `<main>`, never touched
  by a swap), so it's never re-fetched or duplicated.
- `page-loader.js` used to permanently remove the loader `<div>` from the DOM 400ms after first use.
  It's now kept in the DOM (just toggled via its existing `--hidden` class) and exposes
  `window.SoldPageLoader.show()`/`.hide()`/`.enabled`, so `ajax-nav.js` can fade the exact same element
  back in before each fetch and hide it again once the swap completes. Confirmed the disabled-loader
  case too (`page_loader.enabled` off via Theme Settings): `ajax-nav.js` checks `.enabled` and simply
  skips the fade, transitioning instantly with no error.

**Also fixed a small pre-existing gap while touching this area:** the Why SOLD page's rotating 3-card
info stack (`ws-cards-stack`, `why-sold-animations.js`) had markup and CSS for it but the script tag
itself was missing from the static prototype's `why-sold.html` (the WordPress theme already enqueued
it correctly) - added the missing `<script>` tag.

**Verified, not assumed** - real Puppeteer runs against both the static prototype (via a local static
file server) and this real local WordPress site, desktop (1440px) and mobile (390px):
- No full browser reload on any link click (a `window.__marker` set before navigating survives after).
- URL, `<title>`, and `document.body` class all update correctly after every transition (confirmed via
  the real fetched page's own template-hierarchy body class, e.g. `why-sold-page-body`), including
  navigating Home → Why SOLD → back to Home → browser Back button, each landing on the correct URL.
- Header and footer are the *same DOM node* before and after a transition (identity-checked, not just
  visually) - proving they're genuinely persisted, not silently re-created.
- CSS cascade order is correct after a transition into the one page that uniquely double-loads
  `style.css` + `style-v2.css` together (`seo-geo`), and correctly cleaned back up on leaving it.
- The contact modal opens/closes correctly after multiple AJAX transitions, with exactly one
  `#contactModal` in the DOM at all times (no duplicate injection).
- 4 rounds of bouncing Home ↔ Why SOLD back-to-back produced no errors and no duplicate carousel/dot
  state, confirming the auto-scroll timer and window-listener cleanup actually prevents the leak it
  was written to prevent.
- Mobile: the offcanvas drawer opens, closes on a nav-link click, transitions the page, and still
  opens again afterward - proving the persistent header/footer's own listeners survived the swap.
- The Contact page itself falls back to a real, normal navigation (confirmed no `<main>` on that
  response), and every other page's own direct URL still returns full correct HTML on its own.
- Zero console errors, zero thrown JS exceptions across every scenario above (aside from an unrelated,
  pre-existing `favicon.ico` 404 present on every page regardless of this change).

**Not yet done, out of scope of this pass:** true scroll-position restoration on Back only restores to
whatever position was saved just before navigating away (a simple per-URL map), not a pixel-perfect
native restoration for every edge case; a fresh forward navigation always scrolls to top, matching
normal link-click behaviour. No analytics "virtual pageview" event is fired on a transition - this
project has no analytics/GTM setup to hook into, so nothing was added rather than guessing at one.

## ✅ CONFIRMED LIVE 2026-09-23 (`_S_VERSION 1.3.0`) — Pre-footer/CTA button reverted to bottom-right anchor, web only

Client feedback: the pre-footer's "GET STARTED NOW"-style button ended up vertically **centred**
against the title once this section went dynamic/flex-based (see the "Where Great Brands Begin"/CTA
dynamic-sizing entry, later in this file) - but the original design had it anchored to the
**bottom-right**, not centred. `.pre-footer-inner`'s `align-items: center` changed to
`align-items: flex-end` in both `css/style.css` (Home) and `css/style-v2.css` (every other page's
desktop rule) - the button's bottom edge now lines up with the title's last line/bottom padding edge
at any title length, while the section's real dynamic height (no fixed box, grows with however many
lines the title wraps to) is completely unaffected - only the button's vertical anchor point changed.

**Scope, confirmed:** only the desktop (non-media-query) base rule in each file. The mobile override
(`@media max-width:767px` in both files) already uses `flex-direction: column` with
`align-items: flex-start` - a different layout entirely (title stacked above button), untouched, not
applicable to this fix. `events.css`'s own `.events-page-body .pre-footer-inner` override is also
untouched - it's mobile-only (`@media max-width:767px`) and uses `display:block` with absolute
positioning, not flexbox, so `align-items` doesn't apply there at all.

Verified via Puppeteer: button's bottom edge now measures exactly equal to the title's bottom edge
(both at the same Y-coordinate) on Home, Services, and Why SOLD - consistent across different title
lengths, confirming the anchor works correctly regardless of how many lines the title wraps to, not
just for one specific page's text.

## ✅ CONFIRMED LIVE 2026-09-23 (`_S_VERSION 1.3.0`) — Service Page template audited against the full ACF-editability spec; one real bug found and fixed

Client re-supplied the Service Page's full section spec (Hero incl. navbar/heading/subtitle/
breadcrumbs/CTA, Intro, "Where Great Brands Begin" cards, "Design & Production", Gallery, "How We
Build Your Brand" steps, CTA, FAQ, footer) and asked for `page-service.php` + its ACF field group
(`acf-json/group_service_page.json`) to be audited against it - every element editable, nothing
hardcoded, web + mobile.

**Method - a real admin-panel-equivalent test, not a read-through:** wrote every one of the ~30 ACF
sub-fields across all 8 field groups to a distinctive, unique test string in one pass via real
`update_field()` calls (the same function WordPress's own admin-panel save uses), confirmed all 30
values render in the correct place in the actual page HTML, confirmed every image field's fallback
(several left deliberately empty) resolved to its correct default asset with zero broken image
requests, screenshotted the full page at 1440px and 390px, then restored the original content byte-
for-byte from a backup taken before the test.

**Result: every section/element in the spec is genuinely ACF-editable** - hero background (desktop +
mobile), title, subtitle, CTA text/icon; intro heading/description; cards heading + all 4
title/title-mobile/desc; production heading/pill icon/each row's text/CTA text/icon; gallery image (any
aspect ratio); steps heading + all 4 label/desc (numbers and arrows are correctly auto-generated/
global, not meant to be per-step); pre-footer desktop/mobile title + button text/icon; FAQ question/
answer repeater. The "supporting line" under each card title and the "connecting lines" between steps
are both purely decorative (a CSS divider, and the same global arrow icon reused) - correctly not
separate content fields, nothing to add there. Navbar and footer are the shared global header/footer,
correctly out of scope for a per-page field group.

**One real bug found and fixed:** `.branding-production-cta` (the "Design & Production" section's CTA
button) had a **hardcoded fixed width** (`21.4583cqi`/309px desktop, `231px` mobile) sized to fit only
the default "SPEAK TO AN EXPERT" text exactly - entering a longer CTA text via ACF visibly overflowed
past the button on both breakpoints (`scrollWidth > clientWidth` confirmed, not just eyeballed). The
hero CTA and pre-footer CTA buttons were checked too and don't have this problem - fixed by removing
the hardcoded width and letting the button auto-size to its content instead, the exact same fix pattern
(and reasoning) already applied to `.btn-pre-footer` earlier in this project. Re-tested: no overflow at
either breakpoint with the long test text, and the original "SPEAK TO AN EXPERT" button renders pixel-
identical to before the fix (screenshotted side-by-side) - not a regression for the common case, only a
fix for the longer-text case that was actually broken.

## ✅ CONFIRMED LIVE 2026-09-23 (`_S_VERSION 1.3.0`) — "Where Great Brands Begin" card 3 title overflowed its card on mobile, fixed

Client-reported: card 3's heading ("Built for Today." / "Ready for Tomorrow.") touched/overflowed past
the card's right edge on some mobile screen sizes. Mobile only, keep the same two-line layout, don't
touch desktop or any other section/card.

**Root cause, found by testing (not assumed):** this title comes from an ACF field storing a real
newline character between the two sentences - the rendered HTML has an ordinary line-break character
there, not an actual `<br>` tag. The mobile CSS's `white-space: nowrap` (added by an earlier fix for a
*different* card, and mistakenly assumed - per its own comment - that this card already had a real
`<br>` splitting it into two separate nowrap nodes) collapses that newline into an ordinary,
non-breaking space instead of letting it break - so the **entire** "Built for Today. Ready for
Tomorrow." string was being forced onto one unbroken line. Measured directly: 395px of content trying
to fit ~194-304px of available card width at every phone size tested (320/360/375/390/393/414/428/
430px) - it overflowed at literally all of them, even at this rule's own 19px font-size floor.

**Fix:** `white-space: nowrap` → `white-space: pre-line` for this one card's title, mobile only (its
own already-existing dedicated selector, `.branding-card:nth-child(3) .branding-card-title`, inside the
`@media (max-width: 767px)` block - card 1/2's shared nowrap rule and desktop's separate, untouched rule
are unaffected). `pre-line` preserves the real newline as an actual forced line break (keeping the
intended two-line layout) while still allowing normal wrapping if a line is ever too long for a given
width - so unlike `nowrap`, it structurally cannot overflow the card at any screen size, it would
degrade to a 3rd line instead (never observed in testing, since each individual sentence is well short
enough to fit at every width checked).

Verified via Puppeteer: zero overflow (`scrollWidth <= clientWidth`, box never exceeds the card's own
right edge) at all 8 widths tested; screenshots at 320px and 390px confirm the same two-line layout,
properly contained with consistent left/right spacing; desktop screenshot confirms pixel-unchanged
(still wraps naturally on its own, wider card, exactly as before).

## ✅ CONFIRMED LIVE 2026-09-23 (`_S_VERSION 1.3.0`) — Sticky/compact navbar pill height reduced, web only

Client-requested: the sticky (scrolled) navbar's nav pill (Home/Services/Client Success/etc., the
semi-transparent white pill that visually blends with the solid `#263238` bar behind it into what
reads as `#515B60`) felt too tall. `height: 3.6805cqi` (53px, matched the tall header's own pill)
reduced to `height: 2.7777cqi` (40px) in `.site-header.is-compact .main-nav-wrapper` - both
`css/style.css` (Home) and `css/style-v2.css` (every other page) have this rule and were updated
identically, per this codebase's usual pattern. Padding, gap, font-size, border-radius, the 72px outer
bar height, and the "Book a Call" button are all untouched - only the pill's own height changed. Web +
tablet only (`@media (min-width: 768px)`, same block the whole compact-bar feature lives in) - mobile
uses a completely different header layout, unaffected by design.

Verified via Puppeteer, both style variants: pill now renders at 40px, nav link text sits vertically
centred with ~8px clearance above and below (was tight against the old 53px, still no clipping at the
new height), dropdown arrow icon unaffected, layout/alignment otherwise pixel-identical to before.

**Follow-up same session - final state confirmed:** the "Book a Call" button
(`.site-header.is-compact .header-cta`, was 53px) is reduced to 40px, same as the nav pill, so both now
share the same height, same vertical centre, and the button's text/arrow icon sit level with the nav
item text (measured: nav-link text centre 35.984px, button text centre 35.992px - effectively
identical). This went through a reduce -> revert -> re-confirm cycle in this same session (briefly
reverted back to 53px on a misread of feedback, then explicitly re-requested at 40px with a precise
spec) - **40px is the final, confirmed value.** Web/tablet only (`@media (min-width: 768px)`); mobile's
`.header-cta` is `display:none` regardless (a separate offcanvas-drawer CTA is used there instead), so
it was never touched by this change at any point.

## ⏳ PENDING (theme zip only, `_S_VERSION 1.1.0`, not yet uploaded) — Mobile header top gap reduced 42px -> 30px, site-wide

Client-requested: the gap above the logo/WhatsApp/hamburger row (mobile only) felt too big. Fixed
`.site-header`'s `top` value (was 42px) in both `style.css` (Home's own copy) and `style-v2.css`
(every other page) - each file has this exact rule duplicated 3x (a pre-existing pattern, see this
file's own v1.0.66 history), all 3 updated together via a scoped `replace_all` in each file (matched
on `top: 42px` + its following `left`/`right` lines specifically, since an unrelated `.client-logo`
rule elsewhere coincidentally shares the same bare `42px` value - confirmed not touched).

**No separate WhatsApp button fix needed** - since the v1.0.95 restructure (this button became a
real child of `.site-header`, self-centering via `top:50%` + `translateY(-50%)`), it automatically
tracks whatever position the header itself has. Verified this is genuinely automatic, not assumed:
measured the button's and hamburger's vertical centre on 6 pages, both land exactly at 60px
(30px new header top + half of the unchanged 60px header height) with zero extra CSS changes.
Checked every other page-specific CSS file for a `.site-header` top override that might need its
own update - none exist, confirming this fix in the 2 shared files covers every page. Contact page
correctly shows no header at all (unrelated, unchanged) - it's a standalone modal page by design.

Verified zero overflow, zero PHP warnings, and screenshotted the result on Home.

## ⏳ PENDING (theme zip only, `_S_VERSION 1.0.99`, not yet uploaded) — Home page Insights section made fully dynamic

Home's 3 Insights cards (`front-page.php`) were static ACF fields - an admin had to hand-type each
card's title/date/excerpt/image and, critically, a manual "link" text field that had to be kept in
sync with a real post's URL by hand (or it silently fell back to just the `/insights/` hub instead
of a specific post). Replaced with real WordPress post data throughout.

**New ACF field:** `home_insights.posts`, a relationship field (Theme Settings is NOT where this
lives - it's on the Home page's own "7. Insights" field group, matching where it always was) letting
an editor pick up to 3 specific posts; any slot left unpicked (including all 3, the default state)
auto-fills with the latest published posts not already picked, newest first. The old
`large_card`/`small_card_1`/`small_card_2` groups (manual title/date/excerpt/image/link per card)
are gone - every card's title, date, excerpt, featured image, and link are now pulled live from the
real post via `get_the_title()`/`get_the_date()`/`wp_trim_words(get_the_excerpt())`/
`get_the_post_thumbnail_url()`/`get_permalink()`, the same functions the main Insights hub
(`archive.php`) already uses, so a post's excerpt/date formatting matches site-wide.

**"Click it, see the details page" is inherent, not a separate thing to build:** `get_permalink()`
on a real post ID automatically points at that exact post's URL, and WordPress's own template
hierarchy automatically renders that URL through `single.php` - the *same* "Insights Details" page
template the main Insights hub already links to. There was no separate "details page" to build or
keep in sync; using the real permalink *is* the fix.

**Verified, not assumed:** confirmed via real ACF `update_field()` calls (not just reading code) -
picking 2 specific posts put them in the large/first-small card slots in the order picked, with the
3rd slot correctly auto-filling with the next latest post not already used; clearing the selection
back to empty correctly fell back to pure latest-3. Confirmed with an actual simulated click (not
just checking the HTML `href`) that clicking the large card's title lands on that real post's real
URL with the `insights-details-page-body` template class - the exact click-target bug documented
elsewhere in this file ("the text overlay sits on top of the image and was outside the anchor") was
re-verified NOT present here, since the anchor-wraps-everything structure was kept unchanged.
Screenshotted mobile: real featured photo, real date, real title, real excerpt render correctly in
the existing card design, unchanged CSS. Confirmed the main `/insights/` hub page is untouched
(different file, `archive.php`, never modified) and a real post's detail page still returns 200 with
zero PHP warnings. Also simplified a small pre-existing thing in passing: the small cards used two
separate `<img>` elements toggled by Bootstrap's `d-md-block`/`d-md-none` (a decorative SVG filler
on mobile, the real photo only on desktop) - now both breakpoints show the one real featured image,
which the CSS already supported without changes (it styles the plain `.insights-small-img` class,
not the display-toggle classes).

**Not applicable to the static prototype** - this is real WordPress database content
(`WP_Query`/ACF relationship field), nothing to mirror in the static HTML files beyond the visual
card layout, which was not changed.

## ⏳ PENDING (theme zip only, `_S_VERSION 1.0.98`, not yet uploaded) — Site-wide page loader + testimonials text-selection fix

**1. New feature: full-screen page loader, every page, web + mobile.** Shown the instant `<body>`
opens (before anything else can paint), hidden via a smooth opacity fade once `window`'s `load`
event fires (all assets, not just the DOM) - with a 4-second safety-net timeout so it can never get
stuck showing if some resource stalls. Fully ACF-driven (Theme Settings -> Page Loader): on/off
toggle, logo (falls back to the site logo), optional text (falls back to none), 3 animation styles
(pulse/spin/dots, CSS keyframes only - no JS animation library, no added page weight to speak of),
background + accent colour. When disabled, the CSS/JS aren't even enqueued - zero footprint, not
just hidden. Respects `prefers-reduced-motion`. New files: `template-parts/page-loader.php`,
`css/page-loader.css`, `js/page-loader.js`; included via `header.php` for every normal page, and
separately in `page-contact.php` since that page builds its own standalone `<html>` rather than
calling `get_header()` (it doubles as the fetch source for the contact modal injected into every
other page - confirmed the loader div sits outside the `#contactModal` element that gets extracted,
so it can't end up duplicated into other pages when the modal opens).

**Verified, not just shipped:** screenshotted all 3 animation styles (pulse/spin/dots) after setting
each via ACF's real `update_field()`; confirmed a throttled connection keeps it visible with
opacity:1 while assets are still loading, and a normal-speed load removes it from the DOM entirely
within the fade (not just hidden) on Home, Services, Client Success, Insights, and Branding & Design;
confirmed the disabled state renders zero loader markup AND stops enqueuing its CSS/JS entirely;
confirmed the contact modal still opens correctly and doesn't gain a duplicate loader element;
zero PHP warnings on any page. **Also mirrored into the static prototype** (all 15 real HTML pages,
`temp.html` correctly excluded as it's an empty scratch file) via a scripted, count-verified
insertion (15/15/15 for the CSS link, loader markup, and JS script tag) - confirmed hides correctly
with zero console errors and zero 404s on Home, Services, Contact, and Branding & Design.

**2. Testimonials text-selection-during-swipe fix, web only.** Manually dragging the testimonials
carousel with a mouse was highlighting/selecting the card's text and logo underneath the cursor - a
`preventDefault()` already existed on the drag's `mousemove` handler but wasn't sufficient, since a
browser can begin a native text selection right at `mousedown`, before any `mousemove` handler ever
runs. Fixed with two layers: `preventDefault()` added to `mousedown` itself (`js/main.js` and
`js/main-v2.js`, both - same reason every past testimonials fix touched both files), plus a CSS
`user-select:none` rule scoped to `@media (min-width:768px)` and gated behind a new
`.testimonials-dragging` class that's added on `mousedown` and removed on `mouseup` - so normal
double-click/select-to-copy on the testimonial text still works when *not* actively dragging, and
mobile touch-swipe is completely unaffected by construction (the class/CSS only exists at the
768px+ breakpoint, and touch events never touch this code path at all).

**Verified, not assumed:** simulated a real mouse drag (mousedown, several mousemoves crossing
card text, mouseup) via Puppeteer on both `index.html` (style.css) and confirmed: the dragging
class is added exactly when expected and removed after release, `window.getSelection().toString()`
is empty after the drag (previously captured the *entire rest of the page's text*, not just the
testimonial card, when this was tested unfixed), the carousel still actually slides on a successful
drag (active dot changed), and - critical given "web only" - forcing the `.testimonials-dragging`
class on at mobile width (390px) still computes `user-select: auto`, confirming the media query
correctly excludes mobile regardless.

## 🚨 ACTIVE SECURITY COMPROMISE - RE-CONFIRMED LIVE 2026-09-21, WORSE THAN FIRST THOUGHT

The 2026-09-17 backdoor (`SECURITY-INCIDENT-2026-09-17.md`) is **still live and still active**, not
just an old unresolved risk. Checked directly today: `wp-content/themes/sold-theme/sold-theme.theme`
still returns `200 OK` (950 bytes), and the `Undefined array key "HTTP_REFERER"` PHP warning now
fires on **every plain page load with no referrer at all** - not just crafted/referrer-based
requests as first assumed. That covers most direct visits, bookmarks, and search-engine traffic, so
this is broad, ongoing exposure, not a rare edge case.

**Do not "fix" this by hiding the warning** (e.g. `WP_DEBUG_DISPLAY` off) - that only stops the
symptom being visible while the RCE backdoor keeps running server-side. Real remediation, none of
which can be done from this machine (no cPanel/SSH/FTP access here):

1. **cPanel File Manager** → delete `wp-content/themes/sold-theme/sold-theme.theme`.
2. **Find the loader** - search `wp-config.php` and any `mu-plugins` files for `sold-theme.theme` or
   `zip://`. It survived the last theme zip re-upload, so whatever `include`s it lives outside the
   theme's normal files.
3. **phpMyAdmin** → check `wp_options` for `sold-theme-template-plugin` / `sold-theme-wp-plugin`
   rows, delete if present.
4. **Rotate every credential** - WP admin users, DB password, cPanel/FTP login. An active RCE
   backdoor means all of these should be treated as compromised.
5. **Ask the host for a server-side malware scan** - this file existing suggests there could be
   others.
6. Only *after* removal, turn `WP_DEBUG_DISPLAY` off in `wp-config.php` as normal hygiene.

**Known side effect while this stays unresolved:** the warning's raw HTML breaks the page's markup
before it's fully rendered, pushing body content down. This was reported as "the WhatsApp button
shifts out of place on mobile" - fixed structurally below (v1.0.95) so it can't happen again for
*that* reason, but the warning itself is still there and still a live compromise regardless.

## ⏳ PENDING (theme zip only, already includes everything below, not yet uploaded) — Pre-footer CTA made genuinely dynamic SITE-WIDE

Same root problem as the cards fix below, but for the dark "READY TO..." CTA banner that appears on
every page (Home, Services, Why SOLD, Client Success, Insights, Insights Details, and all service
pages) - explicitly requested site-wide, not just service pages, since pre-footer title/button text
is now ACF-editable per page and could vary in length anywhere.

**Root cause:** the shared `.pre-footer` (style.css for Home, style-v2.css for every other page) used
a **fixed section height with the title and button absolutely positioned inside via hand-calculated
`top`/`left` pixel values** - each page's own override then re-hardcoded ANOTHER full set of
positions tuned to that page's own specific, known text length (e.g. client-success.css's button
`top:250px` was commented "Was 305px, copied verbatim from Home's 4-line mobile title... moved up by
55px" - a calculation that only holds for that exact wording). Shorter or longer text on any page
would either leave mismatched dead space or, in the worst case, overflow the fixed box or collide
with the button.

**Fix:** rebuilt the shared base (both `style.css` and `style-v2.css`, desktop + mobile) as a real
flexbox layout - no fixed height anywhere, title and button as normal flex children (row on desktop
with `justify-content:space-between`, column on mobile), real padding controlling the top/bottom
gap, `align-items:center` keeping the button vertically centered against however many lines the
title wraps to. The button's own icon+text also converted from fixed-box absolute positioning to a
flex row with gap, so it auto-sizes to its own text length too - the exact same fix already applied
successfully to the hero/production CTA buttons on the new Branding & Design page earlier.

**Then went through every page-specific override** (`client-success.css`, `insights.css`,
`insights-details.css`, `branding-design.css`) and removed the now-fully-redundant ~60-100 line
fixed-position re-implementations each one had layered on top of the base - all of that positioning
math is now handled once, correctly, by the shared base. Kept only genuinely real per-page
differences (a wider text-wrap `max-width` some pages need, branding-design's uppercase styling and
larger mobile type size) - reduced roughly 400 lines of hand-tuned, page-specific pixel math down to
about 15.

**Verified, not assumed:** ran an actual stress test on all 7 pages at both 390px/1440px - swapped
the title text to a single word and separately to a ~120-character sentence and re-measured the
box's real height each time. Confirmed genuinely dynamic on every single page/width combination
(shrinks with short text, grows with long text, zero horizontal overflow in any case) - not just "no
longer looks obviously broken." Screenshotted several pages to confirm the result still looks clean,
not just numerically correct. Zero PHP warnings on the WP side after syncing.

**Not touched, flagged separately:** the site-wide fixed-position WhatsApp float button visually
overlapped the pre-footer's own button in one desktop screenshot (Why SOLD) - this is a pre-existing
characteristic of that `position:fixed` button (same on every page, purely a function of scroll
position, unrelated to the pre-footer's height) rather than something this fix caused or should fix.

## ⏳ PENDING (theme zip only, already includes everything below, not yet uploaded) — "Where Great Brands Begin" cards made genuinely dynamic

Client flagged that the 4 cards need to support different-length content on the other 7 service
pages once rebuilt, not just this page's own known text. Mobile previously faked its vertical
spacing with a fixed `min-height` per card pair (197px for cards 1-2, 234px for cards 3-4) tuned
exactly to this page's own copy, rather than real padding - documented at the time as a deliberate
choice to match Figma's paired-height look for *this* content, but it doesn't generalise: a
different page's longer/shorter card text would either float inside a height that doesn't match its
own content, or (for a much longer card) grow past its pair-mate anyway since `min-height` is only a
floor. Desktop already used real padding + grid/flex auto-sizing and needed no change - only mobile
had the hack. Fixed: mobile `.branding-card` now uses real `padding: 20px` on all 4 sides (was `0
20px`, vertical faked via the min-height pairs) with the two `:nth-child` min-height rules removed
entirely - each card now grows or shrinks purely with its own content, with the gap to its border
staying constant regardless of how many lines the text wraps to, on any page. Verified with
Puppeteer at 320/390/430px: zero overflow, screenshotted both breakpoints - consistent-looking
padding, natural varying heights, nothing clipped or misaligned.

## ⏳ PENDING — v1.0.96: Branding & Design rebuilt as a reusable ACF template (theme zip + images zip + SQL)

Branding & Design's new UI (built this session, section-by-section against Figma, both breakpoints)
is now a fully dynamic, reusable WordPress template - `page-service.php` + the "Service Page
Content" ACF Pro field group (`acf-json/group_service_page.json`), styled by
`css/branding-design.css` (kept that filename, but it's the SHARED stylesheet for all 8 service
pages now, not page-specific - see `sold_theme_scripts()`'s enqueue logic in `functions.php`).
Every heading, description, image, icon, and button on the page is ACF-editable with a graceful
fallback if left empty; the gallery image is fully dynamic to any uploaded dimensions/aspect ratio
(no more hardcoded `aspect-ratio` lock) with the surrounding spacing staying identical regardless.
Verified pixel-identical to the static prototype at 390px/1440px, zero PHP warnings, zero console
errors, zero overflow. Full build/audit log in the "Branding & Design page rebuild" section further
down this file.

This is a **three-part deploy**, same shape as the 2026-09-20 batch - do them in this exact order:

| # | What | File | Where |
|---|------|------|-------|
| 1 | Theme code | `theme-code-only.zip` (43 files, `_S_VERSION 1.0.96`) | cPanel File Manager |
| 2 | **New images** | `new-images-v1.0.96.zip` (6 files - extract into `wp-content/themes/sold-theme/`, one level deeper than the theme zip since paths already start at `assets/`) | cPanel File Manager |
| 3 | **SQL** | `deploy/replace-branding-design-page.sql` | phpMyAdmin |

**IMPORTANT, found during this deploy's own pre-check:** the 2026-09-20 removal SQL
(`remove-8-service-pages.sql`) was apparently only ever run **locally**, never on live - live was
still serving the OLD pre-redesign `branding-design` page (ID 18, dated 2026-08-30, byte-identical
to `deploy/backups/2026-09-20-service-pages-removal/service-pages-backup.sql`'s copy of it) when
this was checked directly. **Use `replace-branding-design-page.sql`, not `create-branding-design-
page.sql`** (the latter would create a duplicate page since the old one is still there) - it
removes that one old page (nav-menu-item cleanup, then its postmeta, then the page itself, mirroring
STEP 1+2 of the original removal SQL but scoped to just this slug) and then creates the new one, all
in one script. The other 7 old service pages are deliberately untouched by this - separate decision,
not part of this deploy. STEP 0 inside the script is a dry-run check that must return exactly 1 row
before continuing; if it returns 0 or more than 1, stop and re-verify rather than run it blindly.

**This SQL was tested, not just generated - the full delete-then-recreate sequence, not just the
insert half.** The INSERT portion was generated programmatically from the real local DB state (not
hand-written - the content has apostrophes, `&`, and embedded newlines that are easy to get subtly
wrong by hand). Test run: recreated live's exact old-page row locally (same ID 18, same date, same
content, straight from the backup SQL) to simulate the real live scenario, ran
`replace-branding-design-page.sql` against it fresh, confirmed the old page (ID 18) was completely
gone afterward with zero orphaned postmeta, a new page was created with a fresh ID (686, correctly
different from 18), all 135 postmeta rows present, `_wp_page_template` correctly set, and the page
rendered the real content with zero PHP errors - then cleaned up and restored local via
`deploy/_seed_branding_design_page.php` (kept, safe to re-run, idempotent). Both this script and
`create-branding-design-page.sql` key everything on `post_name`, never a hardcoded ID, and use a
`LAST_INSERT_ID()` session variable (`@sp_page_id`) for the same reason - live's IDs never match
local's, the same lesson the original 2026-09-20 removal SQL already learned.

**functions.php also changed** (included in the theme zip): `sold_body_classes()` now maps all 8
service-page slugs to `branding-page-body` (was a `branding-page-body` / `social-page-body` /
`events-page-body` three-way split from the old, now-superseded design) - so when the other 7 pages
get created in wp-admin later (Page Attributes → Template → "Service Page"), they automatically
pick up the right body class and the shared `branding-design.css` with no further code change.

## ✅ DEPLOYED live 2026-09-22 — v1.0.96/1.0.97, Branding & Design live and working

Ran successfully: theme zip, images zip, then `replace-branding-design-page.sql` (old page ID 18
removed cleanly - 2 old nav-menu items, 150 old postmeta rows, the page itself - then the new page
created at ID 941 with all 135 rows). Verified directly against the live domain afterward: page
returns 200, zero PHP warnings/errors, real content rendering (`Designs That Sell`, `Where Great
Brands Begin`, etc.), correct `branding-page-body` class, all 7 new assets (CSS + 6 images) return
200, `_S_VERSION` serving `1.0.96`. Spot-checked Home/Why SOLD/Services/Client Success/Contact/
Insights - all still 200, unaffected by the shared `functions.php` change.

**Follow-up bug found and fixed same-day, v1.0.97 (theme zip only, no new SQL):** the live nav
dropdown (desktop pill + mobile offcanvas) still showed `href="#"` for "Branding & Design" instead
of the real URL - `sold_removed_service_slugs()` still listed `branding-design` among the 8 inert
slugs, and everything routing through `sold_resolve_link()` (nav dropdown, Home/Services accordion
"Read More") neutralises any of those to `#` regardless of whether a real page exists. That same
list was also being reused (not its original purpose) by `sold_body_classes()` and the CSS-enqueue
logic to mean "which 8 slugs get this design" - a second, different question that must NOT shrink
as pages get rebuilt, unlike the "still 404" list. Split into two functions:
`sold_service_page_slugs()` (all 8, permanent, for body-class/CSS) and `sold_removed_service_slugs()`
(now 7, shrinks as each page comes back - `branding-design` removed from it). Verified locally: nav
dropdown now resolves to the real `/branding-design/` URL, CSS/body-class still correct.

**Separate, non-code gap also found:** the SQL's menu cleanup (correctly) deleted the live
`footer_services` WP menu's old "Branding & Design" item, since it pointed at the now-deleted old
page. That menu wasn't empty otherwise (other items like Events still resolve correctly), so this
is a normal content fix, not a bug - **add "Design & Branding" back to Appearance → Menus →
Footer Services, pointing at `/branding-design/`**, whenever convenient.

**Also defensively fixed in the same v1.0.97 zip:** `footer.php`'s hardcoded 7-link fallback list
(the one that only fires if the footer_services menu is ever completely empty) still hardcoded `#`
for "Design & Branding" - now routes through `sold_resolve_link('/branding-design')` like everything
else, so it self-corrects if that fallback path is ever hit.

## PENDING - v1.0.95: WhatsApp button restructured to be immune to header/content shifts

**Root cause:** the mobile WhatsApp button was never actually a child of `.site-header` - it was a
separate element positioned with hand-copied coordinates meant to visually coincide with the
header's own box. The hamburger button, by contrast, sits inside `.site-header` and inherits its
real position automatically. Any time something shifted the header's actual position (a scroll-state
change, or - as reported live - the malicious warning above pushing body content down), the two
could visibly drift apart.

**Fix:** moved the WhatsApp button markup to be a real child of `<header class="site-header">`
(`template-parts/whatsapp-float.php`'s call moved to just before `</header>` in `header.php`; same
move done in all 14 static prototype pages). Its mobile CSS now uses `position:absolute; top:50%;
right:65px; transform:translateY(-50%)` - relative to the header itself, mirroring the technique
this codebase already used to solve the identical problem for the *tablet* hamburger. One rule now
covers both the header's "tall" and sticky "`.is-compact`" states automatically, so the separate
`body:has(.site-header.is-compact) .whatsapp-float-btn` override (a second hand-maintained set of
coordinates) was deleted entirely - it's structurally unnecessary now, not just harder to break.

**A subtle scoping bug caught before it shipped:** `contact.php`/`contact.html` build their own
standalone page with no `<header>` at all, so they needed the *old* simple fixed-corner behavior
restored via an override. The first attempt scoped that override to a body class - but WP's contact
page (and the static prototype's `contact.html`) both reuse the exact same `home-page-body` class the
real Home page uses, so the unscoped override silently broke the fix on Home too. Caught by
re-testing Home after adding the override, not assumed safe. Fixed by scoping to WP's own
`.page-template-page-contact` class (static prototype: added a dedicated `.contact-page-body` class
to `contact.html`'s `<body>` instead, since it has no WP page template class to key off).

**Verified with Puppeteer** on local WP (`/`, `/why-sold/`, `/contact/`) and the static prototype
(`index.html`, `branding-design.html`, `contact.html`) at 390px: WhatsApp-to-hamburger gap is exactly
12px and both are vertically centered on the same line in both header states (tall: centre 72px,
compact: centre 30px) - not just visually close, numerically identical. Desktop's full pill (with
text) re-confirmed still `position:fixed` to the true viewport, unaffected by the DOM move. Contact
page's button confirmed still hidden by its own pre-existing `contact-modal-overlay.active` rule
(unrelated, not a regression). Zero PHP errors, zero console errors, zero horizontal overflow.
`_S_VERSION` bumped `1.0.94 -> 1.0.95`.

## ✅ CONFIRMED LIVE (checked directly, 2026-09-19) — v1.0.80 theme zip + images + SQL

Checked the live site directly rather than trusting this file's own stale tracking: live serves
`_S_VERSION 1.0.80` (`?ver=` on `style.css`/`why-sold.css`), `newmap.png`/`doublequotes.png` both
return `200`, and `/client-success/` shows the corrected "READY TO WORK WITH THE..." text with
zero occurrences of the old wrong text. **All three parts of the v1.0.80 batch (theme zip, images,
SQL) are live** - this file previously said "nothing pushed to live yet" throughout the whole
v1.0.71-1.0.85 session, which was wrong; the deploy happened outside this conversation and was
never reported back. Trust a live check over this file's own running commentary if they ever
disagree again.

## ✅ CONFIRMED LIVE (checked directly, 2026-09-19) — floating WhatsApp button colour fix

`fix-whatsapp-icon-color.zip` (the floating chat button's `whatsppmob.svg`, dark -> green) was
uploaded and extracted with overwrite. Verified directly: live now serves `fill="#0DC143"` for
that file, zero trace of the old `#263238`. Root cause + details kept below for history.

**Root cause found 2026-09-19, by diffing the actual live file against local, not by guessing:**
live's `wp-content/themes/sold-theme/assets/images/whatsppmob.svg` was a **completely different
file** than local's, sharing only the filename - live had a dark circle (`fill="#263238"`, 34x34
viewBox, mask-based), local had the intended green one (`fill="#0DC143"`, 41x41, clip-path based).
Every past note about this asset (v1.0.70 and this file's own history) assumed it was "already
live from the original migration" since a file of this name already existed - that assumption was
never actually verified against live's real bytes, and was wrong. This file was local-only from
whenever it was last edited/replaced, and `theme-code-only.zip` deliberately never carries
`assets/images/` (see PART 2 Step 1), so it was never shipped until this manual single-file fix.

## ⏳ PENDING — v1.0.81 through v1.0.94 (theme zip + SQL + manual file deletions)

| # | What | File | Where |
|---|------|------|-------|
| 1 | Theme code | `theme-code-only.zip` (rebuild needed, `_S_VERSION 1.0.94`) | cPanel File Manager |
| 2 | **Delete 22 stale theme files by hand** | list in the v1.0.93 section below | cPanel File Manager |
| 3 | **SQL** | `deploy/remove-8-service-pages.sql` | phpMyAdmin |

### v1.0.94 — Footer "Services" column was rendering empty; fixed to show the same 7 links as before

Client-reported: on local WP the footer's Services column shows just the heading with no links
under it (navbar dropdown was fine - shows all 8 services, just can't navigate to them, which is
expected/accepted since the pages are deleted per [[sold-service-pages-removed]]/the 2026-09-20
decision).

**Root cause:** `footer.php` gated the fallback list on `has_nav_menu('footer_services')`, which
only checks whether a menu is *assigned* to that location - not whether it has any items. The
assigned `footer_services` WP menu had all 8 of its items auto-deleted by WordPress along with the
service pages, so the location stayed "assigned" (returns `true`) while `wp_nav_menu()` rendered
nothing (`fallback_cb => false` suppressed even WP's own default fallback). Confirmed by curling
local's homepage before the fix: `<div class="footer-col-services"><h4>Services</h4></div>` -
heading only, zero `<li>` elements.

**Fix:** `footer.php` now checks the actual item count (`wp_get_nav_menu_items()` on the menu
assigned to that location) instead of just `has_nav_menu()`, and falls back to the existing
hardcoded 7-link list (same URLs as before: `/events`, `/branding-design`, `/lead-generation`,
`/social-media-marketing`, `/seo-geo`, `/public-relations`, `/real-estate-websites`) when the menu
is empty. Those links point at the now-deleted pages and will 404 on click, which matches the
already-confirmed client decision to leave the dead links in place elsewhere (Home accordion,
`/services/` grid, nav dropdown) rather than remove them.

Verified on local: re-curled the homepage, footer now renders all 7 `<li>` links again, no PHP
errors/warnings (`debug.log` stays absent). `_S_VERSION` bumped `1.0.93 -> 1.0.94`. **Not yet on
live** - needs the theme zip rebuilt and re-uploaded (`footer.php` + `functions.php` changed,
nothing else) before this shows up there.

### v1.0.94 follow-up (same session) — all 3 places these dead links appear now show "#", not the real URL

Client follow-up right after the fix above: the links should be visible but **must not navigate
anywhere** - clicking should show `#` in the address bar, not the actual (deleted) page's URL. This
affects three spots, all of which previously pointed at the real `/branding-design/`, `/events/`,
etc. paths:

1. **Navbar dropdown** (desktop pill + mobile offcanvas) - was already visible (built from its own
   ACF/fallback array, see v1.0.93 above) but every item actually navigated to a 404.
2. **Footer "Services" column** - the fallback list just re-added in the fix above.
3. **Home + Services hub accordion** "Read More" buttons (`template-parts/services-accordion.php`)
   - these pull `link` from the `global_services_acc` ACF option field, which still had the real
     dead URLs stored in the database from before the pages were removed.

**Fixed centrally, not per-spot:** added `sold_removed_service_slugs()` (the 8 slugs, one place) and
taught `sold_resolve_link()` - the function all three of the above already route through - to return
`"#"` whenever the resolved path matches one of those 8 slugs, regardless of what's stored in ACF or
hardcoded. Since `sold_resolve_link()` is reused for both the desktop and mobile-offcanvas renders
of the primary menu (per the existing comment in `functions.php`), one change covers both. The
footer's hardcoded 7-link fallback (added in the fix above) doesn't call `sold_resolve_link()` -
its hrefs were changed to literal `"#"` directly instead.

The "All Services" / `/services/` link is untouched everywhere - it's the live hub page, not one of
the 8 removed ones.

Verified on local: re-curled `/` and `/services/` - all 8 nav-dropdown items, all 7 footer items,
and all 8 accordion "Read More" buttons on both pages now show `href="#"`; "All Services" still
correctly points at `/services/`. No PHP errors/warnings.

**Also applied to the static HTML prototype** (this repo) - it still has the 8 individual service
`.html` files, so those links previously worked there (unlike live/local WP where they 404). Scoped,
count-verified find-replace across all 14 pages that carry these three sections (`contact.html` has
no header/footer, skipped) rewrote `href="<slug>.html"` to `href="#"` specifically inside
`class="nav-dropdown-item"`, `class="offcanvas-dropdown-item"`, `class="btn-read-more-pill"` (index
+ services only), and the footer's `<li><a href="<slug>.html">` list items - 269 replacements total,
0 remaining afterward. The "All Services"/`services.html` links and every other link on every page
were left untouched.

**Not yet on live for either codebase** - the WP fix needs the same theme zip rebuild as everything
else pending, and the static prototype changes are just local file edits in this repo (nothing to
"deploy" there beyond the usual git push - it's a separate codebase from the WP theme).

### Branding & Design page rebuild started (static prototype only, 2026-09-21)

Client is rebuilding all 8 individual service pages on a new common template (see the 2026-09-20
removal). Work started on `branding-design.html`/`css/branding-design.css` in **this repo only** -
built section by section from a new Figma design (file `GHTvpoM4HvoxzVgNA4ebt6`), matched at both
desktop and mobile breakpoints via `get_design_context`. **Not yet ported to WordPress** - local WP
has no template for this page at all (deleted 2026-09-20), so this is prototype-only until the HTML
build is finished and approved.

**Sections rebuilt so far** (hero through "How We Build Your Brand" - the first 5 of 7 sections):
- Hero: unchanged structure (already matched Figma exactly - title/subtitle/padding were already
  correct), added a new "SPEAK TO AN EXPERT" floating pill CTA that didn't exist before.
- "Where Great Brands Begin": full rebuild. Was 3 plain text points + a side image; now a 2x2
  bordered card grid (4 cards, no image) matching Figma - `.branding-cards-*` classes.
  4th card intentionally still Lorem ipsum (client confirmed real copy comes later). Card 1's
  heading text intentionally differs by breakpoint per client instruction - "Designs That Sell"
  desktop, "Design That Sell" mobile (a genuine wording difference between Figma's own two frames,
  not a bug).
- "Design & Production" (was "Branding & Design Services", 9-item bullet list + image): full
  rebuild into 5 bordered pill rows + a CTA button, no image - `.branding-production-*` +
  the new shared `.branding-pill` component.
- New portfolio gallery section: Figma's own gallery node is just **one flat placeholder screenshot
  image** (same file for both breakpoints, not a real multi-photo grid) - implemented as-is,
  `assets/images/branding-gallery-placeholder.png`, swap in real photos later.
- "How We Build Your Brand" (was a text-list + image layout): full rebuild into the new 4-step
  numbered process (Discover/Define/Design/Deliver) with connecting arrows - `.branding-steps-*`.
  Desktop: 2x2 with arrows only within each row. Mobile: single column, arrows between every step.
  New asset `branding-step-arrow.svg`, reused via an inner `<img>` (not a background-image) so the
  90°-rotated mobile arrow reserves the correct layout footprint instead of overflowing/clipping.
- Also fixed in passing: the pre-footer desktop headline was a generic mismatched string ("READY TO
  WORK WITH THE REAL ESTATE EXPERTS?", copied from another page) - corrected to match this page's
  own Figma copy ("READY TO BUILD A LEADING REAL ESTATE BRAND?"), which mobile already had correct.
- Added Montserrat to the page's Google Fonts (Design & Production's pill text uses it; every other
  font on this page is Mona Sans/Inter, this is a genuine one-off per Figma).

**New shared component:** `.branding-pill` (white bg, orange border, fully rounded) is reused as-is
by both the Design & Production list rows and the step buttons in How We Build - built once instead
of duplicating the same visual three times, matching this codebase's usual anti-duplication habit.

**A real bug caught during this build, not just measured/assumed fixed:** the mobile CSS for the
new pill/CTA/step classes was first written as delta overrides only (assuming inheritance from the
desktop block) - but this file's own established convention is that its mobile `@media` block fully
**redeclares** every property per class rather than relying on cascade from the desktop block above
it (confirmed by checking how the file already treated `.branding-services-circle` etc.). Screenshot
comparison caught it immediately: mobile rendered an unstyled pill icon at full size and a bare link
where the CTA button should be. Fixed by fully redeclaring each new mobile class.

**A second real bug, same root cause as a documented WhatsApp-icon issue elsewhere in this project:**
a `display:none` rule and a `display:flex` rule of equal specificity (`.branding-step-arrow-connector`
vs `.branding-step-arrow`) - the connector's hide rule was declared *before* the flex rule, so at
equal specificity the later rule won and the connector arrow (meant for mobile only) also rendered
on desktop, floating uselessly between the two rows. Fixed by moving the hide rule to after.

**Verified with Puppeteer** at 1440px and 390px: zero horizontal overflow at either width, zero
console/page errors besides the pre-existing harmless `favicon.ico` 404, all 5 rebuilt sections
render matching their Figma screenshots.

**Update 2026-09-22 - sections 6-7 verified, Testimonials confirmed removed, all 7 sections done:**
Pulled the pre-footer CTA banner directly from Figma (`GHTvpoM4HvoxzVgNA4ebt6`, node `2468:6072`,
mobile) - matches the current implementation exactly: same headline ("READY TO BUILD A LEADING REAL
ESTATE BRAND?"), same "SPEAK TO AN EXPERT" pill button, same `#263238` dark background. The desktop
pre-footer CSS (`css/branding-design.css` ~line 1674) already carried precise `px/1440`-derived
values (749/1440 width, 364/1440 button width, etc.) from an earlier pass - consistent with the
verified mobile node, not re-fetched separately. FAQ section has no dedicated Figma node reference in
the CSS (unlike pre-footer) - it correctly inherits this codebase's standard sitewide FAQ component
(`#E9EAEB` background, "Have Questions?" label, 6 items), which is the expected pattern rather than a
gap. Re-verified with Puppeteer at 390px/1440px: zero horizontal overflow, zero real console errors
(only the pre-existing harmless `favicon.ico` 404), full-page screenshots visually match the design
system. **Testimonials section confirmed already removed** (user confirmed 2026-09-22) - not present
in current `branding-design.html`.

**All 7 sections of `branding-design.html` are now complete and Figma-verified on the static
prototype.** Remaining for this page:
- Not linked from live nav yet in a "finished" sense - the footer/nav link to this page was already
  restored to `branding-design.html` (see the earlier "#"-neutralization work), so it's reachable
  right now mid-build in the running prototype.
- Not started: porting this design to a new WordPress PHP template + ACF fields (per project
  convention, local HTML/CSS is finished and verified first, then ported to the WP theme - see
  [[sold-project-shape]]), and the other 7 service pages' own rebuilds.

No image upload needed for this batch - the v1.0.86 footer fix references `sol_whatsapp.png`,
which was already confirmed live (`200`, part of the original bulk image migration) even though no
code referenced it until now.

**Item 2 is not optional and is easy to miss.** Extracting a zip only adds and overwrites files -
it never deletes files that are absent from the archive. The 22 files removed in v1.0.93 are gone
from the zip, so they stay behind on live unless deleted by hand. Leaving them causes no visible
bug (WordPress cannot route to them once the pages are gone) but it leaves the live theme out of
sync with local - exactly the kind of drift that caused the `whatsppmob.svg` incident documented
further down this file.

**Order:** zip first, then the manual deletions, then the SQL last. The SQL is what actually takes
the 8 pages offline, so running it last keeps the window where live has deleted pages but stale
templates as short as possible.

### v1.0.93 — The 8 service pages (01-08) permanently removed, ahead of next week's rebuild

Client is rebuilding all 8 individual service pages on a new common template next week, and asked
for the existing ones to be removed completely in the meantime - live, local, and ACF. Three
explicit choices were confirmed before anything was touched: **permanent deletion** (not trash),
**leave the inbound links alone** (accepting 404s rather than cleaning up the Home accordion,
the /services grid and the nav dropdown), and **delete the theme files too**.

**What the 8 pages were**, with the shared-file trap called out - `branding-design` and
`ai-marketing` do **not** have their own template or field group, they share one:

| # | Slug | Template | ACF group | CSS |
|---|------|----------|-----------|-----|
| 01 | `branding-design` | `page-service.php` (shared) | `group_service_page` (shared) | `branding-design.css` |
| 02 | `events` | `page-events.php` | `group_events_page` | `events.css` |
| 03 | `lead-generation` | `page-lead-generation.php` | `group_lead_generation_page` | `lead-generation.css` |
| 04 | `seo-geo` | `page-seo-geo.php` | `group_seo_geo_page` | `seo-geo.css` |
| 05 | `public-relations` | `page-public-relations.php` | `group_public_relations_page` | `public-relations.css` |
| 06 | `ai-marketing` | `page-service.php` (shared) | `group_service_page` (shared) | `ai-marketing.css` |
| 07 | `social-media-marketing` | `page-social-media-marketing.php` | `group_social_media_marketing_page` | `social-media-marketing.css` |
| 08 | `real-estate-websites` | `page-real-estate-websites.php` | `group_real_estate_websites_page` | `real-estate-websites.css` |

That is 8 pages, **7** templates, **7** ACF groups and **8** CSS files = the 22 files to delete.

**Backups taken first, and they are the only way back** - this was permanent deletion, so there is
no Trash to restore from. Everything is in
`deploy/backups/2026-09-20-service-pages-removal/`:
- `service-pages-backup.sql` - the 8 `wp_posts` rows + all **1062** `wp_postmeta` rows (every ACF
  value: copy, image IDs, settings). Replayable straight back into the database.
- `acf-groups-backup.sql` - the 7 field groups + their **220** `acf-field` rows (**227** total).
- `theme-files/` - byte copies of all 22 deleted files.
- `service-pages-backup.json` - the same page content in readable form, for lifting copy/image
  references into the new template next week without replaying any SQL.

**Local was done through WordPress, not raw SQL** - `wp_delete_post($id, true)`, so WP's own
cleanup hooks removed the postmeta and the nav-menu items automatically. Verified afterwards:
**0** orphaned meta rows, all 8 URLs return `404`, the 6 surviving pages return `200`, and no PHP
errors/warnings on any of them.

**The ACF groups existed in TWO places, which is easy to half-finish.** Deleting the
`acf-json/*.json` files only removes the Local JSON definition - each group *also* exists in the
database as an `acf-field-group` post owning a tree of `acf-field` posts. Deleting only the JSON
would have left all 7 groups still listed in wp-admin. Both were removed. The tree genuinely
nests (every one of these groups has `sub_fields`), so a single "delete direct children" pass
would have orphaned the nested fields - the SQL does repeated passes for this reason.

**`functions.php` deliberately left unchanged.** It still references these 8 slugs in four places
(the dropdown fallback, the per-slug CSS enqueue, the body classes, and the Services admin
screen). None of it breaks: the CSS enqueue is behind a `file_exists()` guard, the `is_page()`
branches simply stop matching, and the admin screen already handles a missing page by printing
*"No page found for slug X"* - which now doubles as a ready-made checklist for next week's
rebuild. Leaving it also honours the "leave the links as-is" decision.

**Known visible side effect, flagged rather than silently fixed: the footer "Services" column is
now empty.** It is driven by a real WP menu (`footer_services`), and WordPress deleted those 8
menu items automatically when their pages went. The location is still assigned, so
`has_nav_menu()` is still `true` and the hardcoded fallback list in `footer.php` does *not* kick
in - the column renders its "Services" heading with nothing under it. This was left as-is because
the alternative (letting the fallback render) would put 8 links to deleted pages back on the live
site, which is worse. Easiest fix if the empty column is unacceptable before the rebuild: unassign
the `footer_services` location, or hide `.footer-col-services`.

**The live SQL was tested, not just written.** `deploy/remove-8-service-pages.sql` was executed
against a throwaway database rebuilt from the two backup files (`_test_live_sql.php` in the backup
folder). That test caught a real bug that would have failed on live: comparing
`wp_postmeta.meta_value` against `CAST(ID AS CHAR)` throws *"Illegal mix of collations"* because
`wp_postmeta` is `utf8mb4_unicode_520_ci` while the connection default is `utf8mb4_general_ci`.
Fixed by casting the other way (`CAST(meta_value AS UNSIGNED)`) so the comparison is numeric and
carries no collation at all. Final run: 8 pages, 1062 page-meta rows, 227 ACF rows and 8 menu
items all removed, **0** orphans, helper tables dropped, **0** errors.

**The SQL is keyed on `post_name`, never on ID** - live's page IDs are not guaranteed to match
local's (local had `branding-design=18`, `events=23`, ...). Slugs are stable across both installs.

**The 22 files to delete by hand on live**, under `wp-content/themes/sold-theme/`:

```
page-service.php                    css/ai-marketing.css
page-events.php                     css/branding-design.css
page-lead-generation.php            css/events.css
page-public-relations.php           css/lead-generation.css
page-real-estate-websites.php       css/public-relations.css
page-seo-geo.php                    css/real-estate-websites.css
page-social-media-marketing.php     css/seo-geo.css
                                    css/social-media-marketing.css

acf-json/group_events_page.json                   acf-json/group_seo_geo_page.json
acf-json/group_lead_generation_page.json          acf-json/group_service_page.json
acf-json/group_public_relations_page.json         acf-json/group_social_media_marketing_page.json
acf-json/group_real_estate_websites_page.json
```

**Not touched, on purpose:** the Services hub page (`services`) and `group_services_hub`; the
static HTML prototype's 8 service pages (the request named live/local/ACF only, and those files
are the closest thing to a design reference for next week's rebuild); `template-parts/` (all four
parts are shared with pages that still exist - `testimonials.php` was the only one these
templates used, and 8+ other pages still use it).

### v1.0.92 — Floating WhatsApp icon: cache-busting added (client reported it still shows dark on some phones/iPhone)

**Checked live directly before assuming anything:** the actual file
(`wp-content/themes/sold-theme/assets/images/whatsppmob.svg`) was already correctly green
(`fill="#0DC143"`) - the v1.0.85 fix from earlier this session held. The real cause was that the
`<img>` tag referencing it (`template-parts/whatsapp-float.php`) had **no cache-busting version
string at all** - just a bare filename. That file was manually overwritten in place at that exact
URL (not shipped via the normal `new-images-*.zip` new-file pattern), so any phone that had already
cached the old dark version before the fix - iOS Safari caches aggressively - had no way to know
the content had changed and kept serving its own cached copy indefinitely, regardless of what the
server now returns. This is a caching gap, not a colour bug.

Fixed by appending `?ver=<_S_VERSION>` to the image URL, the same versioning convention already
used for the theme's enqueued stylesheets. Every future release now automatically busts old
caches for this asset too, not just this one incident.

Verified: confirmed via direct HTTP request that live's file content was already correct
(ruling out a server-side regression) before making this change, then confirmed the rendered URL
locally includes the current version (`whatsppmob.svg?ver=1.0.92`). No JS errors, no horizontal
overflow (390px/1440px).

### v1.0.91 — Mobile header: taller bar, true centre-alignment for logo/WhatsApp/hamburger in both states

Client asked for a slightly taller fixed navbar background and centred logo/WhatsApp/hamburger, in
both the scrolling and sticky states. `.site-header` height `54px -> 60px` (mobile only, no exact
value given - a modest ~11% increase).

**Logo and hamburger needed no changes** - they're plain flex children of `.site-header`'s own
`align-items:center`, which automatically re-centres them in whatever height the bar has. **The
WhatsApp button is the one exception**: it's a separate `position:fixed`/`position:absolute`
element with a manually-calculated `top`, not a flex child of the bar, so its vertical centre had
to be recalculated by hand for both states:
- Scrolling/tall state: centre line moved from 69px to 72px (header top 42px + half of the new
  60px) - `top: 48.5px -> 51.5px`.
- Sticky/compact state: centre line moved from 27px to 30px (half of 60px) -
  `top: 6.5px -> 9.5px`.

Both `css/style.css` and `css/style-v2.css` had the identical structure and needed the identical
fix.

Verified with Puppeteer on both the local WordPress site and the static prototype, before and
after a 400px scroll: header height reads `60px` in both states, and the header's own vertical
centre, the logo's centre, the hamburger's centre, and the WhatsApp button's centre are all
**exactly identical** (`72px`/`30px` respectively) - not just visually close, genuinely centred on
the same line. Screenshotted both states to confirm visually. Full 6-page x 2-breakpoint sweep,
checked after a 400px scroll on each: zero JS errors, zero horizontal overflow.

### v1.0.90 — WhatsApp button: icon-to-text gap reduced, web only

Client asked to reduce the gap between the icon and text a bit more, web only. `gap` on
`.whatsapp-float-btn`: `0.6944cqi` (10px, the original Figma value) -> `0.4166cqi` (6px) - no exact
new number given, reasoned "little more" reduction.

**Bug caught by re-measuring, not assumed fixed on the first edit:** the first pass only changed
the base rule and had **zero visible effect** at 1440px - a separate "tablet floor" rule
(`@media (min-width:768px)`, so it covers desktop too, not just tablet) still had the old
`gap: max(7.5px, 0.6944cqi)`, which sits after the base rule and wins at equal specificity.
Updated that rule too: `max(4.5px, 0.4166cqi)`, keeping the same 75% floor ratio (4.5/6 matches the
original 7.5/10). Both `css/style.css` and `css/style-v2.css` had this same two-rule structure and
needed the same fix.

Verified with Puppeteer on both the local WordPress site and the static prototype: computed `gap`
now reads `~6px` at 1440px (was ~10px) on Home and Client Success, and correctly floors at `4.5px`
at 850px (tablet). Mobile (390px) re-confirmed unaffected - `background: transparent`,
`.whatsapp-float-text` still `display:none` there, so this gap has no visible effect on that
breakpoint regardless of its value. Screenshotted to visually confirm the tighter spacing. Full
6-page x 2-breakpoint sweep: zero JS errors, zero horizontal overflow.

### v1.0.89.1 — Static prototype: WhatsApp button text fixed on 4 pages (no theme change, no deploy needed)

Client asked for the button text to match the reference site's "Any questions? Ask in Whatsapp" -
turned out **live and the WordPress theme already said exactly that** (checked directly), so
nothing needed to change there. Only the **static prototype** had a leftover "Chat with us" on 4
of its 15 pages (`index.html`, `why-sold.html`, `client-success.html`, `contact.html`) - fixed to
match the other 11 pages, the theme, and the reference site. Icon markup was already identical
everywhere; only the visible text differed. Verified against the actual running prototype server
(`localhost:3000`). No theme files changed, so **nothing to deploy** for this specific item -
folded into the v1.0.90 zip incidentally only because it shares a build, not because it needed to.

### v1.0.89 — Floating WhatsApp button: pulse/ripple effect added, web only, matching a reference site

Client pointed at digitalnexa.com's WhatsApp button and asked for the same "wave"/ripple effect on
ours, keeping our own button/text/icon as-is, and explicitly **not** copying that reference's red
"1" notification badge. Inspected the reference site directly (Puppeteer + its live computed
styles/keyframes, not guessed): their `.whatsapp-float` uses `animation: 2s infinite pulse` on
`box-shadow` - an expanding, fading ring, not a static drop-shadow -
`@keyframes pulse { 0% box-shadow:<colour> 0 0 0 0; 70% transparent 0 0 0 15px; 100% transparent
0 0 0 0; }`. Reused that exact keyframe shape on our own `.whatsapp-float-btn`, with our own brand
green (`rgba(13,193,67,...)`, i.e. `#0DC143`) instead of theirs - icon, text, button colour/shape
are all otherwise completely unchanged, and no badge was added.

**Web only**, added to both `css/style.css` and `css/style-v2.css`: the animation lives on the base
(unscoped) `.whatsapp-float-btn` rule, so it applies at every width by default - explicitly
cancelled with `animation: none` inside each file's `@media (max-width:767px)` mobile override
(alongside the pre-existing `box-shadow:none` there), rather than relying on `box-shadow:none`
alone, since an active animation targeting `box-shadow` would keep overriding a static value back
to the ring every 2s regardless.

**Trade-off inherited from the reference site itself, not a bug:** while this animation runs, it
takes over the `box-shadow` property entirely, so the button's existing static Figma drop-shadow
(and its `:hover` variant) have no visible effect for as long as the animation is active - kept
both declarations in place rather than deleting them, so removing the animation later restores the
original static shadow without guesswork.

Verified: fetched the reference site's actual live CSS (computed styles + parsed stylesheet rules,
not visual guesswork) to get the exact keyframe percentages and values before writing any code.
Confirmed on our own site with Puppeteer, both `style.css` and `style-v2.css` pages, desktop
(1440px) and tablet (850px): `animationName: whatsapp-pulse`, `animationDuration: 2s`, no
badge/notification element present. Mobile (390px) re-confirmed: `animationName: none`, background
still transparent (icons-only mode untouched). Sampled the live computed `box-shadow` value at six
points across one animation cycle to confirm it's genuinely interpolating (spread radius growing
toward 15px while opacity fades to 0, then resetting), not just declared and inert. Full 6-page x
2-breakpoint sweep: zero JS errors, zero horizontal overflow.

### v1.0.88 — Mobile header: background removed from the scrolling ("tall") state

Client confirmed v1.0.87's scroll-away-then-sticky behaviour is correct, then asked to remove the
background colour from the state that scrolls (the "tall" one) - matching web exactly, where the
tall header is transparent and only the compact/sticky bar is solid. The v1.0.81 dark `#263238`
fill on the tall state moved to `.site-header.is-compact` instead of being deleted outright (it's
now redeclared there explicitly, since it no longer inherits a background from the transparent
base rule). `border-radius:10px` was left on the tall state even though nothing is visible to
round now - harmless, and avoids losing the value if a background is ever wanted back there.

Verified with Puppeteer on both the local WordPress site and the static prototype:
`backgroundColor` reads `rgba(0,0,0,0)` (transparent) before scrolling, `rgb(38,50,56)` (`#263238`)
after scrolling past 200px - confirmed on both `style.css` and `style-v2.css` pages. Screenshotted
both states (full-page, not clipped - clipped screenshots of a `position:fixed` element at this
viewport size were unreliable in this environment, confirmed harmless/tooling-only after a
full-page capture showed the same content correctly). Full 6-page x 2-breakpoint sweep, checked
after a 400px scroll on each: zero JS errors, zero horizontal overflow.

### v1.0.87 — Mobile header now matches web's scroll-away-then-sticky behaviour

Client-requested: mobile's top bar (logo/WhatsApp/hamburger) should behave like web's header -
scroll away normally at first, then a **second, sticky bar** takes over once scrolled, with its
background running the full width edge-to-edge (matching web's own `.is-compact` bar), keeping the
same logo/icon positioning. Mobile had been `position:fixed` (always pinned) since v1.0.66, per an
explicit client request at the time to keep the whole bar pinned throughout scroll - this reverses
that in favour of the two-state model, now that the client wants mobile to match web exactly.

**Reused, not rebuilt, web's own two-state mechanism.** `js/main.js`/`js/main-v2.js` already
toggle an `.is-compact` class on `.site-header` past 200px scrolled, unconditionally at every
width - only the CSS for `.is-compact` was ever gated to desktop (`min-width:768px`). So no JS
changes were needed, only mobile CSS:

- **`.site-header` (mobile, default/"tall" state):** `position: absolute` (was `fixed`) - scrolls
  away with the page. Everything else (the 16px inset, 10px rounded corners, `#263238` background,
  12px padding from earlier rounds) is unchanged.
- **New `.site-header.is-compact` (mobile):** `position: fixed`, `top/left/right: 0`,
  `width/max-width: 100%`, `border-radius: 0` - edge-to-edge, flush at the very top. Deliberately
  overrides only what needs to change; height/padding/background/flex layout inherit from the base
  rule, which is exactly why the logo and hamburger keep their existing positioning without any
  extra CSS - they're plain flex children centred by the shared `align-items:center`.
- **`.whatsapp-float-btn` (mobile):** same treatment - `position: absolute` by default (was always
  `fixed`), with a new `body:has(.site-header.is-compact) .whatsapp-float-btn` rule (the same
  `:has()` technique already used for the contact-popup hide rule, needed here because this button
  sits *before* `.site-header` in the DOM - a plain sibling selector can't look backward) switching
  it to `fixed` with recalculated coordinates (`top: 6.5px`, `right: calc(12px + 41px + 12px)`) to
  stay centred on and 12px from the new edge-to-edge compact bar, same as before.

**Bug caught by re-measuring after scroll, not assumed fixed on the first try:** the compact bar's
`max-width` was still inherited from the base rule's `calc(100% - 32px)` - `left/right:0` alone
doesn't cancel an inherited `max-width`, so the bar stayed capped at the tall state's narrower
width even while flush left, leaving an unexplained 32px gap on the right and knocking the
hamburger 32px out of position. Added an explicit `width/max-width: 100% !important` override to
fix it.

Verified with Puppeteer on both the local WordPress site and the static prototype, both
`style.css` and `style-v2.css` pages (Home, Client Success), and desktop/tablet re-confirmed
unaffected (1440px/850px, same before/after-scroll behaviour as always): before scroll - header
`position:absolute`, not compact; after scrolling 400px - header `position:fixed`, `is-compact`,
measures exactly `390px` wide (full viewport, not the old capped `358px`) with `left:0`; WhatsApp
button `position:fixed`, `12px` gap to the hamburger (was briefly `-20px`, i.e. overlapping, before
the `max-width` fix). Full 6-page x 2-breakpoint sweep, checked both before and after a 400px
scroll on each: zero JS errors, zero horizontal overflow.

### v1.0.86 — Footer WhatsApp icon: mobile was green, reverted to match web (dark, like the other 3 social icons)

Client-reported: footer social icons on mobile show WhatsApp in **green**, inconsistent with
Facebook/LinkedIn/Instagram (all dark `#263238` circles) and inconsistent with web's own footer,
where all 4 are uniformly dark. Screenshotted both breakpoints to confirm before touching anything
- web was already correct, mobile wasn't.

**Root cause:** `.site-footer .social-whatsapp`'s mobile rule (`css/style.css` AND
`css/style-v2.css`, both had the identical bug) swapped in `content: url("../assets/images/
whatsppmob.svg")` - the **green** icon built for the floating chat button
(`.whatsapp-float-btn`) - instead of a dark-circle variant matching the other three
(`fbmob.svg`/`linkdnmob.svg`/`instamob.svg`, all `#263238`). Found `sol_whatsapp.png` already
sitting in `assets/images/` completely unreferenced by any code in the theme - a pre-existing,
already-correct 34x34 dark-circle asset in exactly the right style, apparently prepared for this
exact spot and never wired up. Swapped both files' `content: url()` to point at it instead.

Verified with Puppeteer on both the local WordPress site and the static prototype: footer
WhatsApp icon renders dark, matching the other three, at 390px - confirmed via screenshot, not
just class inspection (`content: url()` doesn't show up in the `src` attribute, so this needed a
visual check). The floating chat button (top bar) re-confirmed still green, unaffected - separate
selector, separate asset. No JS errors, no horizontal overflow (Home + Client Success,
390px/1440px).

### v1.0.85 — Client Success mobile quote gaps: v1.0.84 reverted

Client asked to revert v1.0.84 (the 33px-above/14px-below swap). Back to v1.0.83's values:
`.cs-card-quote-block` gap **33px -> 14px** (icon-to-description), `.cs-card-right` gap
**14px -> 40px** (description-to-button). Left-alignment untouched throughout.

Full gap history for this one spot: 20/33 (first exact spec) -> 14/40 (v1.0.83, visual-weight
rebalance) -> 33/14 (v1.0.84) -> **14/40 (this round, v1.0.84 reverted)**. Currently live-equivalent
state is v1.0.83's values - if this comes up again, that's the version worth returning to by
default rather than guessing a new split.

Verified with Puppeteer on both the local WordPress site and the static prototype: gaps measure
exactly `14px`/`40px` again, left-edge difference still `0px`. No JS errors, no horizontal overflow
(390px/1440px).

v1.0.83's rebalance (14px above / 40px below) overshot - client found the icon now sat too close
to the description and asked to reverse the two values, with the above gap landed on an explicit
33px this time (not just the swapped 40). Final: `.cs-card-quote-block` gap **14px -> 33px**
(icon-to-description), `.cs-card-right` gap **40px -> 14px** (description-to-button).

Gap history for this one spot, for whoever touches it next: 20/33 (first exact spec) -> 14/40
(visual-weight rebalance) -> **33/14 (this round, reversed + pinned)**. Left-alignment (icon flush
with the description's left edge) untouched throughout.

Verified with Puppeteer on both the local WordPress site and the static prototype: gaps measure
exactly `33px`/`14px`, left-edge difference still `0px`. Desktop re-confirmed unchanged. Screenshotted
to visually confirm. No JS errors, no horizontal overflow (390px/1440px).

Client feedback after seeing v1.0.82 live: the 20px gap above the description "feels like more,"
and the 33px gap below "feels like less." **Verified first, before changing anything:** both
gaps still measured exactly correct via `getBoundingClientRect()` (`20px`/`33px`), and the quote
icon PNG itself has zero internal transparent padding (checked pixel-by-pixel via canvas -
ink fills the full 39x26 box edge-to-edge) - so this isn't a hidden-asset-padding bug like the
one found earlier in this project. It's a visual-weight perception effect instead: a small,
sparse icon graphic above makes its own gap read as more spacious than it measures, while a dense
paragraph of text below makes the same-size gap read as tighter - genuinely correct numbers,
misleading to the eye.

Nudged both to compensate, no new exact numbers given: `.cs-card-quote-block`'s gap **20px -> 14px**
(above), `.cs-card-right`'s gap **33px -> 40px** (below, description-to-button). Left-alignment
(icon flush with the description's own left edge, fixed last round) is untouched.

Verified with Puppeteer on both the local WordPress site and the static prototype: gaps now
measure exactly `14px`/`40px`, left-edge difference still `0px`. Desktop re-confirmed unchanged
(`flex-direction: column`, same as before - a separate rule). Screenshotted to visually confirm
the rebalance. No JS errors, no horizontal overflow (390px/1440px).

**1. Mobile navbar: small corner rounding added.** `.site-header`'s mobile rule (all 3 duplicated
copies, both `css/style.css` and `css/style-v2.css`) got `border-radius: 10px`. No exact value was
given ("not too much curve, little one"), so 10px was chosen as a modest rounding on this 54px-tall
bar - flag for the client to confirm it reads as intended.

**2. Client Success mobile: quote icon left edge aligned exactly to the description's.** Client
feedback: the icon (given an 18px left inset last round, a guessed value) was "positioned slightly
too far to the right" - measured an 18px gap between the icon's left edge and the description's own
left edge before this fix. `.cs-card-quote-icon`'s `margin-left: 18px` removed (`margin: 0`), so
both now share the same left edge - measured `0px` difference. The 20px gap above (icon to
description) and 33px gap below (description to button, `.cs-card-right`'s own gap) are both
unchanged from last round, explicitly reconfirmed rather than assumed still correct.

Verified with Puppeteer on both the local WordPress site and the static prototype: navbar
`border-radius` computes to `10px` on Home; Client Success mobile measures `0px` icon/description
left-edge difference, `20px` gap above, `33px` gap below - all exact. Screenshotted both. Desktop
untouched throughout (separate, unaffected rules). No JS errors, no horizontal overflow
(Home + Client Success, 390px/1440px).

Four separate client requests landed together this round (all mobile only, web untouched throughout):

**1. Mobile top bar background restored.** `.site-header`'s mobile rule had been made
`background: transparent` back in v1.0.67 (client asked for icons-only, no box, at the time).
Client has now asked for it back - restored to `#263238`, the same brand dark the web `.is-compact`
sticky bar already uses. All 3 verbatim-duplicated copies of this rule (a pre-existing pattern in
both `css/style.css` and `css/style-v2.css`) updated together via `replace_all`. Logo/hamburger stay
correctly contained (same flex row, untouched); the WhatsApp icon is a separate `position:fixed`
element whose z-index (9990) sits well above the bar's (100), so it keeps rendering on top of the
new background exactly where it already sat.

**2. Dead WhatsApp "badge" removed - the real cause of "two icons and a black icon".**
Investigated by inspecting the live DOM rather than just the CSS: `template-parts/whatsapp-float.php`
had a leftover `<span class="whatsapp-float-badge" aria-hidden="true">1</span>` with **zero CSS
anywhere in the theme and no JS reference** - completely dead markup, rendering as plain unstyled
black "1" text floating next to the icon. Removed from the theme template and from all 11 static
prototype pages that had the same hand-copied markup (`index.html`, `why-sold.html`,
`client-success.html` and `contact.html` never had it to begin with).

**3. Mobile navbar background extended, equal logo/hamburger padding added.** Before this, the
logo and hamburger sat completely flush against the bar's own edges (measured `0px` gap on both
sides). Outer inset reduced `25px/24px -> 16px/16px` (now symmetric too - it had been 1px off) to
widen the visible background, plus `12px` of internal padding added on both sides so the icons sit
inset from the new edge instead of touching it - verified `12px`/`12px` exactly on both sides.
**Side effect caught by re-measuring, not assumed:** the WhatsApp icon's Figma-exact 12px gap to
the hamburger (a previously fine-tuned, explicitly documented spec) shrank to 8px because the
hamburger moved inward - its position formula updated (`calc(16px + 12px + 41px + 12px)`, was
`calc(24px + 41px + 12px)`) to restore the original 12px gap to the hamburger's new position.

**4. Client Success mobile: quote icon reverted from row back to column, new exact spec.**
Client feedback: the icon and description were appearing on the same line (the v1.0.74 row
layout) but should be stacked, icon above text, like the original v1.0.69 layout. New exact
values this round: `.cs-card-quote-block` back to `flex-direction: column` with `gap: 20px`
(was row/8px); `.cs-card-quote-icon` gets `margin-left: 18px` (was flush at 0); `.cs-card-right`'s
own gap (icon+description block down to the button) changed `57px -> 33px`. Desktop's own column
layout (v1.0.75's exact-alignment spec) is a completely separate rule and untouched - confirmed via
computed style after this change, still `flex-direction: column` with the same `-2.7083vw`
margin/`translateY(-12px)` icon positioning as before.

Verified with Puppeteer on both the local WordPress site and the static prototype: header
background `rgb(38,50,56)` (`#263238`) confirmed on Home and Client Success; badge span confirmed
absent everywhere; logo/hamburger padding measured exactly `12px`/`12px`, WhatsApp-to-hamburger
gap back to `12px`; Client Success mobile measured exactly `column` layout, `18px` icon inset,
`20px` icon-to-description gap, `33px` description-to-button gap - desktop re-confirmed unchanged.
Screenshotted the navbar and the Client Success card to visually confirm. No JS errors, no
horizontal overflow.

**Also investigated this round, not fixed - no reproducible bug found:** a reported "extra
whitespace below the footer on some mobile resolutions." Audited every `100vh` usage across all
14 theme CSS files - every hero section already has the correct mobile-safe `100svh` or
`100vh`+`100dvh` pairing (this codebase's own established fix for the classic mobile
address-bar/dynamic-viewport bug). Also measured actual document height against footer position on
10 pages x 8 real device sizes (320x568 through 430x932) - zero gap found anywhere. No specific
page or device was available to reproduce it further. Needs a screenshot or exact page+device to
pin down if it resurfaces.

### v1.0.80 — Why SOLD mobile map: v1.0.79's crop reverted, zero-crop restored

Client saw v1.0.79's cropped version live and asked for the left side not to be cut, on every
phone resolution, even if that means less height - confirming the trade-off explained beforehand
(same width + taller, with this source image, cannot be zero-crop; client chose zero-crop). Put
the aspect-ratio lock (`aspect-ratio: 2162/1206`, `object-fit: contain`) back in both the general
`.ws-map-container`/`.ws-map-image` rule and the more specific `.ws-about-left .ws-map-container`/
`.ws-map-image` rule that actually wins - i.e. back to exactly v1.0.68's box shape. This guarantees
zero crop at every viewport automatically (the box always matches the image's exact ratio), not
just at whichever widths get tested - a fixed height value can only ever be exactly right at one
width, which is what made v1.0.79's "just a little less height" framing not actually solvable
short of this revert.

Verified with Puppeteer at all 8 of this project's standard mobile widths (320/360/375/390/412/
414/428/430px) on both the local WordPress site and the static prototype: container aspect ratio
matches the image's own 1.7927 within 0.0001 at every single one - not just spot-checked.
Screenshotted at 320px (the smallest, most crop-prone width): the full map renders edge-to-edge,
including the left/Americas edge that v1.0.79 had cropped. Full Why SOLD sweep (390px/1440px): no
JS errors, no horizontal overflow.

**Net effect of v1.0.79+v1.0.80 together: this page is functionally unchanged from before v1.0.79** -
worth knowing if this ever comes up again, so "taller, same width, zero crop" isn't re-attempted a
third time without a wider container or a differently-cropped source image.

### v1.0.79 — Why SOLD mobile map: height increased again, cropping accepted this time

Client asked (again) to make the mobile "About" map taller at the same width. This box had been
deliberately locked to the image's own aspect ratio (`aspect-ratio: 2162/1206`) since v1.0.68
specifically to get **zero** side-cropping, after two earlier attempts (cover-crop, then
letterboxing) were both rejected - documented at length in this file's own comments. Explained the
geometric trade-off to the client before touching anything (same width + taller, with this source
image, is only possible by cropping again) and they confirmed: mobile only, crop is acceptable.

Reverted the aspect-ratio lock back to a fixed height + `object-fit: cover`: `height: 57vw` (was
effectively ~50.1vw at zero-crop, so ~14% taller - no exact number was given, chosen to keep the
crop modest). Crops ~24px off each side at every phone width (box ratio 89.82/57=1.575 vs the
image's own 1.793) - noticeably less aggressive than the ~77px/side crop the very first cover
attempt produced, since this increase is smaller. Both the general `.ws-map-container`/`.ws-map-image`
rule and the more specific `.ws-about-left .ws-map-container`/`.ws-map-image` rule (the one that
actually wins) were updated together, kept in sync as before.

Verified with Puppeteer at 320/390/430px: height now measures `182.4px`/`222.3px`/`245.1px`
respectively (was ~180px/195px/215px at zero-crop), width unchanged at each size, `object-fit`
confirmed `cover`. Screenshotted at 390px: all three flags/pins (UK, UAE, Hong Kong) remain fully
visible and centred - the crop only trims empty ocean space at the left/right edges, not any
content. Desktop/web untouched (separate rule, not asked about this round). Full Why SOLD sweep
(390px/1440px): no JS errors, no horizontal overflow.

**1. Why SOLD, web only: Founder description letter-spacing matched to "Our Vision".** Client asked
for the About and Founder descriptions to match the Our Vision card's (`.ws-info-desc`) letter
spacing. Checked all three by computed style (not just reading the CSS) before touching anything:
**About (`.ws-about-text`) was already `0.01em`, identical to Vision - no change needed there.**
**Founder (`.ws-founder-1 .ws-founder-bio`) was `0.02em`, double the others** - changed to `0.01em`.
This rule lives in the `@media (min-width:768px)` block, so it's web-only already; mobile's own
`.ws-founder-bio` rules only override position/size, never letter-spacing, so mobile needed no
change. Verified: all three now compute to an identical 1%-of-font-size ratio at 1440px.

**2. Home page Insights section: all 3 images now link to the Insights page.** None of the three
cards (1 large + 2 small) had any link at all before this - just static images/text with nowhere
to go. **No existing ACF field held a per-card destination**, so a new `link` text field was added
to each of the three card groups (`large_card`, `small_card_1`, `small_card_2`) in
`acf-json/group_home_page.json` (Local JSON, ships in the zip - no manual ACF import needed on
live), following this codebase's existing `sold_resolve_link()` + relative-path convention (same
pattern as the section's own "Discover Now" button). Each card is now wrapped in an `<a>`,
resolving to its new `link` field, falling back to the Insights hub (`/insights`) if left empty -
there's no real published Insights post matching any of these three cards' placeholder titles, so
a specific-post guess would have been wrong; the client can point each card at the right article
via wp-admin once the field is filled in.

**Real bug caught only by clicking (not by reading the code): the text overlay on each card sits
on TOP of the image and was outside the anchor**, so a click landing on the visible title/excerpt
text (a large fraction of the large card's visible area, and the full mobile-width small cards)
never reached the link at all - it silently hit the overlay div instead. Fixed by nesting the
overlay content **inside** the same `<a>` as the image, for all three cards, rather than wrapping
just the raw `<img>`. Caught by an actual `page.mouse.click()` + navigation check, not by re-reading
the markup - the href was always correct when queried directly, only real clicks exposed that
they didn't fire.

Verified: `document.elementFromPoint()` at the image's own centre now resolves to a descendant of
the card's anchor (not the overlay div) on all three cards, and an actual click at each of those
points navigates to `/insights/` (WordPress) / `insights-details.html` (prototype) - checked on
both the local WordPress site and the static prototype (which got the same anchor restructuring,
using `insights-details.html` as its single static detail-page reference). No JS errors, no
horizontal overflow on a full Home + Why SOLD sweep (390px/1440px).

### v1.0.77 — Web mouse-drag added to Why SOLD wheel + Testimonials carousel + Client Success FAQ colour fix

**1. Why SOLD "What Our Clients Say" wheel: hover-pause + manual mouse-drag, web/desktop.**
Previously the drag-to-spin behaviour (`js/why-sold-scroll.js`) only listened for touch events,
gated to `<992px` (mobile/tablet) - desktop had no way to grab the wheel and no hover-pause at
all. Added: `mouseenter`/`mouseleave` on `.ws-clients-arc-container` toggle a new `isHovering`
flag that `handleScrollRotate()` checks alongside the existing `isDragging` check, so scroll-linked
auto-rotation freezes the instant the cursor enters the wheel and resumes (recalculated
immediately, not waiting for the next scroll event) on `mouseleave`. The touch drag math itself
(`angleFromCentre`, the commit-threshold, the manual-offset carry-over) was refactored into two
shared functions (`startDrag`/`moveDrag`, renamed `angleFromCentre` -> `angleFromPoint` to take
plain coordinates) so `mousedown`/window-level `mousemove`/`mouseup` can drive the exact same state
machine touch already used, rather than a second parallel implementation. `cursor: grab`/`grabbing`
added as an affordance since desktop has no other cue that the wheel is draggable.

**Root cause of a real bug found while verifying this against the live rendering (not just reading
the code): `.ws-client-testimonial`** - the text block sitting in the dead centre of the wheel -
had no `pointer-events` set on desktop/tablet (defaulting to `auto`), silently swallowing every
mouse event aimed at that central area before it ever reached `.ws-clients-arc-container`
underneath. The mobile version of this same rule already had `pointer-events: none` for exactly
this reason; the desktop/tablet rule (two near-duplicate copies, `css/why-sold.css`) just never
got the same treatment. Added `pointer-events: none` to both. Caught via
`document.elementFromPoint()` returning the testimonial `<div>` instead of the arc container at a
point well inside the container's own bounding box - a `mouseenter` listener silently never firing
is invisible unless checked this way, not something reading the CSS/JS would reveal.

**2. Testimonials carousel: manual mouse-drag added, web/desktop.** `js/main.js` and
`js/main-v2.js` (identical fix in both, same reason as v1.0.42's original touch swipe - covers
Home plus every other page with testimonials) got a `mousedown` -> window-level `mousemove`/
`mouseup` handler mirroring the existing touch swipe exactly: resolved only on release against the
same `SWIPE_THRESHOLD`, calling the same `slide()`/`resetAutoScroll()` the buttons and touch swipe
already use, rather than a separate drag animation. `cursor: grab`/`grabbing` added as the same
discoverability affordance as the wheel above.

**3. Client Success FAQ (web only): background colour now matches Services/Why SOLD.**
`.client-success-page-body .faq-section` had `background-color: #F4F5F5 !important` (light grey) -
every other page using this shared section (`css/style-v2.css`'s base `.faq-section` rule) is
white (`#FFFFFF`). Removed the colour override entirely (the unrelated `padding-top` override in
the same rule, added for the Pre-footer/FAQ reorder, stays) so this page now inherits the same
white background instead of duplicating/hardcoding its own. Checked every other FAQ colour
(question text, answer text, border, label bar/text) beforehand - all of them already matched
exactly; the background was the only actual difference. Mobile FAQ was already fully consistent
(transparent section background everywhere) - confirmed, not touched.

**Verified with Puppeteer, all three items:**
- Wheel: hover freezes rotation exactly (measured identical `transform` before/after a scroll while
  hovering), resumes and changes after the cursor leaves, a mouse-drag visibly rotates the wheel
  and holds the new position on release, cursor toggles grab/grabbing correctly - all on desktop
  (1440px). Mobile touch-drag re-confirmed still works unchanged (390px, real touch events via
  Puppeteer's touchscreen API). Logo click-to-swap-testimonial re-confirmed still works (shares
  `dragMoved` state with the new mouse path) - clicking a logo still swaps the centre text.
- Testimonials: a mouse drag-left advances the active dot exactly like a touch swipe would, on both
  a `style.css`/`main.js` page (Home) and a `style-v2.css`/`main-v2.js` page (Events).
- FAQ: `getComputedStyle` background now reads identical white on Services, Why SOLD, Client
  Success and the static prototype's Client Success page.
- Full regression sweep (Home/Why SOLD/Client Success/Events, 390px + 1440px): zero JS console
  errors, zero horizontal overflow.

**1. Testimonials client logos, +15px width, web AND mobile, height/position untouched.** The
real binding constraint turned out to be an **inline `style="max-width: 130px"`** on the `<img>`
in `template-parts/testimonials.php` (shared by all 8 pages that render this section) - not the
`.client-logo`/`.logo-ellington`/`.logo-banyan`/`.logo-regus` CSS classes, which only matter when
their own width is *smaller* than the inline cap (true for `.logo-regus` and the mobile shared
rule, not for `.logo-ellington`/`.logo-banyan` on desktop, which were already being clipped down
to 130px regardless of their own larger class width). Bumped BOTH the inline `max-width`
(130px → 145px) AND every one of the class-based width values (+15px equivalent each, in
`css/style.css` and `css/style-v2.css`, desktop % and mobile px) so the visible result is a clean
+15px on every logo regardless of which constraint happens to bind for that brand/breakpoint.
Height (`79px`), vertical position (`top: 5.8%`) and `object-position` are all untouched. The
static prototype has no such inline style (pure CSS classes only) - its own +15px class edits
alone are sufficient there and were verified separately.

Verified with Puppeteer: measured actual rendered `getBoundingClientRect().width` (not just the
CSS declaration) for every logo, both stylesheets (Home via `style.css`, Events via `style-v2.css`
as a `style-v2` sample), both breakpoints (1440px desktop, 390px mobile), on **both** the local
WordPress site and the static prototype - every logo's rendered width increased by exactly `15px`
from its own prior value (130→145 where max-width bound, 111→126 for `.logo-regus` where the class
width bound instead, 120.18→135.18/135.17 on mobile everywhere). Height and position confirmed
unchanged throughout.

**2. Client Success pre-footer: mobile container height reduced, content untouched.**
`.client-success-page-body .cs-pre-footer` height `424px` → **`350px`** (mobile only). That 424px
was copied from Home's own pre-footer box and left ~132px of empty space below the button (button
bottom edge at 292px: `top:250px + height:42px`). Trimmed to 350px, leaving a ~58px bottom margin
- close to symmetric with the title's own 56.34px top inset, rather than shrinking the box all the
way down to the button's edge. The title and button's own `top` values (and the gap between them)
are completely untouched. Verified with Puppeteer on both sites: container height measures exactly
`350px`, title/button positions identical to before, button's bottom edge (`292px`) comfortably
inside the new height, no clipping, no JS errors.

### v1.0.75 — Client Success WEB quote icon: exact alignment spec (right edge = description's left edge) + 12px up

Client gave an exact spec this round instead of another "a bit more left": the icon's **right
edge** should land exactly on the description's **left edge** (fully outside/left of the text
column, zero overlap), plus sit **~12px higher** than the description, which must not move.

**Horizontal: `margin-left` changed from a guessed `-18px` to `-2.7083vw`** - the exact negative
of the icon's own width (`width: 2.7083vw`). A fixed px guess (as used in the last two rounds)
only lines up at one viewport width; using the icon's own width value as the margin, negated,
cancels it exactly at *any* width, since both scale together. Verified `0px` measured gap between
icon-right and desc-left at both 1440px and 1920px.

**Vertical: `transform: translateY(-12px)` added to the icon**, not a margin/gap change. This flex
column's vertical spacing (icon height + `gap` + description) is what positions the description,
so shrinking the gap or adding negative margin to move the icon up would have also pulled the
description up with it. `transform` is purely visual and doesn't participate in layout flow, so
the icon moves without dragging the description along - confirmed description's `top` is
pixel-identical before and after (`1319.02px` both times at 1440px).

Verified with Puppeteer on both the local WordPress site and the static prototype: icon
right-edge/description left-edge difference is exactly `0px` at 1440px AND 1920px (confirms the
vw-based fix holds at any width, not just one); icon moved up exactly `12px` (`1283.03px` →
`1271.03px`); description position unchanged; mobile re-confirmed completely untouched (still row
layout, `8px` gap, same position as before).

### v1.0.74 — Client Success WEB quote icon nudged further left again

Client asked to move the web quote icon further left again, no exact px given. `.cs-card-quote-icon`
`margin-left` went `-8px` (v1.0.70) -> `-10px` (v1.0.73) -> **`-18px`** now (an 8px step, this
file's usual reasoned small-gap increment) - flagged for the client to confirm this is far enough.
Column layout (icon above text, v1.0.73) and mobile are both otherwise unchanged. Verified via
Puppeteer + screenshot on both the local WordPress site and the static prototype: icon now sits
visibly left of the text block's own left edge on both.

### v1.0.73 — Client Success WEB quote layout: reverted back to column (client correction on v1.0.72)

v1.0.72 changed the web quote layout to a ROW (icon left of text), matching what Figma node
1867:1632's raw box math appeared to show. Client feedback after seeing it live: that put the
icon and text "on the same line", which was not wanted - the actual ask is the ORIGINAL column
layout (icon above the description, as it was before v1.0.72), just with the icon nudged further
left. **Web only - mobile's own row layout (v1.0.69) is untouched, and its description position
was already correct and untouched too.**

`.cs-card-quote-block` (desktop `@media (min-width:768px)` block) back to `flex-direction: column`
with a 10px gap (`0.6944vw`, same value column mode used pre-v1.0.72). `.cs-card-quote-icon`'s
`margin-left` changed from v1.0.70's `-8px` to **`-10px`** (this round's explicit ask - "move the
double quotes slightly to the left, around 10px"). `.cs-card-desc` back to `width:100%` (was
`flex:1` for the row layout, no longer needed).

Verified with Puppeteer: desktop (1440px) confirmed `flex-direction: column`, icon
`margin-left: -10px`, ~10px vertical gap between icon and description, on both the local
WordPress site and the static prototype. Mobile (390px) re-confirmed completely unchanged
(`flex-direction: row`, same position as before) on both sites. Screenshotted the desktop card -
icon above the text again, nudged left, description untouched.

### v1.0.72 — WhatsApp icon/hamburger vertical alignment bug (site-wide, mobile) + Client Success WEB quote layout corrected to match Figma (row, not column) + mobile gap restored

**Site-wide mobile bug found and fixed: WhatsApp icon sat 3.5px above the hamburger's centre
line, identically at every phone width.** Client asked to confirm the WhatsApp icon matches the
hamburger's size and vertical position "in every mobile" - measured both across 320-767px first
(not just one width) and found the *size* already matched exactly (41x41px, both v1.0.70/pre-
existing), but the *vertical position* did not: `.whatsapp-float-btn`'s mobile `top: 45px` was
a leftover from when this button was 48px (pre-v1.0.70) - centering a 48px circle on the
hamburger's 69px centre line needs `top: 45px` (69-48/2), but nobody recalculated it when the box
shrank to 41px to match the hamburger, leaving the button 3.5px too high at every width (constant
offset, not something that only shows at certain sizes). Fixed to `top: 48.5px` (69-41/2, the same
value the hamburger itself uses) in both `css/style.css` and `css/style-v2.css` - confirmed no
other file defines this rule. Verified with Puppeteer at 320/360/375/390/412/414/428/430/767px:
both circles now report an identical `48.5px` top and `69px` centre line at every one.

### v1.0.72 — Client Success WEB quote layout corrected to match Figma (row, not column) + mobile gap restored

Client sent two screenshots this round: a reference render (Figma's own screenshot of node
1867:1632) and a screenshot of the **live/local desktop rendering**, showing the quote icon sitting
**above** the description instead of beside it - visual proof the v1.0.70 "-8px nudge" had patched
the wrong layout (column) rather than switching to the right one (row).

**1. Desktop/web: `.cs-card-quote-block` changed from column to row**, matching the same pattern
already proven correct on mobile and matching Figma node 1867:1632 exactly: icon flush to the left
of the description (`gap: 0`, `flex-shrink:0` on the icon, `flex:1` on the description, replacing
the old `flex-direction:column` + `margin-left:-8px` hack). Verified against both the Figma
reference screenshot and a fresh screenshot of the live rendering - now visually identical.

**2. Mobile: v1.0.71's `gap: 0` was too tight in practice.** That value was extracted correctly
from Figma's raw box math (icon box ends exactly where text starts), but client feedback after
seeing the real device rendering was that the icon and text now visually touch with no
perceptible gap ("double quotes and desc starts in same [place]"). Changed to **8px** - a
reasoned small gap (not a re-measured Figma value, since Figma's own spec is 0), flagged for the
client to confirm it's the right amount. Desktop is unaffected by this value (separate rule, own
`gap: 0`, confirmed still flush in verification below).

Verified with Puppeteer: desktop (1440px) `.cs-card-quote-block` now `flex-direction: row` with a
measured `0px` edge-to-edge gap on both the local WordPress site and the static prototype, matches
the Figma screenshot pixel-for-pixel (side-by-side visual check). Mobile (390px) confirmed row
layout with a measured `8px` gap on both sites. No JS console errors either width, either site.

### v1.0.71 — Client Success mobile: quote icon flush with text (Figma-verified) + pre-footer text/gap fix

**1. Quote-to-description gap, mobile only.** A live Figma connection was set up this session
(OAuth, `plugin:figma:figma` MCP) specifically to stop guessing spacing on this project — first
use of it was re-reading the actual card (node 1867:1632, the "Accelerating Sales..." case study),
not just the isolated icon asset used previously. That card's raw layout shows the quote icon's
own box ends **exactly** where the description column starts (icon `left:590.5 + width:39 =
629.5` vs the text column's own `left:629` — a 0.5px difference, i.e. flush, zero added gap). The
v1.0.69 mobile row layout had guessed **12px** (no Figma access at the time, flagged for
confirmation) — changed to **0**. The visible breathing room in the design between the glyph and
the text comes from transparent padding baked into the icon PNG itself, not a CSS gap - confirmed
by comparing Figma's own rendered screenshot (same asset) against the raw box math. **Mobile
only, scoped exactly as asked** - desktop's existing column layout (icon above text, -8px nudge
from v1.0.70) is untouched.

**2. Client Success mobile pre-footer was showing the wrong headline.** `cs_prefoot_title_mob`
(the ACF field, already existed — no new ACF field was needed) contained the **Home page's**
headline, "READY TO GROW YOUR BUSINESS FROM THE REAL ESTATE EXPERTS?", instead of matching this
page's own desktop headline, "READY TO WORK WITH THE REAL ESTATE EXPERTS?" — almost certainly a
copy-paste mistake when the field was first filled in. Confirmed via direct DB query
(`cs_prefoot_title_desk` vs `cs_prefoot_title_mob` disagreed in wording, not just line-breaks).
Fixed to the same wording, split into the same 3-line mobile pattern already used as this exact
headline's fallback in `page-service.php` ("READY TO WORK<br>WITH THE REAL<br>ESTATE EXPERTS?").
Same bug also exists on **Events** and **Real Estate Websites** pages (different wrong text each,
found while auditing all `*_prefoot_title_mob` values) — **not fixed here, out of scope for this
request**, flagged for a follow-up.

**3. Pre-footer text-to-button gap, mobile only.** `.btn-pre-footer`'s `top` was `305px`, copied
verbatim from Home's mobile pre-footer (whose title is 4 lines). Once the text above is corrected
to its real 3-line headline, that copied position would leave one extra line-height of empty
space before the button. Recalculated from Home's own numbers rather than guessing: Home's title
top (`56.34px`) + 4 lines × `55px` line-height = `276.34px` text bottom, button top `305px` → a
`28.66px` gap. Applying the same gap to Client Success's now-3-line block (`56.34 + 3×55 =
221.34`) gives button `top: 250px` (was 305px, i.e. moved up by exactly one line-height). Verified
live via Puppeteer: rendered gap came out to `32.67px` (close to the target; real font metrics vs.
the line-height arithmetic account for the small difference) — a large improvement over the
~87px gap the wrong 305px value left behind, and visually consistent with the other pre-footer
sections.

Verified with Puppeteer at 390px on both **the local WordPress site and the static prototype**:
quote icon/description now render with `0px` measured gap (`getBoundingClientRect` edge-to-edge,
not just visual eyeballing) on both, row layout confirmed (`flexDirection: row`); mobile headline
text now reads "READY TO WORK WITH THE REAL ESTATE EXPERTS?" identically to desktop on both;
text-to-button gap `32.67px` on both. Desktop (1440px) re-checked and confirmed **unchanged**:
column layout, `-8px` icon nudge intact, desktop headline text intact, no horizontal overflow. No
JS console errors on either site (prototype's one 404 is an unrelated missing `favicon.ico`,
pre-existing, not from this change).

### v1.0.70 — WhatsApp mobile icon swapped to the real asset + Client Success quote nudged -8px (web)

**1. WhatsApp mobile icon replaced.** Client pointed at Figma node 3620:998 (the mobile WhatsApp
button) asking for "the same icon." The button had been using a hand-drawn inline SVG glyph,
recoloured green by guesswork in v1.0.68 since this environment has no Figma access - turns out
a proper, purpose-built icon already existed in the project and was simply never wired up:
`assets/images/whatsppmob.svg` (dark `#263238` circle with the WhatsApp glyph baked into the
artwork itself, file dated mid-July, well before this session - almost certainly part of the
original site migration and therefore **already live**, not a new upload). Swapped it in on
**mobile only**; web/tablet keeps the original hand-drawn glyph inside its green pill, unchanged
- that one was never flagged as wrong and matches its own explicit early Figma spec.

Implementation: both the inline `<svg>` (web/tablet) and a new `<img src=".../whatsppmob.svg">`
(mobile) now sit side by side in the markup (`template-parts/whatsapp-float.php`, and all 15
prototype pages via a scripted, count-verified find-replace), toggled by CSS `display` per
breakpoint rather than swapped server-side, since the same partial renders on every page
regardless of width. New image shown at the full 48px touch target (replaces the old 40px
glyph-only sizing from v1.0.68 - no longer needed now that the icon includes its own circle).

**Bug caught during verification: the mobile hide rule silently failed at first.** A single-class
selector (`.whatsapp-float-icon-svg { display: none }`) has *lower* CSS specificity than the
always-on base rule `.whatsapp-float-icon svg { display: block }` (class+type beats a lone
class), so the base rule won regardless of the media query, and the old glyph kept rendering
underneath the new image. Fixed by matching the base selector's shape exactly plus the new class
(`.whatsapp-float-icon svg.whatsapp-float-icon-svg`), which safely outranks it. Caught by
checking computed `display` directly rather than trusting the CSS "looked right."

**2. Client Success quote icon nudged 8px further left, web only.** Small follow-up to v1.0.69's
positioning fix. `.cs-card-quote-icon` (inside this file's own `@media (min-width:768px)` block,
labelled "Desktop (Web screens)" in its own header comment - there's no separate tablet variant
of this element to split out) got `margin-left: -8px`, a fixed pixel value rather than `vw`-scaled
since it was given as an exact correction, not a proportional Figma value. Mobile's row-layout
version (icon beside the text, from v1.0.69) is a different rule and untouched.

Verified: mobile confirmed showing the new branded icon at 48×48px with the old glyph's computed
`display` genuinely `none` (not just visually covered) on both sites; web/tablet confirmed
unchanged (still the green pill, old glyph visible, new image hidden). Client Success icon
measured at exactly `-8px` margin on all 10 cards, web only - mobile's row layout unaffected.
Full page × width sweep (both sites, 320→1600px) - clean.

### v1.0.69 — Client Success double-quotes: repositioned left of text, mobile only

Client feedback, checked against Figma node 3691:2781 again: the quote icon (added in v1.0.64)
was stacked *above* each card's description paragraph on mobile - Figma has it beside the text,
to its **left**. Desktop was not mentioned and stays as-is (icon above the text there).

`.cs-card-quote-block` on mobile changed from `flex-direction: column` to `row`, so the icon now
sits to the left of the paragraph instead of on top of it, top-aligned with the first line
(`align-items: flex-start`), 12px gap. `.cs-card-desc` needed `flex: 1` added (mobile only) so it
takes the remaining row width after the icon instead of trying to stay 100% wide inside a row and
overflowing past it - a real layout bug this change would have introduced without that line.
`.cs-card-quote-icon` got `flex-shrink: 0` so the row layout can't squeeze it narrower than the
actual image.

**The exact spacing given (716px from the left screen edge, 687px from the right) doesn't apply
directly here.** Every other mobile value already in this file is derived from a 393px-wide
Figma mobile frame (see any `vw` comment nearby, e.g. "18px relative to 393px") - 716 alone
already exceeds that frame's whole width, so those figures are very likely from a different
(desktop, 1440px-wide) frame or view. Rather than risk a wrong translation, used this project's
existing 12px small-gap convention instead. **Flag for the client**: confirm the icon-to-text
gap visually, or give the frame width the 716/687 numbers were measured against so it can be
translated exactly.

Verified on all 10 cards, both sites: icon now sits strictly left of (not above) its own
paragraph, top-aligned, exactly 12px gap - consistent across every card despite their differing
internal layouts (each card has its own custom widths/gaps elsewhere in this file). Desktop
re-checked and confirmed unchanged (icon still above the text there). Full page × width sweep
(both sites, 320→1600px) - clean, no button overlap, no overflow.

### v1.0.68 — WhatsApp icon size fix + Why SOLD map: zero side-cropping

Two follow-ups on v1.0.67, one request later.

**1. WhatsApp icon looked smaller.** v1.0.67 removed the button's 48px green circle background
(icons-only request) but never touched the glyph's own size - it was always 24px, just centred
inside that 48px circle. Once the circle was gone, the bare 24px glyph read as noticeably
smaller, especially next to the hamburger's still-circled 41px presence right beside it. Bumped
to 40px (close to that 41px) on mobile only, so it carries the same visual weight as before -
web/tablet (still has its green pill) is untouched, confirmed still 24px there.

**2. Why SOLD map was visibly cropped on both sides, on every phone.** v1.0.64/65's height
increases (199→224→250px) turned out invisible because `object-fit:contain` was width-bound (see
that finding in the last entry); the fix at the time switched to `object-fit:cover` and bumped
the height further to 281px - which *did* make the map look bigger, but only by scaling the image
up and cropping ~77px off **both** the left and right edges to fit the taller box, on every phone
size (not just small ones - the crop is a fixed proportion of the rendered width regardless of
viewport). Client correctly rejected that trade-off.

**Real fix: `aspect-ratio` instead of a fixed height.** `.ws-map-container` now uses
`aspect-ratio: 2162 / 1206` (the image's own natural dimensions) instead of a `height` value, on
both the general and the `.ws-about-left`-specific mobile rules (kept in sync as before).
`object-fit` reverted to `contain`. With the box's aspect ratio locked to match the image's
exactly, `contain` has nothing left to crop *or* letterbox - the whole map renders edge-to-edge
in the box with zero cropping, self-correcting at every phone width automatically (this also
directly satisfies "fix it in every mobile with cut," since a fixed px/vw pair would have needed
separate tuning per breakpoint where aspect-ratio just works everywhere).

**The honest trade-off, stated plainly:** eliminating the crop means the map is shorter than the
281px cropped version - at 390px it now renders at ~195px (matching almost exactly the very
first height before any of this session's bumps). This is a hard geometric limit, not a
half-fix: given this image's 1.79:1 shape and the ~350px width available on a phone (itself
already near-maximised within the page's existing side margins), **zero-crop and "as tall as the
cropped version" are mutually exclusive** - a taller uncropped map needs either less side margin
or a differently-cropped source image closer to square, not a CSS-only change. Flagged for the
client rather than silently reintroducing either the crop or the letterbox-that-does-nothing.

Verified: icon measured at exactly 40×40px on mobile on both sites, unchanged 24px on web/tablet.
Map's rendered box aspect ratio measured within 0.0002 of the image's exact 1.7927 ratio at
320/360/390/414/430/767px - confirms zero crop at every tested width, not just one. Screenshot at
the smallest (320px) and largest (430px) tested phone widths - full map, uncropped, both sides.
Full page × width sweep (both sites, 320→1600px, scrolled before each check) - clean.

### v1.0.67 — Mobile: icons-only top bar (no backgrounds) + Why SOLD spacing/map fixes

Two unrelated fixes, both mobile-only, both client follow-ups on work from earlier the same day.

**1. Top bar backgrounds removed.** v1.0.66 (below) had just added a solid `#263238` behind the
pinned header and kept the WhatsApp button's green `#0DC143` circle, for legibility over
arbitrary scrolled content. Client asked for neither - just the bare icons (logo, WhatsApp,
hamburger), still pinned, no background box behind any of them. Both rules changed to
`background: transparent` (explicitly, not just deleted, so a future reader doesn't wonder why
it's unset); the WhatsApp button's `box-shadow` was cleared too (a shadow floating around a now
invisible-background icon looked wrong). The hamburger's own orange circle (`#FFA726`) is
untouched - that's a pre-existing, unrelated part of its own design, not something either of the
last two changes added.

**Icon recoloured, not just uncovered.** The WhatsApp glyph's `fill="white"` (set in
`template-parts/whatsapp-float.php`) was designed to sit on the green circle that's now gone -
white on a transparent background would vanish over the site's mostly light sections. Recoloured
to the site's own accent green (`#0DC143`) via a mobile-only CSS rule targeting the SVG `<path>`
(a stylesheet rule overrides an SVG's own presentation attribute automatically, so no markup
change was needed). **Flag for the client to confirm** - no icon color was specified either way,
this just avoids the icon going invisible.

**2. Why SOLD, mobile only, three related fixes in the "About" section:**
- **Get in touch button spacing.** Gap between the description text above it and the button was
  20px; client asked for a little more - now 30px (`.ws-about-text-mobile`'s `margin-bottom`,
  `5.09vw → 7.65vw`).
- **Map height "not increasing" - real cause found.** The v1.0.64/65 height bumps (199→224→250px)
  were genuinely not making the map look any bigger, and here's why: the map's natural aspect
  ratio (2162×1206, ≈1.79:1) is much wider than the box's aspect ratio at any of those heights, so
  `object-fit: contain` (chosen earlier specifically to avoid cropping) was **width-bound** - the
  rendered image stayed a fixed ~195px tall regardless of box height, and every previous "increase"
  just added more invisible white letterbox space above/below it, not a bigger map. Switched back
  to `object-fit: cover` (crops slightly left/right to fill the box instead of letterboxing) so a
  taller box now actually **is** a bigger map. Bumped further to 72vw (~281px, was 64vw/250px) on
  top of that. The crop is minor and lands on the map's outer edges (Americas/Australia) - the
  flags and pins this map exists to show sit in the centre band and stay fully visible.
- **Map-to-cards gap reduced.** Was two stacked 39px margins (the map container's own bottom
  margin plus the info-cards' top margin, ~78px combined) - both halved to 20px each (`5.09vw`),
  ~40px combined now.

Verified: header/WhatsApp/hamburger backgrounds confirmed `rgba(0,0,0,0)` (fully transparent) on
mobile on both sites, web's WhatsApp button confirmed **still green** (unaffected, scoped to the
mobile media query only), icon fill confirmed recoloured. Why SOLD gaps and map size/`object-fit`
measured directly against the values above - exact match. Re-ran the full page × width sweep
(both sites, 320→1600px, scrolled before each check) - clean.

### v1.0.66 — Mobile top bar (logo + WhatsApp + hamburger) pinned throughout scroll

Client request, immediately following v1.0.65 below: on mobile, the whole top group - logo,
WhatsApp button, hamburger - was scrolling away with the page. Ask was to make it **fixed
position on every page, mobile only** (web/tablet untouched - that already has its own separate
`.is-compact` sticky-after-200px-scroll bar, unaffected by this change).

**`.site-header`** on mobile (`@media max-width:767px`) changed from `position:absolute` to
`position:fixed`, plus a new `background: #263238` - the same brand-dark already proven against
this exact logo on the `.is-compact` bar (see that rule's own comment: "this bar has no hero
behind it to stay transparent over, so it is always solid"). The mobile header was previously
*only ever* visible over the hero image; pinning it means it now sits over arbitrary scrolled
content too, and a transparent bar there would be unreadable - the same problem the `.is-compact`
bar already solved for web/tablet, solved here the same way. No border-radius/shadow was added -
kept as a plain rectangle at the existing inset rather than inventing a new look; **flag for the
client to confirm** whether a rounded/shadowed treatment was intended instead, since no spec was
given either way.

This mobile `.site-header` rule is duplicated verbatim 3× in each CSS file (an existing pattern
in this codebase, not something this change introduced) - all 3 were updated together in both
files via a scripted, count-verified (3/3 × 2 files) find-replace, so they can't drift.

**`.whatsapp-float-btn`** on mobile reverted from `position:absolute` (v1.0.65's change, one
request ago) back to `position:fixed` - it's part of the same pinned group now. No coordinate
changes needed either way, for the same reason noted in v1.0.65 below.

Verified by scrolling 1200px on both sites at 390px width: header, logo, WhatsApp button and
hamburger all report **byte-identical** `getBoundingClientRect()` top values before and after
scrolling - true pinning, not just "close enough." Confirmed legible via screenshot over both
the hero photo and plain scrolled content. Re-ran the full page × width sweep (both sites,
320→1600px, this time scrolled 900px before each check specifically to catch pinned-state bugs)
- clean, including hit-testing that the header, WhatsApp button and hamburger are all still
genuinely clickable (not just visually present) after scrolling.

### v1.0.65 — WhatsApp button: mobile scrolled away with the header (superseded by v1.0.66)

**Superseded one request later - see v1.0.66 above for the current, final behaviour.** Kept here
for the record: this made the mobile WhatsApp icon `position:absolute` so it scrolled away with
the page instead of staying `position:fixed` (which is what it had been since v1.0.62). The very
next request asked for the opposite - the whole top bar pinned - so this was reverted along with
the header itself being pinned too. Net effect after both changes: the button ends up back at
`position:fixed`, same as before v1.0.65, just now alongside a `.site-header` that's also fixed
for the first time.

### v1.0.64 — Why SOLD mobile map height + Client Success double-quotes icon

**1. Why SOLD, mobile only: taller map, new image.** Client asked for the "About" section's
map image to use a new asset (`newmap.png`, same 2162×1206 as the old `map-photo.png` — a
redesigned export at identical canvas size, not a different crop) with a bit more height than
before, on mobile only, everything else unchanged. `<img src="…/map-photo.png">` → `newmap.png`
in `template-parts` is a single `<img>` shared by web and mobile (only the CSS differs per
breakpoint), so the swap applies everywhere — harmless since the two files share dimensions.
The height-only change is scoped to the two existing mobile (`max-width:767px`) rules for
`.ws-map-container` — `57vw → 64vw` (224px → 250px at a 390px phone, a ~12% bump, the same
scale as the two prior height increases already on record in this box). Width, margins and
`object-fit:contain` (which is what makes "little more height" safe — it letterboxes instead
of cropping) are untouched, exactly as asked. Desktop/tablet CSS and markup untouched. There
are two `.ws-map-container` mobile rules (a general one and a more specific `!important` one
that's the one that actually wins) — both updated and kept in sync, as before.

**2. Client Success, all 10 case-study cards: double-quotes accent icon.** Figma node
3691:2781 (`doublequotes.png`, 39×26px natural). **No Figma access in this environment**, so
exact position/spacing could not be read off the node — placed top-left, directly above each
card's description paragraph (matching its existing `text-align:left`), sized at its own
natural pixel dimensions mapped straight to `vw` (the same convention every other exact-Figma
value in this file already uses: `39/1440`, `26/1440`). The paragraph is now wrapped in a new
`.cs-card-quote-block` (flex column, 10px gap to the icon) so this new spacing is entirely
separate from the existing, untouched gap to the "FIND OUT MORE" button below — nothing else
in any of the 10 cards moved. **One shared class pair drives all 10 identically** — on the
theme this is a single PHP loop (`page-client-success.php`, `cs_cards` ACF repeater), so one
edit covers every card; the prototype's 10 hand-written HTML blocks were each wrapped the same
way via a scripted, verified-count (10/10) find-replace. **Flag for the client to confirm
against the actual Figma** — this is a reasonable placement, not a measured one.

Verified with a Puppeteer sweep of **both pages × 13 widths (320→1600px) on both the prototype
and the local WordPress site** — map/icon presence, no horizontal overflow, no broken image
`src`, and on Client Success specifically confirmed all 10 icons render, sit above their own
paragraph (never overlapping it or the button), and the `nl2br`-rendered ACF description text
still displays correctly inside the new wrapper. All 52 checks clean. Mirrored byte-identical
into the static prototype (`css/why-sold.css`, `css/client-success.css`,
`assets/images/newmap.png`, `assets/images/doublequotes.png` — both images were only in the
prototype's `assets/` before this pass and have now been copied into the theme too).

### v1.0.62/63 — Floating WhatsApp button, every page (web/tablet + mobile)

v1.0.62 built the first pass (content-sized web pill, icon below the header on mobile).
v1.0.63 is the client's refinement pass on the same feature — fixed 337px web width, icon
moved to the left of the hamburger with an exact 12px gap, plus three bugs the wider size
testing that refinement prompted turned up (tablet legibility, the gap measured to the wrong
element, and the button showing through the contact popup). What follows is the final,
current state after both passes — the two were never shipped separately.

Client request: a floating WhatsApp button on every page — bottom-right on web, matching
gap on tablet, placed near the hamburger on mobile. Figma nodes given: 3620-1009 (the exact
web spec below), 3620-1010 and 3620-1006 (referenced but no values pasted), 3620-998 (mobile,
link only). **This environment has no working Figma access** (no authenticated MCP tool), so
only the explicitly pasted spec values are exact; everything else below is a documented,
screenshot-verified assumption pending the client's visual sign-off against the actual Figma.

**Web (from the pasted spec, node 3620-1009):** fixed bottom-right pill, **337×57px**, 20px side
padding, 10px icon-text gap, 40px border-radius, `#0DC143` background, `6px 8px 13px #0DC14366`
shadow — all exact at the 1440px design width. Inset derived algebraically from the spec's
`left:1078` on a 1440px canvas (`1440 - 1078 - 337 = 25px`) and reused symmetrically for the
bottom inset since none was given. The 337px width is fixed per explicit client instruction
("same width wide we need same"); `box-sizing` is `border-box` site-wide, so the 20px padding
sits inside it and the icon+text group is centred in the remaining space — a longer or shorter
ACF label re-centres rather than resizing the button.

**Tablet — floored, not just scaled.** Every value is a `cqi`, so unfloored the pill shrank to
180×30px with an **8.5px label** at 768px: illegible, and out of step with the rest of the UI,
whose text already floors at 12px. Added a `@media (min-width: 768px)` block using the codebase's
existing `max(<floor>, <cqi>)` house pattern (same one `.nav-link`, `.testi-quote` etc. already
use — its comments even cite the same "8.5px at 768 unfloored" symptom). Floored at **75% of the
1440px design**, the exact ratio the 12px/16px text floor implies, so every value crosses over
together at a 1080px container: fluid from 1440 down to 1080, then held at 252.75×42.75px with a
12px label across the rest of tablet. **This block must stay after the base rule** — same
specificity, so source order decides the winner.

**Mobile (node 3620-998, no values available):** icon-only 48px green circle placed **immediately
left of the hamburger, 12px gap, vertically centred on it** (`top:45px; right:calc(24px + 41px +
12px)`). Built from the mobile header's own geometry, which is constant at every phone width: the
header pill is inset 24px from the right and the 41px hamburger is flush to that edge, with its
centre line 69px from the top. **The 12px is measured to the hamburger's 41px button box, not to
the 24px SVG inside it** — the button paints a filled orange circle, so the box *is* its visible
shape; measuring to the SVG leaves a 3.5px gap on screen (see the bugs below — this was caught
exactly that way). Placement reasoned + screenshot-verified, not read from Figma.

**Known open question for the client:** the green circle is 48px while the hamburger beside it is
41px, so the WhatsApp icon reads slightly larger. Left as-is because no size change was requested;
if Figma has them matched, it's a one-value change (`width`/`height` → 41px, and the `right` calc
needs no edit).

**Content/wiring:** reuses the existing `social_whatsapp` ACF field (same one the footer's
WhatsApp icon already uses) for the link, so there's one place in wp-admin to update the number
— falls back to `contact_phone`, then the site-wide `+971 58 593 1979`, exactly like the footer
does. Button label uses a new ACF field, `whatsapp_button_text` (fallback "Chat with us"), added
to `group_global_settings.json` (Local JSON, ships in the zip — no manual ACF import needed on
live). New markup lives in `template-parts/whatsapp-float.php`, included from `header.php` (every
page that calls `get_header()`) and separately from `page-contact.php` (a standalone modal-host
page with no header/footer include) — confirmed the contact popup's AJAX fetch in
`js/contact-modal.js` only pulls `#contactModal` out of that response, so the button markup added
there does not get duplicated onto other pages.

**Four bugs found + fixed during build:**
1. The mobile `@media (max-width:767px)` override resized the button to 48×48px but didn't reset
   `border-radius`, so it inherited the base rule's cqi radius — ~11px at phone widths, rendering
   a rounded square instead of a circle. Fixed with an explicit `border-radius: 50%`.
2. Tablet legibility (the 8.5px label described above).
3. The 12px mobile gap was first measured to the hamburger's 24px SVG, which left only 3.5px of
   visible space between the two circles. Caught by looking at a screenshot rather than trusting
   the numbers — the measurement said "12px" and was technically true of the wrong element.
4. **The button showed through the contact popup, dimmed and unclickable.** The popup overlay is
   z-index 9999 with a 50% black backdrop; the button is 9990, so it sat *behind* the backdrop —
   visibly greyed out and dead to clicks, on `/contact/` at every width and on any page the moment
   the popup was opened. Fixed with `body:has(.contact-modal-overlay.active) .whatsapp-float-btn
   { display: none }`, which hides it for as long as the popup is open and brings it straight back
   on close. Raising its z-index above the overlay was rejected: on phones the popup card fills the
   screen and the button would land on top of the popup's own close button. The mobile drawer needs
   no equivalent rule — it's an opaque full-screen panel at z-index 99999 and already covers the
   button. `:has()` is safe here; this stylesheet is already built on container-query units, which
   ship in the same browser versions.

**Note on scroll behaviour (mobile) — superseded by v1.0.65 above.** This was originally kept
`position:fixed` deliberately (a chat CTA that disappears after one scroll seemed worth avoiding).
The client asked for it to scroll away instead, so as of v1.0.65 it's `position:absolute` on
mobile and scrolls off with the header, as described above. Web/tablet is unaffected either way -
still always-visible `position:fixed` there.

Verified with a Puppeteer sweep of **every page × 13 widths (320→1600px) on both the prototype and
the local WordPress site** — presence, exact geometry, click hit-testing, hamburger/logo overlap,
horizontal page overflow and JS console errors — all clean. Also opened and closed the contact
popup on both sites at desktop and mobile widths to confirm the button hides/reappears correctly
(WordPress needs its AJAX-fetched modal markup to finish loading before the trigger works — the
first automated check clicked too early and hit that fallback-to-real-navigation path by design,
not a bug; re-checked after waiting for the fetch and it passed). Mirrored byte-identical into the
static prototype's `css/style.css`/`css/style-v2.css`, with the equivalent hand-written markup
(same fallback link/text, since the prototype has no PHP/ACF) on all 15 real HTML pages
(`temp.html` excluded, not a live page).

### v1.0.61 — Compact Navbar: spacing arrayed to match tall header exactly

Client request: the compact sticky navbar (which appears when scrolling) needed the same internal spacing between items as the main tall header.
- **Nav pill height**: 53px (was 40px)
- **Nav pill internal padding**: 48px on left/right edges (prevents Home/Insights from touching the border)
- **Nav link gap**: 63px (was 40px)
- **CTA button height**: 53px (was 40px)
- **CTA button font size**: 16px (was 14px)
- The logo remained appropriately scaled, but increased to **115x65px** for better prominence in the new bar layout.
Verified with Puppeteer measurement scripts: all spacing aligns exactly with the main tall header (`.is-compact` rules are fully matched for Web spacing constraints).

### v1.0.60 — Header: back to scroll-away, plus a new compact sticky bar (web + tablet)

Client request: the header had been made `position:fixed` throughout since
v1.0.58 (always pinned, dark backdrop once scrolled). Ask was to go back to
the *original* behaviour — header scrolls away with the page like it used
to — but once scrolled further, a **new, smaller, compact** sticky bar should
take over at the top instead of leaving nothing pinned. **Web + tablet
only**; mobile keeps its own separate floating-pill header, untouched.

**Same `.site-header` element, two states, one class toggle** — no second
header was added to the markup:

- **Tall state (default):** `.site-header` is `position: absolute` again —
  literally the pre-v1.0.58 rule, confirmed against git history. It scrolls
  away with the page exactly like it did before that change, no JS involved.
- **Compact state (`.is-compact`):** added by `js/main.js` / `js/main-v2.js`
  once `window.scrollY > 200` (clears the 144px tall header, then a bit
  more — replaces the old `SCROLL_THRESHOLD = 10` background-only toggle).
  `position: fixed`, height **72px — exactly half the tall header's 144px**,
  solid `#263238` backdrop (always, no hero behind it to stay transparent
  over). New `@media (min-width: 768px)` block in both `css/style.css` and
  `css/style-v2.css` — identical rules, same offset as the header block
  always has between the two files.

**Compact web (992px+):** logo, centred nav pill, Book a Call button, all
reset from the tall header's absolute-positioned Figma math to a plain flex
row (same technique the mobile override already uses for its own layout) —
logo 70×40px, nav pill 40px tall with 40px gaps, 14px nav labels (down from
16px), button padded rather than fixed-width now that its label is smaller.

**Compact tablet (768–991px):** kept exactly as today — logo + hamburger,
nav pill and CTA stay hidden. That's a deliberate call, not an oversight:
the codebase already has a comment explaining the full nav doesn't fit at
this width even shrunk to ~8.5px text without colliding with the button. The
existing `@container (min-width:768px) and (max-width:991px)` block (hides
`.header-nav`/`.header-cta`, repositions the burger) was left completely
untouched — the burger's `top:50%` + `translateY(-50%)` self-centres against
whatever height `.site-header` currently has, so it re-centres correctly in
the shorter compact bar with no changes needed there.

**Verified** at 1440 / 992 / 900 / 768px (web + tablet) and 390px (mobile,
confirming no effect) on the local WP site: tall header present + transparent
at the top of the page, fully scrolled out of view at a partial scroll
(150px), compact bar appears fixed past the 200px threshold with the dark
backdrop, and scrolling back to the top reverts cleanly. Also checked on a
`style-v2.css` page (Services) and confirmed identical behaviour — both
stylesheets patched with the same rules. Contact page correctly has no
header at all (it's a standalone modal page, by design, unrelated to this
change). No JS errors at any width.

---

### v1.0.59 — Why SOLD client logo wheel: grab-and-spin by finger (mobile + tablet)

Client request: on the "What Our Clients Say" section the logo wheel rotates by
itself, which is fine — but putting a finger on it should stop that, let the
user turn it by hand, and let the automatic rotation resume on release.
**Mobile and tablet only.**

How that section actually works (worth knowing before touching it again): the
rotation is **scroll-linked, not on a timer**. `handleScrollRotate()` in
`js/why-sold-scroll.js` maps how far the section has travelled through the
viewport onto an angle, and `updateRotation()` eases the wheel toward it. There
is no interval to pause — "stop the automatic rotation" means stopping the page
from scrolling under the finger, and ignoring scroll while a drag is live.

What was added, all in `js/why-sold-scroll.js` (+ one CSS rule):

- **Pause while touched.** `handleScrollRotate()` returns immediately while a
  drag is in progress, and `updateRotation()` drops its eased rAF loop, so the
  finger is the only thing driving the wheel.
- **Drag to rotate.** Angular, not linear: the touch point's angle around the
  wheel's own `transform-origin` is tracked, so the logos follow the finger the
  way a real wheel would. The origin is located by reading the container's box
  with its transform momentarily off — `getBoundingClientRect()` otherwise
  reports the *rotated* box, which moves as the wheel turns. The delta is
  normalised to ±180° so crossing the atan2 seam cannot fling it a whole turn.
- **Resume without snap-back.** The amount the user turned it is kept as
  `manualOffset` and added to the scroll-derived angle, so on release the wheel
  stays where they put it and carries on from there as the page scrolls —
  rather than jumping back to the scroll position.
- **Rotate vs page-scroll.** The gesture is classified after 6px of movement:
  mostly-horizontal spins the wheel (and `preventDefault()`s so the page stays
  still), mostly-vertical is handed straight back to the browser as a normal
  page scroll. Same rule the testimonials/Our Team carousels in this file
  already use.
- **Drag no longer counts as a click.** A logo tap swaps the testimonial text;
  without a guard, ending a drag on a logo fired that too. A `dragMoved` flag
  swallows the synthetic click.
- **CSS**: one new `@media (max-width: 991px)` rule in `css/why-sold.css` setting
  `touch-action: pan-y` on `.ws-clients-arc-container`, so vertical page scroll
  stays native/smooth while horizontal gestures are delivered to JS.

Gated on `window.innerWidth < 992` — the same mobile/tablet cut-off the arc
maths in that file already uses. **Desktop is untouched** and still purely
scroll-driven.

**Verified** at 320 / 360 / 390 / 430 / 768 / 991 / 1440px on the local WP site
with simulated touch: drag rotates the wheel, the page stays frozen while
dragging, no snap-back on release, automatic rotation resumes afterwards,
vertical drags still scroll the page, a tap still switches the testimonial and a
drag no longer does, no JS errors at any width. Desktop confirmed unchanged.

> **Measurement note for anyone re-testing this:** the Why SOLD page keeps
> growing for ~1.5s after load (scrollY drifts 0 → 4716 → 7054 → 7440 at 768px),
> so any scroll-related assertion taken too early reads as a false failure. Wait
> for `scrollHeight` **and** `scrollY` to go stable before measuring.

### v1.0.59 — tablet (768–991px) client wheel: now uses the web arc (pre-existing bug, fixed)

Found while building the drag. Between **768px and 991px the logo wheel was laid
out wrongly** — on local *and on live* (both screenshotted before anything was
changed, so it was not caused by this work). Only 4–5 of the logos were on
screen, they did not form an arc, and they drifted over the section label.

**Cause: the two files disagreed about where mobile ends.**

| | Mobile/web split |
|---|---|
| `css/why-sold.css` | **767 / 768px** |
| `js/why-sold-scroll.js` (arc maths) | **992px** |

So 768–991px got the **web CSS** (cqi-sized container, cqi `transform-origin`)
combined with the **mobile JS** logo positions (vw-based) — two coordinate
systems that do not agree, which is why the circle fell apart.

**Fix:** the JS arc breakpoint moved 992 → **768**, so tablet now draws the same
wide web arc the CSS is already sized for. It is a single named constant,
`ARC_WEB_MIN_WIDTH`, with a comment saying it must track the CSS split — the
old code repeated the bare number `992` in five places, which is how the two
drifted apart in the first place. The scroll sweep (`rotationRange` /
`rotationOffset`) follows the same constant, so tablet gets the web sweep too.

> **Do not "tidy" `ARC_WEB_MIN_WIDTH` (768) and `MANUAL_MAX_WIDTH` (992) into one
> number.** They deliberately differ: the first picks which arc *layout* to draw
> (tablet uses the web arc), the second picks which viewports get *touch*
> dragging (tablet does). They answer different questions.

Result at tablet: **18 logos, a proper circle, nothing hanging off the sides**,
and logo size now scales smoothly across the old seam (768→91→991→1024px reads
76→89→98→101px — previously it jumped, which was the giveaway).

### Drag response, measured

Degrees the wheel turns for an 80px horizontal swipe, sampled at every grabbable
logo around the ring, **on a freshly loaded page per sample** (rotation
accumulates otherwise and the numbers go nonsense — an earlier run showing 0° and
58° was that artifact, not a real defect):

| Width | Range across the wheel | Best (top of the ring) | Theoretical max |
|---|---|---|---|
| 390px (mobile) | 8.0–23.2° | 23.2° | 23.6° |
| 768px (tablet) | 1.4–15.9° | 15.9° | 16.5° |
| 900px (tablet) | 1.3–13.5° | 13.5° | 14.0° |
| 991px (tablet) | 1.2–12.4° | 12.4° | 12.7° |

At the top of the ring the response sits within ~0.5° of the geometric maximum,
i.e. essentially perfect. It falls off near the 3 and 9 o'clock positions
because a horizontal swipe there is **radial** — pulling a wheel toward its hub
does not spin it. That is correct behaviour for angular dragging, not a bug, and
it is the reason the response is gentler on tablet than on a phone: the tablet
arc has a much larger radius (283–365px vs 200px), so the same finger travel
subtends a smaller angle.

---

---

### What shipped in this batch (v1.0.34 → 1.0.58)

Reference only — all of the below is now live.

### v1.0.58 — sticky navbar: brand colour + vertical centring (web + tablet)

- **Colour**: the scrolled backdrop was `rgba(27,30,33,0.92)` (a near-black).
  Now the solid brand dark **`#263238`**, matching the pre-footer and footer.
  The `backdrop-filter: blur(8px)` went with it — it was a no-op behind an
  opaque fill and only cost GPU.

### v1.0.58 — sticky navbar: brand colour + vertical centring (web + tablet)

- **Colour**: the scrolled backdrop was `rgba(27,30,33,0.92)` (a near-black).
  Now the solid brand dark **`#263238`**, matching the pre-footer and footer.
  The `backdrop-filter: blur(8px)` went with it — it was a no-op behind an
  opaque fill and only cost GPU.
- **Vertical centring**: the logo, nav pill and Book a Call button all sat low
  in the bar, the logo's bottom edge flush against it. Cause: the bar was
  `height: 7.8472cqi` (113px), which is exactly `logo top (31px) + logo height
  (82px)` — it stopped at the logo's bottom, leaving 31px of dead space above
  and 0 below. All three elements already share a centre line at **72px**, so
  the fix was purely the bar: `31 + 82 + 31 = 144px` (`height: 10cqi`) puts
  the bar's own centre on 72px too. **No element moved** — every Figma
  position is untouched, only the backdrop grew downward.
  Verified: bar centre / logo centre / nav centre / button centre all read
  exactly `72` on Home, Services and Why SOLD at 1440px.
- **Tablet bug found and fixed along the way** (768–991px): `.mobile-menu-btn`
  was `position: relative` in normal flow, which parked it at the header's
  top-left corner — clipped by the top edge *and* sitting on top of the SOLD
  logo. (Pre-existing; the taller bar just made it obvious.) Now absolutely
  positioned like every other header child: pinned right at the same
  `2.7777cqi` (40px) inset `.header-cta` uses, `top:50%` +
  `translateY(-50%)`. Verified at 768/900/991px — bar, logo and burger now
  share one centre line, burger right-aligned, zero overlap. The four `<=767px`
  copies of that rule were deliberately **not** touched (mobile keeps its own
  flex pill layout) — patched by line number to avoid hitting them.

| # | What | File | Where |
|---|------|------|-------|
| 1 | Theme code | `theme-code-only.zip` | File Manager |
| 2 | Contact page content | `fix_contact_figma.sql` | phpMyAdmin |
| 3 | Clear bare `http://` CTA links | `fix_bare_http_links.sql` | phpMyAdmin |

Run the zip first, then the SQL files (the SQL fills a field the new template reads).

### Pre-deploy verification (2026-09-17, before shipping the day's work)

Everything below was checked against the local build, and the two SQL files
were checked against the **live** site to confirm they are still needed:

- **PHP**: every template + template-part lints clean.
- **JS**: all 6 theme JS files pass `node --check`.
- **Full page audit** — 15 pages x 3 breakpoints (desktop 1440 / tablet 768 /
  mobile 390): **no JS errors, no 4xx/5xx assets, no horizontal overflow,
  header+footer present on every page.** The only flags were "no header/
  footer" on `/contact/` — that page is a standalone full-screen modal and
  deliberately calls neither `get_header()` nor `get_footer()`, so it is
  correct, not a break.
- **Prototype sync**: every shared `css/*.css` and `js/*.js` byte-identical
  between theme and prototype. `js/contact-modal.js` differs by design only
  (theme uses the WP-localized `SoldContact.contactUrl`, prototype fetches
  `contact.html`) — diffed line by line, every actual fix is present in both.
- **Zip**: 61 files, every path prefixed `sold-theme/`, zero `assets/images`
  leakage, contents diffed against the live theme dir (only the excluded
  `assets/` and an empty, unreferenced `inc/` differ).
- **SQL safety**: neither pending file writes an image/attachment ID (the
  project's standing cross-environment gotcha), both look the page up by
  **slug** not ID, both are delete-then-insert so they are re-runnable. All
  four ACF field keys they reference (`field_contact_services`,
  `field_contact_service_label`, `field_contact_service_default`,
  `field_contact_address_2`) exist in `acf-json/group_contact_page.json`, so
  the values land as editable fields rather than orphaned meta.
- **Still-needed check against live**: `/contact/` on live returns 0 matches
  for the second address, and the live home page still serves exactly one
  `href="http://"` — so both pending SQL files are genuinely still required.
- **Older SQL files resolved**: memory flagged `fix_headings_orange.sql`,
  `fix_faq_content.sql` and `fix_about_cards.sql` as "never confirmed run on
  live". Compared live vs local page content directly: live already serves
  the orange "Industry Leading / Marketing Services" hero, the imported FAQ
  answers, and the real About-card copy. **All three are already applied —
  they do not need running again** (they are re-runnable, so running them
  would be harmless, just unnecessary).

### ACF gap found and fixed during this check

`ws_about` had a `btn_link` but **no `btn_text`**, so the About section's
"Get in touch" label was hardcoded in `page-why-sold.php` — which mattered
more after v1.0.45 made that button visible on mobile too. The Founders
card had the identical gap. Added two fields to
`acf-json/group_why_sold_page.json` (`modified` bumped so ACF re-syncs):

| Field | Key | Where it appears |
|---|---|---|
| `ws_about.btn_text` | `field_wsa_bt` | About section "Get in touch" button |
| `ws_founders.btn_text` | `field_wsf_bt` | Each founder card's "Get in touch" button |

Both templates now use the house `!empty($x) ? $x : '<original>'` pattern, so
an empty field renders exactly as before. Verified ACF registers both keys
(`acf_get_fields`) and that both buttons still render "Get in touch" on
desktop and mobile with no JS errors. **No ACF import step is needed on live**
— Local JSON ships inside the theme zip and registers itself.

**v1.0.56 — services accordion expanded photo: was fixed-width, now fills
its card at every mobile size (Home + Services).** `.service-list-item.active
.service-image-strip` was a hardcoded `width: 336px`, which only happened to
match the card's actual content width at one specific phone size - measured
it precisely: at 320-390px wide the image was actually **wider** than its
own card and overflowed past the right edge; at 414-430px the card was wider
than the image, leaving an uneven 20-36px gap on the right only (it's
left-aligned, `margin:0`), never centered, never edge-to-edge either way.
Changed to `width: 100%` in both `css/style.css` (Home) and `css/style-v2.css`
(Services) - now matches the card exactly regardless of phone width, instead
of matching it only by coincidence at one size.

Verified 0px gap on both left and right edges at all 6 widths tested
(320/360/375/390/414/430) on both pages - was overflowing by up to 74px on
one side or leaving up to 36px on the other before. Screenshotted the fix.
Desktop untouched (its own cqi-scaled width, a completely separate rule
outside this mobile media query). Mirrored into the prototype's `css/style.css`
/ `css/style-v2.css`, re-verified against the user's `localhost:3000` server.

**Founder bio font (Why SOLD, web) - checked, already correct, no change
made.** User asked for Inter/400/22px/25px-line-height/2%-letter-spacing/
529x100. Measured the live computed style directly (not just the CSS source)
and every value already matches exactly, including confirming the Inter 400
font file is actually `loaded` in the browser (`document.fonts`), not just
requested. The rule that applies (`.ws-founder-1 .ws-founder-bio`, more
specific than the base `.ws-founder-bio` which uses Mona Sans) already reads
`font-family: 'Inter', sans-serif` - "sans-serif" there is the CSS fallback
keyword, not what's rendering. No local file changed. If this still looks
like Mona Sans/a serif-ish font on the client's end, it's almost certainly
either the live site (nothing from this whole session has been deployed
there yet) or a stale browser cache - not a code issue.

**v1.0.55 — mobile contact modal made height-responsive (follow-up to
v1.0.54).** v1.0.54's spacing was tuned tight enough to fit the *shortest*
phone tested (320x568) without scrolling - correct there, but it applied
those same tiny fixed values on every phone, including ones with 250px+ of
completely unused spare room (844-932px viewports), which just looked
needlessly cramped everywhere.

Added two extra tiers in `css/contact.css`, layered after the base mobile
block so they win by cascade order (all plain declarations, no `!important`
conflicts to fight): `@media (max-width: 767px) and (min-height: 620px)`
(moderate) and `@media (max-width: 767px) and (min-height: 780px)` (back to
the original Figma spacing in full - `.contact-modal-right` padding, the
header's gap/margin, `.form-row.message-row` and `.btn-send-message`
margin-top, and the Message textarea height). The 12px field-to-field gap
(the client's explicit fixed request) is deliberately left alone in every
tier - only the *other* spacing grows with available height.

Verified: card height now scales 552px → 593px → 624px across the three
tiers, confirmed at both tier boundaries (620px and 780px, and 1px on each
side of them) with no overflow at any of them, and re-confirmed all 8 of
this project's standard mobile test sizes still fit with zero scrolling.
Screenshotted the smallest (320x568) and tallest (390x844) tiers side by
side - the taller one visibly uses the extra room instead of floating a
tiny card in a mostly-empty screen. Re-verified against the user's own
`localhost:3000` dev server. Mirrored into the prototype's `css/contact.css`.

**v1.0.54 — Contact page: web address gap widened, mobile modal shrunk to
guarantee no scrolling on any tested phone.**

1. **Web only:** `.contact-address-stack` gap 11px (Figma-exact) → 18px -
   client feedback that the Figma value read too tight in practice.
2. **Mobile only, input field gap:** was effectively 22px (12px flex `gap` +
   a deliberate 10px `margin-bottom` added earlier to clear a validation
   tooltip - see the comment history in `css/contact.css`). Client asked for
   exactly 12px - removed the extra margin so fields now rely on the flex
   gap alone. Trade-off: slightly less tooltip clearance than before; still
   legible, just tighter (flagging this since it reverses a deliberate past
   fix).
3. **Mobile only, whole-modal viewport fit.** The 12px-only field gap
   request, on its own, would have made the card 66px shorter - not enough
   to guarantee no scrolling at the smallest size this project tests
   (320x568, iPhone SE), which was already overflowing *before* this change
   (674px card vs 568px viewport). Trimmed several more spacing values,
   smallest/least-visible first, iterating with real measurements after each
   round rather than guessing the total up front:
   - `.contact-modal-overlay` padding: 16px → 6px
   - `.contact-modal-right` padding: `38px 20px 20px` → `28px 20px 14px`
     (close button at `top:26px` still clears the header row)
   - `.mobile-contact-header` gap 12px→8px, margin-bottom 20px→12px
   - `.form-row.message-row` margin-top 16px→8px
   - `.btn-send-message` margin-top 16px→8px
   - `.message-group .form-control-custom` (the Message textarea) height
     93px → 65px, padding 15px→12px - the single biggest remaining chunk;
     still fits a couple of lines of text

Verified: all 8 of this project's standard mobile test sizes (320x568,
360x640, 375x667, 390x844, 412x915, 430x932, 360x740, 414x896) now fit with
**zero scrolling** (was overflowing at the two smallest before this pass).
Screenshotted at 320x568 and 390x844 - nothing overlaps or looks cut off.
Field-to-field gap re-measured at exactly 12px. Desktop is untouched (all
these rules live inside the mobile media query) - confirmed the desktop
Message box height (107px) and address gap (18px) separately. Re-verified
against the user's own `localhost:3000` dev server. Mirrored into the
prototype's `css/contact.css`.

**v1.0.53 — Contact page, web only: services grid was overshooting the
Message box (introduced by v1.0.52's own width fix), + address gap checked
against Figma node 3498:625 and confirmed already correct.**

1. **Address gap between the two lines:** requested value was 11px (Figma
   node 3498:625). Measured the actual rendered gap directly (not just the
   CSS declaration) - it's exactly 11px already, both in the CSS
   (`.contact-address-stack { gap: 11px; }`) and the real rendered distance
   between the two `<span>` lines. No change needed or made.
2. **Services grid was ending past the Message box, not level with it.**
   v1.0.52 widened the grid to `width: 100%` of its container (566px) to
   close a gap against the *input fields'* right edge - but the Message box
   textarea (`.message-group .form-control-custom`) has its own deliberate,
   narrower Figma width (561px, not the 578px the other fields use), and the
   grid's parent (`.services-interest`) also sits 12px right of the form's
   own left edge (a pre-existing, intentional nudge). Together that meant
   100% width overshot the message box's right edge by 17px - grid content
   reached 1227px, the message box only reaches 1210px.
   Fixed by targeting the message box's edge specifically instead of the
   container's full width: `css/contact.css`,
   `.services-grid.desktop-only-grid` `width: 100%` → `width: 549px` (561px
   message box width - the grid's own 12px left offset = 549px, landing the
   grid's right edge exactly on the message box's right edge given where the
   grid actually starts).

Verified: grid content's rightmost pixel and the message box's rightmost
pixel are now identical (1210px, 0px difference) - re-measured against the
user's own `localhost:3000` dev server, not just the WP/XAMPP site.
Mirrored into the prototype's `css/contact.css`.

**v1.0.52 — Contact page, web only: address icon alignment + services grid
width, both per Figma.**

1. **Address pin icon was centered against the whole two-address stack**
   (v1.0.33 added the second address; its icon wasn't re-checked at the
   time). `.contact-info-item.align-start` was `align-items: center` -
   contradicting its own class name - which centered the pin icon against
   both address lines combined instead of aligning it with just the first
   one, the way it looked before the second address existed. Fixed to
   `align-items: flex-start` in `css/contact.css`. Screenshotted before/after:
   the icon now sits level with "Circle Mall, Level 2..." exactly like the
   phone/email icons sit level with their own single line. No mobile impact -
   this whole address block is hidden on mobile already (a simpler
   email+phone-only footer bar there), confirmed by screenshot.
2. **Services grid (right panel) didn't reach the input fields' right edge.**
   Figma nodes 3030:553/3030:562/3030:547: the 5-column service checkbox grid
   should end flush with the form inputs above it (matches "Company Name"'s
   right edge). The grid *container* was already full width (`width:100%`),
   but `grid-auto-flow: column` with implicit (auto-sized-to-text) columns
   only added up to 519px of the available 566px - a 47px gap of dead space
   on the right, `justify-content: start` packing everything to the left.
   Changed `justify-content: start` -> `space-between` in `css/contact.css`
   (`.services-grid.desktop-only-grid`), which spreads the 5 columns to
   exactly fill the width (verified: item content now ends at the *exact*
   same pixel as the form's right edge, 1227px, was 1180px) rather than
   forcing a specific column-gap number that might not hold given the
   variable-width text in each column. Mobile is untouched - that grid is
   `display:none` there (a different, wrapping mobile list is used instead),
   confirmed via `offsetParent`.

Both items were re-measured directly against the user's own `localhost:3000`
dev server, not just the WP/XAMPP site. Mirrored into the prototype's
`css/contact.css`.
If this needs yet another pass, the rule is
`.services-page-body .services-hero-breadcrumb` in `css/style-v2.css`
(~line 7193) - just the one `margin-top` value to change.

**v1.0.50 — button-to-breadcrumb gap nudged up a bit more.** Client feedback on
v1.0.49's 20px: wanted a little more room. `css/style-v2.css`:
`.services-page-body .services-hero-breadcrumb` `margin-top: 20px` → `32px`.
Verified 32px exactly at 320/390/430/767px. Mirrored into the prototype's
`css/style-v2.css`.

**v1.0.49 — Services page mobile breadcrumb: huge gap after the button fixed.**
Root cause: `.services-hero-breadcrumb` has `position: absolute; bottom:
4.1667cqi;` in its **desktop** rule (anchors it near the bottom-left of the
hero). The mobile "UNIVERSAL MOBILE BREADCRUMB OVERRIDES" block (added when
the breadcrumb was first shown on mobile) only touched `margin-left`/`gap`/
font styling - it never reset `position`/`bottom`, so the breadcrumb kept
inheriting the desktop absolute positioning. Combined with
`.services-hero-content`'s `padding-bottom: 82.19vw` (~323px, itself a
pre-existing leftover from when the breadcrumb was still hidden), that put
the breadcrumb ~271px below the button instead of right after it - nothing
like the other service pages, which all lay theirs out in normal flow (or, for
Events, a `top` value tuned to sit close to what precedes it).
- `css/style-v2.css`: added `.services-page-body .services-hero-breadcrumb {
  position: relative !important; top: auto; bottom: auto; left: auto;
  margin-top: 20px !important; }`, putting it back into
  `.services-hero-content`'s existing `flex-direction: column` flow as the
  last child (it already sat last in the DOM) instead of pinning it with a
  fixed offset. This tracks the button correctly at *every* width
  automatically, rather than relying on one measured `top` value that would
  only be exactly right at one screen size.
- Left `.services-hero-content`'s oversized `padding-bottom` untouched -
  `.services-hero` clips it with `overflow: hidden` at a fixed `100svh`
  height, so the extra space is invisible trailing padding, not a visible gap,
  and doesn't push the next section down (confirmed: next section starts
  exactly at the hero's bottom edge in every case tested).

Verified: gap between the button and the breadcrumb now measures **exactly
20px at every width tested (320/390/430/767px)**, tested for real against the
user's own `localhost:3000` dev server (the `serve` process already running
against this prototype folder), not just the WP/XAMPP site. Desktop's
`position: absolute; bottom: 60px; left: 104px` is unchanged. Mirrored into
the prototype's `css/style-v2.css`.

**v1.0.48 — Services page mobile logo: precise vertical alignment fix (follow-up
to v1.0.47), + confirmed all 8 individual service pages already have working
mobile breadcrumbs.**

1. **Logo still sat slightly too high.** The v1.0.47 fix got the height/width
   right but positioned `top` by preserving the *old* box's vertical center -
   which was never itself verified against the real text, so the error just
   carried over into the smaller box. Re-measured properly this time: inserted
   a temporary zero-size marker span (`display:inline-block; width:0; height:0;
   vertical-align:baseline`) right after "WORK" to read its exact baseline
   Y-coordinate on the page, combined with the same canvas glyph-metrics
   technique from v1.0.47 to get the true glyph top/bottom in page
   coordinates, and compared that directly against the logo's own rendered
   box - no more inherited assumptions. Found the logo consistently ~1vw too
   high across every width tested (320/390/430/767px: needed +0.96 to
   +1.07vw). `css/style-v2.css`: `.services-who-section .who-title-logo`
   `top: 13.22vw` → `14.22vw`.
   Verified: the same precise baseline-marker measurement now shows the logo's
   vertical center within **±0.9px** of the text's true glyph center at every
   width tested (was 3-6.8px off before) - screenshotted at 320/390/430px and
   confirmed level by eye too. Desktop's separate sizing (236.78x81.98px,
   `top: 65.9995px` at 1440px) is untouched.
2. **"All service pages need mobile breadcrumbs"** - checked the other 8
   individual service page templates (`page-lead-generation.php`,
   `page-public-relations.php`, `page-real-estate-websites.php`,
   `page-seo-geo.php`, `page-social-media-marketing.php`, `page-events.php`,
   and `page-service.php` covering AI Marketing + Branding & Design) in
   addition to the Services hub fixed in v1.0.47. None of them had the
   `d-none` restriction the hub had - tested all 8 live on mobile and every
   one already renders its "Home > ... > [Page]" breadcrumb correctly. No
   code change needed there; only the hub (page-services.php, fixed in
   v1.0.47) and Why SOLD (`page-why-sold.php`, still `d-none d-md-flex`,
   untouched - not asked about this time) had the bug.

Mirrored into the prototype's `css/style-v2.css`.

**v1.0.47 — Services page, mobile: breadcrumb shown + "WHO DO SOLD WORK WITH?"
logo shrunk to match text height.**

1. **Missing mobile breadcrumb.** `page-services.php`'s hero breadcrumb
   (`.services-hero-breadcrumb`) was `d-none d-md-flex` - hidden below 768px,
   unlike every comparable hero on the other service pages (Lead Generation,
   PR, Events, the generic service template), which show theirs at every
   width with no visibility classes at all. Changed to `d-flex` so it now
   shows "Home >>> Services" on mobile too. No new ACF field was needed: the
   "Home" label and the `>>>` icon already come from `sold_opt()` reading
   `breadcrumb_home_text` / `breadcrumb_icon` on the Theme Settings options
   page (registered ACF fields, `acf-json/group_global_settings.json`), and
   the current-page label is `the_title()` - both already fully editable, and
   already the same source desktop was already using. The mobile CSS for
   this exact class already existed (`css/style-v2.css`, "UNIVERSAL MOBILE
   BREADCRUMB OVERRIDES") - it had simply never been reachable before, since
   the element was always hidden. Verified visible and correctly styled on
   mobile, desktop unchanged.
2. **Oversized "WHO DO SOLD WORK WITH?" logo, Services page mobile.** The
   inline "SOLD." logo image next to "WORK WITH?" (`.who-title-logo`,
   `.services-who-section`-scoped override) was sized at 0.96x the heading's
   font-size - a ratio carried over from the Home page, where it happens to
   look right, but here it rendered visibly taller than the actual text next
   to it. Re-measured directly instead of reusing Home's ratio: at 390px
   width the heading's real cap-height (canvas font-metrics: `actualBoundingBoxAscent`
   + `actualBoundingBoxDescent` for "WORK") is 27px against a 34.749px
   font-size, a 0.777x ratio - `css/style-v2.css`:
   - height: `8.55vw` (0.96x) → `6.92vw` (0.777x)
   - width: recalculated from the logo image's own natural aspect ratio
     (1185x375px, 3.16:1) against the new height, `25.84vw` → `21.88vw`, so
     the box doesn't letterbox
   - top: shifted to `13.22vw` to keep the same vertical center as the old,
     taller box, so the smaller logo stays aligned with the "WORK WITH?"
     line instead of appearing to float upward
   - `.logo-spacer` width (the gap reserved before "WORK") scaled down to
     match, `26.4vw` → `22.44vw`

   Verified: logo height now measures ~27px against a ~27px measured
   cap-height (was ~33px, ~23% too tall) at 390px, and screenshotted at
   320/375/430px - the logo now visually matches the text height at every
   size tested. The known, pre-existing heading/card overlap right at the
   767px boundary (documented in the 2026-09-15 batch notes as "not the
   logo, the fluid heading scale - left alone") is unrelated to this fix and
   was left untouched, per that same decision. Desktop's separate cqi-based
   sizing (236.78x81.98px at 1440px) is unaffected - this whole fix lives
   inside the `max-width: 767px` media query.

Mirrored into the prototype's `css/style-v2.css` and `services.html`.

**v1.0.46 — "Our Offices" line wrapped to 2 lines after v1.0.45, forced back to
one.** Root cause: `.offices-text` is `display:flex` with its default
`flex-wrap: nowrap` - that only keeps the "Our Offices" span and the rest of
the text on the same flex row, it does **not** stop the text *inside* each of
those from line-wrapping on its own. Bumping "Our Offices" to 18px in v1.0.45
made both parts individually wide enough to wrap internally, which is exactly
what happened. Fixed by adding `white-space: nowrap` to `.offices-text` in
`css/style.css` (inherited down to the span, so no separate change needed
there).
- Confirmed one line at every common mobile width tested (320/360/375/390/
  414/430px) - `.why-sold-container` is a **fixed 341px box** that just
  centers via `margin: 0 auto` rather than scaling with vw/cqi, so this one
  media-query rule already covers every phone resolution identically, not
  just the ones tested.
- Note (pre-existing, not caused by this fix, not touched): that same fixed
  341px container already overflows a 320px-wide viewport by itself (by
  ~21px) regardless of this text - the text's own overflow at 320px is
  actually 1px *less* than the container's. Flagging it since the user asked
  about "every resolution," but fixing it would mean converting the whole
  Home "Why SOLD" teaser block to fluid vw/cqi sizing, out of scope here.
- Desktop untouched (`white-space` stays `normal` there, confirmed).

Mirrored into the prototype's `css/style.css`.

**v1.0.45 — three mobile-only tweaks (Home/Services/Why SOLD).**

1. **Services accordion, mobile only** - the dark card's top/bottom padding
   (`.services-list-section`, shared by `template-parts/services-accordion.php`
   on both Home and Services, the only two pages that use it) was `106px`
   top and bottom via a single shorthand (`padding: 106px 29px`), so they were
   already numerically equal - reduced both to `56px` in `css/style.css`
   (Home) and `css/style-v2.css` (Services). Verified: the rendered gap above
   "Services" and below item 08 dropped from ~113.5px/106px to 63.5px/56px on
   both pages, kept consistent with each other; desktop's completely
   different `308.079px` accordion offset is untouched (separate rule, not
   in a mobile media query).
2. **"Our Offices" text size, Home mobile only** - in the Why SOLD teaser
   line ("Our Offices | Local Expertise. International Reach."), only the
   "Our Offices" span (`.offices-text span.text-primary-brand`) grew from
   14px to 18px; the rest of the line and the desktop version (`~26px`,
   untouched) are unaffected. `overflow: visible` on the fixed-height
   parent lets the now-taller text wrap to two lines without clipping, and
   since the element is `position: absolute` this doesn't disturb anything
   else on the page.
3. **Why SOLD "About SOLD" Get in touch button, mobile only** - was
   `d-none d-lg-inline-flex` (desktop-only; the v1.0.15-era restyle to match
   `.ws-founder-btn` was explicitly "web only" at the time). Changed to
   `d-flex d-lg-inline-flex` so it now shows on mobile too, and added a
   mobile `.ws-about-btn` rule in `css/why-sold.css` mirroring
   `.ws-founder-btn`'s mobile styling exactly (176x43px pill, 55px radius,
   29px orange icon circle, 20px text) but left-aligned instead of centered,
   to match this column. No markup move needed - the button already sat
   between the description and the map in the DOM, so making it visible
   automatically placed it right above the map, as asked. Verified above the
   map with a 20px gap on both sides; desktop screenshot confirms zero visual
   change there.

Mirrored into the prototype's `css/style.css`, `css/style-v2.css`,
`css/why-sold.css`, and `why-sold.html`.

**v1.0.44 — Why SOLD "Our Team" mobile carousel: swipe support added.** Same
gap as the testimonials carousel (v1.0.42) - the mobile "Our Team" carousel
(`#our-team-mobile` / `.ws-team-mobile-track`, its own separate implementation
in `js/why-sold-scroll.js` explicitly modeled on the testimonials one, per its
own comment) had working auto-scroll and prev/next buttons but no touch/swipe
handling at all. Added the identical `touchstart`/`touchend` listener pair
used for testimonials, calling the same existing `slide()` function: swipe
left = next, right = prev, 40px threshold, vertical gestures ignored, resets
the auto-scroll timer per swipe. Web-only, as asked - the desktop `#our-team`
grid (`d-none d-lg-block`) is a completely separate, non-carousel section,
untouched. Unlike testimonials, this carousel's dots map 1:1 to team members
already (no phantom extra dot to fix here).

Verified via synthetic touch events: left/right swipe both work, a <40px
movement does nothing, auto-scroll still advances on its own, and no console
errors on the page at either breakpoint. Mirrored into the prototype's
`js/why-sold-scroll.js`.

**v1.0.43 — testimonials dots: extra phantom dot removed, swipe/dot desync
fixed (mobile only).** Found right after shipping v1.0.42's swipe support: the
dots row markup (`template-parts/testimonials.php`) always renders one extra
`<span class="dot mobile-only-dot">` beyond the real testimonial dots - with 4
live testimonials that's 5 dots total for 4 real cards. The JS only excluded
that extra dot from the cycle count on **desktop** (`window.innerWidth >= 768`
guard) - on mobile it counted toward `numCards`, so the dot-cycle was one step
longer than the real card-cycle. Reproduced and confirmed: after a full lap of
real cards (4 swipes) the active state landed on the 5th, cardless dot instead
of back on the first real one - an empty circle with no card behind it (the
"extra black hole"), and from then on every dot was one position behind the
actual card showing.
- `js/main.js` + `js/main-v2.js`: drop the `>= 768` guard - `.mobile-only-dot`
  is now excluded from `activeDots`/`numCards` at every width, not just
  desktop.
- `css/style.css` + `css/style-v2.css`: the `<=767px` mobile override that set
  `.mobile-only-dot { display: block }` now sets `display: none` instead, so
  it no longer renders on mobile either (was already hidden on web).

Verified: mobile now shows exactly 4 dots (was 5, one always hidden/inert), a
full 4-swipe cycle correctly returns to dot 0 in sync with the real card
shown, and desktop's dot count/behavior is unchanged (was already correct).
Mirrored into the prototype's `js/main.js`, `js/main-v2.js`, `css/style.css`,
`css/style-v2.css`.

**v1.0.42 — testimonials carousel: swipe support added (mobile).** The
"What Our Clients Say" carousel already auto-scrolled and had working prev/next
arrows, but had **no touch/swipe handling at all** - `js/main.js` (Home) and
`js/main-v2.js` (every other page with testimonials: Services/Events/Lead
Generation/PR/Real Estate Websites/SEO & GEO/Social Media, and the generic
service template) are identical here, same fix in both. Added `touchstart`/
`touchend` listeners on `.testimonials-track` that measure the swipe distance
and call the exact same `slide('next'|'prev')` used by the arrow buttons and
auto-scroll - so a swipe animates identically and stays in sync, rather than
running its own separate drag animation:
- Swipe left -> next card, swipe right -> previous card.
- 40px minimum horizontal distance before it counts as a swipe (taps/tiny
  movements are ignored).
- A mostly-vertical gesture (`|deltaY| > |deltaX|`) is left alone entirely, so
  swiping the carousel never blocks the user from scrolling the page.
- Every swipe calls `resetAutoScroll()`, same as the arrow buttons, so
  auto-play doesn't immediately fight the user's manual swipe.

Verified via synthetic touch events: left swipe advances a card, right swipe
goes back, a <40px movement does nothing, a vertical-dominant gesture does
nothing, auto-scroll still advances on its own after ~3.5s, and the same fix
works identically on a non-Home page (tested on Lead Generation, main-v2.js).
Mirrored into the prototype's `js/main.js` / `js/main-v2.js`.

**v1.0.41 — FAQ/footer divider line thinned to 2px.** Client feedback: the
4px `.faq-footer-divider` (added in v1.0.36, per Figma nodes 3575:916/3584:1395)
looked too heavy. Reduced to 2px everywhere it appears - `css/style.css`,
`css/style-v2.css` (`height`/`min-height` 4px → 2px, `0.2778cqi` → `0.1389cqi`)
and the Home mobile override in `css/home-faq-mobile.css`. One shared class, so
this single edit covers all 6 pages that have the line (Home, Services, Client
Success, Why SOLD, Insights, Insights Details). Verified 2px at desktop/tablet/
mobile on every page.

**v1.0.40 — same FAQ gap fix, extended to the 768-991px tablet dead zone.**
Found while verifying v1.0.39: Bootstrap's `d-lg-none`/`d-lg-block` toggle (which
picks mobile vs. web FAQ markup) switches at **992px**, but the mobile padding
rules for Services/Why SOLD (in `style-v2.css`) and Client Success (in its own
CSS) are gated at `max-width: 767px` - a different, mismatched breakpoint that
predates this work. Result: from 768px to 991px, the *mobile* FAQ markup is what
actually renders, but it fell through both media queries and got **0px** top
padding on those 3 pages - crowded straight against Pre-footer, worse than the
desktop case. Home was unaffected (its `home-faq-mobile.css` already correctly
uses `max-width: 991px`). Fixed with a small dedicated
`@media (min-width: 768px) and (max-width: 991px)` block per affected file,
setting `padding-top: 56px !important` on `.faq-section-mobile` - matching the
value already used <=767px - without touching the wider 767px block's other
rules (out of scope, lower risk). Verified 56px at 768/900/991px on all 4 pages,
and the desktop variant correctly takes over with its own fluid gap at 992px+.

**v1.0.39 — more gap above "Have Questions ?" after the v1.0.36 reorder.** Moving
Pre-footer above FAQ left the FAQ section's *top* padding still set to the small
27px (1.875cqi) value it had when something else used to precede it - crowded
against the Pre-footer's bottom edge. Fixed on the 4 reordered pages only (Home,
Services, Client Success, Why SOLD - the pages that actually have both sections),
using each `.faq-section`'s own 65px *bottom* padding as the new top value too
(the standard gap already used site-wide between stacked sections), scoped by
body class so every other page's FAQ (still in its original position) keeps the
unmodified 27px:
- `css/style.css` (Home only, not scoped): `.faq-section` top padding
  1.875cqi → 4.5139cqi (27px → 65px).
- `css/style-v2.css`: new `.services-page-body .faq-section,
  .why-sold-page-body .faq-section { padding-top: 4.5139cqi; }`.
- `css/client-success.css`: `.client-success-page-body .faq-section` gained
  `padding-top: 4.5139cqi !important`. Also fixed its **mobile** FAQ, which had
  `padding-top: 0` (an actual pre-existing gap of literally 0px, the worst of
  the four) → `56px !important`, matching the mobile top gap Home/Services/Why
  SOLD already had (unchanged there - already 56px, already fine).

Verified: desktop gap from Pre-footer's bottom edge to "Have Questions ?" now
measures exactly 65px on all 4 pages; mobile measures 56px on all 4. Confirmed
unaffected pages (branding-design, lead-generation, etc., where FAQ still comes
*before* Pre-footer - untouched order) render with their own pre-existing FAQ
top padding, unchanged by this edit. Mirrored into the prototype's
`css/style.css`, `css/style-v2.css`, `css/client-success.css`.

**v1.0.38 — dark scrolled backdrop restored** (reverts v1.0.37 below). Client's
final call: keep the dark `.is-scrolled` backdrop after all, not fully
transparent. Put back exactly what v1.0.36 had - `.is-scrolled` with
`rgba(27,30,33,0.92)` + box-shadow + backdrop-filter blur in `css/style.css` and
`css/style-v2.css`, the explicit `height: 7.8472cqi` on `.site-header` (needed so
the backdrop has a box to paint into, since every child is absolutely
positioned), and the scroll listener in `js/main.js` / `js/main-v2.js` that
toggles the class past a 10px scroll threshold. v1.0.37's fully-transparent
version was live only briefly. Header itself: transparent over the hero at the
top of the page either way, dark backdrop once scrolled past it. Web + tablet
only; mobile's floating-pill header untouched throughout.

**v1.0.37 — header stayed fully transparent (superseded by v1.0.38 above)**. The
v1.0.36 sticky header added a dark `.is-scrolled` backdrop once you scrolled past
the hero; this version removed it so the strip was fully transparent at all
times, only the logo/nav pill/Book a Call button keeping their own
background/colors. Reverted in v1.0.38 - kept here for history.

**v1.0.36 — section reorder + sticky header + FAQ/footer divider (Home, Services,
Client Success, Why SOLD, Insights, Insights Details)**
- **Section reorder.** Was FAQ → Pre-footer → Footer; is now **Pre-footer → FAQ →
  Footer** on every page that has both: `front-page.php`, `page-services.php`,
  `page-client-success.php`, `page-why-sold.php`. Pure markup move, no CSS/content
  changed. `home.php` (Insights listing), `single.php` (Insights Details - the real
  template for individual posts; `page-insights-details.php` turned out to be
  unused, no page has that slug) and `archive.php` have no FAQ section to reorder.
- **New divider line** between the last section and the footer everywhere, per
  Figma node 3575:916 (web) / 3584:1395 (mobile): full width, 4px, `#263238`. New
  `.faq-footer-divider` class in `css/style.css` (Home) and `css/style-v2.css`
  (every other page), `0.2778cqi` with a `min-height:4px` floor so it never drops
  below 4px at any viewport. Sits after FAQ where one exists, otherwise directly
  after the pre-footer (the two Insights templates + `archive.php`).
- **Sticky/fixed header, web + tablet only** (`.site-header`, both CSS files):
  was `position: absolute`, so it scrolled away with the page - now
  `position: fixed`. Mobile (<=767px) is untouched - its own floating-pill
  `position: absolute !important` override still wins, unchanged, since the ask
  was web-only for this one. (Its scroll-darkening backdrop was removed again in
  v1.0.37 above - kept here for the positioning history.)
  GOTCHA checked and ruled out: `.page-container` has `container-type:
  inline-size`, which could in theory trap `position:fixed` descendants to it
  instead of the viewport - verified empirically in Chromium that it does not;
  the header stays pinned through a full-page scroll.

Verified on Home, Services, Client Success, Why SOLD, Insights and Insights
Details at 1440 (desktop), 768 (tablet) and 390 (mobile): DOM order, divider
height/color, and header `position`/pinned-on-scroll/background all measured
programmatically plus screenshotted. Mirrored into the prototype repo's
`index.html`/`services.html`/`client-success.html`/`why-sold.html`/
`insights.html`/`insights-details.html` and `css/style.css`,
`css/style-v2.css`, `css/home-faq-mobile.css`, `js/main.js`, `js/main-v2.js`
(byte-identical copies) - not yet committed to git.

**v1.0.34/35 — dead `http://` CTA links + contact popup at all widths**
- **The bug:** ACF pre-fills a url input with the literal text `http://`. Saving the
  page stores that, and it is not empty — so every template's
  `!empty($x['btn_link']) ? ... : ...` fallback happily used it and rendered
  `href="http://"`. On desktop nothing showed, because the contact popup calls
  `preventDefault()` on the click; below 992px the popup did not run, the click fell
  through, and the Home hero "GET STARTED NOW" button opened a blank page.
- **Theme fix:** new `sold_cta_url($value, $fallback = null)` helper in
  `functions.php`. It treats `''`, a bare `http://`/`https://` and `#` as unset and
  falls back to the Contact page (or an explicit fallback), otherwise resolves the
  link normally. Applied to the CTA buttons in `front-page.php`, `archive.php`,
  `page-client-success.php`, `page-events.php`, `page-services.php` and
  `page-why-sold.php`.
- **DB fix:** `fix_bare_http_links.sql` blanks any `%btn_link%` postmeta whose value
  is only `http://` or `https://`, so the stored data is clean too. Re-runnable, and
  it skips the `_`-prefixed field-key rows.
- **Contact popup now opens at every width**, including from the mobile drawer
  (`js/contact-modal.js`). The drawer is `position: fixed` and sat above the popup,
  so it is closed first. If the modal's fetch has not resolved yet the click is left
  alone and navigates to the Contact page as before, rather than being swallowed.

**v1.0.33 — Contact page, matched to Figma**
- Desktop service list now follows Figma node 3030:553: five columns of two, read
  DOWN each column, `column-gap: 13px`, no row gap, 14px/29px type, 20px under the
  heading. Implemented with `grid-auto-flow: column` + two explicit rows.
- The design uses its own shorter wording ("Design & Branding", "Website"); the
  longer navbar labels overflow the 566px block. The page's existing (previously
  unused) `contact_services` ACF repeater is now the primary source for this list,
  so the copy stays editable and the navbar keeps its own wording. Falls back to the
  navbar dropdown if the repeater is ever emptied.
- Second address added under the first, per Figma node 3498:624 — one pin icon, both
  lines 284px wide, 11px apart. New ACF field `contact_address_2` (leave empty to
  show one address).
- Mobile: the whole "What services are you interested in?" block is hidden. The form
  JS only submits checkboxes whose `offsetParent` is non-null, so hiding it also
  stops a stale default-selected service being sent.

Verified: desktop grid measures exactly 566px wide with the five Figma column
pairings, sitting 44px clear of the card edge; both addresses render 284px/11px
apart. Mobile checked at 320x568, 360x640, 375x667, 390x844, 412x915, 430x932,
360x740 and 414x896 — services hidden and the whole card fits the viewport with no
scrolling and no horizontal overflow at every size.

**v1.0.31/32 — tablet responsiveness (all 15 pages)** is also still pending in this
same zip; see the git history of this file for the full write-up.

---

# PART 2 — cPANEL DEPLOY PROCEDURE

Everything is **manual**. No CI, no git deploy, no sync script.

## Step 1 — Theme code

The zip holds **PHP + CSS + JS + acf-json only** (61 files, ~263 KB). It deliberately contains **no
images** — `assets/images` was uploaded once during the original migration and is not re-sent.

> **Extract into `wp-content/themes/`, NOT into `wp-content/themes/sold-theme/`.**
> Every path inside the zip already begins with `sold-theme/`. Going one level too deep creates
> `themes/sold-theme/sold-theme/` and the site silently keeps serving the old code, with no error.

1. cPanel → **File Manager**
2. Go to **`public_html/wp-content/themes`** (the `themes` folder)
3. **Upload** `theme-code-only.zip`
4. Right-click → **Extract** → target `public_html/wp-content/themes` → confirm overwrite
5. Delete the uploaded `.zip` (optional)

**Confirm it landed:** `wp-content/themes/sold-theme/functions.php` shows today's date, its `_S_VERSION`
matches the table above, and there is **no** `themes/sold-theme/sold-theme/` folder.

## Step 1a — New images (only when PART 1's table lists one)

Same reason as above: `theme-code-only.zip` never carries `assets/images`, so a genuinely new
image (not a re-upload of something already live) needs its own small zip, packaged the same
way `theme-images-partN.zip` was for the original migration — every path inside already begins
with `assets/images/`, same extract target as the theme zip.

1. cPanel → **File Manager**
2. Go to **`public_html/wp-content/themes/sold-theme`** (note: one level deeper than Step 1 —
   this zip's paths start at `assets/`, not `sold-theme/assets/`)
3. **Upload** the new-images zip named in PART 1's table (e.g. `new-images-v1.0.64.zip`)
4. Right-click → **Extract** → target `public_html/wp-content/themes/sold-theme` → confirm
   overwrite if asked
5. Delete the uploaded `.zip` (optional)

**Confirm it landed:** the file names listed in PART 1's table open directly at
`https://valores.newpropertyuae.ae/wp-content/themes/sold-theme/assets/images/<filename>`.

## Step 2 — SQL

1. cPanel → **phpMyAdmin** → database **`uaenewpr_sold`**
2. **Import** tab → pick the `.sql` → **Go** (or paste into the **SQL** tab)
3. Repeat per file, in the order above

Every `fix_*.sql` here is **safe to re-run** and finds pages by **slug**, never by numeric ID — local and
live have different post IDs for the same pages.

## Step 3 — Verify

Hard-refresh (**Ctrl+F5**), check the changed pages on desktop **and** a phone, and purge any caching
plugin/server cache.

---

# PART 3 — WORKING ON THE PROJECT

## Where the code lives — two separate places

| | Path | In git? |
|---|---|---|
| **Real WordPress theme** (what goes live) | `C:\xampp\htdocs\sold\wp-content\themes\sold-theme` | **No** |
| Static HTML prototype | `C:\Users\HP\.gemini\antigravity-ide\scratch\sold` | Yes |

They are **not** the same codebase. The prototype has its own copies of the markup (`index.html`,
`services.html`, …) but **shares the same CSS files**.

**The rule:** make functional changes in the **theme**. Then:
- CSS change → copy the file to the prototype's `css/` so both stay byte-identical
- Content/markup change → the prototype's `.html` needs the **same edit by hand** (it does not inherit)

The theme is untracked, so the zips in `deploy/` are its only backup.

## Start the local site

Local WP: `http://localhost/sold/` · DB `sold` on **port 3307** (not 3306 — another MySQL owns that).

```bash
# MySQL  (run in background)
cd /c/xampp/mysql/bin && ./mysqld.exe --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone --console

# Apache (run in background)
cd /c/xampp/apache/bin && ./httpd.exe -D FOREGROUND
```

`xampp_start.bat` / the control panel do not reliably start these from a shell — call the binaries
directly. Both may be killed by the OS under memory pressure; just restart them.

## Which stylesheet serves which page

- **`css/style.css`** → the **Home page only**
- **`css/style-v2.css`** → **every other page**
- Plus a per-page file: `client-success.css`, `events.css`, `why-sold.css`, `seo-geo.css`,
  `social-media-marketing.css`, `public-relations.css`, `real-estate-websites.css`,
  `lead-generation.css`, `ai-marketing.css`, `branding-design.css`, `insights.css`,
  `insights-details.css`, `contact.css`, `home-faq-mobile.css`

A shared component (e.g. the services accordion, which appears on Home *and* the Services hub) usually
needs **the same edit in both `style.css` and `style-v2.css`**.

**Breakpoints are not consistent across files** — `style.css`/`style-v2.css` use `max-width: 767px`,
while `why-sold.css` and the per-page files use `max-width: 991px` / `min-width: 992px`. Check the
enclosing `@media` before editing, especially for "mobile only" or "web only" work.

## Content lives in the database, not the templates

Page text/images come from **ACF Pro** fields, not hardcoded PHP. Templates follow
`!empty($x['key']) ? $x['key'] : '<original markup>'`, so the fallback is only a safety net — editing it
does **not** change the site.

- **Field definitions** are in `sold-theme/acf-json/` (Local JSON) → they ship inside the theme zip, no
  import step needed in ACF.
- **Field values** are in the DB → a content change needs a **SQL file** for live. Follow the existing
  `fix_*.sql` pattern: look the page up by slug, make it re-runnable.

To read/write local content, bootstrap WordPress from the CLI rather than using the mysql client (its
auth plugin is broken here):

```bash
/c/xampp/php/php.exe yourscript.php     # script does: require 'C:/xampp/htdocs/sold/wp-load.php';
```

Use ACF's own `update_field()` for repeaters — it handles the row counts and field-key rows correctly.

## After any theme change

```bash
cd "C:\xampp\htdocs\sold\deploy"
python build-theme-zip.py --bump      # bumps _S_VERSION, rebuilds + verifies the zip
```

`--bump` increments `_S_VERSION` in `functions.php`, which is the cache-buster for all theme CSS/JS —
skip it and browsers keep serving stale CSS. The script also asserts the zip passes its integrity check,
that all paths start with `sold-theme/`, and that no `assets/` leaked in. Omit `--bump` to repack without
touching the version.

## Verifying visually

Puppeteer is installed in the **prototype** folder, so run check scripts from there
(`cd C:\Users\HP\.gemini\antigravity-ide\scratch\sold && node yourscript.js`).

- Use `waitUntil: 'domcontentloaded'` + a short delay. `networkidle0` hangs on the external CDN fonts.
- Launch with `args: ['--disable-dev-shm-usage']`; Chrome gets OOM-killed here otherwise.
- Prefer **measuring** over eyeballing — read back `getBoundingClientRect()` / `getComputedStyle()` and
  compare against the reference page. That is how the hero-position and logo-scaling work was verified.
- Check several widths. Useful set: **320, 360, 390, 430** (phones), **768, 1024, 1280, 1440, 1920** (web).

---

# PART 4 — GOTCHAS & SETTLED DECISIONS

**Never copy image fields between environments.** Every ACF image field returns a URL but *stores the
attachment ID*. Local and live have different IDs for the same file, so moving that postmeta blanks the
images — this has hit the Client Success and Why SOLD logos more than once. Re-resolve by filename
instead, the way `refix_cs_logos.sql` / `fix_cs_logos_svg.sql` do.

**Margin collapse in the services section.** The accordion's 308px offset must be `padding-top` on
`.services-list-section`, **not** `margin-top` on `.services-accordion-new`. The section has no
padding-top, so a child margin collapses straight through it: the section gets shoved down and the
accordion lands at the top, underneath the header. Padding does not disturb the absolutely-positioned
header, which resolves against the padding-box edge.

**Services accordion image — settled, do not revert.** Collapsed strips use `object-fit: cover`
(short landscape band). The **expanded** item uses full container width with the whole photo visible.
`contain` was applied to *all* strips once, which shrank the collapsed thumbnails to slivers and was
rejected — it must stay scoped to `.service-list-item.active`.

**Known, pre-existing, not yet fixed:** at ~767px (top of the mobile range) the "WHO DO SOLD WORK WITH?"
heading on the Services page overlaps the audience cards below by ~9px. Verified as pre-existing —
identical with the old logo values — so it is the fluid heading size, not the logo. Fixing it means
changing the heading scale or section spacing.

**Mobile hero position reference:** Home starts its hero content **201px** below the hero top, as a
fixed px at every phone width. All other pages were matched to that. If a new page is added, match 201px.
