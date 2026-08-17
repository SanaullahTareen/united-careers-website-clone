#!/usr/bin/env python3
"""Verify every local asset referenced by the mirrored HTML exists on disk."""
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mirror')

ATTR_RE = re.compile(r'''\s(?!srcset\b)[a-zA-Z_:][-a-zA-Z0-9_:]*\s*=\s*(["'])(.*?)\1''', re.S)
SRCSET_RE = re.compile(r'srcset\s*=\s*["\']([^"\']+)["\']')


def local_refs(html):
    refs = set()
    for m in ATTR_RE.finditer(html):
        v = m.group(2).strip()
        if v.startswith('/') and not v.startswith('//'):
            refs.add(v)
    for m in SRCSET_RE.finditer(html):
        for part in m.group(1).split(','):
            tok = part.strip()
            if tok:
                u = tok.split()[0]
                if u.startswith('/') and not u.startswith('//'):
                    refs.add(u)
    return refs


def disk_target(ref):
    """Map a root-relative URL ref to its on-disk path (URL-decoded like http.server)."""
    import urllib.parse
    rel = ref.lstrip('/')
    return os.path.join(ROOT, urllib.parse.unquote(rel).replace('/', os.sep))


def main():
    missing = []
    checked = 0
    for dp, _, fns in os.walk(ROOT):
        if '_probe' in dp:
            continue
        for fn in fns:
            if not fn.endswith('.html'):
                continue
            path = os.path.join(dp, fn)
            with open(path, 'r', encoding='utf-8', errors='replace') as f:
                html = f.read()
            for ref in local_refs(html):
                target = disk_target(ref)
                checked += 1
                if not os.path.exists(target):
                    missing.append((path, ref))
    print('checked %d local references' % checked)
    if not missing:
        print('OK: no missing assets')
        return 0
    seen = set()
    print('MISSING (%d unique):' % len(set((r) for _, r in missing)))
    for path, ref in sorted(missing, key=lambda x: x[1]):
        if ref not in seen:
            seen.add(ref)
            print('  %s   (referenced by %s)' % (ref, os.path.relpath(path, ROOT)))
    return 1


if __name__ == '__main__':
    sys.exit(main())
