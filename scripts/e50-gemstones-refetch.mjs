// Targeted re-fetch for E50 items whose first-pass image failed visual QA (wrong species, no
// visible defining color/effect, or a non-specimen image like a collage/decorative object).
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const UA = "GuessSyncQuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";
const OUT_DIR = "D:/mnbety-video/public/gemstones";
const REPORT_PATH = "D:/mnbety-video/out/e50-gemstones-fetch-report.json";

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchJSON(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await sleep(4000 * (i + 1)); continue; }
      if (!r.ok) { await sleep(1200); continue; }
      return await r.json();
    } catch (e) { await sleep(1500); }
  }
  return null;
}

const ALLOWED_LICENSE_RE = /(public domain|pdm|cc0|cc-by\b|cc-by-sa|attribution)/i;
const BLOCKED_LICENSE_RE = /(nc|nd|noderiv|noncommercial)/i;
const BAD_TITLE_RE = /(logo|map|diagram|structure|flag|coin|stamp|icon|chart|graph|drawing|illustration|clipart|advert|montage|collage|socle|stand|jewellery|jewelry)/i;

async function commonsSearchTop(query, n = 6) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${n}&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1200`;
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
      license: licenseShort || "unknown",
      artist: (meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim(),
      width,
    });
  }
  return out;
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
    } catch (e) { await sleep(1500); }
  }
  return 0;
}

// slug -> array of candidate queries to try in order
const REFETCH = {
  emerald: ["rough emerald crystal specimen colombia", "emerald crystal matrix mineral"],
  agate: ["agate geode slice banded", "blue lace agate slice"],
  "lapis-lazuli": ["lapis lazuli rough stone afghanistan", "lapis lazuli specimen blue"],
  jade: ["green jadeite jade specimen", "nephrite jade green rough"],
  citrine: ["citrine yellow quartz point", "citrine crystal cluster yellow"],
  garnet: ["almandine garnet red crystal", "garnet red dodecahedron crystal"],
  onyx: ["black onyx polished cabochon", "black onyx tumbled stone"],
  moonstone: ["moonstone cabochon blue sheen", "rainbow moonstone gem", "adularia moonstone"],
  turquoise: ["turquoise nugget blue cabochon", "turquoise sky blue specimen"],
  aventurine: ["green aventurine tumbled polished", "aventurine quartz sparkle specimen"],
  peridot: ["peridot faceted gemstone green", "peridot crystal olivine green gem"],
  alexandrite: ["alexandrite faceted gemstone color change", "alexandrite crystal green"],
  kunzite: ["kunzite pink crystal gem", "kunzite pink spodumene specimen"],
  iolite: ["iolite blue violet gemstone", "cordierite iolite blue crystal gem"],
  labradorite: ["labradorite blue flash polished slab", "labradorite spectrolite blue"],
  sunstone: ["sunstone oregon schiller glitter", "sunstone feldspar sparkle polished"],
  cinnabar: ["cinnabar vivid red crystal specimen", "cinnabar red mercury ore crystal"],
};

let report = JSON.parse(readFileSync(REPORT_PATH, "utf8"));

for (const [slug, queries] of Object.entries(REFETCH)) {
  process.stdout.write(`${slug} ... `);
  let done = false;
  for (const q of queries) {
    const candidates = await commonsSearchTop(q, 6);
    for (const cand of candidates) {
      // try downloading; require final size >= 15000 bytes
      const ext = /\.png(\?|$)/i.test(cand.url) ? ".png" : ".jpg";
      const destPath = `${OUT_DIR}/${slug}${ext}`;
      const size = await download(cand.url, destPath);
      if (size >= 15000) {
        console.log(`ok (${size} bytes) [${q}]: ${cand.title}`);
        const idx = report.findIndex((r) => r.slug === slug);
        const entry = {
          slug,
          status: "ok",
          source: "commons",
          title: cand.title,
          license: cand.license,
          attribution: cand.artist || null,
          size,
          ext,
        };
        if (idx >= 0) report[idx] = entry; else report.push(entry);
        done = true;
        break;
      }
    }
    if (done) break;
    await sleep(500);
  }
  if (!done) {
    console.log("STILL FAILED after all candidate queries");
  }
  await sleep(700);
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
console.log("done");
