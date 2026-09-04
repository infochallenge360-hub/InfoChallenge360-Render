import data from './src/Quiz/religionSymbolsE91Data.js';

// ---- replicate quizv2.jsx buildOptions (long video) ----
const nameOfLong = (it, cfg) => it[cfg.nameField] || it.name;
const buildOptionsLong = (item, all, cfg) => {
  const idk = cfg.slugKey || "slug";
  const pool = all.filter((x) => x.level === item.level && x[idk] !== item[idk]);
  const seed = String(item[idk]).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const myName = nameOfLong(item, cfg);
  const picks = [], usedNames = new Set([myName]);
  let k = 1;
  while (picks.length < 3 && k < pool.length * 4) {
    const cand = pool[(seed * 7 + k) % pool.length];
    const candName = cand && nameOfLong(cand, cfg);
    if (candName && !usedNames.has(candName)) { usedNames.add(candName); picks.push(candName); }
    k++;
  }
  const correctIdx = seed % 4;
  const opts = picks.slice();
  opts.splice(correctIdx, 0, myName);
  return { opts: opts.slice(0, 4), correctIdx };
};

const cfg = { nameField: "name" };
let longFails = [];
data.forEach((item) => {
  const { opts, correctIdx } = buildOptionsLong(item, data, cfg);
  const uniq = new Set(opts);
  if (opts.length !== 4) longFails.push({ slug: item.slug, issue: 'not-4-opts', opts });
  if (uniq.size !== opts.length) longFails.push({ slug: item.slug, issue: 'DUP-OPTIONS', opts });
  if (opts[correctIdx] !== item.name) longFails.push({ slug: item.slug, issue: 'correct-idx-mismatch', opts, correctIdx, name: item.name });
});
console.log('=== LONG VIDEO (quizv2 buildOptions) — 70 questions simulated ===');
console.log('Failures:', longFails.length);
longFails.forEach(f => console.log(JSON.stringify(f)));

// specifically ichthys
const ich = data.find(d => d.slug === 'ichthys');
console.log('\nichthys options:', JSON.stringify(buildOptionsLong(ich, data, cfg)));

// ---- replicate shortv2.jsx buildOptions + pickShort ----
const nameOfShort = (x, mode) => mode === "paintings" ? x.title : (mode === "capitals" || mode === "capitals-e64") ? x.capital : (x.name || x.country || x.slug);
const buildOptionsShort = (item, all, mode) => {
  const pool = all.filter((x) => x.level === item.level && (x.slug || x.iso) !== (item.slug || item.iso));
  const seed = (item.slug || item.iso || item.name).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const myName = nameOfShort(item, mode);
  const picks = [], usedNames = new Set([myName]);
  let k = 1;
  while (picks.length < 3 && k < pool.length * 4) {
    const cand = pool[(seed * 7 + k * 13) % pool.length];
    const candName = cand && nameOfShort(cand, mode);
    if (candName && !usedNames.has(candName)) { usedNames.add(candName); picks.push(candName); }
    k++;
  }
  const correctIdx = seed % 4;
  const opts = picks.slice();
  opts.splice(correctIdx, 0, myName);
  return { opts: opts.slice(0, 4), correctIdx };
};

const _hashStr = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; };
const _seededShuffle = (arr, seed) =>
  arr.map((item, i) => ({ item, key: _hashStr(`${seed}-${i}-${item.slug || item.iso || i}`) }))
     .sort((a, b) => a.key - b.key)
     .map((x) => x.item);

const pickShort = (items, part = 0) => {
  const levels = ["easy", "medium", "hard", "impossible"];
  const groups = levels.map((lvl) => items.filter((it) => it.level === lvl));
  const out = [];
  const NEEDED = 15;
  const keyOf = (x) => x && (x.slug || x.iso);
  for (const pool of groups) {
    if (!pool.length) continue;
    let sequence = [];
    for (let lap = 0; sequence.length < NEEDED + pool.length; lap++) sequence = sequence.concat(_seededShuffle(pool, `lap${lap}`));
    const start = part * 3;
    const slice = [sequence[start], sequence[start + 1], sequence[start + 2]];
    const used = new Set();
    for (let i = 0; i < slice.length; i++) {
      let key = keyOf(slice[i]);
      if (used.has(key)) {
        let j = start + slice.length;
        while (j < sequence.length && used.has(keyOf(sequence[j]))) j++;
        slice[i] = sequence[j];
        key = keyOf(slice[i]);
      }
      used.add(key);
    }
    out.push(...slice);
  }
  return out;
};

console.log('\n=== SHORTS (shortv2 pickShort + buildOptions) ===');
let shortFails = [];
let allShortSlugs = new Set();
for (let part = 0; part < 5; part++) {
  const list = pickShort(data, part);
  console.log(`Short part=${part}: ${list.length} items ->`, list.map(x=>x.slug).join(', '));
  list.forEach(x => allShortSlugs.add(x.slug));
  list.forEach((item) => {
    const { opts, correctIdx } = buildOptionsShort(item, data, "religion-e91");
    const uniq = new Set(opts);
    if (opts.length !== 4) shortFails.push({ part, slug: item.slug, issue: 'not-4-opts', opts });
    if (uniq.size !== opts.length) shortFails.push({ part, slug: item.slug, issue: 'DUP-OPTIONS', opts });
    if (opts[correctIdx] !== nameOfShort(item, "religion-e91")) shortFails.push({ part, slug: item.slug, issue: 'correct-idx-mismatch', opts, correctIdx });
  });
}
console.log('\nShort failures:', shortFails.length);
shortFails.forEach(f => console.log(JSON.stringify(f)));
console.log('\nTotal distinct slugs covered across all 5 shorts:', allShortSlugs.size, '/ 70');
const missingFromShorts = data.filter(d => !allShortSlugs.has(d.slug)).map(d=>d.slug);
console.log('slugs never appearing in any short:', missingFromShorts.length, missingFromShorts);
