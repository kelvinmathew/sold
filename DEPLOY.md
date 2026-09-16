# SOLD — Deployment & Handoff Guide

**Purpose of this file.** It is the pick-up point after a network drop, a new chat session, or a handoff.
Send/open this file and you should be able to continue the work — deploying or building — without
re-deriving anything. Everything needed is below: where the code lives, how to run it locally, the rules
for making changes, and what is currently waiting to go live.

Live site: **https://valores.newpropertyuae.ae**
cPanel prefix `uaenewpr_` · DB `uaenewpr_sold` · DB user `uaenewpr_solduser` · table prefix `wp_`

---

# PART 1 — PENDING DEPLOY

**One item pending** (2026-09-16) · theme version: **`_S_VERSION 1.0.31`**

| # | What | File | Where |
|---|------|------|-------|
| 1 | Theme code | `theme-code-only.zip` | File Manager |

No SQL. CSS + template changes only.

**v1.0.31 — TABLET RESPONSIVENESS (all 15 pages)**

Root cause: the mobile/desktop switch is a `@container (max-width: 1199px)` block in
`style.css` / `style-v2.css`, not an `@media` query - so the global chrome stayed in mobile
mode up to 1199px while every per-page stylesheet switched to desktop at 992px. That
mismatch made 992-1199 a broken hybrid (mobile header + desktop-positioned hero) and left
768-991 as a phone layout stretched across a tablet.

Fix, applied page by page and tested at 768 / 834 / 900 / 991 / 1024 / 1199 / 1200:
- Container breakpoint moved `1199 -> 767` in both global sheets, and every `@media`
  991/992 boundary aligned to 767/768 (global + all 12 page stylesheets). One breakpoint
  now governs everything, so tablets get the real desktop layout - it is built on `cqi`
  units, so it scales proportionally with no separate tablet layout needed.
- **Header:** 768-991 keeps the mobile burger. The desktop pill nav technically fits, but
  only with ~8.5px labels, and flooring those widens it into the BOOK A CALL button. Full
  nav returns at 992 where there is room.
- **Typography floors:** the one thing that does not survive the scale-down is type - at
  768 the design sits at ~53%, pushing body copy to 7.5-11px. `max()` floors keep the cqi
  scaling wherever it is already comfortable and only stop it shrinking past ~12px.
  Line-heights floored in the same proportion. FAQ open-state `max-height` raised so the
  larger text is not clipped.
- **Footer:** `.footer-col-quicklinks` / `.quick-links-group` were a fixed `218px` in an
  otherwise cqi layout, so the column ran ~21px past the right edge on tablets. Converted
  to `15.1389cqi` (identical at 1440).

Verified: all 15 pages report no text under 12px anywhere in 768-1199, and **zero
horizontal overflow at 390 (phone) and 1440 (desktop)**. Phone and desktop rendering are
unchanged - every edit is inside a tablet-scoped container/media query.

Two pre-existing items deliberately left alone (they are desktop-side, out of scope):
`.insights-small-excerpt` / `.insights-related-card-desc` render 11.7px at 1200, and
`.ws-team-role` 10.8px at 1200.

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
