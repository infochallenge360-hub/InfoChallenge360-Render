import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/castles";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
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
  "neuschwanstein-castle": "Neuschwanstein Castle",
  "windsor-castle": "Windsor Castle",
  "edinburgh-castle": "Edinburgh Castle",
  "chateau-de-chambord": "Château de Chambord",
  "himeji-castle": "Himeji Castle",
  "prague-castle": "Prague Castle",
  "alhambra": "Alhambra",
  "bran-castle": "Bran Castle",
  "osaka-castle": "Osaka Castle",
  "tower-of-london": "Tower of London",
  "mont-saint-michel": "Mont-Saint-Michel",
  "chateau-de-chenonceau": "Château de Chenonceau",
  "warwick-castle": "Warwick Castle",
  "malbork-castle": "Malbork Castle",
  "hohenzollern-castle": "Hohenzollern Castle",
  "alcazar-of-segovia": "Alcázar of Segovia",
  "carcassonne": "Carcassonne",
  "kronborg-castle": "Kronborg",
  "stirling-castle": "Stirling Castle",
  "caernarfon-castle": "Caernarfon Castle",
  "conwy-castle": "Conwy Castle",
  "dover-castle": "Dover Castle",
  "leeds-castle": "Leeds Castle",
  "blarney-castle": "Blarney Castle",
  "kilkenny-castle": "Kilkenny Castle",
  "peles-castle": "Peleș Castle",
  "wawel-castle": "Wawel Castle",
  "burg-eltz": "Eltz Castle",
  "chateau-de-amboise": "Château d'Amboise",
  "hohensalzburg-fortress": "Hohensalzburg Fortress",
  "chillon-castle": "Chillon Castle",
  "alnwick-castle": "Alnwick Castle",
  "highclere-castle": "Highclere Castle",
  "nagoya-castle": "Nagoya Castle",
  "matsumoto-castle": "Matsumoto Castle",
  "hearst-castle": "Hearst Castle",
  "corvin-castle": "Corvin Castle",
  "spis-castle": "Spiš Castle",
  "bojnice-castle": "Bojnice Castle",
  "trakai-island-castle": "Trakai Island Castle",
  "marksburg-castle": "Marksburg",
  "chateau-de-pierrefonds": "Château de Pierrefonds",
  "chateau-d-angers": "Château d'Angers",
  "predjama-castle": "Predjama Castle",
  "eilean-donan-castle": "Eilean Donan Castle",
  "cardiff-castle": "Cardiff Castle",
  "bodiam-castle": "Bodiam Castle",
  "arundel-castle": "Arundel Castle",
  "castel-sant-angelo": "Castel Sant'Angelo",
  "castel-del-monte": "Castel del Monte",
  "castello-sforzesco": "Sforza Castle",
  "alcazar-of-toledo": "Alcázar of Toledo",
  "alcazar-of-seville": "Real Alcázar of Seville",
  "casa-loma": "Casa Loma",
  "egeskov-castle": "Egeskov Castle",
  "frederiksborg-castle": "Frederiksborg Castle",
  "sigmaringen-castle": "Sigmaringen Castle",
  "wartburg-castle": "Wartburg",
  "karlstejn-castle": "Karlštejn Castle",
  "ksiaz-castle": "Książ Castle",
  "ogrodzieniec-castle": "Ogrodzieniec Castle",
  "chapultepec-castle": "Chapultepec Castle",
  "cape-coast-castle": "Cape Coast Castle",
  "elmina-castle": "Elmina Castle",
  "citadel-of-qaitbay": "Citadel of Qaitbay",
  "aleppo-citadel": "Aleppo Citadel",
  "masyaf-castle": "Masyaf Castle",
  "amber-fort": "Amer Fort",
  "mehrangarh-fort": "Mehrangarh Fort",
  "kumamoto-castle": "Kumamoto Castle",
  "shuri-castle": "Shuri Castle",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(`${slug} (${title})`);
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages failed, trying Commons search");
    const found = await commonsSearch(`${title} castle`);
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

writeFileSync("out/e32-castles-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
