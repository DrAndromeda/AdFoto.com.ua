#!/usr/bin/env python3
"""Extract archived RU pages into src/data/pages/ru/*.json and copy images to public/media.
Run: python3 -I scripts/extract.py   (reads archive/site, writes src/data/pages/ru, public/media)"""
import os, re, json, shutil, html
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote, urljoin

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, 'archive/site')
OUT = os.path.join(ROOT, 'src/data/pages/ru')
MEDIA = os.path.join(ROOT, 'archive/media-src')  # originals (gitignored); scripts/optimize-images.mjs writes public/media

# (section, sub, regex on path) - first match wins
RULES = [
 ('meta','home',r'^/index\.html$'), ('meta','portfolio',r'^/portfolio\.html$'),
 ('meta','about',r'^/o-nas\.html$'), ('meta','contacts',r'^/kontakty\.html$'),
 ('meta','faq',r'pomosch-i-chasto'), ('meta','legal',r'pravovaya|oplata|garantiya-kachestva|oformit-zayavku'),
 ('meta','blog',r'^/blog\.html$'),
 ('blog','article',r'trend|uroki|chto-takoe|5-preim|zachem-nyzen|uspeshnye-foto'),
 ('foto','food',r'food|fud|edy|napitk|koktejl|syra|piccy|fresh|detoks|hlebo|dietich'),
 ('foto','fashion',r'odezh|odezd|fashion|obuvi|vyshivank|mehovih|detskoi|varenyky|voleeyu|almondo|weannabe|vizazhist'),
 ('foto','interior',r'intern.*arhit|interernaya|3d-foto|aerosemka'),
 ('foto','jewelry',r'yuvelir'),
 ('foto','subject',r'predmet|tovar|internet-magazin|mebeli|belya|kataloga-kiev|promishlen|obrabotka-foto|sozdanie-foto'),
 ('foto','reklamnaya',r'reklamnaya-foto|reklamnaya-semka'),
 ('reklama','video',r'video|montazh|korporativnogo-filma|rolikov|dzhingl'),
 ('branding','branding',r'logotip|brend|firmennogo|upakovk|vizitov|bukleta|poligraf|kataloga|dizajn-i-izgot|dizajn-poligrafii|sitilajt|plakat'),
 ('reklama','outdoor',r'reklama-na|reklama-v|vyveski|vyvesok|lajtboks|vitrin|naruzhnaya|tizernaya|trolly|bigbord|asfalt|transport|marshrutk|bannernaya'),
 ('reklama','agency',r'reklamnoe-agentstvo|reklamnyj|kreativnaya|reklamnaya-kampan|socialnaya|promo-akcii|degustac|merchand|btl|prodvizhenie-i-sozdanie|drugie'),
 ('smm','smm',r'smm|internet-marketing|marketing|reklama-internet|kontekst|pr-|kopirajting'),
 ('web','web',r'sajt|site|seo|optimizaciya|web'),
]
def classify(p):
    for s, sub, rx in RULES:
        if re.search(rx, p): return s, sub
    return 'reklama', 'agency'

def slug_of(p): return p.strip('/').removesuffix('.html') or 'index'

def url_for(p):
    s, sub = classify(p); slug = slug_of(p)
    if s == 'meta':
        return {'home': '/', 'portfolio': '/portfolio/', 'about': '/about/', 'contacts': '/contacts/',
                'faq': '/faq/', 'legal': f'/info/{slug}/', 'blog': '/blog/'}[sub]
    if s == 'blog': return f'/blog/{slug}/'
    return f'/{s}/{slug}/'

class Cut(HTMLParser):
    """Collect inner HTML of the first div whose class contains 'main-content'."""
    def __init__(s): super().__init__(convert_charrefs=False); s.depth=0; s.on=False; s.buf=[]; s.done=False
    def handle_starttag(s,t,a):
        if s.done: return
        if not s.on and t=='div' and 'main-content' in (dict(a).get('class') or ''):
            s.on=True; s.depth=1; return
        if s.on:
            if t=='div': s.depth+=1
            s.buf.append(s.get_starttag_text())
    def handle_startendtag(s,t,a):
        if s.on and not s.done: s.buf.append(s.get_starttag_text())
    def handle_endtag(s,t):
        if s.done or not s.on: return
        if t=='div':
            s.depth-=1
            if s.depth==0: s.done=True; return
        s.buf.append(f'</{t}>')
    def handle_data(s,d):
        if s.on and not s.done: s.buf.append(d)
    def handle_entityref(s,n):
        if s.on and not s.done: s.buf.append(f'&{n};')
    def handle_charref(s,n):
        if s.on and not s.done: s.buf.append(f'&#{n};')
    def handle_comment(s,d): pass

pages = []
for dp,_,fs in os.walk(SITE):
    for f in fs:
        if f.endswith('.html'):
            pages.append('/'+os.path.relpath(os.path.join(dp,f),SITE))
pages.sort()
urlmap = {p: url_for(p) for p in pages}
json.dump(urlmap, open(os.path.join(ROOT,'src/data-urlmap.json'),'w'), indent=1, ensure_ascii=False)

os.makedirs(OUT, exist_ok=True); os.makedirs(MEDIA, exist_ok=True)
copied=set(); missing=set(); bogus=set()

MAGIC = (b'\xff\xd8\xff', b'\x89PNG', b'GIF8', b'RIFF', b'<svg', b'<?xml')
def is_image(lp):
    with open(lp, 'rb') as fh: head = fh.read(64).lstrip()
    return head.startswith(MAGIC)

def media(ref, page):
    u = urlsplit(urljoin('http://adfoto.com.ua'+page, ref))
    if 'adfoto.com.ua' not in u.netloc: return None
    lp = os.path.join(SITE, unquote(u.path).lstrip('/'))
    if not os.path.isfile(lp): missing.add(u.path); return None
    if not is_image(lp): bogus.add(u.path); return None  # archive saved an error page under an image name
    name = os.path.basename(lp)
    dst = os.path.join(MEDIA, name)
    if name not in copied: shutil.copy(lp, dst); copied.add(name)
    return '/media/'+name

def clean(body, page):
    body = re.sub(r'<(script|style|noscript)\b.*?</\1>', '', body, flags=re.S|re.I)
    body = re.sub(r'<link\b[^>]*>', '', body, flags=re.I)
    body = re.sub(r'<form\b.*?</form>', '', body, flags=re.S|re.I)
    body = re.sub(r'<div[^>]*a2a_kit[^>]*>.*?</div>', '', body, flags=re.S|re.I)
    body = re.sub(r'<p>\s*<a[^>]*class="btn[^>]*>.*?</a>\s*</p>', '', body, flags=re.S|re.I)
    def img(m):
        tag = m.group(0)
        src = re.search(r'src\s*=\s*"([^"]+)"', tag)
        if not src: return ''
        new = media(src.group(1), page)
        if not new: return ''
        alt = re.search(r'alt\s*=\s*"([^"]*)"', tag); alt = alt.group(1) if alt else ''
        return f'<img src="{new}" alt="{alt}" loading="lazy" decoding="async">'
    body = re.sub(r'<img\b[^>]*>', img, body, flags=re.I)
    def a(m):
        tag = m.group(0)
        href = re.search(r'href\s*=\s*"([^"]*)"', tag)
        oc = re.search(r"location\.href\s*=\s*'([^']+)'", tag)
        h = href.group(1) if href else (oc.group(1) if oc else '')
        u = urlsplit(urljoin('http://adfoto.com.ua'+page, h))
        if h and 'adfoto.com.ua' in u.netloc and u.path.endswith('.html') and u.path in urlmap:
            return f'<a href="{urlmap[u.path]}">'
        if h and u.netloc and 'adfoto.com.ua' not in u.netloc:
            return f'<a href="{h}" rel="noopener nofollow" target="_blank">'
        return '<a>' if not h else f'<a href="{h}">'
    body = re.sub(r'<a\b[^>]*>', a, body, flags=re.I)
    body = re.sub(r'\s(style|onclick|onmouseover|align|width|height|border|class)\s*=\s*"[^"]*"', lambda m: m.group(0) if m.group(1)=='class' and re.search(r'isotope-item|image-box|overlay-container|image-box-body|title|link',m.group(0)) else '', body)
    body = body.replace('&nbsp;',' ')
    # Unwrap layout tables (innermost first): tables holding lists/images/rules/nested blocks are layout, not data.
    for _ in range(10):
        changed = False
        def unwrap(m):
            nonlocal changed
            inner = m.group(1)
            if re.search(r'<(ul|ol|img|hr|h[1-6]|iframe|div)\b', inner, re.I) or inner.count('<td') <= 1:
                changed = True
                return re.sub(r'</?(tbody|thead|tr|td|th)\b[^>]*>', '\n', inner, flags=re.I)
            return '<table class="data">' + inner + '</table>'
        body = re.sub(r'<table\b[^>]*>((?:(?!<table\b).)*?)</table>', unwrap, body, flags=re.S | re.I)
        if not changed: break
    body = re.sub(r'<hr\b[^>]*/?>', '', body, flags=re.I)
    body = re.sub(r'<a href="/info/oformit-zayavku/[^"]*">.*?</a>', '', body, flags=re.S | re.I)
    body = re.sub(r'<p>(\s|<br\s*/?>)*(<img[^>]+>)(\s|<br\s*/?>)*</p>', r'<p>\2</p>', body, flags=re.I)
    body = re.sub(r'<(p|span|div)>\s*</\1>', '', body)
    body = re.sub(r'<(p|span|div)>\s*</\1>', '', body)
    body = re.sub(r'<h1\b.*?</h1>', '', body, count=1, flags=re.S|re.I)
    body = re.sub(r'<p>\s*(&nbsp;|\s)*</p>', '', body)
    body = re.sub(r'\n\s*\n+', '\n', body).strip()
    return body

def meta(t):
    g=lambda rx: (re.search(rx,t,re.S|re.I) or [None,''])[1]
    return dict(title=html.unescape(g(r'<title[^>]*>(.*?)</title>')).strip(),
                description=html.unescape(g(r'<meta[^>]+name="description"[^>]+content="([^"]*)"')).strip(),
                h1=html.unescape(re.sub(r'<[^>]+>','',g(r'<h1[^>]*>(.*?)</h1>'))).strip())

report=[]
for p in pages:
    t = open(os.path.join(SITE,p.lstrip('/')),encoding='utf-8',errors='ignore').read()
    c = Cut(); c.feed(t)
    body = clean(''.join(c.buf), p)
    m = meta(t)
    s, sub = classify(p)
    first = re.search(r'<img src="([^"]+)"', body)
    d = dict(slug=slug_of(p), oldPath=p, section=s, sub=sub, url=urlmap[p], lang='ru',
             title=m['title'] or m['h1'], h1=m['h1'] or m['title'], description=m['description'],
             cover=first.group(1) if first else None,
             price=(lambda m: re.sub(r'\s+', ' ', m.group(0)).strip() if m else None)(re.search(r'от\s*\d[\d\s]*\s*грн(?:\s*/\s*фото)?', re.sub(r'<[^>]+>', ' ', body))), images=re.findall(r'<img src="([^"]+)"', body), body=body)
    json.dump(d, open(os.path.join(OUT, slug_of(p)+'.json'),'w'), ensure_ascii=False, indent=1)
    report.append((p, len(re.sub(r'<[^>]+>',' ',body).split()), len(d['images'])))

print('pages', len(report), 'media copied', len(copied), 'missing refs', len(missing), 'non-image refs dropped', sorted(bogus))
print('empty bodies:', [r[0] for r in report if r[1] < 40])
