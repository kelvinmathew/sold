import json, sys
a = json.load(open(sys.argv[1])); b = json.load(open(sys.argv[2]))
SKIP = {'tag'}
total = 0
for w in a:
    A, B = a[w], b[w]
    issues = []
    if A['pageHeight'] != B['pageHeight']:
        issues.append(f"page height {A['pageHeight']} -> {B['pageHeight']}")
    ta, tb = set(A['text']), set(B['text'])
    if ta != tb:
        issues.append(f"text layout: {len(ta - tb)} runs moved/changed")
        for x in sorted(ta - tb)[:6]: issues.append('   before: ' + x)
        for x in sorted(tb - ta)[:6]: issues.append('   after : ' + x)
    for sel in A['targets']:
        la, lb = A['targets'][sel], B['targets'][sel]
        if len(la) != len(lb):
            issues.append(f"{sel}: {len(la)} -> {len(lb)} elements"); continue
        for i, (ea, eb) in enumerate(zip(la, lb)):
            d = [f"{k}: {ea[k]} -> {eb[k]}" for k in ea if k not in SKIP and ea[k] != eb.get(k)]
            if d: issues.append(f"{sel}[{i}] ({ea['tag']}->{eb['tag']}): " + '; '.join(d))
    total += len(issues)
    print(f"== {w}px: " + ('IDENTICAL' if not issues else f'{len(issues)} difference(s)'))
    for x in issues: print('   ' + x)
print('\nRESULT:', 'NO VISUAL CHANGE at any width' if total == 0 else f'{total} difference(s) to fix')
