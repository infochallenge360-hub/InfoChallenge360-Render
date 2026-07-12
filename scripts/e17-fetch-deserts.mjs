// E17 "Guess the Desert" — fetch 71 real desert landscape photos via Wikipedia pageimages,
// with Wikimedia Commons search fallback for items without a clean standalone article image.
import { writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { DESERTS_E17 } from "../src/Quiz/desertsE17Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/deserts";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Per-slug candidate Wikipedia article titles to try (in order) before falling back to Commons search.
const TITLE_CANDIDATES = {
  "grand-erg-oriental-algeria": ["Grand Erg Oriental"],
  "death-valley-usa": ["Death Valley"],
  "namib-desert-namibia": ["Namib"],
  "atacama-desert-chile": ["Atacama Desert"],
  "gobi-desert-mongolia": ["Gobi Desert"],
  "salar-de-uyuni-bolivia": ["Salar de Uyuni"],
  "arabian-desert-saudi-arabia": ["Arabian Desert"],
  "thar-desert-india": ["Thar Desert"],
  "kalahari-desert-botswana": ["Kalahari Desert"],
  "taklamakan-desert-china": ["Taklamakan Desert"],
  "karakum-desert-turkmenistan": ["Karakum Desert"],
  "chihuahuan-desert-mexico": ["Chihuahuan Desert"],
  "patagonian-desert-argentina": ["Patagonian Desert"],
  "richat-structure-mauritania": ["Richat Structure"],
  "great-victoria-desert-australia": ["Great Victoria Desert"],
  "white-desert-egypt": ["White Desert (Egypt)", "White Desert, Egypt"],
  "dasht-e-lut-iran": ["Dasht-e Lut"],
  "karoo-south-africa": ["Karoo"],

  "mojave-desert-usa": ["Mojave Desert"],
  "great-rann-of-kutch-india": ["Great Rann of Kutch", "Rann of Kutch"],
  "sinai-desert-egypt": ["Sinai Desert", "Sinai Peninsula"],
  "simpson-desert-australia": ["Simpson Desert"],
  "badain-jaran-desert-china": ["Badain Jaran Desert"],
  "syrian-desert-syria": ["Syrian Desert"],
  "kyzylkum-desert-uzbekistan": ["Kyzylkum Desert"],
  "makgadikgadi-pan-botswana": ["Makgadikgadi Pan"],
  "rub-al-khali-saudi-arabia": ["Rub' al Khali", "Empty Quarter"],
  "nubian-desert-sudan": ["Nubian Desert"],
  "nazca-desert-peru": ["Nazca Desert", "Peruvian Desert", "Sechura Desert"],
  "valle-de-la-luna-chile": ["Valle de la Luna, Chile", "Valle de la Luna (Chile)", "Moon Valley (Chile)"],
  "great-sand-sea-libya": ["Great Sand Sea"],
  "liwa-desert-uae": ["Liwa Oasis", "Liwa, Abu Dhabi"],
  "tabernas-desert-spain": ["Tabernas Desert"],
  "tenere-desert-niger": ["Ténéré"],
  "dasht-e-kavir-iran": ["Dasht-e Kavir"],
  "khongoryn-els-mongolia": ["Khongoryn Els"],

  "white-sands-usa": ["White Sands National Park"],
  "pinnacles-desert-australia": ["The Pinnacles"],
  "chott-el-djerid-tunisia": ["Chott el Djerid"],
  "black-desert-egypt": ["Black Desert (Egypt)", "Black Desert, Egypt"],
  "registan-desert-afghanistan": ["Registan Desert"],
  "salvador-dali-desert-bolivia": ["Salvador Dalí Desert", "Dalí Desert"],
  "monte-desert-argentina": ["Monte Desert", "Monte (ecoregion)"],
  "carcross-desert-canada": ["Carcross Desert"],
  "sechura-desert-peru": ["Sechura Desert"],
  "la-guajira-desert-colombia": ["Guajira Desert", "La Guajira Department"],
  "bardenas-reales-spain": ["Bardenas Reales"],
  "gran-desierto-de-altar-mexico": ["Gran Desierto de Altar"],
  "khor-al-adaid-qatar": ["Khor Al Adaid"],
  "cholistan-desert-pakistan": ["Cholistan Desert"],
  "chalbi-desert-kenya": ["Chalbi Desert"],
  "skeleton-coast-namibia": ["Skeleton Coast"],
  "ubari-sand-sea-libya": ["Ubari Sand Sea"],
  "varzaneh-desert-iran": ["Varzaneh Desert", "Varzaneh"],

  "sonoran-desert-usa": ["Sonoran Desert"],
  "great-sandy-desert-australia": ["Great Sandy Desert"],
  "betpak-dala-kazakhstan": ["Betpak-Dala"],
  "ennedi-plateau-chad": ["Ennedi Plateau"],
  "bayuda-desert-sudan": ["Bayuda Desert"],
  "kumtag-desert-china": ["Kumtag Desert"],
  "kharan-desert-pakistan": ["Kharan Desert"],
  "ad-dahna-desert-saudi-arabia": ["Ad-Dahna Desert", "Dahna Desert"],
  "medanos-de-coro-venezuela": ["Médanos de Coro National Park", "Médanos de Coro"],
  "chara-sands-russia": ["Chara Sands"],
  "grand-bara-desert-djibouti": ["Grand Bara Desert"],
  "guban-somalia": ["Guban (region)", "Guban"],
  "erg-chech-mali": ["Erg Chech"],
  "issaouane-erg-algeria": ["Issaouane Erg"],
  "vizcaino-desert-mexico": ["Vizcaíno Desert"],
  "maranjab-desert-iran": ["Maranjab Desert"],
  "gilf-kebir-egypt": ["Gilf Kebir"],
};

async function fetchJsonWithRetry(url, headers) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const r = await fetch(url, { headers: headers || { "User-Agent": UA } });
      const text = await r.text();
      if (r.ok && text.trim().startsWith("{")) return JSON.parse(text);
      if (r.status === 429 || r.status === 403) await sleep(4000 * (attempt + 1));
      else await sleep(1500 * (attempt + 1));
    } catch (e) {
      await sleep(2000 * (attempt + 1));
    }
  }
  return null;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const j = await fetchJsonWithRetry(api);
  if (!j) return null;
  const pages = j.query && j.query.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0];
  if (!p || p.missing !== undefined) return null;
  return p.thumbnail ? { url: p.thumbnail.source, title: p.title } : null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=1200`;
  const j = await fetchJsonWithRetry(api);
  if (!j || !j.query || !j.query.pages) return [];
  const pages = Object.values(j.query.pages);
  const results = [];
  for (const p of pages) {
    const ii = p.imageinfo && p.imageinfo[0];
    if (!ii) continue;
    if (ii.mime && !ii.mime.startsWith("image/")) continue;
    const meta = ii.extmetadata || {};
    const license = meta.LicenseShortName ? meta.LicenseShortName.value : "";
    const cats = (meta.Categories && meta.Categories.value) || "";
    // skip obviously bad license types
    if (/non-free|fair use/i.test(license)) continue;
    results.push({
      title: p.title,
      url: ii.thumburl || ii.url,
      license,
      artist: meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, "").trim() : "",
      credit: meta.Credit ? meta.Credit.value.replace(/<[^>]+>/g, "").trim() : "",
      descUrl: ii.descriptionurl,
      cats,
    });
  }
  return results;
}

function filenameFromThumbUrl(url) {
  try {
    const u = new URL(url);
    const segs = u.pathname.split("/").filter(Boolean);
    let last = decodeURIComponent(segs[segs.length - 1]);
    last = last.replace(/^\d+px-/, "");
    return last;
  } catch {
    return null;
  }
}

async function licenseForCommonsFile(filename) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + filename)}&prop=imageinfo&iiprop=extmetadata`;
  const j = await fetchJsonWithRetry(api);
  if (!j || !j.query || !j.query.pages) return null;
  const p = Object.values(j.query.pages)[0];
  if (!p || p.missing !== undefined) return null;
  const ii = p.imageinfo && p.imageinfo[0];
  if (!ii) return null;
  const meta = ii.extmetadata || {};
  return {
    license: meta.LicenseShortName ? meta.LicenseShortName.value : "",
    artist: meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, "").trim() : "",
    credit: meta.Credit ? meta.Credit.value.replace(/<[^>]+>/g, "").trim() : "",
  };
}

function isRealImage(buf) {
  if (buf.length < 3000) return false;
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8;
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  return jpeg || png;
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
for (const it of DESERTS_E17) {
  n++;
  const outPath = `${DEST}/${it.slug}.jpg`;
  if (existsSync(outPath) && statSync(outPath).size > 15000) {
    results.push({ slug: it.slug, name: it.name, country: it.country, status: "SKIP_EXISTS" });
    console.error(`${n}/71 ${it.slug}: SKIP (already exists)`);
    continue;
  }

  const candidates = TITLE_CANDIDATES[it.slug] || [it.name];
  let found = null;
  let triedTitle = null;
  for (const title of candidates) {
    found = await pageImage(title);
    await sleep(1200);
    if (found) { triedTitle = title; break; }
  }

  if (found) {
    const dl = await download(found.url, outPath);
    await sleep(1000);
    if (dl.ok) {
      const fname = filenameFromThumbUrl(found.url);
      let lic = null;
      if (fname) { lic = await licenseForCommonsFile(fname); await sleep(1000); }
      results.push({
        slug: it.slug, name: it.name, country: it.country,
        wikiTitle: found.title, imageUrl: found.url,
        license: lic ? lic.license : "", artist: lic ? (lic.artist || lic.credit) : "",
        status: "ok",
      });
      console.error(`${n}/71 ${it.slug}: OK via pageimages "${found.title}" (${dl.size}b)`);
      continue;
    } else {
      console.error(`${n}/71 ${it.slug}: pageimages download failed (${dl.reason}), trying Commons fallback`);
    }
  } else {
    console.error(`${n}/71 ${it.slug}: no pageimages result, trying Commons fallback`);
  }

  // Fallback: Commons search
  const queries = [
    `${it.name} desert landscape`,
    `${it.name} ${it.country}`,
    `${it.name}`,
  ];
  let picked = null;
  for (const q of queries) {
    const list = await commonsSearch(q);
    await sleep(1200);
    if (list.length) {
      // prefer results whose title doesn't look like a map/flag/diagram/icon
      const good = list.find((r) => !/map|flag|icon|diagram|logo|locator|coa\b|coat of arms/i.test(r.title));
      picked = good || list[0];
      if (picked) break;
    }
  }

  if (picked) {
    const dl = await download(picked.url, outPath);
    await sleep(1000);
    if (dl.ok) {
      results.push({
        slug: it.slug, name: it.name, country: it.country,
        wikiTitle: picked.title, imageUrl: picked.url,
        license: picked.license, artist: picked.artist || picked.credit,
        status: "fallback",
      });
      console.error(`${n}/71 ${it.slug}: OK via Commons search "${picked.title}" (${dl.size}b)`);
    } else {
      results.push({ slug: it.slug, name: it.name, country: it.country, status: "missing", reason: `download-failed-${dl.reason}` });
      console.error(`${n}/71 ${it.slug}: MISSING (download failed: ${dl.reason})`);
    }
  } else {
    results.push({ slug: it.slug, name: it.name, country: it.country, status: "missing", reason: "no-results" });
    console.error(`${n}/71 ${it.slug}: MISSING (no results anywhere)`);
  }
}

const ok = results.filter((r) => r.status === "ok" || r.status === "SKIP_EXISTS");
const fb = results.filter((r) => r.status === "fallback");
const missing = results.filter((r) => r.status === "missing");
console.log(`\npageimages-clean: ${ok.length - fb.length}, fallback: ${fb.length}, missing: ${missing.length} / ${DESERTS_E17.length}`);
if (missing.length) { console.log("MISSING:"); for (const m of missing) console.log(` - ${m.slug} (${m.name}): ${m.reason}`); }
writeFileSync("out/e17-fetch-report.json", JSON.stringify(results, null, 2), "utf8");
console.log("Report written to out/e17-fetch-report.json");
