// E50 "Guess the Gemstone/Mineral" image fetcher.
// Strategy: Wikimedia Commons generator=search (namespace 6) FIRST, filtered to PD/CC0/CC-BY/CC-BY-SA
// licenses, picking the best-looking specimen/gem photo per item's tailored query; falls back to the
// Wikipedia pageimages lead image (piprop=thumbnail&pithumbsize=1200) when Commons search comes up
// empty or license-blocked. Sequential requests only (no Promise.all fan-out) to avoid Wikimedia
// throttling/0-byte responses. Requires a real User-Agent or Wikimedia 403s.
import { writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { GEMSTONES_E50 } from "../src/Quiz/gemstonesE50Data.js";

const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";
const OUT_DIR = "D:/mnbety-video/public/gemstones";
const REPORT_PATH = "D:/mnbety-video/out/e50-gemstones-fetch-report.json";
mkdirSync(OUT_DIR, { recursive: true });

// Per-item tailored search terms — chosen to avoid species confusion (e.g. citrine vs topaz,
// quartz varieties, blue-stone lookalikes) and to prefer raw specimen / cut-gem photography over
// jewelry-ad, diagram, or illustration results.
const QUERIES = {
  diamond: { commons: "rough diamond crystal", wiki: "Diamond" },
  ruby: { commons: "ruby gemstone crystal", wiki: "Ruby" },
  emerald: { commons: "emerald crystal gemstone", wiki: "Emerald" },
  sapphire: { commons: "sapphire gemstone crystal", wiki: "Sapphire" },
  amethyst: { commons: "amethyst crystal cluster", wiki: "Amethyst" },
  opal: { commons: "opal gemstone play of color", wiki: "Opal" },
  pearl: { commons: "pearl nacre gem", wiki: "Pearl" },
  gold: { commons: "native gold nugget specimen", wiki: "Native gold" },
  quartz: { commons: "rock crystal quartz cluster", wiki: "Quartz" },
  turquoise: { commons: "turquoise mineral specimen", wiki: "Turquoise (gemstone)" },
  jade: { commons: "jadeite jade specimen", wiki: "Jade" },
  garnet: { commons: "garnet crystal specimen", wiki: "Garnet" },
  citrine: { commons: "citrine quartz crystal", wiki: "Citrine" },
  "rose-quartz": { commons: "rose quartz specimen", wiki: "Rose quartz" },
  pyrite: { commons: "pyrite cubic crystal specimen", wiki: "Pyrite" },
  malachite: { commons: "malachite banded specimen", wiki: "Malachite" },
  onyx: { commons: "onyx chalcedony specimen", wiki: "Onyx" },

  aquamarine: { commons: "aquamarine crystal gemstone", wiki: "Aquamarine (gemstone)" },
  peridot: { commons: "peridot olivine crystal", wiki: "Peridot" },
  topaz: { commons: "topaz crystal gemstone", wiki: "Topaz" },
  "lapis-lazuli": { commons: "lapis lazuli specimen", wiki: "Lapis lazuli" },
  moonstone: { commons: "moonstone adularia gem", wiki: "Moonstone" },
  tourmaline: { commons: "tourmaline crystal specimen", wiki: "Tourmaline" },
  obsidian: { commons: "obsidian volcanic glass specimen", wiki: "Obsidian" },
  agate: { commons: "banded agate slice specimen", wiki: "Agate" },
  "tigers-eye": { commons: "tiger's eye quartz specimen", wiki: "Tiger's eye" },
  amber: { commons: "amber resin specimen", wiki: "Amber" },
  fluorite: { commons: "fluorite crystal specimen", wiki: "Fluorite" },
  selenite: { commons: "selenite gypsum crystal", wiki: "Selenite (mineral)" },
  calcite: { commons: "calcite crystal specimen", wiki: "Calcite" },
  jasper: { commons: "jasper stone specimen", wiki: "Jasper" },
  aventurine: { commons: "aventurine quartz specimen", wiki: "Aventurine" },
  rhodochrosite: { commons: "rhodochrosite banded specimen", wiki: "Rhodochrosite" },
  alexandrite: { commons: "alexandrite crystal gemstone", wiki: "Alexandrite" },

  tanzanite: { commons: "tanzanite crystal gemstone", wiki: "Tanzanite" },
  kunzite: { commons: "kunzite crystal gemstone", wiki: "Kunzite" },
  zircon: { commons: "zircon crystal gemstone", wiki: "Zircon" },
  spinel: { commons: "spinel crystal gemstone", wiki: "Spinel" },
  iolite: { commons: "iolite cordierite gemstone", wiki: "Iolite" },
  labradorite: { commons: "labradorite feldspar specimen", wiki: "Labradorite" },
  sunstone: { commons: "sunstone feldspar specimen", wiki: "Sunstone" },
  chrysoprase: { commons: "chrysoprase chalcedony specimen", wiki: "Chrysoprase" },
  azurite: { commons: "azurite blue crystal specimen", wiki: "Azurite" },
  rhodonite: { commons: "rhodonite pink specimen", wiki: "Rhodonite" },
  sodalite: { commons: "sodalite blue specimen", wiki: "Sodalite" },
  larimar: { commons: "larimar pectolite specimen", wiki: "Larimar" },
  kyanite: { commons: "kyanite blue crystal specimen", wiki: "Kyanite" },
  chalcopyrite: { commons: "chalcopyrite iridescent specimen", wiki: "Chalcopyrite" },
  galena: { commons: "galena cubic crystal specimen", wiki: "Galena" },
  cinnabar: { commons: "cinnabar mercury ore specimen", wiki: "Cinnabar" },
  halite: { commons: "halite rock salt crystal", wiki: "Halite" },

  painite: { commons: "painite crystal specimen", wiki: "Painite" },
  grandidierite: { commons: "grandidierite crystal specimen", wiki: "Grandidierite" },
  jeremejevite: { commons: "jeremejevite crystal specimen", wiki: "Jeremejevite" },
  taaffeite: { commons: "taaffeite gemstone crystal", wiki: "Taaffeite" },
  benitoite: { commons: "benitoite crystal specimen", wiki: "Benitoite" },
  poudretteite: { commons: "poudretteite crystal gemstone", wiki: "Poudretteite" },
  musgravite: { commons: "musgravite crystal gemstone", wiki: "Musgravite" },
  serendibite: { commons: "serendibite crystal gemstone", wiki: "Serendibite" },
  "red-beryl": { commons: "red beryl bixbite crystal", wiki: "Red beryl" },
  ammolite: { commons: "ammolite gem specimen", wiki: "Ammolite" },
  charoite: { commons: "charoite purple specimen", wiki: "Charoite" },
  sugilite: { commons: "sugilite purple specimen", wiki: "Sugilite" },
  papagoite: { commons: "papagoite blue specimen", wiki: "Papagoite" },
  hackmanite: { commons: "hackmanite sodalite specimen", wiki: "Hackmanite" },
  tugtupite: { commons: "tugtupite pink specimen", wiki: "Tugtupite" },
  stichtite: { commons: "stichtite specimen", wiki: "Stichtite" },
  ekanite: { commons: "ekanite crystal specimen", wiki: "Ekanite" },
};

const ALLOWED_LICENSE_RE = /(public domain|pdm|cc0|cc-by\b|cc-by-sa|attribution)/i;
const BLOCKED_LICENSE_RE = /(nc|nd|noderiv|noncommercial)/i;
const BAD_TITLE_RE = /(logo|map|diagram|structure|flag|coin|stamp|icon|chart|graph|drawing|illustration|clipart|advert|ring band|jewellery ad|jewelry ad)/i;

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchJSON(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await sleep(4000 * (i + 1)); continue; }
      if (!r.ok) { await sleep(1200); continue; }
      return await r.json();
    } catch (e) {
      await sleep(1500);
    }
  }
  return null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1200`;
  const j = await fetchJSON(api);
  if (!j || !j.query || !j.query.pages) return [];
  const pages = Object.values(j.query.pages);
  const out = [];
  for (const p of pages) {
    const info = p.imageinfo && p.imageinfo[0];
    if (!info) continue;
    const mime = info.mime || "";
    if (!/^image\/(jpeg|png)$/.test(mime)) continue;
    const meta = info.extmetadata || {};
    const licenseShort = meta.LicenseShortName?.value || "";
    const title = p.title || "";
    if (BAD_TITLE_RE.test(title)) continue;
    if (BLOCKED_LICENSE_RE.test(licenseShort) && !/^cc-by/i.test(licenseShort)) continue;
    if (!ALLOWED_LICENSE_RE.test(licenseShort) && licenseShort !== "") continue;
    const width = info.width || 0;
    if (width && width < 300) continue;
    out.push({
      title,
      url: info.thumburl || info.url,
      fullUrl: info.url,
      license: licenseShort || "unknown",
      artist: (meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim(),
      credit: (meta.Credit?.value || "").replace(/<[^>]+>/g, "").trim(),
      width,
    });
  }
  return out;
}

async function wikiPageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const j = await fetchJSON(api);
  if (!j || !j.query || !j.query.pages) return null;
  const page = Object.values(j.query.pages)[0];
  if (!page || !page.thumbnail) return null;
  return { url: page.thumbnail.source, title: `Wikipedia lead image: ${title}` };
}

async function download(url, destPath) {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
      if (r.status === 429) { await sleep(4000 * (i + 1)); continue; }
      if (!r.ok) { await sleep(1000); continue; }
      const buf = Buffer.from(await r.arrayBuffer());
      writeFileSync(destPath, buf);
      return buf.length;
    } catch (e) {
      await sleep(1500);
    }
  }
  return 0;
}

const report = [];

for (const item of GEMSTONES_E50) {
  const q = QUERIES[item.slug];
  if (!q) {
    console.log(`NO QUERY for ${item.slug}`);
    report.push({ slug: item.slug, status: "error", source: null, title: null, license: null, attribution: "no query defined" });
    continue;
  }
  process.stdout.write(`${item.slug} ... `);
  let picked = null;
  let source = null;

  const candidates = await commonsSearch(q.commons);
  if (candidates.length) {
    picked = candidates[0];
    source = "commons";
  } else {
    const wi = await wikiPageImage(q.wiki);
    if (wi) {
      picked = { title: wi.title, url: wi.url, license: "unknown (wikipedia lead)", artist: "" };
      source = "wikipedia";
    }
  }

  if (!picked) {
    console.log("FAILED — no candidate found");
    report.push({ slug: item.slug, status: "error", source: null, title: null, license: null, attribution: "no candidate found" });
    await sleep(600);
    continue;
  }

  const ext = /\.png(\?|$)/i.test(picked.url) ? ".png" : ".jpg";
  const destPath = `${OUT_DIR}/${item.slug}${ext}`;
  const size = await download(picked.url, destPath);

  if (size < 15000) {
    console.log(`SMALL/FAILED (${size} bytes) from ${source}: ${picked.title}`);
    report.push({
      slug: item.slug,
      status: "small",
      source,
      title: picked.title,
      license: picked.license,
      attribution: picked.artist || picked.credit || null,
      size,
    });
  } else {
    console.log(`ok (${size} bytes, ${ext}) from ${source}: ${picked.title}`);
    report.push({
      slug: item.slug,
      status: "ok",
      source,
      title: picked.title,
      license: picked.license,
      attribution: picked.artist || picked.credit || null,
      size,
      ext,
    });
  }

  await sleep(700); // sequential, polite pacing
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`\nWrote report to ${REPORT_PATH}`);
console.log(`ok: ${report.filter((r) => r.status === "ok").length} / ${report.length}`);
