import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360Bot/1.0 (educational quiz)";
const DEST = "public/countryfood";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// slug -> array of fallback Wikipedia titles to try in order
const FALLBACKS = {
  "cheese-fondue": ["Fondue", "Cheese fondue"],
  "turkish-delight": ["Turkish delight", "Lokum"],
  "chicken-adobo": ["Adobo", "Chicken adobo (Philippines)"],
  "belgian-waffles": ["Belgian waffle", "Waffle"],
  "chili-crab": ["Chilli crab", "Chili crab (dish)"],
  "kottu-roti": ["Kottu", "Kottu roti"],
  "bandeja-paisa": ["Bandeja paisa"],
  "swedish-meatballs": ["Köttbullar", "Kottbullar", "Swedish meatball"],
  "doro-wat": ["Doro wat", "Doro Wat (dish)"],
  "egusi-soup": ["Egusi", "Egusi soup"],
  "plov": ["Plov", "Palov", "Pilaf"],
  "pastel-de-choclo": ["Pastel de choclo"],
  "fish-amok": ["Amok (food)", "Amok trey"],
  "dal-bhat": ["Dal bhat", "Dal Bhat"],
  "ema-datshi": ["Ema datshi"],
  "beshbarmak": ["Beshbarmak", "Besbarmak"],
  "mulgipuder": ["Mulgipuder", "Mulgikapsad"],
  "grey-peas-with-bacon": ["Pelēkie zirņi", "Grey peas"],
  "sopa-paraguaya": ["Sopa paraguaya"],
  "pepperpot": ["Pepperpot (dish)", "Pepperpot"],
  "pom": ["Pom (dish)", "Peto (dish)"],
  "skoudehkaris": ["Skudahkharis", "Skoudehkaris"],
  "kokoda": ["Kokoda (food)", "Ika mata"],
  "mumu": ["Mumu (cooking)", "Umu"],
  "langouste-a-la-vanille": ["Langouste à la vanille", "Comorian cuisine"],
  "gutap": ["Gutap", "Turkmen cuisine"],
};

function isRealImage(buf) {
  if (buf.length < 3000) return false;
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8;
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  return jpeg || png;
}

async function fetchJsonWithRetry(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await r.text();
    if (r.ok && text.trim().startsWith("{")) return JSON.parse(text);
    await sleep(2500 * (attempt + 1));
  }
  return null;
}

async function imageUrl(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const j = await fetchJsonWithRetry(api);
  if (!j) return null;
  const pages = j.query && j.query.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0];
  if (p.missing !== undefined) return null;
  return p && p.thumbnail ? { url: p.thumbnail.source, title: p.title } : null;
}

async function download(url, path) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return { ok: false, reason: `http-${r.status}` };
  const buf = Buffer.from(await r.arrayBuffer());
  if (!isRealImage(buf)) return { ok: false, reason: "not-real-image" };
  writeFileSync(path, buf);
  return { ok: true, size: buf.length };
}

const results = [];
let n = 0;
const slugs = Object.keys(FALLBACKS);
for (const slug of slugs) {
  n++;
  if (existsSync(`${DEST}/${slug}.jpg`)) { console.error(`${n}/${slugs.length} ${slug}: SKIP (exists)`); continue; }
  let done = false;
  for (const title of FALLBACKS[slug]) {
    const found = await imageUrl(title);
    await sleep(2000);
    if (!found) { console.error(`  ${slug}: no image for "${title}"`); continue; }
    const dl = await download(found.url, `${DEST}/${slug}.jpg`);
    await sleep(2000);
    if (!dl.ok) { console.error(`  ${slug}: dl-fail for "${title}" (${dl.reason})`); continue; }
    results.push({ slug, status: "OK", via: found.title, size: dl.size });
    console.error(`${n}/${slugs.length} ${slug}: OK via "${found.title}" (${dl.size}b)`);
    done = true;
    break;
  }
  if (!done) { results.push({ slug, status: "FAILED", tried: FALLBACKS[slug] }); console.error(`${n}/${slugs.length} ${slug}: FAILED all fallbacks`); }
}
console.log(`\nDone. ${results.filter(r=>r.status==="OK").length}/${slugs.length} recovered.`);
writeFileSync("scripts/e08-fetch-fallback-report.json", JSON.stringify(results, null, 2), "utf8");
