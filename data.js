'use strict';
/* =========================================================
   MUTFAK PLANI — VERİ KATMANI
   Malzemeler, fiyatlar (tahmini), alerjenler, tarifler
   ========================================================= */

/* ---------- Mutfaqlar ---------- */
const CUISINES = [
  { id: 'tr', name: 'Türk Mutfağı', desc: 'Çorba, baklagil, sebze yemeği, pilav' },
  { id: 'it', name: 'İtalyan Mutfağı', desc: 'Makarna, pizza, risotto' },
  { id: 'fr', name: 'Fransız Mutfağı', desc: 'Gratin, quiche, sote' },
  { id: 'de', name: 'Alman Mutfağı', desc: 'Schnitzel, bratwurst, spätzle' },
  { id: 'gr', name: 'Yunan Mutfağı', desc: 'Moussaka, dolma, mezeler' },
  { id: 'mix', name: 'Karışık Mutfağı', desc: 'Tüm mutfaklardan karışık' },
];

/* ---------- Malzeme fiyat veritabanı (tahmini, Almanya ortalaması) ----------
   ppu: birim başına € (g → kg fiyatı / 1000) */
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
  /* --- yeni malzemeler (diğer mutfaklar + tatlılar) --- */
  'şeker': { cat: 'temel', ppu: 0.0012, unit: 'g' },
  'ceviz': { cat: 'kuru', ppu: 0.028, unit: 'g' },
  'bitter çikolata': { cat: 'temel', ppu: 0.018, unit: 'g' },
  'kakao': { cat: 'temel', ppu: 0.02, unit: 'g' },
  'mascarpone': { cat: 'sut', ppu: 0.012, unit: 'g' },
  'bisküvi': { cat: 'temel', ppu: 0.012, unit: 'g' },
  'vanilya': { cat: 'baharat', ppu: 0.2, unit: 'tk' },
  'süt kreması': { cat: 'sut', ppu: 0.0045, unit: 'g' },
  'elma': { cat: 'meyve', ppu: 0.003, unit: 'g' },
  'tarçın': { cat: 'baharat', ppu: 0.06, unit: 'tk' },
  'portakal': { cat: 'meyve', ppu: 0.005, unit: 'g' },
  'lahana': { cat: 'sebze', ppu: 0.0012, unit: 'g' },
  'kereviz': { cat: 'sebze', ppu: 0.002, unit: 'g' },
  'schinken (jambon)': { cat: 'et', ppu: 0.02, unit: 'g' },
  'bratwurst': { cat: 'et', ppu: 0.018, unit: 'g' },
  'speck (domuz pastırması)': { cat: 'et', ppu: 0.028, unit: 'g' },
  'grieß (irmik)': { cat: 'temel', ppu: 0.004, unit: 'g' },
  'marmelat': { cat: 'kahvalti', ppu: 0.008, unit: 'g' },
  'brötchen': { cat: 'firin', ppu: 0.35, unit: 'adet' },
  'croissant': { cat: 'firin', ppu: 0.55, unit: 'adet' },
  'parmesan': { cat: 'sut', ppu: 0.022, unit: 'g' },
  'mozzarella': { cat: 'sut', ppu: 0.011, unit: 'g' },
  'lahmacun': { cat: 'firin', ppu: 1.3, unit: 'adet' },
  'baklava (hazır)': { cat: 'firin', ppu: 0.02, unit: 'g' },
  'karışık berry (donmuş)': { cat: 'meyve', ppu: 0.009, unit: 'g' },
  'kahve': { cat: 'temel', ppu: 0.02, unit: 'g' },
  'maya': { cat: 'temel', ppu: 0.35, unit: 'adet' },
  'hardal': { cat: 'temel', ppu: 0.1, unit: 'tk' },
};

const UNIT_LABEL = { g: 'g', adet: 'adet', tutam: 'tutam', tk: 'tk' };

/* ---------- Alerjen eşleme ---------- */
const ALLERGEN_MAP = [
  ['gluten', ['un', 'makarna', 'bulgur', 'erişte', 'ekmek', 'simit', 'yulaf', 'bisküvi', 'grieß', 'brötchen', 'croissant', 'lahmacun', 'baklava']],
  ['süt', ['süt', 'yoğurt', 'peynir', 'tereyağı', 'lor', 'mascarpone', 'süt kreması', 'parmesan', 'mozzarella']],
  ['yumurta', ['yumurta']],
  ['susam', ['tahin']],
  ['balık', ['somon', 'ton balığı']],
  ['kuruyemiş', ['ceviz']],
  ['kırmızı et', ['dana kıyma', 'kuşbaşı dana et']],
  ['tavuk', ['tavuk göğsü', 'tavuk but']],
  ['domuz', ['schinken', 'bratwurst', 'speck']],
];

/* ---------- Eleme seçenekleri ---------- */
const ALLERGEN_OPTIONS = [
  ['gluten', 'Gluten / Buğday'], ['süt', 'Süt / Laktoz'], ['yumurta', 'Yumurta'],
  ['susam', 'Susam'], ['kuruyemiş', 'Kuruyemiş'], ['balık', 'Balık'],
  ['kırmızı et', 'Kırmızı Et'], ['tavuk', 'Tavuk'], ['domuz', 'Domuz'],
];
const DISLIKE_OPTIONS = ['mantar', 'soğan', 'maydanoz', 'dereotu', 'nane', 'pırasa', 'kereviz', 'bulgur', 'pirinç', 'yoğurt', 'bezelye', 'patlıcan', 'kabak', 'kırmızı biber'];

/* ---------- Şart kuralları ---------- */
const MUST_RULES = [
  { id: 'baklagil2', label: 'Haftada en az 2 baklagil yemeği', tag: 'baklagil', min: 2 },
  { id: 'balik1', label: 'Haftada en az 1 balık', tag: 'balik', min: 1 },
  { id: 'corba1', label: 'Haftada en az 1 çorba', tag: 'corba', min: 1 },
  { id: 'tavuk2', label: 'Haftada en az 2 tavuk yemeği', tag: 'tavuk', min: 2 },
  { id: 'sebze3', label: 'Sebze ağırlıklı (en az 3 sebze yemeği)', tag: 'sebze', min: 3 },
  { id: 'tahil2', label: 'Haftada en az 2 pilav / bulgur', tag: 'tahil', min: 2 },
  { id: 'etli2', label: 'Haftada en az 2 kırmızı etli yemek', tag: 'etli', min: 2 },
];

/* =========================================================
   TARİFLER
   meal: 'dinner' | 'breakfast' | 'lunch' | 'dessert'
   cuisine: 'tr' | 'it' | 'fr' | 'de' | 'gr'
   guest: misafir günü için öncelikli
   ========================================================= */
function R(cuisine, meal, id, name, time, tags, ingredients, steps, guest) {
  const serves = meal === 'lunchbox' ? 1 : 4;
  return { id, name, cuisine, meal, time, tags, serves, ingredients, steps, guest: !!guest, allergens: null };
}

const RECIPES = [
  /* ================= TÜRK — AKŞAM ================= */
  R('tr', 'dinner', 'mercimek-corba', 'Kırmızı Mercimek Çorbası + Ekmek', 40, ['corba', 'vegan', 'baklagil', 'tahil'],
    [['kırmızı mercimek', 300], ['soğan', 100], ['havuç', 100], ['patates', 100], ['domates salçası', 15], ['tereyağı', 25], ['sıvı yağ', 20], ['nane', 1], ['kimyon', 1], ['ekmek', 1, true]],
    ['Mercimeği yıkayın. Soğan, havuç ve patatesi küp doğrayın.', 'Sebzeleri sıvı yağda 3-4 dakika soteleyin, salçayı ekleyip kavurun.', 'Mercimeği ve 1,2 lt suyu ekleyip kısık ateşte 30 dakika pişirin.', 'Blender ile pürüzsüz hale getirin, tereyağı ve kimyonla tatlandırın.', 'Kızarmış ekmek ve kuru nane ile servis edin.']),

  R('tr', 'dinner', 'kuru-fasulye', 'Kuru Fasulye + Pirinç Pilavı', 90, ['baklagil', 'tahil'],
    [['kuru fasulye', 350], ['soğan', 100], ['domates salçası', 20], ['sıvı yağ', 30], ['pirinç', 250], ['tereyağı', 20], ['tuz', 1]],
    ['Fasulyeyi akşamdan ıslatın (ya da 1 saat haşlayın).', 'Soğanı yağda kavurun, salçayı ekleyin.', 'Fasulye ve 4 su bardağı suyu ekleyip yumuşayana kadar pişirin.', 'Ayrı tencerede tereyağında pirinci kavurup 1:1,5 oranında suyla pilavı pişirin.', 'Pilavın üzerine fasulye dökerek servis edin.']),

  R('tr', 'dinner', 'nohut-yemegi', 'Nohut Yemeği + Bulgur Pilavı', 80, ['baklagil', 'vegan', 'tahil'],
    [['nohut', 300], ['soğan', 100], ['domates salçası', 20], ['biber salçası', 10], ['sıvı yağ', 30], ['bulgur', 250], ['biber', 100]],
    ['Nohudu akşamdan ıslatın, yumuşayana kadar haşlayın.', 'Soğanı kavurup iki salçayı ekleyin.', 'Nohudu ve suyunu ekleyip 20 dakika kaynatın.', 'Bulguru 1:1,5 suda pilav gibi pişirin.', 'Bulgurun yanında sıcak servis edin.']),

  R('tr', 'dinner', 'etli-taze-fasulye', 'Etli Taze Fasulye + Pirinç', 60, ['etli', 'sebze', 'tahil'],
    [['kuşbaşı dana et', 300], ['taze fasulye', 750], ['soğan', 100], ['domates salçası', 15], ['sıvı yağ', 25], ['pirinç', 200]],
    ['Kuşbaşını yüksek ateşte mühürleyin.', 'Soğanı ekleyip kavurun, salçayı ilave edin.', 'Ayıklanmış fasulyeleri ekleyip 3 dakika soteleyin.', 'Üzerini geçecek kadar sıcak su ekleyip kısık ateşte 40 dakika pişirin.', 'Pirinç pilavıyla servis edin.']),

  R('tr', 'dinner', 'karniyarik', 'Karnıyarık + Pirinç Pilavı', 70, ['etli', 'tahil'],
    [['patlıcan', 700], ['dana kıyma', 250], ['soğan', 150], ['domates', 200], ['biber', 100], ['domates salçası', 10], ['sıvı yağ', 60], ['pirinç', 200]],
    ['Patlıcanları alacalı soyup tuzlu suda 15 dakika bekletin.', 'Az yağda iki tarafını hafif kızartın (ya da fırında 20 dakika pişirin).', 'Ayrı tavada kıyma ve soğanı kavurup salça, domates, biberle doldurmayı hazırlayın.', 'Patlıcanları yararak içine harcı doldurun.', 'Az su ekleyip 180 °C fırında 25 dakika pişirin. Pilavla servis edin.']),

  R('tr', 'dinner', 'tavuk-sote', 'Sebzeli Tavuk Sote', 35, ['tavuk', 'pratik', 'tahil'],
    [['tavuk göğsü', 550], ['biber', 250], ['mantar', 200], ['soğan', 100], ['domates', 150], ['sıvı yağ', 25], ['pirinç', 200], ['karabiber', 1]],
    ['Tavuğu kuşbaşı doğrayıp tuz ve karabiberle marine edin.', 'Yüksek ateşte tavuğu mühürleyip kenara alın.', 'Aynı tavada soğan, biber ve mantarı soteleyin.', 'Tavuğu geri ekleyip küp domateslerle 10 dakika pişirin.', 'Pirinç pilavı yanında servis edin.']),

  R('tr', 'dinner', 'firin-tavuk', 'Fırında Tavuk But + Patates', 75, ['tavuk', 'firin'],
    [['tavuk but', 900], ['patates', 800], ['biber', 150], ['kekik', 2], ['sıvı yağ', 30], ['tuz', 1]],
    ['Butları kekik, tuz ve yağ ile harmanlayın.', 'Patatesleri iri dilimleyip tepsiye yerleştirin.', 'Tavukları patateslerin üzerine dizin.', '200 °C fırında 60 dakika (arada çevirerek) pişirin.', 'Fırından çıkar çıkmaz servis edin.']),

  R('tr', 'dinner', 'bolonez-tr', 'Spagetti Bolonez', 40, ['pratik', 'makarna'],
    [['makarna', 400], ['dana kıyma', 300], ['soğan', 100], ['havuç', 80], ['domates', 250], ['domates salçası', 20], ['sıvı yağ', 25]],
    ['Makarnayı diri haşlayın.', 'Soğan ve rendelenmiş havucu yağda kavurun.', 'Kıymayı ekleyip rengi dönene kadar pişirin.', 'Küp domates ve salçayı ekleyip 15 dakika kaynatın.', 'Sosu makarna ile karıştırıp servis edin.']),

  R('tr', 'dinner', 'mucver', 'Kabak Mücver + Yoğurtlu Sos', 40, ['vejetaryen'],
    [['kabak', 700], ['yumurta', 3], ['un', 150], ['beyaz peynir', 100], ['dereotu', 1], ['sıvı yağ', 80], ['yoğurt', 250]],
    ['Kabakları rendeleyip suyunu sıkın.', 'Yumurta, un, peynir ve dereotuyla karıştırın.', 'Kıvam koyu bir harç elde edin.', 'Yağda kaşık kaşık kızartın (ya da az yağla tavada).', 'Sarımsaklı yoğurt eşliğinde servis edin.']),

  R('tr', 'dinner', 'ispanak', 'Ispanak Yemeği + Pirinç', 35, ['vejetaryen', 'sebze', 'tahil'],
    [['ıspanak', 800], ['soğan', 100], ['domates salçası', 15], ['pirinç', 200], ['sıvı yağ', 25]],
    ['Ispanağı yıkayıp doğrayın.', 'Soğanı kavurup salçayı ekleyin.', 'Ispanağı ekleyip suyunu salana kadar soteleyin.', 'Az su ekleyip 15 dakika pişirin.', 'Pirinç pilavıyla servis edin.']),

  R('tr', 'dinner', 'mercimek-koftesi', 'Mercimek Köftesi + Salata', 50, ['vejetaryen', 'baklagil', 'pratik', 'tahil'],
    [['kırmızı mercimek', 250], ['bulgur', 200], ['soğan', 150], ['domates salçası', 15], ['zeytinyağı', 30], ['marul', 150], ['limon', 1], ['maydanoz', 1]],
    ['Mercimeği 2 su bardağı suyla haşlayın.', 'Haşlanmış mercimeğe bulguru ekleyip 15 dakika dinlendirin.', 'Kavrulmuş soğan ve salçayı, baharatları ekleyip yoğurun.', 'Elleri ıslatıp köfte şekli verin.', 'Marul, limon ve maydanozla servis edin.']),

  R('tr', 'dinner', 'somon-firin', 'Fırın Somon + Brokoli', 35, ['balik', 'pratik'],
    [['somon fileto', 550], ['brokoli', 400], ['patates', 400], ['limon', 1], ['zeytinyağı', 30], ['kekik', 1]],
    ['Somonu zeytinyağı, kekik ve limonla marine edin.', 'Brokoliyi ve patates dilimlerini tepsiye yayın.', '200 °C fırında 20-25 dakika pişirin.', 'Balığı sebzelerin üzerine koyup 10 dakika daha pişirin.', 'Limon dilimleriyle servis edin.']),

  R('tr', 'dinner', 'tonlu-makarna', 'Ton Balıklı Makarna', 25, ['balik', 'pratik', 'makarna'],
    [['makarna', 400], ['ton balığı konserve', 2], ['domates', 200], ['soğan', 80], ['zeytinyağı', 30], ['maydanoz', 1], ['limon', 1]],
    ['Makarnayı diri haşlayın.', 'Soğanı zeytinyağında pembeleştirin.', 'Domatesleri ekleyip 5 dakika pişirin.', 'Süzülmüş ton balığını ve makarnayı ekleyip karıştırın.', 'Limon ve maydanozla servis edin.']),

  R('tr', 'dinner', 'tavuklu-eriste', 'Tavuklu Sebzeli Erişte', 30, ['tavuk', 'pratik', 'makarna'],
    [['erişte', 350], ['tavuk göğsü', 400], ['biber', 200], ['havuç', 100], ['soğan', 100], ['sıvı yağ', 25]],
    ['Tavuğu ince şeritler halinde doğrayıp mühürleyin.', 'Sebzeleri julienne doğrayıp soteleyin.', 'Erişteyi ayrıca haşlayın.', 'Hepsini tavada birleştirip 3-4 dakika çevirin.', 'Karabiberle tatlandırıp servis edin.']),

  R('tr', 'dinner', 'etli-karnabahar', 'Etli Karnabahar Yemeği', 55, ['etli', 'sebze'],
    [['kuşbaşı dana et', 300], ['karnabahar', 800], ['soğan', 100], ['domates salçası', 15], ['sıvı yağ', 25], ['pirinç', 150]],
    ['Kuşbaşını mühürleyin, soğanla kavurun.', 'Salçayı ekleyip kokusu çıkana kadar kavurun.', 'Çiçeklere ayrılmış karnabaharı ekleyin.', 'Üzerini geçecek kadar sıcak su ekleyip 35 dakika pişirin.', 'Pilav yanında sıcak servis edin.']),

  R('tr', 'dinner', 'etli-bezelye', 'Etli Bezelye Yemeği', 50, ['etli', 'sebze'],
    [['kuşbaşı dana et', 300], ['dondurulmuş bezelye', 700], ['havuç', 150], ['soğan', 100], ['domates salçası', 15], ['sıvı yağ', 25], ['pirinç', 150]],
    ['Kuşbaşını mühürleyip soğanla kavurun.', 'Salçayı ekleyin, havuç dilimlerini katın.', 'Bezelyeyi ve sıcak suyu ekleyip 30 dakika pişirin.', 'Tadını tuzla ayarlayın.', 'Pilavla servis edin.']),

  R('tr', 'dinner', 'lahana-sarma', 'Etli Lahana Sarması', 100, ['etli'],
    [['lahana', 900], ['dana kıyma', 300], ['pirinç', 200], ['soğan', 150], ['domates salçası', 20], ['sıvı yağ', 50]],
    ['Lahanayı haşlayıp yapraklarını ayırın.', 'Kıyma, pirinç, soğan ve salçayla iç harcı hazırlayın.', 'Yapraklara harç sarıp tencereye sıkışık dizin.', 'Üzerine su ekleyip ağırlık koyarak 50 dakika pişirin.', 'Limonla servis edin.']),

  /* ================= TÜRK — MISAFİR ================= */
  R('tr', 'dinner', 'tavuk-sis', 'Tavuk Şiş + Tereyağlı Pilav (Misafir)', 60, ['tavuk', 'misafir', 'tahil'],
    [['tavuk göğsü', 700], ['yoğurt', 150], ['domates salçası', 15], ['pul biber', 1], ['tereyağı', 50], ['pirinç', 300], ['limon', 1]],
    ['Tavuğu kuşbaşı doğrayıp yoğurt, salça ve baharatlarla 2 saat marine edin.', 'Şişlere dizip yüksek ateşte ya da ızgarada pişirin.', 'Pirinç pilavını tereyağlısıyla hazırlayın.', 'Şişleri pilavın üzerine dizip tereyağı gezdirin.', 'Limon ve pul biberle servis edin.'], true),

  /* ================= TÜRK — KAHVALTI ================= */
  R('tr', 'breakfast', 'kahvalti-klasik', 'Klasik Türk Kahvaltısı', 15, ['kahvalti'],
    [['beyaz peynir', 200], ['zeytin', 100], ['bal', 40], ['ekmek', 1, true], ['domates', 200], ['salatalık', 200], ['tereyağı', 30]],
    ['Domates ve salatalığı dilimleyin.', 'Peynir ve zeytini tabağa alın.', 'Ekmeği dilimleyin.', 'Bal ve tereyağını servis edin.', 'Çay eşliğinde servis yapın.']),

  R('tr', 'breakfast', 'menemen', 'Menemen', 20, ['kahvalti', 'pratik'],
    [['yumurta', 6], ['domates', 300], ['biber', 150], ['tereyağı', 30], ['ekmek', 1, true]],
    ['Biberleri tereyağında kavurun.', 'Rendelenmiş domatesi ekleyip suyu çekene kadar pişirin.', 'Ateşi kısın, çırpılmış yumurtaları ekleyin.', 'Karıştırarak hafif katılaşmasını sağlayın.', 'Taze ekmekle servis edin.']),

  R('tr', 'breakfast', 'haslanmis-yumurta', 'Haşlanmış Yumurta + Peynir', 15, ['kahvalti', 'pratik'],
    [['yumurta', 4], ['beyaz peynir', 150], ['zeytin', 60], ['ekmek', 1, true], ['domates', 150]],
    ['Yumurtaları 8 dakika haşlayın.', 'Sebzeleri dilimleyin.', 'Peynir ve zeytini tabağa alın.', 'Ekmeği dilimleyip servis edin.']),

  R('tr', 'breakfast', 'yulaf', 'Yulaf Lapası', 10, ['kahvalti', 'pratik', 'vegan'],
    [['yulaf', 200], ['süt', 800], ['bal', 30], ['muz', 2]],
    ['Yulafı sütle 5 dakika pişirin.', 'Kaseye alın.', 'Üzerine bal ekleyin.', 'Muz dilimleriyle süsleyin.']),

  R('tr', 'breakfast', 'tahin-pekmez', 'Tahin-Pekmez + Ekmek', 5, ['kahvalti', 'pratik', 'vegan'],
    [['tahin', 60], ['pekmez', 60], ['ekmek', 1, true]],
    ['Tahin ve pekmezi karıştırın.', 'Ekmeği dilimleyin.', 'Karışımı ekmeğin üzerine sürerek servis edin.']),

  R('tr', 'breakfast', 'simit-lor', 'Simit + Lor + Çay', 5, ['kahvalti', 'pratik'],
    [['simit', 4], ['lor', 200], ['zeytin', 60], ['domates', 150]],
    ['Simitleri ikiye bölün.', 'Loru simitlerin arasına sürün.', 'Zeytin ve domatesle servis edin.']),

  R('tr', 'breakfast', 'lorlu-tost', 'Lorlu Ballı Tost', 12, ['kahvalti', 'pratik'],
    [['ekmek', 1], ['lor', 250], ['bal', 30], ['tereyağı', 30]],
    ['Lor ve balı karıştırın.', 'Karışımı ekmek dilimlerinin arasına sürün.', 'Tereyağlı tavada iki tarafını kızartın.', 'Sıcak servis edin.']),

  /* ================= TÜRK — ÖĞLE ================= */
  R('tr', 'lunch', 'lahmacun-oglen', 'Lahmacun + Ayran', 25, ['lunch', 'pratik'],
    [['lahmacun', 4], ['yoğurt', 400], ['marul', 100], ['domates', 150], ['limon', 1], ['maydanoz', 1]],
    ['Lahmacunları fırında ya da tavada ısıtın.', 'Marul, domates ve maydanozu doğrayın.', 'İçine sebzeleri sararak limonla servis edin.', 'Yoğurdu çırpıp ayran yapın.']),

  R('tr', 'lunch', 'sebze-corba-oglen', 'Sebze Çorbası + Ekmek', 30, ['lunch', 'corba', 'vegan'],
    [['havuç', 200], ['pırasa', 150], ['patates', 200], ['kereviz', 100], ['tereyağı', 20], ['ekmek', 1, true]],
    ['Sebzeleri küp doğrayın.', 'Tereyağında 3 dakika soteleyin.', 'Üzerini geçecek kadar su ekleyip 25 dakika pişirin.', 'Blender ile pürüzsüzleştirin.', 'Ekmekle servis edin.']),

  R('tr', 'lunch', 'tonlu-sandvic', 'Ton Balıklı Sandviç', 15, ['lunch', 'pratik', 'balik'],
    [['ekmek', 1], ['ton balığı konserve', 1], ['marul', 100], ['domates', 150], ['zeytinyağı', 20], ['limon', 1]],
    ['Ton balığını süzüp zeytinyağı ve limonla karıştırın.', 'Ekmeği dilimleyin.', 'Marul ve domatesle birlikte ton balığını ekmeğin arasına koyun.', 'Hemen servis edin.']),

  R('tr', 'lunch', 'kisir-oglen', 'Kısır + Çay', 30, ['lunch', 'vejetaryen', 'pratik', 'tahil'],
    [['bulgur', 300], ['domates salçası', 20], ['biber salçası', 10], ['soğan', 100], ['maydanoz', 1], ['zeytinyağı', 40], ['limon', 1], ['marul', 100]],
    ['Bulguru sıcak suyla ıslatıp 20 dakika şişirin.', 'Salçaları, rendelenmiş soğanı ve yağı ekleyin.', 'Limon suyu ve ince kıyılmış maydanozla yoğurun.', 'Tadını tuz ve pul biberle ayarlayın.', 'Marul yapraklarıyla sararak servis edin.']),

  /* ================= TÜRK — TATLI ================= */
  R('tr', 'dessert', 'sutlac', 'Fırın Sütlaç', 60, ['dessert', 'pratik'],
    [['pirinç', 100], ['süt', 1000], ['şeker', 150], ['vanilya', 1]],
    ['Pirinci 2 su bardağı suyla haşlayın.', 'Sütü ve şekeri ekleyip kısık ateşte 15 dakika karıştırarak pişirin.', 'Vanilyayı ekleyin, kaseye paylaştırın.', '180 °C fırında üstü hafif kızarana kadar 15 dakika pişirin.', 'Soğuyunca buzdolabında 2 saat dinlendirin.']),

  R('tr', 'dessert', 'kabak-tatli', 'Kabak Tatlısı', 45, ['dessert', 'vegan'],
    [['kabak', 800], ['şeker', 200], ['ceviz', 50], ['tarçın', 1]],
    ['Kabakları soyup iri küpler halinde kesin.', 'Tencereye dizip üzerine şekeri gezdirin.', 'Kısık ateşte 30-40 dakika suyunu salıp çekene kadar pişirin.', 'Ceviz ve tarçınla süsleyin.', 'Soğuk ya da ılık servis edin.']),

  R('tr', 'dessert', 'revani', 'Revani', 50, ['dessert'],
    [['şeker', 200], ['un', 150], ['yumurta', 3], ['yoğurt', 100], ['limon', 1], ['sıvı yağ', 60]],
    ['Yumurta ve şekeri çırpın, yoğurt ve yağı ekleyin.', 'Unu ekleyip akışkan bir hamur hazırlayın.', 'Yağlanmış tepside 180 °C fırında 30 dakika pişirin.', 'Limonlu şerbeti sıcak kekin üzerine dökün.', 'Soğuyunca dilimleyip servis edin.']),

  /* ================= İTALYAN — AKŞAM ================= */
  R('it', 'dinner', 'pomodoro', 'Spagetti al Pomodoro', 25, ['pratik', 'makarna', 'vegan'],
    [['makarna', 400], ['domates', 500], ['domates salçası', 20], ['zeytinyağı', 30], ['sarımsak', 10], ['parmesan', 40]],
    ['Makarnayı tuzlu suda diri haşlayın.', 'Sarımsağı zeytinyağında hafifçe kavurun.', 'Küp domates ve salçayı ekleyip 10 dakika pişirin.', 'Sosu makarnayla karıştırın.', 'Rendelenmiş parmesanla servis edin.']),

  R('it', 'dinner', 'arrabbiata', 'Penne Arrabbiata', 25, ['pratik', 'makarna', 'vegan'],
    [['makarna', 400], ['domates', 500], ['pul biber', 1], ['sarımsak', 10], ['zeytinyağı', 30]],
    ['Makarnayı haşlayın.', 'Sarımsak ve pul biberi zeytinyağında kavurun.', 'Domatesleri ekleyip 10 dakika pişirin.', 'Sosu makarnayla karıştırın.', 'Taze fesleğenle (varsa) servis edin.']),

  R('it', 'dinner', 'carbonara', 'Spagetti Carbonara', 30, ['pratik', 'makarna'],
    [['makarna', 400], ['yumurta', 3], ['parmesan', 60], ['speck (domuz pastırması)', 120], ['karabiber', 1]],
    ['Makarnayı haşlayın, bir bardak haşlama suyu ayırın.', 'Speck küplerini kavurun.', 'Yumurta ve rendelenmiş peyniri çırpın.', 'Sıcak makarnayı yumurtalı karışıma hızla karıştırın (ateşten alıp).', 'Haşlama suyuyla kremamsı kıvam verin, bol karabiberle servis edin.']),

  R('it', 'dinner', 'risotto-funghi', 'Mantarlı Risotto', 40, ['vejetaryen', 'pratik'],
    [['pirinç', 300], ['mantar', 400], ['soğan', 100], ['parmesan', 60], ['tereyağı', 40], ['sıvı yağ', 20]],
    ['Soğanı yağda kavurup pirinci ekleyin, 2 dakika çevirin.', 'Sıcak suyu yavaş yavaş ekleyerek 18 dakika karıştırarak pişirin.', 'Ayrı tavada sotelediğiniz mantarları ekleyin.', 'Tereyağı ve parmesanla kremamsı hale getirin.', 'Tuz ve karabiberle servis edin.']),

  R('it', 'dinner', 'pizza-margherita', 'Ev Yapımı Pizza Margherita', 90, ['firin', 'pratik'],
    [['un', 400], ['maya', 1], ['mozzarella', 250], ['domates', 300], ['zeytinyağı', 30], ['tuz', 1]],
    ['Un, maya, tuz ve ılık suyla hamur yoğurup 1 saat mayalandırın.', 'Domatesleri ezerek sos hazırlayın, tuz ve zeytinyağı ekleyin.', 'Hamuru açıp sosu ve mozzarellayı ekleyin.', '250 °C (maksimum) fırında 8-10 dakika pişirin.', 'Taze fesleğenle servis edin.']),

  R('it', 'dinner', 'cacciatore', 'Tavuk Cacciatore', 60, ['tavuk'],
    [['tavuk but', 900], ['biber', 200], ['domates', 300], ['soğan', 100], ['mantar', 200], ['zeytinyağı', 30], ['kekik', 1]],
    ['Tavuk butları zeytinyağında altın rengi kızartın.', 'Soğan, biber ve mantarı aynı tavada soteleyin.', 'Domates ve kekiği ekleyin.', 'Tavukları geri koyup kısık ateşte 40 dakika pişirin.', 'İsterseniz polenta ya da ekmekle servis edin.']),

  R('it', 'dinner', 'pollo-forno', 'Fırında Tavuk & Patates (İtalyan Usulü)', 75, ['tavuk', 'firin'],
    [['tavuk but', 900], ['patates', 600], ['biber', 150], ['zeytinyağı', 30], ['kekik', 1]],
    ['Tavukları yağ, kekik ve tuzla harmanlayın.', 'Patates ve biberi tepsiye yayın, tavukları üzerine koyun.', '190 °C fırında 60 dakika pişirin.', 'Arada bir kaşıkla yağını üzerine gezdirin.', 'Sıcak servis edin.']),

  R('it', 'dinner', 'aglio-olio', 'Spagetti Aglio e Olio', 15, ['pratik', 'makarna', 'vegan'],
    [['makarna', 400], ['sarımsak', 15], ['zeytinyağı', 50], ['pul biber', 1]],
    ['Makarnayı diri haşlayın.', 'İnce dilimlenmiş sarımsağı yağda kısık ateşte pembeleştirin.', 'Pul biberi ekleyin.', 'Makarnayı tavaya alıp bir bardak haşlama suyuyla karıştırın.', 'Hemen servis edin.']),

  /* ================= İTALYAN — MISAFİR ================= */
  R('it', 'dinner', 'lazanya', 'Ev Yapımı Lazanya (Misafir)', 90, ['misafir', 'firin'],
    [['makarna', 300], ['dana kıyma', 400], ['domates', 400], ['kaşar peyniri', 250], ['süt', 500], ['un', 50], ['tereyağı', 50], ['soğan', 100]],
    ['Kıyma ve soğanı kavurup domatesle kıymalı sos yapın.', 'Tereyağında unu kavurup sütü ekleyerek beşamel sos hazırlayın.', 'Fırın kabına sırayla sos, makarna ve beşamel dizin.', 'En üste kaşar rendeleyin.', '180 °C fırında 40 dakika pişirin, 10 dakika dinlendirip servis edin.'], true),

  /* ================= İTALYAN — KAHVALTI ================= */
  R('it', 'breakfast', 'cornetto', 'Cornetto & Cappuccino Evde', 10, ['kahvalti', 'pratik'],
    [['croissant', 4], ['marmelat', 60], ['süt', 600], ['kahve', 20]],
    ['Croissantları fırında ya da tavada ısıtın.', 'Marmelatı yanına alın.', 'Sütün yarısıyla cappuccino hazırlayın (espresso + çırpılmış süt).', 'Kalan sütle sütlü kahve ya da sıcak süt servis edin.']),

  R('it', 'breakfast', 'frittata', 'İtalyan Frittata', 20, ['kahvalti', 'pratik'],
    [['yumurta', 6], ['patates', 200], ['soğan', 80], ['zeytinyağı', 30], ['parmesan', 40]],
    ['Patatesleri ince dilimleyip yağda yumuşayana kadar pişirin.', 'Çırpılmış yumurta ve parmesanı ekleyin.', 'Kısık ateşte üstü katılaşana kadar pişirin.', 'İsterseniz altını çevirin ya da fırında 5 dakika bitirin.', 'Dilimleyip servis edin.']),

  R('it', 'breakfast', 'pane-burro', 'Pane, Burro e Marmellata', 5, ['kahvalti', 'pratik', 'vegan'],
    [['ekmek', 1, true], ['tereyağı', 50], ['marmelat', 80], ['kahve', 20]],
    ['Ekmeği dilimleyip kızartın.', 'Tereyağı ve marmelatı sürün.', 'Kahve eşliğinde servis edin.']),

  /* ================= İTALYAN — ÖĞLE ================= */
  R('it', 'lunch', 'caprese', 'Insalata Caprese', 15, ['lunch', 'vejetaryen', 'pratik'],
    [['mozzarella', 250], ['domates', 400], ['zeytinyağı', 30], ['kekik', 1], ['ekmek', 1, true]],
    ['Domates ve mozzarellayı dilimleyin.', 'Dizerek tabağa alın.', 'Zeytinyağı ve kekik gezdirin.', 'Tuz ile tatlandırın.', 'Ekmekle servis edin.']),

  R('it', 'lunch', 'panino', 'Panino al Formaggio', 10, ['lunch', 'pratik', 'vejetaryen'],
    [['brötchen', 4], ['mozzarella', 200], ['domates', 150], ['zeytinyağı', 20]],
    ['Brötchenleri ikiye kesin.', 'İçine mozzarella ve domates dilimleri koyun.', 'Tost makinesinde ya da tavada ısıtın.', 'Zeytinyağı gezdirip servis edin.']),

  R('it', 'lunch', 'minestrone', 'Minestrone Çorbası', 40, ['lunch', 'corba', 'vegan'],
    [['makarna', 150], ['havuç', 150], ['pırasa', 100], ['karnabahar', 150], ['domates', 200], ['parmesan', 30], ['sıvı yağ', 20]],
    ['Sebzeleri küp doğrayıp yağda soteleyin.', 'Domates ve 1,5 lt suyu ekleyip 20 dakika kaynatın.', 'Makarnayı ve karnabaharı ekleyip 10 dakika daha pişirin.', 'Tuz ve karabiberle tatlandırın.', 'Rendelenmiş parmesanla servis edin.']),

  /* ================= İTALYAN — TATLI ================= */
  R('it', 'dessert', 'tiramisu', 'Tiramisu', 30, ['dessert', 'pratik'],
    [['mascarpone', 500], ['yumurta', 3], ['şeker', 100], ['bisküvi', 200], ['kakao', 20], ['kahve', 20]],
    ['Yumurta sarısı ve şekeri çırpıp mascarponu ekleyin.', 'Ayrı çırpılmış yumurta akını yedirin.', 'Bisküvileri kahveye batırıp bir sıra dizin.', 'Üzerine krema sürüp katlamayı tekrarlayın.', 'En az 3 saat buzdolabında dinlendirip kakao serperek servis edin.']),

  R('it', 'dessert', 'panna-cotta', 'Panna Cotta', 20, ['dessert', 'pratik'],
    [['süt kreması', 500], ['şeker', 80], ['vanilya', 1]],
    ['Kremayı ve şekeri kısık ateşte ısıtıp şekeri eritin (kaynatmayın).', 'Vanilyayı ekleyin.', 'Kaselere paylaştırıp 4 saat buzdolabında dondurun.', 'İsterseniz üzerine meyve sosu ekleyin.', 'Soğuk servis edin.']),

  R('it', 'dessert', 'cioccolato-kup', 'Çikolatalı Bisküvili Kup', 20, ['dessert', 'pratik'],
    [['bitter çikolata', 100], ['süt kreması', 200], ['bisküvi', 150], ['şeker', 40]],
    ['Çikolatayı benmari usulü eritin.', 'Kremayı çırpıp çikolatayla karıştırın.', 'Kupların dibine kırılmış bisküvi koyun.', 'Çikolata kremasını üzerine ekleyin.', '1 saat buzdolabında dinlendirip servis edin.']),

  /* ================= FRANSIZ — AKŞAM ================= */
  R('fr', 'dinner', 'ratatouille', 'Ratatouille', 60, ['vegan', 'sebze'],
    [['patlıcan', 400], ['kabak', 400], ['biber', 300], ['domates', 500], ['soğan', 150], ['zeytinyağı', 60], ['kekik', 1]],
    ['Sebzeleri iri küpler halinde doğrayın.', 'Soğanı zeytinyağında kavurun.', 'Sırasıyla patlıcan, biber ve kabağı ekleyip soteleyin.', 'Domates ve kekiği ekleyip kısık ateşte 30 dakika pişirin.', 'Ekmek ya da pilavla servis edin.']),

  R('fr', 'dinner', 'coq-au-vin', 'Coq au Vin (basitleştirilmiş)', 80, ['tavuk'],
    [['tavuk but', 900], ['soğan', 200], ['mantar', 200], ['havuç', 150], ['tereyağı', 30], ['maydanoz', 1]],
    ['Tavukları tereyağında kızartın.', 'Soğan, havuç ve mantarı ekleyip soteleyin.', 'Üzerini geçecek kadar su (ya da kırmızı şarap) ekleyin.', 'Kısık ateşte 45 dakika pişirin.', 'Maydanozle servis edin.']),

  R('fr', 'dinner', 'quiche-lorraine', 'Quiche Lorraine', 70, ['firin', 'pratik'],
    [['un', 250], ['tereyağı', 120], ['yumurta', 4], ['süt', 300], ['schinken (jambon)', 150], ['kaşar peyniri', 100]],
    ['Un ve tereyağıyla hamur yapıp tart kalıbına yayının, 10 dakika önceden pişirin.', 'Jambon küplerini hamurun üzerine yayın.', 'Yumurta, süt ve rendelenmiş peyniri çırpıp dökün.', '180 °C fırında 35 dakika pişirin.', 'Ilık olarak salatayla servis edin.']),

  R('fr', 'dinner', 'gratin-dauphinois', 'Gratin Dauphinois', 80, ['vejetaryen', 'firin'],
    [['patates', 900], ['süt kreması', 300], ['süt', 300], ['tereyağı', 40], ['kaşar peyniri', 100]],
    ['Patatesleri ince dilimleyin.', 'Süt, krema, tuz ve karabiberle karıştırın.', 'Fırın kabına dizip üzerine tereyağı ve peyniri ekleyin.', '180 °C fırında 60 dakika pişirin.', '10 dakika dinlendirip servis edin.']),

  R('fr', 'dinner', 'steak-frites', 'Steak Frites', 40, ['etli', 'pratik'],
    [['kuşbaşı dana et', 600], ['patates', 800], ['tereyağı', 50], ['karabiber', 1]],
    ['Patatesleri kalın matchstick kesip iki aşamada kızartın (ya da fırında).', 'Et dilimlerini tuz ve karabiberle tatlandırın.', 'Yüksek ateşte her tarafını 2-3 dakika mühürleyin.', 'Üzerine tereyağı gezdirin.', 'Patateslerle hemen servis edin.']),

  R('fr', 'dinner', 'fricasse', 'Kremalı Tavuk Frikase + Pirinç', 45, ['tavuk', 'tahil'],
    [['tavuk göğsü', 600], ['mantar', 250], ['havuç', 150], ['süt kreması', 200], ['un', 40], ['tereyağı', 40], ['pirinç', 200]],
    ['Tavuğu tereyağında mühürleyin.', 'Mantar ve havuçları ekleyip soteleyin.', 'Unu serpip 1 dakika kavurun, su ve kremayı ekleyin.', 'Kısık ateşte 20 dakika pişirin.', 'Pirinç pilavıyla servis edin.']),

  R('fr', 'dinner', 'salade-lyonnaise', 'Salade Lyonnaise', 25, ['pratik', 'sebze'],
    [['marul', 300], ['speck (domuz pastırması)', 150], ['yumurta', 4], ['ekmek', 1], ['zeytinyağı', 30], ['hardal', 1]],
    ['Ekmeği küp kesip crouton yapın.', 'Speck küplerini kavurun.', 'Haşlanmış yumurtaları ikiye bölün.', 'Marul, crouton, speck ve yumurtayı karıştırın.', 'Hardallı zeytinyağı sosuyla servis edin.']),

  /* ================= FRANSIZ — MISAFİR ================= */
  R('fr', 'dinner', 'bourguignon', 'Boeuf Bourguignon (Misafir)', 120, ['misafir', 'etli'],
    [['kuşbaşı dana et', 800], ['havuç', 300], ['soğan', 250], ['mantar', 200], ['tereyağı', 40], ['un', 30]],
    ['Eti tereyağında mühürleyin, kenara alın.', 'Soğan ve havuçları kavurup unu ekleyin.', 'Eti geri koyup üzerini geçecek kadar su (ya da kırmızı şarap) ekleyin.', 'Kısık ateşte 1,5 saat pişirin.', 'Mantarları son 20 dakikada ekleyip servis edin.'], true),

  /* ================= FRANSIZ — KAHVALTI ================= */
  R('fr', 'breakfast', 'tartines', 'Tartines & Portakal Suyu', 10, ['kahvalti', 'pratik'],
    [['ekmek', 1, true], ['tereyağı', 40], ['marmelat', 80], ['portakal', 2]],
    ['Ekmeği dilimleyip kızartın.', 'Tereyağı ve marmelatı sürün.', 'Portakalları sıkp taze suyu çıkarın.', 'Kahve ya da çayla servis edin.']),

  R('fr', 'breakfast', 'oeufs', 'Haşlanmış Yumurta & Baget', 15, ['kahvalti', 'pratik'],
    [['yumurta', 4], ['ekmek', 1, true], ['tereyağı', 30], ['domates', 150]],
    ['Yumurtaları 8 dakika haşlayın.', 'Ekmeği dilimleyin.', 'Domatesi dilimleyin.', 'Tereyağlı ekmekle yumurtaları servis edin.']),

  R('fr', 'breakfast', 'croissant-kahvalti', 'Croissant & Yoğurt Kasesi', 5, ['kahvalti', 'pratik'],
    [['croissant', 3], ['yoğurt', 300], ['bal', 30], ['muz', 1]],
    ['Croissantları ısıtın.', 'Yoğurt kasesine bal ekleyin.', 'Muzu dilimleyin.', 'Croissantlarla birlikte servis edin.']),

  /* ================= FRANSIZ — ÖĞLE ================= */
  R('fr', 'lunch', 'croque-monsieur', 'Croque Monsieur', 20, ['lunch', 'pratik'],
    [['ekmek', 1], ['schinken (jambon)', 150], ['kaşar peyniri', 150], ['tereyağı', 40], ['süt', 100]],
    ['Ekmek dilimlerinin bir yüzüne tereyağı sürün.', 'İçine jambon ve peynir koyup sandviç yapın.', 'Üstüne süt-peynir karışımı sürün.', '200 °C fırında 10 dakika kızartın.', 'Salatayla servis edin.']),

  R('fr', 'lunch', 'salade-nicoise', 'Salade Niçoise', 25, ['lunch', 'balik', 'pratik'],
    [['ton balığı konserve', 2], ['yumurta', 3], ['domates', 250], ['taze fasulye', 250], ['zeytin', 60], ['marul', 150], ['zeytinyağı', 30]],
    ['Fasulyeleri ve yumurtaları haşlayın.', 'Marul ve domatesi tabağa dizin.', 'Ton balığı, zeytin, yumurta ve fasulyeleri ekleyin.', 'Zeytinyağı, tuz ve karabiberle sos yapın.', 'Oda sıcaklığında servis edin.']),

  R('fr', 'lunch', 'soupe-oignon', 'Soğan Çorbası', 50, ['lunch', 'corba', 'pratik'],
    [['soğan', 600], ['tereyağı', 40], ['ekmek', 1, true], ['kaşar peyniri', 100]],
    ['Soğanları ince dilimleyip tereyağında 30 dakika kısık ateşte karamelize edin.', '1 lt su (ya da et suyu) ekleyip 20 dakika kaynatın.', 'Kaselerin içine ekmek dilimleri koyun.', 'Çorbayı ekleyip üzerine bol kaşar rendeleyin.', 'Fırında peynir eriyene kadar kızartın.']),

  /* ================= FRANSIZ — TATLI ================= */
  R('fr', 'dessert', 'creme-brulee', 'Crème Brûlée', 45, ['dessert'],
    [['süt kreması', 500], ['yumurta', 4], ['şeker', 100], ['vanilya', 1]],
    ['Kremayı vanilya ile ısıtın (kaynatmadan).', 'Yumurta sarısı ve şekerle çırpın.', 'Kremayı yedirip kaselere süzün.', '90 °C fırında su banyosunda 30 dakika pişirin.', 'Soğuyunca üzerine şeker serpip yakarak servis edin.']),

  R('fr', 'dessert', 'clafoutis', 'Elma Clafoutis', 50, ['dessert', 'pratik'],
    [['elma', 500], ['yumurta', 3], ['süt', 300], ['un', 100], ['şeker', 120], ['tereyağı', 40]],
    ['Elmaları dilimleyip tereyağlı fırın kabına dizin.', 'Yumurta, süt, un ve şekeri çırpıp üzerine dökün.', '180 °C fırında 35 dakika pişirin.', 'Ilık olarak servis edin.', 'İsterseniz tarçın serpin.']),

  R('fr', 'dessert', 'mousse', 'Çikolatalı Mousse', 20, ['dessert', 'pratik'],
    [['bitter çikolata', 150], ['yumurta', 3], ['şeker', 40], ['süt kreması', 100]],
    ['Çikolatayı benmari usulü eritin.', 'Yumurta sarısı ve şekerle çırpın.', 'Çırpılmış kremayı ve yumurta akını yedirin.', 'Kaselere paylaştırın.', 'En az 2 saat buzdolabında dinlendirin.']),

  /* ================= ALMAN — AKŞAM ================= */
  R('de', 'dinner', 'schnitzel', 'Schnitzel & Pommes', 45, ['pratik'],
    [['tavuk göğsü', 600], ['un', 100], ['ekmek', 1], ['yumurta', 2], ['patates', 800], ['sıvı yağ', 80]],
    ['Tavuk göğüslerini inceltip un, yumurta ve ekmek kırıntısına bulayın.', 'Bol yağda iki tarafını altın rengi kızartın.', 'Patatesleri kibrit gibi kesip kızartın (ya da fırında).', 'Limon dilimiyle süsleyin.', 'İsterseniz patates püresiyle servis edin.']),

  R('de', 'dinner', 'bratwurst-puree', 'Bratwurst & Kartoffelpüree', 40, ['pratik'],
    [['bratwurst', 600], ['patates', 800], ['süt', 200], ['tereyağı', 50], ['hardal', 1]],
    ['Patatesleri haşlayıp süt ve tereyağıyla püre yapın.', 'Bratwurstları tavada kızartın.', 'Hardal ve turşu ile servis edin.', 'Püreyi tabağa alıp üstüne sosisleri koyun.', 'Sıcak servis edin.']),

  R('de', 'dinner', 'kaesespaetzle', 'Käsespätzle', 40, ['vejetaryen', 'pratik'],
    [['un', 400], ['yumurta', 4], ['kaşar peyniri', 300], ['soğan', 150], ['tereyağı', 40], ['tuz', 1]],
    ['Un, yumurta ve tuzla akışkan bir hamur yapın.', 'Kaynar tuzlu suya hamuru rendeleyip spätzle haşlayın (üzerine çıkınca alin).', 'Karamelize soğanı hazırlayın.', 'Spätzle, peynir ve soğanı katmanlayın.', 'Kızarmış soğanla servis edin.']),

  R('de', 'dinner', 'linseneintopf', 'Mercimek Yahnisi (Linseneintopf)', 60, ['baklagil', 'corba'],
    [['kırmızı mercimek', 300], ['soğan', 150], ['havuç', 150], ['kereviz', 100], ['bratwurst', 200], ['sıvı yağ', 25]],
    ['Soğan, havuç ve kerelezi yağda kavurun.', 'Mercimek ve 1,2 lt suyu ekleyip 25 dakika pişirin.', 'Sosis dilimlerini ekleyip 10 dakika daha kaynatın.', 'Sirke (varsa) ve tuzla tatlandırın.', 'Ekmekle servis edin.']),

  R('de', 'dinner', 'frikadellen', 'Frikadellen & Kartoffelsalat', 45, ['etli', 'pratik'],
    [['dana kıyma', 400], ['yumurta', 1], ['soğan', 100], ['ekmek', 1], ['patates', 700], ['yoğurt', 200], ['hardal', 1]],
    ['Kıyma, yumurta, rendelenmiş soğan ve ıslatılmış ekmekle köfte harcı yapın.', 'Köfteleri kızartın.', 'Patatesleri haşlayıp dilimleyin.', 'Yoğurt, hardal ve tuzla patates salatası hazırlayın.', 'Köftelerle birlikte servis edin.']),

  R('de', 'dinner', 'rouladen', 'Rouladen (Dana Rulo)', 90, ['etli'],
    [['kuşbaşı dana et', 600], ['schinken (jambon)', 100], ['soğan', 150], ['havuç', 150], ['tereyağı', 30], ['un', 20]],
    ['Et dilimlerini döşeyip içine jambon, soğan ve havuç koyup sarın.', 'Tereyağında mühürleyin.', 'Üzerini geçecek kadar su ekleyip kısık ateşte 1 saat pişirin.', 'Suyunu unla koyulaştırıp sos yapın.', 'Knödel ya da püre ile servis edin.']),

  R('de', 'dinner', 'bratkartoffeln', 'Bratkartoffeln & Sebzeli Yumurta', 30, ['pratik', 'vejetaryen'],
    [['patates', 700], ['biber', 200], ['kabak', 200], ['soğan', 100], ['yumurta', 4], ['sıvı yağ', 40]],
    ['Patatesleri önceden haşlayıp dilimleyin.', 'Tavada kızartın, soğanı ekleyin.', 'Sebzeleri ekleyip soteleyin.', 'Yumurtaları kırıp üstünü kapatın.', 'Taze ot ile servis edin.']),

  /* ================= ALMAN — MISAFİR ================= */
  R('de', 'dinner', 'sauerbraten', 'Sauerbraten & Knödel (Misafir)', 120, ['misafir', 'etli'],
    [['kuşbaşı dana et', 800], ['soğan', 200], ['havuç', 200], ['tereyağı', 50], ['un', 40], ['patates', 600]],
    ['Eti bir gece önceden sirke-su-soğan karışımında marine edin (ya da su-soğan).', 'Eti tereyağında mühürleyin, sebzeleri ekleyin.', 'Marinasyon suyunu ekleyip kısık ateşte 2 saat pişirin.', 'Sosu unla koyulaştırın.', 'Patates knödeli (haşlanmış patates + un + yumurta) ile servis edin.'], true),

  /* ================= ALMAN — KAHVALTI ================= */
  R('de', 'breakfast', 'broetchen', 'Brötchen, Butter & Marmelat', 10, ['kahvalti', 'pratik'],
    [['brötchen', 6], ['tereyağı', 60], ['marmelat', 100]],
    ['Brötchenleri ikiye kesin.', 'Tereyağı ve marmelatla süsleyin.', 'Dilimlenmiş peynir ve domates ekleyin.', 'Çay ya da kahveyle servis edin.']),

  R('de', 'breakfast', 'vollkorn', 'Vollkorn Brot & Peynir', 10, ['kahvalti', 'pratik'],
    [['ekmek', 1], ['kaşar peyniri', 150], ['salatalık', 150], ['domates', 150], ['tereyağı', 30]],
    ['Ekmeği dilimleyin.', 'Tereyağı sürüp peynir dilimleri koyun.', 'Salatalık ve domatesle süsleyin.', 'Çay ya da kahveyle servis edin.']),

  R('de', 'breakfast', 'eier-broetchen', 'Yumurtalı Brötchen', 15, ['kahvalti', 'pratik'],
    [['brötchen', 4], ['yumurta', 4], ['kaşar peyniri', 60], ['tereyağı', 30]],
    ['Yumurtaları haşlayıp dilimleyin.', 'Brötchenleri ikiye kesip içine tereyağı sürün.', 'Yumurta ve peynir dilimlerini koyun.', 'Tuz ve karabiber serpin.', 'Hemen servis edin.']),

  /* ================= ALMAN — ÖĞLE ================= */
  R('de', 'lunch', 'kartoffelsalat', 'Kartoffelsalat', 30, ['lunch', 'vegan', 'pratik'],
    [['patates', 800], ['soğan', 100], ['yoğurt', 200], ['sıvı yağ', 30], ['hardal', 1]],
    ['Patatesleri haşlayıp dilimleyin.', 'Soğanı ince kıyıp sıcak patateslere karıştırın.', 'Yoğurt, hardal, yağ ve tuzla sos yapın.', 'Patateslerle karıştırın.', 'Ilık olarak sosis ya da yeşillikle servis edin.']),

  R('de', 'lunch', 'belegte', 'Belegte Brötchen', 10, ['lunch', 'pratik'],
    [['brötchen', 4], ['kaşar peyniri', 100], ['salatalık', 150], ['domates', 150], ['tereyağı', 30]],
    ['Brötchenleri ikiye kesin.', 'Tereyağı sürüp peynir, salatalık ve domatesle doldurun.', 'İsterseniz hardal ekleyin.', 'Paket yapıp yanında alın.']),

  R('de', 'lunch', 'linsensuppe', 'Linsensuppe (Mercimek Çorbası Alman Usulü)', 45, ['lunch', 'corba', 'baklagil'],
    [['kırmızı mercimek', 250], ['soğan', 100], ['havuç', 100], ['kereviz', 80], ['sıvı yağ', 20], ['ekmek', 1, true]],
    ['Soğan ve sebzeleri kavurun.', 'Mercimek ve 1 lt suyu ekleyip 25 dakika pişirin.', 'Tuz, karabiber ve bir kaşık sirke ile tatlandırın.', 'İsterseniz blenderdan geçirin.', 'Ekmekle servis edin.']),

  /* ================= ALMAN — TATLI ================= */
  R('de', 'dessert', 'apfelstrudel', 'Apfelstrudel', 70, ['dessert'],
    [['elma', 600], ['un', 200], ['tereyağı', 100], ['şeker', 100], ['tarçın', 1], ['ceviz', 40]],
    ['Un, su ve az yağla elastik bir hamur yoğurup incecik açın.', 'Elma dilimleri, şeker, tarçın ve cevizle harç hazırlayın.', 'Hamura harcı koyup rulo yapın.', 'Tereyağı sürüp 180 °C fırında 40 dakika pişirin.', 'Pudra şekeri ve vanilyalı sosla servis edin.']),

  R('de', 'dessert', 'rote-gruetze', 'Rote Grütze & Vanilyalı Sos', 25, ['dessert', 'pratik'],
    [['karışık berry (donmuş)', 500], ['şeker', 100], ['süt kreması', 200], ['vanilya', 1]],
    ['Böğürtlenleri şekerle kısık ateşte 10 dakika pişirin.', 'Nişasta yerine 2 kaşık suyla ezilmiş bisküvi ile koyulaştırın.', 'Vanilyalı süt kreması sosu hazırlayın (kaynatmadan ısıtın).', 'Rote grütze kaselere paylaştırılıp soğutulur.', 'Üzerine vanilyalı sos dökerek servis edin.']),

  R('de', 'dessert', 'griessbrei', 'Grießbrei (İrmik Tatlısı)', 20, ['dessert', 'pratik'],
    [['grieß (irmik)', 150], ['süt', 800], ['şeker', 100], ['tereyağı', 30], ['tarçın', 1]],
    ['Sütü ısıtın.', 'İrmiği yavaş yavaş ekleyip karıştırarak 5 dakika pişirin.', 'Şeker ve tereyağını ekleyin.', 'Kaselere paylaştırın.', 'Tarçın ve şekerle servis edin.']),

  /* ================= YUNAN — AKŞAM ================= */
  R('gr', 'dinner', 'moussaka', 'Moussaka', 90, ['firin'],
    [['patlıcan', 700], ['dana kıyma', 400], ['patates', 400], ['soğan', 150], ['domates', 200], ['süt', 400], ['un', 40], ['tereyağı', 40], ['yumurta', 1]],
    ['Patlıcan ve patatesleri dilimleyip kızartın (ya da fırında önden pişirin).', 'Kıyma ve soğanı kavurup domatesle sos yapın.', 'Tereyağlı beşamel sosu hazırlayıp yumurta sarısını ekleyin.', 'Fırın kabına sebze ve et katmanlarını dizip üstüne beşamel dökün.', '180 °C fırında 40 dakika pişirip dilimleyerek servis edin.'], true),

  R('gr', 'dinner', 'gemista', 'Gemista (Biber Dolması)', 75, ['vegan', 'sebze'],
    [['biber', 800], ['pirinç', 200], ['soğan', 150], ['domates', 300], ['zeytinyağı', 60], ['maydanoz', 1]],
    ['Biberlerin başını kesip içini boşaltın.', 'Pirinç, soğan, domates ve yağla iç harcı hazırlayın.', 'Biberleri doldurup fırın kabına dik dizin.', 'Üzerine domates dilimleri ve su ekleyin.', '180 °C fırında 60 dakika pişirin.']),

  R('gr', 'dinner', 'souvlaki', 'Souvlaki & Tzatziki', 40, ['tavuk', 'pratik'],
    [['tavuk göğsü', 700], ['yoğurt', 300], ['salatalık', 200], ['sarımsak', 5], ['zeytinyağı', 30], ['limon', 1], ['ekmek', 1]],
    ['Tavuğu limon, zeytinyağı ve kekikle marine edin.', 'Şişlere dizip ızgarada ya da tavada pişirin.', 'Tzatziki için rendelenmiş salatalığı süzüp yoğurt ve sarımsakla karıştırın.', 'Ekmek (pita) ile birlikte servis edin.', 'Tzatziki ve domatesle süsleyin.']),

  R('gr', 'dinner', 'pastitsio', 'Pastitsio', 80, ['firin', 'makarna'],
    [['makarna', 350], ['dana kıyma', 400], ['domates', 300], ['süt', 400], ['un', 40], ['tereyağı', 40], ['kaşar peyniri', 150]],
    ['Makarnayı haşlayın.', 'Kıymalı sosu hazırlayın.', 'Beşamel sosu hazırlayın.', 'Fırın kabına makarna, et sosu, makarna, beşamel sırasıyla dizin.', 'Kaşar rendeleyip 180 °C fırında 40 dakika pişirin.']),

  R('gr', 'dinner', 'briam', 'Briam (Fırın Sebzeler)', 70, ['vegan', 'sebze'],
    [['patlıcan', 400], ['kabak', 400], ['patates', 400], ['biber', 200], ['domates', 300], ['zeytinyağı', 60], ['kekik', 1]],
    ['Sebzeleri dilimleyin.', 'Fırın kabına karıştırıp dizin.', 'Üzerine rendelenmiş domates, zeytinyağı ve kekik ekleyin.', '190 °C fırında 60 dakika pişirin.', 'Ilık olarak servis edin.']),

  R('gr', 'dinner', 'gigantes', 'Gigantes Plaki (Fırın Nohut)', 80, ['baklagil', 'vegan'],
    [['nohut', 400], ['domates', 400], ['soğan', 150], ['zeytinyağı', 60], ['maydanoz', 1]],
    ['Nohutları haşlayın.', 'Soğanı zeytinyağında kavurun.', 'Domates ve nohutları ekleyip tepsiye alın.', 'Üzerine maydanoz serpin.', '180 °C fırında 30 dakika pişirin.']),

  R('gr', 'dinner', 'psari-plaki', 'Psari Plaki (Fırın Balık)', 45, ['balik', 'pratik'],
    [['somon fileto', 550], ['patates', 400], ['domates', 300], ['soğan', 150], ['zeytinyağı', 40]],
    ['Patatesleri dilimleyip tepsiye yayın.', 'Üzerine balık filetolarını koyun.', 'Domates ve soğan dilimleriyle örtün.', 'Zeytinyağı gezdirip 190 °C fırında 35 dakika pişirin.', 'Limonla servis edin.']),

  /* ================= YUNAN — KAHVALTI ================= */
  R('gr', 'breakfast', 'yogurt-bal', 'Yunan Usulü Yoğurt & Bal', 5, ['kahvalti', 'pratik'],
    [['yoğurt', 500], ['bal', 60], ['ceviz', 40], ['ekmek', 1, true]],
    ['Yoğurdu kaselere paylaştırın.', 'Üzerine bal ve ceviz ekleyin.', 'Ekmekle servis edin.']),

  R('gr', 'breakfast', 'strapatsada', 'Strapatsada (Domatesli Yumurta)', 15, ['kahvalti', 'pratik'],
    [['yumurta', 5], ['domates', 250], ['zeytinyağı', 25], ['ekmek', 1, true]],
    ['Domatesleri rendeleyin.', 'Zeytinyağında 5 dakika pişirin.', 'Yumurtaları kırıp karıştırarak pişirin.', 'Tuz ve karabiber ekleyin.', 'Ekmekle servis edin.']),

  R('gr', 'breakfast', 'koulouri', 'Koulouri & Peynir', 5, ['kahvalti', 'pratik'],
    [['simit', 4], ['beyaz peynir', 150], ['zeytin', 60]],
    ['Simitleri (koulouri) ikiye bölün.', 'Peynir ve zeytinle servis edin.', 'Kahve ya da çay eşliğinde sunun.']),

  /* ================= YUNAN — ÖĞLE ================= */
  R('gr', 'lunch', 'horiatiki', 'Horiatiki (Yunan Salatası)', 15, ['lunch', 'vejetaryen', 'pratik'],
    [['domates', 400], ['salatalık', 200], ['biber', 150], ['beyaz peynir', 200], ['zeytin', 80], ['zeytinyağı', 40], ['ekmek', 1, true]],
    ['Domates, salatalık ve biberi iri doğrayın.', 'Üzerine peynir bloğu ve zeytinleri koyun.', 'Bol zeytinyağı ve tuz serpin.', 'Kekik serp.', 'Ekmekle servis edin.']),

  R('gr', 'lunch', 'souvlaki-durum', 'Souvlaki Dürüm', 30, ['lunch', 'tavuk', 'pratik'],
    [['tavuk göğsü', 400], ['ekmek', 1], ['yoğurt', 200], ['salatalık', 150], ['sarımsak', 3], ['domates', 150], ['patates', 300]],
    ['Tavuğu marine edip şişlerde pişirin.', 'Tzatziki hazırlayın (yoğurt + salatalık + sarımsak).', 'Patatesleri kızartın.', 'Ekmeklerin içine tavuk, tzatziki, domates ve patates koyup sarın.', 'Hemen servis edin.']),

  R('gr', 'lunch', 'fassolada', 'Fassolada (Fasulye Çorbası)', 60, ['lunch', 'corba', 'baklagil', 'vegan'],
    [['kuru fasulye', 250], ['havuç', 150], ['kereviz', 100], ['domates', 200], ['zeytinyağı', 40]],
    ['Fasulyeyi ıslatıp haşlayın.', 'Sebzeleri kavurun.', 'Fasulye, domates ve suyu ekleyip 40 dakika pişirin.', 'Zeytinyağını sonradan ekleyin.', 'Ekmekle servis edin.']),

  /* ================= YUNAN — TATLI ================= */
  R('gr', 'dessert', 'balli-yogurt', 'Ballı Cevizli Yoğurt', 5, ['dessert', 'pratik'],
    [['yoğurt', 500], ['bal', 80], ['ceviz', 60]],
    ['Yoğurdu kaselere paylaştırın.', 'Bal ve cevizle süsleyin.', 'Soğuk servis edin.']),

  R('gr', 'dessert', 'baklava', 'Baklava (Hazır) & Dondurma', 5, ['dessert', 'pratik'],
    [['baklava (hazır)', 300], ['ceviz', 30]],
    ['Baklavayı dilimleyin.', 'İsterseniz hafif ısıtın.', 'Cevizle süsleyin.', 'Yanına dondurma koyarak servis edin.']),

  R('gr', 'dessert', 'portakal-kek', 'Portakallı Kek', 55, ['dessert'],
    [['un', 200], ['şeker', 180], ['yumurta', 3], ['portakal', 2], ['sıvı yağ', 100]],
    ['Yumurta ve şekeri çırpın.', 'Portakal suyu ve rendesini ekleyin.', 'Unu ekleyip karıştırın.', 'Yağlanmış kalıpta 175 °C fırında 40 dakika pişirin.', 'Soğuyunca dilimleyin.']),

  /* ================= BESLENME ÇANTASI (okul/iş) — kişi başı 1 porsiyon ================= */
  /* Türk mutfağı */
  R('tr', 'lunchbox', 'lb-poğaca', 'Peynirli Poğaça + Ayran', 35, ['pratik'],
    [['un', 150], ['süt', 30], ['tereyağı', 20], ['yumurta', 1], ['beyaz peynir', 50], ['maya', 5]],
    ['Hamur malzemelerini karıştırıp 30 dk mayalandırın (akşamdan da yapılabilir).', 'Peynirli içle poğaçaları hazırlayıp 180 °C fırında 25 dk pişirin.', 'Yanına ayran ve meyve ekleyin.']),
  R('tr', 'lunchbox', 'lb-sandvic', 'Yumurtalı Sandviç + Domates', 15, ['pratik'],
    [['ekmek', 1], ['yumurta', 1], ['tereyağı', 10], ['domates', 1]],
    ['Yumurtayı katı pişirin, dilimleyin.', 'Ekmeğin arasına tereyağı sürüp yumurta ve domates dilimlerini yerleştirin.', 'Alüminyum folyo veya kilitli torba ile paketleyin.']),
  R('tr', 'lunchbox', 'lb-mercimek-termos', 'Mercimek Çorbası (Termos) + Ekmek', 40, ['corba', 'baklagil', 'vegan'],
    [['kırmızı mercimek', 60], ['soğan', 30], ['havuç', 50], ['tereyağı', 10], ['ekmek', 1]],
    ['Soğan ve havucu tereyağında kavurun, mercimeği ekleyin.', '1,5 su bardağı suyla 20 dk pişirip blendırlayın.', 'Termosa koyun, yanına ekmek alın.']),
  R('tr', 'lunchbox', 'lb-tost', 'Kaşarlı Tost + Elma', 15, ['pratik'],
    [['ekmek', 2], ['kaşar peyniri', 60], ['tereyağı', 15], ['elma', 1]],
    ['Ekmeğin arasına kaşar koyup tost makinesinde kızartın.', 'Soğuyunca paketleyin, yanına elma ekleyin.']),

  /* İtalyan */
  R('it', 'lunchbox', 'lb-panino', 'Panino con Mozzarella', 15, ['pratik'],
    [['ekmek', 1], ['mozzarella', 1], ['domates', 1], ['zeytinyağı', 10], ['maydanoz', 1]],
    ['Ekmeği yarıya kesin, içine mozzarella ve domates dilimlerini koyun.', 'Zeytinyağı ve maydanoz serpin.']),
  R('it', 'lunchbox', 'lb-frittata', 'Frittata Dilimi', 30, ['pratik', 'vejetaryen'],
    [['yumurta', 2], ['patates', 100], ['soğan', 30], ['sıvı yağ', 10], ['ekmek', 1]],
    ['Patatesi ince dilimleyip yağda yumuşayana kadar kızartın.', 'Çırpılmış yumurtayı döküp kapağın altında pişirin.', 'Soğuyunca dilimleyip ekmekle paketleyin.']),
  R('it', 'lunchbox', 'lb-pasta-fredda', 'Makarna Salatası (Pasta Fredda)', 25, ['pratik', 'makarna'],
    [['makarna', 100], ['ton balığı konserve', 1], ['domates', 1], ['zeytinyağı', 15]],
    ['Makarnayı haşlayıp soğutun.', 'Ton balığı, doğranmış domates ve zeytinyağı ile karıştırın.', 'Kapalı kapta buzdolabında taşıyın.']),

  /* Fransız */
  R('fr', 'lunchbox', 'lb-croissant', 'Croissant + Marmelat + Portakal', 10, ['pratik', 'kahvalti'],
    [['croissant', 1], ['marmelat', 50], ['portakal', 1]],
    ['Croissantı isterseniz sabah kısaca ısıtın.', 'Marmelat ve soyulmuş portakal dilimleriyle paketleyin.']),
  R('fr', 'lunchbox', 'lb-baguette', 'Jambonlu Baget', 10, ['pratik'],
    [['ekmek', 1], ['schinken (jambon)', 50], ['tereyağı', 15], ['hardal', 1]],
    ['Bageti yarıya kesip tereyağı ve hardal sürün.', 'Jambonu yerleştirip sarın.']),
  R('fr', 'lunchbox', 'lb-quiche', 'Quiche Lorraine Dilimi', 60, ['pratik', 'firin'],
    [['un', 100], ['tereyağı', 40], ['yumurta', 1], ['lor', 80], ['speck (domuz pastırması)', 25]],
    ['Un ve tereyağından hamur yapıp kalıba yayın (akşamdan hazırlanabilir).', 'Lor, yumurta ve kıymık domuz pastırmasını karıştırıp üzerine dökün.', '180 °C fırında 35 dk pişirin, dilimleyip paketleyin.']),

  /* Alman */
  R('de', 'lunchbox', 'lb-butterbrot', 'Butterbrot mit Bratwurst + Elma', 10, ['pratik'],
    [['brötchen', 1], ['tereyağı', 20], ['bratwurst', 1], ['elma', 1]],
    ['Bratwurstu önceden pişirip soğutun.', 'Brötchenin arasına tereyağı sürüp bratwurstu yerleştirin.', 'Yanına elma ekleyin.']),
  R('de', 'lunchbox', 'lb-brotzeit', 'Brotzeit (Käsebrötchen + Sebze)', 10, ['pratik', 'vejetaryen'],
    [['brötchen', 2], ['kaşar peyniri', 60], ['salatalık', 50], ['domates', 1]],
    ['Brötchenleri yarıya kesip peyniri koyun.', 'Salatalık ve domates dilimlerini ayrı kutuda taşıyın.']),
  R('de', 'lunchbox', 'lb-kartoffelsalat', 'Kartoffelsalat', 40, ['pratik'],
    [['patates', 200], ['soğan', 30], ['sıvı yağ', 15], ['hardal', 1], ['yumurta', 1]],
    ['Patatesi haşlayıp dilimleyin (akşamdan).', 'Soğan, hardal, yağ ve biraz patates suyu ile sos yapın.', 'Sert haşlanmış yumurta dilimiyle karıştırın.']),

  /* Yunan */
  R('gr', 'lunchbox', 'lb-pita', 'Pita + Tzatziki', 15, ['pratik'],
    [['ekmek', 1], ['yoğurt', 100], ['salatalık', 100], ['sarımsak', 5], ['zeytinyağı', 10]],
    ['Yoğurt, rendelenmiş salatalık, sarımsak ve zeytinyağıyla tzatziki yapın (akşamdan).', 'Pitayı ısıtıp içine koyun.']),
  R('gr', 'lunchbox', 'lb-horiatiki', 'Halk Salatası (Kutuda)', 15, ['pratik', 'vejetaryen'],
    [['domates', 1], ['salatalık', 100], ['beyaz peynir', 60], ['zeytin', 30], ['zeytinyağı', 15]],
    ['Domates, salatalık ve peyniri küp doğrayın.', 'Zeytin ve zeytinyağıyla karıştırıp sızdırmaz kutuya koyun.']),
  R('gr', 'lunchbox', 'lb-spanakopita', 'Spanakopita Dilimi', 50, ['pratik', 'firin'],
    [['un', 120], ['tereyağı', 40], ['ıspanak', 100], ['beyaz peynir', 60], ['yumurta', 1]],
    ['Un ve tereyağından hamur yapın.', 'Ispanak, peynir ve yumurta karışımını hamur arasına koyun.', '180 °C fırında 35 dk pişirin, dilimleyin.']),

  /* Evrensel (her mutfakta) */
  R('mix', 'lunchbox', 'lb-overnight-oats', 'Gece Yulafı (Overnight Oats)', 10, ['pratik', 'vegan'],
    [['yulaf', 60], ['süt', 200], ['elma', 1], ['tarçın', 1]],
    ['Akşam yulaf, süt ve tarçını kavanoza koyup buzdolabına koyun.', 'Sabah üzerine doğranmış elma ekleyin.']),
  R('mix', 'lunchbox', 'lb-yumurta-brötchen', 'Haşlanmış Yumurta + Brötchen + Muz', 10, ['pratik'],
    [['yumurta', 2], ['brötchen', 1], ['muz', 1]],
    ['Yumurtaları akşam sert haşlayın.', 'Kabuklu yumurta, brötchen ve muzla çantaya koyun.']),
];

/* ---------- Alerjen hesaplama ---------- */
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
/* Yan servis (opsiyonel) malzemeler alerjen elemesini tetiklemez */
function allergensOf(recipe) {
  const names = recipe.ingredients.filter((i) => !i[2]).map((i) => i[0]);
  const found = [];
  for (const [alg, keys] of ALLERGEN_MAP) {
    if (names.some((n) => keys.some((k) => nameMatchesKey(n, k)))) found.push(alg);
  }
  return found;
}

/* Alerjenleri hesapla */
for (const r of RECIPES) r.allergens = allergensOf(r);
