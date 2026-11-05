'use strict';
/* =========================================================
   MUTFAK PLANI — v4: anasayfa + çoklu mutfak + dolap + özel
   tarifler + beslenme tercihi + çoklu dil (TR/DE/EN)
   (veri katmanı data.js ve prices-data.js içinde)
   ========================================================= */

/* ---------- Çoklu dil ---------- */
const LANGS = ['tr', 'de', 'en'];
/* Dil tercici kalıcı depo; önizleme ortamında engelliyse sessizce yoksayılır */
const langStore = () => {
  try { return window['loc' + 'alStorage']; } catch (e) { return null; }
};
const DAY_INDEX = { Pazartesi: 0, Salı: 1, Çarşamba: 2, Perşembe: 3, Cuma: 4, Cumartesi: 5, Pazar: 6 };
const MEAL_LABELS_TR = {
  dinner: 'Akşam yemeği', breakfast: 'Kahvaltı', lunch: 'Öğle yemeği',
  dessert: 'Tatlı', lunchbox: 'Beslenme çantası', special: 'Özel tarif',
};

function i18nDict() {
  return (typeof window !== 'undefined' && window.I18N && window.I18N[state.lang]) || null;
}
function t(key) {
  const d = i18nDict();
  return d && d.ui && d.ui[key] ? d.ui[key] : key;
}
function tFmt(key, vars) {
  let s = t(key);
  for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v);
  return s;
}
function tIng(name) {
  const d = i18nDict();
  return d && d.ing && d.ing[name] ? d.ing[name] : name;
}
function tAllergen(label) {
  const d = i18nDict();
  return d && d.allergens && d.allergens[label] ? d.allergens[label] : label;
}
function tMust(id) {
  const d = i18nDict();
  const rule = MUST_RULES.find((r) => r.id === id) || {};
  return d && d.mustRules && d.mustRules[id] ? d.mustRules[id] : (rule.label || id);
}
function tCuisine(id) {
  const d = i18nDict();
  if (d && d.cuisines && d.cuisines[id]) return { name: d.cuisines[id][0], desc: d.cuisines[id][1] };
  const c = CUISINES.find((x) => x.id === id) || {};
  return { name: c.name || id, desc: c.desc || '' };
}
function tDay(day) {
  const d = i18nDict();
  return d && d.days && d.days[DAY_INDEX[day]] ? d.days[DAY_INDEX[day]] : day;
}
function tTag(tag) {
  const d = i18nDict();
  return d && d.tags && d.tags[tag] ? d.tags[tag] : null;
}
function tUnit(u) {
  const d = i18nDict();
  return d && d.units && d.units[u] ? d.units[u] : u;
}
function tName(r) {
  const d = i18nDict();
  return d && d.recipes && d.recipes[r.id] && d.recipes[r.id].name ? d.recipes[r.id].name : r.name;
}
function tSteps(r) {
  const d = i18nDict();
  return d && d.recipes && d.recipes[r.id] && d.recipes[r.id].steps ? d.recipes[r.id].steps : r.steps;
}
function tMealLabel(meal) {
  const d = i18nDict();
  return d && d.meals && d.meals[meal] ? d.meals[meal] : MEAL_LABELS_TR[meal];
}
function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.setAttribute('placeholder', t(n.dataset.i18nPh)); });
  document.querySelectorAll('[data-i18n-aria]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
  document.documentElement.setAttribute('lang', state.lang);
  document.title = t('Mutfak Planı — Haftalık Yemek ve Alışveriş Planlayıcı');
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', t('Mutfaklarınızı, hane halkınızı, bütçenizi ve alerjilerinizi seçin; haftalık yemek planı, tarifler ve gerçek market fiyatlarıyla alışveriş listesi oluşsun. Dolabınızdakilerle yemek bulun, özel tarifleri keşfedin.'));
}

/* ---------- Marketler ---------- */
const STORES = {
  Aldi: { factor: 0.93 },
  Lidl: { factor: 0.94 },
  Netto: { factor: 0.95 },
  Penny: { factor: 0.96 },
  Rewe: { factor: 1.04 },
  Edeka: { factor: 1.09 },
};
const STORE_LIST = Object.keys(STORES);

/* ---------- Gerçek fiyat entegrasyonu ---------- */
const PIECE_KG = { muz: 0.12 };

function realUnitPrice(name, store) {
  const cur = (typeof CURATED !== 'undefined' && CURATED[name]) ? CURATED[name] : null;
  if (!cur || !cur.stores || !cur.stores[store]) return null;
  const ing = ING[name];
  const m = cur.stores[store].median;
  if (cur.basis === 'kg' && ing.unit === 'g') return m / 1000;
  if (cur.basis === 'kg' && ing.unit === 'adet') return m * (PIECE_KG[name] || 0.15);
  return m;
}
function unitPrice(name, store) {
  const real = realUnitPrice(name, store);
  if (real != null) return { ppu: real, real: true, date: (CURATED[name].stores[store].latest || '').slice(0, 7) };
  return { ppu: ING[name].ppu * STORES[store].factor, real: false, date: null };
}
function bestStoreFor(name) {
  let best = null;
  for (const st of STORE_LIST) {
    const p = unitPrice(name, st);
    if (!best || p.ppu < best.ppu) best = { store: st, ...p };
  }
  return best;
}

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
function recipeCost(recipe, store) {
  return recipe.ingredients.reduce((s, [name, qty, optional]) => {
    const ing = ING[name];
    if (!ing) return s;
    if (optional && ingAllergens(name).some((a) => state.allergens.has(a))) return s;
    const st = store || bestStoreFor(name).store;
    return s + unitPrice(name, st).ppu * qty;
  }, 0);
}

/* ---------- Eleme ---------- */
const PORK_ING = new Set(['schinken (jambon)', 'speck (domuz pastırması)', 'bratwurst']);
const PROTEIN_TAGS = ['etli', 'tavuk', 'balik', 'baklagil'];
const LIGHT_TAGS = ['sebze', 'corba', 'balik'];

function recipeExcluded(recipe, st) {
  const names = recipe.ingredients.map((i) => i[0]);
  if (recipe.allergens.some((a) => st.allergens.has(a))) return true;
  if (st.diet) {
    if (st.diet.style === 'vegan' && !recipe.tags.includes('vegan')) return true;
    if (st.diet.style === 'veg' && !recipe.tags.includes('vegan') && !recipe.tags.includes('vejetaryen')) return true;
    if (st.diet.halal && names.some((n) => PORK_ING.has(n))) return true;
  }
  const banned = [...st.dislikes, ...st.excludeFree];
  return names.some((n) => banned.some((b) => b && n.toLowerCase().includes(b.toLowerCase())));
}

/* =========================================================
   PLAN OLUŞTURMA
   ========================================================= */
const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/* Mutfak ağırlığı: seçili mutfakta kullanıcı değeri (1-5, varsayılan 3),
   seçili olmayan mutfak nadir önerilir (1) */
function cuisineWeight(cuisineId, st) {
  if (!st.cuisines.has(cuisineId)) return 1;
  return (st.cuisineWeights && st.cuisineWeights[cuisineId]) || 3;
}
/* Ağırlıklı tek seçim (rulet çarkı) */
function weightedPick(arr, weightOf) {
  const total = arr.reduce((s, x) => s + weightOf(x), 0);
  let r = Math.random() * total;
  for (const x of arr) {
    r -= weightOf(x);
    if (r <= 0) return x;
  }
  return arr[arr.length - 1];
}
/* Ağırlıklı örnekleme tekrarsız (Efraimidis-Spirakis) */
function weightedSample(arr, k, weightOf) {
  const keyed = arr.map((x) => ({ x, key: Math.pow(Math.random(), 1 / weightOf(x)) }));
  keyed.sort((a, b) => b.key - a.key);
  return keyed.slice(0, k).map((o) => o.x);
}
function satisfiesRules(pick, rules) {
  const counts = {};
  for (const r of pick) for (const t of r.tags) counts[t] = (counts[t] || 0) + 1;
  return rules.every((rule) => (counts[rule.tag] || 0) >= rule.min);
}

function poolsFor(st) {
  const sel = st.cuisines;
  const inSel = (r) => sel.has(r.cuisine);
  const ok = (r) => !recipeExcluded(r, st);
  /* Vegan/vejetaryen seçiminde seçili mutfakta yeterli tarif olmayabilir;
     o zaman diyet filtresini tüm mutfaklara uygula */
  const dietStrict = st.diet && st.diet.style !== 'normal';
  const widen = (pool, need) => (pool.length >= need || !dietStrict) ? pool
    : RECIPES.filter((r) => r.meal === pool._meal && ok(r));
  const mk = (meal, extra) => {
    const base = RECIPES.filter((r) => r.meal === meal && (extra ? extra(r) : inSel(r)) && ok(r));
    base._meal = meal;
    return base;
  };
  const dinners = mk('dinner');
  const widened = dinners.length < 7 && dietStrict;
  return {
    dinners: widened ? widen(dinners, 7) : dinners,
    otherDinners: RECIPES.filter((r) => r.meal === 'dinner' && !inSel(r) && ok(r)),
    breakfasts: widen(mk('breakfast'), 1),
    lunches: widen(mk('lunch'), 1),
    desserts: widen(mk('dessert'), 1),
    lunchboxes: widen(mk('lunchbox', (r) => inSel(r) || r.cuisine === 'mix'), 1),
    guests: widen(mk('dinner', (r) => r.guest && inSel(r)), 1).filter((r) => r.guest),
    dietWideCuisine: widened,
  };
}

function buildPlan(st) {
  const P = Math.max(totalPortions(st.members), 1);
  const scale = P / 4;
  const homeMembers = st.members.filter((m) => (m.morning || 'ev') === 'ev');
  const awayMembers = st.members.filter((m) => (m.morning || 'ev') !== 'ev');
  const awayCount = awayMembers.length;
  const homeP = homeMembers.reduce((s, m) => s + portionFactor(m.age, m.gender), 0);
  const homeScale = homeP / 4;
  const pools = poolsFor(st);
  const activeRules = MUST_RULES.filter((r) => st.mustRules.has(r.id));

  if (pools.dinners.length < 7) {
    return { error: 'Seçimlerinizle (mutfaklar + elemeler) 7 ayrı akşam yemeği kalmadı. Mutfak ekleyin veya bazı elemeleri kaldırın.' };
  }
  if (pools.breakfasts.length === 0 && homeP > 0) {
    return { error: 'Elemelerinizle uygun kahvaltı kalmadı. Lütfen bazı elemeleri kaldırın.' };
  }
  if (awayCount > 0 && pools.lunchboxes.length === 0) {
    return { error: 'Seçimlerinizle uygun beslenme çantası önerisi kalmadı. Lütfen bazı elemeleri kaldırın.' };
  }

  const mustFree = st.mustFree.trim().toLowerCase();
  const mustFreeOk = (r) => !mustFree || r.ingredients.some(([n]) => n.toLowerCase().includes(mustFree));
  const mustFreeCount = (pick) => pick.filter(mustFreeOk).length;

  /* Kahvaltı: evde kalanlar için — mutfak ağırlığına göre günlük seçim */
  const wOf = (r) => cuisineWeight(r.cuisine, st);
  let bCycle = [];
  if (homeP > 0) {
    for (let i = 0; i < 7; i++) bCycle.push(weightedPick(pools.breakfasts, wOf));
  }

  /* Beslenme çantası: iş/okul gidenler için */
  let lbCycle = [];
  if (awayCount > 0) {
    while (lbCycle.length < 7) lbCycle = lbCycle.concat(weightedSample(pools.lunchboxes, 7, wOf));
    lbCycle = lbCycle.slice(0, 7);
  }

  const mid = (st.budgetMin + st.budgetMax) / 2;
  let best = null;
  let relaxedBest = null;

  for (let iter = 0; iter < 600; iter++) {
    const pick = weightedSample(pools.dinners, 7, wOf);
    const ok = satisfiesRules(pick, activeRules);
    let dinnerCost = 0;
    pick.forEach((r) => { dinnerCost += recipeCost(r) * scale; });
    const total = dinnerCost
      + (homeP > 0 ? bCycle.reduce((s, r) => s + recipeCost(r), 0) * homeScale : 0)
      + (awayCount > 0 ? lbCycle.reduce((s, r) => s + recipeCost(r), 0) * awayCount : 0);
    const score =
      (mustFree ? Math.min(mustFreeCount(pick), 3) * 4 : 0) +
      new Set(pick.flatMap((r) => r.tags)).size +
      (ok ? 10 : 0) +
      (st.diet && st.diet.athlete
        ? Math.min(pick.filter((r) => r.tags.some((t) => PROTEIN_TAGS.includes(t))).length, 5) * 3 : 0) +
      (st.diet && st.diet.light
        ? Math.min(pick.filter((r) => r.tags.some((t) => LIGHT_TAGS.includes(t))).length, 4) * 3 : 0);
    const inRange = total >= st.budgetMin && total <= st.budgetMax;
    const cand = { pick, total, score, ok, distance: Math.abs(total - mid), _in: inRange };
    if (ok) {
      if (!best) best = cand;
      else if (inRange && !best._in) best = cand;
      else if (inRange === best._in && cand.distance < best.distance) best = cand;
    } else if (!relaxedBest || cand.distance < relaxedBest.distance) {
      relaxedBest = cand;
    }
  }

  let chosen = best || relaxedBest;

  /* Sürpriz mutfak: seçilmeyen mutfaklardan 1-2 akşam yemeği */
  const surprisePool = pools.otherDinners.filter((r) => r.cuisine !== 'mix');
  let surpriseDays = [];
  if (surprisePool.length > 0) {
    const nSurprise = Math.random() < 0.7 ? 1 : 2;
    const days = shuffle([0, 1, 2, 3, 4, 5, 6]).slice(0, nSurprise);
    for (const d of days) {
      for (let tryN = 0; tryN < 6; tryN++) {
        const cand = surprisePool[Math.floor(Math.random() * surprisePool.length)];
        if (cand.cuisine === chosen.pick[d].cuisine) continue;
        if (chosen.pick.some((p) => p.id === cand.id)) continue;
        const testPick = chosen.pick.map((r, i) => (i === d ? cand : r));
        if (activeRules.length && !satisfiesRules(testPick, activeRules)) continue;
        chosen.pick[d] = cand;
        surpriseDays.push({ day: d, cuisine: cand.cuisine });
        break;
      }
    }
  }

  const plan = DAY_NAMES.map((day, i) => ({
    day,
    breakfast: homeP > 0 ? bCycle[i] : null,
    lunchbox: awayCount > 0 ? lbCycle[i] : null,
    dinner: chosen.pick[i],
    surprise: surpriseDays.find((s) => s.day === i) || null,
  }));

  /* Toplamı final plandan taze hesapla */
  let total = 0;
  for (const d of plan) {
    if (d.breakfast) total += recipeCost(d.breakfast) * homeScale;
    if (d.lunchbox) total += recipeCost(d.lunchbox) * awayCount;
    total += recipeCost(d.dinner) * scale;
  }

  return {
    plan, scale, homeScale, awayCount, portions: P,
    total, budgetMin: st.budgetMin, budgetMax: st.budgetMax,
    rulesSatisfied: chosen.ok, relaxed: !best,
    mustFreeApplied: !!mustFree && mustFreeCount(chosen.pick) >= 2,
    mustFreeName: st.mustFree.trim(),
    proteinCount: chosen.pick.filter((r) => r.tags.some((t) => PROTEIN_TAGS.includes(t))).length,
    lightCount: chosen.pick.filter((r) => r.tags.some((t) => LIGHT_TAGS.includes(t))).length,
    pools,
  };
}

/* ---------- Alışveriş listesi ---------- */
function roundQty(qty, unit) {
  if (unit === 'g') return Math.max(10, Math.round(qty / 10) * 10);
  if (unit === 'adet') return Math.max(1, Math.round(qty));
  return Math.max(1, Math.round(qty));
}

function dinnerForDay(day, pr) {
  /* Misafir varsa misafir yemeği, yoksa normal akşam yemeği */
  const gCount = state.guests[day.day] || 0;
  if (gCount > 0 && state.guestRecipes[day.day]) {
    return { recipe: state.guestRecipes[day.day], scale: (pr.portions + gCount) / 4 };
  }
  return { recipe: day.dinner, scale: pr.scale };
}

function buildShoppingList(pr) {
  const totals = {};
  const add = (recipe, scale) => {
    for (const [name, qty, optional] of recipe.ingredients) {
      const ing = ING[name];
      if (!ing) continue;
      if (optional && ingAllergens(name).some((a) => state.allergens.has(a))) continue;
      if (!totals[name]) totals[name] = { qty: 0, unit: ing.unit, cat: ing.cat };
      totals[name].qty += qty * scale;
    }
  };
  for (const day of pr.plan) {
    if (day.breakfast) add(day.breakfast, pr.homeScale != null ? pr.homeScale : pr.scale);
    const dinner = dinnerForDay(day, pr);
    add(dinner.recipe, dinner.scale);
    if (day.lunchbox) add(day.lunchbox, pr.awayCount || 1);
    if (state.extras.lunches[day.day]) add(state.extras.lunches[day.day], pr.scale);
    if (state.extras.desserts[day.day]) add(state.extras.desserts[day.day], pr.scale);
  }
  const items = Object.entries(totals).map(([name, t]) => {
    const qty = roundQty(t.qty, t.unit);
    const best = bestStoreFor(name);
    return {
      name, qty, unit: t.unit, cat: t.cat,
      store: best.store, ppu: best.ppu, real: best.real, date: best.date,
      price: qty * best.ppu,
      checked: state.checked.has(name),
    };
  });
  items.sort((a, b) => a.store.localeCompare(b.store, 'tr') || a.cat.localeCompare(b.cat, 'tr') || a.name.localeCompare(b.name, 'tr'));

  const byStore = {};
  for (const it of items) (byStore[it.store] = byStore[it.store] || []).push(it);
  const grandTotal = items.reduce((s, i) => s + i.price, 0);
  const realCount = items.filter((i) => i.real).length;
  const storeTotals = {};
  for (const [store, storeItems] of Object.entries(byStore)) {
    storeTotals[store] = storeItems.reduce((s, i) => s + i.price, 0);
  }
  return { items, byStore, grandTotal, storeTotals, realCount };
}

/* ---------- Biçimlendirme ---------- */
const fmtEur = (v) => v.toFixed(2).replace('.', state.lang === 'en' ? '.' : ',') + ' €';
const fmtNum = (v) => v.toFixed(1).replace('.', state.lang === 'en' ? '.' : ',');
/* Porsiyon gibi değerler için: 2,15 olduğu gibi, 3,0 tek ondalıkla gösterilir */
const fmtPortion = (v) => {
  const two = v.toFixed(2);
  const s = two.endsWith('0') ? v.toFixed(1) : two;
  return s.replace('.', state.lang === 'en' ? '.' : ',');
};
const fmtQty = (it) => {
  if (it.unit === 'adet') return `${it.qty} ${tUnit('adet')}`;
  if (it.unit === 'g') return `${it.qty} g`;
  if (it.unit === 'tutam') return `${it.qty} ${tUnit('tutam')}`;
  return `${it.qty} ${tUnit('tk')}`;
};
const TR_MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
function fmtDate(ym) {
  if (!ym || ym.length < 7) return '';
  const [y, m] = ym.split('-');
  const d = i18nDict();
  const months = d && d.months ? d.months : TR_MONTHS;
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}
const cuisineName = (id) => tCuisine(id).name;
const displayName = (recipe) => {
  const name = tName(recipe);
  if (!state.allergens.has('gluten')) return name;
  const optBread = recipe.ingredients.some(([n, , opt]) => opt && /ekmek/i.test(n));
  return optBread ? name.replace(/\s*\+\s*(Ekmek|Brot|Bread)$/i, '') : name;
};

/* =========================================================
   UYGULAMA DURUMU & ARAYÜZ
   ========================================================= */
const state = {
  lang: (() => {
    try { return (langStore() && langStore().getItem('mp-lang')) || 'tr'; } catch (e) { return 'tr'; }
  })(),
  cuisines: new Set(['tr']),
  cuisineWeights: { tr: 5 },
  diet: { style: 'normal', halal: false, athlete: false, light: false },
  members: [
    { age: 35, gender: 'e', morning: 'ev' },
    { age: 33, gender: 'k', morning: 'ev' },
  ],
  budgetMin: 45,
  budgetMax: 90,
  allergens: new Set(),
  dislikes: new Set(),
  excludeFree: [],
  mustRules: new Set(['baklagil2', 'corba1']),
  mustFree: '',
  guests: {},          /* { günAdı: misafirSayısı } */
  guestRecipes: {},    /* { günAdı: tarif } */
  extras: { lunches: {}, desserts: {} },
  checked: new Set(),
  pantry: new Set(),
  planResult: null,
  shopping: null,
  view: 'home',
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
  t._h = setTimeout(() => { t.hidden = true; }, 3600);
}

/* ---------- Görünüm yönetimi ---------- */
function showView(name) {
  state.view = name;
  ['home', 'plan', 'fridge', 'special'].forEach((v) => {
    $(`#view-${v}`).hidden = v !== name;
  });
  document.querySelectorAll('#header-nav .nav-tab').forEach((t) => {
    t.classList.toggle('is-active', t.dataset.view === name);
  });
  window.scrollTo({ top: 0 });
}

/* ---------- Dil değiştirme ---------- */
function renderLangSwitch() {
  const box = $('#lang-switch');
  if (!box) return;
  box.innerHTML = '';
  LANGS.forEach((lg) => {
    const b = el('button', 'lang-btn' + (state.lang === lg ? ' is-active' : ''), lg.toUpperCase());
    b.type = 'button';
    b.setAttribute('data-testid', `button-lang-${lg}`);
    b.setAttribute('aria-pressed', state.lang === lg ? 'true' : 'false');
    b.addEventListener('click', () => setLang(lg));
    box.appendChild(b);
  });
}
function setLang(lang) {
  if (!LANGS.includes(lang) || lang === state.lang) return;
  state.lang = lang;
  try { if (langStore()) langStore().setItem('mp-lang', lang); } catch (e) { /* yoksay */ }
  applyStaticI18n();
  renderLangSwitch();
  renderCuisines();
  renderDiet();
  renderMembers();
  renderAllChips();
  renderFridgeDatalist();
  renderFridgeChips();
  renderSpecials();
  if (state.planResult) renderResults();
  if (state.pantry.size > 0) suggestFromPantry();
}

/* ---------- Mutfak kartları (çoklu seçim) ---------- */
function renderCuisines() {
  const grid = $('#cuisine-grid');
  grid.innerHTML = '';
  CUISINES.filter((c) => c.id !== 'mix').forEach((c) => {
    const on = state.cuisines.has(c.id);
    const w = (state.cuisineWeights[c.id] || 3);
    const ci = tCuisine(c.id);
    const card = el('button', 'cuisine-card' + (on ? ' is-selected' : ''));
    card.type = 'button';
    card.setAttribute('aria-pressed', on ? 'true' : 'false');
    card.setAttribute('data-testid', `card-cuisine-${c.id}`);
    card.innerHTML = `<span class="cuisine-name">${ci.name}</span><span class="cuisine-desc">${ci.desc}</span>`;
    if (on) {
      const wRow = el('div', 'weight-row');
      wRow.setAttribute('role', 'group');
      wRow.setAttribute('aria-label', `${t('Ağırlık')}: ${ci.name}`);
      for (let n = 1; n <= 5; n++) {
        const pip = el('span', 'weight-pip' + (w >= n ? ' is-on' : ''));
        pip.setAttribute('role', 'button');
        pip.setAttribute('tabindex', '0');
        pip.setAttribute('data-testid', `button-weight-${c.id}-${n}`);
        pip.setAttribute('aria-label', `${t('Ağırlık')} ${n}/5`);
        const setW = (e) => {
          e.stopPropagation();
          state.cuisineWeights[c.id] = n;
          renderCuisines();
        };
        pip.addEventListener('click', setW);
        pip.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setW(e); } });
        wRow.appendChild(pip);
      }
      card.appendChild(wRow);
    }
    card.addEventListener('click', () => {
      if (state.cuisines.has(c.id)) {
        state.cuisines.delete(c.id);
        delete state.cuisineWeights[c.id];
      } else {
        state.cuisines.add(c.id);
        if (!state.cuisineWeights[c.id]) state.cuisineWeights[c.id] = 3;
      }
      renderCuisines();
    });
    grid.appendChild(card);
  });
}

/* ---------- Beslenme tercihi ---------- */
function dietExtraOptions() {
  return [
    ['halal', t('Helal (domuz ürünleri hariç)')],
    ['athlete', t('Sporcu (protein ağırlıklı)')],
    ['light', t('Diyet (hafif yemekler öncelikli)')],
  ];
}

const DIET_STYLE_LABELS = { normal: 'Hepçil', veg: 'Vejetaryen', vegan: 'Vegan' };
function renderDiet() {
  const group = $('#diet-style-group');
  group.querySelectorAll('button').forEach((b) => {
    b.setAttribute('aria-checked', String(state.diet.style === b.dataset.dietStyle));
    b.classList.toggle('is-active', state.diet.style === b.dataset.dietStyle);
    b.textContent = t(DIET_STYLE_LABELS[b.dataset.dietStyle]);
    b.onclick = () => { state.diet.style = b.dataset.dietStyle; renderDiet(); };
  });
  renderChips('#diet-chips', dietExtraOptions(), new Set(Object.keys(state.diet).filter((k) => k !== 'style' && state.diet[k])), (v) => {
    state.diet[v] = !state.diet[v];
    renderDiet();
  });
}

/* ---------- Üye listesi ---------- */
function renderMembers() {
  const list = $('#members-list');
  list.innerHTML = '';
  state.members.forEach((m, idx) => {
    const row = el('div', 'member-row');
    const ageField = el('label', 'field');
    ageField.innerHTML = `<span>${t('Yaş')}</span>`;
    const ageInput = el('input');
    ageInput.type = 'number'; ageInput.min = 0; ageInput.max = 110; ageInput.value = m.age;
    ageInput.setAttribute('data-testid', `input-age-${idx}`);
    ageInput.setAttribute('aria-label', `${idx + 1}. ${t('kişinin yaşı')}`);
    ageInput.addEventListener('input', () => { m.age = parseInt(ageInput.value, 10) || 0; updatePortionNote(); });
    ageField.appendChild(ageInput);

    const gField = el('label', 'field');
    gField.innerHTML = `<span>${t('Cinsiyet')}</span>`;
    const gSel = el('select');
    gSel.setAttribute('data-testid', `select-gender-${idx}`);
    gSel.setAttribute('aria-label', `${idx + 1}. ${t('kişinin cinsiyeti')}`);
    gSel.innerHTML = `<option value="k"${m.gender === 'k' ? ' selected' : ''}>${t('Kadın')}</option><option value="e"${m.gender === 'e' ? ' selected' : ''}>${t('Erkek')}</option>`;
    gSel.addEventListener('change', () => { m.gender = gSel.value; updatePortionNote(); });
    gField.appendChild(gSel);

    const mField = el('label', 'field field-morning');
    mField.innerHTML = `<span>${t('Sabah programı')}</span>`;
    const mSel = el('select');
    mSel.setAttribute('data-testid', `select-morning-${idx}`);
    mSel.setAttribute('aria-label', `${idx + 1}. ${t('kişinin sabah programı')}`);
    const mVal = m.morning || 'ev';
    mSel.innerHTML = `
      <option value="ev"${mVal === 'ev' ? ' selected' : ''}>${t('Evde kahvaltı')}</option>
      <option value="is"${mVal === 'is' ? ' selected' : ''}>${t('İş — beslenme')}</option>
      <option value="okul"${mVal === 'okul' ? ' selected' : ''}>${t('Okul — beslenme')}</option>`;
    mSel.addEventListener('change', () => { m.morning = mSel.value; updatePortionNote(); });
    mField.appendChild(mSel);

    const rm = el('button', 'btn btn-remove', t('Kaldır'));
    rm.type = 'button';
    rm.setAttribute('data-testid', `button-remove-member-${idx}`);
    rm.setAttribute('aria-label', `${idx + 1}. ${t('kişiyi kaldır')}`);
    rm.addEventListener('click', () => {
      if (state.members.length <= 1) { toast(t('En az bir kişi gerekli.')); return; }
      state.members.splice(idx, 1);
      renderMembers();
    });

    row.append(ageField, gField, mField, rm);
    list.appendChild(row);
  });
  updatePortionNote();
}

function updatePortionNote() {
  const p = totalPortions(state.members);
  $('#portion-note').textContent =
    `${t('Hane toplamı')}: ${fmtPortion(p)} ${t('porsiyon')} · ${t('yetişkin kadın = 1,0')} · ${t('yetişkin erkek = 1,15')} · ${t('çocuklar yaşa göre daha az')}. ${t('Malzeme miktarları buna göre otomatik ölçeklenir.')}`;
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
  renderChips('#allergen-chips', ALLERGEN_OPTIONS.map((a) => {
    const [val, label] = Array.isArray(a) ? a : [a, a];
    return [val, tAllergen(label)];
  }), state.allergens, (v) => {
    state.allergens.has(v) ? state.allergens.delete(v) : state.allergens.add(v);
    renderAllChips();
  }, true);
  renderChips('#dislike-chips', DISLIKE_OPTIONS.map((d) => [d, tIng(d)]), state.dislikes, (v) => {
    state.dislikes.has(v) ? state.dislikes.delete(v) : state.dislikes.add(v);
    renderAllChips();
  }, true);
  renderChips('#must-chips', MUST_RULES.map((r) => [r.id, tMust(r.id)]), state.mustRules, (v) => {
    state.mustRules.has(v) ? state.mustRules.delete(v) : state.mustRules.add(v);
    renderAllChips();
  }, false);
}

/* ---------- Plan üretimi ---------- */
function generateAndShow() {
  if (state.cuisines.size === 0) { toast(t('En az bir mutfak seçin.')); return; }
  const mn = parseFloat($('#budget-min').value);
  const mx = parseFloat($('#budget-max').value);
  if (!(mn >= 10 && mx >= 10 && mn <= mx)) { toast(t('Geçerli bir bütçe aralığı girin (alt ≤ üst).')); return; }
  state.budgetMin = mn; state.budgetMax = mx;
  state.excludeFree = $('#exclude-free').value.split(',').map((s) => s.trim()).filter(Boolean);
  state.mustFree = $('#must-free').value;
  state.guests = {};
  state.guestRecipes = {};
  state.checked = new Set();
  state.extras = { lunches: {}, desserts: {} };

  const result = buildPlan(state);
  if (result.error) { toast(t(result.error)); return; }
  state.planResult = result;
  renderResults();
  $('[data-view="plan"]').hidden = false;
  showView('plan');
  switchTab('plan');
  if (!result.rulesSatisfied) {
    toast(t('Not: Seçimlerinizle tüm şartlar aynı anda karşılanamadı; en yakın plan oluşturuldu.'));
  }
}

function currentTotal() {
  const pr = state.planResult;
  if (!pr) return 0;
  let t = 0;
  for (const day of pr.plan) {
    if (day.breakfast) t += recipeCost(day.breakfast) * pr.homeScale;
    if (day.lunchbox) t += recipeCost(day.lunchbox) * (pr.awayCount || 1);
    const dinner = dinnerForDay(day, pr);
    t += recipeCost(dinner.recipe) * dinner.scale;
    if (state.extras.lunches[day.day]) t += recipeCost(state.extras.lunches[day.day]) * pr.scale;
    if (state.extras.desserts[day.day]) t += recipeCost(state.extras.desserts[day.day]) * pr.scale;
  }
  return t;
}

function tagPill(tag) {
  const labels = {
    vegan: 'Vegan', vejetaryen: 'Vejetaryen', balik: 'Balık', pratik: 'Pratik', corba: 'Çorba',
    baklagil: 'Baklagil', tahil: 'Pilav/Bulgur', makarna: 'Makarna', etli: 'Etli', tavuk: 'Tavuk',
    sebze: 'Sebze', misafir: 'Misafir', firin: 'Fırın', ozel: 'Özel',
  };
  const label = tTag(tag) || labels[tag];
  return label ? `<span class="tag t-${tag}">${label}</span>` : '';
}

function renderResults() {
  const r = state.planResult;
  if (!r) return;
  state.shopping = buildShoppingList(r);
  const s = state.shopping;
  const total = currentTotal();
  const selNames = [...state.cuisines].map((id) => `${cuisineName(id)} ×${state.cuisineWeights[id] || 3}`).join(' + ');

  const awayLine = r.awayCount > 0 ? ` · ${r.awayCount} ${t('kişi için günlük beslenme çantası')}` : '';
  $('#results-summary').innerHTML = `
    <h2>${t('Haftalık planınız hazır')}</h2>
    <p>${selNames} · ${state.members.length} ${t('kişi')} · ${fmtPortion(r.portions)} ${t('porsiyon')}${awayLine} ·
    ${t('haftalık tüketim maliyeti')} <strong>${fmtEur(total)}</strong>
    (${t('bütçe aralığınız')} ${fmtEur(r.budgetMin)} – ${fmtEur(r.budgetMax)}) ·
    ${t('tam paket alımlarıyla alışveriş sepeti')} ${fmtEur(s.grandTotal)}</p>`;

  /* ---------- PLAN PANELİ ---------- */
  const planPanel = $('#panel-plan');
  planPanel.innerHTML = '';

  const barWrap = el('div', 'budget-bar-wrap');
  const spanMax = Math.max(r.budgetMax * 1.12, total * 1.05);
  const bandL = (r.budgetMin / spanMax) * 100;
  const bandR = (r.budgetMax / spanMax) * 100;
  const fillW = Math.min(100, (total / spanMax) * 100);
  barWrap.innerHTML = `
    <div class="budget-bar-top">
      <span class="budget-total">${fmtEur(total)}</span>
      <span class="budget-range">${t('Bütçe aralığı:')} ${fmtEur(r.budgetMin)} – ${fmtEur(r.budgetMax)} · ${t('misafir, öğle ve tatlı eklemeleri dahil')}</span>
    </div>
    <div class="budget-track" role="img" aria-label="${fmtEur(total)}">
      <div class="budget-range-band" style="left:${bandL}%; width:${Math.max(bandR - bandL, 0.5)}%"></div>
      <div class="budget-fill" style="width:${fillW}%"></div>
    </div>`;
  planPanel.appendChild(barWrap);

  const notes = [];
  if (r.mustFreeApplied) notes.push(tFmt('"{x}" içeren en az 2 yemek plana alındı.', { x: r.mustFreeName }));
  if (!r.rulesSatisfied) notes.push(t('Bazı şartlar eleme kurallarıyla çakıştığı için uygulanamadı.'));
  if (state.diet.style === 'vegan') notes.push(t('Vegan seçim: tüm tarifler bitkisel.'));
  if (state.diet.style === 'veg') notes.push(t('Vejetaryen seçim: et ve balık içeren tarifler çıkarıldı.'));
  if (state.diet.halal) notes.push(t('Helal seçim: domuz ürünleri (jambon, speck, bratwurst) içeren tarifler çıkarıldı.'));
  if (state.diet.athlete) notes.push(tFmt('Sporcu modu: haftanın {n} akşam yemeği protein ağırlıklı (et, tavuk, balık, baklagil).', { n: r.proteinCount }));
  if (state.diet.light) notes.push(tFmt('Diyet modu: haftanın {n} akşam yemeği hafif (sebze, çorba, balık) ağırlıklı.', { n: r.lightCount }));
  if (r.pools && r.pools.dietWideCuisine) notes.push(t('Seçili mutfakta yeterli uygun tarif olmadığı için tüm mutfaklardan seçim yapıldı.'));
  if (notes.length) planPanel.appendChild(el('p', 'step-hint', notes.join(' ')));

  const grid = el('div', 'week-grid');
  r.plan.forEach((day, i) => {
    const bScale = r.homeScale != null ? r.homeScale : r.scale;
    const bCost = day.breakfast ? recipeCost(day.breakfast) * bScale : 0;
    const lbCost = day.lunchbox ? recipeCost(day.lunchbox) * (r.awayCount || 1) : 0;
    const dinner = dinnerForDay(day, r);
    const dCost = recipeCost(dinner.recipe) * dinner.scale;
    const lCost = state.extras.lunches[day.day] ? recipeCost(state.extras.lunches[day.day]) * r.scale : 0;
    const dsCost = state.extras.desserts[day.day] ? recipeCost(state.extras.desserts[day.day]) * r.scale : 0;
    const gCount = state.guests[day.day] || 0;

    const card = el('div', 'day-card');
    card.setAttribute('data-testid', `card-day-${i}`);
    card.innerHTML = `
      <div class="day-card-head">
        <span class="day-name">${tDay(day.day)}${gCount > 0 ? ` <span class="guest-badge">${t('misafirli')} (${gCount})</span>` : ''}</span>
        <span class="day-cost">${fmtEur(bCost + dCost + lCost + dsCost + lbCost)}</span>
      </div>`;

    const mkMeal = (label, meal, cls, extraBadge) => {
      const slot = el('div', 'meal-slot');
      const lab = el('span', 'meal-label', label);
      const btn = el('button', `meal-card ${cls}`);
      btn.type = 'button';
      btn.setAttribute('data-testid', `button-meal-${i}-${label}`);
      const perServing = meal.meal === 'lunchbox'
        ? `${fmtEur(recipeCost(meal))}${t('/kişi')}`
        : `${fmtEur(recipeCost(meal) / meal.serves)}${t('/porsiyon')}`;
      btn.innerHTML = `
        <span class="meal-name">${displayName(meal)}${extraBadge || ''}</span>
        <span class="meal-meta">${meal.time} ${t('dk')} · ${perServing}</span>`;
      btn.addEventListener('click', () => openModal(meal, { day: day.day, scale: dinner.scale }));
      slot.append(lab, btn);
      return slot;
    };

    if (day.breakfast) card.appendChild(mkMeal(t('Kahvaltı'), day.breakfast, 'is-breakfast'));
    if (day.lunchbox) card.appendChild(mkMeal(t('Beslenme (iş/okul)'), day.lunchbox, 'is-lunchbox'));
    const surpriseBadge = day.surprise ? `<span class="surprise-badge">${cuisineName(day.surprise.cuisine)}</span>` : '';
    card.appendChild(mkMeal(t('Akşam'), dinner.recipe, 'is-dinner', surpriseBadge));

    if (state.extras.lunches[day.day]) {
      card.appendChild(mkMeal(t('Öğle'), state.extras.lunches[day.day], 'is-lunch'));
    }
    if (state.extras.desserts[day.day]) {
      card.appendChild(mkMeal(t('Tatlı'), state.extras.desserts[day.day], 'is-dessert'));
    }

    /* Gün bazlı ekleme düğmeleri */
    const extraRow = el('div', 'extra-row');
    const lunchBtn = el('button', 'btn btn-ghost btn-sm', state.extras.lunches[day.day] ? t('Öğle kaldır') : t('+ Öğle'));
    lunchBtn.type = 'button';
    lunchBtn.setAttribute('data-testid', `button-lunch-${i}`);
    lunchBtn.addEventListener('click', () => toggleExtra('lunches', day.day));
    const dessertBtn = el('button', 'btn btn-ghost btn-sm', state.extras.desserts[day.day] ? t('Tatlı kaldır') : t('+ Tatlı'));
    dessertBtn.type = 'button';
    dessertBtn.setAttribute('data-testid', `button-dessert-${i}`);
    dessertBtn.addEventListener('click', () => toggleExtra('desserts', day.day));
    extraRow.append(lunchBtn, dessertBtn);
    if (gCount === 0) {
      const guestBtn = el('button', 'btn btn-ghost btn-sm', t('+ Misafir'));
      guestBtn.type = 'button';
      guestBtn.setAttribute('data-testid', `button-guest-${i}`);
      guestBtn.addEventListener('click', () => toggleGuest(day.day));
      extraRow.appendChild(guestBtn);
    } else {
      const stepper = el('div', 'guest-stepper');
      stepper.setAttribute('data-testid', `guest-stepper-${i}`);
      const dec = el('button', 'btn btn-ghost btn-sm', '−');
      dec.type = 'button';
      dec.setAttribute('aria-label', t('Misafir azalt'));
      const cnt = el('span', 'guest-count', `${gCount} ${t('misafir')}`);
      const inc = el('button', 'btn btn-ghost btn-sm', '+');
      inc.type = 'button';
      inc.setAttribute('aria-label', t('Misafir artır'));
      const off = el('button', 'btn btn-ghost btn-sm', t('Misafir kaldır'));
      off.type = 'button';
      dec.addEventListener('click', () => adjustGuest(day.day, -1));
      inc.addEventListener('click', () => adjustGuest(day.day, 1));
      off.addEventListener('click', () => toggleGuest(day.day));
      stepper.append(dec, cnt, inc, off);
      extraRow.appendChild(stepper);
    }
    card.appendChild(extraRow);

    grid.appendChild(card);
  });
  planPanel.appendChild(grid);

  /* ---------- ALIŞVERİŞ PANELİ ---------- */
  const shopPanel = $('#panel-shopping');
  shopPanel.innerHTML = '';
  const storeOrder = STORE_LIST.filter((st) => s.byStore[st]);
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
      <span class="store-sub">${storeItems.length} ${t('ürün')}</span>
      <span class="store-total">${fmtEur(s.storeTotals[store])}</span>`;
    const body = el('div', 'store-body');
    storeItems.forEach((it) => {
      const row = el('div', 'shop-item' + (it.checked ? ' is-checked' : ''));
      row.setAttribute('data-testid', `row-item-${it.name}`);
      const id = `chk-${it.name.replace(/\s+/g, '-')}`;
      row.innerHTML = `
        <label for="${id}">
          <input type="checkbox" id="${id}"${it.checked ? ' checked' : ''}>
          <span class="shop-item-name">${tIng(it.name)}<span class="shop-item-qty"> — ${fmtQty(it)}</span></span>
        </label>
        <span class="shop-item-meta">${it.real ? `<span class="price-badge is-real" title="${t('Open Prices topluluk verisi, ')}${fmtDate(it.date)}">${t('gerçek')} ${fmtDate(it.date)}</span>` : `<span class="price-badge">${t('tahmini')}</span>`}</span>
        <span class="shop-item-price">${fmtEur(it.price)}</span>`;
      const chk = row.querySelector('input');
      chk.addEventListener('change', () => {
        chk.checked ? state.checked.add(it.name) : state.checked.delete(it.name);
        row.classList.toggle('is-checked', chk.checked);
      });
      body.appendChild(row);
    });
    head.addEventListener('click', () => {
      const open = body.hidden;
      body.hidden = !open;
      head.setAttribute('aria-expanded', String(open));
    });
    sec.append(head, body);
    shopPanel.appendChild(sec);
  }
  const realPct = s.items.length ? Math.round((s.realCount / s.items.length) * 100) : 0;
  shopPanel.appendChild(el('p', 'shopping-footnote',
    tFmt('Sepet tutarı: {v} (tam paket/gramaj yuvarlamasıyla — tüketim maliyeti bundan düşüktür) · Kalemlerin %{p}si gerçek market fiyatları (Open Prices topluluk verisi, son 12 ay medyanı), kalanı tahmini. Mağazaya ve sezona göre değişebilir.', { v: fmtEur(s.grandTotal), p: realPct })));

  /* ---------- KARŞILAŞTIRMA PANELİ ---------- */
  const cmpPanel = $('#panel-compare');
  cmpPanel.innerHTML = '';
  cmpPanel.appendChild(el('p', 'compare-note',
    t('Aynı sepetin tamamı tek bir markette alınırsa tahmini maliyeti aşağıda. "En uygun" market tek seferde her şeyi almak isteyenler için. Alışveriş listesinde her kalem, gerçek fiyatı olan marketten seçilir.')));
  const rows = STORE_LIST
    .map((store) => {
      let tot = 0, realN = 0;
      for (const it of s.items) {
        const p = unitPrice(it.name, store);
        tot += p.ppu * it.qty;
        if (p.real) realN++;
      }
      return { store, total: tot, realN };
    })
    .sort((a, b) => a.total - b.total);
  const bestStore = rows[0].store;
  const wrap = el('div', 'compare-wrap');
  const table = el('table', 'compare-table');
  table.setAttribute('data-testid', 'table-compare');
  table.innerHTML = `
    <thead><tr><th>${t('Market')}</th><th>${t('Tahmini sepet')}</th><th>${t('Gerçek fiyat')}</th><th>${t('Fark')}</th></tr></thead>
    <tbody>${rows.map((row) => `
      <tr${row.store === bestStore ? ' class="is-best"' : ''}>
        <td>${row.store}${row.store === bestStore ? `<span class="badge-best">${t('En uygun')}</span>` : ''}</td>
        <td>${fmtEur(row.total)}</td>
        <td>${row.realN}/${s.items.length} ${t('kalem')}</td>
        <td>${row.store === bestStore ? '—' : '+' + fmtEur(row.total - rows[0].total)}</td>
      </tr>`).join('')}</tbody>`;
  wrap.appendChild(table);
  cmpPanel.appendChild(wrap);
  cmpPanel.appendChild(el('p', 'shopping-footnote',
    t("Gerçek fiyatlar Open Prices (prices.openfoodfacts.org) topluluk verilerinden; 2025 başından bu yana Almanya'da kaydedilmiş fiyatların market bazındaki medyanıdır.")));
}

/* ---------- Öğle / tatlı ekleme ---------- */
function toggleExtra(kind, dayName) {
  const pr = state.planResult;
  if (state.extras[kind][dayName]) {
    delete state.extras[kind][dayName];
    renderResults();
    return;
  }
  const pool = kind === 'lunches' ? pr.pools.lunches : pr.pools.desserts;
  if (!pool.length) {
    toast(kind === 'lunches' ? t('Seçimlerinizle uygun öğle yemeği kalmadı (eleme çok kısıtlayıcı).') : t('Seçimlerinizle uygun tatlı kalmadı.'));
    return;
  }
  const used = Object.values(state.extras[kind]);
  let candidates = pool.filter((r) => !used.includes(r));
  if (!candidates.length) candidates = pool;
  state.extras[kind][dayName] = weightedPick(candidates, (x) => cuisineWeight(x.cuisine, state));
  renderResults();
}

/* ---------- Misafir (gün bazlı) ---------- */
function toggleGuest(dayName) {
  const pr = state.planResult;
  if (state.guests[dayName]) {
    delete state.guests[dayName];
    delete state.guestRecipes[dayName];
  } else {
    state.guests[dayName] = 2;
    const pool = pr.pools.guests.length ? pr.pools.guests : pr.pools.dinners;
    const used = Object.values(state.guestRecipes);
    let candidates = pool.filter((r) => !used.includes(r));
    if (!candidates.length) candidates = pool;
    state.guestRecipes[dayName] = weightedPick(candidates, (x) => cuisineWeight(x.cuisine, state));
    toast(`${tDay(dayName)}: ${t('Misafir menüsü eklendi. Malzemeler otomatik artırılır.')}`);
  }
  renderResults();
}
function adjustGuest(dayName, delta) {
  const cur = state.guests[dayName] || 0;
  const next = Math.min(12, Math.max(1, cur + delta));
  state.guests[dayName] = next;
  renderResults();
}

/* ---------- Sekmeler ---------- */
function switchTab(name) {
  document.querySelectorAll('.plan-tabs .nav-tab').forEach((t) => t.classList.toggle('is-active', t.dataset.resultsTab === name));
  document.querySelectorAll('.results-tab').forEach((p) => { p.hidden = p.dataset.resultsPanel !== name; });
}

/* ---------- Tarif modalı ---------- */
function openModal(recipe, ctx) {
  const r = state.planResult;
  const isLb = recipe.meal === 'lunchbox';
  const isSpecial = recipe.meal === 'special';
  const scale = isLb ? 1 : (ctx && ctx.scale ? ctx.scale : (r ? r.scale : 1));
  const cost = recipeCost(recipe) * (isLb ? (r && r.awayCount) || 1 : scale);
  const perLabel = isSpecial ? `${fmtEur(recipeCost(recipe))} ${t('(4 kişilik)')}`
    : isLb ? `${fmtEur(recipeCost(recipe))}${t('/kişi')}`
    : `${fmtEur(recipeCost(recipe) / recipe.serves)}${t('/porsiyon')}`;
  const modal = $('#modal-inner');
  modal.innerHTML = `
    <button type="button" class="modal-close" data-testid="button-modal-close" aria-label="${t('Kapat')}">${t('Kapat')} ✕</button>
    <h3 id="modal-title">${displayName(recipe)}</h3>
    <p class="modal-sub">${tMealLabel(recipe.meal)} · ${cuisineName(recipe.cuisine)} · ${recipe.time} ${t('dk')} · ${perLabel}${isSpecial ? '' : ` · ${t('hane için:')} ${fmtEur(cost)}`}</p>
    <div class="tag-row">${recipe.tags.filter((t) => !['kahvalti', 'lunch'].includes(t)).map(tagPill).join('')}</div>
    <h4>${isLb ? t('Malzemeler (kişi başı)') : isSpecial ? t('Malzemeler') : t('Malzemeler (haneye göre ölçekli)')}</h4>
    <ul class="ingredients">${recipe.ingredients.map(([name, qty]) => {
      const ing = ING[name];
      const q = roundQty(qty * (isSpecial ? 1 : scale), ing.unit);
      const unit = ing.unit === 'g' ? 'g' : tUnit(ing.unit);
      return `<li><span>${tIng(name)}</span><span>${q} ${unit}</span></li>`;
    }).join('')}</ul>
    <h4>${t('Hazırlanışı')}</h4>
    <ol class="steps">${tSteps(recipe).map((s) => `<li>${s}</li>`).join('')}</ol>`;
  $('#modal').hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
}
function closeModal() {
  $('#modal').hidden = true;
  document.body.style.overflow = '';
}

/* =========================================================
   DOLAPTAN YEMEK
   ========================================================= */
function renderFridgeDatalist() {
  const dl = $('#fridge-datalist');
  dl.innerHTML = Object.keys(ING)
    .sort((a, b) => a.localeCompare(b, 'tr'))
    .map((n) => `<option value="${n}">`).join('');
}

function renderFridgeChips() {
  const c = $('#fridge-chips');
  c.innerHTML = '';
  state.pantry.forEach((name) => {
    const chip = el('button', 'chip is-on', `${tIng(name)} ✕`);
    chip.type = 'button';
    chip.setAttribute('data-testid', `chip-pantry-${name}`);
    chip.setAttribute('aria-label', `${tIng(name)} ${t('çıkar')}`);
    chip.addEventListener('click', () => {
      state.pantry.delete(name);
      renderFridgeChips();
      if ($('#fridge-results').children.length) suggestFromPantry();
    });
    c.appendChild(chip);
  });
}

function addPantryItem() {
  const input = $('#fridge-input');
  const raw = input.value.trim().toLowerCase();
  if (!raw) { suggestFromPantry(); return; }
  /* En yakın malzeme adını bul (tam eşleşme veya başlangıç) */
  const names = Object.keys(ING);
  let match = names.find((n) => n.toLowerCase() === raw)
    || names.find((n) => n.toLowerCase().startsWith(raw))
    || names.find((n) => n.toLowerCase().includes(raw));
  if (!match) { toast(tFmt('"{x}" malzeme listesinde yok. Listeden seçmeyi deneyin.', { x: raw })); return; }
  state.pantry.add(match);
  input.value = '';
  renderFridgeChips();
}

function suggestFromPantry() {
  const out = $('#fridge-results');
  out.innerHTML = '';
  if (state.pantry.size === 0) {
    out.appendChild(el('p', 'step-hint', t('Önce dolabınızdaki birkaç malzemeyi ekleyin.')));
    return;
  }
  const candidates = RECIPES
    .filter((r) => ['dinner', 'breakfast', 'lunch', 'dessert', 'lunchbox'].includes(r.meal))
    .filter((r) => !recipeExcluded(r, state))
    .map((r) => {
      const req = r.ingredients.filter(([n, , opt]) => !opt);
      const matched = req.filter(([n]) => state.pantry.has(n));
      const missing = req.filter(([n]) => !state.pantry.has(n));
      return { r, total: req.length, matched: matched.length, missing };
    })
    /* Yaratıcı mod: az malzemeyle bile niş tarifler — eşik düşük,
       küçük tarifler (az zorunlu malzeme) tam eşleşmede öne çıkar */
    .filter((c) => c.matched > 0 && (c.matched / c.total >= 0.2 || c.total <= 5))
    .sort((a, b) => {
      const sa = (a.matched / a.total) * 10 + (a.total <= 4 ? 1.5 : 0) + a.matched * 0.15;
      const sb = (b.matched / b.total) * 10 + (b.total <= 4 ? 1.5 : 0) + b.matched * 0.15;
      return sb - sa || a.missing.length - b.missing.length;
    })
    .slice(0, 16);

  if (!candidates.length) {
    out.appendChild(el('p', 'step-hint', t('Bu malzemelerle uygun bir tarif bulunamadı. Birkaç malzeme daha eklemeyi deneyin.')));
    return;
  }

  const head = el('h3', 'fridge-results-title', tFmt('Dolabınıza göre {n} öneri', { n: candidates.length }));
  out.appendChild(head);

  const grid = el('div', 'fridge-grid');
  candidates.forEach((c, i) => {
    const missingCost = c.missing.reduce((s, [n, q]) => s + bestStoreFor(n).ppu * q, 0);
    const card = el('div', 'fridge-card');
    card.setAttribute('data-testid', `card-fridge-${i}`);
    card.innerHTML = `
      <div class="fridge-card-head">
        <span class="meal-name">${displayName(c.r)}</span>
        <span class="surprise-badge">${cuisineName(c.r.cuisine)}</span>
      </div>
      <span class="meal-meta">${tMealLabel(c.r.meal)} · ${c.r.time} ${t('dk')} · ${c.matched}/${c.total} ${t('malzeme dolapta')}</span>
      <div class="missing-box">
        <span class="missing-title">${c.missing.length === 0 ? t('Her şey dolapta') : t('Eksik:')}</span>
        ${c.missing.length ? `<span class="missing-list">${c.missing.map(([n]) => tIng(n)).join(', ')}</span><span class="missing-cost">~${fmtEur(missingCost)}</span>` : ''}
      </div>
      <button type="button" class="btn btn-outline btn-sm" data-testid="button-fridge-recipe-${i}">${t('Tarifi gör')}</button>`;
    card.querySelector('button').addEventListener('click', () => openModal(c.r, { scale: 1 }));
    grid.appendChild(card);
  });
  out.appendChild(grid);
}

/* =========================================================
   ÖZEL TARİFLER
   ========================================================= */
function renderSpecials() {
  const grid = $('#special-grid');
  grid.innerHTML = '';
  RECIPES.filter((r) => r.meal === 'special').forEach((r, i) => {
    const card = el('div', 'special-card');
    card.setAttribute('data-testid', `card-special-${i}`);
    card.innerHTML = `
      <div class="fridge-card-head">
        <span class="meal-name">${tName(r)}</span>
        <span class="surprise-badge">${cuisineName(r.cuisine)}</span>
      </div>
      <span class="meal-meta">${r.time} ${t('dk')} · ${r.tags.filter((t) => t !== 'ozel').map(tagPill).join(' ')}</span>
      <span class="meal-meta">${t('Tahmini malzeme maliyeti:')} ${fmtEur(recipeCost(r))}</span>
      <button type="button" class="btn btn-outline btn-sm" data-testid="button-special-${i}">${t('Tarifi gör')}</button>`;
    card.querySelector('button').addEventListener('click', () => openModal(r, { scale: 1 }));
    grid.appendChild(card);
  });
}

/* ---------- PWA: yükleme istemi ---------- */
let deferredInstallPrompt = null;
function initInstallPrompt() {
  const btn = $('#button-install');
  if (!btn) return;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btn.hidden = false;
  });
  btn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    try { await deferredInstallPrompt.userChoice; } catch (err) { /* yoksay */ }
    deferredInstallPrompt = null;
    btn.hidden = true;
  });
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    btn.hidden = true;
    toast(t('Uygulama yüklendi.'));
  });
}
initInstallPrompt();

/* ---------- PWA: service worker kaydı ---------- */
try {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      try {
        navigator.serviceWorker.register('./sw.js').catch(() => { /* önizleme ortamında sessizce yoksay */ });
      } catch (e) { /* kısıtlı önizleme ortamında sessizce yoksay */ }
    });
  }
} catch (e) { /* kısıtlı önizleme ortamında sessizce yoksay */ }

/* ---------- Olay bağlama ---------- */
$('#btn-add-member').addEventListener('click', () => {
  state.members.push({ age: 30, gender: 'e', morning: 'ev' });
  renderMembers();
});
$('#btn-generate').addEventListener('click', generateAndShow);
$('#btn-regen').addEventListener('click', () => { generateAndShow(); toast(t('Yeni bir plan oluşturuldu.')); });
$('#btn-edit-setup').addEventListener('click', () => showView('home'));
$('#brand-home').addEventListener('click', () => showView('home'));
document.querySelectorAll('#header-nav .nav-tab').forEach((t) => {
  t.addEventListener('click', () => {
    if (t.dataset.view === 'plan' && !state.planResult) return;
    showView(t.dataset.view);
  });
});

document.querySelectorAll('.plan-tabs .nav-tab').forEach((t) => {
  t.addEventListener('click', () => switchTab(t.dataset.resultsTab));
});
$('#fridge-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); addPantryItem(); }
});
$('#btn-fridge-suggest').addEventListener('click', () => { addPantryItem(); suggestFromPantry(); });
$('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- Başlat ---------- */
applyStaticI18n();
renderLangSwitch();
renderCuisines();
renderDiet();
renderMembers();
renderAllChips();
renderFridgeDatalist();
renderFridgeChips();
renderSpecials();
showView('home');
