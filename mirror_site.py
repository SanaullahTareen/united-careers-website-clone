#!/usr/bin/env python3
"""Mirror unitedcarriers.com into ./mirror as a fully-offline static clone.

Preserves each asset's URL structure under mirror/<host>/<path> and rewrites
absolute URLs in HTML/CSS/JS to root-relative local paths.
"""
import os
import re
import sys
import subprocess
import urllib.parse
import concurrent.futures

BASE = 'https://unitedcarriers.com'
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mirror')
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')

HOST_PREFIXES = [
    'cdn.prod.website-files.com',
    'd3e54v103j8qbb.cloudfront.net',
    'cdn-cookieyes.com',
    'cdn.jsdelivr.net',
    'js.stripe.com',
    'united-carriers.netlify.app',
]

# Same-origin static asset paths (non-page resources served from unitedcarriers.com)
SAME_ORIGIN_ASSET_PREFIXES = ['/9i1h7htkfq16NmE0NGVlYzFlZDFhZjJjNGM0MDNkZjZi/']

KNOWN_ROUTES = [
    '', 'about', 'services', 'industries', 'insights', 'careers', 'contact',
    'community', 'merchandises', 'checkout', 'qhse', 'privacy-policy',
    'terms-conditions', 'payment-policy', 'delivery-shipping-policy',
    'refund-returns-policy', 'linkedin',
    'ai-news/americas', 'ai-news/asia', 'ai-news/asia-pacific', 'ai-news/europe',
    'ai-news/global', 'ai-news/middle-east-africa', 'ai-news/rest-of-world-d2yv8',
    'articles/featured', 'articles/case-studies', 'articles/company-news',
    'articles/company-updates', 'articles/industry-news',
    'insights/cost-optimised-and-speed-to-market-import-program-for-new-truck-launch-in-australia',
    'insights/global-shipping-rates-soar-as-retailers-race-to-beat-looming-tariffs',
    'insights/grid-scale-battery-project-logistics-delivery-for-renewable-energy-infrastructure',
    'insights/major-fleet-wide-fuel-efficiency-agreement-signals-ongoing-focus-on-shipping-performance-and-decarbonisation',
    'insights/red-alert-shanghai-cancels-80-of-flights-as-typhoon-dolphin-makes-landfall',
    'insights/reduced-import-delays-storage-costs-across-700-containers',
    'insights/time-critical-oversized-sewer-tank-delivery-to-residential-estate-development',
    'insights/united-carriers-apac-recognised-in-afr-fast-starters',
    'insights/us-tariffs-refunds-section-301-duties-and-importer-advice',
]


def log(msg):
    sys.stdout.write(msg + '\n')
    sys.stdout.flush()


def download(url, out, follow_redirects=True, force=False):
    out = os.path.normpath(out)
    if os.path.exists(out) and os.path.getsize(out) > 0 and not force:
        return True
    os.makedirs(os.path.dirname(out) or '.', exist_ok=True)
    cmd = ['curl', '-s', '-A', UA, '--max-time', '90', '--retry', '2']
    if follow_redirects:
        cmd.append('-L')
    cmd += [url, '-o', out]
    r = subprocess.run(cmd, capture_output=True)
    ok = r.returncode == 0 and os.path.exists(out) and os.path.getsize(out) > 0
    if not ok and os.path.exists(out):
        try:
            os.remove(out)
        except OSError:
            pass
    return ok


def asset_local_path(url):
    """Map an absolute http(s) url to a local path under ROOT, preserving structure."""
    p = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(p.path).lstrip('/')
    segs = [s for s in path.split('/') if s not in ('', '.', '..')]
    return os.path.join(ROOT, p.netloc, *segs)


def is_downloadable_asset_url(url):
    if not (url.startswith('http://') or url.startswith('https://') or url.startswith('//')):
        return False
    if url.startswith('//'):
        url = 'https:' + url
    p = urllib.parse.urlparse(url)
    host = p.netloc
    if host in HOST_PREFIXES:
        return True
    if host == urllib.parse.urlparse(BASE).netloc:
        path = p.path
        return any(path.startswith(prefix) for prefix in SAME_ORIGIN_ASSET_PREFIXES)
    return False


def iter_attr_urls(html):
    """Yield every URL found in HTML attribute values and srcset."""
    attr_re = re.compile(r'''\s[a-zA-Z_:][-a-zA-Z0-9_:]*\s*=\s*(["'])(.*?)\1''', re.S)
    for m in attr_re.finditer(html):
        val = m.group(2).strip()
        if val.startswith('http://') or val.startswith('https://'):
            yield val
        elif val.startswith('//'):
            yield 'https:' + val
    srcset_re = re.compile(r'srcset\s*=\s*["\']([^"\']+)["\']')
    for m in srcset_re.finditer(html):
        for part in m.group(1).split(','):
            tok = part.strip()
            if not tok:
                continue
            u = tok.split()[0]
            if u.startswith('http://') or u.startswith('https://'):
                yield u


def iter_css_urls(css):
    url_re = re.compile(r'url\(\s*(["\']?)(.*?)\1\s*\)', re.S)
    for m in url_re.finditer(css):
        u = m.group(2).strip()
        if u.startswith('http://') or u.startswith('https://'):
            yield u
        elif u.startswith('//'):
            yield 'https:' + u


def fetch_page(route):
    if route == '':
        url = BASE + '/'
        out = os.path.join(ROOT, 'index.html')
    else:
        url = BASE + '/' + route
        out = os.path.join(ROOT, route, 'index.html')
    if not download(url, out, follow_redirects=False):
        log(f'  [FAIL] {route} -> {url}')
        return None
    return out


def extract_internal_routes(html):
    routes = set()
    for m in re.finditer(r'''href\s*=\s*["'](/[a-zA-Z0-9/_\-]+)["']''', html):
        r = m.group(1).lstrip('/')
        if r and r != 'linkedin' and not r.startswith('cdn.') and not r.startswith('9i1h'):
            routes.add(r)
    return routes


def main():
    os.makedirs(ROOT, exist_ok=True)

    # ---- Phase 1: download all pages (BFS over internal routes) ----
    log('Phase 1: downloading pages...')
    queue = list(KNOWN_ROUTES)
    visited = set()
    html_files = {}
    while queue:
        route = queue.pop(0)
        if route in visited:
            continue
        visited.add(route)
        out = fetch_page(route)
        if not out:
            continue
        html_files[route] = out
        try:
            with open(out, 'r', encoding='utf-8', errors='replace') as f:
                html = f.read()
        except OSError:
            continue
        for r in extract_internal_routes(html):
            if r not in visited:
                queue.append(r)
    log(f'  fetched {len(html_files)} pages')

    # ---- Phase 2: collect + download assets referenced by HTML ----
    log('Phase 2: collecting asset URLs from HTML...')
    asset_urls = set()
    for route, out in html_files.items():
        with open(out, 'r', encoding='utf-8', errors='replace') as f:
            html = f.read()
        for u in iter_attr_urls(html):
            if is_downloadable_asset_url(u):
                asset_urls.add(u)
    log(f'  {len(asset_urls)} asset URLs from HTML')

    # ---- Phase 3: download CSS/JS first, then scan them for more assets ----
    log('Phase 3: downloading css/js assets...')
    css_files = []
    js_files = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
        futs = {}
        for u in list(asset_urls):
            lp = asset_local_path(u)
            if lp.endswith('.css'):
                css_files.append(lp)
            elif lp.endswith('.js'):
                js_files.append(lp)
            futs[ex.submit(download, u, lp)] = u
        done = 0
        for fu in concurrent.futures.as_completed(futs):
            done += 1
        log(f'  downloaded {done} css/js assets')

    # ---- Phase 4: scan CSS for url() assets and download ----
    log('Phase 4: scanning CSS for url() references...')
    css_asset_urls = set()
    for cf in css_files:
        if not os.path.exists(cf):
            continue
        with open(cf, 'r', encoding='utf-8', errors='replace') as f:
            css = f.read()
        for u in iter_css_urls(css):
            if is_downloadable_asset_url(u):
                css_asset_urls.add(u)
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
        futs = {ex.submit(download, u, asset_local_path(u)): u for u in css_asset_urls}
        for fu in concurrent.futures.as_completed(futs):
            pass
    log(f'  downloaded {len(css_asset_urls)} css-referenced assets')

    # ---- Phase 5: download remaining image assets ----
    remaining = [u for u in asset_urls if u not in css_asset_urls
                 and not asset_local_path(u).endswith(('.css', '.js'))]
    log(f'Phase 5: downloading {len(remaining)} image/media assets...')
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
        futs = {ex.submit(download, u, asset_local_path(u)): u for u in remaining}
        done = 0
        for fu in concurrent.futures.as_completed(futs):
            done += 1
        log(f'  downloaded {done} assets')

    # ---- Phase 6: rewrite URLs in HTML/CSS/JS to local paths ----
    log('Phase 6: rewriting URLs to local paths...')

    def rewrite(text):
        for host in HOST_PREFIXES:
            text = text.replace('https://%s/' % host, '/%s/' % host)
            text = text.replace('//%s/' % host, '/%s/' % host)
        return text

    for route, out in html_files.items():
        with open(out, 'r', encoding='utf-8', errors='replace') as f:
            html = f.read()
        new = rewrite(html)
        if new != html:
            with open(out, 'w', encoding='utf-8', errors='replace') as f:
                f.write(new)

    for cf in css_files:
        if not os.path.exists(cf):
            continue
        with open(cf, 'r', encoding='utf-8', errors='replace') as f:
            css = f.read()
        new = rewrite(css)
        if new != css:
            with open(cf, 'w', encoding='utf-8', errors='replace') as f:
                f.write(new)

    # ---- Phase 7: report ----
    log('Phase 7: summary...')
    nfiles = 0
    total = 0
    for dp, _, fns in os.walk(ROOT):
        for fn in fns:
            nfiles += 1
            total += os.path.getsize(os.path.join(dp, fn))
    log('  total files: %d' % nfiles)
    log('  total size : %.1f MB' % (total / 1048576))
    log('DONE.')


if __name__ == '__main__':
    main()
