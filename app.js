'use strict';

/* =========================================================
   MUTFAK PLANI — veri, planlama motoru ve arayüz
   ========================================================= */

/* ---------- Malzeme fiyat veritabanı (Almanya ortalaması, tahmini) ---------- */
/* ppu: birim başına € (g için kg fiyatı / 1000) */
const ING = {
  'kırmızı mercimek': { cat: 'kuru', ppu: 0.0035, unit: 'g' },
  'nohut': { cat: 'kuru', ppu: 0.004, unit: 'g' },
  'kuru fasulye': { cat: 'kuru', ppu: 0.004, unit: 'g' },
  'bulgur': { cat: 'temel', ppu: 0.0022, unit: 'g' },
  'pirinç': { cat: 'temel', ppu: 0.0032, unit: 'g' },
  'makarna': { cat: 'temel', ppu: 0.002, unit: 'g' },
  'erişte': { cat: 'temel', ppu: 0.004, unit: 'g' },
  'un': { cat: 'temel', ppu: 0.0011, unit: 'g' },
  'yulaf': { cat: 'kahvalti', ppu: 0.004, unit: 'g' },
  'tereyağı': { cat: 'sut', ppu: 0.012, unit: 'g' },
  'sıvı yağ': { cat: 'temel', ppu: 0.002, unit: 'g' },
  'zeytinyağı': { cat: 'temel', ppu: 0.008, unit: 'g' },
  'soğan': { cat: 'sebze', ppu: 0.0015, unit: 'g' },
  'sarımsak': { cat: 'sebze', ppu: 0.02, unit: 'g' },
  'domates': { cat: 'sebze', ppu: 0.0028, unit: 'g' },
  'domates salçası': { cat: 'temel', ppu: 0.006, unit: 'g' },
  'biber salçası': { cat: 'temel', ppu: 0.008, unit: 'g' },
  'dana kıyma': { cat: 'et', ppu: 0.018, unit: 'g' },
  'kuşbaşı dana et': { cat: 'et', ppu: 0.022, unit: 'g' },
  'tavuk göğsü': { cat: 'tavuk', ppu: 0.011, unit: 'g' },
  'tavuk but': { cat: 'tavuk', ppu: 0.009, unit: 'g' },
  'patlıcan': { cat: 'sebze', ppu: 0.0022, unit: 'g' },
  'kabak': { cat: 'sebze', ppu: 0.0018, unit: 'g' },
  'biber': { cat: 'sebze', ppu: 0.004, unit: 'g' },
  'havuç': { cat: 'sebze', ppu: 0.0012, unit: 'g' },
  'patates': { cat: 'sebze', ppu: 0.0015, unit: 'g' },
  'ıspanak': { cat: 'sebze', ppu: 0.004, unit: 'g' },
  'pırasa': { cat: 'sebze', ppu: 0.002, unit: 'g' },
  'karnabahar': { cat: 'sebze', ppu: 0.0025, unit: 'g' },
  'dondurulmuş bezelye': { cat: 'sebze', ppu: 0.003, unit: 'g' },
  'taze fasulye': { cat: 'sebze', ppu: 0.005, unit: 'g' },
  'mantar': { cat: 'sebze', ppu: 0.005, unit: 'g' },
  'brokoli': { cat: 'sebze', ppu: 0.0035, unit: 'g' },
  'salatalık': { cat: 'sebze', ppu: 0.002, unit: 'g' },
  'marul': { cat: 'sebze', ppu: 0.003, unit: 'g' },
  'süt': { cat: 'sut', ppu: 0.0011, unit: 'g' },
  'yoğurt': { cat: 'sut', ppu: 0.0018, unit: 'g' },
  'lor': { cat: 'sut', ppu: 0.006, unit: 'g' },
  'beyaz peynir': { cat: 'kahvalti', ppu: 0.012, unit: 'g' },
  'kaşar peyniri': { cat: 'sut', ppu: 0.014, unit: 'g' },
  'yumurta': { cat: 'kahvalti', ppu: 0.45, unit: 'adet' },
  'zeytin': { cat: 'kahvalti', ppu: 0.018, unit: 'g' },
  'simit': { cat: 'firin', ppu: 0.5, unit: 'adet' },
  'ekmek': { cat: 'firin', ppu: 0.4, unit: 'adet' },
  'tahin': { cat: 'kahvalti', ppu: 0.02, unit: 'g' },
  'pekmez': { cat: 'kahvalti', ppu: 0.008, unit: 'g' },
  'bal': { cat: 'kahvalti', ppu: 0.02, unit: 'g' },
  'muz': { cat: 'meyve', ppu: 0.35, unit: 'adet' },
  'somon fileto': { cat: 'balik', ppu: 0.028, unit: 'g' },
  'ton balığı konserve': { cat: 'balik', ppu: 1.6, unit: 'adet' },
  'limon': { cat: 'meyve', ppu: 0.4, unit: 'adet' },
  'nane': { cat: 'baharat', ppu: 0.3, unit: 'tutam' },
  'maydanoz': { cat: 'sebze', ppu: 0.3, unit: 'tutam' },
  'dereotu': { cat: 'sebze', ppu: 0.3, unit: 'tutam' },
  'kimyon': { cat: 'baharat', ppu: 0.06, unit: 'tk' },
  'karabiber': { cat: 'baharat', ppu: 0.06, unit: 'tk' },
  'tuz': { cat: 'baharat', ppu: 0.02, unit: 'tk' },
  'pul biber': { cat: 'baharat', ppu: 0.06, unit: 'tk' },
  'kekik': { cat: 'baharat', ppu: 0.06, unit: 'tk' },
};

const UNIT_LABEL = { g: 'g', adet: 'adet', tutam: 'tutam', tk: 'tk' };

/* ---------- Marketler ---------- */
const STORES = {
  Aldi: { factor: 0.93 },
  Lidl: { factor: 0.94 },
  Netto: { factor: 0.95 },
  Penny: { factor: 0.96 },
  Rewe: { factor: 1.04 },
  Edeka: { factor: 1.09 },
};
/* Kategori başına en uygun (ucuz/güvenilir) market */
const CAT_STORE = {
  sebze: 'Penny', meyve: 'Lidl', et: 'Aldi', tavuk: 'Lidl', balik: 'Rewe',
  sut: 'Aldi', kahvalti: 'Netto', temel: 'Lidl', kuru: 'Aldi', firin: 'Lidl', baharat: 'Rewe',
};
const CAT_LABEL = {
  sebze: 'Sebze & Meyve', meyve: 'Sebze & Meyve', et: 'Et & Şarküteri', tavuk: 'Et & Şarküteri',
  balik: 'Balık', sut: 'Süt Ürünleri', kahvalti: 'Kahvaltılık', temel: 'Temel Gıda',
  kuru: 'Bakliyat', firin: 'Fırın', baharat: 'Baharat',
};

/* ---------- Alerjen eşleme ---------- */
const ALLERGEN_MAP = [
  ['gluten', ['un', 'makarna', 'bulgur', 'erişte', 'ekmek', 'simit', 'yulaf']],
  ['süt', ['süt', 'yoğurt', 'peynir', 'tereyağı', 'lor']],
  ['yumurta', ['yumurta']],
  ['susam', ['tahin']],
  ['balık', ['somon', 'ton balığı']],
  ['kırmızı et', ['dana kıyma', 'kuşbaşı dana et']],
  ['tavuk', ['tavuk göğsü', 'tavuk but']],
];

/* Kelime başına göre eşleştirme: 'tuz' ≠ 'un', 'beyaz peynir' = 'peynir' */
function nameMatchesKey(name, key) {
  return name === key || name.startsWith(key + ' ') || name.includes(' ' + key) || name.endsWith(' ' + key);
}
function ingAllergens(name) {
  const found = [];
  for (const [alg, keys] of ALLERGEN_MAP) {
    if (keys.some((k) => nameMatchesKey(name, k))) found.push(alg);
  }
  return found;
}

function allergensOf(recipe) {
  /* Yan servis (opsiyonel) malzemeler alerjen elemesini tetiklemez */
  const names = recipe.ingredients.filter((i) => !i[2]).map((i) => i[0]);
  const found = [];
  for (const [alg, keys] of ALLERGEN_MAP) {
    if (names.some((n) => keys.some((k) => nameMatchesKey(n, k)))) found.push(alg);
  }
  return found;
}

/* ---------- Tarifler ---------- */
function R(id, name, time, tags, ingredients, steps) {
  return { id, name, time, tags, serves: 4, ingredients, steps, allergens: null };
}

const DINNER_RECIPES = [
  R('mercimek-corba', 'Kırmızı Mercimek Çorbası + Ekmek', 40, ['corba', 'vegan', 'baklagil', 'tahil'],
    [['kırmızı mercimek', 300], ['soğan', 100], ['havuç', 100], ['patates', 100], ['domates salçası', 15], ['tereyağı', 25], ['sıvı yağ', 20], ['nane', 1], ['kimyon', 1], ['ekmek', 1, true]],
    ['Mercimeği yıkayın. Soğan, havuç ve patatesi küp doğrayın.', 'Sebzeleri sıvı yağda 3-4 dakika soteleyin, salçayı ekleyip kavurun.', 'Mercimeği ve 1,2 lt suyu ekleyip kısık ateşte 30 dakika pişirin.', 'Blender ile pürüzsüz hale getirin, tereyağı ve kimyonla tatlandırın.', 'Kızarmış ekmek ve kuru nane ile servis edin.']),

  R('kuru-fasulye', 'Kuru Fasulye + Pirinç Pilavı', 90, ['baklagil', 'tahil'],
    [['kuru fasulye', 350], ['soğan', 100], ['domates salçası', 20], ['sıvı yağ', 30], ['pirinç', 250], ['tereyağı', 20], ['tuz', 1]],
    ['Fasulyeyi akşamdan ıslatın (ya da 1 saat haşlayın).', 'Soğanı yağda kavurun, salçayı ekleyin.', 'Fasulye ve 4 su bardağı suyu ekleyip yumuşayana kadar pişirin.', 'Ayrı tencerede tereyağında pirinci kavurup 1:1,5 oranında suyla pilavı pişirin.', 'Pilavın üzerine fasulye dökerek servis edin.']),

  R('nohut-yemegi', 'Nohut Yemeği + Bulgur Pilavı', 80, ['baklagil', 'vegan', 'tahil'],
    [['nohut', 300], ['soğan', 100], ['domates salçası', 20], ['biber salçası', 10], ['sıvı yağ', 30], ['bulgur', 250], ['biber', 100]],
    ['Nohudu akşamdan ıslatın, yumuşayana kadar haşlayın.', 'Soğanı kavurup iki salçayı ekleyin.', 'Nohudu ve suyunu ekleyip 20 dakika kaynatın.', 'Bulguru 1:1,5 suda pilav gibi pişirin.', 'Bulgurun yanında sıcak servis edin.']),

  R('etli-taze-fasulye', 'Etli Taze Fasulye + Pirinç', 60, ['etli', 'sebze', 'tahil'],
    [['kuşbaşı dana et', 300], ['taze fasulye', 750], ['soğan', 100], ['domates salçası', 15], ['sıvı yağ', 25], ['pirinç', 200]],
    ['Kuşbaşını yüksek ateşte mühürleyin.', 'Soğanı ekleyip kavurun, salçayı ilave edin.', 'Ayıklanmış fasulyeleri ekleyip 3 dakika soteleyin.', 'Üzerini geçecek kadar sıcak su ekleyip kısık ateşte 40 dakika pişirin.', 'Pirinç pilavıyla servis edin.']),

  R('karniyarik', 'Karnıyarık + Pirinç Pilavı', 70, ['etli', 'tahil'],
    [['patlıcan', 700], ['dana kıyma', 250], ['soğan', 150], ['domates', 200], ['biber', 100], ['domates salçası', 10], ['sıvı yağ', 60], ['pirinç', 200]],
    ['Patlıcanları alacalı soyup tuzlu suda 15 dakika bekletin.', 'Az yağda iki tarafını hafif kızartın (ya da fırında 20 dakika pişirin).', 'Ayrı tavada kıyma ve soğanı kavurup salça, domates, biberle doldurmayı hazırlayın.', 'Patlıcanları yararak içine harcı doldurun.', 'Az su ekleyip 180 °C fırında 25 dakika pişirin. Pilavla servis edin.']),

  R('tavuk-sote', 'Sebzeli Tavuk Sote', 35, ['tavuk', 'pratik', 'tahil'],
    [['tavuk göğsü', 550], ['biber', 250], ['mantar', 200], ['soğan', 100], ['domates', 150], ['sıvı yağ', 25], ['pirinç', 200], ['karabiber', 1]],
    ['Tavuğu kuşbaşı doğrayıp tuz ve karabiberle marine edin.', 'Yüksek ateşte tavuğu mühürleyip kenara alın.', 'Aynı tavada soğan, biber ve mantarı soteleyin.', 'Tavuğu geri ekleyip küp domateslerle 10 dakika pişirin.', 'Pirinç pilavı yanında servis edin.']),

  R('firin-tavuk', 'Fırında Tavuk But + Patates', 75, ['tavuk', 'firin'],
    [['tavuk but', 900], ['patates', 800], ['biber', 150], ['kekik', 2], ['sıvı yağ', 30], ['tuz', 1]],
    ['Butları kekik, tuz ve yağ ile harmanlayın.', 'Patatesleri iri dilimleyip tepsiye yerleştirin.', 'Tavukları patateslerin üzerine dizin.', '200 °C fırında 60 dakika (arada çevirerek) pişirin.', 'Fırından çıkar çıkmaz servis edin.']),

  R('bolonez', 'Spagetti Bolonez', 40, ['pratik', 'makarna'],
    [['makarna', 400], ['dana kıyma', 300], ['soğan', 100], ['havuç', 80], ['domates', 250], ['domates salçası', 20], ['sıvı yağ', 25]],
    ['Makarnayı diri haşlayın.', 'Soğan ve rendelenmiş havucu yağda kavurun.', 'Kıymayı ekleyip rengi dönene kadar pişirin.', 'Küp domates ve salçayı ekleyip 15 dakika kaynatın.', 'Sosu makarna ile karıştırıp servis edin.']),

  R('mucver', 'Kabak Mücver + Yoğurtlu Sos', 40, ['vejetaryen'],
    [['kabak', 700], ['yumurta', 3], ['un', 150], ['beyaz peynir', 100], ['dereotu', 1], ['sıvı yağ', 80], ['yoğurt', 250]],
    ['Kabakları rendeleyip suyunu sıkın.', 'Yumurta, un, peynir ve dereotuyla karıştırın.', 'Kıvam koyu bir harç elde edin.', 'Yağda kaşık kaşık kızartın (ya da az yağla tavada).', 'Sarımsaklı yoğurt eşliğinde servis edin.']),

  R('ispanak', 'Ispanak Yemeği + Pirinç', 35, ['vejetaryen', 'sebze', 'tahil'],
    [['ıspanak', 800], ['soğan', 100], ['domates salçası', 15], ['pirinç', 200], ['sıvı yağ', 25]],
    ['Ispanağı yıkayıp doğrayın.', 'Soğanı kavurup salçayı ekleyin.', 'Ispanağı ekleyip suyunu salana kadar soteleyin.', 'Az su ekleyip 15 dakika pişirin.', 'Pirinç pilavıyla servis edin.']),

  R('mercimek-koftesi', 'Mercimek Köftesi + Salata', 50, ['vejetaryen', 'baklagil', 'pratik', 'tahil'],
    [['kırmızı mercimek', 250], ['bulgur', 200], ['soğan', 150], ['domates salçası', 15], ['zeytinyağı', 30], ['marul', 150], ['limon', 1], ['maydanoz', 1]],
    ['Mercimeği 2 su bardağı suyla haşlayın.', 'Haşlanmış mercimeğe bulguru ekleyip 15 dakika dinlendirin.', 'Kavrulmuş soğan ve salçayı, baharatları ekleyip yoğurun.', 'Elleri ıslatıp köfte şekli verin.', 'Marul, limon ve maydanozla servis edin.']),

  R('somon-firin', 'Fırın Somon + Brokoli', 35, ['balik', 'pratik'],
    [['somon fileto', 550], ['brokoli', 400], ['patates', 400], ['limon', 1], ['zeytinyağı', 30], ['kekik', 1]],
    ['Somonu zeytinyağı, kekik ve limonla marine edin.', 'Brokoliyi ve patates dilimlerini tepsiye yayın.', '200 °C fırında 20-25 dakika pişirin.', 'Balığı sebzelerin üzerine koyup 10 dakika daha pişirin.', 'Limon dilimleriyle servis edin.']),

  R('tonlu-makarna', 'Ton Balıklı Makarna', 25, ['balik', 'pratik', 'makarna'],
    [['makarna', 400], ['ton balığı konserve', 2], ['domates', 200], ['soğan', 80], ['zeytinyağı', 30], ['maydanoz', 1], ['limon', 1]],
    ['Makarnayı diri haşlayın.', 'Soğanı zeytinyağında pembeleştirin.', 'Domatesleri ekleyip 5 dakika pişirin.', 'Süzülmüş ton balığını ve makarnayı ekleyip karıştırın.', 'Limon ve maydanozla servis edin.']),

  R('tavuklu-eriste', 'Tavuklu Sebzeli Erişte', 30, ['tavuk', 'pratik', 'makarna'],
    [['erişte', 350], ['tavuk göğsü', 400], ['biber', 200], ['havuç', 100], ['soğan', 100], ['sıvı yağ', 25]],
    ['Tavuğu ince şeritler halinde doğrayıp mühürleyin.', 'Sebzeleri julienne doğrayıp soteleyin.', 'Erişteyi ayrıca haşlayın.', 'Hepsini tavada birleştirip 3-4 dakika çevirin.', 'Karabiberle tatlandırıp servis edin.']),

  R('etli-karnabahar', 'Etli Karnabahar Yemeği', 55, ['etli', 'sebze'],
    [['kuşbaşı dana et', 300], ['karnabahar', 800], ['soğan', 100], ['domates salçası', 15], ['sıvı yağ', 25], ['pirinç', 150]],
    ['Kuşbaşını mühürleyin, soğanla kavurun.', 'Salçayı ekleyip kokusu çıkana kadar kavurun.', 'Çiçeklere ayrılmış karnabaharı ekleyin.', 'Üzerini geçecek kadar sıcak su ekleyip 35 dakika pişirin.', 'Pilav yanında sıcak servis edin.']),

  R('kisir', 'Kısır + Bol Salata', 30, ['vejetaryen', 'pratik', 'tahil'],
    [['bulgur', 300], ['domates salçası', 20], ['biber salçası', 10], ['soğan', 100], ['maydanoz', 1], ['zeytinyağı', 40], ['limon', 1], ['marul', 100]],
    ['Bulguru sıcak suyla ıslatıp 20 dakika şişirin.', 'Salçaları, rendelenmiş soğanı ve yağı ekleyin.', 'Limon suyu ve ince kıyılmış maydanozla yoğurun.', 'Tadını tuz ve pul biberle ayarlayın.', 'Marul yapraklarıyla sararak servis edin.']),

  R('etli-bezelye', 'Etli Bezelye Yemeği', 50, ['etli', 'sebze'],
    [['kuşbaşı dana et', 300], ['dondurulmuş bezelye', 700], ['havuç', 150], ['soğan', 100], ['domates salçası', 15], ['sıvı yağ', 25], ['pirinç', 150]],
    ['Kuşbaşını mühürleyip soğanla kavurun.', 'Salçayı ekleyin, havuç dilimlerini katın.', 'Bezelyeyi ve sıcak suyu ekleyip 30 dakika pişirin.', 'Tadını tuzla ayarlayın.', 'Pilavla servis edin.']),

  R('lahana-sarma', 'Etli Lahana Sarması', 100, ['etli', 'pratik-degil'],
    [['lahana', 900], ['dana kıyma', 300], ['pirinç', 200], ['soğan', 150], ['domates salçası', 20], ['sıvı yağ', 50]],
    ['Lahanayı haşlayıp yapraklarını ayırın.', 'Kıyma, pirinç, soğan ve salçayla iç harcı hazırlayın.', 'Yapraklara harç sarıp tencereye sıkışık dizin.', 'Üzerine su ekleyip ağırlık koyarak 50 dakika pişirin.', 'Limonla servis edin.']),
];

const BREAKFAST_RECIPES = [
  R('kahvalti-klasik', 'Klasik Türk Kahvaltısı', 15, ['kahvalti'],
    [['beyaz peynir', 200], ['zeytin', 100], ['bal', 40], ['ekmek', 1, true], ['domates', 200], ['salatalık', 200], ['tereyağı', 30]],
    ['Domates ve salatalığı dilimleyin.', 'Peynir ve zeytini tabağa alın.', 'Ekmeği dilimleyin.', 'Bal ve tereyağını servis edin.', 'Çay eşliğinde servis yapın.']),

  R('menemen', 'Menemen', 20, ['kahvalti', 'pratik'],
    [['yumurta', 6], ['domates', 300], ['biber', 150], ['tereyağı', 30], ['ekmek', 1, true]],
    ['Biberleri tereyağında kavurun.', 'Rendelenmiş domatesi ekleyip suyu çekene kadar pişirin.', 'Ateşi kısın, çırpılmış yumurtaları ekleyin.', 'Karıştırarak hafif katılaşmasını sağlayın.', 'Taze ekmekle servis edin.']),

  R('haslanmis-yumurta', 'Haşlanmış Yumurta + Peynir', 15, ['kahvalti', 'pratik'],
    [['yumurta', 4], ['beyaz peynir', 150], ['zeytin', 60], ['ekmek', 1, true], ['domates', 150]],
    ['Yumurtaları 8 dakika haşlayın.', 'Sebzeleri dilimleyin.', 'Peynir ve zeytini tabağa alın.', 'Ekmeği dilimleyip servis edin.']),

  R('yulaf', 'Yulaf Lapası', 10, ['kahvalti', 'pratik', 'vegan'],
    [['yulaf', 200], ['süt', 800], ['bal', 30], ['muz', 2]],
    ['Yulafı sütle 5 dakika pişirin.', 'Kaseye alın.', 'Üzerine bal ekleyin.', 'Muz dilimleriyle süsleyin.']),

  R('tahin-pekmez', 'Tahin-Pekmez + Ekmek', 5, ['kahvalti', 'pratik', 'vegan'],
    [['tahin', 60], ['pekmez', 60], ['ekmek', 1, true]],
    ['Tahin ve pekmezi karıştırın.', 'Ekmeği dilimleyin.', 'Karışımı ekmeğin üzerine sürerek servis edin.']),

  R('simit-lor', 'Simit + Lor + Çay', 5, ['kahvalti', 'pratik'],
    [['simit', 4], ['lor', 200], ['zeytin', 60], ['domates', 150]],
    ['Simitleri ikiye bölün.', 'Loru simitlerin arasına sürün.', 'Zeytin ve domatesle servis edin.']),

  R('lorlu-tost', 'Lorlu Ballı Tost', 12, ['kahvalti', 'pratik'],
    [['ekmek', 1], ['lor', 250], ['bal', 30], ['tereyağı', 30]],
    ['Lor ve balı karıştırın.', 'Karışımı ekmek dilimlerinin arasına sürün.', 'Tereyağlı tavada iki tarafını kızartın.', 'Sıcak servis edin.']),
];

const ALL_RECIPES = [...DINNER_RECIPES, ...BREAKFAST_RECIPES];
for (const r of ALL_RECIPES) r.allergens = allergensOf(r);

/* ---------- Porsiyon modeli ---------- */
function portionFactor(age, gender) {
  if (age < 4) return 0.35;
  if (age < 10) return 0.55;
  if (age < 14) return 0.8;
  if (age < 18) return gender === 'e' ? 1.1 : 0.95;
  if (age < 60) return gender === 'e' ? 1.15 : 1.0;
  return gender === 'e' ? 1.0 : 0.85;
}
function totalPortions(members) {
  return members.reduce((s, m) => s + portionFactor(m.age, m.gender), 0);
}

/* ---------- Maliyet ---------- */
function recipeCost(recipe) {
  return recipe.ingredients.reduce((s, [name, qty]) => {
    const ing = ING[name];
    return s + (ing ? ing.ppu * qty : 0);
  }, 0);
}
function recipeCostPerServing(recipe) {
  return recipeCost(recipe) / recipe.serves;
}

/* ---------- Eleme / filtre ---------- */
const ALLERGEN_OPTIONS = [
  ['gluten', 'Gluten / Buğday'], ['süt', 'Süt / Laktoz'], ['yumurta', 'Yumurta'],
  ['susam', 'Susam'], ['balık', 'Balık'], ['kırmızı et', 'Kırmızı Et'], ['tavuk', 'Tavuk'], ['domuz', 'Domuz'],
];
const DISLIKE_OPTIONS = ['mantar', 'soğan', 'maydanoz', 'dereotu', 'nane', 'pırasa', 'kereviz', 'bulgur', 'pirinç', 'yoğurt', 'bezelye', 'patlıcan'];
const MUST_RULES = [
  { id: 'baklagil2', label: 'Haftada en az 2 baklagil yemeği', tag: 'baklagil', min: 2 },
  { id: 'balik1', label: 'Haftada en az 1 balık', tag: 'balik', min: 1 },
  { id: 'corba1', label: 'Haftada en az 1 çorba', tag: 'corba', min: 1 },
  { id: 'tavuk2', label: 'Haftada en az 2 tavuk yemeği', tag: 'tavuk', min: 2 },
  { id: 'sebze3', label: 'Sebze ağırlıklı (en az 3 sebze yemeği)', tag: 'sebze', min: 3 },
  { id: 'tahil2', label: 'Haftada en az 2 pilav / bulgur', tag: 'tahil', min: 2 },
];

function recipeExcluded(recipe, state) {
  const names = recipe.ingredients.map((i) => i[0]);
  // alerjenler
  if (recipe.allergens.some((a) => state.allergens.has(a))) return true;
  // sevilmeyen malzemeler + serbest metin
  const banned = [...state.dislikes, ...state.excludeFree];
  return names.some((n) => banned.some((b) => b && n.toLowerCase().includes(b.toLowerCase())));
}

/* ---------- Plan oluşturma ---------- */
const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function satisfiesRules(pick, rules) {
  const counts = {};
  for (const r of pick) for (const t of r.tags) counts[t] = (counts[t] || 0) + 1;
  return rules.every((rule) => (counts[rule.tag] || 0) >= rule.min);
}

function buildPlan(state) {
  const P = Math.max(totalPortions(state.members), 1);
  const scale = P / 4;
  const activeRules = MUST_RULES.filter((r) => state.mustRules.has(r.id));

  const dinners = DINNER_RECIPES.filter((r) => !recipeExcluded(r, state));
  const breakfasts = BREAKFAST_RECIPES.filter((r) => !recipeExcluded(r, state));
  if (dinners.length < 7) {
    return { error: 'Eleme kriterleri o kadar kısıtlayıcı ki 7 ayrı akşam yemeği kalmadı. Lütfen bazı elemeleri kaldırın.' };
  }
  if (breakfasts.length === 0) {
    return { error: 'Elemelerinizle uygun kahvaltı kalmadı (ekmek/simit gibi temel kahvaltılıklar ekenmiş olabilir). Lütfen bazı elemeleri kaldırın.' };
  }

  const mustFree = state.mustFree.trim().toLowerCase();
  const mustFreeOk = (r) => !mustFree || r.ingredients.some(([n]) => n.toLowerCase().includes(mustFree));
  const mustFreeCount = (pick) => pick.filter(mustFreeOk).length;

  const bCheap = [...breakfasts].sort((a, b) => recipeCost(a) - recipeCost(b));
  const bCycle = [];
  for (let i = 0; i < 7; i++) bCycle.push(bCheap[i % bCheap.length]);

  const breakfastCost = bCycle.reduce((s, r) => s + recipeCost(r), 0) * scale;

  const mid = (state.budgetMin + state.budgetMax) / 2;
  let best = null; // {pick, total, score, relaxed}
  let relaxedBest = null;

  for (let iter = 0; iter < 600; iter++) {
    const pick = shuffle(dinners).slice(0, 7);
    const ok = satisfiesRules(pick, activeRules);
    const dinnerCost = pick.reduce((s, r) => s + recipeCost(r), 0) * scale;
    const total = dinnerCost + breakfastCost;
    const score =
      (mustFree ? Math.min(mustFreeCount(pick), 3) * 4 : 0) +
      new Set(pick.flatMap((r) => r.tags)).size + // çeşitlilik
      (ok ? 10 : 0);
    const inRange = total >= state.budgetMin && total <= state.budgetMax;

    const cand = { pick, total, score, ok, distance: Math.abs(total - mid) };
    if (ok) {
      if (!best || (inRange && best.total < state.budgetMin) || (inRange && !best._in) || (inRange === best._in && cand.distance < best.distance)) {
        cand._in = inRange;
        best = cand;
      }
      if (!best._in) best = cand; // ilk uygun
      if (best._in && inRange && cand.distance < best.distance) best = cand;
    } else if (!relaxedBest || cand.distance < relaxedBest.distance) {
      relaxedBest = cand;
    }
  }

  let chosen;
  let relaxed = false;
  if (best) chosen = best;
  else { chosen = relaxedBest; relaxed = true; }

  const plan = DAY_NAMES.map((day, i) => ({
    day,
    breakfast: bCycle[i],
    dinner: chosen.pick[i],
  }));

  return {
    plan,
    scale,
    portions: P,
    total: chosen.total,
    budgetMin: state.budgetMin,
    budgetMax: state.budgetMax,
    rulesSatisfied: chosen.ok,
    relaxed,
    mustFreeApplied: !!mustFree && mustFreeCount(chosen.pick) >= 2,
    mustFreeName: state.mustFree.trim(),
  };
}

/* ---------- Alışveriş listesi ---------- */
function roundQty(qty, unit) {
  if (unit === 'g') return Math.max(10, Math.round(qty / 10) * 10);
  if (unit === 'adet') return Math.max(1, Math.round(qty));
  return Math.max(1, Math.round(qty));
}

function buildShoppingList(planResult) {
  const totals = {}; // name -> {qty, unit, cat}
  const add = (recipe, scale) => {
    for (const [name, qty, optional] of recipe.ingredients) {
      const ing = ING[name];
      if (!ing) continue;
      /* Opsiyonel servis malzemeleri (ör. ekmek) alerjen dışıysa listeye alınmaz */
      if (optional && ingAllergens(name).some((a) => state.allergens.has(a))) continue;
      if (!totals[name]) totals[name] = { qty: 0, unit: ing.unit, cat: ing.cat };
      totals[name].qty += qty * scale;
    }
  };
  for (const day of planResult.plan) {
    add(day.breakfast, planResult.scale);
    add(day.dinner, planResult.scale);
  }
  const items = Object.entries(totals).map(([name, t]) => {
    const qty = roundQty(t.qty, t.unit);
    const store = CAT_STORE[t.cat] || 'Lidl';
    return {
      name,
      qty,
      unit: t.unit,
      cat: t.cat,
      store,
      price: qty * ING[name].ppu,
      checked: false,
    };
  });
  items.sort((a, b) => a.store.localeCompare(b.store, 'tr') || a.cat.localeCompare(b.cat, 'tr') || a.name.localeCompare(b.name, 'tr'));

  const byStore = {};
  for (const it of items) {
    (byStore[it.store] = byStore[it.store] || []).push(it);
  }
  const grandTotal = items.reduce((s, i) => s + i.price, 0);
  const storeTotals = {};
  for (const [store, storeItems] of Object.entries(byStore)) {
    storeTotals[store] = storeItems.reduce((s, i) => s + i.price, 0);
  }
  return { items, byStore, grandTotal, storeTotals };
}

/* ---------- Biçimlendirme ---------- */
const fmtEur = (v) => v.toFixed(2).replace('.', ',') + ' €';
const fmtQty = (it) => {
  if (it.unit === 'adet') return `${it.qty} adet`;
  if (it.unit === 'g') return `${it.qty} g`;
  if (it.unit === 'tutam') return `${it.qty} tutam`;
  return `${it.qty} tk`;
};

/* =========================================================
   UYGULAMA DURUMU & ARAYÜZ
   ========================================================= */
const state = {
  members: [
    { age: 35, gender: 'e' },
    { age: 33, gender: 'k' },
  ],
  budgetMin: 45,
  budgetMax: 90,
  allergens: new Set(),
  dislikes: new Set(),
  excludeFree: [],
  mustRules: new Set(['baklagil2', 'corba1']),
  mustFree: '',
  step: 1,
  planResult: null,
  shopping: null,
  checked: new Set(),
};

const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.hidden = true; }, 3200);
}

/* ---------- Stepper ---------- */
const STEP_TITLES = ['Hane', 'Bütçe', 'Eleme', 'Şartlar'];
function renderStepper() {
  const s = $('#stepper');
  s.innerHTML = '';
  STEP_TITLES.forEach((t, i) => {
    const li = el('li', state.step > i + 1 ? 'is-done' : state.step === i + 1 ? 'is-active' : '');
    li.innerHTML = `<span>${i + 1}. ${t}</span>`;
    s.appendChild(li);
  });
}

/* ---------- Üye listesi ---------- */
function renderMembers() {
  const list = $('#members-list');
  list.innerHTML = '';
  state.members.forEach((m, idx) => {
    const row = el('div', 'member-row');
    const ageField = el('label', 'field');
    ageField.innerHTML = `<span>Yaş</span>`;
    const ageInput = el('input');
    ageInput.type = 'number'; ageInput.min = 0; ageInput.max = 110; ageInput.value = m.age;
    ageInput.setAttribute('data-testid', `input-age-${idx}`);
    ageInput.setAttribute('aria-label', `${idx + 1}. kişinin yaşı`);
    ageInput.addEventListener('input', () => { m.age = parseInt(ageInput.value, 10) || 0; updatePortionNote(); });
    ageField.appendChild(ageInput);

    const gField = el('label', 'field');
    gField.innerHTML = `<span>Cinsiyet</span>`;
    const gSel = el('select');
    gSel.setAttribute('data-testid', `select-gender-${idx}`);
    gSel.setAttribute('aria-label', `${idx + 1}. kişinin cinsiyeti`);
    gSel.innerHTML = `<option value="k"${m.gender === 'k' ? ' selected' : ''}>Kadın</option><option value="e"${m.gender === 'e' ? ' selected' : ''}>Erkek</option>`;
    gSel.addEventListener('change', () => { m.gender = gSel.value; updatePortionNote(); });
    gField.appendChild(gSel);

    const rm = el('button', 'btn btn-remove', 'Kaldır');
    rm.type = 'button';
    rm.setAttribute('data-testid', `button-remove-member-${idx}`);
    rm.setAttribute('aria-label', `${idx + 1}. kişiyi kaldır`);
    rm.addEventListener('click', () => {
      if (state.members.length <= 1) { toast('En az bir kişi gerekli.'); return; }
      state.members.splice(idx, 1);
      renderMembers();
    });

    row.append(ageField, gField, rm);
    list.appendChild(row);
  });
  updatePortionNote();
}

function updatePortionNote() {
  const p = totalPortions(state.members);
  $('#portion-note').textContent =
    `Hane toplamı: ${p.toFixed(1).replace('.', ',')} porsiyon · yetişkin kadın = 1,0 · yetişkin erkek = 1,15 · çocuklar yaşa göre daha az. Malzeme miktarları buna göre otomatik ölçeklenir.`;
}

/* ---------- Chip grupları ---------- */
function renderChips(containerSel, options, activeSet, onToggle, excludeStyle) {
  const c = $(containerSel);
  c.innerHTML = '';
  c.className = 'chip-group' + (excludeStyle ? ' exclude' : '');
  options.forEach((opt) => {
    const [val, label] = Array.isArray(opt) ? opt : [opt, opt];
    const chip = el('button', 'chip' + (activeSet.has(val) ? ' is-on' : ''), label);
    chip.type = 'button';
    chip.setAttribute('aria-pressed', activeSet.has(val) ? 'true' : 'false');
    chip.setAttribute('data-testid', `chip-${containerSel.replace('#', '')}-${val}`);
    chip.addEventListener('click', () => { onToggle(val); });
    c.appendChild(chip);
  });
}

function renderAllChips() {
  renderChips('#allergen-chips', ALLERGEN_OPTIONS, state.allergens, (v) => {
    state.allergens.has(v) ? state.allergens.delete(v) : state.allergens.add(v);
    renderAllChips();
  }, true);
  renderChips('#dislike-chips', DISLIKE_OPTIONS, state.dislikes, (v) => {
    state.dislikes.has(v) ? state.dislikes.delete(v) : state.dislikes.add(v);
    renderAllChips();
  }, true);
  renderChips('#must-chips', MUST_RULES.map((r) => [r.id, r.label]), state.mustRules, (v) => {
    state.mustRules.has(v) ? state.mustRules.delete(v) : state.mustRules.add(v);
    renderAllChips();
  }, false);
}

/* ---------- Sihirbaz gezinme ---------- */
function showStep(n) {
  state.step = n;
  document.querySelectorAll('.wizard-step').forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
  $('#btn-prev').hidden = n === 1;
  $('#btn-next').textContent = n === 4 ? 'Planı Oluştur' : 'Devam';
  renderStepper();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  if (state.step === 1) {
    if (state.members.length === 0) { toast('En az bir kişi ekleyin.'); return; }
  }
  if (state.step === 2) {
    const mn = parseFloat($('#budget-min').value);
    const mx = parseFloat($('#budget-max').value);
    if (!(mn >= 10 && mx >= 10 && mn <= mx)) { toast('Geçerli bir bütçe aralığı girin (alt ≤ üst).'); return; }
    state.budgetMin = mn; state.budgetMax = mx;
  }
  if (state.step === 3) {
    state.excludeFree = $('#exclude-free').value.split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (state.step === 4) {
    state.mustFree = $('#must-free').value;
    generateAndShow();
    return;
  }
  showStep(state.step + 1);
}

/* ---------- Plan üretimi ve sonuç görünümü ---------- */
function generateAndShow() {
  const result = buildPlan(state);
  if (result.error) { toast(result.error); return; }
  state.planResult = result;
  state.checked = new Set();
  state.shopping = buildShoppingList(result);
  renderResults();
  $('#wizard').hidden = true;
  $('#results').hidden = false;
  $('#header-nav').hidden = false;
  switchTab('plan');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!result.rulesSatisfied) {
    toast('Not: Seçimlerinizle tüm şartlar aynı anda karşılanamadı; en yakın plan oluşturuldu.');
  }
}

function tagPill(tag) {
  const labels = { vegan: 'Vegan', vejetaryen: 'Vejetaryen', balik: 'Balık', pratik: 'Pratik', corba: 'Çorba', baklagil: 'Baklagil', tahil: 'Pilav/Bulgur', makarna: 'Makarna', etli: 'Etli', tavuk: 'Tavuk', sebze: 'Sebze' };
  return labels[tag] ? `<span class="tag t-${tag}">${labels[tag]}</span>` : '';
}

function renderResults() {
  const r = state.planResult;
  const s = state.shopping;

  /* Özet */
  $('#results-summary').innerHTML = `
    <h2>Haftalık Planınız hazır</h2>
    <p>${state.members.length} kişi · ${r.portions.toFixed(1).replace('.', ',')} porsiyon ·
    tahmini toplam <strong>${fmtEur(r.total)}</strong>
    (bütçe aralığınız ${fmtEur(r.budgetMin)} – ${fmtEur(r.budgetMax)})</p>`;

  /* Plan paneli */
  const planPanel = $('#panel-plan');
  planPanel.innerHTML = '';

  const barWrap = el('div', 'budget-bar-wrap');
  const spanMax = Math.max(r.budgetMax * 1.12, r.total * 1.05);
  const bandL = (r.budgetMin / spanMax) * 100;
  const bandR = (r.budgetMax / spanMax) * 100;
  const fillW = Math.min(100, (r.total / spanMax) * 100);
  barWrap.innerHTML = `
    <div class="budget-bar-top">
      <span class="budget-total">${fmtEur(r.total)}</span>
      <span class="budget-range">Bütçe aralığı: ${fmtEur(r.budgetMin)} – ${fmtEur(r.budgetMax)}</span>
    </div>
    <div class="budget-track" role="img" aria-label="Toplam maliyet ${fmtEur(r.total)}, bütçe aralığı ${fmtEur(r.budgetMin)} ile ${fmtEur(r.budgetMax)} arasında">
      <div class="budget-range-band" style="left:${bandL}%; width:${Math.max(bandR - bandL, 0.5)}%"></div>
      <div class="budget-fill" style="width:${fillW}%"></div>
    </div>`;
  planPanel.appendChild(barWrap);

  const notes = [];
  if (r.mustFreeApplied) notes.push(`"${r.mustFreeName}" içeren en az 2 yemek plana alındı.`);
  if (!r.rulesSatisfied) notes.push('Bazı şartlar eleme kurallarıyla çakıştığı için uygulanamadı.');
  if (notes.length) {
    const n = el('p', 'step-hint', notes.join(' '));
    planPanel.appendChild(n);
  }

  const grid = el('div', 'week-grid');
  r.plan.forEach((day, i) => {
    const dayCost = (recipeCost(day.breakfast) + recipeCost(day.dinner)) * r.scale;
    const card = el('div', 'day-card');
    card.setAttribute('data-testid', `card-day-${i}`);
    card.innerHTML = `
      <div class="day-card-head">
        <span class="day-name">${day.day}</span>
        <span class="day-cost">${fmtEur(dayCost)}</span>
      </div>`;
    for (const [label, meal, cls] of [['Kahvaltı', day.breakfast, 'is-breakfast'], ['Akşam', day.dinner, 'is-dinner']]) {
      const slot = el('div', 'meal-slot');
      const lab = el('span', 'meal-label', label);
      const btn = el('button', `meal-card ${cls}`);
      btn.type = 'button';
      btn.setAttribute('data-testid', `button-meal-${i}-${label}`);
      btn.innerHTML = `
        <span class="meal-name">${meal.name}</span>
        <span class="meal-meta">${meal.time} dk · ${fmtEur(recipeCostPerServing(meal))}/porsiyon</span>`;
      btn.addEventListener('click', () => openModal(meal));
      slot.append(lab, btn);
      card.appendChild(slot);
    }
    grid.appendChild(card);
  });
  planPanel.appendChild(grid);

  /* Alışveriş paneli */
  const shopPanel = $('#panel-shopping');
  shopPanel.innerHTML = '';
  const storeOrder = Object.keys(STORES).filter((st) => s.byStore[st]);
  for (const store of storeOrder) {
    const storeItems = s.byStore[store];
    const sec = el('section', 'store-section');
    sec.setAttribute('data-testid', `section-store-${store}`);
    const head = el('button', 'store-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'true');
    head.setAttribute('data-testid', `button-store-head-${store}`);
    head.innerHTML = `
      <span class="store-name">${store}</span>
      <span class="store-sub">${storeItems.length} ürün</span>
      <span class="store-total">${fmtEur(s.storeTotals[store])}</span>`;
    const body = el('div', 'store-body');
    const addItems = () => {
      body.innerHTML = '';
      storeItems.forEach((it) => {
        const key = it.name;
        const row = el('div', 'shop-item' + (state.checked.has(key) ? ' is-checked' : ''));
        row.setAttribute('data-testid', `row-item-${it.name}`);
        const id = `chk-${it.name.replace(/\s+/g, '-')}`;
        row.innerHTML = `
          <label for="${id}">
            <input type="checkbox" id="${id}"${state.checked.has(key) ? ' checked' : ''}>
            <span class="shop-item-name">${it.name}<span class="shop-item-qty"> — ${fmtQty(it)}</span></span>
          </label>
          <span class="shop-item-meta"></span>
          <span class="shop-item-price">${fmtEur(it.price)}</span>`;
        const chk = row.querySelector('input');
        chk.addEventListener('change', () => {
          chk.checked ? state.checked.add(key) : state.checked.delete(key);
          row.classList.toggle('is-checked', chk.checked);
        });
        body.appendChild(row);
      });
    };
    head.addEventListener('click', () => {
      const open = body.hidden;
      body.hidden = !open;
      head.setAttribute('aria-expanded', String(open));
    });
    addItems();
    sec.append(head, body);
    shopPanel.appendChild(sec);
  }
  const foot = el('p', 'shopping-footnote',
    `Tahmini toplam: ${fmtEur(s.grandTotal)} · Fiyatlar Almanya ortalaması bazında tahminidir, mağazaya ve sezona göre değişebilir.`);
  shopPanel.appendChild(foot);

  /* Karşılaştırma paneli */
  const cmpPanel = $('#panel-compare');
  cmpPanel.innerHTML = '';
  const cmpNote = el('p', 'compare-note',
    'Aynı sepetin tamamı farklı marketlerde alınırsa tahmini maliyeti aşağıda. "En uygun" market tek seferde her şeyi almak isteyenler için; listenizde her market kendi en güç olduğu reyonlardan seçildi.');
  cmpPanel.appendChild(cmpNote);
  const rows = Object.entries(STORES)
    .map(([store, cfg]) => ({ store, total: s.items.reduce((sum, it) => sum + it.price * cfg.factor, 0) }))
    .sort((a, b) => a.total - b.total);
  const best = rows[0].store;
  const wrap = el('div', 'compare-wrap');
  const table = el('table', 'compare-table');
  table.setAttribute('data-testid', 'table-compare');
  table.innerHTML = `
    <thead><tr><th>Market</th><th>Tahmini sepet</th><th>Fark</th></tr></thead>
    <tbody>${rows.map((row) => `
      <tr${row.store === best ? ' class="is-best"' : ''}>
        <td>${row.store}${row.store === best ? '<span class="badge-best">En uygun</span>' : ''}</td>
        <td>${fmtEur(row.total)}</td>
        <td>${row.store === best ? '—' : '+' + fmtEur(row.total - rows[0].total)}</td>
      </tr>`).join('')}</tbody>`;
  wrap.appendChild(table);
  cmpPanel.appendChild(wrap);
}

/* ---------- Sekmeler ---------- */
function switchTab(name) {
  document.querySelectorAll('.nav-tab').forEach((t) => t.classList.toggle('is-active', t.dataset.resultsTab === name));
  document.querySelectorAll('.results-tab').forEach((p) => { p.hidden = p.dataset.resultsPanel !== name; });
}

/* ---------- Tarif modalı ---------- */
function openModal(recipe) {
  const r = state.planResult;
  const scale = r ? r.scale : 1;
  const cost = recipeCost(recipe) * scale;
  const modal = $('#modal-inner');
  modal.innerHTML = `
    <button type="button" class="modal-close" data-testid="button-modal-close" aria-label="Kapat">Kapat ✕</button>
    <h3 id="modal-title">${recipe.name}</h3>
    <p class="modal-sub">${recipe.time} dk · ${fmtEur(recipeCostPerServing(recipe))}/porsiyon · hane için: ${fmtEur(cost)} (${recipe.serves} kişilik tarif × ${scale.toFixed(2).replace('.', ',')} ölçek)</p>
    <div class="tag-row">${recipe.tags.filter((t) => t !== 'kahvalti' && t !== 'pratik-degil').map(tagPill).join('')}</div>
    <h4>Malzemeler (haneye göre ölçekli)</h4>
    <ul class="ingredients">${recipe.ingredients.map(([name, qty]) => {
      const ing = ING[name];
      const q = roundQty(qty * scale, ing.unit);
      const unit = ing.unit === 'g' ? 'g' : ing.unit === 'adet' ? 'adet' : ing.unit === 'tutam' ? 'tutam' : 'tk';
      return `<li><span>${name}</span><span>${q} ${unit}</span></li>`;
    }).join('')}</ul>
    <h4>Hazırlanışı</h4>
    <ol class="steps">${recipe.steps.map((s) => `<li>${s}</li>`).join('')}</ol>`;
  $('#modal').hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
}
function closeModal() {
  $('#modal').hidden = true;
  document.body.style.overflow = '';
}

/* ---------- Olay bağlama ---------- */
$('#btn-add-member').addEventListener('click', () => {
  state.members.push({ age: 30, gender: 'e' });
  renderMembers();
});
$('#btn-prev').addEventListener('click', () => showStep(Math.max(1, state.step - 1)));
$('#btn-next').addEventListener('click', nextStep);
$('#btn-regen').addEventListener('click', () => { generateAndShow(); toast('Yeni bir plan oluşturuldu.'); });
$('#btn-edit-setup').addEventListener('click', () => {
  $('#results').hidden = true;
  $('#header-nav').hidden = true;
  $('#wizard').hidden = false;
  showStep(1);
});
document.querySelectorAll('.nav-tab').forEach((t) => {
  t.addEventListener('click', () => switchTab(t.dataset.resultsTab));
});
$('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
$('#budget-min').addEventListener('input', () => {});
$('#budget-max').addEventListener('input', () => {});

/* ---------- Başlat ---------- */
renderStepper();
renderMembers();
renderAllChips();
showStep(1);
