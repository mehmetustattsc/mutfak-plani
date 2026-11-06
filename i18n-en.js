'use strict';
/* =========================================================
   i18n — English (UI, ingredients, cuisines, recipes)
   Keys = original Turkish text
   ========================================================= */
window.I18N = window.I18N || {};
window.I18N.en = {
  ui: {
    'Mutfak Planı': 'Meal Planner',
    'Haftalık yemek & alışveriş planlayıcı': 'Weekly meal & shopping planner',
    'Ana menü': 'Main menu',
    'Anasayfa': 'Home',
    'Haftalık Plan': 'Weekly Plan',
    'Dolaptan Yemek': 'From the Fridge',
    'Özel Tarifler': 'Special Recipes',
    'Bu hafta ne pişirsek?': 'What shall we cook this week?',
    'Hane halkınızı, mutfaklarınızı ve bütçenizi bir kez girin — haftalık menü, tarifler ve market fiyatlarıyla alışveriş listesi kendiliğinden oluşsun.': 'Enter your household, cuisines and budget once — the weekly menu, recipes and a shopping list with real supermarket prices are generated automatically.',
    'Bilgileri gir': 'Enter details',
    'hane, mutfaklar, bütçe, elemeler': 'household, cuisines, budget, exclusions',
    'Planı oluştur': 'Create the plan',
    'menüler + beslenme çantaları': 'menus + lunchboxes',
    'Alışverişe çık': 'Go shopping',
    'gerçek market fiyatlarıyla': 'with real supermarket prices',
    '1 · Haneniz': '1 · Your household',
    'Yaş ve cinsiyet porsiyonları otomatik hesaplar. Sabah işe veya okula gidenler için günlük beslenme çantası önerilir; kahvaltı sadece evde kalanlara planlanır.': 'Age and gender calculate portions automatically. Daily lunchbox suggestions are made for those going to work or school; breakfast is planned only for those staying home.',
    'Yaş': 'Age',
    'Cinsiyet': 'Gender',
    'Kadın': 'Female',
    'Erkek': 'Male',
    'Sabah programı': 'Morning',
    'Evde kahvaltı': 'Breakfast at home',
    'İş — beslenme': 'Work — lunchbox',
    'Okul — beslenme': 'School — lunchbox',
    'Kaldır': 'Remove',
    '+ Kişi ekle': '+ Add person',
    'Hane toplamı': 'Household total',
    'porsiyon': 'portions',
    '2 · Hangi mutfaklar?': '2 · Which cuisines?',
    'Birden fazla mutfak seçebilirsiniz — sabah Brötchen, akşam kavurmalı pilav olabilir. Seçmediğiniz mutfaklardan da haftada bir-iki sürpriz öneri gelir.': 'You can pick several cuisines — Brötchen in the morning, roast rice pilaf at night. One or two surprise suggestions per week also come from cuisines you did not pick.',
    '3 · Beslenme tercihi': '3 · Dietary preference',
    'Hane genelinde geçerli tercihler. Sporcu ve diyet modları eleme yapmaz, seçimleri o yöne kaydırır.': 'Applies to the whole household. Athlete and diet modes do not exclude anything, but tilt the selection that way.',
    'Beslenme şekli': 'Diet type',
    'Hepçil': 'Omnivore',
    'Vejetaryen': 'Vegetarian',
    'Vegan': 'Vegan',
    'Ek tercihler': 'Extra preferences',
    'Helal (domuz ürünleri hariç)': 'Halal (no pork products)',
    'Sporcu (protein ağırlıklı)': 'Athlete (protein-focused)',
    'Diyet (hafif yemekler öncelikli)': 'Diet (light dishes preferred)',
    '4 · Haftalık bütçe': '4 · Weekly budget',
    'Kahvaltı ve akşam yemeği için tahmini toplam harcama aralığı (malzemeler dahil).': 'Estimated weekly spending range for breakfast and dinner (ingredients included).',
    'Alt sınır': 'Lower limit',
    'Üst sınır': 'Upper limit',
    'İpucu: 4 kişilik bir hanede kahvaltı + akşam yemeği için tipik aralık 60–110 € arasıdır. Plan, aralığın ortasına yakın bir maliyetle oluşturulur.': 'Tip: for a 4-person household the typical range for breakfast + dinner is €60–110. The plan is created with a cost near the middle of the range.',
    '5 · Neleri eleyelim?': '5 · What to exclude?',
    'Alerjiniz olan, asla yenmesini istemediğiniz veya hoşlanmadığınız her şeyi seçin.': 'Select everything you are allergic to, never want served, or simply dislike.',
    'Alerjenler ve büyük gruplar': 'Allergens and major groups',
    'Sevilmeyen malzemeler': 'Disliked ingredients',
    'Serbest metin': 'Free text',
    'Örn: kereviz, midye, kuzu eti…': 'e.g. celery, mussels, lamb…',
    'Virgülle ayırarak birden fazla malzeme yazabilirsiniz.': 'You can list several ingredients, separated by commas.',
    '6 · Mutlaka olsun': '6 · Must-haves',
    'Haftalık planda garanti edilmesini istediğiniz kuralları seçin. Misafir, öğle yemeği ve tatlı eklemeyi plan oluşturduktan sonra gün bazında yaparsınız.': 'Pick the rules you want guaranteed in the weekly plan. Guests, lunch and dessert are added per day after the plan is created.',
    'Belirli bir malzeme şartı': 'Specific ingredient requirement',
    'Örn: mercimek, tavuk, ıspanak…': 'e.g. lentils, chicken, spinach…',
    'Bu malzemeyi içeren en az 2 yemek plana alınır (mümkünse).': 'At least 2 dishes containing this ingredient make it into the plan (if possible).',
    'Haftalık Planı Oluştur': 'Create weekly plan',
    'Haftalık planınız hazır': 'Your weekly plan is ready',
    'kişi': 'people',
    'kişi için günlük beslenme çantası': 'daily lunchbox(es)',
    'haftalık tüketim maliyeti': 'weekly consumption cost',
    'bütçe aralığınız': 'your budget range',
    'tam paket alımlarıyla alışveriş sepeti': 'shopping basket with full packs',
    'Başka bir plan': 'Another plan',
    'Ayarları değiştir': 'Change settings',
    'Alışveriş Listesi': 'Shopping List',
    'Market Karşılaştırma': 'Supermarket Comparison',
    'Bütçe aralığı:': 'Budget range:',
    'misafir, öğle ve tatlı eklemeleri dahil': 'incl. guest, lunch and dessert extras',
    'Kahvaltı': 'Breakfast',
    'Beslenme (iş/okul)': 'Lunchbox',
    'Akşam': 'Dinner',
    'Öğle': 'Lunch',
    'Tatlı': 'Dessert',
    'misafirli': 'with guests',
    '/porsiyon': '/serving',
    '/kişi': '/person',
    '+ Öğle': '+ Lunch',
    'Öğle kaldır': 'Remove lunch',
    '+ Tatlı': '+ Dessert',
    'Tatlı kaldır': 'Remove dessert',
    '+ Misafir': '+ Guests',
    'Misafir artır': 'More guests',
    'Misafir azalt': 'Fewer guests',
    'Misafir kaldır': 'Remove guests',
    'dk': 'min',
    'ürün': 'items',
    'tahmini': 'estimated',
    'gerçek': 'real',
    'Open Prices topluluk verisi, ': 'Open Prices community data, ',
    'Market': 'Store',
    'Tahmini sepet': 'Estimated basket',
    'Gerçek fiyat': 'Real prices',
    'Fark': 'Difference',
    'En uygun': 'Cheapest',
    'Dolaptaki ürünlerle ne yapsak?': 'What can I make from the fridge?',
    'Elinizdeki malzemeleri girin; dolabınıza en uygun tarifleri eksik malzemeleriyle birlikte önereyim.': 'Type in what you have on hand — you will get the best matching recipes including missing ingredients.',
    'Malzeme ekle': 'Add ingredient',
    'Yazmaya başlayın: domates, yumurta, pirinç…': 'Start typing: tomatoes, eggs, rice…',
    'Yemek Öner': 'Suggest a dish',
    'Önce dolabınızdaki birkaç malzemeyi ekleyin.': 'First add a few ingredients from your fridge.',
    'Dolabınıza göre': 'Suggestions for your fridge',
    'öneri': '',
    'Her şey dolapta': 'Everything in the fridge',
    'Eksik:': 'Missing:',
    'malzeme': 'ingredients',
    'Tarifi gör': 'View recipe',
    'Planın dışında, meraklısına tarifler: evde ekmek, suşi, el yapımı makarna ve dahası.': 'Recipes beyond the plan, for the curious: homemade bread, sushi, hand-rolled pasta and more.',
    'Kapat': 'Close',
    'Akşam yemeği': 'Dinner',
    'Öğle yemeği': 'Lunch',
    'Beslenme çantası': 'Lunchbox',
    'Özel tarif': 'Special recipe',
    'Malzemeler (haneye göre ölçekli)': 'Ingredients (scaled to household)',
    'Malzemeler (kişi başı)': 'Ingredients (per person)',
    'Malzemeler': 'Ingredients',
    'Hazırlanışı': 'Preparation',
    'hane için:': 'for household:',
    '(4 kişilik)': '(serves 4)',
    'En az bir mutfak seçin.': 'Select at least one cuisine.',
    'Geçerli bir bütçe aralığı girin (alt ≤ üst).': 'Enter a valid budget range (lower ≤ upper).',
    'En az bir kişi gerekli.': 'At least one person is required.',
    'Seçimlerinizle (mutfaklar + elemeler) 7 ayrı akşam yemeği kalmadı. Mutfak ekleyin veya bazı elemeleri kaldırın.': 'With your selection (cuisines + exclusions) fewer than 7 distinct dinners remain. Add cuisines or remove some exclusions.',
    'Elemelerinizle uygun kahvaltı kalmadı. Lütfen bazı elemeleri kaldırın.': 'No breakfast survives your exclusions. Please remove some exclusions.',
    'Seçimlerinizle uygun beslenme çantası önerisi kalmadı. Lütfen bazı elemeleri kaldırın.': 'No lunchbox suggestion survives your selection. Please remove some exclusions.',
    'Yeni bir plan oluşturuldu.': 'A new plan has been created.',
    'Not: Seçimlerinizle tüm şartlar aynı anda karşılanamadı; en yakın plan oluşturuldu.': 'Note: your settings could not all be satisfied at once; the closest possible plan was created.',
    'Seçimlerinizle uygun öğle yemeği kalmadı (eleme çok kısıtlayıcı).': 'No lunch option survives your selection (exclusions too strict).',
    'Seçimlerinizle uygun tatlı kalmadı.': 'No dessert survives your selection.',
    'Bu malzemelerle uygun bir tarif bulunamadı. Birkaç malzeme daha eklemeyi deneyin.': 'No matching recipe found for these ingredients. Try adding a few more.',
    'Vegan seçim: tüm tarifler bitkisel.': 'Vegan selection: all recipes are plant-based.',
    'Vejetaryen seçim: et ve balık içeren tarifler çıkarıldı.': 'Vegetarian selection: recipes with meat and fish were removed.',
    'Helal seçim: domuz ürünleri (jambon, speck, bratwurst) içeren tarifler çıkarıldı.': 'Halal selection: recipes with pork products (ham, bacon, bratwurst) were removed.',
    'Seçili mutfakta yeterli uygun tarif olmadığı için tüm mutfaklardan seçim yapıldı.': 'Not enough matching recipes in the selected cuisines — recipes were chosen from all cuisines.',
    'yetişkin kadın = 1,0': 'adult woman = 1.0',
    'yetişkin erkek = 1,15': 'adult man = 1.15',
    'çocuklar yaşa göre daha az': 'children get less depending on age',
    'Malzeme miktarları buna göre otomatik ölçeklenir.': 'Ingredient amounts are scaled automatically accordingly.',
  },
  ing: {
    'kırmızı mercimek': 'red lentils', 'nohut': 'chickpeas', 'kuru fasulye': 'white beans',
    'bulgur': 'bulgur', 'pirinç': 'rice', 'makarna': 'pasta', 'erişte': 'egg noodles',
    'un': 'flour', 'yulaf': 'oats', 'tereyağı': 'butter', 'sıvı yağ': 'cooking oil',
    'zeytinyağı': 'olive oil', 'soğan': 'onions', 'sarımsak': 'garlic', 'domates': 'tomatoes',
    'domates salçası': 'tomato paste', 'biber salçası': 'pepper paste', 'dana kıyma': 'ground beef',
    'kuşbaşı dana et': 'beef cubes', 'tavuk göğsü': 'chicken breast', 'tavuk but': 'chicken thighs',
    'patlıcan': 'eggplants', 'kabak': 'zucchini', 'biber': 'bell peppers', 'havuç': 'carrots',
    'patates': 'potatoes', 'ıspanak': 'spinach', 'pırasa': 'leeks', 'karnabahar': 'cauliflower',
    'dondurulmuş bezelye': 'frozen peas', 'taze fasulye': 'green beans', 'mantar': 'mushrooms',
    'brokoli': 'broccoli', 'salatalık': 'cucumbers', 'marul': 'lettuce', 'süt': 'milk', 'yoğurt': 'yogurt',
    'lor': 'quark', 'beyaz peynir': 'white cheese (feta)', 'kaşar peyniri': 'sliced cheese', 'yumurta': 'eggs',
    'zeytin': 'olives', 'simit': 'simit', 'ekmek': 'bread', 'tahin': 'tahini', 'pekmez': 'pekmez (grape molasses)',
    'bal': 'honey', 'muz': 'bananas', 'somon fileto': 'salmon fillet', 'ton balığı konserve': 'canned tuna',
    'limon': 'lemons', 'nane': 'mint', 'maydanoz': 'parsley', 'dereotu': 'dill',
    'kimyon': 'cumin', 'karabiber': 'black pepper', 'tuz': 'salt', 'pul biber': 'chili flakes',
    'kekik': 'oregano', 'şeker': 'sugar', 'ceviz': 'walnuts', 'bitter çikolata': 'dark chocolate',
    'kakao': 'cocoa', 'mascarpone': 'mascarpone', 'bisküvi': 'biscuits', 'vanilya': 'vanilla',
    'süt kreması': 'cream', 'elma': 'apples', 'tarçın': 'cinnamon', 'portakal': 'oranges',
    'lahana': 'white cabbage', 'kereviz': 'celery', 'soya sosu': 'soy sauce', 'nori': 'nori',
    'avokado': 'avocados', 'tortilla': 'tortillas', 'köri': 'curry powder', 'zerdeçal': 'turmeric',
    'schinken (jambon)': 'ham', 'bratwurst': 'bratwurst', 'speck (domuz pastırması)': 'bacon',
    'grieß (irmik)': 'semolina', 'marmelat': 'jam', 'brötchen': 'bread rolls', 'croissant': 'croissants',
    'parmesan': 'parmesan', 'mozzarella': 'mozzarella', 'lahmacun': 'lahmacun',
    'baklava (hazır)': 'baklava (ready-made)', 'karışık berry (donmuş)': 'mixed berries (frozen)',
    'kahve': 'coffee', 'maya': 'yeast', 'hardal': 'mustard',
  },
  cuisines: {
    tr: ['Turkish cuisine', 'Soups, legumes, vegetable stews, rice'],
    it: ['Italian cuisine', 'Pasta, pizza, risotto'],
    fr: ['French cuisine', 'Gratin, quiche, stews'],
    de: ['German cuisine', 'Schnitzel, bratwurst, spätzle'],
    gr: ['Greek cuisine', 'Moussaka, dolma, meze'],
    cn: ['Chinese cuisine', 'Wok, noodles, stir-fry'],
    in: ['Indian cuisine', 'Curry, dal, spices'],
    mx: ['Mexican cuisine', 'Tacos, burritos, guacamole'],
    jp: ['Japanese cuisine', 'Teriyaki, ramen, donburi'],
    mix: ['Mixed cuisine', 'A mix of all cuisines'],
  },
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  tags: {
    vegan: 'Vegan', vejetaryen: 'Vegetarian', balik: 'Fish', pratik: 'Quick', corba: 'Soup',
    baklagil: 'Legumes', tahil: 'Rice/Bulgur', makarna: 'Pasta', etli: 'Meaty',
    tavuk: 'Chicken', sebze: 'Vegetable', misafir: 'Guests', firin: 'Oven', ozel: 'Special',
  },
  units: { g: 'g', adet: 'pc', tutam: 'pinch', tk: 'tsp' },
  meals: {
    dinner: 'Dinner', breakfast: 'Breakfast', lunch: 'Lunch',
    dessert: 'Dessert', lunchbox: 'Lunchbox', special: 'Special recipe',
  },
  allergens: {
    'Gluten / Buğday': 'Gluten / Wheat', 'Süt / Laktoz': 'Milk / Lactose', 'Yumurta': 'Egg',
    'Susam': 'Sesame', 'Kuruyemiş': 'Nuts', 'Balık': 'Fish', 'Kırmızı Et': 'Red meat',
    'Tavuk': 'Chicken', 'Domuz': 'Pork',
  },
  mustRules: {
    baklagil2: 'At least 2 legume dishes per week',
    balik1: 'At least 1 fish dish per week',
    corba1: 'At least 1 soup per week',
    tavuk2: 'At least 2 chicken dishes per week',
    sebze3: 'Vegetable-focused (at least 3 vegetable dishes)',
    tahil2: 'At least 2 rice / bulgur dishes per week',
    etli2: 'At least 2 red-meat dishes per week',
  },
  recipes: {},
};
(function (R) {
  /* Turkish cuisine */
  R['mercimek-corba'] = { name: 'Red Lentil Soup + Bread', steps: ['Rinse the lentils. Dice onion, carrot and potato.', 'Sauté the vegetables in oil for 3-4 minutes, stir in the tomato paste.', 'Add lentils and 1.2 l water and simmer for 30 minutes.', 'Blend until smooth, season with butter and cumin.', 'Serve with toasted bread and dried mint.'] };
  R['kuru-fasulye'] = { name: 'White Bean Stew + Rice', steps: ['Soak the beans overnight (or boil for 1 hour).', 'Sauté the onion in oil, add the tomato paste.', 'Add beans and 4 cups of water and cook until tender.', 'In a separate pot, sauté rice in butter and cook with water at a 1:1.5 ratio.', 'Serve the beans over the rice.'] };
  R['nohut-yemegi'] = { name: 'Chickpea Stew + Bulgur', steps: ['Soak the chickpeas overnight and boil until tender.', 'Sauté the onion and add both pastes.', 'Add the chickpeas with their liquid and simmer for 20 minutes.', 'Cook the bulgur like rice at a 1:1.5 ratio.', 'Serve hot alongside the bulgur.'] };
  R['etli-taze-fasulye'] = { name: 'Green Beans with Beef + Rice', steps: ['Sear the beef cubes over high heat.', 'Add the onion and sauté, stir in the tomato paste.', 'Add the trimmed beans and sauté for 3 minutes.', 'Cover with hot water and simmer for 40 minutes.', 'Serve with rice.'] };
  R['karniyarik'] = { name: 'Karnıyarık (Stuffed Eggplant) + Rice', steps: ['Peel the eggplants in stripes and soak in salted water for 15 minutes.', 'Lightly fry on both sides in a little oil (or roast for 20 minutes in the oven).', 'In a separate pan, sauté ground beef and onion and prepare the filling with paste, tomato and pepper.', 'Slit the eggplants open and fill them.', 'Add a little water and bake at 180 °C for 25 minutes. Serve with rice.'] };
  R['tavuk-sote'] = { name: 'Chicken Stir-Fry with Vegetables', steps: ['Dice the chicken and marinate with salt and pepper.', 'Sear the chicken over high heat and set aside.', 'Sauté onion, pepper and mushrooms in the same pan.', 'Return the chicken and cook 10 minutes with diced tomatoes.', 'Serve with rice.'] };
  R['firin-tavuk'] = { name: 'Oven-Baked Chicken Thighs + Potatoes', steps: ['Toss the thighs with oregano, salt and oil.', 'Cut the potatoes into large chunks and place on the tray.', 'Arrange the chicken on top of the potatoes.', 'Bake at 200 °C for 60 minutes (turning occasionally).', 'Serve straight from the oven.'] };
  R['bolonez-tr'] = { name: 'Spaghetti Bolognese', steps: ['Boil the pasta al dente.', 'Sauté onion and grated carrot in oil.', 'Add the ground beef and cook until browned.', 'Add diced tomato and paste and simmer for 15 minutes.', 'Toss the sauce with the pasta and serve.'] };
  R['mucver'] = { name: 'Zucchini Fritters + Yogurt Sauce', steps: ['Grate the zucchini and squeeze out the liquid.', 'Mix with egg, flour, cheese and dill.', 'Make a thick batter.', 'Fry spoonfuls in oil (or shallow-fry in a pan).', 'Serve with garlic yogurt.'] };
  R['ispanak'] = { name: 'Spinach Stew + Rice', steps: ['Wash and chop the spinach.', 'Sauté the onion and add the tomato paste.', 'Add the spinach and sauté until wilted.', 'Add a little water and cook for 15 minutes.', 'Serve with rice.'] };
  R['mercimek-koftesi'] = { name: 'Lentil Patties + Salad', steps: ['Boil the lentils in 2 cups of water.', 'Add the bulgur to the cooked lentils and let rest for 15 minutes.', 'Knead in sautéed onion, tomato paste and spices.', 'Shape into patties with wet hands.', 'Serve with lettuce, lemon and parsley.'] };
  R['somon-firin'] = { name: 'Oven-Baked Salmon + Broccoli', steps: ['Marinate the salmon with olive oil, oregano and lemon.', 'Spread the broccoli and potato wedges on the tray.', 'Bake at 200 °C for 20-25 minutes.', 'Place the fish on the vegetables and bake 10 more minutes.', 'Serve with lemon slices.'] };
  R['tonlu-makarna'] = { name: 'Tuna Pasta', steps: ['Boil the pasta al dente.', 'Sauté the onion in olive oil.', 'Add the tomatoes and cook for 5 minutes.', 'Add the drained tuna and pasta and toss.', 'Serve with lemon and parsley.'] };
  R['tavuklu-eriste'] = { name: 'Egg Noodles with Chicken & Vegetables', steps: ['Slice the chicken thinly and sear it.', 'Julienne the vegetables and sauté.', 'Boil the noodles separately.', 'Combine everything in the pan and toss for 3-4 minutes.', 'Season with pepper and serve.'] };
  R['etli-karnabahar'] = { name: 'Cauliflower Stew with Beef', steps: ['Sear the beef cubes, sauté with onion.', 'Add the tomato paste and fry until fragrant.', 'Add the cauliflower florets.', 'Cover with hot water and simmer for 35 minutes.', 'Serve hot with rice.'] };
  R['etli-bezelye'] = { name: 'Pea Stew with Beef', steps: ['Sear the beef cubes and sauté with onion.', 'Add the tomato paste and carrot slices.', 'Add the peas and hot water and simmer for 30 minutes.', 'Adjust the salt.', 'Serve with rice.'] };
  R['lahana-sarma'] = { name: 'Stuffed Cabbage Rolls', steps: ['Boil the cabbage and separate the leaves.', 'Prepare the filling with ground beef, rice, onion and paste.', 'Roll the filling in the leaves and pack tightly into the pot.', 'Add water, weigh down and cook for 50 minutes.', 'Serve with lemon.'] };
  R['tavuk-sis'] = { name: 'Chicken Skewers + Buttered Rice (Guests)', steps: ['Dice the chicken and marinate for 2 hours in yogurt, paste and spices.', 'Thread onto skewers and cook over high heat or on the grill.', 'Prepare the rice with butter.', 'Arrange the skewers over the rice and drizzle with butter.', 'Serve with lemon and chili flakes.'] };
  R['kahvalti-klasik'] = { name: 'Classic Turkish Breakfast', steps: ['Slice the tomatoes and cucumbers.', 'Plate the cheese and olives.', 'Slice the bread.', 'Serve honey and butter.', 'Serve with tea.'] };
  R['menemen'] = { name: 'Menemen (Turkish Scrambled Eggs)', steps: ['Sauté the peppers in butter.', 'Add the grated tomato and cook until the liquid is gone.', 'Lower the heat and add the beaten eggs.', 'Stir until just set.', 'Serve with fresh bread.'] };
  R['haslanmis-yumurta'] = { name: 'Boiled Eggs + Cheese', steps: ['Boil the eggs for 8 minutes.', 'Slice the vegetables.', 'Plate the cheese and olives.', 'Slice the bread and serve.'] };
  R['yulaf'] = { name: 'Oatmeal', steps: ['Cook the oats in milk for 5 minutes.', 'Transfer to a bowl.', 'Add honey on top.', 'Garnish with banana slices.'] };
  R['tahin-pekmez'] = { name: 'Tahini & Pekmez + Bread', steps: ['Mix tahini and pekmez.', 'Slice the bread.', 'Spread the mixture on the bread and serve.'] };
  R['simit-lor'] = { name: 'Simit + Quark + Tea', steps: ['Halve the simits.', 'Spread the quark on the halves.', 'Serve with olives and tomato.'] };
  R['lorlu-tost'] = { name: 'Quark & Honey Toast', steps: ['Mix the quark and honey.', 'Spread the mixture between slices of bread.', 'Fry both sides in a buttered pan.', 'Serve hot.'] };
  R['lahmacun-oglen'] = { name: 'Lahmacun + Ayran', steps: ['Heat the lahmacun in the oven or a pan.', 'Chop the lettuce, tomato and parsley.', 'Roll up with the vegetables inside and serve with lemon.', 'Whisk the yogurt into ayran.'] };
  R['sebze-corba-oglen'] = { name: 'Vegetable Soup + Bread', steps: ['Dice the vegetables.', 'Sauté in butter for 3 minutes.', 'Cover with water and cook for 25 minutes.', 'Blend until smooth.', 'Serve with bread.'] };
  R['tonlu-sandvic'] = { name: 'Tuna Sandwich', steps: ['Drain the tuna and mix with olive oil and lemon.', 'Slice the bread.', 'Put the tuna with lettuce and tomato into the bread.', 'Serve immediately.'] };
  R['kisir-oglen'] = { name: 'Kısır (Bulgur Salad) + Tea', steps: ['Cover the bulgur with hot water and let swell for 20 minutes.', 'Add the pastes, grated onion and oil.', 'Knead with lemon juice and finely chopped parsley.', 'Season with salt and chili flakes.', 'Serve wrapped in lettuce leaves.'] };
  R['sutlac'] = { name: 'Baked Rice Pudding', steps: ['Boil the rice in 2 cups of water.', 'Add milk and sugar and simmer for 15 minutes, stirring.', 'Add vanilla and divide into bowls.', 'Bake at 180 °C for 15 minutes until lightly browned on top.', 'Chill in the fridge for 2 hours before serving.'] };
  R['kabak-tatli'] = { name: 'Zucchini Dessert', steps: ['Peel the zucchini and cut into large cubes.', 'Place in the pot and sprinkle with sugar.', 'Simmer on low for 30-40 minutes until the syrup thickens.', 'Garnish with walnuts and cinnamon.', 'Serve cold or lukewarm.'] };
  R['revani'] = { name: 'Revani (Semolina Cake)', steps: ['Whisk eggs and sugar, add yogurt and oil.', 'Add the flour and make a runny batter.', 'Bake in a greased tin at 180 °C for 30 minutes.', 'Pour the lemon syrup over the hot cake.', 'Slice and serve once cooled.'] };
})(window.I18N.en.recipes);
(function (R) {
  /* Italian & French */
  R['pomodoro'] = { name: 'Spaghetti al Pomodoro', steps: ['Boil the pasta al dente in salted water.', 'Lightly sauté the garlic in olive oil.', 'Add diced tomato and paste and cook for 10 minutes.', 'Toss the sauce with the pasta.', 'Serve with grated parmesan.'] };
  R['arrabbiata'] = { name: 'Penne Arrabbiata', steps: ['Boil the pasta.', 'Sauté garlic and chili flakes in olive oil.', 'Add the tomatoes and cook for 10 minutes.', 'Toss the sauce with the pasta.', 'Serve with fresh basil (if available).'] };
  R['carbonara'] = { name: 'Spaghetti Carbonara', steps: ['Boil the pasta, reserving a cup of pasta water.', 'Crisp the bacon cubes.', 'Whisk the egg and grated cheese.', 'Off the heat, quickly stir the hot pasta into the egg mixture.', 'Loosen with pasta water to a creamy consistency, serve with plenty of pepper.'] };
  R['risotto-funghi'] = { name: 'Mushroom Risotto', steps: ['Sauté the onion in oil, add the rice and toast for 2 minutes.', 'Add hot water gradually, stirring, for 18 minutes.', 'Add the separately sautéed mushrooms.', 'Finish with butter and parmesan until creamy.', 'Season with salt and pepper.'] };
  R['pizza-margherita'] = { name: 'Homemade Pizza Margherita', steps: ['Knead a dough from flour, yeast, salt and warm water; let rise 1 hour.', 'Crush the tomatoes into a sauce with salt and olive oil.', 'Roll out the dough and top with sauce and mozzarella.', 'Bake at 250 °C (maximum) for 8-10 minutes.', 'Serve with fresh basil.'] };
  R['cacciatore'] = { name: 'Chicken Cacciatore', steps: ['Brown the chicken thighs in olive oil.', 'Sauté onion, pepper and mushrooms in the same pan.', 'Add tomatoes and oregano.', 'Return the chicken and simmer for 40 minutes.', 'Optionally serve with polenta or bread.'] };
  R['pollo-forno'] = { name: 'Italian Oven Chicken & Potatoes', steps: ['Toss the chicken with oil, oregano and salt.', 'Spread potatoes and peppers on the tray and place the chicken on top.', 'Bake at 190 °C for 60 minutes.', 'Baste with the pan juices now and then.', 'Serve hot.'] };
  R['aglio-olio'] = { name: 'Spaghetti Aglio e Olio', steps: ['Boil the pasta al dente.', 'Gently golden the thinly sliced garlic in oil over low heat.', 'Add the chili flakes.', 'Add the pasta to the pan with a cup of pasta water and toss.', 'Serve immediately.'] };
  R['lazanya'] = { name: 'Homemade Lasagna (Guests)', steps: ['Sauté beef and onion and make a tomato meat sauce.', 'Make a béchamel by cooking flour in butter and adding milk.', 'Layer sauce, pasta and béchamel in the dish.', 'Grate cheese on top.', 'Bake at 180 °C for 40 minutes, rest 10 minutes and serve.'] };
  R['cornetto'] = { name: 'Cornetto & Cappuccino at Home', steps: ['Warm the croissants in the oven or a pan.', 'Serve with jam.', 'Make cappuccino with half the milk (espresso + frothed milk).', 'Serve milky coffee or warm milk with the rest.'] };
  R['frittata'] = { name: 'Italian Frittata', steps: ['Slice the potatoes thinly and fry until soft.', 'Add the beaten eggs and parmesan.', 'Cook over low heat until set.', 'Flip if you like, or finish 5 minutes in the oven.', 'Slice and serve.'] };
  R['pane-burro'] = { name: 'Bread, Butter & Jam', steps: ['Slice and toast the bread.', 'Spread with butter and jam.', 'Serve with coffee.'] };
  R['caprese'] = { name: 'Insalata Caprese', steps: ['Slice the tomatoes and mozzarella.', 'Arrange on a plate.', 'Drizzle with olive oil and oregano.', 'Season with salt.', 'Serve with bread.'] };
  R['panino'] = { name: 'Panino al Formaggio', steps: ['Halve the rolls.', 'Fill with mozzarella and tomato slices.', 'Warm in a sandwich press or pan.', 'Drizzle with olive oil and serve.'] };
  R['minestrone'] = { name: 'Minestrone Soup', steps: ['Dice the vegetables and sauté in oil.', 'Add tomatoes and 1.5 l water and boil for 20 minutes.', 'Add the pasta and cauliflower and cook 10 more minutes.', 'Season with salt and pepper.', 'Serve with grated parmesan.'] };
  R['tiramisu'] = { name: 'Tiramisu', steps: ['Whisk egg yolk and sugar, fold in the mascarpone.', 'Fold in separately whipped egg white.', 'Dip the biscuits in coffee and lay one layer.', 'Spread the cream on top and repeat the layers.', 'Chill at least 3 hours, dust with cocoa and serve.'] };
  R['panna-cotta'] = { name: 'Panna Cotta', steps: ['Warm the cream and sugar gently until dissolved (do not boil).', 'Add the vanilla.', 'Divide into bowls and chill for 4 hours until set.', 'Top with fruit sauce if you like.', 'Serve cold.'] };
  R['cioccolato-kup'] = { name: 'Chocolate Biscuit Cups', steps: ['Melt the chocolate over a water bath.', 'Whip the cream and fold into the chocolate.', 'Put crushed biscuits into the cups.', 'Top with the chocolate cream.', 'Chill for 1 hour and serve.'] };
  R['ratatouille'] = { name: 'Ratatouille', steps: ['Cut the vegetables into large cubes.', 'Sauté the onion in olive oil.', 'Add eggplant, pepper and zucchini in turn and sauté.', 'Add tomato and oregano and simmer for 30 minutes.', 'Serve with bread or rice.'] };
  R['coq-au-vin'] = { name: 'Coq au Vin (simplified)', steps: ['Brown the chicken in butter.', 'Add onion, carrot and mushrooms and sauté.', 'Cover with water (or red wine).', 'Simmer for 45 minutes.', 'Serve with parsley.'] };
  R['quiche-lorraine'] = { name: 'Quiche Lorraine', steps: ['Make a pastry from flour and butter, line the tin and blind bake for 10 minutes.', 'Spread the ham cubes over the pastry.', 'Whisk egg, milk and grated cheese and pour in.', 'Bake at 180 °C for 35 minutes.', 'Serve lukewarm with salad.'] };
  R['gratin-dauphinois'] = { name: 'Gratin Dauphinois', steps: ['Slice the potatoes thinly.', 'Mix with milk, cream, salt and pepper.', 'Arrange in the dish and top with butter and cheese.', 'Bake at 180 °C for 60 minutes.', 'Rest 10 minutes and serve.'] };
  R['steak-frites'] = { name: 'Steak Frites', steps: ['Cut the potatoes into thick sticks and fry twice (or bake).', 'Season the steaks with salt and pepper.', 'Sear 2-3 minutes per side over high heat.', 'Drizzle with butter.', 'Serve immediately with the fries.'] };
  R['fricasse'] = { name: 'Creamy Chicken Fricassee + Rice', steps: ['Sear the chicken in butter.', 'Add mushrooms and carrots and sauté.', 'Sprinkle in the flour, stir 1 minute, add water and cream.', 'Simmer for 20 minutes.', 'Serve with rice.'] };
  R['salade-lyonnaise'] = { name: 'Salade Lyonnaise', steps: ['Cube the bread and make croutons.', 'Crisp the bacon cubes.', 'Halve the boiled eggs.', 'Toss lettuce, croutons, bacon and egg.', 'Serve with a mustard-olive-oil dressing.'] };
  R['bourguignon'] = { name: 'Boeuf Bourguignon (Guests)', steps: ['Sear the beef in butter and set aside.', 'Sauté onion and carrots, add the flour.', 'Return the beef and cover with water (or red wine).', 'Simmer for 1.5 hours.', 'Add the mushrooms for the last 20 minutes and serve.'] };
  R['tartines'] = { name: 'Tartines & Orange Juice', steps: ['Slice and toast the bread.', 'Spread with butter and jam.', 'Squeeze the oranges for fresh juice.', 'Serve with coffee or tea.'] };
  R['oeufs'] = { name: 'Boiled Eggs & Baguette', steps: ['Boil the eggs for 8 minutes.', 'Slice the bread.', 'Slice the tomato.', 'Serve the eggs with buttered bread.'] };
  R['croissant-kahvalti'] = { name: 'Croissant & Yogurt Bowl', steps: ['Warm the croissants.', 'Add honey to the yogurt bowl.', 'Slice the banana.', 'Serve with the croissants.'] };
  R['croque-monsieur'] = { name: 'Croque Monsieur', steps: ['Butter one side of the bread slices.', 'Make a sandwich with ham and cheese.', 'Spread a milk-cheese mix on top.', 'Grill at 200 °C for 10 minutes.', 'Serve with salad.'] };
  R['salade-nicoise'] = { name: 'Salade Niçoise', steps: ['Boil the beans and eggs.', 'Arrange lettuce and tomato on the plate.', 'Add tuna, olives, egg and beans.', 'Make a dressing with olive oil, salt and pepper.', 'Serve at room temperature.'] };
  R['soupe-oignon'] = { name: 'French Onion Soup', steps: ['Slice the onions thinly and caramelize in butter for 30 minutes over low heat.', 'Add 1 l water (or stock) and boil for 20 minutes.', 'Put bread slices into the bowls.', 'Pour in the soup and top with plenty of grated cheese.', 'Gratiné in the oven until the cheese melts.'] };
  R['creme-brulee'] = { name: 'Crème Brûlée', steps: ['Warm the cream with vanilla (do not boil).', 'Whisk with egg yolk and sugar.', 'Stir in the cream and strain into bowls.', 'Bake at 90 °C in a water bath for 30 minutes.', 'Once cool, sprinkle with sugar and brûlée before serving.'] };
  R['clafoutis'] = { name: 'Apple Clafoutis', steps: ['Slice the apples and arrange in a buttered dish.', 'Whisk egg, milk, flour and sugar and pour over.', 'Bake at 180 °C for 35 minutes.', 'Serve lukewarm.', 'Dust with cinnamon if you like.'] };
  R['mousse'] = { name: 'Chocolate Mousse', steps: ['Melt the chocolate over a water bath.', 'Whisk with egg yolk and sugar.', 'Fold in whipped cream and egg white.', 'Divide into bowls.', 'Chill for at least 2 hours.'] };
})(window.I18N.en.recipes);
(function (R) {
  /* German & Greek */
  R['schnitzel'] = { name: 'Schnitzel & Fries', steps: ['Flatten the chicken breasts and coat in flour, egg and breadcrumbs.', 'Fry both sides golden in plenty of oil.', 'Cut the potatoes into matchsticks and fry (or bake).', 'Garnish with a lemon slice.', 'Optionally serve with mashed potatoes.'] };
  R['bratwurst-puree'] = { name: 'Bratwurst & Mashed Potatoes', steps: ['Boil the potatoes and mash with milk and butter.', 'Fry the bratwursts in a pan.', 'Serve with mustard and pickles.', 'Plate the mash and top with the sausages.', 'Serve hot.'] };
  R['kaesespaetzle'] = { name: 'Käsespätzle', steps: ['Mix flour, egg and salt into a viscous dough.', 'Scrape the dough into boiling salted water and cook the spätzle (remove when they float).', 'Prepare caramelized onions.', 'Layer spätzle, cheese and onions.', 'Serve with fried onions.'] };
  R['linseneintopf'] = { name: 'German Lentil Stew', steps: ['Sauté onion, carrot and celery in oil.', 'Add lentils and 1.2 l water and cook for 25 minutes.', 'Add the sausage slices and simmer 10 more minutes.', 'Season with vinegar (if you have it) and salt.', 'Serve with bread.'] };
  R['frikadellen'] = { name: 'Frikadellen & Potato Salad', steps: ['Knead a patty mix from ground beef, egg, grated onion and soaked bread.', 'Fry the patties.', 'Boil and slice the potatoes.', 'Make a potato salad with yogurt, mustard and salt.', 'Serve together.'] };
  R['rouladen'] = { name: 'Rouladen (Beef Rolls)', steps: ['Lay out the beef slices, fill with ham, onion and carrot and roll up.', 'Sear in butter.', 'Cover with water and simmer for 1 hour.', 'Thicken the juices with flour into a gravy.', 'Serve with knödel or mash.'] };
  R['bratkartoffeln'] = { name: 'Pan-Fried Potatoes & Eggs with Vegetables', steps: ['Pre-boil the potatoes and slice.', 'Fry in the pan and add the onion.', 'Add the vegetables and sauté.', 'Crack the eggs on top and cover.', 'Serve with fresh herbs.'] };
  R['sauerbraten'] = { name: 'Sauerbraten & Knödel (Guests)', steps: ['Marinate the beef overnight in a vinegar-water-onion mix (or just water-onion).', 'Sear the beef in butter and add the vegetables.', 'Add the marinade and simmer for 2 hours.', 'Thicken the sauce with flour.', 'Serve with potato knödel (boiled potatoes + flour + egg).'] };
  R['broetchen'] = { name: 'Brötchen, Butter & Jam', steps: ['Halve the rolls.', 'Top with butter and jam.', 'Add sliced cheese and tomato.', 'Serve with tea or coffee.'] };
  R['vollkorn'] = { name: 'Wholegrain Bread & Cheese', steps: ['Slice the bread.', 'Butter and add cheese slices.', 'Garnish with cucumber and tomato.', 'Serve with tea or coffee.'] };
  R['eier-broetchen'] = { name: 'Egg Rolls', steps: ['Boil and slice the eggs.', 'Halve the rolls and butter them.', 'Add egg and cheese slices.', 'Sprinkle with salt and pepper.', 'Serve immediately.'] };
  R['kartoffelsalat'] = { name: 'Potato Salad', steps: ['Boil and slice the potatoes.', 'Finely chop the onion and mix into the warm potatoes.', 'Make a sauce with yogurt, mustard, oil and salt.', 'Toss with the potatoes.', 'Serve lukewarm with sausage or greens.'] };
  R['belegte'] = { name: 'Belegte Brötchen (Filled Rolls)', steps: ['Halve the rolls.', 'Butter and fill with cheese, cucumber and tomato.', 'Add mustard if you like.', 'Wrap and take along.'] };
  R['linsensuppe'] = { name: 'German-Style Lentil Soup', steps: ['Sauté the onion and vegetables.', 'Add lentils and 1 l water and cook for 25 minutes.', 'Season with salt, pepper and a spoon of vinegar.', 'Blend if you like.', 'Serve with bread.'] };
  R['apfelstrudel'] = { name: 'Apfelstrudel', steps: ['Knead an elastic dough from flour, water and a little oil and stretch it paper-thin.', 'Prepare the filling with apple slices, sugar, cinnamon and walnuts.', 'Place the filling on the dough and roll up.', 'Brush with butter and bake at 180 °C for 40 minutes.', 'Serve with icing sugar and vanilla sauce.'] };
  R['rote-gruetze'] = { name: 'Rote Grütze & Vanilla Sauce', steps: ['Simmer the berries with sugar for 10 minutes.', 'Thicken with biscuits crushed in 2 spoons of water instead of starch.', 'Make a vanilla cream sauce (warm, do not boil).', 'Divide the compote into bowls and chill.', 'Serve with vanilla sauce poured on top.'] };
  R['griessbrei'] = { name: 'Semolina Pudding', steps: ['Warm the milk.', 'Add the semolina gradually and cook 5 minutes, stirring.', 'Add sugar and butter.', 'Divide into bowls.', 'Serve with cinnamon and sugar.'] };
  R['moussaka'] = { name: 'Moussaka', steps: ['Slice and fry the eggplants and potatoes (or pre-bake).', 'Sauté ground beef and onion and make a tomato sauce.', 'Make a buttery béchamel and stir in the egg yolk.', 'Layer vegetables and meat in the dish and top with béchamel.', 'Bake at 180 °C for 40 minutes, slice and serve.'] };
  R['gemista'] = { name: 'Gemista (Stuffed Peppers)', steps: ['Cut the tops off the peppers and hollow them out.', 'Prepare the filling with rice, onion, tomato and oil.', 'Fill the peppers and stand them upright in the dish.', 'Top with tomato slices and water.', 'Bake at 180 °C for 60 minutes.'] };
  R['souvlaki'] = { name: 'Souvlaki & Tzatziki', steps: ['Marinate the chicken with lemon, olive oil and oregano.', 'Thread onto skewers and grill or pan-fry.', 'For tzatziki, squeeze the grated cucumber and mix with yogurt and garlic.', 'Serve with bread (pita).', 'Garnish with tzatziki and tomato.'] };
  R['pastitsio'] = { name: 'Pastitsio', steps: ['Boil the pasta.', 'Make the meat sauce.', 'Make the béchamel.', 'Layer pasta, meat sauce, pasta, béchamel in the dish.', 'Grate cheese and bake at 180 °C for 40 minutes.'] };
  R['briam'] = { name: 'Briam (Oven Vegetables)', steps: ['Slice the vegetables.', 'Toss together and place in the dish.', 'Top with grated tomato, olive oil and oregano.', 'Bake at 190 °C for 60 minutes.', 'Serve lukewarm.'] };
  R['gigantes'] = { name: 'Gigantes Plaki (Baked Beans)', steps: ['Boil the beans.', 'Sauté the onion in olive oil.', 'Add tomato and the beans and transfer to the dish.', 'Sprinkle with parsley.', 'Bake at 180 °C for 30 minutes.'] };
  R['psari-plaki'] = { name: 'Psari Plaki (Baked Fish)', steps: ['Slice the potatoes and spread on the tray.', 'Place the fish fillets on top.', 'Cover with tomato and onion slices.', 'Drizzle with olive oil and bake at 190 °C for 35 minutes.', 'Serve with lemon.'] };
  R['yogurt-bal'] = { name: 'Greek Yogurt & Honey', steps: ['Divide the yogurt into bowls.', 'Top with honey and walnuts.', 'Serve with bread.'] };
  R['strapatsada'] = { name: 'Strapatsada (Eggs with Tomato)', steps: ['Grate the tomatoes.', 'Cook 5 minutes in olive oil.', 'Crack in the eggs and scramble.', 'Add salt and pepper.', 'Serve with bread.'] };
  R['koulouri'] = { name: 'Koulouri & Cheese', steps: ['Halve the simits (koulouri).', 'Serve with cheese and olives.', 'Offer coffee or tea.'] };
  R['horiatiki'] = { name: 'Horiatiki (Greek Salad)', steps: ['Roughly chop tomato, cucumber and pepper.', 'Add a block of cheese and the olives.', 'Douse with olive oil and salt.', 'Sprinkle with oregano.', 'Serve with bread.'] };
  R['souvlaki-durum'] = { name: 'Souvlaki Wrap', steps: ['Marinate the chicken and cook on skewers.', 'Make tzatziki (yogurt + cucumber + garlic).', 'Fry the potatoes.', 'Fill the bread with chicken, tzatziki, tomato and fries and roll.', 'Serve immediately.'] };
  R['fassolada'] = { name: 'Fassolada (Bean Soup)', steps: ['Soak and boil the beans.', 'Sauté the vegetables.', 'Add beans, tomato and water and cook for 40 minutes.', 'Add the olive oil at the end.', 'Serve with bread.'] };
  R['balli-yogurt'] = { name: 'Yogurt with Honey & Walnuts', steps: ['Divide the yogurt into bowls.', 'Garnish with honey and walnuts.', 'Serve cold.'] };
  R['baklava'] = { name: 'Baklava (Ready-Made) & Ice Cream', steps: ['Slice the baklava.', 'Warm slightly if you like.', 'Garnish with walnuts.', 'Serve with ice cream.'] };
  R['portakal-kek'] = { name: 'Orange Cake', steps: ['Whisk eggs and sugar.', 'Add orange juice and zest.', 'Stir in the flour.', 'Bake in a greased tin at 175 °C for 40 minutes.', 'Slice once cooled.'] };
})(window.I18N.en.recipes);
(function (R) {
  /* Lunchboxes */
  R['lb-poğaca'] = { name: 'Cheese Buns (Poğaça) + Ayran', steps: ['Mix the dough ingredients and let rise for 30 minutes (can be done the night before).', 'Shape the poğaça with cheese filling and bake at 180 °C for 25 minutes.', 'Add ayran and fruit.'] };
  R['lb-sandvic'] = { name: 'Egg Sandwich + Tomato', steps: ['Hard-boil the egg and slice it.', 'Butter the bread and layer in egg and tomato slices.', 'Wrap in foil or a sealed bag.'] };
  R['lb-mercimek-termos'] = { name: 'Lentil Soup (Thermos) + Bread', steps: ['Sauté onion and carrot in butter, add the lentils.', 'Cook with 1.5 cups of water for 20 minutes and blend.', 'Fill the thermos and take bread along.'] };
  R['lb-tost'] = { name: 'Cheese Toast + Apple', steps: ['Put cheese between the bread slices and toast until golden.', 'Pack once cooled and add an apple.'] };
  R['lb-panino'] = { name: 'Panino with Mozzarella', steps: ['Halve the bread and add mozzarella and tomato slices.', 'Sprinkle with olive oil and parsley.'] };
  R['lb-frittata'] = { name: 'Frittata Slice', steps: ['Slice the potato thinly and fry in oil until soft.', 'Pour in the beaten egg and cook covered.', 'Once cool, slice and pack with bread.'] };
  R['lb-pasta-fredda'] = { name: 'Pasta Salad (Pasta Fredda)', steps: ['Boil and cool the pasta.', 'Toss with tuna, diced tomato and olive oil.', 'Transport in a closed container, chilled.'] };
  R['lb-croissant'] = { name: 'Croissant + Jam + Orange', steps: ['Briefly warm the croissant in the morning if you like.', 'Pack with jam and peeled orange segments.'] };
  R['lb-baguette'] = { name: 'Ham Baguette', steps: ['Halve the baguette and spread with butter and mustard.', 'Add the ham and roll up.'] };
  R['lb-quiche'] = { name: 'Quiche Lorraine Slice', steps: ['Make a pastry from flour and butter and line the tin (can be prepared the night before).', 'Mix quark, egg and bacon bits and pour in.', 'Bake at 180 °C for 35 minutes, slice and pack.'] };
  R['lb-butterbrot'] = { name: 'Butterbrot with Bratwurst + Apple', steps: ['Cook the bratwurst in advance and let cool.', 'Butter the roll and add the bratwurst.', 'Add an apple.'] };
  R['lb-brotzeit'] = { name: 'Brotzeit (Cheese Roll + Vegetables)', steps: ['Halve the rolls and add the cheese.', 'Carry the cucumber and tomato slices in a separate box.'] };
  R['lb-kartoffelsalat'] = { name: 'Potato Salad (Lunchbox)', steps: ['Boil and slice the potato the night before.', 'Make a sauce with onion, mustard, oil and a bit of potato water.', 'Toss with a slice of hard-boiled egg.'] };
  R['lb-pita'] = { name: 'Pita + Tzatziki', steps: ['Make tzatziki with yogurt, grated cucumber, garlic and olive oil (the night before).', 'Warm the pita and fill it.'] };
  R['lb-horiatiki'] = { name: 'Greek Salad (in a Box)', steps: ['Dice tomato, cucumber and cheese.', 'Toss with olives and olive oil and pack in a leak-proof box.'] };
  R['lb-spanakopita'] = { name: 'Spanakopita Slice', steps: ['Make a pastry from flour and butter.', 'Put the spinach-cheese-egg mix between the pastry layers.', 'Bake at 180 °C for 35 minutes and slice.'] };
  R['lb-overnight-oats'] = { name: 'Overnight Oats', steps: ['In the evening, put oats, milk and cinnamon in a jar and refrigerate.', 'In the morning, top with chopped apple.'] };
  R['lb-yumurta-brötchen'] = { name: 'Boiled Egg + Roll + Banana', steps: ['Hard-boil the eggs the night before.', 'Pack the unpeeled egg, roll and banana in the bag.'] };
  /* Chinese, Indian, Mexican, Japanese */
  R['cn-noodle-corbasi'] = { name: 'Chicken Noodle Soup', steps: ['Boil the chicken breast and shred it, keeping the broth.', 'Finely slice carrot and leek and sauté 2 minutes in oil.', 'Add the chicken broth, then the noodles and chicken.', 'Boil for 5 minutes and season with soy sauce and garlic.'] };
  R['cn-stir-fry'] = { name: 'Chicken Vegetable Stir-Fry + Rice', steps: ['Start the rice.', 'Slice the chicken into strips and fry over high heat.', 'Add the vegetables and stir-fry for 4-5 minutes.', 'Season with soy sauce and serve with rice.'] };
  R['cn-tatli-eksi-kofte'] = { name: 'Sweet & Sour Meatballs', steps: ['Form small meatballs from the ground beef and fry.', 'Sauté onion and pepper, add the tomatoes.', 'Make a sweet-sour sauce with sugar and soy sauce and add the meatballs.', 'Serve with rice.'] };
  R['in-tavuk-kori'] = { name: 'Chicken Curry + Rice', steps: ['Marinate the chicken in yogurt and spices for 20 minutes.', 'Sauté the onion in butter and add the tomatoes.', 'Add the chicken and cook for 15 minutes.', 'Serve with rice.'] };
  R['in-mercimek-dal'] = { name: 'Lentil Dal (Indian Soup)', steps: ['Rinse the lentils.', 'Sauté onion and garlic in butter and add the spices.', 'Cook the lentils with 4 cups of water for 25 minutes.', 'Blend until smooth and serve with bread.'] };
  R['in-tavuk-tikka'] = { name: 'Chicken Tikka (Oven)', steps: ['Marinate the chicken in yogurt, curry and lemon juice for 1 hour.', 'Thread onto skewers and bake at 200 °C for 25 minutes.', 'Serve with onion rings and yogurt sauce.'] };
  R['mx-taco'] = { name: 'Ground Beef Tacos', steps: ['Brown the ground beef with onion and pepper.', 'Add tomato and chili flakes and cook until dry.', 'Warm the tortillas and fill with the mix and grated cheese.', 'Garnish with lettuce and tomato slices.'] };
  R['mx-burrito'] = { name: 'Bean Burrito', steps: ['Boil the beans (canned works too).', 'Mash and sauté the beans with onion and cumin.', 'Mix with rice and roll into the tortillas.', 'Close with cheese and warm in a pan.'] };
  R['mx-quesadilla'] = { name: 'Chicken Quesadilla', steps: ['Cook the chicken with spices and slice it.', 'Put cheese, chicken and pepper on half the tortilla and fold.', 'Fry both sides in the pan.', 'Slice and serve.'] };
  R['jp-teriyaki'] = { name: 'Teriyaki Chicken + Rice', steps: ['Start the rice.', 'Fry the chicken thigh/breast slices in oil.', 'Add soy sauce, honey and sugar and let caramelize.', 'Serve over the rice.'] };
  R['jp-ramen'] = { name: 'Homemade Ramen', steps: ['Boil the chicken and slice it; hard-boil and halve the eggs.', 'Cook the noodles.', 'Season the chicken broth with soy sauce and bring to a boil.', 'Fill the bowls with noodles, chicken, spinach and egg and pour over the broth.'] };
  R['jp-somon-donburi'] = { name: 'Salmon Donburi (Rice Bowl)', steps: ['Cook the rice.', 'Slice the salmon and marinate in soy sauce and lemon.', 'Slice the avocado.', 'Arrange salmon and avocado over the rice and serve.'] };
  /* Special recipes */
  R['sp-ekmek'] = { name: 'Homemade Bread', steps: ['Put the flour in a bowl and make a well in the middle.', 'Dissolve the yeast and sugar in warm water and add to the flour.', 'Add salt and olive oil and knead for 8-10 minutes.', 'Cover and let rise for 1 hour.', 'Knock out the air, shape and rest 20 more minutes.', 'Bake at 220 °C (with a bowl of water in the oven) for 30-35 minutes.'] };
  R['sp-sushi'] = { name: 'Homemade Sushi (Maki)', steps: ['Cook and cool the rice (sushi-rice consistency).', 'Lay the nori sheet on the bamboo mat and spread a thin layer of rice.', 'Place salmon and avocado strips in the middle.', 'Roll tightly and cut into 8 pieces.', 'Serve with soy sauce.'] };
  R['sp-taze-makarna'] = { name: 'Fresh Handmade Pasta', steps: ['Spread the flour on the work surface, make a well and crack in the eggs and salt.', 'Slowly fold in the flour and knead for 10 minutes.', 'Rest for 30 minutes.', 'Roll out thinly and cut into strips.', 'Boil 3 minutes in salted water and serve with butter and parmesan.'] };
  R['sp-lahmacun'] = { name: 'Lahmacun from Scratch', steps: ['Make a soft dough from flour, yeast, salt and water and let rise for 1 hour.', 'Finely mince the ground beef with onion and the pastes in a food processor.', 'Roll the dough thin and spread the topping.', 'Bake at 250 °C for 6-8 minutes.', 'Roll up with lemon and parsley and serve.'] };
  R['sp-hummus'] = { name: 'Homemade Hummus', steps: ['Soak the chickpeas overnight and boil them (canned works too).', 'Blend chickpeas, tahini, lemon juice and garlic.', 'Add cooking water to reach the desired consistency.', 'Serve with olive oil and chili flakes.'] };
  R['sp-granola'] = { name: 'Homemade Granola', steps: ['Mix oats, walnuts and cinnamon.', 'Add honey and oil and toss.', 'Spread on the tray and roast at 160 °C for 30 minutes, stirring occasionally.', 'Once cool, jar it and eat with milk or yogurt.'] };
})(window.I18N.en.recipes);

/* ---- v4 ek UI anahtarları ---- */
Object.assign(window.I18N.en.ui, {
  'misafir': 'guests',
  'Misafir menüsü eklendi. Malzemeler otomatik artırılır.': 'Guest menu added. Ingredient amounts are scaled up automatically.',
  'Sepet tutarı: {v} (tam paket/gramaj yuvarlamasıyla — tüketim maliyeti bundan düşüktür) · Kalemlerin %{p}si gerçek market fiyatları (Open Prices topluluk verisi, son 12 ay medyanı), kalanı tahmini. Mağazaya ve sezona göre değişebilir.': 'Basket total: {v} (rounded up to full packs — the consumption cost is lower) · {p}% of items use real supermarket prices (Open Prices community data, 12-month median), the rest are estimates. May vary by store and season.',
  'Aynı sepetin tamamı tek bir markette alınırsa tahmini maliyeti aşağıda. "En uygun" market tek seferde her şeyi almak isteyenler için. Alışveriş listesinde her kalem, gerçek fiyatı olan marketten seçilir.': 'Below is the estimated cost if you buy the entire basket in a single supermarket. The "best value" store is for those who want everything in one trip. In the shopping list, each item is picked from the store that has a real price for it.',
  'Gerçek fiyatlar Open Prices (prices.openfoodfacts.org) topluluk verilerinden; 2025 başından bu yana Almanya\'da kaydedilmiş fiyatların market bazındaki medyanıdır.': 'Real prices come from Open Prices community data (prices.openfoodfacts.org); they are the per-store median of prices recorded in Germany since early 2025.',
  'Bazı şartlar eleme kurallarıyla çakıştığı için uygulanamadı.': 'Some rules could not be applied because they conflict with your exclusions.',
  '"{x}" içeren en az 2 yemek plana alındı.': 'At least 2 meals containing "{x}" are in the plan.',
  'Sporcu modu: haftanın {n} akşam yemeği protein ağırlıklı (et, tavuk, balık, baklagil).': 'Athlete mode: {n} dinners this week are protein-focused (meat, chicken, fish, legumes).',
  'Diyet modu: haftanın {n} akşam yemeği hafif (sebze, çorba, balık) ağırlıklı.': 'Light mode: {n} dinners this week lean light (vegetables, soup, fish).',
  '"{x}" malzeme listesinde yok. Listeden seçmeyi deneyin.': '"{x}" is not in the ingredient list. Try selecting from the list.',
  'Dolabınıza göre {n} öneri': '{n} ideas from your fridge',
  'Tahmini malzeme maliyeti:': 'Estimated ingredient cost:',
  'malzeme dolapta': 'ingredients in fridge',
  'kişinin yaşı': 'person\'s age',
  'kişinin cinsiyeti': 'person\'s gender',
  'kişinin sabah programı': 'person\'s morning routine',
  'kişiyi kaldır': 'remove person',
  'çıkar': 'remove',
  'Ek malzeme (isteğe bağlı)': 'Extra ingredient (optional)',
});

/* ---- v4 statik sayfa anahtarları ---- */
Object.assign(window.I18N.en.ui, {
  'İçeriğe geç': 'Skip to content',
  'Anasayfa ve plan kurulumu': 'Home and plan setup',
  'Oluşturulan plan': 'Generated plan',
  'Dolaptan yemek bul': 'Find a meal from your fridge',
  'Plan görünümleri': 'Plan views',
  'Mutfak seçimi (birden fazla seçebilirsiniz)': 'Cuisine selection (multiple choices allowed)',
  'Mutfak Planı — anasayfa': 'Meal Planner — home',
  'kalem': 'items',
  'Mutfak Planı — Haftalık Yemek ve Alışveriş Planlayıcı': 'Meal Planner — Weekly Meal & Shopping Planner',
  'Mutfaklarınızı, hane halkınızı, bütçenizi ve alerjilerinizi seçin; haftalık yemek planı, tarifler ve gerçek market fiyatlarıyla alışveriş listesi oluşsun. Dolabınızdakilerle yemek bulun, özel tarifleri keşfedin.': 'Choose your cuisines, household, budget and allergies — a weekly meal plan, recipes and a shopping list with real supermarket prices are generated automatically. Find meals from what is in your fridge and discover special recipes.',
});

/* ---- PWA anahtarları ---- */
Object.assign(window.I18N.en.ui, {
  'Uygulamayı yükle': 'Install app',
  'Uygulama yüklendi.': 'App installed.',
});

/* ---- v5: mutfak ağırlığı + cacık ---- */
Object.assign(window.I18N.en.ui, {
  'Ağırlık': 'Weight',
  'Ağırlık: seçili mutfakta noktalara dokunun — 5 = en sık önerilir, 1 = nadiren. Örnek: Türk 5, Alman 3, İtalyan 2.': 'Weight: tap the dots on a selected cuisine — 5 = suggested most often, 1 = rarely. Example: Turkish 5, German 3, Italian 2.',
});
(function (R) {
  R['cacik'] = { name: 'Cacık (Yogurt & Cucumber)', steps: ['Grate or finely dice the cucumber.', 'Crush the garlic and mix into the yogurt.', 'Stir in the cucumber and finely chopped mint.', 'Thin with a few spoons of water if you like.', 'Serve cold with a drizzle of olive oil and dried mint.'] };
})(window.I18N.en.recipes);
(function (R) {
  R['vegan-kahvalti'] = { name: 'Olive Oil Vegetable Breakfast', steps: ['Slice the tomatoes and cucumbers.', 'Plate the olives.', 'Slice and lightly toast the bread.', 'Drizzle with olive oil and oregano and serve with tea.'] };
  R['lb-humus-sandvic'] = { name: 'Hummus & Veggie Sandwich', steps: ['Mash cooked chickpeas with tahini and lemon into hummus (can be done the night before).', 'Spread the hummus on the bread.', 'Fill with cucumber and tomato slices and pack.'] };
})(window.I18N.en.recipes);

/* ---- v6: bütçe önerisi ---- */
Object.assign(window.I18N.en.ui, {
  "Aralık, hanenizin porsiyon sayısına göre otomatik önerilir; kendiniz değiştirirseniz sizin değeriniz kullanılır. Plan, aralığın ortasına yakın bir maliyetle oluşturulur.": "The range is suggested automatically from your household's portion count; if you change it yourself, your value is used. The plan is created with a cost near the middle of the range.",
  "Plan bütçe alt sınırınızın {v} altında kaldı — seçimlerinizle daha pahalı bir hafta çıkmadı, bu size tasarruf demek.": "The plan is {v} below your lower budget limit — no pricier week came out of your selection, so you save money.",
  "Plan bütçe üst sınırınızı {v} aşıyor. Daha uygun mutfaklar ekleyin, elemeleri azaltın veya bütçeyi yükseltin.": "The plan exceeds your upper budget limit by {v}. Add cheaper cuisines, relax exclusions or raise the budget.",
});

/* ---- v7: ortak plan ---- */
Object.assign(window.I18N.en.ui, {
  "Ortak Plan": "Shared Plan",
  "Ortak plan": "Shared plan",
  "Planı ve alışveriş listesini aile üyeleriyle canlı paylaşın. Biri markette ürün işaretlediğinde diğerinde de görünür.": "Share the plan and shopping list live with your family. When someone ticks off an item at the store, everyone else sees it too.",
  "Ortak plan başlat": "Start shared plan",
  "Aile kodunuz var mı?": "Have a family code?",
  "Katıl": "Join",
  "Bu cihaz ortak plana bağlı": "This device is connected to the shared plan",
  "Aile kodu": "Family code",
  "Linki paylaş": "Share link",
  "Ayrıl": "Leave",
  "Bağlantı yok — değişiklikler bağlantı gelince gönderilir": "No connection — changes will be sent once you are back online",
  "Ortak plan başlatıldı. Linki aile üyelerinize gönderin.": "Shared plan started. Send the link to your family.",
  "Ortak plana katıldınız.": "You joined the shared plan.",
  "Geçersiz aile kodu.": "Invalid family code.",
  "Link kopyalandı.": "Link copied.",
  "Ortak plandan ayrıldınız. Plan bu cihazda kalır.": "You left the shared plan. The plan stays on this device.",
  "Ortak plan güncellendi.": "Shared plan updated.",
  "Bu linkle Mutfak Planı'ndaki ortak planımıza katıl:": "Join our shared plan in Mutfak Planı with this link:",
  "Bu kodla henüz bir plan yok. Mevcut planınız bu koda kaydedildi.": "There was no plan for this code yet. Your current plan was saved under it.",
});
