import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/ruins";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1400`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) {
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

const TARGETS = {
  "pompeii": "Pompeii",
  "persepolis": "Persepolis",
  "ephesus": "Ephesus",
  "karnak-temple": "Karnak",
  "luxor-temple": "Luxor Temple",
  "abu-simbel": "Abu Simbel",
  "teotihuacan": "Teotihuacan",
  "tikal": "Tikal",
  "delphi": "Delphi",
  "knossos": "Knossos",
  "mycenae": "Mycenae",
  "olympia-ancient": "Olympia, Greece",
  "palmyra": "Palmyra",
  "baalbek": "Baalbek",
  "nazca-lines": "Nazca Lines",
  "sacsayhuaman": "Sacsayhuamán",
  "terracotta-army": "Terracotta Army",
  "agrigento-valley-of-temples": "Valley of the Temples",
  "herculaneum": "Herculaneum",
  "ostia-antica": "Ostia Antica",
  "segesta": "Segesta",
  "selinunte": "Selinunte",
  "paestum": "Paestum",
  "jerash": "Jerash",
  "hattusa": "Hattusa",
  "mount-nemrut": "Mount Nemrut",
  "philae": "Philae",
  "mohenjo-daro": "Mohenjo-daro",
  "gobekli-tepe": "Göbekli Tepe",
  "palenque": "Palenque (Maya site)",
  "copan": "Copán",
  "uxmal": "Uxmal",
  "monte-alban": "Monte Albán",
  "sigiriya": "Sigiriya",
  "hampi": "Hampi",
  "mahabalipuram": "Group of Monuments at Mahabalipuram",
  "leptis-magna": "Leptis Magna",
  "sabratha": "Sabratha",
  "volubilis": "Volubilis",
  "timgad": "Timgad",
  "djemila": "Djémila",
  "cyrene": "Cyrene, Libya",
  "epidaurus": "Epidaurus",
  "delos": "Delos",
  "caral": "Caral",
  "tiwanaku": "Tiwanaku",
  "chan-chan": "Chan Chan",
  "ollantaytambo": "Ollantaytambo",
  "skara-brae": "Skara Brae",
  "newgrange": "Newgrange",
  "avebury": "Avebury",
  "carnac-stones": "Carnac stones",
  "prambanan": "Prambanan",
  "polonnaruwa": "Polonnaruwa",
  "chaco-canyon": "Pueblo Bonito",
  "mesa-verde-cliff-palace": "Cliff Palace",
  "cahokia-mounds": "Cahokia",
  "great-serpent-mound": "Serpent Mound",
  "anuradhapura": "Anuradhapura",
  "my-son-sanctuary": "Mỹ Sơn",
  "meroe-pyramids": "Meroë",
  "aksum-obelisks": "Obelisk of Aksum",
  "kilwa-kisiwani": "Kilwa Kisiwani",
  "loulan-ruins": "Loulan",
  "jiaohe-ruins": "Yarkhoto",
  "ur-iraq": "Ur",
  "babylon-ruins": "Babylon",
  "nineveh": "Nineveh",
  "byblos": "Byblos",
  "jericho": "Jericho",
  "ai-khanoum": "Ai-Khanoum",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(`${slug} (${title})`);
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages failed, trying Commons search");
    const found = await commonsSearch(`${title} ruins`);
    if (found) { url = found.url; source = found.title; }
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, title, status: "missing" }); await new Promise((r) => setTimeout(r, 500)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  file too small, skip"); report.push({ slug, title, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, title, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 500));
}

writeFileSync("out/e35-ruins-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
