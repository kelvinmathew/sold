# SOLD — Deployment & Handoff Guide

**Purpose of this file.** It is the pick-up point after a network drop, a new chat session, or a handoff.
Send/open this file and you should be able to continue the work — deploying or building — without
re-deriving anything. Everything needed is below: where the code lives, how to run it locally, the rules
for making changes, and what is currently waiting to go live.

Live site: **https://valores.newpropertyuae.ae**
cPanel prefix `uaenewpr_` · DB `uaenewpr_sold` · DB user `uaenewpr_solduser` · table prefix `wp_`

---

# PART 1 — PENDING DEPLOY

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
