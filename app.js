'use strict';
/* =========================================================
   MUTFAK PLANI — planlama motoru ve arayüz
   (veri katmanı data.js ve prices-data.js içinde)
   ========================================================= */

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
const CAT_LABEL = {
  sebze: 'Sebze & Meyve', meyve: 'Sebze & Meyve', et: 'Et & Şarküteri', tavuk: 'Et & Şarküteri',
  balik: 'Balık', sut: 'Süt Ürünleri', kahvalti: 'Kahvaltılık', temel: 'Temel Gıda',
  kuru: 'Bakliyat', firin: 'Fırın', baharat: 'Baharat',
};

/* ---------- Gerçek fiyat entegrasyonu ---------- */
/* Adet bazlı bazı kalemler kg fiyatından çevrilir (ortalama adet ağırlığı) */
const PIECE_KG = { 'muz': 0.12 };

function realUnitPrice(name, store) {
  /* Gerçek veri varsa €/birim döndürür, yoksa null */
  const cur = (typeof CURATED !== 'undefined' && CURATED[name]) ? CURATED[name] : null;
  if (!cur || !cur.stores || !cur.stores[store]) return null;
  const ing = ING[name];
  const m = cur.stores[store].median;
  if (cur.basis === 'kg' && ing.unit === 'g') return m / 1000;
  if (cur.basis === 'kg' && ing.unit === 'adet') return m * (PIECE_KG[name] || 0.15);
  return m; /* piece / egg / can → adet ile aynı */
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
  /* Belirli bir markette (veya en uygun market karışımında) tahmini malzeme maliyeti */
  return recipe.ingredients.reduce((s, [name, qty, optional]) => {
    const ing = ING[name];
    if (!ing) return s;
    if (optional && ingAllergens(name).some((a) => state.allergens.has(a))) return s;
    const st = store || bestStoreFor(name).store;
    return s + unitPrice(name, st).ppu * qty;
  }, 0);
}

/* ---------- Eleme ---------- */
function recipeExcluded(recipe, st) {
  const names = recipe.ingredients.map((i) => i[0]);
  if (recipe.allergens.some((a) => st.allergens.has(a))) return true;
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
function satisfiesRules(pick, rules) {
  const counts = {};
  for (const r of pick) for (const t of r.tags) counts[t] = (counts[t] || 0) + 1;
  return rules.every((rule) => (counts[rule.tag] || 0) >= rule.min);
}

function poolsFor(st) {
  const byCuisine = (r) => st.cuisine === 'mix' || r.cuisine === st.cuisine;
  const ok = (r) => byCuisine(r) && !recipeExcluded(r, st);
  /* Beslenme çantasında evrensel ('mix') tarifler her mutfakta kullanılabilir */
  const okLb = (r) => (byCuisine(r) || r.cuisine === 'mix') && !recipeExcluded(r, st);
  return {
    dinners: RECIPES.filter((r) => r.meal === 'dinner' && ok(r)),
    breakfasts: RECIPES.filter((r) => r.meal === 'breakfast' && ok(r)),
    lunches: RECIPES.filter((r) => r.meal === 'lunch' && ok(r)),
    desserts: RECIPES.filter((r) => r.meal === 'dessert' && ok(r)),
    lunchboxes: RECIPES.filter((r) => r.meal === 'lunchbox' && okLb(r)),
    guests: RECIPES.filter((r) => r.meal === 'dinner' && r.guest && ok(r)),
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
    return { error: 'Seçimlerinizle (mutfak + elemeler) 7 ayrı akşam yemeği kalmadı. Farklı bir mutfak deneyin veya bazı elemeleri kaldırın.' };
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

  /* Kahvaltı: evde kalan kişiler için (yoksa boş) */
  let bCycle = [];
  let breakfastCost = 0;
  if (homeP > 0) {
    const bCheap = [...pools.breakfasts].sort((a, b) => recipeCost(a) - recipeCost(b));
    for (let i = 0; i < 7; i++) bCycle.push(bCheap[i % bCheap.length]);
    breakfastCost = bCycle.reduce((s, r) => s + recipeCost(r), 0) * homeScale;
  }

  /* Beslenme çantası: iş/okul gidenler için, kişi başı günlük */
  let lbCycle = [];
  let lunchboxCost = 0;
  if (awayCount > 0) {
    lbCycle = shuffle(pools.lunchboxes);
    while (lbCycle.length < 7) lbCycle = lbCycle.concat(shuffle(pools.lunchboxes));
    lbCycle = lbCycle.slice(0, 7);
    lunchboxCost = lbCycle.reduce((s, r) => s + recipeCost(r), 0) * awayCount;
  }

  const mid = (st.budgetMin + st.budgetMax) / 2;
  let best = null;
  let relaxedBest = null;

  for (let iter = 0; iter < 600; iter++) {
    let pick = shuffle(pools.dinners).slice(0, 7);
    /* Misafir günü: misafir yemeğini ilgili güne sabitle */
    let guestDayIdx = -1;
    if (st.guest.enabled && pools.guests.length > 0) {
      guestDayIdx = st.guest.day;
      const gr = pools.guests[Math.floor(Math.random() * pools.guests.length)];
      pick[guestDayIdx] = gr;
    }
    const ok = satisfiesRules(pick, activeRules);
    const guestScale = st.guest.enabled ? (P + st.guest.count) / 4 : null;
    let dinnerCost = 0;
    pick.forEach((r, i) => {
      dinnerCost += recipeCost(r) * (guestDayIdx === i ? guestScale : scale);
    });
    const total = dinnerCost + breakfastCost + lunchboxCost;
    const score =
      (mustFree ? Math.min(mustFreeCount(pick), 3) * 4 : 0) +
      new Set(pick.flatMap((r) => r.tags)).size +
      (ok ? 10 : 0);
    const inRange = total >= st.budgetMin && total <= st.budgetMax;
    const cand = { pick, total, score, ok, guestDayIdx, distance: Math.abs(total - mid), _in: inRange };
    if (ok) {
      if (!best) best = cand;
      else if (inRange && !best._in) best = cand;
      else if (inRange === best._in && cand.distance < best.distance) best = cand;
    } else if (!relaxedBest || cand.distance < relaxedBest.distance) {
      relaxedBest = cand;
    }
  }

  let chosen = best || relaxedBest;
  const plan = DAY_NAMES.map((day, i) => ({
    day,
    breakfast: homeP > 0 ? bCycle[i] : null,
    lunchbox: awayCount > 0 ? lbCycle[i] : null,
    dinner: chosen.pick[i],
    guest: chosen.guestDayIdx === i,
    guestScale: chosen.guestDayIdx === i && st.guest.enabled ? (P + st.guest.count) / 4 : null,
  }));

  return {
    plan,
    scale,
    homeScale,
    awayCount,
    portions: P,
    total: chosen.total,
    budgetMin: st.budgetMin,
    budgetMax: st.budgetMax,
    rulesSatisfied: chosen.ok,
    relaxed: !best,
    mustFreeApplied: !!mustFree && mustFreeCount(chosen.pick) >= 2,
    mustFreeName: st.mustFree.trim(),
    pools,
  };
}

/* ---------- Alışveriş listesi ---------- */
function roundQty(qty, unit) {
  if (unit === 'g') return Math.max(10, Math.round(qty / 10) * 10);
  if (unit === 'adet') return Math.max(1, Math.round(qty));
  return Math.max(1, Math.round(qty));
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
    add(day.dinner, day.guestScale || pr.scale);
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
const fmtEur = (v) => v.toFixed(2).replace('.', ',') + ' €';
const fmtQty = (it) => {
  if (it.unit === 'adet') return `${it.qty} adet`;
  if (it.unit === 'g') return `${it.qty} g`;
  if (it.unit === 'tutam') return `${it.qty} tutam`;
  return `${it.qty} tk`;
};
const TR_MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
function fmtDate(ym) {
  if (!ym || ym.length < 7) return '';
  const [y, m] = ym.split('-');
  return `${TR_MONTHS[parseInt(m, 10) - 1]} ${y}`;
}
const cuisineName = (id) => (CUISINES.find((c) => c.id === id) || {}).name || id;
/* Gluten alerjisi aktifse opsiyonel ekmekli yemeklerin adından ekmeği düşür */
const displayName = (recipe) => {
  if (!state.allergens.has('gluten')) return recipe.name;
  const optBread = recipe.ingredients.some(([n, , opt]) => opt && /ekmek/i.test(n));
  return optBread ? recipe.name.replace(/\s*\+\s*Ekmek/i, '') : recipe.name;
};

/* =========================================================
   UYGULAMA DURUMU & ARAYÜZ
   ========================================================= */
const state = {
  cuisine: 'tr',
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
  guest: { enabled: false, day: 5, count: 2 },
  step: 1,
  planResult: null,
  shopping: null,
  checked: new Set(),
  extras: { lunches: {}, desserts: {} },
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

/* ---------- Stepper ---------- */
const STEP_TITLES = ['Mutfağı', 'Hane', 'Bütçe', 'Eleme', 'Şartlar'];
function renderStepper() {
  const s = $('#stepper');
  s.innerHTML = '';
  STEP_TITLES.forEach((t, i) => {
    const li = el('li', state.step > i + 1 ? 'is-done' : state.step === i + 1 ? 'is-active' : '');
    li.innerHTML = `<span>${i + 1}. ${t}</span>`;
    s.appendChild(li);
  });
}

/* ---------- Mutfaqı kartları ---------- */
function renderCuisines() {
  const grid = $('#cuisine-grid');
  grid.innerHTML = '';
  CUISINES.forEach((c) => {
    const card = el('button', 'cuisine-card' + (state.cuisine === c.id ? ' is-selected' : ''));
    card.type = 'button';
    card.setAttribute('role', 'radio');
    card.setAttribute('aria-checked', state.cuisine === c.id ? 'true' : 'false');
    card.setAttribute('data-testid', `card-cuisine-${c.id}`);
    card.innerHTML = `<span class="cuisine-name">${c.name}</span><span class="cuisine-desc">${c.desc}</span>`;
    card.addEventListener('click', () => { state.cuisine = c.id; renderCuisines(); });
    grid.appendChild(card);
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

    const mField = el('label', 'field field-morning');
    mField.innerHTML = `<span>Sabah programı</span>`;
    const mSel = el('select');
    mSel.setAttribute('data-testid', `select-morning-${idx}`);
    mSel.setAttribute('aria-label', `${idx + 1}. kişinin sabah programı`);
    const mVal = m.morning || 'ev';
    mSel.innerHTML = `
      <option value="ev"${mVal === 'ev' ? ' selected' : ''}>Evde kahvaltı</option>
      <option value="is"${mVal === 'is' ? ' selected' : ''}>İş — beslenme</option>
      <option value="okul"${mVal === 'okul' ? ' selected' : ''}>Okul — beslenme</option>`;
    mSel.addEventListener('change', () => { m.morning = mSel.value; updatePortionNote(); });
    mField.appendChild(mSel);

    const rm = el('button', 'btn btn-remove', 'Kaldır');
    rm.type = 'button';
    rm.setAttribute('data-testid', `button-remove-member-${idx}`);
    rm.setAttribute('aria-label', `${idx + 1}. kişiyi kaldır`);
    rm.addEventListener('click', () => {
      if (state.members.length <= 1) { toast('En az bir kişi gerekli.'); return; }
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

/* ---------- Misafir bölümü ---------- */
function renderGuestFields() {
  const sel = $('#guest-day');
  sel.innerHTML = DAY_NAMES.map((d, i) => `<option value="${i}"${state.guest.day === i ? ' selected' : ''}>${d}</option>`).join('');
  $('#guest-count').value = state.guest.count;
  $('#guest-fields').hidden = !state.guest.enabled;
}

/* ---------- Sihirbaz gezinme ---------- */
function showStep(n) {
  state.step = n;
  document.querySelectorAll('.wizard-step').forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
  $('#btn-prev').hidden = n === 1;
  $('#btn-next').textContent = n === 5 ? 'Planı Oluştur' : 'Devam';
  renderStepper();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  if (state.step === 3) {
    const mn = parseFloat($('#budget-min').value);
    const mx = parseFloat($('#budget-max').value);
    if (!(mn >= 10 && mx >= 10 && mn <= mx)) { toast('Geçerli bir bütçe aralığı girin (alt ≤ üst).'); return; }
    state.budgetMin = mn; state.budgetMax = mx;
  }
  if (state.step === 4) {
    state.excludeFree = $('#exclude-free').value.split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (state.step === 5) {
    state.mustFree = $('#must-free').value;
    state.guest.enabled = $('#guest-enabled').checked;
    state.guest.day = parseInt($('#guest-day').value, 10);
    state.guest.count = Math.max(1, parseInt($('#guest-count').value, 10) || 2);
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
  state.extras = { lunches: {}, desserts: {} };
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

function currentTotal() {
  const pr = state.planResult;
  if (!pr) return 0;
  let t = pr.total;
  for (const d of pr.plan) {
    if (state.extras.lunches[d.day]) t += recipeCost(state.extras.lunches[d.day]) * pr.scale;
    if (state.extras.desserts[d.day]) t += recipeCost(state.extras.desserts[d.day]) * pr.scale;
  }
  return t;
}

function tagPill(tag) {
  const labels = {
    vegan: 'Vegan', vejetaryen: 'Vejetaryen', balik: 'Balık', pratik: 'Pratik', corba: 'Çorba',
    baklagil: 'Baklagil', tahil: 'Pilav/Bulgur', makarna: 'Makarna', etli: 'Etli', tavuk: 'Tavuk',
    sebze: 'Sebze', misafir: 'Misafir', firin: 'Fırın', kahvalti: 'Kahvalti', lunch: 'Öğle',
  };
  return labels[tag] ? `<span class="tag t-${tag}">${labels[tag]}</span>` : '';
}

function renderResults() {
  const r = state.planResult;
  state.shopping = buildShoppingList(r);
  const s = state.shopping;
  const total = currentTotal();

  /* Özet */
  const awayLine = r.awayCount > 0
    ? ` · ${r.awayCount} kişi için günlük beslenme çantası`
    : '';
  $('#results-summary').innerHTML = `
    <h2>Haftalık planınız hazır</h2>
    <p>${cuisineName(state.cuisine)} · ${state.members.length} kişi · ${r.portions.toFixed(1).replace('.', ',')} porsiyon${awayLine} ·
    tahmini toplam <strong>${fmtEur(total)}</strong>
    (bütçe aralığınız ${fmtEur(r.budgetMin)} – ${fmtEur(r.budgetMax)})</p>`;

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
      <span class="budget-range">Bütçe aralığı: ${fmtEur(r.budgetMin)} – ${fmtEur(r.budgetMax)} · öğle/tatlı eklemeleri dahil</span>
    </div>
    <div class="budget-track" role="img" aria-label="Toplam maliyet ${fmtEur(total)}, bütçe aralığı ${fmtEur(r.budgetMin)} ile ${fmtEur(r.budgetMax)} arasında">
      <div class="budget-range-band" style="left:${bandL}%; width:${Math.max(bandR - bandL, 0.5)}%"></div>
      <div class="budget-fill" style="width:${fillW}%"></div>
    </div>`;
  planPanel.appendChild(barWrap);

  const notes = [];
  if (r.mustFreeApplied) notes.push(`"${r.mustFreeName}" içeren en az 2 yemek plana alındı.`);
  if (!r.rulesSatisfied) notes.push('Bazı şartlar eleme kurallarıyla çakıştığı için uygulanamadı.');
  if (notes.length) planPanel.appendChild(el('p', 'step-hint', notes.join(' ')));

  const grid = el('div', 'week-grid');
  r.plan.forEach((day, i) => {
    const bScale = r.homeScale != null ? r.homeScale : r.scale;
    const bCost = day.breakfast ? recipeCost(day.breakfast) * bScale : 0;
    const lbCost = day.lunchbox ? recipeCost(day.lunchbox) * (r.awayCount || 1) : 0;
    const dCost = recipeCost(day.dinner) * (day.guestScale || r.scale);
    const lCost = state.extras.lunches[day.day] ? recipeCost(state.extras.lunches[day.day]) * r.scale : 0;
    const dsCost = state.extras.desserts[day.day] ? recipeCost(state.extras.desserts[day.day]) * r.scale : 0;
    const card = el('div', 'day-card');
    card.setAttribute('data-testid', `card-day-${i}`);
    card.innerHTML = `
      <div class="day-card-head">
        <span class="day-name">${day.day}${day.guest ? ' <span class="guest-badge">misafirli</span>' : ''}</span>
        <span class="day-cost">${fmtEur(bCost + dCost + lCost + dsCost + lbCost)}</span>
      </div>`;

    const mkMeal = (label, meal, cls) => {
      const slot = el('div', 'meal-slot');
      const lab = el('span', 'meal-label', label);
      const btn = el('button', `meal-card ${cls}`);
      btn.type = 'button';
      btn.setAttribute('data-testid', `button-meal-${i}-${label}`);
      const perServing = meal.meal === 'lunchbox'
        ? `${fmtEur(recipeCost(meal))}/kişi`
        : `${fmtEur(recipeCost(meal) / meal.serves)}/porsiyon`;
      btn.innerHTML = `
        <span class="meal-name">${displayName(meal)}</span>
        <span class="meal-meta">${meal.time} dk · ${perServing}</span>`;
      btn.addEventListener('click', () => openModal(meal, day));
      slot.append(lab, btn);
      return slot;
    };

    if (day.breakfast) card.appendChild(mkMeal('Kahvaltı', day.breakfast, 'is-breakfast'));
    if (day.lunchbox) card.appendChild(mkMeal('Beslenme (iş/okul)', day.lunchbox, 'is-lunchbox'));
    card.appendChild(mkMeal('Akşam', day.dinner, 'is-dinner'));

    if (state.extras.lunches[day.day]) {
      card.appendChild(mkMeal('Öğle', state.extras.lunches[day.day], 'is-lunch'));
    }
    if (state.extras.desserts[day.day]) {
      card.appendChild(mkMeal('Tatlı', state.extras.desserts[day.day], 'is-dessert'));
    }

    const extraRow = el('div', 'extra-row');
    const lunchBtn = el('button', 'btn btn-ghost btn-sm', state.extras.lunches[day.day] ? 'Öğle kaldır' : '+ Öğle yemeği');
    lunchBtn.type = 'button';
    lunchBtn.setAttribute('data-testid', `button-lunch-${i}`);
    lunchBtn.addEventListener('click', () => toggleExtra('lunches', day.day));
    const dessertBtn = el('button', 'btn btn-ghost btn-sm', state.extras.desserts[day.day] ? 'Tatlı kaldır' : '+ Tatlı');
    dessertBtn.type = 'button';
    dessertBtn.setAttribute('data-testid', `button-dessert-${i}`);
    dessertBtn.addEventListener('click', () => toggleExtra('desserts', day.day));
    extraRow.append(lunchBtn, dessertBtn);
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
      <span class="store-sub">${storeItems.length} ürün</span>
      <span class="store-total">${fmtEur(s.storeTotals[store])}</span>`;
    const body = el('div', 'store-body');
    storeItems.forEach((it) => {
      const row = el('div', 'shop-item' + (it.checked ? ' is-checked' : ''));
      row.setAttribute('data-testid', `row-item-${it.name}`);
      const id = `chk-${it.name.replace(/\s+/g, '-')}`;
      row.innerHTML = `
        <label for="${id}">
          <input type="checkbox" id="${id}"${it.checked ? ' checked' : ''}>
          <span class="shop-item-name">${it.name}<span class="shop-item-qty"> — ${fmtQty(it)}</span></span>
        </label>
        <span class="shop-item-meta">${it.real ? `<span class="price-badge is-real" title="Open Prices topluluk verisi, ${fmtDate(it.date)}">gerçek ${fmtDate(it.date)}</span>` : '<span class="price-badge">tahmini</span>'}</span>
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
    `Tahmini toplam: ${fmtEur(s.grandTotal)} · Kalemlerin %${realPct}'i gerçek market fiyatları (Open Prices topluluk verisi, son 12 ay medyanı), kalanı tahmini. Mağazaya ve sezona göre değişebilir.`));

  /* ---------- KARŞILAŞTIRMA PANELİ ---------- */
  const cmpPanel = $('#panel-compare');
  cmpPanel.innerHTML = '';
  cmpPanel.appendChild(el('p', 'compare-note',
    'Aynı sepetin tamamı tek bir markette alınırsa tahmini maliyeti aşağıda. "En uygun" market tek seferde her şeyi almak isteyenler için. Alışveriş listesinde her kalem, gerçek fiyatı olan marketten seçilir.'));
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
    <thead><tr><th>Market</th><th>Tahmini sepet</th><th>Gerçek fiyat</th><th>Fark</th></tr></thead>
    <tbody>${rows.map((row) => `
      <tr${row.store === bestStore ? ' class="is-best"' : ''}>
        <td>${row.store}${row.store === bestStore ? '<span class="badge-best">En uygun</span>' : ''}</td>
        <td>${fmtEur(row.total)}</td>
        <td>${row.realN}/${s.items.length} kalem</td>
        <td>${row.store === bestStore ? '—' : '+' + fmtEur(row.total - rows[0].total)}</td>
      </tr>`).join('')}</tbody>`;
  wrap.appendChild(table);
  cmpPanel.appendChild(wrap);
  cmpPanel.appendChild(el('p', 'shopping-footnote',
    "Gerçek fiyatlar Open Prices (prices.openfoodfacts.org) topluluk verilerinden; 2025 başından bu yana Almanya'da kaydedilmiş fiyatların market bazındaki medyanıdır."));
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
    toast(kind === 'lunches' ? 'Seçimlerinizle uygun öğle yemeği kalmadı (eleme çok kısıtlayıcı).' : 'Seçimlerinizle uygun tatlı kalmadı.');
    return;
  }
  const used = Object.values(state.extras[kind]);
  let candidates = pool.filter((r) => !used.includes(r));
  if (!candidates.length) candidates = pool;
  state.extras[kind][dayName] = candidates[Math.floor(Math.random() * candidates.length)];
  renderResults();
}

/* ---------- Sekmeler ---------- */
function switchTab(name) {
  document.querySelectorAll('.nav-tab').forEach((t) => t.classList.toggle('is-active', t.dataset.resultsTab === name));
  document.querySelectorAll('.results-tab').forEach((p) => { p.hidden = p.dataset.resultsPanel !== name; });
}

/* ---------- Tarif modalı ---------- */
const MEAL_LABELS = { dinner: 'Akşam yemeği', breakfast: 'Kahvaltı', lunch: 'Öğle yemeği', dessert: 'Tatlı', lunchbox: 'Beslenme çantası' };
function openModal(recipe, day) {
  const r = state.planResult;
  const isLb = recipe.meal === 'lunchbox';
  const scale = isLb ? 1 : (day && day.guestScale ? day.guestScale : r.scale);
  const cost = recipeCost(recipe) * (isLb ? (r.awayCount || 1) : scale);
  const perLabel = isLb ? `${fmtEur(recipeCost(recipe))}/kişi` : `${fmtEur(recipeCost(recipe) / recipe.serves)}/porsiyon`;
  const modal = $('#modal-inner');
  modal.innerHTML = `
    <button type="button" class="modal-close" data-testid="button-modal-close" aria-label="Kapat">Kapat ✕</button>
    <h3 id="modal-title">${displayName(recipe)}</h3>
    <p class="modal-sub">${MEAL_LABELS[recipe.meal]} · ${cuisineName(recipe.cuisine)} · ${recipe.time} dk · ${perLabel} · hane için: ${fmtEur(cost)}</p>
    <div class="tag-row">${recipe.tags.filter((t) => !['kahvalti', 'lunch'].includes(t)).map(tagPill).join('')}</div>
    <h4>${isLb ? 'Malzemeler (kişi başı)' : 'Malzemeler (haneye göre ölçekli)'}</h4>
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
$('#guest-enabled').addEventListener('change', (e) => {
  state.guest.enabled = e.target.checked;
  renderGuestFields();
});
$('#guest-day').addEventListener('change', (e) => { state.guest.day = parseInt(e.target.value, 10); });
$('#guest-count').addEventListener('input', (e) => { state.guest.count = Math.max(1, parseInt(e.target.value, 10) || 2); });
document.querySelectorAll('.nav-tab').forEach((t) => {
  t.addEventListener('click', () => switchTab(t.dataset.resultsTab));
});
$('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- Başlat ---------- */
renderStepper();
renderCuisines();
renderMembers();
renderAllChips();
renderGuestFields();
showStep(1);
