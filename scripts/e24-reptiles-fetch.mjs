import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { REPTILES_E24 } from "../src/Quiz/reptilesE24Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/reptiles";
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

async function inatPhoto(sciName) {
  const api = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sciName)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=10`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  for (const obs of j.results || []) {
    for (const photo of obs.photos || []) {
      if (photo.url && (photo.url.includes("inaturalist-open-data.s3.amazonaws.com"))) {
        const orig = photo.url.replace(/square\.(jpe?g|png)/i, `original.$1`);
        return { url: orig, attribution: photo.attribution, license: photo.license_code };
      }
    }
  }
  // fallback: accept any cc0/cc-by photo even off the open-data bucket
  for (const obs of j.results || []) {
    for (const photo of obs.photos || []) {
      if (photo.url) {
        const orig = photo.url.replace(/square\.(jpe?g|png)/i, `original.$1`);
        return { url: orig, attribution: photo.attribution, license: photo.license_code };
      }
    }
  }
  return null;
}

const results = [];
for (const item of REPTILES_E24) {
  const dest = `${DEST}/${item.slug}.jpg`;
  console.log(`fetching ${item.slug} (${item.sci})...`);
  try {
    const photo = await inatPhoto(item.sci);
    if (!photo) {
      console.log(`  no iNat photo found`);
      results.push({ slug: item.slug, name: item.name, sci: item.sci, status: "missing" });
      await new Promise((res) => setTimeout(res, 1200));
      continue;
    }
    const r = await fetchWithRetry(photo.url);
    if (!r || !r.ok) {
      console.log(`  download failed`);
      results.push({ slug: item.slug, name: item.name, sci: item.sci, status: "missing" });
      await new Promise((res) => setTimeout(res, 1200));
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  OK (${buf.length} bytes) attribution=${photo.attribution} license=${photo.license}`);
    results.push({ slug: item.slug, name: item.name, sci: item.sci, status: "ok", size: buf.length, url: photo.url, attribution: photo.attribution, license: photo.license });
  } catch (e) {
    console.log(`  error: ${e.message}`);
    results.push({ slug: item.slug, name: item.name, sci: item.sci, status: "error", error: e.message });
  }
  await new Promise((res) => setTimeout(res, 1200));
}

writeFileSync("out/e24-fetch-report.json", JSON.stringify(results, null, 2));
const missing = results.filter((r) => r.status === "missing" || r.status === "error");
console.log(`\nDone. ${results.length - missing.length}/${results.length} ok. Missing: ${missing.map((m) => m.slug).join(", ")}`);
