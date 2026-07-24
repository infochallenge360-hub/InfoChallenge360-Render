import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "GuessSyncQuizBot/1.0 (educational quiz)";
const DEST = "public/statues";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query, limit = 10) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  return Object.values(j.query.pages);
}

function stripHtml(s) { return (s || "").replace(/<[^>]+>/g, "").trim(); }
function buildAttribution(meta) {
  if (!meta) return { license: "unknown", attribution: "" };
  const license = meta.LicenseShortName?.value || "unknown";
  const artist = stripHtml(meta.Artist?.value);
  if (/public domain|^pd$|cc0/i.test(license)) return { license, attribution: artist ? `Public domain — ${artist}` : "Public domain" };
  if (/^cc[- ]by/i.test(license)) return { license, attribution: artist ? `${artist} / ${license}` : `Unknown author / ${license}` };
  return { license, attribution: artist ? `${artist} / ${license}` : license };
}

function urlToFileTitle(url) {
  if (!url) return null;
  const m = url.match(/\/(?:commons|wikipedia\/[a-z]+)\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+?)(?:\/\d+px-[^/]+)?$/);
  if (!m) return null;
  let name = decodeURIComponent(m[1]);
  name = name.replace(/^\d+px-/, "");
  return "File:" + name;
}
async function licenseFor(fileTitle) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=extmetadata`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.imageinfo?.[0]?.extmetadata || null;
}

// slug -> { name, query: [commons search terms to try in order], pageTitle?: try pageimages first }
const FIXES = {
  "charging-bull": { name: "Charging Bull", queries: ["Charging Bull sculpture bronze Bowling Green", "Charging Bull Di Modica statue"] },
  "alyosha-monument-plovdiv": { name: "Alyosha Monument", queries: ["Alyosha monument Plovdiv Bunardzhik", "Alyosha statue Plovdiv hill"] },
  "leonidas-monument-thermopylae": { name: "Leonidas Monument", queries: ["Leonidas monument Thermopylae bronze statue spear", "Leonidas statue Thermopylae modern monument"] },
  "peter-the-great-statue-moscow": { name: "Peter the Great Statue", queries: ["Tsereteli Peter the Great monument Moscow river", "Peter the Great statue Moscow ship Tsereteli"] },
  "golden-buddha-wat-traimit": { name: "Golden Buddha of Wat Traimit", queries: ["Golden Buddha statue Wat Traimit interior hall", "Phra Phuttha Maha Suwana Patimakon golden buddha"] },
  "ofuna-kannon": { name: "Ofuna Kannon", queries: ["Ofuna Kannon statue face close", "Ofuna Kannon bust Kamakura"] },
  "skanderbeg-statue-tirana": { name: "Skanderbeg Statue", queries: ["Skanderbeg equestrian statue Tirana close", "Monument Skanderbeg Tirana bronze horse"] },
  "awakening-sculpture": { name: "The Awakening", queries: ["The Awakening sculpture National Harbor", "The Awakening Seward Johnson statue giant"] },
  "tear-of-grief": { name: "Tear of Grief", queries: ["To the Struggle Against World Terrorism Bayonne", "Tear of Grief statue Bayonne New Jersey Tsereteli"] },
};

const report = [];
for (const [slug, cfg] of Object.entries(FIXES)) {
  console.log(`\n${slug}`);
  let picked = null;
  for (const q of cfg.queries) {
    const pages = await commonsSearch(q);
    if (pages && pages.length) {
      for (const p of pages) {
        const info = p.imageinfo?.[0];
        if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) {
          picked = { url: info.thumburl || info.url, title: p.title, extmetadata: info.extmetadata };
          break;
        }
      }
    }
    if (picked) { console.log(`  matched via query "${q}" -> ${picked.title}`); break; }
    await new Promise((r) => setTimeout(r, 600));
  }
  if (!picked) { console.log("  STILL MISSING"); report.push({ slug, title: cfg.name, status: "missing" }); continue; }

  const r = await fetchWithRetry(picked.url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title: cfg.name, status: "download-fail", url: picked.url }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 8000) { console.log(`  too small (${buf.length}b)`); report.push({ slug, title: cfg.name, status: "too-small", size: buf.length }); continue; }
  writeFileSync(`${DEST}/${slug}.jpg`, buf);

  let extmeta = picked.extmetadata;
  if (!extmeta) {
    const fileTitle = urlToFileTitle(picked.url) || picked.title;
    extmeta = await licenseFor(fileTitle);
  }
  const { license, attribution } = buildAttribution(extmeta);
  console.log(`  OK (${buf.length} bytes) | ${license}`);
  report.push({ slug, status: "ok", source: "commons-search", title: picked.title, license, attribution, size: buf.length, url: picked.url });
  await new Promise((r2) => setTimeout(r2, 700));
}

writeFileSync("out/e51-statues-fix-report.json", JSON.stringify(report, null, 2));
console.log("\nDone.");
for (const r of report) console.log(r.slug, "->", r.status, r.title || "");
