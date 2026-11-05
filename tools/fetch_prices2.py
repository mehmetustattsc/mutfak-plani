#!/usr/bin/env python3
"""Round 2: fetch prices for missing/new ingredients, merge into curated_prices.json."""
import json, re, time, statistics, urllib.request, urllib.parse, os

API = 'https://prices.openfoodfacts.org/api/v1/'
CACHE = '/tmp/price_fetch_cache.json'
OUT = os.path.join(os.path.dirname(__file__), '..', 'curated_prices.json')

SPEC = {
  'nohut': ('Kichererbsen', r'kichererbse', [], 'mass', 120, 1000),
  'kuru fasulye': ('Kidneybohnen', r'kidneybohn', [], 'mass', 120, 1000),
  'bulgur': ('Bulgur', r'bulgur', [], 'mass', 250, 2000),
  'tereyağı': ('Butter', r'\butter\b|butter', ['nuss','body','dusch','creme','erdnuss','keks','cookie','peanut','popcorn','kraut'], 'mass', 200, 500),
  'dana kıyma': ('Hackfleisch', r'hackfleisch', ['puten','hähnchen','vegan'], 'mass', 300, 1500),
  'kuşbaşı dana et': ('Rindergulasch', r'gulasch|rinder', ['suppe','dose'], 'mass', 300, 1500),
  'tavuk göğsü': ('Hähnchenbrust', r'hähnchenbrust|hähnchen filet|haehnchenbrust|hähnchenfilet', ['gegart','mariniert','geschnitten','nuggets'], 'mass', 300, 1500),
  'tavuk but': ('Hähnchenkeulen', r'keule', [], 'mass', 400, 2000),
  'patlıcan': ('Auberginen', r'aubergine', ['aufstrich','dip','gegrillt','paste'], 'mass', 400, 2000),
  'biber': ('Gemüsepaprika', r'paprika', ['gewürz','salz','paste','pulver','scharf','saft','getränk','rot mark','grill'], 'mass', 300, 1500),
  'ıspanak': ('Spinat', r'spinat', ['rahm','creme','suppe','päckchen'], 'mass', 300, 1500),
  'mantar': ('Champignons', r'champignon', ['trocken','getrocknet','suppe','dose'], 'mass', 200, 1000),
  'marul': ('Kopfsalat', r'kopfsalat|eisberg|salat', [], 'piece', 1, 3),
  'beyaz peynir': ('Schafskäse', r'schafskäse|feta|hirtenkäse', ['öl'], 'mass', 150, 400),
  'kaşar peyniri': ('Gouda', r'gouda', [], 'mass', 150, 500),
  'yumurta': ('Eier', r'eier', [], 'egg', 4, 20),
  'zeytin': ('Oliven', r'oliven', ['öl extra'], 'mass', 100, 500),
  'ekmek': ('Baguette', r'baguette|stangenbrot|weizenbrot', [], 'piece', 1, 2),
  'tahin': ('Tahini', r'sesammus|tahini|tahin', [], 'mass', 200, 500),
  'muz': ('Bananen', r'bananen', ['chips','getränk','joghurt','kompott','trocken'], 'mass', 400, 2000),
  'somon fileto': ('Lachs', r'lachsfilet|lachs filet|lachssteak', ['geräuchert','gebeizt','teriyaki'], 'mass', 200, 500),
  'ton balığı konserve': ('Thunfisch', r'thunfisch', ['salat','sandwich','snack'], 'tuna', 80, 250),
  'limon': ('Zitronen', r'zitrone|zitronen', ['saft','getränk','limette'], 'piece', 1, 3),
  # --- yeni malzemeler ---
  'şeker': ('Haushaltszucker', r'zucker', ['brauner','puder','vanille','braun','kandis','wuerfel'], 'mass', 500, 2000),
  'ceviz': ('Walnüsse', r'walnuss|walnüsse', ['öl'], 'mass', 200, 1000),
  'bitter çikolata': ('Zartbitterschokolade', r'zartbitter', [], 'mass', 80, 250),
  'kakao': ('Kakaopulver', r'kakao', ['getränk','drink','trink'], 'mass', 100, 500),
  'mascarpone': ('Mascarpone', r'mascarpone', [], 'mass', 250, 500),
  'bisküvi': ('Butterkekse', r'butterkeks|butterkekse|kekse', ['schoko','vollkorn'], 'mass', 200, 400),
  'süt kreması': ('Schlagsahne', r'schlagsahne|sahne', ['sahne pudding','kaffee'], 'mass', 200, 500),
  'elma': ('Äpfel', r'apfel|äpfel', ['saft','mus','getränk','chips','strudel'], 'mass', 500, 2500),
  'portakal': ('Orangen', r'orange|orangen', ['saft','getränk','marmelade'], 'mass', 500, 2000),
  'schinken (jambon)': ('Schinken', r'schinken', ['sauce','suppe'], 'mass', 100, 300),
  'bratwurst': ('Bratwurst', r'bratwurst', [], 'mass', 200, 600),
  'grieß (irmik)': ('Grieß', r'grieß|griess', ['pudding','brei' if False else 'süß'], 'mass', 250, 1000),
  'marmelat': ('Erdbeermarmelade', r'marmelade|konfitüre', [], 'mass', 200, 450),
  'brötchen': ('Brötchen', r'brötchen|semmel|weckle|schrippe', ["vollkorn"], 'piece', 1, 6),
  'croissant': ('Croissant', r'croissant', ['chips'], 'piece', 1, 10),
  'parmesan': ('Parmesan', r'parmesan|grana padano', [], 'mass', 100, 300),
  'mozzarella': ('Mozzarella', r'mozzarella', [], 'mass', 125, 500),
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
    dn = (loc or {}).get('osm_display_name') or ''
    return 'Germany' in dn or 'Deutschland' in dn

def parse_eggs(name):
    m = re.search(r'(\d+)\s*(stück|stk|er\b|eiern)', name, re.I)
    if m: return int(m.group(1))
    for n in (10, 12, 6, 4, 20, 18):
        if re.search(rf'\b{n}\b', name): return n
    return None

cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
results = json.load(open(OUT))

# estimates for sanity band (€ per kg / piece / egg / can)
EST = {
  'nohut': 4.0, 'kuru fasulye': 4.0, 'bulgur': 2.2, 'tereyağı': 12.0, 'dana kıyma': 18.0,
  'kuşbaşı dana et': 22.0, 'tavuk göğsü': 11.0, 'tavuk but': 9.0, 'patlıcan': 2.2,
  'biber': 4.0, 'ıspanak': 4.0, 'mantar': 5.0, 'marul': 1.2, 'beyaz peynir': 12.0,
  'kaşar peyniri': 14.0, 'yumurta': 0.45, 'zeytin': 18.0, 'ekmek': 0.4, 'tahin': 20.0,
  'muz': 2.3, 'somon fileto': 28.0, 'ton balığı konserve': 1.6, 'limon': 0.4,
  'şeker': 1.2, 'ceviz': 28.0, 'bitter çikolata': 18.0, 'kakao': 20.0, 'mascarpone': 12.0,
  'bisküvi': 12.0, 'süt kreması': 4.5, 'elma': 3.0, 'portakal': 5.0, 'schinken (jambon)': 20.0,
  'bratwurst': 18.0, 'grieß (irmik)': 4.0, 'marmelat': 8.0, 'brötchen': 0.35, 'croissant': 0.55,
  'parmesan': 22.0, 'mozzarella': 11.0,
}

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
    est = EST.get(ing, 5.0)
    per_retailer = {}
    used = 0
    for p in prods:
        name = p.get('product_name') or ''
        q, u = p.get('product_quantity'), p.get('product_quantity_unit')
        if not name or not rx.search(name): continue
        if any(e.search(name) for e in excr): continue
        if mode in ('mass', 'tuna'):
            if u not in ('g', 'ml') or not q or not (qmin <= q <= qmax): continue
        elif mode == 'piece':
            if not q or not (qmin <= q <= qmax) or u not in (None, '', 'st', 'Stück'): continue
        elif mode == 'egg':
            n = parse_eggs(name)
            if not n or not (4 <= n <= 20): continue
            q, u = n, 'egg'
        prices = cache.get(f'p{p["id"]}')
        if prices is None:
            try:
                prices = get('prices', product_id=p['id'], size=60).get('items', [])
            except Exception:
                prices = []
            cache[f'p{p["id"]}'] = prices
            time.sleep(0.12)
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
                ppu = price * 1000.0 / q
            elif mode == 'tuna':
                ppu = price
            elif mode == 'egg':
                ppu = price / q
            else:
                ppu = price
            # sanity band: 0.25x - 5x of estimate
            if not (est * 0.25 <= ppu <= est * 5): continue
            per_retailer.setdefault(ret, []).append((ppu, d))
        used += 1
        if used >= 12: break
    agg = {}
    for ret, vals in per_retailer.items():
        if len(vals) >= 2:
            agg[ret] = {'median': round(statistics.median(v for v, _ in vals), 3), 'n': len(vals), 'latest': max(d for _, d in vals)}
    if agg or ing not in results or not results.get(ing):
        results[ing] = agg
    print(f'{ing:24s} used={used:2d} -> { {k: (v["n"], v["median"]) for k, v in agg.items()} }')

json.dump(cache, open(CACHE, 'w'))
json.dump(results, open(OUT, 'w'), ensure_ascii=False, indent=1)
print('saved', OUT)
