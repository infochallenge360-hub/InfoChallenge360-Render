import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/reptiles/_candidates";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function inatPhotos(sciName, n = 5) {
  const api = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sciName)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=30`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const out = [];
  for (const obs of j.results || []) {
    for (const photo of obs.photos || []) {
      if (photo.url) {
        const orig = photo.url.replace(/square\.(jpe?g|png)/i, `original.$1`);
        out.push({ url: orig, attribution: photo.attribution, license: photo.license_code, obsId: obs.id, openData: photo.url.includes("inaturalist-open-data") });
      }
      if (out.length >= n * 3) break;
    }
    if (out.length >= n * 3) break;
  }
  // prefer open-data bucket photos, but keep others as fallback
  out.sort((a, b) => (b.openData - a.openData));
  return out.slice(0, n);
}

async function commonsSearch(query, limit = 8) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  const pages = j.query?.pages || {};
  return Object.values(pages).map((p) => ({
    title: p.title,
    url: p.imageinfo?.[0]?.thumburl,
    mime: p.imageinfo?.[0]?.mime,
    license: p.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value,
    artist: (p.imageinfo?.[0]?.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, ""),
  })).filter((x) => x.url && x.mime && x.mime.startsWith("image/"));
}

const SAFE_LICENSE = /public domain|cc0|cc-by|pd-/i;
const BAD_TITLE = /stamp|iconographia|zoologica|diagram|comparison|illustration|print|lithograph|engraving/i;

// items to try via iNaturalist (living-animal wild/captive photos, no hands more often)
const INAT_TARGETS = {
  "green-anaconda": "Eunectes murinus",
  "veiled-chameleon": "Chamaeleo calyptratus",
  "green-sea-turtle": "Chelonia mydas",
  "bearded-dragon": "Pogona vitticeps",
  "gharial": "Gavialis gangeticus",
  "red-eared-slider": "Trachemys scripta elegans",
  "blue-tongued-skink": "Tiliqua scincoides",
  "spectacled-caiman": "Caiman crocodilus",
  "tuatara": "Sphenodon punctatus",
  "panther-chameleon": "Furcifer pardalis",
  "draco-lizard": "Draco volans",
  "round-island-boa": "Casarea dussumieri",
  "knight-anole": "Anolis equestris",
  "copperhead": "Agkistrodon contortrix",
  "gaboon-viper": "Bitis gabonica",
  "rhinoceros-ratsnake": "Gonyosoma boulengeri",
  "hognose-snake": "Heterodon platirhinos",
  "mata-mata-turtle": "Chelus fimbriata",
  "komodo-dragon": "Varanus komodoensis",
  "chinese-water-dragon": "Physignathus cocincinus",
};

// broader/alternate commons queries as second attempt
const COMMONS_RETRY = {
  "green-anaconda": "Eunectes murinus snake",
  "gharial": "Gavialis gangeticus photo",
  "round-island-boa": "Casarea dussumieri snake photo",
  "mata-mata-turtle": "Chelus fimbriatus turtle",
  "komodo-dragon": "Varanus komodoensis Komodo",
  "chinese-water-dragon": "Physignathus cocincinus lizard",
};

const report = {};
for (const [slug, sci] of Object.entries(INAT_TARGETS)) {
  console.log(`\n=== ${slug} (iNat: ${sci}) ===`);
  report[slug] = [];
  const photos = await inatPhotos(sci, 5);
  let i = 0;
  for (const p of photos) {
    i++;
    const dest = `${DEST}/${slug}-inat${i}.jpg`;
    const r = await fetchWithRetry(p.url);
    if (!r || !r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 8000) continue;
    writeFileSync(dest, buf);
    console.log(`  [inat${i}] license=${p.license} attribution=${p.attribution} -> ${dest} (${buf.length}b)`);
    report[slug].push({ file: dest, license: p.license, attribution: p.attribution, url: p.url });
    await new Promise((res) => setTimeout(res, 300));
  }
  if (!photos.length) console.log("  no iNat photos");
  await new Promise((res) => setTimeout(res, 1200));
}

for (const [slug, q] of Object.entries(COMMONS_RETRY)) {
  console.log(`\n=== ${slug} (commons retry: "${q}") ===`);
  const cands = await commonsSearch(q);
  const safe = cands.filter((c) => SAFE_LICENSE.test(c.license || "") && !BAD_TITLE.test(c.title || ""));
  if (!report[slug]) report[slug] = [];
  let i = 0;
  for (const c of safe.slice(0, 4)) {
    i++;
    const dest = `${DEST}/${slug}-cr${i}.jpg`;
    const r = await fetchWithRetry(c.url);
    if (!r || !r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 8000) continue;
    writeFileSync(dest, buf);
    console.log(`  [cr${i}] ${c.license} | ${c.title} | ${c.artist} -> ${dest} (${buf.length}b)`);
    report[slug].push({ file: dest, title: c.title, license: c.license, artist: c.artist, url: c.url });
    await new Promise((res) => setTimeout(res, 400));
  }
  if (!safe.length) console.log("  no safe commons candidates");
  await new Promise((res) => setTimeout(res, 600));
}

writeFileSync("out/e24-fix3-candidates.json", JSON.stringify(report, null, 2));
console.log("\nDone. Candidates report -> out/e24-fix3-candidates.json");
