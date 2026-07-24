import { writeFileSync, readFileSync } from "node:fs";

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
const BAD_TITLE_RE = /(logo|map|diagram|structure|flag|coin|stamp|icon|chart|graph|drawing|illustration|clipart|advert|montage|collage|socle|stand|jewellery|jewelry|label)/i;

async function commonsSearchTop(query, n = 8) {
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
    out.push({ title, url: info.thumburl || info.url, license: licenseShort || "unknown", artist: (meta.Artist?.value || "").replace(/<[^>]+>/g, "").trim(), width });
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
    } catch (e) { await sleep(1500); }
  }
  return 0;
}

// slug -> { commons: [queries...], wiki: [titles...] } tried in order, commons first then wiki
const PLAN = {
  emerald: { commons: ["emerald crystal green beryl gem", "raw emerald crystal muzo"], wiki: ["Emerald"] },
  jade: { commons: ["jadeite jade green polished", "nephrite green boulder"], wiki: ["Jadeite", "Nephrite"] },
  garnet: { commons: ["almandine garnet crystal red", "garnet crystal red dodecahedral"], wiki: ["Almandine", "Garnet"] },
  moonstone: { commons: ["moonstone gem blue sheen cabochon", "adularia feldspar moonstone"], wiki: ["Moonstone (gemstone)"] },
  turquoise: { commons: ["turquoise gemstone sky blue polished", "turquoise mineral vivid blue"], wiki: ["Turquoise"] },
  peridot: { commons: ["peridot green gem faceted", "olivine green gem crystal"], wiki: ["Peridot"] },
  kunzite: { commons: ["kunzite pink gem afghanistan", "spodumene pink crystal gem"], wiki: ["Kunzite"] },
  labradorite: { commons: ["labradorite polished blue flash stone", "spectrolite blue flash"], wiki: ["Labradorite"] },
  sunstone: { commons: ["sunstone gem glitter orange", "oregon sunstone gem"], wiki: ["Sunstone (mineral)", "Sunstone"] },
  "lapis-lazuli": { commons: ["lapis lazuli rough chunk blue afghanistan", "lapis lazuli mineral specimen -jewel"], wiki: ["Lapis lazuli"] },
  alexandrite: { commons: ["alexandrite gem red green switch", "alexandrite ural crystal"], wiki: ["Alexandrite"] },
  cinnabar: { commons: ["cinnabar bright red crystal china", "cinnabar vermillion crystal"], wiki: ["Cinnabar"] },
};

let report = JSON.parse(readFileSync(REPORT_PATH, "utf8"));

for (const [slug, plan] of Object.entries(PLAN)) {
  process.stdout.write(`${slug} ... `);
  let done = false;
  for (const q of plan.commons) {
    const candidates = await commonsSearchTop(q, 8);
    for (const cand of candidates) {
      const ext = /\.png(\?|$)/i.test(cand.url) ? ".png" : ".jpg";
      const destPath = `${OUT_DIR}/${slug}${ext}`;
      const size = await download(cand.url, destPath);
      if (size >= 15000) {
        console.log(`ok commons (${size}b) [${q}]: ${cand.title}`);
        const idx = report.findIndex((r) => r.slug === slug);
        const entry = { slug, status: "ok", source: "commons", title: cand.title, license: cand.license, attribution: cand.artist || null, size, ext };
        if (idx >= 0) report[idx] = entry; else report.push(entry);
        done = true;
        break;
      }
    }
    if (done) break;
    await sleep(500);
  }
  if (!done) {
    for (const t of plan.wiki) {
      const wi = await wikiPageImage(t);
      if (wi) {
        const ext = /\.png(\?|$)/i.test(wi.url) ? ".png" : ".jpg";
        const destPath = `${OUT_DIR}/${slug}${ext}`;
        const size = await download(wi.url, destPath);
        if (size >= 15000) {
          console.log(`ok wiki (${size}b) [${t}]: ${wi.title}`);
          const idx = report.findIndex((r) => r.slug === slug);
          const entry = { slug, status: "ok", source: "wikipedia", title: wi.title, license: "unknown (wikipedia lead)", attribution: null, size, ext };
          if (idx >= 0) report[idx] = entry; else report.push(entry);
          done = true;
          break;
        }
      }
      await sleep(500);
    }
  }
  if (!done) console.log("STILL FAILED");
  await sleep(700);
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
console.log("done");
