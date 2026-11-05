#!/usr/bin/env python3
"""Fetch real supermarket prices from Open Prices (prices.openfoodfacts.org)
for the Mutfak Planı ingredient DB. Produces curated_prices.json for the app."""
import json, re, time, statistics, urllib.request, urllib.parse, os

API = 'https://prices.openfoodfacts.org/api/v1/'
CACHE = '/tmp/price_fetch_cache.json'
OUT = os.path.join(os.path.dirname(__file__), '..', 'curated_prices.json')

# name: (search, include_regex, exclude, mode, qmin, qmax)
# mode: 'mass' (per kg from g/ml), 'piece' (per piece)
SPEC = {
  'kırmızı mercimek': ('rote Linsen', r'linsen', ['kicher'], 'mass', 200, 2000),
  'nohut': ('Kichererbsen', r'kichererbse', [], 'mass', 200, 1000),
  'kuru fasulye': ('Kidneybohnen', r'kidneybohn', [], 'mass', 200, 1000),
  'bulgur': ('Bulgur', r'bulgur', [], 'mass', 250, 2000),
  'pirinç': ('Langkornreis', r'reis', ['reiswaffel','milchreis','getränk','drink'], 'mass', 250, 2000),
  'makarna': ('Spaghetti', r'spaghetti', [], 'mass', 250, 2000),
  'erişte': ('Bandnudeln', r'bandnudel', [], 'mass', 250, 1000),
  'un': ('Weizenmehl', r'mehl', ['vollkorn'], 'mass', 400, 2000),
  'yulaf': ('Haferflocken', r'haferflocken', [], 'mass', 250, 2000),
  'tereyağı': ('Butter', r'\butter\b|butter\b', ['nuss','nussbutter','body','dusch','creme','erdnuss','keks','cookie','peanut','popcorn','krauter','kräuter'], 'mass', 200, 500),
  'sıvı yağ': ('Sonnenblumenöl', r'sonnenblumen', [], 'mass', 500, 3000),
  'zeytinyağı': ('Olivenöl', r'olivenöl', ['balsamico'], 'mass', 250, 2000),
  'soğan': ('Zwiebeln', r'zwiebel', ['suppe','brühe','brot','knoblauch'], 'mass', 500, 3000),
  'sarımsak': ('Knoblauch', r'knoblauch', ['salz','brot','suppe','öl','gewürz','paste'], 'mass', 100, 500),
  'domates': ('Tomaten', r'tomate', ['passiert','getrocknet','sugo','soup','saft','stückchen','dose','mark','ketchup'], 'mass', 400, 2000),
  'domates salçası': ('Tomatenmark', r'tomatenmark', [], 'mass', 140, 400),
  'biber salçası': ('Paprikamark', r'paprikamark|ajvar', ['scharf'], 'mass', 140, 500),
  'dana kıyma': ('Rinderhackfleisch', r'rinderhack', [], 'mass', 300, 1500),
  'kuşbaşı dana et': ('Rindergulasch', r'rindergulasch|rinderfleisch|gulasch vom rind', [], 'mass', 300, 1500),
  'tavuk göğsü': ('Hähnchenbrustfilet', r'hähnchenbrust|hähnchen filet|haehnchenbrust', ['gegart','mariniert','geschnitten'], 'mass', 400, 1500),
  'tavuk but': ('Hähnchenkeule', r'hähnchenkeule|keulen', [], 'mass', 500, 2000),
  'patlıcan': ('Aubergine', r'aubergine', ['aufstrich','dip','gegrillt','paste'], 'mass', 500, 2000),
  'kabak': ('Zucchini', r'zucchini', [], 'mass', 500, 2000),
  'biber': ('Paprika', r'paprika', ['gewürz','salz','paste','pulver','scharf','saft','getränk','rot mark'], 'mass', 400, 1500),
  'havuç': ('Karotten', r'karotten|möhren', ['saft','suppe'], 'mass', 500, 2000),
  'patates': ('Kartoffeln', r'kartoffel', ['salat','chips','püree','ofen','suppe','knödel'], 'mass', 1000, 5000),
  'ıspanak': ('Blattspinat', r'spinat', ['rahm','creme','suppe'], 'mass', 400, 1500),
  'pırasa': ('Porree', r'porree|lauch', ['suppe'], 'mass', 300, 1000),
  'karnabahar': ('Blumenkohl', r'blumenkohl', ['suppe'], 'mass', 600, 2000),
  'dondurulmuş bezelye': ('Erbsen', r'erbsen', ['möhren','suppe','getrocknet'], 'mass', 300, 1000),
  'taze fasulye': ('grüne Bohnen', r'grüne bohnen|buschbohnen|bohnen grün', ['dose','suppe'], 'mass', 300, 1000),
  'mantar': ('Champignons', r'champignon', ['trocken','getrocknet','suppe'], 'mass', 300, 1000),
  'brokoli': ('Brokkoli', r'brokkoli', ['suppe','auflauf'], 'mass', 400, 1000),
  'salatalık': ('Gurke', r'gurke', ['gewürzgurken','snack'], 'mass', 300, 1000),
  'marul': ('Kopfsalat', r'kopfsalat|eisberg', [], 'piece', 1, 3),
  'süt': ('Vollmilch', r'vollmilch', ['laktosefrei','barista','milkshake'], 'mass', 500, 1500),
  'yoğurt': ('Naturjoghurt', r'naturjoghurt|joghurt natur', [], 'mass', 400, 1000),
  'lor': ('Speisequark', r'quark', [], 'mass', 250, 1000),
  'beyaz peynir': ('Feta', r'feta|schafsweichkäse|weichkäse', ['olivenöl'], 'mass', 150, 400),
  'kaşar peyniri': ('Gouda', r'gouda', [], 'mass', 200, 400),
  'yumurta': ('Eier Freiland', r'eier|eier freiland', [], 'egg', 6, 12),
  'zeytin': ('Oliven schwarz', r'oliven', ['öl extra'], 'mass', 100, 500),
  'ekmek': ('Baguette', r'baguette|stangenbrot|weizenbrot', [], 'piece', 1, 2),
  'tahin': ('Sesammus', r'sesammus|tahini|tahin', [], 'mass', 200, 500),
  'bal': ('Honig', r'honig', ['met','getränk','keks','bonbon','senf'], 'mass', 250, 1000),
  'muz': ('Bananen', r'bananen', ['chips','getränk','joghurt','kompott','trocken'], 'mass', 500, 2000),
  'somon fileto': ('Lachsfilet', r'lachsfilet|lachs filet', ['geräuchert','gebeizt'], 'mass', 200, 500),
  'ton balığı konserve': ('Thunfisch Dose', r'thunfisch', ['salat','sandwich'], 'tuna', 80, 250),
  'limon': ('Zitrone', r'zitrone|zitronen', ['saft','getränk','limette'], 'piece', 1, 3),
}

RETAILERS = [
  ('Aldi', re.compile(r'\baldi\b|aldi süd|aldi nord', re.I)),
  ('Lidl', re.compile(r'\blidl\b', re.I)),
  ('Netto', re.compile(r'\bnetto\b', re.I)),
  ('Penny', re.compile(r'\bpenny\b|penny-market', re.I)),
  ('Rewe', re.compile(r'\brewe\b', re.I)),
  ('Edeka', re.compile(r'\bedeka\b|e-center|nah und gut', re.I)),
]

def get(path, **params):
    url = API + path + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'Accept': 'application/json', 'User-Agent': 'mutfak-plani/0.2 (prototype)'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                return json.load(r)
        except Exception:
            if attempt == 2: raise
            time.sleep(1.5)

def retailer_of(loc):
    text = ((loc or {}).get('osm_display_name') or '') + ' ' + ((loc or {}).get('osm_name') or '')
    for name, rx in RETAILERS:
        if rx.search(text): return name
    return None

def in_germany(loc):
    return 'Germany' in ((loc or {}).get('osm_display_name') or '') or 'Deutschland' in ((loc or {}).get('osm_display_name') or '')

def parse_eggs(name):
    m = re.search(r'(\d+)\s*(stück|stk|er\b|eiern)', name, re.I)
    if m: return int(m.group(1))
    for n in (10, 12, 6, 4, 20):
        if re.search(rf'\b{n}\b', name): return n
    return None

cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}

def fetch_prices_for_product(pid):
    key = f'p{pid}'
    if key not in cache:
        try:
            cache[key] = get('prices', product_id=pid, size=60).get('items', [])
        except Exception:
            cache[key] = []
        time.sleep(0.12)
    return cache[key]

results = {}
for ing, (term, inc, exc, mode, qmin, qmax) in SPEC.items():
    key = f'prod:{term}'
    if key not in cache:
        try:
            cache[key] = get('products', product_name__like=term, price_count__gte=1, size=60).get('items', [])
        except Exception as e:
            print('ERR products', ing, e); cache[key] = []
        time.sleep(0.12)
    prods = cache[key]
    rx = re.compile(inc, re.I)
    excr = [re.compile(x, re.I) for x in exc]
    per_retailer = {}   # retailer -> list of (price_per_unit, date)
    used = 0
    for p in prods:
        name = p.get('product_name') or ''
        q, u = p.get('product_quantity'), p.get('product_quantity_unit')
        if not name or not rx.search(name): continue
        if any(e.search(name) for e in excr): continue
        if mode == 'mass':
            if u not in ('g', 'ml') or not q or not (qmin <= q <= qmax): continue
        elif mode == 'tuna':
            if u not in ('g', 'ml') or not q or not (qmin <= q <= qmax): continue
        elif mode == 'piece':
            if not q or not (qmin <= q <= qmax) or u not in (None, '', 'st', 'Stück'): continue
        elif mode == 'egg':
            n = parse_eggs(name)
            if not n or not (4 <= n <= 20): continue
            q, u = n, 'egg'
        prices = fetch_prices_for_product(p['id'])
        for it in prices:
            loc = it.get('location') or {}
            if not in_germany(loc): continue
            ret = retailer_of(loc)
            if not ret: continue
            d = it.get('date') or ''
            if d < '2025-01-01': continue
            price = it.get('price')
            if price is None: continue
            if mode == 'mass':
                ppu = price * 1000.0 / q          # €/kg
            elif mode == 'tuna':
                ppu = price                        # €/can (quantity range already 80-250g)
            elif mode == 'egg':
                ppu = price / q                    # €/egg
            else:
                ppu = price                        # €/piece
            per_retailer.setdefault(ret, []).append((ppu, d))
        used += 1
        if used >= 12: break
    agg = {}
    for ret, vals in per_retailer.items():
        if len(vals) >= 2:
            agg[ret] = {
                'median': round(statistics.median(v for v, _ in vals), 3),
                'n': len(vals),
                'latest': max(d for _, d in vals),
            }
    results[ing] = agg
    print(f'{ing:24s} products_used={used:2d} retailers={ {k: (v["n"], v["median"]) for k, v in agg.items()} }')

json.dump(cache, open(CACHE, 'w'))
json.dump(results, open(OUT, 'w'), ensure_ascii=False, indent=1)
print('saved', OUT)
