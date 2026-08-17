#!/usr/bin/env python3
"""Download runtime chunks dynamically imported by main.js and the finsweet loader."""
import os
import re
import subprocess
import concurrent.futures

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mirror')
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')

NETLIFY = 'https://united-carriers.netlify.app'
JSDELIVR = 'https://cdn.jsdelivr.net'


def dl(url, out):
    out = os.path.normpath(out)
    if os.path.exists(out) and os.path.getsize(out) > 0:
        return
    os.makedirs(os.path.dirname(out), exist_ok=True)
    r = subprocess.run(['curl', '-sL', '-A', UA, '--max-time', '60', url, '-o', out])
    if r.returncode != 0 or not os.path.exists(out) or os.path.getsize(out) == 0:
        print('  FAIL', url)


def fetch_netlify():
    main = os.path.join(ROOT, 'united-carriers.netlify.app', 'main.js')
    src = open(main, encoding='utf-8').read()
    found = set(re.findall(r'\./chunks/[A-Za-z0-9_.-]+\.js', src))
    pending = set(re.findall(r'chunks/[A-Za-z0-9_.-]+\.js', src))
    done = set()
    while pending:
        name = pending.pop()
        if name in done:
            continue
        done.add(name)
        rel = name
        url = NETLIFY + '/' + rel
        out = os.path.join(ROOT, 'united-carriers.netlify.app', rel.replace('/', os.sep))
        dl(url, out)
        try:
            txt = open(out, encoding='utf-8').read()
        except (OSError, UnicodeDecodeError):
            continue
        for dep in re.findall(r'\./chunks/[A-Za-z0-9_.-]+\.js', txt):
            pending.add(re.findall(r'chunks/[A-Za-z0-9_.-]+\.js', dep)[0])
    print('netlify chunks downloaded:', len(done))


def fetch_finsweet():
    base_dir = os.path.join(ROOT, 'cdn.jsdelivr.net', 'npm', '@finsweet', 'attributes@2')
    loader = os.path.join(base_dir, 'attributes.js')
    src = open(loader, encoding='utf-8').read()
    names = set(re.findall(r'\./dist/[A-Za-z0-9_.-]+\.js', src))
    jobs = []
    for n in names:
        rel = n.lstrip('./')
        url = JSDELIVR + '/npm/@finsweet/attributes@2/' + rel
        out = os.path.join(base_dir, rel.replace('/', os.sep))
        jobs.append((url, out))
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as ex:
        list(ex.map(lambda j: dl(*j), jobs))
    print('finsweet dist files downloaded:', len(jobs))


if __name__ == '__main__':
    fetch_netlify()
    fetch_finsweet()
