'use strict';
/* =========================================================
   i18n — Deutsch (UI, Zutaten, Küchen, Rezepte)
   Schlüssel = türkischer Originaltext
   ========================================================= */
window.I18N = window.I18N || {};
window.I18N.de = {
  ui: {
    'Mutfak Planı': 'Küchenplaner',
    'Haftalık yemek & alışveriş planlayıcı': 'Wochenplaner für Essen & Einkauf',
    'Ana menü': 'Hauptmenü',
    'Anasayfa': 'Startseite',
    'Haftalık Plan': 'Wochenplan',
    'Dolaptan Yemek': 'Aus dem Kühlschrank',
    'Özel Tarifler': 'Besondere Rezepte',
    'Bu hafta ne pişirsek?': 'Was kochen wir diese Woche?',
    'Hane halkınızı, mutfaklarınızı ve bütçenizi bir kez girin — haftalık menü, tarifler ve market fiyatlarıyla alışveriş listesi kendiliğinden oluşsun.': 'Geben Sie Haushalt, Küchen und Budget einmal ein — Wochenmenü, Rezepte und Einkaufsliste mit echten Supermarktpreisen entstehen automatisch.',
    'Bilgileri gir': 'Daten eingeben',
    'hane, mutfaklar, bütçe, elemeler': 'Haushalt, Küchen, Budget, Ausschlüsse',
    'Planı oluştur': 'Plan erstellen',
    'menüler + beslenme çantaları': 'Menüs + Brotboxen',
    'Alışverişe çık': 'Einkaufen gehen',
    'gerçek market fiyatlarıyla': 'mit echten Supermarktpreisen',
    '1 · Haneniz': '1 · Ihr Haushalt',
    'Yaş ve cinsiyet porsiyonları otomatik hesaplar. Sabah işe veya okula gidenler için günlük beslenme çantası önerilir; kahvaltı sadece evde kalanlara planlanır.': 'Alter und Geschlecht berechnen die Portionen automatisch. Für Berufstätige und Schüler gibt es tägliche Brotbox-Vorschläge; das Frühstück wird nur für die zu Hause geplant.',
    'Yaş': 'Alter',
    'Cinsiyet': 'Geschlecht',
    'Kadın': 'Weiblich',
    'Erkek': 'Männlich',
    'Sabah programı': 'Morgens',
    'Evde kahvaltı': 'Frühstück zu Hause',
    'İş — beslenme': 'Arbeit — Brotbox',
    'Okul — beslenme': 'Schule — Brotbox',
    'Kaldır': 'Entfernen',
    '+ Kişi ekle': '+ Person hinzufügen',
    'Hane toplamı': 'Haushalt gesamt',
    'porsiyon': 'Portionen',
    '2 · Hangi mutfaklar?': '2 · Welche Küchen?',
    'Birden fazla mutfak seçebilirsiniz — sabah Brötchen, akşam kavurmalı pilav olabilir. Seçmediğiniz mutfaklardan da haftada bir-iki sürpriz öneri gelir.': 'Sie können mehrere Küchen wählen — morgens Brötchen, abends Reis mit Fleisch. Aus nicht gewählten Küchen kommen ein- bis zweimal pro Woche Überraschungsvorschläge.',
    '3 · Beslenme tercihi': '3 · Ernährungspräferenz',
    'Hane genelinde geçerli tercihler. Sporcu ve diyet modları eleme yapmaz, seçimleri o yöne kaydırır.': 'Gilt für den ganzen Haushalt. Sportler- und Diätmodus schließen nichts aus, gewichten die Auswahl aber entsprechend.',
    'Beslenme şekli': 'Ernährungsform',
    'Hepçil': 'Allesesser',
    'Vejetaryen': 'Vegetarisch',
    'Vegan': 'Vegan',
    'Ek tercihler': 'Zusatzoptionen',
    'Helal (domuz ürünleri hariç)': 'Halal (ohne Schweineprodukte)',
    'Sporcu (protein ağırlıklı)': 'Sportler (proteinbetont)',
    'Diyet (hafif yemekler öncelikli)': 'Diät (leichte Gerichte bevorzugt)',
    '4 · Haftalık bütçe': '4 · Wochenbudget',
    'Kahvaltı ve akşam yemeği için tahmini toplam harcama aralığı (malzemeler dahil).': 'Geschätzter Ausgabenrahmen pro Woche für Frühstück und Abendessen (inkl. Zutaten).',
    'Alt sınır': 'Untergrenze',
    'Üst sınır': 'Obergrenze',
    'İpucu: 4 kişilik bir hanede kahvaltı + akşam yemeği için tipik aralık 60–110 € arasıdır. Plan, aralığın ortasına yakın bir maliyetle oluşturulur.': 'Tipp: Für einen 4-Personen-Haushalt liegt der typische Rahmen für Frühstück + Abendessen bei 60–110 €. Der Plan wird mit Kosten nahe der Bereichsmitte erstellt.',
    '5 · Neleri eleyelim?': '5 · Was ausschließen?',
    'Alerjiniz olan, asla yenmesini istemediğiniz veya hoşlanmadığınız her şeyi seçin.': 'Wählen Sie alles, worauf Sie allergisch reagieren, was nie auf den Tisch soll oder was Sie nicht mögen.',
    'Alerjenler ve büyük gruplar': 'Allergene und Hauptgruppen',
    'Sevilmeyen malzemeler': 'Ungeliebte Zutaten',
    'Serbest metin': 'Freitext',
    'Örn: kereviz, midye, kuzu eti…': 'z. B. Sellerie, Muscheln, Lamm…',
    'Virgülle ayırarak birden fazla malzeme yazabilirsiniz.': 'Mehrere Zutaten können Sie durch Kommas getrennt eingeben.',
    '6 · Mutlaka olsun': '6 · Unbedingt dabei',
    'Haftalık planda garanti edilmesini istediğiniz kuralları seçin. Misafir, öğle yemeği ve tatlı eklemeyi plan oluşturduktan sonra gün bazında yaparsınız.': 'Wählen Sie Regeln, die im Wochenplan garantiert sein sollen. Gäste, Mittagessen und Dessert fügen Sie nach dem Erstellen pro Tag hinzu.',
    'Belirli bir malzeme şartı': 'Bestimmte Zutat erforderlich',
    'Örn: mercimek, tavuk, ıspanak…': 'z. B. Linsen, Huhn, Spinat…',
    'Bu malzemeyi içeren en az 2 yemek plana alınır (mümkünse).': 'Mindestens 2 Gerichte mit dieser Zutat kommen in den Plan (wenn möglich).',
    'Haftalık Planı Oluştur': 'Wochenplan erstellen',
    'Haftalık planınız hazır': 'Ihr Wochenplan ist fertig',
    'kişi': 'Personen',
    'kişi için günlük beslenme çantası': 'tägliche Brotbox(en)',
    'haftalık tüketim maliyeti': 'wöchentliche Verbrauchskosten',
    'bütçe aralığınız': 'Ihr Budgetbereich',
    'tam paket alımlarıyla alışveriş sepeti': 'Einkaufskorb mit vollen Packungen',
    'Başka bir plan': 'Anderer Plan',
    'Ayarları değiştir': 'Einstellungen ändern',
    'Alışveriş Listesi': 'Einkaufsliste',
    'Market Karşılaştırma': 'Supermarkt-Vergleich',
    'Bütçe aralığı:': 'Budgetbereich:',
    'misafir, öğle ve tatlı eklemeleri dahil': 'inkl. Gäste-, Mittag- und Dessert-Extras',
    'Kahvaltı': 'Frühstück',
    'Beslenme (iş/okul)': 'Brotbox',
    'Akşam': 'Abendessen',
    'Öğle': 'Mittagessen',
    'Tatlı': 'Dessert',
    'misafirli': 'mit Gästen',
    '/porsiyon': '/Portion',
    '/kişi': '/Person',
    '+ Öğle': '+ Mittag',
    'Öğle kaldır': 'Mittag entfernen',
    '+ Tatlı': '+ Dessert',
    'Tatlı kaldır': 'Dessert entfernen',
    '+ Misafir': '+ Gäste',
    'Misafir artır': 'Mehr Gäste',
    'Misafir azalt': 'Weniger Gäste',
    'Misafir kaldır': 'Gäste entfernen',
    'dk': 'Min.',
    'ürün': 'Artikel',
    'tahmini': 'geschätzt',
    'gerçek': 'echt',
    'Open Prices topluluk verisi, ': 'Open Prices Community-Daten, ',
    'Market': 'Supermarkt',
    'Tahmini sepet': 'Geschätzter Warenkorb',
    'Gerçek fiyat': 'Echte Preise',
    'Fark': 'Unterschied',
    'En uygun': 'Günstigste',
    'Dolaptaki ürünlerle ne yapsak?': 'Was koche ich aus dem Kühlschrank?',
    'Elinizdeki malzemeleri girin; dolabınıza en uygun tarifleri eksik malzemeleriyle birlikte önereyim.': 'Geben Sie ein, was da ist — Sie erhalten die passendsten Rezepte inkl. fehlender Zutaten.',
    'Malzeme ekle': 'Zutat hinzufügen',
    'Yazmaya başlayın: domates, yumurta, pirinç…': 'Einfach tippen: Tomaten, Eier, Reis…',
    'Yemek Öner': 'Gericht vorschlagen',
    'Önce dolabınızdaki birkaç malzemeyi ekleyin.': 'Fügen Sie zuerst ein paar Zutaten aus Ihrem Kühlschrank hinzu.',
    'Dolabınıza göre': 'Vorschläge für Ihren Kühlschrank',
    'öneri': '',
    'Her şey dolapta': 'Alles im Kühlschrank',
    'Eksik:': 'Fehlt:',
    'malzeme': 'Zutaten',
    'Tarifi gör': 'Rezept ansehen',
    'Planın dışında, meraklısına tarifler: evde ekmek, suşi, el yapımı makarna ve dahası.': 'Rezepte abseits des Plans, für Neugierige: selbstgebackenes Brot, Sushi, handgemachte Pasta und mehr.',
    'Kapat': 'Schließen',
    'Akşam yemeği': 'Abendessen',
    'Öğle yemeği': 'Mittagessen',
    'Beslenme çantası': 'Brotbox',
    'Özel tarif': 'Besonderes Rezept',
    'Malzemeler (haneye göre ölçekli)': 'Zutaten (für den Haushalt skaliert)',
    'Malzemeler (kişi başı)': 'Zutaten (pro Person)',
    'Malzemeler': 'Zutaten',
    'Hazırlanışı': 'Zubereitung',
    'hane için:': 'für den Haushalt:',
    '(4 kişilik)': '(für 4 Personen)',
    'En az bir mutfak seçin.': 'Wählen Sie mindestens eine Küche.',
    'Geçerli bir bütçe aralığı girin (alt ≤ üst).': 'Geben Sie einen gültigen Budgetbereich ein (unten ≤ oben).',
    'En az bir kişi gerekli.': 'Mindestens eine Person ist erforderlich.',
    'Seçimlerinizle (mutfaklar + elemeler) 7 ayrı akşam yemeği kalmadı. Mutfak ekleyin veya bazı elemeleri kaldırın.': 'Mit Ihrer Auswahl (Küchen + Ausschlüsse) bleiben keine 7 verschiedenen Abendessen übrig. Fügen Sie Küchen hinzu oder entfernen Sie einige Ausschlüsse.',
    'Elemelerinizle uygun kahvaltı kalmadı. Lütfen bazı elemeleri kaldırın.': 'Mit Ihren Ausschlüssen bleibt kein Frühstück übrig. Bitte entfernen Sie einige Ausschlüsse.',
    'Seçimlerinizle uygun beslenme çantası önerisi kalmadı. Lütfen bazı elemeleri kaldırın.': 'Mit Ihrer Auswahl bleibt kein Brotbox-Vorschlag übrig. Bitte entfernen Sie einige Ausschlüsse.',
    'Yeni bir plan oluşturuldu.': 'Ein neuer Plan wurde erstellt.',
    'Not: Seçimlerinizle tüm şartlar aynı anda karşılanamadı; en yakın plan oluşturuldu.': 'Hinweis: Mit Ihrer Auswahl konnten nicht alle Regeln gleichzeitig erfüllt werden; der nächstliegende Plan wurde erstellt.',
    'Seçimlerinizle uygun öğle yemeği kalmadı (eleme çok kısıtlayıcı).': 'Mit Ihrer Auswahl bleibt kein Mittagessen übrig (Ausschlüsse zu streng).',
    'Seçimlerinizle uygun tatlı kalmadı.': 'Mit Ihrer Auswahl bleibt kein Dessert übrig.',
    'Bu malzemelerle uygun bir tarif bulunamadı. Birkaç malzeme daha eklemeyi deneyin.': 'Dazu wurde kein passendes Rezept gefunden. Versuchen Sie, weitere Zutaten hinzuzufügen.',
    'Vegan seçim: tüm tarifler bitkisel.': 'Vegan-Auswahl: alle Rezepte rein pflanzlich.',
    'Vejetaryen seçim: et ve balık içeren tarifler çıkarıldı.': 'Vegetarische Auswahl: Gerichte mit Fleisch und Fisch wurden entfernt.',
    'Helal seçim: domuz ürünleri (jambon, speck, bratwurst) içeren tarifler çıkarıldı.': 'Halal-Auswahl: Rezepte mit Schweineprodukten (Schinken, Speck, Bratwurst) wurden entfernt.',
    'Seçili mutfakta yeterli uygun tarif olmadığı için tüm mutfaklardan seçim yapıldı.': 'In den gewählten Küchen gab es nicht genug passende Rezepte — es wurde aus allen Küchen gewählt.',
    'yetişkin kadın = 1,0': 'erwachsene Frau = 1,0',
    'yetişkin erkek = 1,15': 'erwachsener Mann = 1,15',
    'çocuklar yaşa göre daha az': 'Kinder je nach Alter weniger',
    'Malzeme miktarları buna göre otomatik ölçeklenir.': 'Zutatenmengen werden automatisch entsprechend skaliert.',
  },
  ing: {
    'kırmızı mercimek': 'rote Linsen', 'nohut': 'Kichererbsen', 'kuru fasulye': 'weiße Bohnen',
    'bulgur': 'Bulgur', 'pirinç': 'Reis', 'makarna': 'Nudeln', 'erişte': 'Eiernudeln',
    'un': 'Mehl', 'yulaf': 'Haferflocken', 'tereyağı': 'Butter', 'sıvı yağ': 'Pflanzenöl',
    'zeytinyağı': 'Olivenöl', 'soğan': 'Zwiebeln', 'sarımsak': 'Knoblauch', 'domates': 'Tomaten',
    'domates salçası': 'Tomatenmark', 'biber salçası': 'Paprikamark', 'dana kıyma': 'Rinderhack',
    'kuşbaşı dana et': 'Rindfleischwürfel', 'tavuk göğsü': 'Hähnchenbrust', 'tavuk but': 'Hähnchenkeulen',
    'patlıcan': 'Auberginen', 'kabak': 'Zucchini', 'biber': 'Paprika', 'havuç': 'Karotten',
    'patates': 'Kartoffeln', 'ıspanak': 'Spinat', 'pırasa': 'Porree', 'karnabahar': 'Blumenkohl',
    'dondurulmuş bezelye': 'TK-Erbsen', 'taze fasulye': 'grüne Bohnen', 'mantar': 'Champignons',
    'brokoli': 'Brokkoli', 'salatalık': 'Gurken', 'marul': 'Salat', 'süt': 'Milch', 'yoğurt': 'Joghurt',
    'lor': 'Quark', 'beyaz peynir': 'Weißkäse (Feta)', 'kaşar peyniri': 'Schnittkäse', 'yumurta': 'Eier',
    'zeytin': 'Oliven', 'simit': 'Simit', 'ekmek': 'Brot', 'tahin': 'Tahini', 'pekmez': 'Pekmez',
    'bal': 'Honig', 'muz': 'Bananen', 'somon fileto': 'Lachsfilet', 'ton balığı konserve': 'Dosen-Thunfisch',
    'limon': 'Zitronen', 'nane': 'Minze', 'maydanoz': 'Petersilie', 'dereotu': 'Dill',
    'kimyon': 'Kreuzkümmel', 'karabiber': 'schwarzer Pfeffer', 'tuz': 'Salz', 'pul biber': 'Chiliflocken',
    'kekik': 'Oregano', 'şeker': 'Zucker', 'ceviz': 'Walnüsse', 'bitter çikolata': 'dunkle Schokolade',
    'kakao': 'Kakao', 'mascarpone': 'Mascarpone', 'bisküvi': 'Kekse', 'vanilya': 'Vanille',
    'süt kreması': 'Sahne', 'elma': 'Äpfel', 'tarçın': 'Zimt', 'portakal': 'Orangen',
    'lahana': 'Weißkohl', 'kereviz': 'Sellerie', 'soya sosu': 'Sojasauce', 'nori': 'Nori',
    'avokado': 'Avocados', 'tortilla': 'Tortillas', 'köri': 'Currypulver', 'zerdeçal': 'Kurkuma',
    'schinken (jambon)': 'Schinken', 'bratwurst': 'Bratwurst', 'speck (domuz pastırması)': 'Speck',
    'grieß (irmik)': 'Grieß', 'marmelat': 'Marmelade', 'brötchen': 'Brötchen', 'croissant': 'Croissants',
    'parmesan': 'Parmesan', 'mozzarella': 'Mozzarella', 'lahmacun': 'Lahmacun',
    'baklava (hazır)': 'Baklava (fertig)', 'karışık berry (donmuş)': 'gemischte Beeren (TK)',
    'kahve': 'Kaffee', 'maya': 'Hefe', 'hardal': 'Senf',
  },
  cuisines: {
    tr: ['Türkische Küche', 'Suppen, Hülsenfrüchte, Gemüse, Reis'],
    it: ['Italienische Küche', 'Pasta, Pizza, Risotto'],
    fr: ['Französische Küche', 'Gratin, Quiche, Schmorgerichte'],
    de: ['Deutsche Küche', 'Schnitzel, Bratwurst, Spätzle'],
    gr: ['Griechische Küche', 'Moussaka, Dolmades, Mezze'],
    cn: ['Chinesische Küche', 'Wok, Nudeln, Stir-Fry'],
    in: ['Indische Küche', 'Curry, Dal, Gewürze'],
    mx: ['Mexikanische Küche', 'Tacos, Burritos, Guacamole'],
    jp: ['Japanische Küche', 'Teriyaki, Ramen, Donburi'],
    mix: ['Internationale Küche', 'Aus allen Küchen gemischt'],
  },
  days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
  months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  tags: {
    vegan: 'Vegan', vejetaryen: 'Vegetarisch', balik: 'Fisch', pratik: 'Schnell', corba: 'Suppe',
    baklagil: 'Hülsenfrüchte', tahil: 'Reis/Bulgur', makarna: 'Nudeln', etli: 'Mit Fleisch',
    tavuk: 'Huhn', sebze: 'Gemüse', misafir: 'Gäste', firin: 'Ofen', ozel: 'Speziell',
  },
  units: { g: 'g', adet: 'Stk.', tutam: 'Prise(n)', tk: 'TL' },
  meals: {
    dinner: 'Abendessen', breakfast: 'Frühstück', lunch: 'Mittagessen',
    dessert: 'Dessert', lunchbox: 'Brotbox', special: 'Besonderes Rezept',
  },
  allergens: {
    'Gluten / Buğday': 'Gluten / Weizen', 'Süt / Laktoz': 'Milch / Laktose', 'Yumurta': 'Ei',
    'Susam': 'Sesam', 'Kuruyemiş': 'Nüsse', 'Balık': 'Fisch', 'Kırmızı Et': 'Rotes Fleisch',
    'Tavuk': 'Huhn', 'Domuz': 'Schwein',
  },
  mustRules: {
    baklagil2: 'Mindestens 2 Hülsenfruchtgerichte pro Woche',
    balik1: 'Mindestens 1 Fischgericht pro Woche',
    corba1: 'Mindestens 1 Suppe pro Woche',
    tavuk2: 'Mindestens 2 Hühngerichte pro Woche',
    sebze3: 'Gemüselastig (mind. 3 Gemüsegerichte)',
    tahil2: 'Mindestens 2× Reis / Bulgur pro Woche',
    etli2: 'Mindestens 2 Gerichte mit rotem Fleisch',
  },
  recipes: {},
};
(function (R) {
  /* Türkische Küche */
  R['mercimek-corba'] = { name: 'Rote Linsensuppe + Brot', steps: ['Linsen waschen. Zwiebel, Karotte und Kartoffeln würfeln.', 'Gemüse im Öl 3-4 Minuten anschwitzen, Tomatenmark mitrösten.', 'Linsen und 1,2 l Wasser zugeben und 30 Minuten bei schwacher Hitze kochen.', 'Mit dem Stabmixer glatt pürieren, mit Butter und Kreuzkümmel abschmecken.', 'Mit geröstetem Brot und getrockneter Minze servieren.'] };
  R['kuru-fasulye'] = { name: 'Weiße Bohnen + Reis', steps: ['Bohnen über Nacht einweichen (oder 1 Stunde vorkochen).', 'Zwiebel im Öl anbraten, Tomatenmark zugeben.', 'Bohnen und 4 Tassen Wasser zugeben und weich kochen.', 'In einem zweiten Topf Reis in Butter anrösten und im Verhältnis 1:1,5 mit Wasser garen.', 'Bohnen über dem Reis servieren.'] };
  R['nohut-yemegi'] = { name: 'Kichererbsengericht + Bulgur', steps: ['Kichererbsen über Nacht einweichen und weich kochen.', 'Zwiebel anbraten, beide Pasten zugeben.', 'Kichererbsen mit Flüssigkeit zugeben und 20 Minuten köcheln lassen.', 'Bulgur wie Reis im Verhältnis 1:1,5 garen.', 'Heiß zum Bulgur servieren.'] };
  R['etli-taze-fasulye'] = { name: 'Grüne Bohnen mit Fleisch + Reis', steps: ['Rindfleischwürfel bei starker Hitze scharf anbraten.', 'Zwiebel zugeben und mitrösten, Tomatenmark einrühren.', 'Geputzte Bohnen zugeben und 3 Minuten mitdünsten.', 'Mit heißem Wasser bedecken und 40 Minuten bei schwacher Hitze schmoren.', 'Mit Reis servieren.'] };
  R['karniyarik'] = { name: 'Karnıyarık (gefüllte Aubergine) + Reis', steps: ['Auberginen streifig schälen und 15 Minuten in Salzwasser legen.', 'In wenig Öl auf beiden Seiten leicht anbraten (oder 20 Minuten im Ofen vorgaren).', 'In einer separaten Pfanne Hack und Zwiebel anbraten, mit Tomatenmark, Tomaten und Paprika die Füllung zubereiten.', 'Auberginen der Länge nach einschneiden und füllen.', 'Wenig Wasser zugeben und bei 180 °C 25 Minuten im Ofen garen. Mit Reis servieren.'] };
  R['tavuk-sote'] = { name: 'Hähnchengeschnetzeltes mit Gemüse', steps: ['Hähnchen in Würfel schneiden und mit Salz und Pfeffer marinieren.', 'Hähnchen bei starker Hitze anbraten und beiseitestellen.', 'Im selben Topf Zwiebel, Paprika und Champignons andünsten.', 'Hähnchen zurückgeben und mit gewürfelten Tomaten 10 Minuten kochen.', 'Mit Reis servieren.'] };
  R['firin-tavuk'] = { name: 'Hähnchenkeulen aus dem Ofen + Kartoffeln', steps: ['Keulen mit Oregano, Salz und Öl vermengen.', 'Kartoffeln grob zerkleinern und aufs Blech legen.', 'Hähnchen auf die Kartoffeln legen.', 'Bei 200 °C 60 Minuten garen (zwischendurch wenden).', 'Sofort nach dem Ofen servieren.'] };
  R['bolonez-tr'] = { name: 'Spaghetti Bolognese', steps: ['Nudeln bissfest kochen.', 'Zwiebel und geriebene Karotte im Öl anbraten.', 'Hack zugeben und braten, bis es die Farbe wechselt.', 'Gewürfelte Tomaten und Tomatenmark zugeben und 15 Minuten köcheln lassen.', 'Sauce mit den Nudeln vermengen und servieren.'] };
  R['mucver'] = { name: 'Zucchinipuffer + Joghurtsauce', steps: ['Zucchini reiben und gut ausdrücken.', 'Mit Ei, Mehl, Käse und Dill vermengen.', 'Einen dickflüssigen Teig anrühren.', 'Löffelweise im Öl ausbacken (oder mit wenig Öl in der Pfanne).', 'Mit Knoblauchjoghurt servieren.'] };
  R['ispanak'] = { name: 'Spinatgericht + Reis', steps: ['Spinat waschen und grob schneiden.', 'Zwiebel anbraten, Tomatenmark zugeben.', 'Spinat zugeben und zusammenfallen lassen.', 'Wenig Wasser zugeben und 15 Minuten kochen.', 'Mit Reis servieren.'] };
  R['mercimek-koftesi'] = { name: 'Linsenbällchen + Salat', steps: ['Linsen in 2 Tassen Wasser kochen.', 'Gekochte Linsen mit Bulgur vermengen und 15 Minuten ziehen lassen.', 'Geröstete Zwiebel, Tomatenmark und Gewürze einkneten.', 'Mit nassen Händen zu Bällchen formen.', 'Mit Salat, Zitrone und Petersilie servieren.'] };
  R['somon-firin'] = { name: 'Lachs aus dem Ofen + Brokkoli', steps: ['Lachs mit Olivenöl, Oregano und Zitrone marinieren.', 'Brokkoli und Kartoffelscheiben aufs Blech geben.', 'Bei 200 °C 20-25 Minuten garen.', 'Fisch auf das Gemüse legen und weitere 10 Minuten garen.', 'Mit Zitronenscheiben servieren.'] };
  R['tonlu-makarna'] = { name: 'Thunfischnudeln', steps: ['Nudeln bissfest kochen.', 'Zwiebel in Olivenöl glasig dünsten.', 'Tomaten zugeben und 5 Minuten kochen.', 'Abgetropften Thunfisch und Nudeln zugeben und vermengen.', 'Mit Zitrone und Petersilie servieren.'] };
  R['tavuklu-eriste'] = { name: 'Eiernudeln mit Hähnchen und Gemüse', steps: ['Hähnchen in feine Streifen schneiden und scharf anbraten.', 'Gemüse in Streifen schneiden und andünsten.', 'Nudeln separat kochen.', 'Alles in der Pfanne vermengen und 3-4 Minuten wenden.', 'Mit Pfeffer abschmecken und servieren.'] };
  R['etli-karnabahar'] = { name: 'Blumenkohlgericht mit Fleisch', steps: ['Rindfleischwürfel anbraten, mit Zwiebel rösten.', 'Tomatenmark zugeben und mitrösten, bis es duftet.', 'Blumenkohlröschen zugeben.', 'Mit heißem Wasser bedecken und 35 Minuten kochen.', 'Heiß mit Reis servieren.'] };
  R['etli-bezelye'] = { name: 'Erbsengericht mit Fleisch', steps: ['Rindfleischwürfel anbraten und mit Zwiebel rösten.', 'Tomatenmark zugeben, Karottenscheiben einlegen.', 'Erbsen und heißes Wasser zugeben und 30 Minuten kochen.', 'Mit Salz abschmecken.', 'Mit Reis servieren.'] };
  R['lahana-sarma'] = { name: 'Kohlrouladen mit Fleisch', steps: ['Kohl kochen und Blätter ablösen.', 'Füllung aus Hack, Reis, Zwiebel und Tomatenmark anrühren.', 'Füllung in die Blätter rollen und dicht in den Topf legen.', 'Wasser zugeben, mit Gewicht beschweren und 50 Minuten kochen.', 'Mit Zitrone servieren.'] };
  R['tavuk-sis'] = { name: 'Hähnchenspieße + Buttreis (Gäste)', steps: ['Hähnchen würfeln und 2 Stunden in Joghurt, Tomatenmark und Gewürzen marinieren.', 'Auf Spieße stecken und bei starker Hitze oder auf dem Grill garen.', 'Reis mit Butter zubereiten.', 'Spieße auf den Reis legen und Butter darüber träufeln.', 'Mit Zitrone und Chiliflocken servieren.'] };
  R['kahvalti-klasik'] = { name: 'Klassisches türkisches Frühstück', steps: ['Tomaten und Gurken in Scheiben schneiden.', 'Käse und Oliven auf den Teller geben.', 'Brot aufschneiden.', 'Honig und Butter servieren.', 'Dazu Tee reichen.'] };
  R['menemen'] = { name: 'Menemen (Rührei mit Tomaten)', steps: ['Paprika in Butter anschwitzen.', 'Geriebene Tomaten zugeben und einkochen lassen.', 'Hitze reduzieren, verquirlte Eier zugeben.', 'Unter Rühren leicht stocken lassen.', 'Mit frischem Brot servieren.'] };
  R['haslanmis-yumurta'] = { name: 'Gekochte Eier + Käse', steps: ['Eier 8 Minuten kochen.', 'Gemüse in Scheiben schneiden.', 'Käse und Oliven auf den Teller geben.', 'Brot aufschneiden und servieren.'] };
  R['yulaf'] = { name: 'Haferbrei', steps: ['Haferflocken 5 Minuten in Milch kochen.', 'In eine Schüssel geben.', 'Honig darüber geben.', 'Mit Bananenscheiben garnieren.'] };
  R['tahin-pekmez'] = { name: 'Tahini-Pekmez + Brot', steps: ['Tahini und Pekmez verrühren.', 'Brot aufschneiden.', 'Die Mischung aufs Brot streichen und servieren.'] };
  R['simit-lor'] = { name: 'Simit + Quark + Tee', steps: ['Simits halbieren.', 'Quark auf die Hälften streichen.', 'Mit Oliven und Tomaten servieren.'] };
  R['lorlu-tost'] = { name: 'Quark-Honig-Toast', steps: ['Quark und Honig verrühren.', 'Die Mischung zwischen Brotscheiben streichen.', 'In der gebutterten Pfanne von beiden Seiten goldbraun backen.', 'Heiß servieren.'] };
  R['lahmacun-oglen'] = { name: 'Lahmacun + Ayran', steps: ['Lahmacun im Ofen oder in der Pfanne erwärmen.', 'Salat, Tomaten und Petersilie schneiden.', 'Gemüse einrollen und mit Zitrone servieren.', 'Joghurt verrühren und als Ayran reichen.'] };
  R['sebze-corba-oglen'] = { name: 'Gemüsesuppe + Brot', steps: ['Gemüse würfeln.', '3 Minuten in Butter andünsten.', 'Mit Wasser bedecken und 25 Minuten kochen.', 'Mit dem Stabmixer glatt pürieren.', 'Mit Brot servieren.'] };
  R['tonlu-sandvic'] = { name: 'Thunfischsandwich', steps: ['Thunfisch abtropfen und mit Olivenöl und Zitrone vermengen.', 'Brot aufschneiden.', 'Thunfisch mit Salat und Tomaten ins Brot geben.', 'Sofort servieren.'] };
  R['kisir-oglen'] = { name: 'Kısır (Bulgursalat) + Tee', steps: ['Bulgur mit heißem Wasser bedecken und 20 Minuten quellen lassen.', 'Pasten, geriebene Zwiebel und Öl zugeben.', 'Mit Zitronensaft und feiner Petersilie verkneten.', 'Mit Salz und Chiliflocken abschmecken.', 'In Salatblätter gerollt servieren.'] };
  R['sutlac'] = { name: 'Milchreis aus dem Ofen', steps: ['Reis in 2 Tassen Wasser kochen.', 'Milch und Zucker zugeben und 15 Minuten unter Rühren köcheln lassen.', 'Vanille einrühren, auf Schälchen verteilen.', 'Bei 180 °C 15 Minuten backen, bis die Oberfläche leicht bräunt.', 'Abgekühlt 2 Stunden im Kühlschrank ruhen lassen.'] };
  R['kabak-tatli'] = { name: 'Zucchinidessert', steps: ['Zucchini schälen und grob würfeln.', 'In den Topf legen und mit Zucker bestreuen.', 'Bei schwacher Hitze 30-40 Minuten kochen, bis die Flüssigkeit eindickt.', 'Mit Walnüssen und Zimt garnieren.', 'Kalt oder lauwarm servieren.'] };
  R['revani'] = { name: 'Revani (Grießkuchen)', steps: ['Eier und Zucker schaumig schlagen, Joghurt und Öl zugeben.', 'Mehl einrühren und einen flüssigen Teig anrühren.', 'In der gefetteten Form bei 180 °C 30 Minuten backen.', 'Den heißen Zitronensirup über den Kuchen gießen.', 'Abgekühlt in Stücke schneiden und servieren.'] };
})(window.I18N.de.recipes);
(function (R) {
  /* Italienische Küche */
  R['pomodoro'] = { name: 'Spaghetti al Pomodoro', steps: ['Nudeln in Salzwasser bissfest kochen.', 'Knoblauch im Olivenöl leicht anschwitzen.', 'Gewürfelte Tomaten und Tomatenmark zugeben und 10 Minuten kochen.', 'Sauce mit den Nudeln vermengen.', 'Mit geriebenem Parmesan servieren.'] };
  R['arrabbiata'] = { name: 'Penne Arrabbiata', steps: ['Nudeln kochen.', 'Knoblauch und Chiliflocken im Olivenöl anbraten.', 'Tomaten zugeben und 10 Minuten kochen.', 'Sauce mit den Nudeln vermengen.', 'Mit frischem Basilikum (falls vorhanden) servieren.'] };
  R['carbonara'] = { name: 'Spaghetti Carbonara', steps: ['Nudeln kochen, eine Tasse Nudelwasser beiseitestellen.', 'Speckwürfel anbraten.', 'Ei und geriebenen Käse verquirlen.', 'Heiße Nudeln vom Herd in die Eimischung schnell einrühren.', 'Mit Nudelwasser cremig rühren, mit reichlich Pfeffer servieren.'] };
  R['risotto-funghi'] = { name: 'Pilzrisotto', steps: ['Zwiebel im Öl anschwitzen, Reis zugeben und 2 Minuten mitrösten.', 'Unter ständigem Rühren nach und nach heißes Wasser zugeben, 18 Minuten garen.', 'Separat gebratene Pilze unterheben.', 'Mit Butter und Parmesan cremig rühren.', 'Mit Salz und Pfeffer servieren.'] };
  R['pizza-margherita'] = { name: 'Selbstgemachte Pizza Margherita', steps: ['Aus Mehl, Hefe, Salz und lauwarmem Wasser einen Teig kneten und 1 Stunde gehen lassen.', 'Tomaten zu einer Sauce zerdrücken, Salz und Olivenöl zugeben.', 'Teig ausrollen, Sauce und Mozzarella auflegen.', 'Bei 250 °C (Maximum) 8-10 Minuten backen.', 'Mit frischem Basilikum servieren.'] };
  R['cacciatore'] = { name: 'Hähnchen Cacciatore', steps: ['Hähnchenkeulen im Olivenöl goldbraun braten.', 'Zwiebel, Paprika und Champignons in derselben Pfanne andünsten.', 'Tomaten und Oregano zugeben.', 'Hähnchen zurückgeben und 40 Minuten schmoren.', 'Nach Belieben mit Polenta oder Brot servieren.'] };
  R['pollo-forno'] = { name: 'Hähnchen & Kartoffeln aus dem Ofen (italienisch)', steps: ['Hähnchen mit Öl, Oregano und Salz vermengen.', 'Kartoffeln und Paprika aufs Blech geben, Hähnchen darauflegen.', 'Bei 190 °C 60 Minuten garen.', 'Zwischendurch mit einem Löffel Bratfett beschichten.', 'Heiß servieren.'] };
  R['aglio-olio'] = { name: 'Spaghetti Aglio e Olio', steps: ['Nudeln bissfest kochen.', 'Dünn aufgeschnittenen Knoblauch bei schwacher Hitze im Öl gold ziehen lassen.', 'Chiliflocken zugeben.', 'Nudeln in die Pfanne geben und mit einer Tasse Nudelwasser verrühren.', 'Sofort servieren.'] };
  R['lazanya'] = { name: 'Selbstgemachte Lasagne (Gäste)', steps: ['Hack und Zwiebel anbraten und mit Tomaten zur Fleischsauce kochen.', 'Mehl in Butter anschwitzen, Milch zugeben: Béchamelsauce.', 'Abwechselnd Sauce, Nudeln und Béchamel in die Form schichten.', 'Oben Käse reiben.', 'Bei 180 °C 40 Minuten backen, 10 Minuten ruhen lassen und servieren.'] };
  R['cornetto'] = { name: 'Cornetto & Cappuccino für zu Hause', steps: ['Croissants im Ofen oder in der Pfanne erwärmen.', 'Marmelade dazulegen.', 'Aus der halben Milch Cappuccino zubereiten (Espresso + aufgeschäumte Milch).', 'Mit der restlichen Milch Milchkaffee oder warme Milch servieren.'] };
  R['frittata'] = { name: 'Italienische Frittata', steps: ['Kartoffeln in dünne Scheiben schneiden und im Öl weich braten.', 'Verquirlte Eier und Parmesan zugeben.', 'Bei schwacher Hitze stocken lassen.', 'Nach Belieben wenden oder 5 Minuten im Ofen fertig garen.', 'In Stücke schneiden und servieren.'] };
  R['pane-burro'] = { name: 'Brot, Butter & Marmelade', steps: ['Brot aufschneiden und toasten.', 'Butter und Marmelade bestreichen.', 'Dazu Kaffee servieren.'] };
  R['caprese'] = { name: 'Insalata Caprese', steps: ['Tomaten und Mozzarella in Scheiben schneiden.', 'Auf dem Teller anrichten.', 'Olivenöl und Oregano darüberträufeln.', 'Mit Salz abschmecken.', 'Mit Brot servieren.'] };
  R['panino'] = { name: 'Panino al Formaggio', steps: ['Brötchen halbieren.', 'Mozzarella und Tomatenscheiben einlegen.', 'Im Sandwichmaker oder in der Pfanne erwärmen.', 'Mit Olivenöl beträufeln und servieren.'] };
  R['minestrone'] = { name: 'Minestrone', steps: ['Gemüse würfeln und im Öl andünsten.', 'Tomaten und 1,5 l Wasser zugeben und 20 Minuten kochen.', 'Nudeln und Blumenkohl zugeben und weitere 10 Minuten garen.', 'Mit Salz und Pfeffer abschmecken.', 'Mit geriebenem Parmesan servieren.'] };
  R['tiramisu'] = { name: 'Tiramisu', steps: ['Eigelb und Zucker schaumig schlagen, Mascarpone unterrühren.', 'Separat geschlagenes Eiweiß unterheben.', 'Kekse in Kaffee tauchen und eine Lage einlegen.', 'Creme daraufstreichen und die Schichtung wiederholen.', 'Mindestens 3 Stunden kühlen, mit Kakao bestreuen und servieren.'] };
  R['panna-cotta'] = { name: 'Panna Cotta', steps: ['Sahne und Zucker bei schwacher Hitze erwärmen und den Zucker auflösen (nicht kochen).', 'Vanille zugeben.', 'Auf Schälchen verteilen und 4 Stunden im Kühlschrank fest werden lassen.', 'Nach Belieben mit Fruchtsauce toppen.', 'Kalt servieren.'] };
  R['cioccolato-kup'] = { name: 'Schokobecher mit Keksen', steps: ['Schokolade über dem Wasserbad schmelzen.', 'Sahne schlagen und mit der Schokolade vermengen.', 'Zerbröselte Kekse in die Becher geben.', 'Schokocreme darübergeben.', '1 Stunde kühlen und servieren.'] };
  /* Französische Küche */
  R['ratatouille'] = { name: 'Ratatouille', steps: ['Gemüse grob würfeln.', 'Zwiebel im Olivenöl anbraten.', 'Nacheinander Aubergine, Paprika und Zucchini zugeben und andünsten.', 'Tomaten und Oregano zugeben und 30 Minuten bei schwacher Hitze schmoren.', 'Mit Brot oder Reis servieren.'] };
  R['coq-au-vin'] = { name: 'Coq au Vin (vereinfacht)', steps: ['Hähnchen in Butter anbraten.', 'Zwiebel, Karotten und Champignons zugeben und andünsten.', 'Mit Wasser (oder Rotwein) bedecken.', '45 Minuten bei schwacher Hitze schmoren.', 'Mit Petersilie servieren.'] };
  R['quiche-lorraine'] = { name: 'Quiche Lorraine', steps: ['Aus Mehl und Butter einen Mürbeteig machen, in die Form legen und 10 Minuten blind backen.', 'Schinkenwürfel auf den Teig verteilen.', 'Ei, Milch und geriebenen Käse verquirlen und darüber gießen.', 'Bei 180 °C 35 Minuten backen.', 'Lauwarm mit Salat servieren.'] };
  R['gratin-dauphinois'] = { name: 'Gratin Dauphinois', steps: ['Kartoffeln in dünne Scheiben schneiden.', 'Mit Milch, Sahne, Salz und Pfeffer vermengen.', 'In die Form schichten, Butter und Käse darüber.', 'Bei 180 °C 60 Minuten backen.', '10 Minuten ruhen lassen und servieren.'] };
  R['steak-frites'] = { name: 'Steak Frites', steps: ['Kartoffeln in dicke Stifte schneiden und zweistufig frittieren (oder im Ofen backen).', 'Fleischscheiben mit Salz und Pfeffer würzen.', 'Bei starker Hitze auf jeder Seite 2-3 Minuten scharf braten.', 'Butter darüberträufeln.', 'Sofort mit den Pommes servieren.'] };
  R['fricasse'] = { name: 'Hähnchenfricassee in Sahne + Reis', steps: ['Hähnchen in Butter anbraten.', 'Champignons und Karotten zugeben und andünsten.', 'Mehl einstäuben und 1 Minute mitrösten, Wasser und Sahne zugeben.', '20 Minuten bei schwacher Hitze kochen.', 'Mit Reis servieren.'] };
  R['salade-lyonnaise'] = { name: 'Salade Lyonnaise', steps: ['Brot würfeln und zu Croutons backen.', 'Speckwürfel anbraten.', 'Gekochte Eier halbieren.', 'Salat, Croutons, Speck und Ei vermengen.', 'Mit einem Senf-Olivenöl-Dressing servieren.'] };
  R['bourguignon'] = { name: 'Boeuf Bourguignon (Gäste)', steps: ['Fleisch in Butter scharf anbraten, beiseitestellen.', 'Zwiebel und Karotten anbraten, Mehl zugeben.', 'Fleisch zurückgeben und mit Wasser (oder Rotwein) bedecken.', '1,5 Stunden bei schwacher Hitze schmoren.', 'Champignons in den letzten 20 Minuten zugeben und servieren.'] };
  R['tartines'] = { name: 'Tartines & Orangensaft', steps: ['Brot aufschneiden und toasten.', 'Butter und Marmelade bestreichen.', 'Orangen auspressen.', 'Mit Kaffee oder Tee servieren.'] };
  R['oeufs'] = { name: 'Gekochte Eier & Baguette', steps: ['Eier 8 Minuten kochen.', 'Brot aufschneiden.', 'Tomaten in Scheiben schneiden.', 'Eier mit Butterbrot servieren.'] };
  R['croissant-kahvalti'] = { name: 'Croissant & Joghurtbecher', steps: ['Croissants erwärmen.', 'Honig in den Joghurtbecher geben.', 'Banane in Scheiben schneiden.', 'Mit den Croissants servieren.'] };
  R['croque-monsieur'] = { name: 'Croque Monsieur', steps: ['Eine Brotscheibe mit Butter bestreichen.', 'Mit Schinken und Käse zum Sandwich belegen.', 'Oben eine Milch-Käse-Mischung aufstreichen.', 'Bei 200 °C 10 Minuten überbacken.', 'Mit Salat servieren.'] };
  R['salade-nicoise'] = { name: 'Salade Niçoise', steps: ['Bohnen und Eier kochen.', 'Salat und Tomaten auf dem Teller anrichten.', 'Thunfisch, Oliven, Ei und Bohnen zugeben.', 'Aus Olivenöl, Salz und Pfeffer ein Dressing anrühren.', 'Bei Zimmertemperatur servieren.'] };
  R['soupe-oignon'] = { name: 'Zwiebelsuppe', steps: ['Zwiebeln in Ringe schneiden und in Butter 30 Minuten bei schwacher Hitze karamellisieren.', '1 l Wasser (oder Brühe) zugeben und 20 Minuten kochen.', 'Brotscheiben in die Teller geben.', 'Suppe darüber gießen und mit viel geriebenem Käse bestreuen.', 'Im Ofen überbacken, bis der Käse schmilzt.'] };
  R['creme-brulee'] = { name: 'Crème Brûlée', steps: ['Sahne mit Vanille erwärmen (nicht kochen).', 'Mit Eigelb und Zucker verquirlen.', 'Sahne einrühren und in Schälchen abseihen.', 'Bei 90 °C im Wasserbad 30 Minuten garen.', 'Abgekühlt mit Zucker bestreuen, abflämmen und servieren.'] };
  R['clafoutis'] = { name: 'Apfel-Clafoutis', steps: ['Äpfel in Scheiben schneiden und in die gebutterte Form legen.', 'Ei, Milch, Mehl und Zucker verquirlen und darüber gießen.', 'Bei 180 °C 35 Minuten backen.', 'Lauwarm servieren.', 'Nach Belieben mit Zimt bestreuen.'] };
  R['mousse'] = { name: 'Schokomousse', steps: ['Schokolade über dem Wasserbad schmelzen.', 'Mit Eigelb und Zucker schaumig schlagen.', 'Geschlagene Sahne und Eiweiß unterheben.', 'Auf Schälchen verteilen.', 'Mindestens 2 Stunden kühlen.'] };
})(window.I18N.de.recipes);
(function (R) {
  /* Deutsche Küche */
  R['schnitzel'] = { name: 'Schnitzel & Pommes', steps: ['Hähnchenbrust plattieren und in Mehl, Ei und Paniermehl wenden.', 'In reichlich Öl auf beiden Seiten goldbraun ausbacken.', 'Kartoffeln in Stifte schneiden und frittieren (oder backen).', 'Mit Zitronenscheibe garnieren.', 'Nach Belieben mit Kartoffelpüree servieren.'] };
  R['bratwurst-puree'] = { name: 'Bratwurst & Kartoffelpüree', steps: ['Kartoffeln kochen und mit Milch und Butter zu Püree stampfen.', 'Bratwürste in der Pfanne braten.', 'Mit Senf und Gurken servieren.', 'Püree auf den Teller, Würste darauf.', 'Heiß servieren.'] };
  R['kaesespaetzle'] = { name: 'Käsespätzle', steps: ['Aus Mehl, Ei und Salz einen zähflüssigen Teig rühren.', 'Teig durch ein Spätzlebrett in kochendes Salzwasser schaben (Spätzle herausnehmen, wenn sie oben schwimmen).', 'Karamellisierte Zwiebeln zubereiten.', 'Spätzle, Käse und Zwiebeln schichten.', 'Mit Röstzwiebeln servieren.'] };
  R['linseneintopf'] = { name: 'Linseneintopf', steps: ['Zwiebel, Karotten und Sellerie im Öl anbraten.', 'Linsen und 1,2 l Wasser zugeben und 25 Minuten kochen.', 'Wurstscheiben zugeben und weitere 10 Minuten köcheln.', 'Mit Essig (falls vorhanden) und Salz abschmecken.', 'Mit Brot servieren.'] };
  R['frikadellen'] = { name: 'Frikadellen & Kartoffelsalat', steps: ['Aus Hack, Ei, geriebener Zwiebel und eingeweichtem Brot eine Frikadellenmasse kneten.', 'Frikadellen braten.', 'Kartoffeln kochen und in Scheiben schneiden.', 'Aus Joghurt, Senf und Salz einen Kartoffelsalat anrühren.', 'Zusammen servieren.'] };
  R['rouladen'] = { name: 'Rouladen (Rinderroulade)', steps: ['Fleischscheiben auslegen, mit Schinken, Zwiebel und Karotte füllen und aufrollen.', 'In Butter scharf anbraten.', 'Mit Wasser bedecken und 1 Stunde bei schwacher Hitze schmoren.', 'Sud mit Mehl binden.', 'Mit Knödeln oder Püree servieren.'] };
  R['bratkartoffeln'] = { name: 'Bratkartoffeln & Ei mit Gemüse', steps: ['Kartoffeln vorkochen und in Scheiben schneiden.', 'In der Pfanne braten, Zwiebel zugeben.', 'Gemüse zugeben und mitdünsten.', 'Eier aufschlagen und zugedeckt stocken lassen.', 'Mit frischen Kräutern servieren.'] };
  R['sauerbraten'] = { name: 'Sauerbraten & Knödel (Gäste)', steps: ['Fleisch über Nacht in einer Essig-Wasser-Zwiebel-Marinade legen (oder Wasser-Zwiebel).', 'Fleisch in Butter anbraten, Gemüse zugeben.', 'Marinade angießen und 2 Stunden bei schwacher Hitze schmoren.', 'Sauce mit Mehl binden.', 'Mit Kartoffelknödeln (gekochte Kartoffeln + Mehl + Ei) servieren.'] };
  R['broetchen'] = { name: 'Brötchen, Butter & Marmelade', steps: ['Brötchen halbieren.', 'Mit Butter und Marmelade bestreichen.', 'Käsescheiben und Tomaten dazulegen.', 'Mit Tee oder Kaffee servieren.'] };
  R['vollkorn'] = { name: 'Vollkornbrot & Käse', steps: ['Brot aufschneiden.', 'Butter bestreichen und Käsescheiben auflegen.', 'Mit Gurke und Tomate garnieren.', 'Mit Tee oder Kaffee servieren.'] };
  R['eier-broetchen'] = { name: 'Ei-Brötchen', steps: ['Eier kochen und in Scheiben schneiden.', 'Brötchen halbieren und mit Butter bestreichen.', 'Ei- und Käsescheiben einlegen.', 'Mit Salz und Pfeffer bestreuen.', 'Sofort servieren.'] };
  R['kartoffelsalat'] = { name: 'Kartoffelsalat', steps: ['Kartoffeln kochen und in Scheiben schneiden.', 'Zwiebel fein hacken und unter die warmen Kartoffeln mischen.', 'Aus Joghurt, Senf, Öl und Salz eine Sauce rühren.', 'Unter die Kartoffeln heben.', 'Lauwarm mit Wurst oder Grün servieren.'] };
  R['belegte'] = { name: 'Belegte Brötchen', steps: ['Brötchen halbieren.', 'Butter bestreichen und mit Käse, Gurke und Tomate füllen.', 'Nach Belieben Senf zugeben.', 'Einpacken und mitnehmen.'] };
  R['linsensuppe'] = { name: 'Linsensuppe (deutsche Art)', steps: ['Zwiebel und Gemüse anbraten.', 'Linsen und 1 l Wasser zugeben und 25 Minuten kochen.', 'Mit Salz, Pfeffer und einem Löffel Essig abschmecken.', 'Nach Belieben pürieren.', 'Mit Brot servieren.'] };
  R['apfelstrudel'] = { name: 'Apfelstrudel', steps: ['Aus Mehl, Wasser und wenig Öl einen elastischen Teig kneten und hauchdünn ausziehen.', 'Füllung aus Apfelscheiben, Zucker, Zimt und Walnüssen zubereiten.', 'Füllung auf den Teig geben und einrollen.', 'Mit Butter bestreichen und bei 180 °C 40 Minuten backen.', 'Mit Puderzucker und Vanillesauce servieren.'] };
  R['rote-gruetze'] = { name: 'Rote Grütze & Vanillesauce', steps: ['Beeren mit Zucker bei schwacher Hitze 10 Minuten kochen.', 'Statt Stärke mit 2 Löffeln Wasser zerdrückte Kekse andicken.', 'Vanillesauce aus Sahne erwärmen (nicht kochen).', 'Rote Grütze auf Schälchen verteilen und kühlen.', 'Mit Vanillesauce übergossen servieren.'] };
  R['griessbrei'] = { name: 'Grießbrei', steps: ['Milch erwärmen.', 'Grieß nach und nach einrühren und 5 Minuten unter Rühren kochen.', 'Zucker und Butter zugeben.', 'Auf Schälchen verteilen.', 'Mit Zimt und Zucker servieren.'] };
  /* Griechische Küche */
  R['moussaka'] = { name: 'Moussaka', steps: ['Auberginen und Kartoffeln in Scheiben schneiden und anbraten (oder im Ofen vorgaren).', 'Hack und Zwiebel anbraten und mit Tomaten zur Sauce kochen.', 'Béchamelsauce mit Butter anrühren und Eigelb unterziehen.', 'Gemüse- und Fleischschichten in die Form schichten, Béchamel darüber.', 'Bei 180 °C 40 Minuten backen, in Stücke schneiden und servieren.'] };
  R['gemista'] = { name: 'Gemista (gefüllte Paprika)', steps: ['Paprika köpfen und aushöhlen.', 'Füllung aus Reis, Zwiebel, Tomaten und Öl anrühren.', 'Paprika füllen und aufrecht in die Form stellen.', 'Tomatenscheiben und Wasser daraufgeben.', 'Bei 180 °C 60 Minuten garen.'] };
  R['souvlaki'] = { name: 'Souvlaki & Tzatziki', steps: ['Hähnchen mit Zitrone, Olivenöl und Oregano marinieren.', 'Auf Spieße stecken und am Grill oder in der Pfanne garen.', 'Für Tzatziki geriebene Gurke ausdrücken und mit Joghurt und Knoblauch mischen.', 'Mit Brot (Pita) servieren.', 'Mit Tzatziki und Tomaten garnieren.'] };
  R['pastitsio'] = { name: 'Pastitsio', steps: ['Nudeln kochen.', 'Hacksauce zubereiten.', 'Béchamelsauce zubereiten.', 'Nudeln, Fleischsauce, Nudeln, Béchamel in die Form schichten.', 'Käse reiben und bei 180 °C 40 Minuten backen.'] };
  R['briam'] = { name: 'Briam (Ofengemüse)', steps: ['Gemüse in Scheiben schneiden.', 'Vermischt in die Form geben.', 'Geriebene Tomaten, Olivenöl und Oregano darüber.', 'Bei 190 °C 60 Minuten garen.', 'Lauwarm servieren.'] };
  R['gigantes'] = { name: 'Gigantes Plaki (Bohnen aus dem Ofen)', steps: ['Bohnen kochen.', 'Zwiebel im Olivenöl anbraten.', 'Tomaten und Bohnen zugeben und in die Form geben.', 'Petersilie darüberstreuen.', 'Bei 180 °C 30 Minuten backen.'] };
  R['psari-plaki'] = { name: 'Psari Plaki (Fisch aus dem Ofen)', steps: ['Kartoffeln in Scheiben schneiden und aufs Blech legen.', 'Fischfilets darauflegen.', 'Mit Tomaten- und Zwiebelscheiben bedecken.', 'Olivenöl darüber und bei 190 °C 35 Minuten garen.', 'Mit Zitrone servieren.'] };
  R['yogurt-bal'] = { name: 'Griechischer Joghurt & Honig', steps: ['Joghurt auf Schälchen verteilen.', 'Honig und Walnüsse darübergeben.', 'Mit Brot servieren.'] };
  R['strapatsada'] = { name: 'Strapatsada (Eier mit Tomaten)', steps: ['Tomaten reiben.', '5 Minuten im Olivenöl kochen.', 'Eier aufschlagen und unter Rühren stocken lassen.', 'Salz und Pfeffer zugeben.', 'Mit Brot servieren.'] };
  R['koulouri'] = { name: 'Koulouri & Käse', steps: ['Simits (Koulouri) halbieren.', 'Mit Käse und Oliven servieren.', 'Dazu Kaffee oder Tee reichen.'] };
  R['horiatiki'] = { name: 'Horiatiki (griechischer Salat)', steps: ['Tomaten, Gurke und Paprika grob schneiden.', 'Käseblock und Oliven darauflegen.', 'Reichlich Olivenöl und Salz darüber.', 'Oregano bestreuen.', 'Mit Brot servieren.'] };
  R['souvlaki-durum'] = { name: 'Souvlaki Dürüm (Wrap)', steps: ['Hähnchen marinieren und auf Spießen garen.', 'Tzatziki anrühren (Joghurt + Gurke + Knoblauch).', 'Pommes frittieren.', 'Hähnchen, Tzatziki, Tomaten und Pommes ins Brot rollen.', 'Sofort servieren.'] };
  R['fassolada'] = { name: 'Fassolada (Bohnensuppe)', steps: ['Bohnen einweichen und kochen.', 'Gemüse anbraten.', 'Bohnen, Tomaten und Wasser zugeben und 40 Minuten kochen.', 'Olivenöl zum Schluss zugeben.', 'Mit Brot servieren.'] };
  R['balli-yogurt'] = { name: 'Joghurt mit Honig und Walnüssen', steps: ['Joghurt auf Schälchen verteilen.', 'Mit Honig und Walnüssen garnieren.', 'Kalt servieren.'] };
  R['baklava'] = { name: 'Baklava (fertig) & Eis', steps: ['Baklava in Stücke schneiden.', 'Nach Belieben leicht erwärmen.', 'Mit Walnüssen garnieren.', 'Mit Eis servieren.'] };
  R['portakal-kek'] = { name: 'Orangenkuchen', steps: ['Eier und Zucker schaumig schlagen.', 'Orangensaft und Abrieb zugeben.', 'Mehl einrühren.', 'In der gefetteten Form bei 175 °C 40 Minuten backen.', 'Abgekühlt in Stücke schneiden.'] };
})(window.I18N.de.recipes);
(function (R) {
  /* Brotboxen */
  R['lb-poğaca'] = { name: 'Käsebrötchen (Poğaça) + Ayran', steps: ['Teigzutaten verrühren und 30 Minuten gehen lassen (auch am Abend vorher möglich).', 'Poğaça mit Käsefüllung formen und bei 180 °C 25 Minuten backen.', 'Ayran und Obst dazulegen.'] };
  R['lb-sandvic'] = { name: 'Ei-Sandwich + Tomate', steps: ['Ei hart kochen und in Scheiben schneiden.', 'Brot mit Butter bestreichen und Ei- und Tomatenscheiben einlegen.', 'In Alufolie oder Beutel verpacken.'] };
  R['lb-mercimek-termos'] = { name: 'Linsensuppe (Thermos) + Brot', steps: ['Zwiebel und Karotte in Butter anbraten, Linsen zugeben.', 'Mit 1,5 Tassen Wasser 20 Minuten kochen und pürieren.', 'In die Thermoskanne füllen, Brot dazunehmen.'] };
  R['lb-tost'] = { name: 'Käsetoast + Apfel', steps: ['Käse zwischen die Brotscheiben legen und im Toaster goldbraun backen.', 'Abgekühlt verpacken, Apfel dazulegen.'] };
  R['lb-panino'] = { name: 'Panino mit Mozzarella', steps: ['Brot halbieren, Mozzarella- und Tomatenscheiben einlegen.', 'Olivenöl und Petersilie darüberstreuen.'] };
  R['lb-frittata'] = { name: 'Frittata-Scheibe', steps: ['Kartoffeln in dünne Scheiben schneiden und im Öl weich braten.', 'Verquirltes Ei darübergießen und zugedeckt stocken lassen.', 'Abgekühlt in Scheiben schneiden und mit Brot verpacken.'] };
  R['lb-pasta-fredda'] = { name: 'Nudelsalat (Pasta Fredda)', steps: ['Nudeln kochen und abkühlen lassen.', 'Mit Thunfisch, gewürfelten Tomaten und Olivenöl vermengen.', 'In geschlossenem Behälter gekühlt transportieren.'] };
  R['lb-croissant'] = { name: 'Croissant + Marmelade + Orange', steps: ['Croissant morgens nach Belieben kurz erwärmen.', 'Mit Marmelade und geschälten Orangenscheiben verpacken.'] };
  R['lb-baguette'] = { name: 'Baguette mit Schinken', steps: ['Baguette halbieren und mit Butter und Senf bestreichen.', 'Schinken einlegen und einrollen.'] };
  R['lb-quiche'] = { name: 'Quiche-Lorraine-Scheibe', steps: ['Aus Mehl und Butter einen Teig machen und in die Form legen (am Abend vorher möglich).', 'Quark, Ei und Speckwürfel verrühren und eingießen.', 'Bei 180 °C 35 Minuten backen, in Scheiben schneiden und verpacken.'] };
  R['lb-butterbrot'] = { name: 'Butterbrot mit Bratwurst + Apfel', steps: ['Bratwurst vorgaren und abkühlen lassen.', 'Brötchen mit Butter bestreichen und die Bratwurst einlegen.', 'Apfel dazulegen.'] };
  R['lb-brotzeit'] = { name: 'Brotzeit (Käsebrötchen + Gemüse)', steps: ['Brötchen halbieren und Käse einlegen.', 'Gurken- und Tomatenscheiben separat in einer Dose transportieren.'] };
  R['lb-kartoffelsalat'] = { name: 'Kartoffelsalat (Brotbox)', steps: ['Kartoffel am Abend vorher kochen und in Scheiben schneiden.', 'Aus Zwiebel, Senf, Öl und etwas Kartoffelwasser eine Sauce rühren.', 'Mit einer Scheibe hartgekochtem Ei vermengen.'] };
  R['lb-pita'] = { name: 'Pita + Tzatziki', steps: ['Tzatziki aus Joghurt, geraspelter Gurke, Knoblauch und Olivenöl anrühren (am Abend vorher).', 'Pita erwärmen und füllen.'] };
  R['lb-horiatiki'] = { name: 'Griechischer Salat (in der Dose)', steps: ['Tomate, Gurke und Käse würfeln.', 'Mit Oliven und Olivenöl vermengen und in eine dichte Dose geben.'] };
  R['lb-spanakopita'] = { name: 'Spanakopita-Scheibe', steps: ['Aus Mehl und Butter einen Teig machen.', 'Spinat-Käse-Ei-Mischung zwischen die Teiglagen geben.', 'Bei 180 °C 35 Minuten backen und in Scheiben schneiden.'] };
  R['lb-overnight-oats'] = { name: 'Overnight Oats', steps: ['Abends Haferflocken, Milch und Zimt ins Glas geben und kühlen.', 'Morgens geschnittene Äpfel darübergeben.'] };
  R['lb-yumurta-brötchen'] = { name: 'Gekochtes Ei + Brötchen + Banane', steps: ['Eier am Abend vorher hart kochen.', 'Ei mit Schale, Brötchen und Banane in die Tasche packen.'] };
  /* Chinesisch, Indisch, Mexikanisch, Japanisch */
  R['cn-noodle-corbasi'] = { name: 'Hähnchen-Nudelsuppe', steps: ['Hähnchenbrust kochen und zupfen, Brühe aufheben.', 'Karotte und Porree fein schneiden und 2 Minuten im Öl andünsten.', 'Hühnerbrühe angießen, Nudeln und Hähnchen zugeben.', '5 Minuten kochen, mit Sojasauce und Knoblauch abschmecken.'] };
  R['cn-stir-fry'] = { name: 'Hähnchen-Gemüse-Stir-Fry + Reis', steps: ['Reis aufsetzen.', 'Hähnchen in Streifen schneiden und bei starker Hitze braten.', 'Gemüse zugeben und 4-5 Minuten im Wok pfannenrühren.', 'Mit Sojasauce abschmecken und mit Reis servieren.'] };
  R['cn-tatli-eksi-kofte'] = { name: 'Fleischbällchen in Süß-Sauer-Sauce', steps: ['Aus dem Hack kleine Bällchen formen und braten.', 'Zwiebel und Paprika andünsten, Tomaten zugeben.', 'Mit Zucker und Sojasauce eine Süß-Sauer-Sauce anrühren, Bällchen zugeben.', 'Mit Reis servieren.'] };
  R['in-tavuk-kori'] = { name: 'Hähnchen-Curry + Reis', steps: ['Hähnchen 20 Minuten in Joghurt und Gewürzen marinieren.', 'Zwiebel in Butter anbraten, Tomaten zugeben.', 'Hähnchen zugeben und 15 Minuten kochen.', 'Mit Reis servieren.'] };
  R['in-mercimek-dal'] = { name: 'Linsen-Dal (indische Suppe)', steps: ['Linsen waschen.', 'Zwiebel und Knoblauch in Butter anbraten und Gewürze zugeben.', 'Linsen mit 4 Tassen Wasser 25 Minuten kochen.', 'Glatt pürieren und mit Brot servieren.'] };
  R['in-tavuk-tikka'] = { name: 'Hähnchen Tikka (aus dem Ofen)', steps: ['Hähnchen 1 Stunde in Joghurt, Curry und Zitronensaft marinieren.', 'Auf Spieße stecken und bei 200 °C 25 Minuten garen.', 'Mit Zwiebelringen und Joghurtsauce servieren.'] };
  R['mx-taco'] = { name: 'Tacos mit Hack', steps: ['Hack mit Zwiebel und Paprika anbraten.', 'Tomaten und Chiliflocken zugeben und einkochen lassen.', 'Tortillas erwärmen, Füllung und geriebenen Käse einfüllen.', 'Mit Salat und Tomatenscheiben garnieren.'] };
  R['mx-burrito'] = { name: 'Bohnen-Burrito', steps: ['Bohnen kochen (Dose geht auch).', 'Bohnen mit Zwiebel und Kreuzkümmel zerdrückt anbraten.', 'Mit Reis vermengen und in Tortillas einrollen.', 'Mit Käse verschließen und in der Pfanne erwärmen.'] };
  R['mx-quesadilla'] = { name: 'Hähnchen-Quesadilla', steps: ['Hähnchen mit Gewürzen garen und in Streifen schneiden.', 'Käse, Hähnchen und Paprika auf die halbe Tortilla geben und klappen.', 'In der Pfanne von beiden Seiten backen.', 'In Stücke schneiden und servieren.'] };
  R['jp-teriyaki'] = { name: 'Teriyaki-Hähnchen + Reis', steps: ['Reis aufsetzen.', 'Hähnchenkeulen-/-brustscheiben im Öl braten.', 'Sojasauce, Honig und Zucker zugeben und karamellisieren.', 'Auf dem Reis servieren.'] };
  R['jp-ramen'] = { name: 'Selbstgemachte Ramen', steps: ['Hähnchen kochen und in Scheiben schneiden, Eier hart kochen und halbieren.', 'Nudeln kochen.', 'Hühnerbrühe mit Sojasauce abschmecken und aufkochen.', 'Nudeln, Hähnchen, Spinat und Ei in Schalen geben und Brühe angießen.'] };
  R['jp-somon-donburi'] = { name: 'Lachs-Donburi (Reisschale)', steps: ['Reis kochen.', 'Lachs in Scheiben schneiden und in Sojasauce und Zitrone marinieren.', 'Avocado in Scheiben schneiden.', 'Lachs und Avocado auf den Reis legen und servieren.'] };
  /* Besondere Rezepte */
  R['sp-ekmek'] = { name: 'Brot selbst backen', steps: ['Mehl in die Schüssel geben und in der Mitte eine Mulde formen.', 'Hefe und Zucker in lauwarmem Wasser auflösen und zum Mehl geben.', 'Salz und Olivenöl zugeben und 8-10 Minuten kneten.', 'Abgedeckt 1 Stunde gehen lassen.', 'Luft herausdrücken, formen und weitere 20 Minuten ruhen lassen.', 'Bei 220 °C (mit Wasserschale im Ofen) 30-35 Minuten backen.'] };
  R['sp-sushi'] = { name: 'Sushi selbst machen (Maki)', steps: ['Reis kochen und abkühlen lassen (wie Sushireis).', 'Nori-Blatt auf die Bambusmatte legen, Reis dünn darauf verteilen.', 'Lachs- und Avocadostreifen in die Mitte legen.', 'Fest aufrollen und in 8 Stücke schneiden.', 'Mit Sojasauce servieren.'] };
  R['sp-taze-makarna'] = { name: 'Frische handgemachte Pasta', steps: ['Mehl auf die Arbeitsfläche geben, Mulde formen, Eier und Salz hineinschlagen.', 'Mehl langsam einarbeiten und 10 Minuten kneten.', '30 Minuten ruhen lassen.', 'Dünn ausrollen und in Streifen schneiden.', '3 Minuten in Salzwasser kochen, mit Butter und Parmesan servieren.'] };
  R['sp-lahmacun'] = { name: 'Lahmacun vom eigenen Teig', steps: ['Aus Mehl, Hefe, Salz und Wasser einen weichen Teig kneten, 1 Stunde gehen lassen.', 'Hack mit Zwiebel und Pasten im Mixer fein zerkleinern.', 'Teig dünn ausrollen und die Füllung darauf verteilen.', 'Bei 250 °C 6-8 Minuten backen.', 'Mit Zitrone und Petersilie gerollt servieren.'] };
  R['sp-hummus'] = { name: 'Hummus selbst machen', steps: ['Kichererbsen über Nacht einweichen und kochen (Dose geht auch).', 'Kichererbsen, Tahini, Zitronensaft und Knoblauch im Mixer pürieren.', 'Mit Kochwasser zur gewünschten Konsistenz verdünnen.', 'Mit Olivenöl und Chiliflocken servieren.'] };
  R['sp-granola'] = { name: 'Granola selbst machen', steps: ['Haferflocken, Walnüsse und Zimt vermengen.', 'Honig und Öl zugeben und vermengen.', 'Aufs Blech verteilen und bei 160 °C 30 Minuten unter Wenden rösten.', 'Abgekühlt ins Glas füllen, mit Milch oder Joghurt essen.'] };
})(window.I18N.de.recipes);

/* ---- v4 ek UI anahtarları ---- */
Object.assign(window.I18N.de.ui, {
  'misafir': 'Gäste',
  'Misafir menüsü eklendi. Malzemeler otomatik artırılır.': 'Gästemenü hinzugefügt. Die Zutatenmengen werden automatisch erhöht.',
  'Sepet tutarı: {v} (tam paket/gramaj yuvarlamasıyla — tüketim maliyeti bundan düşüktür) · Kalemlerin %{p}si gerçek market fiyatları (Open Prices topluluk verisi, son 12 ay medyanı), kalanı tahmini. Mağazaya ve sezona göre değişebilir.': 'Warenkorbwert: {v} (auf ganze Packungen gerundet — die Verbrauchskosten liegen darunter) · {p} % der Positionen sind echte Supermarktpreise (Open Prices Community-Daten, Median der letzten 12 Monate), der Rest geschätzt. Kann je nach Markt und Saison variieren.',
  'Aynı sepetin tamamı tek bir markette alınırsa tahmini maliyeti aşağıda. "En uygun" market tek seferde her şeyi almak isteyenler için. Alışveriş listesinde her kalem, gerçek fiyatı olan marketten seçilir.': 'Unten sehen Sie die geschätzten Kosten, wenn der gesamte Warenkorb in einem einzigen Markt gekauft wird. Der "günstigste" Markt ist für alle, die alles in einem Einkauf erledigen wollen. In der Einkaufsliste wird jede Position aus dem Markt mit echtem Preis gewählt.',
  'Gerçek fiyatlar Open Prices (prices.openfoodfacts.org) topluluk verilerinden; 2025 başından bu yana Almanya\'da kaydedilmiş fiyatların market bazındaki medyanıdır.': 'Echte Preise stammen aus den Community-Daten von Open Prices (prices.openfoodfacts.org); es ist der Median der seit Anfang 2025 in Deutschland erfassten Preise je Markt.',
  'Bazı şartlar eleme kurallarıyla çakıştığı için uygulanamadı.': 'Einige Regeln konnten nicht umgesetzt werden, weil sie mit den Ausschlüssen kollidieren.',
  '"{x}" içeren en az 2 yemek plana alındı.': 'Mindestens 2 Gerichte mit "{x}" sind im Plan.',
  'Sporcu modu: haftanın {n} akşam yemeği protein ağırlıklı (et, tavuk, balık, baklagil).': 'Sportlermodus: {n} Abendessen der Woche sind proteinbetont (Fleisch, Hähnchen, Fisch, Hülsenfrüchte).',
  'Diyet modu: haftanın {n} akşam yemeği hafif (sebze, çorba, balık) ağırlıklı.': 'Diätmodus: {n} Abendessen der Woche sind leicht (Gemüse, Suppe, Fisch) betont.',
  '"{x}" malzeme listesinde yok. Listeden seçmeyi deneyin.': '"{x}" ist nicht in der Zutatenliste. Bitte aus der Liste wählen.',
  'Dolabınıza göre {n} öneri': '{n} Vorschläge aus Ihrem Kühlschrank',
  'Tahmini malzeme maliyeti:': 'Geschätzte Zutatenkosten:',
  'malzeme dolapta': 'Zutaten im Kühlschrank',
  'kişinin yaşı': '. Person: Alter',
  'kişinin cinsiyeti': '. Person: Geschlecht',
  'kişinin sabah programı': '. Person: morgens',
  'kişiyi kaldır': '. Person entfernen',
  'çıkar': 'entfernen',
  'Ek malzeme (isteğe bağlı)': 'Zusätzliche Zutat (optional)',
});

/* ---- v4 statik sayfa anahtarları ---- */
Object.assign(window.I18N.de.ui, {
  'İçeriğe geç': 'Zum Inhalt springen',
  'Anasayfa ve plan kurulumu': 'Startseite und Planeinrichtung',
  'Oluşturulan plan': 'Erstellter Plan',
  'Dolaptan yemek bul': 'Gericht aus dem Kühlschrank finden',
  'Plan görünümleri': 'Planansichten',
  'Mutfak seçimi (birden fazla seçebilirsiniz)': 'Küchenwahl (Mehrfachauswahl möglich)',
  'Mutfak Planı — anasayfa': 'Küchenplaner — Startseite',
  'kalem': 'Pos.',
  'Mutfak Planı — Haftalık Yemek ve Alışveriş Planlayıcı': 'Küchenplaner — Wochenplaner für Essen & Einkauf',
  'Mutfaklarınızı, hane halkınızı, bütçenizi ve alerjilerinizi seçin; haftalık yemek planı, tarifler ve gerçek market fiyatlarıyla alışveriş listesi oluşsun. Dolabınızdakilerle yemek bulun, özel tarifleri keşfedin.': 'Wählen Sie Küchen, Haushalt, Budget und Allergien — der Wochenplan, Rezepte und eine Einkaufsliste mit echten Supermarktpreisen entstehen automatisch. Finden Sie Gerichte aus dem Kühlschrank und entdecken Sie besondere Rezepte.',
});

/* ---- PWA anahtarları ---- */
Object.assign(window.I18N.de.ui, {
  'Uygulamayı yükle': 'App installieren',
  'Uygulama yüklendi.': 'App installiert.',
});

/* ---- v5: mutfak ağırlığı + cacık ---- */
Object.assign(window.I18N.de.ui, {
  'Ağırlık': 'Gewichtung',
  'Ağırlık: seçili mutfakta noktalara dokunun — 5 = en sık önerilir, 1 = nadiren. Örnek: Türk 5, Alman 3, İtalyan 2.': 'Gewichtung: Tippen Sie in einer gewählten Küche auf die Punkte — 5 = wird am häufigsten vorgeschlagen, 1 = selten. Beispiel: Türkisch 5, Deutsch 3, Italienisch 2.',
});
(function (R) {
  R['cacik'] = { name: 'Cacık (Joghurt mit Gurken)', steps: ['Gurke raspeln oder klein würfeln.', 'Knoblauch zerdrücken und mit dem Joghurt verrühren.', 'Gurke und fein geschnittene Minze unterrühren.', 'Nach Bedarf mit ein paar Löffeln Wasser verdünnen.', 'Mit Olivenöl und getrockneter Minze kalt servieren.'] };
})(window.I18N.de.recipes);
(function (R) {
  R['vegan-kahvalti'] = { name: 'Gemüsefrühstück mit Olivenöl', steps: ['Tomaten und Gurken in Scheiben schneiden.', 'Oliven auf den Teller geben.', 'Brot aufschneiden und leicht rösten.', 'Mit Olivenöl und Oregano beträufeln und mit Tee servieren.'] };
  R['lb-humus-sandvic'] = { name: 'Hummus-Gemüse-Sandwich', steps: ['Gekochte Kichererbsen mit Tahini und Zitrone zu Hummus zerdrücken (auch am Vorabend).', 'Hummus aufs Brot streichen.', 'Mit Gurken- und Tomatenscheiben belegen und einpacken.'] };
})(window.I18N.de.recipes);

/* ---- v6: bütçe önerisi ---- */
Object.assign(window.I18N.de.ui, {
  "Aralık, hanenizin porsiyon sayısına göre otomatik önerilir; kendiniz değiştirirseniz sizin değeriniz kullanılır. Plan, aralığın ortasına yakın bir maliyetle oluşturulur.": "Der Rahmen wird automatisch nach der Portionszahl Ihres Haushalts vorgeschlagen; ändern Sie ihn selbst, gilt Ihr Wert. Der Plan wird mit Kosten nahe der Bereichsmitte erstellt.",
  "Plan bütçe alt sınırınızın {v} altında kaldı — seçimlerinizle daha pahalı bir hafta çıkmadı, bu size tasarruf demek.": "Der Plan liegt {v} unter Ihrer Budget-Untergrenze — mit Ihrer Auswahl ergab sich keine teurere Woche, Sie sparen also.",
  "Plan bütçe üst sınırınızı {v} aşıyor. Daha uygun mutfaklar ekleyin, elemeleri azaltın veya bütçeyi yükseltin.": "Der Plan überschreitet Ihre Budget-Obergrenze um {v}. Fügen Sie günstigere Küchen hinzu, lockern Sie Ausschlüsse oder erhöhen Sie das Budget.",
});

/* ---- v7: ortak plan ---- */
Object.assign(window.I18N.de.ui, {
  "Ortak Plan": "Gemeinsamer Plan",
  "Ortak plan": "Gemeinsamer Plan",
  "Planı ve alışveriş listesini aile üyeleriyle canlı paylaşın. Biri markette ürün işaretlediğinde diğerinde de görünür.": "Teilen Sie Plan und Einkaufsliste live mit Ihrer Familie. Hakt jemand im Laden etwas ab, sehen es alle anderen auch.",
  "Ortak plan başlat": "Gemeinsamen Plan starten",
  "Aile kodunuz var mı?": "Haben Sie einen Familiencode?",
  "Katıl": "Beitreten",
  "Bu cihaz ortak plana bağlı": "Dieses Gerät ist mit dem gemeinsamen Plan verbunden",
  "Aile kodu": "Familiencode",
  "Linki paylaş": "Link teilen",
  "Ayrıl": "Verlassen",
  "Bağlantı yok — değişiklikler bağlantı gelince gönderilir": "Keine Verbindung — Änderungen werden gesendet, sobald wieder Verbindung besteht",
  "Ortak plan başlatıldı. Linki aile üyelerinize gönderin.": "Gemeinsamer Plan gestartet. Senden Sie den Link an Ihre Familie.",
  "Ortak plana katıldınız.": "Sie sind dem gemeinsamen Plan beigetreten.",
  "Geçersiz aile kodu.": "Ungültiger Familiencode.",
  "Link kopyalandı.": "Link kopiert.",
  "Ortak plandan ayrıldınız. Plan bu cihazda kalır.": "Sie haben den gemeinsamen Plan verlassen. Der Plan bleibt auf diesem Gerät.",
  "Ortak plan güncellendi.": "Gemeinsamer Plan aktualisiert.",
  "Bu linkle Mutfak Planı'ndaki ortak planımıza katıl:": "Tritt mit diesem Link unserem gemeinsamen Plan in Mutfak Planı bei:",
  "Bu kodla henüz bir plan yok. Mevcut planınız bu koda kaydedildi.": "Zu diesem Code gab es noch keinen Plan. Ihr aktueller Plan wurde unter diesem Code gespeichert.",
});
