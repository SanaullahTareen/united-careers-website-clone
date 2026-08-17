#!/usr/bin/env python3
"""Static server for the mirror with clean URLs + proper MIME types."""
import os
import sys
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mirror')

EXTRA_TYPES = {
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.avif': 'image/avif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.webm': 'video/webm',
    '.mjs': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.js': 'text/javascript',
}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def guess_type(self, path):
        base = super().guess_type(path)
        if base and base != 'application/octet-stream':
            return base
        ext = os.path.splitext(path)[1].lower()
        return EXTRA_TYPES.get(ext, base or 'application/octet-stream')

    def translate_path(self, path):
        # SimpleHTTPRequestHandler.translate_path already unquotes once; do not double-unquote.
        fs = super().translate_path(path)
        # clean URLs: /about -> about/index.html ; /about/ -> about/index.html
        if os.path.isdir(fs) and os.path.exists(os.path.join(fs, 'index.html')):
            return os.path.join(fs, 'index.html')
        return fs

    def do_GET(self):
        # Redirect directory requests without trailing slash so relative links work
        parsed = urllib.parse.urlsplit(self.path)
        path = urllib.parse.unquote(parsed.path)
        if not path.endswith('/') and os.path.isdir(os.path.join(ROOT, path.lstrip('/'))):
            self.send_response(301)
            self.send_header('Location', parsed.path + '/')
            self.end_headers()
            return
        super().do_GET()

    def do_POST(self):
        """Accept POST silently (analytics, webhooks)."""
        self.send_response(204)
        self.send_header('Content-Length', '0')
        self.end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    srv = ThreadingHTTPServer(('127.0.0.1', port), Handler)
    print('Serving mirror at http://127.0.0.1:%d/' % port, flush=True)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
