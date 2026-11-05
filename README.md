# Mutfak Planı

Ev hanesine göre haftalık yemek planı, tarif, alışveriş listesi ve market karşılaştırması üreten statik web uygulaması.

## Özellikler

- **Hane kurulumu**: Kişi sayısı, yaşlar, cinsiyetler ve sabah programı (evde kahvaltı / iş — beslenme / okul — beslenme)
- **Çoklu mutfak seçimi**: Türk, İtalyan, Fransız, Alman, Yunan, Çin, Hint, Meksika, Japon — birden fazla seçilebilir; seçilmeyen mutfaklardan haftada 1–2 "sürpriz" öneri
- **Beslenme tercihi**: Hepçil / Vejetaryen / Vegan + Helal (domuz ürünleri hariç), Sporcu (protein ağırlıklı) ve Diyet (hafif yemekler) modları
- **Çoklu dil**: Türkçe, Almanca ve İngilizce — üstteki dil düğmesiyle anında değişir, 136 tarif dahil tüm arayüz çevrilidir; seçim tarayıcıda hatırlanır
- **Eleme ve zorunluluklar**: Alerjenler, sevilmeyen gıdalar, mutlaka olması gereken gıdalar
- **Bütçe aralığı**: Plan, belirlenen aralığa sığacak şekilde oluşturulur
- **Günlük eklemeler**: Öğle yemeği, tatlı, misafir (kişi sayısı ayarlanabilir) — malzeme miktarları otomatik ölçeklenir
- **Alışveriş listesi**: Malzemeler marketlere bölünür; gerçek fiyatlar Open Prices (prices.openfoodfacts.org) topluluk verisinden, Almanya 2025+ medyanı
- **Market karşılaştırması**: Aynı sepetin tek markette maliyeti, "en uygun" işaretli
- **Dolaptan Yemek**: Eldeli malzemeleri girin, eksik malzemeleri ve maliyetiyle tarif önerileri alın
- **Özel Tarifler**: Evde ekmek, suşi, el yapımı makarna, lahmacun, hummus, granola

## Çalıştırma

Statik site — derleme gerekmez:

```bash
# basit sunucu
python3 -m http.server 3000
# veya
npx serve . -l 3000
```

Ardından tarayıcıda `http://localhost:3000` açın.

## Dosya yapısı

| Dosya | İçerik |
|---|---|
| `index.html` | 4 görünüm: Anasayfa, Haftalık Plan, Dolaptan Yemek, Özel Tarifler |
| `app.js` | Uygulama mantığı (plan üretimi, alışveriş listesi, dolap önerileri) |
| `data.js` | 136 tarif, ~94 malzeme, alerjen eşlemeleri, 9 mutfak |
| `i18n-de.js` / `i18n-en.js` | Almanca ve İngilizce çeviriler (arayüz + 136 tarif) |
| `prices-data.js` | Gerçek market fiyatları (Open Prices medyanları) |
| `curated_prices.json` | Fiyat verisinin ham hali |
| `tools/fetch_prices*.py` | Open Prices API'den fiyat çeken betikler |

## Fiyat verisi

`tools/fetch_prices.py` ve `tools/fetch_prices2.py` betikleri [Open Prices API](https://prices.openfoodfacts.org) üzerinden Almanya'da 2025 başından itibaren kaydedilmiş fiyatları market bazında medyanlayıp `curated_prices.json` üretir. En az 2 fiyatı olan marketler dikkate alınır.

## Lisans

Kişisel kullanım — henüz lisans tanımlanmadı.
