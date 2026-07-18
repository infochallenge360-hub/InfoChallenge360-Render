import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { BIRDS_E22 } from "../src/Quiz/birdsE22Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/birds";
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

// iNaturalist: only CC0/CC-BY licensed photos, research-grade, sorted by votes (most-reviewed first).
async function inatPhoto(sciName) {
  const api = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sciName)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=10`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  for (const obs of j.results || []) {
    for (const photo of obs.photos || []) {
      if (!photo.url) continue;
      // Prefer safe open-data bucket; upgrade thumbnail to a larger size.
      const url = photo.url.replace(/square\.(jpe?g|png)/i, "large.$1");
      return { url, license: photo.license_code, attribution: photo.attribution, obsId: obs.id };
    }
  }
  return null;
}

const results = [];
for (const item of BIRDS_E22) {
  const dest = `${DEST}/${item.slug}.jpg`;
  if (existsSync(dest)) { console.log(`${item.slug}: already have it`); results.push({ slug: item.slug, status: "already-had" }); continue; }
  console.log(`fetching ${item.slug} (${item.sci})...`);
  try {
    const pic = await inatPhoto(item.sci);
    if (!pic) {
      console.log(`  no CC0/CC-BY photo found`);
      results.push({ slug: item.slug, name: item.name, status: "missing" });
      await new Promise((res) => setTimeout(res, 1200));
      continue;
    }
    const r = await fetchWithRetry(pic.url);
    if (!r || !r.ok) {
      console.log(`  download failed`);
      results.push({ slug: item.slug, name: item.name, status: "missing" });
      await new Promise((res) => setTimeout(res, 1200));
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  OK (${buf.length} bytes) -- license ${pic.license}, ${pic.attribution}`);
    results.push({ slug: item.slug, name: item.name, status: "ok", size: buf.length, license: pic.license, attribution: pic.attribution, obsId: pic.obsId });
  } catch (e) {
    console.log(`  error: ${e.message}`);
    results.push({ slug: item.slug, name: item.name, status: "error", error: e.message });
  }
  await new Promise((res) => setTimeout(res, 1200));
}

writeFileSync("out/e22-fetch-report.json", JSON.stringify(results, null, 2));
const missing = results.filter((r) => r.status === "missing" || r.status === "error");
console.log(`\nDone. ${results.length - missing.length}/${results.length} ok. Missing: ${missing.map((m) => m.slug).join(", ")}`);
