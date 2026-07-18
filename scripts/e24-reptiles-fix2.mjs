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

const QUERIES = {
  "green-anaconda": "Green anaconda Eunectes murinus wild",
  "veiled-chameleon": "Veiled chameleon Chamaeleo calyptratus branch",
  "leopard-gecko": "Leopard gecko Eublepharis macularius",
  "green-sea-turtle-2": "Green sea turtle Chelonia mydas swimming",
  "bearded-dragon": "Bearded dragon Pogona vitticeps portrait",
  "box-turtle-2": "Eastern box turtle Terrapene carolina",
  "cottonmouth-2": "Cottonmouth Agkistrodon piscivorus snake",
  "gharial-2": "Gharial Gavialis gangeticus snout",
  "american-crocodile-2": "American crocodile Crocodylus acutus",
  "snapping-turtle-2": "Common snapping turtle Chelydra serpentina",
  "milk-snake-2": "Eastern milk snake Lampropeltis triangulum",
  "red-eared-slider-2": "Red-eared slider Trachemys scripta elegans",
  "blue-tongued-skink-2": "Blue tongued skink Tiliqua scincoides",
  "spectacled-caiman-2": "Spectacled caiman Caiman crocodilus water",
  "tuatara-2": "Tuatara Sphenodon punctatus",
  "panther-chameleon-2": "Panther chameleon Furcifer pardalis branch",
  "draco-lizard-2": "Draco volans gliding lizard",
  "round-island-boa-2": "Round Island boa Casarea dussumieri",
  "knight-anole-2": "Knight anole Anolis equestris tree",
  "prehensile-tailed-skink-2": "Prehensile-tailed skink Corucia zebrata",
  "copperhead-2": "Copperhead Agkistrodon contortrix snake",
  "gaboon-viper-2": "Gaboon viper Bitis gabonica coiled",
  "rhinoceros-ratsnake-2": "Rhinoceros ratsnake Gonyosoma boulengeri head",
  "hognose-snake-2": "Eastern hognose snake Heterodon platirhinos",
  "mata-mata-turtle-2": "Mata mata turtle Chelus fimbriata",
  "bushmaster-2": "Bushmaster snake Lachesis muta",
  "komodo-dragon-2": "Komodo dragon Varanus komodoensis",
  "chinese-water-dragon-2": "Chinese water dragon Physignathus cocincinus",
};

const report = {};
for (const [slug, q] of Object.entries(QUERIES)) {
  console.log(`\n=== ${slug} : "${q}" ===`);
  const cands = await commonsSearch(q);
  const safe = cands.filter((c) => SAFE_LICENSE.test(c.license || ""));
  report[slug] = [];
  let i = 0;
  for (const c of safe.slice(0, 4)) {
    i++;
    const dest = `${DEST}/${slug}-${i}.jpg`;
    const r = await fetchWithRetry(c.url);
    if (!r || !r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 8000) continue;
    writeFileSync(dest, buf);
    console.log(`  [${i}] ${c.license} | ${c.title} | ${c.artist} -> ${dest} (${buf.length}b)`);
    report[slug].push({ file: dest, title: c.title, license: c.license, artist: c.artist, url: c.url });
    await new Promise((res) => setTimeout(res, 400));
  }
  if (!report[slug].length) console.log("  NO SAFE CANDIDATES FOUND");
  await new Promise((res) => setTimeout(res, 600));
}

writeFileSync("out/e24-fix2-candidates.json", JSON.stringify(report, null, 2));
console.log("\nDone. Candidates report -> out/e24-fix2-candidates.json");
