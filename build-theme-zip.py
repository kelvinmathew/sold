"""
Rebuild deploy/theme-code-only.zip from the live theme folder.

    python build-theme-zip.py            # rebuild the zip
    python build-theme-zip.py --bump     # bump _S_VERSION first, then rebuild

Packs code only - PHP, style.css, acf-json/, css/, js/, template-parts/.
Deliberately EXCLUDES assets/ (images were uploaded once during the original
migration and are not re-sent on every deploy; including them would make the
zip ~95MB instead of ~270KB).

Every path inside the zip starts with "sold-theme/", so on cPanel the zip must
be extracted into wp-content/themes/ - NOT into wp-content/themes/sold-theme/.
See DEPLOY.md.
"""
import os
import re
import sys
import zipfile

THEMES_DIR = r"C:\xampp\htdocs\sold\wp-content\themes"
THEME = "sold-theme"
OUT = r"C:\xampp\htdocs\sold\deploy\theme-code-only.zip"

# Folders shipped in full, and the file types taken from each.
INCLUDE_DIRS = {
    "acf-json": (".json",),
    "css": (".css",),
    "js": (".js",),
    "template-parts": (".php",),
}
# Root-level files: every .php plus style.css (the theme header WordPress reads).
ROOT_EXT = (".php",)
ROOT_EXTRA = ("style.css",)


def bump_version(theme_path):
    """Increment the patch number in _S_VERSION, e.g. 1.0.27 -> 1.0.28."""
    fn = os.path.join(theme_path, "functions.php")
    with open(fn, encoding="utf-8") as f:
        src = f.read()
    m = re.search(r"define\('_S_VERSION', '(\d+)\.(\d+)\.(\d+)'\);", src)
    if not m:
        sys.exit("could not find _S_VERSION in functions.php")
    old = m.group(0)
    new_ver = "%s.%s.%d" % (m.group(1), m.group(2), int(m.group(3)) + 1)
    new = "define('_S_VERSION', '%s');" % new_ver
    with open(fn, "w", encoding="utf-8", newline="") as f:
        f.write(src.replace(old, new))
    print("_S_VERSION %s.%s.%s -> %s" % (m.group(1), m.group(2), m.group(3), new_ver))
    return new_ver


def current_version(theme_path):
    with open(os.path.join(theme_path, "functions.php"), encoding="utf-8") as f:
        m = re.search(r"define\('_S_VERSION', '([^']+)'\);", f.read())
    return m.group(1) if m else "?"


def collect(theme_path):
    """Paths relative to THEMES_DIR, i.e. 'sold-theme/<...>'."""
    out = []
    for name in sorted(os.listdir(theme_path)):
        full = os.path.join(theme_path, name)
        if os.path.isfile(full) and (name.endswith(ROOT_EXT) or name in ROOT_EXTRA):
            out.append("%s/%s" % (THEME, name))
    for folder, exts in INCLUDE_DIRS.items():
        d = os.path.join(theme_path, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            if name.endswith(exts):
                out.append("%s/%s/%s" % (THEME, folder, name))
    return out


def main():
    theme_path = os.path.join(THEMES_DIR, THEME)
    if not os.path.isdir(theme_path):
        sys.exit("theme folder not found: " + theme_path)

    if "--bump" in sys.argv:
        bump_version(theme_path)

    entries = collect(theme_path)
    os.chdir(THEMES_DIR)

    missing = [e for e in entries if not os.path.exists(e)]
    if missing:
        sys.exit("missing files: %s" % missing)

    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for e in entries:
            z.write(e, e)

    with zipfile.ZipFile(OUT) as z:
        assert z.testzip() is None, "zip failed its integrity check"
        names = z.namelist()

    assert all(n.startswith(THEME + "/") for n in names), "unexpected paths in zip"
    assert not any(n.startswith(THEME + "/assets/") for n in names), "assets leaked into the zip"

    print("wrote %s" % OUT)
    print("  %d files, %.0f KB, theme version %s"
          % (len(names), os.path.getsize(OUT) / 1024.0, current_version(theme_path)))


if __name__ == "__main__":
    main()
